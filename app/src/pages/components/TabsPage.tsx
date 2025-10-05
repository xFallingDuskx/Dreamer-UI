import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'tabs-list-prop', title: 'Using tabsList Prop', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'tab-widths', title: 'Tab Widths', level: 2 },
  { id: 'controlled-tabs', title: 'Controlled Tabs', level: 2 },
  { id: 'with-icons', title: 'With Icons', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

// Example components
function BasicTabs() {
  return (
    <Tabs defaultValue='account' className='w-full max-w-md'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account' className='space-y-4 mt-4'>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>Name</label>
          <input id='name' className='w-full px-3 py-2 border border-border rounded-md bg-background' defaultValue='Pedro Duarte' />
        </div>
        <div className='space-y-2'>
          <label htmlFor='username' className='text-sm font-medium'>Username</label>
          <input id='username' className='w-full px-3 py-2 border border-border rounded-md bg-background' defaultValue='@peduarte' />
        </div>
      </TabsContent>
      <TabsContent value='password' className='space-y-4 mt-4'>
        <div className='space-y-2'>
          <label htmlFor='current' className='text-sm font-medium'>Current password</label>
          <input id='current' type='password' className='w-full px-3 py-2 border border-border rounded-md bg-background' />
        </div>
        <div className='space-y-2'>
          <label htmlFor='new' className='text-sm font-medium'>New password</label>
          <input id='new' type='password' className='w-full px-3 py-2 border border-border rounded-md bg-background' />
        </div>
      </TabsContent>
    </Tabs>
  );
}

function VariantTabs() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-sm font-medium mb-2'>Underline (default)</h4>
        <Tabs defaultValue='tab1' variant='underline' className='w-full max-w-lg'>
          <TabsList>
            <TabsTrigger value='tab1'>Overview</TabsTrigger>
            <TabsTrigger value='tab2'>Analytics</TabsTrigger>
            <TabsTrigger value='tab3'>Reports</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Underline variant shows an active indicator below the tab.</p>
          </TabsContent>
          <TabsContent value='tab2' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Analytics content goes here.</p>
          </TabsContent>
          <TabsContent value='tab3' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Reports content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className='text-sm font-medium mb-2'>Pills</h4>
        <Tabs defaultValue='pill1' variant='pills' className='w-full max-w-lg'>
          <TabsList>
            <TabsTrigger value='pill1'>Overview</TabsTrigger>
            <TabsTrigger value='pill2'>Analytics</TabsTrigger>
            <TabsTrigger value='pill3'>Reports</TabsTrigger>
          </TabsList>
          <TabsContent value='pill1' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Pills variant uses rounded background for active tabs.</p>
          </TabsContent>
          <TabsContent value='pill2' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Analytics content goes here.</p>
          </TabsContent>
          <TabsContent value='pill3' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Reports content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className='text-sm font-medium mb-2'>Bordered</h4>
        <Tabs defaultValue='border1' variant='bordered' className='w-full max-w-lg'>
          <TabsList>
            <TabsTrigger value='border1'>Overview</TabsTrigger>
            <TabsTrigger value='border2'>Analytics</TabsTrigger>
            <TabsTrigger value='border3'>Reports</TabsTrigger>
          </TabsList>
          <TabsContent value='border1' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Bordered variant wraps the tab list in a border.</p>
          </TabsContent>
          <TabsContent value='border2' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Analytics content goes here.</p>
          </TabsContent>
          <TabsContent value='border3' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Reports content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TabWidths() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-sm font-medium mb-2'>Fit Width (default)</h4>
        <Tabs defaultValue='fit1' tabsWidth='fit' variant='pills' className='w-full max-w-lg'>
          <TabsList>
            <TabsTrigger value='fit1'>Short</TabsTrigger>
            <TabsTrigger value='fit2'>Medium Length</TabsTrigger>
            <TabsTrigger value='fit3'>Very Long Tab Name</TabsTrigger>
          </TabsList>
          <TabsContent value='fit1' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Fit width tabs size to their content.</p>
          </TabsContent>
          <TabsContent value='fit2' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Each tab can have different widths.</p>
          </TabsContent>
          <TabsContent value='fit3' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Perfect for varying content lengths.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className='text-sm font-medium mb-2'>Full Width</h4>
        <Tabs defaultValue='full1' tabsWidth='full' variant='bordered' className='w-full max-w-lg'>
          <TabsList>
            <TabsTrigger value='full1'>Tab 1</TabsTrigger>
            <TabsTrigger value='full2'>Tab 2</TabsTrigger>
            <TabsTrigger value='full3'>Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value='full1' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Full width tabs have equal width distribution.</p>
          </TabsContent>
          <TabsContent value='full2' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>All tabs take equal space.</p>
          </TabsContent>
          <TabsContent value='full3' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Great for consistent layouts.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='w-full max-w-lg space-y-4'>
      <div className='flex gap-2'>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90'
        >
          Go to Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className='px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80'
        >
          Go to Settings
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        Current tab: <span className='font-mono'>{activeTab}</span>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} variant='pills'>
        <TabsList>
          <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value='dashboard' className='mt-4 p-4 bg-muted rounded-md'>
          <h4 className='font-semibold mb-2'>Dashboard</h4>
          <p className='text-sm'>This is a controlled tabs component. The active tab can be changed externally.</p>
        </TabsContent>
        <TabsContent value='analytics' className='mt-4 p-4 bg-muted rounded-md'>
          <h4 className='font-semibold mb-2'>Analytics</h4>
          <p className='text-sm'>View your analytics and performance metrics.</p>
        </TabsContent>
        <TabsContent value='settings' className='mt-4 p-4 bg-muted rounded-md'>
          <h4 className='font-semibold mb-2'>Settings</h4>
          <p className='text-sm'>Configure your application settings.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IconTabs() {
  return (
    <Tabs defaultValue='overview' className='w-full max-w-lg'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='overview'>
          <div className='flex items-center gap-2'>
            <span>📊</span>
            Overview
          </div>
        </TabsTrigger>
        <TabsTrigger value='analytics'>
          <div className='flex items-center gap-2'>
            <span>📈</span>
            Analytics
          </div>
        </TabsTrigger>
        <TabsTrigger value='reports'>
          <div className='flex items-center gap-2'>
            <span>📋</span>
            Reports
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='overview' className='mt-4 p-4 bg-muted rounded-md'>
        <h3 className='font-medium mb-2'>📊 Overview</h3>
        <p className='text-sm text-muted-foreground'>View your dashboard overview and key metrics.</p>
      </TabsContent>
      <TabsContent value='analytics' className='mt-4 p-4 bg-muted rounded-md'>
        <h3 className='font-medium mb-2'>📈 Analytics</h3>
        <p className='text-sm text-muted-foreground'>Deep dive into your analytics and performance data.</p>
      </TabsContent>
      <TabsContent value='reports' className='mt-4 p-4 bg-muted rounded-md'>
        <h3 className='font-medium mb-2'>📋 Reports</h3>
        <p className='text-sm text-muted-foreground'>Generate and download detailed reports.</p>
      </TabsContent>
    </Tabs>
  );
}

