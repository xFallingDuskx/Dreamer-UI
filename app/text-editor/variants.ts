export const textEditorVariants = {
  default: 'border border-border focus-within:border-primary',
  minimal: 'border-0 focus-within:ring-2 focus-within:ring-primary/20',
  filled: 'bg-muted border-0 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20',
} as const;

export type TextEditorVariant = keyof typeof textEditorVariants;

export const textEditorSizes = {
  sm: 'min-h-[120px] text-sm',
  md: 'min-h-[200px] text-base',
  lg: 'min-h-[300px] text-lg',
} as const;

export type TextEditorSize = keyof typeof textEditorSizes;

export const textEditorRounded = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
} as const;

export type TextEditorRounded = keyof typeof textEditorRounded;

export interface TextEditorVariants {
  variant: TextEditorVariant;
  size: TextEditorSize;
  rounded: TextEditorRounded;
}

export const textEditorDefaults: TextEditorVariants = {
  variant: 'default',
  size: 'md',
  rounded: 'md',
} as const;