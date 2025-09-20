import { Code } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'usage-examples', title: 'Usage Examples', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const codeExamples = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different code styles for various contexts.',
    code: `<div className='space-y-4'>
  <div>
    <p className='mb-2'>Default: <Code>const value = 42;</Code></p>
    <p className='mb-2'>Accent: <Code variant='accent'>useState()</Code></p>
    <p className='mb-2'>Modest: <Code variant='modest'>string | number</Code></p>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div>
          <p className='mb-2'>Default: <Code>const value = 42;</Code></p>
          <p className='mb-2'>Accent: <Code variant='accent'>useState()</Code></p>
          <p className='mb-2'>Modest: <Code variant='modest'>string | number</Code></p>
        </div>
      </div>
    ),
  },
  {
    id: 'usage-examples',
    title: 'Usage Examples',
    description: 'Common use cases for inline code snippets.',
    code: `<div className='space-y-4'>
  <p>Install the package with <Code>npm install package-name</Code></p>
  <p>The <Code variant='accent'>className</Code> prop accepts any CSS classes.</p>
  <p>Return type: <Code variant='modest'>Promise&lt;string&gt;</Code></p>
  <p>Press <Code>Ctrl + C</Code> to copy the selection.</p>
</div>`,
    children: (
      <div className='space-y-4'>
        <p>Install the package with <Code>npm install package-name</Code></p>
        <p>The <Code variant='accent'>className</Code> prop accepts any CSS classes.</p>
        <p>Return type: <Code variant='modest'>Promise&lt;string&gt;</Code></p>
        <p>Press <Code>Ctrl + C</Code> to copy the selection.</p>
      </div>
    ),
  },
];

const codeProps = [
  {
    name: 'variant',
    type: '"default" | "accent" | "modest"',
    default: '"default"',
    description: 'The visual style variant of the code.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the code element.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The code content to display.',
    required: true,
  },
];

export function CodePage() {
  return (
    <ComponentPage
      title='Code'
      description='Inline code snippets with syntax highlighting for technical documentation.'
      tableOfContents={tableOfContents}
      usageInstructions='The Code component is perfect for highlighting code snippets, technical terms, keyboard shortcuts, or any text that represents code within your content. Use different variants to indicate different types of code or technical information.'
      importStatement="import { Code } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={codeProps}
      examples={codeExamples}
    />
  );
}