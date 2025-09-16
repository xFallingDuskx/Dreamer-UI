import React, { useState, useCallback, cloneElement, isValidElement } from 'react';
import { 
  Input,
  Textarea,
  Select,
  Label,
  Checkbox,
  RadioGroup
} from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { 
  FormProps,
  FormField,
  FormData,
  InputField,
  TextareaField,
  SelectField,
  CheckboxField,
  RadioField
} from './types';
import { useFormValidation } from './hooks';
import { formVariants, formDefaults, FormVariants } from './variants';

export interface FormComponentProps<T extends FormData = FormData> extends FormProps<T>, Partial<FormVariants> {}

export function Form<T extends FormData = FormData>({
  form,
  data: initialData = {} as T,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData = useCallback((fieldName: string, value: any) => {
    const newData = { ...data, [fieldName]: value } as T;
    setData(newData);
    onDataChange?.(newData);
    
    // Validate field on change
    validateSingleField(fieldName, value);
  }, [data, onDataChange, validateSingleField]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(data) && onSubmit) {
      onSubmit(data);
    }
  }, [data, validateForm, onSubmit]);

  const getFieldClasses = (field: FormField) => {
    const classes = [];
    
    // Column span
    if (field.colSpan && columns! > 1) {
      classes.push(formVariants.colSpan[field.colSpan]);
    }
    
    // Width constraints
    if (field.maxWidth) {
      classes.push(formVariants.maxWidth[field.maxWidth]);
    }
    if (field.minWidth) {
      classes.push(formVariants.minWidth[field.minWidth]);
    }
    
    return classes.join(' ');
  };

  const renderField = (field: FormField) => {
    const fieldValue = data[field.name];
    const fieldError = errors[field.name];
    const fieldId = id ? `${id}-${field.name}` : field.name;
    const fieldClasses = getFieldClasses(field);

    const renderFieldContent = () => {
      switch (field.__type) {
        case 'input': {
          const inputField = field as InputField;
          return (
            <>
              <Label
                htmlFor={fieldId}
                required={field.required}
                description={field.description}
              >
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
          const textareaField = field as TextareaField;
          return (
            <>
              <Label
                htmlFor={fieldId}
                required={field.required}
                description={field.description}
              >
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
          const selectField = field as SelectField;
          // Convert options to match Select component expected format
          const selectOptions = selectField.options.map(opt => ({
            text: opt.label,
            value: opt.value,
            disabled: opt.disabled
          }));
          
          return (
            <>
              <Label
                htmlFor={fieldId}
                required={field.required}
                description={field.description}
              >
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
                <p className="text-sm text-destructive mt-1" role="alert">
                  {fieldError}
                </p>
              )}
            </>
          );
        }

        case 'checkbox': {
          const checkboxField = field as CheckboxField;
          const checkboxSize = 16
          return (
            <div className="space-x-2">
              <Checkbox
                id={fieldId}
                checked={fieldValue || false}
                onCheckedChange={(checked) => updateData(field.name, checked)}
                disabled={field.disabled}
                data-field-name={field.name}
                data-field-type={field.__type}
                size={checkboxSize}
              />
              <div className='inline-block' style={{ maxWidth: `calc(100% - ${checkboxSize + 10}px)` }}> {/* 8px for spacing, 2px for buffer */}
                <Label htmlFor={fieldId} className="cursor-pointer">
                  {checkboxField.text || field.label}
                </Label>
                {field.description && (
                  <p className="text-sm opacity-80 mt-1">{field.description}</p>
                )}
                {fieldError && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {fieldError}
                  </p>
                )}
              </div>
            </div>
          );
        }

        case 'radio': {
          const radioField = field as RadioField;
          // Convert options to match RadioGroup expected format
          const radioOptions = radioField.options.map(opt => ({
            label: opt.label,
            value: opt.value,
            disabled: opt.disabled
          }));
          
          return (
            <>
              <Label required={field.required}>
                {field.label}
              </Label>
              {field.description && (
                <p className="text-sm opacity-80 mb-2">{field.description}</p>
              )}
              <RadioGroup
                options={radioOptions}
                value={fieldValue || ''}
                onChange={(value) => updateData(field.name, value)}
                id={fieldId}
                data-field-name={field.name}
                data-field-type={field.__type}
              />
              {fieldError && (
                <p className="text-sm text-destructive mt-1" role="alert">
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
      <div key={field.name} className={fieldClasses}>
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
      const props = submitButton.props || {};
      return cloneElement(submitButton, {
        disabled: !isFormValid,
        ...props,
        className: join(
          'col-span-full', // Span all columns
          typeof props.className === 'string' ? props.className : ''
        ),
      } as any);
    }

    return (
      <div className="col-span-full">
        {submitButton}
      </div>
    );
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