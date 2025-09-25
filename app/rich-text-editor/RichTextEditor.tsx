import React, { useCallback, useEffect, useState } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { Modal, Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { 
  richTextEditorVariants, 
  toolbarVariants, 
  toolbarButtonVariants,
  type RichTextEditorSize,
  type RichTextEditorVariant,
  type ToolbarSize,
  type ToolbarVariant
} from './variants';
import {
  useUndoRedo,
  useEditorSelection,
  useAutoLink,
  useKeyboardShortcuts,
  useEditorContent,
} from './hooks';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  CodeBlock,
  Link,
  ListBullet,
  ListOrdered,
  ListChecklist,
  Quote,
  Table as TableIcon,
  HorizontalRule,
  Undo,
  Redo,
  Header,
  Superscript,
  Subscript,
  Indent,
  Outdent,
} from './icons';

export interface CustomStyles {
  bold?: string;
  italic?: string;
  underline?: string;
  strikethrough?: string;
  inlineCode?: string;
  blockCode?: string;
  superscript?: string;
  subscript?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  paragraph?: string;
  blockquote?: string;
  bulletList?: string;
  orderedList?: string;
  checkList?: string;
  link?: string;
  hr?: string;
  table?: string;
}

export interface RichTextEditorProps {
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  size?: RichTextEditorSize;
  variant?: RichTextEditorVariant;
  toolbarSize?: ToolbarSize;
  toolbarVariant?: ToolbarVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  customStyles?: CustomStyles;
  showToolbar?: boolean;
  toolbarActions?: string[];
  maxLength?: number;
  allowedElements?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
}

const DEFAULT_TOOLBAR_ACTIONS = [
  'bold', 'italic', 'underline', 'strikethrough', '|',
  'h1', 'h2', 'h3', '|',
  'bulletList', 'orderedList', 'checkList', '|',
  'link', 'inlineCode', 'blockCode', '|',
  'blockquote', 'hr', 'table', '|',
  'superscript', 'subscript', '|',
  'indent', 'outdent', '|',
  'undo', 'redo'
];

