<template>
  <div class="tab-content specs-tab-content">
    <ProductSpecifications
      :rows="specRows"
      :locale="locale"
      :is-color-spec="isColorSpec"
      :get-spec-colors-list="getSpecColorsList"
    />
  </div>
</template>
<script setup>
import { toRefs } from 'vue';
import ProductSpecifications from './ProductSpecifications.vue';

const props = defineProps({
  locale: { type: String, required: true },
  specRows: { type: Array, default: () => [] },
  isColorSpec: { type: Function, required: true },
  getSpecColorsList: { type: Function, required: true },
});
const { locale, specRows, isColorSpec, getSpecColorsList } = toRefs(props);
</script>
