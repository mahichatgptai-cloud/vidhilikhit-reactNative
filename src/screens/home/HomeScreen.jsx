/**
 * HomeScreen Component
 * Main Vedic Astrology Dashboard matching the attached UI design
 * Features personalized Namaste greeting, Kundali status card, 2x2 service grid,
 * Vidhilikhit Bot card, and Vedic bottom navigation bar.
 * Built with fully responsive units (vh, vw, rem, and %) for seamless scaling across all screen sizes.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { useAuthStore } from '../../store/authStore';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import {
  IconBell,
  IconChakra,
  IconSunSurya,
  IconMatchRings,
  IconOpenBook,
  IconLotusGold,
  IconArrowRight,
  IconChevronRight,
  IconHomeFilled,
  IconHeart,
  IconBotTab,
  IconMenuTab,
} from '../../components/common/VedicIcons';

export const HomeScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  // Extract user first name
  const rawName =
    route?.params?.fullName ||
    user?.fullName ||
    user?.name ||
    'Alivia';
  const firstName = rawName.split(' ')[0] || 'Alivia';

  const [activeTab, setActiveTab] = useState('Home');

  const handleCardPress = (serviceName) => {
    if (serviceName === 'My Kundali') {
      navigation.navigate(ROUTES.MY_KUNDALI, {
        fullName: rawName,
      });
      return;
    }
    Alert.alert(
      serviceName,
      `Opening ${serviceName} feature...`,
      [{ text: 'OK' }]
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
        {/* Soft Ambient Parchment Scrim to ease high-contrast background leaves while keeping artwork vibrant */}
        <View style={styles.parchmentScrim} pointerEvents="none" />

        {/* Fully Responsive Non-scrolling Viewport Container */}
        <View
          style={[
            styles.mainContent,
            {
              paddingTop: Math.max(insets.top, vh(1.8)),
              paddingBottom: vh(7.8) + Math.max(insets.bottom, vh(1.2)),
            },
          ]}
        >
          {/* Top Header Bar: Logo & Notification Bell */}
          <View style={styles.headerBar}>
            <View style={styles.brandRow}>
              <IconChakra size={rem(28)} color="#8C6636" />
              <Text style={styles.brandTitle}>Vidhilikhit</Text>
            </View>

            <TouchableOpacity
              style={styles.bellButton}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Notifications', 'No new notifications at this time.')}
            >
              <IconBell size={rem(19)} color="#26160C" hasBadge={true} />
            </TouchableOpacity>
          </View>

          {/* Hero Greeting Section with protective parchment backing */}
          <View style={styles.greetingSection}>
            <View style={styles.greetingBackdrop}>
              <Text style={styles.greetingNamaste}>Namaste,</Text>
              <Text style={styles.greetingName}>{firstName}</Text>
              <Text style={styles.greetingSubtitle}>
                The stars always have{'\n'}something to tell you.
              </Text>
            </View>
          </View>

          {/* "Your Kundali is Ready" Hero Card */}
          <TouchableOpacity
            style={styles.kundaliCard}
            activeOpacity={0.88}
            onPress={() => handleCardPress('My Kundali')}
          >
            <View style={styles.kundaliSunBox}>
              <IconSunSurya size={rem(40)} color="#E5B869" />
            </View>

            <View style={styles.kundaliTextBox}>
              <Text style={styles.kundaliTitle}>Your Kundali is Ready</Text>
              <Text style={styles.kundaliSubtitle}>
                Explore your birth chart and{'\n'}personalized insights.
              </Text>
            </View>

            <View style={styles.kundaliChevronBox}>
              <IconChevronRight size={rem(18)} color="#D4A853" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>

          {/* Section Heading: "Explore Vidhilikhit" */}
          <Text style={styles.sectionHeading}>Explore Vidhilikhit</Text>

          {/* 2x2 Feature Grid */}
          <View style={styles.gridContainer}>
            {/* Card 1: My Kundali */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleCardPress('My Kundali')}
            >
              <View style={styles.gridIconBox}>
                <IconChakra size={rem(33)} color="#C89B48" />
              </View>
              <Text style={styles.gridCardTitle}>My Kundali</Text>
              <Text style={styles.gridCardSub}>View your birth chart</Text>
            </TouchableOpacity>

            {/* Card 2: Matchmaking */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleCardPress('Matchmaking')}
            >
              <View style={styles.gridIconBox}>
                <IconMatchRings size={rem(33)} color="#C89B48" />
              </View>
              <Text style={styles.gridCardTitle}>Matchmaking</Text>
              <Text style={styles.gridCardSub}>Explore compatibility</Text>
            </TouchableOpacity>

            {/* Card 3: Daily Guidance */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleCardPress('Daily Guidance')}
            >
              <View style={styles.gridIconBox}>
                <IconLotusGold size={rem(32)} color="#C89B48" />
              </View>
              <Text style={styles.gridCardTitle}>Daily Guidance</Text>
              <Text style={styles.gridCardSub}>Personalized insights</Text>
            </TouchableOpacity>

            {/* Card 4: Reports */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleCardPress('Reports')}
            >
              <View style={styles.gridIconBox}>
                <IconOpenBook size={rem(31)} color="#C89B48" />
              </View>
              <Text style={styles.gridCardTitle}>Reports</Text>
              <Text style={styles.gridCardSub}>In-depth astrology reports</Text>
            </TouchableOpacity>
          </View>

          {/* "Ask Our Vidhilikhit Bot" Banner Card */}
          <TouchableOpacity
            style={styles.botBannerCard}
            activeOpacity={0.88}
            onPress={() => handleCardPress('Vidhilikhit Bot')}
          >
            {/* Ancient Sage Artwork */}
            <View style={styles.botSageBox}>
              <Image
                source={images.sageReadingBg}
                style={styles.botSageImage}
                resizeMode="cover"
              />
              <View style={styles.botSageOverlay} />
            </View>

            {/* Middle Texts */}
            <View style={styles.botTextBox}>
              <Text style={styles.botTitle}>Ask Our{'\n'}Vidhilikhit Bot</Text>
              <Text style={styles.botSubtitle}>
                Get answers to your{'\n'}questions anytime.
              </Text>
            </View>

            {/* Right Circular Button */}
            <View style={styles.botArrowBtn}>
              <IconArrowRight size={rem(16)} color="#083236" />
            </View>
          </TouchableOpacity>
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
            onPress={() => setActiveTab('Home')}
            activeOpacity={0.7}
          >
            <IconHomeFilled size={rem(21)} color={activeTab === 'Home' ? '#083236' : '#6B4F35'} />
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
              navigation.navigate(ROUTES.MY_KUNDALI, { fullName: rawName });
            }}
            activeOpacity={0.7}
          >
            <IconChakra size={rem(21)} color={activeTab === 'Kundali' ? '#083236' : '#6B4F35'} />
            <Text
              style={[
                styles.navTabLabel,
                activeTab === 'Kundali' && styles.navTabLabelActive,
              ]}
            >
              Kundali
            </Text>
          </TouchableOpacity>

          {/* Tab 3: Match */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => setActiveTab('Match')}
            activeOpacity={0.7}
          >
            <IconHeart size={rem(19)} color={activeTab === 'Match' ? '#083236' : '#6B4F35'} />
            <Text
              style={[
                styles.navTabLabel,
                activeTab === 'Match' && styles.navTabLabelActive,
              ]}
            >
              Match
            </Text>
          </TouchableOpacity>

          {/* Tab 4: Bot */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => setActiveTab('Bot')}
            activeOpacity={0.7}
          >
            <IconBotTab size={rem(21)} color={activeTab === 'Bot' ? '#083236' : '#6B4F35'} />
            <Text
              style={[
                styles.navTabLabel,
                activeTab === 'Bot' && styles.navTabLabelActive,
              ]}
            >
              Bot
            </Text>
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
            <IconMenuTab size={rem(19)} color={activeTab === 'More' ? '#083236' : '#6B4F35'} />
            <Text
              style={[
                styles.navTabLabel,
                activeTab === 'More' && styles.navTabLabelActive,
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
    backgroundColor: '#D7BC9F',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  parchmentScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 236, 0.22)',
  },
  mainContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: vw(4.6),
    justifyContent: 'space-between',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(0.6),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
    backgroundColor: 'rgba(255, 250, 242, 0.88)',
    paddingHorizontal: vw(2.5),
    paddingVertical: vh(0.4),
    borderRadius: rem(20),
    borderWidth: 1,
    borderColor: 'rgba(223, 201, 177, 0.65)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  brandTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(20.5),
    fontWeight: '700',
    color: '#1A1108',
    letterSpacing: 0.2,
  },
  bellButton: {
    width: vw(9.8),
    height: vw(9.8),
    borderRadius: vw(4.9),
    backgroundColor: 'rgba(255, 250, 242, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(220, 195, 168, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  greetingSection: {
    marginVertical: vh(0.3),
  },
  greetingBackdrop: {
    borderRadius: rem(14),
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.6),
    borderWidth: 1,
    borderColor: 'rgba(223, 201, 177, 0.55)',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  greetingNamaste: {
    fontFamily: fontFamily.title,
    fontSize: rem(20.5),
    fontWeight: '600',
    color: '#26160C',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  greetingName: {
    fontFamily: fontFamily.title,
    fontSize: rem(30),
    fontWeight: '800',
    color: '#1A1108',
    letterSpacing: 0.2,
    marginTop: -2,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  greetingSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    fontWeight: '600',
    color: '#3E2718',
    lineHeight: rem(16.5),
    marginTop: 2,
  },
  kundaliCard: {
    width: '100%',
    minHeight: vh(9.2),
    borderRadius: rem(14),
    backgroundColor: '#073539',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1),
    marginVertical: vh(0.4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  kundaliSunBox: {
    width: vw(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.5),
  },
  kundaliTextBox: {
    flex: 1,
  },
  kundaliTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#F4E6CB',
    letterSpacing: 0.2,
  },
  kundaliSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: rem(11.8),
    color: '#C6DDD7',
    lineHeight: rem(15),
    marginTop: 2,
  },
  kundaliChevronBox: {
    width: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#1A1108',
    marginVertical: vh(0.4),
    textShadowColor: 'rgba(246, 246, 202, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: vh(1),
  },
  gridCard: {
    width: '48.5%',
    height: vh(11.2),
    borderRadius: rem(14),
    backgroundColor: '#e8dfcf',
    borderWidth: 1.2,
    borderColor: '#DFC6A7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(2),
    paddingVertical: vh(0.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2.5,
  },
  gridIconBox: {
    height: vh(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(0.4),
  },
  gridCardTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#1A1108',
    textAlign: 'center',
  },
  gridCardSub: {
    fontFamily: fontFamily.regular,
    fontSize: rem(11.2),
    fontWeight: '600',
    color: '#4E3622',
    textAlign: 'center',
    marginTop: 1.5,
  },
  botBannerCard: {
    width: '100%',
    height: vh(10.2),
    borderRadius: rem(14),
    backgroundColor: '#05222D',
    borderWidth: 1.2,
    borderColor: '#D4A853',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: vh(0.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 4,
  },
  botSageBox: {
    width: vw(22),
    height: '100%',
    position: 'relative',
  },
  botSageImage: {
    width: '100%',
    height: '100%',
  },
  botSageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 34, 45, 0.25)',
  },
  botTextBox: {
    flex: 1,
    paddingLeft: vw(2),
    paddingRight: vw(1.5),
    justifyContent: 'center',
  },
  botTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#F4E6CB',
    lineHeight: rem(18),
  },
  botSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: rem(10.8),
    color: '#C6DDD7',
    lineHeight: rem(14),
    marginTop: 2,
  },
  botArrowBtn: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(4.5),
    backgroundColor: '#F2E2BE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#FAF3E7',
    borderTopWidth: 1.2,
    borderTopColor: '#DECAB3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: vh(0.8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navTabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(10.8),
    color: '#6B4F35',
    marginTop: 2,
  },
  navTabLabelActive: {
    color: '#083236',
    fontWeight: '700',
  },
});

export default HomeScreen;
