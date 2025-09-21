import { useState } from 'react';
import { Pagination } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'large-dataset', title: 'Large Dataset', level: 2 },
  { id: 'minimal-pagination', title: 'Minimal Pagination', level: 2 },
  { id: 'custom-sibling-count', title: 'Custom Max Visible Pages', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const paginationExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Standard pagination with all controls enabled.',
    code: `function BasicPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Current page: {currentPage} of {totalPages}</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}`,
    children: (
      <BasicPaginationExample />
    ),
  },
  {
    id: 'large-dataset',
    title: 'Large Dataset',
    description: 'Pagination for large datasets with many pages.',
    code: `function LargeDatasetExample() {
  const [currentPage, setCurrentPage] = useState(45);
  const totalPages = 100;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Page {currentPage} of {totalPages} (Large dataset)</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className='text-sm text-gray-400'>
        Notice how it shows ellipsis (...) to condense the display
      </div>
    </div>
  );
}`,
    children: (
      <LargeDatasetExample />
    ),
  },
  {
    id: 'minimal-pagination',
    title: 'Minimal Pagination',
    description: 'Simplified pagination without first/last buttons.',
    code: `function MinimalPaginationExample() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 8;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Minimal style: Page {currentPage} of {totalPages}</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
        showFirstLast={false}
      />
      <div className='text-sm text-gray-400'>
        First and last buttons are hidden for cleaner look
      </div>
    </div>
  );
}`,
    children: (
      <MinimalPaginationExample />
    ),
  },
  {
    id: 'custom-sibling-count',
    title: 'Custom Max Visible Pages',
    description: 'Control how many page numbers show at once.',
    code: `function CustomSiblingExample() {
  const [currentPage, setCurrentPage] = useState(10);
  const [maxVisible, setMaxVisible] = useState(5);
  const totalPages = 20;

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <p className='text-gray-300'>Page {currentPage} of {totalPages}</p>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-400'>Max Visible:</label>
          <select 
            value={maxVisible} 
            onChange={(e) => setMaxVisible(Number(e.target.value))}
            className='bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm'
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={9}>9</option>
          </select>
        </div>
      </div>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={maxVisible}
      />
      <div className='text-sm text-gray-400'>
        Max visible pages controls how many page numbers are shown at once
      </div>
    </div>
  );
}`,
    children: (
      <CustomSiblingExample />
    ),
  },
];

function BasicPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Current page: {currentPage} of {totalPages}</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

function LargeDatasetExample() {
  const [currentPage, setCurrentPage] = useState(45);
  const totalPages = 100;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Page {currentPage} of {totalPages} (Large dataset)</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className='text-sm text-gray-400'>
        Notice how it shows ellipsis (...) to condense the display
      </div>
    </div>
  );
}

function MinimalPaginationExample() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 8;

  return (
    <div className='space-y-4'>
      <p className='text-gray-300'>Minimal style: Page {currentPage} of {totalPages}</p>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
        showFirstLast={false}
      />
      <div className='text-sm text-gray-400'>
        First and last buttons are hidden for cleaner look
      </div>
    </div>
  );
}

function CustomSiblingExample() {
  const [currentPage, setCurrentPage] = useState(10);
  const [maxVisible, setMaxVisible] = useState(5);
  const totalPages = 20;

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <p className='text-gray-300'>Page {currentPage} of {totalPages}</p>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-400'>Max Visible:</label>
          <select 
            value={maxVisible} 
            onChange={(e) => setMaxVisible(Number(e.target.value))}
            className='bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm'
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={9}>9</option>
          </select>
        </div>
      </div>
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={maxVisible}
      />
      <div className='text-sm text-gray-400'>
        Max visible pages controls how many page numbers are shown at once
      </div>
    </div>
  );
}

const paginationProps = [
  {
    name: 'page',
    type: 'number',
    description: 'The current active page (1-indexed).',
    required: true,
  },
  {
    name: 'pageCount',
    type: 'number',
    default: '5',
    description: 'Total number of pages. Use Infinity for infinite pagination.',
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    description: 'Callback fired when the page changes.',
    required: true,
  },
  {
    name: 'maxVisiblePages',
    type: 'number',
    default: '5',
    description: 'Maximum number of page buttons to show.',
  },
  {
    name: 'showFirstLast',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show first and last page buttons.',
  },
  {
    name: 'variant',
    type: '"link" | "filled" | "outline"',
    default: '"link"',
    description: 'Button variant style.',
  },
  {
    name: 'size',
    type: '"sm" | "md"',
    default: '"md"',
    description: 'Button size.',
  },
  {
    name: 'buttonsClassName',
    type: 'string',
    description: 'Additional CSS classes for the button elements.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the pagination container.',
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
      examples={paginationExamples}
    />
  );
}