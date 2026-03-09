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
}