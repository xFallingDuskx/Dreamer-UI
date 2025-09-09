import { PopoverProps } from '@moondreamsdev/dreamer-ui/components'
import { DropdownItem } from './types';

export interface DropdownProps extends Omit<PopoverProps, 'children'> {
  /** Dropdown options, separators, groups, or custom items */
  items: DropdownItem[];
  /** Callback when an item is selected, returns the value of the selected item */
  onItemSelect?: (value: string) => void; 
}