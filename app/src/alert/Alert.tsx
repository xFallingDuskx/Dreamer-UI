import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { AlertVariants } from './variants.ts';
import { CheckCircled, CrossCircled, ExclamationTriangle, InfoCircled } from '@moondreamsdev/dreamer-ui/symbols';
import { DeepRing } from './icons.tsx';

export interface AlertProps {
  /**The id of the alert. */
  id?: string;
  /**The ref for the alert. */
  ref?: React.Ref<HTMLDivElement>;
  /**The variant of the alert. */
  variant?: AlertVariants;
  /** The icon to display in the top-left corner of the alert.*/
  icon?: 'default' | React.ReactNode;
  /** The title of the alert. */
  title?: React.ReactNode;
  /** The description of the alert. */
  description?: React.ReactNode;
  /** Additional classes to apply to the alert. */
  className?: string;
}

const VariantIcons: Record<AlertVariants, React.ReactNode> = {
  info: <InfoCircled size={22} />,
  destructive: <CrossCircled size={22} />,
  success: <CheckCircled size={22} />,
  warning: <ExclamationTriangle size={18} />,
  base: <DeepRing size={20} />,
};

export function Alert({ id, ref, variant = 'info', icon, title, description, className }: AlertProps) {
  const variantStyles = AlertVariants[variant];
  const variantIcon = VariantIcons[variant];

  return (
    <div
      id={id}
      ref={ref}
      className={join('rounded-lg p-4 border', variantStyles.border, variantStyles.interior, className)}
      data-variant={variant}
    >
      <div className='flex items-center space-x-2'>
        {icon && (
          <span className={join('leading-0', variantStyles.icon)}>{icon === 'default' ? variantIcon : icon}</span>
        )}
        {title && <h3 className={join('font-medium', variantStyles.title)}>{title}</h3>}
      </div>
      {description && <div className={join('mt-2', variantStyles.description)}>{description}</div>}
    </div>
  );
}
