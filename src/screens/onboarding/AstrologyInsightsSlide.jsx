/**
 * AstrologyInsightsSlide Component
 * Screen 2 of New Onboarding: "Personalized Astrology Insights"
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import OrnamentalDivider from '../../components/common/OrnamentalDivider';
import {
  IconTrend,
  IconHeart,
  IconBriefcase,
  IconLotus,
} from '../../components/common/VedicIcons';
import { vw, vh, rem } from '../../theme/responsive';

const INSIGHT_ITEMS = [
  {
    id: 'understand',
    title: 'Understand Yourself',
    description: 'Discover your strengths, weaknesses and true potential.',
    renderIcon: () => <IconTrend size={rem(22)} color="#E5B869" />,
  },
  {
    id: 'relationships',
    title: 'Better Relationships',
    description: 'Find compatibility and build stronger connections.',
    renderIcon: () => <IconHeart size={rem(22)} color="#E5B869" />,
  },
  {
    id: 'career',
    title: 'Career Guidance',
    description: 'Make informed decisions for a successful future.',
    renderIcon: () => <IconBriefcase size={rem(22)} color="#E5B869" />,
  },
  {
    id: 'clarity',
    title: 'Life Clarity',
    description: 'Get answers to important questions and navigate challenges with wisdom.',
    renderIcon: () => <IconLotus size={rem(22)} color="#E5B869" />,
  },
];

export const AstrologyInsightsSlide = ({ onNext, onSkip, onDotPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.parchmentBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Header Bar: Centered 3 Dots + Top-Right Skip Button */}
        <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, vh(11)) + vh(1) }]}>
          <View style={styles.headerLeftSpacer} />

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
            {'Personalized\nAstrology Insights'}
          </Text>

          <OrnamentalDivider
            color="#B39268"
            width={vw(28)}
            diamondSize={rem(5.5)}
            style={styles.divider}
          />
        </View>

        {/* Feature Cards List */}
        <ScrollView
          style={styles.featuresList}
          contentContainerStyle={styles.featuresContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {INSIGHT_ITEMS.map((item) => (
            <View key={item.id} style={styles.featureRow}>
              {/* Circular Gold-Bordered Icon Badge */}
              <View style={styles.iconBadge}>
                {item.renderIcon()}
              </View>

              {/* Text Block */}
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Section: Wide "Next →" Pill */}
        <View style={[styles.bottomSection, { paddingBottom: Math.max(insets.bottom, vh(2.5)) + vh(1.2) }]}>
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
    width: vw(100),
    height: vh(100),
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
    paddingHorizontal: vw(6),
    height: vh(5.8),
  },
  headerLeftSpacer: {
    width: rem(48),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
    marginBottom: vh(7),
  },
  dot: {
    width: rem(7.5),
    height: rem(7.5),
    borderRadius: rem(3.75),
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
    width: rem(48),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    fontWeight: '600',
    color: '#5E4432',
  },
  topTextSection: {
    alignItems: 'center',
    paddingHorizontal: vw(6),
    marginTop: vh(0.5),
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(26),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    lineHeight: rem(33),
    letterSpacing: 0.3,
  },
  divider: {
    marginVertical: vh(1),
  },
  featuresList: {
    flex: 1,
    paddingHorizontal: vw(6),
  },
  featuresContent: {
    paddingVertical: vh(1),
    gap: vh(1.8),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(0.5),
  },
  iconBadge: {
    width: rem(48),
    height: rem(48),
    borderRadius: rem(24),
    backgroundColor: '#082529',
    borderWidth: 1.5,
    borderColor: '#D4A359',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(4),
    shadowColor: '#D4A359',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  featureDescription: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12.5),
    color: '#4E3726',
    lineHeight: rem(17),
  },
  bottomSection: {
    width: '100%',
    paddingHorizontal: vw(6),
  },
  nextButton: {
    width: '100%',
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(26),
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
    gap: vw(2),
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(16.5),
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  buttonArrow: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(18),
    fontWeight: '700',
    marginTop: -1,
  },
});

export default AstrologyInsightsSlide;
