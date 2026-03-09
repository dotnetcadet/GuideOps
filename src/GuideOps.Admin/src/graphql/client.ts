import { useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import { createClient, cacheExchange, fetchExchange, type Client } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import type { IPublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { graphqlScopes } from '../auth/msalConfig';

const API_URL = import.meta.env.VITE_API_URL || '/graphql';

function createMsalAuthExchange(msalInstance: IPublicClientApplication, account: AccountInfo | null) {
  return authExchange(async (utils) => {
    return {
      addAuthToOperation(operation) {
        if (!account) return operation;
        // Token is fetched in getAuth and stored; willAuthError triggers refresh
        const token = sessionStorage.getItem('guideops_access_token');
        if (!token) return operation;
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${token}`,
        });
      },
      didAuthError(error) {
        return error.response?.status === 401;
      },
      willAuthError() {
        // Check if we have a cached token
        return !sessionStorage.getItem('guideops_access_token');
      },
      async refreshAuth() {
        if (!account) return;
        try {
          const response = await msalInstance.acquireTokenSilent({
            ...graphqlScopes,
            account,
          });
          sessionStorage.setItem('guideops_access_token', response.accessToken);
        } catch {
          // Silent acquisition failed — trigger interactive login
          await msalInstance.acquireTokenRedirect(graphqlScopes);
        }
      },
    };
  });
}

export function useUrqlClient(): Client {
  const { instance, accounts } = useMsal();
  const account = accounts[0] ?? null;

  return useMemo(() => {
    return createClient({
      url: API_URL,
      exchanges: [
        cacheExchange,
        createMsalAuthExchange(instance, account),
        fetchExchange,
      ],
    });
  }, [instance, account]);
}
