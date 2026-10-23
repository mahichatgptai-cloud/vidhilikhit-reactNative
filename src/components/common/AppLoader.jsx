/**
 * AppLoader Component
 * Full-screen or inline loading spinner with backdrop & message
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const AppLoader = ({
  message = 'Loading...',
  fullScreen = true,
  size = 'large',
  color = colors.primary,
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenOverlay}>
        <View style={styles.card}>
          <ActivityIndicator size={size} color={color} />
          {message ? <Text style={styles.messageText}>{message}</Text> : null}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.inlineMessage}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.modalBackdrop,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  card: {
    backgroundColor: colors.card,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  messageText: {
    fontFamily: fontFamily.regular,
    marginTop: spacing.md,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  inlineContainer: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineMessage: {
    fontFamily: fontFamily.regular,
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AppLoader;
