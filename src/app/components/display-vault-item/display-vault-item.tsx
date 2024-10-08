import { isEmpty } from 'lodash';
import { OctagonAlertIcon } from 'lucide-react';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import CreateUpdateVaultItemForm from '@/app/components/display-vault-item/components/create-update-vault-item-form/create-update-vault-item-form';
import DeleteVaultItemModal from '@/app/components/display-vault-item/components/delete-vault-item-modal/delete-vault-item-modal';
import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

interface VaultDisplayProps<T extends FieldValues> {
  isCreationFlow: boolean;
  isEditingFlow: boolean;
  form: UseFormReturn<T>;
  vaultItem?: VaultItem | null;
  isDuplicatedPassword: boolean;
  onEdit: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const DisplayVaultItem: React.FC<VaultDisplayProps<VaultFormData>> = ({
  isCreationFlow,
  isEditingFlow,
  form,
  vaultItem,
  isDuplicatedPassword,
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
              {isDuplicatedPassword && (
                <Alert variant='destructive' className='m-4 w-auto'>
                  <OctagonAlertIcon className='h-4 w-4' />
                  <AlertDescription>Reused password</AlertDescription>
                </Alert>
              )}
              <CreateUpdateVaultItemForm
                vaultItem={vaultItem}
                isCreationFlow={isCreationFlow}
                form={form}
                readOnly={isReadOnlyMode}
              />
            </>
          ) : (
            <div className='p-8 text-center text-muted-foreground'>No vault item selected</div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default DisplayVaultItem;
