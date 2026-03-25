export interface FolderItem {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
};

export type FolderCreateDto = Omit<FolderItem, 'id' | 'createdAt' | 'modifiedAt'>;
export type FolderUpdateDto = {
  name: string;
  modifiedBy: string;
};