import React, { useId } from 'react';
import { QuestionMarkCircled } from '../../symbols';
import { join } from '../../utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  display?: 'block' | 'inline';
  width?: React.CSSProperties['width'];
  required?: boolean;
  helpMessage?: string;
  suffix?: React.ReactNode;
  description?: string;
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
  description,
  ...props
}: LabelProps) {
  const id = useId();
  const labelClasses = join('font-medium', display, className);
  const helpId = helpMessage ? `${htmlFor ?? id}-help` : undefined;

  return (
    <div style={{ display: display === 'inline' ? 'inline-block' : 'block', width }}>
      <div className='relative flex'>
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
            className='text-gray-500 ml-1 size-fit -translate-y-1/3'
            aria-describedby={helpId}
            aria-label='Help information'
            title={helpMessage}
          >
            <QuestionMarkCircled />
          </span>
        )}
        {helpMessage && (
          <div id={helpId} className='sr-only'>
            {helpMessage}
          </div>
        )}
        {suffix && <span className='ml-1'>{suffix}</span>}
      </div>
      {description && <div className='opacity-80 mt-1'>{description}</div>}
    </div>
  );
}
