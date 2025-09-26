import { join } from '../../utils';

export interface ClickableProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
  /** The content to make clickable. */
  children: React.ReactNode;
  /** URL for link functionality. When provided, renders an anchor element. */
  linkTo?: React.HTMLProps<HTMLAnchorElement>['href'];
  /** Additional props to pass to the anchor element when using linkTo. */
  linkProps?: Omit<React.HTMLProps<HTMLAnchorElement>, 'href'>;
  /** Click handler for button functionality. Ignored when linkTo is provided. */
  onButtonClick?: React.HTMLProps<HTMLButtonElement>['onClick'];
  /** Additional props to pass to the button element when using onButtonClick. */
  buttonProps?: Omit<React.HTMLProps<HTMLButtonElement>, 'onClick'>;
}

export function Clickable({
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
          rel={linkProps?.rel || 'noreferrer'}
          href={linkTo}
          className={join('absolute inset-0', linkProps?.className)}
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
