/**
 * Authentication API Service Methods
 */

import apiClient from '../client/apiClient';
import { AUTH_ENDPOINTS } from '../endpoints/authEndpoints';

export const authApi = {
  /**
   * Log in user with credentials
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   */
  async login(credentials) {
    return await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
  },

  /**
   * Register a new user
   * @param {Object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.password
   */
  async register(userData) {
    return await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
  },

  /**
   * Log out user
   */
  async logout() {
    return await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  },

  /**
   * Refresh access token
   * @param {string} refreshToken
   */
  async refreshToken(refreshToken) {
    return await apiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
  },

  /**
   * Send forgot password email
   * @param {string} email
   */
  async forgotPassword(email) {
    return await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password with reset token
   * @param {Object} payload
   */
  async resetPassword(payload) {
    return await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, payload);
  },
};

export default authApi;
