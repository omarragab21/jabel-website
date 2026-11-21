import { settingsToObject } from '../../utils/siteSettings.js';
import { siteNameFor } from './siteIdentity.js';
import { absoluteImageUrl, applySeoToHtml, seoFor } from './seoMeta.js';

// Search engines and link previews do not run the site's JavaScript, so the dashboard's SEO text has to be in the
// HTML itself. Both the Vercel function (api/seo-index.js) and the dev server (vite.config.js) call this with the raw
// answer of the settings API. The static HTML has no language switch, so it uses the Arabic text (the site's default).
export const renderSeoHtml = (html, rawSettings, { origin, pathname = '/' }) => {
  const settings = settingsToObject(rawSettings);
  const seo = seoFor(settings, 'ar');
  return applySeoToHtml(html, {
    seo,
    // The share image is the one uploaded in the SEO tab, else the main logo from the dashboard, else the built-in logo.
    image: absoluteImageUrl(seo.image || settings.logo, origin) || absoluteImageUrl('/brand/jabel-logo.png', origin),
    siteName: siteNameFor(settings, 'ar'),
    origin,
    pathname,
  });
};
