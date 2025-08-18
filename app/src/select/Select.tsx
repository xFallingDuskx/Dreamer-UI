import React, { useState, useRef, useEffect, useMemo } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { ChevronDown, Check, X } from './icons';
import { useSelectDropdown, useSelectKeyboardNavigation, SelectOption } from './hooks';
import { sizeVariants, SelectSize } from './variants';

export type { SelectOption };

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  size?: SelectSize;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  onChange?: (value: string) => void;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;
}

export default function Select({
  options,
  value,
  placeholder = 'Select an option...',
  searchable = false,
  disabled = false,
  clearable = false,
  size = 'md',
  className,
  triggerClassName,
  dropdownClassName,
  id,
  ref,
  onChange,
  onSearch,
  searchPlaceholder = 'Search options...',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const { show, shouldRender } = useSelectDropdown(isOpen);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter(
      (option) =>
        option.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchable, searchTerm]);

  // Reset highlighted index when options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && shouldRender && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable, shouldRender]);

  // Auto-scroll to highlighted option
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsContainerRef.current) {
      const container = optionsContainerRef.current;
      const highlightedOption = container.querySelector(`[data-option-index="${highlightedIndex}"]`) as HTMLElement;
      
      if (highlightedOption) {
        highlightedOption.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [highlightedIndex]);

  const { handleKeyDown } = useSelectKeyboardNavigation({
    isOpen,
    setIsOpen,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    onSelect: (option: SelectOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
        setSearchTerm('');
      }
    },
    triggerRef,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch?.(term);
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.('');
  };

  return (
    <div
      className={join('relative', className)}
      id={id}
      ref={ref}
      data-select='true'
      data-value={value}
      data-searchable={searchable}
      data-disabled={disabled}
      data-clearable={clearable}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type='button'
        className={join(
          'flex items-center justify-between w-full text-left bg-inherit border border-border rounded-md transition-colors',
          'hover:border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
          disabled && 'opacity-50 cursor-not-allowed hover:border-border',
          isOpen && 'border-primary ring-1 ring-primary',
          sizeVariants[size].trigger,
          triggerClassName
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={selectedOption ? selectedOption.text : placeholder}
        data-select-trigger='true'
      >
        <span className={join('block truncate', !selectedOption && 'opacity-70')}>
          {selectedOption ? selectedOption.text : placeholder}
        </span>
        <div className='flex items-center ml-2'>
          {clearable && selectedOption && (
            <button
              type='button'
              onClick={handleClear}
              className='p-0.5 rounded hover:bg-accent/20 transition-colors mr-1 group'
              aria-label='Clear selection'
              data-select-clear='true'
            >
              <X size={14} className='opacity-70 group-hover:opacity-100 transition-opacity' />
            </button>
          )}
          <ChevronDown size={16} className={join('transition-transform duration-200', isOpen && 'rotate-180')} />
        </div>
      </button>

      {/* Dropdown */}
      {shouldRender && (
        <div
          ref={dropdownRef}
          className={join(
            'absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg transition-all duration-150',
            show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
            dropdownClassName
          )}
          role='listbox'
          data-select-content='true'
        >
          {/* Search Input */}
          {searchable && (
            <div className='border-b border-border'>
              <input
                ref={searchInputRef}
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className='w-full px-2 py-2 text-inherit focus:outline-none'
                data-select-search='true'
              />
            </div>
          )}

          {/* Options */}
          <div ref={optionsContainerRef} className='max-h-60 overflow-auto'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={join(
                    'flex items-center cursor-pointer transition-colors',
                    'hover:bg-accent/10 focus:bg-accent/10',
                    sizeVariants[size].options,
                    option.disabled && 'opacity-50 cursor-not-allowed',
                    index === highlightedIndex && 'bg-accent/20',
                    value === option.value && 'bg-accent/30'
                  )}
                  onClick={() => handleOptionClick(option)}
                  role='option'
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                  data-select-option='true'
                  data-value={option.value}
                  data-highlighted={index === highlightedIndex}
                  data-option-index={index}
                >
                  <div className='flex-1 min-w-0'>
                    <div className='font-medium'>{option.text}</div>
                    {option.description && <div className='text-xs opacity-70 mt-0.5'>{option.description}</div>}
                  </div>
                  {value === option.value && <Check size={16} className='ml-2 text-primary flex-shrink-0' />}
                </div>
              ))
            ) : (
              <div className='px-3 py-2 text-sm opacity-70 text-center'>
                {searchable && searchTerm ? 'No results found' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
