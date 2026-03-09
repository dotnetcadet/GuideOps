// Core Provider
export { GuideOpsProvider } from './GuideOpsProvider';

// Hooks
export { useHandbookAcknowledgment } from './hooks/useHandbookAcknowledgment';
export { useGuides } from './hooks/useGuides';

// Components
export { HandbookGate } from './components/HandbookGate';
export { HandbookModal } from './components/HandbookModal';
export { GuideRenderer } from './components/GuideRenderer';

// Types
export type { GuideOpsConfig, Guide, GuideStep, Handbook, Acknowledgment } from './types';
export type { UseHandbookAcknowledgmentReturn } from './hooks/useHandbookAcknowledgment';
export type { UseGuidesReturn } from './hooks/useGuides';

// Styles — import separately: import '@guideops/sdk/styles'
import './styles/guideops.css';
