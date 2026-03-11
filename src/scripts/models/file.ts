export interface FileItem {
    id: string;
    name: string;
    type: string;
    createdAt: number;
    createdBy: string;
    modifiedAt: number;
    modifiedBy: string;
};

export type FileCreateUpdateDto = Omit<FileItem, 'id' | 'createdAt' | 'modifiedAt'>;