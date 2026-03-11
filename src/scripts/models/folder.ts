import { FileItem } from "./file";

export interface FolderItem {
    id: string;
    name: string;
    files: FileItem[];
    subFolders: FolderItem[];
    createdAt: number;
    createdBy: string;
    modifiedAt: number;
    modifiedBy: string;
};

export type FolderCreateDto = Omit<FolderItem, 'id' | 'createdAt' | 'modifiedAt'>;
export type FolderUpdateDto = Partial<Omit<FolderItem, 'id' | 'createdAt'>>;