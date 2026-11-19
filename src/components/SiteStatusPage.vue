<script setup>
// Full-page notice shown instead of the website while the dashboard sets the site to "under construction" or "updating".
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { siteStatusCopy } from '../domain/site/siteStatus';
import { siteNameFor } from '../domain/site/siteIdentity';
import { applyBrandColors } from '../utils/brandColors';

const props = defineProps({
  settings: { type: Object, default: () => ({}) },
});

const { locale } = useI18n();
const lang = computed(() => (locale.value === 'en' ? 'en' : 'ar'));
const isRtl = computed(() => lang.value === 'ar');
const copy = computed(() => siteStatusCopy(props.settings, lang.value));
const status = computed(() => String(props.settings?.site_status || '').toLowerCase());
const siteName = computed(() => siteNameFor(props.settings, lang.value) || 'Jabel');

// The layout (which normally paints the brand colour) is not mounted here, so the notice paints it itself.
watch(() => [props.settings?.primary_color, props.settings?.secondary_color], ([primary, secondary]) => applyBrandColors(primary, secondary), { immediate: true });

const switchLang = (next) => {
  if (next === lang.value) return;
  locale.value = next;
  try { localStorage.setItem('lang', next); } catch { /* storage blocked: the switch still works for this visit */ }
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
};
</script>

<template>
  <main class="site-status" :class="`is-${status}`" :dir="isRtl ? 'rtl' : 'ltr'" role="status" data-testid="site-status-page">
    <div class="site-status-lang" dir="ltr">
      <button type="button" :class="{ active: lang === 'ar' }" @click="switchLang('ar')">العربية</button>
      <button type="button" :class="{ active: lang === 'en' }" @click="switchLang('en')">English</button>
    </div>
    <section class="site-status-card">
      <img class="site-status-logo" src="/brand/jabel-logo.png" :alt="siteName" />
      <div class="site-status-icon" aria-hidden="true">
        <svg v-if="status === 'updating'" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
        <svg v-else width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z"/></svg>
      </div>
      <h1 data-testid="site-status-title">{{ copy.title }}</h1>
      <p data-testid="site-status-message">{{ copy.message }}</p>
    </section>
  </main>
</template>

<style scoped>
.site-status { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center; justify-content: center; padding: 24px 16px; background: #f5f6f8; color: #111827; font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif; overflow: auto; }
.site-status-lang { position: absolute; top: 16px; inset-inline-end: 16px; display: flex; gap: 4px; padding: 3px; border-radius: 999px; background: #fff; border: 1px solid #e5e7eb; }
.site-status-lang button { border: 0; background: transparent; padding: 6px 14px; border-radius: 999px; font: inherit; font-size: 0.85rem; cursor: pointer; color: #4b5563; }
.site-status-lang button.active { background: var(--primary, #660033); color: var(--color-brand-contrast, #fff); }
.site-status-card { width: 100%; max-width: 520px; padding: 40px 28px; border-radius: 24px; background: #fff; box-shadow: 0 12px 40px rgba(17, 24, 39, 0.08); text-align: center; }
.site-status-logo { display: block; max-width: 180px; max-height: 64px; margin: 0 auto 24px; object-fit: contain; }
.site-status-icon { width: 68px; height: 68px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--primary, #660033) 12%, #fff); color: var(--primary, #660033); }
.is-updating .site-status-icon svg { animation: site-status-spin 3s linear infinite; }
@keyframes site-status-spin { to { transform: rotate(360deg); } }
.site-status-card h1 { margin: 0 0 10px; font-size: 1.6rem; line-height: 1.3; }
.site-status-card p { margin: 0; color: #4b5563; font-size: 1.05rem; line-height: 1.8; }
@media (prefers-reduced-motion: reduce) { .is-updating .site-status-icon svg { animation: none; } }
</style>
