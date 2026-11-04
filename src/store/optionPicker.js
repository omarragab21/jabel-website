import { reactive } from 'vue';
import { cartState } from './cart';
import i18n from '../i18n';
import { productService } from '../modules/product/services/productService';
import {
  buildSelectedOptions,
  completeOptionSelection,
  extractOptionGroups,
  withBilingualLabels,
} from '../domain/product/productOptions';

// "Add to cart" from a product card (home, products, offers, wishlist, related).
// A product with something to choose (a colour, or a group with several options)
// opens a dialog to pick its options first, like the product page; anything else
// is added at once. Groups with a single option are still sent with the line.

export const optionPicker = reactive({
  open: false,
  product: null,
  quantity: 1,
  groups: [],
  selection: {},
});

const langOf = () => (i18n.global.locale.value === 'en' ? 'en' : 'ar');

/** Groups the customer actually chooses from (the rest are fixed specifications). */
export const choosableGroups = (groups) => groups.filter((group) => group.isColor || group.options.length > 1);

const withOptions = (product, groups, selection) => ({
  ...product,
  selectedOptions: buildSelectedOptions(groups, selection),
});

export const addProductToCart = async (product, quantity = 1) => {
  if (!product) return;
  let source = product;
  // Wishlist entries and older snapshots may lack the options; the product endpoint has them.
  if (!source.attributes) {
    try {
      const full = await productService.getProductById(product.id);
      if (full?.attributes) source = { ...product, attributes: full.attributes };
    } catch {
      // Added without options, as before.
    }
  }

  const lang = langOf();
  const groups = withBilingualLabels(extractOptionGroups(source), null, lang);
  if (!groups.length) {
    cartState.addToCart(product, quantity);
    return;
  }

  const selection = completeOptionSelection(groups);
  if (!choosableGroups(groups).length) {
    cartState.addToCart(withOptions(product, groups, selection), quantity, selection);
    return;
  }

  Object.assign(optionPicker, { open: true, product, quantity, groups, selection });

  // The other language's labels, so the cart line reads right after switching.
  try {
    const other = await productService.getProductById(product.id, { lang: lang === 'ar' ? 'en' : 'ar' });
    if (optionPicker.product !== product) return;
    optionPicker.groups = withBilingualLabels(extractOptionGroups(source), extractOptionGroups(other), lang);
  } catch {
    // Labels stay in the current language only.
  }
};

export const chooseOption = (groupKey, optionId) => {
  optionPicker.selection = { ...optionPicker.selection, [groupKey]: optionId };
};

export const confirmOptions = () => {
  const { product, quantity, groups } = optionPicker;
  if (!product) return;
  const selection = completeOptionSelection(groups, optionPicker.selection);
  closeOptionPicker();
  cartState.addToCart(withOptions(product, groups, selection), quantity, selection);
};

export const closeOptionPicker = () => {
  Object.assign(optionPicker, { open: false, product: null, groups: [], selection: {} });
};
