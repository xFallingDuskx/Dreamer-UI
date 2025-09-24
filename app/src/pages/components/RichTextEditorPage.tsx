import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { RichTextEditor } from '../../../rich-text-editor';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'toolbar-customization', title: 'Toolbar Customization', level: 2 },
  { id: 'custom-styling', title: 'Custom Styling', level: 2 },
  { id: 'controlled-editor', title: 'Controlled Editor', level: 2 },
  { id: 'disabled-state', title: 'Disabled State', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

// Example components
function BasicRichTextEditor() {
  return (
    <div className='space-y-4'>
      <RichTextEditor
        placeholder="Start writing your content..."
        defaultValue="<p>This is a <strong>rich text editor</strong> with <em>formatting</em> capabilities!</p>"
      />
    </div>
  );
}

function VariantRichTextEditors() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Default</h4>
        <RichTextEditor
          size="md"
          variant="default"
          placeholder="Default variant with border..."
          defaultValue="<p>Default editor with standard border and toolbar.</p>"
        />
      </div>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Minimal</h4>
        <RichTextEditor
          size="sm"
          variant="minimal"
          toolbarVariant="minimal"
          placeholder="Minimal variant without borders..."
          defaultValue="<p>Minimal editor with clean design.</p>"
        />
      </div>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Outlined</h4>
        <RichTextEditor
          size="lg"
          variant="outlined"
          toolbarSize="lg"
          placeholder="Large outlined editor..."
          defaultValue="<p>Large editor with prominent outline border.</p>"
        />
      </div>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Filled</h4>
        <RichTextEditor
          variant="filled"
          toolbarVariant="filled"
          placeholder="Filled variant with background..."
          defaultValue="<p>Filled editor with background styling.</p>"
        />
      </div>
    </div>
  );
}

function ToolbarCustomizationExample() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Essential Tools Only</h4>
        <RichTextEditor
          placeholder="Editor with essential formatting tools..."
          toolbarActions={['bold', 'italic', 'underline', '|', 'bulletList', 'orderedList', '|', 'undo', 'redo']}
          defaultValue="<p>Simple editor with basic formatting.</p>"
        />
      </div>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Code-Focused</h4>
        <RichTextEditor
          placeholder="Editor optimized for code documentation..."
          toolbarActions={['bold', 'italic', '|', 'inlineCode', 'blockCode', '|', 'h1', 'h2', 'h3', '|', 'bulletList', 'orderedList', '|', 'link', 'table']}
          defaultValue="<p>Perfect for documentation with <code>inline code</code> support.</p>"
        />
      </div>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>No Toolbar</h4>
        <RichTextEditor
          placeholder="Focus on content without toolbar distractions..."
          showToolbar={false}
          defaultValue="<p>Clean editor without toolbar for distraction-free writing.</p>"
        />
      </div>
    </div>
  );
}

function CustomStylingExample() {
  return (
    <div className='space-y-6'>
      <div>
        <h4 className='text-md font-medium text-gray-300 mb-2'>Custom Text Styles</h4>
        <RichTextEditor
          placeholder="Editor with custom styling..."
          customStyles={{
            paragraph: 'prose-lg max-w-none text-gray-100 leading-relaxed',
            bold: 'font-black text-blue-400',
            italic: 'italic text-purple-400',
            h1: 'text-3xl font-bold text-yellow-400 border-b border-yellow-400/30 pb-2',
            h2: 'text-2xl font-semibold text-green-400',
            blockquote: 'border-l-4 border-orange-400 pl-4 italic text-orange-300 bg-orange-900/10 py-2',
            inlineCode: 'bg-pink-900/30 text-pink-300 px-2 py-1 rounded font-mono text-sm',
            link: 'text-cyan-400 underline hover:text-cyan-300',
          }}
          defaultValue="<h1>Custom Styled Content</h1><p>This editor uses <strong>custom styling</strong> for <em>different elements</em>.</p><blockquote>Blockquotes are beautifully styled.</blockquote><p>And <code>inline code</code> has custom colors too!</p>"
        />
      </div>
    </div>
  );
}

