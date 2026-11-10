import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import settingsService from '../services/settingsService';
import { settingsToObject, vatPercentage } from '../utils/siteSettings';
import { currencyLabel, CURRENCY_AR, CURRENCY_EN, CURRENCY_CODE } from '../utils/currency';

// Only technical defaults. Anything the dashboard owns (name, phone, email, address, prices, rates) is never made
// up here: a value that is not in the settings API is simply absent, and the pages hide whatever depends on it.
export const defaultSettings = {
  logo: '/brand/jabel-logo.png',
  footer_logo: '/brand/jabel-logo-white.png',
  favicon: '/brand/jabel-icon.png',
  currency: CURRENCY_CODE,
  currency_ar: CURRENCY_AR,
  currency_en: CURRENCY_EN,
};

const settings = ref(null);
const loading = ref(false);
let fetchPromise = null;

const isIrisAsset = (value) => {
  if (!value) return false;
  const text = String(value).toLowerCase();
  return ['iris', 't3jcwn2n2rvkxvcva', 'dobvpg934hatbpm5', 'yugdc4mk4vmsf6el'].some((token) => text.includes(token));
};

const normalizeSettings = (data) => {
  const settingsObj = { ...defaultSettings };
  const normalized = settingsToObject(data);
  const entries = Object.entries(normalized).map(([key, value]) => ({ key, value }));

  entries.forEach((setting) => {
    if (!setting?.key) return;
    let value = setting.value;
    if (['logo', 'footer_logo', 'favicon', 'site_name', 'site_title'].includes(setting.key) && isIrisAsset(value)) {
      value = setting.key === 'footer_logo' ? defaultSettings.footer_logo : setting.key === 'site_name' || setting.key === 'site_title' ? '' : defaultSettings.logo;
    }
    settingsObj[setting.key] = value;
  });
  if (settingsObj.default_shipping_cost !== undefined) {
    settingsObj.shipping_cost = settingsObj.default_shipping_cost;
  }
  if (settingsObj.vat_percentage !== undefined) {
    settingsObj.tax_rate = vatPercentage(settingsObj.vat_percentage, settingsObj.tax_rate);
  }
  if (settingsObj.site_contact_phone !== undefined) {
    settingsObj.support_phone = settingsObj.site_contact_phone;
  }
  if (settingsObj.social_links && typeof settingsObj.social_links === 'object') {
    Object.assign(settingsObj, settingsObj.social_links);
  }
  return settingsObj;
};

// Start from the cached settings when they are fresh, so the logo, name and
// texts are right on the first paint instead of switching from the defaults.
const cachedSettings = settingsService.peekSettings();
if (cachedSettings) settings.value = normalizeSettings(cachedSettings);

export function useSettings() {
  const { locale } = useI18n();

  const fetchSettings = async (options = {}) => {
    // Settings are fetched fresh on every page; concurrent callers share one request.
    if (fetchPromise) return fetchPromise;

    loading.value = true;
    fetchPromise = settingsService.getSettings({
      signal: options.signal,
    }).then((data) => normalizeSettings(data))
      .then((data) => {
        settings.value = data;
        return settings.value;
      })
      .finally(() => {
        loading.value = false;
        fetchPromise = null;
      });
    return fetchPromise;
  };

  // One currency for the whole store (Jordanian dinar): «د.أ» in Arabic, «JOD» in English. The settings API's
  // currency_ar / currency_en are not used: they still hold the old Saudi values (ر.س / SAR).
  const currency = computed(() => currencyLabel(locale.value));

  const getSetting = (key, defaultValue = null) => settings.value?.[key] ?? defaultSettings[key] ?? defaultValue;

  // True once real settings are known (cached or fetched): until then show skeletons, not defaults.
  const settingsReady = computed(() => settings.value !== null);

  return { settings, settingsReady, loading, fetchSettings, currency, getSetting };
}
