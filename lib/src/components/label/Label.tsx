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
  const showHelp = (helpMessage?.trim()?.length || 0) > 0;
  const showDescription = (description?.trim()?.length || 0) > 0;
  const helpId = showHelp ? `${htmlFor ?? id}-help` : undefined;
  const descriptionId = showDescription ? `${htmlFor ?? id}-description` : undefined;

  return (
    <div
      style={{ display: display === 'inline' ? 'inline-block' : 'block', width }}
      className={join('mb-0.5', className)}
    >
      <div className='relative flex'>
        <label className='font-medium' htmlFor={htmlFor} {...props}>
          {children}
          {required && (
            <span className='text-red-500 font-medium ml-1' aria-label='required'>
              *
            </span>
          )}
        </label>
        {showHelp && (
          <span
            className='text-gray-500 ml-1 size-fit -translate-y-1/3'
            aria-describedby={helpId}
            aria-label='Help information'
            title={helpMessage}
          >
            <QuestionMarkCircled />
          </span>
        )}
        {showHelp && (
          <div id={helpId} className='sr-only'>
            {helpMessage}
          </div>
        )}
        {suffix && <span className='ml-1'>{suffix}</span>}
      </div>
      {showDescription && (
        <small id={descriptionId} className='block opacity-80 mt-0.5' role='note'>
          {description}
        </small>
      )}
    </div>
  );
}
