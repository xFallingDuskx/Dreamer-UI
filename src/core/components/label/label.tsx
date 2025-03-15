import React from 'react';
import { join } from '../../util/join';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  display?: 'block' | 'inline';
  width?: React.CSSProperties['width'];
  required?: boolean;
  optional?: boolean;
}

export function Label({ display = 'inline', width = 'fit-content', className = '', ...props }: LabelProps) {
  const labelClasses = join('font-medium', display, className);

  return (
    <div style={{ display: display === 'inline' ? 'inline-flex' : 'flex', width }}>
      <label className={labelClasses} {...props} />
    </div>
  );
}
