import React, { useEffect, useMemo } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { VaultFormData } from '@/cdk/types/vault.type';
import FormInput from '@/components/shared/form-input/form-input';
import { Separator } from '@/components/ui/separator';

interface VaultFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  readOnly: boolean;
}

const CreateUpdateVaultForm: React.FC<VaultFormProps<VaultFormData>> = ({ form, readOnly }) => {
  const vaultId = useMemo(() => crypto.randomUUID(), []);

  useEffect(() => {
    if (form.getValues().id === null) {
      form.setValue('id', vaultId);
    }
  }, [form, vaultId]);

  return (
    <div className='flex flex-col mb-2 mt-2'>
      <FormInput<VaultFormData>
        form={form}
        label='Service Name'
        placeholder='Service Name'
        name='name'
        disabled={form.formState.isSubmitting}
        readOnly={readOnly}
      />

      <Separator />

      <FormInput<VaultFormData>
        form={form}
        type='url'
        label='Website'
        placeholder='Website'
        name='website'
        disabled={form.formState.isSubmitting}
        readOnly={readOnly}
      />

      <FormInput<VaultFormData>
        form={form}
        label='Username'
        placeholder='Username'
        name='username'
        disabled={form.formState.isSubmitting}
        readOnly={readOnly}
      />

      <FormInput<VaultFormData>
        form={form}
        label='Password'
        placeholder='Password'
        name='password'
        disabled={form.formState.isSubmitting}
        readOnly={readOnly}
      />
    </div>
  );
};

export default CreateUpdateVaultForm;
