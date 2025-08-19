import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useRef } from 'react';
import { useCarousel } from './hooks.ts';
import { carouselVariants } from './variants.ts';

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
  /** Number of items to show at once */
  itemsToShow?: number;
  /** Size variant for navigation buttons */
  buttonSize?: 'sm' | 'md' | 'lg';
  /** Style variant for navigation buttons */
  buttonVariant?: 'default' | 'outline' | 'ghost';
  /** Enable infinite scrolling */
  infinite?: boolean;
  /** Custom previous button content */
  prevButton?: React.ReactNode;
  /** Custom next button content */
  nextButton?: React.ReactNode;
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
  infinite = true,
  prevButton,
  nextButton,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
  const totalItems = childrenArray.length;

  const { currentSlide, canGoPrev, canGoNext, goToPrev, goToNext, goToSlide, setIsHovered } = useCarousel({
    totalItems,
    itemsToShow,
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

  const translateX = -(currentSlide * (100 / totalItems) * itemsToShow);

  return (
    <div
      id={id}
      ref={ref}
      className={join('relative overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-carousel='true'
      data-current-index={currentSlide}
      data-items-to-show={itemsToShow}
      data-auto-scroll={autoScroll}
    >
      {/* Carousel Track */}
      <div
        ref={containerRef}
        className='flex transition-transform duration-300 ease-in-out'
        style={{
          transform: `translateX(${translateX}%)`,
          width: `${(totalItems / itemsToShow) * 100}%`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className='flex-shrink-0' style={{ width: `${100 / totalItems}%` }} data-slide-index={index}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {!hidePrevNext && (
        <>
          {/* Previous Button */}
          <button
            type='button'
            onClick={handlePrevClick}
            disabled={!canGoPrev}
            className={join(
              carouselVariants.button({ size: buttonSize, variant: buttonVariant }),
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              !canGoPrev && 'opacity-50 cursor-not-allowed'
            )}
            aria-label='Previous slide'
            data-carousel-prev='true'
          >
            {prevButton || <ChevronLeft className='w-4 h-4' />}
          </button>

          {/* Next Button */}
          <button
            type='button'
            onClick={handleNextClick}
            disabled={!canGoNext}
            className={join(
              carouselVariants.button({ size: buttonSize, variant: buttonVariant }),
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              !canGoNext && 'opacity-50 cursor-not-allowed'
            )}
            aria-label='Next slide'
            data-carousel-next='true'
          >
            {nextButton || <ChevronRight className='w-4 h-4' />}
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {!hideDots && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
          {Array.from({ length: Math.ceil(totalItems / itemsToShow) }).map((_, index) => (
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
  );
}
