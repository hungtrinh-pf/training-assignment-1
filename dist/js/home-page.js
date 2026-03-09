/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/_grid.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/_grid.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navigateFolder: function() { return /* binding */ navigateFolder; }
/* harmony export */ });
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/storage */ "./src/scripts/services/storage.ts");

const renderGrid = (folderId) => {
    const tbody = document.querySelector('table.table tbody');
    if (!tbody)
        return;
    let folders = [];
    let files = [];
    const currentFolder = _services_storage__WEBPACK_IMPORTED_MODULE_0__.folderStorage.getFolderById(folderId ?? '');
    if (currentFolder) {
        folders = currentFolder.subFolders;
        files = currentFolder.files;
    }
    else {
        folders = _services_storage__WEBPACK_IMPORTED_MODULE_0__.folderStorage.getFolders();
        files = _services_storage__WEBPACK_IMPORTED_MODULE_0__.rootFileStorage.getRootFiles();
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
const createFolderRow = (folder) => {
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
        if (!newName.trim())
            return;
        _services_storage__WEBPACK_IMPORTED_MODULE_0__.folderStorage.updateFolder(folder.id, {
            name: newName.trim(),
            modifiedBy: "You",
        });
        const folderMatch = window.location.hash.match(/^#\/folder\/([^/]+)/);
        renderGrid(folderMatch[1]);
    });
    row.querySelector(".delete-folder")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm(`Delete folder "${folder.name}"?`))
            return;
        _services_storage__WEBPACK_IMPORTED_MODULE_0__.folderStorage.deleteFolder(folder.id);
        const folderMatch = window.location.hash.match(/^#\/folder\/([^/]+)/);
        renderGrid(folderMatch[1]);
    });
    return row;
};
const navigateFolder = (folderId) => {
    const hash = `#/folder/${folderId}`;
    window.location.hash = hash;
    renderGrid(folderId);
};
/* harmony default export */ __webpack_exports__["default"] = (renderGrid);


/***/ }),

/***/ "./src/scripts/services/storage.ts":
/*!*****************************************!*\
  !*** ./src/scripts/services/storage.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   folderStorage: function() { return /* binding */ folderStorage; },
/* harmony export */   rootFileStorage: function() { return /* binding */ rootFileStorage; }
/* harmony export */ });
const ROOT_FILE_STORAGE_KEY = "trainingAssignment1.rootFileData";
const FOLDER_STORAGE_KEY = "trainingAssignment1.folderData";
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
const loadFiles = () => {
    return safeParse(localStorage.getItem(ROOT_FILE_STORAGE_KEY), []);
};
const loadFolders = () => {
    return safeParse(localStorage.getItem(FOLDER_STORAGE_KEY), []);
};
const saveFiles = (files) => {
    localStorage.setItem(ROOT_FILE_STORAGE_KEY, JSON.stringify(files));
};
const saveFolders = (folders) => {
    localStorage.setItem(FOLDER_STORAGE_KEY, JSON.stringify(folders));
};
const rootFileStorage = {
    getRootFiles: () => {
        return loadFiles();
    },
    createRootFile: (data) => {
        const files = loadFiles();
        const newFile = {
            ...data,
            id: generateId(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        };
        files.push(newFile);
        saveFiles(files);
        return newFile;
    },
    updateRootFile: (fileId, data) => {
        const files = loadFiles();
        const fileIndex = files.findIndex(f => f.id === fileId);
        if (fileIndex === -1)
            return undefined;
        files[fileIndex] = { ...files[fileIndex], ...data, modifiedAt: Date.now() };
        saveFiles(files);
        return files[fileIndex];
    },
    deleteRootFile: (fileId) => {
        const files = loadFiles();
        const newFiles = files.filter(f => f.id !== fileId);
        if (newFiles.length === files.length)
            return false;
        saveFiles(newFiles);
        return true;
    },
};
const folderStorage = {
    getFolders: () => {
        return loadFolders();
    },
    getFolderById: (folderId) => {
        const folders = loadFolders();
        return folders.find(f => f.id === folderId);
    },
    createFolder: (data) => {
        const folders = loadFolders();
        const newFolder = {
            id: generateId(),
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
        const folderIndex = folders.findIndex(f => f.id === folderId);
        if (folderIndex === -1)
            return undefined;
        folders[folderIndex] = { ...folders[folderIndex], ...data, modifiedAt: Date.now() };
        saveFolders(folders);
        return folders[folderIndex];
    },
    deleteFolder: (folderId) => {
        const folders = loadFolders();
        const newFolders = folders.filter(f => f.id !== folderId);
        if (newFolders.length === folders.length)
            return false;
        saveFolders(newFolders);
        return true;
    },
    createFile: (folderId, data) => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder)
            return undefined;
        const newFile = {
            ...data,
            id: generateId(),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        };
        folder.files.push(newFile);
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return newFile;
    },
    updateFile: (folderId, fileId, data) => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder)
            return undefined;
        const fileIndex = folder.files.findIndex(f => f.id === fileId);
        if (fileIndex === -1)
            return undefined;
        folder.files[fileIndex] = { ...folder.files[fileIndex], ...data, modifiedAt: Date.now() };
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return folder.files[fileIndex];
    },
    deleteFile: (folderId, fileId) => {
        const folders = loadFolders();
        const folder = folders.find(f => f.id === folderId);
        if (!folder)
            return false;
        const newFiles = folder.files.filter(f => f.id !== fileId);
        if (newFiles.length === folder.files.length)
            return false;
        folder.files = newFiles;
        folder.modifiedAt = Date.now();
        saveFolders(folders);
        return true;
    },
    // TODO: Handle nested folder read/update/delete
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



const getCurrentFolderId = () => {
    const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
    return match ? match[1] : undefined;
};
const renderCurrentFolder = () => {
    const folderId = getCurrentFolderId();
    (0,_components_grid__WEBPACK_IMPORTED_MODULE_0__["default"])(folderId);
};
const createNewFolder = () => {
    const folderName = prompt("Folder name", "New folder");
    if (!folderName.trim())
        return;
    _services_storage__WEBPACK_IMPORTED_MODULE_1__.folderStorage.createFolder({
        name: folderName.trim(),
        files: [],
        subFolders: [],
        createdBy: "You",
        modifiedBy: "You",
    });
    renderCurrentFolder();
};
(0,_utilities_helper__WEBPACK_IMPORTED_MODULE_2__["default"])(() => {
    renderCurrentFolder();
    window.addEventListener("hashchange", renderCurrentFolder);
    const newButton = document.querySelector("#button-new");
    newButton?.addEventListener("click", (e) => {
        e.preventDefault();
        createNewFolder();
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