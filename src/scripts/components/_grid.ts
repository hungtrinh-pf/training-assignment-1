import { FILE_ENDPOINT, FILE_EXT_MAP } from "../constants";
import { FileItem } from "../models/file";
import { FolderItem } from "../models/folder";
import { auth } from "../services/auth";
import { dataStorage } from "../services/storage";
import { getCurrentFolderId, hasInvalidChars } from "../utilities/_helper";
import { showAlert, showConfirm, showPrompt } from "../utilities/_modal";

const getFolderPath = async (folderId?: string) => {
  const path: FolderItem[] = [];
  let currentId = folderId;

  while (currentId) {
    const folder = await dataStorage.getFolderById(currentId);
    if (!folder) break;
    path.unshift(folder);
    currentId = folder.parentId;
  }

  return path;
};

const renderBreadcrumb = async (folderId?: string) => {
  const breadcrumb = document.querySelector<HTMLOListElement>('.breadcrumb');
  if (folderId === "root") {
    breadcrumb.style.display = "none";
    return;
  }

  breadcrumb.style.display = "";
  breadcrumb.innerHTML = `<li class="breadcrumb-item"><a href="">Documents</a></li>`;

  const folderPath = await getFolderPath(folderId);
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
  if (auth.isAuthenticated()) {
    document.getElementById("logout-btn").classList.remove("d-none");
    document.getElementById("login-btn").classList.add("d-none");
    document.getElementById("acc-name").innerText = auth.getUsername();
  }

  const tbody = document.querySelector('table.table tbody');
  if (!tbody) return;

  const h2 = document.querySelector('h2');
  if (!h2) return;

  tbody.innerHTML = '';
  renderBreadcrumb(folderId);
  let folders: FolderItem[] = [];
  let files: FileItem[] = [];

  const currentFolder = await dataStorage.getFolderById(folderId ?? 'root');

  if (currentFolder) {
    h2.innerHTML = currentFolder.name;
    folders = currentFolder.subfolders;
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
          <a href="" class="rename-folder me-2"><i class="ms-Icon ms-Icon--Edit"></i></a>
          <a href="" class="delete-folder"><i class="ms-Icon ms-Icon--Delete"></i></a>
        </div>
      </td>
    `;

  row.querySelector(".rename-folder")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const newName = await showPrompt("New name:", folder.name, "Rename folder");
    if (typeof newName !== "string" || !newName.trim()) return;
    if (hasInvalidChars(newName)) {
      showAlert("Folder name contains an invalid character: \\ / : * ? \" < > |", "Error");
      return;
    }

    dataStorage.updateFolder(folder.id, {
      name: newName.trim(),
      modifiedBy: auth.getUsername(),
    }).catch(error => showAlert(error, "Error"));

    renderGrid(currentFolderId);
  });

  row.querySelector(".delete-folder")?.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!(await showConfirm(`Delete folder "${folder.name}"?`))) return;

    dataStorage.deleteFolder(folder.id).catch(error => showAlert(error, "Error"));
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
          <a href="" class="download-file me-2"><i class="ms-Icon ms-Icon--Download"></i></a>
          <a href="" class="rename-file me-2"><i class="ms-Icon ms-Icon--Edit"></i></a>
          <a href="" class="delete-file"><i class="ms-Icon ms-Icon--Delete"></i></a>
        </div>
      </td>
    `;

  row.querySelector(".download-file")?.addEventListener("click", async (e) => {
    e.preventDefault();

    fetch(`${FILE_ENDPOINT}/${file.id}`, {
      headers: {
        "Authorization": `Bearer ${auth.getToken()}`
      }
    }).then(res => res.ok ? res.blob() : Promise.reject("Cannot download file"))
      .then(blob => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = file.name,

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch((msg) => showAlert(msg, "Error"));
  });

  row.querySelector(".rename-file")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const newName = await showPrompt("New name:", file.name, "Rename file");
    if (typeof newName !== "string" || !newName.trim()) return;
    if (hasInvalidChars(newName)) {
      showAlert("File name contains an invalid character: \\ / : * ? \" < > |", "Error");
      return;
    }

    const newFile = {
      name: newName.trim(),
      type: file.type,
      createdBy: auth.getUsername(),
      modifiedBy: auth.getUsername(),
    };

    dataStorage.updateFile(file.id, newFile);
    renderGrid(getCurrentFolderId());
  });

  row.querySelector(".delete-file")?.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!(await showConfirm(`Delete file "${file.name}"?`))) return;

    dataStorage.deleteFile(file.id);
    renderGrid(getCurrentFolderId());
  });

  initRowSelection(row);
  return row;
};

export default renderGrid;
