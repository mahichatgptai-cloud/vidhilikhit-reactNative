/**
 * MyKundaliScreen Component
 * Displays the primary Vedic Kundali overview matching the reference design:
 * - Top header with circular back button and "My Kundali"
 * - Sub-navigation tabs: Overview, Graha, Bhava, Varga, Yoga
 * - Antique square Kundali Lagna chart with central Sun illustration
 * - User name with edit pencil, birth date, time, and location
 * - 3-column summary card: Rashi (Aries/Mesha), Nakshatra (Ashwini), Lagna (Taurus/Vrishabha)
 * - "View Detailed Kundali →" pill CTA button
 * - Vedic bottom navigation bar with active Kundali tab
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import {
  IconArrowLeft,
  IconPencil,
  IconZodiacAries,
  IconZodiacTaurus,
  IconStarSparkle,
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
} from '../../components/common/VedicIcons';

const TABS = ['Overview', 'Graha', 'Bhava', 'Varga', 'Yoga'];

const PLANETS_DATA = [
  { name: 'Sun (Surya)', sign: 'Aries', deg: '01° 24\'', house: '1st', status: 'Exalted' },
  { name: 'Moon (Chandra)', sign: 'Taurus', deg: '14° 52\'', house: '2nd', status: 'Exalted' },
  { name: 'Mars (Mangal)', sign: 'Capricorn', deg: '28° 10\'', house: '10th', status: 'Exalted' },
  { name: 'Mercury (Budha)', sign: 'Pisces', deg: '04° 15\'', house: '12th', status: 'Debilitated' },
  { name: 'Jupiter (Guru)', sign: 'Cancer', deg: '18° 33\'', house: '4th', status: 'Exalted' },
  { name: 'Venus (Shukra)', sign: 'Pisces', deg: '27° 40\'', house: '12th', status: 'Exalted' },
  { name: 'Saturn (Shani)', sign: 'Aquarius', deg: '09° 12\'', house: '11th', status: 'Moolatrikona' },
  { name: 'Rahu', sign: 'Taurus', deg: '22° 45\'', house: '2nd', status: 'Benefic' },
  { name: 'Ketu', sign: 'Scorpio', deg: '22° 45\'', house: '8th', status: 'Neutral' },
];

const YOGAS_DATA = [
  { name: 'Gajakesari Yoga', description: 'Jupiter in Kendra from Moon. Bestows wisdom, high status and prosperity.' },
  { name: 'Budhaditya Yoga', description: 'Sun and Mercury conjunct. Grants intelligence, intellect and analytical power.' },
  { name: 'Ruchaka Yoga', description: 'Exalted Mars in 10th house. Gives courage, leadership, and remarkable authority.' },
];

export const MyKundaliScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [activeBottomTab, setActiveBottomTab] = useState('Kundali');

  // Dynamic user data with graceful fallbacks matching design
  const fullName =
    route?.params?.fullName ||
    user?.fullName ||
    user?.name ||
    'Alivia Mondal';

  const birthDate =
    route?.params?.birthDate ||
    user?.birthDetails?.date ||
    '15 March 1995';

  const birthTime =
    route?.params?.birthTime ||
    user?.birthDetails?.time ||
    '10:30 AM';

  const birthPlace =
    route?.params?.birthPlace ||
    user?.birthDetails?.place ||
    'Mumbai, Maharashtra, India';

  const handleEditDetails = () => {
    navigation.navigate(ROUTES.TELL_US_ABOUT_YOURSELF);
  };

  const handleViewDetailedKundali = () => {
    setActiveSubTab('Graha');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.kundaliBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Soft Ambient Parchment Scrim */}
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
              onPress={() => navigation.goBack()}
              activeOpacity={0.75}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>My Kundali</Text>
          </View>

          {/* Sub-Navigation Tabs: Overview | Graha | Bhava | Varga | Yoga */}
          <View style={styles.tabsRow}>
            {TABS.map((tab) => {
              const isActive = activeSubTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={styles.tabItem}
                  onPress={() => setActiveSubTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                    {tab}
                  </Text>
                  {isActive ? (
                    <View style={styles.tabActiveIndicator} />
                  ) : (
                    <View style={styles.tabInactiveIndicator} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Content */}
          {activeSubTab === 'Overview' ? (
            <View style={styles.overviewContainer}>
              {/* Central Antique Kundali Chart Frame */}
              <View style={styles.chartContainer}>
                <Image
                  source={images.kundaliChart}
                  style={styles.chartImage}
                  resizeMode="contain"
                />
              </View>

              {/* User Identity Details */}
              <View style={styles.userDetailsBox}>
                <TouchableOpacity
                  style={styles.nameRow}
                  onPress={handleEditDetails}
                  activeOpacity={0.8}
                >
                  <Text style={styles.userName}>{fullName}</Text>
                  <View style={styles.pencilIconBox}>
                    <IconPencil size={rem(15)} color="#3B2416" />
                  </View>
                </TouchableOpacity>

                <Text style={styles.userDateText}>
                  {birthDate}, {birthTime}
                </Text>
                <Text style={styles.userPlaceText}>{birthPlace}</Text>
              </View>

              {/* 3-Column Summary Card: Rashi | Nakshatra | Lagna */}
              <View style={styles.summaryCard}>
                {/* Column 1: Rashi */}
                <View style={styles.summaryCol}>
                  <IconZodiacAries size={rem(26)} color="#C89445" />
                  <Text style={styles.summaryLabel}>Rashi</Text>
                  <Text style={styles.summaryValue}>{'Aries\n(Mesha)'}</Text>
                </View>

                {/* Vertical Divider 1 */}
                <View style={styles.summaryDivider} />

                {/* Column 2: Nakshatra */}
                <View style={styles.summaryCol}>
                  <IconStarSparkle size={rem(24)} color="#C89445" />
                  <Text style={styles.summaryLabel}>Nakshatra</Text>
                  <Text style={styles.summaryValue}>Ashwini</Text>
                </View>

                {/* Vertical Divider 2 */}
                <View style={styles.summaryDivider} />

                {/* Column 3: Lagna */}
                <View style={styles.summaryCol}>
                  <IconZodiacTaurus size={rem(24)} color="#C89445" />
                  <Text style={styles.summaryLabel}>Lagna</Text>
                  <Text style={styles.summaryValue}>{'Taurus\n(Vrishabha)'}</Text>
                </View>
              </View>

              {/* Action Button: "View Detailed Kundali →" */}
              <TouchableOpacity
                style={styles.detailedCtaButton}
                onPress={handleViewDetailedKundali}
                activeOpacity={0.85}
              >
                <Text style={styles.detailedCtaText}>View Detailed Kundali</Text>
                <Text style={styles.detailedCtaArrow}>→</Text>
              </TouchableOpacity>
            </View>
          ) : activeSubTab === 'Graha' ? (
            <ScrollView
              style={styles.scrollList}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.subScreenHeading}>Planetary Positions (Graha Sthiti)</Text>
              <View style={styles.tableCard}>
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.tableColHeader, { flex: 1.6 }]}>Planet</Text>
                  <Text style={[styles.tableColHeader, { flex: 1.2 }]}>Sign</Text>
                  <Text style={[styles.tableColHeader, { flex: 1 }]}>Deg</Text>
                  <Text style={[styles.tableColHeader, { flex: 1 }]}>House</Text>
                  <Text style={[styles.tableColHeader, { flex: 1.4 }]}>State</Text>
                </View>
                {PLANETS_DATA.map((p, idx) => (
                  <View
                    key={p.name}
                    style={[
                      styles.tableRow,
                      idx < PLANETS_DATA.length - 1 && styles.tableRowBorder,
                    ]}
                  >
                    <Text style={[styles.tableTextBold, { flex: 1.6 }]}>{p.name}</Text>
                    <Text style={[styles.tableText, { flex: 1.2 }]}>{p.sign}</Text>
                    <Text style={[styles.tableText, { flex: 1 }]}>{p.deg}</Text>
                    <Text style={[styles.tableText, { flex: 1 }]}>{p.house}</Text>
                    <Text style={[styles.tableTag, { flex: 1.4 }]}>{p.status}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : activeSubTab === 'Yoga' ? (
            <ScrollView
              style={styles.scrollList}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.subScreenHeading}>Key Vedic Yogas in Your Kundali</Text>
              {YOGAS_DATA.map((y) => (
                <View key={y.name} style={styles.yogaCard}>
                  <Text style={styles.yogaTitle}>{y.name}</Text>
                  <Text style={styles.yogaDesc}>{y.description}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <ScrollView
              style={styles.scrollList}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.subScreenHeading}>{activeSubTab} Analysis</Text>
              <View style={styles.placeholderCard}>
                <IconChakra size={rem(40)} color="#C89445" />
                <Text style={styles.placeholderTitle}>
                  {activeSubTab} details are computed directly from your natal planetary alignments.
                </Text>
              </View>
            </ScrollView>
          )}
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
            <IconHomeFilled
              size={rem(21)}
              color={activeBottomTab === 'Home' ? '#083236' : '#6B4F35'}
            />
            <Text
              style={[
                styles.navTabLabel,
                activeBottomTab === 'Home' && styles.navTabLabelActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          {/* Tab 2: Kundali (Active Screen) */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => setActiveBottomTab('Kundali')}
            activeOpacity={0.7}
          >
            <View style={styles.activeNavBadge}>
              <IconChakra size={rem(20)} color="#FFFFFF" />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
              Kundali
            </Text>
          </TouchableOpacity>

          {/* Tab 3: Match */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => Alert.alert('Matchmaking', 'Matchmaking feature coming soon.')}
            activeOpacity={0.7}
          >
            <IconHeart
              size={rem(19)}
              color={activeBottomTab === 'Match' ? '#083236' : '#6B4F35'}
            />
            <Text
              style={[
                styles.navTabLabel,
                activeBottomTab === 'Match' && styles.navTabLabelActive,
              ]}
            >
              Match
            </Text>
          </TouchableOpacity>

          {/* Tab 4: Bot */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => Alert.alert('Vidhilikhit Bot', 'Ask questions to your AI Vedic Astrologer.')}
            activeOpacity={0.7}
          >
            <IconBotTab
              size={rem(21)}
              color={activeBottomTab === 'Bot' ? '#083236' : '#6B4F35'}
            />
            <Text
              style={[
                styles.navTabLabel,
                activeBottomTab === 'Bot' && styles.navTabLabelActive,
              ]}
            >
              Bot
            </Text>
          </TouchableOpacity>

          {/* Tab 5: More */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
            activeOpacity={0.7}
          >
            <IconMenuTab
              size={rem(21)}
              color={activeBottomTab === 'More' ? '#083236' : '#6B4F35'}
            />
            <Text
              style={[
                styles.navTabLabel,
                activeBottomTab === 'More' && styles.navTabLabelActive,
              ]}
            >
              More
            </Text>
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
    backgroundColor: 'rgba(255, 248, 235, 0.12)',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: vw(4.5),
    justifyContent: 'space-between',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
    paddingHorizontal: vw(1),
  },
  backButtonCircle: {
    width: rem(42),
    height: rem(42),
    borderRadius: rem(21),
    backgroundColor: 'rgba(248, 238, 222, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(22),
    fontWeight: '700',
    color: '#26160C',
    marginTop: -2,
  },
  headerTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(22),
    fontWeight: '700',
    color: '#26160C',
    marginLeft: vw(3),
    letterSpacing: 0.3,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(182, 147, 106, 0.35)',
    marginBottom: vh(0.8),
    paddingHorizontal: vw(1),
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: vh(0.6),
    paddingHorizontal: vw(2),
  },
  tabLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14.5),
    fontWeight: '500',
    color: '#6E533C',
  },
  tabLabelActive: {
    fontFamily: fontFamily.title,
    fontWeight: '700',
    color: '#083236',
  },
  tabActiveIndicator: {
    height: 2.5,
    width: '110%',
    backgroundColor: '#083236',
    borderRadius: 2,
    marginTop: 4,
  },
  tabInactiveIndicator: {
    height: 2.5,
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  overviewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: vh(0.5),
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.5),
  },
  chartImage: {
    width: vw(84),
    height: vw(84),
    maxHeight: vh(37),
    maxWidth: rem(360),
    borderRadius: rem(8),
  },
  userDetailsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.4),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontFamily: fontFamily.title,
    fontSize: rem(20.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  pencilIconBox: {
    marginLeft: vw(2),
    padding: 2,
  },
  userDateText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    color: '#4A3525',
    marginTop: vh(0.3),
  },
  userPlaceText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    color: '#4A3525',
    marginTop: vh(0.2),
  },
  summaryCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 248, 236, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.4)',
    borderRadius: rem(16),
    paddingVertical: vh(1.2),
    paddingHorizontal: vw(2.5),
    marginVertical: vh(0.6),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.5),
    color: '#6B533E',
    marginTop: 2,
  },
  summaryValue: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    lineHeight: rem(16.5),
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(182, 147, 106, 0.35)',
  },
  detailedCtaButton: {
    width: '100%',
    height: vh(5.8),
    minHeight: rem(48),
    borderRadius: rem(25),
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: vw(2),
    shadowColor: '#083236',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 5,
    marginTop: vh(0.4),
  },
  detailedCtaText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#F2E2BE',
    letterSpacing: 0.3,
  },
  detailedCtaArrow: {
    fontFamily: fontFamily.bold,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#F2E2BE',
    marginTop: -1,
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: vh(1),
  },
  subScreenHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(17),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: vh(1.2),
  },
  tableCard: {
    backgroundColor: 'rgba(255, 248, 236, 0.85)',
    borderRadius: rem(14),
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.4)',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#083236',
    paddingVertical: vh(1),
    paddingHorizontal: vw(3),
  },
  tableColHeader: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12),
    color: '#F2E2BE',
    fontWeight: '700',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1),
    paddingHorizontal: vw(3),
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(182, 147, 106, 0.25)',
  },
  tableTextBold: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12.5),
    fontWeight: '700',
    color: '#26160C',
  },
  tableText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#4A3525',
  },
  tableTag: {
    fontFamily: fontFamily.bold,
    fontSize: rem(11),
    fontWeight: '700',
    color: '#083236',
  },
  yogaCard: {
    backgroundColor: 'rgba(255, 248, 236, 0.85)',
    borderRadius: rem(12),
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.4)',
    padding: vw(3.5),
    marginBottom: vh(1),
  },
  yogaTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: 4,
  },
  yogaDesc: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12.5),
    color: '#4A3525',
    lineHeight: rem(17),
  },
  placeholderCard: {
    backgroundColor: 'rgba(255, 248, 236, 0.85)',
    borderRadius: rem(14),
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.4)',
    padding: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vh(2),
  },
  placeholderTitle: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13.5),
    color: '#4A3525',
    textAlign: 'center',
    marginTop: vh(1.5),
    lineHeight: rem(19),
  },
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

export default MyKundaliScreen;
