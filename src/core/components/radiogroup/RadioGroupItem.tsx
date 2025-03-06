import { useId } from 'react';
import { join } from '../../util/join';
import { RadioInput } from './RadioInput';

interface BaseProps {
  option: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

interface WithInputProps extends BaseProps {
  hideInput?: false;
  ariaDescription?: never;
}

interface WithoutInputProps extends BaseProps {
  hideInput: true;
  ariaDescription: string;
}

export type RadioGroupItemProps = WithInputProps | WithoutInputProps;

export function RadioGroupItem({
  option,
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
  const itemId = `radio-${id}-${option}`;

  const handleChange = () => {
    if (!hideInput) {
      onChange(value);
    }
  };

  return (
    <div
      className={join(
        'relative flex items-center',
        className,
        hideInput && 'p-2 border-2 focus-within:border-border/60',
        hideInput && !isSelected && 'border-transparent hover:border-border/60',
        isSelected && hideInput && 'border-border'
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
        />
      )}
      <div
        role={hideInput ? 'radio' : undefined}
        aria-checked={!hideInput ? undefined : isSelected ? 'true' : 'false'}
        aria-disabled={hideInput ? disabled : undefined}
        aria-description={!hideInput ? undefined : ariaDescription || `Radio button for ${name}`}
        aria-labelledby={hideInput ? `${itemId}-label` : undefined}
        className={join(hideInput && 'w-full')}
      >
        <label
          id={`${itemId}-label`}
          onClick={handleChange}
          className={join(disabled && 'cursor-not-allowed', !disabled && 'cursor-pointer')}
        >
          {children}
        </label>
      </div>
    </div>
  );
}
