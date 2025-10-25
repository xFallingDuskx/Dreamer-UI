export const textareaVariants = {
  base: '',
  'left-line':
    'border-l border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  outline:
    'border border-border focus:border-current/60 disabled:border-muted/30 not-disabled:data-error:border-destructive not-disabled:data-success:border-success',
  solid: 'bg-muted/50 focus:bg-muted/70 not-disabled:data-error:border-destructive/70 not-disabled:data-success:border-success/70',
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
  /** Visual style variant of the textarea. Default is outline. */
  variant: TextareaVariant;
  /** Border radius of the textarea. */
  rounded: TextareaRounded;
}

export const textareaDefaults: TextareaVariants = {
  variant: 'outline',
  rounded: 'none',
} as const;
