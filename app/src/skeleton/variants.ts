export const skeletonVariants = {
  shape: {
    rectangle: 'rounded-md h-6',
    circle: 'rounded-full aspect-square w-6 h-6',
    text: 'rounded-sm h-4',
  },
  lineSpacing: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
    xl: 'space-y-6',
  },
} as const;

export interface SkeletonVariants {
  shape?: keyof typeof skeletonVariants.shape;
  lineSpacing?: keyof typeof skeletonVariants.lineSpacing;
}
