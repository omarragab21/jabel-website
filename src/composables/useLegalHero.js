import { computed, ref, watch } from 'vue';
import { legalHeroStyle, legalHeroUrl } from '../domain/site/legalHero';

/**
 * Header photo of a legal page. `heroReady` stays false (the header shows a shimmer) until the settings arrived AND
 * the chosen photo finished loading, so no placeholder ever flashes before the real photo.
 */
export function useLegalHero(page, pageReady) {
  const heroUrl = computed(() => legalHeroUrl(page.value?.hero_image));
  const heroStyle = computed(() => legalHeroStyle(heroUrl.value));
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
