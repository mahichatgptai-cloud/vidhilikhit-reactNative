/**
 * Navigation Screen Identifiers and Route Constants
 */

export const ROUTES = {
  // Flow 1: Launch & Onboarding
  SPLASH: 'Splash',
  BRAND_INTRO: 'BrandIntro',
  ONBOARDING: 'Onboarding',

  // Flow 2: Authentication & Setup
  AUTH_STACK: 'AuthStack',
  REGISTER: 'Register',
  LOGIN: 'Login',
  BIRTH_DETAILS: 'BirthDetails',
  FORGOT_PASSWORD: 'ForgotPassword',

  // Main App Stack
  APP_STACK: 'AppStack',
  HOME: 'Home',
  PROFILE: 'Profile',
};

export const DEFAULT_SCREEN_OPTIONS = {
  headerShown: false,
  animation: 'slide_from_right',
};

export default {
  ROUTES,
  DEFAULT_SCREEN_OPTIONS,
};
