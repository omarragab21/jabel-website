// Detects changes in the signed-in customer's orders (status changes and orders placed elsewhere).
// The first check only records the current statuses; it never announces existing orders.

export const SEEN_KEY = 'order_status_seen';

const STATUS_TEXT = {
  pending: ['قيد المراجعة', 'Under review'],
  paid_confirmed: ['تم تأكيد الطلب', 'Order confirmed'],
  processing: ['قيد التجهيز', 'Being prepared'],
  shipped: ['تم الشحن', 'Shipped'],
  in_transit: ['الطلب في الطريق', 'On the way'],
  delivered: ['تم التسليم', 'Delivered'],
  cancelled: ['تم إلغاء الطلب', 'Cancelled'],
};

export const statusText = (status, lang = 'ar') => {
  const pair = STATUS_TEXT[String(status || '').toLowerCase()];
  return pair ? pair[lang === 'en' ? 1 : 0] : String(status || '');
};

export const snapshotOf = (orders = []) => Object.fromEntries(
  orders.filter((order) => order?.id !== undefined && order?.id !== null).map((order) => [String(order.id), String(order.status || '')]),
);

/** { snapshot, changes: [{ order, kind: 'placed'|'status', from }] } — changes is empty without a previous snapshot. */
export const findOrderChanges = (orders = [], previous = null) => {
  const snapshot = snapshotOf(orders);
  if (!previous || typeof previous !== 'object') return { snapshot, changes: [] };
  const changes = [];
  orders.forEach((order) => {
    const before = previous[String(order.id)];
    if (before === undefined) changes.push({ order, kind: 'placed', from: '' });
    else if (before !== String(order.status || '')) changes.push({ order, kind: 'status', from: before });
  });
  return { snapshot, changes };
};

export const toOrderToast = ({ order, kind }, lang = 'ar') => {
  const number = order.order_number || order.orderNumber || `#${order.id}`;
  const en = lang === 'en';
  if (kind === 'placed') {
    return { title: en ? 'Order received' : 'تم استلام طلبك', body: en ? `Order ${number} was received and is ${statusText(order.status, 'en')}.` : `استُلم الطلب ${number} وحالته: ${statusText(order.status, 'ar')}.`, link: '/profile?tab=orders' };
  }
  return { title: en ? `Update on order ${number}` : `تحديث على الطلب ${number}`, body: en ? `The order is now: ${statusText(order.status, 'en')}.` : `أصبحت حالة الطلب: ${statusText(order.status, 'ar')}.`, link: '/profile?tab=orders' };
};
