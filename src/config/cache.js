// Cache policy for public storefront data (settings, logo, colours, sliders,
// categories, offers, products, cities, pages).
//
// Every public response is kept (in memory and in localStorage) for
// PUBLIC_CACHE_TTL_MS. Inside that window a page renders straight from the
// cache, with no request and no loading state. Once it is older the page asks
// the API again and shows skeletons until the answer arrives: an expired copy
// is never shown, except when the API cannot be reached at all.
//
// Customer data (cart checks, orders, profile, wallet) is never cached.
const DEFAULT_CACHE_SECONDS = 60;
const MIN_CACHE_SECONDS = 5;
const MAX_CACHE_SECONDS = 10 * 60;

const readSeconds = () => {
  const raw = Number(import.meta.env?.VITE_CACHE_SECONDS ?? import.meta.env?.VITE_HOME_REFRESH_SECONDS);
  const seconds = Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_CACHE_SECONDS;
  return Math.min(MAX_CACHE_SECONDS, Math.max(MIN_CACHE_SECONDS, seconds));
};

export const CACHE_SECONDS = readSeconds();
export const PUBLIC_CACHE_TTL_MS = CACHE_SECONDS * 1000;

// While the home page is open it fetches a fresh copy once per cache window,
// so it never shows data older than the window either.
export const HOME_REFRESH_INTERVAL_MS = PUBLIC_CACHE_TTL_MS;
