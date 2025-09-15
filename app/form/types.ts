import React from 'react';

export type FieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface BaseFormField {
  __type: FieldType;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  isValid?: (value: any) => boolean | string; // boolean for valid/invalid, string for error message
}

export interface InputField extends BaseFormField {
  __type: 'input';
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  variant?: 'base' | 'left-line' | 'outline';
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
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormProps {
  form: FormField[];
  data?: FormData;
  onDataChange?: (data: FormData) => void;
  onSubmit?: (data: FormData) => void;
  className?: string;
  id?: string;
  ref?: React.Ref<HTMLFormElement>;
}