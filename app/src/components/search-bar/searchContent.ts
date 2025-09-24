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
}

// Content index for search
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

	// Component Pages
	{
		title: 'Button',
		path: '/components/button',
		description: 'Interactive button component with multiple variants and states.',
		type: 'Component',
		content:
			'button interactive click variants primary secondary tertiary destructive outline link states loading disabled props',
		rank: 10,
	},
	{
		title: 'Button Props',
		path: '/components/button',
		section: 'Props',
		description: 'Button component properties and configuration options.',
		type: 'Props',
		content: 'button props properties variant size loading disabled href target onClick className',
		rank: 8,
	},
	{
		title: 'Input',
		path: '/components/input',
		description: 'Text input component for forms with validation states.',
		type: 'Component',
		content: 'input text field form validation email password number tel url search file props',
		rank: 10,
	},
	{
		title: 'Input Props',
		path: '/components/input',
		section: 'Props',
		description: 'Input component properties and configuration options.',
		type: 'Props',
		content: 'input props properties type placeholder value onChange onBlur className validation',
		rank: 8,
	},
	{
		title: 'Select',
		path: '/components/select',
		description: 'Dropdown selection component with search and multi-selection capabilities.',
		type: 'Component',
		content: 'select dropdown combobox searchable options value onChange placeholder props',
		rank: 10,
	},
	{
		title: 'Modal',
		path: '/components/modal',
		description: 'Overlay component for displaying content above the main interface.',
		type: 'Component',
		content: 'modal dialog overlay popup isOpen onClose className overlayClassName containerClassName props',
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
	{
		title: 'Accordion',
		path: '/components/accordion',
		description: 'Collapsible content sections with expand/collapse functionality.',
		type: 'Component',
		content: 'accordion collapsible expandable collapse sections panels props',
		rank: 10,
	},
	{
		title: 'Action Modal',
		path: '/components/actionmodal',
		description: 'Modal component with built-in action buttons for confirmations and forms.',
		type: 'Component',
		content: 'action modal confirmation dialog form buttons cancel save delete props',
		rank: 10,
	},
	{
		title: 'Avatar',
		path: '/components/avatar',
		description: 'User profile picture component with 12 pre-defined cartoon-like avatars.',
		type: 'Component',
		content: 'avatar profile picture user image cartoon moon dreams dev props',
		rank: 10,
	},
	{
		title: 'Badge',
		path: '/components/badge',
		description: 'Small status indicators and labels for highlighting information.',
		type: 'Component',
		content: 'badge label status indicator highlight notification count props',
		rank: 10,
	},
	{
		title: 'Callout',
		path: '/components/callout',
		description: 'Alert component for displaying important messages and notifications.',
		type: 'Component',
		content: 'callout alert notification message info warning error success props',
		rank: 10,
	},
	{
		title: 'Card',
		path: '/components/card',
		description: 'Container component for grouping related content and actions.',
		type: 'Component',
		content: 'card container panel content group section layout props',
		rank: 10,
	},
	{
		title: 'Carousel',
		path: '/components/carousel',
		description: 'Image and content carousel with navigation controls.',
		type: 'Component',
		content: 'carousel slider images content navigation controls autoplay containerClassName props',
		rank: 10,
	},
	{
		title: 'Carousel Props',
		path: '/components/carousel',
		section: 'Props',
		description: 'Carousel component properties including containerClassName for styling.',
		type: 'Props',
		content: 'carousel props properties slides autoplay controls containerClassName className navigation',
		rank: 8,
	},
	{
		title: 'Checkbox',
		path: '/components/checkbox',
		description: 'Selection control for multiple choice scenarios.',
		type: 'Component',
		content: 'checkbox selection control multiple choice checked onChange props',
		rank: 10,
	},
	{
		title: 'Code Block',
		path: '/components/codeblock',
		description: 'Syntax highlighted code display with copy and fullscreen features.',
		type: 'Component',
		content: 'code block syntax highlight copy fullscreen language programming props',
		rank: 10,
	},
	{
		title: 'Dropdown Menu',
		path: '/components/dropdown-menu',
		description: 'Contextual menu component with keyboard navigation and sub-menus.',
		type: 'Component',
		content: 'dropdown menu context navigation keyboard submenu items actions props',
		rank: 10,
	},
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
		description: 'Error boundary component properties and error handling options.',
		type: 'Props',
		content: 'error boundary props properties fallback onError children reset simulation',
		rank: 8,
	},
	{
		title: 'Form',
		path: '/components/form',
		description: 'Form container with validation and submission handling.',
		type: 'Component',
		content: 'form validation submission handling fields inputs controls props',
		rank: 10,
	},
	{
		title: 'Table',
		path: '/components/table',
		description: 'Data table component with sorting, selection, and responsive design.',
		type: 'Component',
		content: 'table data sorting selection responsive columns rows pagination props',
		rank: 10,
	},
	{
		title: 'Tabs',
		path: '/components/tabs',
		description: 'Tabbed interface component for organizing content into sections.',
		type: 'Component',
		content: 'tabs tabbed interface sections content organization navigation props',
		rank: 10,
	},
	{
		title: 'Toast',
		path: '/components/toast',
		description: 'Notification component for displaying temporary messages.',
		type: 'Component',
		content: 'toast notification temporary message alert success error info warning props',
		rank: 10,
	},
	{
		title: 'Tooltip',
		path: '/components/tooltip',
		description: 'Contextual information component that appears on hover or focus.',
		type: 'Component',
		content: 'tooltip hover focus contextual information help hint props',
		rank: 10,
	},
	{
		title: 'Checkbox',
		path: '/components/checkbox',
		description: 'Selection control for multiple choice scenarios.',
		type: 'Component',
		content: 'checkbox selection control multiple choice checked onChange props',
		rank: 10,
	},
	{
		title: 'Drawer',
		path: '/components/drawer',
		description: 'Slide-out panel component for additional content and actions.',
		type: 'Component',
		content: 'drawer slide panel sidebar navigation content actions props',
		rank: 10,
	},
	{
		title: 'Form',
		path: '/components/form',
		description: 'Form container with validation and submission handling.',
		type: 'Component',
		content: 'form validation submission handling fields inputs controls props',
		rank: 10,
	},
	{
		title: 'Label',
		path: '/components/label',
		description: 'Text label component for form fields and UI elements.',
		type: 'Component',
		content: 'label text form field accessibility description props',
		rank: 10,
	},
	{
		title: 'Pagination',
		path: '/components/pagination',
		description: 'Navigation component for paginated content.',
		type: 'Component',
		content: 'pagination navigation pages previous next current total props',
		rank: 10,
	},
	{
		title: 'Panel',
		path: '/components/panel',
		description: 'Container component for organizing content sections.',
		type: 'Component',
		content: 'panel container section content organization layout props',
		rank: 10,
	},
	{
		title: 'Popover',
		path: '/components/popover',
		description: 'Floating content component that appears on trigger interaction.',
		type: 'Component',
		content: 'popover floating content trigger hover click placement props',
		rank: 10,
	},
	{
		title: 'Radio Group',
		path: '/components/radiogroup',
		description: 'Selection control for single choice scenarios.',
		type: 'Component',
		content: 'radio group selection single choice options value onChange props',
		rank: 10,
	},
	{
		title: 'Scroll Area',
		path: '/components/scroll-area',
		description: 'Custom scrollable container with styled scrollbars.',
		type: 'Component',
		content: 'scroll area container scrollbar custom styling overflow props',
		rank: 10,
	},
	{
		title: 'Separator',
		path: '/components/separator',
		description: 'Visual divider component for separating content sections.',
		type: 'Component',
		content: 'separator divider line horizontal vertical content section props',
		rank: 10,
	},
	{
		title: 'Skeleton',
		path: '/components/skeleton',
		description: 'Loading placeholders that mimic the structure of your content.',
		type: 'Component',
		content: 'skeleton loading placeholder content structure shimmer props',
		rank: 10,
	},
	{
		title: 'Slider',
		path: '/components/slider',
		description: 'Range input component for selecting numeric values.',
		type: 'Component',
		content: 'slider range input numeric value min max step onChange props',
		rank: 10,
	},
	{
		title: 'Textarea',
		path: '/components/textarea',
		description: 'Multi-line text input with auto-expand and character limit features.',
		type: 'Component',
		content: 'textarea multiline text input expand character limit resize props',
		rank: 10,
	},
	{
		title: 'Toggle',
		path: '/components/toggle',
		description: 'Switch component for boolean states and settings.',
		type: 'Component',
		content: 'toggle switch boolean state settings on off checked onChange props',
		rank: 10,
	},
	// Add more component props
	{
		title: 'Select Props',
		path: '/components/select',
		section: 'Props',
		description: 'Select component properties and configuration options.',
		type: 'Props',
		content: 'select props properties options searchable clearable value onChange placeholder',
		rank: 8,
	},
	{
		title: 'Modal Props',
		path: '/components/modal',
		section: 'Props',
		description: 'Modal component properties and configuration options.',
		type: 'Props',
		content: 'modal props properties isOpen onClose className overlayClassName',
		rank: 8,
	},
	{
		title: 'Table Props',
		path: '/components/table',
		section: 'Props',
		description: 'Table component properties and configuration options.',
		type: 'Props',
		content: 'table props properties columns data sorting selection pagination',
		rank: 8,
	},
	// Example entries for component usage patterns
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
		title: 'Error Boundary Example',
		path: '/components/error-boundary',
		section: 'Examples',
		description: 'Error simulation and boundary handling for component error states.',
		type: 'Example',
		content: 'error boundary example simulation fallback component crash handling testing',
		rank: 7,
	},
	{
		title: 'Input Validation Example',
		path: '/components/input',
		section: 'Examples',
		description: 'Form input with validation states and error messages.',
		type: 'Example',
		content: 'input validation error success warning states form example',
		rank: 7,
	},
	{
		title: 'Modal with Actions Example',
		path: '/components/modal',
		section: 'Examples',
		description: 'Modal dialog with action buttons and confirmation flow.',
		type: 'Example',
		content: 'modal dialog actions confirm cancel delete save example',
		rank: 7,
	},
	{
		title: 'Select with Search Example',
		path: '/components/select',
		section: 'Examples',
		description: 'Searchable dropdown with filtering capabilities.',
		type: 'Example',
		content: 'select search dropdown filter combobox searchable example',
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
		title: 'Toast Notifications Example',
		path: '/components/toast',
		section: 'Examples',
		description: 'Success, error, and info toast message patterns.',
		type: 'Example',
		content: 'toast notification success error info warning message example',
		rank: 7,
	},
	// Add more components...
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
 * Improved fuzzy search implementation with stricter matching
 */
