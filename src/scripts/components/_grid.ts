import { FolderItem } from "../models/folder";
import { folderStorage, rootFileStorage } from "../services/storage";

const renderGrid = (folderId?: string) => {
  const tbody = document.querySelector<HTMLTableSectionElement>('table.table tbody');
  if (!tbody) return;

  let folders = [];
  let files = [];

  const currentFolder = folderStorage.getFolderById(folderId ?? '');
  if (currentFolder) {
    folders = currentFolder.subFolders;
    files = currentFolder.files;
  } else {
    folders = folderStorage.getFolders();
    files = rootFileStorage.getRootFiles();
  }

  tbody.innerHTML = '';

  folders.forEach(folder => {
    const row = createFolderRow(folder);
    tbody.appendChild(row);
  });

  files.forEach(file => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td></td>
      <td>${file.name}</a></td>
      <td>${new Date(file.modifiedAt).toLocaleString()}</td>
      <td>${file.modifiedBy}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  });
};

const createFolderRow = (folder: FolderItem) => {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td><i class="ms-Icon ms-Icon--FabricFolderFill"></i></td>
      <td>${folder.name}</a></td>
      <td>${new Date(folder.modifiedAt).toLocaleString()}</td>
      <td>${folder.modifiedBy}</td>
      <td></td>
      <td>
        <a href="#" class="rename-folder me-2"><i class="ms-Icon ms-Icon--Edit"></i></a>
        <a href="#" class="delete-folder"><i class="ms-Icon ms-Icon--Delete"></i></a>
      </td>
    `;

  row.addEventListener("click", (e) => {
    e.preventDefault();
    navigateFolder(folder.id);
  });

  row.querySelector(".rename-folder")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newName = prompt("Rename folder", folder.name);
    if (!newName.trim()) return;

    folderStorage.updateFolder(folder.id, {
      name: newName.trim(),
      modifiedBy: "You",
    });
    const folderMatch = window.location.hash.match(/^#\/folder\/([^/]+)/);
    renderGrid(folderMatch[1]);
  });

  row.querySelector(".delete-folder")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete folder "${folder.name}"?`)) return;
    
    folderStorage.deleteFolder(folder.id);
    const folderMatch = window.location.hash.match(/^#\/folder\/([^/]+)/);
    renderGrid(folderMatch[1]);
  })

  return row;
};

export const navigateFolder = (folderId: string) => {
  const hash = `#/folder/${folderId}`;
  window.location.hash = hash;
  renderGrid(folderId);
}

export default renderGrid;
