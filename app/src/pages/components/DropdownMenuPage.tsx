import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const dropdownMenuProps = [
  {
    name: 'trigger',
    type: 'React.ReactNode',
    description: 'The element that triggers the dropdown menu.',
    required: true,
  },
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: 'The alignment of the menu relative to the trigger.',
  },
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: 'The preferred side of the trigger to render against.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the dropdown menu.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The menu items to display.',
    required: true,
  },
];

export function DropdownMenuPage() {
  return (
    <ComponentPage
      title='Dropdown Menu'
      description='Contextual menu component with keyboard navigation and accessibility support.'
      tableOfContents={tableOfContents}
      usageInstructions='The DropdownMenu component provides a contextual menu that appears when triggered. Use it for actions, navigation, or options related to a specific element. It supports keyboard navigation and proper focus management.'
      importStatement="import { DropdownMenu } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={dropdownMenuProps}
    />
  );
}