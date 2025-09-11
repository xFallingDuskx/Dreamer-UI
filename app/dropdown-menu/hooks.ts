import { useCallback } from 'react';
import { useDropdownMenuContext } from './DropdownContext';

export function getItemElements(menuEl: HTMLElement, level: number) {
  return Array.from(menuEl.querySelectorAll<HTMLElement>(`[data-menu-item][data-level="${level}"]`));
}

export function useKeyboardNavigation({
  focusedIndex,
  setFocusedIndex,
  level,
}: {
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  level: number;
}) {
  const { isOpen, onItemSelect, onClose } = useDropdownMenuContext();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) return;

      const menu = event.currentTarget as HTMLElement;

      const itemElements = getItemElements(menu, level);
      if (itemElements.length === 0) return;

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          const nextIndex = focusedIndex === null ? 0 : (focusedIndex + 1) % itemElements.length;
          setFocusedIndex(nextIndex);
          itemElements[nextIndex]?.focus();
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          const prevIndex =
            focusedIndex === null
              ? itemElements.length - 1
              : (focusedIndex - 1 + itemElements.length) % itemElements.length;
          setFocusedIndex(prevIndex);
          itemElements[prevIndex]?.focus();
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          if (focusedIndex !== null) {
            const el = itemElements[focusedIndex];
            const submenu = el.querySelector<HTMLElement>('[data-menu]');

            console.log('el', el); // REMOVE
            console.log('submenu', submenu); // REMOVE
            if (submenu) {
              // focus first submenu item
              const firstSubItem = submenu.querySelector<HTMLElement>('[data-menu-item]');
              firstSubItem?.focus();
            }
          }
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          // go back to parent menu if inside submenu
          const parentMenuItem = menu.parentElement?.closest<HTMLElement>('[data-menu-item]');
          if (parentMenuItem) {
            parentMenuItem.focus();
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
          }
          break;
        }
        case 'Escape': {
          event.preventDefault();
          onClose?.();
          break;
        }
      }
    },
    [isOpen, focusedIndex, setFocusedIndex, onItemSelect, onClose, level]
  );

  return { handleKeyDown };
}
