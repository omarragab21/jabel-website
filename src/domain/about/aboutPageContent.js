// The fixed texts of the About Us page, editable from the dashboard (Settings > About Us).
// Every text is stored in the settings API as `<key>_ar` / `<key>_en`. The values below are
// what the page shows (nothing). A field that is empty or missing hides that part of the page.
// The dashboard (admin/src/domain/aboutPageContent.js) keeps the same keys and defaults.
// No built-in texts: the page shows exactly what the dashboard saved in the settings API.
export const ABOUT_PAGE_DEFAULTS = Object.freeze({});

/** The text for `key` in `lang` ('ar' | 'en') exactly as saved; an empty or missing field is '' and the page removes that part. */
export const aboutText = (settings, key, lang) => {
  const suffix = lang === 'ar' ? 'ar' : 'en';
  const field = `${key}_${suffix}`;
  if (settings && Object.hasOwn(settings, field)) {
    const saved = settings[field];
    return typeof saved === 'string' ? saved.trim() : '';
  }
  return ABOUT_PAGE_DEFAULTS[key]?.[suffix] ?? '';
};
