import { Textarea } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-placeholder', title: 'With Placeholder', level: 2 },
  { id: 'auto-resize', title: 'Auto Resize', level: 2 },
  { id: 'character-limit', title: 'Character Limit', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const textareaExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple textarea with default styling.',
    code: `<div className='max-w-md'>
  <Textarea defaultValue='This is a basic textarea with some initial content.' />
</div>`,
    children: (
      <div className='max-w-md'>
        <Textarea defaultValue='This is a basic textarea with some initial content.' />
      </div>
    ),
  },
  {
    id: 'with-placeholder',
    title: 'With Placeholder',
    description: 'Textarea with placeholder text.',
    code: `<div className='max-w-md'>
  <Textarea placeholder='Enter your message here...' />
</div>`,
    children: (
      <div className='max-w-md'>
        <Textarea placeholder='Enter your message here...' />
      </div>
    ),
  },
  {
    id: 'auto-resize',
    title: 'Auto Resize',
    description: 'Textarea that automatically expands with content.',
    code: `<div className='max-w-md'>
  <Textarea 
    autoResize 
    placeholder='This textarea will grow as you type...' 
    minRows={3}
  />
</div>`,
    children: (
      <div className='max-w-md'>
        <Textarea 
          autoResize 
          placeholder='This textarea will grow as you type...' 
          minRows={3}
        />
      </div>
    ),
  },
  {
    id: 'character-limit',
    title: 'Character Limit',
    description: 'Textarea with character count and limit.',
    code: `<div className='max-w-md'>
  <Textarea 
    placeholder='Max 150 characters...'
    maxLength={150}
    showCount
  />
</div>`,
    children: (
      <div className='max-w-md'>
        <Textarea 
          placeholder='Max 150 characters...'
          maxLength={150}
          showCount
        />
      </div>
    ),
  },
];

const textareaProps = [
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text to display when the textarea is empty.',
  },
  {
    name: 'autoResize',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea should automatically resize based on content.',
  },
  {
    name: 'minRows',
    type: 'number',
    default: '2',
    description: 'Minimum number of rows (when autoResize is true).',
  },
  {
    name: 'maxRows',
    type: 'number',
    description: 'Maximum number of rows (when autoResize is true).',
  },
  {
    name: 'maxLength',
    type: 'number',
    description: 'Maximum number of characters allowed.',
  },
  {
    name: 'showCount',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show character count.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea is disabled.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current value of the textarea (controlled).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The initial value of the textarea (uncontrolled).',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when the textarea value changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the textarea.',
  },
];

export function TextareaPage() {
  return (
    <ComponentPage
      title='Textarea'
      description='Multi-line text input with auto-expand and character limit features.'
      tableOfContents={tableOfContents}
      usageInstructions='The Textarea component is perfect for collecting longer text input from users. It supports auto-resize functionality, character limits with counters, and all standard textarea features. Use it for comments, descriptions, messages, and other multi-line text input.'
      importStatement="import { Textarea } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={textareaProps}
      examples={textareaExamples}
    />
  );
}