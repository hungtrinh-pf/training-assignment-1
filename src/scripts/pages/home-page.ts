import renderGrid from '../components/_grid';
import { dataStorage } from '../services/storage';
import { ready } from '../utilities/_helper';
import { getCurrentFolderId, hasInvalidChars } from '../utilities/_helper';

const renderCurrentFolder = () => {
  renderGrid(getCurrentFolderId());
};

const createNewFolder = () => {
  const currentFolderId = getCurrentFolderId();

  const folderName = prompt("Folder name", "New folder");
  if (!folderName || !folderName.trim()) return;
  if (hasInvalidChars(folderName)) {
    alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
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
