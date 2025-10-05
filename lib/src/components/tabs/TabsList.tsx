import { join } from '../../utils';
import { useTabsContext } from './TabsContext';
import { tabsListVariants } from './variants';

export interface TabsListProps {
	id?: string;
	ref?: React.Ref<HTMLDivElement>;
	children?: React.ReactNode;
	className?: string;
}

export function TabsList({ children, className, id, ref }: TabsListProps) {
	const { tabsWidth, variant } = useTabsContext();

	return (
		<div className='overflow-x-auto hide-scroll-bars'>
			<div
				id={id}
				ref={ref}
				role='tablist'
				className={join('flex', tabsListVariants.width[tabsWidth], tabsListVariants.variant[variant], className)}
				data-tabs-width={tabsWidth}
				data-variant={variant}
			>
				{children}
			</div>
		</div>
	);
}
