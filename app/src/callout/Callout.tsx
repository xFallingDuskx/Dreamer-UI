import { CheckCircled, CrossCircled, ExclamationTriangle, InfoCircled, X } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useState } from 'react';
import { DeepRing } from './icons.tsx';
import { CalloutVariants } from './variants.ts';

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
  /** Whether the Callout can be dismissed. */
  dismissible?: boolean;
  /** Callback function when the Callout is dismissed. */
  onDismiss?: () => void;
}

const VariantIcons: Record<CalloutVariants, React.ReactNode> = {
  info: <InfoCircled size={22} />,
  destructive: <CrossCircled size={22} />,
  success: <CheckCircled size={22} />,
  warning: <ExclamationTriangle size={20} />,
  base: <DeepRing size={22} />,
};

export function Callout({
  id,
  ref,
  variant = 'base',
  icon,
  title,
  description,
  className,
  dismissible = false,
  onDismiss,
}: CalloutProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const variantStyles = CalloutVariants[variant];
  const variantIcon = VariantIcons[variant];

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  }

  if (isDismissed) {
    return null;
  }

  return (
    <div
      id={id}
      ref={ref}
      className={join('relative rounded-lg p-2 sm:p-4 border', variantStyles.border, variantStyles.interior, className)}
      data-variant={variant}
    >
      <div className='flex items-start gap-x-2'>
        {icon && <span className={variantStyles.core}>{icon === 'default' ? variantIcon : icon}</span>}
        {(title || description) && (
          <div className='flex-1'>
            {title && <div className={join('font-medium', variantStyles.core)}>{title}</div>}
            {description && <div className={join('mt-0.5 font-light', variantStyles.description)}>{description}</div>}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type='button'
          onClick={handleDismiss}
          data-callout-close-button='true'
          className={join(
            variantStyles.core,
            'rounded-md p-0.5 top-2.5 right-2.5 absolute focus:outline-none hover:ring focus:ring-2 focus:ring-current leading-0'
          )}
          aria-label='Close callout'
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
