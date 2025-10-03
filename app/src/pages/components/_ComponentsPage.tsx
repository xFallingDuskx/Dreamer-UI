import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@moondreamsdev/dreamer-ui/components';
import { Check, Copy } from '@moondreamsdev/dreamer-ui/symbols';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const components = [
	{
		name: 'Accordion',
		path: '/components/accordion',
		description: 'Collapsible content sections with expand/collapse functionality.',
		category: 'Display',
	},
	{
		name: 'Action Modal',
		path: '/components/actionmodal',
		description: 'Modal component with built-in action buttons for confirmations and forms.',
		category: 'Overlay',
	},
	{
		name: 'Avatar',
		path: '/components/avatar',
		description: 'Display user profile pictures with 12 pre-defined cartoon-like avatars inspired by Moon Dreams Dev.',
		category: 'Display',
	},
	{
		name: 'Badge',
		path: '/components/badge',
		description: 'Small status indicators and labels for highlighting information.',
		category: 'Display',
	},
	{
		name: 'Button',
		path: '/components/button',
		description: 'Versatile button component with multiple variants, sizes, and states.',
		category: 'Form',
	},
	{
		name: 'Calendar',
		path: '/components/calendar',
		description: 'Comprehensive calendar component supporting single date and range selection with multiple views.',
		category: 'Form',
	},
	{
		name: 'Callout',
		path: '/components/callout',
		description: 'Versatile component for displaying alerts, warnings, and informational messages.',
		category: 'Feedback',
	},
	{
		name: 'Card',
		path: '/components/card',
		description: 'Flexible container component that supports images, different screen sizes, and customizable padding.',
		category: 'Layout',
	},
	{
		name: 'Carousel',
		path: '/components/carousel',
		description: 'Interactive slideshow component for displaying multiple items.',
		category: 'Display',
	},
	{
		name: 'Checkbox',
		path: '/components/checkbox',
		description: 'Customizable checkbox with different sizes and colors.',
		category: 'Form',
	},
	{
		name: 'Clickable',
		path: '/components/clickable',
		description: 'Generic clickable wrapper component with hover and focus states.',
		category: 'Form',
	},
	{
		name: 'Code',
		path: '/components/code',
		description: 'Inline code snippets with syntax highlighting.',
		category: 'Display',
	},
	{
		name: 'Code Block',
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
		name: 'Drawer',
		path: '/components/drawer',
		description: 'Sliding panel component that appears from the side of the screen.',
		category: 'Overlay',
	},
	{
		name: 'Dropdown Menu',
		path: '/components/dropdown-menu',
		description: 'Contextual menu component with keyboard navigation and accessibility.',
		category: 'Navigation',
	},
	{
		name: 'Dynamic List',
		path: '/components/dynamic-list',
		description: 'Interactive list component with add, delete, and reorder functionality via drag-and-drop or buttons.',
		category: 'Display',
	},
	{
		name: 'Error Boundary',
		path: '/components/error-boundary',
		description: 'React error boundary component that catches JavaScript errors and displays fallback UI.',
		category: 'Feedback',
	},
	{
		name: 'Form',
		path: '/components/form',
		description: 'Flexible form component using factory pattern with built-in validation and state management.',
		category: 'Form',
	},
	{
		name: 'Help Icon',
		path: '/components/help-icon',
		description: 'Help icon component that combines InfoCircled icon with tooltip for contextual assistance.',
		category: 'Feedback',
	},
	{
		name: 'Input',
		path: '/components/input',
		description: 'Flexible input component with validation states and different types.',
		category: 'Form',
	},
	{
		name: 'Label',
		path: '/components/label',
		description: 'Form label component with proper accessibility attributes.',
		category: 'Form',
	},
	{
		name: 'Modal',
		path: '/components/modal',
		description: 'Overlay component for forms, confirmations, and interactive content.',
		category: 'Overlay',
	},
	{
		name: 'Pagination',
		path: '/components/pagination',
		description: 'Navigation component for dividing content across multiple pages.',
		category: 'Navigation',
	},
	{
		name: 'Panel',
		path: '/components/panel',
		description: 'Flexible container component for grouping related content.',
		category: 'Layout',
	},
	{
		name: 'Popover',
		path: '/components/popover',
		description: 'Floating content container that appears relative to a trigger element.',
		category: 'Overlay',
	},
	{
		name: 'Radio Group',
		path: '/components/radiogroup',
		description: 'Group of radio buttons for single selection from multiple options.',
		category: 'Form',
	},
	{
		name: 'Scroll Area',
		path: '/components/scroll-area',
		description: 'Custom scrollable area with styled scrollbars.',
		category: 'Layout',
	},
	{
		name: 'Select',
		path: '/components/select',
		description: 'Dropdown selection component with search and keyboard navigation.',
		category: 'Form',
	},
	{
		name: 'Separator',
		path: '/components/separator',
		description: 'Visual divider component for separating content sections.',
		category: 'Layout',
	},
	{
		name: 'Skeleton',
		path: '/components/skeleton',
		description: 'Loading placeholders that mimic the structure of your content.',
		category: 'Feedback',
	},
	{
		name: 'Slider',
		path: '/components/slider',
		description: 'Range input component for selecting numeric values.',
		category: 'Form',
	},
	{
		name: 'Table',
		path: '/components/table',
		description: 'Data table component with sorting, selection, custom cells, and responsive design.',
		category: 'Display',
	},
	{
		name: 'Tabs',
		path: '/components/tabs',
		description: 'Tabbed interface component for organizing content into sections.',
		category: 'Navigation',
	},
	{
		name: 'Textarea',
		path: '/components/textarea',
		description: 'Multi-line text input with auto-expand and character limit features.',
		category: 'Form',
	},
	{
		name: 'Toast',
		path: '/components/toast',
		description: 'Notification component for displaying temporary messages.',
		category: 'Feedback',
	},
	{
		name: 'Toggle',
		path: '/components/toggle',
		description: 'Switch component for boolean states and settings.',
		category: 'Form',
	},
	{
		name: 'Tooltip',
		path: '/components/tooltip',
		description: 'Contextual information component that appears on hover or focus.',
		category: 'Feedback',
	},
];

