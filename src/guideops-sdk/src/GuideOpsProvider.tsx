import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { createGuideOpsClient, type GuideOpsClient } from './services/guideOpsClient';
import type { GuideOpsConfig, Guide } from './types';

interface GuideOpsContextValue {
  client: GuideOpsClient;
  config: GuideOpsConfig;
  guides: Guide[];
  isLoading: boolean;
  error: Error | null;
  activeGuide: Guide | null;
  currentStepIndex: number;
  startGuide: (guideId: number) => void;
  dismissGuide: (guideId: number) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  closeGuide: () => void;
  refresh: () => Promise<void>;
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
  const client = useMemo(() => createGuideOpsClient(config), [config]);
  const userId = config.userId || '';

  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const fetchGuides = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      setError(null);
      const result = await client.getAssignedGuides(userId, config.schoolYear);
      setGuides(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch guides'));
    } finally {
      setIsLoading(false);
    }
  }, [client, userId, config.schoolYear]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const startGuide = useCallback((guideId: number) => {
    const guide = guides.find((g) => g.id === guideId);
    if (!guide) return;
    setActiveGuide(guide);
    setCurrentStepIndex(0);
  }, [guides]);

  const closeGuide = useCallback(() => {
    if (!activeGuide) return;
    const guideId = activeGuide.id;
    setActiveGuide(null);
    setCurrentStepIndex(0);
    client.recordGuideCompletion(userId, guideId).then(() => {
      setGuides((prev) => prev.filter((g) => g.id !== guideId));
    });
  }, [activeGuide, client, userId]);

  const nextStep = useCallback(() => {
    if (!activeGuide) return;
    const sortedSteps = activeGuide.steps.slice().sort((a, b) => a.stepOrder - b.stepOrder);
    if (currentStepIndex < sortedSteps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      closeGuide();
    }
  }, [activeGuide, currentStepIndex, closeGuide]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  const dismissGuide = useCallback(async (guideId: number) => {
    if (!userId) return;
    await client.recordGuideCompletion(userId, guideId);
    setGuides((prev) => prev.filter((g) => g.id !== guideId));
  }, [client, userId]);

  const value = useMemo(() => ({
    client,
    config,
    guides,
    isLoading,
    error,
    activeGuide,
    currentStepIndex,
    startGuide,
    dismissGuide,
    nextStep,
    prevStep,
    closeGuide,
    refresh: fetchGuides,
  }), [client, config, guides, isLoading, error, activeGuide, currentStepIndex, startGuide, dismissGuide, nextStep, prevStep, closeGuide, fetchGuides]);

  return (
    <GuideOpsContext.Provider value={value}>
      {children}
    </GuideOpsContext.Provider>
  );
}
