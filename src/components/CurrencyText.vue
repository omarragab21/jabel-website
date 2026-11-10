<template>
  <span class="currency-text">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { currencyLabel } from '../utils/currency';

// The currency sign next to an amount: «د.أ» on the Arabic site, «JOD» on the English one. It follows the
// language by itself, so no page needs its own copy of the sign.
const { locale } = useI18n();
const label = computed(() => currencyLabel(locale.value));
</script>
