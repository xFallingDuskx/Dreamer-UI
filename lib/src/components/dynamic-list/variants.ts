export type DynamicListSize = 'sm' | 'md' | 'lg';

export const titleVariants: Record<DynamicListSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
} as const;

export const listVariants: Record<DynamicListSize, string> = {
    sm: 'text-sm gap-2',
    md: 'text-base gap-3',
    lg: 'text-lg gap-4',
} as const;

export const iconSize: Record<DynamicListSize, number> = {
    sm: 14,
    md: 15,
    lg: 16,
};