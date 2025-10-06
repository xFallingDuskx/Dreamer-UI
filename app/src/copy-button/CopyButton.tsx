import { Button } from '@moondreamsdev/dreamer-ui/components';
import { Copy, Check } from '@moondreamsdev/dreamer-ui/symbols';
import { useCopy } from './hooks';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';

export interface CopyButtonProps {
  /** The text content to copy to the clipboard. */
  textToCopy: string;
  /** Time in milliseconds to show the "copied" state before reverting to the copy icon (default: 2000ms). */
  delay?: number;
  /** Optional text to display on the button when not copied. */
  children?: React.ReactNode;
  /** Custom icon to display instead of the default Copy icon. */
  icon?: React.ReactNode;
  /** Custom icon to display instead of the default Check icon when copied. */
  copiedIcon?: React.ReactNode;
  /** Whether to show "Copy" and "Copied!" text (default: false). */
  showCopyText?: boolean;
  /** Button variant style. */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link' | 'base';
  /** Button size. */
  size?: 'sm' | 'md' | 'lg' | 'fitted' | 'icon' | 'stripped' | 'full';
  /** Button rounded corners style. */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  /** Additional CSS class name. */
  className?: string;
  /** Unique identifier for the button element. */
  id?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Reference to the button element. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Additional onClick handler to be called after copying. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A button component that copies text to the clipboard and shows visual feedback.
 * Built on top of the Button component with integrated copy functionality.
 * 
 * @example
 * ```tsx
 * // Simple copy button (icon only)
 * <CopyButton textToCopy="Hello, World!" />
 * 
 * // Shows "Copy" and "Copied!" text
 * <CopyButton textToCopy="Hello, World!" showCopyText={true} />
 * 
 * // With custom text
 * <CopyButton textToCopy="npm install dreamer-ui">
 *   Copy Install Command
 * </CopyButton>
 * 
 * // With custom delay and variant
 * <CopyButton 
 *   textToCopy="const hello = 'world';" 
 *   delay={3000}
 *   variant="secondary"
 * >
 *   Copy Code
 * </CopyButton>
 * ```
 */
export function CopyButton({
  textToCopy,
  delay = 2000,
  children,
  icon,
  copiedIcon,
  showCopyText = false,
  className,
  onClick,
  variant,
  size,
  rounded,
  id,
  disabled,
  ref,
}: CopyButtonProps) {
  const { copied, handleCopy } = useCopy(delay);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCopy(textToCopy);
    if (onClick) {
      onClick(e);
    }
  };

  const hasText = children || showCopyText;
  const iconClassName = hasText ? "inline mr-2" : "inline";

  return (
    <Button
      variant={variant}
      size={size}
      rounded={rounded}
      id={id}
      disabled={disabled}
      ref={ref}
      onClick={handleClick}
      className={join(className)}
      data-copied={copied}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          {copiedIcon ?? <Check size={16} className={iconClassName} />}
          {children || (showCopyText && 'Copied!')}
        </>
      ) : (
        <>
          {icon ?? <Copy size={16} className={iconClassName} />}
          {children || (showCopyText && 'Copy')}
        </>
      )}
    </Button>
  );
}
