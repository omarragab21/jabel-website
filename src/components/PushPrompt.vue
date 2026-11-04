<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { authState } from '../store/auth';
import { listSiteOrders } from '../modules/invoice/services/siteOrdersApi';
import { SEEN_KEY, findOrderChanges, toOrderToast } from '../domain/orders/orderStatusAlerts';
import { openCouponFromLink } from '../store/couponDialog';
import { armNotificationSound, playNotificationSound } from '../utils/notificationSound';

// Asks a signed-in customer to turn on notifications (order status, new products and offers) and shows
// the ones that arrive while the site is open. Firebase is loaded only here, after the page is up.
const DISMISS_KEY = 'push_prompt_dismissed';
const POLL_MS = 30000;

const { locale } = useI18n();
const router = useRouter();
const ar = computed(() => locale.value !== 'en');
const isLoggedIn = computed(() => !!authState.token);

const status = ref('');
const busy = ref(false);
const dismissed = ref(false);
const toast = ref(null);
let push = null;
let stopListening = () => {};
let stopFeed = () => {};
let toastTimer;

try { dismissed.value = localStorage.getItem(DISMISS_KEY) === '1'; } catch { /* storage unavailable */ }

const showCard = computed(() => isLoggedIn.value && !dismissed.value && status.value === 'default');

const showToast = (message) => {
  toast.value = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.value = null; }, 9000);
};

// Order updates: the customer's orders are checked every 30 seconds while the site is open.
let polling = false;
let pollTimer;
const checkOrders = async () => {
  if (polling || !isLoggedIn.value) return;
  polling = true;
  try {
    const orders = await listSiteOrders();
    let previous = null;
    try { previous = JSON.parse(localStorage.getItem(SEEN_KEY) || 'null'); } catch { /* start from today's state */ }
    const { snapshot, changes } = findOrderChanges(orders, previous);
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(snapshot)); } catch { /* storage unavailable */ }
    for (const change of changes) {
      const message = toOrderToast(change, ar.value ? 'ar' : 'en');
      showToast(message);
      playNotificationSound();
      if (push) push.showLocalNotification({ ...message, tag: `order-${change.order.id}-${change.order.status}` });
    }
  } catch { /* the next check tries again */ } finally {
    polling = false;
  }
};
const onVisible = () => { if (document.visibilityState === 'visible') checkOrders(); };

const load = async () => {
  if (!push) push = await import('../firebase/webPush.js');
  status.value = await push.pushStatus();
  if (status.value === 'granted' && isLoggedIn.value) push.refreshPushToken().catch(() => {});
};

const enable = async () => {
  busy.value = true;
  try {
    const result = await push.enablePush();
    status.value = result.status;
    if (result.status === 'granted') {
      showToast({ title: ar.value ? 'تم تفعيل الإشعارات' : 'Notifications are on', body: ar.value ? 'ستصلك إشعارات عند تغيّر حالة طلبك أو عند إضافة منتج أو عرض جديد.' : 'You will be told when your order status changes or when there is a new product or offer.' });
    } else if (result.status === 'denied') {
      showToast({ title: ar.value ? 'الإشعارات محظورة' : 'Notifications are blocked', body: ar.value ? 'يمكنك السماح بها من إعدادات المتصفح (رمز القفل بجوار عنوان الموقع).' : 'You can allow them in the browser settings (the lock next to the address).' });
    }
  } catch {
    showToast({ title: ar.value ? 'تعذّر تفعيل الإشعارات' : 'Could not turn on notifications', body: ar.value ? 'يُرجى المحاولة مرة أخرى بعد قليل.' : 'Please try again later.' });
  } finally {
    busy.value = false;
  }
};

const dismiss = () => {
  dismissed.value = true;
  try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* storage unavailable */ }
};

const openLink = (link) => {
  if (!link) return;
  // A discount-code notification opens the copy-code dialog on the current page.
  if (openCouponFromLink(link)) { toast.value = null; return; }
  if (!push) return;
  router.push(push.safePushLink(link)).catch(() => {});
  toast.value = null;
};

