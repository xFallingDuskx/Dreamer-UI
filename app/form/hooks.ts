import { useState, useCallback, useMemo } from 'react';
import { FormField, FormData, FormErrors } from './types';

export function useFormValidation(fields: FormField[], data: FormData) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback((field: FormField, value: any): string | null => {
    // Check required fields
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    // Run custom validation if provided
    if (field.isValid && value) {
      const validation = field.isValid(value);
      if (validation === false) {
        return `${field.label} is invalid`;
      }
      if (typeof validation === 'string') {
        return validation;
      }
    }

    return null;
  }, []);

  const validateForm = useCallback((currentData: FormData = data) => {
    const newErrors: FormErrors = {};
    
    fields.forEach(field => {
      const error = validateField(field, currentData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, data, validateField]);

  const validateSingleField = useCallback((fieldName: string, value: any) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return;

    const error = validateField(field, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[fieldName] = error;
      } else {
        delete newErrors[fieldName];
      }
      return newErrors;
    });

    return !error;
  }, [fields, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = useMemo(() => {
    return Object.values(errors).some(error => error);
  }, [errors]);

  return {
    errors,
    hasErrors,
    validateForm,
    validateSingleField,
    clearErrors,
  };
}