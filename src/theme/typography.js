/**
 * Typography definitions and text styles
 * Configured with Inria Sans and its variants for titles, subtitles, body, and captions
 */

export const fontFamily = {
  // Core Inria Sans font variants
  regular: 'InriaSans-Regular',
  bold: 'InriaSans-Bold',
  light: 'InriaSans-Light',
  italic: 'InriaSans-Italic',
  boldItalic: 'InriaSans-BoldItalic',
  lightItalic: 'InriaSans-LightItalic',

  // Semantic variants according to Title and Subtitles
  title: 'InriaSans-Bold',
  titleLarge: 'InriaSans-Bold',
  subtitle: 'InriaSans-Regular',
  subtitleBold: 'InriaSans-Bold',
  body: 'InriaSans-Regular',
  caption: 'InriaSans-Light',

  // Aliases for compatibility
  medium: 'InriaSans-Regular',
  serif: 'InriaSans-Regular',
  serifBold: 'InriaSans-Bold',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const lineHeight = {
  tight: 16,
  normal: 22,
  relaxed: 26,
  loose: 32,
  display: 40,
};

export const textStyles = {
  h1: {
    fontFamily: fontFamily.title,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.display,
  },
  h2: {
    fontFamily: fontFamily.title,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.loose,
  },
  h3: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.relaxed,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.relaxed,
  },
  titleLarge: {
    fontFamily: fontFamily.titleLarge,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.loose,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  subtitleBold: {
    fontFamily: fontFamily.subtitleBold,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.relaxed,
  },
  subtitleSmall: {
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.tight,
  },
  caption: {
    fontFamily: fontFamily.caption,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.light,
    lineHeight: lineHeight.tight,
  },
  button: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
  },
  input: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
};

export default {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
};
