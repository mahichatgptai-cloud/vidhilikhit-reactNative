/**
 * Theme Entry Point
 */

import colors from './colors';
import typography from './typography';
import spacingModule from './spacing';

export const theme = {
  colors,
  ...typography,
  ...spacingModule,
};

export { colors } from './colors';
export { fontFamily, fontSize, fontWeight, lineHeight, textStyles } from './typography';
export { spacing, borderRadius, shadows } from './spacing';

export default theme;
