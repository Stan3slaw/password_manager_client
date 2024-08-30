import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { encryptVault } from '@/cdk/utils/crypto.util';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

interface VaultItem {
  website: string;
  username: string;
  password: string;
}

function Vault({ vault = [], vaultKey = '' }: { vault: VaultItem[]; vaultKey: string }) {
  const form = useForm({
    values: { vault },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'vault',
  });

  const mutation = useMutation(saveVault);

  function handleSubmit(): void {
    const vault = form.getValues('vault');

    const encryptedVault = encryptVault({
      vault: JSON.stringify(vault),
      vaultKey,
    });

    window.sessionStorage.setItem('vault', JSON.stringify(vault));

    mutation.mutate({
      encryptedVault,
    });
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
          {fields.map((field, index) => {
            return (
              <div className='flex mb-2 mt-2 items-end' key={field.id}>
                <FormInput
                  form={form}
                  type='url'
                  label='Website'
                  placeholder='Website'
                  name={`vault.${index}.website`}
                  disabled={form.formState.isSubmitting}
                />

                <FormInput
                  form={form}
                  label='Username'
                  placeholder='Username'
                  name={`vault.${index}.username`}
                  disabled={form.formState.isSubmitting}
                />

                <FormInput
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
}

export default Vault;
