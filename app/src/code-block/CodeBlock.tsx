import { useState } from 'react';
import { Check } from '@moondreamsdev/dreamer-ui/symbols';
import { Copy, Download, Maximize } from './icons';
import { join } from '@moondreamsdev/dreamer-ui/utils';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The code content to display */
  code: string;
  /** Programming language for syntax highlighting (only TS/TSX supported) */
  language?: 'typescript' | 'ts' | 'tsx';
  /** Whether to show copy button */
  allowCopy?: boolean;
  /** Whether to show download button */
  allowDownload?: boolean;
  /** Whether to allow fullscreen mode */
  allowFullscreen?: boolean;
  /** Optional filename to display in header */
  filename?: string;
  /** Whether to show macOS-style traffic light buttons */
  showTrafficLights?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Maximum height in pixels before scrolling */
  maxHeight?: number;
  /** Additional CSS classes */
  className?: string;
  /** Element ID */
  id?: string;
  /** Ref to the container element */
  ref?: React.Ref<HTMLDivElement>;
}

export function CodeBlock({
  code,
  language = 'typescript',
  allowCopy = true,
  allowDownload = true,
  allowFullscreen = true,
  filename,
  showTrafficLights = true,
  showLineNumbers = false,
  maxHeight,
  className,
  id,
  ref,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      typescript: 'ts',
      tsx: 'tsx',
      ts: 'ts'
    };
    return extensions[lang] || 'ts';
  };

  const tokenizeTypeScript = (code: string) => {
    const tokens: Array<{text: string, type: string}> = [];
    let remaining = code;
    let isInJSX = false;

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
      if (isInJSX && remaining.match(/^\/?>/) ) {
        const tagEnd = remaining.match(/^(\/?>\s*)/);
        if (tagEnd) {
          tokens.push({ text: tagEnd[1].trim(), type: 'jsx-bracket' });
          remaining = remaining.slice(tagEnd[1].length);
          isInJSX = false;
          continue;
        }
      }

      // JSX attribute (when in JSX context)
      if (isInJSX) {
        const jsxAttr = remaining.match(/^([a-zA-Z][a-zA-Z0-9]*)\s*=/);
        if (jsxAttr) {
          tokens.push({ text: jsxAttr[1], type: 'jsx-attribute' });
          tokens.push({ text: '=', type: 'plain' });
          remaining = remaining.slice(jsxAttr[0].length);
          continue;
        }
      }

      // JSX expression braces
      const jsxBrace = remaining.match(/^[{}]/);
      if (jsxBrace && isInJSX) {
        tokens.push({ text: jsxBrace[0], type: 'jsx-brace' });
        remaining = remaining.slice(1);
        continue;
      }

      // Keywords
      const keyword = remaining.match(/^(const|let|var|function|if|else|for|while|return|import|export|class|extends|interface|type|enum|async|await|public|private|protected|static|from|as|default|new|this|super|try|catch|finally|throw|break|continue|switch|case|typeof|instanceof)\b/);
      if (keyword) {
        tokens.push({ text: keyword[0], type: 'keyword' });
        remaining = remaining.slice(keyword[0].length);
        continue;
      }

      // React hooks
      const hook = remaining.match(/^(use[A-Z][a-zA-Z]*)\b/);
      if (hook) {
        tokens.push({ text: hook[0], type: 'hook' });
        remaining = remaining.slice(hook[0].length);
        continue;
      }

      // Types
      const type = remaining.match(/^(string|number|boolean|object|any|void|never|unknown|null|undefined|Promise|Array|React\.FC|FC|JSX\.Element|HTMLElement|Event|MouseEvent|KeyboardEvent|ChangeEvent)\b/);
      if (type) {
        tokens.push({ text: type[0], type: 'type' });
        remaining = remaining.slice(type[0].length);
        continue;
      }

      // Function names (before parentheses)
      const func = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/);
      if (func) {
        tokens.push({ text: func[1], type: 'function' });
        remaining = remaining.slice(func[1].length);
        continue;
      }

      // Numbers
      const number = remaining.match(/^(\d+\.?\d*)/);
      if (number) {
        tokens.push({ text: number[0], type: 'number' });
        remaining = remaining.slice(number[0].length);
        continue;
      }

      // Object properties (word followed by colon)
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
  };

  const renderHighlightedCode = () => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const tokens = tokenizeTypeScript(line);
      return (
        <div key={lineIndex} className="leading-6">
          {tokens.map((token, tokenIndex) => {
            const tokenClasses = {
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
              function: 'text-violet-400 font-medium',
              hook: 'text-pink-400 font-semibold',
              plain: 'text-gray-100'
            };
            
            return (
              <span 
                key={tokenIndex} 
                className={tokenClasses[token.type as keyof typeof tokenClasses] || 'text-gray-100'}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const getLineNumbers = () => {
    if (!showLineNumbers) return null;
    const lines = code.split('\n');
    return lines.map((_, index) => (
      <div 
        key={index} 
        className="text-gray-500 text-right pr-4 select-none min-w-8 text-sm font-mono leading-6"
      >
        {index + 1}
      </div>
    ));
  };

  const codeBlockClasses = join(
    'bg-gray-900 rounded-lg border border-gray-700 overflow-hidden',
    isFullscreen && 'fixed inset-0 z-[9999]',
    className
  );

  const codeStyle = {
    maxHeight: maxHeight && !isFullscreen ? `${maxHeight}px` : isFullscreen ? '100vh' : undefined,
    overflow: maxHeight || isFullscreen ? 'auto' : 'visible'
  };

  return (
    <>
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998]"
          onClick={() => setIsFullscreen(false)}
        />
      )}
      <div 
        id={id}
        ref={ref}
        className={codeBlockClasses}
        data-language={language}
        data-filename={filename}
        data-fullscreen={isFullscreen}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            {showTrafficLights && (
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            )}
            {filename && (
              <span className="text-sm text-gray-300 font-medium">{filename}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              {language}
            </span>
            {allowFullscreen && (
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen mode"}
              >
                <Maximize size={14} />
              </button>
            )}
            {allowDownload && (
              <button
                onClick={handleDownload}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Download code"
                aria-label="Download code as file"
              >
                <Download size={14} />
              </button>
            )}
            {allowCopy && (
              <button
                onClick={handleCopy}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Copy code"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Code Content */}
        <div className="flex" style={codeStyle}>
          {showLineNumbers && (
            <div className="bg-gray-800 py-4 border-r border-gray-700 flex flex-col">
              {getLineNumbers()}
            </div>
          )}
          <div className="flex-1 p-4 overflow-x-auto">
            <pre className="text-sm font-mono">
              {renderHighlightedCode()}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
