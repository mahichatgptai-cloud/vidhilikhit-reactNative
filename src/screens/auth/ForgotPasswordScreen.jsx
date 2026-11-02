/**
 * ForgotPasswordScreen Component
 * Password recovery request interface
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import KeyboardWrapper from '../../components/layout/KeyboardWrapper';
import AppHeader from '../../components/common/AppHeader';
import AppInput from '../../components/common/AppInput';
import AppButton from '../../components/common/AppButton';
import ErrorMessage from '../../components/feedback/ErrorMessage';
import authApi from '../../api/managers/authApi';
import validators from '../../utils/validators';
import { APP_ROUTES } from '../../utils/constants';
import colors from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';

export const ForgotPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState(route?.params?.token || '');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showResetForm, setShowResetForm] = useState(Boolean(route?.params?.token));

  const handleSubmit = async () => {
    setError(null);
    if (!validators.isNotEmpty(email)) {
      setError('Please enter your email address.');
      return;
    }
    if (!validators.isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await authApi.forgotPassword(email.trim());
      setIsSubmitted(true);
      const devToken = res?.data?.devDebug?.rawToken;
      if (devToken) {
        setToken(devToken);
        setShowResetForm(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to dispatch password reset request.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    if (!token.trim()) {
      setError('Please enter the reset token.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await authApi.resetPassword({
        token: token.trim(),
        newPassword,
      });
      setResetSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please check the token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Reset Password"
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardWrapper>
        <View style={styles.content}>
          {resetSuccess ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconBadge}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successTitle}>Password Reset Successful</Text>
              <Text style={styles.successMessage}>
                Password has been reset successfully. You may now log in with your new password.
              </Text>
              <AppButton
                title="Back to Sign In"
                onPress={() => navigation.navigate(APP_ROUTES.LOGIN)}
                style={styles.backBtn}
              />
            </View>
          ) : isSubmitted ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconBadge}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successTitle}>Check Your Inbox</Text>
              <Text style={styles.successMessage}>
                We have sent password reset instructions to{' '}
                <Text style={styles.boldEmail}>{email}</Text>. Please follow the link in that email.
              </Text>

              {showResetForm ? (
                <View style={[styles.formContainer, { marginTop: spacing.md }]}>
                  {error ? (
                    <ErrorMessage message={error} onDismiss={() => setError(null)} />
                  ) : null}

                  <AppInput
                    label="Reset Token"
                    placeholder="Enter reset token"
                    value={token}
                    onChangeText={(t) => {
                      setToken(t);
                      if (error) setError(null);
                    }}
                    autoCapitalize="none"
                  />

                  <AppInput
                    label="New Password"
                    placeholder="Enter new password (min. 6 chars)"
                    value={newPassword}
                    onChangeText={(p) => {
                      setNewPassword(p);
                      if (error) setError(null);
                    }}
                    secureTextEntry
                  />

                  <AppButton
                    title="Set New Password"
                    onPress={handleResetPassword}
                    loading={loading}
                    style={styles.submitBtn}
                  />
                </View>
              ) : (
                <AppButton
                  title="Have a Reset Token? Set New Password"
                  onPress={() => setShowResetForm(true)}
                  variant="outline"
                  style={[styles.backBtn, { marginBottom: spacing.sm }]}
                />
              )}

              <AppButton
                title="Back to Sign In"
                onPress={() => navigation.navigate(APP_ROUTES.LOGIN)}
                variant="ghost"
                style={styles.backBtn}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter the email associated with your account and we'll send you instructions to reset your password.
              </Text>

              {error ? (
                <ErrorMessage message={error} onDismiss={() => setError(null)} />
              ) : null}

              <AppInput
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <AppButton
                title="Send Reset Instructions"
                onPress={handleSubmit}
                loading={loading}
                style={styles.submitBtn}
              />

              <AppButton
                title="Back to Sign In"
                onPress={() => navigation.goBack()}
                variant="ghost"
                style={styles.cancelBtn}
              />
            </View>
          )}
        </View>
      </KeyboardWrapper>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: vw(6),
    paddingVertical: vh(3),
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(24),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: vh(0.8),
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(14),
    color: colors.textSecondary,
    marginBottom: vh(2.5),
    lineHeight: rem(20),
  },
  submitBtn: {
    marginTop: vh(1),
  },
  cancelBtn: {
    marginTop: vh(0.8),
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: vw(4),
  },
  successIconBadge: {
    width: vw(16),
    height: vw(16),
    borderRadius: vw(8),
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(2),
  },
  successIcon: {
    fontFamily: fontFamily.bold,
    fontSize: rem(30),
    color: colors.success,
    fontWeight: 'bold',
  },
  successTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(22),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: vh(1),
  },
  successMessage: {
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: rem(22),
    marginBottom: vh(3),
  },
  boldEmail: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  backBtn: {
    width: '100%',
  },
});

export default ForgotPasswordScreen;
