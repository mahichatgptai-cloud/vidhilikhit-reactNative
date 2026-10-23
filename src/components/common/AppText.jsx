/**
 * AppText Component
 * Standard typography component using Inria Sans across the entire application
 * Supports variants: 'title', 'titleLarge', 'subtitle', 'subtitleBold', 'subtitleSmall',
 * 'body', 'bodySmall', 'caption', 'button', 'h1', 'h2', 'h3'
 */

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { fontFamily, textStyles } from '../../theme/typography';
import colors from '../../theme/colors';

export const AppText = ({
  variant = 'body',
  weight,
  color,
  style,
  children,
  ...props
}) => {
  const baseStyle = textStyles[variant] || textStyles.body;

  let familyOverride;
  if (weight === 'bold') {
    familyOverride = fontFamily.bold;
  } else if (weight === 'light') {
    familyOverride = fontFamily.light;
  } else if (weight === 'italic') {
    familyOverride = fontFamily.italic;
  } else if (weight === 'boldItalic') {
    familyOverride = fontFamily.boldItalic;
  } else if (weight === 'lightItalic') {
    familyOverride = fontFamily.lightItalic;
  } else if (weight === 'regular') {
    familyOverride = fontFamily.regular;
  }

  return (
    <RNText
      style={[
        styles.defaultText,
        baseStyle,
        familyOverride ? { fontFamily: familyOverride } : null,
        color ? { color } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
});

export default AppText;
