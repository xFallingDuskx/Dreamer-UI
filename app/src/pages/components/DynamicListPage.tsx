import { DynamicList } from '../../../dynamic-list';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'interactive-features', title: 'Interactive Features', level: 1 },
  { id: 'accessibility', title: 'Accessibility', level: 1 },
];

export function DynamicListPage() {
  return (
    <ComponentPage
      title='DynamicList'
      description='A dynamic list component that allows items to be added, deleted, and reordered through drag-and-drop or button controls. Perfect for managing collections of data.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Basic Usage'
        description='A simple list with the ability to add, delete, and reorder items.'
        id='basic-usage'
      >
        <div className='max-w-md'>
          <DynamicList
            items={[
              { id: '1', content: 'Buy groceries' },
              { id: '2', content: 'Walk the dog' },
              { id: '3', content: 'Finish project proposal' },
            ]}
            addPlaceholder="Add a new task..."
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Variants'
        description='Different size options to fit various design contexts.'
        id='variants'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Small</h4>
            <DynamicList
              size='sm'
              items={[
                { id: '1', content: 'Compact item' },
                { id: '2', content: 'Small spacing' },
              ]}
              addPlaceholder="Add item..."
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Medium (Default)</h4>
            <DynamicList
              items={[
                { id: '1', content: 'Standard item' },
                { id: '2', content: 'Regular spacing' },
              ]}
              addPlaceholder="Add item..."
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Large</h4>
            <DynamicList
              size='lg'
              items={[
                { id: '1', content: 'Spacious item' },
                { id: '2', content: 'Large spacing' },
              ]}
              addPlaceholder="Add item..."
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Interactive Features'
        description='Control which interactions are available to users.'
        id='interactive-features'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Read-only</h4>
            <DynamicList
              allowAdd={false}
              allowDelete={false}
              allowReorder={false}
              items={[
                { id: '1', content: 'Display only item' },
                { id: '2', content: 'No interactions' },
                { id: '3', content: 'Static content' },
              ]}
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Delete only</h4>
            <DynamicList
              allowAdd={false}
              allowReorder={false}
              items={[
                { id: '1', content: 'Can be removed' },
                { id: '2', content: 'Delete available' },
                { id: '3', content: 'No adding/reordering' },
              ]}
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Reorder only</h4>
            <DynamicList
              allowAdd={false}
              allowDelete={false}
              items={[
                { id: '1', content: 'Drag to reorder' },
                { id: '2', content: 'Use arrow buttons' },
                { id: '3', content: 'No adding/deleting' },
              ]}
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Custom placeholder</h4>
            <DynamicList
              items={[
                { id: '1', content: 'Shopping item' },
              ]}
              addPlaceholder="Add grocery item..."
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Accessibility'
        description='Built with accessibility in mind, supporting keyboard navigation and screen readers.'
        id='accessibility'
      >
        <div className='space-y-4'>
          <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
            <h4 className='font-medium text-blue-900 dark:text-blue-100 mb-2'>Keyboard Navigation</h4>
            <ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
              <li>• <kbd className='bg-blue-200 dark:bg-blue-800 px-1 rounded'>Tab</kbd> to navigate between items</li>
              <li>• <kbd className='bg-blue-200 dark:bg-blue-800 px-1 rounded'>↑</kbd> <kbd className='bg-blue-200 dark:bg-blue-800 px-1 rounded'>↓</kbd> arrow keys to reorder items</li>
              <li>• <kbd className='bg-blue-200 dark:bg-blue-800 px-1 rounded'>Delete</kbd> key to remove focused item</li>
              <li>• <kbd className='bg-blue-200 dark:bg-blue-800 px-1 rounded'>Enter</kbd> in input field to add new item</li>
            </ul>
          </div>
          
          <div className='max-w-md'>
            <DynamicList
              items={[
                { id: '1', content: 'Try keyboard navigation' },
                { id: '2', content: 'Focus this item and use arrow keys' },
                { id: '3', content: 'Press Delete key to remove' },
              ]}
              addPlaceholder="Type and press Enter..."
            />
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}