import { useEffect, useState } from 'react';
import { ScreenSize } from './types';

// Define Tailwind CSS breakpoints
const breakpoints = {
  xs: 0, // Smaller than `sm`
  sm: 640, // Tailwind's `sm` breakpoint: `@media (min-width: 640px)`
  md: 768, // Tailwind's `md` breakpoint: `@media (min-width: 768px)`
  lg: 1024, // Tailwind's `lg` breakpoint: `@media (min-width: 1024px)`
  xl: 1280, // Tailwind's `xl` breakpoint: `@media (min-width: 1280px)`
  '2xl': 1536, // Tailwind's `2xl` breakpoint: `@media (min-width: 1536px)`
} as const;

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('lg'); // Default to lg for SSR
  const [screenWidth, setScreenWidth] = useState<number>(1024);

  useEffect(() => {
    const getScreenSize = (width: number): ScreenSize => {
      if (width >= breakpoints['2xl']) return '2xl';
      if (width >= breakpoints['xl']) return 'xl';
      if (width >= breakpoints['lg']) return 'lg';
      if (width >= breakpoints['md']) return 'md';
      if (width >= breakpoints['sm']) return 'sm';
      return 'xs';
    };

    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setScreenSize(getScreenSize(width));
    };

    // Set initial values
    updateScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', updateScreenSize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  return { screenSize, screenWidth };
}