import { useId } from 'react';
import { join } from '../../util/join';
import { RadioInput } from './RadioInput';

export type RadioGroupItemProps = {
  option: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  hideInput?: boolean;
  name?: string;
};

export function RadioGroupItem({
  option,
  value,
  children,
  className = '',
  isSelected = false,
  onChange,
  disabled = false,
  hideInput = false,
  name,
}: RadioGroupItemProps) {
  const id = useId();
  const itemId = `radio-${id}-${option}`;

  const handleChange = () => {
    if (!hideInput) {
      onChange?.(value);
    }
  };

  return (
    <div
      className={join(
        'relative flex items-center',
        className,
        hideInput && 'p-2 border-2 border-transparent',
        isSelected && hideInput && 'border-border'
      )}
      onClick={handleChange}
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
          />
      )}
      <div
        role={hideInput ? 'radio' : undefined}
        aria-checked={!hideInput ? undefined : isSelected ? 'true' : 'false'}
        aria-disabled={hideInput ? disabled : undefined}
        aria-description={hideInput ? `Radio button for ${name}` : undefined}
        className={join(hideInput && 'w-full')}
      >
        <label
          htmlFor={hideInput ? undefined : itemId}
          className={join(disabled && 'cursor-not-allowed', !disabled && 'cursor-pointer')}
        >
          {children}
        </label>
      </div>
    </div>
  );
}
