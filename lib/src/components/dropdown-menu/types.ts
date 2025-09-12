export interface DropdownMenuOption {
  __type: 'option';
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  description?: string;
  keyboardShortcut?: string;
  href?: string;
  onClick?: () => void;
  subItems?: DropdownMenuItem[];
}

export interface DropdownMenuOptionGroup {
  __type: 'group';
  title?: string;
  items: DropdownMenuItem[];
}

export interface DropdownMenuSeparator {
  __type: 'separator';
}

export interface DropdownMenuCustomItem {
  __type: 'custom';
  render: () => React.ReactNode;
}

export type DropdownMenuItem = DropdownMenuOption | DropdownMenuOptionGroup | DropdownMenuSeparator | DropdownMenuCustomItem ;