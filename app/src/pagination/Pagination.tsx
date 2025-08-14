import React, { useCallback } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { paginationVariants, paginationSizes, PaginationVariant, PaginationSize } from './variants';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

// Navigation symbols - creating inline for now since they don't exist in the symbol library
function ChevronLeft({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg width={size} height={size} className={className} viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

function ChevronRight({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg width={size} height={size} className={className} viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0331 6.1584 11.8442C5.95694 11.6554 5.96715 11.3389 6.15601 11.1375L9.58543 7.4999L6.15601 3.86234C5.96715 3.66089 5.95694 3.34447 6.1584 3.13508Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

function ChevronDoubleLeft({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg width={size} height={size} className={className} viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.20711 7.5L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645ZM12.8536 3.14645C13.0488 3.34171 13.0488 3.65829 12.8536 3.85355L9.20711 7.5L12.8536 11.1464C13.0488 11.3417 13.0488 11.6583 12.8536 11.8536C12.6583 12.0488 12.3417 12.0488 12.1464 11.8536L8.14645 7.85355C7.95118 7.65829 7.95118 7.34171 8.14645 7.14645L12.1464 3.14645C12.3417 2.95118 12.6583 2.95118 12.8536 3.14645Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

function ChevronDoubleRight({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg width={size} height={size} className={className} viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.14645 11.8536C1.95118 11.6583 1.95118 11.3417 2.14645 11.1464L5.79289 7.5L2.14645 3.85355C1.95118 3.65829 1.95118 3.34171 2.14645 3.14645C2.34171 2.95118 2.65829 2.95118 2.85355 3.14645L6.85355 7.14645C7.04882 7.34171 7.04882 7.65829 6.85355 7.85355L2.85355 11.8536C2.65829 12.0488 2.34171 12.0488 2.14645 11.8536ZM8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.7929 7.5L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default function Pagination({
  page,
  pageCount = 5,
  maxVisiblePages = 5,
  showFirstLast = true,
  onPageChange,
  size = 'md',
  variant = 'link',
  className,
  ref,
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
  const showFirstButton = showFirstLast && !isInfinite && visiblePages.length > 0 && !visiblePages.includes(1);
  const showLastButton = showFirstLast && !isInfinite && visiblePages.length > 0 && !visiblePages.includes(pageCount);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && (isInfinite || newPage <= pageCount)) {
      onPageChange(newPage);
    }
  };

  // Helper function to get button classes based on variant and state
  const getButtonClasses = useCallback(
    (isActive = false) => {
      const baseClasses = join(
        'flex items-center justify-center',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        paginationSizes[size],
        'rounded-md'
      );

      const variantClasses = isActive
        ? paginationVariants[variant].activeClassName
        : paginationVariants[variant].inactiveClassName;

      return join(baseClasses, variantClasses);
    },
    [variant, size]
  );

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
          className={getButtonClasses(false)}
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
        className={getButtonClasses(false)}
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
            className={getButtonClasses(pageNum === page)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === page ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        className={getButtonClasses(false)}
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
          className={getButtonClasses(false)}
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
