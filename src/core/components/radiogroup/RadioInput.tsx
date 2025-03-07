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

  const handleClick = () => {
    if (disabled) return;
    onChange();
  };

  const radioClasses = join(
    baseClasses,
    !checked && 'hover:border-current/60',
    !disabled && 'border-current cursor-pointer',
    disabled && 'border-muted/60 cursor-not-allowed',
    className
  );
  return (
    <div
      id={itemId}
      role='radio'
      tabIndex={-1} // necessary so that the radio button can be focused as div is not a focusable element
      aria-checked={checked}
      aria-disabled={disabled}
      aria-description={`Radio button for ${name}`}
      aria-labelledby={`${itemId}-label`}
      onClick={handleClick}
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
          className={join(`size-full aspect-square rounded-full`, disabled && 'bg-muted/60', !disabled && 'bg-current')}
        />
      )}
    </div>
  );
}
