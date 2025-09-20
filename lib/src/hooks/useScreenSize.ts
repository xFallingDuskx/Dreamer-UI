import { useEffect, useState } from 'react';

/** Based on Tailwind CSS breakpoints */
export const ScreenSizeBreakpoints = {
  xs: 0, // Smaller than `sm`
  sm: 640, // Tailwind's `sm` breakpoint: `@media (min-width: 640px)`
  md: 768, // Tailwind's `md` breakpoint: `@media (min-width: 768px)`
  lg: 1024, // Tailwind's `lg` breakpoint: `@media (min-width: 1024px)`
  xl: 1280, // Tailwind's `xl` breakpoint: `@media (min-width: 1280px)`
  '2xl': 1536, // Tailwind's `2xl` breakpoint: `@media (min-width: 1536px)`
};

export type ScreenSize = keyof typeof ScreenSizeBreakpoints;

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>();
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const getBreakpoint = (size: ScreenSize) => ScreenSizeBreakpoints[size];

  useEffect(() => {
    const getScreenSize = (width: number): ScreenSize => {
      if (width >= ScreenSizeBreakpoints['2xl']) return '2xl';
      if (width >= ScreenSizeBreakpoints['xl']) return 'xl';
      if (width >= ScreenSizeBreakpoints['lg']) return 'lg';
      if (width >= ScreenSizeBreakpoints['md']) return 'md';
      if (width >= ScreenSizeBreakpoints['sm']) return 'sm';
      return 'xs';
    };

    setScreenSize(getScreenSize(window.innerWidth));
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screenSize, screenWidth, getBreakpoint };
}
