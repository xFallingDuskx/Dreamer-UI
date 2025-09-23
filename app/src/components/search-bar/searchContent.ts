export interface SearchResult {
  title: string;
  path: string;
  description?: string;
  section?: string;
  type: 'Component' | 'Guide' | 'Section' | 'Example' | 'Props';
  content: string;
  rank: number; // Higher is better
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
    content: 'button interactive click variants primary secondary tertiary destructive outline link states loading disabled props',
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
    content: 'modal dialog overlay popup isOpen onClose className overlayClassName props',
    rank: 10,
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
    content: 'carousel slider images content navigation controls autoplay props',
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
 * Simple fuzzy search implementation
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
  
  // Fuzzy match - check if all characters exist in order
  let queryIndex = 0;
  let matchCount = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
      matchCount++;
    }
  }
  
  // Return match percentage scaled
  return queryIndex === queryLower.length ? (matchCount / queryLower.length) * 100 : 0;
}

/**
 * Search through indexed content with ranking
 */
export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const queryTerms = query.toLowerCase().trim().split(/\s+/);
  const results: (SearchResult & { score: number })[] = [];

  searchIndex.forEach((item) => {
    let totalScore = 0;
    let matchCount = 0;

    queryTerms.forEach((term) => {
      // Check title match (highest priority)
      const titleScore = fuzzyMatch(term, item.title) * 3;
      if (titleScore > 0) {
        totalScore += titleScore;
        matchCount++;
      }

      // Check description match
      if (item.description) {
        const descScore = fuzzyMatch(term, item.description) * 2;
        if (descScore > 0) {
          totalScore += descScore;
          matchCount++;
        }
      }

      // Check content match
      const contentScore = fuzzyMatch(term, item.content);
      if (contentScore > 0) {
        totalScore += contentScore;
        matchCount++;
      }

      // Check section match
      if (item.section) {
        const sectionScore = fuzzyMatch(term, item.section) * 2.5;
        if (sectionScore > 0) {
          totalScore += sectionScore;
          matchCount++;
        }
      }
    });

    // Only include if we have some matches
    if (matchCount > 0) {
      // Apply base rank multiplier
      const finalScore = (totalScore * item.rank) / queryTerms.length;
      
      results.push({
        ...item,
        score: finalScore,
      });
    }
  });

  // Sort by score descending and remove score field
  return results
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...item }) => item);
}