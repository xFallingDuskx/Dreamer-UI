import { useState, useCallback, useRef } from 'react';

export type DynamicListItem<T extends object> = T & {
  id: string;
  content: string;
}

export function useDynamicList<T extends object>(initialItems: DynamicListItem<T>[] = []) {
  const [items, setItems] = useState<DynamicListItem<T>[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<DynamicListItem<T> | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const draggedFromIndex = useRef<number | null>(null);

  const addItem = useCallback((content: string, extra?: Partial<T>) => {
    const newItem: DynamicListItem<T> = {
      ...(extra as T),
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      content,
    };
    setItems(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    setItems(prev => {
      const newItems = [...prev];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  }, []);

  const moveItemUp = useCallback((index: number) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  }, [moveItem]);

  const moveItemDown = useCallback((index: number) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  }, [moveItem, items.length]);

  // Drag and drop handlers
  const handleDragStart = useCallback((item: DynamicListItem<T>, index: number) => {
    setDraggedItem(item);
    draggedFromIndex.current = index;
    setDraggedOverIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedItem && draggedOverIndex !== null && draggedFromIndex.current !== null) {
      const fromIndex = draggedFromIndex.current;
      const toIndex = draggedOverIndex;
      
      if (fromIndex !== toIndex) {
        moveItem(fromIndex, toIndex);
      }
    }
    
    setDraggedItem(null);
    setDraggedOverIndex(null);
    draggedFromIndex.current = null;
  }, [draggedItem, draggedOverIndex, moveItem]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  // Get items with visual drag feedback
  const getVisualItems = useCallback(() => {
    if (!draggedItem || draggedOverIndex === null || draggedFromIndex.current === null) {
      return items;
    }

    const fromIndex = draggedFromIndex.current;
    const toIndex = draggedOverIndex;

    if (fromIndex === toIndex) {
      return items;
    }

    // Create a copy of items with the dragged item moved to the hover position
    const visualItems = [...items];
    const [movedItem] = visualItems.splice(fromIndex, 1);
    visualItems.splice(toIndex, 0, movedItem);
    
    return visualItems;
  }, [items, draggedItem, draggedOverIndex, draggedFromIndex]);

  return {
    items,
    visualItems: getVisualItems(),
    addItem,
    deleteItem,
    moveItem,
    moveItemUp,
    moveItemDown,
    draggedItem,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };
}