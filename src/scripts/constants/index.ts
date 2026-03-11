import { FolderItem } from "../models/folder";

export const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";

export const SEED_DATA: FolderItem = {
    id: "root",
    name: "Documents",
    subFolders: [
        {
            id: crypto.randomUUID(),
            name: "CAS",
            subFolders: [],
            files: [],
            createdAt: 1745995351000,
            createdBy: "Megan Bowen",
            modifiedAt: 1745995351000,
            modifiedBy: "Megan Bowen",
        }
    ],
    files: [
        {
            id: crypto.randomUUID(),
            name: "CoasterAndBargeLoading.xlsx",
            type: "excel",
            createdAt: Date.now(),
            createdBy: "Administrator MOD",
            modifiedAt: Date.now(),
            modifiedBy: "Administrator MOD",
        },
        {
            id: crypto.randomUUID(),
            name: "RevenueByServices.xlsx",
            type: "excel",
            createdAt: Date.now(),
            createdBy: "Administrator MOD",
            modifiedAt: Date.now(),
            modifiedBy: "Administrator MOD",
        },
        {
            id: crypto.randomUUID(),
            name: "RevenueByServices2016.xlsx",
            type: "excel",
            createdAt: Date.now(),
            createdBy: "Administrator MOD",
            modifiedAt: Date.now(),
            modifiedBy: "Administrator MOD",
        },
        {
            id: crypto.randomUUID(),
            name: "RevenueByServices2017.xlsx",
            type: "excel",
            createdAt: Date.now(),
            createdBy: "Administrator MOD",
            modifiedAt: Date.now(),
            modifiedBy: "Administrator MOD",
        },
    ],
    createdAt: Date.now(),
    createdBy: "You",
    modifiedAt: Date.now(),
    modifiedBy: "You"
};

export const FILE_EXT_MAP = {
    xlsx: "excel.svg",
    docx: "word.svg",
    pptx: "powerpoint.svg",
    md: "markdown.svg",
    pdf: "pdf.svg",
    txt: "text.svg",
};