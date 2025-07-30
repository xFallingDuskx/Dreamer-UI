import React, { useId } from 'react';
import { QuestionMarkCircled } from '../../symbols';
import { join } from '../../util/join';

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
  htmlFor,
  children,
  ...props
}: LabelProps) {
  const id = useId();
  const labelClasses = join('font-medium', display, className);
  const helpId = helpMessage ? `${htmlFor}-help` : id;

  return (
    <div style={{ display: display === 'inline' ? 'inline-flex' : 'flex', width }} className='relative'>
      <label className={labelClasses} htmlFor={htmlFor} {...props}>
        {children}
        {required && (
          <span className='text-red-500 font-medium ml-1' aria-label='required'>
            *
          </span>
        )}
      </label>
      {helpMessage && (
        <span
          className='text-gray-500 ml-1 p-1'
          aria-describedby={helpId}
          aria-label='Help information'
          title={helpMessage}
        >
          <QuestionMarkCircled />
        </span>
      )}
      {helpMessage && (
        <div id={helpId} className='sr-only' role='tooltip'>
          {helpMessage}
        </div>
      )}
      {suffix && <span className='ml-1'>{suffix}</span>}
    </div>
  );
}
