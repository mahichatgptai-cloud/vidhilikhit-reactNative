/**
 * Local Storage Service using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  /**
   * Save an item (string or object)
   */
  async setItem(key, value) {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`[StorageService] Error saving key "${key}":`, error);
      return false;
    }
  },

  /**
   * Retrieve an item
   */
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`[StorageService] Error getting key "${key}":`, error);
      return null;
    }
  },

  /**
   * Remove an item
   */
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
      return false;
    }
  },

  /**
   * Clear all stored data
   */
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('[StorageService] Error clearing storage:', error);
      return false;
    }
  },
};

export default storageService;
