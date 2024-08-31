'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import VaultForm from '@/app/components/vault-form/vault-form';
import { useAuth } from '@/cdk/hooks/use-auth';
import { VaultFormData } from '@/cdk/types/vault.type';
import { encryptVault } from '@/cdk/utils/crypto.util';

const Home: NextPage = () => {
  const { vault, vaultKey } = useAuth();
  const mutation = useMutation(saveVault);

  const form = useForm<VaultFormData>({
    values: { vault },
  });

  function handleSubmit(): void {
    const vault = form.getValues('vault');

    const encryptedVault = encryptVault({
      vault: JSON.stringify(vault),
      vaultKey,
    });

    window.sessionStorage.setItem('vault', JSON.stringify(vault));

    mutation.mutate({
      encryptedVault,
    });
  }

  return (
    <div>
      <Head>
        <title>Password Manager</title>
        <meta name='description' content='Password Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <VaultForm form={form} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default Home;
