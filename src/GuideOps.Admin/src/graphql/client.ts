import { useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { graphqlScopes } from '../auth/msalConfig';

const API_URL = import.meta.env.VITE_API_URL || '/graphql';

export function useApolloClient() {
  const { instance, accounts } = useMsal();
  const account = accounts[0] ?? null;

  return useMemo(() => {
    const httpLink = createHttpLink({ uri: API_URL });

    const authLink = setContext(async (_, { headers }) => {
      if (!account) return { headers };

      try {
        const response = await instance.acquireTokenSilent({
          ...graphqlScopes,
          account,
        });
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${response.accessToken}`,
          },
        };
      } catch {
        return { headers };
      }
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: { fetchPolicy: 'cache-and-network' },
      },
    });
  }, [instance, account]);
}
