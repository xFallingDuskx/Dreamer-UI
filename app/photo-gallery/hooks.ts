import { useCallback, useEffect, useRef, useState } from 'react';

export interface Photo {
  id: string | number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface UseInfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export function useInfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
  threshold = 100,
}: UseInfiniteScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isLoading || !hasMore) {
      return;
    }

    const container = scrollContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Check if we're near the bottom (within threshold pixels)
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore();
    }
  }, [loadMore, hasMore, isLoading, threshold]);

  const handleHorizontalScroll = useCallback(() => {
    if (!scrollContainerRef.current || isLoading || !hasMore) {
      return;
    }

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    // Check if we're near the right edge (within threshold pixels)
    if (scrollWidth - scrollLeft - clientWidth < threshold) {
      loadMore();
    }
  }, [loadMore, hasMore, isLoading, threshold]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Use different scroll handler based on layout
    const scrollHandler = container.classList.contains('overflow-x-auto') 
      ? handleHorizontalScroll 
      : handleScroll;

    container.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      container.removeEventListener('scroll', scrollHandler);
    };
  }, [handleScroll, handleHorizontalScroll]);

  return { scrollContainerRef };
}

export interface UsePhotoGalleryProps {
  initialPhotos?: Photo[];
  onLoadMore?: (offset: number, limit: number) => Promise<Photo[]> | Photo[];
  pageSize?: number;
}

export function usePhotoGallery({
  initialPhotos = [],
  onLoadMore,
  pageSize = 20,
}: UsePhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMorePhotos = useCallback(async () => {
    if (!onLoadMore || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const newPhotos = await onLoadMore(photos.length, pageSize);
      
      if (Array.isArray(newPhotos)) {
        setPhotos(prev => [...prev, ...newPhotos]);
        
        // If we received fewer photos than requested, we've reached the end
        if (newPhotos.length < pageSize) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load photos');
    } finally {
      setIsLoading(false);
    }
  }, [photos.length, pageSize, onLoadMore, isLoading]);

  const resetPhotos = useCallback(() => {
    setPhotos(initialPhotos);
    setHasMore(true);
    setError(null);
    setIsLoading(false);
  }, [initialPhotos]);

  return {
    photos,
    isLoading,
    hasMore,
    error,
    loadMorePhotos,
    resetPhotos,
  };
}