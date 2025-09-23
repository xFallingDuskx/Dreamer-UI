import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@moondreamsdev/dreamer-ui/components';
import { Input } from '@moondreamsdev/dreamer-ui/components';
import { X } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useSearchContent } from './hooks';
import { Search } from './icons';

export interface SearchBarProps {
  id?: string;
  className?: string;
}

export function SearchBar({ id, className }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, isLoading } = useSearchContent(query);

  // Handle Command+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultSelect = (result: any) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        id={id}
        className={join(
          'flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-background/50 border border-border rounded-md hover:border-accent/50 transition-colors min-w-[240px]',
          className
        )}
        onClick={() => setIsOpen(true)}
        data-search-trigger
      >
        <Search className="w-4 h-4" />
        <span>Search documentation...</span>
        <div className="ml-auto flex items-center gap-1 text-xs">
          <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border/50 rounded text-[10px] font-mono">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border/50 rounded text-[10px] font-mono">
            K
          </kbd>
        </div>
      </button>

      {/* Search modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="max-w-2xl"
        overlayClassName="backdrop-blur-sm"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components, examples, and documentation..."
              className="flex-1 border-none bg-transparent focus:ring-0 text-lg"
              autoComplete="off"
            />
            <button
              onClick={handleClose}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {query && (
            <div className="border-t border-border pt-4">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-8">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {results.slice(0, 8).map((result, index) => (
                    <button
                      key={`${result.path}-${index}`}
                      onClick={() => handleResultSelect(result)}
                      className="w-full text-left p-3 hover:bg-muted/50 rounded-md transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                            {result.title}
                          </div>
                          {result.description && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {result.description}
                            </div>
                          )}
                          {result.section && (
                            <div className="text-xs text-muted-foreground/70 mt-1">
                              {result.section}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground/50">
                          {result.type}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="border-t border-border pt-4">
              <div className="text-sm text-muted-foreground mb-3">
                Quick navigation
              </div>
              <div className="space-y-2">
                {[
                  { title: 'Getting Started', path: '/getting-started', type: 'Guide' },
                  { title: 'All Components', path: '/components', type: 'Overview' },
                  { title: 'Button', path: '/components/button', type: 'Component' },
                  { title: 'Input', path: '/components/input', type: 'Component' },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleResultSelect(item)}
                    className="w-full text-left p-2 hover:bg-muted/50 rounded transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground/50">
                        {item.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}