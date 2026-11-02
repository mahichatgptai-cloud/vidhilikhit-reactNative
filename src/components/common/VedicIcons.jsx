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

export const IconArrowRight = ({ size = 20, color = '#F2E2BE' }) => {
  const stroke = 2.2;
  const headSize = Math.round(size * 0.38);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Horizontal shaft */}
      <View
        style={{
          width: Math.round(size * 0.62),
          height: stroke,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Arrowhead */}
      <View
        style={{
          position: 'absolute',
          right: Math.round(size * 0.16),
          width: headSize,
          height: headSize,
          borderTopWidth: stroke,
          borderRightWidth: stroke,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
};

export const IconChevronRight = ({ size = 18, color = '#D4A853', strokeWidth = 2.4 }) => {
  const armSize = Math.round(size * 0.44);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          width: armSize,
          height: armSize,
          borderTopWidth: strokeWidth,
          borderRightWidth: strokeWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginRight: 2,
        }}
      />
    </View>
  );
};

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

export const IconHeart = ({ size = 22, color = '#6B4F35' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.95, color, fontWeight: '700', lineHeight: size + 2 }}>♡</Text>
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

export const IconMale = ({ size = 28, color = '#E5B869' }) => {
  const circleSize = Math.round(size * 0.54);
  const stroke = Math.max(1.8, Math.round(size * 0.075));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Circle at bottom left */}
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: stroke,
          borderColor: color,
          position: 'absolute',
          bottom: 2,
          left: 2,
        }}
      />
      {/* Arrow stem pointing up-right */}
      <View
        style={{
          position: 'absolute',
          width: Math.round(size * 0.42),
          height: stroke,
          backgroundColor: color,
          top: Math.round(size * 0.3),
          right: Math.round(size * 0.16),
          transform: [{ rotate: '-45deg' }],
        }}
      />
      {/* Arrow head top horizontal wing */}
      <View
        style={{
          position: 'absolute',
          width: Math.round(size * 0.28),
          height: stroke,
          backgroundColor: color,
          top: 2,
          right: 2,
        }}
      />
      {/* Arrow head right vertical wing */}
      <View
        style={{
          position: 'absolute',
          width: stroke,
          height: Math.round(size * 0.28),
          backgroundColor: color,
          top: 2,
          right: 2,
        }}
      />
    </View>
  );
};

