import { FileItem } from "./file";

export interface FolderItem {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  subfolders: FolderItem[];
  files: FileItem[];
};

export type FolderCreateDto = {
  name: string;
  parentId: string;
  createdBy: string;
  modifiedBy: string;
}

export type FolderUpdateDto = {
  name: string;
  modifiedBy: string;
};