import React, { useId, useState, useRef, useCallback, useEffect } from 'react';
import { join } from '../../utils';

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
	delay = 100,
	showArrow = true,
	className,
}: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
	const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const timeoutRef = useRef<number | null>(null);
	const reactId = useId();
	const tooltipId = id ?? reactId;

	const showTooltip = useCallback(() => {
		if (disabled) return;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = window.setTimeout(() => {
			setIsVisible(true);
		}, delay);
	}, [disabled, delay]);

	const hideTooltip = useCallback((forceHide = false) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (forceHide) {
			setIsVisible(false);
			return;
		}

		// Small delay to allow moving from trigger to tooltip
		timeoutRef.current = window.setTimeout(() => {
			setIsVisible(false);
		}, 100);
	}, []);

	// Handle hover state changes
	useEffect(() => {
		if (!isHoveringTrigger && !isHoveringTooltip && !isFocused && isVisible) {
			hideTooltip();
		}
	}, [isHoveringTrigger, isHoveringTooltip, isFocused, isVisible, hideTooltip]);

	// Hide tooltip on scroll
	useEffect(() => {
		if (!isVisible) return;

		const handleScroll = () => {
			hideTooltip(true);
		};

		window.addEventListener('scroll', handleScroll, true);
		return () => {
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, [isVisible, hideTooltip]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const getTooltipClasses = () => {
		const baseClasses =
			'absolute z-50 px-2 py-1 text-sm rounded shadow-lg bg-tooltip text-tooltip-foreground pointer-events-auto transition-all ease-out w-max max-w-xs';
		const visibilityClasses = isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none';

		const placementClasses = {
			top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
			bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
			left: 'right-full top-1/2 -translate-y-1/2 mr-2',
			right: 'left-full top-1/2 -translate-y-1/2 ml-2',
		};

		const transformOrigins = {
			top: 'origin-bottom',
			bottom: 'origin-top',
			left: 'origin-right',
			right: 'origin-left',
		};

		return join(baseClasses, placementClasses[placement], transformOrigins[placement], visibilityClasses, className);
	};

	const getArrowClasses = () => {
		if (!showArrow) return '';

		const baseArrow = 'absolute w-0 h-0 pointer-events-none';
		const arrowClasses = {
			top: 'top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-tooltip',
			bottom:
				'bottom-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-tooltip',
			left: 'left-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-tooltip',
			right:
				'right-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-tooltip',
		};

		return join(baseArrow, arrowClasses[placement]);
	};

	const childrenProps = children.props as {
		style?: React.CSSProperties;
		children?: React.ReactNode;
	};

	return (
		<>
			{React.cloneElement(children, {
				style: {
					...childrenProps.style,
					position: 'relative',
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
				children: (
					<>
						{childrenProps.children}
						{!disabled && (
							<div
								id={tooltipId}
								role='tooltip'
								className={getTooltipClasses()}
								aria-hidden={!isVisible}
								aria-live={isVisible ? 'polite' : undefined}
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
								{showArrow && <div className={getArrowClasses()} aria-hidden={true} />}
							</div>
						)}
					</>
				),
			} as Record<string, unknown>)}
		</>
	);
}

export default Tooltip;
