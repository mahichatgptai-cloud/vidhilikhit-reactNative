/**
 * Notification Service
 * Manages toast triggers, alert dispatches, and push notification handlers
 */

import { Alert } from 'react-native';

class NotificationService {
  constructor() {
    this.listeners = new Set();
  }

  /**
   * Subscribe to in-app toast notifications
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Show in-app banner toast notification
   * @param {'info' | 'success' | 'warning' | 'error'} type
   * @param {string} message
   * @param {number} duration
   */
  showToast(type = 'info', message = '', duration = 3000) {
    this.listeners.forEach((listener) => {
      try {
        listener({ type, message, duration, id: Date.now() });
      } catch (err) {
        console.warn('[NotificationService] listener error:', err);
      }
    });
  }

  /**
   * Show native system alert
   */
  showAlert(title, message, buttons = [{ text: 'OK' }]) {
    Alert.alert(title, message, buttons);
  }
}

export const notificationService = new NotificationService();
export default notificationService;
