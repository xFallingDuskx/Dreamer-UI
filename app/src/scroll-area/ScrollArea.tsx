import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';

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
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollbarVisible, setScrollbarVisible] = React.useState({
    vertical: false,
    horizontal: false,
  });

  // Check if content overflows and update scrollbar visibility
  React.useEffect(() => {
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

  const handleScroll = () => {
    setIsScrolling(true);

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
        className={join('h-full w-full rounded-[inherit]', viewportClassName)}
        onScroll={handleScroll}
        data-scroll-area-viewport=''
        style={
          {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: 'none',
          } as React.CSSProperties
        }
      >
        {children}
      </div>

      {/* Vertical Scrollbar */}
      {scrollbarVisible.vertical && (
        <div
          className={join(
            'flex touch-none select-none transition-colors',
            'h-full w-2.5 border-l border-l-transparent p-[1px]',
            'absolute right-0 top-0',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='vertical'
          data-state={isScrolling ? 'visible' : 'hidden'}
        >
          <div className={thumbsClassName} data-scroll-area-thumb='' />
        </div>
      )}

      {/* Horizontal Scrollbar */}
      {scrollbarVisible.horizontal && (
        <div
          className={join(
            'flex touch-none select-none transition-colors',
            'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            'absolute bottom-0 left-0 w-full',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='horizontal'
          data-state={isScrolling ? 'visible' : 'hidden'}
        >
          <div className={thumbsClassName} data-scroll-area-thumb='' />
        </div>
      )}

      {/* Corner */}
      {scrollbarVisible.vertical && scrollbarVisible.horizontal && (
        <div className={join('bg-transparent', 'absolute bottom-0 right-0 h-2.5 w-2.5')} data-scroll-area-corner='' />
      )}
    </div>
  );
}
