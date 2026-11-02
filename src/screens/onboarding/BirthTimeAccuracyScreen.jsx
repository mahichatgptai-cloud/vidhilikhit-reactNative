/**
 * BirthTimeAccuracyScreen Component
 * Step 2: "Birth Time Accuracy"
 * Uses background image screen_two.png with ancient Vedic manuscript, astrolabe globe, oil lamp, and sunrise.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
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
  IconTarget,
  IconClock,
  IconQuestionCircle,
  IconInfo,
} from '../../components/common/VedicIcons';

const ACCURACY_OPTIONS = [
  {
    id: 'exact',
    title: 'Exact time known',
    description: 'I know my exact birth time\n(e.g. from birth certificate)',
    icon: (color) => <IconTarget size={28} color={color} />,
  },
  {
    id: 'approximate',
    title: 'Approximate time',
    description: 'I know a close estimate\n(within 1–2 hours)',
    icon: (color) => <IconClock size={28} color={color} />,
  },

];

export const BirthTimeAccuracyScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const initialChoice =
    route?.params?.tobChoice ||
    user?.tobChoice ||
    user?.birthDetails?.tobChoice ||
    'exact';

  const [selectedChoice, setSelectedChoice] = useState(initialChoice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      await updateUser({
        tobChoice: selectedChoice,
      });

      // Synchronize in background with API
      userApi
        .updateProfile({
          tobChoice: selectedChoice,
        })
        .catch((err) => {
          console.warn('[BirthTimeAccuracy] API sync:', err.message);
        });

      // Navigate to Step 3: Birth Details (DOB, TOB, POB)
      navigation.navigate(ROUTES.BIRTH_DETAILS, {
        ...route?.params,
        tobChoice: selectedChoice,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={images.screenTwo}
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
          {/* Header Bar: Circular Back Button + 6-Segment Progress Bar (Step 2 active) */}
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
              {/* Segment 1 & 2: Active filled dark teal */}
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              {/* Segments 3-6: Inactive muted parchment */}
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>

            <View style={styles.headerRightSpacer} />
          </View>

          {/* Heading Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Birth Time Accuracy</Text>
            <Text style={styles.subtitle}>
              An accurate birth time helps generate a more precise Kundali and deeper insights.
            </Text>
          </View>

          {/* Accuracy Choice Cards */}
          <View style={styles.cardsContainer}>
            {ACCURACY_OPTIONS.map((option) => {
              const isSelected = selectedChoice === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    isSelected ? styles.optionCardSelected : styles.optionCardUnselected,
                  ]}
                  onPress={() => setSelectedChoice(option.id)}
                  activeOpacity={0.85}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  {/* Left Icon */}
                  <View style={styles.iconContainer}>
                    {option.icon('#26160C')}
                  </View>

                  {/* Texts */}
                  <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>

                  {/* Right Radio Indicator */}
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected ? styles.radioCircleSelected : styles.radioCircleUnselected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Information Callout Box */}
            <View style={styles.infoCallout}>
              <View style={styles.infoIconBox}>
                <IconInfo size={17} color="#5A3F2C" />
              </View>
              <Text style={styles.infoText}>
                Even if you’re unsure, we can still create your Kundali and provide meaningful insights.
              </Text>
            </View>
          </View>

          {/* Flexible Space showcasing the manuscript and astrolabe scenery */}
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
  cardsContainer: {
    width: '100%',
    gap: vh(1.5),
  },
  optionCard: {
    width: '100%',
    borderRadius: rem(14),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.5),
  },
  optionCardSelected: {
    backgroundColor: 'rgba(255, 252, 245, 0.65)',
    borderWidth: 1.5,
    borderColor: '#0E4348',
    shadowColor: '#0E4348',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardUnselected: {
    backgroundColor: 'rgba(255, 248, 238, 0.45)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
  },
  iconContainer: {
    width: vw(9.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(3.5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: rem(15.5),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: 3,
  },
  optionDescription: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12.5),
    color: '#554030',
    lineHeight: rem(17),
  },
  radioCircle: {
    width: rem(22),
    height: rem(22),
    borderRadius: rem(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: vw(2.5),
  },
  radioCircleSelected: {
    borderWidth: 2,
    borderColor: '#0E4348',
  },
  radioCircleUnselected: {
    borderWidth: 1.8,
    borderColor: '#C4AF98',
  },
  radioDot: {
    width: rem(10),
    height: rem(10),
    borderRadius: rem(5),
    backgroundColor: '#0E4348',
  },
  infoCallout: {
    width: '100%',
    backgroundColor: 'rgba(240, 222, 198, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(210, 185, 155, 0.55)',
    borderRadius: rem(12),
    paddingVertical: vh(1.2),
    paddingHorizontal: vw(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(0.5),
  },
  infoIconBox: {
    marginRight: vw(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(12.5),
    color: '#5A3F2C',
    lineHeight: rem(17),
  },
  scenerySpacer: {
    flex: 1,
    minHeight: vh(14),
  },
  bottomContainer: {
    width: '100%',
    paddingTop: vh(0.6),
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

export default BirthTimeAccuracyScreen;
