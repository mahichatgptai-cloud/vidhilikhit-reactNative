/**
 * OnboardingSlide1 Component
 * "Your Story is Written in the Stars"
 * Reduced font sizes and enhanced text readability with subtle scrim & text shadow
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
import { vw, vh, rem } from '../../theme/responsive';

export const OnboardingSlide1 = ({ onNext, onDotPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboarding1Bg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          style={[
            styles.bottomContent,
            { paddingBottom: Math.max(insets.bottom, vh(3.5)) + vh(1.2) },
          ]}
        >
          {/* Text Card with subtle scrim for crystal clear readability */}
          <View style={styles.textContainer}>
            {/* Main Title - responsive bold crisp white with shadow */}
            <Text style={styles.title}>
              {'Your Story\nis Written in the Stars'}
            </Text>

            {/* Subtitle - responsive readable warm cream with shadow */}
            <Text style={styles.subtitle}>
              Explore the wisdom of Vedic astrology{'\n'}to understand your life,
              relationships{'\n'}and future possibilities.
            </Text>
          </View>

          {/* Navigation Controls: Centered Dots + Bottom Right Next Button */}
          <View style={styles.footerRow}>
            {/* 3 Pagination Dots */}
            <View style={styles.dotsContainer}>
              <TouchableOpacity
                onPress={() => onDotPress?.(0)}
                activeOpacity={0.8}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={[styles.dot, styles.dotActive]}
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
                style={[styles.dot, styles.dotInactive]}
              />
            </View>

            {/* Circular Next Arrow Button */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onNext}
              activeOpacity={0.75}
              accessibilityLabel="Next screen"
              accessibilityRole="button"
            >
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: vw(100),
    height: vh(100),
    backgroundColor: '#160F0A',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContent: {
    paddingHorizontal: vw(6),
    alignItems: 'center',
    paddingTop: vh(2),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: vh(2.8),
    paddingHorizontal: vw(2),
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(24),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: rem(30),
    letterSpacing: 0.3,
    marginBottom: vh(1.2),
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14),
    fontWeight: '400',
    color: '#EFE3D5',
    textAlign: 'center',
    lineHeight: rem(19.5),
    paddingHorizontal: vw(2),
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  footerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: vh(6),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2.5),
  },
  dot: {
    width: rem(8),
    height: rem(8),
    borderRadius: rem(4),
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#C0A892',
  },
  nextButton: {
    position: 'absolute',
    right: 0,
    width: rem(48),
    height: rem(48),
    borderRadius: rem(24),
    backgroundColor: '#1E140C',
    borderWidth: 1.5,
    borderColor: '#D4A359',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A359',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  arrowIcon: {
    fontFamily: fontFamily.bold,
    color: '#E5B869',
    fontSize: rem(21),
    fontWeight: '700',
    marginTop: -2,
  },
});

export default OnboardingSlide1;
