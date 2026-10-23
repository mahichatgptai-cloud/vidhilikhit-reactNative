/**
 * User API Service Methods
 */

import apiClient from '../client/apiClient';
import { USER_ENDPOINTS } from '../endpoints/userEndpoints';

export const userApi = {
  /**
   * Fetch current authenticated user's profile
   */
  async getProfile() {
    return await apiClient.get(USER_ENDPOINTS.GET_PROFILE);
  },

  /**
   * Update profile information
   * @param {Object} profileData
   */
  async updateProfile(profileData) {
    return await apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, profileData);
  },

  /**
   * Change user password
   * @param {Object} payload
   * @param {string} payload.currentPassword
   * @param {string} payload.newPassword
   */
  async changePassword(payload) {
    return await apiClient.post(USER_ENDPOINTS.CHANGE_PASSWORD, payload);
  },

  /**
   * Delete account
   */
  async deleteAccount() {
    return await apiClient.delete(USER_ENDPOINTS.DELETE_ACCOUNT);
  },
};

export default userApi;
