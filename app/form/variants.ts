export const formVariants = {
  spacing: {
    tight: 'gap-3',
    normal: 'gap-4', 
    loose: 'gap-6',
  },
  columns: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2', 
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
  colSpan: {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3', 
    4: 'col-span-1 md:col-span-2 lg:col-span-4',
    full: 'col-span-full',
  },
} as const;

export type FormSpacing = keyof typeof formVariants.spacing;
export type FormColumns = keyof typeof formVariants.columns;
export type FormColSpan = keyof typeof formVariants.colSpan;

export interface FormVariants {
  spacing: FormSpacing;
  columns?: FormColumns;
  responsive?: boolean;
}

export const formDefaults: FormVariants = {
  spacing: 'normal',
  columns: 1,
  responsive: true,
} as const;