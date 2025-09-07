export const drawerVariants = {
  size: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'w-full',
    screen: 'w-screen',
  },
} as const;

export type DrawerSize = keyof typeof drawerVariants.size;
