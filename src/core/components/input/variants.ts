export const inputVariants = {
  base: '',
  default:
    'ring ring-transparent focus:ring-primary-foreground not-disabled:data-error:ring-danger not-disabled:data-success:ring-success',
  underline:
    'border-b border-border focus:border-primary-foreground disabled:border-muted not-disabled:data-error:border-danger not-disabled:data-success:border-success',
  outline:
    'border border-border focus:border-primary-foreground disabled:border-muted not-disabled:data-error:border-danger not-disabled:data-success:border-success',
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
  variant: InputVariant;
  rounded: InputRounded;
}

export const inputDefaults: InputVariants = {
  variant: 'default',
  rounded: 'none',
} as const;
