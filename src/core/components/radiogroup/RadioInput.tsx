import { join } from '../../util/join';

export type RadioInputProps = {
  itemId: string;
  checked: boolean;
  onChange: () => void;
  name: string;
  disabled?: boolean;
  className?: string;
};

// Custom RadioInput Component
export function RadioInput({ itemId, checked, onChange, name, disabled = false, className = '' }: RadioInputProps) {
  const baseClasses = 'relative inline-flex items-center justify-center rounded-full';
  const disabledClasses = 'border-gray-300 bg-gray-100 cursor-not-allowed';

  const radioClasses = join(
    baseClasses,
    !checked && 'hover:border-current/60',
    !disabled && 'border-current cursor-pointer',
    disabled && disabledClasses,
    className
  );
  return (
    <div
      id={itemId}
      role='radio'
      aria-checked={checked}
      aria-disabled={disabled}
      aria-description={`Radio button for ${name}`}
      onClick={disabled ? undefined : onChange}
      className={radioClasses}
      style={{
        width: '1em',
        height: '1em',
        padding: '0.1em',
        borderWidth: '0.06em',
      }}
    >
      {checked && (
        <div
          className={join(`size-full aspect-square rounded-full`, disabled && 'bg-muted', !disabled && 'bg-current')}
        ></div>
      )}
    </div>
  );
}
