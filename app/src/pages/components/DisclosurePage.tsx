import { Disclosure } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'styled-button', title: 'Styled Button', level: 2 },
  { id: 'disabled', title: 'Disabled State', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const disclosureExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple disclosure for toggling content visibility.',
    code: `<div className='space-y-4'>
  <Disclosure label='Default Disclosure'>
    <p>This content can be toggled on and off.</p>
  </Disclosure>
  
  <Disclosure label='FAQ Item' defaultOpen>
    <p>This disclosure is open by default. Click to collapse.</p>
  </Disclosure>
</div>`,
    children: (
      <div className='space-y-4'>
        <Disclosure label='Default Disclosure'>
          <p>This content can be toggled on and off.</p>
        </Disclosure>
        
        <Disclosure label='FAQ Item' defaultOpen>
          <p>This disclosure is open by default. Click to collapse.</p>
        </Disclosure>
      </div>
    ),
  },
  {
    id: 'disabled',
    title: 'Disabled State',
    description: 'Disclosure that cannot be interacted with.',
    code: `<Disclosure label='Disabled Disclosure' disabled>
  <p>This disclosure is disabled and cannot be opened.</p>
</Disclosure>`,
    children: (
      <Disclosure label='Disabled Disclosure' disabled>
        <p>This disclosure is disabled and cannot be opened.</p>
      </Disclosure>
    ),
  },
];

const disclosureProps = [
  {
    name: 'label',
    type: 'string | React.ReactNode',
    description: 'The label text or content for the disclosure button.',
    required: true,
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the disclosure is initially open.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the disclosure is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the disclosure.',
  },
  {
    name: 'buttonClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the disclosure button.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to show/hide.',
    required: true,
  },
];

export const DisclosurePage = () => {
  return (
    <ComponentPage
      title='Disclosure'
      description='A simple, accessible hide/show component for toggling content visibility.'
      tableOfContents={tableOfContents}
      usageInstructions='The Disclosure component provides an accessible way to show and hide content. Use it for FAQ sections, collapsible content areas, or any scenario where you need to toggle content visibility while maintaining good accessibility.'
      importStatement="import { Disclosure } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={disclosureProps}
      examples={disclosureExamples}
    />
  );
};
