export type BadgeVariant = 'base' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';

export const BadgeVariants: Record<BadgeVariant, string> = {
  base: '',
	primary: 'bg-primary text-primary-foreground',
	secondary: 'bg-secondary text-secondary-foreground',
	accent: 'bg-accent text-accent-foreground',
	destructive: 'bg-destructive text-destructive-foreground',
	muted: 'bg-muted text-muted-foreground',
};

export const BadgeVariantsOutline: Record<BadgeVariant, string> = {
  base: '',
	primary: 'border border-primary bg-transparent text-primary',
	secondary: 'border border-secondary bg-transparent text-secondary',
	accent: 'border border-accent bg-transparent text-accent',
	destructive: 'border border-destructive bg-transparent text-destructive',
	muted: 'border border-muted-foreground bg-transparent text-muted-foreground',
};

export type BadgeSize = 'xs' | 'sm' | 'md'

interface BadgeSizeStyles {
  text: string;
  aspectSquare: string;
  aspectVideo: string;
}

export const BadgeSizes: Record<BadgeSize, BadgeSizeStyles> = {
  xs: {
    text: 'text-xs',
    aspectSquare: 'p-1',
    aspectVideo: 'px-2 py-0.5',
  },
  sm: {
    text: 'text-sm',
    aspectSquare: 'p-1.5',
    aspectVideo: 'px-2.5 py-1',
  },
  md: {
    text: 'text-base',
    aspectSquare: 'p-2',
    aspectVideo: 'px-3 py-1.5',
  },
};
