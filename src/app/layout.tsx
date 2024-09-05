import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

import ReactQueryProvider from '@/cdk/providers/react-query.provider';
import ThemeProvider from '@/cdk/providers/theme-provider';
import { VaultProvider } from '@/cdk/providers/vault.provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Password Manager',
  description: 'Manage your passwords',
};

const RootLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <html lang='en'>
      <ReactQueryProvider>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <VaultProvider>
              {children}
              <Toaster />
            </VaultProvider>
          </ThemeProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
};

export default RootLayout;
