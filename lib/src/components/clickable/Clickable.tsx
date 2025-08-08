import { join } from '../../utils';

interface ClickableProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
  children: React.ReactNode;
  linkTo?: React.HTMLProps<HTMLAnchorElement>['href'];
  linkProps?: Omit<React.HTMLProps<HTMLAnchorElement>, 'href'>;
  onButtonClick?: React.HTMLProps<HTMLButtonElement>['onClick'];
  buttonProps?: Omit<React.HTMLProps<HTMLButtonElement>, 'onClick'>;
}

export default function Clickable({
  children,
  className,
  linkTo,
  linkProps,
  onButtonClick,
  buttonProps,
  ...props
}: ClickableProps) {
  if (linkTo && onButtonClick) {
    console.warn('Clickable: Both "linkTo" and "onButtonClick" props are provided. Only "linkTo" will be used.');
  }

  return (
    <div className={join('relative w-fit', className)} {...props}>
      {children}

      {/* Link */}
      {linkTo && (
        <a
          {...linkProps}
          href={linkTo}
          className={join('absolute inset-0', linkProps?.className)}
          aria-label={linkProps?.['aria-label'] || 'Navigate to link'}
        />
      )}

      {/* Button */}
      {!linkTo && onButtonClick && (
        <button
          {...buttonProps}
          type='button'
          onClick={onButtonClick}
          className={join('absolute inset-0 cursor-pointer', buttonProps?.className)}
        />
      )}
    </div>
  );
}
