/**
 * Vidhilikhit Mobile Application Root
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import ToastMessage from './src/components/feedback/ToastMessage';
import colors from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
          translucent={false}
        />
        <RootNavigator />
        <ToastMessage />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
