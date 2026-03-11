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
/* harmony import */ var _utilities_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/_methods */ "./src/scripts/utilities/_methods.ts");



const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));
const spinner = document.getElementById("loading-spinner");
const showSpinner = () => spinner?.classList.remove("d-none");
const hideSpinner = () => spinner?.classList.add("d-none");
const getFolderPath = (folderId) => {
    if (!folderId)
        return [];
    const path = [];
    const walk = (folders, parents) => {
        for (const f of folders) {
            const nextParents = [...parents, f];
            if (f.id === folderId) {
                path.push(...nextParents);
                return true;
            }
            if (walk(f.subFolders, nextParents))
                return true;
        }
        return false;
    };
    walk(_services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.folders, []);
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
    const currentFolder = _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.getFolderById(folderId ?? '');
    if (currentFolder) {
        h2.innerHTML = currentFolder.name;
        folders = currentFolder.subFolders;
        files = currentFolder.files;
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
    const currentFolderId = (0,_utilities_methods__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
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
        if ((0,_utilities_methods__WEBPACK_IMPORTED_MODULE_2__.hasInvalidChars)(newName)) {
            alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
            return;
        }
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.updateFolder(folder.id, {
            name: newName.trim(),
            modifiedBy: "You",
        });
        renderGrid(currentFolderId);
    });
    row.querySelector(".delete-folder")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (!confirm(`Delete folder "${folder.name}"?`))
            return;
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.deleteFolder(folder.id);
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
        if ((0,_utilities_methods__WEBPACK_IMPORTED_MODULE_2__.hasInvalidChars)(newName)) {
            alert("Error: File name contains an invalid character: \\ / : * ? \" < > |");
            return;
        }
        const newFile = {
            name: newName.trim(),
            type: file.type,
            createdBy: "You",
            modifiedBy: "You",
        };
        const folderId = (0,_utilities_methods__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.updateFile(folderId, file.id, newFile);
        renderGrid(folderId);
    });
    row.querySelector(".delete-file")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (!confirm(`Delete file "${file.name}"?`))
            return;
        const folderId = (0,_utilities_methods__WEBPACK_IMPORTED_MODULE_2__.getCurrentFolderId)();
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.deleteFile(folderId, file.id);
        renderGrid(folderId);
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
/* harmony export */   FOLDER_STORAGE_KEY: function() { return /* binding */ FOLDER_STORAGE_KEY; },
/* harmony export */   SEED_DATA: function() { return /* binding */ SEED_DATA; }
/* harmony export */ });
const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";
const SEED_DATA = {
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
/* harmony export */   folderStorage: function() { return /* binding */ folderStorage; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants/index.ts");

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
const loadFolders = () => {
    return safeParse(localStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FOLDER_STORAGE_KEY), []);
};
const saveFolders = (folders) => {
    localStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_0__.FOLDER_STORAGE_KEY, JSON.stringify(folders));
};
const walkFolders = (folders, fn) => {
    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        if (fn(folder, folders, i))
            return true;
        if (walkFolders(folder.subFolders, fn))
            return true;
    }
    return false;
};
const folderStorage = {
    get folders() { return loadFolders(); },
    seed: () => saveFolders([_constants__WEBPACK_IMPORTED_MODULE_0__.SEED_DATA]),
    getFolderById: (folderId) => {
        const folders = loadFolders();
        const stack = [...folders];
        while (stack.length) {
            const current = stack.pop();
            if (current?.id === folderId)
                return current;
            if (current)
                stack.push(...current.subFolders);
        }
        return undefined;
    },
    createFolder: (data, parentId) => {
        const folders = loadFolders();
        let createdFolder;
        walkFolders(folders, (folder) => {
            if (folder.id !== parentId)
                return false;
            if (folder.subFolders.some(folder => folder.name === data.name)) {
                alert(`A folder with name "${data.name}" already exists.`);
                return true;
            }
            const newFolder = {
                id: generateId(),
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                ...data,
            };
            folder.subFolders.push(newFolder);
            folder.modifiedAt = Date.now();
            createdFolder = newFolder;
            return true;
        });
        if (createdFolder)
            saveFolders(folders);
        return createdFolder;
    },
    updateFolder: (folderId, data) => {
        const folders = loadFolders();
        let updatedFolder;
        walkFolders(folders, (folder, parentArray) => {
            if (folder.id !== folderId)
                return false;
            if (parentArray.some(folder => folder.name === data.name)) {
                alert(`A folder with name "${data.name}" already exists.`);
                return true;
            }
            Object.assign(folder, data, { modifiedAt: Date.now() });
            updatedFolder = folder;
            return true;
        });
        if (updatedFolder)
            saveFolders(folders);
        return updatedFolder;
    },
    deleteFolder: (folderId) => {
        const folders = loadFolders();
        let deleted = false;
        walkFolders(folders, (_, parentArray, index) => {
            if (parentArray[index].id !== folderId)
                return false;
            parentArray.splice(index, 1);
            deleted = true;
            return true;
        });
        if (deleted)
            saveFolders(folders);
        return deleted;
    },
    createFile: (folderId, data) => {
        const folders = loadFolders();
        let createdFile;
        walkFolders(folders, (folder) => {
            if (folder.id !== folderId)
                return false;
            const newFile = {
                ...data,
                id: generateId(),
                createdAt: Date.now(),
                modifiedAt: Date.now(),
            };
            folder.files.push(newFile);
            folder.modifiedAt = Date.now();
            createdFile = newFile;
            return true;
        });
        if (createdFile)
            saveFolders(folders);
        return createdFile;
    },
    updateFile: (folderId, fileId, data) => {
        const folders = loadFolders();
        let updatedFile;
        walkFolders(folders, (folder) => {
            if (folder.id !== folderId)
                return false;
            const fileIndex = folder.files.findIndex(f => f.id === fileId);
            if (fileIndex === -1)
                return false;
            folder.files[fileIndex] = { ...folder.files[fileIndex], ...data, modifiedAt: Date.now() };
            folder.modifiedAt = Date.now();
            updatedFile = folder.files[fileIndex];
            return true;
        });
        if (updatedFile)
            saveFolders(folders);
        return updatedFile;
    },
    deleteFile: (folderId, fileId) => {
        const folders = loadFolders();
        let deleted = false;
        walkFolders(folders, (folder) => {
            if (folder.id !== folderId)
                return false;
            const newFiles = folder.files.filter(f => f.id !== fileId);
            if (newFiles.length === folder.files.length)
                return false;
            folder.files = newFiles;
            folder.modifiedAt = Date.now();
            deleted = true;
            return true;
        });
        if (deleted)
            saveFolders(folders);
        return deleted;
    },
};


