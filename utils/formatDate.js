
/**
 * Formats a given date input into a specified string format.
 *
 * @param {string|Date} dateInput - The date input to format. Can be a string or a Date object.
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - The desired output format for the date.
 *   Supported tokens:
 *   - YYYY: Full year (e.g., 2023)
 *   - MM: Month (01-12)
 *   - DD: Day of the month (01-31)
 *   - HH: Hours (00-23)
 *   - mm: Minutes (00-59)
 *   - ss: Seconds (00-59)
 *   - SSS: Milliseconds (000-999)
 * @returns {string} The formatted date string. Returns an empty string if the input is invalid or null.
 *   Returns "Invalid Date" if the input cannot be parsed into a valid date.
 */
const formatDate = (dateInput, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!dateInput) return '';

  const parseDate = (input) => {
    if (typeof input === 'string') {
      const parsedDate = Date.parse(input);
      if (!isNaN(parsedDate)) return new Date(parsedDate);
    } else if (input instanceof Date) {
      return input;
    }
    return null;
  };

  const date = parseDate(dateInput);
  if (!date) return 'Invalid Date';

  const pad = (num) => String(num).padStart(2, '0');
  const tokens = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    SSS: pad(date.getMilliseconds()),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (match) => tokens[match]);
}

export default formatDate