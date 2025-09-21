import { Separator } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'orientations', title: 'Orientations', level: 2 },
  { id: 'thickness', title: 'Thickness Variants', level: 2 },
  { id: 'in-layouts', title: 'In Layouts', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const separatorExamples = [
  {
    id: 'orientations',
    title: 'Orientations',
    description: 'Horizontal and vertical separator orientations.',
    code: `<div className='space-y-8'>
  <div>
    <p className='mb-4'>Content above</p>
    <Separator />
    <p className='mt-4'>Content below</p>
  </div>
  <div className='flex h-20 items-center space-x-4'>
    <p>Left content</p>
    <Separator orientation='vertical' />
    <p>Right content</p>
  </div>
</div>`,
    children: (
      <div className='space-y-8'>
        <div>
          <p className='mb-4'>Content above</p>
          <Separator />
          <p className='mt-4'>Content below</p>
        </div>
        <div className='flex h-20 items-center space-x-4'>
          <p>Left content</p>
          <Separator orientation='vertical' />
          <p>Right content</p>
        </div>
      </div>
    ),
  },
  {
    id: 'thickness',
    title: 'Thickness Variants',
    description: 'Different thickness options for separators.',
    code: `<div className='space-y-6'>
  <div>
    <p className='mb-2 text-sm'>Thin (default)</p>
    <Separator thickness='thin' />
    <p className='mt-2 text-sm'>Content below</p>
  </div>
  <div>
    <p className='mb-2 text-sm'>Medium</p>
    <Separator thickness='medium' />
    <p className='mt-2 text-sm'>Content below</p>
  </div>
  <div>
    <p className='mb-2 text-sm'>Thick</p>
    <Separator thickness='thick' />
    <p className='mt-2 text-sm'>Content below</p>
  </div>
  <div>
    <p className='mb-2 text-sm'>Extra Thick</p>
    <Separator thickness='extra-thick' />
    <p className='mt-2 text-sm'>Content below</p>
  </div>
</div>`,
    children: (
      <div className='space-y-6'>
        <div>
          <p className='mb-2 text-sm'>Thin (default)</p>
          <Separator thickness='thin' />
          <p className='mt-2 text-sm'>Content below</p>
        </div>
        <div>
          <p className='mb-2 text-sm'>Medium</p>
          <Separator thickness='medium' />
          <p className='mt-2 text-sm'>Content below</p>
        </div>
        <div>
          <p className='mb-2 text-sm'>Thick</p>
          <Separator thickness='thick' />
          <p className='mt-2 text-sm'>Content below</p>
        </div>
        <div>
          <p className='mb-2 text-sm'>Extra Thick</p>
          <Separator thickness='extra-thick' />
          <p className='mt-2 text-sm'>Content below</p>
        </div>
      </div>
    ),
  },
  {
    id: 'in-layouts',
    title: 'In Layouts',
    description: 'Using separators in common layout patterns.',
    code: `<div className='max-w-md space-y-4'>
  <div className='p-4 border rounded-lg'>
    <h3 className='font-medium'>Navigation Menu</h3>
    <Separator className='my-2' />
    <ul className='space-y-2 text-sm'>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </div>
  <div className='flex items-center space-x-4 p-4 border rounded-lg'>
    <span>Item 1</span>
    <Separator orientation='vertical' className='h-8' />
    <span>Item 2</span>
    <Separator orientation='vertical' className='h-8' />
    <span>Item 3</span>
  </div>
</div>`,
    children: (
      <div className='max-w-md space-y-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-medium'>Navigation Menu</h3>
          <Separator className='my-2' />
          <ul className='space-y-2 text-sm'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='flex items-center space-x-4 p-4 border rounded-lg'>
          <span>Item 1</span>
          <Separator orientation='vertical' className='h-8' />
          <span>Item 2</span>
          <Separator orientation='vertical' className='h-8' />
          <span>Item 3</span>
        </div>
      </div>
    ),
  },
];

const separatorProps = [
  {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'The orientation of the separator.',
  },
  {
    name: 'thickness',
    type: '"thin" | "medium" | "thick" | "extra-thick"',
    default: '"thin"',
    description: 'The thickness variant of the separator.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: 'Whether the separator is decorative only. When true, it\'s hidden from screen readers.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the separator.',
  },
];

export function SeparatorPage() {
  return (
    <ComponentPage
      title='Separator'
      description='Visual divider component for separating content sections.'
      tableOfContents={tableOfContents}
      usageInstructions='The Separator component provides a visual way to divide content. Use horizontal separators to separate sections vertically, and vertical separators to divide content horizontally. The component is semantic and accessible.'
      importStatement="import { Separator } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={separatorProps}
      examples={separatorExamples}
    />
  );
}