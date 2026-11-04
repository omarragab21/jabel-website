import { localizedText } from '../utils/productAttributes.js';
import { isTestCategory, isTestProduct } from '../utils/catalogVisibility.js';

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const textList = (value) => asArray(value)
  .map((item) => String(localizedText(item) ?? '').trim())
  .filter(Boolean);

const localizedPair = (translations, field, fallback = '') => ({
  ar: translations?.ar?.[field] ?? fallback,
  en: translations?.en?.[field] ?? fallback,
});

const normalizeId = (value) => {
  if (value === null || value === undefined || value === '') return value;
  const text = String(value).trim();
  const number = Number(text);
  return Number.isFinite(number) && text === String(number) ? number : value;
};

export const normalizeImage = (image) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.image_url || image.url || image.image || image.path || '';
};

export const normalizeSiteCategory = (category = {}) => {
  const translations = category.translations || {};
  const nameI18n = localizedPair(translations, 'name', category.name || '');
  return {
    ...category,
    id: normalizeId(category.id ?? category.category_id),
    name_i18n: nameI18n,
    name_ar: nameI18n.ar,
    name_en: nameI18n.en,
    image: normalizeImage(category.image_url || category.image),
    products_count: Number(category.products_count ?? category.products_count_total ?? 0),
  };
};

export { isTestCategory, isTestProduct };

export const normalizeSiteProduct = (product = {}) => {
  const translations = product.translations || {};
  const arabic = translations.ar || {};
  const english = translations.en || {};
  const nameI18n = {
    ar: translations?.ar?.name ?? product.name_ar ?? product.name ?? '',
    en: translations?.en?.name ?? product.name_en ?? product.name ?? '',
  };
  const descriptionAr = textList(arabic.product_description ?? product.product_description);
  const descriptionEn = textList(english.product_description ?? product.product_description);
  const featuresAr = textList(arabic.key_features ?? product.key_features);
  const featuresEn = textList(english.key_features ?? product.key_features);
  const tipsAr = textList(arabic.tips ?? product.tips_ar ?? product.tips_i18n?.ar ?? product.tips);
  const tipsEn = textList(english.tips ?? product.tips_en ?? product.tips_i18n?.en ?? product.tips);
  const shippingAr = textList(arabic.shipping_info ?? product.shipping_info_ar ?? product.shipping_info_i18n?.ar ?? product.shipping_info);
  const shippingEn = textList(english.shipping_info ?? product.shipping_info_en ?? product.shipping_info_i18n?.en ?? product.shipping_info);
  const images = asArray(product.images).map(normalizeImage).filter(Boolean);
  const originalPrice = Number(product.price) || 0;
  // A product is only discounted by an offer (GET /v1/site/discounts), which the API reports as the product's
  // `discount` object ({ type, value, amount_saved }). A discount set on the product itself is not shown.
  const offerInfo = product.discount && typeof product.discount === 'object' ? product.discount : null;
  const offerPrice = Number(product.final_price ?? product.discount_price);
  const finalPrice = offerInfo && Number.isFinite(offerPrice) && offerPrice > 0 && offerPrice < originalPrice ? offerPrice : originalPrice;
  const saved = originalPrice - finalPrice;
  const discountPercentage = saved > 0 && originalPrice > 0 ? (saved / originalPrice) * 100 : 0;
  const discountInfo = saved > 0
    ? {
      id: offerInfo.id,
      type: offerInfo.type === 'fixed' ? 'fixed' : 'percentage',
      value: Number(offerInfo.value) || (offerInfo.type === 'fixed' ? saved : discountPercentage),
      amount_saved: Number(offerInfo.amount_saved) || saved,
    }
    : null;

  const rawStock = product.number ?? product.stock ?? product.quantity;
  const stockCount = rawStock === undefined || rawStock === null || rawStock === '' || !Number.isFinite(Number(rawStock))
    ? undefined
    : Number(rawStock);

  return {
    ...product,
    id: normalizeId(product.id),
    category_id: normalizeId(product.category_id ?? product.category?.id),
    name_i18n: nameI18n,
    name_ar: nameI18n.ar,
    name_en: nameI18n.en,
    description_i18n: {
      ar: descriptionAr.join('\n'),
      en: descriptionEn.join('\n'),
    },
    description_ar: descriptionAr.join('\n'),
    description_en: descriptionEn.join('\n'),
    description: descriptionAr.join('\n'),
    features_i18n: { ar: featuresAr, en: featuresEn },
    features: featuresAr,
    tips_i18n: { ar: tipsAr, en: tipsEn },
    tips: tipsAr,
    shipping_info_i18n: { ar: shippingAr, en: shippingEn },
    shipping_info: shippingAr,
    image: images[0] || normalizeImage(product.image),
    images,
    price: originalPrice,
    sale_price: finalPrice,
    discount: discountPercentage,
    // What kind of discount it is, so a fixed amount is shown as an amount and not as a percentage.
    discount_info: discountInfo,
    has_discount: saved > 0,
    is_new: Boolean(product.is_new || product.is_new_arrival),
    // The API stores inventory in `number`; expose it under the names the storefront reads.
    stock: stockCount,
    quantity: stockCount,
    category: product.category ? normalizeSiteCategory(product.category) : product.category,
  };
};

export const normalizeSiteSlider = (slider = {}) => {
  const translations = slider.translations || {};
  const titleI18n = localizedPair(translations, 'title', slider.title || '');
  const descriptionI18n = localizedPair(translations, 'description', slider.description || '');
  return {
    ...slider,
    title_i18n: titleI18n,
    description_i18n: descriptionI18n,
    image: normalizeImage(slider.image),
    is_active: slider.is_active ?? slider.status ?? true,
  };
};

export const normalizeSiteReview = (review = {}) => ({
  ...review,
  id: normalizeId(review.id),
  product_id: normalizeId(review.product_id ?? review.product?.id),
  user_name: review.user_name || review.customer?.name || review.user?.name || review.name || '',
  rating: Number(review.rating) || 0,
  comment: review.comment || review.body || '',
});

export const normalizeSiteOffer = (offer = {}) => {
  const items = Array.isArray(offer.items) ? offer.items : [];
  const selectedProducts = items
    .map((item) => normalizeId(item.product_id ?? item.product?.id))
    .filter(Boolean);
  const name = offer.name || '';
  const description = offer.description || '';
  return {
    ...offer,
    id: normalizeId(offer.id),
    name,
    name_i18n: { ar: offer.name_ar || name, en: offer.name_en || name },
    description_i18n: { ar: offer.description_ar || description, en: offer.description_en || description },
    selected_products: selectedProducts,
    // Tijara bundle offers arrive with item lines rather than an explicit
    // applies_to field. Treat those lines as the product scope on the store.
    applies_to: offer.applies_to || (selectedProducts.length ? 'products' : 'all'),
    items,
    is_active: offer.is_active ?? offer.is_valid_now ?? true,
    type: 'bundle',
    value: Number(offer.bundle_price) || 0,
    image: normalizeImage(offer.image),
  };
};
