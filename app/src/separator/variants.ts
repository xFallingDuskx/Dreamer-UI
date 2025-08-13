import { Orientation } from './Separator';

export const thicknessVariants: Record<Thickness, Record<Orientation, string>> = {
  thin: {
    horizontal: 'h-px',
    vertical: 'w-px',
  },
  medium: {
    horizontal: 'h-0.5',
    vertical: 'w-0.5',
  },
  thick: {
    horizontal: 'h-1',
    vertical: 'w-1',
  },
  'extra-thick': {
    horizontal: 'h-2',
    vertical: 'w-2',
  },
} as const;

export type Thickness = 'thin' | 'medium' | 'thick' | 'extra-thick';

export const colorVariants = {
  default: 'bg-border',
  muted: 'bg-muted',
  accent: 'bg-accent',
} as const;

export type ColorVariant = keyof typeof colorVariants;

export const sizeVariants: Record<Orientation, string> = {
  horizontal: 'w-full',
  vertical: 'min-h-4 h-full',
} as const;

export type SizeVariant = keyof typeof sizeVariants;

export const defaultVariants = {
  thickness: 'thin',
  variant: 'default',
  orientation: undefined,
};
