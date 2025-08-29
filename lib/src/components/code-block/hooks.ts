import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [text]);

  return { copied, handleCopy };
}

/**
 * Hook for managing fullscreen mode with focus management and body scroll prevention
 */
export function useFullscreenMode(isFullscreen: boolean, setIsFullscreen: (value: boolean) => void) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFullscreen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent document scrolling
      document.body.style.overflow = 'hidden';

      // Focus the container in fullscreen mode
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);

      // Trap focus within the fullscreen container
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore document scrolling
        document.body.style.overflow = '';
      };
    } else if (previousActiveElement.current) {
      // Restore focus when exiting fullscreen
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isFullscreen, setIsFullscreen]);

  return { containerRef };
}

/**
 * Hook for keyboard navigation shortcuts
 */
export function useKeyboardShortcuts(
  allowCopy: boolean,
  allowFullscreen: boolean,
  onCopy: () => void,
  onToggleFullscreen: () => void
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'c' && (e.metaKey || e.ctrlKey) && allowCopy) {
        e.preventDefault();
        onCopy();
      } else if (e.key === 'f' && allowFullscreen) {
        e.preventDefault();
        onToggleFullscreen();
      }
    },
    [allowCopy, allowFullscreen, onCopy, onToggleFullscreen]
  );

  return { handleKeyDown };
}

/**
 * Token classes type (duplicated from main component for hook independence)
 */
export interface TokenClasses {
  keyword?: string;
  type?: string;
  string?: string;
  'jsx-bracket'?: string;
  'jsx-tag'?: string;
  'jsx-attribute'?: string;
  'jsx-brace'?: string;
  jsx?: string;
  property?: string;
  number?: string;
  comment?: string;
  function?: string;
  hook?: string;
  operator?: string;
  plain?: string;
}

export type TokenType = keyof TokenClasses;

/**
 * Hook for TypeScript/TSX tokenization
 */
