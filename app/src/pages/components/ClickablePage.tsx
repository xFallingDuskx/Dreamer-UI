import { Clickable } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'button-clickable', title: 'Button Clickable', level: 2 },
  { id: 'link-clickable', title: 'Link Clickable', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const clickableExamples = [
  {
    id: 'button-clickable',
    title: 'Button Clickable',
    description: 'Making content clickable with button functionality.',
    code: `<div className='space-y-4'>
  <Clickable onButtonClick={() => alert('Card clicked!')}>
    <div className='p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'>
      <h3 className='font-semibold text-lg'>Clickable Card</h3>
      <p className='text-gray-600'>Click anywhere on this card to trigger the action.</p>
    </div>
  </Clickable>
  
  <Clickable 
    onButtonClick={() => console.log('Button clicked')}
    buttonProps={{ 'aria-label': 'Custom clickable area' }}
  >
    <div className='p-3 bg-blue-50 border border-blue-200 rounded'>
      <span className='text-blue-800'>Custom clickable area with button props</span>
    </div>
  </Clickable>
</div>`,
    children: (
      <div className='space-y-4'>
        <Clickable onButtonClick={() => alert('Card clicked!')}>
          <div className='p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'>
            <h3 className='font-semibold text-lg'>Clickable Card</h3>
            <p className='text-gray-600'>Click anywhere on this card to trigger the action.</p>
          </div>
        </Clickable>
        
        <Clickable 
          onButtonClick={() => console.log('Button clicked')}
          buttonProps={{ 'aria-label': 'Custom clickable area' }}
        >
          <div className='p-3 bg-blue-50 border border-blue-200 rounded'>
            <span className='text-blue-800'>Custom clickable area with button props</span>
          </div>
        </Clickable>
      </div>
    ),
  },
  {
    id: 'link-clickable',
    title: 'Link Clickable',
    description: 'Making content clickable with link functionality.',
    code: `<div className='space-y-4'>
  <Clickable linkTo='https://example.com'>
    <div className='p-4 border rounded-lg bg-green-50 border-green-200'>
      <h3 className='font-semibold text-lg text-green-800'>External Link Card</h3>
      <p className='text-green-600'>Click to navigate to external site</p>
    </div>
  </Clickable>
  
  <Clickable 
    linkTo='/some-page'
    linkProps={{ target: '_blank', rel: 'noopener noreferrer' }}
  >
    <div className='p-3 bg-purple-50 border border-purple-200 rounded'>
      <span className='text-purple-800'>Internal link with custom props</span>
    </div>
  </Clickable>
</div>`,
    children: (
      <div className='space-y-4'>
        <Clickable linkTo='https://example.com'>
          <div className='p-4 border rounded-lg bg-green-50 border-green-200'>
            <h3 className='font-semibold text-lg text-green-800'>External Link Card</h3>
            <p className='text-green-600'>Click to navigate to external site</p>
          </div>
        </Clickable>
        
        <Clickable 
          linkTo='/some-page'
          linkProps={{ target: '_blank', rel: 'noopener noreferrer' }}
        >
          <div className='p-3 bg-purple-50 border border-purple-200 rounded'>
            <span className='text-purple-800'>Internal link with custom props</span>
          </div>
        </Clickable>
      </div>
    ),
  },
];

const clickableProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The content to make clickable.',
  },
  {
    name: 'linkTo',
    type: 'string',
    description: 'URL for link functionality. When provided, renders an anchor element.',
  },
  {
    name: 'linkProps',
    type: 'Omit<React.HTMLProps<HTMLAnchorElement>, "href">',
    description: 'Additional props to pass to the anchor element when using linkTo.',
  },
  {
    name: 'onButtonClick',
    type: 'React.MouseEventHandler<HTMLButtonElement>',
    description: 'Click handler for button functionality. Ignored when linkTo is provided.',
  },
  {
    name: 'buttonProps',
    type: 'Omit<React.HTMLProps<HTMLButtonElement>, "onClick">',
    description: 'Additional props to pass to the button element when using onButtonClick.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the wrapper div.',
  },
];

export function ClickablePage() {
  return (
    <ComponentPage
      title='Clickable'
      description='Generic clickable wrapper component with hover and focus states for enhanced interactivity.'
      tableOfContents={tableOfContents}
      usageInstructions='The Clickable component provides a generic way to make any content interactive with proper hover, focus, and active states. Use it to create custom interactive elements that maintain accessibility and consistent styling. Choose between button functionality for actions or link functionality for navigation.'
      importStatement="import { Clickable } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={clickableProps}
      examples={clickableExamples}
    />
  );
}