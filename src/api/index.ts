import { AxiosRequestConfig } from 'axios';

import axiosInstance from '@/cdk/lib/axios-instance.lib';

export const signUp = async (payload: {
  password: string;
  email: string;
}): Promise<{ salt: string; vault: string; accessToken: string }> => {
  return await axiosInstance
    .post<{ salt: string; vault: string; accessToken: string }>('auth/sign-up', payload)
    .then((res) => res.data);
};

export const signIn = async (payload: {
  email: string;
  password: string;
}): Promise<{ salt: string; vault: string; accessToken: string }> => {
  return axiosInstance
    .post<{ salt: string; vault: string; accessToken: string }>('auth/sign-in', payload)
    .then((res) => res.data);
};

export const signOut = async (): Promise<void> => {
  return axiosInstance.post('auth/sign-out').then(() => {
    sessionStorage.removeItem('vault');
    sessionStorage.removeItem('vault-key');
  });
};

export const checkAuth = async (): Promise<{ isAuth: true }> => {
  return axiosInstance.get('auth/check-auth').then((res) => res.data);
};

export const getCurrentUser = async (): Promise<{ id: string; email: string }> => {
  return axiosInstance.post('auth/current-user').then((res) => res.data);
};

export const saveVault = async ({ encryptedVault }: { encryptedVault: string }): Promise<void> => {
  return axiosInstance.put('vault', { encryptedVault }).then((res) => res.data);
};
