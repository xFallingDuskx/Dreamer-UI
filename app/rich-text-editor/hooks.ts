import { useCallback, useEffect, useRef, useState } from 'react';

export interface EditorCommand {
  execute: () => void;
  undo: () => void;
}

export interface Selection {
  start: number;
  end: number;
  text: string;
}

export function useUndoRedo() {
  const [history, setHistory] = useState<EditorCommand[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const execute = useCallback((command: EditorCommand) => {
    command.execute();
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(command);
      return newHistory;
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex >= 0) {
      const command = history[currentIndex];
      command.undo();
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const command = history[currentIndex + 1];
      command.execute();
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, history]);

  const canUndo = currentIndex >= 0;
  const canRedo = currentIndex < history.length - 1;

  return { execute, undo, redo, canUndo, canRedo };
}

export function useEditorSelection(editorRef: React.RefObject<HTMLDivElement>) {
  const [selection, setSelection] = useState<Selection | null>(null);

  const getSelection = useCallback((): Selection | null => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return null;

    return {
      start: range.startOffset,
      end: range.endOffset,
      text: sel.toString(),
    };
  }, [editorRef]);

  const saveSelection = useCallback(() => {
    const sel = getSelection();
    setSelection(sel);
  }, [getSelection]);

  const restoreSelection = useCallback(() => {
    if (!selection || !editorRef.current) return;
    
    const sel = window.getSelection();
    if (!sel) return;

    try {
      const range = document.createRange();
      const walker = document.createTreeWalker(
        editorRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );

      let currentOffset = 0;
      let startNode: Node | null = null;
      let endNode: Node | null = null;

      while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        const nodeLength = textNode.textContent?.length || 0;

        if (!startNode && currentOffset + nodeLength >= selection.start) {
          startNode = textNode;
          range.setStart(textNode, selection.start - currentOffset);
        }

        if (!endNode && currentOffset + nodeLength >= selection.end) {
          endNode = textNode;
          range.setEnd(textNode, selection.end - currentOffset);
          break;
        }

        currentOffset += nodeLength;
      }

      if (startNode) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } catch (error) {
      console.warn('Failed to restore selection:', error);
    }
  }, [selection, editorRef]);

  return { selection, getSelection, saveSelection, restoreSelection };
}

export function useAutoLink() {
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  const autoLinkText = useCallback((text: string): string => {
    return text.replace(linkRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }, [linkRegex]);

  const isValidUrl = useCallback((url: string): boolean => {
    return linkRegex.test(url);
  }, [linkRegex]);

  return { autoLinkText, isValidUrl };
}

export function useKeyboardShortcuts(
  editorRef: React.RefObject<HTMLDivElement>,
  commands: { [key: string]: () => void }
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!editorRef.current?.contains(event.target as Node)) return;

      const key = event.key.toLowerCase();
      const modKey = event.ctrlKey || event.metaKey;
      const shortcut = `${modKey ? 'mod+' : ''}${event.shiftKey ? 'shift+' : ''}${key}`;

      if (commands[shortcut]) {
        event.preventDefault();
        commands[shortcut]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editorRef, commands]);
}

export function useEditorContent(initialContent = '') {
  const [content, setContent] = useState(initialContent);
  const editorRef = useRef<HTMLDivElement>(null);

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = newContent;
    }
  }, []);

  const getContent = useCallback(() => {
    return editorRef.current?.innerHTML || content;
  }, [content]);

  const getTextContent = useCallback(() => {
    return editorRef.current?.textContent || '';
  }, []);

  return {
    content,
    editorRef,
    updateContent,
    getContent,
    getTextContent,
  };
}