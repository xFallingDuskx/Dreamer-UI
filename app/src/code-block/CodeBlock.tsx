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

  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const highlightTypeScript = (escapedCode: string): string => {
    return escapedCode
      // Keywords
      .replace(/\b(const|let|var|function|if|else|for|while|return|import|export|class|extends|interface|type|enum|async|await|public|private|protected|static|from|as|default|new|this|super|try|catch|finally|throw|break|continue|switch|case|typeof|instanceof)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
      // Types
      .replace(/\b(string|number|boolean|object|any|void|never|unknown|null|undefined|Promise|Array|React\.FC|FC|JSX\.Element|HTMLElement|Event|MouseEvent|KeyboardEvent|ChangeEvent)\b/g, '<span class="text-cyan-400 font-medium">$1</span>')
      // Strings (including template literals)
      .replace(/(&#039;[^&#039;]*&#039;|&quot;[^&quot;]*&quot;|`[^`]*`)/g, '<span class="text-green-400">$1</span>')
      // JSX/HTML tags
      .replace(/(&lt;\/?\w+(?:\s+[^&gt;]*)?&gt;)/g, '<span class="text-blue-400 font-medium">$1</span>')
      // Object properties and function parameters
      .replace(/(\w+)(\s*:(?!\s*\/))/g, '<span class="text-amber-400">$1</span>$2')
      // Numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400 font-medium">$1</span>')
      // Single line comments
      .replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>')
      // Multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500 italic">$&</span>')
      // Function names
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="text-violet-400 font-medium">$1</span>')
      // React hooks
      .replace(/\b(use[A-Z][a-zA-Z]*)\b/g, '<span class="text-pink-400 font-semibold">$1</span>');
  };

  const getHighlightedCode = (): string => {
    const escapedCode = escapeHtml(code);
    return highlightTypeScript(escapedCode);
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
            <pre className="text-sm leading-6">
              <code 
                className="text-gray-100 font-mono block"
                dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
              />
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
