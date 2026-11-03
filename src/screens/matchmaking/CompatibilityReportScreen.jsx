/**
 * CompatibilityReportScreen Component
 * Step 2: "Compatibility Report" matching the exact design:
 * - Top Header: Circular antique back button, serif "Compatibility Report" title & circular share button
 * - Hero Illustration: Classical divine Vedic couple with golden aura halo and floral branches
 * - "Overall Compatibility" Card: 82% highlighted with golden lotus emblems and description
 * - 2x2 Grid Breakdown Cards:
 *   1. 90% Emotional Connection (Ruby Heart)
 *   2. 78% Values & Beliefs (Botanical Sprig)
 *   3. 76% Marriage Prospects (Interlocking Golden Rings)
 *   4. 84% Long-term Harmony (Golden Blooming Lotus)
 * - CTA Button: "View Detailed Analysis →" in deep teal with gold rim
 * - Fixed Bottom Navigation: Active "Match" tab with circular dark badge & white heart
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import {
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
  IconShare,
  IconRubyHeart,
  IconLeaf,
  IconMatchRings,
  IconLotusGold,
} from '../../components/common/VedicIcons';

export const CompatibilityReportScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const userName = route?.params?.userName || 'Alivia Mondal';
  const partnerName = route?.params?.partnerName || 'Aarav Sharma';
  const overallScore = route?.params?.overallScore || '82%';

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.MATCHMAKING);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Vidhilikhit Vedic Matchmaking Report:\n${userName} & ${partnerName}\nOverall Cosmic Compatibility: ${overallScore} (High Match)\nCheck your celestial compatibility on Vidhilikhit.`,
        title: 'Compatibility Report',
      });
    } catch (_) {
      Alert.alert('Share Report', 'Report copied to clipboard.');
    }
  };

  const handleViewDetailedAnalysis = () => {
    navigation.navigate(ROUTES.COMPATIBILITY_DETAILS, {
      userName,
      partnerName,
      overallScore,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.compatibilityReportBg || images.partnerDetailsBg || images.kundaliBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.parchmentScrim} pointerEvents="none" />

        <View
          style={[
            styles.mainContent,
            {
              paddingTop: Math.max(insets.top, vh(1.5)),
              paddingBottom: vh(7.5) + Math.max(insets.bottom, vh(1)),
            },
          ]}
        >
          {/* Top Header Bar: Circular Back Button, Title & Circular Share Button */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.headerButtonCircle}
              onPress={handleBack}
              activeOpacity={0.75}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Compatibility Report</Text>

            <TouchableOpacity
              style={styles.headerButtonCircle}
              onPress={handleShare}
              activeOpacity={0.75}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
              accessibilityRole="button"
              accessibilityLabel="Share report"
            >
              <IconShare size={rem(18)} color="#26160C" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content Container */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Couple Artwork Clearance Space to let background illustration shine through */}
            <View style={styles.heroArtworkSpace} />

            {/* Central "Overall Compatibility" Card with Lotus Wings */}
            <View style={styles.overallWrapper}>
              {/* Left Lotus Wing */}
              <View style={styles.lotusWingLeft} pointerEvents="none">
                <IconLotusGold size={rem(36)} color="#C89B48" />
              </View>

              {/* Main Parchment Card */}
              <View style={styles.overallCard}>
                {/* Ornate Corner Accents */}
                <View style={[styles.cornerAccent, styles.cornerTL]} />
                <View style={[styles.cornerAccent, styles.cornerTR]} />
                <View style={[styles.cornerAccent, styles.cornerBL]} />
                <View style={[styles.cornerAccent, styles.cornerBR]} />

                <Text style={styles.overallCardHeading}>Overall Compatibility</Text>
                <Text style={styles.overallScoreText}>{overallScore}</Text>
                <Text style={styles.overallDescription}>
                  A highly harmonious match with strong potential for a happy and fulfilling life together.
                </Text>
              </View>

              {/* Right Lotus Wing */}
              <View style={styles.lotusWingRight} pointerEvents="none">
                <IconLotusGold size={rem(36)} color="#C89B48" />
              </View>
            </View>

            {/* 2x2 Grid Breakdown Cards */}
            <View style={styles.metricsGrid}>
              {/* Row 1 */}
              <View style={styles.metricsRow}>
                {/* Metric 1: Emotional Connection */}
                <View style={styles.metricCard}>
                  <View style={styles.metricIconBox}>
                    <IconRubyHeart size={rem(28)} />
                  </View>
                  <View style={styles.metricTextBox}>
                    <Text style={styles.metricScore}>90%</Text>
                    <Text style={styles.metricLabel}>Emotional Connection</Text>
                  </View>
                </View>

                {/* Metric 2: Values & Beliefs */}
                <View style={styles.metricCard}>
                  <View style={styles.metricIconBox}>
                    <IconLeaf size={rem(26)} color="#4E7C2A" />
                  </View>
                  <View style={styles.metricTextBox}>
                    <Text style={styles.metricScore}>78%</Text>
                    <Text style={styles.metricLabel}>Values & Beliefs</Text>
                  </View>
                </View>
              </View>

              {/* Row 2 */}
              <View style={styles.metricsRow}>
                {/* Metric 3: Marriage Prospects */}
                <View style={styles.metricCard}>
                  <View style={styles.metricIconBox}>
                    <IconMatchRings size={rem(28)} color="#C89B48" />
                  </View>
                  <View style={styles.metricTextBox}>
                    <Text style={styles.metricScore}>76%</Text>
                    <Text style={styles.metricLabel}>Marriage Prospects</Text>
                  </View>
                </View>

                {/* Metric 4: Long-term Harmony */}
                <View style={styles.metricCard}>
                  <View style={styles.metricIconBox}>
                    <IconLotusGold size={rem(28)} color="#C89B48" />
                  </View>
                  <View style={styles.metricTextBox}>
                    <Text style={styles.metricScore}>84%</Text>
                    <Text style={styles.metricLabel}>Long-term Harmony</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Primary Action Button: "View Detailed Analysis →" */}
            <TouchableOpacity
              style={styles.detailedAnalysisButton}
              onPress={handleViewDetailedAnalysis}
              activeOpacity={0.88}
            >
              <Text style={styles.detailedAnalysisText}>View Detailed Analysis</Text>
              <Text style={styles.detailedAnalysisArrow}>→</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Fixed Vedic Bottom Navigation Bar */}
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

          {/* Tab 3: Match (Active Screen) */}
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <View style={styles.activeNavBadge}>
              <IconHeart size={rem(18)} color="#FFFFFF" filled={true} />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
              Match
            </Text>
          </TouchableOpacity>

          {/* Tab 4: Bot */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => Alert.alert('Vidhilikhit Bot', 'Ask questions to your AI Vedic Astrologer.')}
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
    marginBottom: vh(0.8),
    paddingHorizontal: vw(0.5),
  },
  headerButtonCircle: {
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
    fontSize: rem(22.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  // ==================== SCROLL VIEW ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(3),
  },

  // Clearance for couple artwork
  heroArtworkSpace: {
    height: vh(23.5),
    minHeight: rem(175),
  },

  // ==================== OVERALL COMPATIBILITY CARD ====================
  overallWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(1.6),
  },
  lotusWingLeft: {
    position: 'absolute',
    left: -vw(2.5),
    top: '38%',
    zIndex: 2,
  },
  lotusWingRight: {
    position: 'absolute',
    right: -vw(2.5),
    top: '38%',
    zIndex: 2,
  },
  overallCard: {
    width: '100%',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.55)',
    paddingHorizontal: vw(5),
    paddingVertical: vh(2.2),
    alignItems: 'center',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cornerAccent: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderColor: 'rgba(212, 168, 83, 0.65)',
  },
  cornerTL: {
    top: 6,
    left: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  cornerTR: {
    top: 6,
    right: 6,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  cornerBL: {
    bottom: 6,
    left: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  cornerBR: {
    bottom: 6,
    right: 6,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  overallCardHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(17.5),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  overallScoreText: {
    fontFamily: fontFamily.title,
    fontSize: rem(44),
    fontWeight: '700',
    color: '#083236',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginVertical: vh(0.4),
  },
  overallDescription: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.2),
    fontWeight: '500',
    color: '#5C4430',
    textAlign: 'center',
    lineHeight: rem(18.5),
    paddingHorizontal: vw(2),
  },

  // ==================== 2x2 METRICS GRID ====================
  metricsGrid: {
    gap: vh(1.2),
    marginBottom: vh(1.6),
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2.5),
  },
  metricCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(2.8),
    paddingVertical: vh(1.2),
    minHeight: rem(64),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  metricIconBox: {
    width: rem(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.2),
  },
  metricTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  metricScore: {
    fontFamily: fontFamily.title,
    fontSize: rem(17.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  metricLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.2),
    fontWeight: '500',
    color: '#6B4F35',
    marginTop: 1,
    lineHeight: rem(14.5),
  },

  // ==================== CTA BUTTON ====================
  detailedAnalysisButton: {
    width: '100%',
    height: rem(50),
    borderRadius: rem(25),
    backgroundColor: '#092E31',
    borderWidth: 1.2,
    borderColor: '#C89B48',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
    marginTop: vh(0.4),
    marginBottom: vh(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  detailedAnalysisText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#F4E2BD',
    letterSpacing: 0.3,
  },
  detailedAnalysisArrow: {
    fontSize: rem(18),
    color: '#F4E2BD',
    fontWeight: '700',
    marginTop: -2,
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

export default CompatibilityReportScreen;
