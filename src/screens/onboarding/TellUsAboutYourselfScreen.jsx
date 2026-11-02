/**
 * TellUsAboutYourselfScreen Component
 * "Tell Us About Yourself" - Step 1 Onboarding Screen
 * Uses background image image_5.png with Vedic meditator, sunrise, river, and temple.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import userApi from '../../api/managers/userApi';
import { vw, vh, rem } from '../../theme/responsive';
import {
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconMale,
  IconFemale,
  IconOther,
} from '../../components/common/VedicIcons';

export const TellUsAboutYourselfScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);

  const initialName = user?.fullName || user?.name || 'Alivia Mondal';
  const initialGender = (user?.gender || 'male').toLowerCase();

  const [fullName, setFullName] = useState(initialName);
  const [gender, setGender] = useState(
    ['male', 'female', 'other'].includes(initialGender) ? initialGender : 'male'
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.fullName || user?.name) {
      setFullName(user.fullName || user.name);
    }
    if (user?.gender) {
      const g = user.gender.toLowerCase();
      if (['male', 'female', 'other'].includes(g)) {
        setGender(g);
      }
    }
  }, [user?.fullName, user?.name, user?.gender]);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      logout();
    }
  };

  const handleNext = async () => {
    setErrorMessage('');
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Update local Zustand store and storage
      await updateUser({
        fullName: trimmedName,
        name: trimmedName,
        gender,
      });

      // Synchronize with server profile endpoint in the background
      userApi.updateProfile({
        fullName: trimmedName,
        gender,
      }).catch((err) => {
        console.warn('[TellUsAboutYourself] API profile update:', err.message);
      });

      // Proceed to Step 2: Birth Time Accuracy
      navigation.navigate(ROUTES.BIRTH_TIME_ACCURACY, {
        fullName: trimmedName,
        gender,
      });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={images.image5}
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
          {/* Top Header Bar: Circular Back Button + 6-Segment Progress Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButtonCircle}
              onPress={handleBack}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <IconArrowLeft size={20} color="#26160C" />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              {/* Segment 1: Active filled dark teal */}
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              {/* Segments 2-6: Inactive muted parchment */}
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>

            <View style={styles.headerRightSpacer} />
          </View>

          {/* Heading Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Tell Us About Yourself</Text>
            <Text style={styles.subtitle}>
              We'll use these details to create your personalized Kundali and insights.
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form Content */}
          <View style={styles.formSection}>
            {/* Field: Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <View style={styles.inputCard}>
                <View style={styles.inputIconBox}>
                  <IconUser size={19} color="#7E5E42" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#9A8068"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Field: Gender Selection */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Gender</Text>
              <View style={styles.genderRow}>
                {/* Male Card */}
                <TouchableOpacity
                  style={[
                    styles.genderCard,
                    gender === 'male' ? styles.genderCardActive : styles.genderCardInactive,
                  ]}
                  onPress={() => setGender('male')}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Male"
                >
                  <IconMale
                    size={26}
                    color={gender === 'male' ? '#E5B869' : '#26160C'}
                  />
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'male' ? styles.genderTextActive : styles.genderTextInactive,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                {/* Female Card */}
                <TouchableOpacity
                  style={[
                    styles.genderCard,
                    gender === 'female' ? styles.genderCardActive : styles.genderCardInactive,
                  ]}
                  onPress={() => setGender('female')}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Female"
                >
                  <IconFemale
                    size={26}
                    color={gender === 'female' ? '#E5B869' : '#26160C'}
                  />
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'female' ? styles.genderTextActive : styles.genderTextInactive,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                {/* Other Card */}
                <TouchableOpacity
                  style={[
                    styles.genderCard,
                    gender === 'other' ? styles.genderCardActive : styles.genderCardInactive,
                  ]}
                  onPress={() => setGender('other')}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Other"
                >
                  <IconOther
                    size={26}
                    color={gender === 'other' ? '#E5B869' : '#26160C'}
                  />
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'other' ? styles.genderTextActive : styles.genderTextInactive,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Flexible Space to showcase the background Vedic scenery */}
          <View style={styles.scenerySpacer} />

          {/* Action Button: Next → */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.85}
              disabled={isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Next"
            >
              <View style={styles.buttonContent}>
                <Text style={styles.nextButtonText}>
                  {isSubmitting ? 'Saving...' : 'Next'}
                </Text>
                <IconArrowRight size={18} color="#F2E2BE" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginTop: vh(2.2),
    marginBottom: vh(2.2),
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
    marginBottom: vh(1.5),
  },
  errorText: {
    fontFamily: fontFamily.regular,
    color: '#A94442',
    fontSize: rem(12.5),
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
    gap: vh(1.8),
  },
  fieldGroup: {
    width: '100%',
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14.5),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: vh(0.8),
    marginLeft: 2,
  },
  inputCard: {
    width: '100%',
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
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
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(15),
    color: '#26160C',
    paddingVertical: 0,
  },
  genderRow: {
    width: '100%',
    flexDirection: 'row',
    gap: vw(2.8),
  },
  genderCard: {
    flex: 1,
    height: vh(10.5),
    minHeight: rem(82),
    borderRadius: rem(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vh(1),
  },
  genderCardActive: {
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  genderCardInactive: {
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
  },
  genderText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    marginTop: vh(0.6),
  },
  genderTextActive: {
    color: '#E5B869',
    fontWeight: '700',
  },
  genderTextInactive: {
    color: '#26160C',
    fontWeight: '600',
  },
  scenerySpacer: {
    flex: 1,
    minHeight: vh(14),
  },
  bottomContainer: {
    width: '100%',
    paddingTop: vh(1.2),
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
});

export default TellUsAboutYourselfScreen;
