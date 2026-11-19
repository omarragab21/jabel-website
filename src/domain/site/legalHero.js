// Header photo of the legal pages (FAQ, returns, privacy, terms). It is uploaded in the dashboard and stored in the
// site settings (legal_pages[page].hero_image). There is no built-in photo: without one the header is a plain dark band.

/** The URL to use for a stored value, or '' when it is empty or unsafe (javascript:, data:, //host ...). */
export const legalHeroUrl = (value) => {
  const text = String(value ?? '').trim();
  if (!text || text === '[]') return '';
  if (/^(https?:\/\/|\/(?![/\\]))/i.test(text)) return text;
  if (/^[/\\]{2}|^(?:javascript|vbscript|file|data|blob):/i.test(text)) return '';
  return `/storage/${text.replace(/^\/?storage\//i, '')}`;
};

/** Inline style for the header: the dark overlay over the photo; empty when there is no photo. */
export const legalHeroStyle = (url) => {
  if (!url) return {};
  const safe = String(url).replace(/["\\\n\r]/g, '');
  return { backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${safe}")` };
};

/** "#abc" / "#AABBCC" -> "#aabbcc"; '' when the value is not a hex colour. */
export const legalHeroColor = (value) => {
  const text = String(value ?? '').trim();
  if (/^#[0-9a-f]{6}$/i.test(text)) return text.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(text)) return `#${[...text.slice(1)].map((c) => c + c).join('')}`.toLowerCase();
  return '';
};

/** 'image' | 'color'. Pages saved before colours existed have no type: a photo means image, otherwise the dark default colour. */
export const legalHeroType = (data) => {
  if (data?.hero_type === 'image' || data?.hero_type === 'color') return data.hero_type;
  return legalHeroUrl(data?.hero_image) ? 'image' : 'color';
};

/** Text colour that stays readable on the chosen background colour. */
export const legalHeroTextColor = (color) => {
  const hex = legalHeroColor(color);
  if (!hex) return '#FFFFFF';
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#111827' : '#FFFFFF';
};

/**
 * Inline style of the header for a stored page: the colour for a colour cover, the photo (with its dark overlay) for
 * an image cover. Only the chosen kind is used; an empty object keeps the default dark band.
 */
export const legalHeroCoverStyle = (page) => {
  if (legalHeroType(page) === 'color') {
    const color = legalHeroColor(page?.hero_color);
    return color ? { backgroundImage: 'none', backgroundColor: color, '--legal-hero-fg': legalHeroTextColor(color) } : {};
  }
  return legalHeroStyle(legalHeroUrl(page?.hero_image));
};
