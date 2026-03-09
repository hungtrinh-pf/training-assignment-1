import renderGrid from '../components/_grid';
import { folderStorage } from '../services/storage';
import ready from '../utilities/_helper';

const getCurrentFolderId = (): string | undefined => {
  const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
  return match ? match[1] : undefined;
}

const renderCurrentFolder = () => {
  const folderId = getCurrentFolderId();
  renderGrid(folderId);
}

const createNewFolder = () => {
  const folderName = prompt("Folder name", "New folder");
  if (!folderName.trim()) return;

  folderStorage.createFolder({
    name: folderName.trim(),
    files: [],
    subFolders: [],
    createdBy: "You",
    modifiedBy: "You",
  });

  renderCurrentFolder();
};

ready(() => {
  renderCurrentFolder();
  window.addEventListener("hashchange", renderCurrentFolder);

  const newButton = document.querySelector<HTMLAnchorElement>("#button-new");
  newButton?.addEventListener("click", (e) => {
    e.preventDefault();
    createNewFolder();
  });
});
