import { computed, ref, watch } from 'vue';
import { legalHeroCoverStyle, legalHeroType, legalHeroUrl } from '../domain/site/legalHero';

/**
 * Header cover of a legal page (a photo or a plain colour, whichever the dashboard chose). `heroReady` stays false (the header shows a shimmer) until the settings arrived AND
 * the chosen photo finished loading, so no placeholder ever flashes before the real photo.
 */
export function useLegalHero(page, pageReady) {
  // A colour cover has no photo to wait for.
  const heroUrl = computed(() => (legalHeroType(page.value) === 'image' ? legalHeroUrl(page.value?.hero_image) : ''));
  const heroStyle = computed(() => legalHeroCoverStyle(page.value));
  const heroImageLoaded = ref(false);
  watch([pageReady, heroUrl], ([ready, url]) => {
    heroImageLoaded.value = false;
    if (!ready) return;
    if (!url) { heroImageLoaded.value = true; return; }
    const img = new Image();
    img.onload = img.onerror = () => { if (heroUrl.value === url) heroImageLoaded.value = true; };
    img.src = url;
  }, { immediate: true });
  const heroReady = computed(() => pageReady.value && heroImageLoaded.value);
  return { heroUrl, heroStyle, heroReady };
}
