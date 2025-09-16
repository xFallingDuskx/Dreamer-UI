import React from 'react';

export type FieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface ValidationResult {
	valid: boolean;
	message?: string;
}

export interface BaseFormField {
	__type: FieldType;
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isValid?: (value: any) => ValidationResult;
	// Layout properties
	colSpan?: 1 | 2 | 3 | 4 | 'full'; // Number of columns to span
	maxWidth?: number; // Maximum width constraint in pixels
}

export interface InputField extends BaseFormField {
	__type: 'input';
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	placeholder?: string;
	variant?: 'base' | 'default' | 'underline' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface TextareaField extends BaseFormField {
	__type: 'textarea';
	placeholder?: string;
	variant?: 'base' | 'left-line' | 'outline';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	rows?: number;
	autoExpand?: boolean;
	characterLimit?: number;
}

export interface SelectField extends BaseFormField {
	__type: 'select';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	placeholder?: string;
	searchable?: boolean;
	clearable?: boolean;
}

export interface CheckboxField extends BaseFormField {
	__type: 'checkbox';
	text?: string;
}

export interface RadioField extends BaseFormField {
	__type: 'radio';
	options: Array<{ value: string; label: string; disabled?: boolean }>;
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
	data?: T;
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
