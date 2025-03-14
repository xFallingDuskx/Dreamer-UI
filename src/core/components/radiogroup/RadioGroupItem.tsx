import { useId } from 'react';
import { join } from '../../util/join';
import { RadioInput } from './RadioInput';

export interface RadioGroupItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  hideInput?: boolean;
  description?: string;
}

export function RadioGroupItem({
  value,
  children,
  className = '',
  isSelected = false,
  onChange,
  disabled = false,
  hideInput = false,
  description,
  name,
}: RadioGroupItemProps) {
  const id = useId();
  const itemId = `radio-${id}-${value}`;

  const handleChange = () => {
    if (!disabled) {
      onChange?.(value);
    }
  };

  return (
    <div
      title={description}
      className={join(
        'relative flex items-center',
        className,
        // Uses text color for borders
        hideInput &&
          `p-2 border-2 focus-within:border-dashed focus-within:${
            disabled ? 'border-current/50' : 'border-current/80'
          }`,
        hideInput && !isSelected && `border-transparent ${disabled ? '' : 'not-focus-within:hover:border-border/60'}`,
        hideInput && isSelected && 'border-border',
        disabled && 'opacity-60 cursor-not-allowed'
      )}
      style={{
        gap: '0.5em',
      }}
    >
      {!hideInput && (
        <RadioInput
          itemId={itemId}
          name={name || ''}
          checked={isSelected}
          onChange={handleChange}
          disabled={disabled}
          className={join(hideInput && '')}
        />
      )}
      <div
        id={hideInput ? itemId : undefined}
        tabIndex={hideInput ? -1 : undefined}
        role={hideInput ? 'radio' : undefined}
        onClick={hideInput ? handleChange : undefined}
        aria-checked={!hideInput ? undefined : isSelected ? 'true' : 'false'}
        aria-disabled={hideInput ? disabled : undefined}
        aria-description={!hideInput ? undefined : description || `Radio button for ${name}`}
        aria-labelledby={hideInput ? `${itemId}-label` : undefined}
        className={join(hideInput && 'size-full', typeof children === 'object' && 'grow focus:outline-none')}
      >
        <label
          id={`${itemId}-label`}
          onClick={hideInput ? undefined : handleChange}
          className={join(disabled && 'cursor-not-allowed', !disabled && 'cursor-pointer')}
        >
          {children}
        </label>
      </div>
    </div>
  );
}
