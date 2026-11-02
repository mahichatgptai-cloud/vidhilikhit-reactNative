/**
 * VedicTimePickerModal Component
 * Time picker modal matching Vidhilikhit Vedic theme (parchment, celestial gold, deep teal)
 * Allows selecting Hour (1-12), Minute (00-59 with quick chips & stepper), and AM/PM
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { fontFamily } from '../../theme/typography';
import { formatBirthTime } from '../../utils/birthDetailsHelper';
import { vw, vh, rem, pct } from '../../theme/responsive';

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTE_PRESETS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export const VedicTimePickerModal = ({
  visible,
  currentTime,
  onClose,
  onSelect,
}) => {
  // Parse initial time
  const initialTimeObj = useMemo(() => {
    try {
      const formatted = formatBirthTime(currentTime || '10:30:00');
      const [hStr, mStr] = formatted.split(':');
      let hour24 = parseInt(hStr, 10) || 10;
      let minute = parseInt(mStr, 10) || 30;

      const isPM = hour24 >= 12;
      let hour12 = hour24 % 12;
      if (hour12 === 0) hour12 = 12;

      return { hour12, minute, ampm: isPM ? 'PM' : 'AM' };
    } catch (_) {
      return { hour12: 10, minute: 30, ampm: 'AM' };
    }
  }, [currentTime]);

  const [selectedHour, setSelectedHour] = useState(initialTimeObj.hour12);
  const [selectedMinute, setSelectedMinute] = useState(initialTimeObj.minute);
  const [selectedAmPm, setSelectedAmPm] = useState(initialTimeObj.ampm);

  useEffect(() => {
    if (visible) {
      setSelectedHour(initialTimeObj.hour12);
      setSelectedMinute(initialTimeObj.minute);
      setSelectedAmPm(initialTimeObj.ampm);
    }
  }, [visible, initialTimeObj]);

  const handleIncrementMinute = () => {
    setSelectedMinute((prev) => (prev >= 59 ? 0 : prev + 1));
  };

  const handleDecrementMinute = () => {
    setSelectedMinute((prev) => (prev <= 0 ? 59 : prev - 1));
  };

  const handleConfirm = () => {
    const formattedMinute = String(selectedMinute).padStart(2, '0');
    const displayTime = `${selectedHour}:${formattedMinute} ${selectedAmPm}`;

    let hour24 = selectedHour;
    if (selectedAmPm === 'PM' && hour24 < 12) hour24 += 12;
    if (selectedAmPm === 'AM' && hour24 === 12) hour24 = 0;

    const isoHour = String(hour24).padStart(2, '0');
    const isoTime = `${isoHour}:${formattedMinute}:00`;

    onSelect(displayTime, isoTime);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialogCard}>
          {/* Header Banner with Large Display */}
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>Select Time of Birth</Text>
            <View style={styles.timeDisplayRow}>
              <Text style={styles.timeDisplayText}>
                {selectedHour}:{String(selectedMinute).padStart(2, '0')}
              </Text>
              <Text style={styles.timeAmPmText}>{selectedAmPm}</Text>
            </View>
          </View>

          <ScrollView style={styles.bodyScroll} showsVerticalScrollIndicator={false}>
            {/* AM / PM Toggle */}
            <View style={styles.amPmContainer}>
              <TouchableOpacity
                style={[styles.amPmPill, selectedAmPm === 'AM' && styles.amPmPillActive]}
                onPress={() => setSelectedAmPm('AM')}
                activeOpacity={0.8}
              >
                <Text style={[styles.amPmPillText, selectedAmPm === 'AM' && styles.amPmPillTextActive]}>
                  AM (Morning)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.amPmPill, selectedAmPm === 'PM' && styles.amPmPillActive]}
                onPress={() => setSelectedAmPm('PM')}
                activeOpacity={0.8}
              >
                <Text style={[styles.amPmPillText, selectedAmPm === 'PM' && styles.amPmPillTextActive]}>
                  PM (Afternoon / Evening)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Hour Selector (1-12) */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Hour</Text>
              <View style={styles.chipGrid}>
                {HOURS.map((hr) => {
                  const isSelected = hr === selectedHour;
                  return (
                    <TouchableOpacity
                      key={`hr-${hr}`}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => setSelectedHour(hr)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                        {hr}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Minute Selector with Stepper & Quick Presets */}
            <View style={styles.section}>
              <View style={styles.minuteHeaderRow}>
                <Text style={styles.sectionLabel}>Minute: {String(selectedMinute).padStart(2, '0')}</Text>
                {/* Stepper buttons for exact minute */}
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={handleDecrementMinute}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.stepperBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperValueText}>
                    {String(selectedMinute).padStart(2, '0')}
                  </Text>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={handleIncrementMinute}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.stepperBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Quick minute presets */}
              <View style={styles.chipGrid}>
                {MINUTE_PRESETS.map((min) => {
                  const isSelected = min === selectedMinute;
                  return (
                    <TouchableOpacity
                      key={`min-${min}`}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => setSelectedMinute(min)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                        :{String(min).padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmButtonText}>Set Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 10, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(5),
  },
  dialogCard: {
    width: vw(90),
    maxWidth: rem(380),
    maxHeight: vh(75),
    backgroundColor: '#FFF9F0',
    borderRadius: rem(20),
    borderWidth: 1.5,
    borderColor: '#D4A853',
    overflow: 'hidden',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 10,
  },
  header: {
    backgroundColor: '#083236',
    paddingVertical: vh(1.6),
    paddingHorizontal: vw(4.5),
    borderBottomWidth: 1.5,
    borderBottomColor: '#D4A853',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#D4A853',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  timeDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: vw(2),
    marginTop: 4,
  },
  timeDisplayText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(28),
    color: '#F2E2BE',
    fontWeight: '700',
    letterSpacing: 1,
  },
  timeAmPmText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(18),
    color: '#D4A853',
    fontWeight: '700',
  },
  bodyScroll: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.5),
  },
  amPmContainer: {
    flexDirection: 'row',
    gap: vw(2),
    marginBottom: vh(1.6),
  },
  amPmPill: {
    flex: 1,
    paddingVertical: vh(1),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 250, 242, 0.8)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amPmPillActive: {
    backgroundColor: '#083236',
    borderColor: '#D4A853',
  },
  amPmPillText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12.5),
    fontWeight: '700',
    color: '#5E4432',
  },
  amPmPillTextActive: {
    color: '#F2E2BE',
  },
  section: {
    marginBottom: vh(1.6),
  },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13),
    fontWeight: '700',
    color: '#3B2416',
    marginBottom: vh(1),
  },
  minuteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(1),
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 168, 83, 0.15)',
    borderWidth: 1,
    borderColor: '#D4A853',
    borderRadius: rem(12),
    paddingHorizontal: vw(1),
  },
  stepperBtn: {
    width: rem(28),
    height: rem(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(18),
    color: '#083236',
    fontWeight: '700',
  },
  stepperValueText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13),
    fontWeight: '700',
    color: '#3B2416',
    paddingHorizontal: vw(1.5),
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: vw(1.5),
    justifyContent: 'space-between',
  },
  chip: {
    width: '14.8%',
    height: rem(36),
    borderRadius: rem(10),
    backgroundColor: 'rgba(255, 250, 242, 0.8)',
    borderWidth: 1,
    borderColor: '#D8C2A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#083236',
    borderColor: '#D4A853',
  },
  chipText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13),
    color: '#3B2416',
  },
  chipTextActive: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#F2E2BE',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: vw(2.5),
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.5),
    borderTopWidth: 1,
    borderTopColor: '#EED9C0',
    backgroundColor: 'rgba(247, 237, 224, 0.5)',
  },
  cancelButton: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(1),
    borderRadius: rem(18),
    borderWidth: 1,
    borderColor: '#C8B096',
  },
  cancelButtonText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13.5),
    color: '#5E4432',
  },
  confirmButton: {
    paddingHorizontal: vw(5.5),
    paddingVertical: vh(1),
    borderRadius: rem(18),
    backgroundColor: '#083236',
    borderWidth: 1,
    borderColor: '#D4A853',
  },
  confirmButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    fontWeight: '700',
    color: '#F2E2BE',
  },
});

export default VedicTimePickerModal;
