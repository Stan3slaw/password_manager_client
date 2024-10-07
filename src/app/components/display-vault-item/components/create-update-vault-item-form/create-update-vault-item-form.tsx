import { format } from 'date-fns';
import { Earth, Lock, User } from 'lucide-react';
import React, { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import VaultCredentialsFormInput from '@/app/components/display-vault-item/components/create-update-vault-item-form/components/vault-credentials-form-input/vault-credentials-form-input';
import VaultFormInput from '@/app/components/display-vault-item/components/create-update-vault-item-form/components/vault-form-input/vault-form-input';
import GeneratePasswordModal from '@/app/components/display-vault-item/components/generate-password-modal/generate-password-modal';
import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isGeneratePasswordModalOpen, setIsGeneratePasswordModalOpen] = useState(false);

  function handlePasswordVisibilityChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();

    setIsPasswordVisible((state) => !state);
  }

  function handlePasswordGenerateModalOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();

    setIsGeneratePasswordModalOpen(true);
  }

  function handleSetGeneratedPassword(password: string): void {
    form.setValue('password', password);
  }

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
          <div className='border-accent border rounded-md space-x-4'>
            <div className='relative'>
              <VaultCredentialsFormInput<VaultFormData>
                isCreationFlow={isCreationFlow}
                form={form}
                readOnly={readOnly}
                placeholder='Username'
                label='username'
                name='username'
                valueToCopy={form.getValues().username}
                icon={<User className='mt-px h-5 w-5' />}
                className='rounded-t-md rounded-tl-md'
              />
              <Separator />
              <VaultCredentialsFormInput<VaultFormData>
                isCreationFlow={isCreationFlow}
                form={form}
                readOnly={readOnly}
                placeholder='Password'
                label='password'
                name='password'
                valueToCopy={form.getValues().password}
                icon={<Lock className='mt-px h-5 w-5' />}
                className='rounded-b-md rounded-bl-md'
                isPasswordField
                isPasswordVisible={isPasswordVisible}
                onPasswordVisibilityChange={handlePasswordVisibilityChange}
                onPasswordGenerateModalOpen={handlePasswordGenerateModalOpen}
              />
              <GeneratePasswordModal
                isOpen={isGeneratePasswordModalOpen}
                setIsOpen={setIsGeneratePasswordModalOpen}
                onSetGeneratedPassword={handleSetGeneratedPassword}
              />
            </div>
          </div>
          <VaultFormInput
            form={form}
            isCreationFlow={isCreationFlow}
            readOnly={readOnly}
            placeholder='Website'
            label='website'
            name='website'
            valueToCopy={form.getValues().website}
            icon={<Earth className='mt-px h-5 w-5' />}
            type='url'
          />
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
