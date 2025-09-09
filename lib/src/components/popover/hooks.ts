import { useEffect, useState } from 'react';
import { PopoverPlacement } from './variants';

interface UseAutoSwitchPlacementProps {
  internalIsOpen: boolean;
  autoSwitchPlacement: boolean;
  placement: PopoverPlacement;
  offset: number;
  triggerRef: React.RefObject<HTMLElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
}

function getOppositePlacement(placement: PopoverPlacement): PopoverPlacement {
  switch (placement) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
}

export function useAutoSwitchPlacement({
  internalIsOpen,
  autoSwitchPlacement,
  placement,
  offset,
  triggerRef,
  popoverRef,
}: UseAutoSwitchPlacementProps) {
  const [effectivePlacement, setEffectivePlacement] = useState<PopoverPlacement>(placement);

  useEffect(() => {
    if (!internalIsOpen || !autoSwitchPlacement) return;

    const updatePlacement = () => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPlacement = placement;
      const opposite = getOppositePlacement(placement);

      if (placement === 'top' || placement === 'bottom') {
        const hasSpace =
          placement === 'top'
            ? triggerRect.top >= popoverRect.height + offset
            : viewportHeight - triggerRect.bottom >= popoverRect.height + offset;

        const hasSpaceOpposite =
          opposite === 'top'
            ? triggerRect.top >= popoverRect.height + offset
            : viewportHeight - triggerRect.bottom >= popoverRect.height + offset;

        if (!hasSpace && hasSpaceOpposite) newPlacement = opposite;
      } else {
        const hasSpace =
          placement === 'left'
            ? triggerRect.left >= popoverRect.width + offset
            : viewportWidth - triggerRect.right >= popoverRect.width + offset;

        const hasSpaceOpposite =
          opposite === 'left'
            ? triggerRect.left >= popoverRect.width + offset
            : viewportWidth - triggerRect.right >= popoverRect.width + offset;

        if (!hasSpace && hasSpaceOpposite) newPlacement = opposite;
      }

      setEffectivePlacement(newPlacement);
    };

    updatePlacement();

    const handleScrollOrResize = () => updatePlacement();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    const resizeObserver = new ResizeObserver(updatePlacement);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      resizeObserver.disconnect();
    };
  }, [internalIsOpen, placement, offset, autoSwitchPlacement, triggerRef, popoverRef]);

  return effectivePlacement;
}
