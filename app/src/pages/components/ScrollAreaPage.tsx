import { ScrollArea } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'horizontal-scroll', title: 'Horizontal Scroll', level: 2 },
  { id: 'max-height', title: 'Max Height', level: 2 },
  { id: 'max-width', title: 'Max Width', level: 2 },
  { id: 'custom-styling', title: 'Custom Styling', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const scrollAreaExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple scroll area with vertical scrolling.',
    code: `<ScrollArea className='h-48 w-full border border-gray-200 rounded'>
  <div className='p-4'>
    <h4 className='font-semibold mb-2'>Long Content</h4>
    <p className='mb-4'>
      This is a scroll area with a fixed height. When the content exceeds this height, 
      a vertical scrollbar will appear.
    </p>
    <p className='mb-4'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua.
    </p>
    <p className='mb-4'>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
      aliquip ex ea commodo consequat.
    </p>
    <p className='mb-4'>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
      eu fugiat nulla pariatur.
    </p>
    <p>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
      deserunt mollit anim id est laborum.
    </p>
  </div>
</ScrollArea>`,
    children: (
      <ScrollArea className='h-48 w-full border border-gray-200 rounded'>
        <div className='p-4'>
          <h4 className='font-semibold mb-2'>Long Content</h4>
          <p className='mb-4'>
            This is a scroll area with a fixed height. When the content exceeds this height, 
            a vertical scrollbar will appear.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p className='mb-4'>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat.
          </p>
          <p className='mb-4'>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </p>
        </div>
      </ScrollArea>
    ),
  },
  {
    id: 'horizontal-scroll',
    title: 'Horizontal Scroll',
    description: 'Scroll area with horizontal scrolling for wide content.',
    code: `<ScrollArea className='h-24 w-full border border-gray-200 rounded'>
  <div className='p-4 w-[800px]'>
    <h4 className='font-semibold mb-2'>Wide Content</h4>
    <p>
      This content is intentionally wider than the container (800px) to demonstrate 
      horizontal scrolling. You can scroll horizontally to see more content. This is 
      useful for tables, code blocks, or any wide content that doesn't fit in the 
      available space.
    </p>
  </div>
</ScrollArea>`,
    children: (
      <ScrollArea className='h-24 w-full border border-gray-200 rounded'>
        <div className='p-4 w-[800px]'>
          <h4 className='font-semibold mb-2'>Wide Content</h4>
          <p>
            This content is intentionally wider than the container (800px) to demonstrate 
            horizontal scrolling. You can scroll horizontally to see more content. This is 
            useful for tables, code blocks, or any wide content that doesn't fit in the 
            available space.
          </p>
        </div>
      </ScrollArea>
    ),
  },
  {
    id: 'max-height',
    title: 'Max Height',
    description: 'Scroll area with maximum height constraint.',
    code: `<ScrollArea maxHeight={200} className='w-full border border-gray-200 rounded'>
  <div className='p-4'>
    <h4 className='font-semibold mb-2'>Content with Max Height</h4>
    <p className='mb-4'>
      This scroll area has a maximum height of 200px set via the maxHeight prop. 
      Even if the container would normally be taller, it will be limited to this height.
    </p>
    <p className='mb-4'>
      This is particularly useful when you want to ensure a consistent maximum size 
      regardless of the content or parent container dimensions.
    </p>
    <p className='mb-4'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p className='mb-4'>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
      in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Additional content that would normally make the scroll area taller than 200px, 
      but the maxHeight prop prevents this and enables scrolling instead.
    </p>
  </div>
</ScrollArea>`,
    children: (
      <ScrollArea maxHeight={200} className='w-full border border-gray-200 rounded'>
        <div className='p-4'>
          <h4 className='font-semibold mb-2'>Content with Max Height</h4>
          <p className='mb-4'>
            This scroll area has a maximum height of 200px set via the maxHeight prop. 
            Even if the container would normally be taller, it will be limited to this height.
          </p>
          <p className='mb-4'>
            This is particularly useful when you want to ensure a consistent maximum size 
            regardless of the content or parent container dimensions.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className='mb-4'>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Additional content that would normally make the scroll area taller than 200px, 
            but the maxHeight prop prevents this and enables scrolling instead.
          </p>
        </div>
      </ScrollArea>
    ),
  },
  {
    id: 'max-width',
    title: 'Max Width',
    description: 'Scroll area with maximum width constraint.',
    code: `<ScrollArea maxWidth={300} className='h-32 border border-gray-200 rounded'>
  <div className='p-4 w-[600px]'>
    <h4 className='font-semibold mb-2'>Content with Max Width</h4>
    <p className='mb-4'>
      This scroll area has a maximum width of 300px set via the maxWidth prop. 
      The content inside is 600px wide, but the container is constrained to 300px maximum width.
    </p>
    <p className='mb-4'>
      This creates horizontal scrolling when the content is wider than the maxWidth. 
      It's useful for creating consistent layouts where you want to prevent components 
      from becoming too wide regardless of content or screen size.
    </p>
    <p>
      You can scroll horizontally to see the rest of this wide content that extends 
      beyond the 300px width limit imposed by the maxWidth prop.
    </p>
  </div>
</ScrollArea>`,
    children: (
      <ScrollArea maxWidth={300} className='h-32 border border-gray-200 rounded'>
        <div className='p-4 w-[600px]'>
          <h4 className='font-semibold mb-2'>Content with Max Width</h4>
          <p className='mb-4'>
            This scroll area has a maximum width of 300px set via the maxWidth prop. 
            The content inside is 600px wide, but the container is constrained to 300px maximum width.
          </p>
          <p className='mb-4'>
            This creates horizontal scrolling when the content is wider than the maxWidth. 
            It's useful for creating consistent layouts where you want to prevent components 
            from becoming too wide regardless of content or screen size.
          </p>
          <p>
            You can scroll horizontally to see the rest of this wide content that extends 
            beyond the 300px width limit imposed by the maxWidth prop.
          </p>
        </div>
      </ScrollArea>
    ),
  },
  {
    id: 'custom-styling',
    title: 'Custom Styling',
    description: 'Scroll area with custom scrollbar styling.',
    code: `<ScrollArea 
  className='h-32 w-full border border-gray-200 rounded'
  thumbClassName='!bg-blue-500 hover:!bg-blue-400'
>
  <div className='p-4'>
    <h4 className='font-semibold mb-2'>Custom Blue Scrollbar</h4>
    <p className='mb-4'>
      This scroll area uses a custom blue thumb via the thumbClassName prop. 
      The thumb changes color on hover.
    </p>
    <p className='mb-4'>
      You can customize the scrollbar appearance to match your design system 
      or brand colors.
    </p>
    <p className='mb-4'>
      The scrollbar automatically appears when content overflows and disappears 
      when it doesn't.
    </p>
    <p>
      Try scrolling to see the blue thumb in action. The smooth transitions 
      make the interaction feel polished.
    </p>
  </div>
</ScrollArea>`,
    children: (
      <ScrollArea 
        className='h-32 w-full border border-gray-200 rounded'
        thumbClassName='!bg-blue-500 hover:!bg-blue-400'
      >
        <div className='p-4'>
          <h4 className='font-semibold mb-2'>Custom Blue Scrollbar</h4>
          <p className='mb-4'>
            This scroll area uses a custom blue thumb via the thumbClassName prop. 
            The thumb changes color on hover.
          </p>
          <p className='mb-4'>
            You can customize the scrollbar appearance to match your design system 
            or brand colors.
          </p>
          <p className='mb-4'>
            The scrollbar automatically appears when content overflows and disappears 
            when it doesn't.
          </p>
          <p>
            Try scrolling to see the blue thumb in action. The smooth transitions 
            make the interaction feel polished.
          </p>
        </div>
      </ScrollArea>
    ),
  },
];

