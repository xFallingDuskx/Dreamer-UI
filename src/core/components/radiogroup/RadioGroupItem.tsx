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
  ariaDescription?: string;
}

export function RadioGroupItem({
  value,
  children,
  className = '',
  isSelected = false,
  onChange,
  disabled = false,
  hideInput = false,
  ariaDescription,
  name,
}: RadioGroupItemProps) {
  const id = useId();
  const itemId = `radio-${id}-${value}`;

  const handleChange = () => {
    onChange?.(value);
  };

  return (
    <div
      className={join(
        'relative flex items-center',
        className,
        hideInput && 'p-2 border-2 focus-within:border-current/80',
        hideInput && !isSelected && 'border-transparent not-focus-within:hover:border-border/60',
        hideInput && isSelected && 'border-border'
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
        aria-description={!hideInput ? undefined : ariaDescription || `Radio button for ${name}`}
        aria-labelledby={hideInput ? `${itemId}-label` : undefined}
        className={join(hideInput && 'w-full', typeof children === 'object' && 'grow focus:outline-none')}
      >
        <label
          id={`${itemId}-label`}
          onClick={hideInput ? handleChange : undefined}
          className={join(disabled && 'cursor-not-allowed', !disabled && 'cursor-pointer')}
        >
          {children}
        </label>
      </div>
    </div>
  );
}
