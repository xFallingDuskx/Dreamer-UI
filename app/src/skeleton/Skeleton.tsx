import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { skeletonVariants, type SkeletonVariants } from './variants';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  /** Custom class name for additional styling */
  className?: string;
  /** Number of skeleton lines to render (for text-like skeletons) */
  lines?: number;
  /** Whether the skeleton should animate */
  animate?: boolean;
  /** Ref to be passed to the skeleton element */
  ref?: React.Ref<HTMLDivElement>;
}

export default function Skeleton({
  shape = 'rectangle',
  lineSpacing = 'sm',
  className,
  lines = 1,
  animate = true,
  ref,
  ...props
}: SkeletonProps) {
  const baseClasses = join('bg-muted/70', animate && 'animate-pulse', skeletonVariants.shape[shape], className);

  // If lines is greater than 1, render multiple skeleton lines
  if (lines > 1) {
    return (
      <div
        ref={ref}
        className={skeletonVariants.lineSpacing[lineSpacing]}
        role='presentation'
        aria-hidden='true'
        data-testid='skeleton-container'
        data-lines={lines}
        data-shape={shape}
        data-animate={animate}
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={join(
              baseClasses,
              // Make last line shorter for a more natural text appearance
              index === lines - 1 && 'w-3/4'
            )}
            role='presentation'
            aria-hidden='true'
            data-testid='skeleton-line'
            data-line-index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseClasses}
      role='presentation'
      aria-hidden='true'
      data-testid='skeleton'
      data-shape={shape}
      data-animate={animate}
      {...props}
    />
  );
}