const scrollAreaProps = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the scroll area root container.',
  },
  {
    name: 'thumbClassName',
    type: 'string',
    description: 'Custom CSS classes for the scroll thumb (the draggable part of the scrollbar).',
  },
  {
    name: 'viewportClassName',
    type: 'string',
    description: 'Custom CSS classes for the viewport (scrollable content area).',
  },
  {
    name: 'scrollbarClassName',
    type: 'string',
    description: 'Custom CSS classes for the scrollbar track.',
  },
  {
    name: 'scrollbarThickness',
    type: 'number',
    default: '10',
    description: 'Scrollbar thickness in pixels.',
  },
  {
    name: 'maxHeight',
    type: 'number',
    description: 'Maximum height in pixels before scrolling. When set, the scroll area will not exceed this height.',
  },
  {
    name: 'maxWidth',
    type: 'number',
    description: 'Maximum width in pixels before scrolling. When set, the scroll area will not exceed this width.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to make scrollable.',
    required: true,
  },
  {
    name: 'id',
    type: 'string',
    description: 'HTML id attribute for the scroll area.',
  },
];

export function ScrollAreaPage() {
  return (
    <ComponentPage
      title='Scroll Area'
      description='Custom scrollable area with styled scrollbars and smooth scrolling behavior.'
      tableOfContents={tableOfContents}
      usageInstructions='The ScrollArea component provides a custom scrollable container with styled scrollbars. Use it to create scrollable regions that match your design system while maintaining smooth scrolling performance. Set a fixed height or width on the container to enable scrolling.'
      importStatement="import { ScrollArea } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={scrollAreaProps}
      examples={scrollAreaExamples}
    />
  );
}