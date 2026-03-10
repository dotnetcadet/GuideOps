import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import type { GuideOpsConfig } from '../types';

export function useApolloClient(config: GuideOpsConfig) {
  return useMemo(() => {
    const httpLink = new HttpLink({
      uri: config.apiUrl,
    });
    const authLink = new SetContextLink(async (prevContext) => {
      try {
        const token = await config.getAccessToken();
        return {
          ...prevContext,
          headers: {
            ...(prevContext.headers as Record<string, string>),
            authorization: `Bearer ${token}`,
          },
        };
      } catch {
        return prevContext;
      }
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: { fetchPolicy: 'cache-and-network' },
      },
    });
  }, [config]);
}
