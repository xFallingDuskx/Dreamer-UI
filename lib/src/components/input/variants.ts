export const inputVariants = {
  base: '',
  transparent:
    'border border-transparent focus:border-current/60 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  underline:
    'border-b border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  outline:
    'border border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  solid: 'bg-muted/50 focus:bg-muted/70 not-disabled:data-error:border-destructive/70 not-disabled:data-success:border-success/70',
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
  /** The visual style variant of the input. Default is outline. */
  variant: InputVariant;
  /** The border radius of the input. */
  rounded: InputRounded;
}

export const inputDefaults: InputVariants = {
  variant: 'outline',
  rounded: 'none',
} as const;
