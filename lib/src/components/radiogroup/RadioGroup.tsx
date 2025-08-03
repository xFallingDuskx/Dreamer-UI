import React, { useId, useMemo } from 'react';
import { join } from '../../utils';
import { RadioGroupItem, RadioGroupItemProps } from './RadioGroupItem';
import { useRadioFocus } from './hooks';

export type RadioOption = { label: string; value: string; disabled?: boolean; description?: string };

export type RadioGroupProps = {
  options?: (string | RadioOption)[];
  value: string | undefined;
  onChange: (value: string) => void;
  name?: string;
  children?: React.ReactElement<RadioGroupItemProps>[] | React.ReactElement<RadioGroupItemProps>;
  className?: string;
  childrenClassName?: string;
  hideInputs?: boolean;
};

export function RadioGroup({
  options = [],
  value,
  onChange,
  name,
  children,
  className = '',
  childrenClassName = '',
  hideInputs = false,
}: RadioGroupProps) {
  const groupId = useId();
  const groupName = name || `radio-group-${groupId}`;
  useRadioFocus(
    groupName,
    options.findIndex((option) => option === value)
  );

  // Check for duplicates if string options are provided
  const processedOptions = useMemo(() => {
    return options.reduce<RadioOption[]>((acc, option) => {
      if (typeof option === 'string') {
        // Check if we already have this string option
        if (!acc.some((item) => item.value === option)) {
          acc.push({ label: option, value: option });
        }
      } else {
        acc.push(option);
      }
      return acc;
    }, []);
  }, [options]);

  return (
    <div id={groupName} role='radiogroup' tabIndex={0} className={join(className, 'focus:outline-none')}>
      {/* Render from options prop */}
      {processedOptions.length > 0 &&
        processedOptions.map((option, index) => (
          <RadioGroupItem
            key={`${option.value}-${index}`}
            value={option.value}
            isSelected={value === option.value}
            onChange={onChange}
            name={groupName}
            disabled={option.disabled}
            description={option.description}
            hideInput={hideInputs}
            className={childrenClassName}
          >
            {option.label}
          </RadioGroupItem>
        ))}

      {/* Render RadioGroupItem components */}
      {processedOptions.length === 0 &&
        children &&
        React.Children.map(children, (child) => {
          // TypeScript enforces that child is a RadioGroupItem
          if (React.isValidElement(child) && child.type === RadioGroupItem) {
            return (
              <RadioGroupItem
                {...child.props}
                className={join(childrenClassName, child.props.className)}
                hideInput={child.props.hideInput || hideInputs}
                isSelected={value === child.props.value}
                onChange={onChange}
                name={groupName}
              >
                {child.props.children}
              </RadioGroupItem>
            );
          }
          return null;
        })}
    </div>
  );
}