function ControlledRichTextEditor() {
  const [content, setContent] = useState('<p>This editor is controlled by React state. Try editing and see the content below update in real-time!</p>');
  
  return (
    <div className='space-y-4'>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
      <div className='mt-4 p-4 bg-gray-800/50 rounded-lg'>
        <h5 className='text-sm font-medium text-gray-300 mb-2'>Current Content:</h5>
        <pre className='text-xs text-gray-400 whitespace-pre-wrap overflow-x-auto'>{content}</pre>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={() => setContent('<p>Sample content with <strong>bold</strong> and <em>italic</em> text.</p>')}
          className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Set Sample Content
        </button>
        <button
          onClick={() => setContent('')}
          className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700'
        >
          Clear Content
        </button>
      </div>
    </div>
  );
}

function DisabledRichTextEditor() {
  return (
    <div className='space-y-4'>
      <RichTextEditor
        disabled
        placeholder="This editor is disabled..."
        defaultValue="<p>This content cannot be edited because the editor is <strong>disabled</strong>.</p>"
      />
    </div>
  );
}

const richTextEditorExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'A simple rich text editor with default configuration and formatting options.',
    code: `<RichTextEditor
  placeholder="Start writing your content..."
  defaultValue="<p>This is a <strong>rich text editor</strong> with <em>formatting</em> capabilities!</p>"
/>`,
    children: <BasicRichTextEditor />,
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different visual styles and sizes for various use cases.',
    code: `<div className="space-y-6">
  <RichTextEditor
    variant="default"
    size="md"
    placeholder="Default variant..."
  />
  <RichTextEditor
    variant="minimal"
    toolbarVariant="minimal"
    size="sm"
    placeholder="Minimal variant..."
  />
  <RichTextEditor
    variant="outlined"
    size="lg"
    toolbarSize="lg"
    placeholder="Large outlined editor..."
  />
  <RichTextEditor
    variant="filled"
    toolbarVariant="filled"
    placeholder="Filled variant..."
  />
</div>`,
    children: <VariantRichTextEditors />,
  },
  {
    id: 'toolbar-customization',
    title: 'Toolbar Customization',
    description: 'Customize the toolbar to show only the tools you need for your specific use case.',
    code: `// Essential tools only
<RichTextEditor
  toolbarActions={[
    'bold', 'italic', 'underline', '|',
    'bulletList', 'orderedList', '|',
    'undo', 'redo'
  ]}
  placeholder="Essential tools only..."
/>

// Code-focused toolbar
<RichTextEditor
  toolbarActions={[
    'bold', 'italic', '|',
    'inlineCode', 'blockCode', '|',
    'h1', 'h2', 'h3', '|',
    'bulletList', 'orderedList', '|',
    'link', 'table'
  ]}
  placeholder="Code documentation editor..."
/>

// No toolbar
<RichTextEditor
  showToolbar={false}
  placeholder="Distraction-free writing..."
/>`,
    children: <ToolbarCustomizationExample />,
  },
  {
    id: 'custom-styling',
    title: 'Custom Styling',
    description: 'Apply custom Tailwind CSS styles to different text elements within the editor.',
    code: `<RichTextEditor
  customStyles={{
    paragraph: 'prose-lg max-w-none text-gray-100 leading-relaxed',
    bold: 'font-black text-blue-400',
    italic: 'italic text-purple-400',
    h1: 'text-3xl font-bold text-yellow-400 border-b border-yellow-400/30 pb-2',
    h2: 'text-2xl font-semibold text-green-400',
    blockquote: 'border-l-4 border-orange-400 pl-4 italic text-orange-300 bg-orange-900/10 py-2',
    inlineCode: 'bg-pink-900/30 text-pink-300 px-2 py-1 rounded font-mono text-sm',
    link: 'text-cyan-400 underline hover:text-cyan-300',
  }}
  defaultValue="<h1>Custom Styled Content</h1><p>This editor uses custom styling...</p>"
/>`,
    children: <CustomStylingExample />,
  },
  {
    id: 'controlled-editor',
    title: 'Controlled Editor',
    description: 'Use the editor in controlled mode with React state management.',
    code: `function ControlledExample() {
  const [content, setContent] = useState('<p>Initial content...</p>');
  
  return (
    <div>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
      <div className="mt-4">
        <pre>{content}</pre>
      </div>
    </div>
  );
}`,
    children: <ControlledRichTextEditor />,
  },
  {
    id: 'disabled-state',
    title: 'Disabled State',
    description: 'The editor can be disabled to prevent user interaction while maintaining readability.',
    code: `<RichTextEditor
  disabled
  placeholder="This editor is disabled..."
  defaultValue="<p>This content cannot be edited...</p>"
/>`,
    children: <DisabledRichTextEditor />,
  },
];

