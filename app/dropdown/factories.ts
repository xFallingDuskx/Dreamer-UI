import { DropdownCustomItem, DropdownItem, DropdownOption, DropdownOptionGroup, DropdownSeparator } from './types';

export const option = (item: Omit<DropdownOption, '__type'>): DropdownOption => ({
  __type: 'option',
  ...item,
});

export const group = (items: DropdownItem[], title?: string): DropdownOptionGroup => ({
  __type: 'group',
  title,
  items,
});

export const separator = (): DropdownSeparator => ({
  __type: 'separator',
});

export const custom = (render: () => React.ReactNode): DropdownCustomItem => ({
  __type: 'custom',
  render,
});

// Example usage // REMOVE
export const exampleGroups: DropdownItem[] = [
  group([
    option({ label: 'Option 1', value: 'option1' }),
    option({ label: 'Option 2', value: 'option2', disabled: true }),
    separator(),
    option({
      label: 'Option 3',
      value: 'option3',
      subItems: [
        option({ label: 'Sub Option 1', value: 'suboption1' }),
        option({ label: 'Sub Option 2', value: 'suboption2' }),
      ],
    }),
  ]),
];
