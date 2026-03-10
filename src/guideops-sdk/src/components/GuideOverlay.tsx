import { useEffect, useState } from 'react';

interface GuideOverlayProps {
  targetSelector?: string;
  onClick?: () => void;
}

/**
 * Full-screen overlay that highlights a target element by cutting it out.
 * Uses four absolutely-positioned rectangles around the target so the
 * target element remains clickable.
 */
export function GuideOverlay({ targetSelector, onClick }: GuideOverlayProps) {
  const [cutout, setCutout] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!targetSelector) {
      setCutout(null);
      return;
    }

    const updatePosition = () => {
      const el = document.querySelector(targetSelector);
      if (el) {
        setCutout(el.getBoundingClientRect());
      } else {
        setCutout(null);
      }
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [targetSelector]);

  if (!cutout) {
    // No target found — render a simple full overlay
    return <div className="guideops-overlay" onClick={onClick} />;
  }

  const padding = 8;
  const top = cutout.top - padding;
  const left = cutout.left - padding;
  const width = cutout.width + padding * 2;
  const height = cutout.height + padding * 2;

  return (
    <>
      {/* Top */}
      <div
        className="guideops-overlay-segment"
        style={{ top: 0, left: 0, right: 0, height: Math.max(0, top) }}
        onClick={onClick}
      />
      {/* Bottom */}
      <div
        className="guideops-overlay-segment"
        style={{ top: top + height, left: 0, right: 0, bottom: 0 }}
        onClick={onClick}
      />
      {/* Left */}
      <div
        className="guideops-overlay-segment"
        style={{ top, left: 0, width: Math.max(0, left), height }}
        onClick={onClick}
      />
      {/* Right */}
      <div
        className="guideops-overlay-segment"
        style={{ top, left: left + width, right: 0, height }}
        onClick={onClick}
      />
      {/* Highlight ring around the target */}
      <div
        className="guideops-highlight-ring"
        style={{ top, left, width, height }}
      />
    </>
  );
}
