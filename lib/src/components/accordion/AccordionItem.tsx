import { useId } from 'react';
import { ChevronDown } from '../../symbols';
import { join } from '../../utils';
import { AccordionOption } from './Accordion';

export interface AccordionItemProps extends Omit<AccordionOption, 'defaultOpen'> {
  /** Content to render inside the accordion item. */
  children?: React.ReactNode;
  /** Additional CSS classes to apply to the accordion item. */
  className?: string;
  /** Whether the accordion item is currently open. */
  isOpen?: boolean;
  /** Callback function called when the accordion item is toggled. */
  onToggle?: () => void;
  /** Additional CSS classes to apply to the trigger button. */
  triggerClassName?: string;
  /** Additional CSS classes to apply to the content body. */
  bodyClassName?: string;
}

/**
 * Individual accordion item component with expandable content.
 * Provides keyboard navigation and accessibility features.
 * 
 * @example
 * ```tsx
 * <AccordionItem
 *   title="FAQ Question"
 *   content="This is the answer to the question"
 *   isOpen={false}
 *   onToggle={() => console.log('toggled')}
 * />
 * ```
 */
export function AccordionItem({
  id,
  title,
  content,
  children,
  className = '',
  disabled = false,
  isOpen = false,
  onToggle,
  triggerClassName = '',
  bodyClassName = '',
}: AccordionItemProps) {
  const fallbackId = useId();
  const itemId = id || `accordion-item-${fallbackId}`;
  const headerId = `${itemId}-header`;
  const panelId = `${itemId}-panel`;

  const handleToggle = () => {
    if (!disabled && onToggle) {
      onToggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={join('border-b border-gray-200', disabled && 'opacity-60 cursor-not-allowed', className)}>
      <button
        id={headerId}
        type='button'
        className={join(
          'w-full text-left py-3 px-4 flex justify-between items-center focus:outline focus:outline-secondary',
          disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50/10 cursor-pointer',
          triggerClassName
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span>{title}</span>
        <span
          className={join(
            'transform transition-transform ease-linear',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
          aria-hidden='true'
        >
          <ChevronDown size={18} />
        </span>
      </button>

      <div
        id={panelId}
        role='region'
        aria-labelledby={headerId}
        className={join(
          'transition-all ease-linear px-4',
          isOpen ? 'max-h-96 opacity-100 overflow-auto py-3' : 'max-h-0 opacity-0 overflow-hidden',
          bodyClassName
        )}
      >
        {isOpen && (children || content)}
      </div>
    </div>
  );
}
