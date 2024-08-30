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

export const checkAuth = async (): Promise<{ isAuth: true }> => {
  return axiosInstance.get('auth/check-auth').then((res) => res.data);
};

export const saveVault = async ({ encryptedVault }: { encryptedVault: string }): Promise<void> => {
  return axiosInstance.put('vault', { encryptedVault }).then((res) => res.data);
};
