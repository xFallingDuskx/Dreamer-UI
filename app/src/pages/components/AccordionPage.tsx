import { Accordion } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'single-item', title: 'Single Item', level: 2 },
  { id: 'multiple-items', title: 'Multiple Items', level: 2 },
  { id: 'collapsible', title: 'Collapsible', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const accordionExamples = [
  {
    id: 'single-item',
    title: 'Single Item',
    description: 'Basic accordion with a single expandable section.',
    code: `<Accordion type='single' collapsible className='max-w-md'>
  <AccordionItem value='item-1'>
    <AccordionTrigger>What is Dreamer UI?</AccordionTrigger>
    <AccordionContent>
      Dreamer UI is a modern React component library built with Tailwind CSS, 
      providing accessible and customizable components for building beautiful applications.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    children: (
      <Accordion type='single' collapsible className='max-w-md'>
        <Accordion.Item value='item-1'>
          <Accordion.Trigger>What is Dreamer UI?</Accordion.Trigger>
          <Accordion.Content>
            Dreamer UI is a modern React component library built with Tailwind CSS, 
            providing accessible and customizable components for building beautiful applications.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    ),
  },
  {
    id: 'multiple-items',
    title: 'Multiple Items',
    description: 'Accordion with multiple expandable sections.',
    code: `<Accordion type='single' collapsible className='max-w-md'>
  <AccordionItem value='item-1'>
    <AccordionTrigger>Getting Started</AccordionTrigger>
    <AccordionContent>
      Install Dreamer UI in your project and start building amazing interfaces 
      with our pre-built components and utilities.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value='item-2'>
    <AccordionTrigger>Components</AccordionTrigger>
    <AccordionContent>
      Explore our extensive library of accessible components including buttons, 
      forms, navigation, overlays, and more.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value='item-3'>
    <AccordionTrigger>Customization</AccordionTrigger>
    <AccordionContent>
      Customize components using Tailwind CSS classes, CSS custom properties, 
      or by extending our component variants.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    children: (
      <Accordion type='single' collapsible className='max-w-md'>
        <Accordion.Item value='item-1'>
          <Accordion.Trigger>Getting Started</Accordion.Trigger>
          <Accordion.Content>
            Install Dreamer UI in your project and start building amazing interfaces 
            with our pre-built components and utilities.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='item-2'>
          <Accordion.Trigger>Components</Accordion.Trigger>
          <Accordion.Content>
            Explore our extensive library of accessible components including buttons, 
            forms, navigation, overlays, and more.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='item-3'>
          <Accordion.Trigger>Customization</Accordion.Trigger>
          <Accordion.Content>
            Customize components using Tailwind CSS classes, CSS custom properties, 
            or by extending our component variants.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    ),
  },
];

const accordionProps = [
  {
    name: 'type',
    type: '"single" | "multiple"',
    default: '"single"',
    description: 'Whether only one item can be expanded at a time or multiple items.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: 'Whether the accordion items can be collapsed after expanding.',
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    description: 'The default expanded item(s).',
  },
  {
    name: 'value',
    type: 'string | string[]',
    description: 'The controlled expanded item(s).',
  },
  {
    name: 'onValueChange',
    type: '(value: string | string[]) => void',
    description: 'Callback fired when the expanded state changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the accordion.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Accordion items to display.',
    required: true,
  },
];

export function AccordionPage() {
  return (
    <ComponentPage
      title='Accordion'
      description='Collapsible content sections with expand/collapse functionality and keyboard navigation.'
      tableOfContents={tableOfContents}
      usageInstructions='The Accordion component allows you to create collapsible content sections. Use it to organize information hierarchically, for FAQs, or to save space in your interface. It supports both single and multiple expansion modes with full keyboard accessibility.'
      importStatement="import { Accordion } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={accordionProps}
      examples={accordionExamples}
    />
  );
}