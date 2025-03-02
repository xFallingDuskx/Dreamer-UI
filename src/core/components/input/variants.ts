export const inputVariants = {
  base: 'ring ring-transparent focus:ring-primary-foreground not-disabled:data-[error=true]:ring-danger',
  underline:
    'border-b border-primary focus:border-primary-foreground disabled:border-muted not-disabled:data-[error=true]:border-danger',
  outline:
    'border border-primary focus:border-primary-foreground disabled:border-muted not-disabled:data-[error=true]:border-danger',
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
  variant: 'base',
  rounded: 'none',
} as const;
