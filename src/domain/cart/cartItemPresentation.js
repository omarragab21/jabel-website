// The API's product `attributes` lists every option a product offers ({ Color: [{ name }, ...] });
// only a plain text value is something the customer actually chose.
const plainText = (value) => (typeof value === 'string' ? value.split('|')[0].trim() : '');

export function getCartItemSku(item) {
  return item.sku || item.model_number || item.model || item.code || '';
}

export function getCartItemSubtitle(item, { isEnglish = false } = {}) {
  if (item.subtitle) return item.subtitle;

  const attributes = item.selectedAttributes || item.attributes;
  if (attributes && typeof attributes === 'object' && !Array.isArray(attributes)) {
    const color = plainText(attributes.color || attributes['اللون'] || attributes.Color);
    const size = plainText(attributes.size || attributes['المقاس'] || attributes.Size || attributes['الحجم']);
    const parts = [color, size].filter(Boolean);
    if (parts.length > 0) return parts.join(isEnglish ? ', ' : '، ');
  }

  if (item.description_i18n) {
    const languageKey = isEnglish ? 'en' : 'ar';
    const description = item.description_i18n[languageKey]
      || item.description_i18n.ar
      || item.description_i18n.en;
    if (description) {
      const parts = description.split(isEnglish ? ',' : '،');
      return parts.slice(0, 2).join(isEnglish ? ', ' : '، ');
    }
  }

  return typeof item.short_description === 'string' ? item.short_description : '';
}
