const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    redirectUri: "http://localhost:5500/redirect.html",
    postLogoutRedirectUri: "http://localhost:5500",
  }
};

export default msalConfig;