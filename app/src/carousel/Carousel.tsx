import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useMemo, useRef } from 'react';
import { useCarousel } from './hooks.ts';
import { buttonSizeVariants, buttonStyleVariants, buttonPositionVariants } from './variants.ts';
import useScreenSize, { ScreenSize } from './useScreenSize';

// Simple chevron icons
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
  </svg>
);

export interface CarouselProps {
  children: React.ReactNode;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  /** Enable automatic scrolling */
  autoScroll?: boolean;
  /** Interval in milliseconds for auto scroll */
  scrollInterval?: number;
  /** Pause auto scroll on hover */
  pauseScrollOnHover?: boolean;
  /** Manually control the current index */
  currentIndex?: number;
  /** Callback when index changes */
  onIndexChange?: (index: number) => void;
  /** Hide previous/next navigation buttons */
  hidePrevNext?: boolean;
  /** Hide dot indicators */
  hideDots?: boolean;
  /** Number of items to show at once, or breakpoint object mapping screen sizes to item counts */
  itemsToShow?: number | Partial<Record<ScreenSize, number>>;
  /** Size variant for navigation buttons */
  buttonSize?: 'sm' | 'md' | 'lg';
  /** Style variant for navigation buttons */
  buttonVariant?: 'default' | 'outline' | 'ghost';
  /** Position of navigation buttons relative to carousel */
  buttonPosition?: 'aligned' | 'exterior' | 'interior';
  /** Enable infinite scrolling */
  infinite?: boolean;
  /** Custom previous button content */
  prevButton?: React.ReactNode;
  /** Custom next button content */
  nextButton?: React.ReactNode;
  /** Additional class names for carousel items */
  itemsClassName?: string;
}

export default function Carousel({
  children,
  id,
  ref,
  className,
  autoScroll = false,
  scrollInterval = 3000,
  pauseScrollOnHover = true,
  currentIndex,
  onIndexChange,
  hidePrevNext = false,
  hideDots = false,
  itemsToShow = 1,
  buttonSize = 'md',
  buttonVariant = 'default',
  buttonPosition = 'aligned',
  infinite = true,
  prevButton,
  nextButton,
  itemsClassName,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
  const totalItems = childrenArray.length;
  const { screenSize } = useScreenSize();

  // Resolve the current itemsToShow based on screen size or use the number value
  const currentItemsToShow = useMemo(() => {
    if (typeof itemsToShow === 'number') {
      return itemsToShow;
    }
    
    if (typeof itemsToShow === 'object' && itemsToShow && screenSize) {
      // Start from current screen size and work down to find a defined value
      const breakpointOrder: Array<ScreenSize> = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
      const currentIndex = breakpointOrder.indexOf(screenSize);
      
      for (let i = currentIndex; i < breakpointOrder.length; i++) {
        const breakpoint = breakpointOrder[i];
        if (itemsToShow[breakpoint] !== undefined) {
          return itemsToShow[breakpoint]!;
        }
      }
    }
    
    return 1; // Default fallback
  }, [itemsToShow, screenSize]);

  const { currentSlide, canGoPrev, canGoNext, goToPrev, goToNext, goToSlide, setIsHovered } = useCarousel({
    totalItems,
    itemsToShow: currentItemsToShow,
    infinite,
    autoScroll,
    scrollInterval,
    pauseScrollOnHover,
    currentIndex,
    onIndexChange,
  });

  const handlePrevClick = () => {
    goToPrev();
  };

  const handleNextClick = () => {
    goToNext();
  };

  const handleMouseEnter = () => {
    if (pauseScrollOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseScrollOnHover) {
      setIsHovered(false);
    }
  };

  const translateX = -(currentSlide * (100 / totalItems) * currentItemsToShow);

  // Base styles for carousel buttons
  const baseButtonStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  return (
    <div className={join('relative', className)} data-carousel-wrapper='true'>
      {/* Navigation Buttons - Previous */}
      {!hidePrevNext && (
        <button
          type='button'
          onClick={handlePrevClick}
          disabled={!canGoPrev}
          className={join(
            baseButtonStyles,
            buttonSizeVariants[buttonSize],
            buttonStyleVariants[buttonVariant],
            buttonPositionVariants[buttonPosition].prev,
            !canGoPrev && 'opacity-50 cursor-not-allowed'
          )}
          aria-label='Previous slide'
          data-carousel-prev='true'
        >
          {prevButton || <ChevronLeft className='w-4 h-4' />}
        </button>
      )}

      <div
        id={id}
        ref={ref}
        className='relative overflow-hidden'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-carousel='true'
        data-current-index={currentSlide}
        data-items-to-show={currentItemsToShow}
        data-auto-scroll={autoScroll}
        data-button-position={buttonPosition}
      >
        {/* Carousel Track */}
        <div
          ref={containerRef}
          className='flex transition-transform duration-300 ease-in-out'
          style={{
            transform: `translateX(${translateX}%)`,
            width: `${(totalItems / currentItemsToShow) * 100}%`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className={join('flex-shrink-0', itemsClassName)}
              style={{ width: `${100 / totalItems}%` }}
              data-slide-index={index}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {!hideDots && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
            {Array.from({ length: Math.ceil(totalItems / currentItemsToShow) }).map((_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => goToSlide(index)}
                className={join(
                  'w-2 h-2 rounded-full transition-colors duration-200',
                  index === currentSlide ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
                data-carousel-dot={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons - Next */}
      {!hidePrevNext && (
        <button
          type='button'
          onClick={handleNextClick}
          disabled={!canGoNext}
          className={join(
            baseButtonStyles,
            buttonSizeVariants[buttonSize],
            buttonStyleVariants[buttonVariant],
            buttonPositionVariants[buttonPosition].next,
            !canGoNext && 'opacity-50 cursor-not-allowed'
          )}
          aria-label='Next slide'
          data-carousel-next='true'
        >
          {nextButton || <ChevronRight className='w-4 h-4' />}
        </button>
      )}
    </div>
  );
}
