import { ComponentPage } from '../../components/layout/ComponentPage';
import { DynamicList } from '@moondreamsdev/dreamer-ui/components';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'markers', title: 'Markers', level: 2 },
  { id: 'custom-rendering', title: 'Custom Rendering', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'interactive-features', title: 'Interactive Features', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const dynamicListExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'A simple list with the ability to add, delete, and reorder items.',
    code: `<div className='max-w-md'>
  <DynamicList
    title="Daily Tasks"
    items={[
      { id: '1', content: 'Buy groceries' },
      { id: '2', content: 'Walk the dog' },
      { id: '3', content: 'Finish project proposal' },
    ]}
    addPlaceholder="Add a new task..."
  />
</div>`,
    children: (
      <div className='max-w-md'>
        <DynamicList
          title="Daily Tasks"
          items={[
            { id: '1', content: 'Buy groceries' },
            { id: '2', content: 'Walk the dog' },
            { id: '3', content: 'Finish project proposal' },
          ]}
          addPlaceholder="Add a new task..."
        />
      </div>
    ),
  },
  {
    id: 'markers',
    title: 'Markers',
    description: 'Different marker types to visually organize list items.',
    code: `<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <div>
    <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Disc (Default)</h4>
    <DynamicList
      title="Features"
      marker="disc"
      items={[
        { id: '1', content: 'First item' },
        { id: '2', content: 'Second item' },
        { id: '3', content: 'Third item' },
      ]}
      allowAdd={false}
    />
  </div>
  <div>
    <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Dash</h4>
    <DynamicList
      title="Options"
      marker="dash"
      items={[
        { id: '1', content: 'First item' },
        { id: '2', content: 'Second item' },
        { id: '3', content: 'Third item' },
      ]}
      allowAdd={false}
    />
  </div>
  <div>
    <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Decimal</h4>
    <DynamicList
      title="Steps"
      marker="decimal"
      items={[
        { id: '1', content: 'First item' },
        { id: '2', content: 'Second item' },
        { id: '3', content: 'Third item' },
      ]}
      allowAdd={false}
    />
  </div>
  <div>
    <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Custom Icon</h4>
    <DynamicList
      title="Favorites"
      marker={<span className="text-blue-500">★</span>}
      items={[
        { id: '1', content: 'Starred item' },
        { id: '2', content: 'Important task' },
        { id: '3', content: 'Priority item' },
      ]}
      allowAdd={false}
    />
  </div>
</div>`,
    children: (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Disc (Default)</h4>
          <DynamicList
            title="Features"
            marker="disc"
            items={[
              { id: '1', content: 'First item' },
              { id: '2', content: 'Second item' },
              { id: '3', content: 'Third item' },
            ]}
            allowAdd={false}
          />
        </div>
        <div>
          <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Dash</h4>
          <DynamicList
            title="Options"
            marker="dash"
            items={[
              { id: '1', content: 'First item' },
              { id: '2', content: 'Second item' },
              { id: '3', content: 'Third item' },
            ]}
            allowAdd={false}
          />
        </div>
        <div>
          <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Decimal</h4>
          <DynamicList
            title="Steps"
            marker="decimal"
            items={[
              { id: '1', content: 'First item' },
              { id: '2', content: 'Second item' },
              { id: '3', content: 'Third item' },
            ]}
            allowAdd={false}
          />
        </div>
        <div>
          <h4 className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Custom Icon</h4>
          <DynamicList
            title="Favorites"
            marker={<span className="text-blue-500">★</span>}
            items={[
              { id: '1', content: 'Starred item' },
              { id: '2', content: 'Important task' },
              { id: '3', content: 'Priority item' },
            ]}
            allowAdd={false}
          />
        </div>
      </div>
    ),
  },
  {
    id: 'custom-rendering',
    title: 'Custom Rendering',
    description: 'Custom item rendering with additional data and rich content.',
    code: `<div className='max-w-2xl'>
  <DynamicList
    title="Project Tasks"
    items={[
      { 
        id: '1', 
        content: 'Design Landing Page', 
        priority: 'high',
        assignee: 'Sarah',
        dueDate: '2024-01-15'
      },
      // ... more items
    ]}
    onItemsChange={(items) => console.log('Updated items:', items)}
    itemRenderer={(item, index) => (
      <div key={index} className="flex items-center justify-between w-full">
        <div className="flex-1">
          <div className="font-medium text-slate-900 dark:text-slate-100">
            {item.content}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Assigned to {item.assignee} • Due {item.dueDate}
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className={\`inline-flex px-2 py-1 text-xs font-medium rounded-full \${
            item.priority === 'high' 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
              : item.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
          }\`}>
            {item.priority}
          </span>
        </div>
      </div>
    )}
    addPlaceholder="Add new task..."
  />
</div>`,
    children: (
      <div className='max-w-2xl'>
        <DynamicList
          title="Project Tasks"
          items={[
            { 
              id: '1', 
              content: 'Design Landing Page', 
              priority: 'high',
              assignee: 'Sarah',
              dueDate: '2024-01-15'
            },
            { 
              id: '2', 
              content: 'Code Review', 
              priority: 'medium',
              assignee: 'Mike',
              dueDate: '2024-01-18'
            },
            { 
              id: '3', 
              content: 'Write Documentation', 
              priority: 'low',
              assignee: 'Alex',
              dueDate: '2024-01-22'
            },
          ]}
          onItemsChange={(items) => console.log('Updated items:', items)}
          itemRenderer={(item, index) => (
            <div key={index} className="flex items-center justify-between w-full">
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {item.content}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Assigned to {item.assignee} • Due {item.dueDate}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.priority === 'high' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : item.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          )}
          addPlaceholder="Add new task..."
        />
      </div>
    ),
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different size options to fit various design contexts.',
    code: `<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
  <div>
    <DynamicList
      title='Small'
      size='sm'
      items={[
        { id: '1', content: 'Compact item' },
        { id: '2', content: 'Small spacing' },
      ]}
      addPlaceholder="Add item..."
    />
  </div>
  <div>
    <DynamicList
      title='Medium (Default)'
      items={[
        { id: '1', content: 'Standard item' },
        { id: '2', content: 'Regular spacing' },
      ]}
      addPlaceholder="Add item..."
    />
  </div>
  <div>
    <DynamicList
      title='Large'
      size='lg'
      items={[
        { id: '1', content: 'Spacious item' },
        { id: '2', content: 'Large spacing' },
      ]}
      addPlaceholder="Add item..."
    />
  </div>
</div>`,
    children: (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <DynamicList
            title='Small'
            size='sm'
            items={[
              { id: '1', content: 'Compact item' },
              { id: '2', content: 'Small spacing' },
            ]}
            addPlaceholder="Add item..."
          />
        </div>
        <div>
          <DynamicList
            title='Medium (Default)'
            items={[
              { id: '1', content: 'Standard item' },
              { id: '2', content: 'Regular spacing' },
            ]}
            addPlaceholder="Add item..."
          />
        </div>
        <div>
          <DynamicList
            title='Large'
            size='lg'
            items={[
              { id: '1', content: 'Spacious item' },
              { id: '2', content: 'Large spacing' },
            ]}
            addPlaceholder="Add item..."
          />
        </div>
      </div>
    ),
  },
  {
    id: 'interactive-features',
    title: 'Interactive Features',
    description: 'Control which interactions are available to users.',
    code: `<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
</div>`,
    children: (
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
    ),
  }
];

