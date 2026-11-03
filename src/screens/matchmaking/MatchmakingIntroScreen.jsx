/**
 * MatchmakingIntroScreen Component
 * First Matchmaking Screen matching the exact design:
 * - Top Header: Circular antique back button & "Matchmaking" serif title
 * - Hero Illustration: Vedic couple gazing under golden moon framed by marigold florals
 * - Hero Card: "Find Your Cosmic Connection" with subtitle & "Find a Match →" teal button
 * - "How It Works" Section with 3-step vertical timeline:
 *   1. Enter birth details
 *   2. Get compatibility analysis
 *   3. Understand insights
 * - Fixed Bottom Navigation: Active "Match" tab with circular dark badge & white heart
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import {
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
} from '../../components/common/VedicIcons';

export const MatchmakingIntroScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  // User details to pass to partner details step
  const rawName =
    route?.params?.userDetails?.name ||
    user?.fullName ||
    user?.name ||
    'Alivia Mondal';

  const userDetails = {
    name: rawName,
    dob: route?.params?.userDetails?.dob || user?.birthDetails?.date || '15 March 1995',
    tob: route?.params?.userDetails?.tob || user?.birthDetails?.time || '10:30 AM',
    pob: route?.params?.userDetails?.pob || user?.birthDetails?.place || 'Mumbai, Maharashtra, India',
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const handleFindMatch = () => {
    navigation.navigate(ROUTES.PARTNER_DETAILS, { userDetails });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.matchmakingBg || images.homeBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Soft Ambient Parchment Scrim */}
        <View style={styles.parchmentScrim} pointerEvents="none" />

        <View
          style={[
            styles.mainContent,
            {
              paddingTop: Math.max(insets.top, vh(1.8)),
              paddingBottom: vh(7.4) + Math.max(insets.bottom, vh(1.2)),
            },
          ]}
        >
          {/* Top Header Bar: Circular Back Button & Title */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButtonCircle}
              onPress={handleBack}
              activeOpacity={0.75}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Matchmaking</Text>

            {/* Top Right Corner Floral Flourish Accent */}
            <View style={styles.cornerFlourishBox}>
              <Text style={styles.flourishText}>❧</Text>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Couple Illustration (if not part of fixed bg or to ensure crisp rendering) */}
            <View style={styles.heroCoupleCard}>
              <Image
                source={images.matchmakingHeroCouple || images.matchmakingBg}
                style={styles.heroCoupleImage}
                resizeMode="cover"
              />
            </View>

            {/* Hero Scroll Card: "Find Your Cosmic Connection" */}
            <View style={styles.cosmicCard}>
              {/* Corner decorative scroll ornaments */}
              <View style={[styles.cardCornerOrnament, styles.cornerTopLeft]}>
                <Text style={styles.cornerOrnamentText}>𑁍</Text>
              </View>
              <View style={[styles.cardCornerOrnament, styles.cornerTopRight]}>
                <Text style={styles.cornerOrnamentText}>𑁍</Text>
              </View>
              <View style={[styles.cardCornerOrnament, styles.cornerBottomLeft]}>
                <Text style={styles.cornerOrnamentText}>𑁍</Text>
              </View>
              <View style={[styles.cardCornerOrnament, styles.cornerBottomRight]}>
                <Text style={styles.cornerOrnamentText}>𑁍</Text>
              </View>

              <Text style={styles.cosmicTitle}>Find Your Cosmic Connection</Text>
              <Text style={styles.cosmicSubtitle}>
                Explore compatibility based on Vedic astrology and discover deeper insights into your relationships.
              </Text>

              {/* "Find a Match →" CTA Button */}
              <TouchableOpacity
                style={styles.findMatchButton}
                activeOpacity={0.85}
                onPress={handleFindMatch}
                accessibilityRole="button"
                accessibilityLabel="Find a Match"
              >
                <Text style={styles.findMatchText}>Find a Match</Text>
                <Text style={styles.findMatchArrow}>→</Text>
              </TouchableOpacity>
            </View>

            {/* "How It Works" Section */}
            <View style={styles.howItWorksSection}>
              <Text style={styles.howItWorksHeading}>How It Works</Text>

              {/* 3-Step Timeline with continuous vertical connecting line */}
              <View style={styles.timelineContainer}>
                {/* Continuous vertical timeline connector line */}
                <View style={styles.timelineLine} />

                {/* Step 1 */}
                <View style={styles.timelineItem}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>1</Text>
                  </View>
                  <View style={styles.stepTextBox}>
                    <Text style={styles.stepTitle}>Enter birth details</Text>
                    <Text style={styles.stepSubtitle}>
                      Provide your and your partner's details.
                    </Text>
                  </View>
                </View>

                {/* Step 2 */}
                <View style={styles.timelineItem}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>2</Text>
                  </View>
                  <View style={styles.stepTextBox}>
                    <Text style={styles.stepTitle}>Get compatibility analysis</Text>
                    <Text style={styles.stepSubtitle}>
                      Based on Kundali matching and Ashtakoota analysis.
                    </Text>
                  </View>
                </View>

                {/* Step 3 */}
                <View style={styles.timelineItem}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>3</Text>
                  </View>
                  <View style={styles.stepTextBox}>
                    <Text style={styles.stepTitle}>Understand insights</Text>
                    <Text style={styles.stepSubtitle}>
                      Discover strengths, challenges and guidance for your relationship.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Fixed Vedic Bottom Navigation Bar with Match tab Active */}
        <View
          style={[
            styles.bottomNavBar,
            { paddingBottom: Math.max(insets.bottom, vh(1)) + 2 },
          ]}
        >
          {/* Tab 1: Home */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.HOME)}
            activeOpacity={0.7}
          >
            <IconHomeFilled size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Home</Text>
          </TouchableOpacity>

          {/* Tab 2: Kundali */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.MY_KUNDALI)}
            activeOpacity={0.7}
          >
            <IconChakra size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Kundali</Text>
          </TouchableOpacity>

          {/* Tab 3: Match (ACTIVE) */}
          <TouchableOpacity
            style={styles.navTab}
            activeOpacity={0.9}
          >
            <View style={styles.activeNavBadge}>
              <IconHeart size={rem(20)} color="#FFFFFF" filled={true} />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
              Match
            </Text>
          </TouchableOpacity>

          {/* Tab 4: Bot */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.BOT)}
            activeOpacity={0.7}
          >
            <IconBotTab size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Bot</Text>
          </TouchableOpacity>

          {/* Tab 5: More */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
            activeOpacity={0.7}
          >
            <IconMenuTab size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>More</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5CD',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  parchmentScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 235, 0.04)',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: vw(4.5),
  },

  // ==================== HEADER BAR ====================
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(0.4),
    paddingHorizontal: vw(0.5),
  },
  backButtonCircle: {
    width: rem(42),
    height: rem(42),
    borderRadius: rem(21),
    backgroundColor: 'rgba(248, 238, 222, 0.92)',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  backButtonText: {
    fontFamily: fontFamily.title,
    fontSize: rem(22),
    fontWeight: '700',
    color: '#26160C',
    marginTop: -2,
  },
  headerTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(26),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
    marginLeft: -vw(2),
  },
  cornerFlourishBox: {
    width: rem(36),
    alignItems: 'flex-end',
    justifyContent: 'center',
    opacity: 0.65,
  },
  flourishText: {
    fontSize: rem(22),
    color: '#8C6636',
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(2.2),
  },

  // ==================== HERO COUPLE ARTWORK ====================
  heroCoupleCard: {
    width: '100%',
    height: rem(152),
    borderRadius: rem(18),
    overflow: 'hidden',
    marginTop: vh(0.4),
    marginBottom: vh(1.2),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },
  heroCoupleImage: {
    width: '100%',
    height: '100%',
  },

  // ==================== COSMIC CONNECTION CARD ====================
  cosmicCard: {
    position: 'relative',
    backgroundColor: 'rgba(252, 246, 235, 0.95)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.5)',
    paddingHorizontal: vw(4.5),
    paddingTop: vh(2),
    paddingBottom: vh(2.2),
    marginBottom: vh(1.8),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardCornerOrnament: {
    position: 'absolute',
    opacity: 0.35,
  },
  cornerTopLeft: {
    top: 5,
    left: 7,
  },
  cornerTopRight: {
    top: 5,
    right: 7,
  },
  cornerBottomLeft: {
    bottom: 5,
    left: 7,
  },
  cornerBottomRight: {
    bottom: 5,
    right: 7,
  },
  cornerOrnamentText: {
    fontSize: rem(11),
    color: '#8C6636',
  },
  cosmicTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 5,
  },
  cosmicSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    fontWeight: '500',
    color: '#5C3E25',
    lineHeight: rem(17),
    textAlign: 'center',
    marginBottom: vh(1.8),
  },

  // "Find a Match →" Button
  findMatchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#072427',
    borderRadius: rem(24),
    borderWidth: 1.2,
    borderColor: '#C89B48',
    paddingVertical: vh(1.2),
    paddingHorizontal: vw(8),
    minWidth: rem(180),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  findMatchText: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#F3D78E',
    letterSpacing: 0.2,
    marginRight: 6,
  },
  findMatchArrow: {
    fontSize: rem(16),
    fontWeight: '700',
    color: '#F3D78E',
  },

  // ==================== HOW IT WORKS ====================
  howItWorksSection: {
    marginTop: vh(0.4),
    paddingHorizontal: vw(1),
  },
  howItWorksHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    marginBottom: vh(1.4),
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: vw(2),
  },
  timelineLine: {
    position: 'absolute',
    left: rem(13.5),
    top: rem(14),
    bottom: rem(20),
    width: 1.6,
    backgroundColor: '#D4A853',
    opacity: 0.65,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vh(1.8),
  },
  stepBadge: {
    width: rem(28),
    height: rem(28),
    borderRadius: rem(14),
    backgroundColor: '#072427',
    borderWidth: 1.4,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  stepBadgeText: {
    fontFamily: fontFamily.title,
    fontSize: rem(13),
    fontWeight: '700',
    color: '#F3D78E',
    marginTop: -1,
  },
  stepTextBox: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2,
  },
  stepTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.2),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.15,
    marginBottom: 2,
  },
  stepSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.8),
    fontWeight: '500',
    color: '#6B4F35',
    lineHeight: rem(15.5),
  },

  // ==================== BOTTOM NAVIGATION BAR ====================
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: vh(7.4),
    minHeight: rem(56),
    backgroundColor: 'rgba(247, 237, 222, 0.96)',
    borderTopWidth: 1.2,
    borderTopColor: 'rgba(212, 168, 83, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeNavBadge: {
    width: rem(30),
    height: rem(30),
    borderRadius: rem(15),
    backgroundColor: '#083236',
    borderWidth: 1,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  navTabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(11),
    fontWeight: '600',
    color: '#6B4F35',
    marginTop: 2,
  },
  navTabLabelActive: {
    color: '#083236',
    fontWeight: '700',
  },
});

export default MatchmakingIntroScreen;
