/**
 * Standardized API Error Class
 */

export class ApiError extends Error {
  constructor(message, statusCode = 500, data = null, code = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
    this.code = code;
  }

  /**
   * Helper to normalize error from axios or network
   */
  static fromAxiosError(error) {
    if (error.response) {
      // Server responded with non-2xx status
      const data = error.response.data;
      let message =
        data?.message ||
        data?.error ||
        error.message ||
        'An error occurred on the server.';

      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        const details = data.errors.map((e) => e.message || `${e.field || 'Field'} is invalid`).join('. ');
        message = details || message;
      }

      const statusCode = error.response.status;
      const code = data?.code || `HTTP_${statusCode}`;

      return new ApiError(message, statusCode, data, code);
    } else if (error.request) {
      // Request made but no response received
      return new ApiError(
        'Unable to connect to server. Please check your network connection.',
        0,
        null,
        'NETWORK_ERROR'
      );
    } else {
      // Error setting up the request
      return new ApiError(error.message || 'An unexpected error occurred.', 500, null, 'CLIENT_ERROR');
    }
  }
}

export default ApiError;
