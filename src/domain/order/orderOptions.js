// Chosen product options travel with each order item, in `items[].description`:
//
//   { "choices": [ { "quantity": 1, "options": [ { "id": 119, "attribute": "اللون", "name": "أسود ملكي" } ] } ] }
//
// The API stores that object as sent and returns it on the order. One item per product (the API rejects a
// product listed twice), so lines of one product with different choices become several `choices`.
// `id` is the product option; readers resolve it to the name in their own language and fall back to the
// stored `attribute` / `name`.
//
// Older orders (before `description` existed) carry the choices in the notes as a tagged block:
//   [MG-OPTIONS]{"v":1,"items":[{"p":75,"q":1,"o":[119,121,123]}]}[/MG-OPTIONS]
// which is still read. The notes now hold only the customer's text and, once cancelled, the reason.
//
// Keep in sync with admin/src/domain/orders/orderOptions.js.

const OPEN = '[MG-OPTIONS]';
const CLOSE = '[/MG-OPTIONS]';
const BLOCK = /\s*\[MG-OPTIONS\]([\s\S]*?)\[\/MG-OPTIONS\]\s*/;

const optionIdsOf = (line) => (Array.isArray(line?.selectedOptions) ? line.selectedOptions : [])
  .map((option) => Number(option?.id))
  .filter(Number.isFinite);

const textOf = (value, lang) => (value && typeof value === 'object' ? (value[lang] || value.ar || value.en || '') : String(value ?? ''));

/** `description` for one product from its cart lines: { choices } or null when no line has options. */
export const itemDescription = (cartLines, lang = 'ar') => {
  const choices = cartLines
    .map((line) => ({
      quantity: Math.max(1, Math.floor(Number(line.quantity) || 1)),
      options: (Array.isArray(line?.selectedOptions) ? line.selectedOptions : [])
        .filter((option) => Number.isFinite(Number(option?.id)))
        .map((option) => ({ id: Number(option.id), attribute: textOf(option.group, lang), name: textOf(option.name, lang) })),
    }))
    .filter((choice) => choice.options.length);
  return choices.length ? { choices } : null;
};

/** Adds each merged item's `description`, built from the cart lines of that product. */
export const describeOrderItems = (items, cartLines, lang = 'ar') => items.map((item) => {
  const description = itemDescription(cartLines.filter((line) => String(line.id) === String(item.product_id)), lang);
  return description ? { ...item, description } : item;
});

/**
 * Order items for the API: one item per product, quantities summed. The first
 * line of a product supplies its unit price and offer.
 */
export const mergeOrderItems = (items) => {
  const merged = new Map();
  items.forEach((item) => {
    const key = String(item.product_id);
    const existing = merged.get(key);
    if (existing) existing.quantity += item.quantity;
    else merged.set(key, { ...item });
  });
  return [...merged.values()];
};

const blockFor = (items) => `${OPEN}${JSON.stringify({ v: 1, items })}${CLOSE}`;
const joinNotes = (text, block) => (text ? `${text}\n\n${block}` : block);

/** Appends the options block for cart lines that have chosen options. */
export const appendOrderOptions = (notes, cartLines) => {
  const items = cartLines
    .map((line) => ({ p: Number(line.id), q: Math.max(1, Math.floor(Number(line.quantity) || 1)), o: optionIdsOf(line) }))
    .filter((entry) => Number.isFinite(entry.p) && entry.o.length);
  const text = stripOrderOptions(notes);
  return items.length ? joinNotes(text, blockFor(items)) : text;
};

/**
 * Fits notes into the API limit (1000 characters). The options block is kept
 * whole and the customer's text is shortened to the room left; only a block
 * that alone exceeds the limit (dozens of lines) loses its last entries.
 */
export const fitOrderNotes = (notes, limit) => {
  const text = stripOrderOptions(notes);
  let entries = parseOrderOptions(notes);
  if (!entries.length) return text.slice(0, limit);
  while (entries.length > 1 && blockFor(entries).length > limit) entries = entries.slice(0, -1);
  const block = blockFor(entries);
  if (block.length > limit) return text.slice(0, limit);
  return joinNotes(text.slice(0, Math.max(0, limit - block.length - 2)).trim(), block);
};

/** Notes without the options block (what the customer actually wrote). */
export const stripOrderOptions = (notes) => String(notes ?? '').replace(BLOCK, '\n').replace(/\s*\[MG-CANCEL\][\s\S]*?\[\/MG-CANCEL\]\s*/, '\n').trim();

