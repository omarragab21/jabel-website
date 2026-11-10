// Cities of Jordan and the areas of each one, for every address form (profile dialog, checkout "other
// recipient" and the header's delivery dropdown). The Arabic name is what gets stored; `en` is only the label shown
// when the site is in English (see src/utils/placeLabels.js). Each area belongs to exactly one city.
const place = (ar, en) => ({ ar, en });

export const JORDAN_CITIES = [
  {
    ...place('عمّان', 'Amman'),
    areas: [
      place('وسط البلد', 'Downtown'), place('جبل عمان', 'Jabal Amman'), place('جبل الحسين', 'Jabal Al-Hussein'),
      place('جبل اللويبدة', 'Jabal Al-Weibdeh'), place('الشميساني', 'Shmeisani'), place('عبدون', 'Abdoun'),
      place('الصويفية', 'Sweifieh'), place('الجبيهة', 'Jubaiha'), place('خلدا', 'Khalda'),
      place('تلاع العلي', "Tla' Al-Ali"), place('الرابية', 'Rabieh'), place('دابوق', 'Dabouq'),
      place('أبو نصير', 'Abu Nuseir'), place('الجاردنز', 'Gardens'), place('الدوار الرابع', 'Fourth Circle'),
      place('الدوار السادس', 'Sixth Circle'), place('الدوار السابع', 'Seventh Circle'), place('الدوار الثامن', 'Eighth Circle'),
      place('أم أذينة', 'Um Uthaina'), place('خريبة السوق', 'Khreibet Al-Souq'), place('طبربور', 'Tabarbour'),
      place('ماركا', 'Marka'), place('الهاشمي الشمالي', 'Hashmi Shamali'), place('الهاشمي الجنوبي', 'Hashmi Janoubi'),
      place('النزهة', 'Nuzha'), place('القويسمة', 'Quwaismeh'), place('اليادودة', 'Yadoudeh'),
      place('ناعور', 'Naour'), place('صويلح', 'Sweileh'), place('شفا بدران', 'Shafa Badran'),
      place('مرج الحمام', 'Marj Al-Hamam'), place('أبو علندا', 'Abu Alanda'), place('سحاب', 'Sahab'),
      place('الجندويل', 'Jandaweel'), place('بدر الجديدة', 'Badr Al-Jadida'), place('المقابلين', 'Muqabalain'),
      place('أم السماق', 'Um Al-Summaq'), place('ضاحية الرشيد', 'Dahiyat Al-Rasheed'), place('وادي السير', 'Wadi Al-Seer'),
      place('الجيزة', 'Jiza'), place('الموقر', 'Muwaqqar'), place('الأشرفية', 'Ashrafieh'),
    ],
  },
  {
    ...place('الزرقاء', 'Zarqa'),
    areas: [
      place('وسط الزرقاء', 'Zarqa Downtown'), place('الزرقاء الجديدة', 'New Zarqa'), place('الرصيفة', 'Russeifa'),
      place('الهاشمية', 'Hashemiyyeh'), place('ضاحية الأمير حسن', 'Dahiyat Al-Amir Hassan'), place('الظليل', 'Dhulayl'),
      place('بيرين', 'Birain'), place('الأزرق', 'Azraq'),
    ],
  },
  {
    ...place('إربد', 'Irbid'),
    areas: [
      place('وسط إربد', 'Irbid Downtown'), place('حي الجامعة', 'University District'), place('الحصن', 'Al-Husn'),
      place('الرمثا', 'Ramtha'), place('بيت راس', 'Beit Ras'), place('الطيبة', 'Taybeh'),
      place('الوسطية', 'Wastiyyeh'), place('بني كنانة', 'Bani Kenanah'), place('الكورة', 'Koura'),
      place('المزار الشمالي', 'Mazar Shamali'), place('بني عبيد', 'Bani Obeid'), place('الأغوار الشمالية', 'Northern Aghwar'),
      place('أيدون', 'Aydoun'),
    ],
  },
  {
    ...place('العقبة', 'Aqaba'),
    areas: [
      place('وسط العقبة', 'Aqaba Downtown'), place('الشلالة', 'Shallaleh'), place('الحمامات التونسية', 'Tunisian Baths'),
      place('القويرة', 'Quweira'), place('وادي عربة', 'Wadi Araba'),
    ],
  },
  {
    ...place('السلط', 'Salt'),
    areas: [
      place('وسط السلط', 'Salt Downtown'), place('الفحيص', 'Fuheis'), place('ماحص', 'Mahis'),
      place('عين الباشا', 'Ain Al-Basha'), place('دير علا', 'Deir Alla'), place('الشونة الجنوبية', 'Shouneh Janoubiyeh'),
      place('عيرا ويرقا', 'Ira and Yarqa'),
    ],
  },
  {
    ...place('مادبا', 'Madaba'),
    areas: [
      place('وسط مادبا', 'Madaba Downtown'), place('ذيبان', 'Dhiban'), place('ماعين', "Ma'in"),
      place('الفيصلية', 'Faisaliyeh'), place('جبل نيبو', 'Mount Nebo'), place('حسبان', 'Hesban'),
    ],
  },
  {
    ...place('الكرك', 'Karak'),
    areas: [
      place('وسط الكرك', 'Karak Downtown'), place('مؤتة', "Mu'tah"), place('المزار الجنوبي', 'Mazar Janoubi'),
      place('القطرانة', 'Qatraneh'), place('غور الصافي', 'Ghor Al-Safi'), place('عي', 'Ayy'),
      place('فقوع', "Fqu'"), place('القصر', 'Qasr'), place('المزرعة', "Mazra'a"),
    ],
  },
  {
    ...place('معان', "Ma'an"),
    areas: [
      place('وسط معان', "Ma'an Downtown"), place('وادي موسى', 'Wadi Musa'), place('الشوبك', 'Shoubak'),
      place('الحسينية', 'Husseiniyeh'), place('الجفر', 'Jafr'),
    ],
  },
  {
    ...place('الطفيلة', 'Tafilah'),
    areas: [
      place('وسط الطفيلة', 'Tafilah Downtown'), place('بصيرا', 'Busaira'), place('الحسا', 'Hasa'), place('عفرا', 'Afra'),
    ],
  },
  {
    ...place('جرش', 'Jerash'),
    areas: [place('وسط جرش', 'Jerash Downtown'), place('سوف', 'Souf'), place('برما', 'Burma'), place('ساكب', 'Sakib')],
  },
  {
    ...place('عجلون', 'Ajloun'),
    areas: [
      place('وسط عجلون', 'Ajloun Downtown'), place('كفرنجة', 'Kufranjah'), place('عنجرة', 'Anjara'),
      place('عين جنا', 'Ain Janna'), place('صخرة', 'Sakhra'),
    ],
  },
  {
    ...place('المفرق', 'Mafraq'),
    areas: [
      place('وسط المفرق', 'Mafraq Downtown'), place('الرويشد', 'Ruwaished'), place('الصفاوي', 'Safawi'),
      place('الخالدية', 'Khalidiyah'), place('أم الجمال', 'Umm Al-Jimal'), place('البادية الشمالية', 'Northern Badia'),
    ],
  },
];

export const defaultCityOptions = JORDAN_CITIES.map((city) => city.ar);

// The areas of one city (empty for a name that is not one of the cities above).
export const regionsForCity = (city) => {
  const found = JORDAN_CITIES.find((item) => item.ar === String(city || '').trim());
  return found ? found.areas.map((area) => area.ar) : [];
};

// The area belongs to a city, so choosing another city clears the area (there is nothing to fill in for it).
export const regionForCity = () => '';

// English display name for an Arabic city or area; unknown names (e.g. old saved addresses) stay as they are.
const EN = new Map();
JORDAN_CITIES.forEach((city) => {
  EN.set(city.ar, city.en);
  city.areas.forEach((area) => EN.set(area.ar, area.en));
});
export const placeNameEn = (name) => EN.get(String(name || '').trim()) || '';

// A saved address keeps city and area in one string ("عمّان، عبدون").
export const joinCityRegion = (city, region) => {
  const cleanCity = String(city || '').trim();
  const cleanRegion = String(region || '').trim();
  return cleanRegion ? `${cleanCity}، ${cleanRegion}` : cleanCity;
};

// The reverse: the area a saved "عبدون" part stands for.
export const regionFromCityPart = (part) => String(part || '').trim();
