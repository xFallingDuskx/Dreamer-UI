import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from '../../symbols';
import { Button, ButtonProps } from '../button';
import { useAnimationOpenClose, useDocumentChanges, useHandleFocus } from './hooks';

interface ModalAction extends Omit<ButtonProps, 'children'> {
	/** The text label for the action button. */
	label: string;
}

export interface ModalProps {
	/** Optional ID for the modal element. */
	id?: string;
	/** Whether the modal is open. */
	isOpen: boolean;
	/** Callback fired when the modal should close. */
	onClose: () => void;
	/** Optional title for the modal header. */
	title?: React.ReactNode;
	/** The content to display inside the modal. */
	children: React.ReactNode;
	/** When true, renders only the children with no default modal styling. */
	contentOnly?: boolean;
	/** Additional CSS classes to apply to the modal content. */
	className?: string;
	/** Additional CSS classes to apply to the backdrop overlay. */
	overlayClassName?: string;
	/** Additional CSS classes to apply to the modal container. */
	containerClassName?: string;
	/** Whether to hide the X close button in the top-right corner. */
	hideCloseButton?: boolean;
	/** Array of action buttons to display at the bottom of the modal. */
	actions?: ModalAction[];
	/** Whether clicking the backdrop/overlay closes the modal. */
	disableCloseOnOverlayClick?: boolean;
	/** ID of an element that labels the modal. */
	ariaLabelledBy?: string;
	/** ID of an element that describes the modal. */
	ariaDescribedBy?: string;
}

/**
 * A flexible modal dialog component with focus management, animation, and action buttons.
 * Supports both styled and content-only modes with comprehensive accessibility features.
 * 
 * @example
 * ```tsx
 * // Basic modal
 * <Modal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * 
 * // Modal with actions
 * <Modal
 *   isOpen={showDeleteModal}
 *   onClose={handleClose}
 *   title="Delete Item"
 *   actions={[
 *     { label: "Cancel", variant: "secondary", onClick: handleClose },
 *     { label: "Delete", variant: "destructive", onClick: handleDelete }
 *   ]}
 *   disableCloseOnOverlayClick
 * >
 *   <p>This action cannot be undone.</p>
 * </Modal>
 * ```
 */
export function Modal({
	id,
	isOpen,
	onClose,
	title,
	children,
	contentOnly = false,
	className,
	overlayClassName,
	containerClassName,
	hideCloseButton = false,
	actions = [],
	disableCloseOnOverlayClick = false,
	ariaLabelledBy,
	ariaDescribedBy,
}: ModalProps) {
	const generatedId = useId();
	const modalId = id || `modal-${generatedId}`;
	const titleId = id ? `${id}-title` : `modal-title-${generatedId}`;

	const { show, shouldRender } = useAnimationOpenClose(isOpen);
	useHandleFocus(modalId, shouldRender);
	useDocumentChanges(shouldRender, onClose);

	if (!shouldRender) return null;

	const renderTitle = () => {
		if (!title) return null;

		if (React.isValidElement(title)) {
			return <div className='mb-4'>{title}</div>;
		}

		return (
			<h2 className='mb-4 text-xl font-semibold' id={titleId}>
				{title}
			</h2>
		);
	};

	const renderActions = () => {
		if (actions.length === 0) return null;

		return (
			<div className='mt-6 not-sm:grid gap-y-2 sm:flex sm:justify-start sm:flex-row-reverse sm:gap-x-3'>
				{actions.map((action, index) => {
					const { label, ...rest } = action;
					const buttonProps = rest as ButtonProps;
					return (
						<Button key={index} {...buttonProps} data-modal-action='true'>
							{label}
						</Button>
					);
				})}
			</div>
		);
	};

	return (
		<>
			{createPortal(
				<div
					aria-labelledby={ariaLabelledBy ?? title ? titleId : undefined}
					aria-describedby={ariaDescribedBy}
					role='dialog'
					aria-modal='true'
					className='fixed inset-0 z-[100] overflow-y-auto'
				>
					<div className={join('flex min-h-screen items-center justify-center p-4', containerClassName)}>
						<div
							className={join('fixed inset-0 bg-black/20 transition-all', overlayClassName)}
							onClick={() => {
								if (!disableCloseOnOverlayClick) {
									onClose();
								}
							}}
						/>

						{contentOnly && <div className={join('relative w-fit', className)}>{children}</div>}

						{!contentOnly && (
							<div
								id={modalId}
								tabIndex={-1}
								className={join(
									'relative w-full max-w-xl transform rounded-lg shadow-xl bg-popover text-popover-foreground transition-all p-6 focus:ring ease-in duration-75',
									show ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
									className
								)}
							>
								{!hideCloseButton && (
									<button
										type='button'
										onClick={onClose}
										data-modal-close-button='true'
										className='rounded-md p-0.5 top-2.5 right-2.5 absolute opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 leading-0'
									>
										<X size={18} />
									</button>
								)}

								{renderTitle()}

								{children}

								{renderActions()}
							</div>
						)}
					</div>
				</div>,
				document.body
			)}
		</>
	);
}
