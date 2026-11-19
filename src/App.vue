<template>
  <SiteStatusPage v-if="blocked" :settings="current || {}" />
  <router-view v-else />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SiteStatusPage from './components/SiteStatusPage.vue';
import settingsService from './services/settingsService';
import { useSettings } from './composables/useSettings';
import { isSiteBlocked } from './domain/site/siteStatus';
import { settingsToObject } from './utils/siteSettings';

// The dashboard can switch the website to "under construction" or "updating" (Site setup > Website status).
// While it is not live, visitors get a notice page instead of the site. A failed settings request never blocks the site.
//
// The status is always asked from the API with `refresh: true`, so it never comes from the browser's saved copy of the
// settings (localStorage / memory): that copy can be up to a minute old and would show the wrong state after a change.
const { settings } = useSettings();
const fresh = ref(null); // the last settings answered by the API for the status check
const current = computed(() => fresh.value || settings.value);
const blocked = computed(() => isSiteBlocked(current.value));

const refresh = async () => {
  try {
    fresh.value = settingsToObject(await settingsService.getSettings({ refresh: true }));
  } catch {
    // The API could not be reached: keep what is known, never block the site because of an error.
  }
};

let timer = null;
const onVisible = () => { if (!document.hidden) refresh(); };
onMounted(() => {
  refresh();
  // A visitor with the page open sees the site come back (or go down) without a manual reload.
  timer = setInterval(refresh, 30000);
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('focus', refresh);
  window.addEventListener('online', refresh);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  document.removeEventListener('visibilitychange', onVisible);
  window.removeEventListener('focus', refresh);
  window.removeEventListener('online', refresh);
});

// Search engines must not index the notice page: the page's own robots tag is switched to noindex and restored
// when the site is live again.
let robotsBackup = null;
watch(blocked, (isBlocked) => {
  let tag = document.querySelector('meta[name="robots"]');
  if (isBlocked) {
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'robots';
      document.head.appendChild(tag);
    }
    if (robotsBackup === null) robotsBackup = tag.getAttribute('content') ?? '';
    tag.setAttribute('content', 'noindex, nofollow');
  } else if (tag && robotsBackup !== null) {
    if (robotsBackup) tag.setAttribute('content', robotsBackup); else tag.remove();
    robotsBackup = null;
  }
}, { immediate: true });
</script>
