import React, { useId, useState } from 'react';
import { CheckCircled, CrossCircled, DeepRing, ExclamationTriangle, InfoCircled, X } from '../../symbols';
import { join } from '../../utils';
import { CalloutVariants } from './variants';

export interface CalloutProps {
	/** The id of the callout element */
	id?: string;
	/** Reference to the callout element */
	ref?: React.Ref<HTMLDivElement>;
	/** The visual style variant of the callout */
	variant?: CalloutVariants;
	/** Custom icon to display. Will use default icon if not provided. Pass null to hide the icon */
	icon?: string | React.ReactElement | null;
	/** Optional title for the callout */
	title?: React.ReactNode;
	/** The main content to display inside the callout */
	description?: React.ReactNode;
	/** Additional CSS classes to apply to the callout */
	className?: string;
	/** Whether the callout can be dismissed */
	dismissible?: boolean;
	/** Callback fired when the dismiss button is clicked */
	onDismiss?: () => void;
}

const VariantIcons: Record<CalloutVariants, React.ReactNode> = {
	info: <InfoCircled size={22} />,
	destructive: <CrossCircled size={22} />,
	success: <CheckCircled size={22} />,
	warning: <ExclamationTriangle size={20} />,
	base: <DeepRing size={22} />,
};

/**
 * A prominent notice component for displaying important information, alerts, or status messages.
 * Supports different visual variants with appropriate icons and dismissible functionality.
 * 
 * @example
 * ```tsx
 * // Info callout
 * <Callout variant="info" title="Tip" description="Save your work frequently" />
 * 
 * // Warning with custom content
 * <Callout 
 *   variant="warning" 
 *   title="Unsaved Changes"
 *   description={<>You have <strong>3 unsaved</strong> documents.</>}
 *   dismissible
 * />
 * 
 * // Success notification
 * <Callout variant="success" description="Profile updated successfully!" />
 * ```
 */
export function Callout({
	id,
	ref,
	variant = 'base',
	icon,
	title,
	description,
	className,
	dismissible = false,
	onDismiss,
}: CalloutProps) {
	const generatedId = useId();
	const calloutId = id || `callout-${generatedId}`;
	const [isDismissed, setIsDismissed] = useState(false);
	const variantStyles = CalloutVariants[variant];
	const variantIcon = VariantIcons[variant];

	const handleDismiss = () => {
		setIsDismissed(true);
		if (onDismiss) {
			onDismiss();
		}
	};

	if (isDismissed) {
		return null;
	}

	return (
		<div
			id={calloutId}
			ref={ref}
			className={join('relative rounded-lg p-2 sm:p-4 border', variantStyles.border, variantStyles.interior, className)}
			data-variant={variant}
			role='note'
			aria-describedby={description ? `${calloutId}-description` : undefined}
			aria-labelledby={title ? `${calloutId}-title` : undefined}
		>
			<div className='flex items-start gap-x-2'>
				{icon !== null && <span className={variantStyles.core}>{icon === undefined ? variantIcon : icon}</span>}
				{(title || description) && (
					<div className='flex-1'>
						{title && (
							<div id={`${calloutId}-title`} className={join('font-medium', variantStyles.core)}>
								{title}
							</div>
						)}
						{description && (
							<div id={`${calloutId}-description`} className={join('mt-0.5 font-light', variantStyles.description)}>
								{description}
							</div>
						)}
					</div>
				)}
			</div>

			{dismissible && (
				<button
					type='button'
					onClick={handleDismiss}
					data-callout-close-button='true'
					className={join(
						variantStyles.core,
						'rounded-md p-0.5 top-2.5 right-2.5 absolute focus:outline-none hover:ring focus:ring-2 focus:ring-current leading-0'
					)}
					aria-label='Close callout'
				>
					<X size={18} />
				</button>
			)}
		</div>
	);
}
