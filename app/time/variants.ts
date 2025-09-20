export const timeVariants = {
  base: 'appearance-none w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-muted/70 transition-all cursor-pointer',
  default: 'ring ring-transparent focus:ring-primary-foreground not-disabled:data-error:ring-destructive',
  underline: 'border-b border-border focus:border-primary-foreground disabled:border-muted/30 not-disabled:data-error:border-destructive',
  outline: 'border border-border focus:border-primary-foreground disabled:border-muted/30 not-disabled:data-error:border-destructive',
} as const;

export type TimeVariant = keyof typeof timeVariants;

export const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'px-3 rounded-full',
} as const;

export type TimeRounded = keyof typeof roundedVariants;

export interface TimeVariants {
  variant: TimeVariant;
  rounded: TimeRounded;
}

export const timeDefaults: TimeVariants = {
  variant: 'default',
  rounded: 'none',
} as const;