import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useCallback } from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from '../../symbols';
import { PaginationSize, paginationSizes, PaginationVariant, paginationVariants } from './variants';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current page number (1-indexed) */
  page: number;
  /** Total number of pages. Use Infinity for infinite pagination */
  pageCount?: number;
  /** Maximum number of page buttons to show */
  maxVisiblePages?: number;
  /** Show first and last page buttons */
  showFirstLast?: boolean;
  /** Button variant style */
  variant?: PaginationVariant;
  /** Button size */
  size?: PaginationSize;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Ref for the pagination container */
  ref?: React.Ref<HTMLDivElement>;
  /** Additional class names for the button elements */
  buttonsClassName?: string;
}

export function Pagination({
  page,
  pageCount = 5,
  maxVisiblePages = 5,
  showFirstLast = true,
  onPageChange,
  size = 'md',
  variant = 'link',
  className,
  ref,
  buttonsClassName,
  ...rest
}: PaginationProps) {
  const isInfinite = pageCount === Infinity;

  // Generate page numbers to display
  const getVisiblePages = useCallback((): number[] => {
    if (isInfinite) return [];

    const totalPages = pageCount;
    const maxPages = Math.min(maxVisiblePages, totalPages);

    // If we have fewer pages than maxVisiblePages, show all
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate the range of pages to show
    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxPages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
      end = Math.min(totalPages, start + maxPages - 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [isInfinite, maxVisiblePages, page, pageCount]);

  const visiblePages = getVisiblePages();
  const canGoPrevious = page > 1;
  const canGoNext = isInfinite || page < pageCount;
  const showFirstButton = showFirstLast && !isInfinite;
  const showLastButton = showFirstLast && !isInfinite;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && (isInfinite || newPage <= pageCount)) {
      onPageChange(newPage);
    }
  };

  // Helper function to get button classes based on variant and state
  const getButtonClasses = useCallback(() => {
    const baseClasses = join(
      'flex items-center justify-center min-w-fit',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      paginationSizes[size],
      'rounded-md'
    );

    return join(baseClasses, paginationVariants[variant], buttonsClassName);
  }, [variant, size, buttonsClassName]);

  return (
    <nav
      ref={ref}
      className={join('flex items-center justify-center gap-1', className)}
      role='navigation'
      aria-label='Pagination'
      data-page={page}
      data-page-count={isInfinite ? 'infinite' : pageCount}
      {...rest}
    >
      {/* First page button */}
      {showFirstButton && (
        <button
          onClick={() => handlePageChange(1)}
          className={getButtonClasses()}
          disabled={page === 1}
          aria-label='Go to first page'
        >
          <ChevronDoubleLeft size={size === 'sm' ? 12 : 15} />
          <span className='ml-1'>First</span>
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        className={getButtonClasses()}
        disabled={!canGoPrevious}
        aria-label='Go to previous page'
      >
        <ChevronLeft size={size === 'sm' ? 12 : 15} />
        <span className='ml-1'>Previous</span>
      </button>

      {/* Page number buttons (only for finite pagination) */}
      {!isInfinite &&
        visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={join(getButtonClasses(), 'aspect-square')}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === page ? true : undefined}
          >
            {pageNum}
          </button>
        ))}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        className={getButtonClasses()}
        disabled={!canGoNext}
        aria-label='Go to next page'
      >
        <span className='mr-1'>Next</span>
        <ChevronRight size={size === 'sm' ? 12 : 15} />
      </button>

      {/* Last page button */}
      {showLastButton && (
        <button
          onClick={() => handlePageChange(pageCount)}
          className={getButtonClasses()}
          disabled={page === pageCount}
          aria-label='Go to last page'
        >
          <span className='mr-1'>Last</span>
          <ChevronDoubleRight size={size === 'sm' ? 12 : 15} />
        </button>
      )}
    </nav>
  );
}
