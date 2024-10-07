import React from 'react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

import { cn } from '@/cdk/utils/cn.util';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

interface FormSliderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const FormSlider = <T extends FieldValues>({
  form,
  name,
  label,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  className,
}: FormSliderProps<T>): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0 flex items-center justify-between'>
          <FormLabel className='text-muted-foreground text-sm'>{`${field.value} ${label && label}`}</FormLabel>

          <FormControl>
            <Slider
              value={field.value}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={cn('w-2/3', className)}
              /* eslint-disable  @typescript-eslint/no-explicit-any */
              onValueChange={(value) => form.setValue(field.name, value as any)}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSlider;
