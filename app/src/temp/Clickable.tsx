import { join } from '@moondreamsdev/dreamer-ui/utils';

interface ClickableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: React.ReactNode;
  to?: React.HTMLProps<HTMLAnchorElement>['href'];
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  linkProps?: Omit<React.HTMLProps<HTMLAnchorElement>, 'href'>;
  buttonProps?: Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;
}

export default function Clickable({
  children,
  className,
  to,
  onClick,
  linkProps,
  buttonProps,
  ...props
}: ClickableProps) {
  if (to && onClick) {
    console.warn('Clickable: Both "to" and "onClick" props are provided. Only "to" will be used.');
  }

  return (
    <div className={join('relative w-fit', className)} {...props}>
      {children}

      {/* Link */}
      {to && (
        <a
          {...linkProps}
          href={to}
          className={join('absolute inset-0', linkProps?.className)}
          aria-label={linkProps?.['aria-label'] || 'Navigate to link'}
        />
      )}

      {/* Button */}
      {!to && onClick && (
        <button
          {...buttonProps}
          type='button'
          onClick={onClick}
          className={join('absolute inset-0 cursor-pointer', buttonProps?.className)}
        />
      )}
    </div>
  );
}
