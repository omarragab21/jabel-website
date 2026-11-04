// The visitor's cookie choices, kept in localStorage (the same record the cookie banner writes) and announced
// with a "cookie-consent" event so analytics can start or stop right away.
export const COOKIE_STORAGE_KEY = 'jabel_cookie_consent';

export const readConsent = () => {
  try {
    return JSON.parse(localStorage.getItem(COOKIE_STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
};

/** True once the visitor allowed cookies (the switch on the privacy page is on). */
export const isAnalyticsAllowed = () => Boolean(readConsent().analytics);

/**
 * The privacy page switch: on = allow all optional cookies (preferences, analytics, marketing), exactly like
 * «السماح / Allow» on the cookie banner; off = reject them, like «رفض / Reject». Necessary cookies always stay.
 */
export const setCookiesAllowed = (allowed) => {
  const value = Boolean(allowed);
  const next = {
    timestamp: new Date().toISOString(),
    necessary: true,
    preferences: value,
    analytics: value,
    marketing: value,
  };
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked: the choice only lasts for this visit.
  }
  window.dispatchEvent(new CustomEvent('cookie-consent', { detail: { ...next } }));
  return next;
};
