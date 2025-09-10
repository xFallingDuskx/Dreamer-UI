import { DropdownMenuCustomItem, DropdownMenuItem, DropdownMenuOption, DropdownMenuOptionGroup, DropdownMenuSeparator } from './types';

export const option = (item: Omit<DropdownMenuOption, '__type'>): DropdownMenuOption => ({
  __type: 'option',
  ...item,
});

export const group = (items: DropdownMenuItem[], title?: string): DropdownMenuOptionGroup => ({
  __type: 'group',
  title,
  items,
});

export const separator = (): DropdownMenuSeparator => ({
  __type: 'separator',
});

export const custom = (render: () => React.ReactNode): DropdownMenuCustomItem => ({
  __type: 'custom',
  render,
});

// Example usage // REMOVE
export const exampleGroups: DropdownMenuItem[] = [
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
