import { Tabs } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'vertical-tabs', title: 'Vertical Tabs', level: 2 },
  { id: 'with-icons', title: 'With Icons', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const tabsExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple tabbed interface for organizing content.',
    code: `<Tabs defaultValue='account' className='w-full max-w-md'>
  <Tabs.List className='grid w-full grid-cols-2'>
    <Tabs.Trigger value='account'>Account</Tabs.Trigger>
    <Tabs.Trigger value='password'>Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value='account' className='space-y-4'>
    <div className='space-y-2'>
      <label htmlFor='name'>Name</label>
      <input id='name' className='w-full px-3 py-2 border rounded-md' defaultValue='Pedro Duarte' />
    </div>
    <div className='space-y-2'>
      <label htmlFor='username'>Username</label>
      <input id='username' className='w-full px-3 py-2 border rounded-md' defaultValue='@peduarte' />
    </div>
  </Tabs.Content>
  <Tabs.Content value='password' className='space-y-4'>
    <div className='space-y-2'>
      <label htmlFor='current'>Current password</label>
      <input id='current' type='password' className='w-full px-3 py-2 border rounded-md' />
    </div>
    <div className='space-y-2'>
      <label htmlFor='new'>New password</label>
      <input id='new' type='password' className='w-full px-3 py-2 border rounded-md' />
    </div>
  </Tabs.Content>
</Tabs>`,
    children: (
      <Tabs defaultValue='account' className='w-full max-w-md'>
        <Tabs.List className='grid w-full grid-cols-2'>
          <Tabs.Trigger value='account'>Account</Tabs.Trigger>
          <Tabs.Trigger value='password'>Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='account' className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='name'>Name</label>
            <input id='name' className='w-full px-3 py-2 border rounded-md' defaultValue='Pedro Duarte' />
          </div>
          <div className='space-y-2'>
            <label htmlFor='username'>Username</label>
            <input id='username' className='w-full px-3 py-2 border rounded-md' defaultValue='@peduarte' />
          </div>
        </Tabs.Content>
        <Tabs.Content value='password' className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='current'>Current password</label>
            <input id='current' type='password' className='w-full px-3 py-2 border rounded-md' />
          </div>
          <div className='space-y-2'>
            <label htmlFor='new'>New password</label>
            <input id='new' type='password' className='w-full px-3 py-2 border rounded-md' />
          </div>
        </Tabs.Content>
      </Tabs>
    ),
  },
  {
    id: 'with-icons',
    title: 'With Icons',
    description: 'Tabs with icons for better visual hierarchy.',
    code: `<Tabs defaultValue='overview' className='w-full max-w-lg'>
  <Tabs.List className='grid w-full grid-cols-3'>
    <Tabs.Trigger value='overview'>
      <div className='flex items-center gap-2'>
        <span>📊</span>
        Overview
      </div>
    </Tabs.Trigger>
    <Tabs.Trigger value='analytics'>
      <div className='flex items-center gap-2'>
        <span>📈</span>
        Analytics
      </div>
    </Tabs.Trigger>
    <Tabs.Trigger value='reports'>
      <div className='flex items-center gap-2'>
        <span>📋</span>
        Reports
      </div>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value='overview'>
    <div className='p-4 bg-gray-50 rounded-md'>
      <h3 className='font-medium mb-2'>Overview</h3>
      <p className='text-sm text-gray-600'>View your dashboard overview and key metrics.</p>
    </div>
  </Tabs.Content>
  <Tabs.Content value='analytics'>
    <div className='p-4 bg-gray-50 rounded-md'>
      <h3 className='font-medium mb-2'>Analytics</h3>
      <p className='text-sm text-gray-600'>Deep dive into your analytics and performance data.</p>
    </div>
  </Tabs.Content>
  <Tabs.Content value='reports'>
    <div className='p-4 bg-gray-50 rounded-md'>
      <h3 className='font-medium mb-2'>Reports</h3>
      <p className='text-sm text-gray-600'>Generate and download detailed reports.</p>
    </div>
  </Tabs.Content>
</Tabs>`,
    children: (
      <Tabs defaultValue='overview' className='w-full max-w-lg'>
        <Tabs.List className='grid w-full grid-cols-3'>
          <Tabs.Trigger value='overview'>
            <div className='flex items-center gap-2'>
              <span>📊</span>
              Overview
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger value='analytics'>
            <div className='flex items-center gap-2'>
              <span>📈</span>
              Analytics
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger value='reports'>
            <div className='flex items-center gap-2'>
              <span>📋</span>
              Reports
            </div>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='overview'>
          <div className='p-4 bg-gray-50 rounded-md'>
            <h3 className='font-medium mb-2'>Overview</h3>
            <p className='text-sm text-gray-600'>View your dashboard overview and key metrics.</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value='analytics'>
          <div className='p-4 bg-gray-50 rounded-md'>
            <h3 className='font-medium mb-2'>Analytics</h3>
            <p className='text-sm text-gray-600'>Deep dive into your analytics and performance data.</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value='reports'>
          <div className='p-4 bg-gray-50 rounded-md'>
            <h3 className='font-medium mb-2'>Reports</h3>
            <p className='text-sm text-gray-600'>Generate and download detailed reports.</p>
          </div>
        </Tabs.Content>
      </Tabs>
    ),
  },
];

const tabsProps = [
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The value of the tab that should be active when initially rendered.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The controlled value of the tab to activate.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Event handler called when the value changes.',
  },
  {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'The orientation of the tabs.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the tabs container.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The tab list and content elements.',
    required: true,
  },
];

export function TabsPage() {
  return (
    <ComponentPage
      title='Tabs'
      description='Tabbed interface component for organizing content into sections with keyboard navigation.'
      tableOfContents={tableOfContents}
      usageInstructions='The Tabs component allows you to organize content into separate sections that users can navigate between. Use tabs to group related information and reduce cognitive load. Each tab should have a clear, descriptive label that indicates the content within.'
      importStatement="import { Tabs } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={tabsProps}
      examples={tabsExamples}
    />
  );
}