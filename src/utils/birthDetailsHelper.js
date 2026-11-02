/**
 * Helper utilities for formatting birth details and user normalization
 */

/**
 * Convert user-entered date string (e.g. "15 March 1995", "15/08/1995") to ISO "YYYY-MM-DD"
 * @param {string|Date} raw
 * @returns {string} ISO Date string YYYY-MM-DD
 */
export const formatBirthDate = (raw) => {
  if (!raw) return '1995-08-25';
  const str = String(raw).trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const ddmmyyyy = str.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  // Parse text date like "15 March 1995" or "Aug 25, 1995"
  const timestamp = Date.parse(str);
  if (!isNaN(timestamp)) {
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  return '1995-08-25';
};

/**
 * Convert user-entered time string (e.g. "10:30 AM", "2:30 PM", "14:30") to "HH:mm:ss"
 * @param {string} raw
 * @returns {string} 24-hour time string HH:mm:ss
 */
export const formatBirthTime = (raw) => {
  if (!raw) return '14:30:00';
  const str = String(raw).trim();

  // Already HH:mm:ss
  if (/^\d{2}:\d{2}:\d{2}$/.test(str)) {
    return str;
  }

  // HH:mm
  if (/^\d{2}:\d{2}$/.test(str)) {
    return `${str}:00`;
  }

  // 12-hour AM/PM format (e.g. "10:30 AM", "2:30:00 PM")
  const ampmMatch = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (ampmMatch) {
    let [, h, m, s, modifier] = ampmMatch;
    let hour = parseInt(h, 10);
    if (modifier) {
      if (modifier.toUpperCase() === 'PM' && hour < 12) hour += 12;
      if (modifier.toUpperCase() === 'AM' && hour === 12) hour = 0;
    }
    const hh = String(hour).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = s ? String(s).padStart(2, '0') : '00';
    return `${hh}:${mm}:${ss}`;
  }

  return '14:30:00';
};

/**
 * Standardize birthDetails object to match backend schema
 * @param {Object} details
 * @returns {Object}
 */
export const formatBirthDetails = (details = {}) => {
  const tobChoice = details.tobChoice || 'exact';
  const rawTime = details.tobTime || details.tob || '14:30:00';

  return {
    dob: formatBirthDate(details.dob || '1995-08-25'),
    tobChoice,
    tobTime: formatBirthTime(rawTime),
    gender: details.gender || 'male',
    pob: (details.pob || 'Pune, Maharashtra, India').trim(),
  };
};

/**
 * Normalize user object so both fullName and name are always available
 * @param {Object} user
 * @returns {Object}
 */
export const normalizeUser = (user) => {
  if (!user) return user;
  const fullName = user.fullName || user.name || 'Vidhilikhit User';
  return {
    ...user,
    fullName,
    name: fullName,
  };
};

export default {
  formatBirthDate,
  formatBirthTime,
  formatBirthDetails,
  normalizeUser,
};
