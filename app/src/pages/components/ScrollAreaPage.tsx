import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const scrollAreaProps = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the scroll area.',
  },
  {
    name: 'type',
    type: '"auto" | "always" | "scroll" | "hover"',
    default: '"hover"',
    description: 'When to show the scrollbar.',
  },
  {
    name: 'scrollHideDelay',
    type: 'number',
    default: '600',
    description: 'Time in milliseconds before hiding the scrollbar when not hovering.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to make scrollable.',
    required: true,
  },
];

export function ScrollAreaPage() {
  return (
    <ComponentPage
      title='Scroll Area'
      description='Custom scrollable area with styled scrollbars and smooth scrolling behavior.'
      tableOfContents={tableOfContents}
      usageInstructions='The ScrollArea component provides a custom scrollable container with styled scrollbars. Use it to create scrollable regions that match your design system while maintaining smooth scrolling performance.'
      importStatement="import { ScrollArea } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={scrollAreaProps}
    />
  );
}