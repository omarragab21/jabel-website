// The fixed texts of the About Us page, editable from the dashboard (Settings > About Us).
// Every text is stored in the settings API as `<key>_ar` / `<key>_en`. The values below are
// what the page shows until the dashboard saves something else. A field saved empty hides that part of the page.
// The dashboard (admin/src/domain/aboutPageContent.js) keeps the same keys and defaults.
export const ABOUT_PAGE_DEFAULTS = Object.freeze({
  about_hero_tagline: { ar: 'الجودة والابتكار في الطهي الحديث', en: 'Quality & Innovation in Modern Cooking' },
  about_hero_title: { ar: 'لماذا Jabel؟', en: 'Why Jabel?' },
  about_hero_subtitle: {
    ar: 'رحلة شغف بالتميز، نجمع بين عراقة الطهي الإيطالي وجودة لا تضاهى في منزلك',
    en: 'A passionate journey of excellence, combining authentic Italian culinary heritage with unmatched quality in your home.',
  },

  about_section_1_tag: { ar: 'عن جبل', en: 'About Jabel' },
  about_section_2_tag: { ar: 'ريادة هندسية إيطالية', en: 'Italian Engineering Leadership' },
  about_section_3_tag: { ar: 'التزامنا تجاه البيوت السعودية', en: 'Our Commitment to Saudi Homes' },

  about_values_title: { ar: 'قيمنا الراسخة', en: 'Our Core Values' },
  about_values_subtitle: {
    ar: 'المبادئ التي تقودنا في كل خطوة نقدمها لعملائنا',
    en: 'The core principles guiding every step of our commitment to our customers',
  },
  about_value_1_title: { ar: 'جودة بلا مساومة', en: 'Uncompromising Quality' },
  about_value_1_desc: {
    ar: 'نلتزم بأعلى معايير التصنيع الإيطالي مع استخدام أجود خامات الفولاذ المقاوم للصدأ والمكونات فائقة التحمل.',
    en: 'We adhere to the highest Italian manufacturing benchmarks, utilizing premium surgical stainless steel and heavy-duty components.',
  },
  about_value_2_title: { ar: 'أمان لكل أسرة', en: 'Safety for Every Family' },
  about_value_2_desc: {
    ar: 'أنظمة أمان ذكية متطورة مع صمامات غلق فوري لضمان الحماية القصوى لك ولعائلتك في جميع الأوقات.',
    en: 'Advanced intelligent safety systems with instant flame failure shutoff valves to ensure absolute peace of mind at all times.',
  },
  about_value_3_title: { ar: 'استدامة ومسؤولية', en: 'Sustainability & Responsibility' },
  about_value_3_desc: {
    ar: 'كفاءة بيئية عالية في استهلاك الغاز والطاقة، مع تصميمات تدوم طويلاً لتقليل الهدر وتعزيز الاستدامة.',
    en: 'Eco-conscious energy and gas efficiency with durable longevity designed to minimize waste and promote sustainability.',
  },

  about_stats_title: { ar: 'أرقام تفخر بها جودتنا', en: 'Numbers Behind Our Quality' },
  about_stats_subtitle: {
    ar: 'مسيرة حافلة بالإنجازات والريادة في السوق السعودي',
    en: 'A proud track record of distinction and trust in the Saudi market',
  },
  about_stat_1_value: { ar: '100%', en: '100%' },
  about_stat_1_label: { ar: 'ضمان شامل معتمد', en: 'Certified Peace of Mind' },
  about_stat_2_value: { ar: '+10 سنوات', en: '10+ Years' },
  about_stat_2_label: { ar: 'خبرة التميز والريادة', en: 'Years of Culinary Excellence' },
  about_stat_3_value: { ar: 'إيطالي', en: 'Italian' },
  about_stat_3_label: { ar: 'تصميم وهندسة أصلية', en: 'Authentic Italian Engineering' },

  about_cta_title: { ar: 'Jabel — مصممة للحياة الواقعية', en: 'Jabel — Engineered for Real Life' },
  about_cta_subtitle: {
    ar: 'ابدأ الآن في تصفح منتجاتنا واكتشف الحلول الإيطالية التي تناسب ذوق منزلك',
    en: 'Explore our collection now and discover Italian culinary solutions tailored to your home',
  },
  about_cta_button: { ar: 'تسوق الآن', en: 'Shop Now' },
});

/**
 * The text for `key` in `lang` ('ar' | 'en'). Once the dashboard has saved the field, its value is used
 * as is — an emptied field returns '' and the page removes that part. Only a field that was never saved
 * falls back to the built-in text.
 */
export const aboutText = (settings, key, lang) => {
  const suffix = lang === 'ar' ? 'ar' : 'en';
  const field = `${key}_${suffix}`;
  if (settings && Object.hasOwn(settings, field)) {
    const saved = settings[field];
    return typeof saved === 'string' ? saved.trim() : '';
  }
  return ABOUT_PAGE_DEFAULTS[key]?.[suffix] ?? '';
};
