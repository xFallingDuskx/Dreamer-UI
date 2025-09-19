import { Link } from 'react-router-dom';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const components = [
	{
		name: 'Avatar',
		path: '/components/avatar',
		description: 'Display user profile pictures with 12 pre-defined cartoon-like avatars inspired by Moon Dreams Dev.',
		category: 'Display',
	},
	{
		name: 'Button',
		path: '/components/button',
		description: 'Versatile button component with multiple variants, sizes, and states.',
		category: 'Form',
	},
	{
		name: 'Card',
		path: '/components/card',
		description: 'Flexible container component that supports images, different screen sizes, and customizable padding.',
		category: 'Layout',
	},
	{
		name: 'CodeBlock',
		path: '/components/codeblock',
		description: 'Syntax-highlighted code display with TypeScript support, copy, and fullscreen.',
		category: 'Display',
	},
	{
		name: 'Disclosure',
		path: '/components/disclosure',
		description: 'Collapsible content component with accessible expand/collapse functionality.',
		category: 'Display',
	},
	{
		name: 'ErrorBoundary',
		path: '/components/error-boundary',
		description: 'React error boundary component that catches JavaScript errors and displays fallback UI.',
		category: 'Feedback',
	},
	{
		name: 'Input',
		path: '/components/input',
		description: 'Flexible input component with validation states and different types.',
		category: 'Form',
	},
  {
    name: 'List',
    path: '/components/dynamic-list',
    description: 'Interactive list component with add, delete, and reorder functionality via drag-and-drop or buttons.',
    category: 'Display',
  },
	{
		name: 'Modal',
		path: '/components/modal',
		description: 'Overlay component for forms, confirmations, and interactive content.',
		category: 'Overlay',
	},
	{
		name: 'Skeleton',
		path: '/components/skeleton',
		description: 'Loading placeholders that mimic the structure of your content.',
		category: 'Feedback',
	},
	// Placeholder for future components
	{
		name: 'Textarea',
		path: '/components/textarea',
		description: 'Multi-line text input with auto-expand and character limit features.',
		category: 'Form',
	},
	{
		name: 'Select',
		path: '/components/select',
		description: 'Dropdown selection component with search and keyboard navigation.',
		category: 'Form',
	},
	{
		name: 'Checkbox',
		path: '/components/checkbox',
		description: 'Customizable checkbox with different sizes and colors.',
		category: 'Form',
	},
	{
		name: 'Form',
		path: '/components/form',
		description: 'Flexible form component using factory pattern with built-in validation and state management.',
		category: 'Form',
	},
	{
		name: 'Toast',
		path: '/components/toast',
		description: 'Notification component for displaying temporary messages.',
		category: 'Feedback',
	},
	{
		name: 'Callout',
		path: '/components/callout',
		description: 'Versatile component for displaying alerts, warnings, and informational messages.',
		category: 'Feedback',
	},
];

const categories = Array.from(new Set(components.map((c) => c.category)));

export const ComponentsPage = () => {
	return (
		<ComponentPage
			title='Components'
			description='A comprehensive collection of React components built with Tailwind CSS for modern web applications.'
		>
			{categories.map((category) => (
				<ExampleSection
					key={category}
					title={`${category} Components`}
					description={`Components related to ${category.toLowerCase()} functionality.`}
				>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{components
							.filter((component) => component.category === category)
							.map((component) => (
								<Link
									key={component.path}
									to={component.path}
									className='block p-6 bg-gray-800/50 border border-gray-600 rounded-xl hover:border-primary/50 hover:bg-gray-800/70 transition-all duration-200 group'
								>
									<h3 className='text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2'>
										{component.name}
									</h3>
									<p className='text-gray-400 text-sm mb-4'>{component.description}</p>
									<div className='flex items-center text-primary text-sm'>View Component →</div>
								</Link>
							))}
					</div>
				</ExampleSection>
			))}

			<ExampleSection
				title='Component Philosophy'
				description='Our approach to building reusable and accessible components.'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-gray-700 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>🎨 Design Principles</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Consistent visual language across all components</li>
							<li>• Theme-based color system for easy customization</li>
							<li>• Responsive design that works on all screen sizes</li>
							<li>• Thoughtful spacing and typography hierarchy</li>
						</ul>
					</div>
					<div className='bg-gray-700 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>♿ Accessibility First</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Full keyboard navigation support</li>
							<li>• Screen reader compatible with ARIA labels</li>
							<li>• High contrast ratios for better visibility</li>
							<li>• Focus indicators and state management</li>
						</ul>
					</div>
					<div className='bg-gray-700 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>⚡ Developer Experience</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Full TypeScript support with complete types</li>
							<li>• Intuitive prop names and sensible defaults</li>
							<li>• Comprehensive documentation with examples</li>
							<li>• Tree-shakeable imports for optimal bundle size</li>
						</ul>
					</div>
					<div className='bg-gray-700 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>🔧 Customization</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• CSS custom properties for easy theming</li>
							<li>• Variant system for different use cases</li>
							<li>• className prop for additional styling</li>
							<li>• Composable components for complex layouts</li>
						</ul>
					</div>
				</div>
			</ExampleSection>
		</ComponentPage>
	);
};
