import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const drawerProps = [
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the drawer is open.',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback fired when the drawer should close.',
    required: true,
  },
  {
    name: 'side',
    type: '"left" | "right" | "top" | "bottom"',
    default: '"right"',
    description: 'Which side of the screen the drawer slides from.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'The size of the drawer.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional title for the drawer header.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the drawer.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the drawer.',
  },
];

export function DrawerPage() {
  return (
    <ComponentPage
      title='Drawer'
      description='Sliding panel component that appears from the side of the screen for navigation or content.'
      tableOfContents={tableOfContents}
      usageInstructions='The Drawer component provides a sliding panel that can appear from any side of the screen. Use it for navigation menus, settings panels, or any content that should be accessible but not always visible. It includes backdrop handling and focus management.'
      importStatement="import { Drawer } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={drawerProps}
    />
  );
}