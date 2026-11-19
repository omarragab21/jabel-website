<template>
  <div class="jabel-legal-info" :class="{ 'is-en': !isRtl }" :dir="isRtl ? 'rtl' : 'ltr'">
    
    <!-- 1. Hero Banner matching Figma hero-banner -->
    <section class="hero-banner" :class="{ 'legal-hero-loading sk-shimmer': !heroReady }" :style="heroReady ? heroStyle : {}" :aria-busy="!heroReady">
      <div v-if="!heroReady" class="hero-content" aria-hidden="true">
        <span class="sk-shimmer legal-hero-sk legal-hero-sk-title"></span>
        <span class="sk-shimmer legal-hero-sk legal-hero-sk-sub"></span>
      </div>
      <div v-else class="hero-content">
        <!-- الشروط والأحكام / Terms & Conditions -->
        <h1 class="hero-title">
          {{ isRtl ? meta.titleAr : meta.titleEn }}
        </h1>
        
        <!-- آخر تحديث / Last Updated Subtitle -->
        <p class="hero-subtitle">
          {{ subtitle }}
        </p>
      </div>
    </section>

    <!-- 2. Legal Content Container -->
    <main class="legal-content-container">
      <article v-if="!pageReady" class="legal-sheet legal-sheet-loading" aria-busy="true">
        <span v-for="n in 8" :key="n" class="sk-shimmer sk-line" :style="{ width: `${100 - (n % 3) * 14}%` }"></span>
      </article>
      <article v-else class="legal-sheet">

        <!-- attention-alert-banner (edited from the dashboard; removed when it has no text) -->
        <LegalNoticeBanner
          v-if="hasBanner"
          variant="info"
          :title="bannerTitle"
          :text="bannerText"
          :icon="noticeIcon"
          :is-rtl="isRtl"
        />

        <!-- Questions and answers (edited from the dashboard). <details> keeps every answer in the page HTML for search engines. -->
        <div v-if="sections.length" class="qa-list">
          <details v-for="section in sections" :key="section.position" class="qa-item">
            <summary class="qa-question">
              <span>{{ isRtl ? section.title_ar : section.title_en }}</span>
              <svg class="qa-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <p class="qa-answer">{{ isRtl ? section.text_ar : section.text_en }}</p>
          </details>
        </div>
        <p v-else class="qa-empty">{{ isRtl ? 'سيتم إضافة المحتوى قريباً.' : 'Content will be added soon.' }}</p>

      </article>
    </main>

  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useLocalized } from '../../../composables/useLocalized';
import { useSEO } from '../../../composables/useSEO';
import { useLegalHero } from '../../../composables/useLegalHero';
import LegalNoticeBanner from '../../../components/LegalNoticeBanner.vue';
import noticeIcon from '../../../assets/legal/notification.svg';
import { useRoute } from 'vue-router';
import { emptyLegalPage, formatLegalMonth, formatSectionNumber, loadLegalPage, peekLegalPage } from '../../../services/legalPages';

const { currentLang } = useLocalized();
const isRtl = computed(() => currentLang.value === 'ar');

// 'returns' or 'faq' (set on the route); the text is edited in the dashboard like the other legal pages.
const route = useRoute();
const PAGES = {
  returns: {
    titleAr: 'سياسة الإرجاع والاستبدال',
    titleEn: 'Returns & Exchange Policy',
    keywords: 'سياسة الإرجاع, الاستبدال, جبل, Jabel returns policy, exchange',
  },
  faq: {
    titleAr: 'الأسئلة الشائعة',
    titleEn: 'Frequently Asked Questions',
    keywords: 'الأسئلة الشائعة, جبل, Jabel FAQ',
  },
};
const pageId = computed(() => (route.meta.legalPage in PAGES ? route.meta.legalPage : 'returns'));
const meta = computed(() => PAGES[pageId.value]);

// Fresh cached settings render the text at once; otherwise skeleton lines show until it arrives.
const cachedPage = peekLegalPage(pageId.value);
const page = ref(cachedPage || emptyLegalPage());
const pageReady = ref(Boolean(cachedPage));
const sections = computed(() => page.value.sections);

// Title/description/keywords for search engines; the questions and answers go in as FAQPage structured data.
useSEO({
  get title() { return isRtl.value ? meta.value.titleAr : meta.value.titleEn; },
  get description() { return (isRtl.value ? page.value.tagline_ar : page.value.tagline_en) || (isRtl.value ? meta.value.titleAr : meta.value.titleEn); },
  get keywords() { return meta.value.keywords; },
  get schema() {
    const items = sections.value.filter((s) => s.title_ar && s.text_ar);
    if (!items.length) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: isRtl.value ? 'ar' : 'en',
      mainEntity: sections.value.map((s) => ({
        '@type': 'Question',
        name: isRtl.value ? s.title_ar : s.title_en,
        acceptedAnswer: { '@type': 'Answer', text: isRtl.value ? s.text_ar : s.text_en },
      })),
    };
  },
});
// Header photo from the dashboard; shimmer until settings and photo are loaded.
const { heroStyle, heroReady } = useLegalHero(page, pageReady);
const subtitle = computed(() => {
  const updated = formatLegalMonth(page.value.updated_at, currentLang.value);
  const tagline = isRtl.value ? page.value.tagline_ar : page.value.tagline_en;
  const label = isRtl.value ? 'آخر تحديث' : 'Last updated';
  return [updated && `${label}: ${updated}`, tagline].filter(Boolean).join(' · ');
});

