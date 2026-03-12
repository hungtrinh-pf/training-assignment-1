/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/_grid.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/_grid.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants/index.ts");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage */ "./src/scripts/services/storage.ts");
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");



const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));
const spinner = document.getElementById("loading-spinner");
const showSpinner = () => spinner?.classList.remove("d-none");
const hideSpinner = () => spinner?.classList.add("d-none");
const getFolderPath = (folderId) => {
    const path = [];
    let currentId = folderId;
    while (currentId) {
        const folder = _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.getFolderById(currentId);
        if (!folder)
            break;
        path.unshift(folder);
        currentId = folder.parentId;
    }
    return path;
};
const renderBreadcrumb = (folderId) => {
    const breadcrumb = document.querySelector('.breadcrumb');
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
        }
        else if (folder.id !== "root") {
            breadcrumb.innerHTML += `
        <li class="breadcrumb-item">
          <a href="#/folder/${folder.id}">${folder.name}</a>
        </li>
      `;
        }
    }
};
const renderGrid = async (folderId) => {
    const tbody = document.querySelector('table.table tbody');
    if (!tbody)
        return;
    const h2 = document.querySelector('h2');
    if (!h2)
        return;
    // Simulate loading delay
    showSpinner();
    tbody.innerHTML = '';
    await delay(500);
    hideSpinner();
    renderBreadcrumb(folderId);
    let folders = [];
    let files = [];
    const currentFolder = _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.getFolderById(folderId ?? '');
    if (currentFolder) {
        h2.innerHTML = currentFolder.name;
        folders = _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.folders.filter(folder => folder.parentId === currentFolder.id);
        files = _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.files.filter(file => file.folderId === currentFolder.id);
    }
    else if (folderId && !currentFolder) {
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
const initRowSelection = (row) => {
    const checkbox = row.querySelector(".row-select");
    const actionsCell = row.querySelector(".row-actions");
    const tbody = document.querySelector("tbody");
    if (!checkbox || !actionsCell || !tbody)
        return;
    checkbox.addEventListener("change", () => {
        if (!checkbox.checked) {
            actionsCell.style.visibility = "hidden";
            return;
        }
        const allCheckboxes = tbody.querySelectorAll(".row-select");
        allCheckboxes.forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false;
                const otherRowActions = cb.closest("tr")?.querySelector(".row-actions");
                if (otherRowActions) {
                    otherRowActions.style.visibility = "hidden";
                }
            }
        });
        actionsCell.style.visibility = "visible";
    });
};
const createFolderRow = (folder) => {
    const currentFolderId = (0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
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
        if (!newName || !newName.trim())
            return;
        if ((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.hasInvalidChars)(newName)) {
            alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
            return;
        }
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.updateFolder(folder.id, {
            name: newName.trim(),
            modifiedBy: "You",
        });
        renderGrid(currentFolderId);
    });
    row.querySelector(".delete-folder")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (!confirm(`Delete folder "${folder.name}"?`))
            return;
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.deleteFolder(folder.id);
        renderGrid(currentFolderId);
    });
    initRowSelection(row);
    return row;
};
const createFileRow = (file) => {
    const fileExt = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="row-select-cell">
        <input type="checkbox" class="row-select" />
      </td>
      <td>
        ${_constants__WEBPACK_IMPORTED_MODULE_0__.FILE_EXT_MAP[fileExt]
        ? `<img src="src/icons/${_constants__WEBPACK_IMPORTED_MODULE_0__.FILE_EXT_MAP[fileExt]}">`
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
        if (!newName.trim())
            return;
        if ((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.hasInvalidChars)(newName)) {
            alert("Error: File name contains an invalid character: \\ / : * ? \" < > |");
            return;
        }
        const newFile = {
            name: newName.trim(),
            type: file.type,
            createdBy: "You",
            modifiedBy: "You",
        };
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.updateFile(file.id, newFile);
        renderGrid((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)());
    });
    row.querySelector(".delete-file")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (!confirm(`Delete file "${file.name}"?`))
            return;
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.deleteFile(file.id);
        renderGrid((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)());
    });
    initRowSelection(row);
    return row;
};
/* harmony default export */ __webpack_exports__["default"] = (renderGrid);


