/**
 * RegisterScreen Component
 * "Create Your Account" with celestial Sun & Moon motif, parchment styling, and social auth
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
  IconMail,
  IconLock,
  IconEye,
  IconGoogle,
  IconApple,
} from '../../components/common/VedicIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { register, isLoading, error } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [formError, setFormError] = useState('');

  const handleRegister = async () => {
    setFormError('');
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your mobile number.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setFormError('Please accept the Terms & Conditions to proceed.');
      return;
    }

    const result = await register({
      name: name.trim(),
      email: email.trim() || `${phone.trim()}@vidhilikhit.internal`,
      phone: phone.trim(),
      password,
    });

    if (result?.success || !error) {
      // Proceed to Birth Details setup
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
              paddingTop: Math.max(insets.top, 12) + 8,
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
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Begin your journey with Vidhilikhit</Text>
          </View>

          {/* Error Banner if any */}
          {(formError || error) ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{formError || error}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputCard}>
              <View style={styles.inputIconBox}>
                <IconUser size={18} color="#7E5E42" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9A8068"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Mobile Number with +91 Country Box */}
            <View style={styles.inputCard}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.flagText}>🇮🇳</Text>
                <Text style={styles.countryCodeText}>+91</Text>
                <Text style={styles.chevronText}>▾</Text>
              </View>
              <View style={styles.verticalDivider} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#9A8068"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={12}
              />
            </View>

            {/* Email Address (Optional) */}
            <View style={styles.inputCard}>
              <View style={styles.inputIconBox}>
                <IconMail size={18} color="#7E5E42" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email Address (Optional)"
                placeholderTextColor="#9A8068"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Create Password */}
            <View style={styles.inputCard}>
              <View style={styles.inputIconBox}>
                <IconLock size={18} color="#7E5E42" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Create Password"
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

            {/* Agreement / Terms Checkbox */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreeTerms((prev) => !prev)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Action Button: Create Account → */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={isLoading}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.createButtonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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

          {/* Footer: Already have an account? Sign In */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
              activeOpacity={0.7}
            >
              <Text style={styles.signInLink}>Sign In</Text>
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

  celestialImage: {
    width: Math.min(SCREEN_WIDTH * 0.72, 280),
    height: '100%',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 16,
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
    gap: 11,
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
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 10,
  },
  flagText: {
    fontSize: 15,
  },
  countryCodeText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    fontWeight: '700',
    color: '#26160C',
  },
  chevronText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: '#6B4A30',
  },
  verticalDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#D8C2A8',
    marginRight: 10,
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: '#083236',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    marginTop: 1.5,
  },
  checkboxActive: {
    backgroundColor: '#083236',
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    color: '#E5B869',
    fontSize: 11,
    fontWeight: '800',
    marginTop: -2,
  },
  termsText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: '#4E3726',
    lineHeight: 17,
  },
  termsLink: {
    fontFamily: fontFamily.bold,
    color: '#154A4E',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  createButton: {
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
    marginTop: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
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
  signInLink: {
    fontFamily: fontFamily.bold,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#154A4E',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
