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
  TELL_US_ABOUT_YOURSELF: 'TellUsAboutYourself',
  BIRTH_TIME_ACCURACY: 'BirthTimeAccuracy',
  BIRTH_DETAILS: 'BirthDetails',
  REVIEW_DETAILS: 'ReviewDetails',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',

  // Main App Stack
  APP_STACK: 'AppStack',
  HOME: 'Home',
  MY_KUNDALI: 'MyKundali',
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
