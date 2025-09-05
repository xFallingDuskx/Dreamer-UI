interface AlertVariantStyles {
  border: string;
  interior: string;
  icon: string;
  title: string;
  description: string;
}

export const AlertVariants: Record<string, AlertVariantStyles> = {
  info: {
    border: 'border-blue-500',
    interior: 'bg-blue-500/80',
    icon: 'text-blue-400',
    title: 'text-blue-400',
    description: 'text-blue-200',
  },
  destructive: {
    border: 'border-destructive',
    interior: 'bg-destructive/10',
    icon: 'text-destructive',
    title: 'text-destructive',
    description: 'text-destructive/80',
  },
  warning: {
    border: 'border-yellow-700',
    interior: 'bg-yellow-900/20',
    icon: 'text-yellow-400',
    title: 'text-yellow-400',
    description: 'text-yellow-200',
  },
  primary: {
    border: 'border-primary',
    interior: 'bg-primary/80',
    icon: 'text-primary-400',
    title: 'text-primary-400',
    description: 'text-primary-200',
  },
  base: {
    border: 'border-gray-300',
    interior: 'bg-gray-300/80',
    icon: 'text-gray-400',
    title: 'text-gray-400',
    description: 'text-gray-200',
  },
};
export type AlertVariants = keyof typeof AlertVariants;
