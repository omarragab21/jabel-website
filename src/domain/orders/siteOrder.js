import { pickText } from '../../utils/localeText.js';
import { fitOrderNotes } from '../order/orderOptions.js';

const NOTES_LIMIT = 1000;
const PAYMENT_METHODS = { cod: 'cash_on_delivery', cash: 'cash_on_delivery', cash_on_delivery: 'cash_on_delivery', card: 'credit_card', credit_card: 'credit_card' };

// Migrate carts created by the previous storefront snapshot. New carts keep
// the product ids returned by the Site catalog unchanged.
export const TIJARA_PRODUCT_IDS = Object.freeze({ 25: 11, 26: 12, 27: 13, 28: 14, 30: 16 });
const normalizeProductId = (id) => TIJARA_PRODUCT_IDS[id] ?? id;

export const toSiteOrderPayload = (order = {}) => {
  const method = PAYMENT_METHODS[String(order.payment_method || '').toLowerCase()];
  if (!method) throw new Error(pickText('طريقة الدفع غير مدعومة حالياً (المحفظة الإلكترونية غير متاحة في هذا النوع من الطلبات)', 'This payment method is not supported at the moment (the e-wallet is not available for this order type)'));
  if (!Array.isArray(order.items) || order.items.length === 0) throw new Error(pickText('السلة فارغة', 'The cart is empty'));

  const code = order.coupon_code ? String(order.coupon_code).trim() : '';
  // The checkout view prepends "Coupon: CODE. " to the notes; the API has a coupon_code field for that.
  // The chosen-options block at the end is kept whole (see domain/order/orderOptions.js).
  const notes = fitOrderNotes(String(order.notes || '').replace(/^Coupon: [^.]*\.\s*/, ''), NOTES_LIMIT);

  const consolidatedItems = new Map();
  for (const item of order.items) {
    const sourceProductId = Number(item.product_id ?? item.id);
    if (sourceProductId === 29) {
      throw new Error(pickText('المنتج 29 غير متاح في كتالوج Tijara', 'Product 29 is not available in the Tijara catalog'));
    }
    const productId = normalizeProductId(sourceProductId);
    const offerId = Number.isInteger(Number(item.offer_id)) && Number(item.offer_id) > 0
      ? Number(item.offer_id)
      : null;
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const key = `${productId}:${offerId ?? ''}`;
    const choices = Array.isArray(item.description?.choices) ? item.description.choices : [];
    const existing = consolidatedItems.get(key);
    if (existing) {
      existing.quantity += quantity;
      existing.description = { choices: [...existing.description.choices, ...choices] };
    } else {
      consolidatedItems.set(key, {
        product_id: productId,
        quantity,
        ...(offerId ? { offer_id: offerId } : {}),
        // The chosen options (see domain/order/orderOptions.js). The API requires `description` on every
        // item and rejects an empty one ({}, [], null), so an item without options sends { choices: [] }.
        description: { choices },
      });
    }
  }

  return {
    shipping_address: order.shipping_address,
    billing_address: order.billing_address || order.shipping_address,
    payment_method: method,
    ...(Number.isInteger(Number(order.offer_id)) && Number(order.offer_id) > 0
      ? { offer_id: Number(order.offer_id) }
      : {}),
    ...(code ? { coupon_code: code } : {}),
    ...(notes ? { notes } : {}),
    shipping_cost: Math.max(0, Number(order.shipping_cost) || 0),
    items: [...consolidatedItems.values()],
  };
};

const getSessionCustomer = () => {
  try {
    const raw =
      (typeof localStorage !== 'undefined' && localStorage.getItem('c_user')) ||
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('c_user'));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.user || parsed?.customer || parsed;
  } catch {
    return null;
  }
};

export const isOwnedByCurrentCustomer = (resource, currentUser = getSessionCustomer()) => {
  if (!resource || typeof resource !== 'object') return false;
  if (!currentUser || typeof currentUser !== 'object') return true;

  const currentUserId = currentUser.id ?? currentUser.user_id ?? currentUser.customer_id;
  const resourceOwnerId =
    resource.user_id ??
    resource.customer_id ??
    resource.user?.id ??
    resource.customer?.id ??
    resource.order?.user_id ??
    resource.order?.customer_id;

  if (currentUserId != null && resourceOwnerId != null) {
    return String(currentUserId).trim() === String(resourceOwnerId).trim();
  }

  const currentEmail = String(currentUser.email || '').trim().toLowerCase();
  const resourceEmail = String(
    resource.customer_email ||
    resource.email ||
    resource.user?.email ||
    resource.customer?.email ||
    ''
  ).trim().toLowerCase();

  if (currentEmail && resourceEmail && resourceEmail !== '—') {
    return currentEmail === resourceEmail;
  }

  return true;
};

