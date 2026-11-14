import { countries, findCountryByCode } from '../data/countries';

/** The country preselected in every phone field (Jordan); customers can pick another one from the list. */
export const DEFAULT_PHONE_COUNTRY = 'JO';

const dialDigits = (c) => c.dialCode.replace('+', '');

/** Splits a stored phone ("+9627…", "009627…", "07…") into { country, national }. */
export const splitPhone = (phone, fallbackCountry = DEFAULT_PHONE_COUNTRY) => {
  const fallback = findCountryByCode(fallbackCountry);
  const raw = String(phone || '').trim();
  let digits = raw.replace(/\D/g, '');
  if (!digits) return { country: fallback.code, national: '' };

  const isInternational = raw.startsWith('+') || digits.startsWith('00');
  if (digits.startsWith('00')) digits = digits.slice(2);

  const matches = (c) => digits.startsWith(dialDigits(c)) && digits.length > dialDigits(c).length;
  const looksInternational = isInternational || (matches(fallback) && digits.length >= dialDigits(fallback).length + 7);
  if (!looksInternational) return { country: fallback.code, national: digits.replace(/^0+/, '') };

  const candidates = countries.filter(matches).sort((a, b) => dialDigits(b).length - dialDigits(a).length);
  const match = (matches(fallback) ? fallback : candidates[0]) || fallback;
  return { country: match.code, national: digits.slice(dialDigits(match).length) };
};

/** "+<dial code><national number>" with any leading trunk zero removed. */
export const joinPhone = (countryCode, national) => {
  const country = findCountryByCode(countryCode);
  const dial = dialDigits(country);
  let digits = String(national || '').replace(/\D/g, '');
  if (digits.startsWith('00' + dial)) digits = digits.slice(2 + dial.length);
  else if (digits.startsWith(dial) && digits.length > dial.length + 6) digits = digits.slice(dial.length);
  return country.dialCode + digits.replace(/^0+/, '');
};
