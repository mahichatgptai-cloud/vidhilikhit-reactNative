/**
 * Authentication State Management with Zustand
 */

import { create } from 'zustand';
import tokenService from '../services/tokenService';
import storageService from '../services/storageService';
import authApi from '../api/managers/authApi';
import userApi from '../api/managers/userApi';
import { STORAGE_KEYS } from '../utils/constants';
import { formatBirthDetails, normalizeUser } from '../utils/birthDetailsHelper';

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
        const normalized = normalizeUser(userData);
        set({
          user: normalized,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        // Silently fetch fresh profile from API in background
        get().fetchProfile().catch(() => {});
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
   * POST /api/v1/auth/login
   */
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({
        email: credentials.email?.trim(),
        password: credentials.password,
      });

      const payload = response.data || response;
      const user = normalizeUser(payload.user || { email: credentials.email });
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
   * POST /api/v1/auth/register
   */
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const payload = {
        fullName: userData.fullName || userData.name || '',
        email: userData.email?.trim() || '',
        mobileNumber: userData.mobileNumber || userData.phone || '',
        password: userData.password,
        termsAccepted: userData.termsAccepted ?? true,
        birthDetails: formatBirthDetails(userData.birthDetails || userData),
      };

      const response = await authApi.register(payload);
      const resData = response.data || response;
      const user = normalizeUser(resData.user || { name: payload.fullName, email: payload.email });
      const token = resData.token || resData.accessToken;

      // Do NOT log in automatically on registration; user will manually log in
      set({
        isLoading: false,
        error: null,
      });

      return {
        success: true,
        message: response.message || 'Account created successfully.',
        user,
        email: payload.email,
      };
    } catch (error) {
      const message = error.message || 'Registration failed. Please try again.';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * Fetch current user profile from server
   * GET /api/v1/users/profile
   */
  fetchProfile: async () => {
    try {
      const response = await userApi.getProfile();
      const userData = response.data || response;
      if (userData) {
        const normalized = normalizeUser(userData);
        await storageService.setItem(STORAGE_KEYS.USER_DATA, normalized);
        set({ user: normalized });
        return { success: true, user: normalized };
      }
    } catch (error) {
      console.warn('[AuthStore] fetchProfile failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Request password reset link/token
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.forgotPassword(email);
      set({ isLoading: false });
      return {
        success: true,
        message: response.message || 'Password reset link has been dispatched.',
        data: response.data,
      };
    } catch (error) {
      const message = error.message || 'Failed to dispatch password reset request.';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  /**
   * Reset password with single-use token
   * POST /api/v1/auth/reset-password
   */
  resetPassword: async ({ token, newPassword }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.resetPassword({ token, newPassword });
      set({ isLoading: false });
      return {
        success: true,
        message: response.message || 'Password has been reset successfully.',
      };
    } catch (error) {
      const message = error.message || 'Failed to reset password. Please verify the token.';
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
    const updatedUser = normalizeUser({ ...currentUser, ...updatedFields });
    await storageService.setItem(STORAGE_KEYS.USER_DATA, updatedUser);
    set({ user: updatedUser });
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
