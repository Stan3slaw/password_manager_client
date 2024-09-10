import { isEmpty } from 'lodash';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import CreateUpdateVaultForm from '@/app/components/create-update-vault-form/create-update-vault-form';
import DeleteVaultItemModal from '@/app/components/delete-vault-item-modal/delete-vault-item-modal';
import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

interface VaultDisplayProps<T extends FieldValues> {
  isCreationFlow: boolean;
  isEditingFlow: boolean;
  form: UseFormReturn<T>;
  vaultItem?: VaultItem | null;
  onEdit: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const DisplayVault: React.FC<VaultDisplayProps<VaultFormData>> = ({
  isCreationFlow,
  isEditingFlow,
  form,
  vaultItem,
  onEdit,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const isReadOnlyMode = !isCreationFlow && !isEditingFlow && !isEmpty(vaultItem);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex h-full flex-col flex-1'>
          <div className='flex items-center gap-2 p-2'>
            {!isCreationFlow && !isEditingFlow && vaultItem && (
              <Button variant='outline' type='button' onClick={onEdit}>
                Edit
              </Button>
            )}
            {(isCreationFlow || isEditingFlow) && (
              <>
                <Button variant='outline' type='submit'>
                  Save
                </Button>
                <Button variant='outline' type='button' onClick={onCancel}>
                  Cancel
                </Button>
              </>
            )}
            {isEditingFlow && <DeleteVaultItemModal onDelete={onDelete} />}
          </div>

          {isCreationFlow || vaultItem || isEditingFlow ? (
            <>
              <Separator />
              <CreateUpdateVaultForm
                vaultItem={vaultItem}
                isCreationFlow={isCreationFlow}
                form={form}
                readOnly={isReadOnlyMode}
              />
            </>
          ) : (
            <div className='p-8 text-center text-muted-foreground'>No vault selected</div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default DisplayVault;
