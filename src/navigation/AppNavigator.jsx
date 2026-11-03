/**
 * AppNavigator Component
 * Main application stack navigator (Home, Profile, etc.)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, DEFAULT_SCREEN_OPTIONS } from './navigationTypes';
import TellUsAboutYourselfScreen from '../screens/onboarding/TellUsAboutYourselfScreen';
import BirthTimeAccuracyScreen from '../screens/onboarding/BirthTimeAccuracyScreen';
import BirthDetailsScreen from '../screens/onboarding/BirthDetailsScreen';
import ReviewDetailsScreen from '../screens/onboarding/ReviewDetailsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import MyKundaliScreen from '../screens/kundali/MyKundaliScreen';
import MatchmakingIntroScreen from '../screens/matchmaking/MatchmakingIntroScreen';
import PartnerDetailsScreen from '../screens/matchmaking/PartnerDetailsScreen';
import CompatibilityReportScreen from '../screens/matchmaking/CompatibilityReportScreen';
import CompatibilityDetailsScreen from '../screens/matchmaking/CompatibilityDetailsScreen';
import DailyGuidanceScreen from '../screens/guidance/DailyGuidanceScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import BotScreen from '../screens/bot/BotScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={DEFAULT_SCREEN_OPTIONS}
      initialRouteName={ROUTES.TELL_US_ABOUT_YOURSELF}
    >
      <Stack.Screen name={ROUTES.TELL_US_ABOUT_YOURSELF} component={TellUsAboutYourselfScreen} />
      <Stack.Screen name={ROUTES.BIRTH_TIME_ACCURACY} component={BirthTimeAccuracyScreen} />
      <Stack.Screen name={ROUTES.BIRTH_DETAILS} component={BirthDetailsScreen} />
      <Stack.Screen name={ROUTES.REVIEW_DETAILS} component={ReviewDetailsScreen} />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.MY_KUNDALI} component={MyKundaliScreen} />
      <Stack.Screen name={ROUTES.MATCHMAKING} component={MatchmakingIntroScreen} />
      <Stack.Screen name={ROUTES.PARTNER_DETAILS} component={PartnerDetailsScreen} />
      <Stack.Screen name={ROUTES.COMPATIBILITY_REPORT} component={CompatibilityReportScreen} />
      <Stack.Screen name={ROUTES.COMPATIBILITY_DETAILS} component={CompatibilityDetailsScreen} />
      <Stack.Screen name={ROUTES.DAILY_GUIDANCE} component={DailyGuidanceScreen} />
      <Stack.Screen name={ROUTES.REPORTS} component={ReportsScreen} />
      <Stack.Screen name={ROUTES.BOT} component={BotScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
