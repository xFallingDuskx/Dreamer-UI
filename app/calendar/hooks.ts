import { useState, useMemo, useCallback } from 'react';

export interface UseCalendarProps {
  /** Initial selected date */
  defaultDate?: Date;
  /** Controlled selected date */
  selectedDate?: Date;
  /** Callback when date is selected */
  onDateSelect?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
}

export function useCalendar({
  defaultDate,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
}: UseCalendarProps = {}) {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | undefined>(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || defaultDate || new Date()
  );

  const isControlled = selectedDate !== undefined;
  const currentSelectedDate = isControlled ? selectedDate : internalSelectedDate;

  const selectDate = useCallback((date: Date) => {
    if (!isControlled) {
      setInternalSelectedDate(date);
    }
    onDateSelect?.(date);
  }, [isControlled, onDateSelect]);

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
    }> = [];

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isSelected: currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
      });
    }

    // Next month days
    for (let day = 1; day <= daysFromNextMonth; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: currentSelectedDate ? date.toDateString() === currentSelectedDate.toDateString() : false,
        isToday: date.toDateString() === new Date().toDateString(),
        isDisabled: isDateDisabled(date),
      });
    }

    return days;
  }, [currentMonth, currentSelectedDate, isDateDisabled]);

  return {
    currentMonth,
    selectedDate: currentSelectedDate,
    calendarData,
    selectDate,
    navigateMonth,
    goToMonth,
    isDateDisabled,
  };
}