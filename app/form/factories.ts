import {
  InputField,
  TextareaField,
  SelectField,
  CheckboxField,
  RadioField
} from './types';

const input = (field: Omit<InputField, '__type'>): InputField => ({
  __type: 'input',
  ...field,
});

const textarea = (field: Omit<TextareaField, '__type'>): TextareaField => ({
  __type: 'textarea',
  ...field,
});

const select = (field: Omit<SelectField, '__type'>): SelectField => ({
  __type: 'select',
  ...field,
});

const checkbox = (field: Omit<CheckboxField, '__type'>): CheckboxField => ({
  __type: 'checkbox',
  ...field,
});

const radio = (field: Omit<RadioField, '__type'>): RadioField => ({
  __type: 'radio',
  ...field,
});

export const FormFactories = {
  input,
  textarea,
  select,
  checkbox,
  radio,
};