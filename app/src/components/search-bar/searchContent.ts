export interface SearchResult {
	title: string;
	path: string;
	description?: string;
	section?: string;
	type: 'Component' | 'Guide' | 'Section' | 'Example' | 'Props';
	content: string;
	rank: number; // Higher is better
	matchedText?: string; // The part of the text that matches the query
	matchedField?: 'title' | 'description' | 'section' | 'content'; // Which field matched
	score?: number;
}

// Content index for search - systematically organized by component
const searchIndex: SearchResult[] = [
	// Getting Started
	{
		title: 'Getting Started',
		path: '/getting-started',
		description: 'Learn how to install and set up Dreamer UI in your project.',
		type: 'Guide',
		content: 'installation setup npm yarn pnpm getting started tutorial guide tailwind css components',
		rank: 10,
	},

	// Accordion Component
	{
		title: 'Accordion',
		path: '/components/accordion',
		description: 'Collapsible content sections with expand/collapse functionality.',
		type: 'Component',
		content: 'accordion collapsible expandable collapse sections panels props',
		rank: 10,
	},
	{
		title: 'Accordion Props',
		path: '/components/accordion',
		section: 'Props',
		description: 'Accordion component properties including items, allowMultiple, and styling options.',
		type: 'Props',
		content: 'accordion props properties items allowMultiple defaultOpenItems triggersClassName bodiesClassName className children',
		rank: 8,
	},

	// Action Modal Component
	{
		title: 'Action Modal',
		path: '/components/actionmodal',
		description: 'Modal component with built-in action buttons for confirmations and forms.',
		type: 'Component',
		content: 'action modal confirmation dialog form buttons cancel save delete props',
		rank: 10,
	},
	{
		title: 'Action Modal Props',
		path: '/components/actionmodal',
		section: 'Props',
		description: 'Action Modal component properties including type, isOpen, onClose, and action handlers.',
		type: 'Props',
		content: 'actionmodal props properties type isOpen onClose message onConfirm title confirmText cancelText destructive className',
		rank: 8,
	},

	// Avatar Component
	{
		title: 'Avatar',
		path: '/components/avatar',
		description: 'User profile picture component with 12 pre-defined cartoon-like avatars.',
		type: 'Component',
		content: 'avatar profile picture user image cartoon moon dreams dev props',
		rank: 10,
	},
	{
		title: 'Avatar Props',
		path: '/components/avatar',
		section: 'Props',
		description: 'Avatar component properties including preset, size, shape, and image options.',
		type: 'Props',
		content: 'avatar props properties preset size shape src initials alt className',
		rank: 8,
	},

	// Badge Component
	{
		title: 'Badge',
		path: '/components/badge',
		description: 'Small status indicators with multiple variant styles.',
		type: 'Component',
		content: 'badge label status indicator highlight notification count variant primary secondary accent destructive success warning muted props',
		rank: 10,
	},
	{
		title: 'Badge Props',
		path: '/components/badge',
		section: 'Props',
		description: 'Badge component properties including variant, outline, size, and aspect options.',
		type: 'Props',
		content: 'badge props properties variant outline size aspect use className id children primary secondary accent destructive success warning muted',
		rank: 8,
	},

	// Button Component
	{
		title: 'Button',
		path: '/components/button',
		description: 'Interactive button component with multiple variants and states.',
		type: 'Component',
		content: 'button interactive click variants primary secondary tertiary destructive outline link states loading disabled props',
		rank: 10,
	},
	{
		title: 'Button Props',
		path: '/components/button',
		section: 'Props',
		description: 'Button component properties and configuration options.',
		type: 'Props',
		content: 'button props properties variant size loading disabled href target rel children className id',
		rank: 8,
	},

	// Calendar Component
	{
		title: 'Calendar',
		path: '/components/calendar',
		description: 'Comprehensive calendar component supporting single date and range selection with multiple views.',
		type: 'Component',
		content: 'calendar date picker range selection month week day view navigation single mode props',
		rank: 10,
	},
	{
		title: 'Calendar Props',
		path: '/components/calendar',
		section: 'Props',
		description: 'Calendar component properties including mode, view, size, date constraints, month year selector, and custom styling options.',
		type: 'Props',
		content: 'calendar props properties mode view size initialDate minDate maxDate onDateSelect onRangeSelect renderCell showViewSelector showNavigation useMonthYearSelector showTodayButton navigationLayout customStyles className',
		rank: 8,
	},
	{
		title: 'Calendar useMonthYearSelector',
		path: '/components/calendar',
		section: 'Props',
		description: 'Enable dropdown selectors for quick navigation to specific months and years in the calendar.',
		type: 'Props',
		content: 'useMonthYearSelector month year selector dropdown navigation calendar quick jump date picker boolean prop property',
		rank: 6,
	},
	{
		title: 'Calendar showTodayButton',
		path: '/components/calendar',
		section: 'Props',
		description: 'Show a "Today" button for quick navigation to the current date in the calendar.',
		type: 'Props',
		content: 'showTodayButton today button navigation calendar current date jump quick today boolean prop property',
		rank: 6,
	},

	// Callout Component
	{
		title: 'Callout',
		path: '/components/callout',
		description: 'Alert component for displaying important messages and notifications.',
		type: 'Component',
		content: 'callout alert notification message info warning error success props',
		rank: 10,
	},
	{
		title: 'Callout Props',
		path: '/components/callout',
		section: 'Props',
		description: 'Callout component properties including variant, title, description, and dismissible options.',
		type: 'Props',
		content: 'callout props properties variant title description icon dismissible onDismiss className id ref',
		rank: 8,
	},

	// Card Component
	{
		title: 'Card',
		path: '/components/card',
		description: 'Container component for grouping related content and actions.',
		type: 'Component',
		content: 'card container panel content group section layout props',
		rank: 10,
	},
	{
		title: 'Card Props',
		path: '/components/card',
		section: 'Props',
		description: 'Card component properties including header, footer, size, and padding options.',
		type: 'Props',
		content: 'card props properties header footer size padding className children imageSrc imageAlt imageComponent imageToEdge',
		rank: 8,
	},

	// Carousel Component
	{
		title: 'Carousel',
		path: '/components/carousel',
		description: 'Image and content carousel with navigation controls.',
		type: 'Component',
		content: 'carousel slider images content navigation controls autoplay props',
		rank: 10,
	},
	{
		title: 'Carousel Props',
		path: '/components/carousel',
		section: 'Props',
		description: 'Carousel component properties including autoScroll, itemsToShow, and navigation controls.',
		type: 'Props',
		content: 'carousel props properties children autoScroll scrollInterval pauseScrollOnHover itemsToShow infinite gap hidePrevNext hideDots buttonSize buttonVariant buttonPosition className containerClassName itemsClassName dotsClassName',
		rank: 8,
	},

	// Checkbox Component
	{
		title: 'Checkbox',
		path: '/components/checkbox',
		description: 'Selection control for multiple choice scenarios.',
		type: 'Component',
		content: 'checkbox selection control multiple choice checked onChange props',
		rank: 10,
	},
	{
		title: 'Checkbox Props',
		path: '/components/checkbox',
		section: 'Props',
		description: 'Checkbox component properties including size, color, filled, and state options.',
		type: 'Props',
		content: 'checkbox props properties size color filled rounded checked indeterminate disabled display onCheckedChange id className',
		rank: 8,
	},

	// Clickable Component
	{
		title: 'Clickable',
		path: '/components/clickable',
		description: 'Wrapper component that makes content clickable as links or buttons.',
		type: 'Component',
		content: 'clickable wrapper link button interactive click navigation props',
		rank: 10,
	},
	{
		title: 'Clickable Props',
		path: '/components/clickable',
		section: 'Props',
		description: 'Clickable component properties including linkTo, onButtonClick, and additional props.',
		type: 'Props',
		content: 'clickable props properties children linkTo linkProps onButtonClick buttonProps className',
		rank: 8,
	},

	// Code Component
	{
		title: 'Code',
		path: '/components/code',
		description: 'Inline code display component for syntax highlighting.',
		type: 'Component',
		content: 'code inline syntax highlight programming props',
		rank: 10,
	},
	{
		title: 'Code Props',
		path: '/components/code',
		section: 'Props',
		description: 'Code component properties including language and styling options.',
		type: 'Props',
		content: 'code props properties children className language',
		rank: 8,
	},

	// Code Block Component
	{
		title: 'Code Block',
		path: '/components/codeblock',
		description: 'Syntax highlighted code display with copy and fullscreen features.',
		type: 'Component',
		content: 'code block syntax highlight copy fullscreen language programming markdown props',
		rank: 10,
	},
	{
		title: 'Code Block Props',
		path: '/components/codeblock',
		section: 'Props',
		description: 'Code Block component properties including code, language, filename, and feature toggles.',
		type: 'Props',
		content: 'codeblock props properties code language filename showLineNumbers allowCopy allowDownload allowFullscreen showTrafficLights hideHeader maxHeight markdown',
		rank: 8,
	},
	{
		title: 'Code Block Markdown Support',
		path: '/components/codeblock',
		section: 'Markdown Support',
		description: 'Display and syntax highlight markdown content with proper formatting for headers, links, code, and lists.',
		type: 'Section',
		content: 'markdown md syntax highlighting headers bold italic links inline code blockquotes lists numbered formatting',
		rank: 8,
	},

	// Copy Button Component
	{
		title: 'Copy Button',
		path: '/components/copy-button',
		description: 'Button component that copies text to clipboard with visual feedback using Copy and Check symbols.',
		type: 'Component',
		content: 'copy button clipboard text feedback check symbol icon paste duplicate props',
		rank: 10,
	},
	{
		title: 'Copy Button Props',
		path: '/components/copy-button',
		section: 'Props',
		description: 'Copy Button component properties including textToCopy, delay, variant, size, and custom icons.',
		type: 'Props',
		content: 'copybutton props properties textToCopy delay children icon copiedIcon variant size rounded className id disabled onClick ref',
		rank: 8,
	},

	// Disclosure Component
	{
		title: 'Disclosure',
		path: '/components/disclosure',
		description: 'Expandable content section with show/hide functionality.',
		type: 'Component',
		content: 'disclosure expandable show hide toggle collapsible props',
		rank: 10,
	},
	{
		title: 'Disclosure Props',
		path: '/components/disclosure',
		section: 'Props',
		description: 'Disclosure component properties including label, isOpen, onToggle, and styling options.',
		type: 'Props',
		content: 'disclosure props properties label isOpen onToggle disabled className buttonClassName children',
		rank: 8,
	},

	// Drawer Component
	{
		title: 'Drawer',
		path: '/components/drawer',
		description: 'Slide-out panel component for additional content and actions.',
		type: 'Component',
		content: 'drawer slide panel sidebar navigation content actions props',
		rank: 10,
	},
	{
		title: 'Drawer Props',
		path: '/components/drawer',
		section: 'Props',
		description: 'Drawer component properties including footer, title, and gesture controls.',
		type: 'Props',
		content: 'drawer props properties title footer isOpen onClose showCloseButton enableDragGestures disableCloseOnOverlayClick className overlayClassName',
		rank: 8,
	},

	// Dropdown Menu Component
	{
		title: 'Dropdown Menu',
		path: '/components/dropdown-menu',
		description: 'Contextual menu component with keyboard navigation and sub-menus.',
		type: 'Component',
		content: 'dropdown menu context navigation keyboard submenu items actions props',
		rank: 10,
	},
	{
		title: 'Dropdown Menu Props',
		path: '/components/dropdown-menu',
		section: 'Props',
		description: 'Dropdown Menu component properties including trigger, items, placement, and selection handling.',
		type: 'Props',
		content: 'dropdownmenu props properties trigger items onItemSelect isOpen onOpenChange placement alignment className id',
		rank: 8,
	},

	// Dynamic List Component
	{
		title: 'Dynamic List',
		path: '/components/dynamic-list',
		description: 'Interactive list component with add, delete, and reorder capabilities.',
		type: 'Component',
		content: 'dynamic list interactive add delete reorder sortable props',
		rank: 10,
	},
	{
		title: 'Dynamic List Props',
		path: '/components/dynamic-list',
		section: 'Props',
		description: 'Dynamic List component properties including items, interactive features, and customization options.',
		type: 'Props',
		content: 'dynamiclist props properties items size id className allowAdd allowDelete allowReorder addPlaceholder onItemsChange marker title variant',
		rank: 8,
	},

	// Error Boundary Component
	{
		title: 'Error Boundary',
		path: '/components/error-boundary',
		description: 'Error boundary component for catching and handling React errors.',
		type: 'Component',
		content: 'error boundary component catch handle react errors fallback props',
		rank: 10,
	},
	{
		title: 'Error Boundary Props',
		path: '/components/error-boundary',
		section: 'Props',
		description: 'Error Boundary component properties and error handling options.',
		type: 'Props',
		content: 'error boundary props properties fallback onError children reset simulation',
		rank: 8,
	},

	// Form Component
	{
		title: 'Form',
		path: '/components/form',
		description: 'Form container with validation and submission handling.',
		type: 'Component',
		content: 'form validation submission handling fields inputs controls props',
		rank: 10,
	},
	{
		title: 'Form Props',
		path: '/components/form',
		section: 'Props',
		description: 'Form component properties including form fields, data handling, and layout options.',
		type: 'Props',
		content: 'form props properties form initialData onDataChange onSubmit submitButton spacing columns responsive className id',
		rank: 8,
	},
	{
		title: 'Form Factories',
		path: '/components/form',
		section: 'FormFactories',
		description: 'Factory functions for creating form fields including input, textarea, select, checkbox, radio, and checkboxGroup with selectAll support.',
		type: 'Section',
		content: 'FormFactories input textarea select checkbox radio checkboxGroup selectAll field types factory validation required options',
		rank: 9,
	},
	{
		title: 'Checkbox Group Field',
		path: '/components/form',
		section: 'Field Types',
		description: 'Multiple checkbox selection field created with checkboxGroup factory for form arrays.',
		type: 'Example',
		content: 'checkboxGroup multiple selection checkbox array options required validation skills interests preferences selectAll select all',
		rank: 9,
	},
	{
		title: 'Checkbox Group with Select All',
		path: '/components/form',
		section: 'Field Types',
		description: 'Checkbox group with select all functionality to quickly select or deselect all options.',
		type: 'Example',
		content: 'checkboxGroup selectAll select all toggle indeterminate checkbox group bulk selection features options',
		rank: 9,
	},

	// Help Icon Component
	{
		title: 'Help Icon',
		path: '/components/help-icon',
		description: 'Help icon component that combines InfoCircled icon with tooltip for contextual assistance.',
		type: 'Component',
		content: 'help icon tooltip info information contextual assistance filled outlined design props',
		rank: 10,
	},
	{
		title: 'Help Icon Props',
		path: '/components/help-icon',
		section: 'Props',
		description: 'Help icon component properties including design variants, sizes, and tooltip options.',
		type: 'Props',
		content: 'help icon props properties design size placement message delay showArrow disabled className id',
		rank: 8,
	},

	// Input Component
	{
		title: 'Input',
		path: '/components/input',
		description: 'Text input component for forms with validation states.',
		type: 'Component',
		content: 'input text field form validation email password number tel url search file props default outline underline solid base variant',
		rank: 10,
	},
	{
		title: 'Input Props',
		path: '/components/input',
		section: 'Props',
		description: 'Input component properties and configuration options.',
		type: 'Props',
		content: 'input props properties type placeholder value onChange onBlur className validation variant default outline underline solid base',
		rank: 8,
	},

	// Label Component
	{
		title: 'Label',
		path: '/components/label',
		description: 'Text label component for form fields and UI elements.',
		type: 'Component',
		content: 'label text form field accessibility description props',
		rank: 10,
	},
	{
		title: 'Label Props',
		path: '/components/label',
		section: 'Props',
		description: 'Label component properties including htmlFor, required indicator, and styling options.',
		type: 'Props',
		content: 'label props properties htmlFor required className children',
		rank: 8,
	},

	// Modal Component
	{
		title: 'Modal',
		path: '/components/modal',
		description: 'Overlay component for displaying content above the main interface.',
		type: 'Component',
		content: 'modal dialog overlay popup isOpen onClose props',
		rank: 10,
	},
	{
		title: 'Modal Props',
		path: '/components/modal',
		section: 'Props',
		description: 'Modal component properties including containerClassName and overlayClassName.',
		type: 'Props',
		content: 'modal props properties isOpen onClose className overlayClassName containerClassName hideCloseButton',
		rank: 8,
	},

	// Pagination Component
	{
		title: 'Pagination',
		path: '/components/pagination',
		description: 'Navigation component for paginated content.',
		type: 'Component',
		content: 'pagination navigation pages previous next current total props',
		rank: 10,
	},
	{
		title: 'Pagination Props',
		path: '/components/pagination',
		section: 'Props',
		description: 'Pagination component properties including page, pageCount, and variant.',
		type: 'Props',
		content: 'pagination props properties page pageCount variant size onPageChange showFirstLast maxVisiblePages buttonsClassName',
		rank: 8,
	},

	// Panel Component
	{
		title: 'Panel',
		path: '/components/panel',
		description: 'Container component for organizing content sections.',
		type: 'Component',
		content: 'panel container section content organization layout props',
		rank: 10,
	},
	{
		title: 'Panel Props',
		path: '/components/panel',
		section: 'Props',
		description: 'Panel component properties including footer, title, and styling options.',
		type: 'Props',
		content: 'panel props properties title footer isOpen onClose hideCloseButton disableCloseOnOverlayClick className overlayClassName',
		rank: 8,
	},

	// Popover Component
	{
		title: 'Popover',
		path: '/components/popover',
		description: 'Floating content component that appears on trigger interaction.',
		type: 'Component',
		content: 'popover floating content trigger hover click placement props',
		rank: 10,
	},
	{
		title: 'Popover Props',
		path: '/components/popover',
		section: 'Props',
		description: 'Popover component properties including trigger, placement, and interaction options.',
		type: 'Props',
		content: 'popover props properties trigger placement isOpen onOpenChange className children',
		rank: 8,
	},

	// Radio Group Component
	{
		title: 'Radio Group',
		path: '/components/radiogroup',
		description: 'Selection control for single choice scenarios.',
		type: 'Component',
		content: 'radio group selection single choice options value onChange props',
		rank: 10,
	},
	{
		title: 'Radio Group Props',
		path: '/components/radiogroup',
		section: 'Props',
		description: 'Radio Group component properties including options, value, onChange, and styling options.',
		type: 'Props',
		content: 'radiogroup props properties options value onChange id className childrenClassName hideInputs children',
		rank: 8,
	},

	// Scroll Area Component
	{
		title: 'Scroll Area',
		path: '/components/scroll-area',
		description: 'Custom scrollable container with styled scrollbars.',
		type: 'Component',
		content: 'scroll area container scrollbar custom styling overflow props',
		rank: 10,
	},
	{
		title: 'Scroll Area Props',
		path: '/components/scroll-area',
		section: 'Props',
		description: 'Scroll Area component properties including scrollbar styling and interaction options.',
		type: 'Props',
		content: 'scrollarea props properties className children scrollbarClassName hideScrollbar maxHeight',
		rank: 8,
	},

	// Select Component
	{
		title: 'Select',
		path: '/components/select',
		description: 'Dropdown selection component with search and multi-selection capabilities.',
		type: 'Component',
		content: 'select dropdown combobox searchable options value onChange placeholder props',
		rank: 10,
	},
	{
		title: 'Select Props',
		path: '/components/select',
		section: 'Props',
		description: 'Select component properties including searchable, clearable, and options.',
		type: 'Props',
		content: 'select props properties options searchable clearable value onChange placeholder disabled className',
		rank: 8,
	},

	// Separator Component
	{
		title: 'Separator',
		path: '/components/separator',
		description: 'Visual divider component for separating content sections.',
		type: 'Component',
		content: 'separator divider line horizontal vertical content section props',
		rank: 10,
	},
	{
		title: 'Separator Props',
		path: '/components/separator',
		section: 'Props',
		description: 'Separator component properties including orientation and thickness.',
		type: 'Props',
		content: 'separator props properties orientation thickness decorative className horizontal vertical',
		rank: 8,
	},

	// Skeleton Component
	{
		title: 'Skeleton',
		path: '/components/skeleton',
		description: 'Loading placeholders that mimic the structure of your content.',
		type: 'Component',
		content: 'skeleton loading placeholder content structure shimmer props',
		rank: 10,
	},
	{
		title: 'Skeleton Props',
		path: '/components/skeleton',
		section: 'Props',
		description: 'Skeleton component properties including variant, size, and animation options.',
		type: 'Props',
		content: 'skeleton props properties variant size animated className width height',
		rank: 8,
	},

	// Slider Component
	{
		title: 'Slider',
		path: '/components/slider',
		description: 'Range input component for selecting numeric values.',
		type: 'Component',
		content: 'slider range input numeric value min max step onChange props',
		rank: 10,
	},
	{
		title: 'Slider Props',
		path: '/components/slider',
		section: 'Props',
		description: 'Slider component properties including min, max, step, value, and styling options.',
		type: 'Props',
		content: 'slider props properties min max step value onValueChange disabled rangeClassName thumbClassName',
		rank: 8,
	},

	// Table Component
	{
		title: 'Table',
		path: '/components/table',
		description: 'Data table component with sorting, selection, and responsive design.',
		type: 'Component',
		content: 'table data sorting selection responsive columns rows pagination props',
		rank: 10,
	},
	{
		title: 'Table Props',
		path: '/components/table',
		section: 'Props',
		description: 'Table component properties including data, columns, selection, and state options.',
		type: 'Props',
		content: 'table props properties data columns size selectable onSelectionChange loading emptyState striped hoverable caption',
		rank: 8,
	},

	// Tabs Component
	{
		title: 'Tabs',
		path: '/components/tabs',
		description: 'Tabbed interface component for organizing content into sections.',
		type: 'Component',
		content: 'tabs tabbed interface sections content organization navigation props tabsList automatic rendering',
		rank: 10,
	},
	{
		title: 'Tabs Props',
		path: '/components/tabs',
		section: 'Props',
		description: 'Tabs component properties including value, variant, tabsList for automatic rendering, and styling options.',
		type: 'Props',
		content: 'tabs props properties value onValueChange variant tabsWidth tabsList automatic rendering TabItem label triggersClassName contentClassName defaultValue',
		rank: 8,
	},
	{
		title: 'Tabs tabsList Prop Example',
		path: '/components/tabs',
		section: 'Using tabsList Prop',
		description: 'Automatically render tabs using the tabsList prop for cleaner code with string or React element labels.',
		type: 'Example',
		content: 'tabs tabsList prop automatic rendering TabItem value label string react element icon cleaner code TabsList TabsTrigger example',
		rank: 7,
	},

	// Textarea Component
	{
		title: 'Textarea',
		path: '/components/textarea',
		description: 'Multi-line text input with auto-expand and character limit features.',
		type: 'Component',
		content: 'textarea multiline text input expand character limit resize props outline left-line solid base variant',
		rank: 10,
	},
	{
		title: 'Textarea Props',
		path: '/components/textarea',
		section: 'Props',
		description: 'Textarea component properties including variant, autoExpand, characterLimit, and validation states.',
		type: 'Props',
		content: 'textarea props properties variant outline left-line solid base rounded displayOnlyMode errorMessage successMessage showResizeHandle autoExpand characterLimit placeholder rows disabled value defaultValue onChange className',
		rank: 8,
	},

	// Toast Component
	{
		title: 'Toast',
		path: '/components/toast',
		description: 'Notification component for displaying temporary messages.',
		type: 'Component',
		content: 'toast notification temporary message alert success error info warning props',
		rank: 10,
	},
	{
		title: 'Toast Props',
		path: '/components/toast',
		section: 'Props',
		description: 'Toast component properties including type, title, description, and dismissal options.',
		type: 'Props',
		content: 'toast props properties type title description dismissible onDismiss duration className',
		rank: 8,
	},

	// Toggle Component
	{
		title: 'Toggle',
		path: '/components/toggle',
		description: 'Switch component for boolean states and settings.',
		type: 'Component',
		content: 'toggle switch boolean state settings on off checked onChange props',
		rank: 10,
	},
	{
		title: 'Toggle Props',
		path: '/components/toggle',
		section: 'Props',
		description: 'Toggle component properties including size, variant, and state controls.',
		type: 'Props',
		content: 'toggle props properties size variant checked onCheckedChange disabled className thumbClassName backgroundClassNames',
		rank: 8,
	},

	// Tooltip Component
	{
		title: 'Tooltip',
		path: '/components/tooltip',
		description: 'Contextual information component that appears on hover or focus.',
		type: 'Component',
		content: 'tooltip hover focus contextual information help hint props',
		rank: 10,
	},
	{
		title: 'Tooltip Props',
		path: '/components/tooltip',
		section: 'Props',
		description: 'Tooltip component properties including message, placement, delay, showArrow, and disabled options.',
		type: 'Props',
		content: 'tooltip props properties message placement delay disabled showArrow arrow className id children',
		rank: 8,
	},

	// Hooks
	{
		title: 'useActionModal',
		path: '/components/actionmodal#hook-usage',
		description: 'Hook for managing action modal state and interactions.',
		type: 'Guide',
		content: 'useActionModal hook modal action state management open close confirm cancel',
		rank: 9,
	},
	{
		title: 'useToast',
		path: '/components/toast#hook-usage',
		description: 'Hook for showing toast notifications with different types.',
		type: 'Guide',
		content: 'useToast hook toast notification success error info warning show hide',
		rank: 9,
	},

	// Examples
	{
		title: 'Button Variants Example',
		path: '/components/button',
		section: 'Variants',
		description: 'Different button styles to fit your design needs.',
		type: 'Example',
		content: 'button variants primary secondary tertiary destructive outline link base example',
		rank: 7,
	},
	{
		title: 'Button States Example',
		path: '/components/button',
		section: 'States',
		description: 'Loading and disabled states for different user interactions.',
		type: 'Example',
		content: 'button states loading disabled fitted size example',
		rank: 7,
	},
	{
		title: 'Calendar Selection Modes Example',
		path: '/components/calendar',
		section: 'Selection Modes',
		description: 'Single date selection and date range selection modes for different use cases.',
		type: 'Example',
		content: 'calendar selection modes single range date picker onDateSelect onRangeSelect example',
		rank: 7,
	},
	{
		title: 'Calendar Views Example',
		path: '/components/calendar',
		section: 'Calendar Views',
		description: 'Different calendar views for various display requirements and navigation patterns.',
		type: 'Example',
		content: 'calendar views month week day view showViewSelector navigation example',
		rank: 7,
	},
	{
		title: 'Calendar Month Year Selector Example',
		path: '/components/calendar',
		section: 'Month & Year Selector',
		description: 'Enable dropdown selectors for quick navigation to specific months and years.',
		type: 'Example',
		content: 'calendar month year selector dropdown navigation useMonthYearSelector quick jump date navigationLayout example',
		rank: 7,
	},
	{
		title: 'Calendar Today Button Example',
		path: '/components/calendar',
		section: 'Today Button',
		description: 'Add a "Today" button for quick navigation to the current date.',
		type: 'Example',
		content: 'calendar today button current date navigation showTodayButton quick jump today example',
		rank: 7,
	},
	{
		title: 'Calendar Custom Styling Example',
		path: '/components/calendar',
		section: 'Custom Styling',
		description: 'Customize the calendar appearance with custom CSS classes for different elements.',
		type: 'Example',
		content: 'calendar custom styling customStyles containerClassName headerClassName selectedCellClassName example',
		rank: 7,
	},
	{
		title: 'Form Validation Example',
		path: '/components/form',
		section: 'Examples',
		description: 'Complete form with field validation and submission.',
		type: 'Example',
		content: 'form validation submit fields required optional example',
		rank: 7,
	},
	{
		title: 'Table with Sorting Example',
		path: '/components/table',
		section: 'Examples',
		description: 'Data table with sortable columns and selection.',
		type: 'Example',
		content: 'table sort sorting columns data selection rows example',
		rank: 7,
	},

	// Overview
	{
		title: 'All Components',
		path: '/components',
		description: 'Complete overview of all available components in Dreamer UI.',
		type: 'Guide',
		content: 'components overview all complete list categories display form feedback navigation',
		rank: 9,
	},
];

