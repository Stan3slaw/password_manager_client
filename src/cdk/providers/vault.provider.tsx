'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { signOut } from '@/api';
import { Vault } from '@/cdk/types/vault.type';
import { Icons } from '@/components/ui/icons';

export type VaultContextType = {
  vault: Vault;
  vaultKey: string;
  refresh: () => Promise<void>;
};

export const VaultContext = createContext<VaultContextType | undefined>(undefined);

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', 'sign-up'];

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const [vault, setVault] = useState<Vault>({});
  const [vaultKey, setVaultKey] = useState<string>('');
  const [isVaultUpdating, setIsVaultUpdating] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const memoizedRefresh = useCallback(refresh, [isProtectedRoute, isPublicRoute, router]);

  useEffect(() => {
    void memoizedRefresh();
  }, [memoizedRefresh]);

  async function refresh(): Promise<void> {
    setIsVaultUpdating(true);
    const storedVault = window.sessionStorage.getItem('vault');
    const storedVaultKey = window.sessionStorage.getItem('vault-key');

    if (storedVault) {
      setVault(JSON.parse(storedVault));
    }

    if (storedVaultKey) {
      setVaultKey(storedVaultKey);
    }

    if (!storedVault || !storedVaultKey) {
      console.error('Error updating vault: No vault or vault key were found');

      if (isProtectedRoute) {
        setIsSigningOut(true);

        await signOut().then(() => {
          router.push('/sign-in');
        });
      } else if (isPublicRoute) {
        setIsSigningOut(false);
      }
    }

    setIsVaultUpdating(false);
  }

  if (isVaultUpdating || isSigningOut) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Icons.spinner className='animate-spin' />
      </div>
    );
  }

  return (
    <VaultContext.Provider value={{ vault, vaultKey, refresh: memoizedRefresh }}>{children}</VaultContext.Provider>
  );
};