export const IconFemale = ({ size = 28, color = '#26160C' }) => {
  const circleSize = Math.round(size * 0.56);
  const stroke = Math.max(1.8, Math.round(size * 0.075));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Circle at top */}
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: stroke,
          borderColor: color,
          position: 'absolute',
          top: 2,
        }}
      />
      {/* Vertical cross stem */}
      <View
        style={{
          width: stroke,
          height: Math.round(size * 0.36),
          backgroundColor: color,
          position: 'absolute',
          bottom: 2,
        }}
      />
      {/* Horizontal cross bar */}
      <View
        style={{
          position: 'absolute',
          bottom: Math.round(size * 0.12),
          width: Math.round(size * 0.36),
          height: stroke,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export const IconOther = ({ size = 28, color = '#26160C' }) => {
  const stroke = Math.max(1.6, Math.round(size * 0.065));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Front Person Silhouette */}
      <View
        style={{
          position: 'absolute',
          bottom: 2,
          left: Math.round(size * 0.12),
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <View
          style={{
            width: Math.round(size * 0.32),
            height: Math.round(size * 0.32),
            borderRadius: Math.round(size * 0.16),
            borderWidth: stroke,
            borderColor: color,
            marginBottom: 1,
            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            width: Math.round(size * 0.52),
            height: Math.round(size * 0.28),
            borderTopLeftRadius: Math.round(size * 0.26),
            borderTopRightRadius: Math.round(size * 0.26),
            borderWidth: stroke,
            borderBottomWidth: 0,
            borderColor: color,
            backgroundColor: 'transparent',
          }}
        />
      </View>
      {/* Secondary Person Silhouette Behind to Right */}
      <View
        style={{
          position: 'absolute',
          top: Math.round(size * 0.14),
          right: Math.round(size * 0.1),
          alignItems: 'center',
          opacity: 0.9,
        }}
      >
        <View
          style={{
            width: Math.round(size * 0.26),
            height: Math.round(size * 0.26),
            borderRadius: Math.round(size * 0.13),
            borderWidth: stroke,
            borderColor: color,
            marginBottom: 1,
          }}
        />
        <View
          style={{
            width: Math.round(size * 0.38),
            height: Math.round(size * 0.22),
            borderTopLeftRadius: Math.round(size * 0.19),
            borderTopRightRadius: Math.round(size * 0.19),
            borderWidth: stroke,
            borderBottomWidth: 0,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
};

export const IconTarget = ({ size = 26, color = '#26160C' }) => {
  const stroke = Math.max(1.8, Math.round(size * 0.075));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Outer circle */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Inner circle */}
        <View
          style={{
            width: Math.round(size * 0.52),
            height: Math.round(size * 0.52),
            borderRadius: Math.round(size * 0.26),
            borderWidth: stroke,
            borderColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Center dot */}
          <View
            style={{
              width: Math.round(size * 0.2),
              height: Math.round(size * 0.2),
              borderRadius: Math.round(size * 0.1),
              backgroundColor: color,
            }}
          />
        </View>
      </View>
      {/* Crosshairs: top, bottom, left, right */}
      <View
        style={{
          position: 'absolute',
          width: stroke,
          height: Math.round(size * 0.26),
          backgroundColor: color,
          top: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: stroke,
          height: Math.round(size * 0.26),
          backgroundColor: color,
          bottom: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: Math.round(size * 0.26),
          height: stroke,
          backgroundColor: color,
          left: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: Math.round(size * 0.26),
          height: stroke,
          backgroundColor: color,
          right: 0,
        }}
      />
    </View>
  );
};

export const IconQuestionCircle = ({ size = 26, color = '#26160C' }) => {
  const stroke = Math.max(1.8, Math.round(size * 0.075));
  return (
    <View
      style={[
        styles.center,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: color,
        },
      ]}
    >
      <Text
        style={{
          fontSize: Math.round(size * 0.65),
          color,
          fontWeight: '700',
          fontFamily: fontFamily.bold,
          marginTop: -2,
        }}
      >
        ?
      </Text>
    </View>
  );
};

export const IconGlobe = ({ size = 20, color = '#26160C' }) => {
  const stroke = Math.max(1.5, Math.round(size * 0.08));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Outer circle */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Equator horizontal line */}
        <View
          style={{
            position: 'absolute',
            width: size,
            height: stroke,
            backgroundColor: color,
          }}
        />
        {/* Prime meridian ellipse */}
        <View
          style={{
            width: Math.round(size * 0.54),
            height: size,
            borderRadius: Math.round(size * 0.27),
            borderWidth: stroke,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
};

export const IconPencil = ({ size = 14, color = '#26160C' }) => (
  <Text style={{ fontSize: size, color, fontWeight: '700' }}>✎</Text>
);

export const IconCloseCircle = ({ size = 18, color = '#8C735D' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: color,
      },
    ]}
  >
    <Text style={{ fontSize: size * 0.65, color, fontWeight: '700', marginTop: -1 }}>×</Text>
  </View>
);

export const IconRedPin = ({ size = 32 }) => (
  <View style={[styles.center, { width: size, height: size * 1.25 }]}>
    {/* Drop shadow */}
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: size * 0.45,
        height: size * 0.18,
        borderRadius: size * 0.1,
        backgroundColor: 'rgba(0, 0, 0, 0.22)',
      }}
    />
    {/* Pin Head */}
    <View
      style={{
        width: size * 0.72,
        height: size * 0.72,
        borderRadius: (size * 0.72) / 2,
        backgroundColor: '#E53935',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#B71C1C',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      {/* White center dot */}
      <View
        style={{
          width: size * 0.26,
          height: size * 0.26,
          borderRadius: (size * 0.26) / 2,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
    {/* Pin Point */}
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.18,
        borderRightWidth: size * 0.18,
        borderTopWidth: size * 0.32,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#E53935',
        marginTop: -2,
      }}
    />
  </View>
);

export const IconBell = ({ size = 22, color = '#26160C', hasBadge = true }) => {
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Top hanger loop */}
      <View
        style={{
          width: size * 0.22,
          height: size * 0.2,
          borderRadius: size * 0.11,
          borderWidth: 1.6,
          borderColor: color,
          marginBottom: -1,
        }}
      />
      {/* Bell body */}
      <View
        style={{
          width: size * 0.65,
          height: size * 0.52,
          borderTopLeftRadius: size * 0.32,
          borderTopRightRadius: size * 0.32,
          borderWidth: 1.8,
          borderBottomWidth: 0,
          borderColor: color,
        }}
      />
      {/* Bell rim */}
      <View
        style={{
          width: size * 0.8,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Clapper */}
      <View
        style={{
          width: size * 0.22,
          height: size * 0.14,
          borderRadius: size * 0.11,
          backgroundColor: color,
          marginTop: 1,
        }}
      />
      {/* Notification Red Dot */}
      {hasBadge && (
        <View
          style={{
            position: 'absolute',
            top: 1,
            right: 1,
            width: size * 0.35,
            height: size * 0.35,
            borderRadius: (size * 0.35) / 2,
            backgroundColor: '#E53935',
            borderWidth: 1.2,
            borderColor: '#FAF1E4',
          }}
        />
      )}
    </View>
  );
};

export const IconChakra = ({ size = 32, color = '#C89B48' }) => {
  const stroke = Math.max(1.6, Math.round(size * 0.06));
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Outer ring */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Inner circle */}
        <View
          style={{
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: (size * 0.38) / 2,
            borderWidth: stroke,
            borderColor: color,
          }}
        />
        {/* Vertical spoke */}
        <View style={{ position: 'absolute', width: stroke, height: size, backgroundColor: color }} />
        {/* Horizontal spoke */}
        <View style={{ position: 'absolute', width: size, height: stroke, backgroundColor: color }} />
        {/* Diagonal 45 spoke */}
        <View style={{ position: 'absolute', width: stroke, height: size * 0.9, backgroundColor: color, transform: [{ rotate: '45deg' }] }} />
        {/* Diagonal -45 spoke */}
        <View style={{ position: 'absolute', width: stroke, height: size * 0.9, backgroundColor: color, transform: [{ rotate: '-45deg' }] }} />
      </View>
    </View>
  );
};

