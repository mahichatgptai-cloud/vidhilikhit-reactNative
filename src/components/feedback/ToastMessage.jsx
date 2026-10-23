/**
 * ToastMessage Component
 * Listens to notificationService and displays an animated top floating notification
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import notificationService from '../../services/notificationService';
import colors from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { fontFamily } from '../../theme/typography';

export const ToastMessage = () => {
  const [toast, setToast] = useState(null);
  const translateY = useRef(new Animated.Value(-100)).current;
  const insets = useSafeAreaInsets();
  const timerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((payload) => {
      showToast(payload);
    });
    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = (payload) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(payload);

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
    }).start();

    timerRef.current = setTimeout(() => {
      hideToast();
    }, payload.duration || 3000);
  };

  const hideToast = () => {
    Animated.timing(translateY, {
      toValue: -150,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setToast(null);
    });
  };

  if (!toast) return null;

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
      default:
        return colors.primary;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          top: insets.top + 10,
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={hideToast}
        style={[styles.toastContainer, { backgroundColor: getBackgroundColor() }]}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {toast.message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    zIndex: 99999,
    alignItems: 'center',
  },
  toastContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    color: colors.textInverse,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: spacing.sm,
  },
  message: {
    flex: 1,
    fontFamily: fontFamily.bold,
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ToastMessage;
