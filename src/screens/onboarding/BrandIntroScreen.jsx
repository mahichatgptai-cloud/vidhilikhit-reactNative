/**
 * BrandIntroScreen Component
 * Hosts the 3 Brand Intro slides (Screens 2, 3, 4 from the flow):
 * 1. "Your Story is Written in the Stars"
 * 2. "Ancient Wisdom for Modern Life"
 * 3. "Your Personal Kundali" (with "Get Started →" button leading to Onboarding)
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ROUTES } from '../../navigation/navigationTypes';
import OnboardingSlide1 from './OnboardingSlide1';
import OnboardingSlide2 from './OnboardingSlide2';
import OnboardingSlide3 from './OnboardingSlide3';
import { vw } from '../../theme/responsive';

export const BrandIntroScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  }, []);

  const handleGetStarted = useCallback(() => {
    // Flow 1: Brand intro → Onboarding
    navigation.navigate(ROUTES.ONBOARDING);
  }, [navigation]);

  const handleNext = useCallback(() => {
    if (currentIndex < 2) {
      goToSlide(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  }, [currentIndex, goToSlide, handleGetStarted]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const slides = [
    {
      id: 'brand-slide-1',
      component: (
        <OnboardingSlide1
          onNext={handleNext}
          onDotPress={goToSlide}
        />
      ),
    },
    {
      id: 'brand-slide-2',
      component: (
        <OnboardingSlide2
          onNext={handleNext}
          onDotPress={goToSlide}
        />
      ),
    },
    {
      id: 'brand-slide-3',
      component: (
        <OnboardingSlide3
          onGetStarted={handleGetStarted}
          onDotPress={goToSlide}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={currentIndex === 0 ? 'light-content' : 'dark-content'}
      />
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: vw(100),
          offset: vw(100) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default BrandIntroScreen;
