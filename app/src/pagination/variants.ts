export const paginationVariants = {
  link: {
    activeClassName: 'text-primary-foreground bg-primary',
    inactiveClassName: 'text-primary hover:text-primary-foreground hover:bg-primary/10',
  },
  outline: {
    activeClassName: 'bg-primary text-primary-foreground border border-primary',
    inactiveClassName: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  },
  filled: {
    activeClassName: 'bg-primary text-primary-foreground',
    inactiveClassName: 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground',
  },
} as const;

export type PaginationVariant = keyof typeof paginationVariants;

export const paginationSizes = {
  sm: 'px-2 py-1 text-sm min-w-[32px] h-8',
  md: 'px-3 py-2 text-base min-w-[40px] h-10',
} as const;

export type PaginationSize = keyof typeof paginationSizes;

export interface PaginationVariants {
  variant: PaginationVariant;
  size: PaginationSize;
}