onMounted(async () => {
  armNotificationSound();
  try {
    await load();
    stopListening = push.onPushEvent((message) => {
      if (message.type === 'push-open') openLink(message.link);
      else {
        showToast({ title: message.title, body: message.body, link: message.link });
        playNotificationSound();
      }
    });
  } catch {
    status.value = 'unsupported';
  }
  // New products and offers: the dashboard writes them to Firestore and every open page hears about them live.
  try {
    const feed = await import('../firebase/notificationsStore.js');
    stopFeed = feed.subscribeNotifications((list, fresh) => {
      fresh.forEach((item) => showToast({ title: item.title, body: item.body, link: item.link }));
      if (fresh.length) playNotificationSound();
    }, { lang: ar.value ? 'ar' : 'en' });
  } catch { /* the site works without the live feed */ }
  document.addEventListener('visibilitychange', onVisible);
  pollTimer = setInterval(onVisible, POLL_MS);
  checkOrders();
});
watch(isLoggedIn, (signedIn) => {
  if (signedIn) {
    if (push) load().catch(() => {});
    checkOrders();
  } else {
    try { localStorage.removeItem(SEEN_KEY); } catch { /* storage unavailable */ }
  }
});
onUnmounted(() => {
  stopListening();
  stopFeed();
  clearTimeout(toastTimer);
  clearInterval(pollTimer);
  document.removeEventListener('visibilitychange', onVisible);
});
</script>

<template>
  <div v-if="showCard" class="push-card" role="dialog" aria-live="polite" data-testid="push-prompt">
    <span class="push-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    </span>
    <div class="push-text">
      <strong>{{ ar ? 'فعّل الإشعارات' : 'Turn on notifications' }}</strong>
      <span>{{ ar ? 'تابع حالة طلبك والمنتجات والعروض الجديدة أولاً بأول.' : 'Hear about your order status, new products and offers.' }}</span>
    </div>
    <div class="push-actions">
      <button type="button" class="push-enable" :disabled="busy" data-testid="push-enable" @click="enable">{{ ar ? 'تفعيل' : 'Turn on' }}</button>
      <button type="button" class="push-later" :disabled="busy" data-testid="push-later" @click="dismiss">{{ ar ? 'لاحقاً' : 'Later' }}</button>
    </div>
  </div>

  <div v-if="toast" class="push-toast" role="status" data-testid="push-toast" :class="{ clickable: toast.link }" @click="openLink(toast.link)">
    <strong>{{ toast.title }}</strong>
    <span v-if="toast.body">{{ toast.body }}</span>
  </div>
</template>

<style scoped>
.push-card { position: fixed; bottom: 1.25rem; inset-inline-start: 1.25rem; z-index: 1200; display: flex; align-items: center; gap: 0.8rem; max-width: min(460px, calc(100vw - 2.5rem)); background: #fff; color: #111827; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.14); padding: 0.9rem 1rem; }
.push-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--color-brand-secondary, #111827); color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.push-text { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; font-size: 0.82rem; color: #4b5563; }
.push-text strong { color: #111827; font-size: 0.9rem; }
.push-actions { display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0; }
.push-enable, .push-later { border-radius: 8px; padding: 0.4rem 0.9rem; font-family: inherit; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
.push-enable { background: var(--color-brand-secondary, #111827); color: #fff; border: none; }
.push-later { background: none; color: #6b7280; border: 1px solid #e5e7eb; }
.push-enable:disabled, .push-later:disabled { opacity: 0.6; cursor: wait; }
.push-toast { position: fixed; top: 1rem; inset-inline-end: 1rem; z-index: 1300; display: flex; flex-direction: column; gap: 0.2rem; max-width: min(380px, calc(100vw - 2rem)); background: #fff; color: #111827; border-inline-start: 4px solid #111827; border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.16); padding: 0.85rem 1rem; font-size: 0.82rem; }
.push-toast strong { font-size: 0.9rem; }
.push-toast span { color: #4b5563; }
.push-toast.clickable { cursor: pointer; }
@media (max-width: 520px) {
  .push-card { inset-inline: 0.75rem; bottom: 0.75rem; max-width: none; flex-wrap: wrap; }
  .push-actions { flex-direction: row; width: 100%; }
  .push-actions button { flex: 1; }
}
</style>
