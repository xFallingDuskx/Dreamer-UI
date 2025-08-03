import { useEffect, useState } from 'react';
import { join } from '../../utils';

export default function LoadingDots() {
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
            'rounded-full transition-all duration-500 ease-in-out size-[0.35em] bg-current',
            activeIndex === index && 'transform -translate-y-1'
          )}
        />
      ))}
    </div>
  );
}
