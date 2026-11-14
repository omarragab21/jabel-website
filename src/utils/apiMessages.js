// The backend answers some errors with a fixed English sentence. In an Arabic
// page the customer should read Arabic: known sentences are translated here,
// English pages (and any sentence not listed) keep the text as it came.
const KNOWN_MESSAGES = [
  {
    match: /already submitted a review/i,
    ar: 'لقد قمت بإضافة تقييم لهذا المنتج مسبقاً.',
  },
];

/**
 * @param {string} message the text the API sent
 * @param {'ar'|'en'} lang the page language
 * @returns {string} Arabic for a known sentence on an Arabic page, else `message`
 */
export const localizeApiMessage = (message, lang) => {
  if (lang !== 'ar' || typeof message !== 'string') return message;
  const known = KNOWN_MESSAGES.find(({ match }) => match.test(message));
  return known ? known.ar : message;
};
