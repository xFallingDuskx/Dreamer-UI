import React, { useId } from 'react';
import { join } from '../../utils';
import { HelpIcon } from '../help-icon';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** The display type of the label. */
  display?: 'block' | 'inline';
  /** The width of the label element. */
  width?: React.CSSProperties['width'];
  /** Whether to show a required indicator (*) next to the label. */
  required?: boolean;
  /** Help text to display in a tooltip next to the label. */
  helpMessage?: string;
  /** Additional content to display after the label text. */
  suffix?: React.ReactNode;
  /** Description text to display below the label. */
  description?: string;
}

/**
 * A form label component with support for required indicators, help tooltips,
 * and description text. Provides accessibility features for form elements.
 * 
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 * 
 * // Required field with description
 * <Label 
 *   htmlFor="password"
 *   required
 *   description="Must be at least 8 characters"
 * >
 *   Password
 * </Label>
 * 
 * // With help tooltip
 * <Label 
 *   htmlFor="username"
 *   helpMessage="Username will be visible to other users"
 * >
 *   Display Name
 * </Label>
 * ```
 */
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
          <HelpIcon
            message={helpMessage}
            className='ml-1'
            design='outlined'
            iconSize={14}
          />
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
