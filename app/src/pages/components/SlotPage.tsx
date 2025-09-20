import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const slotProps = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the slot.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to render in the slot.',
    required: true,
  },
];

export function SlotPage() {
  return (
    <ComponentPage
      title='Slot'
      description='Utility component for creating flexible component compositions and layout patterns.'
      tableOfContents={tableOfContents}
      usageInstructions='The Slot component provides a way to create flexible component compositions. It serves as a utility for building reusable layout patterns and component systems where content needs to be inserted dynamically.'
      importStatement="import { Slot } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={slotProps}
    />
  );
}