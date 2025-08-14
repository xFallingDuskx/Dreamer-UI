export type TabsWidth = 'fit' | 'equal';
export type TabsVariant = 'underline' | 'pills' | 'bordered';

export const tabsListVariants = {
  width: {
    fit: 'w-fit',
    equal: 'w-full *:flex-1',
  },
  variant: {
    underline: 'border-b border-border',
    pills: '',
    bordered: 'border border-border rounded-lg p-1',
  },
};

export const tabTriggerVariants = {
  base: 'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variant: {
    underline:
      'border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent hover:text-accent-foreground',
    pills: 'rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/30',
    bordered: 'rounded data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/30',
  },
};

export const tabContentVariants = {
  base: 'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
};
