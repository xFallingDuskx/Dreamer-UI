interface GraphVariantStyles {
  container: string;
  width: number;
  height: number;
  padding: number;
}

export type GraphSize = 'sm' | 'md' | 'lg' | 'full';

export const GraphSizes: Record<GraphSize, GraphVariantStyles> = {
  sm: {
    container: 'text-sm',
    width: 400,
    height: 200,
    padding: 20,
  },
  md: {
    container: 'text-base',
    width: 600,
    height: 300,
    padding: 24,
  },
  lg: {
    container: 'text-lg',
    width: 800,
    height: 400,
    padding: 32,
  },
  full: {
    container: 'text-base w-full',
    width: 0, // Will be calculated dynamically
    height: 400,
    padding: 32,
  },
};

export type GraphTheme = 'primary' | 'secondary' | 'accent';

export const GraphThemes: Record<GraphTheme, string> = {
  primary: 'stroke-primary',
  secondary: 'stroke-secondary', 
  accent: 'stroke-accent',
};

export interface GraphVariants {
  size: GraphSize;
  theme: GraphTheme;
}

export const graphDefaults: GraphVariants = {
  size: 'md',
  theme: 'primary',
} as const;