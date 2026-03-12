import { FILE_STORAGE_KEY, FOLDER_STORAGE_KEY, SEED_FILES, SEED_FOLDERS } from "../constants";
import { FileCreateDto, FileItem, FileUpdateDto } from "../models/file";
import { FolderCreateDto, FolderItem, FolderUpdateDto } from "../models/folder";
import { generateId, safeParse } from "../utilities/_storage";

const loadFiles = (): FileItem[] => {
    return safeParse<FileItem[]>(localStorage.getItem(FILE_STORAGE_KEY), []);
};

const saveFiles = (files: FileItem[]) => {
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(files));
}

const loadFolders = (): FolderItem[] => {
    return safeParse<FolderItem[]>(localStorage.getItem(FOLDER_STORAGE_KEY), []);
};

const saveFolders = (folders: FolderItem[]) => {
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(folders));
};

export const dataStorage = {
    get files(): FileItem[] { return loadFiles(); },
    get folders(): FolderItem[] { return loadFolders(); },

    seed: () => {
        saveFiles(SEED_FILES);
        saveFolders(SEED_FOLDERS);
    },

    getFolderById: (folderId: string): FolderItem | undefined => {
        const folders = loadFolders();
        return folders.find((folder) => folder.id === folderId);
    },

    createFolder: (data: FolderCreateDto): FolderItem | undefined => {
        const folders = loadFolders();
        const subFolders = folders.filter((folder) => folder.parentId === data.parentId);

        if (subFolders.some((folder) => folder.name === data.name)) {
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
    },

    updateFolder: (folderId: string, data: FolderUpdateDto): FolderItem | undefined => {
        const folders = loadFolders();
        const folderToUpdate = folders.find((folder) => folder.id === folderId);
        if (!folderToUpdate) return;

        const parentArray = folders.filter((folder) => folder.parentId === folderToUpdate.parentId);
        if (parentArray.some((folder) => folder.name === data.name)) {
            alert(`A folder with name "${data.name}" already exists.`);
            return;
        }

        Object.assign(folderToUpdate, data, { modifiedAt: Date.now() });
        saveFolders(folders);
        return folderToUpdate;
    },

    deleteFolder: (folderId: string): boolean => {
        const folders = loadFolders();
        const newFolders = folders.filter((folder) => folder.id !== folderId);
        if (newFolders.length === folders.length) return false;
        saveFolders(newFolders);
        return true;
    },

    createFile: (data: FileCreateDto): FileItem | undefined => {
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

    updateFile: (fileId: string, data: FileUpdateDto): FileItem | undefined => {
        const files = loadFiles();
        const fileIndex = files.findIndex((f) => f.id === fileId);
        if (fileIndex === -1) return;

        files[fileIndex] = { ...files[fileIndex], ...data, modifiedAt: Date.now() };
        saveFiles(files);
        return files[fileIndex];
    },

    deleteFile: (fileId: string): boolean => {
        const files = loadFiles();
        const newFiles = files.filter((f) => f.id !== fileId);
        if (newFiles.length === files.length) return false;
        saveFiles(newFiles);
        return true;
    },
};