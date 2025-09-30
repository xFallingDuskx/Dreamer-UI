export const designVariants = {
	filled: {},
	outlined: {},
};

export type HelpIconDesign = keyof typeof designVariants;

export const sizeVariants = {
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
};

export type HelpIconSize = keyof typeof sizeVariants;