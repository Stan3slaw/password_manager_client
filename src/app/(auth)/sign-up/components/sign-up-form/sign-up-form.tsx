import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SignUpFormData } from '@/app/(auth)/sign-up/types/sign-up-form-data.type';
import FormInput from '@/components/shared/form-input/form-input';
import FormWrapper from '@/components/shared/form-wrapper/form-wrapper';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

interface SignUpFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: () => void;
}

const SignUpForm: React.FC<SignUpFormProps<SignUpFormData>> = ({ form, onSubmit }) => {
  const router = useRouter();

  const { isSubmitting, isDirty } = form.formState;

  function redirectToLogin(): void {
    router.push('/sign-in');
  }

  return (
    <FormWrapper formHeader='Sign Up'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormInput<SignUpFormData>
            form={form}
            label='Email'
            name='email'
            type='email'
            disabled={form.formState.isSubmitting}
          />

          <FormInput<SignUpFormData>
            form={form}
            label='Password'
            name='password'
            type='password'
            disabled={form.formState.isSubmitting}
          />

          <FormInput<SignUpFormData>
            form={form}
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            disabled={form.formState.isSubmitting}
          />

          <div className='flex flex-col p-4 gap-4'>
            <Button variant='default' type='submit' disabled={!isDirty || isSubmitting}>
              Submit
            </Button>
            <Button variant='secondary' type='button' onClick={redirectToLogin}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SignUpForm;
