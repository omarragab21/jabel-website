import { watchEffect } from 'vue';
import { siteNameText } from '../store/siteIdentity.js';

const DEFAULT_SEO = {
  title: 'جبل | Jabel - أجهزة وأفران غاز إيطالية فاخرة في السعودية',
  description: 'المتجر الرسمي لأجهزة وأفران ومواقد الغاز الإيطالية جبل في المملكة العربية السعودية. صناعة إيطالية فاخرة 100%، أمان تام، ضمان سنتين شامل، وتوصيل لكافة مدن المملكة.',
  keywords: [
    'جبل', 'Jabel', 'أفران غاز إيطالية', 'مواقد غاز بلت إن', 'سطح غاز إيطالي',
    'أجهزة مطابخ إيطالية', 'مواقد بلت إن', 'جبل السعودية', 'Jabel Saudi',
    'أفران بلت إن', 'موقد غاز أمان كامل', 'شفاطات مطابخ', 'أجهزة غاز إيطالية',
    'توصيل أفران الرياض', 'أجهزة مطابخ جدة', 'مواقد غاز الدمام', 'وكيل جبل السعودية'
  ].join(', '),
  image: 'https://jabel-website.vercel.app/og-image.png',
  url: 'https://jabel-website.vercel.app'
};

export function useSEO(options = {}) {
  watchEffect(() => {
    const seoTitle = options.seoTitle || (options.title ? `${options.title} | جبل Jabel` : DEFAULT_SEO.title);
    const description = options.description || DEFAULT_SEO.description;
    const keywords = options.keywords || DEFAULT_SEO.keywords;
    const rawImage = options.image || DEFAULT_SEO.image;
    const image = rawImage.startsWith('http') ? rawImage : `https://jabel-website.vercel.app${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
    const url = options.url || DEFAULT_SEO.url;

    // Browser tab title: the site name from the dashboard, in the language being shown
    document.title = options.tabTitle || siteNameText.value;

    // Meta Title for Google SEO
    let metaTitle = document.querySelector('meta[name="title"]');
    if (!metaTitle) {
      metaTitle = document.createElement('meta');
      metaTitle.setAttribute('name', 'title');
      document.head.appendChild(metaTitle);
    }
    metaTitle.setAttribute('content', seoTitle);

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta Keywords
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement('meta');
      metaKey.setAttribute('name', 'keywords');
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute('content', keywords);

    // OpenGraph
    updateMetaProperty('og:title', seoTitle);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', image);
    updateMetaProperty('og:url', url);
    updateMetaProperty('og:site_name', siteNameText.value);
    updateMetaProperty('og:type', options.type || 'website');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Structured Data (Schema.org)
    if (options.schema) {
      injectJSONLD(options.schema);
    } else {
      injectJSONLD(getStoreSchema());
    }
  });
}

function updateMetaProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function injectJSONLD(schemaData) {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaData);
}

export function getStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    'name': 'جبل Jabel - أجهزة وأفران طهي إيطالية',
    'image': 'https://jabel-website.vercel.app/logo.png',
    '@id': 'https://jabel-website.vercel.app',
    'url': 'https://jabel-website.vercel.app',
    'telephone': '+966-920000000',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Riyadh',
      'addressRegion': 'Riyadh',
      'addressCountry': 'SA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 24.7136,
      'longitude': 46.6753
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'
      ],
      'opens': '09:00',
      'closes': '22:00'
    },
    'sameAs': [],
    'description': 'المتجر الرسمي لأجهزة وأفران ومواقد الغاز الإيطالية جبل في المملكة العربية السعودية. جودة إيطالية، أمان كامل، وضمان شامل سنتين.'
  };
}
