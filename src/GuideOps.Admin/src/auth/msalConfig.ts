import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'YOUR_ADMIN_CLIENT_ID',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || 'YOUR_TENANT_ID'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
      },
      logLevel: LogLevel.Error,
    },
  },
};

export const loginRequest = {
  scopes: [`api://${import.meta.env.VITE_API_CLIENT_ID || 'YOUR_API_CLIENT_ID'}/access_as_user`],
};

export const graphqlScopes = {
  scopes: [`api://${import.meta.env.VITE_API_CLIENT_ID || 'YOUR_API_CLIENT_ID'}/access_as_user`],
};
