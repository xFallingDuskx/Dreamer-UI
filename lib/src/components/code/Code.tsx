import React, { useId } from 'react';
import { join } from '../../utils';
import { useFontMetrics } from './hooks';
import { CodeVariant, codeVariants } from './variants';

export interface CodeProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Unique identifier for the code element. */
  id?: string;
  /** Reference to the code element. */
  ref?: React.Ref<HTMLElement>;
  /** The code content to display. */
  content: string;
  /** The visual style variant of the code. */
  variant?: CodeVariant;
}

/**
 * An inline code component for displaying short code snippets within text.
 * Automatically adjusts font metrics and provides different visual variants.
 * 
 * @example
 * ```tsx
 * // Basic inline code
 * <p>Use the <Code content="useState" /> hook for state management.</p>
 * 
 * // Different variants
 * <Code content="const foo = 'bar'" variant="muted" />
 * <Code content="npm install react" variant="accent" />
 * ```
 */
export function Code({ id, ref, content, variant = 'accent', className, style, ...props }: CodeProps) {
  const generatedId = useId();
  const codeId = id || `code-${generatedId}`;
  const fontMetrics = useFontMetrics(codeId);

  return (
    <code
      id={codeId}
      ref={ref}
      className={join('px-2 py-1 rounded', codeVariants[variant], className)}
      data-variant={variant}
      style={{
        fontSize: fontMetrics ? `${fontMetrics.smallerFontSize}px` : undefined,
        lineHeight: fontMetrics ? `${fontMetrics.smallerLineHeight}px` : undefined,
        ...style,
      }}
      {...props}
    >
      {content}
    </code>
  );
}
