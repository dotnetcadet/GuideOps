import { JSX } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare interface Acknowledgment {
    id: number;
    handbookId: number;
    acknowledgedAt: string;
}

export declare interface Guide {
    id: number;
    title: string;
    description: string;
    type: string;
    priority: number;
    steps: GuideStep[];
}

export declare interface GuideOpsConfig {
    apiUrl: string;
    getAccessToken: () => Promise<string>;
    schoolYear: string;
    userId?: string;
}

export declare function GuideOpsProvider({ config, children }: GuideOpsProviderProps): JSX.Element;

declare interface GuideOpsProviderProps {
    config: GuideOpsConfig;
    children: ReactNode;
}

/**
 * Renders assigned guides using driver.js.
 * If autoStart is true, automatically launches the highest priority guide.
 * Can also be controlled imperatively via the useGuides() hook.
 */
export declare function GuideRenderer({ autoStart }: GuideRendererProps): null;

declare interface GuideRendererProps {
    autoStart?: boolean;
}

export declare interface GuideStep {
    id: number;
    stepOrder: number;
    elementSelector: string;
    title: string;
    description: string;
    side: string;
    pageUrl: string | null;
}

export declare interface Handbook {
    id: number;
    title: string;
    contentUrl: string | null;
    contentHtml: string | null;
    schoolYear: string;
    requiresAcknowledgment: boolean;
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
export declare function HandbookGate({ children, fallback, loadingComponent }: HandbookGateProps): JSX.Element;

declare interface HandbookGateProps {
    children: ReactNode;
    fallback?: ReactNode;
    loadingComponent?: ReactNode;
}

export declare function HandbookModal({ handbook, onAcknowledge, isAcknowledging }: HandbookModalProps): JSX.Element;

declare interface HandbookModalProps {
    handbook: Handbook;
    onAcknowledge: () => void;
    isAcknowledging: boolean;
}

export declare function useGuides(): UseGuidesReturn;

export declare interface UseGuidesReturn {
    guides: Guide[];
    isLoading: boolean;
    error: Error | null;
    startGuide: (guideId: number) => void;
    dismissGuide: (guideId: number) => Promise<void>;
    activeGuide: Guide | null;
    refresh: () => Promise<void>;
}

export declare function useHandbookAcknowledgment(): UseHandbookAcknowledgmentReturn;

export declare interface UseHandbookAcknowledgmentReturn {
    pendingHandbooks: Handbook[];
    isLoading: boolean;
    error: Error | null;
    acknowledge: (handbookId: number) => Promise<void>;
    hasAllAcknowledged: boolean;
    refresh: () => Promise<void>;
}

export { }
