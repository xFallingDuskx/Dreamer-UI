import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useInfiniteScroll, usePhotoGallery, type Photo, type UsePhotoGalleryProps } from './hooks';
import { layoutVariants, sizeVariants, type PhotoGalleryLayout, type PhotoGallerySize } from './variants';

export interface PhotoGalleryProps extends UsePhotoGalleryProps {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  layout?: PhotoGalleryLayout;
  size?: PhotoGallerySize;
  threshold?: number;
  enableInfiniteScroll?: boolean;
  loading?: React.ReactNode;
  errorMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onPhotoClick?: (photo: Photo, index: number) => void;
  photoClassName?: string;
  containerHeight?: string;
}

export function PhotoGallery({
  id,
  ref,
  className,
  layout = 'grid',
  size = 'md',
  threshold = 100,
  enableInfiniteScroll = true,
  loading,
  errorMessage,
  emptyMessage,
  onPhotoClick,
  photoClassName,
  containerHeight,
  initialPhotos = [],
  onLoadMore,
  pageSize = 20,
}: PhotoGalleryProps) {
  const { photos, isLoading, hasMore, error, loadMorePhotos } = usePhotoGallery({
    initialPhotos,
    onLoadMore,
    pageSize,
  });

  const { scrollContainerRef } = useInfiniteScroll({
    loadMore: loadMorePhotos,
    hasMore,
    isLoading,
    threshold,
  });

  const layoutClass = layoutVariants[layout];
  const sizeConfig = sizeVariants[size];

  const handlePhotoClick = (photo: Photo, index: number) => {
    onPhotoClick?.(photo, index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    photo: Photo,
    index: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePhotoClick(photo, index);
    }
  };

  const renderPhoto = (photo: Photo, index: number) => (
    <div
      key={photo.id}
      className={join(
        'relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group',
        layout === 'horizontal' ? `flex-shrink-0 ${sizeConfig.container}` : '',
        layout === 'masonry' ? 'break-inside-avoid mb-4' : sizeConfig.container
      )}
      tabIndex={onPhotoClick ? 0 : -1}
      role={onPhotoClick ? 'button' : undefined}
      aria-label={photo.alt || `Photo ${index + 1}`}
      onClick={() => handlePhotoClick(photo, index)}
      onKeyDown={(e) => handleKeyDown(e, photo, index)}
      data-photo-id={photo.id}
    >
      <img
        src={photo.src}
        alt={photo.alt || `Photo ${index + 1}`}
        className={join(
          'w-full h-full transition-transform duration-200 group-hover:scale-105',
          sizeConfig.image,
          layout === 'horizontal' ? 'aspect-square' : '',
          photoClassName
        )}
        loading="lazy"
        width={photo.width}
        height={photo.height}
      />
      {photo.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm font-medium truncate">{photo.caption}</p>
        </div>
      )}
    </div>
  );

  const renderLoadingState = () => {
    if (loading) return loading;

    return (
      <div className={join(
        'animate-pulse',
        layout === 'horizontal' 
          ? 'flex gap-4' 
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      )}>
        {Array.from({ length: layout === 'horizontal' ? 4 : 8 }).map((_, i) => (
          <div
            key={i}
            className={join(
              'bg-gray-300 dark:bg-gray-700 rounded-lg',
              layout === 'horizontal' ? `flex-shrink-0 ${sizeConfig.container} w-48` : sizeConfig.container
            )}
          />
        ))}
      </div>
    );
  };

  const renderError = () => {
    if (errorMessage) return errorMessage;

    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-lg font-medium mb-2">
          Failed to load photos
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {error || 'An unexpected error occurred'}
        </div>
      </div>
    );
  };

  const renderEmpty = () => {
    if (emptyMessage) return emptyMessage;

    return (
      <div className="text-center p-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No photos to display
        </div>
        <div className="text-gray-400">
          Photos will appear here when they're loaded
        </div>
      </div>
    );
  };

  if (error && photos.length === 0) {
    return (
      <div
        id={id}
        ref={ref}
        className={join('w-full', className)}
        data-testid="photo-gallery"
        data-layout={layout}
        data-size={size}
      >
        {renderError()}
      </div>
    );
  }

  if (photos.length === 0 && !isLoading) {
    return (
      <div
        id={id}
        ref={ref}
        className={join('w-full', className)}
        data-testid="photo-gallery"
        data-layout={layout}
        data-size={size}
      >
        {renderEmpty()}
      </div>
    );
  }

  return (
    <div
      id={id}
      ref={ref}
      className={join('w-full', className)}
      data-testid="photo-gallery"
      data-layout={layout}
      data-size={size}
    >
      <div
        ref={enableInfiniteScroll ? scrollContainerRef : null}
        className={join(
          'w-full',
          layoutClass,
          layout === 'horizontal' && containerHeight ? containerHeight : '',
          layout === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 
          layout === 'masonry' ? 'overflow-y-auto overflow-x-hidden' : 'overflow-y-auto overflow-x-hidden'
        )}
        style={{
          maxHeight: layout !== 'horizontal' && containerHeight ? containerHeight : undefined,
        }}
      >
        {photos.map((photo, index) => renderPhoto(photo, index))}
        
        {/* Loading indicator for infinite scroll */}
        {isLoading && enableInfiniteScroll && (
          <div className={join(
            layout === 'horizontal' 
              ? 'flex-shrink-0 flex items-center justify-center w-24' 
              : 'col-span-full flex items-center justify-center p-4'
          )}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
        
        {/* End of content indicator */}
        {!hasMore && photos.length > 0 && enableInfiniteScroll && (
          <div className={join(
            'text-center text-gray-500 text-sm p-4',
            layout === 'horizontal' 
              ? 'flex-shrink-0 flex items-center justify-center w-32' 
              : 'col-span-full'
          )}>
            No more photos
          </div>
        )}
      </div>
      
      {/* Initial loading state */}
      {isLoading && photos.length === 0 && renderLoadingState()}
      
      {/* Error state for additional loads */}
      {error && photos.length > 0 && (
        <div className="text-center p-4">
          <div className="text-red-500 text-sm">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}