export const IconSunSurya = ({ size = 44, color = '#E5B869' }) => {
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* 8 Diamond/Ray facets behind */}
      {[0, 45, 90, 135].map((deg) => (
        <View
          key={deg}
          style={{
            position: 'absolute',
            width: size * 0.88,
            height: size * 0.88,
            borderRadius: 6,
            backgroundColor: 'rgba(229, 184, 105, 0.28)',
            transform: [{ rotate: `${deg}deg` }],
          }}
        />
      ))}
      {/* Outer Ray Star */}
      <View
        style={{
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: (size * 0.72) / 2,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#F2D082',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        {/* Sun Face Center */}
        <View
          style={{
            width: size * 0.52,
            height: size * 0.52,
            borderRadius: (size * 0.52) / 2,
            backgroundColor: '#F5DC98',
            borderWidth: 1.2,
            borderColor: '#9E742E',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Eyes */}
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 2 }}>
            <View style={{ width: 3, height: 2.2, borderRadius: 1.5, backgroundColor: '#543812' }} />
            <View style={{ width: 3, height: 2.2, borderRadius: 1.5, backgroundColor: '#543812' }} />
          </View>
          {/* Smile */}
          <View
            style={{
              width: 6,
              height: 3,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
              borderWidth: 1,
              borderTopWidth: 0,
              borderColor: '#543812',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const IconMatchRings = ({ size = 36, color = '#C89B48' }) => {
  const ringSize = size * 0.52;
  const stroke = 2.4;
  return (
    <View style={{ width: size, height: size, justifyContent: 'center' }}>
      {/* Left Ring */}
      <View
        style={{
          position: 'absolute',
          left: 1,
          bottom: 2,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: stroke,
          borderColor: color,
        }}
      />
      {/* Right Ring */}
      <View
        style={{
          position: 'absolute',
          right: 3,
          top: 5,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: stroke,
          borderColor: color,
        }}
      />
      {/* Mars arrow stem from right ring */}
      <View
        style={{
          position: 'absolute',
          top: 2,
          right: 1,
          width: size * 0.28,
          height: stroke,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }],
        }}
      />
      {/* Arrow head top */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: size * 0.2,
          height: stroke,
          backgroundColor: color,
        }}
      />
      {/* Arrow head right */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: stroke,
          height: size * 0.2,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export const IconOpenBook = ({ size = 34, color = '#C89B48' }) => {
  return (
    <View style={[styles.center, { width: size, height: size * 0.78 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Left Page */}
        <View
          style={{
            width: size * 0.44,
            height: size * 0.62,
            borderWidth: 2,
            borderColor: color,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 3,
            backgroundColor: 'rgba(255, 245, 220, 0.6)',
            padding: 3,
            gap: 2,
          }}
        >
          <View style={{ width: '80%', height: 1.5, backgroundColor: color }} />
          <View style={{ width: '60%', height: 1.5, backgroundColor: color }} />
          <View style={{ width: '70%', height: 1.5, backgroundColor: color }} />
        </View>
        {/* Spine */}
        <View style={{ width: 2, height: size * 0.62, backgroundColor: color }} />
        {/* Right Page */}
        <View
          style={{
            width: size * 0.44,
            height: size * 0.62,
            borderWidth: 2,
            borderColor: color,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 3,
            backgroundColor: 'rgba(255, 245, 220, 0.6)',
            padding: 3,
            gap: 2,
          }}
        >
          <View style={{ width: '80%', height: 1.5, backgroundColor: color }} />
          <View style={{ width: '60%', height: 1.5, backgroundColor: color }} />
          <View style={{ width: '70%', height: 1.5, backgroundColor: color }} />
        </View>
      </View>
    </View>
  );
};

export const IconLotusGold = ({ size = 38, color = '#C89B48' }) => {
  return (
    <View style={[styles.center, { width: size, height: size * 0.75 }]}>
      {/* Center Petal */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: size * 0.28,
          height: size * 0.68,
          borderRadius: size * 0.14,
          borderWidth: 2,
          borderColor: color,
          backgroundColor: 'rgba(240, 215, 160, 0.35)',
        }}
      />
      {/* Left Petal */}
      <View
        style={{
          position: 'absolute',
          left: size * 0.12,
          top: size * 0.1,
          width: size * 0.26,
          height: size * 0.58,
          borderRadius: size * 0.13,
          borderWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '-32deg' }],
          backgroundColor: 'rgba(240, 215, 160, 0.25)',
        }}
      />
      {/* Right Petal */}
      <View
        style={{
          position: 'absolute',
          right: size * 0.12,
          top: size * 0.1,
          width: size * 0.26,
          height: size * 0.58,
          borderRadius: size * 0.13,
          borderWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '32deg' }],
          backgroundColor: 'rgba(240, 215, 160, 0.25)',
        }}
      />
      {/* Base Calyx */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: size * 0.64,
          height: size * 0.22,
          borderBottomLeftRadius: size * 0.32,
          borderBottomRightRadius: size * 0.32,
          borderWidth: 1.8,
          borderColor: color,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export const IconHomeFilled = ({ size = 22, color = '#083236' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Roof triangle */}
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.45,
        borderRightWidth: size * 0.45,
        borderBottomWidth: size * 0.38,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    {/* House body */}
    <View
      style={{
        width: size * 0.68,
        height: size * 0.45,
        backgroundColor: color,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: -1,
      }}
    />
  </View>
);

export const IconBotTab = ({ size = 22, color = '#6B4F35' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.72,
        height: size * 0.68,
        borderRadius: (size * 0.72) / 2,
        borderWidth: 1.8,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 4, marginBottom: 1 }}>
        <View style={{ width: 2.2, height: 2.2, borderRadius: 1.1, backgroundColor: color }} />
        <View style={{ width: 2.2, height: 2.2, borderRadius: 1.1, backgroundColor: color }} />
      </View>
      <View style={{ width: 5, height: 2, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, borderWidth: 1, borderTopWidth: 0, borderColor: color }} />
    </View>
    <View style={{ position: 'absolute', top: 1, width: 2, height: 3, backgroundColor: color }} />
  </View>
);

export const IconMenuTab = ({ size = 22, color = '#6B4F35' }) => (
  <View style={[styles.center, { width: size, height: size, gap: 3.5 }]}>
    <View style={{ width: size * 0.72, height: 2, borderRadius: 1, backgroundColor: color }} />
    <View style={{ width: size * 0.72, height: 2, borderRadius: 1, backgroundColor: color }} />
    <View style={{ width: size * 0.72, height: 2, borderRadius: 1, backgroundColor: color }} />
  </View>
);

export const IconGoogle = ({ size = 18 }) => (
  <Text style={{ fontSize: size, fontWeight: '700', color: '#EA4335' }}>G</Text>
);

export const IconZodiacAries = ({ size = 24, color = '#C89445' }) => {
  const stroke = 2.2;
  const loopW = Math.round(size * 0.46);
  const loopH = Math.round(size * 0.62);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        {/* Left horn */}
        <View
          style={{
            width: loopW,
            height: loopH,
            borderTopLeftRadius: loopW,
            borderTopRightRadius: loopW * 0.4,
            borderBottomLeftRadius: loopW * 0.8,
            borderWidth: stroke,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            borderColor: color,
            marginRight: -1,
            transform: [{ rotate: '-12deg' }],
          }}
        />
        {/* Right horn */}
        <View
          style={{
            width: loopW,
            height: loopH,
            borderTopRightRadius: loopW,
            borderTopLeftRadius: loopW * 0.4,
            borderBottomRightRadius: loopW * 0.8,
            borderWidth: stroke,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderColor: color,
            marginLeft: -1,
            transform: [{ rotate: '12deg' }],
          }}
        />
      </View>
      {/* Center downward stem */}
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          width: stroke,
          height: Math.round(size * 0.44),
          backgroundColor: color,
          borderRadius: stroke / 2,
        }}
      />
    </View>
  );
};

