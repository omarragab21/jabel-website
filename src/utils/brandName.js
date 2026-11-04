// The store's name is Jabel. Content in the backend (settings, about page, products, ...) can still
// carry the old "Mastergas" name; every API response passes through here before the page sees it.
// Links (URLs, emails) are left alone so they keep pointing where they point.

const OLD_NAME_EN = /master\s?gas/gi;
const OLD_NAME_AR = /ماستر\s?[جغ]از/g;
const LINK = /^(https?:\/\/|www\.|mailto:|\/)|^[^\s@]+@[^\s@]+$/i;

export const replaceBrandName = (text) => {
  if (typeof text !== 'string' || LINK.test(text.trim())) return text;
  return text
    .replace(OLD_NAME_EN, (match) => (match === match.toUpperCase() ? 'JABEL' : 'Jabel'))
    .replace(OLD_NAME_AR, 'جبل');
};

export const replaceBrandNameDeep = (value) => {
  if (typeof value === 'string') return replaceBrandName(value);
  if (Array.isArray(value)) return value.map(replaceBrandNameDeep);
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceBrandNameDeep(item)]));
  }
  return value;
};
