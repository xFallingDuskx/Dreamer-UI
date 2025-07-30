import React from 'react';
import { join } from '../../util/join';
import QuestionMarkCircled from '../../symbols/QuestionMarkCircled';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  display?: 'block' | 'inline';
  width?: React.CSSProperties['width'];
  required?: boolean;
  helpMessage?: string;
  suffix?: React.ReactNode;
}

export function Label({
  display = 'inline',
  width = 'fit-content',
  className = '',
  required,
  helpMessage,
  suffix,
  ...props
}: LabelProps) {
  const labelClasses = join('font-medium', display, className);

  return (
    <div style={{ display: display === 'inline' ? 'inline-flex' : 'flex', width }} className='relative'>
      <label className={labelClasses} aria-required={required} {...props} />
      {required && (
        <span className='text-red-500 font-medium ml-1' title='Required field'>
          *
        </span>
      )}
      {helpMessage && (
        <span
          className='text-gray-500 ml-1 absolute top-0 right-0 translate-x-full -translate-y-1/2'
          title={helpMessage}
        >
          <QuestionMarkCircled />
        </span>
      )}
      {suffix && <span className='ml-1'>{suffix}</span>}
    </div>
  );
}
