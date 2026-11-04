// The site's name, description and opening hours as the dashboard sets them (Settings > General), per language.
// The visitor sees the Arabic text on the Arabic site and the English text on the English site; a language
// that was left empty falls back to the other one instead of showing nothing.

export const DEFAULT_SITE_NAME = { ar: 'ماسترجاز | Mastergas', en: 'Mastergas' };

const ARABIC = /[؀-ۿ]/;
const LEGACY_BRAND = /iris/i; // the old demo brand some databases still carry

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const langOf = (lang) => (lang === 'en' ? 'en' : 'ar');
const otherLang = (lang) => (langOf(lang) === 'ar' ? 'en' : 'ar');

/** A value stored as plain text or as {"ar": "...", "en": "..."} JSON, in the given language. */
const localizedValue = (value, lang) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return text(value[lang]) || text(value[otherLang(lang)]);
  const raw = text(value);
  if (raw.startsWith('{')) {
    try { return localizedValue(JSON.parse(raw), lang); } catch { /* plain text that starts with a brace */ }
  }
  return raw;
};

/** The name shown in the browser tab: site_name_ar / site_name_en, then the older single site_name. */
export const siteNameFor = (settings, lang) => {
  const l = langOf(lang);
  const own = text(settings?.[`site_name_${l}`]);
  if (own && !LEGACY_BRAND.test(own)) return own;
  // The older single "site_name" belongs to the language it is written in.
  const legacy = text(settings?.site_name) || text(settings?.site_title);
  if (legacy && !LEGACY_BRAND.test(legacy) && ARABIC.test(legacy) === (l === 'ar')) return legacy;
  const other = text(settings?.[`site_name_${otherLang(l)}`]);
  if (other && !LEGACY_BRAND.test(other)) return other;
  return DEFAULT_SITE_NAME[l];
};

/** The footer description: site_description_ar / site_description_en, then a single site_description. */
export const siteDescriptionFor = (settings, lang) => {
  const l = langOf(lang);
  return text(settings?.[`site_description_${l}`])
    || localizedValue(settings?.site_description, l)
    || text(settings?.[`site_description_${otherLang(l)}`]);
};

/** Opening-hours lines in order (working days, then Friday). Empty fields are skipped. */
export const workingHoursFor = (settings, lang) => {
  const l = langOf(lang);
  const o = otherLang(l);
  const line = (key) => text(settings?.[`${key}_${l}`]) || text(settings?.[`${key}_${o}`]);
  return [line('working_hours'), line('friday_hours')].filter(Boolean);
};
