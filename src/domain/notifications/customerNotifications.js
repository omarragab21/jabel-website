// The customer's notification history (الإشعارات in the profile).
//
// The API has no notifications endpoint, so the history is built from data the site already reads:
// - the customer's own orders: placed, shipped, delivered, cancelled (with the reason) and the current status;
// - the public feed in Firestore (new products and offers), passed in by the caller.
// Read state is per browser (localStorage), shared with the live feed (firebase/notificationsStore.js).
import { parseCancelReason } from '../order/orderOptions.js';
import { statusText } from '../orders/orderStatusAlerts.js';

const READ_KEY = 'notifications_read';
const MAX_ITEMS = 50;

const timeOf = (value) => {
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(time) ? time : null;
};

/** Notifications for each event of each order, newest first. */
export const orderNotifications = (orders = [], lang = 'ar') => {
  const en = lang === 'en';
  const list = [];
  orders.forEach((order) => {
    if (!order || order.id === undefined || order.id === null) return;
    const number = order.order_number || order.orderNumber || `#${order.id}`;
    const status = String(order.status || '').toLowerCase();
    const add = (event, at, title) => {
      const time = timeOf(at);
      if (time !== null) list.push({ id: `order-${order.id}-${event}`, title, created_at: new Date(time).toISOString(), at: time, link: '/profile?tab=orders' });
    };

    add('placed', order.created_at, en ? `Your order ${number} was received` : `تم استلام طلبك ${number}`);
    if (order.shipped_at) add('shipped', order.shipped_at, en ? `Your order ${number} has shipped` : `تم شحن طلبك ${number}`);
    if (order.delivered_at) add('delivered', order.delivered_at, en ? `Your order ${number} was delivered` : `تم توصيل طلبك ${number}`);

    if (status === 'cancelled') {
      const reason = String(order.cancellation_reason || parseCancelReason(order.notes) || '').trim();
      const base = en ? `Your order ${number} was cancelled` : `تم إلغاء طلبك ${number}`;
      add('cancelled', order.updated_at || order.created_at, reason ? `${base}${en ? ' — reason: ' : ' — السبب: '}${reason}` : base);
    } else if (!['pending', 'shipped', 'delivered'].includes(status) && status) {
      // Steps without their own date (confirmed, being prepared, on the way) use the last update time.
      add(`status-${status}`, order.updated_at, en ? `Order ${number}: ${statusText(status, 'en')}` : `الطلب ${number}: ${statusText(status, 'ar')}`);
    }
  });
  return list.sort((a, b) => b.at - a.at);
};

export const readIds = () => {
  try {
    const list = JSON.parse(globalThis.localStorage?.getItem(READ_KEY) || '[]');
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
};

export const markRead = (ids) => {
  try {
    const next = [...new Set([...readIds(), ...ids])].slice(-500);
    globalThis.localStorage?.setItem(READ_KEY, JSON.stringify(next));
  } catch { /* storage unavailable */ }
};

/** Orders + public feed in one list, newest first, with each item's read state. */
export const customerNotifications = (orders = [], feed = [], lang = 'ar') => {
  const read = readIds();
  const fromFeed = feed.map((item) => ({
    id: item.id,
    title: [item.title, item.body].filter(Boolean).join(' — '),
    created_at: new Date(item.at).toISOString(),
    at: item.at,
    link: item.link,
  }));
  return [...orderNotifications(orders, lang), ...fromFeed]
    .sort((a, b) => b.at - a.at)
    .slice(0, MAX_ITEMS)
    .map((item) => ({ ...item, is_read: read.has(item.id) }));
};
