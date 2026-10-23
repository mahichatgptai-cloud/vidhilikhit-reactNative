/**
 * Input validation utilities
 */

import { REGEX } from './constants';

export const validators = {
  isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return REGEX.EMAIL.test(email.trim());
  },

  isValidPassword(password) {
    if (!password || typeof password !== 'string') return false;
    return password.length >= 8;
  },

  isStrongPassword(password) {
    if (!password || typeof password !== 'string') return false;
    return REGEX.STRONG_PASSWORD.test(password);
  },

  isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    return REGEX.PHONE.test(phone.trim());
  },

  isNotEmpty(value) {
    return value !== null && value !== undefined && String(value).trim().length > 0;
  },

  hasMinLength(value, minLength) {
    if (!value) return false;
    return String(value).trim().length >= minLength;
  },
};

export default validators;
