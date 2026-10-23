/**
 * Application Constants
 */

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@vidhilikhit/auth_token',
  REFRESH_TOKEN: '@vidhilikhit/refresh_token',
  USER_DATA: '@vidhilikhit/user_data',
  THEME_MODE: '@vidhilikhit/theme_mode',
  APP_LANGUAGE: '@vidhilikhit/app_language',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const APP_ROUTES = {
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  HOME: 'Home',
  PROFILE: 'Profile',
};

export default {
  REGEX,
  STORAGE_KEYS,
  HTTP_STATUS,
  APP_ROUTES,
};
