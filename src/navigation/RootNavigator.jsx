/**
 * RootNavigator Component
 * Top-level navigator that orchestrates splash, authentication, and application screens
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, DEFAULT_SCREEN_OPTIONS } from './navigationTypes';
import { linking } from './linking';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
        {isAuthenticated ? (
          <Stack.Screen name={ROUTES.APP_STACK} component={AppNavigator} />
        ) : (
          <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
