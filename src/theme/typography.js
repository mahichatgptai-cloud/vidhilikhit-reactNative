/**
 * Typography System - Vidhilikhit Mobile
 * Standardized Classical/Editorial Serif Design System
 *
 * 1. Primary (Headings / Screen Titles): Cormorant Garamond (600–700)
 *    Used for: My Kundali, Matchmaking, Personalized Guidance, Graha Positions, Screen Headers.
 * 2. Secondary (Body / Descriptions / UI): Lora (400–600)
 *    Used for: Body text, descriptions, cards, form inputs, buttons, navigation labels, Numbers & Kundali data.
 * 3. Hindi / Devanagari: Noto Serif Devanagari (400–700)
 *    Used for: विधिलिखित branding and future Hindi/localized Vedic content.
 */

export const fontFamilies = {
  // Cormorant Garamond - Primary Editorial Serif (Titles & Headings)
  cormorant: {
    semiBold: 'CormorantGaramond-SemiBold',
    bold: 'CormorantGaramond-Bold',
    regular: 'CormorantGaramond-Regular',
    medium: 'CormorantGaramond-Medium',
    italic: 'CormorantGaramond-Italic',
  },

  // Lora - Secondary Editorial Serif (Body, Cards, Inputs, Buttons, Data)
  lora: {
    regular: 'Lora-Regular',
    medium: 'Lora-Medium',
    semiBold: 'Lora-SemiBold',
    bold: 'Lora-Bold',
    italic: 'Lora-Italic',
  },

  // Noto Serif Devanagari - Hindi / Vedic Script
  devanagari: {
    regular: 'NotoSerifDevanagari-Regular',
    medium: 'NotoSerifDevanagari-Medium',
    semiBold: 'NotoSerifDevanagari-SemiBold',
    bold: 'NotoSerifDevanagari-Bold',
  },
};

export const fontFamily = {
  // 1. Primary: Main Headings & Screen Titles (Cormorant Garamond 600-700)
  title: fontFamilies.cormorant.bold,
  titleLarge: fontFamilies.cormorant.bold,
  titleSemiBold: fontFamilies.cormorant.semiBold,
  heading: fontFamilies.cormorant.semiBold,
  headingBold: fontFamilies.cormorant.bold,

  // 2. Secondary: Body Text & Descriptions (Lora 400-500)
  body: fontFamilies.lora.regular,
  bodyMedium: fontFamilies.lora.medium,
  regular: fontFamilies.lora.regular,
  medium: fontFamilies.lora.medium,
  subtitle: fontFamilies.lora.regular,
  subtitleBold: fontFamilies.lora.semiBold,
  caption: fontFamilies.lora.regular,
  light: fontFamilies.lora.regular,

  // 3. Buttons & Form Labels (Lora 500-600)
  button: fontFamilies.lora.semiBold,
  label: fontFamilies.lora.medium,
  labelBold: fontFamilies.lora.semiBold,
  input: fontFamilies.lora.regular,

  // 4. Numbers & Kundali Data (Lora 500-600)
  data: fontFamilies.lora.medium,
  dataBold: fontFamilies.lora.semiBold,
  numbers: fontFamilies.lora.semiBold,
  serif: fontFamilies.lora.regular,
  serifBold: fontFamilies.lora.bold,
  bold: fontFamilies.lora.semiBold,

  // 5. Hindi / Devanagari (Noto Serif Devanagari 400-700)
  hindi: fontFamilies.devanagari.regular,
  hindiMedium: fontFamilies.devanagari.medium,
  hindiBold: fontFamilies.devanagari.bold,
  devanagari: fontFamilies.devanagari.regular,
  devanagariBold: fontFamilies.devanagari.bold,

  // Direct font family access
  cormorant: fontFamilies.cormorant,
  lora: fontFamilies.lora,
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
    fontFamily: fontFamily.titleLarge,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.display,
    letterSpacing: 0.3,
  },
  h2: {
    fontFamily: fontFamily.title,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.loose,
    letterSpacing: 0.25,
  },
  h3: {
    fontFamily: fontFamily.heading,
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
    fontWeight: fontWeight.semibold,
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
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.tight,
  },
  button: {
    fontFamily: fontFamily.button,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
  },
  input: {
    fontFamily: fontFamily.input,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  kundaliData: {
    fontFamily: fontFamily.data,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  hindiTitle: {
    fontFamily: fontFamily.hindiBold,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.loose,
  },
  hindiBody: {
    fontFamily: fontFamily.hindi,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
};

export default {
  fontFamilies,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
};
