import { FILE_EXT_MAP } from "../constants";
import { FileItem } from "../models/file";
import { FolderItem } from "../models/folder";
import { folderStorage } from "../services/storage";
import { getCurrentFolderId, hasInvalidChars } from "../utilities/_helper";

const delay = (ms = 250) => new Promise<void>(resolve => setTimeout(resolve, ms));

const spinner = document.getElementById("loading-spinner");
const showSpinner = () => spinner?.classList.remove("d-none");
const hideSpinner = () => spinner?.classList.add("d-none");

const getFolderPath = (folderId?: string): FolderItem[] => {
  if (!folderId) return [];
  const path: FolderItem[] = [];
  const walk = (folders: FolderItem[], parents: FolderItem[]): boolean => {
    for (const f of folders) {
      const nextParents = [...parents, f];
      if (f.id === folderId) {
        path.push(...nextParents);
        return true;
      }
      if (walk(f.subFolders, nextParents)) return true;
    }
    return false;
  };
  walk(folderStorage.folders, []);
  return path;
};

const renderBreadcrumb = (folderId?: string) => {
  const breadcrumb = document.querySelector<HTMLOListElement>('.breadcrumb');
  if (folderId === "root") {
    breadcrumb.style.display = "none";
    return;
  }

  breadcrumb.style.display = "";
  breadcrumb.innerHTML = `<li class="breadcrumb-item"><a href="#">Documents</a></li>`;
  const folderPath = getFolderPath(folderId);
  for (const folder of folderPath) {
    if (folder.id === folderId) {
      breadcrumb.innerHTML += `
        <li class="breadcrumb-item active" aria-current="page">
          ${folder.name}
        </li>
      `;
    } else if (folder.id !== "root") {
      breadcrumb.innerHTML += `
        <li class="breadcrumb-item">
          <a href="#/folder/${folder.id}">${folder.name}</a>
        </li>
      `;
    }
  }
};

const renderGrid = async (folderId?: string) => {
  const tbody = document.querySelector('table.table tbody');
  if (!tbody) return;

  const h2 = document.querySelector('h2');
  if (!h2) return;

  // Simulate loading delay
  showSpinner();
  tbody.innerHTML = '';
  await delay(500);
  hideSpinner();

  renderBreadcrumb(folderId);
  let folders: FolderItem[] = [];
  let files: FileItem[] = [];

  const currentFolder = folderStorage.getFolderById(folderId ?? '');
  if (currentFolder) {
    h2.innerHTML = currentFolder.name;
    folders = currentFolder.subFolders;
    files = currentFolder.files;
  } else if (folderId && !currentFolder) {
    h2.innerHTML = "Folder not found";
  }

  folders.forEach(folder => {
    const row = createFolderRow(folder);
    tbody.appendChild(row);
  });

  files.forEach(file => {
    const row = createFileRow(file);
    tbody.appendChild(row);
  });
};

const initRowSelection = (row: HTMLTableRowElement) => {
  const checkbox = row.querySelector<HTMLInputElement>(".row-select");
  const actionsCell = row.querySelector<HTMLTableCellElement>(".row-actions");
  const tbody = document.querySelector("tbody");
  if (!checkbox || !actionsCell || !tbody) return;

  checkbox.addEventListener("change", () => {
    if (!checkbox.checked) {
      actionsCell.style.visibility = "hidden";
      return;
    }

    const allCheckboxes = tbody.querySelectorAll<HTMLInputElement>(".row-select");
    allCheckboxes.forEach(cb => {
      if (cb !== checkbox) {
        cb.checked = false;
        const otherRowActions = cb.closest("tr")?.querySelector<HTMLTableCellElement>(".row-actions");
        if (otherRowActions) {
          otherRowActions.style.visibility = "hidden";
        }
      }
    });

    actionsCell.style.visibility = "visible";
  });
};

const createFolderRow = (folder: FolderItem) => {
  const currentFolderId = getCurrentFolderId();

  const row = document.createElement('tr');
  row.innerHTML = `
      <td class="row-select-cell">
        <input type="checkbox" class="row-select" />
      </td>
      <td><i class="ms-Icon ms-Icon--FabricFolderFill"></i></td>
      <td><a href="#/folder/${folder.id}">${folder.name}</a></td>
      <td>${new Date(folder.modifiedAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</td>
      <td>${folder.modifiedBy}</td>
      <td></td>
      <td>
        <div class="row-actions" style="visibility: hidden;">
          <a href="#" class="rename-folder me-2"><i class="ms-Icon ms-Icon--Edit"></i></a>
          <a href="#" class="delete-folder"><i class="ms-Icon ms-Icon--Delete"></i></a>
        </div>
      </td>
    `;

  row.querySelector(".rename-folder")?.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = prompt("Rename folder", folder.name);
    if (!newName || !newName.trim()) return;
    if (hasInvalidChars(newName)) {
      alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
      return;
    }

    folderStorage.updateFolder(folder.id, {
      name: newName.trim(),
      modifiedBy: "You",
    });
    renderGrid(currentFolderId);
  });

  row.querySelector(".delete-folder")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (!confirm(`Delete folder "${folder.name}"?`)) return;

    folderStorage.deleteFolder(folder.id);
    renderGrid(currentFolderId);
  });

  initRowSelection(row);
  return row;
};

const createFileRow = (file: FileItem) => {
  const fileExt = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase() as keyof typeof FILE_EXT_MAP;

  const row = document.createElement('tr');
  row.innerHTML = `
      <td class="row-select-cell">
        <input type="checkbox" class="row-select" />
      </td>
      <td>
        ${FILE_EXT_MAP[fileExt]
      ? `<img src="src/icons/${FILE_EXT_MAP[fileExt]}">`
      : `<i class="ms-Icon ms-Icon--Page"></i>`}
      </td>
      <td>${file.name}</td>
      <td>${new Date(file.modifiedAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</td>
      <td>${file.modifiedBy}</td>
      <td></td>
      <td>
        <div class="row-actions" style="visibility: hidden;">
          <a href="#" class="rename-file me-2"><i class="ms-Icon ms-Icon--Edit"></i></a>
          <a href="#" class="delete-file"><i class="ms-Icon ms-Icon--Delete"></i></a>
        </div>
      </td>
    `;

  row.querySelector(".rename-file")?.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = prompt("Rename file", file.name);
    if (!newName.trim()) return;
    if (hasInvalidChars(newName)) {
      alert("Error: File name contains an invalid character: \\ / : * ? \" < > |");
      return;
    }

    const newFile = {
      name: newName.trim(),
      type: file.type,
      createdBy: "You",
      modifiedBy: "You",
    };

    const folderId = getCurrentFolderId();
    folderStorage.updateFile(folderId, file.id, newFile);
    renderGrid(folderId);
  });

  row.querySelector(".delete-file")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (!confirm(`Delete file "${file.name}"?`)) return;

    const folderId = getCurrentFolderId();
    folderStorage.deleteFile(folderId, file.id);
    renderGrid(folderId);
  });

  initRowSelection(row);
  return row;
};

export default renderGrid;
