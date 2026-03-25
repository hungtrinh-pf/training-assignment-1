import { FILE_ENDPOINT, FOLDER_ENDPOINT } from "../constants";
import { FileCreateDto, FileItem, FileUpdateDto } from "../models/file";
import { FolderCreateDto, FolderItem, FolderUpdateDto } from "../models/folder";
import { fetchJson, fetchNoData } from "../utilities/_storage";

export const dataStorage = {
  getFiles: async () => await fetchJson(FILE_ENDPOINT) as FileItem[],
  getFolders: async () => await fetchJson(FOLDER_ENDPOINT) as FolderItem[],

  getFolderById: async (folderId: string) => {
    return await fetchJson(`${FOLDER_ENDPOINT}?id=${folderId}`) as FolderItem;
  },

  createFolder: async (data: FolderCreateDto) => {
    return await fetchNoData(FOLDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  },

  updateFolder: async (folderId: string, data: FolderUpdateDto) => {
    return await fetchNoData(`${FOLDER_ENDPOINT}?id=${folderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  },

  deleteFolder: async (folderId: string) => {
    return await fetchNoData(`${FOLDER_ENDPOINT}?id=${folderId}`, { method: "DELETE" });
  },

  createFile: async (data: FileCreateDto) => {
    const uploadForm = new FormData();

    uploadForm.append("folderId", data.folderId);
    uploadForm.append("createdBy", data.createdBy);
    uploadForm.append("modifiedBy", data.modifiedBy);
    uploadForm.append("file", data.content);

    return await fetchNoData(FILE_ENDPOINT, { method: "POST", body: uploadForm });
  },

  updateFile: async (fileId: string, data: FileUpdateDto) => {
    return await fetchNoData(`${FILE_ENDPOINT}?id=${fileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  },

  deleteFile: async (fileId: string) => {
    return await fetchNoData(`${FILE_ENDPOINT}?id=${fileId}`, { method: "DELETE" });
  },
};