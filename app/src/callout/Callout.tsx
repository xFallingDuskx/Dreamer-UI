import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { CalloutVariants } from './variants.ts';
import { CheckCircled, CrossCircled, ExclamationTriangle, InfoCircled } from '@moondreamsdev/dreamer-ui/symbols';
import { DeepRing } from './icons.tsx';

export interface CalloutProps {
  /**The id of the Callout. */
  id?: string;
  /**The ref for the Callout. */
  ref?: React.Ref<HTMLDivElement>;
  /**The variant of the Callout. */
  variant?: CalloutVariants;
  /** The icon to display in the top-left corner of the Callout.*/
  icon?: 'default' | React.ReactNode;
  /** The title of the Callout. */
  title?: React.ReactNode;
  /** The description of the Callout. */
  description?: React.ReactNode;
  /** Additional classes to apply to the Callout. */
  className?: string;
}

const VariantIcons: Record<CalloutVariants, React.ReactNode> = {
  info: <InfoCircled size={22} />,
  destructive: <CrossCircled size={22} />,
  success: <CheckCircled size={22} />,
  warning: <ExclamationTriangle size={20} />,
  base: <DeepRing size={22} />,
};

export function Callout({ id, ref, variant = 'base', icon, title, description, className }: CalloutProps) {
  const variantStyles = CalloutVariants[variant];
  const variantIcon = VariantIcons[variant];

  return (
    <div
      id={id}
      ref={ref}
      className={join('rounded-lg p-2 sm:p-4 border', variantStyles.border, variantStyles.interior, className)}
      data-variant={variant}
    >
      <div className='flex items-start gap-x-2'>
        {icon && (
          <span className={variantStyles.icon}>{icon === 'default' ? variantIcon : icon}</span>
        )}
        {(title || description) && (
          <div className='flex-1'>
            {title && <div className={join('font-medium', variantStyles.title)}>{title}</div>}
            {description && <div className={join('mt-0.5 font-light', variantStyles.description)}>{description}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
