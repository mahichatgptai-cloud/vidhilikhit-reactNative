/**
 * HomeScreen Component
 * Primary dashboard displaying workflow metrics and recent case activities
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import AppButton from '../../components/common/AppButton';
import notificationService from '../../services/notificationService';
import { useAuth } from '../../hooks/useAuth';
import { APP_ROUTES } from '../../utils/constants';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  const handleCreateDocument = () => {
    notificationService.showToast('info', 'New document draft created successfully.');
  };

  const stats = [
    { label: 'Active Matters', value: '14', color: colors.primary },
    { label: 'Drafts Ready', value: '6', color: colors.secondary },
    { label: 'Under Review', value: '3', color: colors.warning },
    { label: 'Archived', value: '128', color: colors.success },
  ];

  const recentItems = [
    { id: '1', title: 'Commercial Lease Agreement', date: 'Today, 2:30 PM', status: 'Pending Review' },
    { id: '2', title: 'Non-Disclosure Agreement (NDA)', date: 'Yesterday', status: 'Approved' },
    { id: '3', title: 'Employment Contract - Senior Counsel', date: '11 Oct 2026', status: 'Draft' },
  ];

  return (
    <ScreenContainer scrollable>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'Legal Counsel'}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(APP_ROUTES.PROFILE)}
          style={styles.avatarButton}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarText}>
            {(user?.name ? user.name.charAt(0) : 'U').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hero Action Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Vidhilikhit Legal Suite</Text>
          <Text style={styles.heroDescription}>
            Streamline draft drafting, client disclosures, and document compliance effortlessly.
          </Text>
          <AppButton
            title="+ New Legal Draft"
            onPress={handleCreateDocument}
            size="sm"
            style={styles.heroBtn}
          />
        </View>
      </View>

      {/* Metrics Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
      </View>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Recent Activity Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Documents</Text>
        <TouchableOpacity
          onPress={() => notificationService.showToast('info', 'Viewing all documents')}
        >
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentList}>
        {recentItems.map((item) => (
          <View key={item.id} style={styles.recentItem}>
            <View style={styles.recentIconBadge}>
              <Text style={styles.recentIconText}>📄</Text>
            </View>
            <View style={styles.recentDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greetingText: {
    fontFamily: fontFamily.subtitle,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontFamily: fontFamily.title,
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textInverse,
  },
  heroCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: '#312E81', // Indigo 900
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontFamily: fontFamily.title,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textInverse,
    marginBottom: spacing.xs,
  },
  heroDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: '#C7D2FE',
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  heroBtn: {
    backgroundColor: colors.primaryLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.title,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
    marginHorizontal: '1.5%',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  statValue: {
    fontFamily: fontFamily.title,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: fontFamily.subtitle,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  recentList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recentIconBadge: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  recentIconText: {
    fontSize: 18,
  },
  recentDetails: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fontFamily.title,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  itemDate: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceElevated,
  },
  statusText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});

export default HomeScreen;
