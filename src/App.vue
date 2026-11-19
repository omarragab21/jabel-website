<template>
  <SiteStatusPage v-if="blocked" :settings="settings || {}" />
  <router-view v-else />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import SiteStatusPage from './components/SiteStatusPage.vue';
import { useSettings } from './composables/useSettings';
import { isSiteBlocked } from './domain/site/siteStatus';

// The dashboard can switch the website to "under construction" or "updating" (Site setup > Website status).
// While it is not live, visitors get a notice page instead of the site. A failed settings request never blocks the site.
const { settings, fetchSettings } = useSettings();
const blocked = computed(() => isSiteBlocked(settings.value));

const refresh = () => { fetchSettings().catch(() => {}); };
let timer = null;
onMounted(() => {
  refresh();
  // A visitor with the page open sees the site come back (or go down) without a manual reload.
  timer = setInterval(refresh, 60000);
  document.addEventListener('visibilitychange', onVisible);
});
const onVisible = () => { if (!document.hidden) refresh(); };
onBeforeUnmount(() => {
  clearInterval(timer);
  document.removeEventListener('visibilitychange', onVisible);
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
});
</script>
