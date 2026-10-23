/**
 * OnboardingSlide3 Component
 * "Your Personal Kundali" with "Get Started →" action
 * Compact top text layout to prevent any overlap with the Kundali chart image
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import OrnamentalDivider from '../../components/common/OrnamentalDivider';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const OnboardingSlide3 = ({ onGetStarted, onDotPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboarding3Bg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Top Text Section - Compact to stay strictly within top parchment area */}
        <View
          style={[
            styles.topContent,
            { paddingTop: Math.max(insets.top, 80) + 6 },
          ]}
        >
          {/* Main Title - reduced font size */}
          <Text style={styles.title}>
            {'Your Personal\nKundali'}
          </Text>

          {/* Ornamental Divider - compact */}
          <OrnamentalDivider
            color="#B6936A"
            width={105}
            diamondSize={5.5}
            style={styles.divider}
          />

          {/* Subtitle - reduced font size, no overlap on kundali */}
          <Text style={styles.subtitle}>
            Discover your unique birth chart and{'\n'}deep insights about your personality,{'\n'}strengths, challenges and life path.
          </Text>
        </View>

        {/* Bottom Section: 3 Dots + Wide "Get Started →" Pill Button */}
        <View
          style={[
            styles.bottomContent,
            { paddingBottom: Math.max(insets.bottom, 20) + 10 },
          ]}
        >
          {/* 3 Pagination Dots */}
          <View style={styles.dotsContainer}>
            <TouchableOpacity
              onPress={() => onDotPress?.(0)}
              activeOpacity={0.8}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[styles.dot, styles.dotInactive]}
            />
            <TouchableOpacity
              onPress={() => onDotPress?.(1)}
              activeOpacity={0.8}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[styles.dot, styles.dotInactive]}
            />
            <TouchableOpacity
              onPress={() => onDotPress?.(2)}
              activeOpacity={0.8}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[styles.dot, styles.dotActive]}
            />
          </View>

          {/* Wide "Get Started →" Pill Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={onGetStarted}
            activeOpacity={0.85}
            accessibilityLabel="Get Started"
            accessibilityRole="button"
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#D7BC9F',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  topContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 24,
    fontWeight: '700',
    color: '#2A1B10',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  divider: {
    marginVertical: 5,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: 14,
    fontWeight: '400',
    color: '#4A3525',
    textAlign: 'center',
    lineHeight: 16.5,
    paddingHorizontal: 12,
  },
  bottomContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  dot: {
    width: 7.5,
    height: 7.5,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#2A1B10',
  },
  dotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#5C3E26',
  },
  getStartedButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  buttonArrow: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: 17,
    fontWeight: '700',
    marginTop: -1,
  },
});

export default OnboardingSlide3;
