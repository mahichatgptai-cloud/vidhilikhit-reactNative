/**
 * OnboardingSlide2 Component
 * "Ancient Wisdom for Modern Life"
 * Compact top text layout to prevent overlap with the manuscript illustration
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

export const OnboardingSlide2 = ({ onNext, onDotPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboarding2Bg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Top Text Section */}
        <View
          style={[
            styles.topContent,
            { paddingTop: Math.max(insets.top, vh(10)) + vh(1) },
          ]}
        >
          {/* Main Title - responsive font size */}
          <Text style={styles.title}>
            {'Ancient Wisdom\nfor Modern Life'}
          </Text>

          {/* Ornamental Divider */}
          <OrnamentalDivider
            color="#B6936A"
            width={vw(28)}
            diamondSize={rem(5.5)}
            style={styles.divider}
          />

          {/* Subtitle - responsive font size */}
          <Text style={styles.subtitle}>
            Explore insights from Vedic astrology{'\n'}to find clarity in your journey.
          </Text>
        </View>

        {/* Bottom Navigation Controls */}
        <View
          style={[
            styles.bottomContent,
            { paddingBottom: Math.max(insets.bottom, vh(3)) + vh(1.2) },
          ]}
        >
          <View style={styles.footerRow}>
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
                style={[styles.dot, styles.dotActive]}
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
    paddingHorizontal: vw(4),
  },
  bottomContent: {
    paddingHorizontal: vw(6),
    alignItems: 'center',
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
    backgroundColor: '#2A1B10',
  },
  dotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#5C3E26',
  },
  nextButton: {
    position: 'absolute',
    right: 0,
    width: rem(48),
    height: rem(48),
    borderRadius: rem(24),
    backgroundColor: '#24180E',
    borderWidth: 1.5,
    borderColor: '#C89B53',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C89B53',
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

export default OnboardingSlide2;
