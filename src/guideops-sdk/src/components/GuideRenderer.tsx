import { useEffect, useRef } from 'react';
import { useGuides } from '../hooks/useGuides';

interface GuideRendererProps {
  autoStart?: boolean;
}

/**
 * Renders assigned guides using driver.js.
 * If autoStart is true, automatically launches the highest priority guide.
 * Can also be controlled imperatively via the useGuides() hook.
 */
export function GuideRenderer({ autoStart = false }: GuideRendererProps) {
  const { guides, startGuide, activeGuide } = useGuides();
  const hasAutoStarted = useRef(false);

  useEffect(() => {
    if (autoStart && guides.length > 0 && !activeGuide && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      // Small delay to let the DOM settle
      const timer = setTimeout(() => {
        startGuide(guides[0].id);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, guides, activeGuide, startGuide]);

  // This component doesn't render anything visible — driver.js manages its own overlay
  return null;
}
