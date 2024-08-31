'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

import { checkAuth } from '@/api';
import { VaultItem } from '@/cdk/types/vault.type';

type AuthContextType = {
  isAuthenticated: boolean;
  vault: VaultItem[];
  vaultKey: string;
  isAuthChecking: boolean;
};

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up'];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState<string>('');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const execute = async (): Promise<void> => {
      try {
        const { isAuth } = await checkAuth();
        setIsAuthenticated(isAuth);

        if (isAuth) {
          const storedVault = window.sessionStorage.getItem('vault');
          const storedVaultKey = window.sessionStorage.getItem('vault-key');

          if (storedVault) {
            setVault(JSON.parse(storedVault));
          }

          if (storedVaultKey) {
            setVaultKey(storedVaultKey);
          }

          if (isPublicRoute) {
            router.push('/');
          }
        } else {
          if (!isPublicRoute) {
            router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);

        if (isProtectedRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsAuthChecking(false);
      }
    };

    execute();
  }, [pathname]);

  if (isAuthChecking) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, vault, vaultKey, isAuthChecking }}>{children}</AuthContext.Provider>
  );
};
