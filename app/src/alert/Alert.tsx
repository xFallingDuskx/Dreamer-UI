import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { AlertVariants } from './variants.ts';

export interface AlertProps {
  /**The id of the alert. */
  id?: string;
  /**The ref for the alert. */
  ref?: React.Ref<HTMLDivElement>;
  /**The variant of the alert. */
  variant?: AlertVariants;
  /** The icon to display in the top-left corner of the alert.*/
  icon?: React.ReactNode;
  /** The title of the alert. */
  title?: React.ReactNode;
  /** The description of the alert. */
  description?: React.ReactNode;
  /** Additional classes to apply to the alert. */
  className?: string;
}

export function Alert({ id, ref, variant = 'info', icon, title, description, className }: AlertProps) {
  const variantStyles = AlertVariants[variant];

  return (
    <div
      id={id}
      ref={ref}
      className={join('rounded-lg p-4 border', variantStyles.border, variantStyles.interior, className)}
      data-variant={variant}
    >
      <div className='flex items-center space-x-2'>
        {icon && <span className={variantStyles.icon}>{icon}</span>}
        {title && <h3 className={join('font-medium', variantStyles.title)}>{title}</h3>}
      </div>
      {description && <div className={join('mt-2', variantStyles.description)}>{description}</div>}
    </div>
  );
}
