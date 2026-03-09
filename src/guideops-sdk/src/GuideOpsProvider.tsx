import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createGuideOpsClient, type GuideOpsClient } from './services/guideOpsClient';
import type { GuideOpsConfig } from './types';

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
  const value = useMemo(() => ({
    client: createGuideOpsClient(config.apiUrl, config.getAccessToken),
    config,
  }), [config]);

  return (
    <GuideOpsContext.Provider value={value}>
      {children}
    </GuideOpsContext.Provider>
  );
}
