import React from 'react';
import { FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form';

import { VaultFormData } from '@/cdk/types/vault.type';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

interface VaultFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: () => void;
}

const VaultForm: React.FC<VaultFormProps<VaultFormData>> = ({ form, onSubmit }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'vault',
  });

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {fields.map((field, index) => {
            return (
              <div className='flex mb-2 mt-2 items-end' key={field.id}>
                <FormInput<VaultFormData>
                  form={form}
                  type='url'
                  label='Website'
                  placeholder='Website'
                  name={`vault.${index}.website`}
                  disabled={form.formState.isSubmitting}
                />

                <FormInput<VaultFormData>
                  form={form}
                  label='Username'
                  placeholder='Username'
                  name={`vault.${index}.username`}
                  disabled={form.formState.isSubmitting}
                />

                <FormInput<VaultFormData>
                  form={form}
                  label='Password'
                  placeholder='Password'
                  name={`vault.${index}.password`}
                  disabled={form.formState.isSubmitting}
                />

                <Button type='button' onClick={() => remove(index)}>
                  -
                </Button>
              </div>
            );
          })}

          <Button type='button' onClick={() => append({ website: '', username: '', password: '' })}>
            Add
          </Button>

          <Button type='submit'>Save vault</Button>
        </form>
      </Form>
    </div>
  );
};

export default VaultForm;
