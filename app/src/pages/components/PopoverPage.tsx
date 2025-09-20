import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const popoverProps = [
  {
    name: 'trigger',
    type: 'React.ReactNode',
    description: 'The element that triggers the popover.',
    required: true,
  },
  {
    name: 'content',
    type: 'React.ReactNode',
    description: 'The content to display in the popover.',
    required: true,
  },
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: 'The preferred side of the trigger to render against.',
  },
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: 'The preferred alignment against the trigger.',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Whether the popover is open (controlled).',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    description: 'Whether the popover is initially open (uncontrolled).',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback fired when the open state changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the popover content.',
  },
];

export function PopoverPage() {
  return (
    <ComponentPage
      title='Popover'
      description='Floating content container that appears relative to a trigger element for contextual information.'
      tableOfContents={tableOfContents}
      usageInstructions='The Popover component displays floating content relative to a trigger element. Use it for contextual information, forms, or any content that should appear on demand without navigating away from the current context.'
      importStatement="import { Popover } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={popoverProps}
    />
  );
}