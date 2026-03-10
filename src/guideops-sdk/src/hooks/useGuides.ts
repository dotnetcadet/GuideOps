import { useState, useEffect, useCallback } from 'react';
import { useGuideOpsContext } from '../GuideOpsProvider';
import type { Guide } from '../types';

export interface UseGuidesReturn {
  guides: Guide[];
  isLoading: boolean;
  error: Error | null;
  startGuide: (guideId: number) => void;
  dismissGuide: (guideId: number) => Promise<void>;
  activeGuide: Guide | null;
  currentStepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  closeGuide: () => void;
  refresh: () => Promise<void>;
}

export function useGuides(): UseGuidesReturn {
  const { client, config } = useGuideOpsContext();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const userId = config.userId || '';

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

  return {
    guides,
    isLoading,
    error,
    startGuide,
    dismissGuide,
    activeGuide,
    currentStepIndex,
    nextStep,
    prevStep,
    closeGuide,
    refresh: fetchGuides,
  };
}
