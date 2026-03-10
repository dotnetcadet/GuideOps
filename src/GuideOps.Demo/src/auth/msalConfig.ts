import { type Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '2fdee750-016a-4613-ab5b-5439b01d6a9c',
    authority: `https://login.microsoftonline.com/29967363-a86a-4ea6-8f76-29aa44ec6f27`, //${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    // storeAuthStateInCookie: false,
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
  scopes: [`api://2fdee750-016a-4613-ab5b-5439b01d6a9c/default`],
};

export const graphqlScopes = {
  scopes: [`api://2fdee750-016a-4613-ab5b-5439b01d6a9c/default`],
};