const dynamicListProps = [
  {
    name: 'items',
    type: 'DynamicListItem<T>[]',
    description: 'Array of items to display in the list.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'Size variant for spacing and typography.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional ID for the component.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
  },
  {
    name: 'allowAdd',
    type: 'boolean',
    default: 'true',
    description: 'Whether items can be added to the list.',
  },
  {
    name: 'allowDelete',
    type: 'boolean',
    default: 'true',
    description: 'Whether items can be deleted from the list.',
  },
  {
    name: 'allowReorder',
    type: 'boolean',
    default: 'true',
    description: 'Whether items can be reordered via drag-and-drop or keyboard.',
  },
  {
    name: 'addPlaceholder',
    type: 'string',
    default: '"Add new item..."',
    description: 'Placeholder text for the add item input field.',
  },
  {
    name: 'onItemsChange',
    type: '(items: DynamicListItem<T>[]) => void',
    description: 'Callback fired when the items array changes.',
  },
  {
    name: 'renderItem',
    type: '(item: DynamicListItem<T>, index: number) => React.ReactNode',
    description: 'Custom render function for list items.',
  },
  {
    name: 'itemRenderer',
    type: '(item: DynamicListItem<T>, index: number) => React.ReactNode',
    description: 'Alternative name for renderItem prop.',
  },
  {
    name: 'marker',
    type: '"disc" | "dash" | "decimal" | React.ReactElement',
    description: 'Type of marker to display before each item.',
  },
  {
    name: 'showDividers',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show dividers between list items.',
  },
  {
    name: 'showReorderButtons',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show up/down arrow buttons for reordering.',
  },
  {
    name: 'title',
    type: 'string | React.ReactElement',
    description: 'Optional title for the list.',
  },
  {
    name: 'truncateText',
    type: 'boolean',
    default: 'false',
    description: 'Whether to truncate long text in items.',
  },
];

const keyboardShortcuts = [
  {
    keys: 'Tab',
    description: 'Navigate between list items'
  },
  {
    keys: 'Arrow Up',
    description: 'Move focused item up (when allowReorder is true)'
  },
  {
    keys: 'Arrow Down',
    description: 'Move focused item down (when allowReorder is true)'
  },
  {
    keys: 'Delete',
    description: 'Delete the focused item (when allowDelete is true)'
  },
  {
    keys: 'Backspace',
    description: 'Delete the focused item (when allowDelete is true)'
  },
  {
    keys: 'Enter',
    description: 'Add new item when typing in the input field'
  }
];

export function DynamicListPage() {
  return (
    <ComponentPage
      title='DynamicList'
      description='A dynamic list component that allows items to be added, deleted, and reordered through drag-and-drop or button controls. Perfect for managing collections of data.'
      tableOfContents={tableOfContents}
      usageInstructions='The DynamicList component provides an interactive way to manage lists of items. Users can add, remove, and reorder items using both mouse and keyboard interactions. Use it for todo lists, form builders, content management, or any scenario where users need to manipulate ordered collections of data.'
      importStatement="import { DynamicList } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={dynamicListProps}
      keyboardShortcuts={keyboardShortcuts}
      examples={dynamicListExamples}
    />
  );
}