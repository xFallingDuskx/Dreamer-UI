import { Popover, ScrollArea } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLocalhost } from '../../utils/isLocalhost';
import { SearchBar } from '../search-bar';

interface NavigationProps {
	className?: string;
}

const components = [
	{ name: 'Accordion', path: '/components/accordion' },
	{ name: 'Action Modal', path: '/components/actionmodal' },
	{ name: 'Avatar', path: '/components/avatar' },
	{ name: 'Badge', path: '/components/badge' },
	{ name: 'Button', path: '/components/button' },
	{ name: 'Calendar', path: '/components/calendar' },
	{ name: 'Callout', path: '/components/callout' },
	{ name: 'Card', path: '/components/card' },
	{ name: 'Carousel', path: '/components/carousel' },
	{ name: 'Checkbox', path: '/components/checkbox' },
	{ name: 'Clickable', path: '/components/clickable' },
	{ name: 'Code', path: '/components/code' },
	{ name: 'Code Block', path: '/components/codeblock' },
	{ name: 'Disclosure', path: '/components/disclosure' },
	{ name: 'Drawer', path: '/components/drawer' },
	{ name: 'Dropdown Menu', path: '/components/dropdown-menu' },
	{ name: 'Dynamic List', path: '/components/dynamic-list' },
	{ name: 'Error Boundary', path: '/components/error-boundary' },
	{ name: 'Form', path: '/components/form' },
	{ name: 'Input', path: '/components/input' },
	{ name: 'Label', path: '/components/label' },
	{ name: 'Modal', path: '/components/modal' },
	{ name: 'Pagination', path: '/components/pagination' },
	{ name: 'Panel', path: '/components/panel' },
	{ name: 'Popover', path: '/components/popover' },
	{ name: 'Radio Group', path: '/components/radiogroup' },
	{ name: 'Scroll Area', path: '/components/scroll-area' },
	{ name: 'Select', path: '/components/select' },
	{ name: 'Separator', path: '/components/separator' },
	{ name: 'Skeleton', path: '/components/skeleton' },
	{ name: 'Slider', path: '/components/slider' },
	{ name: 'Table', path: '/components/table' },
	{ name: 'Tabs', path: '/components/tabs' },
	{ name: 'Textarea', path: '/components/textarea' },
	{ name: 'Toast', path: '/components/toast' },
	{ name: 'Toggle', path: '/components/toggle' },
	{ name: 'Tooltip', path: '/components/tooltip' },
];

const componentPathToId = (path: string) => `nav-item-${path.replace('/components/', '')}`;

export const Navigation = ({ className = '' }: NavigationProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const showDraft = isLocalhost();

	return (
		<nav className={`bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50 ${className}`}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link to='/' className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>D</span>
						</div>
						<span className='text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
							Dreamer UI
						</span>
					</Link>

					{/* Main Navigation */}
					<div className='hidden md:block'>
						<div className='flex items-baseline space-x-6'>
							<Link
								to='/'
								className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
									location.pathname === '/' ? 'bg-accent/50' : 'text-gray-300 hover:text-white hover:bg-gray-800'
								}`}
							>
								Home
							</Link>

							<Link
								to='/getting-started'
								className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
									location.pathname === '/getting-started'
										? 'bg-accent/50'
										: 'text-gray-300 hover:text-white hover:bg-gray-800'
								}`}
							>
								Getting Started
							</Link>

							{/* Components Popover */}
							<Popover
								id='nav-popover'
								trigger={
									<Link
										to='/components'
										className='px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-1'
									>
										Components
									</Link>
								}
								placement='bottom'
								alignment='start'
								className='w-64 border border-gray-700 focus:outline-none'
								hoverable={true}
							>
								<ScrollArea viewportClassName='max-h-96 space-y-1' thumbClassName='bg-accent-dark!'>
									{components.map((component) => (
										<Link
											id={componentPathToId(component.path)}
											key={component.path}
											to={component.path}
											className={join(
												'block px-3 py-2 text-sm transition-colors',
												location.pathname === component.path
													? 'bg-accent/50 text-white'
													: 'text-gray-300 hover:text-white hover:bg-gray-800'
											)}
											onClick={() => {
												// Close popover by navigating (optional, depends on desired UX)
												navigate(component.path);
											}}
										>
											{component.name}
										</Link>
									))}
								</ScrollArea>
							</Popover>

							{/* Draft Link - Only visible on localhost */}
							{showDraft && (
								<Link
									to='/draft'
									className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
										location.pathname === '/draft'
											? 'text-orange-400 bg-orange-400/20'
											: 'text-orange-300 hover:text-orange-200 hover:bg-orange-400/10'
									}`}
								>
									Draft
								</Link>
							)}
						</div>
					</div>

					{/* Search Bar */}
					<div className='flex-1 max-w-md mx-8 hidden md:flex justify-end'>
						<SearchBar />
					</div>

					{/* Mobile menu button */}
					<div className='flex items-center gap-2 md:hidden'>
						<button className='text-gray-300 hover:text-white'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
