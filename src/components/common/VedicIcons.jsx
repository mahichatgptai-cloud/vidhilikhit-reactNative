/**
 * VedicIcons - Self-contained icon components for Vidhilikhit UI
 * No external native icon dependencies required
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontFamily } from '../../theme/typography';

export const IconArrowLeft = ({ size = 22, color = '#26160C' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700', lineHeight: size + 2 }}>←</Text>
);

export const IconArrowRight = ({ size = 20, color = '#F2E2BE' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700', lineHeight: size + 2 }}>→</Text>
);

export const IconChevronDown = ({ size = 12, color = '#6B4A30' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700' }}>▼</Text>
);

export const IconUser = ({ size = 18, color = '#8C6843' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.44, height: size * 0.44, borderRadius: size * 0.22, borderWidth: 1.6, borderColor: color, marginBottom: 1 }} />
    <View style={{ width: size * 0.8, height: size * 0.38, borderTopLeftRadius: size * 0.4, borderTopRightRadius: size * 0.4, borderWidth: 1.6, borderBottomWidth: 0, borderColor: color }} />
  </View>
);

export const IconPhone = ({ size = 18, color = '#8C6843' }) => (
  <Text style={{ fontSize: size * 0.95, color }}>📞</Text>
);

export const IconMail = ({ size = 18, color = '#8C6843' }) => (
  <View style={{ width: size, height: size * 0.72, borderWidth: 1.6, borderColor: color, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: '100%', height: 1, backgroundColor: color, transform: [{ rotate: '25deg' }], position: 'absolute' }} />
    <View style={{ width: '100%', height: 1, backgroundColor: color, transform: [{ rotate: '-25deg' }], position: 'absolute' }} />
  </View>
);

export const IconLock = ({ size = 18, color = '#8C6843' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.48, height: size * 0.36, borderTopLeftRadius: size * 0.24, borderTopRightRadius: size * 0.24, borderWidth: 1.6, borderBottomWidth: 0, borderColor: color }} />
    <View style={{ width: size * 0.76, height: size * 0.52, borderRadius: 3, borderWidth: 1.6, borderColor: color, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 3, height: 4, backgroundColor: color, borderRadius: 1.5 }} />
    </View>
  </View>
);

export const IconEye = ({ size = 18, color = '#8C6843', crossed = false }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.9, height: size * 0.52, borderRadius: size * 0.26, borderWidth: 1.6, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14, backgroundColor: color }} />
    </View>
    {crossed && <View style={{ position: 'absolute', width: size * 0.95, height: 1.6, backgroundColor: color, transform: [{ rotate: '-45deg' }] }} />}
  </View>
);

export const IconCalendar = ({ size = 18, color = '#8C6843' }) => (
  <View style={{ width: size, height: size, borderWidth: 1.6, borderColor: color, borderRadius: 4, padding: 2 }}>
    <View style={{ width: '100%', height: 3, backgroundColor: color, borderRadius: 1, marginBottom: 2 }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <View key={i} style={{ width: 2.2, height: 2.2, backgroundColor: color, borderRadius: 1, margin: 1 }} />
      ))}
    </View>
  </View>
);

export const IconClock = ({ size = 18, color = '#8C6843' }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1.6, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ position: 'absolute', width: 1.6, height: size * 0.32, backgroundColor: color, top: size * 0.18 }} />
    <View style={{ position: 'absolute', width: size * 0.26, height: 1.6, backgroundColor: color, right: size * 0.22 }} />
  </View>
);

export const IconLocation = ({ size = 18, color = '#8C6843' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: size * 0.65, height: size * 0.65, borderRadius: size * 0.33, borderWidth: 1.6, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
    </View>
    <View style={{ width: 0, height: 0, borderLeftWidth: 3, borderRightWidth: 3, borderTopWidth: 5, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: color, marginTop: -1 }} />
  </View>
);

export const IconSearch = ({ size = 18, color = '#8C6843' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.64, height: size * 0.64, borderRadius: size * 0.32, borderWidth: 1.6, borderColor: color }} />
    <View style={{ position: 'absolute', width: 1.6, height: size * 0.36, backgroundColor: color, transform: [{ rotate: '-45deg' }], bottom: 1, right: 2 }} />
  </View>
);

export const IconInfo = ({ size = 18, color = '#8C6843' }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1.6, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: size * 0.62, color, fontWeight: '700', fontFamily: fontFamily.bold }}>i</Text>
  </View>
);

export const IconTrend = ({ size = 24, color = '#E5B869' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color, fontWeight: '900' }}>📈</Text>
  </View>
);

export const IconHeart = ({ size = 24, color = '#E5B869' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>💛</Text>
  </View>
);

export const IconBriefcase = ({ size = 24, color = '#E5B869' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>💼</Text>
  </View>
);

export const IconLotus = ({ size = 24, color = '#E5B869' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>🪷</Text>
  </View>
);

export const IconGoogle = ({ size = 18 }) => (
  <Text style={{ fontSize: size, fontWeight: '700', color: '#EA4335' }}>G</Text>
);

export const IconApple = ({ size = 18 }) => (
  <Text style={{ fontSize: size, color: '#1A110B' }}></Text>
);

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default {
  IconArrowLeft,
  IconArrowRight,
  IconChevronDown,
  IconUser,
  IconPhone,
  IconMail,
  IconLock,
  IconEye,
  IconCalendar,
  IconClock,
  IconLocation,
  IconSearch,
  IconInfo,
  IconTrend,
  IconHeart,
  IconBriefcase,
  IconLotus,
  IconGoogle,
  IconApple,
};
