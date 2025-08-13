import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { Ref, useId } from 'react';
import { useDetectedOrientation } from './hooks';
import { ColorVariant, colorVariants, sizeVariants, Thickness, thicknessVariants } from './variants';

export type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  ref?: Ref<HTMLDivElement>;
  orientation?: Orientation;
  /**
   * Whether the separator is decorative only or serves a semantic purpose.
   * When decorative=true, it's hidden from screen readers.
   * @default false
   */
  decorative?: boolean;
  thickness?: Thickness;
  variant?: ColorVariant;
}

export default function Separator({
  orientation,
  decorative = false,
  thickness = 'thin',
  variant = 'default',
  className,
  id,
  ...props
}: SeparatorProps) {
  const generatedId = useId();
  const separatorId = id || generatedId;
  const detectedOrientation = useDetectedOrientation(orientation, separatorId);

  const finalOrientation = orientation || detectedOrientation;

  const separatorClasses = join(
    'shrink-0',
    sizeVariants[finalOrientation],
    thicknessVariants[thickness][finalOrientation],
    colorVariants[variant],
    className
  );

  return (
    <div
      {...props}
      className={separatorClasses}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : finalOrientation}
      aria-hidden={decorative}
      data-orientation={finalOrientation}
      data-thickness={thickness}
      data-variant={variant}
    />
  );
}
