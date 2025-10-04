import { useEffect, useState } from 'react';
import { join } from '../../utils';

/**
 * An animated loading indicator with three bouncing dots.
 * Used internally by Button component to show loading state.
 * 
 * @example
 * ```tsx
 * <LoadingDots />
 * ```
 */
export function LoadingDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='absolute inset-0 inline-flex items-center justify-center gap-x-2 align-middle'>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={join(
            'rounded-full transition-all ease-in-out size-[0.35em] bg-current',
            activeIndex === index && 'transform -translate-y-1'
          )}
        />
      ))}
    </div>
  );
}