function fuzzyMatch(query: string, text: string): number {
	const queryLower = query.toLowerCase();
	const textLower = text.toLowerCase();

	// Exact match gets highest score
	if (textLower.includes(queryLower)) {
		const index = textLower.indexOf(queryLower);
		// Earlier matches get higher scores
		return 1000 - index;
	}

	// Word boundary match - higher priority than character fuzzy match
	const words = textLower.split(/\s+/);
	for (const word of words) {
		if (word.startsWith(queryLower)) {
			return 800; // High score for word starts
		}
		if (word.includes(queryLower)) {
			return 600; // Medium score for word contains
		}
	}

	// Only do character fuzzy match for longer queries (3+ chars) to avoid too broad matches
	if (queryLower.length >= 3) {
		let queryIndex = 0;
		let matchCount = 0;
		let consecutiveMatches = 0;
		let maxConsecutive = 0;

		for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
			if (textLower[i] === queryLower[queryIndex]) {
				queryIndex++;
				matchCount++;
				consecutiveMatches++;
				maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
			} else {
				consecutiveMatches = 0;
			}
		}

		// Only return fuzzy match if we have good coverage and some consecutive matches
		const coverage = matchCount / queryLower.length;
		const consecutiveBonus = maxConsecutive / queryLower.length;
		
		if (queryIndex === queryLower.length && coverage > 0.7 && consecutiveBonus > 0.3) {
			return Math.min(400, coverage * consecutiveBonus * 400);
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
 * Find the best matching field and extract relevant text
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
	
	// Check content
	if (item.content.toLowerCase().includes(queryLower)) {
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
 * Search through indexed content with improved ranking, stricter matching, and deduplication
 */
export function searchContent(query: string): SearchResult[] {
	if (!query || query.trim().length < 2) {
		return [];
	}

	const queryTerms = query.toLowerCase().trim().split(/\s+/);
	const results: (SearchResult & { score: number })[] = [];

	// Set minimum score threshold based on query length
	const minScoreThreshold = queryTerms.length === 1 && queryTerms[0].length <= 4 ? 500 : 100;

	searchIndex.forEach((item) => {
		let totalScore = 0;
		let matchCount = 0;
		let hasStrongMatch = false; // Track if we have at least one strong match

		queryTerms.forEach((term) => {
			// Check title match (highest priority)
			const titleScore = fuzzyMatch(term, item.title) * 3;
			if (titleScore > 0) {
				totalScore += titleScore;
				matchCount++;
				if (titleScore >= 1500) hasStrongMatch = true; // Strong title match
			}

			// Check section match (high priority for specific searches)
			if (item.section) {
				const sectionScore = fuzzyMatch(term, item.section) * 2.5;
				if (sectionScore > 0) {
					totalScore += sectionScore;
					matchCount++;
					if (sectionScore >= 1000) hasStrongMatch = true; // Strong section match
				}
			}

			// Check description match
			if (item.description) {
				const descScore = fuzzyMatch(term, item.description) * 2;
				if (descScore > 0) {
					totalScore += descScore;
					matchCount++;
					if (descScore >= 800) hasStrongMatch = true; // Strong description match
				}
			}

			// Check content match (lower priority, but still important for props)
			const contentScore = fuzzyMatch(term, item.content);
			if (contentScore > 0) {
				totalScore += contentScore;
				matchCount++;
				if (contentScore >= 600) hasStrongMatch = true; // Strong content match
			}
		});

		// Only include results that meet criteria:
		// 1. Have matches for all query terms OR have a very strong single match
		// 2. Meet minimum score threshold
		// 3. Have at least one strong match for short queries
		const hasAllTerms = matchCount >= queryTerms.length;
		const meetsThreshold = totalScore >= minScoreThreshold;
		const qualifiesForShortQuery = queryTerms.length > 1 || hasStrongMatch || totalScore >= 800;

		if (matchCount > 0 && meetsThreshold && (hasAllTerms || hasStrongMatch) && qualifiesForShortQuery) {
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

	// Deduplication logic: prioritize Props over Components when both exist for the same path
	const deduplicatedResults: SearchResult[] = [];
	const seenPaths = new Map<string, { component?: SearchResult; props?: SearchResult }>();

	// First pass: group by path
	sortedResults.forEach(result => {
		const pathData = seenPaths.get(result.path) || {};
		
		if (result.type === 'Props') {
			pathData.props = result;
		} else if (result.type === 'Component') {
			pathData.component = result;
		} else {
			// For non-Component/Props types (Guide, Example, etc.), add directly
			deduplicatedResults.push(result);
			return;
		}
		
		seenPaths.set(result.path, pathData);
	});

	// Second pass: decide what to include for each path
	seenPaths.forEach(({ component, props }) => {
		if (props && component) {
			// If we have both, prioritize Props if the query seems to be looking for specific prop info
			const queryLower = query.toLowerCase();
			const isSpecificPropQuery = queryLower.includes('props') || 
				queryLower.includes('classname') || 
				queryLower.includes('onclick') || 
				queryLower.includes('onchange') ||
				queryLower.includes('placeholder') ||
				queryLower.includes('value') ||
				queryLower.includes('disabled') ||
				queryLower.includes('required') ||
				queryLower.match(/^[a-z]+[A-Z]/); // camelCase pattern like containerClassName

			if (isSpecificPropQuery) {
				deduplicatedResults.push(props);
			} else {
				// For general searches, show component first, then props
				deduplicatedResults.push(component);
				// Only add props if it has a significantly different score or specific prop match
				if (props.score > component.score * 0.8 && props.matchedField === 'content') {
					deduplicatedResults.push(props);
				}
			}
		} else if (props) {
			deduplicatedResults.push(props);
		} else if (component) {
			deduplicatedResults.push(component);
		}
	});

	// Final sort by score
	return deduplicatedResults.sort((a, b) => b.score - a.score);
}
