// Homepage product lists, edited from the dashboard (Settings > Homepage) and
// stored in the settings API under one key-value row: `home_product_sections`.
//
// Each list: { id, title_ar, title_en, source, category_id, limit, is_active }
//   source = 'featured'      → the API's featured products
//          = 'new_arrivals'  → the API's newest products
//          = 'category'      → products of `category_id`; «عرض الكل» opens that category
export const HOME_SECTIONS_KEY = 'home_product_sections';

export const SECTION_SOURCES = ['featured', 'new_arrivals', 'category'];

// With nothing saved yet the homepage keeps its two original lists.
export const DEFAULT_HOME_SECTIONS = Object.freeze([
  { id: 'featured', title_ar: 'منتجات مميزة', title_en: 'Featured Products', source: 'featured', category_id: null, limit: 4, is_active: true },
  { id: 'new_arrivals', title_ar: 'وصل حديثاً', title_en: 'New Arrivals', source: 'new_arrivals', category_id: null, limit: 4, is_active: true },
]);

const parseValue = (value) => {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return null; }
};

const toLimit = (value) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 24) : 4;
};

export const normalizeHomeSection = (section, index = 0) => {
  const source = SECTION_SOURCES.includes(section?.source) ? section.source : 'category';
  const categoryId = section?.category_id ?? null;
  return {
    id: String(section?.id || `section-${index + 1}`),
    title_ar: String(section?.title_ar || '').trim(),
    title_en: String(section?.title_en || '').trim(),
    source,
    category_id: source === 'category' && categoryId !== null && categoryId !== '' ? String(categoryId) : null,
    limit: toLimit(section?.limit),
    is_active: section?.is_active !== false && section?.is_active !== 0 && section?.is_active !== '0',
  };
};

// The saved lists, in order; null when the key has never been saved.
export const parseHomeSections = (value) => {
  const parsed = parseValue(value);
  if (!Array.isArray(parsed)) return null;
  return parsed.map(normalizeHomeSection);
};

// What the homepage renders: the saved active lists (a category list needs its category).
export const homeSectionsToRender = (value) => {
  const saved = parseHomeSections(value);
  // An empty or never-saved list falls back to the two original lists (the dashboard shows the same).
  const sections = saved?.length ? saved : DEFAULT_HOME_SECTIONS.map(normalizeHomeSection);
  return sections.filter((section) => section.is_active && (section.source !== 'category' || section.category_id));
};

export const sectionViewAllLink = (section) => {
  if (section.source === 'category') return `/products?category_id=${encodeURIComponent(section.category_id)}`;
  if (section.source === 'new_arrivals') return '/products?sort_by=created_at&sort_direction=desc';
  return '/products';
};
