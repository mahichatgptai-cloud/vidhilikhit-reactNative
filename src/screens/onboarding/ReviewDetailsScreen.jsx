/**
 * ReviewDetailsScreen Component
 * Step 4: "Review Your Details" Kundali confirmation screen
 * Uses background image image_6.png with sunrise river, temple, and parchment frame.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import userApi from '../../api/managers/userApi';
import { formatBirthDate, formatBirthTime } from '../../utils/birthDetailsHelper';
import { vw, vh, rem } from '../../theme/responsive';
import {
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconMale,
  IconFemale,
  IconOther,
  IconCalendar,
  IconClock,
  IconLocation,
  IconPencil,
  IconInfo,
  IconCloseCircle,
} from '../../components/common/VedicIcons';
import VedicDatePickerModal from '../../components/common/VedicDatePickerModal';
import VedicTimePickerModal from '../../components/common/VedicTimePickerModal';
import VedicLocationPickerModal from '../../components/common/VedicLocationPickerModal';

export const ReviewDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Initial values from route params or user store
  const [fullName, setFullName] = useState(
    route?.params?.fullName || user?.fullName || user?.name || 'Alivia Mondal'
  );
  const [gender, setGender] = useState(
    route?.params?.gender || user?.gender || 'male'
  );
  const [dob, setDob] = useState(
    route?.params?.dob || user?.dob || user?.birthDetails?.dob || '15 March 1995'
  );
  const [tob, setTob] = useState(
    route?.params?.tob || user?.tob || user?.birthDetails?.tobTime || '10:30 AM'
  );
  const [pob, setPob] = useState(
    route?.params?.pob || user?.pob || user?.birthDetails?.pob || 'Mumbai, Maharashtra, India'
  );
  const [tobChoice] = useState(
    route?.params?.tobChoice || user?.tobChoice || 'exact'
  );

  const [coords, setCoords] = useState({
    lat: route?.params?.lat || 19.076,
    lon: route?.params?.lon || 72.8777,
    shortName: route?.params?.pob?.split(',')[0] || 'Mumbai',
  });
  const [timeZone, setTimeZone] = useState(
    route?.params?.timeZone || 'Asia/Kolkata (GMT +5:30)'
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Edit Modals
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [nameEditModalVisible, setNameEditModalVisible] = useState(false);
  const [tempName, setTempName] = useState(fullName);

  // Capitalize gender for display
  const displayGender =
    gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

  const renderGenderIcon = () => {
    const g = gender.toLowerCase();
    if (g === 'female') return <IconFemale size={20} color="#26160C" />;
    if (g === 'other') return <IconOther size={20} color="#26160C" />;
    return <IconMale size={20} color="#26160C" />;
  };

  const handleGenerateKundali = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const formattedDob = formatBirthDate(dob);
      const formattedTob = formatBirthTime(tob);
      const formattedPob = pob.trim() || 'Mumbai, Maharashtra, India';

      const birthDetails = {
        dob: formattedDob,
        tobChoice,
        tobTime: formattedTob,
        gender,
        pob: formattedPob,
        timeZone,
        lat: coords.lat,
        lon: coords.lon,
      };

      // Synchronize profile with backend API
      if (isAuthenticated) {
        try {
          await userApi.updateProfile({
            fullName: fullName.trim(),
            gender,
            dob: formattedDob,
            tobChoice,
            tobTime: formattedTob,
            pob: formattedPob,
          });
        } catch (apiErr) {
          console.warn('[ReviewDetails] updateProfile API error:', apiErr.message);
        }
      }

      // Update Zustand store and persistence
      await updateUser({
        fullName: fullName.trim(),
        name: fullName.trim(),
        gender,
        dob,
        tob,
        pob,
        birthDetailsCompleted: true,
        birthDetails,
      });

      // Navigate to Home screen
      navigation.navigate(ROUTES.HOME, {
        dob,
        tob,
        pob,
        fullName,
        gender,
      });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to complete Kundali setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={images.image6}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top, 16) + 6,
              paddingBottom: Math.max(insets.bottom, 16) + 16,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Bar: Circular Back Button + 6-Segment Progress Bar (Step 4 active) */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButtonCircle}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <IconArrowLeft size={20} color="#26160C" />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              {/* Segments 1, 2, 3, 4: Active filled dark teal */}
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              {/* Segments 5-6: Inactive muted parchment */}
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>

            <View style={styles.headerRightSpacer} />
          </View>

          {/* Heading Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Review Your Details</Text>
            <Text style={styles.subtitle}>
              Please confirm your details to proceed to your personalized Kundali.
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Review Details Unified Card */}
          <View style={styles.reviewCard}>
            {/* Row 1: Name */}
            <View style={styles.reviewRow}>
              <View style={styles.rowIconBox}>
                <IconUser size={20} color="#26160C" />
              </View>
              <Text style={styles.rowLabel}>Name</Text>
              <Text style={styles.rowValue} numberOfLines={1}>
                {fullName}
              </Text>
              <TouchableOpacity
                style={styles.rowEditBtn}
                onPress={() => {
                  setTempName(fullName);
                  setNameEditModalVisible(true);
                }}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconPencil size={15} color="#26160C" />
              </TouchableOpacity>
            </View>

            {/* Row 2: Gender */}
            <View style={styles.reviewRow}>
              <View style={styles.rowIconBox}>
                {renderGenderIcon()}
              </View>
              <Text style={styles.rowLabel}>Gender</Text>
              <Text style={styles.rowValue}>{displayGender}</Text>
              <TouchableOpacity
                style={styles.rowEditBtn}
                onPress={() => {
                  // Cycle gender or toggle
                  const order = ['male', 'female', 'other'];
                  const nextIndex = (order.indexOf(gender.toLowerCase()) + 1) % order.length;
                  setGender(order[nextIndex]);
                }}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconPencil size={15} color="#26160C" />
              </TouchableOpacity>
            </View>

            {/* Row 3: Date of Birth */}
            <View style={styles.reviewRow}>
              <View style={styles.rowIconBox}>
                <IconCalendar size={20} color="#26160C" />
              </View>
              <Text style={styles.rowLabel}>Date of Birth</Text>
              <Text style={styles.rowValue}>{dob}</Text>
              <TouchableOpacity
                style={styles.rowEditBtn}
                onPress={() => setDatePickerVisible(true)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconPencil size={15} color="#26160C" />
              </TouchableOpacity>
            </View>

            {/* Row 4: Time of Birth */}
            <View style={styles.reviewRow}>
              <View style={styles.rowIconBox}>
                <IconClock size={20} color="#26160C" />
              </View>
              <Text style={styles.rowLabel}>Time of Birth</Text>
              <Text style={styles.rowValue}>{tob}</Text>
              <TouchableOpacity
                style={styles.rowEditBtn}
                onPress={() => setTimePickerVisible(true)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconPencil size={15} color="#26160C" />
              </TouchableOpacity>
            </View>

            {/* Row 5: Place of Birth (Last Row, no bottom border) */}
            <View style={[styles.reviewRow, styles.reviewRowLast]}>
              <View style={styles.rowIconBox}>
                <IconLocation size={20} color="#26160C" />
              </View>
              <Text style={styles.rowLabel}>Place of Birth</Text>
              <Text style={styles.rowValueMultiLine} numberOfLines={2}>
                {pob}
              </Text>
              <TouchableOpacity
                style={styles.rowEditBtn}
                onPress={() => setLocationPickerVisible(true)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconPencil size={15} color="#26160C" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Why these details matter? Card */}
          <View style={styles.matterCard}>
            <View style={styles.matterIconBox}>
              <IconInfo size={20} color="#26160C" />
            </View>
            <View style={styles.matterTextBox}>
              <Text style={styles.matterTitle}>Why these details matter?</Text>
              <Text style={styles.matterDescription}>
                Your birth details help us create an accurate Kundali, which forms the foundation for all your personalized insights, predictions and guidance.
              </Text>
            </View>
          </View>

          {/* Flexible Space to showcase Vedic river & temple scenery */}
          <View style={styles.scenerySpacer} />

          {/* Action Button: Generate My Kundali → */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateKundali}
              activeOpacity={0.85}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Generate My Kundali"
            >
              <View style={styles.buttonContent}>
                <Text style={styles.generateButtonText}>
                  {loading ? 'Generating Kundali...' : 'Generate My Kundali'}
                </Text>
                <IconArrowRight size={18} color="#F2E2BE" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Date Picker Modal */}
      <VedicDatePickerModal
        visible={datePickerVisible}
        currentDate={dob}
        onClose={() => setDatePickerVisible(false)}
        onSelect={(newDate) => setDob(newDate)}
      />

      {/* Time Picker Modal */}
      <VedicTimePickerModal
        visible={timePickerVisible}
        currentTime={tob}
        onClose={() => setTimePickerVisible(false)}
        onSelect={(newTime) => setTob(newTime)}
      />

      {/* Location Picker Modal */}
      <VedicLocationPickerModal
        visible={locationPickerVisible}
        currentLocation={pob}
        onClose={() => setLocationPickerVisible(false)}
        onSelect={({ placeName, shortName, lat, lon, timeZone: tz }) => {
          setPob(placeName);
          setCoords({
            lat,
            lon,
            shortName: shortName || placeName.split(',')[0],
          });
          if (tz) setTimeZone(tz);
        }}
      />

      {/* Name Edit Modal */}
      <Modal
        visible={nameEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNameEditModalVisible(false)}
      >
        <View style={styles.nameModalOverlay}>
          <View style={styles.nameModalContent}>
            <View style={styles.nameModalHeader}>
              <Text style={styles.nameModalTitle}>Edit Name</Text>
              <TouchableOpacity
                onPress={() => setNameEditModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconCloseCircle size={22} color="#7E5E42" />
              </TouchableOpacity>
            </View>
            <View style={styles.nameInputBox}>
              <IconUser size={18} color="#7E5E42" />
              <TextInput
                style={styles.nameTextInput}
                value={tempName}
                onChangeText={setTempName}
                autoFocus
                placeholder="Full Name"
                placeholderTextColor="#9A8068"
              />
            </View>
            <TouchableOpacity
              style={styles.nameSaveButton}
              onPress={() => {
                if (tempName.trim()) {
                  setFullName(tempName.trim());
                }
                setNameEditModalVisible(false);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.nameSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: vw(5.5),
    flexGrow: 1,
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.2),
  },
  backButtonCircle: {
    width: vw(9.8),
    height: vw(9.8),
    borderRadius: vw(4.9),
    backgroundColor: 'rgba(255, 245, 230, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(220, 195, 168, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.5),
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(1.5),
    paddingHorizontal: vw(2),
  },
  headerRightSpacer: {
    width: vw(9.8),
  },
  progressSegment: {
    flex: 1,
    height: vh(0.48),
    borderRadius: rem(2),
    backgroundColor: 'rgba(195, 175, 148, 0.45)',
  },
  progressSegmentActive: {
    backgroundColor: '#083236',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: vh(2),
    marginBottom: vh(2),
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(26),
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.8),
    fontWeight: '400',
    color: '#533C29',
    textAlign: 'center',
    lineHeight: rem(19.5),
    marginTop: vh(0.8),
    paddingHorizontal: vw(3),
  },
  errorBanner: {
    width: '100%',
    backgroundColor: 'rgba(217, 83, 79, 0.15)',
    borderWidth: 1,
    borderColor: '#D9534F',
    borderRadius: rem(8),
    padding: vw(2.5),
    marginBottom: vh(1.2),
  },
  errorText: {
    fontFamily: fontFamily.regular,
    color: '#A94442',
    fontSize: rem(12.5),
    textAlign: 'center',
  },
  reviewCard: {
    width: '100%',
    borderRadius: rem(16),
    backgroundColor: 'rgba(255, 250, 240, 0.55)',
    borderWidth: 1.2,
    borderColor: '#DECAB3',
    paddingHorizontal: vw(4),
    paddingVertical: vh(0.5),
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1.4),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 202, 179, 0.6)',
  },
  reviewRowLast: {
    borderBottomWidth: 0,
  },
  rowIconBox: {
    width: vw(7),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.5),
  },
  rowLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14.5),
    fontWeight: '600',
    color: '#26160C',
    width: vw(25),
  },
  rowValue: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(14.5),
    color: '#26160C',
    paddingRight: vw(1.5),
  },
  rowValueMultiLine: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: '#26160C',
    lineHeight: rem(18),
    paddingRight: vw(1.5),
  },
  rowEditBtn: {
    width: vw(7),
    height: vw(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  matterCard: {
    width: '100%',
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(215, 190, 160, 0.55)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: vw(3.5),
    marginTop: vh(1.5),
  },
  matterIconBox: {
    marginRight: vw(2.5),
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matterTextBox: {
    flex: 1,
  },
  matterTitle: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: 4,
  },
  matterDescription: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13),
    color: '#553F2D',
    lineHeight: rem(18.5),
  },
  scenerySpacer: {
    flex: 1,
    minHeight: vh(5),
  },
  bottomContainer: {
    width: '100%',
    paddingTop: vh(0.6),
  },
  generateButton: {
    width: '100%',
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(26),
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
  },
  generateButtonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(16.5),
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  nameModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 17, 11, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(6),
  },
  nameModalContent: {
    width: '100%',
    backgroundColor: '#FAF3E8',
    borderRadius: rem(18),
    borderWidth: 1.5,
    borderColor: '#D4A853',
    padding: vw(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nameModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(1.8),
  },
  nameModalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#26160C',
  },
  nameInputBox: {
    width: '100%',
    height: vh(5.8),
    minHeight: rem(46),
    borderRadius: rem(12),
    backgroundColor: 'rgba(255, 252, 245, 0.85)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    marginBottom: vh(2),
    gap: vw(2),
  },
  nameTextInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(15),
    color: '#26160C',
    paddingVertical: 0,
  },
  nameSaveButton: {
    width: '100%',
    height: vh(5.6),
    minHeight: rem(44),
    borderRadius: rem(23),
    backgroundColor: '#083236',
    borderWidth: 1.2,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameSaveText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#F2E2BE',
  },
});

export default ReviewDetailsScreen;
