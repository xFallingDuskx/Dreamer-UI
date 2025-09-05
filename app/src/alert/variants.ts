interface AlertVariantStyles {
  border: string;
  interior: string;
  icon: string;
  title: string;
  description: string;
}

export type AlertVariants = 'base' | 'info' | 'destructive' | 'success' | 'warning';

export const AlertVariants: Record<AlertVariants, AlertVariantStyles> = {
  info: {
    border: 'border-blue-600',
    interior: 'bg-blue-700/20',
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
  success: {
    border: 'border-success',
    interior: 'bg-success/10',
    icon: 'text-success',
    title: 'text-success',
    description: 'text-success/80',
  },
  warning: {
    border: 'border-yellow-600',
    interior: 'bg-yellow-700/20',
    icon: 'text-yellow-400',
    title: 'text-yellow-400',
    description: 'text-yellow-200',
  },
  base: {
    border: '',
    interior: '',
    icon: '',
    title: '',
    description: 'opacity-80',
  }
};
