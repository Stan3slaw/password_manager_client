import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { useAuth } from '@/cdk/hooks/use-auth';
import { encryptVault } from '@/cdk/utils/crypto.util';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

interface VaultGroupFormData {
  vaultGroup: string;
}

interface VaultGroupFormProps {
  existedVaultGroup?: string;
}

const CreateVaultGroupModal: React.FC<VaultGroupFormProps> = ({ existedVaultGroup }) => {
  const isCreationFlow = !existedVaultGroup;

  const { vault, vaultKey, refresh } = useAuth();

  const mutation = useMutation(saveVault, {
    onSuccess: async () => {
      await refresh();
    },
    onError: (error: AxiosError) => {
      toast({
        variant: 'destructive',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error?.response?.data as any)?.message,
      });
    },
  });

  const form = useForm<VaultGroupFormData>({
    values: {
      vaultGroup: existedVaultGroup ?? '',
    },
  });

  function handleSubmit(): void {
    const { vaultGroup } = form.getValues();

    if (existedVaultGroup) {
      vault[existedVaultGroup] = vault[vaultGroup];
      delete vault[vaultGroup];
    } else {
      vault[vaultGroup] = [];
    }

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
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>{isCreationFlow ? 'Create' : 'Edit'} vault group name</DialogTitle>
        <DialogDescription>
          Make changes to your vault group name here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='grid gap-4 py-4'>
            <FormInput<VaultGroupFormData>
              form={form}
              label='Vault Group Name'
              placeholder='Vault Group Name'
              name='vaultGroup'
              disabled={form.formState.isSubmitting}
            />
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateVaultGroupModal;
