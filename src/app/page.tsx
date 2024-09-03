import { NextPage } from 'next';
import Head from 'next/head';
import { cookies } from 'next/headers';

import VaultDashboard from '@/app/components/vault-dashboard/vault-dashboard';

const Home: NextPage = () => {
  const layout = cookies().get('react-resizable-panels:layout:mail');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div>
      <Head>
        <title>Password Manager</title>
        <meta name='description' content='Password Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <VaultDashboard defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />
      </main>
    </div>
  );
};

export default Home;