const richTextEditorProps = [
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the editor element.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the editor container.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'Size variant affecting the editor height and text size.',
  },
  {
    name: 'variant',
    type: '"default" | "minimal" | "filled" | "outlined"',
    default: '"default"',
    description: 'Visual style variant of the editor container.',
  },
  {
    name: 'toolbarSize',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'Size of the toolbar and its buttons.',
  },
  {
    name: 'toolbarVariant',
    type: '"default" | "minimal" | "filled"',
    default: '"default"',
    description: 'Visual style variant of the toolbar.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current HTML content of the editor (controlled mode).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: '""',
    description: 'The initial HTML content of the editor (uncontrolled mode).',
  },
  {
    name: 'onChange',
    type: '(content: string) => void',
    description: 'Callback fired when the editor content changes.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '"Start writing..."',
    description: 'Placeholder text displayed when the editor is empty.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the editor is disabled and prevents user interaction.',
  },
  {
    name: 'customStyles',
    type: 'CustomStyles',
    description: 'Object containing custom Tailwind CSS classes for different text elements.',
  },
  {
    name: 'showToolbar',
    type: 'boolean',
    default: 'true',
    description: 'Whether to display the formatting toolbar.',
  },
  {
    name: 'toolbarActions',
    type: 'string[]',
    description: 'Array of toolbar action names to display. Use "|" for separators.',
  },
  {
    name: 'maxLength',
    type: 'number',
    description: 'Maximum number of characters allowed in the editor.',
  },
  {
    name: 'allowedElements',
    type: 'string[]',
    description: 'Array of allowed HTML element tag names for content filtering.',
  },
  {
    name: 'onFocus',
    type: '() => void',
    description: 'Callback fired when the editor gains focus.',
  },
  {
    name: 'onBlur',
    type: '() => void',
    description: 'Callback fired when the editor loses focus.',
  },
];

const keyboardShortcuts = [
  {
    keys: 'Ctrl+B / Cmd+B',
    description: 'Toggle bold formatting',
  },
  {
    keys: 'Ctrl+I / Cmd+I',
    description: 'Toggle italic formatting',
  },
  {
    keys: 'Ctrl+U / Cmd+U',
    description: 'Toggle underline formatting',
  },
  {
    keys: 'Ctrl+Shift+X / Cmd+Shift+X',
    description: 'Toggle strikethrough formatting',
  },
  {
    keys: 'Ctrl+K / Cmd+K',
    description: 'Insert/edit link',
  },
  {
    keys: 'Ctrl+E / Cmd+E',
    description: 'Insert inline code',
  },
  {
    keys: 'Ctrl+Shift+E / Cmd+Shift+E',
    description: 'Insert code block',
  },
  {
    keys: 'Ctrl+Shift+T / Cmd+Shift+T',
    description: 'Insert table',
  },
  {
    keys: 'Ctrl+Z / Cmd+Z',
    description: 'Undo last action',
  },
  {
    keys: 'Ctrl+Y / Cmd+Y',
    description: 'Redo last undone action',
  },
  {
    keys: 'Ctrl+Shift+Z / Cmd+Shift+Z',
    description: 'Redo last undone action (alternative)',
  },
  {
    keys: 'Tab',
    description: 'Indent text or list item',
  },
  {
    keys: 'Shift+Tab',
    description: 'Outdent text or list item',
  },
];

export function RichTextEditorPage() {
  return (
    <ComponentPage
      title='Rich Text Editor'
      description='A comprehensive rich text editor with formatting toolbar, custom styling, and extensive keyboard shortcuts for creating rich content.'
      tableOfContents={tableOfContents}
      usageInstructions='The Rich Text Editor provides a complete WYSIWYG editing experience with support for text formatting, lists, links, code blocks, tables, and more. It supports both controlled and uncontrolled modes, custom styling, and can be configured with different toolbar layouts for specific use cases.'
      importStatement="import { RichTextEditor } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={richTextEditorProps}
      keyboardShortcuts={keyboardShortcuts}
      examples={richTextEditorExamples}
    />
  );
}