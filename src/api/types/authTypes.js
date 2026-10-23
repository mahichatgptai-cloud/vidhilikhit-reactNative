/**
 * Auth Request/Response Object Shapes and Action Types
 *
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} RegisterRequest
 * @property {string} name
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} ForgotPasswordRequest
 * @property {string} email
 *
 * @typedef {Object} AuthResponseData
 * @property {Object} user
 * @property {string} token
 * @property {string} [refreshToken]
 */

export const AUTH_ACTIONS = {
  LOGIN_START: 'AUTH/LOGIN_START',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',
  REFRESH_TOKEN: 'AUTH/REFRESH_TOKEN',
  UPDATE_USER: 'AUTH/UPDATE_USER',
};

export default {
  AUTH_ACTIONS,
};
