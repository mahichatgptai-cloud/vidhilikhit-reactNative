/**
 * Axios API Client Instance Configuration
 */

import axios from 'axios';
import { ENV } from '../../config/env';
import { setupInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach request and response interceptors
setupInterceptors(apiClient);

export default apiClient;
