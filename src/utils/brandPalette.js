// One brand colour in, every button state out. The admin picks only the primary colour; nothing
// else is configurable, so a client can never end up with a red brand and a yellow hover.
//
//   base      the colour itself (default / enabled / loading)
//   hover     same hue, a little darker (a little lighter when the colour is already near black)
//   active    the pressed state: one step further than hover
//   ring      the keyboard-focus outline (the colour, see-through)
//   contrast  text on the colour: white or black, whichever reads better (WCAG contrast)
//
// Disabled / stuck buttons stay a fixed grey in style.css: they are not brand coloured.

const HEX = /^#[0-9a-f]{6}$/i;

const parse = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb) => `#${rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')}`;
const mix = (rgb, target, amount) => rgb.map((v, i) => v + (target[i] - v) * amount);

// WCAG relative luminance (0 black .. 1 white).
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];
// Below this luminance a darker hover would be invisible, so the hover goes lighter instead.
const TOO_DARK_TO_DARKEN = 0.06;

/** The palette for one #RRGGBB colour, or null when the value is not a valid colour. */
export const derivePalette = (value) => {
  const hex = String(value || '').trim();
  if (!HEX.test(hex)) return null;
  const rgb = parse(hex);
  const goLighter = luminance(rgb) < TOO_DARK_TO_DARKEN;
  const [toward, hoverAmount, activeAmount] = goLighter ? [WHITE, 0.2, 0.32] : [BLACK, 0.14, 0.26];
  const onWhite = contrast(rgb, WHITE);
  const onBlack = contrast(rgb, BLACK);
  return {
    base: hex.toLowerCase(),
    hover: toHex(mix(rgb, toward, hoverAmount)),
    active: toHex(mix(rgb, toward, activeAmount)),
    ring: `rgba(${rgb.join(', ')}, 0.35)`,
    contrast: onWhite >= onBlack ? '#ffffff' : '#000000',
  };
};

export const paletteContrastRatio = (a, b) => contrast(parse(a), parse(b));
