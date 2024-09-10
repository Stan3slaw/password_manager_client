import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import { useVault } from '@/cdk/hooks/use-vault';
import { encryptVault } from '@/cdk/utils/crypto.util';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface DeleteVaultModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  vaultName: string;
}

const DeleteVaultModal: React.FC<DeleteVaultModalProps> = ({ isOpen, setIsOpen, vaultName }) => {
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
    if (vaultName) {
      delete vault[vaultName];
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete {vaultName} vault</DialogTitle>
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
    </Dialog>
  );
};

export default DeleteVaultModal;
