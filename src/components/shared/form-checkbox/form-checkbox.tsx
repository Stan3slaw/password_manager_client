import React from 'react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FormCheckboxProps<T extends FieldValues> {
  disabled?: boolean;
  form: UseFormReturn<T>;
  label?: string;
  name: Path<T>;
  className?: string;
}

const FormCheckbox = <T extends FieldValues>({
  form,
  name,
  label,
  disabled,
  className,
}: FormCheckboxProps<T>): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0 flex items-center space-x-2'>
          <FormControl>
            <Checkbox
              {...field}
              disabled={disabled}
              className={className}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          </FormControl>

          {label && <FormLabel className='text-sm font-light'>{label}</FormLabel>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
