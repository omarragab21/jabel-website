import { computed } from 'vue';
import { extractColorOptions, isColorAttribute, isSizeAttribute, localizedText } from '../../../utils/productAttributes';

export function useProductContent({ product, locale, localized, selectedAttributes, getActiveOfferForProduct, calculatePriceWithOffer }) {
  const contentLines = (value) => {
    const values = Array.isArray(value) ? value : String(value ?? '').split(/\r?\n/);
    return values
      .map((item) => String(item ?? '').replace(/^[-•*❖]\s*/, '').trim())
      .filter(Boolean);
  };

  // Header bullet points: every point entered under Features in the dashboard.
  const productFeatures = computed(() => {
    const rawFeat = localized(product.value, 'features') || product.value?.features;
    return contentLines(rawFeat);
  });
  
  // Dynamic Overview Data
  const dynamicOverviewTitle = computed(() => {
    return locale.value === 'ar' ? 'تحكم كامل وتوزيع حراري متساوٍ' : 'Complete Control & Uniform Heat Distribution';
  });
  
  const dynamicOverviewDesc = computed(() => {
    const desc = localized(product.value, 'description');
    return String(desc ?? '').trim();
  });
  
  const dynamicOverviewFeatures = computed(() => {
    const rawFeat = localized(product.value, 'features') || product.value?.features;
    return contentLines(rawFeat);
  });

  const installationItems = computed(() => contentLines(localized(product.value, 'tips')));
  const shippingItems = computed(() => contentLines(localized(product.value, 'shipping_info')));
  
  // Dynamic Technical Specifications driven directly from API
  const technicalSpecifications = computed(() => {
    const isAr = locale.value === 'ar';
    const prod = product.value || {};
    const attrs = prod.attributes || prod.raw_attributes || {};

    function cleanSpecValue(val) {
      if (val === undefined || val === null) return '';
      let str = String(localizedText(val) ?? '').trim();
      if (isAr) {
        str = str.replace(/\s*\([A-Za-z0-9\s/&,.-]+\)/g, '').trim();
      }
      return str;
    }
  
    const specKeyMap = {
      'الارتفاع': { ar: 'الارتفاع', en: 'Height' },
      'height': { ar: 'الارتفاع', en: 'Height' },
      'العرض': { ar: 'العرض', en: 'Width' },
      'width': { ar: 'العرض', en: 'Width' },
      'السعة': { ar: 'السعة', en: 'Capacity' },
      'capacity': { ar: 'السعة', en: 'Capacity' },
      'العمر': { ar: 'العمر', en: 'Age' },
      'age': { ar: 'العمر', en: 'Age' },
      'العمق': { ar: 'العمق', en: 'Depth' },
      'depth': { ar: 'العمق', en: 'Depth' },
      'الجهد الكهربائي': { ar: 'الجهد الكهربائي', en: 'Voltage' },
      'voltage': { ar: 'الجهد الكهربائي', en: 'Voltage' },
      'نوع الطاقة': { ar: 'نوع الطاقة', en: 'Energy Source' },
      'energy': { ar: 'نوع الطاقة', en: 'Energy Source' },
      'energy_source': { ar: 'نوع الطاقة', en: 'Energy Source' },
      'power': { ar: 'نوع الطاقة', en: 'Energy Source' },
      'المؤقت الرقمي': { ar: 'المؤقت الرقمي', en: 'Digital Timer' },
      'timer': { ar: 'المؤقت الرقمي', en: 'Digital Timer' },
      'وظائف الطهي': { ar: 'وظائف الطهي', en: 'Cooking Functions' },
      'functions': { ar: 'وظائف الطهي', en: 'Cooking Functions' },
      'نظام الإشعال': { ar: 'نظام الإشعال', en: 'Ignition System' },
      'ignition': { ar: 'نظام الإشعال', en: 'Ignition System' },
      'صمام الأمان': { ar: 'صمام الأمان', en: 'Safety Valve' },
      'safety': { ar: 'صمام الأمان', en: 'Safety Valve' },
      'بلد المنشأ': { ar: 'بلد المنشأ', en: 'Country of Origin' },
      'origin': { ar: 'بلد المنشأ', en: 'Country of Origin' },
      'الخامة': { ar: 'الخامة', en: 'Material' },
      'المادة': { ar: 'الخامة', en: 'Material' },
      'material': { ar: 'الخامة', en: 'Material' },
      'اللون والمظهر': { ar: 'اللون', en: 'Color' },
      'color_finish': { ar: 'اللون', en: 'Color' },
      'نوع الحوامل': { ar: 'نوع الحوامل', en: 'Pan Supports' },
      'pan_supports': { ar: 'نوع الحوامل', en: 'Pan Supports' },
      'pan_support': { ar: 'نوع الحوامل', en: 'Pan Supports' },
      'مستويات السرعة': { ar: 'مستويات السرعة', en: 'Speed Levels' },
      'speed': { ar: 'مستويات السرعة', en: 'Speed Levels' },
      'نوع الفلتر': { ar: 'نوع الفلتر', en: 'Filter Type' },
      'filter': { ar: 'نوع الفلتر', en: 'Filter Type' },
      'مستوى الضوضاء': { ar: 'مستوى الضوضاء', en: 'Noise Level' },
      'noise': { ar: 'مستوى الضوضاء', en: 'Noise Level' },
      'ضغط المياه المناسب': { ar: 'ضغط المياه المناسب', en: 'Operating Water Pressure' },
      'pressure': { ar: 'ضغط المياه المناسب', en: 'Operating Water Pressure' },
      'عدد الشعلات': { ar: 'عدد الشعلات', en: 'Burners Count' },
      'burners': { ar: 'عدد الشعلات', en: 'Burners Count' },
      'الوزن الصافي': { ar: 'الوزن الصافي', en: 'Net Weight' },
      'weight': { ar: 'الوزن الصافي', en: 'Net Weight' }
    };
  
    // Every attribute picked for the product in the dashboard is one row of the
    // specifications table: the attribute name (from the API, in the page language)
    // and its value. Each attribute holds one value; several are joined with « / ».
    const SKIP_KEYS = new Set(['images', 'image', 'dimensions', 'الأبعاد']);
    const valueText = (item) => {
      if (item && typeof item === 'object') return String(localizedText(item.label ?? item.name ?? item.value) ?? '').trim();
      return String(item ?? '').split('|', 1)[0].trim();
    };
    const specsList = [];
    Object.entries(attrs && typeof attrs === 'object' ? attrs : {}).forEach(([key, raw]) => {
      if (SKIP_KEYS.has(key)) return;
      const values = (Array.isArray(raw) ? raw : [raw]).map(valueText).filter((text) => text && text !== 'null');
      if (!values.length) return;
      const label = specKeyMap[key] ? (isAr ? specKeyMap[key].ar : specKeyMap[key].en) : key;
      specsList.push({ label, value: cleanSpecValue([...new Set(values)].join(' / ')) });
    });
    return specsList.filter(item => item?.label && item?.value);
  });
  
  const specRows = computed(() => {
    const rows = [];
    const list = technicalSpecifications.value;
    for (let i = 0; i < list.length; i += 2) {
      rows.push({
        col1: list[i],
        col2: list[i + 1] || null
      });
    }
    return rows;
  });
  
  // Normalized Attributes & Color Options
  const normalizedAttributes = computed(() => {
    if (!product.value) return [];
    const result = [];
    const attributeLabels = {
      age: { ar: 'العمر', en: 'Age' },
      'العمر': { ar: 'العمر', en: 'Age' },
    };
    const rawAttrs = product.value.attributes && typeof product.value.attributes === 'object'
      ? product.value.attributes
      : {};
  
    const parseOption = (raw) => {
      if (raw && typeof raw === 'object') return localizedText(raw.label ?? raw.name ?? raw.value);
      return String(raw ?? '').split('|', 1)[0].trim();
    };
  
    const colors = extractColorOptions(product.value);
    
    if (colors.length > 0) {
      result.push({
        key: 'color',
        label: locale.value === 'ar' ? 'اللون' : 'Color',
        isColor: true,
        options: colors
      });
    }
  
    Object.entries(rawAttrs).forEach(([key, rawValue]) => {
      if (['color', 'اللون', 'Color', 'الالوان'].includes(key) || isColorAttribute({ name: key, label: key })) return;
      const options = (Array.isArray(rawValue) ? rawValue : [rawValue]).map(parseOption).filter(Boolean);
      if (options.length > 0) {
        result.push({
          key,
          label: attributeLabels[key.toLowerCase()]?.[locale.value] || localizedText(key),
          isColor: false,
          isSize: isSizeAttribute({ name: key, label: key }),
          options: [...new Set(options)]
        });
      }
    });
    return result;
  });
  
  const isBlacklistedSpec = (key) => {
    const k = String(key || '').toLowerCase().trim();
    const blacklisted = [
      'خامة', 'خامات', 'material', 'materials',
      'ضمان', 'warranty',
      'أبعاد', 'ابعاد', 'dimension', 'dimensions',
      'منشأ', 'origin', 'بلد', 'بلد_المنشأ',
      'شعلة', 'شعلات', 'burner', 'burners',
      'قدرة', 'حرارية', 'حراريه', 'btu', 'thermal', 'power',
      'أمان', 'امان', 'safety',
      'حامل', 'حوامل', 'pan_support', 'pan_supports',
      'سرعة', 'speed',
      'فلتر', 'filter',
      'ضوضاء', 'noise',
      'ضغط', 'pressure',
      'وظيفة', 'وظائف', 'function', 'functions',
      'وزن', 'weight',
      'جهد', 'فولت', 'voltage',
      'مؤقت', 'timer',
      'إشعال', 'اشعال', 'ignition',
      'طاقة', 'energy', 'energy_source',
      'ارتفاع', 'عرض', 'عمق', 'سعة'
    ];
    return blacklisted.some(term => k.includes(term));
  };
  
  const selectableAttributes = computed(() => {
    return normalizedAttributes.value.filter((attr) => {
      if (attr.isColor) return false;
      if (isBlacklistedSpec(attr.key) || isBlacklistedSpec(attr.label)) return false;
      // Besides color, only size and capacity can be chosen.
      if (!/\bsize\b|capacity|حجم|الحجم|مقاس|سعة|السعة/i.test(`${attr.key} ${attr.label}`)) return false;
      // Only real variant choices that have more than 1 option to choose from!
      return Array.isArray(attr.options) && attr.options.length > 1;
    });
  });
  
  const colorOptions = computed(() => {
    const options = extractColorOptions(product.value);
    return options;
  });
  
  const selectedColorName = computed(() => {
    const selected = selectedAttributes.value['color'] || selectedAttributes.value['اللون'];
    if (selected) return selected;
    return colorOptions.value[0]?.label || colorOptions.value[0]?.name || '';
  });
  
  const selectColor = (name) => {
    selectedAttributes.value['color'] = name;
    selectedAttributes.value['اللون'] = name;
  };
  
  const selectAttribute = (key, value) => {
    selectedAttributes.value[key] = value;
  };
  
  // Calculate active offer for this product
  const activeOffer = computed(() => {
    if (product.value) {
      return getActiveOfferForProduct(product.value);
    }
    return null;
  });
  
  const currentPrice = computed(() => {
    if (activeOffer.value) {
      return calculatePriceWithOffer(product.value, activeOffer.value);
    }
    const price = Number(product.value?.price);
    if (!Number.isFinite(price)) return null;
    const salePrice = Number(product.value?.sale_price) || 0;
    if (salePrice > 0 && salePrice < price) return salePrice;
    const discount = Number(product.value?.discount) || 0;
    return price * (1 - discount / 100);
  });

  return {
    productFeatures,
    installationItems,
    shippingItems,
    dynamicOverviewTitle,
    dynamicOverviewDesc,
    dynamicOverviewFeatures,
    specRows,
    colorOptions,
    selectedColorName,
    selectableAttributes,
    selectColor,
    selectAttribute,
    currentPrice,
  };
}
