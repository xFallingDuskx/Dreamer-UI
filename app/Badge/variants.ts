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
	muted: 'border border-muted bg-transparent text-muted',
};