// The legal alert at the top: shown in the page language when it has a title or text, otherwise removed.
const bannerTitle = computed(() => (isRtl.value ? page.value.banner.title_ar : page.value.banner.title_en));
const bannerText = computed(() => (isRtl.value ? page.value.banner.text_ar : page.value.banner.text_en));
const hasBanner = computed(() => Boolean(bannerTitle.value || bannerText.value));

const load = async () => {
  try {
    page.value = await loadLegalPage(pageId.value);
  } catch (error) {
    console.warn('Legal page could not be loaded from the settings API:', error?.message);
  } finally {
    pageReady.value = true;
  }
};
onMounted(load);
// /returns-policy -> /faq reuses this component: load the other page.
watch(pageId, () => {
  page.value = peekLegalPage(pageId.value) || emptyLegalPage();
  pageReady.value = false;
  load();
});
</script>

<style scoped>
.legal-sheet-loading {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ============================================================
   Page Base: jabel-terms
   ============================================================ */
.jabel-legal-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #F8FAFC;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  box-sizing: border-box;
  margin-top: 120px; /* Offset for 40px announcement bar + 80px navbar */
}

/* ============================================================
   1. Hero Banner
   ============================================================ */
.hero-banner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 24px;
  width: 100%;
  min-height: 240px;
  
  /* Photorealistic luxury kitchen background with dark overlay */
  /* No built-in photo: the header image comes only from the dashboard; plain dark until/unless one is set. */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) center / cover no-repeat;
  background-color: #0F172A;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.hero-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  text-align: center;
  color: var(--legal-hero-fg, #FFFFFF);
  margin: 0;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: var(--legal-hero-fg, #FFFFFF);
  opacity: 0.8;
  margin: 0;
}

/* ============================================================
   2. Legal Content Container
   ============================================================ */
.legal-content-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 64px;
  width: 100%;
  background-color: #F8FAFC;
}

/* legal-sheet card */
.legal-sheet {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px;
  gap: 40px;
  width: 100%;
  max-width: 960px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.0196078);
  border-radius: 8px;
}

/* ============================================================
   3. Legal Sections
   ============================================================ */
.legal-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;
}

.heading-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  min-height: 36px;
}

.section-heading {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
  margin: 0;
  width: 100%;
}

.section-body {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #64748B;
  margin: 0;
  width: 100%;
}

.section-divider-line {
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  background-color: #E2E8F0;
  border: none;
  margin-top: 24px;
}

/* Questions and answers */
.qa-list { display: flex; flex-direction: column; width: 100%; }
.qa-item { border-bottom: 1px solid #E2E8F0; }
.qa-item:last-child { border-bottom: none; }
.qa-question {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 20px 0; cursor: pointer; list-style: none;
  font-weight: 700; font-size: 18px; line-height: 28px; color: #000;
}
.qa-question::-webkit-details-marker { display: none; }
.qa-chevron { flex-shrink: 0; color: #64748B; transition: transform 0.2s ease; }
.qa-item[open] .qa-chevron { transform: rotate(180deg); }
.qa-answer { margin: 0 0 20px; font-weight: 500; font-size: 16px; line-height: 26px; color: #64748B; white-space: pre-line; }
.qa-empty { margin: 0; width: 100%; text-align: center; color: #64748B; }
[dir="rtl"] .qa-question, [dir="rtl"] .qa-answer { text-align: right; }
[dir="ltr"] .qa-question, [dir="ltr"] .qa-answer { text-align: left; }

/* ============================================================
   Direction & Alignment: Arabic vs English
   ============================================================ */
/* Arabic (RTL) */
[dir="rtl"] .section-heading,
[dir="rtl"] .section-body {
  text-align: right;
}

/* English (LTR) */
[dir="ltr"] .section-heading,
[dir="ltr"] .section-body {
  text-align: left;
}

/* ============================================================
   Responsive Media Queries
   ============================================================ */
@media (max-width: 1024px) {
  .jabel-legal-info {
    margin-top: 0px;
  }

  .legal-content-container {
    padding: 48px 24px;
  }

  .legal-sheet {
    padding: 32px 24px;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 48px 16px;
    min-height: 200px;
  }

  .hero-title {
    font-size: 32px;
    line-height: 48px;
  }

  .hero-subtitle {
    font-size: 14px;
    line-height: 22px;
  }

  .legal-content-container {
    padding: 24px 16px;
  }

  .legal-sheet {
    padding: 24px 16px;
    gap: 28px;
    border-radius: 8px;
  }

  .section-heading {
    font-size: 20px;
    line-height: 30px;
  }

  .section-body {
    font-size: 14.5px;
    line-height: 23px;
  }

  .section-divider-line {
    margin-top: 16px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
    line-height: 42px;
  }

  .legal-content-container {
    padding: 16px 12px;
  }

  .legal-sheet {
    padding: 20px 14px;
    gap: 24px;
  }
}
</style>

