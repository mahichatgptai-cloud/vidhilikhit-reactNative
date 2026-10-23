/**
 * Data and string formatters
 */

export const formatters = {
  /**
   * Format date string or timestamp into readable date
   */
  formatDate(date, options = {}) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    });
  },

  /**
   * Format currency value
   */
  formatCurrency(amount, currency = 'USD') {
    if (amount === null || amount === undefined || isNaN(Number(amount))) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(Number(amount));
  },

  /**
   * Capitalize first character
   */
  capitalize(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Truncate text with ellipsis
   */
  truncate(str, maxLength = 30) {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= maxLength) return str;
    return `${str.substring(0, maxLength)}...`;
  },

  /**
   * Format phone number mask
   */
  formatPhone(phone) {
    if (!phone) return '';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },
};

export default formatters;
