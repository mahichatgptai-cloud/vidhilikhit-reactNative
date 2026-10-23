/**
 * Application Configuration and Environment Variables
 */

export const ENV = {
  APP_NAME: 'vidhilikhit',
  APP_ENV: 'development', // 'development' | 'staging' | 'production'
  API_BASE_URL: 'https://api.example.com/v1',
  API_TIMEOUT: 15000,
  ENABLE_LOGS: true,
  ENABLE_ANALYTICS: false,
};

export const isDev = () => ENV.APP_ENV === 'development';
export const isProd = () => ENV.APP_ENV === 'production';

export default ENV;
