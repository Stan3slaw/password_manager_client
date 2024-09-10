import { format } from 'date-fns';
import { Earth, Lock, User } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
import { cn } from '@/cdk/utils/cn.util';
import FormInput from '@/components/shared/form-input/form-input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { InputVariant } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface CreateUpdateVaultItemFormProps<T extends FieldValues> {
  vaultItem?: VaultItem | null;
  isCreationFlow: boolean;
  form: UseFormReturn<T>;
  readOnly: boolean;
}

const CreateUpdateVaultItemForm: React.FC<CreateUpdateVaultItemFormProps<VaultFormData>> = ({
  vaultItem,
  isCreationFlow,
  form,
  readOnly,
}) => {
  const vaultId = useMemo(() => crypto.randomUUID(), []);

  useEffect(() => {
    if (form.getValues().id === null) {
      form.setValue('id', vaultId);
    }
  }, [form, vaultId, vaultItem]);

  return (
    <div className='p-4'>
      <Card>
        <CardHeader>
          <FormInput<VaultFormData>
            form={form}
            placeholder={isCreationFlow ? 'Service name' : 'Untitled'}
            name='name'
            disabled={form.formState.isSubmitting}
            variant={InputVariant.Standart}
            className='h-auto p-0 text-2xl font-semibold leading-none tracking-tight'
            readOnly={readOnly}
          />
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='border-accent border rounded-md -mx-2 space-x-4'>
            <div>
              <div className='flex items-start space-x-4 rounded-t-md rounded-tl-md p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full'>
                <User className='mt-px h-5 w-5' />
                <div className='space-y-1 w-full'>
                  <p className='text-sm font-medium leading-none'>username</p>
                  <FormInput<VaultFormData>
                    form={form}
                    placeholder={isCreationFlow ? 'Username' : '—'}
                    name='username'
                    disabled={form.formState.isSubmitting}
                    variant={InputVariant.Standart}
                    className={cn(readOnly && 'text-sm text-muted-foreground', 'h-5 px-0')}
                    readOnly={readOnly}
                  />
                </div>
              </div>
              <Separator />
              <div className='flex items-start space-x-4 rounded-b-md rounded-bl-md p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full'>
                <Lock className='mt-px h-5 w-5' />
                <div className='space-y-1 w-full'>
                  <p className='text-sm font-medium leading-none'>password</p>
                  <FormInput<VaultFormData>
                    form={form}
                    placeholder={isCreationFlow ? 'Password' : '—'}
                    name='password'
                    disabled={form.formState.isSubmitting}
                    variant={InputVariant.Standart}
                    className={cn(readOnly && 'text-sm text-muted-foreground', 'h-5 px-0')}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full'>
            <Earth className='mt-px h-5 w-5' />
            <div className='space-y-1 w-full'>
              <p className='text-sm font-medium leading-none'>website</p>
              <FormInput<VaultFormData>
                form={form}
                type='url'
                placeholder={isCreationFlow ? 'Website' : '—'}
                name='website'
                disabled={form.formState.isSubmitting}
                variant={InputVariant.Standart}
                className={cn(readOnly && 'text-sm text-muted-foreground', 'h-5 px-0')}
                readOnly={readOnly}
              />
            </div>
          </div>
          {!isCreationFlow && (
            <>
              <Separator />
              <div className='flex flex-col items-center'>
                <p className='text-xs text-muted-foreground'>
                  created: {format(vaultItem?.createdAt ?? new Date(), `dd MMM yyyy 'at' HH:mm`)}
                </p>
                <p className='text-xs text-muted-foreground'>
                  updated: {format(vaultItem?.updatedAt ?? new Date(), `dd MMM yyyy 'at' HH:mm`)}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUpdateVaultItemForm;
