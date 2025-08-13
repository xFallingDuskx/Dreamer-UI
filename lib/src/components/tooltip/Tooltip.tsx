import React, { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { join } from '../../utils';
import { useCalculatePosition, useTooltipEvents, useTooltipPosition } from './hooks';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  id?: string;
  children: React.ReactElement;
  message: React.ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  delay?: number;
  className?: string;
  arrowClassName?: string;
}

export interface TooltipPosition {
  x: number;
  y: number;
  placement: TooltipPlacement;
  arrow: {
    x: number;
    y: number;
  };
}

export function Tooltip({
  id,
  children,
  message,
  placement = 'top',
  disabled = false,
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false); // Controls visibility of the tooltip
  const [shouldRender, setShouldRender] = useState(false); // Controls whether the tooltip is rendered in the DOM
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { calculatePosition } = useCalculatePosition(placement);
  const { triggerRef, tooltipRef, updatePosition } = useTooltipPosition(calculatePosition, shouldRender, setPosition);
  const { showTooltip, hideTooltip, timeoutRef } = useTooltipEvents(
    disabled,
    delay,
    setShouldRender,
    setIsVisible,
    updatePosition,
    isHoveringTrigger,
    isHoveringTooltip,
    isFocused,
    isVisible
  );

  const reactId = useId();
  const tooltipId = id ?? reactId;

  // const getArrowClasses = (arrowPlacement: TooltipPlacement) => {
  //   const baseArrow = 'absolute w-0 h-0';
  //   const arrowClasses = {
  //     top: 'border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-border',
  //     bottom: 'border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-border',
  //     left: 'border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-border',
  //     right: 'border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-border',
  //   };

  //   return join(baseArrow, arrowClasses[arrowPlacement], arrowClassName);
  // };

  return (
    <>
      {React.cloneElement(children, {
        ref: (node: HTMLElement | null) => {
          triggerRef.current = node;
        },
        onMouseEnter: () => {
          setIsHoveringTrigger(true);
          showTooltip();
        },
        onMouseLeave: () => {
          setIsHoveringTrigger(false);
        },
        onFocus: () => {
          setIsFocused(true);
          showTooltip();
        },
        onBlur: () => {
          setIsFocused(false);
          hideTooltip(true);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') {
            hideTooltip(true);
          }
        },
        'aria-describedby': disabled ? undefined : tooltipId,
      } as Record<string, unknown>)}
      {shouldRender &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role='tooltip'
            className={join(
              'fixed z-50 px-2 py-1 text-sm rounded shadow-lg bg-popover pointer-events-auto transition-all duration-150 ease-out',
              isVisible ? 'opacity-100' : 'opacity-0',
              className
            )}
            style={position ? { left: position.x, top: position.y } : { opacity: 0 }}
            onMouseEnter={() => {
              setIsHoveringTooltip(true);
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            }}
            onMouseLeave={() => {
              setIsHoveringTooltip(false);
            }}
          >
            {message}
            {/* {position && (
              <div
                className={getArrowClasses(position.placement)}
                style={{ left: position.arrow.x, top: position.arrow.y }}
              />
            )} */}
          </div>,
          document.body
        )}
    </>
  );
}

export default Tooltip;
