/**
 * CompatibilityDetailsScreen Component
 * Step 3: "Compatibility Details" matching the exact design:
 * - Top Header: Circular antique back button & serif "Compatibility Details" title
 * - 7 Detailed Compatibility Cards:
 *   1. Emotional Connection (90%) - Ruby Heart
 *   2. Mental Compatibility (76%) - Golden Blooming Lotus
 *   3. Values & Beliefs (78%) - Radiant Sun Face
 *   4. Marriage Prospects (76%) - Interlocking Golden Rings
 *   5. Financial Harmony (72%) - Botanical Leaf Sprig
 *   6. Physical Compatibility (80%) - Crescent Moon
 *   7. Long-term Harmony (84%) - Celestial Compass Star
 * - Bottom Highlight Banner: "Overall Recommendation" with golden sunburst emblem
 * - Fixed Bottom Navigation: Active "Match" tab with circular dark badge & white heart
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Alert,
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
  IconRubyHeart,
  IconLotusGold,
  IconSunFace,
  IconMatchRings,
  IconLeaf,
  IconMoonCrescent,
  IconStarSparkle,
  IconSunSurya,
} from '../../components/common/VedicIcons';

const COMPATIBILITY_ITEMS = [
  {
    id: 'emotional',
    title: 'Emotional Connection',
    score: '90%',
    description: 'Strong emotional understanding and support between both individuals.',
    iconType: 'ruby_heart',
    details: 'The moon and water elements harmonize exceptionally well, creating intuitive empathy and emotional resilience in the relationship.',
  },
  {
    id: 'mental',
    title: 'Mental Compatibility',
    score: '76%',
    description: 'Good alignment in thinking, communication and approach to life.',
    iconType: 'lotus_gold',
    details: 'Mercury positions encourage open intellectual discussions, joint problem solving, and mutual respect for individual perspectives.',
  },
  {
    id: 'values',
    title: 'Values & Beliefs',
    score: '78%',
    description: 'Similar views on family, traditions and important life values.',
    iconType: 'sun_face',
    details: 'Shared spiritual orientation, family cultural heritage, and harmonious ethical outlook facilitate long-term familial peace.',
  },
  {
    id: 'marriage',
    title: 'Marriage Prospects',
    score: '76%',
    description: 'Favorable indications for a stable and harmonious marriage.',
    iconType: 'match_rings',
    details: '7th house and Venus placements predict enduring commitment, reciprocal loyalty, and auspicious matrimonial milestones.',
  },
  {
    id: 'financial',
    title: 'Financial Harmony',
    score: '72%',
    description: 'Complementary approach towards finances and material stability.',
    iconType: 'leaf',
    details: 'Balanced wealth accumulation, prudent expenditure management, and collaborative financial aspirations.',
  },
  {
    id: 'physical',
    title: 'Physical Compatibility',
    score: '80%',
    description: 'Strong physical attraction and comfort with each other.',
    iconType: 'moon_crescent',
    details: 'Yoni Koota affinity indicates strong magnetic attraction, reciprocal comfort, and vibrant intimacy.',
  },
  {
    id: 'harmony',
    title: 'Long-term Harmony',
    score: '84%',
    description: 'Positive indications for a peaceful and fulfilling future together.',
    iconType: 'star_sparkle',
    details: 'Jupiter and 9th house blessings bestow enduring grace, mutual growth, and profound lifelong fulfillment.',
  },
];

export const CompatibilityDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState(null);

  const userName = route?.params?.userName || 'Alivia Mondal';
  const partnerName = route?.params?.partnerName || 'Aarav Sharma';

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.COMPATIBILITY_REPORT);
    }
  };

  const toggleExpand = (id, item) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      Alert.alert(
        `${item.title} (${item.score})`,
        `${item.description}\n\n${item.details}`
      );
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'ruby_heart':
        return <IconRubyHeart size={rem(32)} />;
      case 'lotus_gold':
        return <IconLotusGold size={rem(30)} color="#C89B48" />;
      case 'sun_face':
        return <IconSunFace size={rem(32)} color="#C89B48" />;
      case 'match_rings':
        return <IconMatchRings size={rem(30)} color="#C89B48" />;
      case 'leaf':
        return <IconLeaf size={rem(28)} color="#4A7C28" />;
      case 'moon_crescent':
        return <IconMoonCrescent size={rem(30)} color="#15373E" />;
      case 'star_sparkle':
        return <IconStarSparkle size={rem(28)} color="#C89B48" />;
      default:
        return <IconStarSparkle size={rem(28)} color="#C89B48" />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.compatibilityDetailsBg || images.partnerDetailsBg || images.kundaliBg}
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

            <Text style={styles.headerTitle}>Compatibility Details</Text>

            {/* Spacer for symmetrical header balance */}
            <View style={styles.headerSpacer} />
          </View>

          {/* Scrollable Detailed Compatibility Cards List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {COMPATIBILITY_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.compatibilityCard}
                onPress={() => toggleExpand(item.id, item)}
                activeOpacity={0.75}
              >
                {/* Left Vedic Medallion Icon */}
                <View style={styles.cardIconBox}>
                  {renderIcon(item.iconType)}
                </View>

                {/* Right Content */}
                <View style={styles.cardContentCol}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.cardTitleText}>{item.title}</Text>
                    <View style={styles.scoreChevronRow}>
                      <Text style={styles.scoreText}>{item.score}</Text>
                      <Text style={styles.chevronDownText}>⌄</Text>
                    </View>
                  </View>

                  <Text style={styles.cardDescText}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Bottom Highlight Banner: "Overall Recommendation" */}
            <TouchableOpacity
              style={styles.recommendationBanner}
              activeOpacity={0.88}
              onPress={() =>
                Alert.alert(
                  'Overall Vedic Recommendation',
                  `Match analysis for ${userName} & ${partnerName}:\n\nThis union is strongly endorsed by Ashtakoota and Graha Maitri principles, indicating exceptional harmony, longevity, and mutual prosperity.`
                )
              }
            >
              <View style={styles.recommendationIconBox}>
                <IconSunSurya size={rem(34)} color="#E5C378" />
              </View>

              <View style={styles.recommendationTextBox}>
                <Text style={styles.recommendationTitle}>Overall Recommendation</Text>
                <Text style={styles.recommendationDesc}>
                  This is a highly compatible match with strong planetary support.
                </Text>
              </View>
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
    marginBottom: vh(1.2),
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
    fontSize: rem(23),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  headerSpacer: {
    width: rem(42),
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(3),
  },

  // ==================== COMPATIBILITY CARD ====================
  compatibilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(15),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.8),
    paddingVertical: vh(1.4),
    marginBottom: vh(1.1),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardIconBox: {
    width: rem(42),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.2),
  },
  cardContentCol: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitleText: {
    fontFamily: fontFamily.title,
    fontSize: rem(16.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  scoreChevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(1.8),
  },
  scoreText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#0D3836',
  },
  chevronDownText: {
    fontSize: rem(15),
    color: '#26160C',
    fontWeight: '700',
    marginTop: -2,
  },
  cardDescText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.2),
    fontWeight: '500',
    color: '#5C4430',
    marginTop: vh(0.3),
    lineHeight: rem(16.5),
  },

  // ==================== OVERALL RECOMMENDATION BANNER ====================
  recommendationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#072427',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: '#C89B48',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.5),
    marginTop: vh(0.8),
    marginBottom: vh(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  recommendationIconBox: {
    width: rem(42),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3),
  },
  recommendationTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  recommendationTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#E5C378',
    letterSpacing: 0.2,
  },
  recommendationDesc: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.2),
    fontWeight: '500',
    color: '#F4E2BD',
    marginTop: 2,
    lineHeight: rem(16.5),
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

export default CompatibilityDetailsScreen;
