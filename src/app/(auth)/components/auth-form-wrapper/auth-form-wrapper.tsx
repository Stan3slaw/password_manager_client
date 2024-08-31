import Link from 'next/link';
import React from 'react';

import { cn } from '@/cdk/lib/tailwind.lib';
import { buttonVariants } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

interface AuthFormWrapperProps {
  linkText: string;
  linkHref: string;
  formHeadingText: string;
  formAdditionalText?: string;
  children?: React.ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  children,
  linkText,
  linkHref,
  formHeadingText,
  formAdditionalText,
}) => {
  return (
    <>
      <div className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link
          href={linkHref}
          className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
          {linkText}
        </Link>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <Logo />
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This app has been created to simplify management of your passwords for various of
                services.&rdquo;
              </p>
              <footer className='text-sm'>Creator</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>{formHeadingText}</h1>
              <p className='text-sm text-muted-foreground'>{formAdditionalText}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthFormWrapper;
