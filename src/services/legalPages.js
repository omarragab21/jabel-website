// Privacy policy and Terms & Conditions text. It is edited in the dashboard and stored in the site settings
// API under the key "legal_pages" ({ privacy: {...}, terms: {...} }), the same place as every other site setting.
import settingsService from './settingsService';
import { settingsToObject } from '../utils/siteSettings';

const str = (value) => (typeof value === 'string' ? value : '');

const cleanSection = (section) => ({
  title_ar: str(section?.title_ar).trim(),
  title_en: str(section?.title_en).trim(),
  text_ar: str(section?.text_ar).trim(),
  text_en: str(section?.text_en).trim(),
});

// The notice box at the top of the page (cookies notice on the privacy page, legal alert on the terms page).
// A box with no text in either language is simply not shown.
const cleanBanner = (banner) => ({
  title_ar: str(banner?.title_ar).trim(),
  title_en: str(banner?.title_en).trim(),
  text_ar: str(banner?.text_ar).trim(),
  text_en: str(banner?.text_en).trim(),
});

// What the box shows until the dashboard saves something else (same texts as the Figma design).
// Once the dashboard has saved the page, an emptied box stays empty and is removed from the page.
const DEFAULT_BANNERS = {
  privacy: {
    title_ar: 'ملفات تعريف الارتباط وتفضيلات التتبع',
    title_en: 'Cookies & Tracking Preferences',
    text_ar: 'نستخدم ملفات تعريف الارتباط لتحسين أداء التصفح وتقديم تجربة شخصية تليق باختياراتك.',
    text_en: 'We use cookies to improve browsing performance and offer a personalised experience that suits your choices.',
  },
  terms: {
    title_ar: 'تنبيه قانوني هام',
    title_en: 'Important legal notice',
    text_ar: 'تُعتبر هذه الشروط بمثابة اتفاقية قانونية ملزمة لجميع مستخدمي المنصة والمشترين من متجرنا.',
    text_en: 'These terms are a binding legal agreement for all platform users and buyers from our store.',
  },
};

export const emptyLegalPage = () => ({ updated_at: '', tagline_ar: '', tagline_en: '', banner: cleanBanner(), sections: [] });

const asObject = (value) => {
  if (typeof value === 'string') {
    try { return JSON.parse(value); } catch { return {}; }
  }
  return value && typeof value === 'object' ? value : {};
};

// The page `id` ("privacy" | "terms") out of the site settings object.
const legalPageFrom = (settings, id) => {
  const data = asObject(asObject(settings.legal_pages)[id]);
  const sections = (Array.isArray(data.sections) ? data.sections : [])
    .map((section, index) => ({ position: Number(section?.position) || index + 1, ...cleanSection(section) }))
    .sort((a, b) => a.position - b.position)
    .filter((s) => s.title_ar || s.title_en || s.text_ar || s.text_en);
  return {
    updated_at: /^\d{4}-\d{2}$/.test(str(data.updated_at)) ? data.updated_at : '',
    tagline_ar: str(data.tagline_ar),
    tagline_en: str(data.tagline_en),
    banner: data.banner === undefined ? { ...DEFAULT_BANNERS[id] } : cleanBanner(asObject(data.banner)),
    sections,
  };
};

/** The page `id` ("privacy" | "terms") from the site settings; empty while the API has none. */
export const loadLegalPage = async (id) => legalPageFrom(settingsToObject(await settingsService.getSettings()), id);

/** The page from fresh cached settings (renders at once, no skeleton), or null. */
export const peekLegalPage = (id) => {
  const cached = settingsService.peekSettings();
  return cached ? legalPageFrom(settingsToObject(cached), id) : null;
};

/** "2026-03" -> "مارس ٢٠٢٦" / "March 2026". */
export const formatLegalMonth = (value, lang) => {
  const [year, month] = String(value || '').split('-').map(Number);
  if (!year || !month) return '';
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-arab' : 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
};

/** Arabic-Indic digits for Arabic section numbers. */
export const formatSectionNumber = (n, lang) => (lang === 'ar' ? new Intl.NumberFormat('ar-EG-u-nu-arab', { useGrouping: false }).format(n) : String(n));
