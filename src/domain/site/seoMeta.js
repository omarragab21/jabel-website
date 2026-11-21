// The text Google and link previews (Telegram, WhatsApp, Facebook...) show for the site, as the dashboard sets it
// (Settings > SEO & link preview). Stored per language as seo_title_*, seo_description_*, seo_keywords_*, plus one
// shared seo_image. A language left empty falls back to the other one; with neither, the value is empty and the
// built-in text in index.html stays.

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const langOf = (lang) => (lang === 'en' ? 'en' : 'ar');
const otherLang = (lang) => (langOf(lang) === 'ar' ? 'en' : 'ar');

/** { title, description, keywords, image } for the language; every field is '' when the dashboard has none. */
export const seoFor = (settings, lang) => {
  const l = langOf(lang);
  const pick = (key) => text(settings?.[`${key}_${l}`]) || text(settings?.[`${key}_${otherLang(l)}`]);
  return {
    title: pick('seo_title'),
    description: pick('seo_description'),
    keywords: pick('seo_keywords'),
    image: text(settings?.seo_image),
  };
};

/** An image setting as an absolute https/http URL on the given origin ('' when it is empty or unsafe). */
export const absoluteImageUrl = (value, origin) => {
  const cleaned = [...text(value)].filter((char) => char.charCodeAt(0) > 31 && char.charCodeAt(0) !== 127).join('');
  if (!cleaned || /^(javascript|data|vbscript|file|blob):/i.test(cleaned.replace(/\s+/g, ''))) return '';
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith('//') || cleaned.startsWith('/\\')) return '';
  if (cleaned.startsWith('/')) return `${origin}${cleaned}`;
  return `${origin}/storage/${cleaned.replace(/^[\\/]+/, '')}`;
};

const escapeAttr = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replace the first tag that matches, or add the tag before </head>. The replacement is a function so a "$" in the
// text is never read as a replace pattern.
const putTag = (html, matcher, tag) => (matcher.test(html)
  ? html.replace(matcher, () => tag)
  : html.replace('</head>', () => `    ${tag}\n  </head>`));

const metaName = (html, name, content) => putTag(html, new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i'), `<meta name="${name}" content="${escapeAttr(content)}" />`);
const metaProperty = (html, property, content) => putTag(html, new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i'), `<meta property="${property}" content="${escapeAttr(content)}" />`);

/**
 * index.html with the dashboard's SEO text written into <head>: the page title, the description, the keywords, the
 * Open Graph / Twitter card tags (link previews) and the canonical link. Only what the dashboard filled in is
 * replaced; everything else in the file is left as it is.
 *
 * `seo` is seoFor(...); `image` must already be absolute (absoluteImageUrl).
 */
export const applySeoToHtml = (html, { seo, image, siteName, origin, pathname = '/' }) => {
  let out = String(html);
  const url = `${origin}${pathname === '/' ? '' : pathname}`;

  if (seo.title) {
    out = putTag(out, /<title>[\s\S]*?<\/title>/i, `<title>${escapeText(seo.title)}</title>`);
    out = metaName(out, 'title', seo.title);
    out = metaProperty(out, 'og:title', seo.title);
    out = metaName(out, 'twitter:title', seo.title);
  }
  if (seo.description) {
    out = metaName(out, 'description', seo.description);
    out = metaProperty(out, 'og:description', seo.description);
    out = metaName(out, 'twitter:description', seo.description);
  }
  if (seo.keywords) out = metaName(out, 'keywords', seo.keywords);
  if (image) {
    out = metaProperty(out, 'og:image', image);
    out = metaName(out, 'twitter:image', image);
  }
  if (seo.title || seo.description || image) {
    out = metaName(out, 'twitter:card', image ? 'summary_large_image' : 'summary');
    out = metaProperty(out, 'og:url', url);
    out = putTag(out, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeAttr(url)}" />`);
  }
  if (siteName) out = metaProperty(out, 'og:site_name', siteName);
  return out;
};
