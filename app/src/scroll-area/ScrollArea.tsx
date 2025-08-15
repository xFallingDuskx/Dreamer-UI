import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface ScrollAreaProps {
  /** Custom CSS classes for the root container. Use this to set width/height */
  className?: string;
  /** Custom CSS classes for the scroll thumb */
  thumbClassName?: string;
  /** Custom CSS classes for the viewport (scrollable content area) */
  viewportClassName?: string;
  /** Custom CSS classes for the scrollbar track */
  scrollbarClassName?: string;
  /** Children content to be scrolled */
  children: React.ReactNode;
  /** HTML id attribute */
  id?: string;
  /** Reference to the root element */
  ref?: React.Ref<HTMLDivElement>;
}

export default function ScrollArea({
  className,
  thumbClassName,
  viewportClassName,
  scrollbarClassName,
  children,
  id,
  ref,
  ...props
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState({
    vertical: false,
    horizontal: false,
  });

  // Check if content overflows and update scrollbar visibility
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const checkOverflow = () => {
      const hasVerticalScroll = viewport.scrollHeight > viewport.clientHeight;
      const hasHorizontalScroll = viewport.scrollWidth > viewport.clientWidth;

      setScrollbarVisible({
        vertical: hasVerticalScroll,
        horizontal: hasHorizontalScroll,
      });
    };

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
  }, [children]);

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

  React.useEffect(() => {
    updateThumbSizes();
  }, [scrollbarVisible, updateThumbSizes]);

  const handleScroll = () => {
    setIsScrolling(true);
    updateThumbSizes();

    // Clear existing timeout
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  };

  const thumbsClassName = join(
    'relative flex-1 rounded-full bg-slate-400/60 hover:bg-slate-400/80 active:bg-slate-400',
    thumbClassName
  );

  return (
    <div ref={ref} id={id} className={join('relative overflow-hidden', className)} data-scroll-area-root='' {...props}>
      <div
        ref={viewportRef}
        className={join(
          'h-full w-full overflow-auto rounded-[inherit] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          viewportClassName
        )}
        onScroll={handleScroll}
        data-scroll-area-viewport=''
      >
        {children}
      </div>

      {/* Vertical Scrollbar */}
      {scrollbarVisible.vertical && (
        <div
          className={join(
            'touch-none select-none transition-colors',
            'h-full w-2.5 p-[1px]',
            'absolute right-0 top-0',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='vertical'
          data-state={isScrolling ? 'visible' : 'hidden'}
        >
          <div
            ref={verticalThumbRef}
            className={join('absolute rounded-full', thumbsClassName)}
            data-scroll-area-thumb=''
            style={{ height: '20%', top: '0%', width: '100%' }}
          />
        </div>
      )}

      {/* Horizontal Scrollbar */}
      {scrollbarVisible.horizontal && (
        <div
          className={join(
            'touch-none select-none transition-colors',
            'h-2.5 p-[1px]',
            'absolute bottom-0 left-0 w-full',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='horizontal'
          data-state={isScrolling ? 'visible' : 'hidden'}
        >
          <div
            ref={horizontalThumbRef}
            className={join('absolute rounded-full', thumbsClassName)}
            data-scroll-area-thumb=''
            style={{ width: '20%', left: '0%', height: '100%' }}
          />
        </div>
      )}

      {/* Corner */}
      {scrollbarVisible.vertical && scrollbarVisible.horizontal && (
        <div className={join('bg-transparent', 'absolute bottom-0 right-0 h-2.5 w-2.5')} data-scroll-area-corner='' />
      )}
    </div>
  );
}
