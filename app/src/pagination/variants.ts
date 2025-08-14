export const paginationVariants = {
  link: 'text-primary hover:text-primary-foreground hover:bg-primary/10 aria-current:text-primary-foreground aria-current:bg-primary',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground aria-current:bg-primary aria-current:text-primary-foreground aria-current:border-primary',
  filled: 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground aria-current:bg-primary aria-current:text-primary-foreground',
} as const;

export type PaginationVariant = keyof typeof paginationVariants;

export const paginationSizes = {
  sm: 'px-2 py-1 text-sm min-w-[32px] min-h-8',
  md: 'px-2 py-1 text-base min-w-[40px] min-h-10',
} as const;

export type PaginationSize = keyof typeof paginationSizes;

export interface PaginationVariants {
  variant: PaginationVariant;
  size: PaginationSize;
}
