export const selectVariants = {
  base: '',
} as const;
export type SelectVariant = keyof typeof selectVariants;

export const sizeVariants = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
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
