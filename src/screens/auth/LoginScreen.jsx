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
import {
  IconArrowLeft,
  IconArrowRight,
  IconUser,
  IconLock,
  IconEye,
  IconGoogle,
  IconApple,
} from '../../components/common/VedicIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login, isLoading, error } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

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

    const result = await login({
      email: identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@vidhilikhit.internal`,
      password,
    });

    if (result?.success || !error) {
      navigation.navigate(ROUTES.BIRTH_DETAILS);
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
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  celestialIllustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginTop: -8,
  },
  celestialImage: {
    width: Math.min(SCREEN_WIDTH * 0.72, 280),
    height: '100%',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 176,
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamily.title,
    fontSize: 25,
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
    fontSize: 13.5,
    fontWeight: '400',
    color: '#693917',
    textAlign: 'center',
    marginTop: 4,
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  errorBanner: {
    width: '100%',
    backgroundColor: 'rgba(217, 83, 79, 0.15)',
    borderWidth: 1,
    borderColor: '#D9534F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    color: '#A94442',
    fontSize: 12.5,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: 12,
  },
  inputCard: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 250, 242, 0.65)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  inputIconBox: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#26160C',
    paddingVertical: 0,
  },
  passwordToggle: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 2,
    marginBottom: 4,
  },
  forgotPasswordText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    fontWeight: '700',
    color: '#154A4E',
  },
  signInButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
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
    marginTop: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signInButtonText: {
    fontFamily: fontFamily.bold,
    color: '#F2E2BE',
    fontSize: 16.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D2B99E',
  },
  dividerText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: '#7A5E48',
    marginHorizontal: 12,
  },
  socialRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 250, 242, 0.75)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    fontWeight: '700',
    color: '#26160C',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  footerPrompt: {
    fontFamily: fontFamily.regular,
    fontSize: 13.5,
    color: '#5E4432',
  },
  signUpLink: {
    fontFamily: fontFamily.bold,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#154A4E',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
