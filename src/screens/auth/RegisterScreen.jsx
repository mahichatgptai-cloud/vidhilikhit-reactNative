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
import { vw, vh, rem } from '../../theme/responsive';
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

    const cleanPhone = phone.trim();
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone}`;
    const formattedEmail = email.trim() || `${cleanPhone.replace(/\D/g, '')}@vidhilikhit.com`;

    const registrationData = {
      fullName: name.trim(),
      email: formattedEmail,
      mobileNumber: formattedPhone,
      password,
      termsAccepted: agreeTerms,
    };

    // Proceed to Birth Details setup step where birth details are completed and account created
    navigation.navigate(ROUTES.BIRTH_DETAILS, { registrationData });
  };

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.ONBOARDING);
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
              onPress={handleBack}
              activeOpacity={0.7}
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
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
    paddingHorizontal: vw(6),
    alignItems: 'center',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.5),
    zIndex: 10,
  },
  backButton: {
    width: Math.max(rem(40), 40),
    height: Math.max(rem(40), 40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  celestialImage: {
    width: vw(68),
    height: '100%',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: vh(14),
    marginBottom: vh(1.8),
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
    marginTop: vh(0.4),
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
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
    gap: vh(1.2),
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
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: vw(2.5),
  },
  flagText: {
    fontSize: rem(15),
  },
  countryCodeText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    fontWeight: '700',
    color: '#26160C',
  },
  chevronText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(11),
    color: '#6B4A30',
  },
  verticalDivider: {
    width: 1,
    height: vh(2.8),
    backgroundColor: '#D8C2A8',
    marginRight: vw(2.5),
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: vh(0.4),
    marginBottom: vh(0.4),
    paddingHorizontal: 2,
  },
  checkbox: {
    width: rem(17),
    height: rem(17),
    borderRadius: rem(4),
    borderWidth: 1.4,
    borderColor: '#083236',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.2),
    marginTop: 1.5,
  },
  checkboxActive: {
    backgroundColor: '#083236',
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    color: '#E5B869',
    fontSize: rem(11),
    fontWeight: '800',
    marginTop: -2,
  },
  termsText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#4E3726',
    lineHeight: rem(17),
  },
  termsLink: {
    fontFamily: fontFamily.bold,
    color: '#154A4E',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  createButton: {
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
    marginTop: vh(0.8),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(2),
  },
  createButtonText: {
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
  signInLink: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13.5),
    fontWeight: '700',
    color: '#154A4E',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
