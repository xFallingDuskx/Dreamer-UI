export const codeVariants = {
  base: '',
  modest: 'opacity-90 bg-muted/10',
  accent: 'text-accent bg-muted/10',
  current: 'text-current bg-current/10',
};

export type CodeVariant = keyof typeof codeVariants;
