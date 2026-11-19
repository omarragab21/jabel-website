// Website status, set in the dashboard under Site setup > Website status (site settings key "site_status").
//   'live'          the website works as usual (also what an empty or unknown value means)
//   'construction'  visitors see an "under construction" page instead of the site
//   'updating'      visitors see an "updating the site" page instead of the site
// site_status_message_ar / site_status_message_en: an optional message shown on that page.

export const SITE_STATUSES = ['live', 'construction', 'updating'];

const text = (value) => (typeof value === 'string' ? value.trim() : '');

/** The status stored in the settings; anything that is not a known status counts as live. */
export const resolveSiteStatus = (settings) => {
  const value = text(settings?.site_status).toLowerCase();
  return SITE_STATUSES.includes(value) ? value : 'live';
};

/** True when visitors must see the status page instead of the website. */
export const isSiteBlocked = (settings) => resolveSiteStatus(settings) !== 'live';

const COPY = {
  construction: {
    ar: { title: 'الموقع تحت الإنشاء', message: 'نعمل على تجهيز الموقع وسيكون متاحاً قريباً.' },
    en: { title: 'Website under construction', message: 'We are getting the website ready. It will be available soon.' },
  },
  updating: {
    ar: { title: 'جاري تحديث الموقع', message: 'نقوم بتحديث الموقع لنقدم لكم تجربة أفضل، وسنعود خلال وقت قصير.' },
    en: { title: 'We are updating the website', message: 'We are updating the site to give you a better experience. We will be back shortly.' },
  },
};

/** { title, message } to show for a status in a language: the dashboard message for that language, else the default. */
export const siteStatusCopy = (settings, lang) => {
  const status = resolveSiteStatus(settings);
  if (status === 'live') return { title: '', message: '' };
  const l = lang === 'en' ? 'en' : 'ar';
  const own = COPY[status][l];
  return { title: own.title, message: text(settings?.[`site_status_message_${l}`]) || own.message };
};
