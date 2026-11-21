import { watchEffect } from 'vue';
import { siteIdentity, siteNameText, siteSeo } from '../store/siteIdentity.js';
import { absoluteImageUrl } from '../domain/site/seoMeta.js';
import { JABEL_SEO } from '../domain/site/seoDefaults.js';

// Jabel's own text (domain/site/seoDefaults.js), in the language being shown; the logo is the share image.
const defaultSeo = (lang) => ({ ...JABEL_SEO[lang === 'en' ? 'en' : 'ar'], image: '/brand/jabel-logo.png' });

// The first filled value. `siteWide` pages (the home page) let the dashboard's SEO text win over the page's own text;
// every other page keeps its own text and uses the dashboard's only where it has none.
const firstFilled = (...values) => values.find((value) => typeof value === 'string' && value.trim() !== '');

export function useSEO(options = {}) {
  watchEffect(() => {
    const origin = window.location.origin;
    const seo = siteSeo.value;
    const DEFAULT_SEO = defaultSeo(siteIdentity.lang);
    // The main logo from the dashboard is the share image until a dedicated one is uploaded.
    const logo = typeof siteIdentity.settings?.logo === 'string' ? siteIdentity.settings.logo : '';
    const own = options.siteWide ? [seo, options] : [options, seo];
    const brand = siteNameText.value || 'جبل Jabel';
    const seoTitle = options.siteWide
      ? firstFilled(seo.title, options.seoTitle, options.title && `${options.title} | ${brand}`, DEFAULT_SEO.title)
      : firstFilled(options.seoTitle, options.title && `${options.title} | ${brand}`, seo.title, DEFAULT_SEO.title);
    const description = firstFilled(...own.map((source) => source.description), DEFAULT_SEO.description);
    const keywords = firstFilled(...own.map((source) => source.keywords), DEFAULT_SEO.keywords);
    const rawImage = firstFilled(...own.map((source) => source.image), logo) || DEFAULT_SEO.image;
    const image = absoluteImageUrl(rawImage, origin) || absoluteImageUrl(DEFAULT_SEO.image, origin);
    const url = options.url || origin;

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
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', seoTitle);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', image);

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
      injectJSONLD(getStoreSchema(siteIdentity.settings, origin));
    }
  });
}

function updateMetaName(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
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

// The shop for Google (schema.org Pharmacy). Contact details come from the dashboard; nothing is made up.
export function getStoreSchema(settings = {}, origin = '') {
  const text = (value) => (typeof value === 'string' ? value.trim() : '');
  const logo = absoluteImageUrl(text(settings?.logo), origin) || absoluteImageUrl('/brand/jabel-logo.png', origin);
  const address = text(settings?.address_en) || text(settings?.address_ar);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    'name': 'صيدليات الجبل | Al-Jabal Pharmacies',
    'alternateName': 'Dr. Jable',
    'image': logo,
    'logo': logo,
    'url': origin,
    'description': JABEL_SEO.ar.description,
  };
  const phone = text(settings?.support_phone) || text(settings?.site_contact_phone);
  const email = text(settings?.support_email) || text(settings?.email);
  if (phone) schema.telephone = phone;
  if (email) schema.email = email;
  if (address) schema.address = { '@type': 'PostalAddress', 'streetAddress': address, 'addressCountry': 'JO' };
  return schema;
}
