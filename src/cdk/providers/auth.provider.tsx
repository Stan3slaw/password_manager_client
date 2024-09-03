'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { checkAuth } from '@/api';
import { Vault } from '@/cdk/types/vault.type';

export type AuthContextType = {
  isAuthenticated: boolean;
  vault: Vault;
  vaultKey: string;
  isAuthChecking: boolean;
  refresh: () => Promise<void>;
};

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up'];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vault, setVault] = useState<Vault>({});
  const [vaultKey, setVaultKey] = useState<string>('');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const memoizedRefresh = useCallback(refresh, [isPublicRoute, isProtectedRoute, router]);

  useEffect(() => {
    memoizedRefresh();
  }, [pathname, memoizedRefresh]);

  async function refresh(): Promise<void> {
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
  }

  if (isAuthChecking) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, vault, vaultKey, isAuthChecking, refresh: memoizedRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};
