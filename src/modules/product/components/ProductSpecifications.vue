<template>
  <div v-if="rows.length > 0" class="specs-card" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="specs-table-grid">
      <div v-for="(row, index) in rows" :key="index" class="spec-table-row">
        <ProductSpecificationCell
          :spec="row.col1"
          :is-color="isColorSpec(row.col1.label)"
          :colors="getSpecColorsList(row.col1.value)"
        />
        <ProductSpecificationCell
          v-if="row.col2"
          :spec="row.col2"
          :is-color="isColorSpec(row.col2.label)"
          :colors="getSpecColorsList(row.col2.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductSpecificationCell from './ProductSpecificationCell.vue';

defineProps({
  rows: { type: Array, required: true },
  locale: { type: String, default: 'ar' },
  isColorSpec: { type: Function, required: true },
  getSpecColorsList: { type: Function, required: true },
});
</script>

<style scoped>
/* Figma: white card, 24px padding, 12px radius; every row is two label/value pairs of four equal columns. */
.specs-card { box-sizing: border-box; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; width: 100%; }
.specs-table-grid { display: flex; flex-direction: column; align-items: stretch; width: 100%; }
.spec-table-row { box-sizing: border-box; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 12px 0; border-bottom: 1px solid #E2E8F0; }
/* No line under the last row: it would sit against the card's own border. */
.spec-table-row:last-child { border-bottom: none; padding-bottom: 0; }
@media (max-width: 768px) { .spec-table-row { grid-template-columns: minmax(0, 1fr); gap: 12px; } }
</style>
