import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { useScrollArea } from './hooks';

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
  const { viewportRef, verticalThumbRef, horizontalThumbRef, isScrolling, isFadingOut, scrollbarVisible, handleScroll } =
    useScrollArea();

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
      {scrollbarVisible.vertical && (isScrolling || isFadingOut) && (
        <div
          className={join(
            'touch-none select-none transition-all duration-300',
            'h-full w-2.5 p-[1px]',
            'absolute right-0 top-0',
            isFadingOut ? 'opacity-0' : 'opacity-100',
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
      {scrollbarVisible.horizontal && (isScrolling || isFadingOut) && (
        <div
          className={join(
            'touch-none select-none transition-all duration-300',
            'h-2.5 p-[1px]',
            'absolute bottom-0 left-0 w-full',
            isFadingOut ? 'opacity-0' : 'opacity-100',
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
