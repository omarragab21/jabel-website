// A product that belongs to a bundle (باقة) shows the bundle's discount: its old price, the price it
// costs inside the bundle and the bundle's name. Both bundle kinds (a fixed percentage or a fixed price)
// come down to the same thing: the bundle price over the products' list prices.
import { isOfferActive } from './offerRules.js';

const listPrice = (item) => Number(item?.product?.price) || 0;

// The products' list prices times quantity: what the bundle costs without the deal.
export const bundleOriginalTotal = (offer) => (Array.isArray(offer?.items) ? offer.items : [])
  .reduce((sum, item) => sum + listPrice(item) * Math.max(1, Number(item.quantity) || 1), 0);

// The share of the list price the customer pays inside the bundle (0.9 = 10% off), or null.
export const bundleRatio = (offer) => {
  const original = bundleOriginalTotal(offer);
  const price = Number(offer?.bundle_price ?? offer?.value) || 0;
  if (!(original > 0) || !(price > 0) || price >= original) return null;
  return price / original;
};

const containsProduct = (offer, productId) => (Array.isArray(offer?.items) ? offer.items : [])
  .some((item) => String(item.product_id ?? item.product?.id) === String(productId));

// The best running bundle for this product: { offer, percent, price, oldPrice }, or null.
export const bundleDealForProduct = (product, offers = []) => {
  const oldPrice = Number(product?.price) || 0;
  if (!product || !(oldPrice > 0)) return null;
  let best = null;
  for (const offer of offers || []) {
    if (!isOfferActive(offer) || !containsProduct(offer, product.id)) continue;
    const ratio = bundleRatio(offer);
    if (ratio === null || (best && ratio >= best.ratio)) continue;
    best = { offer, ratio };
  }
  if (!best) return null;
  return {
    offer: best.offer,
    percent: Math.round((1 - best.ratio) * 100),
    price: Math.round(oldPrice * best.ratio * 100) / 100,
    oldPrice,
  };
};
