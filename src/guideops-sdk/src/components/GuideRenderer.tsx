import { useEffect, useRef } from 'react';
import { useGuides } from '../hooks/useGuides';
import { GuideOverlay } from './GuideOverlay';
import { GuideStepPopover } from './GuideStepPopover';

interface GuideRendererProps {
  autoStart?: boolean;
}

/**
 * Renders assigned guides as positioned step popovers with an overlay.
 * If autoStart is true, automatically launches the highest priority guide.
 */
export function GuideRenderer({ autoStart = false }: GuideRendererProps) {
  const { guides, startGuide, activeGuide, currentStepIndex, nextStep, prevStep, closeGuide } =
    useGuides();
  const hasAutoStarted = useRef(false);

  useEffect(() => {
    if (autoStart && guides.length > 0 && !activeGuide && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      const timer = setTimeout(() => {
        startGuide(guides[0].id);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, guides, activeGuide, startGuide]);

  if (!activeGuide) return null;

  const sortedSteps = activeGuide.steps.slice().sort((a, b) => a.stepOrder - b.stepOrder);
  const currentStep = sortedSteps[currentStepIndex];

  if (!currentStep) return null;

  return (
    <>
      <GuideOverlay targetSelector={currentStep.elementSelector || undefined} />
      <GuideStepPopover
        step={currentStep}
        stepIndex={currentStepIndex}
        totalSteps={sortedSteps.length}
        onNext={nextStep}
        onPrev={prevStep}
        onClose={closeGuide}
      />
    </>
  );
}
