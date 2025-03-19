import React from 'react';
import { join } from '../../util/join';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  display?: 'block' | 'inline';
  width?: React.CSSProperties['width'];
  required?: boolean;
  suffix?: React.ReactNode;
}

export function Label({
  display = 'inline',
  width = 'fit-content',
  className = '',
  required,
  suffix,
  ...props
}: LabelProps) {
  const labelClasses = join('font-medium', display, className);

  return (
    <div style={{ display: display === 'inline' ? 'inline-flex' : 'flex', width }}>
      <label className={labelClasses} aria-required={required} {...props} />
      {required && (
        <span className='text-red-500 font-medium ml-1' title='Required field'>
          *
        </span>
      )}
      {suffix && <span className='ml-1'>{suffix}</span>}
    </div>
  );
}
