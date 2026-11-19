// How the homepage banners (hero slides) change from one to the next. The admin picks one in the dashboard
// (Homepage Banners page) and it is stored in the site setting `banner_animation`.
//
// "cinematic" (the original) has its CSS in modules/home/views/HomeView.vue; every other animation is in
// modules/home/styles/bannerAnimations.css, loaded only when one of them is chosen. Classes: `hero-<id>-right|left`.
// The same ids are listed in the dashboard (src/domain/bannerAnimation.js): add a new one in both places.

export const BANNER_ANIMATION_KEY = 'banner_animation';
export const DEFAULT_BANNER_ANIMATION = 'cinematic';
export const BANNER_ANIMATIONS = [
  'cinematic',
  // slide
  'slide', 'vertical', 'parallax', 'push-over', 'reveal-under', 'slide-diagonal', 'stack', 'cover-flow',
  // 3D
  'flip', 'flip-vertical', 'cube', 'cube-vertical', 'carousel-3d', 'rotate', 'fold', 'door', 'card-swap', 'tilt-shift',
  // reveal
  'wipe', 'circle-reveal', 'diamond', 'blinds', 'split', 'curtain', 'diagonal-wipe', 'iris', 'slices', 'pixelate',
  // fade and effects
  'fade', 'zoom', 'blur', 'dip-to-black', 'dip-to-white', 'flash', 'glitch', 'vhs', 'ripple', 'grayscale', 'sepia-fade', 'zoom-blur', 'light-sweep', 'pull-focus',
  // camera
  'kenburns', 'kenburns-pan', 'kenburns-in', 'dolly',
  // text
  'text-stagger', 'text-slide', 'text-reveal', 'text-blur-in',
  // combos
  'premium', 'elegant', 'energetic',
  'none',
];

// Animations that cost more to paint (3D, filters/blur, many-point clip-paths). On weak devices they play as a plain fade.
export const HEAVY_BANNER_ANIMATIONS = [
  'flip', 'flip-vertical', 'cube', 'cube-vertical', 'carousel-3d', 'cover-flow', 'fold', 'door', 'tilt-shift',
  'blur', 'zoom-blur', 'pull-focus', 'grayscale', 'sepia-fade', 'glitch', 'vhs', 'ripple', 'light-sweep', 'text-blur-in',
  'blinds', 'slices', 'pixelate', 'energetic',
];

/** A stored value as an animation id; empty or unknown values fall back to the original animation. */
export const resolveBannerAnimation = (value) => {
  const id = String(value ?? '').trim().toLowerCase();
  return BANNER_ANIMATIONS.includes(id) ? id : DEFAULT_BANNER_ANIMATION;
};

/**
 * The animation to actually play: "none" for visitors who asked for less motion, a plain fade for heavy animations on
 * weak devices (2 cores or less, 2 GB or less memory, data saver on).
 * @param {{ reducedMotion?: boolean, lowEnd?: boolean }} env
 */
export const effectiveBannerAnimation = (id, env = {}) => {
  if (env.reducedMotion) return 'none';
  if (env.lowEnd && HEAVY_BANNER_ANIMATIONS.includes(id)) return 'fade';
  return id;
};

/** Best-effort weak-device check from the browser's own hints. */
export const isLowEndDevice = (nav = typeof navigator !== 'undefined' ? navigator : {}) => {
  const cores = Number(nav.hardwareConcurrency);
  const memory = Number(nav.deviceMemory);
  return Boolean(nav.connection?.saveData) || (Number.isFinite(cores) && cores > 0 && cores <= 2) || (Number.isFinite(memory) && memory > 0 && memory <= 2);
};

/** The Vue transition name for an animation and a direction ('right' or 'left'). */
export const bannerTransitionName = (animation, direction) => {
  const side = direction === 'left' ? 'left' : 'right';
  return animation === 'cinematic' ? `slide-${side}` : `hero-${animation}-${side}`;
};
