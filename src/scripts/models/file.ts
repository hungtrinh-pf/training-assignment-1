export interface FileItem {
    id: string;
    name: string;
    type: string;
    folderId: string;
    createdAt: number;
    createdBy: string;
    modifiedAt: number;
    modifiedBy: string;
};

export type FileCreateDto = Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>;
export type FileUpdateDto = Omit<FileCreateDto, 'folderId'>;