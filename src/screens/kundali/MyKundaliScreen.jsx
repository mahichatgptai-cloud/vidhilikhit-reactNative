/**
 * MyKundaliScreen Component
 * Classical / Editorial Vedic Astrology screens matching the design specifications:
 * - Sub-navigation tabs: Overview, Graha, Bhava, Varga, Yoga
 * - Graha Tab: Graha Positions with antique celestial medallions, sign, house, and chevron
 * - Bhava Tab: 12 Houses (Bhavas) with double-rimmed gold & teal medallions, titles, descriptions, and bottom riverfront landscape
 * - Yoga Tab: Important Yogas with classical miniature artwork thumbnails, Present/Moderate pill badges, and View Full Report CTA
 * - Overview Tab: Antique square Kundali Lagna chart, user identity, and 3-column summary
 * - Fixed Vedic bottom navigation bar
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

const TABS = ['Overview', 'Graha', 'Bhava', 'Varga', 'Yoga', 'Dasha'];

// Exact 9 Graha items matching Reference Design 1
const GRAHA_DATA = [
  {
    id: 'sun',
    name: 'Sun (Surya)',
    sign: 'Pisces (Meena)',
    house: '7th House',
    image: images.grahaSun,
  },
  {
    id: 'moon',
    name: 'Moon (Chandra)',
    sign: 'Cancer (Karka)',
    house: '4th House',
    image: images.grahaMoon,
  },
  {
    id: 'mars',
    name: 'Mars (Mangal)',
    sign: 'Taurus (Vrishabha)',
    house: '10th House',
    image: images.grahaMars,
  },
  {
    id: 'mercury',
    name: 'Mercury (Budh)',
    sign: 'Aquarius (Kumbha)',
    house: '4th House',
    image: images.grahaMercury,
  },
  {
    id: 'jupiter',
    name: 'Jupiter (Guru)',
    sign: 'Sagittarius (Dhanu)',
    house: '2nd House',
    image: images.grahaJupiter,
  },
  {
    id: 'venus',
    name: 'Venus (Shukra)',
    sign: 'Aries (Mesha)',
    house: '5th House',
    image: images.grahaVenus,
  },
  {
    id: 'saturn',
    name: 'Saturn (Shani)',
    sign: 'Capricorn (Makar)',
    house: '11th House',
    image: images.grahaSaturn,
  },
  {
    id: 'rahu',
    name: 'Rahu',
    sign: 'Libra (Tula)',
    house: '8th House',
    image: images.grahaRahu,
  },
  {
    id: 'ketu',
    name: 'Ketu',
    sign: 'Aries (Mesha)',
    house: '12th House',
    image: images.grahaKetu,
  },
];

// Exact 12 Houses (Bhavas) matching Reference Design 2
const BHAVA_DATA = [
  {
    number: 1,
    title: 'Self & Personality',
    description: 'Your nature, appearance and life direction.',
  },
  {
    number: 2,
    title: 'Wealth & Family',
    description: 'Finances, family and values.',
  },
  {
    number: 3,
    title: 'Communication',
    description: 'Skills, courage and siblings.',
  },
  {
    number: 4,
    title: 'Home & Happiness',
    description: 'Home, mother and emotional well-being.',
  },
  {
    number: 5,
    title: 'Creativity & Children',
    description: 'Intelligence, creativity and progeny.',
  },
  {
    number: 6,
    title: 'Health & Service',
    description: 'Health, routine and work environment.',
  },
  {
    number: 7,
    title: 'Relationships',
    description: 'Marriage, partnerships and public life.',
  },
  {
    number: 8,
    title: 'Transformation',
    description: 'Deep changes, research and hidden matters.',
  },
  {
    number: 9,
    title: 'Luck & Philosophy',
    description: 'Higher learning, destiny and spirituality.',
  },
  {
    number: 10,
    title: 'Career & Status',
    description: 'Profession, fame, leadership and achievements.',
  },
  {
    number: 11,
    title: 'Gains & Network',
    description: 'Friendships, aspirations and social income.',
  },
  {
    number: 12,
    title: 'Losses & Liberation',
    description: 'Expenditure, subconscious, foreign travels and Moksha.',
  },
];

// Exact Important Yogas matching Reference Design 3
const YOGA_CARDS_DATA = [
  {
    id: 'gaja-kesari',
    title: 'Gaja Kesari Yoga',
    badge: 'Present',
    badgeType: 'present',
    description: 'Brings wisdom, financial stability and respect in society.',
    image: images.yogaGajakesari,
  },
  {
    id: 'dhana',
    title: 'Dhana Yoga',
    badge: 'Present',
    badgeType: 'present',
    description: 'Indicates potential for wealth and financial growth.',
    image: images.yogaDhana,
  },
  {
    id: 'raja',
    title: 'Raja Yoga',
    badge: 'Present',
    badgeType: 'present',
    description: 'Can bring success, leadership and higher status.',
    image: images.yogaRaja,
  },
  {
    id: 'chandra-mangal',
    title: 'Chandra-Mangal Yoga',
    badge: 'Moderate',
    badgeType: 'moderate',
    description: 'Enhances mental strength and decision-making.',
    image: images.yogaChandramangal,
  },
];

// Varga Divisional Charts
const VARGA_DATA = [
  { code: 'D1', title: 'Rashi Chart', description: 'Primary physical constitution and core destiny.' },
  { code: 'D9', title: 'Navamsha', description: 'Spouse, marriage, inner nature and dharma.' },
  { code: 'D10', title: 'Dashamsha', description: 'Career achievements, fame, profession and power.' },
  { code: 'D7', title: 'Saptamsha', description: 'Children, creativity, progeny and legacy.' },
  { code: 'D4', title: 'Chaturthamsha', description: 'Fixed assets, fortune, real estate and home.' },
  { code: 'D12', title: 'Dwadashamsha', description: 'Ancestral roots, parents and past life karma.' },
];

// Dasha Tab Data matching Reference Design
const CURRENT_DASHA = {
  planet: 'Saturn',
  title: 'Saturn Mahadasha',
  period: 'Jan 2019 – Mar 2038 (19 years)',
  image: images.grahaSaturn,
  description: 'A major 19-year cycle ruled by Saturn, emphasizing discipline, responsibility, enduring focus, and karmic refinement.',
};

const CURRENT_ANTARDASHA = {
  planet: 'Mercury',
  title: 'Mercury',
  period: 'Feb 2024 – Jul 2026 (2 years 5 months)',
  image: images.grahaMercury,
  description: 'A 2-year 5-month sub-period stimulating intellectual prowess, trade opportunities, analytical acumen, and communication.',
};

const UPCOMING_PERIODS = [
  {
    id: 'ketu',
    title: 'Ketu Antardasha',
    period: 'Jul 2026 – Aug 2027',
    image: images.grahaKetu,
    description: 'A spiritual transit encouraging introspection, subtle wisdom, and release of unnecessary attachments.',
  },
  {
    id: 'venus',
    title: 'Venus Antardasha',
    period: 'Aug 2027 – Oct 2030',
    image: images.grahaVenus,
    description: 'A gracious sub-period fostering creative arts, harmonious relationships, financial fortune, and lifestyle comforts.',
  },
  {
    id: 'sun',
    title: 'Sun Antardasha',
    period: 'Oct 2030 – Aug 2031',
    image: images.grahaSun,
    description: 'A clarifying period elevating self-sovereignty, leadership visibility, public honor, and executive authority.',
  },
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

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const getBackgroundImage = () => {
    switch (activeSubTab) {
      case 'Bhava':
      case 'Dasha':
        return images.kundaliBg || images.kundaliBg;
      case 'Yoga':
        return images.kundaliBg || images.kundaliBg;
      default:
        return images.kundaliBg;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={getBackgroundImage()}
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
              onPress={handleBack}
              activeOpacity={0.75}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
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

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeSubTab === 'Overview' && (
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
          )}

          {/* ==================== TAB 2: GRAHA (PLANETS) ==================== */}
          {activeSubTab === 'Graha' && (
            <ScrollView
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Heading */}
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionHeading}>Graha Positions</Text>
                <Text style={styles.sectionSubheading}>
                  Planets and their position in your birth chart.
                </Text>
              </View>

              {/* 9 Graha Items Container Card */}
              <View style={styles.listCardContainer}>
                {GRAHA_DATA.map((graha, idx) => (
                  <TouchableOpacity
                    key={graha.id}
                    style={[
                      styles.grahaItemRow,
                      idx < GRAHA_DATA.length - 1 && styles.itemDivider,
                    ]}
                    activeOpacity={0.7}
                    onPress={() =>
                      Alert.alert(
                        graha.name,
                        `${graha.name} is stationed in ${graha.sign} in the ${graha.house}.`
                      )
                    }
                  >
                    {/* Planet Circular Medallion */}
                    <View style={styles.planetMedallion}>
                      <Image
                        source={graha.image}
                        style={styles.planetMedallionImg}
                        resizeMode="cover"
                      />
                    </View>

                    {/* Planet Name */}
                    <View style={styles.grahaNameBox}>
                      <Text style={styles.grahaNameText}>{graha.name}</Text>
                    </View>

                    {/* Sign & House Position */}
                    <View style={styles.grahaDetailsBox}>
                      <Text style={styles.grahaSignText}>{graha.sign}</Text>
                      <Text style={styles.grahaHouseText}>{graha.house}</Text>
                    </View>

                    {/* Trailing Chevron Arrow */}
                    <Text style={styles.chevronArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* ==================== TAB 3: BHAVA (12 HOUSES) ==================== */}
          {activeSubTab === 'Bhava' && (
            <ScrollView
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Heading */}
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionHeading}>12 Houses (Bhavas)</Text>
                <Text style={styles.sectionSubheading}>
                  Each house represents a different area of your life.
                </Text>
              </View>

              {/* 12 House Items Container Card */}
              <View style={styles.listCardContainer}>
                {BHAVA_DATA.map((bhava, idx) => (
                  <TouchableOpacity
                    key={bhava.number}
                    style={[
                      styles.bhavaItemRow,
                      idx < BHAVA_DATA.length - 1 && styles.itemDivider,
                    ]}
                    activeOpacity={0.7}
                    onPress={() =>
                      Alert.alert(`House ${bhava.number} - ${bhava.title}`, bhava.description)
                    }
                  >
                    {/* Double-Rimmed Antique Medallion */}
                    <View style={styles.bhavaMedallionOuter}>
                      <View style={styles.bhavaMedallionBezel}>
                        <View style={styles.bhavaMedallionCore}>
                          <Text style={styles.bhavaNumberText}>{bhava.number}</Text>
                        </View>
                      </View>
                    </View>

                    {/* House Title & Description */}
                    <View style={styles.bhavaTextBox}>
                      <Text style={styles.bhavaTitleText}>{bhava.title}</Text>
                      <Text style={styles.bhavaDescText}>{bhava.description}</Text>
                    </View>

                    {/* Trailing Chevron Arrow */}
                    <Text style={styles.chevronArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </ScrollView>
          )}

          {/* ==================== TAB 4: YOGA (IMPORTANT YOGAS) ==================== */}
          {activeSubTab === 'Yoga' && (
            <ScrollView
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Heading */}
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionHeading}>Important Yogas</Text>
                <Text style={styles.sectionSubheading}>
                  Significant combinations in your birth chart.
                </Text>
              </View>

              {/* 4 Yoga Cards */}
              <View style={styles.yogaCardsContainer}>
                {YOGA_CARDS_DATA.map((yoga) => (
                  <View key={yoga.id} style={styles.yogaCard}>
                    {/* Left Thumbnail Miniature Painting */}
                    <Image
                      source={yoga.image}
                      style={styles.yogaThumbnail}
                      resizeMode="cover"
                    />

                    {/* Right Content */}
                    <View style={styles.yogaContentCol}>
                      <View style={styles.yogaTopRow}>
                        <Text style={styles.yogaCardTitle}>{yoga.title}</Text>
                        <View
                          style={[
                            styles.yogaBadge,
                            yoga.badgeType === 'present'
                              ? styles.yogaBadgePresent
                              : styles.yogaBadgeModerate,
                          ]}
                        >
                          <Text
                            style={[
                              styles.yogaBadgeText,
                              yoga.badgeType === 'present'
                                ? styles.yogaBadgeTextPresent
                                : styles.yogaBadgeTextModerate,
                            ]}
                          >
                            {yoga.badge}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.yogaCardDesc}>{yoga.description}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Bottom Callout & CTA Button */}
              <View style={styles.yogaBottomBannerCard}>
                <ImageBackground
                  source={images.yogaBg}
                  style={styles.yogaBannerBg}
                  imageStyle={styles.yogaBannerBgImg}
                  resizeMode="cover"
                >
                  <View style={styles.yogaBannerScrim} />
                  <View style={styles.yogaBannerContent}>
                    <Text style={styles.yogaBannerTitle}>
                      Want a detailed interpretation?
                    </Text>
                    <Text style={styles.yogaBannerSubtitle}>
                      Get in-depth analysis of all yogas in your chart.
                    </Text>

                    <TouchableOpacity
                      style={styles.viewFullReportButton}
                      onPress={() =>
                        Alert.alert(
                          'Full Yoga Report',
                          'Generating complete planetary yoga interpretation for your natal chart.'
                        )
                      }
                      activeOpacity={0.85}
                    >
                      <Text style={styles.viewFullReportText}>View Full Report</Text>
                      <Text style={styles.viewFullReportArrow}>→</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </ScrollView>
          )}

          {/* ==================== TAB 5: VARGA (DIVISIONAL CHARTS) ==================== */}
          {activeSubTab === 'Varga' && (
            <ScrollView
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Heading */}
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionHeading}>Varga Charts</Text>
                <Text style={styles.sectionSubheading}>
                  Harmonic divisional charts derived from your birth Kundali.
                </Text>
              </View>

              {/* Varga Divisional Charts List */}
              <View style={styles.listCardContainer}>
                {VARGA_DATA.map((varga, idx) => (
                  <TouchableOpacity
                    key={varga.code}
                    style={[
                      styles.bhavaItemRow,
                      idx < VARGA_DATA.length - 1 && styles.itemDivider,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert(`${varga.code} - ${varga.title}`, varga.description)}
                  >
                    <View style={styles.bhavaMedallionOuter}>
                      <View style={styles.bhavaMedallionBezel}>
                        <View style={styles.bhavaMedallionCore}>
                          <Text style={[styles.bhavaNumberText, { fontSize: rem(13) }]}>
                            {varga.code}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.bhavaTextBox}>
                      <Text style={styles.bhavaTitleText}>{varga.title}</Text>
                      <Text style={styles.bhavaDescText}>{varga.description}</Text>
                    </View>

                    <Text style={styles.chevronArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* ==================== TAB 6: DASHA (PLANETARY PERIODS) ==================== */}
          {activeSubTab === 'Dasha' && (
            <ScrollView
              style={styles.tabScrollView}
              contentContainerStyle={styles.tabScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Section Heading */}
              <View style={styles.sectionHeaderBox}>
                <Text style={styles.sectionHeading}>Dasha Periods</Text>
                <Text style={styles.sectionSubheading}>
                  Dasha shows the timing of events in your life based on planetary periods.
                </Text>
              </View>

              {/* Cosmic Celestial Solar System Orrery Banner */}
              <View style={styles.dashaBannerContainer}>
                <Image
                  source={images.dashaOrrery}
                  style={styles.dashaBannerImg}
                  resizeMode="cover"
                />
              </View>

              {/* Card 1: Current Dasha */}
              <TouchableOpacity
                style={styles.dashaHighlightCard}
                activeOpacity={0.75}
                onPress={() =>
                  Alert.alert(
                    CURRENT_DASHA.title,
                    `${CURRENT_DASHA.title} (${CURRENT_DASHA.period})\n\n${CURRENT_DASHA.description}`
                  )
                }
              >
                <View style={styles.dashaMedallionOuter}>
                  <Image
                    source={CURRENT_DASHA.image}
                    style={styles.dashaMedallionImg}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.dashaCardContent}>
                  <Text style={styles.dashaCardCategory}>Current Dasha</Text>
                  <Text style={styles.dashaCardTitle}>{CURRENT_DASHA.title}</Text>
                  <Text style={styles.dashaCardPeriod}>{CURRENT_DASHA.period}</Text>
                </View>

                <Text style={styles.chevronArrow}>›</Text>
              </TouchableOpacity>

              {/* Card 2: Current Antardasha */}
              <TouchableOpacity
                style={styles.dashaHighlightCard}
                activeOpacity={0.75}
                onPress={() =>
                  Alert.alert(
                    `Current Antardasha - ${CURRENT_ANTARDASHA.title}`,
                    `${CURRENT_ANTARDASHA.title} (${CURRENT_ANTARDASHA.period})\n\n${CURRENT_ANTARDASHA.description}`
                  )
                }
              >
                <View style={styles.dashaMedallionOuter}>
                  <Image
                    source={CURRENT_ANTARDASHA.image}
                    style={styles.dashaMedallionImg}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.dashaCardContent}>
                  <Text style={styles.dashaCardCategory}>Current Antardasha</Text>
                  <Text style={styles.dashaCardTitle}>{CURRENT_ANTARDASHA.title}</Text>
                  <Text style={styles.dashaCardPeriod}>{CURRENT_ANTARDASHA.period}</Text>
                </View>

                <Text style={styles.chevronArrow}>›</Text>
              </TouchableOpacity>

              {/* Section: Upcoming Periods */}
              <View style={styles.upcomingHeaderBox}>
                <Text style={styles.upcomingHeading}>Upcoming Periods</Text>
              </View>

              {/* Unified Parchment Container for Upcoming Periods */}
              <View style={styles.upcomingCardContainer}>
                {UPCOMING_PERIODS.map((period, idx) => (
                  <TouchableOpacity
                    key={period.id}
                    style={[
                      styles.upcomingItemRow,
                      idx < UPCOMING_PERIODS.length - 1 && styles.upcomingDivider,
                    ]}
                    activeOpacity={0.7}
                    onPress={() =>
                      Alert.alert(
                        period.title,
                        `${period.title} (${period.period})\n\n${period.description}`
                      )
                    }
                  >
                    <View style={styles.upcomingMedallionOuter}>
                      <Image
                        source={period.image}
                        style={styles.upcomingMedallionImg}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.upcomingContentCol}>
                      <Text style={styles.upcomingItemTitle}>{period.title}</Text>
                      <Text style={styles.upcomingItemPeriod}>{period.period}</Text>
                    </View>

                    <Text style={styles.chevronArrow}>›</Text>
                  </TouchableOpacity>
                ))}
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
            onPress={() => navigation.navigate(ROUTES.MATCHMAKING, {
              userDetails: {
                name: fullName,
                dob: birthDate,
                tob: birthTime,
                pob: birthPlace,
              },
            })}
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
    backgroundColor: 'rgba(255, 248, 235, 0.08)',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: vw(4.5),
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.8),
    paddingHorizontal: vw(1),
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
    marginLeft: vw(3.5),
    letterSpacing: 0.3,
  },
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
    fontSize: rem(13.2),
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
    width: '85%',
    height: 2.8,
    backgroundColor: '#0D3836',
    borderRadius: 1.5,
  },
  tabInactiveIndicator: {
    height: 2.8,
  },

  // ==================== OVERVIEW TAB STYLES ====================
  overviewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: vh(2),
  },
  chartContainer: {
    width: '100%',
    height: vh(29),
    maxHeight: rem(250),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.5),
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  userDetailsBox: {
    alignItems: 'center',
    marginVertical: vh(0.8),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
  },
  userName: {
    fontFamily: fontFamily.title,
    fontSize: rem(20),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  pencilIconBox: {
    width: rem(22),
    height: rem(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDateText: {
    fontFamily: fontFamily.body,
    fontSize: rem(13.5),
    fontWeight: '500',
    color: '#693917',
    marginTop: vh(0.3),
  },
  userPlaceText: {
    fontFamily: fontFamily.body,
    fontSize: rem(12.5),
    color: '#7A5E48',
    marginTop: 1,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 248, 236, 0.82)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingVertical: vh(1.8),
    paddingHorizontal: vw(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: vh(0.8),
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12),
    color: '#7A5E48',
    marginTop: vh(0.5),
  },
  summaryValue: {
    fontFamily: fontFamily.title,
    fontSize: rem(13.5),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: rem(17),
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
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#F2E2BE',
    letterSpacing: 0.3,
  },
  detailedCtaArrow: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#F2E2BE',
    marginTop: -1,
  },

  // ==================== SHARED SCROLL & SECTION HEADERS ====================
  tabScrollView: {
    flex: 1,
  },
  tabScrollContent: {
    paddingBottom: vh(4),
  },
  sectionHeaderBox: {
    width: '100%',
    marginTop: vh(0.6),
    marginBottom: vh(1.5),
    paddingHorizontal: vw(1),
  },
  sectionHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(26),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.3,
  },
  sectionSubheading: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    color: '#693917',
    marginTop: vh(0.4),
    lineHeight: rem(19),
  },

  // ==================== GRAHA & BHAVA LIST CONTAINER ====================
  listCardContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 250, 242, 0.76)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(216, 194, 168, 0.8)',
    paddingHorizontal: vw(3.5),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: vh(2.2),
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(216, 194, 168, 0.5)',
  },
  chevronArrow: {
    fontFamily: fontFamily.title,
    fontSize: rem(20),
    color: '#9C784C',
    marginLeft: vw(1.5),
    fontWeight: '600',
  },

  // Graha Item Row
  grahaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1.25),
  },
  planetMedallion: {
    width: rem(46),
    height: rem(46),
    borderRadius: rem(23),
    borderWidth: 1.5,
    borderColor: '#C89B48',
    overflow: 'hidden',
    backgroundColor: '#0F2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.5,
    elevation: 3,
  },
  planetMedallionImg: {
    width: '100%',
    height: '100%',
  },
  grahaNameBox: {
    flex: 1.15,
    paddingLeft: vw(3),
    justifyContent: 'center',
  },
  grahaNameText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  grahaDetailsBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: vw(1.5),
  },
  grahaSignText: {
    fontFamily: fontFamily.body,
    fontSize: rem(13.5),
    fontWeight: '500',
    color: '#3C2819',
  },
  grahaHouseText: {
    fontFamily: fontFamily.body,
    fontSize: rem(12),
    color: '#7A5E48',
    marginTop: 2,
  },

  // Bhava Item Row
  bhavaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1.3),
  },
  bhavaMedallionOuter: {
    width: rem(44),
    height: rem(44),
    borderRadius: rem(22),
    borderWidth: 1.5,
    borderColor: '#C89B48',
    backgroundColor: '#9A753C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 3,
  },
  bhavaMedallionBezel: {
    width: rem(38),
    height: rem(38),
    borderRadius: rem(19),
    borderWidth: 1,
    borderColor: '#F3DB9E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bhavaMedallionCore: {
    width: rem(32),
    height: rem(32),
    borderRadius: rem(16),
    backgroundColor: '#072427',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bhavaNumberText: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#F4DEAC',
  },
  bhavaTextBox: {
    flex: 1,
    paddingLeft: vw(3.5),
    paddingRight: vw(2),
    justifyContent: 'center',
  },
  bhavaTitleText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  bhavaDescText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    color: '#6B4F35',
    marginTop: 2,
    lineHeight: rem(17),
  },
  bhavaLandscapeBanner: {
    width: '100%',
    height: vh(18),
    borderRadius: rem(16),
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    marginBottom: vh(3),
  },
  bhavaLandscapeImg: {
    width: '100%',
    height: '100%',
  },

  // ==================== YOGA TAB STYLES ====================
  yogaCardsContainer: {
    width: '100%',
    marginBottom: vh(1.8),
  },
  yogaCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 250, 242, 0.78)',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: 'rgba(216, 194, 168, 0.8)',
    padding: vw(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  yogaThumbnail: {
    width: rem(66),
    height: rem(66),
    borderRadius: rem(10),
    borderWidth: 1,
    borderColor: 'rgba(200, 155, 72, 0.4)',
  },
  yogaContentCol: {
    flex: 1,
    paddingLeft: vw(3),
    justifyContent: 'center',
  },
  yogaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  yogaCardTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    flex: 1,
  },
  yogaBadge: {
    paddingHorizontal: vw(2.4),
    paddingVertical: vh(0.3),
    borderRadius: rem(10),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yogaBadgePresent: {
    backgroundColor: 'rgba(215, 235, 218, 0.88)',
    borderColor: 'rgba(168, 204, 175, 0.75)',
  },
  yogaBadgeModerate: {
    backgroundColor: 'rgba(252, 238, 208, 0.92)',
    borderColor: 'rgba(230, 200, 140, 0.75)',
  },
  yogaBadgeText: {
    fontFamily: fontFamily.button,
    fontSize: rem(11),
    fontWeight: '600',
  },
  yogaBadgeTextPresent: {
    color: '#245930',
  },
  yogaBadgeTextModerate: {
    color: '#8A5814',
  },
  yogaCardDesc: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    color: '#6B4F35',
    lineHeight: rem(17.5),
  },
  yogaBottomBannerCard: {
    width: '100%',
    borderRadius: rem(16),
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    marginBottom: vh(3),
  },
  yogaBannerBg: {
    width: '100%',
  },
  yogaBannerBgImg: {
    opacity: 0.55,
  },
  yogaBannerScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 236, 0.65)',
  },
  yogaBannerContent: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2.2),
    alignItems: 'center',
  },
  yogaBannerTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(16.5),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
  },
  yogaBannerSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    color: '#6B4F35',
    textAlign: 'center',
    marginTop: vh(0.4),
  },
  viewFullReportButton: {
    width: '100%',
    height: rem(48),
    borderRadius: rem(24),
    backgroundColor: '#092E31',
    borderWidth: 1.2,
    borderColor: '#C89B48',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
    marginTop: vh(1.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  viewFullReportText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#F4E2BD',
    letterSpacing: 0.3,
  },
  viewFullReportArrow: {
    fontSize: rem(18),
    color: '#F4E2BD',
    fontWeight: '700',
    marginTop: -2,
  },

  // ==================== DASHA TAB STYLES ====================
  dashaBannerContainer: {
    width: '100%',
    height: rem(134),
    borderRadius: rem(16),
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    marginBottom: vh(1.8),
    backgroundColor: '#04161A',
    shadowColor: '#170E08',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },
  dashaBannerImg: {
    width: '100%',
    height: '100%',
  },
  dashaHighlightCard: {
    backgroundColor: 'rgba(252, 245, 233, 0.92)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.8),
    paddingVertical: vh(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dashaMedallionOuter: {
    width: rem(52),
    height: rem(52),
    borderRadius: rem(26),
    borderWidth: 1.5,
    borderColor: '#C89B48',
    overflow: 'hidden',
    backgroundColor: '#0E1F21',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
  },
  dashaMedallionImg: {
    width: '100%',
    height: '100%',
  },
  dashaCardContent: {
    flex: 1,
    marginLeft: vw(3.5),
    justifyContent: 'center',
  },
  dashaCardCategory: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12),
    fontWeight: '600',
    color: '#3B2416',
    letterSpacing: 0.2,
  },
  dashaCardTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(17.5),
    fontWeight: '700',
    color: '#26160C',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  dashaCardPeriod: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    fontWeight: '500',
    color: '#6B4F35',
    marginTop: 2,
  },
  upcomingHeaderBox: {
    marginTop: vh(0.8),
    marginBottom: vh(1.2),
  },
  upcomingHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  upcomingCardContainer: {
    backgroundColor: 'rgba(252, 245, 233, 0.92)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    overflow: 'hidden',
    marginBottom: vh(3),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.8),
    paddingVertical: vh(1.5),
  },
  upcomingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 83, 0.28)',
  },
  upcomingMedallionOuter: {
    width: rem(46),
    height: rem(46),
    borderRadius: rem(23),
    borderWidth: 1.4,
    borderColor: '#C89B48',
    overflow: 'hidden',
    backgroundColor: '#0E1F21',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.18,
    shadowRadius: 2.5,
    elevation: 2,
  },
  upcomingMedallionImg: {
    width: '100%',
    height: '100%',
  },
  upcomingContentCol: {
    flex: 1,
    marginLeft: vw(3.5),
    justifyContent: 'center',
  },
  upcomingItemTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  upcomingItemPeriod: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    color: '#6B4F35',
    marginTop: 2,
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

export default MyKundaliScreen;
