import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { useGuideOpsContext } from '../GuideOpsProvider';

export function useApolloClient() {
   const { config } = useGuideOpsContext();

  return useMemo(() => {
    const httpLink = new HttpLink({ 
      uri: config.userId,

    })
    const authLink = new SetContextLink(async ({ headers }) => {
      try {
        const response = config.getAccessToken()
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${response}`,
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
  }, [config]);
}