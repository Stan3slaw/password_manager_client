'use client';

import { NextPage } from 'next';
import Head from 'next/head';

import VaultForm from '@/app/components/vault-form/vault-form';
import { useAuth } from '@/cdk/hooks/use-auth';

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

const Home: NextPage = () => {
  const { vault, vaultKey } = useAuth();

  return (
    <div>
      <Head>
        <title>Password Manager</title>
        <meta name='description' content='Password Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <VaultForm vault={vault} vaultKey={vaultKey} />
      </main>
    </div>
  );
};

export default Home;
