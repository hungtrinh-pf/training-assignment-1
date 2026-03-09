import { FileItem } from "../models/file";
import { FolderItem } from "../models/folder";

const ROOT_FILE_STORAGE_KEY = "trainingAssignment1.rootFileData";
const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";

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

export const rootFileStorage = {
    getRootFiles: (): FileItem[] => {
        return loadFiles();
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
    getFolders: (): FolderItem[] => {
        return loadFolders();
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

    createFolder: (data: Omit<FolderItem, 'id' | 'createdAt' | 'modifiedAt'>): FolderItem => {
        const folders = loadFolders();
        const newFolder: FolderItem = {
            id: generateId(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
            ...data,
        };
        folders.push(newFolder);
        saveFolders(folders);
        return newFolder;
    },

    updateFolder: (folderId: string, data: Partial<Omit<FolderItem, 'id' | 'createdAt'>>): FolderItem | undefined => {
        const folders = loadFolders();
        const folderIndex = folders.findIndex(f => f.id === folderId);
        if (folderIndex === -1) return undefined;

        folders[folderIndex] = { ...folders[folderIndex], ...data, modifiedAt: Date.now() };
        saveFolders(folders);
        return folders[folderIndex];
    },

    deleteFolder: (folderId: string): boolean => {
        const folders = loadFolders();
        const newFolders = folders.filter(f => f.id !== folderId);
        if (newFolders.length === folders.length) return false;
        saveFolders(newFolders);
        return true;
    },

    createFile: (folderId: string, data: Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>): FileItem | undefined => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder) return undefined;

        const newFile: FileItem = {
            ...data,
            id: generateId(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        };

        folder.files.push(newFile);
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return newFile;
    },

    updateFile: (folderId: string, fileId: string, data: Partial<Omit<FileItem, 'id' | 'createdAt'>>): FileItem | undefined => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder) return undefined;

        const fileIndex = folder.files.findIndex(f => f.id === fileId);
        if (fileIndex === -1) return undefined;

        folder.files[fileIndex] = { ...folder.files[fileIndex], ...data, modifiedAt: Date.now() };
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return folder.files[fileIndex];
    },

    deleteFile: (folderId: string, fileId: string): boolean => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder) return false;

        const newFiles = folder.files.filter(f => f.id !== fileId);
        if (newFiles.length === folder.files.length) return false;

        folder.files = newFiles;
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return true;
    },

    // TODO: Handle nested folder update/delete
};