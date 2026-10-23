/**
 * Token Storage and Retrieval Service
 */

import storageService from './storageService';
import { STORAGE_KEYS } from '../utils/constants';

export const tokenService = {
  /**
   * Get stored access token
   */
  async getAccessToken() {
    return await storageService.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Save access token
   */
  async setAccessToken(token) {
    return await storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Get refresh token
   */
  async getRefreshToken() {
    return await storageService.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  /**
   * Save refresh token
   */
  async setRefreshToken(token) {
    return await storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  /**
   * Save both tokens
   */
  async saveTokens(accessToken, refreshToken) {
    await Promise.all([
      tokenService.setAccessToken(accessToken),
      refreshToken ? tokenService.setRefreshToken(refreshToken) : Promise.resolve(),
    ]);
  },

  /**
   * Clear all auth tokens
   */
  async clearTokens() {
    await Promise.all([
      storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      storageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      storageService.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  },
};

export default tokenService;
