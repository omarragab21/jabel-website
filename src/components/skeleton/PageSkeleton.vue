<template>
  <!-- Placeholder for a content page while its data loads: no built-in text is shown in the meantime. -->
  <div class="sk-page" aria-busy="true" :aria-label="label">
    <div v-if="hero" class="sk-shimmer sk-page-hero"></div>
    <div class="sk-page-body">
      <span class="sk-shimmer sk-line sk-page-title"></span>
      <span class="sk-shimmer sk-line sk-page-subtitle"></span>
      <div class="sk-page-text">
        <span v-for="n in lines" :key="`l${n}`" class="sk-shimmer sk-line" :style="{ width: `${100 - (n % 3) * 12}%` }"></span>
      </div>
      <div v-if="cards" class="sk-page-cards">
        <span v-for="n in cards" :key="`c${n}`" class="sk-shimmer sk-page-card"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hero: { type: Boolean, default: false },
  lines: { type: Number, default: 6 },
  cards: { type: Number, default: 0 },
  label: { type: String, default: 'Loading' },
});
</script>

<style scoped>
.sk-page {
  width: 100%;
  min-height: 60vh;
}

.sk-page-hero {
  width: 100%;
  height: 360px;
  border-radius: 0;
}

.sk-page-body {
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 64px 64px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sk-page-title {
  width: 320px;
  max-width: 70%;
  height: 32px;
  margin: 0 auto;
}

.sk-page-subtitle {
  width: 480px;
  max-width: 85%;
  height: 16px;
  margin: 0 auto 24px;
}

.sk-page-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sk-page-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.sk-page-card {
  height: 200px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .sk-page-hero { height: 240px; }
  .sk-page-body { padding: 32px 16px 48px; }
  .sk-page-cards { grid-template-columns: 1fr; }
}
</style>
