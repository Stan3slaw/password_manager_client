import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { createUpdateVaultGroupSchema } from '@/app/components/create-update-vault-group-modal/create-update-vault-group-validation-schema';
import { useVault } from '@/cdk/hooks/use-vault';
import { encryptVault } from '@/cdk/utils/crypto.util';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

interface VaultGroupFormData {
  vaultGroup: string;
}

interface VaultGroupFormProps {
  existedVaultGroup?: string;
}

const CreateUpdateVaultGroupModal: React.FC<VaultGroupFormProps> = ({ existedVaultGroup }) => {
  const isCreationFlow = !existedVaultGroup;

  const { vault, vaultKey, refresh } = useVault();

  const mutation = useMutation(saveVault, {
    onSuccess: async () => {
      form.reset();
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
    resolver: zodResolver(createUpdateVaultGroupSchema),
    mode: 'onTouched',
  });

  function handleSubmit(): void {
    const { vaultGroup } = form.getValues();

    if (existedVaultGroup) {
      vault[vaultGroup] = vault[existedVaultGroup];
      delete vault[existedVaultGroup];
    }

    if (vault.hasOwnProperty(vaultGroup)) {
      toast({
        variant: 'destructive',
        description: 'Vault name is already taken. Please choose another name for your vault.',
      });
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
        <DialogTitle>{isCreationFlow ? 'Create' : 'Edit'} vault group</DialogTitle>
        <DialogDescription>
          Make changes to your vault group here. Click {isCreationFlow ? 'create' : 'edit'} when you&apos;re done.
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
            <DialogTrigger asChild>
              <Button type='submit'>{isCreationFlow ? 'Create' : 'Edit'}</Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateUpdateVaultGroupModal;
