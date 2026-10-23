/**
 * Global JavaScript Type Definitions and Object Shapes
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 * @property {string} [role]
 * @property {string} [createdAt]
 *
 * @typedef {Object} AuthTokens
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {number} expiresIn
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const APP_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export default {
  USER_ROLES,
  APP_THEMES,
};
