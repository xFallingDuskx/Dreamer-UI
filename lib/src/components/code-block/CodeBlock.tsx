import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Dash, Download, Window } from '../../symbols';
import { downloadFile, join } from '../../utils';
import {
  useCopyToClipboard,
  useFullscreenMode,
  useKeyboardShortcuts,
  useTokenClasses,
  useTypeScriptTokenizer,
  type TokenClasses,
} from './hooks';

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
  /** Whether to hide the header bar (buttons will appear in top-right corner) */
  hideHeader?: boolean;
  /** Whether to hide the file type label */
  hideFiletype?: boolean;
  /** Maximum height in pixels before scrolling */
  maxHeight?: number;
  /** Custom token classes for syntax highlighting */
  tokenClasses?: TokenClasses;
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
  allowDownload = false,
  allowFullscreen = false,
  filename,
  showTrafficLights = true,
  showLineNumbers = false,
  hideHeader = false,
  hideFiletype = false,
  maxHeight,
  tokenClasses: customTokenClasses,
  className,
  id,
  ref,
  ...props
}: CodeBlockProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { containerRef } = useFullscreenMode(isFullscreen, setIsFullscreen);
  const { copied, handleCopy } = useCopyToClipboard(code);
  const { mergedTokenClasses } = useTokenClasses(customTokenClasses);
  const { tokenizeTypeScript } = useTypeScriptTokenizer();

  const codeLines = useMemo(() => code.split('\n'), [code]);

  const handleDownload = useCallback(() => {
    const downloadFilename = filename || `code.${getFileExtension(language)}`;
    downloadFile(code, downloadFilename);
  }, [code, filename, language]);

  const { handleKeyDown } = useKeyboardShortcuts(allowCopy, allowFullscreen, handleCopy, () =>
    setIsFullscreen(!isFullscreen)
  );

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      typescript: 'ts',
      tsx: 'tsx',
      ts: 'ts',
    };
    return extensions[lang] || 'ts';
  };

  const renderButtons = useCallback(
    (inHeader = true) => (
      <div className={join('flex items-center space-x-2', !inHeader && 'absolute top-2 right-2 z-10')}>
        {!hideFiletype && (
          <span
            className='text-xs text-gray-400 uppercase tracking-wide font-medium'
            aria-label={`Code language: ${language}`}
          >
            {language}
          </span>
        )}
        {allowFullscreen && (
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className='p-1.5 leading-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] flex items-center justify-center md:min-h-auto md:min-w-auto md:p-1.5'
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
            aria-pressed={isFullscreen}
            type='button'
          >
            {isFullscreen ? <Dash size={14} /> : <Window size={14} />}
          </button>
        )}
        {allowDownload && (
          <button
            onClick={handleDownload}
            className='p-1.5 leading-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] flex items-center justify-center md:min-h-auto md:min-w-auto md:p-1.5'
            title='Download code'
            aria-label='Download code as file'
            type='button'
          >
            <Download size={14} />
          </button>
        )}
        {allowCopy && (
          <button
            onClick={handleCopy}
            className='p-1.5 leading-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px] flex items-center justify-center md:min-h-auto md:min-w-auto md:p-1.5'
            title={copied ? 'Code copied!' : 'Copy code'}
            aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
            aria-live='polite'
            type='button'
          >
            {copied ? <Check size={14} className='text-green-400' /> : <Copy size={14} />}
          </button>
        )}
      </div>
    ),
    [
      hideFiletype,
      language,
      allowFullscreen,
      isFullscreen,
      allowDownload,
      handleDownload,
      allowCopy,
      handleCopy,
      copied,
    ]
  );

  const formattedCode = useMemo(() => {
    let globalJSXContext = false; // Track JSX context across lines
    let globalBraceDepth = 0; // Track JSX expression depth across lines

    return codeLines.map((line, lineIndex) => {
      // Handle empty lines by adding a non-breaking space
      if (line.trim() === '') {
        return (
          <div key={lineIndex} className='leading-6'>
            &nbsp;
          </div>
        );
      }

      const tokens = tokenizeTypeScript(line, globalJSXContext, globalBraceDepth);

      // Update global JSX context based on this line's content
      if (line.includes('<') && line.match(/<[a-zA-Z]/)) {
        globalJSXContext = true;
      }
      if (line.includes('>') && !line.includes('<')) {
        globalJSXContext = false;
        globalBraceDepth = 0; // Reset brace depth when exiting JSX
      }

      // Update global brace depth
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      globalBraceDepth += openBraces - closeBraces;
      if (globalBraceDepth < 0) globalBraceDepth = 0;

      return (
        <div key={lineIndex} className='leading-6'>
          {tokens.map((token, tokenIndex) => {
            return (
              <span key={tokenIndex} className={mergedTokenClasses[token.type] || 'text-gray-100'}>
                {token.text}
              </span>
            );
          })}
        </div>
      );
    });
  }, [codeLines, mergedTokenClasses, tokenizeTypeScript]);

  const lineNumbers = useMemo(() => {
    if (!showLineNumbers) return null;
    return codeLines.map((_, index) => (
      <div
        key={index}
        className='text-gray-500 text-right pl-3 pr-1 select-none min-w-8 text-sm font-mono leading-6'
        aria-hidden='true'
        role='presentation'
      >
        {index + 1}
      </div>
    ));
  }, [showLineNumbers, codeLines]);

  const codeStyle = useMemo(
    () => ({
      maxHeight:
        maxHeight && !isFullscreen
          ? `${maxHeight}px`
          : isFullscreen
          ? hideHeader
            ? 'calc(100vh - 5px)'
            : 'calc(100vh - 45px)'
          : undefined,
      overflow: maxHeight || isFullscreen ? 'auto' : 'visible',
    }),
    [maxHeight, isFullscreen, hideHeader]
  );

  const codeBlockContent = (
    <div
      id={id}
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={join(
        'bg-gray-900 rounded-lg border border-gray-700 overflow-hidden motion-reduce:transition-none',
        isFullscreen && 'fixed inset-0 z-[9999] max-h-fit',
        className
      )}
      data-language={language}
      data-filename={filename}
      data-fullscreen={isFullscreen}
      role='region'
      aria-label={`Code block${filename ? ` for ${filename}` : ''} in ${language}`}
      aria-describedby={showLineNumbers ? `${id}-description` : undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {showLineNumbers && (
        <div id={`${id}-description`} className='sr-only'>
          Code block with line numbers. Use Cmd+C or Ctrl+C to copy code.
          {allowFullscreen && ' Press F to toggle fullscreen.'}
        </div>
      )}

      {/* Live region for copy feedback */}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {copied && 'Code copied to clipboard'}
      </div>

      {/* Header */}
      {!hideHeader && (
        <div className='flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700'>
          <div className='flex items-center space-x-3'>
            {showTrafficLights && (
              <div className='flex space-x-2'>
                <div className='w-3 h-3 bg-red-500 rounded-full' />
                <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                <div className='w-3 h-3 bg-green-500 rounded-full' />
              </div>
            )}
            {filename && <span className='text-sm text-gray-300 font-medium'>{filename}</span>}
          </div>
          {renderButtons(true)}
        </div>
      )}

      {/* Code Content */}
      <div className={join('flex overflow-hidden', hideHeader && 'relative')} style={codeStyle}>
        {hideHeader && renderButtons(false)}
        <div className='flex-1 overflow-x-auto'>
          <div className='flex'>
            {showLineNumbers && (
              <div
                className='bg-gray-800 py-4 border-r border-gray-700 flex flex-col flex-shrink-0'
                aria-hidden='true'
                role='presentation'
              >
                {lineNumbers}
              </div>
            )}
            <div className='flex-1 p-4'>
              <pre
                className='text-sm font-mono focus:outline-none'
                role='code'
                aria-label={`${language} code content`}
                tabIndex={-1}
              >
                <code>{formattedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isFullscreen && codeBlockContent}
      {isFullscreen &&
        createPortal(
          <>
            <div
              className='fixed inset-0 bg-black z-[9998]'
              onClick={() => setIsFullscreen(false)}
              aria-hidden='true'
            />
            {codeBlockContent}
          </>,
          document.body
        )}
    </>
  );
}
