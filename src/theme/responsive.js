/**
 * Responsive Design System Utilities
 * Provides viewport-based units (vw, vh), proportional rem font/element scaling,
 * and percentage helpers to support all mobile screen sizes (small, standard, large, tablets).
 */

import { Dimensions, PixelRatio, Platform } from 'react-native';

// Base guideline dimensions (iPhone 13 / 14 / 15 / 16 standard viewport: 390 x 844)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

let { width: cachedWidth, height: cachedHeight } = Dimensions.get('window');

// Keep cached dimensions in sync with any orientation or screen resize changes
Dimensions.addEventListener?.('change', ({ window }) => {
  if (window) {
    cachedWidth = window.width;
    cachedHeight = window.height;
  }
});

/**
 * Viewport Width (vw):
 * Returns width corresponding to percentage of screen width.
 * e.g. vw(100) = full width, vw(50) = 50% width, vw(4.5) = 4.5% width
 * @param {number} percentage - Percentage of viewport width (0 - 100)
 * @returns {number} Scaled pixels
 */
export const vw = (percentage) => {
  const width = cachedWidth || Dimensions.get('window').width;
  return Math.round((width * Number(percentage)) / 100);
};

/**
 * Viewport Height (vh):
 * Returns height corresponding to percentage of screen height.
 * e.g. vh(100) = full height, vh(50) = 50% height, vh(6.5) = 6.5% height
 * @param {number} percentage - Percentage of viewport height (0 - 100)
 * @returns {number} Scaled pixels
 */
export const vh = (percentage) => {
  const height = cachedHeight || Dimensions.get('window').height;
  return Math.round((height * Number(percentage)) / 100);
};

/**
 * Scale factor based on base width 390, clamped to reasonable bounds
 * to avoid overly tiny text on small phones or giant text on large devices.
 */
export const getScaleFactor = () => {
  const width = cachedWidth || Dimensions.get('window').width;
  const rawRatio = width / BASE_WIDTH;
  // Clamp between 0.82 (very compact phones e.g. 320-360px) and 1.30 (large phablets/tablets)
  return Math.min(Math.max(rawRatio, 0.82), 1.30);
};

/**
 * Root EM (rem):
 * Responsive unit for typography, icon sizes, and component dimensions.
 * Base 1rem = 16px.
 *
 * Supports two convenient call styles:
 * 1. Multiplier: rem(1) -> 16px scaled, rem(1.5) -> 24px scaled, rem(2) -> 32px scaled
 * 2. Pixel equivalent: rem(14) -> 14px scaled, rem(20) -> 20px scaled, rem(32) -> 32px scaled
 *
 * @param {number} value - Rem multiplier (<= 5) or pixel equivalent (> 5)
 * @returns {number} Scaled pixels
 */
export const rem = (value) => {
  const scale = getScaleFactor();
  const num = Number(value) || 0;
  if (num <= 5) {
    // Treat as rem multiplier (1rem = 16px)
    return Math.round(num * 16 * scale);
  }
  // Treat as direct pixel size to scale
  return Math.round(num * scale);
};

/**
 * Scale horizontal dimensions according to screen width
 * @param {number} size
 */
export const scale = (size) => {
  const width = cachedWidth || Dimensions.get('window').width;
  return Math.round((width / BASE_WIDTH) * Number(size));
};

/**
 * Scale vertical dimensions according to screen height
 * @param {number} size
 */
export const verticalScale = (size) => {
  const height = cachedHeight || Dimensions.get('window').height;
  return Math.round((height / BASE_HEIGHT) * Number(size));
};

/**
 * Moderate scale with configurable damping factor (default 0.5)
 * @param {number} size
 * @param {number} factor
 */
export const moderateScale = (size, factor = 0.5) => {
  const s = scale(size);
  return Math.round(size + (s - size) * factor);
};

/**
 * Percentage string helper for React Native properties supporting '%' strings
 * @param {number} percentage
 * @returns {string} e.g. '100%', '48%', '90%'
 */
export const pct = (percentage) => `${percentage}%`;

/**
 * Screen classification helpers
 */
export const isSmallDevice = () => {
  const height = cachedHeight || Dimensions.get('window').height;
  const width = cachedWidth || Dimensions.get('window').width;
  return height < 720 || width < 375;
};

export const isTablet = () => {
  const width = cachedWidth || Dimensions.get('window').width;
  return width >= 600;
};

export const getWindowDimensions = () => {
  return {
    width: cachedWidth || Dimensions.get('window').width,
    height: cachedHeight || Dimensions.get('window').height,
    isSmall: isSmallDevice(),
    isTablet: isTablet(),
  };
};

export default {
  vw,
  vh,
  rem,
  scale,
  verticalScale,
  moderateScale,
  pct,
  isSmallDevice,
  isTablet,
  getWindowDimensions,
};
