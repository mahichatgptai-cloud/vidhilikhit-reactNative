/**
 * BirthDetailsScreen Component
 * Step 3: "Enter Your Birth Details" Kundali setup screen
 * Features date picker, time picker, OpenStreetMap/CartoDB map preview, location selection, and timezone detection.
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
  Dimensions,
  StatusBar,
  Alert,
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
  IconCalendar,
  IconClock,
  IconLocation,
  IconSearch,
  IconInfo,
  IconGlobe,
  IconPencil,
  IconCloseCircle,
  IconRedPin,
} from '../../components/common/VedicIcons';
import VedicDatePickerModal from '../../components/common/VedicDatePickerModal';
import VedicTimePickerModal from '../../components/common/VedicTimePickerModal';
import VedicLocationPickerModal from '../../components/common/VedicLocationPickerModal';

export const BirthDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const updateUser = useAuthStore((state) => state.updateUser);
  const register = useAuthStore((state) => state.register);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [dob, setDob] = useState('15 March 1995');
  const [tob, setTob] = useState('10:30 AM');
  const [pob, setPob] = useState('Mumbai, Maharashtra, India');
  const [coords, setCoords] = useState({
    lat: 19.0760,
    lon: 72.8777,
    shortName: 'Mumbai',
  });
  const [timeZone, setTimeZone] = useState('Asia/Kolkata (GMT +5:30)');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  const registrationData = route?.params?.registrationData;

  // Compute Free OpenStreetMap (OSM) tile coordinates (100% Free & Open Source, No API Key Required)
  const zoom = 12;
  const n = Math.pow(2, zoom);
  const tileX = Math.floor(((coords.lon + 180) / 360) * n);
  const latRad = (coords.lat * Math.PI) / 180;
  const tileY = Math.floor(
    ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n
  );

  // Free Open Source OSM tile layers with automatic fallback
  const osmTileSources = [
    `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`,
    `https://a.tile-cyclosm.openstreetmap.fr/cyclosm/${zoom}/${tileX}/${tileY}.png`,
    `https://tile.osmand.net/hd/${zoom}/${tileX}/${tileY}.png`,
  ];
  const [tileLayerIndex, setTileLayerIndex] = useState(0);
  const mapTileUrl = osmTileSources[tileLayerIndex] || osmTileSources[0];

  const handleNext = async () => {
    setFormError('');
    setLoading(true);
    try {
      const formattedDob = formatBirthDate(dob);
      const formattedTob = formatBirthTime(tob);
      const formattedPob = pob.trim() || 'Mumbai, Maharashtra, India';

      const resolvedGender = route?.params?.gender || 'male';
      const resolvedTobChoice = route?.params?.tobChoice || 'exact';

      const birthDetails = {
        dob: formattedDob,
        tobChoice: resolvedTobChoice,
        tobTime: formattedTob,
        gender: resolvedGender,
        pob: formattedPob,
        timeZone,
        lat: coords.lat,
        lon: coords.lon,
      };

      if (registrationData) {
        // Submit Account Creation (Registration) API
        const result = await register({
          ...registrationData,
          birthDetails,
        });

        if (result?.success) {
          Alert.alert(
            'Registered Successfully',
            'Your account has been created successfully. Please sign in with your email and password.',
            [
              {
                text: 'Sign In',
                onPress: () => {
                  navigation.navigate(ROUTES.LOGIN, {
                    prefillEmail: registrationData.email,
                    successMessage: 'Account created successfully! Please sign in with your password.',
                  });
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          setFormError(result?.error || 'Registration failed. Please check your details.');
        }
      } else {
        // Update user profile with birth details via API if authenticated
        if (isAuthenticated) {
          try {
            await userApi.updateProfile({
              dob: formattedDob,
              tobChoice: resolvedTobChoice,
              tobTime: formattedTob,
              gender: resolvedGender,
              pob: formattedPob,
            });
          } catch (_) {}
        }
        await updateUser({
          dob,
          tob,
          pob,
          birthDetails,
        });
        navigation.navigate(ROUTES.REVIEW_DETAILS, {
          ...route?.params,
          fullName: route?.params?.fullName || user?.fullName || user?.name || 'Alivia Mondal',
          gender: resolvedGender,
          dob,
          tob,
          tobChoice: resolvedTobChoice,
          pob,
          lat: coords.lat,
          lon: coords.lon,
          timeZone,
          registrationData,
        });
      }
    } catch (err) {
      setFormError(err.message || 'Failed to submit birth details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={images.parchmentBg}
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
          {/* Header Bar: Circular Back Button + 6-Segment Progress Bar (Step 3 active) */}
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
              {/* Segments 1, 2, 3: Active filled dark teal */}
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              {/* Segments 4-6: Inactive muted parchment */}
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>

            <View style={styles.headerRightSpacer} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Enter Your Birth Details</Text>
            <Text style={styles.subtitle}>
              These details will be used to generate your accurate Kundali.
            </Text>
          </View>

          {/* Error Banner */}
          {formError ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{formError}</Text>
            </View>
          ) : null}

          {/* Form Fields Section */}
          <View style={styles.formContainer}>
            {/* Field 1: Date of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.inputCard}
                onPress={() => setDatePickerVisible(true)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Select Date of Birth"
              >
                <View style={styles.inputIconBox}>
                  <IconCalendar size={19} color="#26160C" />
                </View>
                <Text style={styles.inputText}>{dob || '15 March 1995'}</Text>
              </TouchableOpacity>
            </View>

            {/* Field 2: Time of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Time of Birth</Text>
              <TouchableOpacity
                style={styles.inputCard}
                onPress={() => setTimePickerVisible(true)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Select Time of Birth"
              >
                <View style={styles.inputIconBox}>
                  <IconClock size={19} color="#26160C" />
                </View>
                <Text style={styles.inputText}>{tob || '10:30 AM'}</Text>
                <TouchableOpacity
                  style={styles.rightActionBox}
                  onPress={() => setTob('')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <IconCloseCircle size={18} color="#8C735D" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            {/* Field 3: Place of Birth + OpenStreetMap Map Preview */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Place of Birth</Text>
              <View style={styles.mapCardUnified}>
                {/* Location Search Bar Header */}
                <View style={styles.locationInputRow}>
                  <View style={styles.inputIconBox}>
                    <IconLocation size={19} color="#26160C" />
                  </View>
                  <TextInput
                    style={styles.locationTextInput}
                    placeholder="Place of Birth"
                    placeholderTextColor="#9A8068"
                    value={pob}
                    onChangeText={setPob}
                  />
                  <TouchableOpacity
                    style={styles.rightActionBox}
                    onPress={() => setLocationPickerVisible(true)}
                    activeOpacity={0.7}
                  >
                    <IconSearch size={19} color="#26160C" />
                  </TouchableOpacity>
                </View>

                {/* Map View Container */}
                <TouchableOpacity
                  style={styles.mapViewport}
                  activeOpacity={0.92}
                  onPress={() => setLocationPickerVisible(true)}
                  accessibilityRole="button"
                  accessibilityLabel="Tap to select location on map"
                >
                  {/* Live OpenStreetMap Free Base Layer Tile */}
                  <Image
                    source={{
                      uri: mapTileUrl,
                      headers: {
                        'User-Agent': 'VidhilikhitAstro/1.0 (contact@vidhilikhit.com)',
                      },
                    }}
                    style={styles.mapTileImage}
                    resizeMode="cover"
                    onError={() => {
                      setTileLayerIndex((prev) => (prev + 1) % osmTileSources.length);
                    }}
                  />

                  {/* Top-Center Location Name (exact matching the screenshot) */}
                  <View style={styles.mapTopCenterBadge}>
                    <Text style={styles.mapTopCenterText}>
                      {coords.shortName || pob.split(',')[0].trim() || 'Mumbai'}
                    </Text>
                  </View>

                  {/* Red Location Pin in Center */}
                  <View style={styles.mapCenterPin}>
                    <IconRedPin size={34} />
                  </View>

                  {/* City Name Label (Bottom-Left) */}
                  <View style={styles.mapCityBadge}>
                    <Text style={styles.mapCityText}>{coords.shortName || 'Mumbai'}</Text>
                  </View>

                  {/* Edit Location Pill Button (Bottom-Right) */}
                  <TouchableOpacity
                    style={styles.editLocationBtn}
                    onPress={() => setLocationPickerVisible(true)}
                    activeOpacity={0.85}
                  >
                    <IconPencil size={13} color="#26160C" />
                    <Text style={styles.editLocationText}>Edit Location</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>

            {/* Field 4: Detected Time Zone */}
            <View style={styles.timeZoneCard}>
              <View style={styles.timeZoneIconBox}>
                <IconGlobe size={22} color="#26160C" />
              </View>
              <View style={styles.timeZoneTextBox}>
                <Text style={styles.timeZoneLabel}>Detected Time Zone</Text>
                <Text style={styles.timeZoneValue}>{timeZone}</Text>
              </View>
              <View style={styles.timeZoneInfoBox}>
                <IconInfo size={17} color="#5A3F2C" />
              </View>
            </View>
          </View>

          {/* Spacer to balance screen layout */}
          <View style={styles.bottomSpacer} />

          {/* Bottom Action: Next → */}
          <View style={styles.bottomActionContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.85}
              disabled={loading}
              accessibilityLabel="Next"
              accessibilityRole="button"
            >
              <View style={styles.buttonContent}>
                <Text style={styles.nextButtonText}>
                  {loading ? 'Processing...' : 'Next'}
                </Text>
                <IconArrowRight size={18} color="#F2E2BE" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Vedic Calendar Date Picker Modal */}
      <VedicDatePickerModal
        visible={datePickerVisible}
        currentDate={dob}
        onClose={() => setDatePickerVisible(false)}
        onSelect={(displayDate) => {
          setDob(displayDate);
        }}
      />

      {/* Vedic Time Picker Modal */}
      <VedicTimePickerModal
        visible={timePickerVisible}
        currentTime={tob}
        onClose={() => setTimePickerVisible(false)}
        onSelect={(displayTime) => {
          setTob(displayTime);
        }}
      />

      {/* Vedic Location Picker Modal (OpenStreetMap & Nominatim) */}
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
    </View>
  );
};const styles = StyleSheet.create({
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
  formContainer: {
    width: '100%',
    gap: vh(1.5),
  },
  fieldGroup: {
    width: '100%',
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: vh(0.6),
    marginLeft: 2,
  },
  inputCard: {
    width: '100%',
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#DECAB3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.5),
  },
  inputIconBox: {
    width: vw(6.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2),
  },
  rightActionBox: {
    width: vw(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(15),
    color: '#26160C',
  },
  mapCardUnified: {
    width: '100%',
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#DECAB3',
    overflow: 'hidden',
  },
  locationInputRow: {
    width: '100%',
    height: vh(5.8),
    minHeight: rem(46),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.5),
    borderBottomWidth: 1,
    borderBottomColor: '#DECAB3',
  },
  locationTextInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(15),
    color: '#26160C',
    paddingVertical: 0,
  },
  mapViewport: {
    width: '100%',
    height: vh(18),
    minHeight: rem(130),
    backgroundColor: '#E7E0D2',
    position: 'relative',
    overflow: 'hidden',
  },
  mapTileImage: {
    width: '100%',
    height: '100%',
  },
  mapTopCenterBadge: {
    position: 'absolute',
    top: vh(0.8),
    alignSelf: 'center',
    zIndex: 6,
  },
  mapTopCenterText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#26160C',
    textShadowColor: 'rgba(255, 255, 255, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mapCenterPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -17,
    marginTop: -28,
    zIndex: 5,
  },
  mapCityBadge: {
    position: 'absolute',
    bottom: vh(1),
    left: vw(3),
    zIndex: 6,
  },
  mapCityText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(15),
    fontWeight: '700',
    color: '#26160C',
    textShadowColor: 'rgba(255, 255, 255, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  editLocationBtn: {
    position: 'absolute',
    bottom: vh(1),
    right: vw(3),
    backgroundColor: 'rgba(255, 252, 245, 0.95)',
    borderWidth: 1,
    borderColor: '#D8C2A8',
    borderRadius: rem(14),
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 6,
  },
  editLocationText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12.5),
    fontWeight: '600',
    color: '#26160C',
  },
  timeZoneCard: {
    width: '100%',
    height: vh(6.8),
    minHeight: rem(52),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#DECAB3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.5),
    marginTop: vh(0.4),
  },
  timeZoneIconBox: {
    width: vw(7),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.5),
  },
  timeZoneTextBox: {
    flex: 1,
  },
  timeZoneLabel: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#664A32',
  },
  timeZoneValue: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13.5),
    fontWeight: '700',
    color: '#26160C',
    marginTop: 1,
  },
  timeZoneInfoBox: {
    width: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    minHeight: vh(3),
    flex: 1,
  },
  bottomActionContainer: {
    width: '100%',
    paddingTop: vh(1),
  },
  nextButton: {
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
  nextButtonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(16.5),
    fontWeight: '700',
    letterSpacing: 0.4,
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
});

export default BirthDetailsScreen;
