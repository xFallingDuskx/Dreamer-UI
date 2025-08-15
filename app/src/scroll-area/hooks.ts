import { useCallback, useEffect, useRef, useState } from 'react';

export function useScrollArea() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState({
    vertical: false,
    horizontal: false,
  });

  // Check if content overflows and update scrollbar visibility
  const checkOverflow = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const hasVerticalScroll = viewport.scrollHeight > viewport.clientHeight;
    const hasHorizontalScroll = viewport.scrollWidth > viewport.clientWidth;

    setScrollbarVisible({
      vertical: hasVerticalScroll,
      horizontal: hasHorizontalScroll,
    });
  }, []);

  // Update thumb sizes and positions based on scroll state
  const updateThumbSizes = useCallback(() => {
    const viewport = viewportRef.current;
    const verticalThumb = verticalThumbRef.current;
    const horizontalThumb = horizontalThumbRef.current;

    if (!viewport) return;

    if (verticalThumb && scrollbarVisible.vertical) {
      const scrollRatio = viewport.clientHeight / viewport.scrollHeight;
      const thumbHeight = Math.max(scrollRatio * 100, 10); // Minimum 10% height

      // Calculate scroll percentage (0 to 1)
      const maxScrollTop = viewport.scrollHeight - viewport.clientHeight;
      const scrollPercentage = maxScrollTop > 0 ? viewport.scrollTop / maxScrollTop : 0;

      // The thumb should move from 0% to (100% - thumbHeight%) of the track
      const maxThumbPosition = 100 - thumbHeight;
      const thumbTop = scrollPercentage * maxThumbPosition;

      verticalThumb.style.height = `${thumbHeight}%`;
      verticalThumb.style.top = `${thumbTop}%`;
      verticalThumb.style.transform = 'none';
    }

    if (horizontalThumb && scrollbarVisible.horizontal) {
      const scrollRatio = viewport.clientWidth / viewport.scrollWidth;
      const thumbWidth = Math.max(scrollRatio * 100, 10); // Minimum 10% width

      // Calculate scroll percentage (0 to 1)
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      const scrollPercentage = maxScrollLeft > 0 ? viewport.scrollLeft / maxScrollLeft : 0;

      // The thumb should move from 0% to (100% - thumbWidth%) of the track
      const maxThumbPosition = 100 - thumbWidth;
      const thumbLeft = scrollPercentage * maxThumbPosition;

      horizontalThumb.style.width = `${thumbWidth}%`;
      horizontalThumb.style.left = `${thumbLeft}%`;
      horizontalThumb.style.transform = 'none';
    }
  }, [scrollbarVisible]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    updateThumbSizes();

    // Clear existing timeout
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [updateThumbSizes]);

  // Set up observers for content and size changes
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    checkOverflow();

    // Use ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(viewport);

    // Also check on content changes
    const mutationObserver = new MutationObserver(checkOverflow);
    mutationObserver.observe(viewport, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [checkOverflow]);

  // Update thumb sizes when scrollbar visibility changes
  useEffect(() => {
    updateThumbSizes();
  }, [scrollbarVisible, updateThumbSizes]);

  return {
    viewportRef,
    verticalThumbRef,
    horizontalThumbRef,
    isScrolling,
    scrollbarVisible,
    handleScroll,
  };
}
