import type { Handbook } from '../types';

interface HandbookModalProps {
  handbook: Handbook;
  onAcknowledge: () => void;
  isAcknowledging: boolean;
}

export function HandbookModal({ handbook, onAcknowledge, isAcknowledging }: HandbookModalProps) {
  return (
    <div className="guideops-modal-overlay">
      <div className="guideops-modal">
        <div className="guideops-modal-header">
          <h2 className="guideops-modal-title">{handbook.title}</h2>
          <p className="guideops-modal-subtitle">
            Please read and acknowledge the following before continuing.
          </p>
        </div>

        <div className="guideops-modal-content">
          {handbook.contentUrl ? (
            <iframe
              src={handbook.contentUrl}
              title={handbook.title}
              className="guideops-modal-iframe"
            />
          ) : handbook.contentHtml ? (
            <div
              className="guideops-modal-html"
              dangerouslySetInnerHTML={{ __html: handbook.contentHtml }}
            />
          ) : (
            <p className="guideops-modal-empty">No content available for this handbook.</p>
          )}
        </div>

        <div className="guideops-modal-footer">
          <button
            onClick={onAcknowledge}
            disabled={isAcknowledging}
            className="guideops-acknowledge-btn"
          >
            {isAcknowledging ? 'Processing...' : 'I Acknowledge'}
          </button>
        </div>
      </div>
    </div>
  );
}
