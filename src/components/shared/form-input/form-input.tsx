import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputProps<T extends FieldValues> {
  disabled?: boolean;
  form: UseFormReturn<T>;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoCapitalize?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  autoCorrect?: string;
  readOnly?: boolean;
}

const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  type,
  disabled,
  placeholder,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  readOnly,
}: FormInputProps<T>): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoCapitalize={autoCapitalize}
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              readOnly={readOnly}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
