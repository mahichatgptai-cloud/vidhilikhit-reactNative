/**
 * DecodeDestinySlide Component
 * Screen 1 of New Onboarding: "Decode Your Destiny"
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

export const DecodeDestinySlide = ({ onNext, onSkip, onDotPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.sageReadingBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Header Bar: Centered 3 Dots + Top-Right Skip Button */}
        <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 100) + 8 }]}>
          <View style={styles.headerLeftSpacer} />

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

          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Top Text Section */}
        <View style={styles.topTextSection}>
          <Text style={styles.title}>
            {'Decode Your\nDestiny'}
          </Text>

          <OrnamentalDivider
            color="#B39268"
            width={110}
            diamondSize={5.5}
            style={styles.divider}
          />

          <Text style={styles.subtitle}>
            {'Understand your personality,\nrelationships, career and future\nthrough Vedic astrology.'}
          </Text>
        </View>

        {/* Spacer pushing content to bottom */}
        <View style={styles.centerSpacer} />

        {/* Bottom Button Section: Wide "Next →" Pill */}
        <View style={[styles.bottomSection, { paddingBottom: Math.max(insets.bottom, 20) + 12 }]}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNext}
            activeOpacity={0.85}
            accessibilityLabel="Next"
            accessibilityRole="button"
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Next</Text>
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
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 48,
  },
  headerLeftSpacer: {
    width: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom:70
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    backgroundColor: '#26160C',
  },
  dotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.4,
    borderColor: '#6B4A30',
  },
  skipButton: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    fontWeight: '600',
    color: '#5E4432',
  },
  topTextSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 24,
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    lineHeight: 33,
    letterSpacing: 0.3,
  },
  divider: {
    marginVertical: 8,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: 14,
    color: '#4A3525',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  centerSpacer: {
    flex: 1,
  },
  bottomSection: {
    width: '100%',
    paddingHorizontal: 24,
  },
  nextButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
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
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  buttonArrow: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
});

export default DecodeDestinySlide;