export const money = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round((number + Number.EPSILON) * 100) / 100 : 0;
};

// `/storage/…` answers 403 on orders, `/public/storage/…` is the one that loads.
export const normalizeImageUrl = (url) => String(url ?? '').trim().replace(/^(https?:\/\/[^/]+)\/storage\//i, '$1/public/storage/');

const pad = (value) => String(value).padStart(2, '0');
const localDate = (iso) => {
  const date = iso ? new Date(iso) : null;
  if (!date || Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

// Lines bought through a bundle offer carry the product's list `unit_price` but a `total_price`
// that is its share of the offer price, so the customer-facing unit price is total / quantity.
const linePrice = (item) => {
  const quantity = Number(item.quantity) || 0;
  const unit = money(item.unit_price);
  const total = money(item.total_price);
  if (quantity > 0 && Math.abs(unit * quantity - total) > 0.02) return money(total / quantity);
  return unit;
};

const toItem = (item = {}) => ({
  id: item.id,
  product_id: item.product_id ?? item.product?.id,
  name: item.product?.name ?? '',
  quantity: Number(item.quantity) || 0,
  price: linePrice(item),
  total: money(item.total_price),
  image: normalizeImageUrl(item.product?.image_url),
  // Every option of the product; `description` (or, on older orders, the notes) says which ones were chosen.
  options: Array.isArray(item.product?.options) ? item.product.options : [],
  description: item.description && typeof item.description === 'object' ? item.description : null,
});

// Keeps the snake_case keys Profile/Invoice already read, plus the camelCase aliases.
// The API reports an offer order's `subtotal` at list prices while `discount`, tax and total are
// built from the offer price. The lines add up to the real subtotal, so prefer them when they
// are lower; coupon orders (lines == subtotal) and a corrected backend pass through unchanged.
const orderSubtotal = (order, items) => {
  const reported = money(order.subtotal);
  const lines = money(items.reduce((sum, item) => sum + item.total, 0));
  return lines > 0 && lines < reported - 0.01 ? lines : reported;
};

export const toSiteOrder = (raw) => {
  const order = raw || {};
  const items = Array.isArray(order.items) ? order.items.map(toItem) : [];
  const address = String(order.shipping_address || '').trim() || String(order.billing_address || '').trim();
  return {
    id: order.id,
    order_number: order.order_number ?? '',
    orderNumber: order.order_number ?? '',
    status: order.status ?? '',
    payment_status: order.payment_status ?? '',
    payment_method: order.payment_method ?? '',
    shipping_address: order.shipping_address ?? '',
    customerAddress: address,
    notes: order.notes ?? '',
    coupon_code: order.coupon_code ?? '',
    created_at: order.created_at ?? null,
    updated_at: order.updated_at ?? null,
    payment_time: order.payment_time ?? null,
    shipped_at: order.shipped_at ?? null,
    delivered_at: order.delivered_at ?? null,
    estimated_delivery: order.estimated_delivery ?? null,
    date: localDate(order.created_at),
    subtotal: orderSubtotal(order, items),
    discount: money(order.discount),
    shipping: money(order.shipping_cost),
    tax: money(order.tax_amount),
    total_amount: money(order.total_amount),
    total: money(order.total_amount),
    items,
  };
};

// The tax rate the server actually charged: it taxes (subtotal - discount), not a fixed 15%.
export const invoiceTaxRate = (order = {}) => {
  const base = money(order.subtotal) - money(order.discount);
  if (!(base > 0) || !(money(order.tax) > 0)) return 15;
  return Math.round((money(order.tax) / base) * 10000) / 100;
};

// Per line: its share of the discount, the tax on that, and the total with tax. The lines add up
// to the order's subtotal - discount + tax (within a cent of rounding).
export const invoiceLines = (order = {}) => {
  const rate = invoiceTaxRate(order);
  const subtotal = money(order.subtotal);
  const net = subtotal - money(order.discount);
  const share = subtotal > 0 ? Math.max(0, net) / subtotal : 1;
  return (order.items || order.products || []).map((item) => {
    const lineTotal = money((item.price ?? item.unit_price) * (Number(item.quantity) || 0));
    const lineNet = money(lineTotal * share);
    const tax = money(lineNet * rate / 100);
    return { tax, totalInclVat: money(lineNet + tax) };
  });
};
