import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { generatePassword } from '@/cdk/utils/generate-password.util';
import { getPasswordStrengthCircularIcon } from '@/cdk/utils/password-strength-icon.util';
import FormCheckbox from '@/components/shared/form-checkbox/form-checkbox';
import FormSlider from '@/components/shared/form-slider/form-slider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface GeneratePasswordFormData {
  passwordLength: number[];
  isNumbersIncluded: boolean;
  isSymbolsIncluded: boolean;
}

interface GeneratePasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSetGeneratedPassword: (password: string) => void;
}

const GeneratePasswordModal: React.FC<GeneratePasswordModalProps> = ({ isOpen, setIsOpen, onSetGeneratedPassword }) => {
  const [generatedPassword, setGeneratedPassword] = useState('');

  const form = useForm<GeneratePasswordFormData>({
    values: {
      passwordLength: [20],
      isNumbersIncluded: true,
      isSymbolsIncluded: true,
    },
  });

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  function handleGeneratePassword(): void {
    const { passwordLength, isNumbersIncluded, isSymbolsIncluded } = form.getValues();

    const password = generatePassword({ passwordLength: passwordLength[0], isNumbersIncluded, isSymbolsIncluded });
    setGeneratedPassword(password);
  }

  function handleUsePassword(): void {
    onSetGeneratedPassword(generatedPassword);
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsOpen(isOpen);
        form.reset();
      }}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form>
            <div className='grid gap-4 py-4'>
              <div className='flex items-center gap-2'>
                <div>{getPasswordStrengthCircularIcon({ password: generatedPassword })}</div>
                <Input value={generatedPassword} readOnly className='my-4' />
              </div>

              <FormSlider<GeneratePasswordFormData>
                form={form}
                name='passwordLength'
                min={8}
                max={50}
                label='characters'
              />
              <Separator />
              <div className='flex items-center gap-4'>
                <span className='text-muted-foreground text-sm'>options</span>
                <div className='flex items-center gap-6'>
                  <FormCheckbox<GeneratePasswordFormData> form={form} name='isNumbersIncluded' label='Numbers' />
                  <FormCheckbox<GeneratePasswordFormData> form={form} name='isSymbolsIncluded' label='Symbols' />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type='button' onClick={handleGeneratePassword}>
                Generate
              </Button>
              <Button type='button' onClick={handleUsePassword}>
                Use
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePasswordModal;
