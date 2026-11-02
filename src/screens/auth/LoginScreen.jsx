/**
 * LoginScreen Component
 * "Sign In" with matching celestial Sun & Moon motif, parchment inputs, and social auth
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { ROUTES } from '../../navigation/navigationTypes';
import { useAuth } from '../../hooks/useAuth';
import { vw, vh, rem } from '../../theme/responsive';
import {
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconLock,
  IconEye,
  IconGoogle,
  IconApple,
} from '../../components/common/VedicIcons';

export const LoginScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { login, isLoading, error } = useAuth();

  const [identifier, setIdentifier] = useState(route?.params?.prefillEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState(route?.params?.successMessage || '');

  React.useEffect(() => {
    if (route?.params?.prefillEmail) {
      setIdentifier(route.params.prefillEmail);
    }
    if (route?.params?.successMessage) {
      setSuccessMessage(route.params.successMessage);
    }
  }, [route?.params?.prefillEmail, route?.params?.successMessage]);

  const handleLogin = async () => {
    setFormError('');
    if (!identifier.trim()) {
      setFormError('Please enter your mobile number or email.');
      return;
    }
    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    const trimmedIdentifier = identifier.trim();
    const emailToUse = trimmedIdentifier.includes('@')
      ? trimmedIdentifier
      : `${trimmedIdentifier.replace(/\D/g, '')}@vidhilikhit.com`;

    const result = await login({
      email: emailToUse,
      password,
    });

    if (result?.success) {
      navigation.navigate(ROUTES.APP_STACK, {
        screen: ROUTES.TELL_US_ABOUT_YOURSELF,
      });
    } else {
      setFormError(result?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={images.loginBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top, 16) + 8,
              paddingBottom: Math.max(insets.bottom, 20) + 20,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Bar: Back Button */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <IconArrowLeft size={22} color="#26160C" />
            </TouchableOpacity>
          </View>

       

          {/* Title & Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Enter your details to sign in to Vidhilikhit</Text>
          </View>

          {/* Success Banner */}
          {successMessage ? (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          {/* Error Banner */}
          {(formError || error) ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{formError || error}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Mobile Number or Email */}
            <View style={styles.inputCard}>
              <View style={styles.inputIconBox}>
                <IconUser size={18} color="#7E5E42" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number or Email"
                placeholderTextColor="#9A8068"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputCard}>
              <View style={styles.inputIconBox}>
                <IconLock size={18} color="#7E5E42" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#9A8068"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <IconEye size={18} color="#7E5E42" crossed={!showPassword} />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Action Button: Sign In → */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={isLoading}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.signInButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
                <IconArrowRight size={18} color="#F2E2BE" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Divider: or continue with */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.socialRow}>
            {/* Google */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <IconGoogle size={18} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <IconApple size={18} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer: Don't have an account? Sign Up */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.REGISTER)}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7BC9F',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: vw(6),
    alignItems: 'center',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.5),
  },
  backButton: {
    width: vw(9),
    height: vw(9),
    justifyContent: 'center',
  },
  celestialIllustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(14),
    marginTop: -vh(1),
  },
  celestialImage: {
    width: vw(68),
    height: '100%',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: vh(18),
    marginBottom: vh(2.2),
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: rem(25),
    fontWeight: '700',
    color: '#693917',
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.5),
    fontWeight: '400',
    color: '#693917',
    textAlign: 'center',
    marginTop: vh(0.5),
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  successBanner: {
    width: '100%',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: rem(8),
    padding: vw(2.5),
    marginBottom: vh(1.2),
  },
  successText: {
    fontFamily: fontFamily.regular,
    color: '#2E7D32',
    fontSize: rem(12.5),
    textAlign: 'center',
    fontWeight: '600',
  },
  errorBanner: {
    width: '100%',
    backgroundColor: 'rgba(217, 83, 79, 0.15)',
    borderWidth: 1,
    borderColor: '#D9534F',
    borderRadius: rem(8),
    padding: vw(2.5),
    marginBottom: vh(1.2),
  },
  errorText: {
    fontFamily: fontFamily.regular,
    color: '#A94442',
    fontSize: rem(12.5),
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: vh(1.4),
  },
  inputCard: {
    width: '100%',
    height: vh(6),
    minHeight: rem(46),
    borderRadius: rem(12),
    backgroundColor: 'rgba(255, 250, 242, 0.65)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3.5),
  },
  inputIconBox: {
    width: vw(6.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2),
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: '#26160C',
    paddingVertical: 0,
  },
  passwordToggle: {
    width: vw(7.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: vh(0.4),
    marginBottom: vh(0.6),
  },
  forgotPasswordText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13),
    fontWeight: '700',
    color: '#154A4E',
  },
  signInButton: {
    width: '100%',
    height: vh(6.2),
    minHeight: rem(48),
    borderRadius: rem(26),
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4A853',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 6,
    marginTop: vh(0.6),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
  },
  signInButtonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: rem(16.5),
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh(2),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D2B99E',
  },
  dividerText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#7A5E48',
    marginHorizontal: vw(3),
  },
  socialRow: {
    width: '100%',
    flexDirection: 'row',
    gap: vw(3),
  },
  socialButton: {
    flex: 1,
    height: vh(5.6),
    minHeight: rem(44),
    borderRadius: rem(22),
    backgroundColor: 'rgba(255, 250, 242, 0.75)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
  },
  socialButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    fontWeight: '700',
    color: '#26160C',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vh(2.5),
  },
  footerPrompt: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13.5),
    color: '#5E4432',
  },
  signUpLink: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13.5),
    fontWeight: '700',
    color: '#154A4E',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
