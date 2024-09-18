import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { cn } from '@/cdk/utils/cn.util';
import CopyButton from '@/components/shared/copy-button/copy-button';
import FormInput from '@/components/shared/form-input/form-input';
import { InputVariant } from '@/components/ui/input';

interface VaultFormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  placeholder: string;
  name: Path<T>;
  type: React.HTMLInputTypeAttribute;
  valueToCopy: string;
  isCreationFlow: boolean;
  readOnly: boolean;
  icon: React.ReactNode;
}

const VaultFormInput = <T extends FieldValues>({
  form,
  placeholder,
  name,
  type,
  valueToCopy,
  label,
  isCreationFlow,
  readOnly,
  icon,
}: VaultFormInputProps<T>): React.JSX.Element => {
  return (
    <div className='group/item flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full relative'>
      {icon}
      <div className='space-y-1 w-full'>
        <p className='text-sm font-medium leading-none'>{label}</p>
        <FormInput<T>
          form={form}
          type={type}
          placeholder={isCreationFlow ? placeholder : '—'}
          name={name}
          disabled={form.formState.isSubmitting}
          variant={InputVariant.Standart}
          className={cn(readOnly && 'text-sm text-muted-foreground', 'h-5 px-0')}
          readOnly={readOnly}
        />
      </div>
      {readOnly && valueToCopy && (
        <CopyButton className='group/copy group-hover/item:visible invisible h-10 w-10' value={valueToCopy} />
      )}
    </div>
  );
};

export default VaultFormInput;
