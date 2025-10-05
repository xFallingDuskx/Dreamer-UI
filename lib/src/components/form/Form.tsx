import React, { cloneElement, isValidElement, useCallback, useState } from 'react';
import { useFormValidation } from './hooks';
import {
	FormCheckboxField,
	FormCheckboxGroupField,
	FormData,
	FormField,
	FormProps,
	FormInputField,
	FormRadioField,
	FormSelectField,
	FormTextareaField,
} from './types';
import { formDefaults, formVariants, FormVariants } from './variants';
import { join } from '../../utils';
import { Label } from '../label';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Select } from '../select';
import { Checkbox } from '../checkbox';
import { RadioGroup } from '../radiogroup';

export interface FormComponentProps<T extends FormData = FormData> extends FormProps<T>, Partial<FormVariants> {}

/**
 * A comprehensive form component with built-in validation, responsive layouts,
 * and support for various field types (input, textarea, select, checkbox, radio).
 * 
 * @example
 * ```tsx
 * // Use FormFactories for type-safe field creation (see factories.ts)
 * import { FormFactories } from '@moondreamsdev/dreamer-ui/components';
 * const { input, textarea, select, checkbox, radio } = FormFactories;
 * 
 * // Define form fields - should be stable (memoized or declared outside component)
 * const userForm = [
 *   input({ name: 'name', label: 'Full Name', required: true }),
 *   input({ name: 'email', type: 'email', label: 'Email', required: true }),
 *   textarea({ name: 'bio', label: 'Bio', rows: 4 }),
 *   checkbox({ name: 'subscribe', text: 'Subscribe to newsletter' })
 * ];
 * 
 * // Usage
 * <Form
 *   form={userForm}
 *   columns={2}
 *   onSubmit={(data) => saveUser(data)}
 *   submitButton={<Button type="submit">Save User</Button>}
 * />
 * ```
 */
