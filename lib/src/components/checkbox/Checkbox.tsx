import React, { Ref, useEffect, useId, useMemo, useState } from 'react';
import { Check, Dash } from '../../symbols';
import { join } from '../../utils';
import { useFilledBackgroundColor } from './hooks';

export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	size?: number;
	color?: string; // can be adjusted with tailwindcss by using `text-<color>`
	filled?: boolean;
	rounded?: boolean;
	checked?: boolean;
	indeterminate?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	display?: 'inline' | 'block';
}

export function Checkbox({
	ref,
	id,
	size = 20,
	color,
	filled = false,
	rounded = true,
	checked = false,
	indeterminate = false,
	onCheckedChange,
	disabled,
	className = '',
	display = 'inline',
	...props
}: CheckboxProps) {
	const generatedId = useId();
	const checkboxId = useMemo(() => id || `checkbox-${generatedId}`, [id, generatedId]);
	const parentBackgroundColor = useFilledBackgroundColor(checkboxId);
	const [isChecked, setIsChecked] = useState(checked);
	const [isIndeterminate, setIsIndeterminate] = useState(indeterminate);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		setIsIndeterminate(indeterminate);
	}, [indeterminate]);

	const handleChange = () => {
		if (!disabled) {
			// When indeterminate, clicking should make it checked
			// When checked, clicking should make it unchecked
			// When unchecked, clicking should make it checked
			const newChecked = isIndeterminate ? true : !isChecked;
			setIsChecked(newChecked);
			setIsIndeterminate(false); // Clear indeterminate state on user interaction
			onCheckedChange?.(newChecked);
		}
	};

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === ' ') {
			e.preventDefault();
			handleChange();
		}
	};

	const checkboxClasses = join(
		'items-center justify-center border outline outline-transparent focus:outline-current focus:outline-offset-2',
		display === 'inline' ? 'inline-flex' : 'flex',
		rounded && 'rounded',
		disabled && 'opacity-40 cursor-not-allowed',
		!disabled && 'cursor-pointer',
		className
	);

	return (
		<button
			id={checkboxId}
			type='button'
			ref={ref}
			tabIndex={0}
			role='checkbox'
			onClick={handleChange}
			aria-checked={isIndeterminate ? 'mixed' : isChecked}
			aria-disabled={disabled}
			onKeyDownCapture={handleOnKeyDown}
			style={{
				width: size,
				height: size,
				color: color,
				backgroundColor: (isChecked || isIndeterminate) && filled ? 'currentcolor' : 'transparent',
			}}
			className={checkboxClasses}
			{...props}
		>
			{isIndeterminate ? (
				<Dash size={size} color={filled ? parentBackgroundColor : undefined} />
			) : (
				<Check
					size={size}
					color={filled ? parentBackgroundColor : undefined}
					className={isChecked ? 'opacity-100' : 'opacity-0'}
				/>
			)}
		</button>
	);
}
