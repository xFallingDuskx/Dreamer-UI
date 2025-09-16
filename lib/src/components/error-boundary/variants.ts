interface ErrorBoundaryVariantStyles {
  container: string;
  icon: string;
  title: string;
  description: string;
  button: string;
  details: string;
}

export type ErrorBoundaryVariants = 'danger' | 'warning' | 'info';

export const ErrorBoundaryVariants: Record<ErrorBoundaryVariants, ErrorBoundaryVariantStyles> = {
  danger: {
    container: 'border-destructive bg-destructive/10',
    icon: 'text-destructive',
    title: 'text-destructive',
    description: 'text-destructive/80',
    button: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive',
    details: 'bg-destructive/5 border-destructive/20 text-destructive',
  },
  warning: {
    container: 'border-yellow-600 bg-yellow-600/10',
    icon: 'text-yellow-600',
    title: 'text-yellow-600',
    description: 'text-yellow-600/80',
    button: 'bg-yellow-600 text-white hover:bg-yellow-600/90 focus:ring-yellow-600',
    details: 'bg-yellow-600/5 border-yellow-600/20 text-yellow-600',
  },
  info: {
    container: 'border-blue-600 bg-blue-600/10',
    icon: 'text-blue-600',
    title: 'text-blue-600',
    description: 'text-blue-600/80',
    button: 'bg-blue-600 text-white hover:bg-blue-600/90 focus:ring-blue-600',
    details: 'bg-blue-600/5 border-blue-600/20 text-blue-600',
  },
};