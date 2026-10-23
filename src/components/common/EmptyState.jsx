/**
 * EmptyState Component
 * Displays helpful illustrations and prompts when lists or data are empty
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';
import AppButton from './AppButton';

export const EmptyState = ({
  title = 'No Data Found',
  description = 'There is currently nothing to display here.',
  actionTitle,
  onActionPress,
  icon = '📭',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionTitle && onActionPress ? (
        <View style={styles.actionContainer}>
          <AppButton
            title={actionTitle}
            onPress={onActionPress}
            variant="outline"
            size="sm"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  actionContainer: {
    marginTop: spacing.lg,
  },
});

export default EmptyState;
