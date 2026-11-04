// What the order summary (cart, checkout, order details) and the announcement bar show.
// A line that costs nothing is not worth a row: no "shipping 0", no "VAT 0", no "discount 0".
// The free-shipping banner needs a real threshold: 0 (or nothing) means there is no such offer, so no banner.

const toNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  // "1,250.00", "15.00 JOD" and "٠" style strings from the API: keep the digits, the sign and the dot.
  const cleaned = value.replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660)).replace(/[^\d.-]/g, '');
  return cleaned === '' ? NaN : Number(cleaned);
};

/** True when the amount is worth a row. Nothing / empty / 0 / 0.00 / 0.004 are not; unreadable text stays visible. */
export const hasAmount = (value) => {
  if (value === null || value === undefined || value === '') return false;
  const number = toNumber(value);
  if (Number.isNaN(number)) return typeof value === 'string' && value.trim() !== '';
  return Number.isFinite(number) && Math.round(number * 100) !== 0;
};

/** Which optional rows of the summary to show. */
export const summaryRows = ({ discount, tax, shipping } = {}) => ({
  discount: hasAmount(discount),
  vat: hasAmount(tax),
  shipping: hasAmount(shipping),
});

/** The free-shipping threshold when it is a real amount, otherwise 0 (= no free-shipping offer). */
export const freeShippingThreshold = (value) => {
  const number = toNumber(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
};

export const showFreeShippingBanner = (value) => freeShippingThreshold(value) > 0;