/***/ }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const ready = (fn) => {
    if (document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (ready);


/***/ }),

/***/ "./src/scripts/utilities/_methods.ts":
/*!*******************************************!*\
  !*** ./src/scripts/utilities/_methods.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentFolderId: function() { return /* binding */ getCurrentFolderId; },
/* harmony export */   hasInvalidChars: function() { return /* binding */ hasInvalidChars; }
/* harmony export */ });
const hasInvalidChars = (str) => {
    const invalid = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"];
    return invalid.some(char => str.includes(char));
};
const getCurrentFolderId = () => {
    const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
    return match ? match[1] : "root";
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
/* harmony import */ var _utilities_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/_methods */ "./src/scripts/utilities/_methods.ts");




const renderCurrentFolder = () => {
    (0,_components_grid__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_utilities_methods__WEBPACK_IMPORTED_MODULE_3__.getCurrentFolderId)());
};
const createNewFolder = () => {
    const currentFolderId = (0,_utilities_methods__WEBPACK_IMPORTED_MODULE_3__.getCurrentFolderId)();
    const folderName = prompt("Folder name", "New folder");
    if (!folderName || !folderName.trim())
        return;
    if ((0,_utilities_methods__WEBPACK_IMPORTED_MODULE_3__.hasInvalidChars)(folderName)) {
        alert("Error: Folder name contains an invalid character: \\ / : * ? \" < > |");
        return;
    }
    _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.createFolder({
        name: folderName.trim(),
        files: [],
        subFolders: [],
        createdBy: "You",
        modifiedBy: "You",
    }, currentFolderId);
    renderCurrentFolder();
};
(0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__["default"])(() => {
    const rootFolder = _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.folders[0];
    if (!rootFolder || rootFolder.subFolders.length + rootFolder.files.length === 0) {
        _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.seed();
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
        const currentFolderId = (0,_utilities_methods__WEBPACK_IMPORTED_MODULE_3__.getCurrentFolderId)();
        for (const file of files) {
            const fileMeta = {
                name: file.name,
                type: file.type,
                createdBy: "You",
                modifiedBy: "You",
            };
            _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.createFile(currentFolderId, fileMeta);
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