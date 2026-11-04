// Cities and regions offered by every address form (profile dialog and checkout "other recipient").
// The Arabic value is what gets stored; src/utils/placeLabels.js translates the label for display.
export const defaultCityOptions = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'القصيم',
  'أبها',
  'تبوك',
  'حائل',
  'الطائف',
];

export const defaultRegionOptions = [
  'منطقة الرياض',
  'منطقة مكة المكرمة',
  'المنطقة الشرقية',
  'منطقة المدينة المنورة',
  'منطقة القصيم',
  'منطقة عسير',
  'منطقة تبوك',
  'منطقة حائل',
];

// Picking a city fills in the region it belongs to.
const REGION_BY_CITY = {
  'الرياض': 'منطقة الرياض',
  'جدة': 'منطقة مكة المكرمة',
  'مكة المكرمة': 'منطقة مكة المكرمة',
  'الطائف': 'منطقة مكة المكرمة',
  'المدينة المنورة': 'منطقة المدينة المنورة',
  'الدمام': 'المنطقة الشرقية',
  'الخبر': 'المنطقة الشرقية',
  'القصيم': 'منطقة القصيم',
  'أبها': 'منطقة عسير',
  'تبوك': 'منطقة تبوك',
  'حائل': 'منطقة حائل',
};

export const regionForCity = (city) => REGION_BY_CITY[String(city || '').trim()] || '';

// "منطقة الرياض" -> "الرياض", "المنطقة الشرقية" -> "الشرقية".
const stripRegionWord = (region) => String(region || '').replace(/^(ال)?منطقة\s+/, '').trim();

// A saved address keeps city and region in one string ("الدمام، الشرقية").
export const joinCityRegion = (city, region) => {
  const cleanCity = String(city || '').trim();
  const cleanRegion = stripRegionWord(region);
  return cleanRegion ? `${cleanCity}، ${cleanRegion}` : cleanCity;
};

// The reverse: the region option ("المنطقة الشرقية") that a saved "الشرقية" part stands for.
export const regionFromCityPart = (part) => {
  const clean = stripRegionWord(part);
  if (!clean) return '';
  return defaultRegionOptions.find((region) => stripRegionWord(region) === clean) || `منطقة ${clean}`;
};
