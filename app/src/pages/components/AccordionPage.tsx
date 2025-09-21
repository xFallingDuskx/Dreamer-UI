import { Accordion, AccordionItem } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'with-default-open', title: 'With Default Open Items', level: 2 },
  { id: 'single-mode', title: 'Single Mode', level: 2 },
  { id: 'direct-components', title: 'Direct Components', level: 2 },
  { id: 'custom-styling', title: 'Custom Styling', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const accordionExamples = [
  {
    id: 'with-default-open',
    title: 'With Default Open Items & Multiple Mode',
    description: 'Accordion with default open items and ability to have multiple items open simultaneously.',
    code: `<Accordion
  items={[
    {
      id: 'item-1',
      title: 'A super long title that should wrap to the next line if it is too long. It still should be readable.',
      content: 'Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.',
    },
    { id: 'item-2', title: 'Item 2', content: 'Content for Item 2' },
    { id: 'item-3', title: 'Item 3', content: 'Content for Item 3' },
  ]}
  allowMultiple={true}
  defaultOpenItems={['item-2']}
/>`,
    children: (
      <Accordion
        items={[
          {
            id: 'item-1',
            title: 'A super long title that should wrap to the next line if it is too long. It still should be readable.',
            content: 'Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.Vel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis.',
          },
          { id: 'item-2', title: 'Item 2', content: 'Content for Item 2' },
          { id: 'item-3', title: 'Item 3', content: 'Content for Item 3' },
        ]}
        allowMultiple={true}
        defaultOpenItems={['item-2']}
      />
    ),
  },
  {
    id: 'single-mode',
    title: 'Single Mode',
    description: 'Accordion where only one item can be open at a time.',
    code: `<Accordion
  items={[
    {
      title: 'Item 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    { title: 'Item 2', content: 'Content for Item 2', disabled: true },
    { title: 'Item 3', content: 'Content for Item 3' },
  ]}
  allowMultiple={false}
/>`,
    children: (
      <Accordion
        items={[
          {
            title: 'Item 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          },
          { title: 'Item 2', content: 'Content for Item 2', disabled: true },
          { title: 'Item 3', content: 'Content for Item 3' },
        ]}
        allowMultiple={false}
      />
    ),
  },
  {
    id: 'direct-components',
    title: 'Using AccordionItem Components',
    description: 'Using AccordionItem components directly for more control.',
    code: `<Accordion>
  <AccordionItem
    title='Item 1'
    content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet.'
  />
  <AccordionItem title='Item 2' content='Content for Item 2' disabled={true} />
  <AccordionItem title='Item 3' content='Content for Item 3' />
</Accordion>`,
    children: (
      <Accordion>
        <AccordionItem
          title='Item 1'
          content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius.'
        />
        <AccordionItem title='Item 2' content='Content for Item 2' disabled={true} />
        <AccordionItem title='Item 3' content='Content for Item 3' />
      </Accordion>
    ),
  },
  {
    id: 'custom-styling',
    title: 'Custom Styling',
    description: 'Accordion with custom trigger and body class names.',
    code: `<Accordion 
  triggersClassName='underline' 
  bodiesClassName='bg-gray-50/5'
>
  <AccordionItem
    title='Item 1'
    content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore.'
  />
  <AccordionItem
    title='Item 2'
    content='Content for Item 2'
    triggerClassName='text-red-300 hover:!bg-red-900/50'
    bodyClassName='bg-red-500/10'
  />
  <AccordionItem title='Item 3' content='Content for Item 3' />
</Accordion>`,
    children: (
      <Accordion triggersClassName='underline' bodiesClassName='bg-gray-50/5'>
        <AccordionItem
          title='Item 1'
          content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.'
        />
        <AccordionItem
          title='Item 2'
          content='Content for Item 2'
          triggerClassName='text-red-300 hover:!bg-red-900/50'
          bodyClassName='bg-red-500/10'
        />
        <AccordionItem title='Item 3' content='Content for Item 3' />
      </Accordion>
    ),
  },
];

const accordionProps = [
  {
    name: 'items',
    type: 'AccordionItemData[]',
    description: 'Array of accordion items with id, title, content, and optional disabled state.',
  },
  {
    name: 'allowMultiple',
    type: 'boolean',
    default: 'true',
    description: 'Whether multiple items can be open simultaneously.',
  },
  {
    name: 'defaultOpenItems',
    type: 'string[]',
    description: 'Array of item IDs that should be open by default.',
  },
  {
    name: 'triggersClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to all trigger buttons.',
  },
  {
    name: 'bodiesClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to all content bodies.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the accordion container.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'AccordionItem components when using the component approach.',
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