export type TabsWidth = 'fit' | 'full';
export type TabsVariant = 'underline' | 'pills' | 'bordered';

export const tabsListVariants = {
  width: {
    fit: 'w-fit',
    full: 'w-full *:flex-1',
  },
  variant: {
    underline: 'border-b border-border',
    pills: '',
    bordered: 'border border-border rounded-lg p-1',
  },
};

export const tabTriggerVariants = {
  underline:
    'border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent hover:text-accent/80',
  pills: 'rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/30',
  bordered: 'rounded data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/30',
};