function TabsListProp() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-sm font-medium mb-2'>Simple tabsList</h4>
        <Tabs 
          defaultValue='details' 
          variant='underline' 
          className='w-full max-w-lg'
          tabsList={[
            { value: 'details', label: 'Details' },
            { value: 'questions', label: 'Questions' },
            { value: 'notes', label: 'Notes' },
            { value: 'followups', label: 'Follow-ups' },
          ]}
        >
          <TabsContent value='details' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Details content rendered automatically with tabsList prop.</p>
          </TabsContent>
          <TabsContent value='questions' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Questions content goes here.</p>
          </TabsContent>
          <TabsContent value='notes' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Notes content goes here.</p>
          </TabsContent>
          <TabsContent value='followups' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Follow-ups content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className='text-sm font-medium mb-2'>tabsList with React Elements</h4>
        <Tabs 
          defaultValue='overview' 
          variant='pills' 
          className='w-full max-w-lg'
          tabsList={[
            { 
              value: 'overview', 
              label: (
                <div className='flex items-center gap-2'>
                  <span>📊</span>
                  Overview
                </div>
              )
            },
            { 
              value: 'analytics', 
              label: (
                <div className='flex items-center gap-2'>
                  <span>📈</span>
                  Analytics
                </div>
              )
            },
            { 
              value: 'settings', 
              label: (
                <div className='flex items-center gap-2'>
                  <span>⚙️</span>
                  Settings
                </div>
              )
            },
          ]}
        >
          <TabsContent value='overview' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Overview with icon label rendered via tabsList prop.</p>
          </TabsContent>
          <TabsContent value='analytics' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Analytics content goes here.</p>
          </TabsContent>
          <TabsContent value='settings' className='mt-4 p-4 bg-muted rounded-md'>
            <p className='text-sm'>Settings content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const tabsExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple tabbed interface for organizing content.',
    code: `<Tabs defaultValue='account' className='w-full max-w-md'>
  <TabsList className='grid w-full grid-cols-2'>
    <TabsTrigger value='account'>Account</TabsTrigger>
    <TabsTrigger value='password'>Password</TabsTrigger>
  </TabsList>
  <TabsContent value='account' className='space-y-4 mt-4'>
    <div className='space-y-2'>
      <label htmlFor='name'>Name</label>
      <input id='name' className='w-full px-3 py-2 border rounded-md' defaultValue='Pedro Duarte' />
    </div>
    <div className='space-y-2'>
      <label htmlFor='username'>Username</label>
      <input id='username' className='w-full px-3 py-2 border rounded-md' defaultValue='@peduarte' />
    </div>
  </TabsContent>
  <TabsContent value='password' className='space-y-4 mt-4'>
    <div className='space-y-2'>
      <label htmlFor='current'>Current password</label>
      <input id='current' type='password' className='w-full px-3 py-2 border rounded-md' />
    </div>
    <div className='space-y-2'>
      <label htmlFor='new'>New password</label>
      <input id='new' type='password' className='w-full px-3 py-2 border rounded-md' />
    </div>
  </TabsContent>
</Tabs>`,
    children: (
      <BasicTabs />
    ),
  },
  {
    id: 'tabs-list-prop',
    title: 'Using tabsList Prop',
    description: 'Automatically render tabs using the tabsList prop for cleaner code.',
    code: `// Simple string labels
<Tabs 
  defaultValue='details' 
  variant='underline'
  tabsList={[
    { value: 'details', label: 'Details' },
    { value: 'questions', label: 'Questions' },
    { value: 'notes', label: 'Notes' },
    { value: 'followups', label: 'Follow-ups' },
  ]}
>
  <TabsContent value='details'>
    Details content rendered automatically
  </TabsContent>
  <TabsContent value='questions'>
    Questions content goes here
  </TabsContent>
  {/* ... more TabsContent components */}
</Tabs>

// React elements as labels
<Tabs 
  defaultValue='overview' 
  variant='pills'
  tabsList={[
    { 
      value: 'overview', 
      label: (
        <div className='flex items-center gap-2'>
          <span>📊</span>
          Overview
        </div>
      )
    },
    { 
      value: 'analytics', 
      label: (
        <div className='flex items-center gap-2'>
          <span>📈</span>
          Analytics
        </div>
      )
    },
  ]}
>
  <TabsContent value='overview'>Overview content</TabsContent>
  <TabsContent value='analytics'>Analytics content</TabsContent>
</Tabs>`,
    children: (
      <TabsListProp />
    ),
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different visual styles for tabs: underline, pills, and bordered.',
    code: `// Underline variant (default)
<Tabs defaultValue='tab1' variant='underline'>
  <TabsList>
    <TabsTrigger value='tab1'>Overview</TabsTrigger>
    <TabsTrigger value='tab2'>Analytics</TabsTrigger>
    <TabsTrigger value='tab3'>Reports</TabsTrigger>
  </TabsList>
  <TabsContent value='tab1'>Underline variant content</TabsContent>
</Tabs>

// Pills variant
<Tabs defaultValue='pill1' variant='pills'>
  <TabsList>
    <TabsTrigger value='pill1'>Overview</TabsTrigger>
    <TabsTrigger value='pill2'>Analytics</TabsTrigger>
    <TabsTrigger value='pill3'>Reports</TabsTrigger>
  </TabsList>
  <TabsContent value='pill1'>Pills variant content</TabsContent>
</Tabs>

// Bordered variant
<Tabs defaultValue='border1' variant='bordered'>
  <TabsList>
    <TabsTrigger value='border1'>Overview</TabsTrigger>
    <TabsTrigger value='border2'>Analytics</TabsTrigger>
    <TabsTrigger value='border3'>Reports</TabsTrigger>
  </TabsList>
  <TabsContent value='border1'>Bordered variant content</TabsContent>
</Tabs>`,
    children: (
      <VariantTabs />
    ),
  },
  {
    id: 'tab-widths',
    title: 'Tab Widths',
    description: 'Control how tabs are sized: fit to content or equal width distribution.',
    code: `// Fit width (default) - tabs size to their content
<Tabs defaultValue='fit1' tabsWidth='fit' variant='pills'>
  <TabsList>
    <TabsTrigger value='fit1'>Short</TabsTrigger>
    <TabsTrigger value='fit2'>Medium Length</TabsTrigger>
    <TabsTrigger value='fit3'>Very Long Tab Name</TabsTrigger>
  </TabsList>
  <TabsContent value='fit1'>Fit width content</TabsContent>
</Tabs>

// Full width - all tabs have equal width
<Tabs defaultValue='full1' tabsWidth='full' variant='bordered'>
  <TabsList>
    <TabsTrigger value='full1'>Tab 1</TabsTrigger>
    <TabsTrigger value='full2'>Tab 2</TabsTrigger>
    <TabsTrigger value='full3'>Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value='full1'>Full width content</TabsContent>
</Tabs>`,
    children: (
      <TabWidths />
    ),
  },
  {
    id: 'controlled-tabs',
    title: 'Controlled Tabs',
    description: 'Controlled tabs with external state management.',
    code: `function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <button onClick={() => setActiveTab('dashboard')}>
          Go to Dashboard
        </button>
        <button onClick={() => setActiveTab('settings')}>
          Go to Settings
        </button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} variant='pills'>
        <TabsList>
          <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value='dashboard'>
          Dashboard content - controlled externally
        </TabsContent>
        <TabsContent value='analytics'>
          Analytics content
        </TabsContent>
        <TabsContent value='settings'>
          Settings content
        </TabsContent>
      </Tabs>
    </div>
  );
}`,
    children: (
      <ControlledTabs />
    ),
  },
  {
    id: 'with-icons',
    title: 'With Icons',
    description: 'Tabs with icons for better visual hierarchy and user experience.',
    code: `<Tabs defaultValue='overview' className='w-full max-w-lg'>
  <TabsList className='grid w-full grid-cols-3'>
    <TabsTrigger value='overview'>
      <div className='flex items-center gap-2'>
        <span>📊</span>
        Overview
      </div>
    </TabsTrigger>
    <TabsTrigger value='analytics'>
      <div className='flex items-center gap-2'>
        <span>📈</span>
        Analytics
      </div>
    </TabsTrigger>
    <TabsTrigger value='reports'>
      <div className='flex items-center gap-2'>
        <span>📋</span>
        Reports
      </div>
    </TabsTrigger>
  </TabsList>
  <TabsContent value='overview'>
    📊 Overview content with dashboard metrics
  </TabsContent>
  <TabsContent value='analytics'>
    📈 Analytics data and performance insights
  </TabsContent>
  <TabsContent value='reports'>
    📋 Generate and download reports
  </TabsContent>
</Tabs>`,
    children: (
      <IconTabs />
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
    name: 'tabsList',
    type: 'TabItem[]',
    description: 'Array of tab items to render automatically. Each item has a value and label (string or React element). When provided, renders TabsList with TabsTrigger components.',
  },
  {
    name: 'tabsWidth',
    type: '"fit" | "full"',
    default: '"fit"',
    description: 'How the tabs should be sized. "fit" sizes tabs to content, "full" makes them equal width.',
  },
  {
    name: 'variant',
    type: '"underline" | "pills" | "bordered"',
    default: '"underline"',
    description: 'The visual style variant of the tabs.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the tabs container.',
  },
  {
    name: 'triggersClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the tab triggers.',
  },
  {
    name: 'contentClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the tab content.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The tab list and content elements.',
    required: true,
  },
];

const keyboardShortcuts = [
  {
    keys: 'Tab',
    description: 'Move focus to the next tab trigger',
  },
  {
    keys: 'Shift + Tab',
    description: 'Move focus to the previous tab trigger',
  },
  {
    keys: 'Arrow Left/Right',
    description: 'Navigate between tab triggers',
  },
  {
    keys: 'Space, Enter',
    description: 'Activate the focused tab',
  },
  {
    keys: 'Home',
    description: 'Move focus to the first tab',
  },
  {
    keys: 'End',
    description: 'Move focus to the last tab',
  },
];

export function TabsPage() {
  return (
    <ComponentPage
      title='Tabs'
      description='Tabbed interface component for organizing content into sections with keyboard navigation and accessibility support.'
      tableOfContents={tableOfContents}
      usageInstructions='The Tabs component allows you to organize content into separate sections that users can navigate between. Use tabs to group related information and reduce cognitive load. Each tab should have a clear, descriptive label that indicates the content within. The component supports keyboard navigation and follows accessibility best practices.'
      importStatement="import { Tabs, TabsList, TabsTrigger, TabsContent } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={tabsProps}
      keyboardShortcuts={keyboardShortcuts}
      examples={tabsExamples}
    />
  );
}