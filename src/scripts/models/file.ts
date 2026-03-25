export interface FileItem {
  id: string;
  name: string;
  type: string;
  folderId: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
  content: File;
};

export interface FileCreateDto {
  folderId: string;
  createdBy: string;
  modifiedBy: string;
  content: File;
};

export interface FileUpdateDto {
  name: string;
  modifiedBy: string;
};