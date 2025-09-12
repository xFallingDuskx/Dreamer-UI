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
