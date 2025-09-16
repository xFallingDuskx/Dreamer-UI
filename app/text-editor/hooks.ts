import { useCallback, useEffect, useRef, useState } from 'react';

export interface CommandHandler {
  trigger: string;
  color?: string;
  onTrigger: (text: string, position: number) => void;
}

export interface TextEditorState {
  content: string;
  selectionStart: number;
  selectionEnd: number;
}

export function useTextEditor(
  initialContent: string = '',
  commandHandlers: CommandHandler[] = []
) {
  const [state, setState] = useState<TextEditorState>({
    content: initialContent,
    selectionStart: 0,
    selectionEnd: 0,
  });
  
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCommandPopup, setShowCommandPopup] = useState<{
    show: boolean;
    trigger: string;
    position: { x: number; y: number };
    text: string;
  }>({ show: false, trigger: '', position: { x: 0, y: 0 }, text: '' });

  // Handle content changes
  const handleContentChange = useCallback((newContent: string) => {
    setState(prev => ({ ...prev, content: newContent }));
  }, []);

  // Handle special commands (@ and # by default)
  const handleInput = useCallback((event: Event) => {
    const target = event.target as HTMLDivElement;
    const content = target.textContent || '';
    
    // Check for command triggers
    const caretPosition = getCaretPosition(target);
    const textBeforeCaret = content.substring(0, caretPosition);
    
    for (const handler of commandHandlers) {
      const triggerIndex = textBeforeCaret.lastIndexOf(handler.trigger);
      if (triggerIndex >= 0 && triggerIndex === caretPosition - 1) {
        // Show command popup
        const rect = target.getBoundingClientRect();
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const caretRect = selection.getRangeAt(0).getBoundingClientRect();
          setShowCommandPopup({
            show: true,
            trigger: handler.trigger,
            position: { x: caretRect.left, y: caretRect.bottom + 5 },
            text: textBeforeCaret.substring(triggerIndex + 1),
          });
        }
        break;
      }
    }
    
    handleContentChange(content);
  }, [commandHandlers, handleContentChange]);

  // Get caret position in contentEditable element
  const getCaretPosition = (element: HTMLDivElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(element);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    return preSelectionRange.toString().length;
  };

  // Format text (bold, italic, etc.)
  const formatText = useCallback((command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  }, []);

  // Insert content at cursor
  const insertContent = useCallback((content: string, html: boolean = false) => {
    if (editorRef.current) {
      editorRef.current.focus();
      if (html) {
        document.execCommand('insertHTML', false, content);
      } else {
        document.execCommand('insertText', false, content);
      }
    }
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key, ctrlKey, metaKey } = event;
    const isCmd = ctrlKey || metaKey;

    if (isCmd) {
      switch (key) {
        case 'b':
          event.preventDefault();
          formatText('bold');
          break;
        case 'i':
          event.preventDefault();
          formatText('italic');
          break;
        case 'u':
          event.preventDefault();
          formatText('underline');
          break;
      }
    }
    
    // Close command popup on escape
    if (key === 'Escape') {
      setShowCommandPopup(prev => ({ ...prev, show: false }));
    }
  }, [formatText]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('input', handleInput);
      return () => editor.removeEventListener('input', handleInput);
    }
  }, [handleInput]);

  return {
    state,
    editorRef,
    showCommandPopup,
    setShowCommandPopup,
    handleContentChange,
    formatText,
    insertContent,
    handleKeyDown,
  };
}