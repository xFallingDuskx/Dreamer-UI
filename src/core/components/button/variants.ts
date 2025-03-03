export const buttonVariants = {
  base: '',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/85 disabled:bg-muted disabled:text-muted-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/85 disabled:bg-muted/80 disabled:text-muted-foreground/80',
  tertiary: 'text-primary hover:text-primary-foreground disabled:text-muted',
  outline: 'border border-primary text-primary hover:border-primary-foreground hover:text-primary-foreground disabled:border-muted disabled:text-muted',
  link: 'underline-offset-4 hover:underline disabled:underline disabled:text-muted',
  danger: 'bg-danger text-danger-foreground hover:bg-danger/85 disabled:bg-muted disabled:text-muted-foreground',
} as const;
export type ButtonVariant = keyof typeof buttonVariants;

export const sizeVariants = {
  stripped: '',
  fitted: 'w-fit',
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  icon: 'p-1 w-fit aspect-square',
  full: 'p-2 w-full',
} as const;
export type ButtonSize = keyof typeof sizeVariants;

export const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;
export type ButtonRounded = keyof typeof roundedVariants;

export interface ButtonVariants {
  variant: ButtonVariant;
  size: ButtonSize;
  rounded: ButtonRounded;
}

export const buttonDefaults: ButtonVariants = {
  variant: 'primary',
  size: 'md',
  rounded: 'md',
} as const;
