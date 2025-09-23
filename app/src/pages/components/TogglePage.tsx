import { useState } from 'react';
import { Toggle } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'states', title: 'States', level: 2 },
  { id: 'interactive', title: 'Interactive Example', level: 2 },
  { id: 'custom-colors', title: 'Custom Colors', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const toggleExamples = [
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different toggle sizes for various contexts.',
    code: `import { Toggle } from '@moondreamsdev/dreamer-ui/components';

<div className='flex items-center gap-6'>
  <div className='flex items-center gap-2'>
    <Toggle size='sm' />
    <span>Small</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle size='md' />
    <span>Medium (default)</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle size='lg' />
    <span>Large</span>
  </div>
</div>`,
    children: (
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Toggle size='sm' />
          <span>Small</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle size='md' />
          <span>Medium (default)</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle size='lg' />
          <span>Large</span>
        </div>
      </div>
    ),
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different color variants for various use cases.',
    code: `<div className='flex items-center gap-6'>
  <div className='flex items-center gap-2'>
    <Toggle variant='default' checked />
    <span>Default</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle variant='success' checked />
    <span>Success</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle variant='destructive' checked />
    <span>Destructive</span>
  </div>
</div>`,
    children: (
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Toggle variant='default' checked />
          <span>Default</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle variant='success' checked />
          <span>Success</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle variant='destructive' checked />
          <span>Destructive</span>
        </div>
      </div>
    ),
  },
  {
    id: 'states',
    title: 'States',
    description: 'Different toggle states including disabled options.',
    code: `<div className='flex items-center gap-6'>
  <div className='flex items-center gap-2'>
    <Toggle checked={false} />
    <span>Unchecked</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle checked />
    <span>Checked</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle disabled />
    <span>Disabled Unchecked</span>
  </div>
  <div className='flex items-center gap-2'>
    <Toggle disabled checked />
    <span>Disabled Checked</span>
  </div>
</div>`,
    children: (
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Toggle checked={false} />
          <span>Unchecked</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle checked />
          <span>Checked</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle disabled />
          <span>Disabled Unchecked</span>
        </div>
        <div className='flex items-center gap-2'>
          <Toggle disabled checked />
          <span>Disabled Checked</span>
        </div>
      </div>
    ),
  },
  {
    id: 'interactive',
    title: 'Interactive Example',
    description: 'Interactive toggle with state management and event handling.',
    code: `function InteractiveToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <div className='flex items-center gap-2'>
      <Toggle 
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
      />
      <span>
        Notifications are {isEnabled ? 'enabled' : 'disabled'}
      </span>
    </div>
  );
}`,
    children: <InteractiveToggleExample />,
  },
  {
    id: 'custom-colors',
    title: 'Custom Colors',
    description: 'Customizing toggle colors with CSS classes.',
    code: `<div className='flex items-center gap-2'>
  <Toggle
    thumbClassName='!bg-red-500'
    backgroundClassNames={{ 
      checked: 'bg-red-200 focus:!ring-red-500' 
    }}
  />
  <span>Custom red toggle</span>
</div>`,
    children: (
      <div className='flex items-center gap-2'>
        <Toggle
          thumbClassName='!bg-red-500'
          backgroundClassNames={{ 
            checked: 'bg-red-200 focus:!ring-red-500' 
          }}
        />
        <span>Custom red toggle</span>
      </div>
    ),
  },
];

function InteractiveToggleExample() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <div className='flex items-center gap-2'>
      <Toggle 
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
      />
      <span>
        Notifications are {isEnabled ? 'enabled' : 'disabled'}
      </span>
    </div>
  );
}

const toggleProps = [
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size of the toggle switch.',
  },
  {
    name: 'variant',
    type: '"default" | "success" | "destructive"',
    default: '"default"',
    description: 'The color variant of the toggle switch.',
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Whether the toggle is checked. If not provided, the toggle will be uncontrolled.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the toggle is disabled.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when the toggle state changes.',
  },
  {
    name: 'thumbClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the toggle thumb.',
  },
  {
    name: 'backgroundClassNames',
    type: '{ checked?: string; unchecked?: string; }',
    description: 'CSS classes for background in different states.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the toggle.',
  },
];

export function TogglePage() {
  return (
    <ComponentPage
      title='Toggle'
      description='Switch component for boolean states and settings with smooth animations.'
      tableOfContents={tableOfContents}
      usageInstructions='The Toggle component provides an intuitive way for users to switch between two states (on/off, enabled/disabled, etc.). Use it for settings, preferences, or any binary choice. Always provide clear labels to indicate what the toggle controls.'
      importStatement="import { Toggle } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={toggleProps}
      examples={toggleExamples}
    />
  );
}