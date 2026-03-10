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
 * Full-screen overlay that highlights a target element by cutting it out.
 * Uses four absolutely-positioned rectangles around the target so the
 * target element remains clickable.
 */
export declare function GuideOverlay({ targetSelector, onClick }: GuideOverlayProps): JSX.Element;

declare interface GuideOverlayProps {
    targetSelector?: string;
    onClick?: () => void;
}

/**
 * Renders assigned guides as positioned step popovers with an overlay.
 * If autoStart is true, automatically launches the highest priority guide.
 */
export declare function GuideRenderer({ autoStart }: GuideRendererProps): JSX.Element | null;

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

/**
 * Popover that renders near a target element identified by the step's
 * elementSelector (CSS selector — id or class).  Falls back to center-screen
 * if the target element is not found.
 */
export declare function GuideStepPopover({ step, stepIndex, totalSteps, onNext, onPrev, onClose, }: GuideStepPopoverProps): JSX.Element;

declare interface GuideStepPopoverProps {
    step: GuideStep;
    stepIndex: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
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
    currentStepIndex: number;
    nextStep: () => void;
    prevStep: () => void;
    closeGuide: () => void;
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
