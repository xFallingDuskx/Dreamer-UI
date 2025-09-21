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
    <p className='mb-2'>Base: <Code variant='base' content='const value = 42;' /></p>
    <p className='mb-2'>Accent: <Code variant='accent' content='useState()' /></p>
    <p className='mb-2'>Modest: <Code variant='modest' content='string | number' /></p>
    <p className='mb-2'>Current: <Code variant='current' content='className' /></p>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div>
          <p className='mb-2'>Base: <Code variant='base' content='const value = 42;' /></p>
          <p className='mb-2'>Accent: <Code variant='accent' content='useState()' /></p>
          <p className='mb-2'>Modest: <Code variant='modest' content='string | number' /></p>
          <p className='mb-2'>Current: <Code variant='current' content='className' /></p>
        </div>
      </div>
    ),
  },
  {
    id: 'usage-examples',
    title: 'Usage Examples',
    description: 'Common use cases for inline code snippets.',
    code: `<div className='space-y-4'>
  <p>Install the package with <Code content='npm install package-name' /></p>
  <p>The <Code variant='accent' content='className' /> prop accepts any CSS classes.</p>
  <p>Return type: <Code variant='modest' content='Promise<string>' /></p>
  <p>Press <Code content='Ctrl + C' /> to copy the selection.</p>
</div>`,
    children: (
      <div className='space-y-4'>
        <p>Install the package with <Code content='npm install package-name' /></p>
        <p>The <Code variant='accent' content='className' /> prop accepts any CSS classes.</p>
        <p>Return type: <Code variant='modest' content='Promise<string>' /></p>
        <p>Press <Code content='Ctrl + C' /> to copy the selection.</p>
      </div>
    ),
  },
];

const codeProps = [
  {
    name: 'content',
    type: 'string',
    required: true,
    description: 'The code content to display.',
  },
  {
    name: 'variant',
    type: '"base" | "modest" | "accent" | "current"',
    default: '"accent"',
    description: 'The visual style variant of the code.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the code element.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the code element.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles to apply to the code element.',
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