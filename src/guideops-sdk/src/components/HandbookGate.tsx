import { useState, type ReactNode } from 'react';
import { useHandbookAcknowledgment } from '../hooks/useHandbookAcknowledgment';
import { HandbookModal } from './HandbookModal';

interface HandbookGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

/**
 * Blocks rendering of children until all assigned handbooks are acknowledged.
 * Shows handbooks one at a time. Once all are acknowledged, children render normally.
 *
 * Usage:
 * ```tsx
 * <GuideOpsProvider config={config}>
 *   <HandbookGate fallback={<Spinner />}>
 *     <YourAppContent />
 *   </HandbookGate>
 * </GuideOpsProvider>
 * ```
 */
export function HandbookGate({ children, fallback, loadingComponent }: HandbookGateProps) {
  const { pendingHandbooks, isLoading, acknowledge, hasAllAcknowledged } = useHandbookAcknowledgment();
  const [isAcknowledging, setIsAcknowledging] = useState(false);

  if (isLoading) {
    return <>{loadingComponent || fallback || <DefaultLoading />}</>;
  }

  if (hasAllAcknowledged) {
    return <>{children}</>;
  }

  const currentHandbook = pendingHandbooks[0];
  if (!currentHandbook) {
    return <>{children}</>;
  }

  const handleAcknowledge = async () => {
    setIsAcknowledging(true);
    try {
      await acknowledge(currentHandbook.id);
    } finally {
      setIsAcknowledging(false);
    }
  };

  return (
    <HandbookModal
      handbook={currentHandbook}
      onAcknowledge={handleAcknowledge}
      isAcknowledging={isAcknowledging}
    />
  );
}

function DefaultLoading() {
  return (
    <div className="guideops-loading">
      <div className="guideops-spinner" />
      <p>Loading...</p>
    </div>
  );
}
