// Display names for the Arabic city / area values used by the address forms (Jordan, see data/jordanPlaces.js).
// The Arabic value stays the stored value; only the label is translated.
import { placeNameEn } from '../data/jordanPlaces.js';

export const placeLabel = (name, lang) => (lang === 'ar' ? name : (placeNameEn(name) || name));
