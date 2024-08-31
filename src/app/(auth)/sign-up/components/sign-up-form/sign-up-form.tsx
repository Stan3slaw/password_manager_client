import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SignUpFormData } from '@/app/(auth)/sign-up/types/sign-up-form-data.type';
import { cn } from '@/cdk/lib/tailwind.lib';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';

interface SignUpFormProps<T extends FieldValues> extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  isDirty: boolean;
  onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps<SignUpFormData>> = ({
  form,
  isSubmitting,
  isDirty,
  onSubmit,
  className,
  ...props
}) => {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <FormInput<SignUpFormData>
                form={form}
                name='email'
                label='Email'
                placeholder='name@example.com'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect='off'
                disabled={isSubmitting}
              />

              <FormInput<SignUpFormData>
                form={form}
                name='password'
                label='Password'
                type='password'
                placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                disabled={isSubmitting}
              />

              <FormInput<SignUpFormData>
                form={form}
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                disabled={isSubmitting}
              />
            </div>

            <Button disabled={!isDirty || isSubmitting}>
              {isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
