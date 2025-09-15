export const formVariants = {
  spacing: {
    tight: 'space-y-3',
    normal: 'space-y-4',
    loose: 'space-y-6',
  },
} as const;

export type FormSpacing = keyof typeof formVariants.spacing;

export interface FormVariants {
  spacing: FormSpacing;
}

export const formDefaults: FormVariants = {
  spacing: 'normal',
} as const;