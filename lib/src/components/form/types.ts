import React from 'react';

export type FormFieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'checkboxGroup';

interface ValidationResult {
	valid: boolean;
	message?: string;
}

export type IsValidFunc<T> = (value: T) => ValidationResult;

export interface BaseFormField {
	__type: FormFieldType;
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
	// Layout properties
	colSpan?: 1 | 2 | 3 | 4 | 'full'; // Number of columns to span
	className?: string;
}

export interface FormInputField extends BaseFormField {
	__type: 'input';
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	placeholder?: string;
	variant?: 'base' | 'default' | 'underline' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	isValid?: IsValidFunc<string>;
}

export interface FormTextareaField extends BaseFormField {
	__type: 'textarea';
	placeholder?: string;
	variant?: 'base' | 'left-line' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	rows?: number;
	autoExpand?: boolean;
	characterLimit?: number;
	isValid?: IsValidFunc<string>;
}

export interface FormSelectField extends BaseFormField {
	__type: 'select';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	placeholder?: string;
	searchable?: boolean;
	clearable?: boolean;
	isValid?: IsValidFunc<string | undefined>;
}

export interface FormCheckboxField extends BaseFormField {
	__type: 'checkbox';
	text?: string;
	isValid?: IsValidFunc<boolean>;
}

export interface FormRadioField extends BaseFormField {
	__type: 'radio';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	isValid?: IsValidFunc<string>;
}

export interface FormCheckboxGroupField extends BaseFormField {
	__type: 'checkboxGroup';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	isValid?: IsValidFunc<string[]>;
}

export type FormField = FormInputField | FormTextareaField | FormSelectField | FormCheckboxField | FormRadioField | FormCheckboxGroupField;

export interface FormData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface FormErrors {
	[key: string]: string;
}

export interface FormProps<T extends FormData = FormData> {
	/** Array of form fields created using FormFactories. */
	form: FormField[];
	/** Initial data to populate the form fields. */
	initialData?: T;
	/** Callback fired when form data changes. */
	onDataChange?: (data: T) => void;
	/** Callback fired when form is submitted with valid data. */
	onSubmit?: (data: T) => void;
	/** Submit button element to render at the bottom of the form. */
	submitButton?: React.ReactNode;
	/** Additional CSS classes to apply to the form. */
	className?: string;
	/** The HTML id attribute for the form. */
	id?: string;
	/** Reference to the form element. */
	ref?: React.Ref<HTMLFormElement>;
	/** Number of columns in the form grid layout. */
	columns?: 1 | 2 | 3 | 4; // Default number of columns in the grid
	/** Whether to collapse to single column on mobile devices. */
	responsive?: boolean; // Whether to collapse to single column on mobile
}
