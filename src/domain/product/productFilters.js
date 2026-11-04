// The "additional options" filters of the products and offers pages
// (In Stock, Offers & Discounts). Both pages use these, so a
// product is judged the same way everywhere, from the product's own data.

/** In stock when its quantity is above zero; a product with no quantity is not hidden. */
export const isInStock = (product) => {
  const quantity = product?.stock ?? product?.quantity;
  if (quantity === undefined || quantity === null || quantity === '') return true;
  const count = Number(quantity);
  return !Number.isFinite(count) || count > 0;
};

const asId = (value) => String(value ?? '');

/** Is the product part of an active offer (a bundle's products, a category, or everything)? */
export const isInOffer = (product, offers = []) => offers.some((offer) => {
  if (offer.applies_to === 'categories') {
    return (offer.selected_categories || []).map(asId).includes(asId(product.category_id));
  }
  if (offer.applies_to === 'products') {
    return (offer.selected_products || []).map(asId).includes(asId(product.id));
  }
  return offer.applies_to === 'all';
});

/** A real price reduction: the final price is below the list price. */
export const hasPriceDiscount = (product) => {
  const price = Number(product?.price) || 0;
  const sale = Number(product?.sale_price) || 0;
  if (price > 0 && sale > 0 && sale < price) return true;
  return Boolean(product?.has_discount) && (Number(product?.discount) || 0) > 0;
};

/** On sale: it has a price reduction, or it is part of an active offer. */
export const isDiscounted = (product, offers = []) => hasPriceDiscount(product) || isInOffer(product, offers);

/**
 * @param {object} filters { inStock, discounted } (truthy = on)
 * @param {object[]} offers active offers, used by the "discounted" filter
 */
export const matchesExtraFilters = (product, filters = {}, offers = []) => {
  if (filters.inStock && !isInStock(product)) return false;
  if (filters.discounted && !isDiscounted(product, offers)) return false;
  return true;
};
