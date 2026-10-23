/**
 * AppButton Component
 * Versatile button supporting multiple variants, sizes, and loading state
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const AppButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  icon = null,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const isInteractive = !loading && !disabled;

  const getContainerStyle = () => {
    const list = [styles.base, styles[`size_${size}`]];

    if (variant === 'primary') list.push(styles.variantPrimary);
    if (variant === 'secondary') list.push(styles.variantSecondary);
    if (variant === 'outline') list.push(styles.variantOutline);
    if (variant === 'ghost') list.push(styles.variantGhost);
    if (variant === 'danger') list.push(styles.variantDanger);

    if (disabled) list.push(styles.disabled);
    if (style) list.push(style);

    return list;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (variant === 'primary') return colors.textInverse;
    if (variant === 'secondary') return colors.textInverse;
    if (variant === 'outline') return colors.primary;
    if (variant === 'ghost') return colors.primary;
    if (variant === 'danger') return colors.textInverse;
    return colors.textInverse;
  };

  const getSpinnerColor = () => {
    if (variant === 'outline' || variant === 'ghost') return colors.primary;
    return colors.textInverse;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      style={getContainerStyle()}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator size="small" color={getSpinnerColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text style={[styles.text, styles[`textSize_${size}`], { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  // Sizes
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
  },
  size_md: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  size_lg: {
    paddingVertical: 18,
    paddingHorizontal: spacing.xl,
  },
  // Variants
  variantPrimary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  variantSecondary: {
    backgroundColor: colors.secondary,
  },
  variantOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  variantGhost: {
    backgroundColor: colors.transparent,
  },
  variantDanger: {
    backgroundColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  // Text
  text: {
    fontFamily: fontFamily.bold,
    fontWeight: '600',
    textAlign: 'center',
  },
  textSize_sm: {
    fontSize: 13,
  },
  textSize_md: {
    fontSize: 15,
  },
  textSize_lg: {
    fontSize: 17,
  },
});

export default AppButton;
