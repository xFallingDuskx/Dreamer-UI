import { DropdownMenuCustomItem, DropdownMenuItem, DropdownMenuOption, DropdownMenuOptionGroup, DropdownMenuSeparator } from './types';

const option = (item: Omit<DropdownMenuOption, '__type'>): DropdownMenuOption => ({
  __type: 'option',
  ...item,
});

const group = (items: DropdownMenuItem[], title?: string): DropdownMenuOptionGroup => ({
  __type: 'group',
  title,
  items,
});

const separator = (): DropdownMenuSeparator => ({
  __type: 'separator',
});

const custom = (render: () => React.ReactNode): DropdownMenuCustomItem => ({
  __type: 'custom',
  render,
});

export const DropdownMenuFactories = {
  option,
  group,
  separator,
  custom,
};
