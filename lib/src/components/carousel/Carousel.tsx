import React, { useCallback, useMemo, useRef } from 'react';
import { join } from '../../utils';
import { useCarousel } from './hooks';
import useScreenSize, { ScreenSize } from './useScreenSize';
import {
  ButtonPosition,
  buttonPositionVariants,
  ButtonSize,
  buttonSizeVariants,
  ButtonStyle,
  buttonStyleVariants,
} from './variants';
import { ChevronLeft, ChevronRight } from '../../symbols';

interface ButtonElementProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-carousel-prev'?: string;
  'data-carousel-next'?: string;
}

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
  buttonSize?: ButtonSize;
  /** Style variant for navigation buttons */
  buttonVariant?: ButtonStyle;
  /** Position of navigation buttons relative to carousel */
  buttonPosition?: ButtonPosition;
  /** Enable infinite scrolling */
  infinite?: boolean;
  /** Custom previous button content */
  prevButton?: React.ReactNode;
  /** Custom next button content */
  nextButton?: React.ReactNode;
  /** Additional class names for carousel items */
  itemsClassName?: string;
  /** Additional class names for the carousel container */
  containerClassName?: string;
  /** Additional class names for the dot indicators */
  dotsClassName?: string;
  /** Gap between carousel items in pixels */
  gap?: number;
}

export function Carousel({
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
  buttonPosition = 'exterior',
  infinite = true,
  prevButton,
  nextButton,
  itemsClassName,
  containerClassName,
  dotsClassName,
  gap = 8,
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

  const getSlideItemStyles = useCallback(
    (pos: number) => {
      // If only showing one item
      if (currentItemsToShow === 1) {
        return { leftWidth: 0, rightWidth: 0, widthReduction: 0 };
      }

      const widthReduction = (gap * (currentItemsToShow - 1)) / currentItemsToShow;
      // If item is first element of a slide
      if (pos % currentItemsToShow === 0) {
        return { leftWidth: 0, rightWidth: gap / 2, widthReduction };
      }

      // If item is last element of a slide
      if (pos % currentItemsToShow === currentItemsToShow - 1) {
        return { leftWidth: gap / 2, rightWidth: 0, widthReduction };
      }

      // If item is a middle element of a slide
      return { leftWidth: gap / 2, rightWidth: gap / 2, widthReduction };
    },
    [currentItemsToShow, gap]
  );

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
  const baseButtonStyles = join(
    'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-ring disabled:pointer-events-none',
    buttonPosition === 'aligned' ? 'disabled:opacity-90' : 'disabled:opacity-50'
  );

  return (
    <div className={join('relative', className)} data-carousel-wrapper='true'>
      {/* Navigation Buttons - Previous */}
      {!hidePrevNext && (
        <>
          {prevButton ? (
            React.cloneElement(
              prevButton as React.ReactElement,
              {
                onClick: handlePrevClick,
                disabled: !canGoPrev,
                className: join(
                  (prevButton as React.ReactElement<{ className?: string }>).props?.className || '',
                  buttonPositionVariants[buttonPosition].prev
                ),
                role: 'button',
                'aria-disabled': !canGoPrev,
                'aria-label': 'Previous slide',
                'data-carousel-prev': 'true',
              } as ButtonElementProps
            )
          ) : (
            <button
              type='button'
              onClick={handlePrevClick}
              disabled={!canGoPrev}
              className={join(
                baseButtonStyles,
                buttonSizeVariants[buttonSize].button,
                buttonStyleVariants[buttonVariant],
                buttonPositionVariants[buttonPosition].prev
              )}
              aria-disabled={!canGoPrev}
              aria-label='Previous slide'
              data-carousel-prev='true'
            >
              <ChevronLeft className={buttonSizeVariants[buttonSize].icon} />
            </button>
          )}
        </>
      )}

      <div
        id={id}
        ref={ref}
        className={join('relative overflow-hidden', containerClassName)}
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
          {childrenArray.map((child, index) => {
            const { leftWidth, rightWidth, widthReduction } = getSlideItemStyles(index);
            return (
              <div
                key={index}
                className={join('flex-shrink-0', itemsClassName)}
                style={{
                  width: `calc(${100 / totalItems}% - ${widthReduction}px)`,
                  marginRight: rightWidth > 0 ? `${rightWidth}px` : undefined,
                  marginLeft: leftWidth > 0 ? `${leftWidth}px` : undefined,
                }}
                data-slide-index={index}
              >
                {child}
              </div>
            );
          })}
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
                  index === currentSlide ? 'bg-accent' : 'bg-muted hover:bg-muted-foreground/50',
                  dotsClassName
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
        <>
          {nextButton ? (
            React.cloneElement(
              nextButton as React.ReactElement,
              {
                onClick: handleNextClick,
                disabled: !canGoNext,
                className: join(
                  (nextButton as React.ReactElement<{ className?: string }>).props?.className || '',
                  buttonPositionVariants[buttonPosition].next
                ),
                role: 'button',
                'aria-disabled': !canGoNext,
                'aria-label': 'Next slide',
                'data-carousel-next': 'true',
              } as ButtonElementProps
            )
          ) : (
            <button
              type='button'
              onClick={handleNextClick}
              disabled={!canGoNext}
              className={join(
                baseButtonStyles,
                buttonSizeVariants[buttonSize].button,
                buttonStyleVariants[buttonVariant],
                buttonPositionVariants[buttonPosition].next
              )}
              aria-disabled={!canGoNext}
              aria-label='Next slide'
              data-carousel-next='true'
            >
              <ChevronRight className={buttonSizeVariants[buttonSize].icon} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
