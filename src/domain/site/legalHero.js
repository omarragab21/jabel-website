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
