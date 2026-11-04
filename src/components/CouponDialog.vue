<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { closeCouponDialog, couponDialog } from '../store/couponDialog';
import { couponDialogText } from '../domain/notifications/couponLink';

const { locale } = useI18n();
const lang = computed(() => (locale.value === 'en' ? 'en' : 'ar'));
const coupon = computed(() => couponDialog.coupon);
const text = computed(() => (coupon.value ? couponDialogText(coupon.value, lang.value) : null));
const copied = ref(false);
let timer;

watch(coupon, () => { copied.value = false; });
onUnmounted(() => clearTimeout(timer));

const copyWithSelection = (value) => {
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  try { return document.execCommand('copy'); } finally { document.body.removeChild(area); }
};

const copy = async () => {
  const value = coupon.value?.code;
  if (!value) return;
  let done = false;
  try {
    await navigator.clipboard.writeText(value);
    done = true;
  } catch {
    try { done = copyWithSelection(value); } catch { done = false; }
  }
  copied.value = done;
  clearTimeout(timer);
  if (done) timer = setTimeout(() => { copied.value = false; }, 2500);
};
</script>

<template>
  <div v-if="coupon" class="coupon-overlay" data-testid="coupon-dialog" @click.self="closeCouponDialog" @keydown.esc="closeCouponDialog">
    <div class="coupon-card" role="dialog" aria-modal="true" :aria-label="text.title" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
      <button type="button" class="coupon-close" :aria-label="text.close" @click="closeCouponDialog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <span class="coupon-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>
      </span>
      <h3 class="coupon-title">{{ text.title }}</h3>
      <p class="coupon-intro" data-testid="coupon-intro">{{ text.intro }}</p>
      <p v-if="text.period" class="coupon-period" data-testid="coupon-period">{{ text.period }}</p>

      <div class="coupon-code-row">
        <span class="coupon-code" dir="ltr" data-testid="coupon-code">{{ coupon.code }}</span>
        <button type="button" class="coupon-copy" :class="{ done: copied }" data-testid="coupon-copy" @click="copy">
          {{ copied ? text.copied : text.copy }}
        </button>
      </div>
      <p class="coupon-hint">{{ text.hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.coupon-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(17, 24, 39, 0.55); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.coupon-card { position: relative; width: 100%; max-width: 420px; background: #fff; color: #111827; border-radius: 18px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3); padding: 2rem 1.5rem 1.5rem; text-align: center; font-family: inherit; }
.coupon-close { position: absolute; top: 0.75rem; inset-inline-end: 0.75rem; width: 32px; height: 32px; border-radius: 50%; border: none; background: #f3f4f6; color: #6b7280; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.coupon-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--color-brand-secondary, #111827); color: #fff; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; }
.coupon-title { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 800; }
.coupon-intro { margin: 0; font-size: 0.95rem; line-height: 1.7; color: #374151; }
.coupon-period { margin: 0.4rem 0 0; font-size: 0.85rem; font-weight: 700; color: #6b7280; }
.coupon-code-row { display: flex; align-items: stretch; gap: 0.5rem; margin: 1.25rem 0 0.75rem; }
.coupon-code { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; border: 2px dashed #9ca3af; border-radius: 12px; background: #f9fafb; padding: 0.7rem 0.75rem; font-size: 1.25rem; font-weight: 800; letter-spacing: 0.08em; word-break: break-all; user-select: all; }
.coupon-copy { flex-shrink: 0; border: none; border-radius: 12px; background: var(--color-brand-secondary, #111827); color: #fff; font-family: inherit; font-weight: 700; font-size: 0.9rem; padding: 0 1.1rem; cursor: pointer; transition: background 0.15s; }
.coupon-copy.done { background: #15803d; }
.coupon-hint { margin: 0; font-size: 0.8rem; color: #9ca3af; }
</style>
