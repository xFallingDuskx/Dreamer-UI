import { ChevronRight } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useDropdownMenuContext } from './DropdownContext';
import { DropdownMenuOption } from './types';

interface MenuOptionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'aria-label'> {
	option: DropdownMenuOption;
}

export function MenuOption({ option, ...props }: MenuOptionProps) {
	const { onItemSelect } = useDropdownMenuContext();

	const handleItemClick = () => {
		if (option.onClick) {
			option.onClick();
		}
		if (option.value) {
			onItemSelect(option.value);
		}
	};

	const hasSubitems = option.subItems && option.subItems.length > 0;
	const isLink = option.href && !option.disabled;
	const Element = isLink ? 'a' : 'div';
	return (
		<Element
			href={isLink ? option.href : undefined}
			className={join(
				'relative flex items-center gap-2 px-3 py-2 text-sm focus:outline-none focus:bg-popover-foreground/10',
				option.disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'
			)}
			onClick={!option.disabled ? handleItemClick : undefined}
			{...props}
		>
			{option.icon && <span className='size-4'>{option.icon}</span>}
			<div className='flex-1'>
				<div>{option.label}</div>
				{option.description && <div className='text-xs text-popover-foreground/60'>{option.description}</div>}
			</div>
			{option.keyboardShortcut && <div className='text-xs text-popover-foreground/60'>{option.keyboardShortcut}</div>}
			{hasSubitems && <ChevronRight className='size-4' />}
		</Element>
	);
}
