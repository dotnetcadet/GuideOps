import { useState, useEffect, useCallback, useRef } from 'react';
import { driver, type DriveStep, type Driver } from 'driver.js';
import { useGuideOpsContext } from '../GuideOpsProvider';
import type { Guide } from '../types';

export interface UseGuidesReturn {
  guides: Guide[];
  isLoading: boolean;
  error: Error | null;
  startGuide: (guideId: number) => void;
  dismissGuide: (guideId: number) => Promise<void>;
  activeGuide: Guide | null;
  refresh: () => Promise<void>;
}

export function useGuides(): UseGuidesReturn {
  const { client, config } = useGuideOpsContext();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const driverRef = useRef<Driver | null>(null);

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

  // Cleanup driver instance on unmount
  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  const startGuide = useCallback((guideId: number) => {
    const guide = guides.find((g) => g.id === guideId);
    if (!guide) return;

    setActiveGuide(guide);

    const steps: DriveStep[] = guide.steps
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .map((step) => ({
        element: step.elementSelector || undefined,
        popover: {
          title: step.title,
          description: step.description,
          side: step.side as DriveStep['popover'] extends { side?: infer S } ? S : never,
        },
      }));

    // Destroy previous instance if exists
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    const driverInstance = driver({
      showProgress: true,
      steps,
      onDestroyed: () => {
        setActiveGuide(null);
        // Record completion
        client.recordGuideCompletion(userId, guideId).then(() => {
          setGuides((prev) => prev.filter((g) => g.id !== guideId));
        });
      },
    });

    driverRef.current = driverInstance;
    driverInstance.drive();
  }, [guides, client, userId]);

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
    refresh: fetchGuides,
  };
}
