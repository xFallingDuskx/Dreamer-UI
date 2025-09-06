interface CalloutVariantStyles {
  border: string;
  interior: string;
  core: string; // used for icon, title, and close button
  description: string;
}

export type CalloutVariants = 'base' | 'info' | 'destructive' | 'success' | 'warning';

export const CalloutVariants: Record<CalloutVariants, CalloutVariantStyles> = {
  info: {
    border: 'border-blue-600',
    interior: 'bg-blue-800/20',
    core: 'text-blue-400',
    description: 'text-blue-200',
  },
  destructive: {
    border: 'border-destructive',
    interior: 'bg-destructive/10',
    core: 'text-destructive',
    description: 'text-destructive',
  },
  success: {
    border: 'border-success',
    interior: 'bg-success/10',
    core: 'text-success',
    description: 'text-success',
  },
  warning: {
    border: 'border-yellow-700',
    interior: 'bg-yellow-800/20',
    core: 'text-yellow-400',
    description: 'text-yellow-200',
  },
  base: {
    border: '',
    interior: '',
    core: '',
    description: 'opacity-90',
  }
};
