interface CardVariantStyles {
  container: string;
  header: string;
  content: string;
  footer: string;
}

export type CardSize = 'sm' | 'md' | 'lg';

export const CardSizes: Record<CardSize, CardVariantStyles> = {
  sm: {
    container: 'text-sm',
    header: 'text-base font-medium',
    content: 'text-sm leading-relaxed',
    footer: 'text-xs',
  },
  md: {
    container: 'text-base',
    header: 'text-lg font-semibold',
    content: 'text-base leading-relaxed',
    footer: 'text-sm',
  },
  lg: {
    container: 'text-lg',
    header: 'text-xl font-bold',
    content: 'text-lg leading-relaxed',
    footer: 'text-base',
  },
};