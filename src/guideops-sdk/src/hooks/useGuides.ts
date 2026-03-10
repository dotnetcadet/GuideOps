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
  const ctx = useGuideOpsContext();
  return {
    guides: ctx.guides,
    isLoading: ctx.isLoading,
    error: ctx.error,
    startGuide: ctx.startGuide,
    dismissGuide: ctx.dismissGuide,
    activeGuide: ctx.activeGuide,
    currentStepIndex: ctx.currentStepIndex,
    nextStep: ctx.nextStep,
    prevStep: ctx.prevStep,
    closeGuide: ctx.closeGuide,
    refresh: ctx.refresh,
  };
}
