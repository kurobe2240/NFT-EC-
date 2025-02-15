import { useState, useCallback } from 'react';
import { validateInput } from '../utils/security';

interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface FormValues {
  [key: string]: any;
}

export const useInputValidation = (initialValues: FormValues, rules: ValidationRules) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback((name: string, value: any) => {
    if (!rules[name]) return true;

    for (const rule of rules[name]) {
      if (!rule.validate(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: rule.message
        }));
        return false;
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  }, [rules]);

  const handleChange = useCallback((name: string, value: any) => {
    setValues((prev: FormValues) => ({
      ...prev,
      [name]: value
    }));

    validate(name, value);
    
    // 全体のバリデーションチェック
    const isFormValid = Object.keys(rules).every(field => {
      return rules[field].every(rule => rule.validate(values[field]));
    });
    setIsValid(isFormValid);
  }, [rules, validate, values]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    validate
  };
}; 