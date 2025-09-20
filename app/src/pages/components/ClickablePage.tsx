import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const clickableProps = [
  {
    name: 'onClick',
    type: '(event: MouseEvent) => void',
    description: 'Callback fired when the element is clicked.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the clickable element is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the clickable element.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to make clickable.',
    required: true,
  },
];

export function ClickablePage() {
  return (
    <ComponentPage
      title='Clickable'
      description='Generic clickable wrapper component with hover and focus states for enhanced interactivity.'
      tableOfContents={tableOfContents}
      usageInstructions='The Clickable component provides a generic way to make any content interactive with proper hover, focus, and active states. Use it to create custom interactive elements that maintain accessibility and consistent styling.'
      importStatement="import { Clickable } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={clickableProps}
    />
  );
}