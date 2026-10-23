/**
 * SplashScreen Component
 * Screen 1: Displays the background image from \vidhilikhit\src\assets\images\splash_screen.png
 * with exact brand typography, Devanagari script, ornamental divider, and taglines.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { fontFamily } from '../../theme/typography';
import OrnamentalDivider from '../../components/common/OrnamentalDivider';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../navigation/navigationTypes';

// Direct require ensures Metro bundler directly resolves \src\assets\images\splash_screen.png
const splashBackground = require('../../assets/images/splash_screen.png');

export const SplashScreen = ({ navigation }) => {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasNavigated = useRef(false);

  const handleContinue = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    if (isAuthenticated) {
      navigation?.replace?.(ROUTES.APP_STACK);
    } else {
      navigation?.replace?.(ROUTES.BRAND_INTRO);
    }
  };

  useEffect(() => {
    restoreSession();

    // Auto-advance after 2.8s
    const timer = setTimeout(() => {
      handleContinue();
    }, 2800);

    return () => clearTimeout(timer);
  }, [restoreSession]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* Absolute fill background image guarantees immediate rendering */}
      <Image
        source={splashBackground}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        fadeDuration={0}
      />

      {/* Content overlay */}
      <Pressable style={styles.contentContainer} onPress={handleContinue}>
        {/* Top Spacer: Leaves space for the celestial emblem and logo artwork */}
        <View style={styles.topSpacer} />

        {/* Center Text Block: Brand typography and placement */}
        <View style={styles.centerTextBlock}>
          {/* Brand Name (English) */}
          <Text style={styles.brandTitle}>VIDHILIKHIT</Text>

          {/* Brand Name (Devanagari) */}
          <Text style={styles.devanagariTitle}>विधिलिखित</Text>

          {/* Antique Gold Divider with Diamond Motif */}
          <OrnamentalDivider
            color="#A9855B"
            width={135}
            diamondSize={6.5}
            style={styles.divider}
          />

          {/* Primary Subtitle */}
          <Text style={styles.subtitle}>
            {'Decode Your Stars.\nDiscover Your Possibilities.'}
          </Text>

          {/* Secondary Tagline */}
          <Text style={styles.tagline}>
            Ancient Wisdom. Modern Insight.
          </Text>
        </View>

        {/* Bottom Spacer: Leaves space for the temple mountain & river artwork */}
        <View style={styles.bottomSpacer} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7BC9F',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSpacer: {
    flex: 1.15,
  },
  centerTextBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  brandTitle: {
    fontFamily: fontFamily.title,
    fontSize: 27,
    fontWeight: '700',
    color: '#1E120A',
    letterSpacing: 2.8,
    textAlign: 'center',
  },
  devanagariTitle: {
    fontFamily: fontFamily.title,
    fontSize: 22,
    fontWeight: '700',
    color: '#1E120A',
    letterSpacing: 0.5,
    marginTop: 3,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: 15.5,
    fontWeight: '500',
    color: '#362013',
    lineHeight: 22,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: fontFamily.caption,
    fontSize: 12.5,
    fontWeight: '400',
    color: '#5C402E',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomSpacer: {
    flex: 1.18,
  },
});

export default SplashScreen;
