/**
 * Deep Linking Configuration for React Navigation
 */

import { ROUTES } from './navigationTypes';

export const linking = {
  prefixes: ['vidhilikhit://', 'https://vidhilikhit.app'],
  config: {
    screens: {
      [ROUTES.SPLASH]: 'splash',
      [ROUTES.AUTH_STACK]: {
        screens: {
          [ROUTES.LOGIN]: 'login',
          [ROUTES.REGISTER]: 'register',
          [ROUTES.FORGOT_PASSWORD]: 'forgot-password',
        },
      },
      [ROUTES.APP_STACK]: {
        screens: {
          [ROUTES.HOME]: 'home',
          [ROUTES.PROFILE]: 'profile',
        },
      },
    },
  },
};

export default linking;
