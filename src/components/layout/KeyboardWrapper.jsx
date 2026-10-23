/**
 * KeyboardWrapper Component
 * Handles keyboard avoidance and dismiss-on-tap outside inputs
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

export const KeyboardWrapper = ({
  children,
  style,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.container, style]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.inner}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default KeyboardWrapper;
