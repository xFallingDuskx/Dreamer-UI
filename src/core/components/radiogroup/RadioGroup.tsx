import React, { useId, useMemo } from 'react';
import { RadioGroupItem, RadioGroupItemProps } from './RadioGroupItem';
import { useRadioFocus } from './hooks';
import { join } from '../../util/join';

export type RadioOption = string | { label: string; value: string };

export type RadioGroupProps = {
  options?: RadioOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  name?: string;
  children?: React.ReactElement<RadioGroupItemProps>[] | React.ReactElement<RadioGroupItemProps>;
  className?: string;
};

export function RadioGroup({ options = [], value, onChange, name, children, className = '' }: RadioGroupProps) {
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
            option={option.label}
            value={option.value}
            isSelected={value === option.value}
            onChange={onChange}
            name={groupName}
          >
            {option.label}
          </RadioGroupItem>
        ))}

      {/* Render RadioGroupItem components */}
      {processedOptions.length === 0 &&
        children &&
        React.Children.map(children, (child) => {
          // TypeScript enforces that child is a RadioGroupItem
          if (React.isValidElement<RadioGroupItemProps>(child)) {
            return (
              <RadioGroupItem
                {...child.props}
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
