export const trackVariants = {
  primary: 'bg-muted',
  secondary: 'bg-secondary/30',
  accent: 'bg-accent/30',
  muted: 'bg-muted',
} as const;
export type TrackVariant = keyof typeof trackVariants;

export const rangeVariants = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-success',
  destructive: 'bg-destructive',
} as const;
export type RangeVariant = keyof typeof rangeVariants;

export const thumbVariants = {
  primary: 'bg-primary border-white',
  secondary: 'bg-secondary border-white',
  accent: 'bg-accent border-white',
  success: 'bg-success border-white',
  destructive: 'bg-destructive border-white',
  outline: 'bg-white border-primary',
} as const;
export type ThumbVariant = keyof typeof thumbVariants;

export const sizeVariants = {
  sm: {
    track: 'h-1',
    thumb: 'w-3 h-3 -top-1',
    thumbOffset: '6px',
  },
  md: {
    track: 'h-2',
    thumb: 'w-5 h-5 -top-1.5',
    thumbOffset: '10px',
  },
  lg: {
    track: 'h-3',
    thumb: 'w-6 h-6 -top-1.5',
    thumbOffset: '12px',
  },
} as const;
export type SliderSize = keyof typeof sizeVariants;

export interface SliderVariants {
  track: TrackVariant;
  range: RangeVariant;
  thumb: ThumbVariant;
  size: SliderSize;
}

export const sliderDefaults: SliderVariants = {
  track: 'primary',
  range: 'primary',
  thumb: 'primary',
  size: 'md',
} as const;
