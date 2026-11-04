// How a product's discount is shown. The discount itself comes from the API (an offer applied to the product):
// a percentage, or a fixed amount, which must not be shown as "-100%".

const amountText = (value, lang) => {
  const shown = (Number(value) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
  return lang === 'en' ? `${shown} SAR` : `${shown} ر.س`;
};

/** 'percentage' | 'fixed' | null (no discount). */
export const discountKind = (product) => {
  if (!product || !(Number(product.discount) > 0)) return null;
  return product.discount_info?.type === 'fixed' ? 'fixed' : 'percentage';
};

/** The badge on a product: "-20%" for a percentage, "-100 ر.س" / "-100 SAR" for a fixed amount; '' without one. */
export const discountBadgeText = (product, lang = 'ar') => {
  const kind = discountKind(product);
  if (!kind) return '';
  if (kind === 'fixed') {
    const text = `-${amountText(product.discount_info.amount_saved || product.discount_info.value, lang)}`;
    // Isolated left-to-right so the Arabic currency does not reorder the number inside a right-to-left page.
    return lang === 'en' ? text : `\u2066${text}\u2069`;
  }
  return `-${Math.round(Number(product.discount))}%`;
};

/** The saved amount of a fixed discount as a number text ("100"), for badges that draw the riyal sign themselves. */
export const fixedDiscountAmount = (product) => {
  if (discountKind(product) !== 'fixed') return '';
  const amount = Number(product.discount_info.amount_saved || product.discount_info.value) || 0;
  return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
};
