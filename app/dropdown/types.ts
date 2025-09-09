export interface DropdownOption {
  __type: 'option';
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  description?: string;
  href?: string;
  onClick?: () => void;
  subItems?: DropdownItem[];
}

export interface DropdownOptionGroup {
  __type: 'group';
  title?: string;
  items: DropdownItem[];
}

export interface DropdownSeparator {
  __type: 'separator';
}

export type DropdownItem = DropdownOption | DropdownOptionGroup | DropdownSeparator;