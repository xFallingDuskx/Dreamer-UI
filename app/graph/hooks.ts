import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface DataPoint {
  timestamp: number; // Unix timestamp
  value: number;
  label?: string;
  additionalContent?: React.ReactNode;
}

export interface TimeWindow {
  start: number; // Unix timestamp  
  end: number; // Unix timestamp
}

export interface HoverState {
  point: DataPoint | null;
  position: { x: number; y: number } | null;
}

/**
 * Hook for filtering data points based on time window
 */
export function useFilteredData(data: DataPoint[], timeWindow?: TimeWindow) {
  return useMemo(() => {
    if (!timeWindow) return data;
    
    return data.filter(point => 
      point.timestamp >= timeWindow.start && point.timestamp <= timeWindow.end
    );
  }, [data, timeWindow]);
}

/**
 * Hook for calculating graph dimensions and scaling
 */
export function useGraphDimensions(
  width: number,
  height: number,
  padding: number,
  data: DataPoint[]
) {
  return useMemo(() => {
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    if (data.length === 0) {
      return {
        chartWidth,
        chartHeight,
        scaleX: () => 0,
        scaleY: () => 0,
        minValue: 0,
        maxValue: 0,
        minTime: 0,
        maxTime: 0,
        valueRange: 0,
        timeRange: 0,
      };
    }
    
    const minValue = Math.min(...data.map(d => d.value));
    const maxValue = Math.max(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1; // Prevent division by zero
    
    const minTime = Math.min(...data.map(d => d.timestamp));
    const maxTime = Math.max(...data.map(d => d.timestamp));
    const timeRange = maxTime - minTime || 1; // Prevent division by zero
    
    const scaleX = (timestamp: number) => 
      ((timestamp - minTime) / timeRange) * chartWidth + padding;
    
    const scaleY = (value: number) => 
      height - (((value - minValue) / valueRange) * chartHeight + padding);
    
    return {
      chartWidth,
      chartHeight,
      scaleX,
      scaleY,
      minValue,
      maxValue,
      minTime,
      maxTime,
      valueRange,
      timeRange,
    };
  }, [width, height, padding, data]);
}

/**
 * Hook for handling hover interactions with data points
 */
export function useGraphHover(
  data: DataPoint[],
  scaleX: (timestamp: number) => number,
  scaleY: (value: number) => number,
  tolerance: number = 10
) {
  const [hoverState, setHoverState] = useState<HoverState>({ point: null, position: null });
  const svgRef = useRef<SVGSVGElement>(null);

  const findClosestPoint = useCallback((mouseX: number, mouseY: number): DataPoint | null => {
    let closestPoint: DataPoint | null = null;
    let minDistance = tolerance;

    for (const point of data) {
      const x = scaleX(point.timestamp);
      const y = scaleY(point.value);
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }

    return closestPoint;
  }, [data, scaleX, scaleY, tolerance]);

  const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const closestPoint = findClosestPoint(mouseX, mouseY);
    
    if (closestPoint) {
      setHoverState({
        point: closestPoint,
        position: { x: event.clientX, y: event.clientY }
      });
    } else {
      setHoverState({ point: null, position: null });
    }
  }, [findClosestPoint]);

  const handleMouseLeave = useCallback(() => {
    setHoverState({ point: null, position: null });
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setHoverState({ point: null, position: null });
    }
  }, []);

  return {
    hoverState,
    svgRef,
    handleMouseMove,
    handleMouseLeave,
    handleKeyDown,
  };
}

/**
 * Hook for generating SVG path string from data points
 */
export function useGraphPath(
  data: DataPoint[],
  scaleX: (timestamp: number) => number,
  scaleY: (value: number) => number
) {
  return useMemo(() => {
    if (data.length === 0) return '';

    const pathCommands = data.map((point, index) => {
      const x = scaleX(point.timestamp);
      const y = scaleY(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    });

    return pathCommands.join(' ');
  }, [data, scaleX, scaleY]);
}