/**
 * ReportsScreen Component
 * "Reports" screen matching the exact design:
 * - Top Header: Circular antique back button, serif "Reports" title, and golden corner flourish
 * - Subtitle: "Get detailed reports to understand your life path, strengths and opportunities."
 * - 6 Detailed Report Cards:
 *   1. Full Kundali Report (Ancient Vedic Manuscript)
 *   2. Career Report (Bar chart with golden upward growth arrow)
 *   3. Marriage & Relationship Report (Golden wedding rings)
 *   4. Finance Report (Golden Kalash pot overflowing with coins)
 *   5. Health Report (Ayurvedic botanical leaf emblem)
 *   6. Dasha Report (Saturn celestial rings in cosmos)
 * - Bottom Hero Card: "Get Your Personalized Report" set over riverfront sunset temple panorama
 * - Fixed Vedic Bottom Navigation Bar: Home, Kundali, Match, Bot, More
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
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
  IconChevronRight,
} from '../../components/common/VedicIcons';

const REPORTS = [
  {
    id: 'kundali',
    title: 'Full Kundali Report',
    description: 'Complete analysis of your birth chart with detailed insights.',
    image: images.reportKundali,
    route: ROUTES.MY_KUNDALI,
  },
  {
    id: 'career',
    title: 'Career Report',
    description: 'Opportunities, growth periods and guidance for your profession.',
    image: images.reportCareer,
  },
  {
    id: 'marriage',
    title: 'Marriage & Relationship Report',
    description: 'Compatibility, timing and guidance for a happy relationship.',
    image: images.reportMarriage,
    route: ROUTES.MATCHMAKING,
  },
  {
    id: 'finance',
    title: 'Finance Report',
    description: 'Wealth, financial stability and auspicious periods.',
    image: images.reportFinance,
  },
  {
    id: 'health',
    title: 'Health Report',
    description: 'Insights on health, well-being and lifestyle guidance.',
    image: images.reportHealth,
  },
  {
    id: 'dasha',
    title: 'Dasha Report',
    description: 'Detailed analysis of your planetary periods and their effects.',
    image: images.reportDasha,
  },
];

export const ReportsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Home');

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const handleReportPress = (report) => {
    if (report.route) {
      navigation.navigate(report.route);
      return;
    }
    Alert.alert(
      report.title,
      `${report.description}\n\nWould you like to generate this in-depth astrology report?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Generate Report',
          onPress: () =>
            Alert.alert(
              'Report Generating',
              `Your ${report.title} is being prepared based on your birth planetary coordinates.`
            ),
        },
      ]
    );
  };

  const handlePersonalizedReportPress = () => {
    Alert.alert(
      'Get Your Personalized Report',
      'Unlock complete personalized lifetime insights, favorable transits, and Vedic remedies customized to your exact birth chart.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unlock Report',
          onPress: () =>
            Alert.alert(
              'Success',
              'Your comprehensive personalized report is being generated.'
            ),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.homeBg}
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

            <Text style={styles.headerTitle}>Reports</Text>

            {/* Top Right Corner Floral Flourish Accent */}
            <View style={styles.cornerFlourishBox}>
              <Text style={styles.flourishText}>❧</Text>
            </View>
          </View>

          {/* Subtitle description */}
          <Text style={styles.headerSubtitle}>
            Get detailed reports to understand your life path, strengths and opportunities.
          </Text>

          {/* Scrollable Report Cards */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 6 Report Cards */}
            {REPORTS.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                activeOpacity={0.84}
                onPress={() => handleReportPress(report)}
              >
                {/* Left Thumbnail Illustration */}
                <View style={styles.thumbContainer}>
                  <Image
                    source={report.image}
                    style={styles.thumbImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Middle Text Information */}
                <View style={styles.reportTextBox}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportDesc}>{report.description}</Text>
                </View>

                {/* Right Chevron */}
                <View style={styles.chevronBox}>
                  <IconChevronRight size={rem(16)} color="#8C6636" strokeWidth={2.2} />
                </View>
              </TouchableOpacity>
            ))}

            {/* Bottom Hero: "Get Your Personalized Report" set in riverfront temple artwork */}
            <View style={styles.heroLandscapeCard}>
              <ImageBackground
                source={images.guidanceLandscape || images.templeHighRes}
                style={styles.landscapeBg}
                imageStyle={styles.landscapeBgImg}
                resizeMode="cover"
              >
                {/* Dark teal glass card inside landscape */}
                <TouchableOpacity
                  style={styles.personalizedCard}
                  activeOpacity={0.88}
                  onPress={handlePersonalizedReportPress}
                >
                  {/* Left Certificate Document Icon */}
                  <View style={styles.certIconBox}>
                    <Image
                      source={images.reportCertificate}
                      style={styles.certIconImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Middle Text Column */}
                  <View style={styles.certTextBox}>
                    <Text style={styles.certTitle}>Get Your Personalized Report</Text>
                    <Text style={styles.certSubtitle}>
                      Unlock detailed insights and guidance based on your unique birth chart.
                    </Text>
                  </View>

                  {/* Right Gold Chevron */}
                  <View style={styles.certChevronBox}>
                    <IconChevronRight size={rem(18)} color="#F3D78E" strokeWidth={2.4} />
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>
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
            onPress={() => {
              setActiveTab('Home');
              navigation.navigate(ROUTES.HOME);
            }}
            activeOpacity={0.7}
          >
            {activeTab === 'Home' ? (
              <View style={styles.activeNavBadge}>
                <IconHomeFilled size={rem(20)} color="#FFFFFF" />
              </View>
            ) : (
              <IconHomeFilled size={rem(21)} color="#6B4F35" />
            )}
            <Text
              style={[
                styles.navTabLabel,
                activeTab === 'Home' && styles.navTabLabelActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          {/* Tab 2: Kundali */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('Kundali');
              navigation.navigate(ROUTES.MY_KUNDALI);
            }}
            activeOpacity={0.7}
          >
            <IconChakra size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Kundali</Text>
          </TouchableOpacity>

          {/* Tab 3: Match */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('Match');
              navigation.navigate(ROUTES.MATCHMAKING);
            }}
            activeOpacity={0.7}
          >
            <IconHeart size={rem(19)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Match</Text>
          </TouchableOpacity>

          {/* Tab 4: Bot */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('Bot');
              navigation.navigate(ROUTES.BOT);
            }}
            activeOpacity={0.7}
          >
            <IconBotTab size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Bot</Text>
          </TouchableOpacity>

          {/* Tab 5: More */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('More');
              navigation.navigate(ROUTES.PROFILE);
            }}
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
    backgroundColor: 'rgba(255, 248, 235, 0.05)',
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
  headerSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    fontWeight: '500',
    color: '#6B4F35',
    lineHeight: rem(18),
    textAlign: 'center',
    paddingHorizontal: vw(3),
    marginBottom: vh(1.6),
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(2),
  },

  // ==================== REPORT CARD ====================
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(15),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.2),
    paddingVertical: vh(1.1),
    marginBottom: vh(1.2),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbContainer: {
    width: rem(64),
    height: rem(42),
    borderRadius: rem(8),
    overflow: 'hidden',
    backgroundColor: '#F5E6CF',
    borderWidth: 1,
    borderColor: 'rgba(198, 155, 72, 0.35)',
    marginRight: vw(3),
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  reportTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  reportTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  reportDesc: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.8),
    fontWeight: '500',
    color: '#6B4F35',
    lineHeight: rem(15.5),
    marginTop: 2,
  },
  chevronBox: {
    paddingLeft: vw(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==================== HERO LANDSCAPE BANNER ====================
  heroLandscapeCard: {
    width: '100%',
    height: rem(130),
    borderRadius: rem(16),
    overflow: 'hidden',
    marginTop: vh(0.4),
    marginBottom: vh(1),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  landscapeBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: vw(2.5),
  },
  landscapeBgImg: {
    opacity: 0.95,
  },
  personalizedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#072427',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: '#C89B48',
    paddingHorizontal: vw(3.2),
    paddingVertical: vh(1.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  certIconBox: {
    width: rem(34),
    height: rem(38),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.5),
  },
  certIconImage: {
    width: rem(32),
    height: rem(36),
  },
  certTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  certTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#F3D78E',
    letterSpacing: 0.2,
  },
  certSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.2),
    color: '#E4D0B5',
    lineHeight: rem(14.5),
    marginTop: 2,
  },
  certChevronBox: {
    paddingLeft: vw(1.5),
    alignItems: 'center',
    justifyContent: 'center',
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

export default ReportsScreen;
