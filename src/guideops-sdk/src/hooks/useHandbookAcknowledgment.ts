import { useState, useEffect, useCallback } from 'react';
import { useGuideOpsContext } from '../GuideOpsProvider';
import type { Handbook } from '../types';

export interface UseHandbookAcknowledgmentReturn {
  pendingHandbooks: Handbook[];
  isLoading: boolean;
  error: Error | null;
  acknowledge: (handbookId: number) => Promise<void>;
  hasAllAcknowledged: boolean;
  refresh: () => Promise<void>;
}

export function useHandbookAcknowledgment(): UseHandbookAcknowledgmentReturn {
  const { client, config } = useGuideOpsContext();
  const [pendingHandbooks, setPendingHandbooks] = useState<Handbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const userId = config.userId || '';

  const fetchPending = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      setError(null);
      const handbooks = await client.getPendingHandbooks(userId, config.schoolYear);
      setPendingHandbooks(handbooks);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch handbooks'));
    } finally {
      setIsLoading(false);
    }
  }, [client, userId, config.schoolYear]);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const acknowledge = useCallback(async (handbookId: number) => {
    if (!userId) return;
    try {
      await client.recordAcknowledgment(userId, handbookId, config.schoolYear);
      setPendingHandbooks((prev) => prev.filter((h) => h.id !== handbookId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to record acknowledgment'));
      throw err;
    }
  }, [client, userId, config.schoolYear]);

  return {
    pendingHandbooks,
    isLoading,
    error,
    acknowledge,
    hasAllAcknowledged: !isLoading && pendingHandbooks.length === 0,
    refresh: fetchPending,
  };
}
