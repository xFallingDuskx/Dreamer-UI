import React, { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface UseTableSortOptions<T> {
  data: T[];
  initialSort?: SortConfig;
}

export interface UseTableSortResult<T> {
  sortedData: T[];
  sortConfig: SortConfig;
  handleSort: (key: string, customSorter?: (a: T, b: T) => number) => void;
}

export function useTableSort<T>({
  data,
  initialSort = { key: '', direction: null },
}: UseTableSortOptions<T>): UseTableSortResult<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortConfig.key];
      const bValue = (b as any)[sortConfig.key];

      if (aValue === bValue) return 0;

      let result = 0;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue.getTime() - bValue.getTime();
      } else {
        // Fallback to string comparison
        result = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === 'desc' ? -result : result;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string, customSorter?: (a: T, b: T) => number) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        // Cycle through: asc -> desc -> null
        const direction = prevConfig.direction === 'asc' ? 'desc' : prevConfig.direction === 'desc' ? null : 'asc';
        return { key: direction ? key : '', direction };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  return { sortedData, sortConfig, handleSort };
}

export interface UseTableSelectionOptions {
  initialSelected?: string[] | number[];
}

export interface UseTableSelectionResult {
  selectedRows: Set<string | number>;
  isRowSelected: (id: string | number) => boolean;
  selectRow: (id: string | number) => void;
  deselectRow: (id: string | number) => void;
  toggleRow: (id: string | number) => void;
  selectAll: (ids: (string | number)[]) => void;
  deselectAll: () => void;
  isAllSelected: (ids: (string | number)[]) => boolean;
  isPartiallySelected: (ids: (string | number)[]) => boolean;
}

export function useTableSelection({
  initialSelected = [],
}: UseTableSelectionOptions = {}): UseTableSelectionResult {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set(initialSelected));

  const isRowSelected = (id: string | number): boolean => {
    return selectedRows.has(id);
  };

  const selectRow = (id: string | number) => {
    setSelectedRows((prev) => new Set([...prev, id]));
  };

  const deselectRow = (id: string | number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleRow = (id: string | number) => {
    if (isRowSelected(id)) {
      deselectRow(id);
    } else {
      selectRow(id);
    }
  };

  const selectAll = (ids: (string | number)[]) => {
    setSelectedRows(new Set(ids));
  };

  const deselectAll = () => {
    setSelectedRows(new Set());
  };

  const isAllSelected = (ids: (string | number)[]): boolean => {
    return ids.length > 0 && ids.every((id) => selectedRows.has(id));
  };

  const isPartiallySelected = (ids: (string | number)[]): boolean => {
    const selectedCount = ids.filter((id) => selectedRows.has(id)).length;
    return selectedCount > 0 && selectedCount < ids.length;
  };

  return {
    selectedRows,
    isRowSelected,
    selectRow,
    deselectRow,
    toggleRow,
    selectAll,
    deselectAll,
    isAllSelected,
    isPartiallySelected,
  };
}