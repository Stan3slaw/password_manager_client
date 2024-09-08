import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { useVault } from '@/cdk/hooks/use-vault';
import { encryptVault } from '@/cdk/utils/crypto.util';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface DeleteVaultGroupModalProps {
  vaultGroup: string;
}

const DeleteVaultGroupModal: React.FC<DeleteVaultGroupModalProps> = ({ vaultGroup }) => {
  const { vault, vaultKey, refresh } = useVault();

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

  function handleDelete(): void {
    if (vaultGroup) {
      delete vault[vaultGroup];
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
        <DialogTitle>Delete {vaultGroup} vault group</DialogTitle>
        <DialogDescription>Deleted vault cannot be restored</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button variant='ghost'>Cancel</Button>
        </DialogClose>
        <DialogTrigger asChild>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogTrigger>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteVaultGroupModal;
