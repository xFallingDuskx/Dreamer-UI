export type PhotoGalleryLayout = 'grid' | 'masonry' | 'horizontal';
export type PhotoGallerySize = 'sm' | 'md' | 'lg';

export const layoutVariants: Record<PhotoGalleryLayout, string> = {
  grid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
  masonry: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4',
  horizontal: 'flex overflow-x-auto gap-4 pb-4',
};

export const sizeVariants: Record<PhotoGallerySize, { container: string; image: string }> = {
  sm: {
    container: 'h-32',
    image: 'object-cover rounded-md',
  },
  md: {
    container: 'h-48',
    image: 'object-cover rounded-lg',
  },
  lg: {
    container: 'h-64',
    image: 'object-cover rounded-xl',
  },
};