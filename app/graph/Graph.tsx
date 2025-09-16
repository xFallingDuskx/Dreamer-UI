import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { GraphSizes, GraphThemes, graphDefaults, type GraphSize, type GraphTheme } from './variants';
import { 
  useFilteredData, 
  useGraphDimensions, 
  useGraphHover, 
  useGraphPath,
  type DataPoint,
  type TimeWindow 
} from './hooks';
import { DataPointIcon } from './icons';

export interface GraphProps {
  /** Unique identifier for the graph */
  id?: string;
  /** Data points to display */
  data: DataPoint[];
  /** Time window to filter data points */
  timeWindow?: TimeWindow;
  /** Size variant */
  size?: GraphSize;
  /** Color theme */
  theme?: GraphTheme;
  /** Additional CSS classes */
  className?: string;
  /** Custom width (overrides size variant) */
  width?: number;
  /** Custom height (overrides size variant) */
  height?: number;
  /** Title for the graph */
  title?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Ref for the container element */
  ref?: React.Ref<HTMLDivElement>;
}

export function Graph({
  id,
  data = [],
  timeWindow,
  size = graphDefaults.size,
  theme = graphDefaults.theme,
  className = '',
  width: customWidth,
  height: customHeight,
  title,
  'aria-label': ariaLabel,
  ref,
  ...props
}: GraphProps) {
  const sizeConfig = GraphSizes[size];
  const themeClass = GraphThemes[theme];
  
  const actualWidth = customWidth || sizeConfig.width;
  const actualHeight = customHeight || sizeConfig.height;
  const padding = sizeConfig.padding;

  const filteredData = useFilteredData(data, timeWindow);
  
  const {
    chartWidth,
    chartHeight,
    scaleX,
    scaleY,
    minValue,
    maxValue,
    minTime,
    maxTime,
  } = useGraphDimensions(actualWidth, actualHeight, padding, filteredData);

  const {
    hoverState,
    svgRef,
    handleMouseMove,
    handleMouseLeave,
    handleKeyDown,
  } = useGraphHover(filteredData, scaleX, scaleY);

  const pathString = useGraphPath(filteredData, scaleX, scaleY);

  if (filteredData.length === 0) {
    return (
      <div
        ref={ref}
        id={id}
        className={join(
          'flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg',
          sizeConfig.container,
          className
        )}
        style={{ width: actualWidth, height: actualHeight }}
        role='img'
        aria-label={ariaLabel || 'Empty graph - no data to display'}
        data-size={size}
        data-theme={theme}
        {...props}
      >
        <p className='text-gray-500 dark:text-gray-400'>No data to display</p>
      </div>
    );
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatValue = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div
      ref={ref}
      id={id}
      className={join(
        'relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg',
        sizeConfig.container,
        className
      )}
      style={{ width: actualWidth || '100%', height: actualHeight }}
      role='img'
      aria-label={ariaLabel || `Line graph showing ${filteredData.length} data points`}
      data-size={size}
      data-theme={theme}
      {...props}
    >
      {title && (
        <h3 className='text-lg font-semibold p-4 pb-0 text-gray-900 dark:text-gray-100'>
          {title}
        </h3>
      )}
      
      <svg
        ref={svgRef}
        width='100%'
        height={actualHeight}
        viewBox={`0 0 ${actualWidth} ${actualHeight}`}
        className='overflow-visible'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role='application'
        aria-label={`Interactive graph with ${filteredData.length} data points from ${formatTimestamp(minTime)} to ${formatTimestamp(maxTime)}`}
      >
        {/* Grid lines */}
        <defs>
          <pattern
            id={`grid-${id || 'default'}`}
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M 40 0 L 0 0 0 40'
              fill='none'
              stroke='currentColor'
              strokeWidth='0.5'
              className='text-gray-200 dark:text-gray-700'
            />
          </pattern>
        </defs>
        
        <rect
          x={padding}
          y={padding}
          width={chartWidth}
          height={chartHeight}
          fill={`url(#grid-${id || 'default'})`}
          className='opacity-30'
        />

        {/* Main line path */}
        {pathString && (
          <path
            d={pathString}
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={join(themeClass, 'drop-shadow-sm')}
            data-testid='graph-line'
          />
        )}

        {/* Data points */}
        {filteredData.map((point, index) => {
          const x = scaleX(point.timestamp);
          const y = scaleY(point.value);
          const isHovered = hoverState.point === point;

          return (
            <g key={`${point.timestamp}-${index}`}>
              <DataPointIcon
                size={isHovered ? 12 : 8}
                color='currentColor'
                className={join(
                  themeClass,
                  'transition-all duration-200 cursor-pointer',
                  isHovered && 'drop-shadow-md'
                )}
                cx={x}
                cy={y}
              />
              {isHovered && (
                <circle
                  cx={x}
                  cy={y}
                  r='15'
                  fill='transparent'
                  stroke='currentColor'
                  strokeWidth='1'
                  className={join(themeClass, 'opacity-30 animate-pulse')}
                />
              )}
            </g>
          );
        })}

        {/* Y-axis labels */}
        <g className='text-xs fill-gray-600 dark:fill-gray-400'>
          <text x={padding - 5} y={padding + 5} textAnchor='end'>
            {formatValue(maxValue)}
          </text>
          <text x={padding - 5} y={actualHeight - padding + 5} textAnchor='end'>
            {formatValue(minValue)}
          </text>
        </g>

        {/* X-axis labels */}
        <g className='text-xs fill-gray-600 dark:fill-gray-400'>
          <text x={padding} y={actualHeight - padding + 20} textAnchor='start'>
            {formatTimestamp(minTime)}
          </text>
          <text x={actualWidth - padding} y={actualHeight - padding + 20} textAnchor='end'>
            {formatTimestamp(maxTime)}
          </text>
        </g>
      </svg>

      {/* Hover tooltip */}
      {hoverState.point && hoverState.position && (
        <div
          className='fixed z-50 px-3 py-2 bg-popover text-popover-foreground border border-gray-200 dark:border-gray-700 rounded-md shadow-lg pointer-events-none'
          style={{
            left: hoverState.position.x + 10,
            top: hoverState.position.y - 10,
          }}
        >
          <div className='flex flex-col gap-1'>
            <div className='font-medium'>
              {hoverState.point.label || formatValue(hoverState.point.value)}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              {formatTimestamp(hoverState.point.timestamp)}
            </div>
            <div className='text-sm font-mono'>
              Value: {formatValue(hoverState.point.value)}
            </div>
            {hoverState.point.additionalContent && (
              <div className='mt-1 pt-1 border-t border-gray-200 dark:border-gray-700'>
                {hoverState.point.additionalContent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}