/***/ }),

/***/ "./src/scripts/constants/index.ts":
/*!****************************************!*\
  !*** ./src/scripts/constants/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE_EXT_MAP: function() { return /* binding */ FILE_EXT_MAP; },
/* harmony export */   FILE_STORAGE_KEY: function() { return /* binding */ FILE_STORAGE_KEY; },
/* harmony export */   FOLDER_STORAGE_KEY: function() { return /* binding */ FOLDER_STORAGE_KEY; },
/* harmony export */   SEED_FILES: function() { return /* binding */ SEED_FILES; },
/* harmony export */   SEED_FOLDERS: function() { return /* binding */ SEED_FOLDERS; }
/* harmony export */ });
const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";
const FILE_STORAGE_KEY = "trainingAssignment1.fileData";
const SEED_FOLDERS = [
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
const SEED_FILES = [
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
const FILE_EXT_MAP = {
    xlsx: "excel.svg",
    docx: "word.svg",
    pptx: "powerpoint.svg",
    md: "markdown.svg",
    pdf: "pdf.svg",
    txt: "text.svg",
};


/***/ }),

/***/ "./src/scripts/services/storage.ts":
/*!*****************************************!*\
  !*** ./src/scripts/services/storage.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataStorage: function() { return /* binding */ dataStorage; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants/index.ts");
/* harmony import */ var _utilities_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/_storage */ "./src/scripts/utilities/_storage.ts");


const loadFiles = () => {
    return (0,_utilities_storage__WEBPACK_IMPORTED_MODULE_1__.safeParse)(localStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FILE_STORAGE_KEY), []);
};
const saveFiles = (files) => {
    localStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FILE_STORAGE_KEY, JSON.stringify(files));
};
const loadFolders = () => {
    return (0,_utilities_storage__WEBPACK_IMPORTED_MODULE_1__.safeParse)(localStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FOLDER_STORAGE_KEY), []);
};
const saveFolders = (folders) => {
    localStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FOLDER_STORAGE_KEY, JSON.stringify(folders));
};
const dataStorage = {
    get files() { return loadFiles(); },
    get folders() { return loadFolders(); },
    seed: () => {
        saveFiles(_constants__WEBPACK_IMPORTED_MODULE_0__.SEED_FILES);
        saveFolders(_constants__WEBPACK_IMPORTED_MODULE_0__.SEED_FOLDERS);
    },
    getFolderById: (folderId) => {
        const folders = loadFolders();
        return folders.find((folder) => folder.id === folderId);
    },
    createFolder: (data) => {
        const folders = loadFolders();
        const subFolders = folders.filter((folder) => folder.parentId === data.parentId);
        if (subFolders.some((folder) => folder.name === data.name)) {
            alert(`A folder with name "${data.name}" already exists.`);
            return;
        }
        const newFolder = {
            id: (0,_utilities_storage__WEBPACK_IMPORTED_MODULE_1__.generateId)(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
            ...data,
        };
        folders.push(newFolder);
        saveFolders(folders);
        return newFolder;
    },
    updateFolder: (folderId, data) => {
        const folders = loadFolders();
        const folderToUpdate = folders.find((folder) => folder.id === folderId);
        if (!folderToUpdate)
            return;
        const parentArray = folders.filter((folder) => folder.parentId === folderToUpdate.parentId);
        if (parentArray.some((folder) => folder.name === data.name)) {
            alert(`A folder with name "${data.name}" already exists.`);
            return;
        }
        Object.assign(folderToUpdate, data, { modifiedAt: Date.now() });
        saveFolders(folders);
        return folderToUpdate;
    },
    deleteFolder: (folderId) => {
        const folders = loadFolders();
        const newFolders = folders.filter((folder) => folder.id !== folderId);
        if (newFolders.length === folders.length)
            return false;
        saveFolders(newFolders);
        return true;
    },
    createFile: (data) => {
        const files = loadFiles();
        const newFile = {
            ...data,
            id: (0,_utilities_storage__WEBPACK_IMPORTED_MODULE_1__.generateId)(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        };
        files.push(newFile);
        saveFiles(files);
        return newFile;
    },
    updateFile: (fileId, data) => {
        const files = loadFiles();
        const fileIndex = files.findIndex((f) => f.id === fileId);
        if (fileIndex === -1)
            return;
        files[fileIndex] = { ...files[fileIndex], ...data, modifiedAt: Date.now() };
        saveFiles(files);
        return files[fileIndex];
    },
    deleteFile: (fileId) => {
        const files = loadFiles();
        const newFiles = files.filter((f) => f.id !== fileId);
        if (newFiles.length === files.length)
            return false;
        saveFiles(newFiles);
        return true;
    },
};


/***/ }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentFolderId: function() { return /* binding */ getCurrentFolderId; },
/* harmony export */   hasInvalidChars: function() { return /* binding */ hasInvalidChars; },
/* harmony export */   ready: function() { return /* binding */ ready; }
/* harmony export */ });
const ready = (fn) => {
    if (document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
const hasInvalidChars = (str) => {
    const invalid = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"];
    return invalid.some(char => str.includes(char));
};
const getCurrentFolderId = () => {
    const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
    return match ? match[1] : "root";
};


/***/ }),

