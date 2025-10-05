export const inputVariants = {
  base: '',
  default:
    'ring ring-transparent focus:ring-primary-foreground/60 not-disabled:data-error:ring-destructive not-disabled:data-success:ring-success',
  underline:
    'border-b border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  outline:
    'border border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
} as const;
export type InputVariant = keyof typeof inputVariants;

export const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'px-3 rounded-full',
} as const;
export type InputRounded = keyof typeof roundedVariants;

export interface InputVariants {
  /** The visual style variant of the input. */
  variant: InputVariant;
  /** The border radius of the input. */
  rounded: InputRounded;
}

export const inputDefaults: InputVariants = {
  variant: 'default',
  rounded: 'none',
} as const;
