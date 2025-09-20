import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const panelProps = [
  {
    name: 'variant',
    type: '"default" | "bordered" | "elevated"',
    default: '"default"',
    description: 'The visual style variant of the panel.',
  },
  {
    name: 'padding',
    type: '"none" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'The amount of padding inside the panel.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the panel.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the panel.',
    required: true,
  },
];

export function PanelPage() {
  return (
    <ComponentPage
      title='Panel'
      description='Flexible container component for grouping related content with various styling options.'
      tableOfContents={tableOfContents}
      usageInstructions='The Panel component provides a flexible container for grouping related content. Use different variants to create visual hierarchy and organize information effectively in your layouts.'
      importStatement="import { Panel } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={panelProps}
    />
  );
}