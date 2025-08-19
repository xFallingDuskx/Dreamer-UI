import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCarouselProps {
  totalItems: number;
  itemsToShow: number;
  infinite: boolean;
  autoScroll: boolean;
  scrollInterval: number;
  pauseScrollOnHover: boolean;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function useCarousel({
  totalItems,
  itemsToShow,
  infinite,
  autoScroll,
  scrollInterval,
  pauseScrollOnHover,
  currentIndex,
  onIndexChange,
}: UseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(currentIndex || 0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxSlides = Math.ceil(totalItems / itemsToShow);
  const canGoPrev = infinite || currentSlide > 0;
  const canGoNext = infinite || currentSlide < maxSlides - 1;

  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxSlides - 1));
    setCurrentSlide(clampedIndex);
    onIndexChange?.(clampedIndex);
  }, [maxSlides, onIndexChange]);

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      const newIndex = currentSlide === 0 && infinite ? maxSlides - 1 : currentSlide - 1;
      goToSlide(newIndex);
    }
  }, [currentSlide, canGoPrev, infinite, maxSlides, goToSlide]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      const newIndex = currentSlide === maxSlides - 1 && infinite ? 0 : currentSlide + 1;
      goToSlide(newIndex);
    }
  }, [currentSlide, canGoNext, infinite, maxSlides, goToSlide]);

  // Handle controlled mode
  useEffect(() => {
    if (currentIndex !== undefined && currentIndex !== currentSlide) {
      setCurrentSlide(currentIndex);
    }
  }, [currentIndex, currentSlide]);

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        if (pauseScrollOnHover && isHovered) return;
        
        goToNext();
      }, scrollInterval);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isHovered || !pauseScrollOnHover) {
      startInterval();
    } else {
      stopInterval();
    }

    return stopInterval;
  }, [autoScroll, scrollInterval, pauseScrollOnHover, isHovered, goToNext]);

  // Reset to first slide when # of items to show changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsToShow]);

  return {
    currentSlide,
    canGoPrev,
    canGoNext,
    goToPrev,
    goToNext,
    goToSlide,
    isHovered,
    setIsHovered,
  };
}
