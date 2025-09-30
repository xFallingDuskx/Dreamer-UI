import React, { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { join } from '../../utils';
import { useCalculatePosition, useTooltipEvents, useTooltipPosition } from './hooks';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
	/** The HTML id attribute for the tooltip. */
	id?: string;
	/** The element that triggers the tooltip on hover. */
	children: React.ReactElement;
	/** The content to display in the tooltip. */
	message: React.ReactNode;
	/** The preferred side of the trigger to render the tooltip. */
	placement?: TooltipPlacement;
	/** Whether the tooltip is disabled and should not appear. */
	disabled?: boolean;
	/** The delay in milliseconds before the tooltip appears. */
	delay?: number;
	/** Whether to show the arrow pointing to the trigger element. */
	showArrow?: boolean;
	/** Additional CSS classes to apply to the tooltip. */
	className?: string;
	/** Additional CSS classes to apply to the tooltip arrow. */
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

/**
 * A tooltip component that displays contextual information on hover or focus.
 * Automatically positions itself to stay within viewport bounds.
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip message="This is helpful information">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // Custom placement and delay
 * <Tooltip
 *   message="Tooltip on the right side"
 *   placement="right"
 *   delay={500}
 * >
 *   <span>Hover for delayed tooltip</span>
 * </Tooltip>
 *
 * // Tooltip without arrow
 * <Tooltip message="No arrow tooltip" showArrow={false}>
 *   <Button>No arrow</Button>
 * </Tooltip>
 *
 * // Rich content tooltip
 * <Tooltip message={<div>Complex <strong>HTML</strong> content</div>}>
 *   <Icon name="info" />
 * </Tooltip>
 * ```
 */
export function Tooltip({
	id,
	children,
	message,
	placement = 'top',
	disabled = false,
	delay = 200,
	showArrow = true,
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

	const getArrowClasses = (arrowPlacement: TooltipPlacement) => {
		const baseArrow = 'absolute w-0 h-0 pointer-events-none';
		const arrowClasses = {
			top: 'border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-tooltip',
			bottom: 'border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-tooltip',
			left: 'border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-tooltip',
			right: 'border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-tooltip',
		};

		return join(baseArrow, arrowClasses[arrowPlacement]);
	};

	const getTransformOrigin = (tooltipPlacement: TooltipPlacement) => {
		const origins = {
			top: 'bottom center',
			bottom: 'top center',
			left: 'right center',
			right: 'left center',
		};
		return origins[tooltipPlacement];
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
							'fixed z-50 px-2 py-1 text-sm rounded shadow-lg bg-tooltip text-tooltip-foreground pointer-events-auto transition-all duration-150 ease-out',
							isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
							className
						)}
						style={
							position
								? {
										left: position.x,
										top: position.y,
										transformOrigin: getTransformOrigin(position.placement),
								  }
								: { opacity: 0 }
						}
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
						{position && showArrow && (
							<div
								className={getArrowClasses(position.placement)}
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
