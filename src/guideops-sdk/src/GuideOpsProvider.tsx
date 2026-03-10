import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createGuideOpsClient, type GuideOpsClient } from './services/guideOpsClient';
import { ApolloProvider } from '@apollo/client/react';
import type { GuideOpsConfig } from './types';
import { useApolloClient } from './hooks/useApolloClient';

interface GuideOpsContextValue {
  client: GuideOpsClient;
  config: GuideOpsConfig;
}

const GuideOpsContext = createContext<GuideOpsContextValue | null>(null);

export function useGuideOpsContext(): GuideOpsContextValue {
  const ctx = useContext(GuideOpsContext);
  if (!ctx) {
    throw new Error('useGuideOpsContext must be used within a <GuideOpsProvider>');
  }
  return ctx;
}

interface GuideOpsProviderProps {
  config: GuideOpsConfig;
  children: ReactNode;
}

export function GuideOpsProvider({ config, children }: GuideOpsProviderProps) {
  const apolloClient = useApolloClient(config);

  const value = useMemo(() => ({
    client: createGuideOpsClient(apolloClient),
    config,
  }), [apolloClient, config]);

  return (
    <GuideOpsContext.Provider value={value}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </GuideOpsContext.Provider>
  );
}
