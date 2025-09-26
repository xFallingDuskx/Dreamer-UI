import React, { Ref } from 'react';
import { join } from '../../utils';
import { sizeVariants, Thickness, thicknessVariants } from './variants';

export type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Reference to the separator element */
  ref?: Ref<HTMLDivElement>;
  /** The orientation of the separator */
  orientation?: Orientation;
  /** Whether the separator is decorative only. When true, it's hidden from screen readers */
  decorative?: boolean;
  /** The thickness variant of the separator */
  thickness?: Thickness;
}

/**
 * A visual separator component for dividing content sections.
 * Supports both horizontal and vertical orientations with customizable thickness.
 * 
 * @example
 * ```tsx
 * // Horizontal separator
 * <Separator />
 * 
 * // Vertical separator
 * <Separator orientation="vertical" className="h-6" />
 * 
 * // Thick separator
 * <Separator thickness="thick" />
 * 
 * // Decorative separator (hidden from screen readers)
 * <Separator decorative />
 * ```
 */
export function Separator({
  orientation = 'horizontal',
  decorative = false,
  thickness = 'thin',
  className,
  ...props
}: SeparatorProps) {
  const separatorClasses = join(
    'shrink-0 bg-border',
    sizeVariants[orientation],
    thicknessVariants[thickness][orientation],
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
    />
  );
}
