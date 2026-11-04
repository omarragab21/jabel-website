// The store's offers (العروض) are the dashboard's discounts: GET /v1/site/discounts and /v1/site/discounts/{id}.
// A discount is a percentage or a fixed amount off chosen products, between two dates. The server applies it to
// the products' prices (`final_price`, `has_discount`), so the site only lists the offers and their products.
import { normalizeSiteProduct } from '../../services/siteDataMappers.js';
import { visibleProducts } from '../../utils/catalogVisibility.js';

const pickText = (translations, lang, field, fallback) => {
  const value = translations?.[lang]?.[field];
  return typeof value === 'string' && value.trim() ? value : (fallback || '');
};

const productList = (value) => {
  const list = Array.isArray(value) ? value : (Array.isArray(value?.data) ? value.data : []);
  return visibleProducts(list.map(normalizeSiteProduct));
};

/** One discount from the API, in the shape the offers page and the home section read. */
export const normalizeSiteDiscount = (raw = {}) => {
  const translations = raw.translations || {};
  const value = Number(raw.discount ?? raw.value);
  return {
    id: raw.id,
    name: raw.name || '',
    name_i18n: { ar: pickText(translations, 'ar', 'name', raw.name), en: pickText(translations, 'en', 'name', raw.name) },
    description: raw.description || '',
    description_i18n: { ar: pickText(translations, 'ar', 'description', raw.description), en: pickText(translations, 'en', 'description', raw.description) },
    type: raw.discount_type === 'fixed' ? 'fixed' : 'percentage',
    value: Number.isFinite(value) && value > 0 ? value : 0,
    is_active: raw.is_active !== false && raw.is_active !== 0,
    is_valid_now: raw.is_valid_now,
    start_date: raw.start_date || null,
    end_date: raw.end_date || null,
    image: raw.image_url || raw.image || null,
    products_count: Number(raw.products_count) || 0,
    products: productList(raw.products),
  };
};

const time = (value) => {
  const stamp = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(stamp) ? stamp : null;
};

/** An offer customers can use now: active, and inside its dates (the server's own check wins when it says no). */
export const isDiscountRunning = (discount, now = Date.now()) => {
  if (!discount || !discount.is_active || discount.is_valid_now === false) return false;
  const start = time(discount.start_date);
  const end = time(discount.end_date);
  if (start !== null && now < start) return false;
  if (end !== null && now > end) return false;
  return true;
};

/** "20% OFF" / "100 JOD off", in the visitor's language. */
export const discountBadge = (discount, lang = 'ar') => {
  const ar = lang !== 'en';
  const amount = Number(discount?.value) || 0;
  if (amount <= 0) return ar ? 'عرض خاص' : 'Special Offer';
  const shown = amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (discount.type === 'fixed') return ar ? `خصم ${shown} د.أ` : `${shown} JOD off`;
  return ar ? `خصم ${shown}%` : `${shown}% OFF`;
};
