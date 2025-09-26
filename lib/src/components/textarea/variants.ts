export const textareaVariants = {
  base: '',
  'left-line':
    'border-l border-border focus:border-primary-foreground disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  outline:
    'border border-border focus:border-primary-foreground disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
} as const;
export type TextareaVariant = keyof typeof textareaVariants;

export const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'px-3 rounded-full',
} as const;
export type TextareaRounded = keyof typeof roundedVariants;

export interface TextareaVariants {
  /** Visual style variant of the textarea. */
  variant: TextareaVariant;
  /** Border radius of the textarea. */
  rounded: TextareaRounded;
}

export const textareaDefaults: TextareaVariants = {
  variant: 'outline',
  rounded: 'none',
} as const;
