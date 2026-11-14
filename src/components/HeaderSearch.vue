<template>
  <div ref="rootEl" class="header-search" :class="{ 'is-open': open }" role="search">
    <form class="header-search-field" @submit.prevent="performSearch">
      <button class="header-search-submit" type="submit" :aria-label="$t('search.title')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      <input
        v-model="query"
        class="header-search-input"
        type="text"
        autocomplete="off"
        :placeholder="$t('search.placeholder')"
        @focus="open = true"
        @keydown.esc="closeDropdown"
      />
      <button v-if="query" class="header-search-clear" type="button" :aria-label="$t('common.close') || 'Clear'" @click="reset">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </form>

    <div v-if="showPanel" class="header-search-panel">
      <div v-if="searching && !results.length" class="header-search-state"><span class="header-search-spinner"></span></div>
      <div v-else-if="!results.length" class="header-search-state">{{ $t('search.no_results') }}</div>
      <ul v-else class="header-search-grid">
        <li v-for="product in results" :key="product.id">
          <button type="button" class="header-search-item" @click="goToProduct(product.id)">
            <img class="header-search-thumb" :src="product.image || FALLBACK_IMAGE" :alt="localized(product, 'name')" @error="onImageError" />
            <span class="header-search-info">
              <span class="header-search-name">{{ localized(product, 'name') }}</span>
              <span class="header-search-price"><PriceText :value="product.price * (1 - (product.discount / 100 || 0))" :currency="currency" /></span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PriceText from './PriceText.vue';
import { useSettings } from '../composables/useSettings';
import { useLocalized } from '../composables/useLocalized';
import { useProductSearch } from '../modules/product/composables/useProductSearch';

const router = useRouter();
const { localized } = useLocalized();
const { currency } = useSettings();
const { query, results, searching, performSearch, clearResults } = useProductSearch();

const rootEl = ref(null);
const open = ref(false);
const showPanel = computed(() => open.value && query.value.trim().length >= 2);

const FALLBACK_IMAGE = '/brand/jabel-icon.png';
const onImageError = (event) => {
  if (!String(event.target.src).endsWith(FALLBACK_IMAGE)) event.target.src = FALLBACK_IMAGE;
};

const closeDropdown = () => { open.value = false; };
const reset = () => { query.value = ''; clearResults(); };
const goToProduct = (id) => {
  closeDropdown();
  reset();
  router.push(`/product/${id}`);
};

const onOutsideClick = (event) => {
  if (rootEl.value && !rootEl.value.contains(event.target)) closeDropdown();
};
onMounted(() => document.addEventListener('mousedown', onOutsideClick));
onBeforeUnmount(() => document.removeEventListener('mousedown', onOutsideClick));
</script>

<style scoped>
.header-search { position: relative; flex: 1 0 0; min-width: 0; font-family: 'IBM Plex Sans Arabic', sans-serif; }
.header-search-field {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  transition: border-color 0.2s;
}
.header-search.is-open .header-search-field,
.header-search-field:focus-within { border-color: #000; background: #fff; }
.header-search-input { flex: 1; min-width: 0; height: 100%; border: none; outline: none; background: transparent; font: inherit; font-size: 14px; color: #0F172A; }
.header-search-input::placeholder { color: #94A3B8; }
.header-search-submit, .header-search-clear { display: flex; align-items: center; justify-content: center; border: none; background: transparent; color: #64748B; cursor: pointer; padding: 0; }
.header-search-submit:hover, .header-search-clear:hover { color: #000; }

.header-search-panel {
  position: absolute;
  top: calc(100% + 6px);
  inset-inline: 0;
  z-index: 1500;
  max-height: 70vh;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14);
}
.header-search-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.header-search-grid li { border-bottom: 1px solid #F1F5F9; }
.header-search-grid li:nth-child(odd) { border-inline-end: 1px solid #F1F5F9; }
.header-search-item { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; border: none; background: transparent; cursor: pointer; text-align: start; font: inherit; }
.header-search-item:hover { background: #F8FAFC; }
.header-search-thumb { width: 56px; height: 56px; flex-shrink: 0; object-fit: contain; border-radius: 6px; background: #fff; }
.header-search-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.header-search-name { font-size: 13px; font-weight: 500; color: #0F172A; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.header-search-price { font-size: 13px; font-weight: 700; color: var(--color-brand-primary, #000); }
.header-search-state { padding: 24px; text-align: center; color: #64748B; font-size: 14px; display: flex; justify-content: center; }
.header-search-spinner { width: 28px; height: 28px; border: 3px solid #F1F5F9; border-top-color: #000; border-radius: 50%; animation: header-search-spin 0.8s linear infinite; }
@keyframes header-search-spin { to { transform: rotate(360deg); } }
</style>
