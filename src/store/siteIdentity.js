import { computed, reactive } from 'vue';
import { siteDescriptionFor, siteNameFor, workingHoursFor } from '../domain/site/siteIdentity.js';
import { seoFor } from '../domain/site/seoMeta.js';

// The public site settings that describe the shop itself (name, description, opening hours) and the language
// being shown. The layout fills it when the settings arrive; the tab title, the footer and the contact page read it.
export const siteIdentity = reactive({ settings: {}, lang: 'ar', ready: false });

export const setSiteSettings = (settings) => { siteIdentity.settings = { ...(settings || {}) }; };
// The settings request has finished (answered or failed): until then logos and contact details show a shimmer.
export const markSiteReady = () => { siteIdentity.ready = true; };
export const setSiteLang = (lang) => { siteIdentity.lang = lang === 'en' ? 'en' : 'ar'; };

export const siteNameText = computed(() => siteNameFor(siteIdentity.settings, siteIdentity.lang));
export const siteDescriptionText = computed(() => siteDescriptionFor(siteIdentity.settings, siteIdentity.lang));
export const siteHoursLines = computed(() => workingHoursFor(siteIdentity.settings, siteIdentity.lang));
// The SEO text from the dashboard (Settings > SEO & link preview) in the language being shown.
export const siteSeo = computed(() => seoFor(siteIdentity.settings, siteIdentity.lang));
