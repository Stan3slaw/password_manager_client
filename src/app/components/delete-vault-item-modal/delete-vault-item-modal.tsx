import React from 'react';

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

interface DeleteVaultItemModalProps {
  onDelete: () => void;
}

const DeleteVaultItemModal: React.FC<DeleteVaultItemModalProps> = ({ onDelete }) => {
  return (
    <Dialog>
      <DialogTrigger className='ml-auto'>
        <Button variant='destructive' type='button'>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete vault item</DialogTitle>
          <DialogDescription>Deleted vault cannot be restored</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button onClick={onDelete}>Delete</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVaultItemModal;