export function Form<T extends FormData = FormData>({
	form,
	initialData = {} as T,
	onDataChange,
	onSubmit,
	submitButton,
	columns = formDefaults.columns,
	responsive = formDefaults.responsive,
	spacing = formDefaults.spacing,
	className,
	id,
	ref,
}: FormComponentProps<T>) {
	const [data, setData] = useState<T>(initialData);
	const { errors, validateForm, validateSingleField, isFormValid } = useFormValidation(form, data);

	const updateData = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(fieldName: string, value: any) => {
			const newData = { ...data, [fieldName]: value } as T;
			setData(newData);
			onDataChange?.(newData);

			// Validate field on change
			validateSingleField(fieldName, value);
		},
		[data, onDataChange, validateSingleField]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (validateForm(data) && onSubmit) {
				onSubmit(data);
			}
		},
		[data, validateForm, onSubmit]
	);

	const getFieldStylesAndClasses = (field: FormField) => {
		const classes = [];
		const styles: React.CSSProperties = {};

		// Column span
		if (field.colSpan && columns! > 1) {
			classes.push(formVariants.colSpan[field.colSpan]);
		}

		return {
			className: join(classes.join(' '), field.className),
			style: styles,
		};
	};

	const renderField = (field: FormField) => {
		const fieldValue = data[field.name];
		const fieldError = errors[field.name];
		const fieldId = id ? `${id}-${field.name}` : field.name;
		const { className: fieldClasses, style: fieldStyles } = getFieldStylesAndClasses(field);

		const renderFieldContent = () => {
			switch (field.__type) {
				case 'input': {
					const inputField = field as FormInputField;
					return (
						<>
							<Label htmlFor={fieldId} required={field.required} description={field.description}>
								{field.label}
							</Label>
							<Input
								id={fieldId}
								type={inputField.type || 'text'}
								placeholder={inputField.placeholder}
								value={fieldValue || ''}
								onChange={(e) => updateData(field.name, e.target.value)}
								disabled={field.disabled}
								variant={inputField.variant}
								rounded={inputField.rounded}
								errorMessage={fieldError}
								data-field-name={field.name}
								data-field-type={field.__type}
							/>
						</>
					);
				}

				case 'textarea': {
					const textareaField = field as FormTextareaField;
					return (
						<>
							<Label htmlFor={fieldId} required={field.required} description={field.description}>
								{field.label}
							</Label>
							<Textarea
								id={fieldId}
								placeholder={textareaField.placeholder}
								value={fieldValue || ''}
								onChange={(e) => updateData(field.name, e.target.value)}
								disabled={field.disabled}
								variant={textareaField.variant}
								rounded={textareaField.rounded}
								rows={textareaField.rows}
								autoExpand={textareaField.autoExpand}
								characterLimit={textareaField.characterLimit}
								errorMessage={fieldError}
								data-field-name={field.name}
								data-field-type={field.__type}
							/>
						</>
					);
				}

				case 'select': {
					const selectField = field as FormSelectField;
					// Convert options to match Select component expected format
					const selectOptions = selectField.options.map((opt) => ({
						text: opt.label,
						value: opt.value,
						disabled: opt.disabled,
					}));

					return (
						<>
							<Label htmlFor={fieldId} required={field.required} description={field.description}>
								{field.label}
							</Label>
							<Select
								id={fieldId}
								options={selectOptions}
								value={fieldValue || ''}
								onChange={(value) => updateData(field.name, value)}
								placeholder={selectField.placeholder}
								disabled={field.disabled}
								searchable={selectField.searchable}
								clearable={selectField.clearable}
								data-field-name={field.name}
								data-field-type={field.__type}
							/>
							{fieldError && (
								<p className='text-sm text-destructive mt-1' role='alert'>
									{fieldError}
								</p>
							)}
						</>
					);
				}

				case 'checkbox': {
					const checkboxField = field as FormCheckboxField;
					const checkboxSize = 16;
					return (
						<div className='space-x-2'>
							<Checkbox
								id={fieldId}
								checked={fieldValue || false}
								onCheckedChange={(checked) => updateData(field.name, checked)}
								disabled={field.disabled}
								data-field-name={field.name}
								data-field-type={field.__type}
								size={checkboxSize}
							/>
							<div className='inline-block' style={{ maxWidth: `calc(100% - ${checkboxSize + 10}px)` }}>
								{' '}
								{/* 8px for spacing, 2px for buffer */}
								{/* 8px for spacing, 2px for buffer */}
								<Label htmlFor={fieldId} className='cursor-pointer'>
									{checkboxField.text || field.label}
								</Label>
								{field.description && <p className='text-sm opacity-80 mt-1'>{field.description}</p>}
								{fieldError && (
									<p className='text-sm text-destructive mt-1' role='alert'>
										{fieldError}
									</p>
								)}
							</div>
						</div>
					);
				}

				case 'radio': {
					const radioField = field as FormRadioField;
					// Convert options to match RadioGroup expected format
					const radioOptions = radioField.options.map((opt) => ({
						label: opt.label,
						value: opt.value,
						disabled: opt.disabled,
					}));

					return (
						<>
							<Label required={field.required}>{field.label}</Label>
							{field.description && <p className='text-sm opacity-80 mb-2'>{field.description}</p>}
							<RadioGroup
								options={radioOptions}
								value={fieldValue || ''}
								onChange={(value) => updateData(field.name, value)}
								id={fieldId}
								data-field-name={field.name}
								data-field-type={field.__type}
							/>
							{fieldError && (
								<p className='text-sm text-destructive mt-1' role='alert'>
									{fieldError}
								</p>
							)}
						</>
					);
				}

				case 'checkboxGroup': {
					const checkboxGroupField = field as FormCheckboxGroupField;
					const checkedValues: string[] = fieldValue || [];
					const checkboxSize = 16;
					const allValues = checkboxGroupField.options.map(option => option.value);
					const areAllSelected = allValues.length > 0 && allValues.every(value => checkedValues.includes(value));
					const areNoneSelected = checkedValues.length === 0;
					const isIndeterminate = !areAllSelected && !areNoneSelected;

					const handleCheckboxChange = (optionValue: string, checked: boolean) => {
						let newValues: string[];
						if (checked) {
							newValues = [...checkedValues, optionValue];
						} else {
							newValues = checkedValues.filter((value) => value !== optionValue);
						}
						updateData(field.name, newValues);
					};

					const handleSelectAllChange = (checked: boolean) => {
						if (checked) {
							// Select all non-disabled options
							const enabledValues = checkboxGroupField.options
								.filter(option => !option.disabled)
								.map(option => option.value);
							updateData(field.name, enabledValues);
						} else {
							// Deselect all
							updateData(field.name, []);
						}
					};

					return (
						<>
							<Label required={field.required}>{field.label}</Label>
							{field.description && <p className='text-sm opacity-80 mb-2'>{field.description}</p>}
							<div data-field-name={field.name} data-field-type={field.__type}>
								{checkboxGroupField.selectAll && (
									<div className='flex items-start space-x-2'>
										<Checkbox
											id={`${fieldId}-select-all`}
											checked={areAllSelected}
											indeterminate={isIndeterminate}
											onCheckedChange={(checked) => handleSelectAllChange(checked as boolean)}
											disabled={field.disabled}
											size={checkboxSize}
											className='mt-1'
										/>
										<div className='inline-block' style={{ maxWidth: `calc(100% - ${checkboxSize + 10}px)` }}>
											<Label htmlFor={`${fieldId}-select-all`} className='cursor-pointer font-medium'>
												Select All
											</Label>
										</div>
									</div>
								)}
								{checkboxGroupField.options.map((option, index) => {
									const optionId = `${fieldId}-${index}`;
									const isChecked = checkedValues.includes(option.value);
									
									return (
										<div key={option.value} className='flex items-start space-x-2'>
											<Checkbox
												id={optionId}
												checked={isChecked}
												onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
												disabled={field.disabled || option.disabled}
												size={checkboxSize}
												className='mt-1'
											/>
											<div className='inline-block' style={{ maxWidth: `calc(100% - ${checkboxSize + 10}px)` }}>
												<Label htmlFor={optionId} className='cursor-pointer'>
													{option.label}
												</Label>
											</div>
										</div>
									);
								})}
							</div>
							{fieldError && (
								<p className='text-sm text-destructive mt-1' role='alert'>
									{fieldError}
								</p>
							)}
						</>
					);
				}

				default:
					return null;
			}
		};

		return (
			<div key={field.name} className={fieldClasses} style={fieldStyles}>
				{renderFieldContent()}
			</div>
		);
	};

	// Determine form grid classes
	const formClasses = join(
		'grid',
		columns && columns > 1 ? formVariants.columns[columns] : 'grid-cols-1',
		formVariants.spacing[spacing],
		className
	);

	// Render submit button if provided
	const renderSubmitButton = () => {
		if (!submitButton) return null;

		if (isValidElement(submitButton)) {
			// Clone the button and add disabled state based on form validity
			return cloneElement(submitButton, {
				disabled: !isFormValid,
				'aria-disabled': !isFormValid,
				...(submitButton.props ?? {}),
			} as Record<string, unknown>);
		}

		return <div className='col-span-full'>{submitButton}</div>;
	};

	return (
		<form
			ref={ref}
			id={id}
			onSubmit={handleSubmit}
			className={formClasses}
			data-form-fields={form.length}
			data-form-columns={columns}
			data-form-responsive={responsive}
			data-form-valid={isFormValid}
		>
			{form.map(renderField)}
			{renderSubmitButton()}
		</form>
	);
}
