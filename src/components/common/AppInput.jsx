/**
 * AppInput Component
 * Polished input field with label, error display, and password reveal toggle
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon = null,
  rightIcon = null,
  containerStyle,
  inputStyle,
  editable = true,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHideText = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={shouldHideText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, inputStyle]}
          {...restProps}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.toggleText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
  },
  rightIconContainer: {
    marginLeft: spacing.sm,
  },
  toggleButton: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  toggleText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
  helperText: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    marginLeft: 2,
  },
});

export default AppInput;
