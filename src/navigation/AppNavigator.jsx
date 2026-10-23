/**
 * AppNavigator Component
 * Main application stack navigator (Home, Profile, etc.)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, DEFAULT_SCREEN_OPTIONS } from './navigationTypes';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS} initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
