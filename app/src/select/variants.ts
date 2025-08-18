export const selectVariants = {
  base: '',
} as const;
export type SelectVariant = keyof typeof selectVariants;

export const sizeVariants = {
  sm: {
    trigger: 'px-2 py-1 text-sm',
    options: 'px-2 py-2 text-xs'
  },
  md: {
    trigger: 'px-3 py-2 text-base',
    options: 'px-3 py-2.5 text-sm'
  },
  lg: {
    trigger: 'px-4 py-3 text-lg',
    options: 'px-4 py-3 text-base'
  },
} as const;
export type SelectSize = keyof typeof sizeVariants;

export interface SelectVariants {
  variant: SelectVariant;
  size: SelectSize;
}

export const selectDefaults: SelectVariants = {
  variant: 'base',
  size: 'md',
} as const;
