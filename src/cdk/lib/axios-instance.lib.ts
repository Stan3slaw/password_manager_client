'use client';

import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      const { cookies } = await import('next/headers');

      const token = cookies().get('access-token')?.value;

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
