// The store's currency, written the same way everywhere on the website (one source of truth):
// Jordanian dinar. Arabic pages show «د.أ», English pages show «JOD».
export const CURRENCY_CODE = 'JOD';
export const CURRENCY_AR = 'د.أ';
export const CURRENCY_EN = 'JOD';

/** The currency label for a language ('ar' | 'en'). */
export const currencyLabel = (lang) => (lang === 'ar' ? CURRENCY_AR : CURRENCY_EN);
