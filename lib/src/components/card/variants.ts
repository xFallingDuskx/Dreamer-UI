interface CardVariantStyles {
  container: string;
  header: string;
  content: string;
  footer: string;
  paddingMulti: number;
}

export type CardSize = 'sm' | 'md' | 'lg';

export const CardSizes: Record<CardSize, CardVariantStyles> = {
  sm: {
    container: 'text-sm',
    header: 'text-base font-medium',
    content: 'text-sm leading-relaxed',
    footer: 'text-xs',
    paddingMulti: 1 / 3,
  },
  md: {
    container: 'text-base',
    header: 'text-lg font-semibold',
    content: 'text-base leading-relaxed',
    footer: 'text-sm',
    paddingMulti: 1 / 2,
  },
  lg: {
    container: 'text-lg',
    header: 'text-xl font-bold',
    content: 'text-lg leading-relaxed',
    footer: 'text-base',
    paddingMulti: 1,
  },
};