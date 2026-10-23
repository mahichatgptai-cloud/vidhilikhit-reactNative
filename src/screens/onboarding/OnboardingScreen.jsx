/**
 * OnboardingScreen Component
 * Coordinates the new onboarding slides ("Decode Your Destiny", "Personalized Astrology Insights", "Your Personal Kundali")
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { ROUTES } from '../../navigation/navigationTypes';
import DecodeDestinySlide from './DecodeDestinySlide';
import AstrologyInsightsSlide from './AstrologyInsightsSlide';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const OnboardingScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < 1) {
      goToSlide(currentIndex + 1);
    } else {
      navigation.replace(ROUTES.REGISTER);
    }
  }, [currentIndex, goToSlide, navigation]);

  const handleSkip = useCallback(() => {
    navigation.replace(ROUTES.REGISTER);
  }, [navigation]);

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
      id: 'decode-destiny',
      component: (
        <DecodeDestinySlide
          onNext={handleNext}
          onSkip={handleSkip}
          onDotPress={goToSlide}
        />
      ),
    },
    {
      id: 'astrology-insights',
      component: (
        <AstrologyInsightsSlide
          onNext={handleNext}
          onSkip={handleSkip}
          onDotPress={goToSlide}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
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

export default OnboardingScreen;