/***/ "./src/scripts/utilities/_storage.ts":
/*!*******************************************!*\
  !*** ./src/scripts/utilities/_storage.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateId: function() { return /* binding */ generateId; },
/* harmony export */   safeParse: function() { return /* binding */ safeParse; }
/* harmony export */ });
const safeParse = (value, fallback) => {
    if (!value)
        return fallback;
    try {
        return JSON.parse(value);
    }
    catch {
        return fallback;
    }
};
const generateId = () => {
    return crypto.randomUUID();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./src/scripts/pages/home-page.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/_grid */ "./src/scripts/components/_grid.ts");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage */ "./src/scripts/services/storage.ts");
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");




const renderCurrentFolder = () => {
    (0,_components_grid__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)());
};
const createNewFolder = () => {
    const currentFolderId = (0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
    const folderName = prompt("Folder name", "New folder");
    if (!folderName || !folderName.trim())
        return;
    if ((0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.hasInvalidChars)(folderName)) {
        alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
        return;
    }
    _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.createFolder({
        name: folderName.trim(),
        parentId: currentFolderId,
        createdBy: "You",
        modifiedBy: "You",
    });
    renderCurrentFolder();
};
(0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.ready)(() => {
    if (_services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.folders.length + _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.files.length === 0) {
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.seed();
    }
    renderCurrentFolder();
    window.addEventListener("hashchange", renderCurrentFolder);
    const newButton = document.querySelector("#button-new");
    newButton?.addEventListener("click", (e) => {
        e.preventDefault();
        createNewFolder();
    });
    const uploadInput = document.querySelector("#upload-input");
    const uploadButton = document.querySelector("#button-upload");
    uploadButton?.addEventListener("click", (e) => {
        e.preventDefault();
        uploadInput?.click();
    });
    uploadInput?.addEventListener("change", (e) => {
        const files = e.target.files;
        if (files.length === 0)
            return;
        const currentFolderId = (0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
        for (const file of files) {
            const fileMeta = {
                name: file.name,
                type: file.type,
                folderId: currentFolderId,
                createdBy: "You",
                modifiedBy: "You",
            };
            _services_storage__WEBPACK_IMPORTED_MODULE_1__.dataStorage.createFile(fileMeta);
        }
        renderCurrentFolder();
    });
});

}();
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
!function() {
/*!*****************************************!*\
  !*** ./src/styles/pages/home-page.scss ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=home-page.js.map