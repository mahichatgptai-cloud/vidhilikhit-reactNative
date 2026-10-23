/**
 * AppHeader Component
 * Clean top app bar with back navigation and right action slot
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const AppHeader = ({
  title,
  subtitle,
  onPressBack,
  rightAction = null,
  showBackButton = true,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.leftContainer}>
        {showBackButton && onPressBack ? (
          <TouchableOpacity
            onPress={onPressBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.centerContainer}>
        {title ? (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightAction || null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    padding: spacing.xs,
  },
  backButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default AppHeader;
