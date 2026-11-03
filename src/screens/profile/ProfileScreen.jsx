/**
 * ProfileScreen Component ("Switch Profile")
 * Matching the exact design:
 * - Top Header: Circular antique back button, serif "Switch Profile" title & golden flourish
 * - Subtitle: "Manage multiple profiles for family and loved ones."
 * - Profile Cards:
 *   1. Aarav Mehta (Active - circular dark teal checkmark badge)
 *   2. Riya Mehta (Chevron >)
 *   3. Father (Chevron >)
 *   4. Mother (Chevron >)
 * - "+ Add New Profile" Card button
 * - Fixed Vedic Bottom Navigation Bar with "More" active
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
import { useAuthStore } from '../../store/authStore';
import {
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
  IconChevronRight,
  IconCheck,
} from '../../components/common/VedicIcons';

const DEFAULT_PROFILES = [
  {
    id: 'aarav',
    name: 'Aarav Mehta',
    gender: 'Male',
    dob: '15 Mar 1995',
    tob: '10:30 AM',
    pob: 'Mumbai, India',
    datePlaceStr: '15 Mar 1995 • Mumbai',
    avatar: images.avatarAarav,
    isActive: true,
  },
  {
    id: 'riya',
    name: 'Riya Mehta',
    gender: 'Female',
    dob: '22 Aug 1998',
    tob: '02:15 PM',
    pob: 'Pune, India',
    datePlaceStr: '22 Aug 1998 • Pune',
    avatar: images.avatarRiya,
    isActive: false,
  },
  {
    id: 'father',
    name: 'Father',
    gender: 'Male',
    dob: '10 Jan 1968',
    tob: '06:45 AM',
    pob: 'Ahmedabad, India',
    datePlaceStr: '10 Jan 1968 • Ahmedabad',
    avatar: images.avatarFather,
    isActive: false,
  },
  {
    id: 'mother',
    name: 'Mother',
    gender: 'Female',
    dob: '5 May 1972',
    tob: '11:20 AM',
    pob: 'Ahmedabad, India',
    datePlaceStr: '5 May 1972 • Ahmedabad',
    avatar: images.avatarMother,
    isActive: false,
  },
];

export const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const handleSelectProfile = (profile) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        isActive: p.id === profile.id,
      }))
    );

    // Sync to auth store
    if (setUser && user) {
      setUser({
        ...user,
        fullName: profile.name,
        gender: profile.gender.toLowerCase(),
        birthDetails: {
          date: profile.dob,
          time: profile.tob,
          place: profile.pob,
        },
      });
    }

    Alert.alert(
      profile.name,
      `Active profile switched to ${profile.name}.`,
      [
        { text: 'OK' },
        {
          text: 'Edit Profile',
          onPress: () => {
            navigation.navigate(ROUTES.EDIT_PROFILE, { profile });
          },
        },
      ]
    );
  };

  const handleEditProfile = (profile) => {
    navigation.navigate(ROUTES.EDIT_PROFILE, { profile });
  };

  const handleAddNewProfile = () => {
    const newProfile = {
      id: 'profile_' + Date.now(),
      name: '',
      gender: 'Male',
      dob: '01 Jan 2000',
      tob: '12:00 PM',
      pob: 'New Delhi, India',
      datePlaceStr: '01 Jan 2000 • New Delhi',
      avatar: images.avatarAarav,
      isActive: false,
      isNew: true,
    };
    navigation.navigate(ROUTES.EDIT_PROFILE, { profile: newProfile });
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

            <Text style={styles.headerTitle}>Switch Profile</Text>

            {/* Top Right Corner Floral Flourish Accent */}
            <View style={styles.cornerFlourishBox}>
              <Text style={styles.flourishText}>❧</Text>
            </View>
          </View>

          {/* Subtitle description */}
          <Text style={styles.headerSubtitle}>
            Manage multiple profiles for family and loved ones.
          </Text>

          {/* Scrollable Profiles List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {profiles.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.profileCard,
                  item.isActive && styles.profileCardActive,
                ]}
                activeOpacity={0.82}
                onPress={() => handleSelectProfile(item)}
              >
                {/* Circular Avatar */}
                <View style={styles.avatarBox}>
                  <Image
                    source={item.avatar}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Middle Info Column */}
                <View style={styles.infoCol}>
                  <Text style={styles.profileName}>{item.name}</Text>
                  <Text style={styles.profileDetails}>{item.datePlaceStr}</Text>
                </View>

                {/* Right Action: Checkmark badge if active, Chevron if inactive */}
                {item.isActive ? (
                  <View style={styles.activeCheckBadge}>
                    <IconCheck size={rem(15)} color="#FFFFFF" />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.chevronButton}
                    onPress={() => handleEditProfile(item)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <IconChevronRight size={rem(16)} color="#8C6636" strokeWidth={2.2} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}

            {/* "+ Add New Profile" Button */}
            <TouchableOpacity
              style={styles.addProfileButton}
              activeOpacity={0.82}
              onPress={handleAddNewProfile}
            >
              <Text style={styles.addProfilePlus}>+</Text>
              <Text style={styles.addProfileText}>Add New Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

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
    marginBottom: vh(1.8),
  },

  // ==================== SCROLL CONTENT ====================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vh(2.4),
  },

  // ==================== PROFILE CARD ====================
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.4),
    marginBottom: vh(1.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  profileCardActive: {
    borderColor: '#C89B48',
    backgroundColor: 'rgba(254, 249, 240, 0.98)',
  },
  avatarBox: {
    width: rem(52),
    height: rem(52),
    borderRadius: rem(26),
    borderWidth: 1.6,
    borderColor: '#D4A853',
    overflow: 'hidden',
    backgroundColor: '#F5E6CF',
    marginRight: vw(3.2),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: fontFamily.title,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.15,
    marginBottom: 2,
  },
  profileDetails: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12),
    fontWeight: '500',
    color: '#6B4F35',
  },
  activeCheckBadge: {
    width: rem(26),
    height: rem(26),
    borderRadius: rem(13),
    backgroundColor: '#082E32',
    borderWidth: 1.2,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  chevronButton: {
    paddingLeft: vw(1.5),
    paddingRight: vw(1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==================== "+ ADD NEW PROFILE" BUTTON ====================
  addProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(16),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.55)',
    paddingVertical: vh(1.6),
    marginTop: vh(0.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  addProfilePlus: {
    fontFamily: fontFamily.title,
    fontSize: rem(22),
    fontWeight: '700',
    color: '#26160C',
    marginRight: vw(2),
    marginTop: -2,
  },
  addProfileText: {
    fontFamily: fontFamily.title,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
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

export default ProfileScreen;
