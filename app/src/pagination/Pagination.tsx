import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';

type PaginationVariant = 'filled' | 'outline';
type PaginationSize = 'sm' | 'md';

interface PaginationProps {
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
  /** Additional CSS classes */
  className?: string;
  /** Ref for the pagination container */
  ref?: React.Ref<HTMLDivElement>;
  /** Data attributes for testing */
  'data-testid'?: string;
}

// Navigation symbols - creating inline for now since they don't exist in the symbol library
function ChevronLeft({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRight({ size = 15, color = 'currentColor', className = 'inline' }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0331 6.1584 11.8442C5.95694 11.6554 5.96715 11.3389 6.15601 11.1375L9.58543 7.4999L6.15601 3.86234C5.96715 3.66089 5.95694 3.34447 6.1584 3.13508Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
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
  variant = 'filled',
  className,
  ref,
  'data-testid': testId,
  ...rest
}: PaginationProps) {
  const isInfinite = pageCount === Infinity;
  
  // Generate page numbers to display
  const getVisiblePages = (): number[] => {
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
  };

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

  return (
    <nav
      ref={ref}
      className={join(
        'flex items-center justify-center gap-1',
        className
      )}
      role="navigation"
      aria-label="Pagination"
      data-testid={testId}
      data-page={page}
      data-page-count={isInfinite ? 'infinite' : pageCount}
      {...rest}
    >
      {/* First page button */}
      {showFirstButton && (
        <button
          onClick={() => handlePageChange(1)}
          className={join(
            'flex items-center justify-center',
            'border border-primary text-primary',
            'hover:bg-primary hover:text-primary-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            size === 'sm' ? 'px-2 py-1 text-sm min-w-[32px] h-8' : 'px-3 py-2 text-base min-w-[40px] h-10',
            'rounded-md'
          )}
          disabled={page === 1}
          aria-label="Go to first page"
        >
          First
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        className={join(
          'flex items-center justify-center',
          variant === 'outline' ? 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/85',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200',
          size === 'sm' ? 'px-2 py-1 text-sm min-w-[32px] h-8' : 'px-3 py-2 text-base min-w-[40px] h-10',
          'rounded-md'
        )}
        disabled={!canGoPrevious}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={size === 'sm' ? 12 : 15} />
        <span className="ml-1">Previous</span>
      </button>

      {/* Page number buttons (only for finite pagination) */}
      {!isInfinite && visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={join(
            'flex items-center justify-center',
            pageNum === page
              ? variant === 'outline' 
                ? 'bg-primary text-primary-foreground border border-primary' 
                : 'bg-primary text-primary-foreground'
              : variant === 'outline'
              ? 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground',
            'transition-colors duration-200',
            size === 'sm' ? 'px-2 py-1 text-sm min-w-[32px] h-8' : 'px-3 py-2 text-base min-w-[40px] h-10',
            'rounded-md'
          )}
          aria-label={`Go to page ${pageNum}`}
          aria-current={pageNum === page ? 'page' : undefined}
        >
          {pageNum}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        className={join(
          'flex items-center justify-center',
          variant === 'outline' ? 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/85',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200',
          size === 'sm' ? 'px-2 py-1 text-sm min-w-[32px] h-8' : 'px-3 py-2 text-base min-w-[40px] h-10',
          'rounded-md'
        )}
        disabled={!canGoNext}
        aria-label="Go to next page"
      >
        <span className="mr-1">Next</span>
        <ChevronRight size={size === 'sm' ? 12 : 15} />
      </button>

      {/* Last page button */}
      {showLastButton && (
        <button
          onClick={() => handlePageChange(pageCount)}
          className={join(
            'flex items-center justify-center',
            'border border-primary text-primary',
            'hover:bg-primary hover:text-primary-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            size === 'sm' ? 'px-2 py-1 text-sm min-w-[32px] h-8' : 'px-3 py-2 text-base min-w-[40px] h-10',
            'rounded-md'
          )}
          disabled={page === pageCount}
          aria-label="Go to last page"
        >
          Last
        </button>
      )}
    </nav>
  );
}
