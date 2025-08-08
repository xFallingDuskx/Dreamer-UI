import { join } from '@moondreamsdev/dreamer-ui/utils';

interface ClickableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: React.ReactNode;
  to?: React.HTMLProps<HTMLAnchorElement>['href'];
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
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
  return (
    <div className={join('relative w-fit', className)} {...props}>
      {children}

      {/* Link */}
      {to && <a {...linkProps} href={to} className={join('absolute inset-0', linkProps?.className)} />}

      {/* Button */}
      {onClick && (
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
