import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { cn } from '@/cdk/utils/cn.util';
import CopyButton from '@/components/shared/copy-button/copy-button';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { InputVariant } from '@/components/ui/input';

interface VaultCredentialsFormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  placeholder: string;
  name: Path<T>;
  valueToCopy: string;
  isCreationFlow: boolean;
  readOnly: boolean;
  icon: React.ReactNode;
  className?: string;
  isPasswordField?: boolean;
  isPasswordVisible?: boolean;
  onPasswordVisibilityChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const VaultCredentialsFormInput = <T extends FieldValues>({
  form,
  placeholder,
  name,
  valueToCopy,
  label,
  isCreationFlow,
  readOnly,
  icon,
  className,
  isPasswordField,
  isPasswordVisible,
  onPasswordVisibilityChange,
}: VaultCredentialsFormInputProps<T>): React.JSX.Element => {
  return (
    <div
      className={cn(
        'group/item flex items-start space-x-4 p-2 transition-all hover:bg-accent hover:text-accent-foreground w-full',
        className
      )}>
      {icon}
      <div className='space-y-1 w-full'>
        <p className='text-sm font-medium leading-none'>{label}</p>
        <FormInput<T>
          form={form}
          type={isPasswordVisible || !isPasswordField ? 'text' : 'password'}
          placeholder={isCreationFlow ? placeholder : '—'}
          name={name}
          disabled={form.formState.isSubmitting}
          variant={InputVariant.Standart}
          className={cn(readOnly && 'text-sm text-muted-foreground', 'h-5 px-0')}
          readOnly={readOnly}
        />
      </div>
      {readOnly && valueToCopy && (
        <>
          {isPasswordField && (
            <Button
              onClick={onPasswordVisibilityChange}
              variant='ghost'
              size='icon'
              className='group/copy group-hover/item:visible invisible h-10 w-10 relative z-10 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-4 [&_svg]:w-4'>
              {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          )}
          <CopyButton className='group/copy group-hover/item:visible invisible h-10 w-10' value={valueToCopy} />
        </>
      )}
    </div>
  );
};

export default VaultCredentialsFormInput;
