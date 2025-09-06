import { useEffect, useState } from 'react';

interface FontMetrics {
  fontSize: number;
  lineHeight: number;
  smallerFontSize: number;
  smallerLineHeight: number;
}

export function useFontMetrics(id: string): FontMetrics | null {
  const [metrics, setMetrics] = useState<FontMetrics | null>(null);

  useEffect(() => {
    const element = document.getElementById(id)?.parentElement;
    if (!element) return;

    const computeMetrics = () => {
      const computed = window.getComputedStyle(element);
      const fontSize = parseFloat(computed.fontSize);

      const lineHeight =
        computed.lineHeight === 'normal'
          ? fontSize * 1.2 // browser default approximation
          : parseFloat(computed.lineHeight);

      const smallerFontSize = fontSize - 2; // 2px smaller (accounts for vertical padding)
      const scale = smallerFontSize / fontSize;
      const smallerLineHeight = lineHeight * scale;

      setMetrics({
        fontSize,
        lineHeight,
        smallerFontSize,
        smallerLineHeight,
      });
    };

    computeMetrics();

    // Observe layout-affecting changes (i.e. breakpoint changes)
    const resizeObserver = new ResizeObserver(computeMetrics);
    resizeObserver.observe(element);

    // Observe inline style / class changes
    const mutationObserver = new MutationObserver(computeMetrics);
    mutationObserver.observe(element, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: false,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [id]);

  return metrics;
}
