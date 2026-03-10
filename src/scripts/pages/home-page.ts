import renderGrid from '../components/_grid';
import { folderStorage, rootFileStorage } from '../services/storage';
import ready from '../utilities/_helper';

const getCurrentFolderId = (): string | undefined => {
  const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
  return match ? match[1] : undefined;
}

const renderCurrentFolder = async () => {
  renderGrid(getCurrentFolderId());
}

const createNewFolder = () => {
  const currentFolderId = getCurrentFolderId();

  const folderName = prompt("Folder name", "New folder");
  if (!folderName || !folderName.trim()) return;

  folderStorage.createFolder({
    name: folderName.trim(),
    files: [],
    subFolders: [],
    createdBy: "You",
    modifiedBy: "You",
  }, currentFolderId);

  renderCurrentFolder();
};

ready(async () => {
  if (rootFileStorage.rootFiles.length === 0) {
    rootFileStorage.seed();
  }
  if (folderStorage.folders.length === 0) {
    folderStorage.seed();
  }

  await renderCurrentFolder();
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
        createdBy: "You",
        modifiedBy: "You",
      };
  
      if (currentFolderId) {
        folderStorage.createFile(currentFolderId, fileMeta);
      } else {
        rootFileStorage.createRootFile(fileMeta);
      }
    }

    renderCurrentFolder();
  });
});
