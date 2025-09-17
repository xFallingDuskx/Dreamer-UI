import React from 'react';

export type FieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ValidationResult {
	valid: boolean;
	message?: string;
}

export type IsValidFunc<T> = (value: T) => ValidationResult;

export interface BaseFormField {
	__type: FieldType;
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
	// Layout properties
	colSpan?: 1 | 2 | 3 | 4 | 'full'; // Number of columns to span
	className?: string;
}

export interface InputField extends BaseFormField {
	__type: 'input';
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	placeholder?: string;
	variant?: 'base' | 'default' | 'underline' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	isValid?: IsValidFunc<string>;
}

export interface TextareaField extends BaseFormField {
	__type: 'textarea';
	placeholder?: string;
	variant?: 'base' | 'left-line' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	rows?: number;
	autoExpand?: boolean;
	characterLimit?: number;
	isValid?: IsValidFunc<string>;
}

export interface SelectField extends BaseFormField {
	__type: 'select';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	placeholder?: string;
	searchable?: boolean;
	clearable?: boolean;
	isValid?: IsValidFunc<string | undefined>;
}

export interface CheckboxField extends BaseFormField {
	__type: 'checkbox';
	text?: string;
	isValid?: IsValidFunc<boolean>;
}

export interface RadioField extends BaseFormField {
	__type: 'radio';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	isValid?: IsValidFunc<string>;
}

export type FormField = InputField | TextareaField | SelectField | CheckboxField | RadioField;

export interface FormData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface FormErrors {
	[key: string]: string;
}

export interface FormProps<T extends FormData = FormData> {
	form: FormField[];
	initialData?: T;
	onDataChange?: (data: T) => void;
	onSubmit?: (data: T) => void;
	submitButton?: React.ReactNode;
	className?: string;
	id?: string;
	ref?: React.Ref<HTMLFormElement>;
	// Layout configuration
	columns?: 1 | 2 | 3 | 4; // Default number of columns in the grid
	responsive?: boolean; // Whether to collapse to single column on mobile
}
