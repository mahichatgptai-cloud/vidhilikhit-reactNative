/**
 * DailyGuidanceScreen Component
 * "Daily Guidance" screen matching the exact design:
 * - Top Header: Circular antique back button & serif "Daily Guidance" title
 * - Date Header with riverfront sunset temple panorama & previous-day selector
 * - 4 Time Filter Tabs: Today | Tomorrow | This Week | This Month
 * - "Overall Guidance" Card with golden radiant Sun medallion
 * - 2x2 Grid: Career (Briefcase), Finance (Gold Coins), Relationships (Ruby Heart), Health (Leaf)
 * - "Lucky Elements" Card: Color (Saffron), Number (5), Direction (East), Gemstone (Citrine)
 * - "Today's Affirmation" Card: Deep teal banner with gold lotus mandalas & inspirational quote
 * - Fixed Bottom Navigation Bar: Home, Kundali, Match, Bot, More
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
  IconLeaf,
  IconSunFace,
  IconBriefcase,
  IconGoldCoins,
  IconGemCitrine,
  IconCompassRose,
} from '../../components/common/VedicIcons';

const TABS = ['Today', 'Tomorrow', 'This Week', 'This Month'];

const GUIDANCE_DATA = {
  Today: {
    date: '14 October 2026',
    day: 'Wednesday',
    overall: {
      title: 'Overall Guidance',
      description: 'A positive day for new beginnings. Stay focused and maintain balance in your actions.',
    },
    career: {
      title: 'Career',
      description: 'New opportunities may arise. Be open to learning.',
    },
    finance: {
      title: 'Finance',
      description: 'Good time to plan and save. Avoid unnecessary expenses.',
    },
    relationships: {
      title: 'Relationships',
      description: 'Communicate openly and be patient with loved ones.',
    },
    health: {
      title: 'Health',
      description: 'Focus on healthy habits and maintain your energy.',
    },
    lucky: {
      colorName: 'Saffron',
      colorHex: '#FF9900',
      number: '5',
      direction: 'East',
      gemstone: 'Citrine',
    },
    affirmationTitle: "Today's Affirmation",
    affirmationText: '“I welcome positive energy and create a better day for myself.”',
  },
  Tomorrow: {
    date: '15 October 2026',
    day: 'Thursday',
    overall: {
      title: 'Overall Guidance',
      description: 'Jupiter brings expansion and divine grace. Favorable for study, spirituality and key decisions.',
    },
    career: {
      title: 'Career',
      description: 'Collaborative projects and leadership initiatives receive praise.',
    },
    finance: {
      title: 'Finance',
      description: 'Favorable alignment for long-term savings and investments.',
    },
    relationships: {
      title: 'Relationships',
      description: 'Harmony in domestic life and warm conversations with elders.',
    },
    health: {
      title: 'Health',
      description: 'High vitality; practice mindfulness and wholesome nourishment.',
    },
    lucky: {
      colorName: 'Golden Yellow',
      colorHex: '#E5B842',
      number: '3',
      direction: 'North-East',
      gemstone: 'Yellow Sapphire',
    },
    affirmationTitle: "Tomorrow's Affirmation",
    affirmationText: '“I am guided by wisdom, confidence, and inner light.”',
  },
  'This Week': {
    date: '12 – 18 Oct 2026',
    day: 'Weekly Forecast',
    overall: {
      title: 'Overall Guidance',
      description: 'A week of progressive momentum. Consolidate your accomplishments and nurture long-term aspirations.',
    },
    career: {
      title: 'Career',
      description: 'Steady progress on major goals through disciplined focus.',
    },
    finance: {
      title: 'Finance',
      description: 'Organize budgets and maintain balanced expenditures.',
    },
    relationships: {
      title: 'Relationships',
      description: 'Cherish heartfelt bonds and celebrate small milestones together.',
    },
    health: {
      title: 'Health',
      description: 'Balance busy daily tasks with restful sleep and hydration.',
    },
    lucky: {
      colorName: 'Royal Gold',
      colorHex: '#D4AF37',
      number: '7',
      direction: 'North',
      gemstone: 'Emerald',
    },
    affirmationTitle: "Weekly Affirmation",
    affirmationText: '“Each day brings me closer to fulfilling my highest potential.”',
  },
  'This Month': {
    date: 'October 2026',
    day: 'Monthly Overview',
    overall: {
      title: 'Overall Guidance',
      description: 'A month of auspicious planetary transits favoring personal transformation and prosperity.',
    },
    career: {
      title: 'Career',
      description: 'Expanded influence, recognition, and elevated status.',
    },
    finance: {
      title: 'Finance',
      description: 'Substantial prosperity and wise allocation of resources.',
    },
    relationships: {
      title: 'Relationships',
      description: 'Deepened matrimonial harmony and family celebrations.',
    },
    health: {
      title: 'Health',
      description: 'Resilient physical stamina and serene mental peace.',
    },
    lucky: {
      colorName: 'Copper Red',
      colorHex: '#C25A2B',
      number: '9',
      direction: 'East',
      gemstone: 'Ruby',
    },
    affirmationTitle: "Monthly Affirmation",
    affirmationText: '“I align myself with cosmic abundance and joyful living.”',
  },
};

export const DailyGuidanceScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Today');

  const currentData = GUIDANCE_DATA[activeTab] || GUIDANCE_DATA.Today;

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const handlePreviousDate = () => {
    Alert.alert(
      'Calendar Selector',
      'Select date to view historical and future Vedic planetary transits.'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.guidanceBg || images.partnerDetailsBg || images.kundaliBg}
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

            <Text style={styles.headerTitle}>Daily Guidance</Text>

            <View style={styles.headerSpacer} />
          </View>

          {/* Date Header with Panoramic Sunset Temple Artwork */}
          <View style={styles.heroLandscapeCard}>
            <ImageBackground
              source={images.guidanceLandscape || images.templeLandscape}
              style={styles.landscapeBg}
              imageStyle={styles.landscapeBgImg}
              resizeMode="cover"
            >
              <View style={styles.dateSelectorRow}>
                <TouchableOpacity
                  style={styles.dateNavButton}
                  onPress={handlePreviousDate}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="Previous date"
                >
                  <Text style={styles.dateNavArrow}>←</Text>
                </TouchableOpacity>

                <View style={styles.dateTextBox}>
                  <Text style={styles.dateMainText}>{currentData.date}</Text>
                  <Text style={styles.dateDayText}>{currentData.day}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* 4 Time Filter Tabs: Today | Tomorrow | This Week | This Month */}
          <View style={styles.tabsRow}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={styles.tabItem}
                  onPress={() => setActiveTab(tab)}
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

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Card 1: Overall Guidance */}
            <TouchableOpacity
              style={styles.overallGuidanceCard}
              activeOpacity={0.85}
              onPress={() =>
                Alert.alert(
                  currentData.overall.title,
                  currentData.overall.description
                )
              }
            >
              <View style={styles.sunMedallionBox}>
                <IconSunFace size={rem(44)} color="#C89B48" />
              </View>

              <View style={styles.overallContentCol}>
                <Text style={styles.overallTitle}>{currentData.overall.title}</Text>
                <Text style={styles.overallDesc}>{currentData.overall.description}</Text>
              </View>
            </TouchableOpacity>

            {/* 2x2 Grid: Career, Finance, Relationships, Health */}
            <View style={styles.gridContainer}>
              {/* Row 1: Career & Finance */}
              <View style={styles.gridRow}>
                {/* Career Card */}
                <TouchableOpacity
                  style={styles.gridCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert(
                      currentData.career.title,
                      currentData.career.description
                    )
                  }
                >
                  <View style={styles.gridIconBox}>
                    <IconBriefcase size={rem(30)} />
                  </View>
                  <View style={styles.gridTextBox}>
                    <Text style={styles.gridCardTitle}>{currentData.career.title}</Text>
                    <Text style={styles.gridCardDesc}>{currentData.career.description}</Text>
                  </View>
                </TouchableOpacity>

                {/* Finance Card */}
                <TouchableOpacity
                  style={styles.gridCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert(
                      currentData.finance.title,
                      currentData.finance.description
                    )
                  }
                >
                  <View style={styles.gridIconBox}>
                    <IconGoldCoins size={rem(32)} />
                  </View>
                  <View style={styles.gridTextBox}>
                    <Text style={styles.gridCardTitle}>{currentData.finance.title}</Text>
                    <Text style={styles.gridCardDesc}>{currentData.finance.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Row 2: Relationships & Health */}
              <View style={styles.gridRow}>
                {/* Relationships Card */}
                <TouchableOpacity
                  style={styles.gridCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert(
                      currentData.relationships.title,
                      currentData.relationships.description
                    )
                  }
                >
                  <View style={styles.gridIconBox}>
                    <IconRubyHeart size={rem(28)} />
                  </View>
                  <View style={styles.gridTextBox}>
                    <Text style={styles.gridCardTitle}>{currentData.relationships.title}</Text>
                    <Text style={styles.gridCardDesc}>{currentData.relationships.description}</Text>
                  </View>
                </TouchableOpacity>

                {/* Health Card */}
                <TouchableOpacity
                  style={styles.gridCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert(
                      currentData.health.title,
                      currentData.health.description
                    )
                  }
                >
                  <View style={styles.gridIconBox}>
                    <IconLeaf size={rem(28)} color="#4A7C28" />
                  </View>
                  <View style={styles.gridTextBox}>
                    <Text style={styles.gridCardTitle}>{currentData.health.title}</Text>
                    <Text style={styles.gridCardDesc}>{currentData.health.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* SECTION: Lucky Elements */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Lucky Elements</Text>
            </View>

            <View style={styles.luckyCard}>
              {/* Col 1: Color */}
              <View style={styles.luckyCol}>
                <Text style={styles.luckyLabel}>Color</Text>
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: currentData.lucky.colorHex },
                  ]}
                />
                <Text style={styles.luckyValue}>{currentData.lucky.colorName}</Text>
              </View>

              <View style={styles.luckyDivider} />

              {/* Col 2: Number */}
              <View style={styles.luckyCol}>
                <Text style={styles.luckyLabel}>Number</Text>
                <View style={styles.numberBox}>
                  <Text style={styles.luckyNumberBig}>{currentData.lucky.number}</Text>
                </View>
                <View style={{ height: rem(15) }} />
              </View>

              <View style={styles.luckyDivider} />

              {/* Col 3: Direction */}
              <View style={styles.luckyCol}>
                <Text style={styles.luckyLabel}>Direction</Text>
                <View style={styles.directionBox}>
                  <IconCompassRose size={rem(24)} color="#C89B48" />
                </View>
                <Text style={styles.luckyValue}>{currentData.lucky.direction}</Text>
              </View>

              <View style={styles.luckyDivider} />

              {/* Col 4: Gemstone */}
              <View style={styles.luckyCol}>
                <Text style={styles.luckyLabel}>Gemstone</Text>
                <View style={styles.gemstoneBox}>
                  <IconGemCitrine size={rem(24)} />
                </View>
                <Text style={styles.luckyValue}>{currentData.lucky.gemstone}</Text>
              </View>
            </View>

            {/* Bottom Card: Today's Affirmation */}
            <TouchableOpacity
              style={styles.affirmationCard}
              activeOpacity={0.88}
              onPress={() =>
                Alert.alert(
                  currentData.affirmationTitle,
                  currentData.affirmationText
                )
              }
            >
              <View style={styles.affirmationMandala}>
                <IconChakra size={rem(26)} color="#E5C378" />
              </View>

              <View style={styles.affirmationCenter}>
                <Text style={styles.affirmationHeading}>
                  {currentData.affirmationTitle}
                </Text>
                <Text style={styles.affirmationQuote}>
                  {currentData.affirmationText}
                </Text>
              </View>

              <View style={styles.affirmationMandala}>
                <IconChakra size={rem(26)} color="#E5C378" />
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
            <View style={styles.activeNavBadge}>
              <IconHomeFilled size={rem(20)} color="#FFFFFF" />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
              Home
            </Text>
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

          {/* Tab 3: Match */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.MATCHMAKING)}
            activeOpacity={0.7}
          >
            <IconHeart size={rem(19)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Match</Text>
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

  // ==================== DATE HERO LANDSCAPE ====================
  heroLandscapeCard: {
    width: '100%',
    height: rem(100),
    borderRadius: rem(10),
    overflow: 'hidden',
    marginBottom: vh(1.2),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  landscapeBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  landscapeBgImg: {
    opacity: 0.90,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
  },
  dateNavButton: {
    width: rem(34),
    height: rem(34),
    borderRadius: rem(17),
    backgroundColor: 'rgba(252, 245, 233, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3),
  },
  dateNavArrow: {
    fontFamily: fontFamily.title,
    fontSize: rem(17),
    fontWeight: '700',
    color: '#26160C',
    marginTop: -2,
  },
  dateTextBox: {
    justifyContent: 'center',
  },
  dateMainText: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.2,
  },
  dateDayText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13),
    fontWeight: '500',
    color: '#fff',
    marginTop: 1,
  },

  // ==================== TABS ROW ====================
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(182, 147, 106, 0.35)',
    marginBottom: vh(1.2),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: vh(0.8),
  },
  tabLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.8),
    fontWeight: '500',
    color: '#7A5E48',
  },
  tabLabelActive: {
    fontFamily: fontFamily.title,
    fontWeight: '700',
    color: '#0D3836',
  },
  tabActiveIndicator: {
    position: 'absolute',
    bottom: -1,
    width: '80%',
    height: 2.8,
    backgroundColor: '#0D3836',
    borderRadius: 1.5,
  },
  tabInactiveIndicator: {
    height: 2.8,
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(3),
  },

  // ==================== OVERALL GUIDANCE CARD ====================
  overallGuidanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.6),
    marginBottom: vh(1.2),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sunMedallionBox: {
    width: rem(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.5),
  },
  overallContentCol: {
    flex: 1,
    justifyContent: 'center',
  },
  overallTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(17),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  overallDesc: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.8),
    fontWeight: '500',
    color: '#5C4430',
    marginTop: vh(0.3),
    lineHeight: rem(17.5),
  },

  // ==================== 2x2 GRID ====================
  gridContainer: {
    gap: vh(1.2),
    marginBottom: vh(1.2),
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2.5),
  },
  gridCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(15),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3),
    paddingVertical: vh(1.4),
    minHeight: rem(68),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  gridIconBox: {
    width: rem(34),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.4),
  },
  gridTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  gridCardTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  gridCardDesc: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.2),
    fontWeight: '500',
    color: '#5C4430',
    marginTop: 1,
    lineHeight: rem(14.5),
  },

  // ==================== LUCKY ELEMENTS ====================
  sectionHeaderRow: {
    marginTop: vh(0.6),
    marginBottom: vh(0.8),
    paddingHorizontal: vw(0.5),
  },
  sectionHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  luckyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(252, 245, 233, 0.94)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingVertical: vh(1.4),
    paddingHorizontal: vw(2),
    marginBottom: vh(1.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  luckyCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  luckyDivider: {
    width: 1,
    height: '75%',
    backgroundColor: 'rgba(212, 168, 83, 0.35)',
  },
  luckyLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.5),
    fontWeight: '500',
    color: '#5C4430',
    marginBottom: vh(0.5),
  },
  colorCircle: {
    width: rem(24),
    height: rem(24),
    borderRadius: rem(12),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: vh(0.4),
  },
  numberBox: {
    height: rem(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(0.4),
  },
  luckyNumberBig: {
    fontFamily: fontFamily.title,
    fontSize: rem(25),
    fontWeight: '700',
    color: '#083236',
    marginTop: -4,
  },
  directionBox: {
    height: rem(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(0.4),
  },
  gemstoneBox: {
    height: rem(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(0.4),
  },
  luckyValue: {
    fontFamily: fontFamily.title,
    fontSize: rem(12.8),
    fontWeight: '700',
    color: '#26160C',
  },

  // ==================== TODAY'S AFFIRMATION ====================
  affirmationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#072427',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: '#C89B48',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.6),
    marginBottom: vh(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  affirmationMandala: {
    width: rem(32),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  affirmationCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(2),
  },
  affirmationHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#E5C378',
    letterSpacing: 0.2,
    marginBottom: 2,
    textAlign: 'center',
  },
  affirmationQuote: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    fontStyle: 'italic',
    color: '#F4E2BD',
    textAlign: 'center',
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

export default DailyGuidanceScreen;