/**
 * Improved search matching with stricter requirements for relevance
 */
function searchMatch(query: string, text: string): number {
	const queryLower = query.toLowerCase();
	const textLower = text.toLowerCase();

	// Exact substring match gets highest score
	if (textLower.includes(queryLower)) {
		const index = textLower.indexOf(queryLower);
		// Prefer matches at the beginning of the text
		return 1000 - index;
	}

	// Word boundary matches - split by spaces and common separators
	const words = textLower.split(/[\s\-_.]+/);
	for (const word of words) {
		// Exact word match
		if (word === queryLower) {
			return 900;
		}
		// Word starts with query (useful for partial prop names)
		if (word.startsWith(queryLower) && queryLower.length >= 2) {
			return 800 - (word.length - queryLower.length); // Prefer shorter words
		}
	}

	// For very short queries, be more restrictive
	if (queryLower.length <= 2) {
		return 0;
	}

	// For longer queries (4+ chars), allow partial matches within words
	if (queryLower.length >= 4) {
		for (const word of words) {
			if (word.includes(queryLower)) {
				return 600 - (word.length - queryLower.length);
			}
		}
	}

	return 0;
}

/**
 * Extract matched text snippet with context
 */
function extractMatchedText(query: string, text: string, maxLength: number = 60): string {
	const queryLower = query.toLowerCase();
	const textLower = text.toLowerCase();
	
	// Find exact match first
	const index = textLower.indexOf(queryLower);
	if (index !== -1) {
		// Extract context around the match
		const start = Math.max(0, index - 20);
		const end = Math.min(text.length, index + queryLower.length + 20);
		let snippet = text.substring(start, end);
		
		// Add ellipsis if truncated
		if (start > 0) snippet = '...' + snippet;
		if (end < text.length) snippet = snippet + '...';
		
		return snippet;
	}
	
	// If no exact match, return beginning of text
	return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Find the best matching field and extract relevant text with proper prop name extraction
 */
function findBestMatch(query: string, item: Omit<SearchResult, 'matchedText' | 'matchedField'>): {
	matchedText: string;
	matchedField: 'title' | 'description' | 'section' | 'content';
} {
	const queryLower = query.toLowerCase();
	
	// Check title first (highest priority)
	if (item.title.toLowerCase().includes(queryLower)) {
		return {
			matchedText: item.title,
			matchedField: 'title'
		};
	}
	
	// Check section
	if (item.section && item.section.toLowerCase().includes(queryLower)) {
		return {
			matchedText: item.section,
			matchedField: 'section'
		};
	}
	
	// Check description
	if (item.description && item.description.toLowerCase().includes(queryLower)) {
		return {
			matchedText: extractMatchedText(query, item.description),
			matchedField: 'description'
		};
	}
	
	// Check content - for Props type, try to extract the actual prop name
	if (item.content.toLowerCase().includes(queryLower)) {
		if (item.type === 'Props') {
			// Try to find the full prop name in the content
			const propName = extractFullPropName(query, item.content);
			return {
				matchedText: propName,
				matchedField: 'content'
			};
		}
		return {
			matchedText: extractMatchedText(query, item.content),
			matchedField: 'content'
		};
	}
	
	// Fallback to title
	return {
		matchedText: item.title,
		matchedField: 'title'
	};
}

/**
 * Extract the full prop name from content when a partial match is found
 */
function extractFullPropName(query: string, content: string): string {
	const queryLower = query.toLowerCase();
	const words = content.split(/[\s\-_.]+/);
	
	// Look for exact matches first
	for (const word of words) {
		if (word.toLowerCase() === queryLower) {
			return word;
		}
	}
	
	// Look for words that start with the query
	for (const word of words) {
		if (word.toLowerCase().startsWith(queryLower)) {
			return word;
		}
	}
	
	// Look for words that contain the query
	for (const word of words) {
		if (word.toLowerCase().includes(queryLower)) {
			return word;
		}
	}
	
	return query;
}

/**
 * Search through indexed content with improved ranking, stricter matching, and deduplication
 */
export function searchContent(query: string): SearchResult[] {
	if (!query || query.trim().length < 2) {
		return [];
	}

	const queryTerms = query.toLowerCase().trim().split(/\s+/);
	const results: (SearchResult & { score: number })[] = [];

	// Set minimum score threshold based on query length
	const minScoreThreshold = queryTerms.length === 1 && queryTerms[0].length <= 4 ? 300 : 50;

	searchIndex.forEach((item) => {
		let totalScore = 0;
		let matchCount = 0;
		let hasStrongMatch = false;

		queryTerms.forEach((term) => {
			// Check title match (highest priority)
			const titleScore = searchMatch(term, item.title) * 3;
			if (titleScore > 0) {
				totalScore += titleScore;
				matchCount++;
				if (titleScore >= 1500) hasStrongMatch = true;
			}

			// Check section match (high priority for specific searches)
			if (item.section) {
				const sectionScore = searchMatch(term, item.section) * 2.5;
				if (sectionScore > 0) {
					totalScore += sectionScore;
					matchCount++;
					if (sectionScore >= 1000) hasStrongMatch = true;
				}
			}

			// Check description match
			if (item.description) {
				const descScore = searchMatch(term, item.description) * 2;
				if (descScore > 0) {
					totalScore += descScore;
					matchCount++;
					if (descScore >= 800) hasStrongMatch = true;
				}
			}

			// Check content match (lower priority, but still important for props)
			const contentScore = searchMatch(term, item.content);
			if (contentScore > 0) {
				totalScore += contentScore;
				matchCount++;
				if (contentScore >= 600) hasStrongMatch = true;
			}
		});

		// Only include results that actually match the query terms
		const hasAllTerms = matchCount >= queryTerms.length;
		const meetsThreshold = totalScore >= minScoreThreshold;

		if (matchCount > 0 && meetsThreshold && (hasAllTerms || hasStrongMatch)) {
			// Apply base rank multiplier
			const finalScore = (totalScore * item.rank) / queryTerms.length;
			
			// Find the best matching text for highlighting
			const matchInfo = findBestMatch(query, item);

			results.push({
				...item,
				...matchInfo,
				score: finalScore,
			});
		}
	});

	// Sort by score descending
	const sortedResults = results.sort((a, b) => b.score - a.score);

	// Enhanced deduplication logic
	const deduplicatedResults: SearchResult[] = [];
	const seenPaths = new Map<string, { 
		component?: SearchResult; 
		props?: SearchResult; 
		examples: SearchResult[];
		otherTypes: SearchResult[];
	}>();

	// First pass: group by path and type
	sortedResults.forEach(result => {
		const pathData = seenPaths.get(result.path) || { examples: [], otherTypes: [] };
		
		if (result.type === 'Props') {
			pathData.props = result;
		} else if (result.type === 'Component') {
			pathData.component = result;
		} else if (result.type === 'Example') {
			pathData.examples.push(result);
		} else {
			pathData.otherTypes.push(result);
		}
		
		seenPaths.set(result.path, pathData);
	});

	// Second pass: decide what to include for each path
	const queryLower = query.toLowerCase();
	const isSpecificPropQuery = queryLower.includes('props') || 
		queryLower.includes('classname') || 
		queryLower.includes('onclick') || 
		queryLower.includes('onchange') ||
		queryLower.includes('placeholder') ||
		queryLower.includes('value') ||
		queryLower.includes('disabled') ||
		queryLower.includes('required') ||
		queryLower.match(/^[a-z]+[A-Z]/); // camelCase pattern

	seenPaths.forEach(({ component, props, examples, otherTypes }, path) => {
		// Always add non-Component/Props/Example types first
		otherTypes.forEach(result => deduplicatedResults.push(result));

		// For component paths, apply smart deduplication
		if (path.startsWith('/components/')) {
			const hasComponent = !!component;
			const hasProps = !!props;
			const hasExamples = examples.length > 0;

			if (isSpecificPropQuery) {
				// For prop queries, prioritize Props, then Component
				if (hasProps) deduplicatedResults.push(props);
				else if (hasComponent) deduplicatedResults.push(component);
				if (hasExamples) deduplicatedResults.push(examples[0]);
			} else if (queryLower.includes('example')) {
				// For example queries, prioritize Examples
				examples.forEach(ex => deduplicatedResults.push(ex));
				if (hasComponent && !hasExamples) deduplicatedResults.push(component);
			} else {
				// For general queries, show the best match based on score
				const candidates = [
					...(hasComponent ? [component] : []),
					...(hasProps ? [props] : []),
					...examples.slice(0, 1)
				].filter(Boolean);

				if (candidates.length === 1) {
					deduplicatedResults.push(candidates[0]);
				} else if (candidates.length > 1) {
					const sortedCandidates = candidates.sort((a, b) => (b.score || 0) - (a.score || 0));
					
					deduplicatedResults.push(sortedCandidates[0]);
					
					if (sortedCandidates.length > 1) {
						const first = sortedCandidates[0];
						const second = sortedCandidates[1];
						const scoreDiff = (first.score || 0) - (second.score || 0);
						
						if ((first.type !== second.type && scoreDiff < (first.score || 0) * 0.2) ||
							(second.type === 'Props' && queryLower.match(/\b(variant|size|type|value|disabled|required|className)\b/))) {
							deduplicatedResults.push(second);
						}
					}
				}
			}
		} else {
			// For non-component paths, add all results
			if (component) deduplicatedResults.push(component);
			if (props) deduplicatedResults.push(props);
			examples.forEach(ex => deduplicatedResults.push(ex));
		}
	});

	// Final sort by score
	return deduplicatedResults.sort((a, b) => (b.score || 0) - (a.score || 0));
}