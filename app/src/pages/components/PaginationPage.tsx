import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const paginationProps = [
  {
    name: 'currentPage',
    type: 'number',
    description: 'The current active page.',
    required: true,
  },
  {
    name: 'totalPages',
    type: 'number',
    description: 'Total number of pages.',
    required: true,
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    description: 'Callback fired when the page changes.',
    required: true,
  },
  {
    name: 'showFirstLast',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show first and last page buttons.',
  },
  {
    name: 'showPrevNext',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show previous and next buttons.',
  },
  {
    name: 'siblingCount',
    type: 'number',
    default: '1',
    description: 'Number of sibling pages to show on each side.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the pagination.',
  },
];

export function PaginationPage() {
  return (
    <ComponentPage
      title='Pagination'
      description='Navigation component for dividing content across multiple pages with customizable controls.'
      tableOfContents={tableOfContents}
      usageInstructions='The Pagination component helps users navigate through large sets of data by dividing content into pages. It provides intuitive controls for moving between pages and shows the current position in the dataset.'
      importStatement="import { Pagination } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={paginationProps}
    />
  );
}