import { useEffect, useState } from "react";

type FontMetrics = {
  fontSize: number;
  lineHeight: number;
  smallerFontSize: number;
  smallerLineHeight: number;
};

export function useFontMetrics(id: string): FontMetrics | null {
  const [metrics, setMetrics] = useState<FontMetrics | null>(null);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const computed = window.getComputedStyle(element);
    const fontSize = parseFloat(computed.fontSize);
    const lineHeight =
      computed.lineHeight === "normal"
        ? fontSize * 1.2 // browser default approximation
        : parseFloat(computed.lineHeight);

    const smallerFontSize = fontSize - 2;
    const scale = smallerFontSize / fontSize;
    const smallerLineHeight = lineHeight * scale;

    setMetrics({
      fontSize,
      lineHeight,
      smallerFontSize,
      smallerLineHeight,
    });
  }, [id]);

  return metrics;
}