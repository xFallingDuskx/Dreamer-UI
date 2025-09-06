import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId } from 'react';
import { CodeVariant, codeVariants } from './variants.ts';
import { useFontMetrics } from './hooks.ts';

export interface CodeProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  content: string;
  variant?: CodeVariant;
}

export function Code({ id, ref, content, variant = 'accent', className, style, ...props }: CodeProps) {
  const generatedId = useId()
  const codeId  = id || `code-${generatedId}`;
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
