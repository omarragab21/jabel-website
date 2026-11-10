// The news bar under the header: items saved in Settings > News bar (key `news_bar_items`).
// Each item: { text_ar, text_en, is_active }. Nothing saved (or an empty list) = no bar.
export const NEWS_BAR_KEY = 'news_bar_items';

// No built-in news: until the settings API has a list, the website shows no news bar.
export const DEFAULT_NEWS_ITEMS = [];

const parse = (value) => {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return null; }
};

/** The texts to show in `lang` ('ar' | 'en'); an item missing that language falls back to the other one. */
export const newsBarTexts = (saved, lang) => {
  const list = parse(saved);
  const items = Array.isArray(list) ? list : DEFAULT_NEWS_ITEMS;
  const [first, second] = lang === 'ar' ? ['text_ar', 'text_en'] : ['text_en', 'text_ar'];
  return items
    .filter((item) => item && item.is_active !== false && item.is_active !== 0 && item.is_active !== '0')
    .map((item) => String(item[first] || item[second] || '').trim())
    .filter(Boolean);
};
