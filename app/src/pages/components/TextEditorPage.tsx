import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { TextEditor } from '../../../text-editor';

const tableOfContents = [
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'typography', title: 'Typography Features', level: 1 },
  { id: 'special-commands', title: 'Special Commands', level: 1 },
  { id: 'customization', title: 'Customization', level: 1 },
  { id: 'states', title: 'States', level: 1 },
];

export function TextEditorPage() {
  return (
    <ComponentPage
      title='Text Editor'
      description='A rich text editor component that supports various typography elements, images, horizontal rules, lists, and special commands. Features customizable command handlers and modern styling.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Basic Usage'
        description='The text editor provides a rich editing experience with toolbar and contentEditable functionality.'
        id='basic-usage'
      >
        <TextEditor
          placeholder="Start typing your content..."
          initialContent="<p>Welcome to the <strong>text editor</strong>! Try using the toolbar buttons or keyboard shortcuts like <strong>Ctrl+B</strong> for bold.</p>"
          onContentChange={(content) => console.log('Content changed:', content)}
        />
      </ExampleSection>

      <ExampleSection 
        title='Variants'
        description='Different visual styles to match your design system.'
        id='variants'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-2'>Default</h4>
            <TextEditor
              variant="default"
              size="sm"
              placeholder="Default variant with border..."
            />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Minimal</h4>
            <TextEditor
              variant="minimal"
              size="sm"
              placeholder="Minimal variant with focus ring..."
            />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Filled</h4>
            <TextEditor
              variant="filled"
              size="sm"
              placeholder="Filled variant with background..."
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Different editor heights to fit your content needs.'
        id='sizes'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-2'>Small (120px min height)</h4>
            <TextEditor size="sm" placeholder="Compact editor for short content..." />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Medium (200px min height)</h4>
            <TextEditor size="md" placeholder="Standard editor for most use cases..." />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Large (300px min height)</h4>
            <TextEditor size="lg" placeholder="Spacious editor for longer content..." />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Typography Features'
        description='Rich text formatting options including headers, lists, images, and horizontal rules.'
        id='typography'
      >
        <TextEditor
          initialContent={`
            <h1>This is a Heading 1</h1>
            <h2>This is a Heading 2</h2>
            <h3>This is a Heading 3</h3>
            <p>This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
            <ul>
              <li>First unordered list item</li>
              <li>Second unordered list item</li>
            </ul>
            <ol>
              <li>First ordered list item</li>
              <li>Second ordered list item</li>
            </ol>
            <hr>
            <p>Text after horizontal rule.</p>
          `}
          placeholder="Try the formatting toolbar above..."
        />
      </ExampleSection>

      <ExampleSection 
        title='Special Commands'
        description='Trigger special commands using @ for mentions, # for hashtags, and custom triggers.'
        id='special-commands'
      >
        <TextEditor
          placeholder="Type @username for mentions, #hashtag for tags, or /command for custom commands..."
          commandHandlers={[
            {
              trigger: '@',
              color: 'text-blue-500',
              onTrigger: (text, position) => {
                console.log(`Mention triggered: "${text}" at position ${position}`);
              },
            },
            {
              trigger: '#',
              color: 'text-green-500', 
              onTrigger: (text, position) => {
                console.log(`Hashtag triggered: "${text}" at position ${position}`);
              },
            },
            {
              trigger: '/',
              color: 'text-purple-500',
              onTrigger: (text, position) => {
                console.log(`Slash command triggered: "${text}" at position ${position}`);
              },
            },
          ]}
        />
      </ExampleSection>

      <ExampleSection 
        title='Customization'
        description='Customize toolbar visibility, styling, and command handlers.'
        id='customization'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-2'>Without Toolbar</h4>
            <TextEditor
              showToolbar={false}
              placeholder="This editor has no toolbar. Use keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)."
              initialContent="<p>Use <strong>Ctrl+B</strong> for bold, <em>Ctrl+I</em> for italic, and <u>Ctrl+U</u> for underline.</p>"
            />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Custom Styling</h4>
            <TextEditor
              className="border-2 border-dashed border-primary/50"
              toolbarClassName="bg-primary/5 border-primary/20"
              editorClassName="bg-primary/5"
              placeholder="Editor with custom styling..."
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='States'
        description='Disabled and read-only states for different use cases.'
        id='states'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-2'>Disabled</h4>
            <TextEditor
              disabled
              initialContent="<p>This editor is disabled and cannot be edited.</p>"
            />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-2'>Read-only</h4>
            <TextEditor
              readOnly
              initialContent="<p>This editor is <strong>read-only</strong>. You can select text but cannot edit it.</p>"
            />
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}