export const IconZodiacTaurus = ({ size = 24, color = '#C89445' }) => {
  const stroke = 2.2;
  const circleSize = Math.round(size * 0.52);
  const hornsW = Math.round(size * 0.68);
  const hornsH = Math.round(size * 0.38);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Top horns */}
      <View
        style={{
          width: hornsW,
          height: hornsH,
          borderBottomLeftRadius: hornsW * 0.5,
          borderBottomRightRadius: hornsW * 0.5,
          borderWidth: stroke,
          borderTopWidth: 0,
          borderColor: color,
          marginBottom: -2,
        }}
      />
      {/* Lower Circle */}
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: stroke,
          borderColor: color,
        }}
      />
    </View>
  );
};

export const IconStarSparkle = ({ size = 24, color = '#C89445' }) => {
  const stroke = 1.8;
  const rayLen = Math.round(size * 0.46);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Vertical ray */}
      <View
        style={{
          position: 'absolute',
          width: stroke,
          height: size * 0.9,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Horizontal ray */}
      <View
        style={{
          position: 'absolute',
          width: size * 0.9,
          height: stroke,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Central diamond */}
      <View
        style={{
          width: Math.round(size * 0.34),
          height: Math.round(size * 0.34),
          borderWidth: stroke,
          borderColor: color,
          backgroundColor: 'transparent',
          transform: [{ rotate: '45deg' }],
        }}
      />
      {/* Inner sparkle dot */}
      <View
        style={{
          position: 'absolute',
          width: 2.5,
          height: 2.5,
          borderRadius: 1.25,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default {
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
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
  IconMale,
  IconFemale,
  IconOther,
  IconTarget,
  IconQuestionCircle,
  IconGlobe,
  IconPencil,
  IconCloseCircle,
  IconRedPin,
  IconBell,
  IconChakra,
  IconSunSurya,
  IconMatchRings,
  IconOpenBook,
  IconLotusGold,
  IconHomeFilled,
  IconBotTab,
  IconMenuTab,
  IconGoogle,
  IconApple,
  IconZodiacAries,
  IconZodiacTaurus,
  IconStarSparkle,
};