export function useTypeScriptTokenizer() {
  const tokenizeTypeScript = useCallback(
    (code: string, inheritedJSXContext: boolean = false, inheritedBraceDepth: number = 0) => {
      const tokens: Array<{ text: string; type: TokenType }> = [];
      let remaining = code;
      let isInJSX = inheritedJSXContext;
      let jsxBraceDepth = inheritedBraceDepth; // Track JSX expression depth

      while (remaining.length > 0) {
        // Multi-line comments
        const multiComment = remaining.match(/^\/\*[\s\S]*?\*\//);
        if (multiComment) {
          tokens.push({ text: multiComment[0], type: 'comment' });
          remaining = remaining.slice(multiComment[0].length);
          continue;
        }

        // Single line comments
        const singleComment = remaining.match(/^\/\/.*$/m);
        if (singleComment) {
          tokens.push({ text: singleComment[0], type: 'comment' });
          remaining = remaining.slice(singleComment[0].length);
          continue;
        }

        // Strings
        const stringMatch = remaining.match(/^(`[^`]*`|"[^"]*"|'[^']*')/);
        if (stringMatch) {
          tokens.push({ text: stringMatch[0], type: 'string' });
          remaining = remaining.slice(stringMatch[0].length);
          continue;
        }

        // JSX opening tag start
        const jsxOpenStart = remaining.match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
        if (jsxOpenStart) {
          tokens.push({ text: '<', type: 'jsx-bracket' });
          tokens.push({ text: jsxOpenStart[1], type: 'jsx-tag' });
          remaining = remaining.slice(jsxOpenStart[0].length);
          isInJSX = true;
          continue;
        }

        // JSX closing tag
        const jsxClose = remaining.match(/^<\/([a-zA-Z][a-zA-Z0-9]*)>/);
        if (jsxClose) {
          tokens.push({ text: '</', type: 'jsx-bracket' });
          tokens.push({ text: jsxClose[1], type: 'jsx-tag' });
          tokens.push({ text: '>', type: 'jsx-bracket' });
          remaining = remaining.slice(jsxClose[0].length);
          isInJSX = false;
          continue;
        }

        // JSX self-closing or tag end
        if (remaining.match(/^\/?>/)) {
          const tagEnd = remaining.match(/^(\/?>\s*)/);
          if (tagEnd) {
            tokens.push({ text: tagEnd[1].trim(), type: 'jsx-bracket' });
            remaining = remaining.slice(tagEnd[1].length);
            if (tagEnd[1].includes('>')) {
              isInJSX = false;
            }
            continue;
          }
        }

        // JSX attribute (only when explicitly in JSX context, followed by =, and not inside braces)
        const jsxAttr = remaining.match(/^([a-zA-Z][a-zA-Z0-9]*)(\s*)(=)/);
        if (jsxAttr && isInJSX && jsxBraceDepth === 0) {
          tokens.push({ text: jsxAttr[1], type: 'jsx-attribute' });
          if (jsxAttr[2]) {
            // Whitespace before =
            tokens.push({ text: jsxAttr[2], type: 'plain' });
          }
          tokens.push({ text: '=', type: 'plain' });
          remaining = remaining.slice(jsxAttr[0].length);
          continue;
        }

        // JSX expression braces
        const jsxBrace = remaining.match(/^[{}]/);
        if (jsxBrace) {
          tokens.push({ text: jsxBrace[0], type: 'jsx-brace' });
          if (jsxBrace[0] === '{') {
            jsxBraceDepth++;
          } else if (jsxBrace[0] === '}') {
            jsxBraceDepth--;
          }
          remaining = remaining.slice(1);
          continue;
        }

        // Whitespace (preserve spaces)
        const whitespace = remaining.match(/^\s+/);
        if (whitespace) {
          tokens.push({ text: whitespace[0], type: 'plain' });
          remaining = remaining.slice(whitespace[0].length);
          continue;
        }

        // Operators (including arrow functions)
        const operator = remaining.match(/^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:;,()[\]{}.])/);
        if (operator) {
          tokens.push({ text: operator[0], type: 'operator' });
          remaining = remaining.slice(operator[0].length);
          continue;
        }

        // Keywords
        const keyword = remaining.match(
          /^(const|let|var|function|if|else|for|while|return|import|export|class|extends|interface|type|enum|async|await|public|private|protected|static|from|as|default|new|this|super|try|catch|finally|throw|break|continue|switch|case|typeof|instanceof)\b/
        );
        if (keyword) {
          tokens.push({ text: keyword[0], type: 'keyword' });
          remaining = remaining.slice(keyword[0].length);
          continue;
        }

        // React hooks (before function calls to avoid conflicts)
        const hook = remaining.match(/^(use[A-Z][a-zA-Z]*)\b/);
        if (hook) {
          tokens.push({ text: hook[0], type: 'hook' });
          remaining = remaining.slice(hook[0].length);
          continue;
        }

        // Function calls (word followed by opening parenthesis or optional chaining)
        const func = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=(\?\.)?\()/);
        if (func) {
          tokens.push({ text: func[1], type: 'function' });
          remaining = remaining.slice(func[1].length);
          continue;
        }

        // Types
        const type = remaining.match(
          /^(string|number|boolean|object|any|void|never|unknown|null|undefined|Promise|Array|React\.FC|FC|JSX\.Element|HTMLElement|Event|MouseEvent|KeyboardEvent|ChangeEvent)\b/
        );
        if (type) {
          tokens.push({ text: type[0], type: 'type' });
          remaining = remaining.slice(type[0].length);
          continue;
        }

        // Numbers
        const number = remaining.match(/^(\d+\.?\d*)/);
        if (number) {
          tokens.push({ text: number[0], type: 'number' });
          remaining = remaining.slice(number[0].length);
          continue;
        }

        // Object properties (word followed by colon, not in JSX)
        const property = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=:)/);
        if (property && !isInJSX) {
          tokens.push({ text: property[1], type: 'property' });
          remaining = remaining.slice(property[1].length);
          continue;
        }

        // If nothing matched, take one character as plain text
        tokens.push({ text: remaining[0], type: 'plain' });
        remaining = remaining.slice(1);
      }

      return tokens;
    },
    []
  );

  return { tokenizeTypeScript };
}

/**
 * Hook for managing merged token classes with defaults
 */
export function useTokenClasses(customTokenClasses?: TokenClasses) {
  const mergedTokenClasses = useMemo(() => {
    const defaultTokenClasses: TokenClasses = {
      keyword: 'text-purple-400 font-semibold',
      type: 'text-cyan-400 font-medium',
      string: 'text-green-400',
      'jsx-bracket': 'text-gray-400',
      'jsx-tag': 'text-blue-400 font-medium',
      'jsx-attribute': 'text-amber-400',
      'jsx-brace': 'text-yellow-400',
      jsx: 'text-blue-400 font-medium', // fallback for old jsx type
      property: 'text-amber-400',
      number: 'text-orange-400 font-medium',
      comment: 'text-gray-500 italic',
      function: 'text-rose-400 font-semibold',
      hook: 'text-rose-400 font-semibold',
      operator: 'text-gray-300',
      plain: 'text-gray-100',
    };
    return { ...defaultTokenClasses, ...customTokenClasses };
  }, [customTokenClasses]);

  return { mergedTokenClasses };
}
