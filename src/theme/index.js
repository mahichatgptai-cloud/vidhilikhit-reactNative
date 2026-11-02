/**
 * Theme Entry Point
 */

import colors from './colors';
import typography from './typography';
import spacingModule from './spacing';
import responsive from './responsive';

export const theme = {
  colors,
  ...typography,
  ...spacingModule,
  ...responsive,
};

export { colors } from './colors';
export { fontFamily, fontSize, fontWeight, lineHeight, textStyles } from './typography';
export { spacing, borderRadius, shadows } from './spacing';
export {
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
} from './responsive';

export default theme;
