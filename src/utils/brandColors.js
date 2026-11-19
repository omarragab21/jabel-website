// Brand colours chosen in the dashboard (Settings > Visual identity; primary_color /
// secondary_color in the site settings API). An empty or invalid value keeps the
// built-in colour.
//
// The last colours received are remembered, and main.js puts them back before
// the app renders, so a visit never shows the built-in colours first and then
// switches to the brand ones when the settings arrive.
import { derivePalette } from './brandPalette';

const STORAGE_KEY = 'jb:brand-colors';
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const brandColor = (value) => (HEX_COLOR.test(String(value || '').trim()) ? String(value).trim() : '');

const setVars = (names, value) => {
  const style = document.documentElement.style;
  names.forEach((name) => (value ? style.setProperty(name, value) : style.removeProperty(name)));
};

// Only the primary colour is chosen; its hover, pressed, focus and text colours are derived
// from it (see brandPalette.js), so every button state follows the brand colour by itself.
const paint = (primary, secondary) => {
  const palette = derivePalette(primary);
  setVars(['--primary', '--primary-dark', '--color-brand-primary'], primary);
  setVars(['--primary-hover', '--color-brand-hover'], palette?.hover);
  setVars(['--color-brand-active'], palette?.active);
  setVars(['--color-brand-ring'], palette?.ring);
  setVars(['--color-brand-contrast'], palette?.contrast);
  setVars(['--secondary', '--color-brand-secondary'], secondary);
};

/** Apply the colours from the site settings and remember them for the next visit. */
export const applyBrandColors = (primaryValue, secondaryValue) => {
  const primary = brandColor(primaryValue);
  const secondary = brandColor(secondaryValue);
  paint(primary, secondary);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ primary, secondary }));
  } catch { /* storage unavailable: the colours still apply for this visit */ }
};

/** Put back the colours from the last visit. Call before the app mounts. */
export const restoreBrandColors = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) paint(brandColor(saved.primary), brandColor(saved.secondary));
  } catch { /* nothing remembered */ }
};