// A cancellation reason travels in the notes too, because the order API does not keep a
// `cancellation_reason` field:  [MG-CANCEL]why[/MG-CANCEL]
const CANCEL_OPEN = '[MG-CANCEL]';
const CANCEL_CLOSE = '[/MG-CANCEL]';
const CANCEL_BLOCK = /\s*\[MG-CANCEL\]([\s\S]*?)\[\/MG-CANCEL\]\s*/;
const NOTES_LIMIT = 1000;

/** The cancellation reason stored in an order's notes ('' when there is none). */
export const parseCancelReason = (notes) => {
  const match = String(notes ?? '').match(CANCEL_BLOCK);
  return match ? match[1].trim() : '';
};

/**
 * Notes with the cancellation reason added (or replaced). The customer's text is shortened first when the
 * API limit (1000 characters) is tight; the options block and the reason are kept.
 */
export const withCancelReason = (notes, reason) => {
  const cleanReason = String(reason ?? '').replace(/\[\/?MG-CANCEL\]/g, '').trim();
  const withoutCancel = String(notes ?? '').replace(CANCEL_BLOCK, '\n').trim();
  if (!cleanReason) return withoutCancel;
  const optionsMatch = withoutCancel.match(BLOCK);
  const optionsBlock = optionsMatch ? optionsMatch[0].trim() : '';
  let text = withoutCancel.replace(BLOCK, '\n').trim();
  const block = `${CANCEL_OPEN}${cleanReason}${CANCEL_CLOSE}`;
  const join = (customerText) => [customerText, optionsBlock, block].filter(Boolean).join('\n\n');
  let result = join(text);
  if (result.length > NOTES_LIMIT) {
    text = text.slice(0, Math.max(0, text.length - (result.length - NOTES_LIMIT))).trim();
    result = join(text);
  }
  return result.length > NOTES_LIMIT ? result.slice(0, NOTES_LIMIT - CANCEL_CLOSE.length) + CANCEL_CLOSE : result;
};

/** [{ p, q, o }] from an order's notes; [] when there is no valid block. */
export const parseOrderOptions = (notes) => {
  const match = String(notes ?? '').match(BLOCK);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]);
    return (Array.isArray(data?.items) ? data.items : [])
      .map((entry) => ({
        p: Number(entry?.p),
        q: Math.max(1, Math.floor(Number(entry?.q) || 1)),
        o: (Array.isArray(entry?.o) ? entry.o : []).map(Number).filter(Number.isFinite),
      }))
      .filter((entry) => Number.isFinite(entry.p) && entry.o.length);
  } catch {
    return [];
  }
};

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * The chosen options of one order item: [{ quantity, options: [{ id, group, name, hex }] }].
 * Read from the item's `description`; older orders fall back to the notes block (`entries`).
 * Names come from the product's options in the language the order was fetched in, else as stored.
 */
export const orderItemChoices = (orderItem, entries = [], lang = '') => {
  const productId = Number(orderItem?.product_id ?? orderItem?.product?.id);
  const productOptions = orderItem?.product?.options ?? orderItem?.options;
  const available = new Map(
    (Array.isArray(productOptions) ? productOptions : [])
      .map((option) => [Number(option.id), option]),
  );
  const resolve = (id, stored = {}) => {
    const option = available.get(Number(id));
    if (!option && !stored.name) return null;
    const code = String(option?.value_code ?? '');
    return {
      id: Number(id),
      group: String(option?.attribute?.translations?.[lang]?.name ?? option?.attribute_name ?? stored.attribute ?? ''),
      name: String(option?.translations?.[lang]?.name ?? option?.name ?? stored.name ?? ''),
      hex: option && (option.type === 'color_swatch' || HEX.test(code)) ? code : null,
    };
  };

  const described = orderItem?.description?.choices;
  if (Array.isArray(described)) {
    return described
      .map((choice) => ({
        quantity: Math.max(1, Math.floor(Number(choice?.quantity) || 1)),
        options: (Array.isArray(choice?.options) ? choice.options : []).map((option) => resolve(option?.id, option)).filter(Boolean),
      }))
      .filter((choice) => choice.options.length);
  }

  return entries
    .filter((entry) => entry.p === productId)
    .map((entry) => ({ quantity: entry.q, options: entry.o.map((id) => resolve(id)).filter(Boolean) }))
    .filter((choice) => choice.options.length);
};
