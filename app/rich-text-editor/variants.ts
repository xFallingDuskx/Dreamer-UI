export const richTextEditorVariants = {
  size: {
    sm: 'min-h-[200px] text-sm',
    md: 'min-h-[300px] text-base',
    lg: 'min-h-[400px] text-lg',
  },
  variant: {
    default: 'border border-border bg-background',
    minimal: 'border-0 bg-transparent',
    filled: 'border-0 bg-muted/20',
    outlined: 'border-2 border-border bg-background',
  },
};

export const toolbarVariants = {
  size: {
    sm: 'h-8 px-1',
    md: 'h-10 px-2', 
    lg: 'h-12 px-3',
  },
  variant: {
    default: 'bg-muted/10 border-b border-border',
    minimal: 'bg-transparent border-0',
    filled: 'bg-muted/30',
  },
};

export const toolbarButtonVariants = {
  size: {
    sm: 'h-6 w-6 p-1 text-xs',
    md: 'h-8 w-8 p-2 text-sm',
    lg: 'h-10 w-10 p-2.5 text-base',
  },
  state: {
    default: 'text-foreground hover:bg-accent hover:text-accent-foreground',
    active: 'bg-accent text-accent-foreground',
    disabled: 'text-muted-foreground cursor-not-allowed opacity-50',
  },
};

export type RichTextEditorSize = keyof typeof richTextEditorVariants.size;
export type RichTextEditorVariant = keyof typeof richTextEditorVariants.variant;
export type ToolbarSize = keyof typeof toolbarVariants.size;
export type ToolbarVariant = keyof typeof toolbarVariants.variant;
export type ToolbarButtonSize = keyof typeof toolbarButtonVariants.size;