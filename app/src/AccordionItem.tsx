// REMOVE this file
import { useId } from 'react';
import { join } from './join';
import { AccordionOption } from './Accordion';
import ChevronDown from './ChevronDown';

export interface AccordionItemProps extends Omit<AccordionOption, 'defaultOpen'> {
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  id,
  title,
  content,
  children,
  className = '',
  disabled = false,
  isOpen = false,
  onToggle,
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
          disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50/10 cursor-pointer'
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
            'transform transition-transform duration-300 ease-out',
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
          'overflow-hidden transition-all duration-300 ease-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className='py-3 px-4'>{content || children}</div>
      </div>
    </div>
  );
}
