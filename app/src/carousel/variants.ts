export const buttonSizeVariants = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export const buttonStyleVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

export const buttonPositionVariants = {
  aligned: {
    prev: 'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10',
    next: 'absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10',
  },
  exterior: {
    prev: 'absolute -left-12 top-1/2 -translate-y-1/2 z-10',
    next: 'absolute -right-12 top-1/2 -translate-y-1/2 z-10',
  },
  interior: {
    prev: 'absolute left-4 top-1/2 -translate-y-1/2 z-10',
    next: 'absolute right-4 top-1/2 -translate-y-1/2 z-10',
  },
};
