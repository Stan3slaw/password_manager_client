import axiosInstance from '@/cdk/lib/axios-instance.lib';

export const signUp = async (payload: {
  password: string;
  email: string;
}): Promise<{ salt: string; vault: string; accessToken: string }> => {
  return await axiosInstance
    .post<{ salt: string; vault: string; accessToken: string }>('auth/sign-up', payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const signIn = async (payload: {
  email: string;
  password: string;
}): Promise<{ salt: string; vault: string; accessToken: string }> => {
  return axiosInstance
    .post<{ salt: string; vault: string; accessToken: string }>('auth/sign-in', payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const checkAuth = async (): Promise<void> => {
  return axiosInstance.get('auth/check-auth');
};

export const saveVault = ({ encryptedVault }: { encryptedVault: string }): Promise<void> => {
  return axiosInstance.put('vault', { encryptedVault }, { withCredentials: true }).then((res) => res.data);
};
