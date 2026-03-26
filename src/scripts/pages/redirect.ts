import { broadcastResponseToMainFrame } from '@azure/msal-browser/redirect-bridge';
import { ready } from '../utilities/_helper';

ready(() => {
  broadcastResponseToMainFrame().catch((error) => {
    console.error('Error broadcasting response:', error);
  });
});