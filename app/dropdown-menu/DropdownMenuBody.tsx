import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useDropdownMenuContext } from './DropdownContext';
import { MenuOption } from './DropdownMenuOption';
import { SubMenu } from './DropdownMenuSub';
import { DropdownMenuItem } from './types';

export function MenuBody({ items, level, id }: { items: DropdownMenuItem[]; level: number; id?: string }) {
	const { setFocus, className = '' } = useDropdownMenuContext();
	let itemIndex = 0;

	const renderItem = (item: DropdownMenuItem, key: string) => {
		switch (item.__type) {
			case 'option':
				if (item.subItems && item.subItems.length > 0) {
					return <SubMenu key={key} option={item} level={level} index={itemIndex++} />;
				}

				return (
					<MenuOption
						key={key}
						option={item}
						data-menu-item={item.value}
						data-level={level}
						data-index={itemIndex++}
						tabIndex={-1}
						aria-disabled={item.disabled ? 'true' : undefined}
						onMouseEnter={(e: React.MouseEvent) => {
							e.preventDefault();
							if (item.disabled) return;
							const index = Number(e.currentTarget.getAttribute('data-index'));
							setFocus({ level, index });
						}}
						onMouseLeave={(e: React.MouseEvent) => {
							e.preventDefault();
							setFocus(null);
						}}
					/>
				);

			case 'group':
				return (
					<div key={key}>
						{item.title && (
							<div className='px-3 py-2 text-xs font-semibold text-popover-foreground/50 uppercase'>{item.title}</div>
						)}
						{item.items.map((groupItem, groupIndex) => renderItem(groupItem, `${key}-${groupIndex}`))}
					</div>
				);

			case 'separator':
				return <div key={key} aria-hidden={true} className='my-1 mx-2 border-t border-popover-foreground/20' />;

			case 'custom':
				return <div key={key}>{item.render()}</div>;

			default:
				return null;
		}
	};

	return (
		<div
			id={id}
			className={join(
				'border py-1 border-popover-foreground/20 rounded-md min-w-52 shadow-lg bg-popover text-popover-foreground',
				className
			)}
			tabIndex={0}
			data-level={level}
			data-menu
			role='menu'
			aria-label={`Dropdown menu level ${level}`}
		>
			{items.map((item, index) => renderItem(item, String(index)))}
		</div>
	);
}
