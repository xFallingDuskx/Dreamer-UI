import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { CodeVariant, codeVariants } from './variants.ts';

export interface CodeProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  content: string;
  variant?: CodeVariant;
}

export function Code({ id, ref, content, variant = 'default', className, ...props }: CodeProps) {
  return (
    <code
      id={id}
      ref={ref}
      className={join('px-2 py-1 rounded', codeVariants[variant], className)}
      data-variant={variant}
      {...props}
    >
      {content}
    </code>
  );
}
