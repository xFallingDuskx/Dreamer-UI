import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { join } from '../../../lib/src/utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactElement;
  message: React.ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  delay?: number;
  className?: string;
  arrowClassName?: string;
}

interface TooltipPosition {
  x: number;
  y: number;
  placement: TooltipPlacement;
  arrow: {
    x: number;
    y: number;
  };
}

const TOOLTIP_OFFSET = 8; // Distance from target element
const ARROW_SIZE = 6; // Size of the arrow

export function Tooltip({
  children,
  message,
  placement = 'top',
  disabled = false,
  delay = 200,
  className,
  arrowClassName,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const tooltipId = useId();

  const calculatePosition = useCallback((targetElement: HTMLElement, tooltipElement: HTMLElement): TooltipPosition => {
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Helper function to check if position would be out of bounds
    const isOutOfBounds = (x: number, y: number, width: number, height: number) => {
      return x < 0 || y < 0 || x + width > viewport.width || y + height > viewport.height;
    };

    // Calculate positions for all placements
    const positions = {
      top: {
        x: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
        y: targetRect.top - tooltipRect.height - TOOLTIP_OFFSET,
        arrow: {
          x: tooltipRect.width / 2 - ARROW_SIZE,
          y: tooltipRect.height - 1, // Position arrow just outside the bottom edge
        },
      },
      bottom: {
        x: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
        y: targetRect.bottom + TOOLTIP_OFFSET,
        arrow: {
          x: tooltipRect.width / 2 - ARROW_SIZE,
          y: -ARROW_SIZE + 1, // Position arrow just outside the top edge
        },
      },
      left: {
        x: targetRect.left - tooltipRect.width - TOOLTIP_OFFSET,
        y: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        arrow: {
          x: tooltipRect.width, // Position arrow just outside the right edge
          y: tooltipRect.height / 2 - ARROW_SIZE,
        },
      },
      right: {
        x: targetRect.right + TOOLTIP_OFFSET,
        y: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
        arrow: {
          x: -ARROW_SIZE,
          y: tooltipRect.height / 2 - ARROW_SIZE,
        },
      },
    };

    // Determine the best placement, starting with the preferred one
    let bestPlacement = placement;
    let bestPosition = positions[placement];

    // Check if preferred placement is out of bounds
    if (isOutOfBounds(bestPosition.x, bestPosition.y, tooltipRect.width, tooltipRect.height)) {
      // Try opposite placement first
      const oppositePlacement: Record<TooltipPlacement, TooltipPlacement> = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
      };

      const oppositePos = positions[oppositePlacement[placement]];
      if (!isOutOfBounds(oppositePos.x, oppositePos.y, tooltipRect.width, tooltipRect.height)) {
        bestPlacement = oppositePlacement[placement];
        bestPosition = oppositePos;
      } else {
        // Try all other placements
        const otherPlacements = (['top', 'bottom', 'left', 'right'] as TooltipPlacement[]).filter(
          (p) => p !== placement && p !== oppositePlacement[placement]
        );

        for (const p of otherPlacements) {
          const pos = positions[p];
          if (!isOutOfBounds(pos.x, pos.y, tooltipRect.width, tooltipRect.height)) {
            bestPlacement = p;
            bestPosition = pos;
            break;
          }
        }
      }
    }

    // Adjust position to stay within viewport bounds
    bestPosition.x = Math.max(8, Math.min(bestPosition.x, viewport.width - tooltipRect.width - 8));
    bestPosition.y = Math.max(8, Math.min(bestPosition.y, viewport.height - tooltipRect.height - 8));

    // Adjust arrow position based on the tooltip adjustment
    const targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    };

    if (bestPlacement === 'top' || bestPlacement === 'bottom') {
      bestPosition.arrow.x = Math.max(
        ARROW_SIZE,
        Math.min(targetCenter.x - bestPosition.x - ARROW_SIZE, tooltipRect.width - ARROW_SIZE * 2)
      );
    } else {
      bestPosition.arrow.y = Math.max(
        ARROW_SIZE,
        Math.min(targetCenter.y - bestPosition.y - ARROW_SIZE, tooltipRect.height - ARROW_SIZE * 2)
      );
    }

    return {
      ...bestPosition,
      placement: bestPlacement,
    };
  }, [placement]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const newPosition = calculatePosition(triggerRef.current, tooltipRef.current);
    setPosition(newPosition);
  }, [calculatePosition]);

  const showTooltip = useCallback(() => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setShouldRender(true);
      // Small delay to ensure DOM is updated before calculating position
      requestAnimationFrame(() => {
        updatePosition();
        setIsVisible(true);
      });
    }, delay);
  }, [disabled, delay, updatePosition]);

  const hideTooltip = useCallback((forceHide = false) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (forceHide) {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 150);
      return;
    }

    // Small delay to allow moving from trigger to tooltip
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 150);
    }, 100);
  }, []);

  // Handle hover state changes
  useEffect(() => {
    if (!isHoveringTrigger && !isHoveringTooltip && isVisible) {
      // Neither trigger nor tooltip is being hovered, hide the tooltip
      hideTooltip();
    }
  }, [isHoveringTrigger, isHoveringTooltip, isVisible, hideTooltip]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!shouldRender) return;

    const handleUpdate = () => updatePosition();

    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
    };
  }, [shouldRender, updatePosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowClasses = (arrowPlacement: TooltipPlacement) => {
    const baseArrow = 'absolute w-0 h-0';
    const arrowClasses = {
      top: 'border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-border',
      bottom: 'border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-border',
      left: 'border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-border',
      right: 'border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-border',
    };

    return join(baseArrow, arrowClasses[arrowPlacement], arrowClassName);
  };

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
          // Don't call hideTooltip here, let the effect handle it
        },
        onFocus: () => showTooltip(),
        onBlur: () => hideTooltip(true), // Force hide on blur
        'aria-describedby': disabled ? undefined : tooltipId,
      } as Record<string, unknown>)}
      {shouldRender &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={join(
              'fixed z-50 px-2 py-1 text-sm rounded shadow-lg pointer-events-auto transition-all duration-150 ease-out',
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
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
              // Don't call hideTooltip here, let the effect handle it
            }}
          >
            {message}
            {position && (
              <div
                className={(getArrowClasses(position.placement))}
                style={{ left: position.arrow.x, top: position.arrow.y }}
              />
            )}
          </div>,
          document.body
        )}
    </>
  );
}

export default Tooltip;
