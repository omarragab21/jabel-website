import { ref } from 'vue';
import { isOfferActive, isOfferDateValid } from '../../../domain/product/offerRules';
import { bundleDealForProduct } from '../../../domain/product/bundleDeal';

const offers = ref([]);
const loading = ref(false);
let lastOffersSource = 'empty';
let loadedOnce = false;

export { isOfferActive, isOfferDateValid };

export function useOffers() {
  // Bundles no longer price products anywhere on the site: a product's discount comes only from the offers
  // (discounts) the API applies to it (`final_price`, `discount`). So there is nothing to load here, and the
  // bundle-price code that reads this list (cards, product page, cart, checkout) stays out of the way.
  const fetchOffers = async () => {
    offers.value = [];
    loadedOnce = true;
    return offers.value;
  };

  // Loads the bundles once for pages that only display them (product cards anywhere on the site).
  const ensureOffers = () => (loadedOnce ? Promise.resolve(offers.value) : fetchOffers().catch(() => offers.value));

  // The bundle discount a product shows (old price, price inside the bundle, bundle name), or null.
  const getBundleDeal = (product) => bundleDealForProduct(product, offers.value);

  const getActiveOfferForProduct = (product) => {
    if (!product || !offers.value.length) return null;
    return offers.value.find((offer) => {
      if (!isOfferActive(offer)) return false;
      if (offer.applies_to === 'all' || !offer.applies_to) return true;
      if (offer.applies_to === 'products') {
        const ids = offer.selected_products || offer.applied_ids || [];
        return Array.isArray(ids) && ids.some((id) => Number(id) === Number(product.id));
      }
      if (offer.applies_to === 'categories') {
        const ids = offer.selected_categories || offer.applied_ids || [];
        const categoryId = Number(product.category_id || product.category?.id);
        return Array.isArray(ids) && ids.some((id) => Number(id) === categoryId);
      }
      return false;
    }) || null;
  };

  const calculateDiscountFromOffer = (product, offer) => {
    if (!offer) return 0;
    // A bundle price belongs to the group, not to each product card. Do not
    // render it as a per-product percentage (which can produce nonsense such
    // as -999% when the bundle price is larger than one line item).
    if (offer.type === 'bundle') return 0;
    if (offer.type === 'percentage' || offer.discount_type === 'percentage') {
      return Number(offer.value ?? offer.discount_value ?? offer.discount ?? 0) || 0;
    }
    const price = Number(product?.price) || 0;
    const fixed = Number(offer.value ?? offer.discount_value ?? offer.discount ?? 0) || 0;
    return price > 0 ? (fixed / price) * 100 : 0;
  };

  const calculatePriceWithOffer = (product, offer) => {
    const price = Number(product?.price) || 0;
    if (offer?.type === 'bundle') {
      const salePrice = Number(product?.sale_price) || 0;
      return salePrice > 0 && salePrice < price ? salePrice : price;
    }
    return price * (1 - calculateDiscountFromOffer(product, offer) / 100);
  };

  return {
    offers,
    loading,
    fetchOffers,
    ensureOffers,
    getBundleDeal,
    getActiveOfferForProduct,
    calculateDiscountFromOffer,
    calculatePriceWithOffer,
    get offersSource() { return lastOffersSource; },
  };
}
