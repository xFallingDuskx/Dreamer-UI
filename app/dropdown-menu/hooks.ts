import { useCallback, useEffect } from 'react';
import { DropdownMenuContextFocus } from './DropdownContext';

export function getItemElements(menuEl: HTMLElement, level: number) {
  return Array.from(menuEl.querySelectorAll<HTMLElement>(`[data-menu-item][data-level="${level}"]`));
}

interface UseKeyboardNavigationProps {
  focus: DropdownMenuContextFocus | null;
  setFocus: (focus: DropdownMenuContextFocus | null) => void;
  isOpen: boolean;
  onItemSelect: (value: string) => void;
  onClose: () => void;
}

export function useKeyboardNavigation({ focus, setFocus, isOpen, onItemSelect, onClose }: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      const { level: focusLevel, index: focusedIndex } = focus || { level: 1, index: null };

      const menu = document.querySelector<HTMLElement>(`[data-menu][data-level="${focusLevel}"]`) as HTMLElement;
      if (!menu) return;

      const itemElements = getItemElements(menu, focusLevel);
      if (itemElements.length === 0) return;

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          const nextIndex = focusedIndex === null ? 0 : (focusedIndex + 1) % itemElements.length;
          setFocus({ level: focusLevel, index: nextIndex });
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          const prevIndex =
            focusedIndex === null
              ? itemElements.length - 1
              : (focusedIndex - 1 + itemElements.length) % itemElements.length;
          setFocus({ level: focusLevel, index: prevIndex });
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          if (focusedIndex !== null) {
            const el = itemElements[focusedIndex];
            const submenu = el.querySelector<HTMLElement>('[data-menu]');

            if (submenu) {
              // focus first submenu item
              const firstSubItem = submenu.querySelector<HTMLElement>('[data-menu-item]');

              if (firstSubItem) {
                setFocus({ level: focusLevel + 1, index: 0 });
              }
            }
          }
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          // go back to parent menu if inside submenu
          const parentMenuItem = menu.parentElement?.closest<HTMLElement>('[data-menu-item]') as HTMLElement;

          if (!parentMenuItem) {
            console.error(`No parent menu found leaving menu level ${focusLevel}`);
            return;
          }

          const parentMenuIndex = parentMenuItem.getAttribute('data-index')
            ? Number(parentMenuItem.getAttribute('data-index'))
            : -1;

          if (parentMenuItem) {
            setFocus({ level: focusLevel - 1, index: parentMenuIndex === -1 ? 0 : parentMenuIndex });
          }
          break;
        }
        case 'Enter': {
          event.preventDefault();
          if (focusedIndex !== null) {
            const el = itemElements[focusedIndex];
            el?.click();

            const value = el?.getAttribute('data-menu-item');
            if (value) {
              onItemSelect?.(value);
            }
            setFocus(null);
          }
          break;
        }
        case 'Escape': {
          event.preventDefault();
          onClose?.();
          setFocus(null);
          break;
        }
        case 'Tab': {
          onClose();
          break;
        }
      }
    },
    [isOpen, focus, setFocus, onItemSelect, onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  return { handleKeyDown };
}
