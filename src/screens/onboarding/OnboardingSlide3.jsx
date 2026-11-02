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
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import OrnamentalDivider from '../../components/common/OrnamentalDivider';
import { vw, vh, rem } from '../../theme/responsive';

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
            { paddingTop: Math.max(insets.top, vh(9.5)) + vh(1) },
          ]}
        >
          {/* Main Title - responsive font size */}
          <Text style={styles.title}>
            {'Your Personal\nKundali'}
          </Text>

          {/* Ornamental Divider - responsive */}
          <OrnamentalDivider
            color="#B6936A"
            width={vw(28)}
            diamondSize={rem(5.5)}
            style={styles.divider}
          />

          {/* Subtitle - responsive font size, no overlap on kundali */}
          <Text style={styles.subtitle}>
            Discover your unique birth chart and{'\n'}deep insights about your personality,{'\n'}strengths, challenges and life path.
          </Text>
        </View>

        {/* Bottom Section: 3 Dots + Wide "Get Started →" Pill Button */}
        <View
          style={[
            styles.bottomContent,
            { paddingBottom: Math.max(insets.bottom, vh(3)) + vh(1.2) },
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
    width: vw(100),
    height: vh(100),
    backgroundColor: '#D7BC9F',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  topContent: {
    paddingHorizontal: vw(6),
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(24),
    fontWeight: '700',
    color: '#2A1B10',
    textAlign: 'center',
    lineHeight: rem(29),
    letterSpacing: 0.3,
  },
  divider: {
    marginVertical: vh(0.8),
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14),
    fontWeight: '400',
    color: '#4A3525',
    textAlign: 'center',
    lineHeight: rem(18),
    paddingHorizontal: vw(3),
  },
  bottomContent: {
    paddingHorizontal: vw(6),
    alignItems: 'center',
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2.5),
    marginBottom: vh(2),
  },
  dot: {
    width: rem(8),
    height: rem(8),
    borderRadius: rem(4),
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
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(25),
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
    gap: vw(2),
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(16),
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  buttonArrow: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(17),
    fontWeight: '700',
    marginTop: -1,
  },
});

export default OnboardingSlide3;
