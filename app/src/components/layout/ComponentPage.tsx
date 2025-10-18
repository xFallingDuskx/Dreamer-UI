import {
	Button,
	Code,
	CodeBlock,
	Disclosure,
	Table
} from '@moondreamsdev/dreamer-ui/components';
import { Check, ChevronLeft, ChevronRight, Copy } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExampleSection } from '../ui/ExampleSection';

// SectionHeader component with hover link functionality
interface SectionHeaderProps {
	id: string;
	children: React.ReactNode;
	level: 1 | 2;
	className?: string;
}

function SectionHeader({ id, children, level, className }: SectionHeaderProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleCopyLink = () => {
		const url = new URL(window.location.href);
		url.hash = id;
		navigator.clipboard.writeText(url.toString());
	};

	const Tag = level === 1 ? 'h1' : 'h2';
	const textSize = level === 1 ? 'text-2xl' : 'text-lg';

	return (
		<Tag
			className={join('group relative flex items-center font-semibold text-white mb-4', textSize, className)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<button
				onClick={handleCopyLink}
				className={join(
					'absolute -left-7 w-6 h-6 flex items-center justify-center rounded text-accent transition-opacity',
					isHovered ? 'opacity-100' : 'opacity-0'
				)}
				title={`Copy link to ${children}`}
			>
				<svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
					<path d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z' />
				</svg>
			</button>
			{children}
		</Tag>
	);
}

// Component navigation data
const COMPONENTS_ORDER = [
	{ name: 'Accordion', path: '/components/accordion' },
	{ name: 'Action Modal', path: '/components/actionmodal' },
	{ name: 'AuthForm', path: '/components/authform' },
	{ name: 'Avatar', path: '/components/avatar' },
	{ name: 'Badge', path: '/components/badge' },
	{ name: 'Button', path: '/components/button' },
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
	{ name: 'Help Icon', path: '/components/help-icon' },
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

interface TableOfContentsItem {
	id: string;
	title: string;
	level: number;
}

interface ComponentProp {
	name: string;
	type: string;
	default?: string;
	description: string;
	required?: boolean;
}

interface KeyboardShortcut {
	keys: string;
	description: string;
}

interface ComponentExample {
	id: string;
	title: string;
	description: string;
	code: string;
	children: React.ReactNode;
}

interface ComponentPageProps {
	title: string;
	description: string;
	children?: React.ReactNode;
	tableOfContents?: TableOfContentsItem[];
	usageInstructions?: string;
	importStatement?: string;
	componentProps?: ComponentProp[];
	keyboardShortcuts?: KeyboardShortcut[];
	examples?: ComponentExample[];
}

export function ComponentPage({
	title,
	description,
	children,
	tableOfContents,
	usageInstructions,
	importStatement,
	componentProps,
	keyboardShortcuts,
	examples,
}: ComponentPageProps) {
	const [activeSection, setActiveSection] = useState<string>('');
	const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
	const [mainContentTop, setMainContentTop] = useState<number | undefined>(); // Default to 3rem (48px)
	const [copied, setCopied] = useState<boolean>(false);
	const isScrollingRef = useRef(false);
	const usageInstructionsRef = useRef<HTMLDivElement | null>(null);
	const importStatementRef = useRef<HTMLDivElement | null>(null);
	const mainContentRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	// Find current component index and navigation info
	const currentPath = window.location.pathname;
	const currentComponentIndex = COMPONENTS_ORDER.findIndex((comp) => comp.path === currentPath);
	const previousComponent =
		currentComponentIndex === 0
			? COMPONENTS_ORDER[COMPONENTS_ORDER.length - 1]
			: COMPONENTS_ORDER[currentComponentIndex - 1];
	const nextComponent =
		currentComponentIndex === COMPONENTS_ORDER.length - 1
			? COMPONENTS_ORDER[0]
			: COMPONENTS_ORDER[currentComponentIndex + 1];

	const handleScrollIntoView = useCallback((el: HTMLElement) => {
		if (isScrollingRef.current) return;
		isScrollingRef.current = true;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setTimeout(() => (isScrollingRef.current = false), 500); // Prevent multiple scrolls within 0.5 second
	}, []);

	useLayoutEffect(() => {
		if (usageInstructionsRef.current) {
			const rect = usageInstructionsRef.current.getBoundingClientRect();
			setMainContentTop(rect.top + window.scrollY);
			return;
		}
		if (importStatementRef.current) {
			const rect = importStatementRef.current.getBoundingClientRect();
			setMainContentTop(rect.top + window.scrollY);
			return;
		}
		if (mainContentRef.current) {
			const rect = mainContentRef.current.getBoundingClientRect();
			setMainContentTop(rect.top + window.scrollY);
		}
	}, []);

	// Handle initial hash on page load and update active section
	useEffect(() => {
		if (!tableOfContents?.length) return;

		const hash = window.location.hash.slice(1); // Remove the '#'
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				// Small delay to ensure the page has rendered
				setTimeout(() => {
					handleScrollIntoView(element);
					setActiveSection(hash);
				}, 100);
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isScrollingRef.current) {
						const newActiveSection = entry.target.id;
						setActiveSection(newActiveSection);
					}
				});
			},
			{
				rootMargin: '-100px 0px -80% 0px',
			}
		);

		tableOfContents.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [tableOfContents, handleScrollIntoView]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			handleScrollIntoView(element);
			setIsTocOpen(false); // Close mobile TOC after clicking

			// Update URL hash
			window.history.pushState(null, '', `#${id}`);
			setActiveSection(id);
		}
	};

	const getButtonClass = (id: string, level: number) => {
		return join(
			'block w-full text-left text-sm py-1 px-2 transition-colors border-l',
			activeSection === id
				? 'text-white bg-accent-medium/20 border-accent-medium'
				: 'text-gray-300 hover:text-white border-transparent opacity-60 hover:opacity-100',
			level === 2 && 'pl-4',
			level === 3 && 'pl-6'
		);
	};

	const handleCopyWithExamples = async () => {
		// Generate markdown content with examples
		let markdown = `# ${title}\n\n${description}\n\n`;

		if (usageInstructions) {
			markdown += `## Usage Instructions\n\n${usageInstructions}\n\n`;
		}

		if (importStatement) {
			markdown += `## Import\n\n\`\`\`typescript\n${importStatement}\n\`\`\`\n\n`;
		}

		if (examples && examples.length > 0) {
			markdown += `## Examples\n\n`;
			examples.forEach((example) => {
				markdown += `### ${example.title}\n\n`;
				if (example.description) {
					markdown += `${example.description}\n\n`;
				}
				markdown += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
			});
		}

		if (componentProps && componentProps.length > 0) {
			markdown += `## Props\n\n`;
			markdown += `| Name | Type | Default | Required | Description |\n`;
			markdown += `|------|------|---------|----------|-------------|\n`;
			componentProps.forEach((prop) => {
				markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.default || '-'} | ${
					prop.required ? 'Yes' : 'No'
				} | ${prop.description} |\n`;
			});
			markdown += '\n';
		}

		if (keyboardShortcuts && keyboardShortcuts.length > 0) {
			markdown += `## Keyboard Shortcuts\n\n`;
			markdown += `| Keys | Description |\n`;
			markdown += `|------|-------------|\n`;
			keyboardShortcuts.forEach((shortcut) => {
				markdown += `| \`${shortcut.keys}\` | ${shortcut.description} |\n`;
			});
			markdown += '\n';
		}

		try {
			await navigator.clipboard.writeText(markdown);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const componentActions = (
		<>
			{/* Copy Page Button */}
			<Button size='sm' onClick={handleCopyWithExamples} className='gap-2 px-2.5'>
				{copied ? <Check size={14} /> : <Copy size={14} />}
				<span>{copied ? 'Copied!' : 'Copy page'}</span>
			</Button>

			{/* Previous Component Button */}
			<Button
				size='fitted'
				disabled={!previousComponent}
				onClick={() => {
					if (previousComponent) {
						navigate(previousComponent.path);
					}
				}}
				className='p-1.5'
				title={previousComponent ? `Previous: ${previousComponent.name}` : undefined}
			>
				<ChevronLeft size={16} />
			</Button>

			{/* Next Component Button */}
			<Button
				size='fitted'
				onClick={() => {
					if (nextComponent) {
						navigate(nextComponent.path);
					}
				}}
				className='p-1.5'
				title={nextComponent ? `Next: ${nextComponent.name}` : undefined}
			>
				<ChevronRight size={16} />
			</Button>
		</>
	);

	return (
		<div className='min-h-screen pb-24'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Header */}
				<div className='text-center mb-12'>
					<div className='flex justify-center items-center mb-3 relative'>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-1'>
							{title}
						</h1>
						{/* Component action buttons - desktop only */}
						{currentComponentIndex !== -1 && (
							<div className='hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2'>
								{componentActions}
							</div>
						)}
					</div>

					{/* Component action buttons - above title on mobile, next to title on desktop */}
					{currentComponentIndex !== -1 && (
						<div className='flex md:hidden justify-center items-center gap-2 mb-4'>{componentActions}</div>
					)}

					<p className='lg:text-xl text-gray-300 max-w-2xl mx-auto'>{description}</p>
				</div>

				{/* Usage Instructions */}
				{usageInstructions && (
					<div ref={usageInstructionsRef} className={join('mb-8', tableOfContents?.length ? 'lg:mr-48 2xl:mr-24' : '')}>
						<div className='bg-blue-500/10 border border-blue-500/50 rounded-xl p-6'>
							<h2 className='text-lg font-semibold text-white mb-3'>Usage Instructions</h2>
							<p className='text-gray-300'>{usageInstructions}</p>
						</div>
					</div>
				)}

				{/* Import Statement */}
				{importStatement && (
					<div className={join('mb-8', tableOfContents?.length ? 'lg:mr-48 2xl:mr-24' : '')} id='import'>
						<SectionHeader id='import' level={1}>
							Import
						</SectionHeader>
						<CodeBlock
							code={importStatement}
							language='typescript'
							hideHeader={true}
							hideFiletype={true}
							allowCopy={true}
							allowFullscreen={false}
							allowDownload={false}
							className='bg-gray-900/50!'
						/>
					</div>
				)}

				{/* Mobile TOC Toggle using Disclosure */}
				{tableOfContents?.length && (
					<div className='lg:hidden mb-6'>
						<Disclosure
							isOpen={isTocOpen}
							label='Table of Contents'
							className='bg-accent-medium/10 border border-accent-medium/50 rounded-xl text-white'
							buttonClassName='p-4 text-left w-full'
							onToggle={setIsTocOpen}
						>
							<div className='mt-4'>
								<nav className='space-y-2'>
									{tableOfContents.map(({ id, title: tocTitle, level }) => (
										<button key={id} onClick={() => scrollToSection(id)} className={getButtonClass(id, level)}>
											{tocTitle}
										</button>
									))}
								</nav>
							</div>
						</Disclosure>
					</div>
				)}

				{/* Main Content */}
				<div ref={mainContentRef} className={join(tableOfContents?.length ? 'lg:mr-48 2xl:mr-24' : '')}>
					{examples && examples.length > 0 && (
						<div className='mb-8' id='examples'>
							<SectionHeader id='examples' level={1}>
								Examples
							</SectionHeader>
							<div className='space-y-12'>
								{examples.map((example) => (
									<ExampleSection
										key={example.id}
										title={example.title}
										description={example.description}
										id={example.id}
										code={example.code}
									>
										{example.children}
									</ExampleSection>
								))}
							</div>
						</div>
					)}

					{children && <div className='backdrop-blur-sm p-2 sm:p-4 lg:p-6'>{children}</div>}

					{/* Component Props */}
					{componentProps && componentProps.length > 0 && (
						<div className='mt-8' id='props'>
							<SectionHeader id='props' level={1}>
								Props
							</SectionHeader>
							<Table
								data={componentProps}
								columns={[
									{
										key: 'name',
										header: 'Name',
										cell: (prop) => <Code content={prop.name} variant='accent' />,
									},
									{
										key: 'type',
										header: 'Type',
										cell: (prop) => <Code content={prop.type} variant='modest' />,
									},
									{
										key: 'default',
										header: 'Default',
										cell: (prop) =>
											prop.default ? (
												<Code content={prop.default} variant='modest' />
											) : (
												<span className='text-gray-500'>-</span>
											),
									},
									{
										key: 'required',
										header: 'Required',
										align: 'center',
										cell: (prop) =>
											prop.required ? (
												<span className='text-red-400 font-bold'>Yes</span>
											) : (
												<span className='text-gray-500 font-medium'>No</span>
											),
									},
									{
										key: 'description',
										header: 'Description',
										cell: (prop) => <span className='text-gray-300 whitespace-pre-wrap'>{prop.description}</span>,
									},
								]}
								size='sm'
								hoverable={true}
								className='bg-gray-900/50'
							/>
						</div>
					)}

					{/* Keyboard Shortcuts */}
					{keyboardShortcuts && keyboardShortcuts.length > 0 && (
						<div className='mt-8' id='keyboard-shortcuts'>
							<SectionHeader id='keyboard-shortcuts' level={1}>
								Keyboard Shortcuts
							</SectionHeader>
							<Table
								data={keyboardShortcuts}
								columns={[
									{
										key: 'keys',
										header: 'Keys',
										cell: (shortcut) => <Code content={shortcut.keys} variant='accent' />,
										cellClassName: 'py-4',
									},
									{
										key: 'description',
										header: 'Description',
										cell: (shortcut) => <span className='text-gray-300'>{shortcut.description}</span>,
									},
								]}
								size='sm'
								hoverable={true}
								className='bg-gray-900/50'
							/>
						</div>
					)}
				</div>

				{/* Desktop TOC */}
				{tableOfContents?.length && mainContentTop !== undefined && (
					<div
						className='hidden lg:block w-64 flex-shrink-0'
						style={{
							position: 'fixed',
							top: `${mainContentTop}px`,
							right: '2rem',
							zIndex: 30,
						}}
					>
						<div className='bg-accent-medium/10 backdrop-blur-sm border border-accent-medium/50 rounded-2xl p-6'>
							<h2 className='text-lg font-semibold text-white mb-4'>Table of Contents</h2>
							<nav className='space-y-2'>
								{tableOfContents.map(({ id, title: tocTitle, level }) => (
									<button key={id} onClick={() => scrollToSection(id)} className={getButtonClass(id, level)}>
										{tocTitle}
									</button>
								))}
							</nav>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
