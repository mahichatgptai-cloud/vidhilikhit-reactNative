/**
 * ScreenContainer Component
 * Unified screen layout wrapper with SafeArea support and optional scrolling
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../theme/colors';

export const ScreenContainer = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  backgroundColor = colors.background,
  applyTopInset = true,
  applyBottomInset = true,
  barStyle = 'dark-content',
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const containerPadding = {
    paddingTop: applyTopInset ? insets.top : 0,
    paddingBottom: applyBottomInset ? insets.bottom : 0,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  if (scrollable) {
    return (
      <View style={[styles.root, { backgroundColor }, containerPadding, style]}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          {...restProps}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor }, containerPadding, style]} {...restProps}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default ScreenContainer;
