import { computed, reactive } from 'vue';
import { siteDescriptionFor, siteNameFor, workingHoursFor } from '../domain/site/siteIdentity.js';

// The public site settings that describe the shop itself (name, description, opening hours) and the language
// being shown. The layout fills it when the settings arrive; the tab title, the footer and the contact page read it.
export const siteIdentity = reactive({ settings: {}, lang: 'ar' });

export const setSiteSettings = (settings) => { siteIdentity.settings = { ...(settings || {}) }; };
export const setSiteLang = (lang) => { siteIdentity.lang = lang === 'en' ? 'en' : 'ar'; };

export const siteNameText = computed(() => siteNameFor(siteIdentity.settings, siteIdentity.lang));
export const siteDescriptionText = computed(() => siteDescriptionFor(siteIdentity.settings, siteIdentity.lang));
export const siteHoursLines = computed(() => workingHoursFor(siteIdentity.settings, siteIdentity.lang));
