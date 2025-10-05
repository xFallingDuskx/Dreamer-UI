import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
  FormCheckboxField,
  FormRadioField,
  FormCheckboxGroupField
} from './types';

const input = (field: Omit<FormInputField, '__type'>): FormInputField => ({
  __type: 'input',
  ...field,
});

const textarea = (field: Omit<FormTextareaField, '__type'>): FormTextareaField => ({
  __type: 'textarea',
  ...field,
});

const select = (field: Omit<FormSelectField, '__type'>): FormSelectField => ({
  __type: 'select',
  ...field,
});

const checkbox = (field: Omit<FormCheckboxField, '__type'>): FormCheckboxField => ({
  __type: 'checkbox',
  ...field,
});

const radio = (field: Omit<FormRadioField, '__type'>): FormRadioField => ({
  __type: 'radio',
  ...field,
});

const checkboxGroup = (field: Omit<FormCheckboxGroupField, '__type'>): FormCheckboxGroupField => ({
  __type: 'checkboxGroup',
  ...field,
});

export const FormFactories = {
  input,
  textarea,
  select,
  checkbox,
  radio,
  checkboxGroup,
};