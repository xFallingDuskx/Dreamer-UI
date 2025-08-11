export const sizeVariants = {
  sm: {
    container: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
  },
  md: {
    container: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
  lg: {
    container: 'h-7 w-13',
    thumb: 'h-6 w-6',
    translate: 'translate-x-6',
  },
};
export type ToggleSize = keyof typeof sizeVariants;

export const variantStyles = {
  default: {
    unchecked: 'bg-muted',
    checked: 'bg-primary',
  },
  success: {
    unchecked: 'bg-muted',
    checked: 'bg-success',
  },
  destructive: {
    unchecked: 'bg-muted',
    checked: 'bg-destructive',
  },
};
export type ToggleVariant = keyof typeof variantStyles;

export interface ToggleVariants {
  variant: ToggleVariant;
  size: ToggleSize;
}

export const toggleDefaults: ToggleVariants = {
  variant: 'default',
  size: 'md',
} as const;
