import * as msal from '@azure/msal-browser';
import renderGrid from '../components/_grid';
import { auth } from '../services/auth';
import { dataStorage } from '../services/storage';
import msalConfig from '../utilities/_auth';
import { getCurrentFolderId, hasInvalidChars, ready } from '../utilities/_helper';
import { showAlert, showPrompt } from '../utilities/_modal';

const renderCurrentFolder = () => {
  renderGrid(getCurrentFolderId());
};

const createNewFolder = async () => {
  if (!auth.isAuthenticated()) {
    showAlert("Please log in to perform this action.", "Authentication required");
    return;
  }

  const folderName = await showPrompt("Folder name", "New folder", "New folder");
  if (typeof folderName !== "string" || !folderName.trim()) return;
  if (hasInvalidChars(folderName)) {
    showAlert("Folder name contains an invalid character: \\ / : * ? \" < > |", "Error");
    return;
  }

  dataStorage.createFolder({
    name: folderName.trim(),
    parentId: getCurrentFolderId(),
    createdBy: auth.getUsername(),
    modifiedBy: auth.getUsername(),
  }).catch(error => showAlert(error, "Error"));

  renderCurrentFolder();
};

const handleFileUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files.length === 0) return;

  const currentFolderId = getCurrentFolderId();
  for (const file of files) {
    const fileMeta = {
      folderId: currentFolderId,
      createdBy: auth.getUsername(),
      modifiedBy: auth.getUsername(),
      content: file,
    };
    dataStorage.createFile(fileMeta).catch(error => showAlert(error, "Error"));
  }
  renderCurrentFolder();
};

ready(async () => {
  const pca = await msal.createNestablePublicClientApplication(msalConfig);
  const signedAccounts = pca.getAllAccounts();
  const currentAccount = signedAccounts[0];

  if (currentAccount) {
    auth.setUsername(currentAccount.name);
  }

  renderCurrentFolder();
  window.addEventListener("hashchange", renderCurrentFolder);

  document.getElementById("login-btn")?.addEventListener("click", async () => {
    const requestConfig = { scopes: [`api://${process.env.API_CLIENT_ID}/.default`] };
    try {
      if (currentAccount) {
        pca.acquireTokenSilent(requestConfig).then(res => auth.login(res.accessToken));
      } else {
        pca.loginPopup(requestConfig).then(res => auth.login(res.accessToken));
      }
    } catch (error) {
      showAlert(error.message);
    }
  });

  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    auth.logout();
    await pca.logoutRedirect({ account: currentAccount });
  });

  const newButton = document.querySelector<HTMLAnchorElement>("#button-new");
  newButton?.addEventListener("click", createNewFolder);

  const uploadInput = document.querySelector<HTMLInputElement>("#upload-input");
  const uploadButton = document.querySelector<HTMLAnchorElement>("#button-upload");

  uploadButton?.addEventListener("click", () => {
    if (!auth.isAuthenticated()) {
      showAlert("Please log in to perform this action.", "Authentication required");
      return;
    }
    uploadInput?.click();
  });
  
  uploadInput?.addEventListener("change", handleFileUpload);
});
