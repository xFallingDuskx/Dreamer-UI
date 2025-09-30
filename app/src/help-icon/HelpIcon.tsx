import { Tooltip, TooltipProps } from '@moondreamsdev/dreamer-ui/components';
import { InfoCircled, InfoCircledFilled } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';

export interface HelpIconProps extends Omit<TooltipProps, 'children'> {
	/** HTML id attribute for the help icon. */
	id?: string;
	/** Ref for the icon element. */
	ref?: React.Ref<HTMLDivElement>;
	/** The design variant of the help icon. */
	design?: 'filled' | 'outlined';
	/** The size of the help icon. */
	iconSize?: number;
	/** Additional CSS classes to apply to the icon container. */
	className?: string;
}

/**
 * A help icon component that combines the InfoCircled icon with a tooltip for displaying contextual help information.
 * Supports both filled and outlined design variants with multiple size options.
 *
 * @example
 * ```tsx
 * // Basic help icon with tooltip
 * <HelpIcon message="This field is required for account verification" />
 *
 * // Custom design and size
 * <HelpIcon
 *   message="Click here for more information about pricing"
 *   design="outlined"
 *   size="lg"
 *   placement="bottom"
 * />
 *
 * // Rich content tooltip
 * <HelpIcon
 *   message={
 *     <div>
 *       <p className="font-semibold mb-1">Password Requirements</p>
 *       <ul className="text-xs space-y-1">
 *         <li>• At least 8 characters</li>
 *         <li>• One uppercase letter</li>
 *         <li>• One number or symbol</li>
 *       </ul>
 *     </div>
 *   }
 *   className="ml-2"
 * />
 * ```
 */
export function HelpIcon({ id, ref, design = 'filled', iconSize = 12, className, ...tooltipProps }: HelpIconProps) {
	const IconComponent = design === 'filled' ? InfoCircledFilled : InfoCircled;

	return (
		<Tooltip {...tooltipProps}>
			<div
				id={id}
				ref={ref}
				className={join(
					'inline-block cursor-help text-muted-foreground hover:text-current transition-colors align-top',
					className
				)}
				data-help-icon='true'
				data-design={design}
				data-size={iconSize}
			>
				<IconComponent size={iconSize} className='fill-current' />
			</div>
		</Tooltip>
	);
}
