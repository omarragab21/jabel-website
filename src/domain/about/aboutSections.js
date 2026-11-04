// The About Us showcase sections, as set from the dashboard (Settings > About Us).
// Everything shown comes from the settings, in the visitor's language only:
// - an empty title hides the heading, an empty description hides the paragraphs;
// - a section with neither (never filled in, cleared, or deleted from the dashboard) is not shown at all.
// Section 1 keeps the original about_title / about_content keys.

export const ABOUT_SECTION_NUMBERS = [1, 2, 3];

export const aboutSectionKeys = (number) => (number === 1
  ? { title: 'about_title', content: 'about_content', image: 'about_image_1' }
  : { title: `about_section_${number}_title`, content: `about_section_${number}_content`, image: `about_image_${number}` });

const text = (value) => (typeof value === 'string' ? value.trim() : '');

export const toParagraphs = (value) => text(value).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

/** One section in one language ('ar' | 'en'): { number, title, paragraphs, image, visible }. */
export const aboutSection = (settings, number, lang) => {
  const keys = aboutSectionKeys(number);
  const suffix = lang === 'ar' ? 'ar' : 'en';
  const title = text(settings?.[`${keys.title}_${suffix}`]);
  const paragraphs = toParagraphs(settings?.[`${keys.content}_${suffix}`]);
  return { number, title, paragraphs, image: settings?.[keys.image] ?? null, visible: Boolean(title || paragraphs.length) };
};

/** The sections the page shows, in order. */
export const visibleAboutSections = (settings, lang) => ABOUT_SECTION_NUMBERS
  .map((number) => aboutSection(settings, number, lang))
  .filter((section) => section.visible);
