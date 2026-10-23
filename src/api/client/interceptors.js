/**
 * Axios Request and Response Interceptors
 */

import tokenService from '../../services/tokenService';
import ApiError from './apiError';
import { ENV } from '../../config/env';

/**
 * Configure request and response interceptors for an Axios instance
 * @param {import('axios').AxiosInstance} axiosInstance
 */
export const setupInterceptors = (axiosInstance) => {
  // Request Interceptor: Attach Auth Token
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await tokenService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn('[Interceptors] Error retrieving token:', err);
      }

      if (ENV.ENABLE_LOGS) {
        console.log(`[API Request] [${config.method?.toUpperCase()}] ${config.url}`, config.data || '');
      }

      return config;
    },
    (error) => {
      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  // Response Interceptor: Unwrap data & standardize errors
  axiosInstance.interceptors.response.use(
    (response) => {
      if (ENV.ENABLE_LOGS) {
        console.log(`[API Response] [${response.config.method?.toUpperCase()}] ${response.config.url}`, response.status);
      }
      return response.data;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized - Attempt Token Refresh
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await tokenService.getRefreshToken();
          if (refreshToken) {
            // Attempt to fetch new token
            const refreshResponse = await axiosInstance.post('/auth/refresh-token', {
              refreshToken,
            });

            const newToken = refreshResponse?.data?.accessToken || refreshResponse?.accessToken;
            if (newToken) {
              await tokenService.setAccessToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest);
            }
          }
        } catch (refreshErr) {
          // Token refresh failed, clear tokens
          await tokenService.clearTokens();
          return Promise.reject(ApiError.fromAxiosError(refreshErr));
        }
      }

      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );
};

export default setupInterceptors;