const categories = Array.from(new Set(components.map((c) => c.category)));

export const ComponentsPage = () => {
	const [copied, setCopied] = useState(false);

	const handleCopyOnePager = async () => {
		// Generate one-pager markdown content
		let markdown = `# Dreamer UI Components\n\n`;
		markdown += `All components are imported from \`@moondreamsdev/dreamer-ui/components\`.\n\n`;
		
		markdown += `## Available Components\n\n`;
		
		// Group components by category
		categories.forEach((category) => {
			markdown += `### ${category} Components\n\n`;
			const categoryComponents = components.filter((c) => c.category === category);
			categoryComponents.forEach((component) => {
				markdown += `- **${component.name}**: ${component.description}\n`;
			});
			markdown += '\n';
		});

		markdown += `## Exceptions\n\n`;
		markdown += `Two hooks are exported from different paths:\n\n`;
		markdown += `- **useToast**: Import from \`@moondreamsdev/dreamer-ui/hooks\` - Hook for displaying toast notifications. Requires \`ToastProvider\` to be wrapped around your app.\n`;
		markdown += `- **useActionModal**: Import from \`@moondreamsdev/dreamer-ui/hooks\` - Hook for displaying action modals with confirmation dialogs. Requires \`ActionModalProvider\` to be wrapped around your app.\n\n`;
		markdown += `### Providers\n\n`;
		markdown += `Import providers from \`@moondreamsdev/dreamer-ui/providers\`:\n\n`;
		markdown += `- **ToastProvider**: Required for \`useToast\` hook. Wrap your app to enable toast notifications.\n`;
		markdown += `- **ActionModalProvider**: Required for \`useActionModal\` hook. Wrap your app to enable action modals.\n\n`;

		markdown += `## Utilities\n\n`;
		markdown += `- **join**: Import from \`@moondreamsdev/dreamer-ui/utils\` - Utility function for conditionally joining class names.\n`;

		try {
			await navigator.clipboard.writeText(markdown);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<ComponentPage
			title='Components'
			description='A comprehensive collection of React components built with Tailwind CSS for modern web applications.'
		>
			{/* Copy One-Pager Button */}
			<div className='mb-8 flex justify-center'>
				<Button size='md' onClick={handleCopyOnePager} className='inline-flex items-center gap-2'>
					{copied ? <Check size={16} /> : <Copy size={16} />}
					<span>{copied ? 'Copied!' : 'Copy one-pager'}</span>
				</Button>
			</div>

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
									className='block p-6 bg-gray-800/50 border border-gray-600 rounded-xl hover:border-accent/50 hover:bg-gray-800/70 transition-all duration-200 group'
								>
									<h3 className='text-xl font-semibold text-white group-hover:text-accent transition-colors mb-2'>
										{component.name}
									</h3>
									<p className='text-gray-400 text-sm mb-4'>{component.description}</p>
									<div className='flex items-center text-accent text-sm'>View Component →</div>
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
					<div className='bg-accent/50 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>🎨 Design Principles</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Consistent visual language across all components</li>
							<li>• Theme-based color system for easy customization</li>
							<li>• Responsive design that works on all screen sizes</li>
							<li>• Thoughtful spacing and typography hierarchy</li>
						</ul>
					</div>
					<div className='bg-accent/50 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>♿ Accessibility First</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Full keyboard navigation support</li>
							<li>• Screen reader compatible with ARIA labels</li>
							<li>• High contrast ratios for better visibility</li>
							<li>• Focus indicators and state management</li>
						</ul>
					</div>
					<div className='bg-accent/50 p-6 rounded-lg'>
						<h4 className='text-white font-semibold mb-3'>⚡ Developer Experience</h4>
						<ul className='text-gray-300 space-y-2 text-sm'>
							<li>• Full TypeScript support with complete types</li>
							<li>• Intuitive prop names and sensible defaults</li>
							<li>• Comprehensive documentation with examples</li>
							<li>• Tree-shakeable imports for optimal bundle size</li>
						</ul>
					</div>
					<div className='bg-accent/50 p-6 rounded-lg'>
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
