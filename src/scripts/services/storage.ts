import { FileItem } from "../models/file";
import { FolderItem } from "../models/folder";

const ROOT_FILE_STORAGE_KEY = "trainingAssignment1.rootFileData";
const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";

const SEED_FOLDERS: FolderItem[] = [
    {
        id: crypto.randomUUID(),
        name: "CAS",
        subFolders: [],
        files: [],
        createdAt: 1745995351000,
        createdBy: "Megan Bowen",
        modifiedAt: 1745995351000,
        modifiedBy: "Megan Bowen",
    }
];

const SEED_FILES: FileItem[] = [
    {
        id: crypto.randomUUID(),
        name: "CoasterAndBargeLoading.xlsx",
        type: "excel",
        createdAt: Date.now(),
        createdBy: "Administrator MOD",
        modifiedAt: Date.now(),
        modifiedBy: "Administrator MOD",
    },
    {
        id: crypto.randomUUID(),
        name: "RevenueByServices.xlsx",
        type: "excel",
        createdAt: Date.now(),
        createdBy: "Administrator MOD",
        modifiedAt: Date.now(),
        modifiedBy: "Administrator MOD",
    },
    {
        id: crypto.randomUUID(),
        name: "RevenueByServices2016.xlsx",
        type: "excel",
        createdAt: Date.now(),
        createdBy: "Administrator MOD",
        modifiedAt: Date.now(),
        modifiedBy: "Administrator MOD",
    },
    {
        id: crypto.randomUUID(),
        name: "RevenueByServices2017.xlsx",
        type: "excel",
        createdAt: Date.now(),
        createdBy: "Administrator MOD",
        modifiedAt: Date.now(),
        modifiedBy: "Administrator MOD",
    },
]

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

const loadFiles = (): FileItem[] => {
    return safeParse<FileItem[]>(localStorage.getItem(ROOT_FILE_STORAGE_KEY), []);
}

const loadFolders = (): FolderItem[] => {
    return safeParse<FolderItem[]>(localStorage.getItem(FOLDER_STORAGE_KEY), []);
};

const saveFiles = (files: FileItem[]) => {
    localStorage.setItem(ROOT_FILE_STORAGE_KEY, JSON.stringify(files));
}

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

export const rootFileStorage = {    
    get rootFiles() : FileItem[] {
        return loadFiles();
    },

    seed: () => {
        saveFiles(SEED_FILES);
    },

    createRootFile: (data: Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>): FileItem => {
        const files = loadFiles();
        const newFile: FileItem = {
            ...data,
            id: generateId(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        };
        files.push(newFile);
        saveFiles(files);
        return newFile;
    },

    updateRootFile: (fileId: string, data: Partial<Omit<FileItem, 'id' | 'createdAt'>>): FileItem | undefined => {
        const files = loadFiles();
        const fileIndex = files.findIndex(f => f.id === fileId);
        if (fileIndex === -1) return undefined;

        files[fileIndex] = { ...files[fileIndex], ...data, modifiedAt: Date.now() };
        saveFiles(files);
        return files[fileIndex];
    },

    deleteRootFile: (fileId: string): boolean => {
        const files = loadFiles();
        const newFiles = files.filter(f => f.id !== fileId);
        if (newFiles.length === files.length) return false;
        saveFiles(newFiles);
        return true;
    },
};

export const folderStorage = {
    get folders() : FolderItem[] {
        return loadFolders();
    },

    seed: () => {
        saveFolders(SEED_FOLDERS);
    },

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

    createFolder: (
        data: Omit<FolderItem, 'id' | 'createdAt' | 'modifiedAt'>,
        parentId?: string,
    ): FolderItem | undefined => {
        const folders = loadFolders();
        if (!parentId) {
            if (folders.some(folder => folder.name === data.name)) {
                alert(`A folder with name "${data.name}" already exists.`);
                return;
            }

            const newFolder: FolderItem = {
                id: generateId(),
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                ...data,
            };
            folders.push(newFolder);
            saveFolders(folders);
            return newFolder;
        }

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

    updateFolder: (folderId: string, data: Partial<Omit<FolderItem, 'id' | 'createdAt'>>): FolderItem | undefined => {
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

    createFile: (folderId: string, data: Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>): FileItem | undefined => {
        if (!folderId) return undefined;
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

    updateFile: (folderId: string, fileId: string, data: Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>): FileItem | undefined => {
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