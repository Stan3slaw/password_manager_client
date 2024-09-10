import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { createUpdateVaultSchema } from '@/app/components/vault-list/components/create-update-vault-modal/create-update-vault-validation-schema';
import { useVault } from '@/cdk/hooks/use-vault';
import { encryptVault } from '@/cdk/utils/crypto.util';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

interface VaultFormData {
  vaultName: string;
}

interface VaultFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existedVaultName?: string;
}

const CreateUpdateVaultModal: React.FC<VaultFormProps> = ({ isOpen, setIsOpen, existedVaultName }) => {
  const isCreationFlow = !existedVaultName;

  const { vault, vaultKey, refresh } = useVault();

  const mutation = useMutation(saveVault, {
    onSuccess: async () => {
      form.reset();
      await refresh();
      setIsOpen(false);
    },
    onError: (error: AxiosError) => {
      toast({
        variant: 'destructive',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error?.response?.data as any)?.message,
      });
    },
  });

  const form = useForm<VaultFormData>({
    values: {
      vaultName: existedVaultName ?? '',
    },
    resolver: zodResolver(createUpdateVaultSchema),
    mode: existedVaultName ? 'onTouched' : 'onSubmit',
  });

  function handleSubmit(): void {
    const { vaultName } = form.getValues();

    if (vault.hasOwnProperty(vaultName)) {
      toast({
        variant: 'destructive',
        description: 'Vault name is already taken. Please choose another name for your vault.',
      });
      return;
    }

    if (existedVaultName) {
      vault[vaultName] = vault[existedVaultName];
      delete vault[existedVaultName];
    } else {
      vault[vaultName] = [];
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
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsOpen(isOpen);
        form.reset();
      }}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isCreationFlow ? 'Create' : 'Edit'} vault</DialogTitle>
          <DialogDescription>
            Make changes to your vault here. Click {isCreationFlow ? 'create' : 'edit'} when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormInput<VaultFormData>
                form={form}
                label='Vault Name'
                placeholder='Vault Name'
                name='vaultName'
                disabled={form.formState.isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>{isCreationFlow ? 'Create' : 'Edit'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateVaultModal;
