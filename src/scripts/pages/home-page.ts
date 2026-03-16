import renderGrid from '../components/_grid';
import { dataStorage } from '../services/storage';
import { ready } from '../utilities/_helper';
import { getCurrentFolderId, hasInvalidChars } from '../utilities/_helper';
import { showAlert, showPrompt } from '../utilities/_modal';

const renderCurrentFolder = () => {
  renderGrid(getCurrentFolderId());
};

const createNewFolder = async () => {
  const currentFolderId = getCurrentFolderId();

  const folderName = await showPrompt("Folder name", "New folder", "New folder");
  if (typeof folderName !== "string" || !folderName.trim()) return;
  if (hasInvalidChars(folderName)) {
    showAlert("Folder name contains an invalid character: \\ / : * ? \" < > |", "Error");
    return;
  }

  dataStorage.createFolder({
    name: folderName.trim(),
    parentId: currentFolderId,
    createdBy: "You",
    modifiedBy: "You",
  });

  renderCurrentFolder();
};

ready(() => {
  if (dataStorage.folders.length + dataStorage.files.length === 0) {
    dataStorage.seed();
  }

  renderCurrentFolder();
  window.addEventListener("hashchange", renderCurrentFolder);

  const newButton = document.querySelector<HTMLAnchorElement>("#button-new");
  newButton?.addEventListener("click", (e) => {
    e.preventDefault();
    createNewFolder();
  });

  const uploadInput = document.querySelector<HTMLInputElement>("#upload-input");
  const uploadButton = document.querySelector<HTMLButtonElement>("#button-upload");
  uploadButton?.addEventListener("click", (e) => {
    e.preventDefault();
    uploadInput?.click();
  });
  uploadInput?.addEventListener("change", (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files.length === 0) return;

    const currentFolderId = getCurrentFolderId();
    for (const file of files) {
      const fileMeta = {
        name: file.name,
        type: file.type,
        folderId: currentFolderId,
        createdBy: "You",
        modifiedBy: "You",
      };
      dataStorage.createFile(fileMeta);
    }
    renderCurrentFolder();
  });
});
