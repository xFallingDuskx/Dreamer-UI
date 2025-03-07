import React, { useId, useMemo } from 'react';
import { join } from '../../util/join';
import { RadioGroupItem, RadioGroupItemProps } from './RadioGroupItem';
import { useRadioFocus } from './hooks';

export type RadioOption = string | { label: string; value: string };

export type RadioGroupProps = {
  options?: RadioOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  name?: string;
  children?: React.ReactElement<RadioGroupItemProps>[] | React.ReactElement<RadioGroupItemProps>;
  className?: string;
  hideInputs?: boolean;
  excludeDescription?: boolean;
};

export function RadioGroup({
  options = [],
  value,
  onChange,
  name,
  children,
  className = '',
  hideInputs = false,
  excludeDescription = false,
}: RadioGroupProps) {
  const groupId = useId();
  const groupName = name || `radio-group-${groupId}`;
  useRadioFocus(
    groupName,
    options.findIndex((option) => option === value)
  );

  // Check for duplicates if string options are provided
  const processedOptions = useMemo(() => {
    return options.reduce<{ label: string; value: string }[]>((acc, option) => {
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
            hideInput={hideInputs}
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
            let hideProps: Partial<RadioGroupItemProps> = {};
            if (hideInputs) {
              hideProps = { hideInput: true, ariaDescription: excludeDescription ? '' : child.props.ariaDescription };
            } else {
              hideProps = { hideInput: false };
            }

            return (
              <RadioGroupItem
                {...child.props}
                {...hideProps}
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
