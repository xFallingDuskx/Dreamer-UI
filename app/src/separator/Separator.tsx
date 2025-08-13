import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { Ref } from 'react';
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
  orientation = 'horizontal',
  decorative = false,
  thickness = 'thin',
  variant = 'default',
  className,
  ...props
}: SeparatorProps) {
  const separatorClasses = join(
    'shrink-0',
    sizeVariants[orientation],
    thicknessVariants[thickness][orientation],
    colorVariants[variant],
    className
  );

  return (
    <div
      {...props}
      className={separatorClasses}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative}
      data-orientation={orientation}
      data-thickness={thickness}
      data-variant={variant}
    />
  );
}
