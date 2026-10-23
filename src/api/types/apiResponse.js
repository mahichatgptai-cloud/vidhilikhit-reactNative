/**
 * Standard API Response Shapes and JSDoc Definitions
 *
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} data
 * @property {string} [message]
 * @property {number} [statusCode]
 *
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success
 * @property {Array<any>} data
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 * @property {number} totalPages
 */

export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Helper to construct standardized response object
 */
export const createApiResponse = (data, success = true, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export default {
  API_STATUS,
  createApiResponse,
};
