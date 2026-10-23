import React from 'react';
import { View, StyleSheet } from 'react-native';

export const OrnamentalDivider = ({
  color = '#B89B72',
  width = 130,
  diamondSize = 7,
  style,
}) => {
  return (
    <View style={[styles.container, { width }, style]}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <View
        style={[
          styles.diamond,
          {
            width: diamondSize,
            height: diamondSize,
            borderColor: color,
          },
        ]}
      />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.8,
  },
  diamond: {
    transform: [{ rotate: '45deg' }],
    borderWidth: 1.2,
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
});

export default OrnamentalDivider;
