import { useEffect, useState } from 'react';
import { Orientation } from './Separator';

export function useDetectedOrientation(orientation: Orientation | undefined, separatorId: string) {
  const [detectedOrientation, setDetectedOrientation] = useState<Orientation>('horizontal');

  // Auto-detect orientation based on parent container dimensions
  useEffect(() => {
    const separatorElement = document.getElementById(separatorId);
    if (orientation || !separatorElement) return;

    const detectOrientation = () => {
      if (!separatorElement) return;

      const parent = separatorElement.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const parentWidth = parentRect.width;
      const parentHeight = parentRect.height;

      // If parent is significantly wider than it is tall, use horizontal separator
      // If parent is significantly taller than it is wide, use vertical separator
      // Use a ratio threshold to avoid switching too frequently
      const aspectRatio = parentWidth / parentHeight;

      if (aspectRatio > 1.5) {
        setDetectedOrientation('horizontal');
      } else if (aspectRatio < 0.67) {
        setDetectedOrientation('vertical');
      } else {
        // For square-ish containers, check flex direction if available
        const parentStyle = getComputedStyle(parent);
        if (parentStyle.flexDirection === 'column') {
          setDetectedOrientation('horizontal');
        } else if (parentStyle.flexDirection === 'row') {
          setDetectedOrientation('vertical');
        } else {
          // Default to horizontal for ambiguous cases
          setDetectedOrientation('horizontal');
        }
      }
    };

    // Initial detection
    detectOrientation();

    // Set up ResizeObserver to re-detect on parent size changes
    const resizeObserver = new ResizeObserver(detectOrientation);
    const parent = separatorElement.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [orientation, separatorId]);

  return detectedOrientation;
}
