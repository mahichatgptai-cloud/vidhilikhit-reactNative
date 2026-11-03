/**
 * MatchmakingScreen Component
 * Step 1: "Enter Partner Details" screen matching the exact design:
 * - Top Header: Circular antique back button & "Matchmaking" serif title
 * - Progress Indicator: 6 segmented rounded pill bars (1st active in deep forest teal)
 * - Headings: "Enter Partner Details" & "Find your cosmic compatibility based on Vedic astrology."
 * - "Your Details" card: Alivia Mondal (with edit pencil), 15 March 1995, 10:30 AM, Mumbai
 * - "Partner's Details" card: Full Name, Date of Birth, Time of Birth, Place of Birth with pickers
 * - CTA Button: "Check Compatibility →" with cosmic compatibility computation
 * - Fixed Bottom Navigation: Active "Match" tab with circular dark badge & white heart
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import {
  IconUser,
  IconCalendar,
  IconClock,
  IconLocation,
  IconPencil,
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
} from '../../components/common/VedicIcons';
import VedicDatePickerModal from '../../components/common/VedicDatePickerModal';
import VedicTimePickerModal from '../../components/common/VedicTimePickerModal';
import VedicLocationPickerModal from '../../components/common/VedicLocationPickerModal';

export const MatchmakingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  // User's own details
  const userName =
    route?.params?.userDetails?.name ||
    user?.fullName ||
    user?.name ||
    'Alivia Mondal';

  const userDob =
    route?.params?.userDetails?.dob ||
    user?.birthDetails?.date ||
    user?.dob ||
    '15 March 1995';

  const userTob =
    route?.params?.userDetails?.tob ||
    user?.birthDetails?.time ||
    user?.tob ||
    '10:30 AM';

  const userPob =
    route?.params?.userDetails?.pob ||
    user?.birthDetails?.place ||
    user?.pob ||
    'Mumbai, Maharashtra, India';

  // Partner's details state
  const [partnerName, setPartnerName] = useState('');
  const [partnerDob, setPartnerDob] = useState('');
  const [partnerTob, setPartnerTob] = useState('');
  const [partnerPob, setPartnerPob] = useState('');

  // Modals for pickers
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const handleEditYourDetails = () => {
    navigation.navigate(ROUTES.TELL_US_ABOUT_YOURSELF);
  };

  const handleCheckCompatibility = () => {
    const pName = partnerName.trim() || 'Aarav Sharma';
    const pDob = partnerDob || '22 August 1993';
    const pTob = partnerTob || '08:45 AM';
    const pPob = partnerPob || 'Pune, Maharashtra, India';

    navigation.navigate(ROUTES.COMPATIBILITY_REPORT, {
      userName,
      userDob,
      userTob,
      userPob,
      partnerName: pName,
      partnerDob: pDob,
      partnerTob: pTob,
      partnerPob: pPob,
      overallScore: '82%',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.partnerDetailsBg || images.kundaliBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.parchmentScrim} pointerEvents="none" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardContainer}
        >
          <View
            style={[
              styles.mainContent,
              {
                paddingTop: Math.max(insets.top, vh(1.5)),
                paddingBottom: vh(7.5) + Math.max(insets.bottom, vh(1)),
              },
            ]}
          >
            {/* Top Header Bar: Circular Back Button & Screen Title */}
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
            </View>

            {/* 6-Segment Progress Indicator Bar */}
            <View style={styles.progressRow}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.progressSegment,
                    index === 0 && styles.progressSegmentActive,
                  ]}
                />
              ))}
            </View>

            {/* Scrollable Content Container */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Screen Title & Subtitle */}
              <View style={styles.titleSection}>
                <Text style={styles.screenHeading}>Enter Partner Details</Text>
                <Text style={styles.screenSubheading}>
                  Find your cosmic compatibility based on Vedic astrology.
                </Text>
              </View>

              {/* SECTION 1: Your Details */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Your Details</Text>
              </View>

              <View style={styles.cardContainer}>
                {/* Row 1: Full Name with Edit Pencil */}
                <TouchableOpacity
                  style={[styles.fieldRow, styles.rowDivider]}
                  onPress={handleEditYourDetails}
                  activeOpacity={0.75}
                >
                  <View style={styles.iconBox}>
                    <IconUser size={rem(18)} color="#3B2416" />
                  </View>
                  <Text style={styles.fieldValueText}>{userName}</Text>
                  <View style={styles.pencilBox}>
                    <IconPencil size={rem(15)} color="#3B2416" />
                  </View>
                </TouchableOpacity>

                {/* Row 2: Date of Birth */}
                <View style={[styles.fieldRow, styles.rowDivider]}>
                  <View style={styles.iconBox}>
                    <IconCalendar size={rem(18)} color="#3B2416" />
                  </View>
                  <Text style={styles.fieldValueText}>{userDob}</Text>
                </View>

                {/* Row 3: Time of Birth */}
                <View style={[styles.fieldRow, styles.rowDivider]}>
                  <View style={styles.iconBox}>
                    <IconClock size={rem(18)} color="#3B2416" />
                  </View>
                  <Text style={styles.fieldValueText}>{userTob}</Text>
                </View>

                {/* Row 4: Place of Birth */}
                <View style={styles.fieldRow}>
                  <View style={styles.iconBox}>
                    <IconLocation size={rem(18)} color="#3B2416" />
                  </View>
                  <Text style={styles.fieldValueText} numberOfLines={1}>
                    {userPob}
                  </Text>
                </View>
              </View>

              {/* SECTION 2: Partner's Details */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Partner's Details</Text>
              </View>

              <View style={styles.cardContainer}>
                {/* Row 1: Full Name Input */}
                <View style={[styles.fieldRow, styles.rowDivider]}>
                  <View style={styles.iconBox}>
                    <IconUser size={rem(18)} color="#3B2416" />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Full Name"
                    placeholderTextColor="#7A5E48"
                    value={partnerName}
                    onChangeText={setPartnerName}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>

                {/* Row 2: Date of Birth Picker Trigger */}
                <TouchableOpacity
                  style={[styles.fieldRow, styles.rowDivider]}
                  onPress={() => setDatePickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <IconCalendar size={rem(18)} color="#3B2416" />
                  </View>
                  <Text
                    style={[
                      styles.fieldValueText,
                      !partnerDob && styles.placeholderText,
                    ]}
                  >
                    {partnerDob || 'Date of Birth'}
                  </Text>
                </TouchableOpacity>

                {/* Row 3: Time of Birth Picker Trigger */}
                <TouchableOpacity
                  style={[styles.fieldRow, styles.rowDivider]}
                  onPress={() => setTimePickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <IconClock size={rem(18)} color="#3B2416" />
                  </View>
                  <Text
                    style={[
                      styles.fieldValueText,
                      !partnerTob && styles.placeholderText,
                    ]}
                  >
                    {partnerTob || 'Time of Birth'}
                  </Text>
                </TouchableOpacity>

                {/* Row 4: Place of Birth Picker Trigger */}
                <TouchableOpacity
                  style={styles.fieldRow}
                  onPress={() => setLocationPickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <IconLocation size={rem(18)} color="#3B2416" />
                  </View>
                  <Text
                    style={[
                      styles.fieldValueText,
                      !partnerPob && styles.placeholderText,
                    ]}
                    numberOfLines={1}
                  >
                    {partnerPob || 'Place of Birth'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Primary Action Button: "Check Compatibility →" */}
              <TouchableOpacity
                style={styles.checkCompatibilityButton}
                onPress={handleCheckCompatibility}
                activeOpacity={0.88}
              >
                <Text style={styles.checkCompatibilityText}>Check Compatibility</Text>
                <Text style={styles.checkCompatibilityArrow}>→</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

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

        {/* Vedic Pickers Modals */}
        <VedicDatePickerModal
          visible={datePickerVisible}
          currentDate={partnerDob || '1995-03-15'}
          onClose={() => setDatePickerVisible(false)}
          onSelect={(selectedDate) => {
            setPartnerDob(selectedDate);
            setDatePickerVisible(false);
          }}
        />

        <VedicTimePickerModal
          visible={timePickerVisible}
          currentTime={partnerTob || '10:30 AM'}
          onClose={() => setTimePickerVisible(false)}
          onSelect={(selectedTime) => {
            setPartnerTob(selectedTime);
            setTimePickerVisible(false);
          }}
        />

        <VedicLocationPickerModal
          visible={locationPickerVisible}
          onClose={() => setLocationPickerVisible(false)}
          onSelect={(loc) => {
            const locName = loc?.name || loc?.short || 'Mumbai, Maharashtra, India';
            setPartnerPob(locName);
            setLocationPickerVisible(false);
          }}
        />
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
    backgroundColor: 'rgba(255, 248, 235, 0.06)',
  },
  keyboardContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: vw(4.5),
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.2),
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

  // ==================== 6-SEGMENT PROGRESS BAR ====================
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vw(1.5),
    paddingHorizontal: vw(1),
    marginBottom: vh(1.8),
  },
  progressSegment: {
    flex: 1,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: 'rgba(182, 147, 106, 0.35)',
  },
  progressSegmentActive: {
    backgroundColor: '#0D3836',
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(3),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: vh(2),
  },
  screenHeading: {
    fontFamily: fontFamily.title,
    fontSize: rem(23.5),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  screenSubheading: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    fontWeight: '500',
    color: '#5C4430',
    textAlign: 'center',
    marginTop: vh(0.5),
    lineHeight: rem(19),
    paddingHorizontal: vw(4),
  },

  // ==================== SECTIONS & CARDS ====================
  sectionHeaderRow: {
    marginTop: vh(1),
    marginBottom: vh(0.8),
    paddingHorizontal: vw(0.5),
  },
  sectionTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
  },
  cardContainer: {
    backgroundColor: 'rgba(252, 245, 233, 0.92)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    overflow: 'hidden',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: vh(1.4),
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.4),
    minHeight: rem(48),
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 168, 83, 0.28)',
  },
  iconBox: {
    width: rem(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.5),
  },
  fieldValueText: {
    flex: 1,
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14.5),
    fontWeight: '500',
    color: '#26160C',
  },
  placeholderText: {
    color: '#7A5E48',
  },
  pencilBox: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14.5),
    fontWeight: '500',
    color: '#26160C',
    padding: 0,
    margin: 0,
  },

  // ==================== CTA BUTTON ====================
  checkCompatibilityButton: {
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
    marginTop: vh(1.8),
    marginBottom: vh(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  checkCompatibilityText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#F4E2BD',
    letterSpacing: 0.3,
  },
  checkCompatibilityArrow: {
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

export default MatchmakingScreen;
