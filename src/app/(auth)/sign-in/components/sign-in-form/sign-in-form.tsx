import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SignInFormData } from '@/app/(auth)/sign-in/types/sign-in-form-data.type';
import FormInput from '@/components/shared/form-input/form-input';
import FormWrapper from '@/components/shared/form-wrapper/form-wrapper';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

interface SignInFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: () => void;
}

const SignInForm: React.FC<SignInFormProps<SignInFormData>> = ({ form, onSubmit }) => {
  const router = useRouter();

  const { isSubmitting, isDirty } = form.formState;

  function redirectToSignUp(): void {
    router.push('/sign-up');
  }

  return (
    <>
      <FormWrapper formHeader='Login'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormInput<SignInFormData> form={form} label='Email' name='email' disabled={form.formState.isSubmitting} />

            <FormInput<SignInFormData>
              form={form}
              label='Password'
              name='password'
              type='password'
              disabled={form.formState.isSubmitting}
            />

            <div className='flex flex-col p-4 gap-4'>
              <Button variant='default' type='submit' disabled={!isDirty || isSubmitting}>
                Submit
              </Button>
              <Button variant='secondary' type='button' onClick={redirectToSignUp}>
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </>
  );
};

export default SignInForm;
