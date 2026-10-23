/**
 * AuthNavigator Component
 * Stack navigator managing authentication flow (Login, Register, Forgot Password)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, DEFAULT_SCREEN_OPTIONS } from './navigationTypes';
import SplashScreen from '../screens/splash/SplashScreen';
import BrandIntroScreen from '../screens/onboarding/BrandIntroScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import BirthDetailsScreen from '../screens/onboarding/BirthDetailsScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS} initialRouteName={ROUTES.SPLASH}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.BRAND_INTRO} component={BrandIntroScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.BIRTH_DETAILS} component={BirthDetailsScreen} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
