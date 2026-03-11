import { FOLDER_STORAGE_KEY, SEED_DATA } from "../constants";
import { FileCreateUpdateDto, FileItem } from "../models/file";
import { FolderItem, FolderCreateDto, FolderUpdateDto } from "../models/folder";

const safeParse = <T>(value: string | null, fallback: T): T => {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

const generateId = () => {
    return crypto.randomUUID();
};

const loadFolders = (): FolderItem[] => {
    return safeParse<FolderItem[]>(localStorage.getItem(FOLDER_STORAGE_KEY), []);
};

const saveFolders = (folders: FolderItem[]) => {
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(folders));
};

const walkFolders = (
    folders: FolderItem[],
    fn: (folder: FolderItem, parentArray: FolderItem[], index: number) => boolean
): boolean => {
    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        if (fn(folder, folders, i)) return true;
        if (walkFolders(folder.subFolders, fn)) return true;
    }
    return false;
};

export const folderStorage = {
    get folders(): FolderItem[] { return loadFolders(); },

    seed: () => saveFolders([SEED_DATA]),

    getFolderById: (folderId: string): FolderItem | undefined => {
        const folders = loadFolders();
        const stack = [...folders];
        while (stack.length) {
            const current = stack.pop();
            if (current?.id === folderId) return current;
            if (current) stack.push(...current.subFolders);
        }
        return undefined;
    },

    createFolder: (data: FolderCreateDto, parentId?: string): FolderItem | undefined => {
        const folders = loadFolders();
        let createdFolder;

        walkFolders(folders, (folder) => {
            if (folder.id !== parentId) return false;
            if (folder.subFolders.some(folder => folder.name === data.name)) {
                alert(`A folder with name "${data.name}" already exists.`);
                return true;
            }

            const newFolder: FolderItem = {
                id: generateId(),
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                ...data,
            };

            folder.subFolders.push(newFolder);
            folder.modifiedAt = Date.now();
            createdFolder = newFolder;
            return true;
        });

        if (createdFolder) saveFolders(folders);
        return createdFolder;
    },

    updateFolder: (folderId: string, data: FolderUpdateDto): FolderItem | undefined => {
        const folders = loadFolders();
        let updatedFolder;

        walkFolders(folders, (folder, parentArray) => {
            if (folder.id !== folderId) return false;
            if (parentArray.some(folder => folder.name === data.name)) {
                alert(`A folder with name "${data.name}" already exists.`);
                return true;
            }

            Object.assign(folder, data, { modifiedAt: Date.now() });
            updatedFolder = folder;
            return true;
        });

        if (updatedFolder) saveFolders(folders);
        return updatedFolder;
    },

    deleteFolder: (folderId: string): boolean => {
        const folders = loadFolders();
        let deleted = false;

        walkFolders(folders, (_, parentArray, index) => {
            if (parentArray[index].id !== folderId) return false;
            parentArray.splice(index, 1);
            deleted = true;
            return true;
        });

        if (deleted) saveFolders(folders);
        return deleted;
    },

    createFile: (folderId: string, data: FileCreateUpdateDto): FileItem | undefined => {
        const folders = loadFolders();
        let createdFile;

        walkFolders(folders, (folder) => {
            if (folder.id !== folderId) return false;

            const newFile: FileItem = {
                ...data,
                id: generateId(),
                createdAt: Date.now(),
                modifiedAt: Date.now(),
            };
            folder.files.push(newFile);
            folder.modifiedAt = Date.now();
            createdFile = newFile;
            return true;
        });

        if (createdFile) saveFolders(folders);
        return createdFile;
    },

    updateFile: (folderId: string, fileId: string, data: FileCreateUpdateDto): FileItem | undefined => {
        const folders = loadFolders();
        let updatedFile;

        walkFolders(folders, (folder) => {
            if (folder.id !== folderId) return false;

            const fileIndex = folder.files.findIndex(f => f.id === fileId);
            if (fileIndex === -1) return false;

            folder.files[fileIndex] = { ...folder.files[fileIndex], ...data, modifiedAt: Date.now() };
            folder.modifiedAt = Date.now();
            updatedFile = folder.files[fileIndex];
            return true;
        });

        if (updatedFile) saveFolders(folders);
        return updatedFile;
    },

    deleteFile: (folderId: string, fileId: string): boolean => {
        const folders = loadFolders();
        let deleted = false;

        walkFolders(folders, (folder) => {
            if (folder.id !== folderId) return false;

            const newFiles = folder.files.filter(f => f.id !== fileId);
            if (newFiles.length === folder.files.length) return false;

            folder.files = newFiles;
            folder.modifiedAt = Date.now();
            deleted = true;
            return true;
        });

        if (deleted) saveFolders(folders);
        return deleted;
    },
};