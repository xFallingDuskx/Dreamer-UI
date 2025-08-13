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
}

export default function Skeleton({
  shape = 'rectangle',
  lineSpacing = 'sm',
  className,
  lines = 1,
  animate = true,
  ...props
}: SkeletonProps) {
  const baseClasses = join('bg-muted', animate && 'animate-pulse', skeletonVariants.shape[shape], className);

  // If lines is greater than 1, render multiple skeleton lines
  if (lines > 1) {
    return (
      <div
        className={skeletonVariants.lineSpacing[lineSpacing]}
        data-testid='skeleton-container'
        data-lines={lines}
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
            data-testid='skeleton-line'
            data-line-index={index}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} data-testid='skeleton' data-shape={shape} data-animate={animate} {...props} />;
}