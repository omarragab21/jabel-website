// How the homepage banners (hero slides) change from one to the next. The admin picks one in the dashboard
// (Homepage Banners page) and it is stored in the site setting `banner_animation`.
//
// Each id has its own CSS in modules/home/views/HomeView.vue (classes `hero-<id>-right|left`; the original
// "cinematic" one keeps its `slide-right|left` classes). The same ids are listed in the dashboard
// (src/domain/bannerAnimation.js): add a new one in both places.

export const BANNER_ANIMATION_KEY = 'banner_animation';
export const BANNER_ANIMATIONS = ['cinematic', 'fade', 'slide', 'vertical', 'zoom', 'flip', 'blur', 'kenburns', 'none'];
export const DEFAULT_BANNER_ANIMATION = 'cinematic';

/** A stored value as an animation id; empty or unknown values fall back to the original animation. */
export const resolveBannerAnimation = (value) => {
  const id = String(value ?? '').trim().toLowerCase();
  return BANNER_ANIMATIONS.includes(id) ? id : DEFAULT_BANNER_ANIMATION;
};

/** The Vue transition name for an animation and a direction ('right' or 'left'). */
export const bannerTransitionName = (animation, direction) => {
  const side = direction === 'left' ? 'left' : 'right';
  return animation === 'cinematic' ? `slide-${side}` : `hero-${animation}-${side}`;
};
