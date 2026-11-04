<template>
  <div class="jabel-terms" :class="{ 'is-en': !isRtl }" :dir="isRtl ? 'rtl' : 'ltr'">
    
    <!-- 1. Hero Banner matching Figma hero-banner -->
    <section class="hero-banner">
      <div class="hero-content">
        <!-- الشروط والأحكام / Terms & Conditions -->
        <h1 class="hero-title">
          {{ isRtl ? 'الشروط والأحكام' : 'Terms & Conditions' }}
        </h1>
        
        <!-- آخر تحديث / Last Updated Subtitle -->
        <p class="hero-subtitle">
          {{ subtitle }}
        </p>
      </div>
    </section>

    <!-- 2. Legal Content Container -->
    <main class="legal-content-container">
      <article class="legal-sheet">

        <!-- attention-alert-banner (edited from the dashboard; removed when it has no text) -->
        <LegalNoticeBanner
          v-if="hasBanner"
          variant="alert"
          :title="bannerTitle"
          :text="bannerText"
          :icon="alertIcon"
          :is-rtl="isRtl"
        />

        <!-- Legal sections (edited from the dashboard) -->
        <section
          v-for="(section, idx) in sections"
          :key="section.position"
          class="legal-section"
          :class="`legal-section-${idx}`"
        >
          <!-- heading-row -->
          <div class="heading-row">
            <h3 class="section-heading">
              {{ formatSectionNumber(idx + 1, currentLang) }}. {{ isRtl ? section.title_ar : section.title_en }}
            </h3>
          </div>

          <!-- Section Body Text -->
          <p class="section-body">
            {{ isRtl ? section.text_ar : section.text_en }}
          </p>

          <!-- Divider line between sections -->
          <div v-if="idx < sections.length - 1" class="section-divider-line"></div>
        </section>

      </article>
    </main>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useLocalized } from '../../../composables/useLocalized';
import { useSEO } from '../../../composables/useSEO';
import LegalNoticeBanner from '../../../components/LegalNoticeBanner.vue';
import alertIcon from '../../../assets/legal/notification.svg';
import { emptyLegalPage, formatLegalMonth, formatSectionNumber, loadLegalPage } from '../../../services/legalPages';

const { currentLang } = useLocalized();
const isRtl = computed(() => currentLang.value === 'ar');

// Dynamic SEO tags
useSEO({
  title: isRtl.value
    ? 'الشروط والأحكام | Jabel الأجهزة الإيطالية الفاخرة'
    : 'Terms & Conditions | Jabel Luxury Italian Appliances',
  description: isRtl.value
    ? 'تعرف على الشروط والأحكام التنظيمية لمتجر Jabel للأجهزة المنزلية الإيطالية الفاخرة في المملكة العربية السعودية.'
    : 'Read the regulatory terms and conditions for Jabel luxury Italian home appliances in Saudi Arabia.',
  keywords: 'الشروط والأحكام, شروط الاستخدام, جبل, Jabel terms and conditions, سياسة المتجر'
});

const page = ref(emptyLegalPage());
const sections = computed(() => page.value.sections);
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

onMounted(async () => {
  try {
    page.value = await loadLegalPage('terms');
  } catch (error) {
    console.warn('Legal page could not be loaded from the settings API:', error?.message);
  }
});
</script>

<style scoped>
/* ============================================================
   Page Base: jabel-terms
   ============================================================ */
.jabel-terms {
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
  background: 
    linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/images/about/hero_banner.jpg') center / cover no-repeat;
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
  color: #FFFFFF;
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
  color: #FFFFFF;
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
  .jabel-terms {
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

