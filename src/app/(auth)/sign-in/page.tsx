'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { signIn } from '@/api';
import AuthFormWrapper from '@/app/(auth)/components/auth-form-wrapper/auth-form-wrapper';
import SignInForm from '@/app/(auth)/sign-in/components/sign-in-form/sign-in-form';
import { signInSchema } from '@/app/(auth)/sign-in/components/sign-in-form/sign-in-validation-schema';
import { SignInFormData } from '@/app/(auth)/sign-in/types/sign-in-form-data.type';
import { decryptVault, generateVaultKey, hashPassword } from '@/cdk/utils/crypto.util';
import { useToast } from '@/components/ui/use-toast';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      hashedPassword: '',
    },
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
  });

  const { isSubmitting: isFormSubmitting, isDirty } = form.formState;

  const { mutate, isLoading: isMutationSubmitting } = useMutation(signIn, {
    onSuccess: ({ salt, vault }) => {
      const email = form.getValues('email');
      const hashedPassword = form.getValues('hashedPassword');

      const vaultKey = generateVaultKey({
        hashedPassword,
        email,
        salt,
      });

      window.sessionStorage.setItem('vault-key', vaultKey);
      const decryptedVault = decryptVault({ vault, vaultKey });
      window.sessionStorage.setItem('vault', decryptedVault || '');

      router.push('/');
    },
    onError: (error: AxiosError) => {
      toast({
        variant: 'destructive',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error?.response?.data as any)?.message,
      });
    },
  });

  function handleSubmit(): void {
    const password = form.getValues('password');
    const email = form.getValues('email');
    const hashedPassword = hashPassword(password);

    form.setValue('hashedPassword', hashedPassword);

    mutate({
      email,
      password: hashedPassword,
    });
  }

  return (
    <AuthFormWrapper
      linkText='Sign Up'
      linkHref='/sign-up'
      formHeadingText='Login in your account'
      formAdditionalText='Enter your credentials below to login'>
      <SignInForm
        form={form}
        isSubmitting={isFormSubmitting || isMutationSubmitting}
        isDirty={isDirty}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </AuthFormWrapper>
  );
};

export default SignInPage;
