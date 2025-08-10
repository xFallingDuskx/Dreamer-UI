import { useCallback, useEffect, useRef } from 'react';
import { ARROW_SIZE, TOOLTIP_OFFSET, TooltipPlacement, TooltipPosition } from './Tooltip';

/**
 * Calculates the optimal position for a tooltip based on the target element and viewport constraints.
 * Automatically adjusts placement if the preferred position would be out of bounds.
 */
export function useCalculatePosition(placement: TooltipPlacement) {
  const calculatePosition = useCallback(
    (targetElement: HTMLElement, tooltipElement: HTMLElement): TooltipPosition => {
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

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
            y: tooltipRect.height,
          },
        },
        bottom: {
          x: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
          y: targetRect.bottom + TOOLTIP_OFFSET,
          arrow: {
            x: tooltipRect.width / 2 - ARROW_SIZE,
            y: -ARROW_SIZE,
          },
        },
        left: {
          x: targetRect.left - tooltipRect.width - TOOLTIP_OFFSET,
          y: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
          arrow: {
            x: tooltipRect.width,
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
    },
    [placement]
  );

  return { calculatePosition };
}

/**
 * Manages tooltip positioning logic including refs, position updates, and resize handling.
 * Automatically updates position when the window is resized.
 */
export function useTooltipPosition(
  calculatePosition: (target: HTMLElement, tooltip: HTMLElement) => TooltipPosition,
  shouldRender: boolean,
  setPosition: (position: TooltipPosition | null) => void
) {
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const newPosition = calculatePosition(triggerRef.current, tooltipRef.current);
    setPosition(newPosition);
  }, [calculatePosition, setPosition]);

  // Update position on resize
  useEffect(() => {
    if (!shouldRender) return;

    const handleUpdate = () => updatePosition();

    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
    };
  }, [shouldRender, updatePosition]);

  return {
    triggerRef,
    tooltipRef,
    updatePosition,
  };
}

/**
 * Manages tooltip show/hide events with delay handling and hover state coordination.
 * Handles timeout cleanup, delayed showing/hiding, and hover state transitions to prevent
 * flickering when moving between trigger and tooltip elements.
 */
export function useTooltipEvents(
  disabled: boolean,
  delay: number,
  setShouldRender: (shouldRender: boolean) => void,
  setIsVisible: (isVisible: boolean) => void,
  updatePosition: () => void,
  isHoveringTrigger: boolean,
  isHoveringTooltip: boolean,
  isVisible: boolean
) {
  const timeoutRef = useRef<number | null>(null);

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
  }, [disabled, delay, setShouldRender, updatePosition, setIsVisible]);

  const hideTooltip = useCallback(
    (forceHide = false) => {
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
    },
    [setIsVisible, setShouldRender]
  );

  // Handle hover state changes
  useEffect(() => {
    if (!isHoveringTrigger && !isHoveringTooltip && isVisible) {
      // Neither trigger nor tooltip is being hovered, hide the tooltip
      hideTooltip();
    }
  }, [isHoveringTrigger, isHoveringTooltip, isVisible, hideTooltip]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    showTooltip,
    hideTooltip,
    timeoutRef,
  };
}
