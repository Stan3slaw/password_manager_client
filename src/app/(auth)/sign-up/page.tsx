'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { signUp } from '@/api';
import SignUpForm from '@/app/(auth)/sign-up/components/sign-up-form/sign-up-form';
import { signUpSchema } from '@/app/(auth)/sign-up/components/sign-up-form/sign-up-validation-schema';
import { SignUpFormData } from '@/app/(auth)/sign-up/types/sign-up-form-data.type';
import { generateVaultKey, hashPassword } from '@/cdk/utils/crypto.util';
import { useToast } from '@/components/ui/use-toast';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      hashedPassword: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const { mutate } = useMutation(signUp, {
    onSuccess: ({ salt }) => {
      const hashedPassword = form.getValues('hashedPassword');
      const email = form.getValues('email');

      const vaultKey = generateVaultKey({
        hashedPassword,
        email,
        salt,
      });

      window.sessionStorage.setItem('vk', vaultKey);
      window.sessionStorage.setItem('vault', '');

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
    <>
      <SignUpForm form={form} onSubmit={handleSubmit} />
    </>
  );
};

export default SignUpPage;
