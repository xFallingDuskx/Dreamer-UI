import { useState, useMemo, useCallback } from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface UseCalendarProps {
  /** Selection mode - single date or date range */
  mode?: 'single' | 'range';
  /** Initial selected date (single mode) */
  defaultDate?: Date;
  /** Controlled selected date (single mode) */
  selectedDate?: Date;
  /** Callback when date is selected (single mode) */
  onDateSelect?: (date: Date) => void;
  /** Initial selected date range (range mode) */
  defaultRange?: DateRange;
  /** Controlled selected date range (range mode) */
  selectedRange?: DateRange;
  /** Callback when date range is selected (range mode) */
  onRangeSelect?: (range: DateRange) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
}

export function useCalendar({
  mode = 'single',
  defaultDate,
  selectedDate,
  onDateSelect,
  defaultRange,
  selectedRange,
  onRangeSelect,
  minDate,
  maxDate,
  disabledDates = [],
}: UseCalendarProps = {}) {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | undefined>(defaultDate);
  const [internalSelectedRange, setInternalSelectedRange] = useState<DateRange>(
    defaultRange || { start: null, end: null }
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || defaultDate || (selectedRange?.start || defaultRange?.start) || new Date()
  );

  const isControlledSingle = selectedDate !== undefined;
  const isControlledRange = selectedRange !== undefined;
  
  const currentSelectedDate = isControlledSingle ? selectedDate : internalSelectedDate;
  const currentSelectedRange = isControlledRange ? selectedRange : internalSelectedRange;

  const selectDate = useCallback((date: Date) => {
    if (mode === 'single') {
      if (!isControlledSingle) {
        setInternalSelectedDate(date);
      }
      onDateSelect?.(date);
    } else if (mode === 'range') {
      const newRange = { ...currentSelectedRange };
      
      // If no start date or clicking the same date, set as start
      if (!newRange.start || date.toDateString() === newRange.start.toDateString()) {
        newRange.start = date;
        newRange.end = null;
      }
      // If start exists but no end, set as end (ensuring end >= start)
      else if (!newRange.end) {
        if (date >= newRange.start) {
          newRange.end = date;
        } else {
          // If selected date is before start, make it the new start
          newRange.start = date;
          newRange.end = null;
        }
      }
      // If both start and end exist, reset with new start
      else {
        newRange.start = date;
        newRange.end = null;
      }
      
      if (!isControlledRange) {
        setInternalSelectedRange(newRange);
      }
      onRangeSelect?.(newRange);
    }
  }, [mode, isControlledSingle, isControlledRange, currentSelectedRange, onDateSelect, onRangeSelect]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  }, []);

  const goToMonth = useCallback((month: number, year: number) => {
    setCurrentMonth(new Date(year, month, 1));
  }, []);

  const isDateDisabled = useCallback((date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
  }, [minDate, maxDate, disabledDates]);

  const isDateInRange = useCallback((date: Date): boolean => {
    if (mode !== 'range' || !currentSelectedRange.start) return false;
    
    if (!currentSelectedRange.end) {
      return date.toDateString() === currentSelectedRange.start.toDateString();
    }
    
    return date >= currentSelectedRange.start && date <= currentSelectedRange.end;
  }, [mode, currentSelectedRange]);

  const isDateRangeStart = useCallback((date: Date): boolean => {
    if (mode !== 'range' || !currentSelectedRange.start) return false;
    return date.toDateString() === currentSelectedRange.start.toDateString();
  }, [mode, currentSelectedRange]);

  const isDateRangeEnd = useCallback((date: Date): boolean => {
    if (mode !== 'range' || !currentSelectedRange.end) return false;
    return date.toDateString() === currentSelectedRange.end.toDateString();
  }, [mode, currentSelectedRange]);

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and calculate the starting day of the calendar
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Get last day of month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Get previous month's last days to fill the first week
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Calculate total cells needed (6 rows * 7 days = 42 cells)
    const totalCells = 42;
    const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth;

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isSelected: boolean;
      isToday: boolean;
      isDisabled: boolean;
      isInRange: boolean;
      isRangeStart: boolean;
      isRangeEnd: boolean;
    }> = [];

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      const isSelected = mode === 'single' 
        ? (currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false)
        : false;
      
      days.push({
        date,
        isCurrentMonth: false,
        isSelected,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
        isInRange: isDateInRange(date),
        isRangeStart: isDateRangeStart(date),
        isRangeEnd: isDateRangeEnd(date),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = mode === 'single' 
        ? (currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false)
        : false;
      
      days.push({
        date,
        isCurrentMonth: true,
        isSelected,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
        isInRange: isDateInRange(date),
        isRangeStart: isDateRangeStart(date),
        isRangeEnd: isDateRangeEnd(date),
      });
    }

    // Next month days
    for (let day = 1; day <= daysFromNextMonth; day++) {
      const date = new Date(year, month + 1, day);
      const isSelected = mode === 'single' 
        ? (currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false)
        : false;
      
      days.push({
        date,
        isCurrentMonth: false,
        isSelected,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
        isInRange: isDateInRange(date),
        isRangeStart: isDateRangeStart(date),
        isRangeEnd: isDateRangeEnd(date),
      });
    }

    return days;
  }, [currentMonth, mode, currentSelectedDate, currentSelectedRange, isDateDisabled, isDateInRange, isDateRangeStart, isDateRangeEnd]);

  return {
    mode,
    currentMonth,
    selectedDate: currentSelectedDate,
    selectedRange: currentSelectedRange,
    calendarData,
    selectDate,
    navigateMonth,
    goToMonth,
    isDateDisabled,
  };
}