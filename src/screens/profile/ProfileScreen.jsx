/**
 * ProfileScreen Component
 * User profile, settings, and session management
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import AppHeader from '../../components/common/AppHeader';
import AppButton from '../../components/common/AppButton';
import notificationService from '../../services/notificationService';
import { useAuth } from '../../hooks/useAuth';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogoutPress = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of Vidhilikhit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Personal Information', action: () => notificationService.showToast('info', 'Profile edit coming soon') },
        { icon: '🔒', label: 'Security & Password', action: () => notificationService.showToast('info', 'Security settings coming soon') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: '🔔', label: 'Notifications', action: () => notificationService.showToast('info', 'Notification preferences') },
        { icon: '🌐', label: 'Language & Region', action: () => notificationService.showToast('info', 'Language selection') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Help Center & Documentation', action: () => notificationService.showToast('info', 'Opening Help Center') },
        { icon: '🛡️', label: 'Privacy Policy', action: () => notificationService.showToast('info', 'Privacy Policy') },
      ],
    },
  ];

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Profile"
        onPressBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name ? user.name.charAt(0) : 'U').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Vidhilikhit User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{(user?.role || 'Advocate / Member').toUpperCase()}</Text>
          </View>
        </View>

        {/* Menu Groups */}
        {menuSections.map((sec, secIdx) => (
          <View key={secIdx} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{sec.title}</Text>
            <View style={styles.cardGroup}>
              {sec.items.map((item, itemIdx) => (
                <TouchableOpacity
                  key={itemIdx}
                  onPress={item.action}
                  style={[
                    styles.menuRow,
                    itemIdx < sec.items.length - 1 && styles.menuRowBorder,
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuLeft}>
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <AppButton
            title="Log Out"
            onPress={handleLogoutPress}
            variant="danger"
            style={styles.logoutBtn}
          />
          <Text style={styles.appVersion}>Vidhilikhit v0.0.1 (Build 2026.10)</Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing['2xl'],
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    fontWeight: '700',
    color: colors.textInverse,
  },
  name: {
    fontFamily: fontFamily.title,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontFamily: fontFamily.subtitle,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  roleBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  roleText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  cardGroup: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: spacing.md,
  },
  menuLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  chevron: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.textMuted,
    fontWeight: '600',
  },
  logoutContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  logoutBtn: {
    width: '100%',
  },
  appVersion: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});

export default ProfileScreen;
