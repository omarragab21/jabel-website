// Brand colours chosen in the dashboard (Settings > Visual identity; primary_color /
// secondary_color in the site settings API). An empty or invalid value keeps the
// built-in colour.
//
// The last colours received are remembered, and main.js puts them back before
// the app renders, so a visit never shows the built-in colours first and then
// switches to the brand ones when the settings arrive.
const STORAGE_KEY = 'jb:brand-colors';
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const brandColor = (value) => (HEX_COLOR.test(String(value || '').trim()) ? String(value).trim() : '');

const setVars = (names, value) => {
  const style = document.documentElement.style;
  names.forEach((name) => (value ? style.setProperty(name, value) : style.removeProperty(name)));
};

const paint = (primary, secondary) => {
  setVars(['--primary', '--primary-dark', '--color-brand-primary'], primary);
  setVars(['--primary-hover'], primary && `color-mix(in srgb, ${primary} 85%, black)`);
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
