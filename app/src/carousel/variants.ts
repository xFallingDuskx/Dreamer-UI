export const buttonSizeVariants = {
  sm: {
    button: 'h-6 w-6 text-xs',
    icon: 'size-3',
  },
  md: {
    button: 'h-8 w-8 text-sm',
    icon: 'size-4',
  },
  lg: {
    button: 'h-10 w-10 text-lg',
    icon: 'size-5',
  },
};

export type ButtonSize = keyof typeof buttonSizeVariants;

export const buttonStyleVariants = {
  default: 'bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent',
  outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent',
  ghost: 'hover:text-accent',
};

export type ButtonStyle = keyof typeof buttonStyleVariants;

export const buttonPositionVariants = {
  aligned: {
    prev: 'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10',
    next: 'absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10',
  },
  exterior: {
    prev: 'absolute -left-10 top-1/2 -translate-y-1/2 z-10',
    next: 'absolute -right-10 top-1/2 -translate-y-1/2 z-10',
  },
  interior: {
    prev: 'absolute left-2 top-1/2 -translate-y-1/2 z-10',
    next: 'absolute right-2 top-1/2 -translate-y-1/2 z-10',
  },
};

export type ButtonPosition = keyof typeof buttonPositionVariants;
