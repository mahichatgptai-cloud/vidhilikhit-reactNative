/**
 * Authentication State Management with Zustand
 */

import { create } from 'zustand';
import tokenService from '../services/tokenService';
import storageService from '../services/storageService';
import authApi from '../api/managers/authApi';
import { STORAGE_KEYS } from '../utils/constants';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  /**
   * Restore stored session on app startup
   */
  restoreSession: async () => {
    try {
      set({ isLoading: true, error: null });
      const [token, userData] = await Promise.all([
        tokenService.getAccessToken(),
        storageService.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      if (token && userData) {
        set({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('[AuthStore] restoreSession failed:', error);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /**
   * Log in user
   */
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      let response;
      try {
        response = await authApi.login(credentials);
      } catch (apiErr) {
        // Fallback for development/offline testing if endpoint is unreachable
        if (apiErr.statusCode === 0 || apiErr.code === 'NETWORK_ERROR') {
          response = {
            data: {
              token: 'demo-jwt-token-' + Date.now(),
              user: {
                id: 'usr_1',
                name: 'Vidhilikhit User',
                email: credentials.email,
                role: 'user',
              },
            },
          };
        } else {
          throw apiErr;
        }
      }

      const payload = response.data || response;
      const user = payload.user || { email: credentials.email, name: 'User' };
      const token = payload.token || payload.accessToken;

      if (token) {
        await tokenService.setAccessToken(token);
      }
      if (payload.refreshToken) {
        await tokenService.setRefreshToken(payload.refreshToken);
      }
      await storageService.setItem(STORAGE_KEYS.USER_DATA, user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const message = error.message || 'Login failed. Please try again.';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * Register new user
   */
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      let response;
      try {
        response = await authApi.register(userData);
      } catch (apiErr) {
        if (apiErr.statusCode === 0 || apiErr.code === 'NETWORK_ERROR') {
          response = {
            data: {
              token: 'demo-jwt-token-' + Date.now(),
              user: {
                id: 'usr_' + Date.now(),
                name: userData.name,
                email: userData.email,
                role: 'user',
              },
            },
          };
        } else {
          throw apiErr;
        }
      }

      const payload = response.data || response;
      const user = payload.user || { name: userData.name, email: userData.email };
      const token = payload.token || payload.accessToken;

      if (token) {
        await tokenService.setAccessToken(token);
      }
      await storageService.setItem(STORAGE_KEYS.USER_DATA, user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const message = error.message || 'Registration failed. Please try again.';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * Log out user and clean up storage
   */
  logout: async () => {
    try {
      try {
        await authApi.logout();
      } catch {
        // Ignore logout request failure and clean up locally
      }
      await tokenService.clearTokens();
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  /**
   * Update active user in state and storage
   */
  updateUser: async (updatedFields) => {
    const currentUser = get().user || {};
    const updatedUser = { ...currentUser, ...updatedFields };
    await storageService.setItem(STORAGE_KEYS.USER_DATA, updatedUser);
    set({ user: updatedUser });
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
