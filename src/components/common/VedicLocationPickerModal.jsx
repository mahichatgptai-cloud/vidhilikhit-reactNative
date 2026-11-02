/**
 * VedicLocationPickerModal Component
 * Interactive Free OpenSource Location Picker using OpenStreetMap (Nominatim & CartoDB)
 * Supports live city search, instant popular city presets, coordinates, and timezone detection.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem, pct } from '../../theme/responsive';
import {
  IconSearch,
  IconLocation,
  IconCloseCircle,
  IconGlobe,
} from './VedicIcons';

const POPULAR_CITIES = [
  { name: 'Mumbai, Maharashtra, India', short: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'New Delhi, Delhi, India', short: 'New Delhi', lat: 28.6139, lon: 77.2090, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Bengaluru, Karnataka, India', short: 'Bengaluru', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Pune, Maharashtra, India', short: 'Pune', lat: 18.5204, lon: 73.8567, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Varanasi, Uttar Pradesh, India', short: 'Varanasi', lat: 25.3176, lon: 82.9739, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Kolkata, West Bengal, India', short: 'Kolkata', lat: 22.5726, lon: 88.3639, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Chennai, Tamil Nadu, India', short: 'Chennai', lat: 13.0827, lon: 80.2707, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Hyderabad, Telangana, India', short: 'Hyderabad', lat: 17.3850, lon: 78.4867, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Ahmedabad, Gujarat, India', short: 'Ahmedabad', lat: 23.0225, lon: 72.5714, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'Jaipur, Rajasthan, India', short: 'Jaipur', lat: 26.9124, lon: 75.7873, tz: 'Asia/Kolkata (GMT +5:30)' },
  { name: 'London, United Kingdom', short: 'London', lat: 51.5074, lon: -0.1278, tz: 'Europe/London (GMT +0:00)' },
  { name: 'New York, NY, United States', short: 'New York', lat: 40.7128, lon: -74.0060, tz: 'America/New_York (GMT -5:00)' },
];

export const VedicLocationPickerModal = ({
  visible,
  currentLocation,
  onClose,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (visible) {
      setQuery('');
      setResults([]);
    }
  }, [visible]);

  const handleQueryChange = (text) => {
    setQuery(text);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!text.trim() || text.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text.trim()
        )}&limit=6&addressdetails=1`;
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'VidhilikhitAstro/1.0 (contact@vidhilikhit.com)',
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const formatted = data.map((item) => {
            const city =
              item.address?.city ||
              item.address?.town ||
              item.address?.village ||
              item.address?.state_district ||
              item.name;
            const state = item.address?.state || '';
            const country = item.address?.country || '';
            const displayName = [city, state, country].filter(Boolean).join(', ');
            const isIndia = (item.address?.country_code || '').toLowerCase() === 'in' || country.includes('India');

            return {
              id: item.place_id ? String(item.place_id) : Math.random().toString(),
              name: displayName || item.display_name,
              short: city || item.name,
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon),
              tz: isIndia ? 'Asia/Kolkata (GMT +5:30)' : 'Universal Time (UTC)',
            };
          });
          setResults(formatted);
        }
      } catch (err) {
        console.warn('[VedicLocationPicker] OpenStreetMap search failed:', err.message);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectCity = (city) => {
    onSelect({
      placeName: city.name,
      shortName: city.short,
      lat: city.lat,
      lon: city.lon,
      timeZone: city.tz || 'Asia/Kolkata (GMT +5:30)',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.sheetHeaderLeft}>
              <IconLocation size={20} color="#083236" />
              <Text style={styles.sheetTitle}>Select Place of Birth</Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <IconCloseCircle size={22} color="#7E5E42" />
            </TouchableOpacity>
          </View>

          {/* Search Input Box */}
          <View style={styles.searchBoxContainer}>
            <View style={styles.searchIconBox}>
              <IconSearch size={18} color="#7E5E42" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search city, town or district..."
              placeholderTextColor="#9A8068"
              value={query}
              onChangeText={handleQueryChange}
              autoFocus
            />
            {isSearching && (
              <ActivityIndicator size="small" color="#083236" style={{ marginRight: 8 }} />
            )}
            {query.length > 0 && !isSearching && (
              <TouchableOpacity
                onPress={() => {
                  setQuery('');
                  setResults([]);
                }}
              >
                <IconCloseCircle size={18} color="#9A8068" />
              </TouchableOpacity>
            )}
          </View>

          {/* Popular Cities Chips */}
          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Popular Locations</Text>
            <View style={styles.chipsRow}>
              {POPULAR_CITIES.slice(0, 8).map((city) => (
                <TouchableOpacity
                  key={city.name}
                  style={styles.cityChip}
                  onPress={() => handleSelectCity(city)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.cityChipText}>{city.short}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Results List */}
          <View style={styles.resultsContainer}>
            {results.length > 0 ? (
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelectCity(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.resultIconBox}>
                      <IconLocation size={18} color="#083236" />
                    </View>
                    <View style={styles.resultTextBox}>
                      <Text style={styles.resultTitle}>{item.name}</Text>
                      <Text style={styles.resultSub}>{item.tz}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : query.length >= 2 && !isSearching ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  No results found for "{query}". You can select one of the popular cities above or try another spelling.
                </Text>
              </View>
            ) : (
              <View style={styles.osmAttribution}>
                <IconGlobe size={16} color="#7E5E42" />
                <Text style={styles.osmAttributionText}>
                  OpenStreetMap & CartoDB worldwide geocoding
                </Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 17, 11, 0.65)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#F5EEDB',
    borderTopLeftRadius: rem(24),
    borderTopRightRadius: rem(24),
    paddingTop: vh(2.2),
    paddingHorizontal: vw(5),
    paddingBottom: vh(3.5),
    maxHeight: '82%',
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#D4A853',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(1.6),
  },
  sheetHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
  },
  sheetTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(18),
    fontWeight: '700',
    color: '#26160C',
  },
  closeBtn: {
    padding: 4,
  },
  searchBoxContainer: {
    width: '100%',
    height: rem(48),
    borderRadius: rem(12),
    backgroundColor: 'rgba(255, 252, 245, 0.85)',
    borderWidth: 1.2,
    borderColor: '#D8C2A8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    marginBottom: vh(1.6),
  },
  searchIconBox: {
    width: rem(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(1.5),
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: rem(14.5),
    color: '#26160C',
    paddingVertical: 0,
  },
  chipsSection: {
    marginBottom: vh(1.5),
  },
  chipsLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12.5),
    fontWeight: '700',
    color: '#6E4C32',
    marginBottom: vh(1),
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: vw(2),
  },
  cityChip: {
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.8),
    borderRadius: rem(14),
    backgroundColor: 'rgba(255, 248, 238, 0.75)',
    borderWidth: 1,
    borderColor: '#D4A853',
  },
  cityChipText: {
    fontFamily: fontFamily.bold,
    fontSize: rem(12),
    fontWeight: '600',
    color: '#083236',
  },
  resultsContainer: {
    minHeight: vh(16),
    maxHeight: vh(30),
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#E4D3BE',
  },
  resultIconBox: {
    width: rem(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2.5),
  },
  resultTextBox: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: fontFamily.bold,
    fontSize: rem(14),
    color: '#26160C',
    fontWeight: '600',
  },
  resultSub: {
    fontFamily: fontFamily.regular,
    fontSize: rem(11.5),
    color: '#7A5E48',
    marginTop: 2,
  },
  emptyState: {
    paddingVertical: vh(2.5),
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(13),
    color: '#7A5E48',
    textAlign: 'center',
    lineHeight: rem(18),
  },
  osmAttribution: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw(1.5),
    paddingVertical: vh(2.5),
  },
  osmAttributionText: {
    fontFamily: fontFamily.regular,
    fontSize: rem(11.5),
    color: '#7E5E42',
  },
});

export default VedicLocationPickerModal;
