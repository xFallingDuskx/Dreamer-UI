import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { useScrollArea } from './hooks';
import './index.css';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom CSS classes for the root container. Use this to set width/height */
  className?: string;
  /** Custom CSS classes for the scroll thumb */
  thumbClassName?: string;
  /** Custom CSS classes for the viewport (scrollable content area) */
  viewportClassName?: string;
  /** Custom CSS classes for the scrollbar track */
  scrollbarClassName?: string;
  /** Scrollbar thickness in pixels. Defaults to 10px */
  scrollbarThickness?: number;
  /** Children content to be scrolled */
  children: React.ReactNode;
  /** HTML id attribute */
  id?: string;
  /** Reference to the root element */
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * A custom scrollable area component with styled scrollbars that appear on hover/scroll.
 * Provides cross-browser consistent scrolling experience with customizable appearance.
 * 
 * @example
 * ```tsx
 * // Basic scroll area
 * <ScrollArea className="h-64 w-full border rounded">
 *   <div className="p-4 space-y-2">
 *     {Array.from({length: 50}).map((_, i) => (
 *       <div key={i}>Item {i + 1}</div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * 
 * // Customized scrollbars
 * <ScrollArea 
 *   className="h-96 w-80"
 *   scrollbarThickness={12}
 *   thumbClassName="bg-primary/60 hover:bg-primary/80"
 * >
 *   <LongContent />
 * </ScrollArea>
 * ```
 */
export function ScrollArea({
  className,
  thumbClassName,
  viewportClassName,
  scrollbarClassName,
  scrollbarThickness = 8,
  children,
  id,
  ref,
  ...props
}: ScrollAreaProps) {
  const { viewportRef, verticalThumbRef, horizontalThumbRef, isScrolling, isFadingOut, scrollbarVisible, handleScroll } =
    useScrollArea(scrollbarThickness);

  const thumbsClassName = join(
    'relative flex-1 rounded-full bg-slate-400/60 hover:bg-slate-400/80 active:bg-slate-400',
    thumbClassName
  );

  return (
    <div ref={ref} id={id} className={join('relative overflow-hidden', className)} data-scroll-area-root='' {...props}>
      <div
        ref={viewportRef}
        className={join(
          'h-full w-full overflow-auto rounded-[inherit] hide-scroll-bars',
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
            'touch-none select-none transition-all',
            'p-[1px]',
            'absolute right-0 top-0',
            isFadingOut ? 'opacity-0' : 'opacity-100',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='vertical'
          data-state={isScrolling ? 'visible' : 'hidden'}
          style={{ 
            width: `${scrollbarThickness}px`,
            height: scrollbarVisible.horizontal 
              ? `calc(100% - ${scrollbarThickness}px)` 
              : '100%'
          }}
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
            'touch-none select-none transition-all',
            'p-[1px]',
            'absolute bottom-0 left-0',
            isFadingOut ? 'opacity-0' : 'opacity-100',
            scrollbarClassName
          )}
          data-scroll-area-scrollbar='horizontal'
          data-state={isScrolling ? 'visible' : 'hidden'}
          style={{ 
            height: `${scrollbarThickness}px`,
            width: scrollbarVisible.vertical 
              ? `calc(100% - ${scrollbarThickness}px)` 
              : '100%'
          }}
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
        <div 
          className={join('bg-transparent', 'absolute bottom-0 right-0')} 
          data-scroll-area-corner=''
          style={{ 
            height: `${scrollbarThickness}px`, 
            width: `${scrollbarThickness}px` 
          }}
        />
      )}
    </div>
  );
}
