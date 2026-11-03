/**
 * EditProfileScreen Component
 * "Edit Profile" screen matching the exact design:
 * - Top Header: Circular antique back button & "Edit Profile" serif title
 * - Subtitle: "Update your birth details and preferences."
 * - Large Circular Avatar with camera badge
 * - Antique form cards:
 *   1. Name: "Aarav Mehta"
 *   2. Gender: "Male" >
 *   3. Date of Birth ("15 Mar 1995") & Time of Birth ("10:30 AM" with calendar icon)
 *   4. Place of Birth: "Mumbai, India" >
 * - CTA Button: "Save Changes" in deep forest teal pill button
 * - Fixed Bottom Navigation Bar with Home, Kundali, Match, Bot, More
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
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
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
  IconChevronRight,
  IconCalendar,
  IconCamera,
} from '../../components/common/VedicIcons';
import VedicDatePickerModal from '../../components/common/VedicDatePickerModal';
import VedicTimePickerModal from '../../components/common/VedicTimePickerModal';
import VedicLocationPickerModal from '../../components/common/VedicLocationPickerModal';

export const EditProfileScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // Incoming profile data
  const incoming = route?.params?.profile || {};
  const [name, setName] = useState(incoming.name || user?.fullName || 'Aarav Mehta');
  const [gender, setGender] = useState(incoming.gender || 'Male');
  const [dob, setDob] = useState(incoming.dob || '15 Mar 1995');
  const [tob, setTob] = useState(incoming.tob || '10:30 AM');
  const [pob, setPob] = useState(incoming.pob || 'Mumbai, India');
  const avatarSource = incoming.avatar || images.avatarAarav;

  // Picker modals state
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.PROFILE);
    }
  };

  const handleGenderToggle = () => {
    Alert.alert('Select Gender', 'Choose your gender identity:', [
      { text: 'Male', onPress: () => setGender('Male') },
      { text: 'Female', onPress: () => setGender('Female') },
      { text: 'Other', onPress: () => setGender('Other') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleCameraPress = () => {
    Alert.alert('Change Profile Photo', 'Select an avatar or photo:', [
      { text: 'Aarav (Young Man)', onPress: () => Alert.alert('Updated', 'Avatar selected.') },
      { text: 'Riya (Young Woman)', onPress: () => Alert.alert('Updated', 'Avatar selected.') },
      { text: 'Choose from Gallery', onPress: () => Alert.alert('Gallery', 'Photo selection.') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSaveChanges = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid name.');
      return;
    }

    // Sync to auth store
    if (setUser && user) {
      setUser({
        ...user,
        fullName: name.trim(),
        gender: gender.toLowerCase(),
        birthDetails: {
          date: dob,
          time: tob,
          place: pob,
        },
      });
    }

    Alert.alert('Success', 'Your profile details have been saved successfully.', [
      {
        text: 'OK',
        onPress: () => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate(ROUTES.PROFILE);
          }
        },
      },
    ]);
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

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
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

              <Text style={styles.headerTitle}>Edit Profile</Text>

              {/* Top Right Corner Floral Flourish Accent */}
              <View style={styles.cornerFlourishBox}>
                <Text style={styles.flourishText}>❧</Text>
              </View>
            </View>

            {/* Subtitle description */}
            <Text style={styles.headerSubtitle}>
              Update your birth details and preferences.
            </Text>

            {/* Scrollable Form Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Hero Avatar with Camera Badge */}
              <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={avatarSource}
                    style={styles.heroAvatarImage}
                    resizeMode="cover"
                  />
                  {/* Camera Badge button */}
                  <TouchableOpacity
                    style={styles.cameraBadgeButton}
                    onPress={handleCameraPress}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Change photo"
                  >
                    <IconCamera size={rem(15)} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Field 1: Name */}
              <View style={styles.formCard}>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter full name"
                  placeholderTextColor="#8C6E52"
                />
              </View>

              {/* Field 2: Gender */}
              <TouchableOpacity
                style={styles.formCardRow}
                onPress={handleGenderToggle}
                activeOpacity={0.82}
              >
                <View style={styles.fieldCol}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  <Text style={styles.fieldValueText}>{gender}</Text>
                </View>
                <IconChevronRight size={rem(16)} color="#8C6636" strokeWidth={2.2} />
              </TouchableOpacity>

              {/* Field 3 & 4: Date of Birth & Time of Birth (Side by side) */}
              <View style={styles.doubleRow}>
                {/* Date of Birth Card */}
                <TouchableOpacity
                  style={[styles.formCardHalf, styles.halfMarginRight]}
                  onPress={() => setDatePickerVisible(true)}
                  activeOpacity={0.82}
                >
                  <Text style={styles.fieldLabel}>Date of Birth</Text>
                  <Text style={styles.fieldValueTextSmall}>{dob}</Text>
                </TouchableOpacity>

                {/* Time of Birth Card with calendar/clock icon */}
                <TouchableOpacity
                  style={styles.formCardHalf}
                  onPress={() => setTimePickerVisible(true)}
                  activeOpacity={0.82}
                >
                  <View style={styles.timeTextCol}>
                    <Text style={styles.fieldLabel}>Time of Birth</Text>
                    <Text style={styles.fieldValueTextSmall}>{tob}</Text>
                  </View>
                  <View style={styles.calendarIconBox}>
                    <IconCalendar size={rem(18)} color="#4A6572" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Field 5: Place of Birth */}
              <TouchableOpacity
                style={styles.formCardRow}
                onPress={() => setLocationPickerVisible(true)}
                activeOpacity={0.82}
              >
                <View style={styles.fieldCol}>
                  <Text style={styles.fieldLabel}>Place of Birth</Text>
                  <Text style={styles.fieldValueText}>{pob}</Text>
                </View>
                <IconChevronRight size={rem(16)} color="#8C6636" strokeWidth={2.2} />
              </TouchableOpacity>

              {/* "Save Changes" Button */}
              <TouchableOpacity
                style={styles.saveChangesButton}
                activeOpacity={0.85}
                onPress={handleSaveChanges}
                accessibilityRole="button"
                accessibilityLabel="Save Changes"
              >
                <Text style={styles.saveChangesText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        {/* Date, Time, Location Picker Modals */}
        <VedicDatePickerModal
          visible={datePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          onSelect={(selected) => setDob(selected)}
          initialDate={dob}
        />

        <VedicTimePickerModal
          visible={timePickerVisible}
          onClose={() => setTimePickerVisible(false)}
          onSelect={(selected) => setTob(selected)}
          initialTime={tob}
        />

        <VedicLocationPickerModal
          visible={locationPickerVisible}
          onClose={() => setLocationPickerVisible(false)}
          onSelect={(selected) => setPob(selected)}
          initialLocation={pob}
        />

        {/* Fixed Vedic Bottom Navigation Bar with More tab active */}
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
            onPress={() => navigation.navigate(ROUTES.BOT)}
            activeOpacity={0.7}
          >
            <IconBotTab size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Bot</Text>
          </TouchableOpacity>

          {/* Tab 5: More (ACTIVE) */}
          <TouchableOpacity
            style={styles.navTab}
            activeOpacity={0.9}
          >
            <View style={styles.activeNavBadge}>
              <IconMenuTab size={rem(20)} color="#FFFFFF" />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
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
    backgroundColor: 'rgba(255, 248, 235, 0.05)',
  },
  keyboardContainer: {
    flex: 1,
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
    fontSize: rem(25),
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
    fontSize: rem(13.2),
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
    paddingBottom: vh(2.4),
  },

  // ==================== HERO AVATAR ====================
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(2),
    marginTop: vh(0.4),
  },
  avatarWrapper: {
    position: 'relative',
    width: rem(96),
    height: rem(96),
    borderRadius: rem(48),
    borderWidth: 2.2,
    borderColor: '#D4A853',
    backgroundColor: '#F5E6CF',
    padding: 3,
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  heroAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: rem(44),
  },
  cameraBadgeButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: rem(28),
    height: rem(28),
    borderRadius: rem(14),
    backgroundColor: '#082E32',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },

  // ==================== FORM CARDS ====================
  formCard: {
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.8),
    paddingTop: vh(0.9),
    paddingBottom: vh(0.7),
    marginBottom: vh(1.3),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  formCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.8),
    paddingVertical: vh(1.1),
    marginBottom: vh(1.3),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  fieldCol: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(11.2),
    fontWeight: '500',
    color: '#7A5E48',
    marginBottom: 2,
  },
  fieldInput: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
    paddingVertical: 0,
    marginTop: 1,
  },
  fieldValueText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
  },

  // Double Row: DOB & TOB
  doubleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.3),
  },
  formCardHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(14),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.1),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  halfMarginRight: {
    marginRight: vw(2.5),
  },
  timeTextCol: {
    flex: 1,
  },
  fieldValueTextSmall: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.2),
    fontWeight: '700',
    color: '#26160C',
  },
  calendarIconBox: {
    paddingLeft: vw(1),
  },

  // ==================== "SAVE CHANGES" BUTTON ====================
  saveChangesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#072427',
    borderRadius: rem(24),
    borderWidth: 1.2,
    borderColor: '#C89B48',
    paddingVertical: vh(1.4),
    marginTop: vh(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  saveChangesText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#F3D78E',
    letterSpacing: 0.2,
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

export default EditProfileScreen;
