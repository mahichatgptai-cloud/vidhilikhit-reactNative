/**
 * BirthDetailsScreen Component
 * Screen 4: "Your Birth Details" Kundali setup with step progress, inputs, and manuscript artwork
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuthStore } from '../../store/authStore';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconLocation,
  IconSearch,
  IconInfo,
} from '../../components/common/VedicIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BirthDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [dob, setDob] = useState('15 March 1995');
  const [tob, setTob] = useState('10:30 AM');
  const [pob, setPob] = useState('Mumbai, Maharashtra, India');

  const handleNext = async () => {
    try {
      await updateUser({ dob, tob, pob, birthDetailsCompleted: true });
    } catch (_) {}
    // Navigate to Home / Account
    navigation.navigate(ROUTES.APP_STACK, {
      screen: ROUTES.HOME,
      params: { dob, tob, pob },
    });
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
              paddingTop: Math.max(insets.top, 16) + 8,
              paddingBottom: Math.max(insets.bottom, 20) + 16,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Bar: Back Button + Step Progress Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <IconArrowLeft size={22} color="#26160C" />
            </TouchableOpacity>

            {/* 4-Step Progress Indicator */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressStep, styles.progressStepActive]} />
              <View style={styles.progressStep} />
              <View style={styles.progressStep} />
              <View style={styles.progressStep} />
            </View>

            <View style={styles.headerRightSpacer} />
          </View>

          {/* Title & Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Your Birth Details</Text>
            <Text style={styles.subtitle}>
              {'Enter your accurate birth details for\na precise Kundali report.'}
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Field 1: Date of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <View style={styles.inputCard}>
                <View style={styles.inputIconBox}>
                  <IconCalendar size={18} color="#7E5E42" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Date of Birth (e.g. 15 March 1995)"
                  placeholderTextColor="#9A8068"
                  value={dob}
                  onChangeText={setDob}
                />
              </View>
            </View>

            {/* Field 2: Time of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Time of Birth</Text>
              <View style={styles.inputCard}>
                <View style={styles.inputIconBox}>
                  <IconClock size={18} color="#7E5E42" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Time of Birth (e.g. 10:30 AM)"
                  placeholderTextColor="#9A8068"
                  value={tob}
                  onChangeText={setTob}
                />
              </View>
            </View>

            {/* Field 3: Place of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Place of Birth</Text>
              <View style={styles.inputCard}>
                <View style={styles.inputIconBox}>
                  <IconLocation size={18} color="#7E5E42" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Place of Birth (City, State, Country)"
                  placeholderTextColor="#9A8068"
                  value={pob}
                  onChangeText={setPob}
                />
                <View style={styles.rightIconBox}>
                  <IconSearch size={18} color="#7E5E42" />
                </View>
              </View>
            </View>

            {/* Information Callout Box */}
            <View style={styles.infoCallout}>
              <View style={styles.infoIconBox}>
                <IconInfo size={17} color="#6B4D35" />
              </View>
              <Text style={styles.infoText}>
                Accurate birth details help us generate a more precise and detailed Kundali.
              </Text>
            </View>
          </View>

          {/* Bottom Illustration: Ancient Manuscript, Diya, Globe Still Life */}
          <View style={styles.stillLifeIllustrationContainer}>
            <Image
              source={images.onboarding2Bg}
              style={styles.stillLifeImage}
              resizeMode="cover"
            />
          </View>

          {/* Action Button: Next → */}
          <View style={styles.bottomActionContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.85}
              accessibilityLabel="Next"
              accessibilityRole="button"
            >
              <View style={styles.buttonContent}>
                <Text style={styles.nextButtonText}>Next</Text>
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
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressStep: {
    width: 28,
    height: 4.5,
    borderRadius: 2.5,
    backgroundColor: '#D0BAA2',
  },
  progressStepActive: {
    backgroundColor: '#083236',
  },
  headerRightSpacer: {
    width: 36,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 25,
    fontWeight: '700',
    color: '#26160C',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: 13.5,
    fontWeight: '400',
    color: '#5E4432',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 4,
    paddingHorizontal: 12,
  },
  formContainer: {
    width: '100%',
    gap: 14,
  },
  fieldGroup: {
    width: '100%',
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    fontWeight: '700',
    color: '#3B2416',
    marginBottom: 6,
    marginLeft: 2,
  },
  inputCard: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 250, 242, 0.65)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  inputIconBox: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rightIconBox: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#26160C',
    paddingVertical: 0,
  },
  infoCallout: {
    width: '100%',
    backgroundColor: 'rgba(235, 219, 196, 0.55)',
    borderWidth: 1,
    borderColor: '#C8B096',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoIconBox: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: '#5A3F2C',
    lineHeight: 16.5,
  },
  stillLifeIllustrationContainer: {
    width: SCREEN_WIDTH - 48,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.3)',
  },
  stillLifeImage: {
    width: '100%',
    height: '100%',
  },
  bottomActionContainer: {
    width: '100%',
  },
  nextButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default BirthDetailsScreen;
