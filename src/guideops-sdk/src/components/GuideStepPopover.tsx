import { useEffect, useState, useRef } from 'react';
import type { GuideStep } from '../types';

interface GuideStepPopoverProps {
  step: GuideStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

type Side = 'top' | 'bottom' | 'left' | 'right';

/**
 * Popover that renders near a target element identified by the step's
 * elementSelector (CSS selector — id or class).  Falls back to center-screen
 * if the target element is not found.
 */
export function GuideStepPopover({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  onClose,
}: GuideStepPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [resolvedSide, setResolvedSide] = useState<Side>('bottom');
  const [centered, setCentered] = useState(false);

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  useEffect(() => {
    const calculate = () => {
      if (!step.elementSelector) {
        setCentered(true);
        return;
      }

      const target = document.querySelector(step.elementSelector);
      if (!target) {
        setCentered(true);
        return;
      }

      setCentered(false);
      const rect = target.getBoundingClientRect();
      const popover = popoverRef.current;
      const popoverWidth = popover?.offsetWidth ?? 320;
      const popoverHeight = popover?.offsetHeight ?? 200;
      const gap = 16;

      const preferred: Side = (['top', 'bottom', 'left', 'right'].includes(step.side)
        ? step.side
        : 'bottom') as Side;

      const placements: Record<Side, { top: number; left: number }> = {
        bottom: {
          top: rect.bottom + gap,
          left: rect.left + rect.width / 2 - popoverWidth / 2,
        },
        top: {
          top: rect.top - popoverHeight - gap,
          left: rect.left + rect.width / 2 - popoverWidth / 2,
        },
        right: {
          top: rect.top + rect.height / 2 - popoverHeight / 2,
          left: rect.right + gap,
        },
        left: {
          top: rect.top + rect.height / 2 - popoverHeight / 2,
          left: rect.left - popoverWidth - gap,
        },
      };

      // Try preferred side first, then fall through
      const order: Side[] = [preferred, 'bottom', 'top', 'right', 'left'];
      const seen = new Set<Side>();

      for (const side of order) {
        if (seen.has(side)) continue;
        seen.add(side);

        const pos = placements[side];
        const fitsVertically = pos.top >= 0 && pos.top + popoverHeight <= window.innerHeight;
        const fitsHorizontally = pos.left >= 0 && pos.left + popoverWidth <= window.innerWidth;

        if (fitsVertically && fitsHorizontally) {
          // Clamp to viewport
          setPosition({
            top: Math.max(8, Math.min(pos.top, window.innerHeight - popoverHeight - 8)),
            left: Math.max(8, Math.min(pos.left, window.innerWidth - popoverWidth - 8)),
          });
          setResolvedSide(side);
          return;
        }
      }

      // Nothing fits perfectly — use preferred side but clamp
      const fallback = placements[preferred];
      setPosition({
        top: Math.max(8, Math.min(fallback.top, window.innerHeight - popoverHeight - 8)),
        left: Math.max(8, Math.min(fallback.left, window.innerWidth - popoverWidth - 8)),
      });
      setResolvedSide(preferred);
    };

    // Run once after initial render so we have popover dimensions
    requestAnimationFrame(calculate);

    window.addEventListener('resize', calculate);
    window.addEventListener('scroll', calculate, true);
    return () => {
      window.removeEventListener('resize', calculate);
      window.removeEventListener('scroll', calculate, true);
    };
  }, [step]);

  const style: React.CSSProperties = centered
    ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    : position
      ? { position: 'fixed', top: position.top, left: position.left }
      : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  return (
    <div
      ref={popoverRef}
      className={`guideops-step-popover guideops-step-popover--${resolvedSide}`}
      style={style}
    >
      {/* Arrow */}
      {!centered && position && <div className={`guideops-step-arrow guideops-step-arrow--${resolvedSide}`} />}

      <div className="guideops-step-header">
        <span className="guideops-step-progress">
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <button className="guideops-step-close" onClick={onClose} aria-label="Close guide">
          &times;
        </button>
      </div>

      <div className="guideops-step-body">
        <h3 className="guideops-step-title">{step.title}</h3>
        <p className="guideops-step-description">{step.description}</p>
      </div>

      <div className="guideops-step-footer">
        {!isFirst && (
          <button className="guideops-step-btn guideops-step-btn--secondary" onClick={onPrev}>
            Previous
          </button>
        )}
        <button className="guideops-step-btn guideops-step-btn--primary" onClick={onNext}>
          {isLast ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  );
}
