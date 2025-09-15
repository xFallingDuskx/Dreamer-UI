// Calendar Size variants
export type CalendarSize = 'sm' | 'md' | 'lg';

export const CalendarSizes: Record<CalendarSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// Calendar Variant styles
export type CalendarVariant = 'default' | 'compact';

export const CalendarVariants: Record<CalendarVariant, string> = {
  default: 'gap-1',
  compact: 'gap-0.5',
};