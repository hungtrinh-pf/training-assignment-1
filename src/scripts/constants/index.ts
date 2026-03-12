import { FileItem } from "../models/file";
import { FolderItem } from "../models/folder";

export const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";
export const FILE_STORAGE_KEY = "trainingAssignment1.fileData";

export const SEED_FOLDERS: FolderItem[] = [
  {
    id: "root",
    name: "Documents",
    parentId: "",
    createdAt: Date.now(),
    createdBy: "You",
    modifiedAt: Date.now(),
    modifiedBy: "You"
  },
  {
    id: crypto.randomUUID(),
    name: "CAS",
    parentId: "root",
    createdAt: 1745995351000,
    createdBy: "Megan Bowen",
    modifiedAt: 1745995351000,
    modifiedBy: "Megan Bowen",
  },
];

export const SEED_FILES: FileItem[] = [
  {
    id: crypto.randomUUID(),
    name: "CoasterAndBargeLoading.xlsx",
    type: "excel",
    folderId: "root",
    createdAt: Date.now(),
    createdBy: "Administrator MOD",
    modifiedAt: Date.now(),
    modifiedBy: "Administrator MOD",
  },
  {
    id: crypto.randomUUID(),
    name: "RevenueByServices.xlsx",
    type: "excel",
    folderId: "root",
    createdAt: Date.now(),
    createdBy: "Administrator MOD",
    modifiedAt: Date.now(),
    modifiedBy: "Administrator MOD",
  },
  {
    id: crypto.randomUUID(),
    name: "RevenueByServices2016.xlsx",
    type: "excel",
    folderId: "root",
    createdAt: Date.now(),
    createdBy: "Administrator MOD",
    modifiedAt: Date.now(),
    modifiedBy: "Administrator MOD",
  },
  {
    id: crypto.randomUUID(),
    name: "RevenueByServices2017.xlsx",
    type: "excel",
    folderId: "root",
    createdAt: Date.now(),
    createdBy: "Administrator MOD",
    modifiedAt: Date.now(),
    modifiedBy: "Administrator MOD",
  },
];

export const FILE_EXT_MAP = {
  xlsx: "excel.svg",
  docx: "word.svg",
  pptx: "powerpoint.svg",
  md: "markdown.svg",
  pdf: "pdf.svg",
  txt: "text.svg",
};