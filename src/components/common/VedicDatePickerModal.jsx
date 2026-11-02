/**
 * VedicDatePickerModal Component
 * Elegant calendar modal with Vedic theme (parchment, celestial gold, deep teal)
 * Allows selecting Day, Month, and Year (1940 - current) with intuitive controls
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
import { formatBirthDate } from '../../utils/birthDetailsHelper';
import { vw, vh, rem } from '../../theme/responsive';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const VedicDatePickerModal = ({
  visible,
  currentDate,
  onClose,
  onSelect,
}) => {
  // Parse initial date
  const initialDateObj = useMemo(() => {
    try {
      const iso = formatBirthDate(currentDate || '1995-08-25');
      const parts = iso.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    } catch (_) {}
    return new Date(1995, 7, 25);
  }, [currentDate]);

  const [selectedYear, setSelectedYear] = useState(initialDateObj.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(initialDateObj.getMonth());
  const [selectedDay, setSelectedDay] = useState(initialDateObj.getDate());
  const [mode, setMode] = useState('calendar'); // 'calendar' | 'year' | 'month'

  useEffect(() => {
    if (visible) {
      setSelectedYear(initialDateObj.getFullYear());
      setSelectedMonth(initialDateObj.getMonth());
      setSelectedDay(initialDateObj.getDate());
      setMode('calendar');
    }
  }, [visible, initialDateObj]);

  // Year list from 1930 to current year
  const currentYear = new Date().getFullYear();
  const yearList = useMemo(() => {
    const years = [];
    for (let y = currentYear; y >= 1930; y--) {
      years.push(y);
    }
    return years;
  }, [currentYear]);

  // Calculate days in selected month and year
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();

    const days = [];
    // Padding before 1st of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [selectedYear, selectedMonth]);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleConfirm = () => {
    const yyyy = selectedYear;
    const mm = String(selectedMonth + 1).padStart(2, '0');
    const dd = String(selectedDay).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;
    const displayDate = `${selectedDay} ${MONTH_NAMES[selectedMonth]} ${selectedYear}`;

    onSelect(displayDate, isoDate);
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
          {/* Header Banner */}
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>Select Date of Birth</Text>
            <Text style={styles.headerTitle}>
              {selectedDay} {MONTH_NAMES[selectedMonth]} {selectedYear}
            </Text>
          </View>

          {/* Month & Year Navigation Bar */}
          <View style={styles.navigationRow}>
            <TouchableOpacity
              style={styles.navArrowBtn}
              onPress={handlePrevMonth}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.navArrowText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.selectorButtonsRow}>
              {/* Month Toggle Button */}
              <TouchableOpacity
                style={[styles.selectorPill, mode === 'month' && styles.selectorPillActive]}
                onPress={() => setMode((prev) => (prev === 'month' ? 'calendar' : 'month'))}
                activeOpacity={0.7}
              >
                <Text style={[styles.selectorPillText, mode === 'month' && styles.selectorPillTextActive]}>
                  {MONTH_NAMES[selectedMonth]} ▾
                </Text>
              </TouchableOpacity>

              {/* Year Toggle Button */}
              <TouchableOpacity
                style={[styles.selectorPill, mode === 'year' && styles.selectorPillActive]}
                onPress={() => setMode((prev) => (prev === 'year' ? 'calendar' : 'year'))}
                activeOpacity={0.7}
              >
                <Text style={[styles.selectorPillText, mode === 'year' && styles.selectorPillTextActive]}>
                  {selectedYear} ▾
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.navArrowBtn}
              onPress={handleNextMonth}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.navArrowText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Body Content based on mode */}
          {mode === 'year' ? (
            /* Year Grid Selector */
            <ScrollView style={styles.gridScroll} contentContainerStyle={styles.yearGrid}>
              {yearList.map((year) => {
                const isSelected = year === selectedYear;
                return (
                  <TouchableOpacity
                    key={year}
                    style={[styles.yearItem, isSelected && styles.yearItemActive]}
                    onPress={() => {
                      setSelectedYear(year);
                      setMode('calendar');
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.yearItemText, isSelected && styles.yearItemTextActive]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : mode === 'month' ? (
            /* Month Grid Selector */
            <View style={styles.monthGrid}>
              {MONTH_NAMES.map((monthName, idx) => {
                const isSelected = idx === selectedMonth;
                return (
                  <TouchableOpacity
                    key={monthName}
                    style={[styles.monthItem, isSelected && styles.monthItemActive]}
                    onPress={() => {
                      setSelectedMonth(idx);
                      setMode('calendar');
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.monthItemText, isSelected && styles.monthItemTextActive]}>
                      {monthName.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            /* Standard Calendar Day Grid */
            <View style={styles.calendarContainer}>
              {/* Day of Week Headers */}
              <View style={styles.weekDaysRow}>
                {WEEK_DAYS.map((wd) => (
                  <Text key={wd} style={styles.weekDayText}>
                    {wd}
                  </Text>
                ))}
              </View>

              {/* Day Cells Grid */}
              <View style={styles.daysGrid}>
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <View key={`empty-${index}`} style={styles.dayCell} />;
                  }

                  const isSelected = day === selectedDay;
                  return (
                    <TouchableOpacity
                      key={`day-${day}`}
                      style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                      onPress={() => setSelectedDay(day)}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Action Buttons */}
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
              <Text style={styles.confirmButtonText}>Set Date</Text>
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
  },
  headerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: rem(12),
    color: '#D4A853',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: rem(20),
    color: '#F2E2BE',
    fontWeight: '700',
    marginTop: 2,
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.4),
    borderBottomWidth: 1,
    borderBottomColor: '#EED9C0',
  },
  navArrowBtn: {
    width: rem(34),
    height: rem(34),
    borderRadius: rem(17),
    backgroundColor: 'rgba(212, 168, 83, 0.15)',
    borderWidth: 1,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrowText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(22),
    color: '#3B2416',
    lineHeight: rem(26),
    textAlign: 'center',
  },
  selectorButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
  },
  selectorPill: {
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.7),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 250, 242, 0.9)',
    borderWidth: 1,
    borderColor: '#D8C2A8',
  },
  selectorPillActive: {
    backgroundColor: '#083236',
    borderColor: '#D4A853',
  },
  selectorPillText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(13.5),
    fontWeight: '700',
    color: '#3B2416',
  },
  selectorPillTextActive: {
    color: '#F2E2BE',
  },
  calendarContainer: {
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.2),
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(1),
  },
  weekDayText: {
    width: rem(38),
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: rem(12),
    color: '#8A684C',
    fontWeight: '700',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: rem(38),
    height: rem(38),
    borderRadius: rem(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.4),
  },
  dayCellSelected: {
    backgroundColor: '#083236',
    borderWidth: 1.5,
    borderColor: '#D4A853',
    shadowColor: '#083236',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  dayText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: '#26160C',
  },
  dayTextSelected: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#F2E2BE',
  },
  gridScroll: {
    maxHeight: vh(30),
    paddingHorizontal: vw(2.5),
    paddingVertical: vh(1),
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: vh(1.2),
  },
  yearItem: {
    width: '30%',
    paddingVertical: vh(1.2),
    borderRadius: rem(10),
    backgroundColor: 'rgba(255, 250, 242, 0.7)',
    borderWidth: 1,
    borderColor: '#D8C2A8',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.5),
  },
  yearItemActive: {
    backgroundColor: '#083236',
    borderColor: '#D4A853',
  },
  yearItemText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: '#3B2416',
  },
  yearItemTextActive: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#F2E2BE',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.6),
  },
  monthItem: {
    width: '30%',
    paddingVertical: vh(1.4),
    borderRadius: rem(10),
    backgroundColor: 'rgba(255, 250, 242, 0.7)',
    borderWidth: 1,
    borderColor: '#D8C2A8',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(0.7),
  },
  monthItemActive: {
    backgroundColor: '#083236',
    borderColor: '#D4A853',
  },
  monthItemText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(14),
    color: '#3B2416',
  },
  monthItemTextActive: {
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
    paddingVertical: vh(1.6),
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

export default VedicDatePickerModal;
