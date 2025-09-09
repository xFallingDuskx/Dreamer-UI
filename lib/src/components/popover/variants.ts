export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlignment = 'start' | 'center' | 'end';

export const placementVariants: Record<PopoverPlacement, Record<PopoverAlignment, string>> = {
  bottom: {
    start: 'top-full left-0 origin-top-left',
    center: 'top-full left-1/2 -translate-x-1/2 origin-top',
    end: 'top-full right-0 origin-top-right',
  },
  top: {
    start: 'bottom-full left-0 origin-bottom-left',
    center: 'bottom-full left-1/2 -translate-x-1/2 origin-bottom',
    end: 'bottom-full right-0 origin-bottom-right',
  },
  left: {
    start: 'right-full top-0 origin-top-right',
    center: 'right-full top-1/2 -translate-y-1/2 origin-right',
    end: 'right-full bottom-0 origin-bottom-right',
  },
  right: {
    start: 'left-full top-0 origin-top-left',
    center: 'left-full top-1/2 -translate-y-1/2 origin-left',
    end: 'left-full bottom-0 origin-bottom-left',
  },
} as const;