export function RichTextEditor({
  id,
  className,
  size = 'md',
  variant = 'default',
  toolbarSize = 'md',
  toolbarVariant = 'default',
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Start writing...',
  disabled = false,
  customStyles = {},
  showToolbar = true,
  toolbarActions = DEFAULT_TOOLBAR_ACTIONS,
  maxLength,
  allowedElements,
  onFocus,
  onBlur,
}: RichTextEditorProps) {
  const { content, editorRef, updateContent, getContent } = useEditorContent(defaultValue);
  const { execute, undo, redo, canUndo, canRedo } = useUndoRedo();
  const { selection, saveSelection, restoreSelection } = useEditorSelection(editorRef as React.RefObject<HTMLDivElement>);
  const { autoLinkText } = useAutoLink();
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Handle controlled vs uncontrolled
  const isControlled = value !== undefined;
  const currentContent = isControlled ? value : content;

  const handleContentChange = useCallback(() => {
    const newContent = getContent();
    if (!isControlled) {
      updateContent(newContent);
    }
    onChange?.(newContent);
  }, [getContent, isControlled, updateContent, onChange]);

  const executeCommand = useCallback((command: string, value?: string) => {
    const oldContent = getContent();
    
    document.execCommand(command, false, value);
    handleContentChange();
    
    // Add to undo/redo history
    execute({
      execute: () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = getContent();
        }
      },
      undo: () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = oldContent;
        }
        handleContentChange();
      }
    });
  }, [getContent, handleContentChange, execute, editorRef]);

  const formatText = useCallback((format: string, value?: string) => {
    if (disabled) return;
    
    saveSelection();
    executeCommand(format, value);
    restoreSelection();
    
    // Update active formats
    setTimeout(() => {
      const newActiveFormats = new Set<string>();
      
      if (document.queryCommandState('bold')) newActiveFormats.add('bold');
      if (document.queryCommandState('italic')) newActiveFormats.add('italic');
      if (document.queryCommandState('underline')) newActiveFormats.add('underline');
      if (document.queryCommandState('strikeThrough')) newActiveFormats.add('strikethrough');
      if (document.queryCommandState('insertUnorderedList')) newActiveFormats.add('bulletList');
      if (document.queryCommandState('insertOrderedList')) newActiveFormats.add('orderedList');
      
      setActiveFormats(newActiveFormats);
    }, 10);
  }, [disabled, saveSelection, executeCommand, restoreSelection]);

  const insertElement = useCallback((tagName: string, attributes?: Record<string, string>, content?: string) => {
    if (disabled) return;
    
    const element = document.createElement(tagName);
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    if (content) {
      element.innerHTML = content;
    }
    
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      range.insertNode(element);
      range.setStartAfter(element);
      range.setEndAfter(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    handleContentChange();
  }, [disabled, handleContentChange]);

  const insertInlineCode = useCallback(() => {
    const sel = window.getSelection();
    if (sel?.rangeCount && sel.toString()) {
      const range = sel.getRangeAt(0);
      const code = document.createElement('code');
      code.className = join('px-2 py-1 rounded text-accent bg-muted/10', customStyles.inlineCode) ?? '';
      code.textContent = sel.toString();
      range.deleteContents();
      range.insertNode(code);
      handleContentChange();
    }
  }, [handleContentChange, customStyles.inlineCode]);

  const insertBlockCode = useCallback(() => {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    
    pre.className = join('bg-muted/10 rounded-lg p-4 my-4 overflow-x-auto', customStyles.blockCode) ?? '';
    code.textContent = 'Your code here...';
    
    pre.appendChild(code);
    
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      range.insertNode(pre);
      handleContentChange();
    }
  }, [handleContentChange, customStyles.blockCode]);

  const insertTable = useCallback(() => {
    const tableHTML = `
      <table class="${join('w-full border-collapse border border-border my-4', customStyles.table || '')}">
        <thead>
          <tr class="bg-muted/20">
            <th class="border border-border p-2 text-left">Header 1</th>
            <th class="border border-border p-2 text-left">Header 2</th>
            <th class="border border-border p-2 text-left">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-border p-2">Cell 1</td>
            <td class="border border-border p-2">Cell 2</td>
            <td class="border border-border p-2">Cell 3</td>
          </tr>
          <tr>
            <td class="border border-border p-2">Cell 4</td>
            <td class="border border-border p-2">Cell 5</td>
            <td class="border border-border p-2">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `;
    
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.innerHTML = tableHTML;
      range.insertNode(div.firstElementChild!);
      handleContentChange();
    }
  }, [handleContentChange, customStyles.table]);

  const insertCheckList = useCallback(() => {
    const checklistHTML = `
      <ul class="${join('space-y-2 my-4', customStyles.checkList || '')}">
        <li class="flex items-center">
          <input type="checkbox" class="mr-2 rounded" />
          <span>First task</span>
        </li>
        <li class="flex items-center">
          <input type="checkbox" class="mr-2 rounded" checked />
          <span class="line-through text-muted-foreground">Completed task</span>
        </li>
        <li class="flex items-center">
          <input type="checkbox" class="mr-2 rounded" />
          <span>Another task</span>
        </li>
      </ul>
    `;
    
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.innerHTML = checklistHTML;
      range.insertNode(div.firstElementChild!);
      handleContentChange();
    }
  }, [handleContentChange, customStyles.checkList]);

  const handleLinkInsert = useCallback(() => {
    if (!linkUrl) return;
    
    const linkTextToUse = linkText || linkUrl;
    
    if (selection?.text) {
      // Replace selected text with link
      formatText('createLink', linkUrl);
    } else {
      // Insert new link with specified text
      const a = document.createElement('a');
      a.href = linkUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = linkTextToUse;
      a.className = join('text-blue-400 underline hover:text-blue-300', customStyles.link || '');
      
      const sel = window.getSelection();
      if (sel?.rangeCount) {
        const range = sel.getRangeAt(0);
        range.insertNode(a);
        range.setStartAfter(a);
        range.setEndAfter(a);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    
    setIsLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
    handleContentChange();
  }, [linkUrl, linkText, selection, formatText, customStyles.link, handleContentChange]);

  const toggleBulletList = useCallback(() => {
    const isActive = document.queryCommandState('insertUnorderedList');
    formatText('insertUnorderedList');
    handleContentChange();
  }, [formatText, handleContentChange]);

  const toggleOrderedList = useCallback(() => {
    const isActive = document.queryCommandState('insertOrderedList');
    formatText('insertOrderedList');
    handleContentChange();
  }, [formatText, handleContentChange]);

  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    let newContent = target.innerHTML;
    
    // Auto-link detection
    newContent = autoLinkText(newContent);
    
    // Length validation
    if (maxLength && target.textContent && target.textContent.length > maxLength) {
      return;
    }
    
    // Element filtering
    if (allowedElements) {
      // Simple filtering - in a real implementation, you'd want proper HTML sanitization
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newContent;
      const allElements = tempDiv.querySelectorAll('*');
      
      for (const element of Array.from(allElements)) {
        if (!allowedElements.includes(element.tagName.toLowerCase())) {
          element.replaceWith(...Array.from(element.childNodes));
        }
      }
      
      newContent = tempDiv.innerHTML;
    }
    
    if (newContent !== target.innerHTML) {
      target.innerHTML = newContent;
    }
    
    handleContentChange();
  }, [autoLinkText, maxLength, allowedElements, handleContentChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Handle Enter key properly for line breaks
      event.preventDefault();
      
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);
        
        // Move cursor after the br
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
        
        handleContentChange();
      }
    }
  }, [handleContentChange]);

  // Keyboard shortcuts
  useKeyboardShortcuts(editorRef as React.RefObject<HTMLDivElement>, {
    'mod+b': () => formatText('bold'),
    'mod+i': () => formatText('italic'),
    'mod+u': () => formatText('underline'),
    'mod+shift+x': () => formatText('strikeThrough'),
    'mod+k': () => setIsLinkDialogOpen(true),
    'mod+e': insertInlineCode,
    'mod+shift+e': insertBlockCode,
    'mod+shift+t': insertTable,
    'mod+z': undo,
    'mod+y': redo,
    'mod+shift+z': redo,
    'tab': () => formatText('indent'),
    'shift+tab': () => formatText('outdent'),
  });

  // Update content when value prop changes
  useEffect(() => {
    if (isControlled && value !== undefined && editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isControlled]);

  const renderToolbarButton = (action: string) => {
    if (action === '|') {
      return <div key={action} className="w-px h-6 bg-border mx-1" />;
    }

    const isActive = activeFormats.has(action);
    const buttonClass = join(
      'inline-flex items-center justify-center rounded transition-colors',
      toolbarButtonVariants.size[toolbarSize],
      isActive ? toolbarButtonVariants.state.active : toolbarButtonVariants.state.default,
      disabled && toolbarButtonVariants.state.disabled
    );

    const iconProps = { size: toolbarSize === 'sm' ? 12 : toolbarSize === 'lg' ? 20 : 16 };

    switch (action) {
      case 'bold':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('bold')}
            disabled={disabled}
            title="Bold (Ctrl+B)"
          >
            <Bold {...iconProps} />
          </button>
        );
      case 'italic':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('italic')}
            disabled={disabled}
            title="Italic (Ctrl+I)"
          >
            <Italic {...iconProps} />
          </button>
        );
      case 'underline':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('underline')}
            disabled={disabled}
            title="Underline (Ctrl+U)"
          >
            <Underline {...iconProps} />
          </button>
        );
      case 'strikethrough':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('strikeThrough')}
            disabled={disabled}
            title="Strikethrough (Ctrl+Shift+X)"
          >
            <Strikethrough {...iconProps} />
          </button>
        );
      case 'h1':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('formatBlock', 'h1')}
            disabled={disabled}
            title="Heading 1"
          >
            <Header {...iconProps} level={1} />
          </button>
        );
      case 'h2':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('formatBlock', 'h2')}
            disabled={disabled}
            title="Heading 2"
          >
            <Header {...iconProps} level={2} />
          </button>
        );
      case 'h3':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('formatBlock', 'h3')}
            disabled={disabled}
            title="Heading 3"
          >
            <Header {...iconProps} level={3} />
          </button>
        );
      case 'bulletList':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={toggleBulletList}
            disabled={disabled}
            title="Bullet List"
          >
            <ListBullet {...iconProps} />
          </button>
        );
      case 'orderedList':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={toggleOrderedList}
            disabled={disabled}
            title="Numbered List"
          >
            <ListOrdered {...iconProps} />
          </button>
        );
      case 'checkList':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={insertCheckList}
            disabled={disabled}
            title="Checklist"
          >
            <ListChecklist {...iconProps} />
          </button>
        );
      case 'inlineCode':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={insertInlineCode}
            disabled={disabled}
            title="Inline Code"
          >
            <Code {...iconProps} />
          </button>
        );
      case 'blockCode':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={insertBlockCode}
            disabled={disabled}
            title="Code Block"
          >
            <CodeBlock {...iconProps} />
          </button>
        );
      case 'table':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={insertTable}
            disabled={disabled}
            title="Insert Table"
          >
            <TableIcon {...iconProps} />
          </button>
        );
      case 'link':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => setIsLinkDialogOpen(true)}
            disabled={disabled}
            title="Insert Link (Ctrl+K)"
          >
            <Link {...iconProps} />
          </button>
        );
      case 'blockquote':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('formatBlock', 'blockquote')}
            disabled={disabled}
            title="Quote"
          >
            <Quote {...iconProps} />
          </button>
        );
      case 'hr':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('insertHorizontalRule')}
            disabled={disabled}
            title="Horizontal Rule"
          >
            <HorizontalRule {...iconProps} />
          </button>
        );
      case 'superscript':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('superscript')}
            disabled={disabled}
            title="Superscript"
          >
            <Superscript {...iconProps} />
          </button>
        );
      case 'subscript':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('subscript')}
            disabled={disabled}
            title="Subscript"
          >
            <Subscript {...iconProps} />
          </button>
        );
      case 'indent':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('indent')}
            disabled={disabled}
            title="Indent"
          >
            <Indent {...iconProps} />
          </button>
        );
      case 'outdent':
        return (
          <button
            key={action}
            type="button"
            className={buttonClass}
            onClick={() => formatText('outdent')}
            disabled={disabled}
            title="Outdent"
          >
            <Outdent {...iconProps} />
          </button>
        );
      case 'undo':
        return (
          <button
            key={action}
            type="button"
            className={join(buttonClass, !canUndo && toolbarButtonVariants.state.disabled)}
            onClick={undo}
            disabled={disabled || !canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo {...iconProps} />
          </button>
        );
      case 'redo':
        return (
          <button
            key={action}
            type="button"
            className={join(buttonClass, !canRedo && toolbarButtonVariants.state.disabled)}
            onClick={redo}
            disabled={disabled || !canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo {...iconProps} />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={join(
        'rounded-lg overflow-hidden',
        richTextEditorVariants.variant[variant],
        className
      )}
      data-variant={variant}
      data-size={size}
    >
      {showToolbar && (
        <div 
          className={join(
            'flex flex-wrap items-center gap-1',
            toolbarVariants.variant[toolbarVariant],
            toolbarVariants.size[toolbarSize]
          )}
        >
          {toolbarActions.map((action, index) => (
            <React.Fragment key={`${action}-${index}`}>
              {renderToolbarButton(action)}
            </React.Fragment>
          ))}
        </div>
      )}

      <div
        ref={editorRef}
        id={id}
        contentEditable={!disabled}
        className={join(
          'w-full p-4 focus:outline-none overflow-auto',
          richTextEditorVariants.size[size],
          disabled && 'cursor-not-allowed opacity-50',
          customStyles.paragraph || 'prose prose-neutral max-w-none dark:prose-invert'
        )}
        style={{
          ...(!currentContent && { color: 'var(--color-muted-foreground)' }),
        }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: currentContent || '' }}
      />

      {/* Link Dialog */}
      <Modal
        isOpen={isLinkDialogOpen}
        onClose={() => {
          setIsLinkDialogOpen(false);
          setLinkUrl('');
          setLinkText('');
        }}
        title="Insert Link"
        actions={[
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: () => {
              setIsLinkDialogOpen(false);
              setLinkUrl('');
              setLinkText('');
            },
          },
          {
            label: 'Insert',
            variant: 'primary',
            onClick: handleLinkInsert,
            disabled: !linkUrl,
          },
        ]}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="link-text" className="block text-sm font-medium mb-2">
              Link Text
            </label>
            <input
              id="link-text"
              type="text"
              placeholder="Enter link text (optional)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="w-full p-2 border border-border rounded bg-background"
            />
          </div>
          <div>
            <label htmlFor="link-url" className="block text-sm font-medium mb-2">
              URL
            </label>
            <input
              id="link-url"
              type="url"
              placeholder="Enter URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-border rounded bg-background"
              autoFocus
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}