/**
 * ErrorMessage Component
 * Visual alert banner for inline error alerts with optional retry action
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const ErrorMessage = ({
  message,
  onRetry,
  onDismiss,
  style,
}) => {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentRow}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.actionsRow}>
        {onRetry ? (
          <TouchableOpacity onPress={onRetry} style={styles.actionBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        ) : null}

        {onDismiss ? (
          <TouchableOpacity onPress={onDismiss} style={styles.actionBtn}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  messageText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  actionBtn: {
    marginLeft: spacing.md,
    paddingVertical: 2,
  },
  retryText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
  },
  dismissText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default ErrorMessage;
