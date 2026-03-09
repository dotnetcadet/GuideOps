import { cacheExchange, createClient, fetchExchange } from 'urql';

const API_URL = import.meta.env.VITE_API_URL || '/graphql';

export const urqlClient = createClient({
  url: API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    // In production, acquire token from MSAL before each request:
    // const token = await msalInstance.acquireTokenSilent(graphqlScopes);
    // return { headers: { authorization: `Bearer ${token.accessToken}` } };
    return {};
  },
});
