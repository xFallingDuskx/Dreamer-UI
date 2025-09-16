import React, { useId } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { textEditorDefaults, textEditorVariants, textEditorSizes, textEditorRounded, type TextEditorVariants } from './variants';
import { useTextEditor, type CommandHandler } from './hooks';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  ImageIcon,
  HorizontalRuleIcon,
  HeaderIcon,
} from './icons';

export interface TextEditorProps extends Partial<TextEditorVariants> {
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
  className?: string;
  placeholder?: string;
  initialContent?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Custom command handlers for special triggers like @ and # */
  commandHandlers?: CommandHandler[];
  /** Show or hide the toolbar */
  showToolbar?: boolean;
  /** Callback when content changes */
  onContentChange?: (content: string) => void;
  /** Custom toolbar className */
  toolbarClassName?: string;
  /** Custom editor className */
  editorClassName?: string;
}

export function TextEditor({
  ref,
  id: providedId,
  variant = textEditorDefaults.variant,
  size = textEditorDefaults.size,
  rounded = textEditorDefaults.rounded,
  className,
  placeholder = 'Start typing...',
  initialContent = '',
  disabled = false,
  readOnly = false,
  commandHandlers = [
    {
      trigger: '@',
      color: 'text-blue-600',
      onTrigger: (text, position) => {
        console.log('Mention triggered:', text, position);
        // Custom mention logic can be implemented here
      },
    },
    {
      trigger: '#',
      color: 'text-green-600',
      onTrigger: (text, position) => {
        console.log('Hashtag triggered:', text, position);
        // Custom hashtag logic can be implemented here
      },
    },
  ],
  showToolbar = true,
  onContentChange,
  toolbarClassName,
  editorClassName,
}: TextEditorProps) {
  const generatedId = useId();
  const editorId = providedId || generatedId;

  const {
    state,
    editorRef,
    showCommandPopup,
    setShowCommandPopup,
    formatText,
    insertContent,
    handleKeyDown,
  } = useTextEditor(initialContent, commandHandlers);

  // Handle content changes
  React.useEffect(() => {
    if (onContentChange) {
      onContentChange(state.content);
    }
  }, [state.content, onContentChange]);

  const containerClasses = join(
    'relative',
    textEditorVariants[variant],
    textEditorRounded[rounded],
    disabled && 'opacity-50 cursor-not-allowed',
    readOnly && 'cursor-default',
    className
  );

  const editorClasses = join(
    'w-full p-3 outline-none overflow-auto',
    textEditorSizes[size],
    'prose prose-sm max-w-none',
    '[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2',
    '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1',
    '[&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-2 [&_h3]:mb-1',
    '[&_p]:my-1 [&_p]:leading-relaxed',
    '[&_ul]:my-2 [&_ul]:pl-5 [&_ul]:list-disc',
    '[&_ol]:my-2 [&_ol]:pl-5 [&_ol]:list-decimal',
    '[&_li]:my-1',
    '[&_hr]:my-4 [&_hr]:border-t [&_hr]:border-border',
    '[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded',
    '[&_strong]:font-bold [&_em]:italic [&_u]:underline',
    disabled && 'pointer-events-none',
    editorClassName
  );

  const toolbarClasses = join(
    'flex items-center gap-1 p-2 border-b border-border bg-muted/30',
    toolbarClassName
  );

  const toolbarButtonClasses = 'p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const handleToolbarAction = (action: string, value?: string) => {
    if (disabled || readOnly) return;
    
    switch (action) {
      case 'insertImage':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          insertContent(`<img src="${imageUrl}" alt="Image" />`, true);
        }
        break;
      case 'insertHR':
        insertContent('<hr>', true);
        break;
      case 'insertOrderedList':
        formatText('insertOrderedList');
        break;
      case 'insertUnorderedList':
        formatText('insertUnorderedList');
        break;
      case 'formatBlock':
        formatText('formatBlock', value);
        break;
      default:
        formatText(action, value);
    }
  };

  return (
    <div ref={ref} id={editorId} className={containerClasses} data-disabled={disabled} data-readonly={readOnly}>
      {showToolbar && (
        <div className={toolbarClasses}>
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
            <select
              className="text-xs px-2 py-1 rounded border border-border bg-background"
              onChange={(e) => handleToolbarAction('formatBlock', e.target.value)}
              disabled={disabled || readOnly}
            >
              <option value="div">Normal</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
            
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('bold')}
              disabled={disabled || readOnly}
              title="Bold (Ctrl+B)"
            >
              <BoldIcon size={14} />
            </button>
            
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('italic')}
              disabled={disabled || readOnly}
              title="Italic (Ctrl+I)"
            >
              <ItalicIcon size={14} />
            </button>
            
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('underline')}
              disabled={disabled || readOnly}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={14} />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('insertUnorderedList')}
              disabled={disabled || readOnly}
              title="Bullet List"
            >
              <ListUnorderedIcon size={14} />
            </button>
            
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('insertOrderedList')}
              disabled={disabled || readOnly}
              title="Numbered List"
            >
              <ListOrderedIcon size={14} />
            </button>
          </div>

          {/* Media & Elements */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('insertImage')}
              disabled={disabled || readOnly}
              title="Insert Image"
            >
              <ImageIcon size={14} />
            </button>
            
            <button
              type="button"
              className={toolbarButtonClasses}
              onClick={() => handleToolbarAction('insertHR')}
              disabled={disabled || readOnly}
              title="Insert Horizontal Rule"
            >
              <HorizontalRuleIcon size={14} />
            </button>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable={!disabled && !readOnly}
        className={editorClasses}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: placeholder && !state.content ? `<p class="text-muted-foreground">${placeholder}</p>` : state.content }}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-label="Rich text editor"
        aria-multiline="true"
        data-placeholder={placeholder}
      />

      {/* Command Popup */}
      {showCommandPopup.show && (
        <div
          className="absolute z-50 bg-popover border border-border rounded-md shadow-lg p-2 min-w-[200px]"
          style={{
            left: showCommandPopup.position.x,
            top: showCommandPopup.position.y,
          }}
        >
          <div className="text-sm text-muted-foreground mb-2">
            Triggered by: <span className={commandHandlers.find(h => h.trigger === showCommandPopup.trigger)?.color || 'text-primary'}>{showCommandPopup.trigger}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Type to search or press Escape to close
          </div>
        </div>
      )}
    </div>
  );
}