import { useState, useCallback, useRef } from 'react';

export interface DynamicListItem {
  id: string;
  content: string;
}

export function useDynamicList(initialItems: DynamicListItem[] = []) {
  const [items, setItems] = useState<DynamicListItem[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<DynamicListItem | null>(null);
  const draggedOverIndex = useRef<number | null>(null);

  const addItem = useCallback((content: string) => {
    const newItem: DynamicListItem = {
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
  const handleDragStart = useCallback((item: DynamicListItem, index: number) => {
    setDraggedItem(item);
    draggedOverIndex.current = index;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    draggedOverIndex.current = index;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedItem && draggedOverIndex.current !== null) {
      const fromIndex = items.findIndex(item => item.id === draggedItem.id);
      const toIndex = draggedOverIndex.current;
      
      if (fromIndex !== -1 && fromIndex !== toIndex) {
        moveItem(fromIndex, toIndex);
      }
    }
    
    setDraggedItem(null);
    draggedOverIndex.current = null;
  }, [draggedItem, items, moveItem]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  return {
    items,
    addItem,
    deleteItem,
    moveItem,
    moveItemUp,
    moveItemDown,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };
}