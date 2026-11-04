<template>
  <Teleport to="body">
    <Transition name="option-picker">
      <div v-if="optionPicker.open && optionPicker.product" class="option-picker-overlay" @click.self="closeOptionPicker" @keydown.esc="closeOptionPicker">
        <div ref="panel" class="option-picker" :dir="isAr ? 'rtl' : 'ltr'" role="dialog" aria-modal="true" aria-labelledby="option-picker-title" data-testid="option-picker">
          <button type="button" class="option-picker-close" :aria-label="isAr ? 'إغلاق' : 'Close'" @click="closeOptionPicker">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M14.5 5.5L5.5 14.5M5.5 5.5L14.5 14.5" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <div class="option-picker-product">
            <img :src="productImage" :alt="productName" class="option-picker-thumb" @error="onImageError" />
            <div class="option-picker-heading">
              <h3 id="option-picker-title" class="option-picker-title">{{ isAr ? 'اختر المواصفات' : 'Choose options' }}</h3>
              <p class="option-picker-name">{{ productName }}</p>
            </div>
          </div>

          <div class="option-picker-groups">
            <div v-for="group in groups" :key="group.key" class="option-picker-group" role="radiogroup" :aria-label="groupLabel(group)">
              <div class="option-picker-group-title">
                <span>{{ groupLabel(group) }}:</span>
                <span class="option-picker-chosen">{{ chosenLabel(group) }}</span>
              </div>
              <div class="option-picker-options" :class="{ colors: group.isColor }">
                <template v-if="group.isColor">
                  <button
                    v-for="option in group.options"
                    :key="option.id"
                    type="button"
                    role="radio"
                    class="option-picker-swatch"
                    :class="{ active: isChosen(group, option) }"
                    :aria-checked="isChosen(group, option)"
                    :title="optionLabel(option)"
                    :aria-label="optionLabel(option)"
                    @click="chooseOption(group.key, option.id)"
                  >
                    <span class="option-picker-swatch-fill" :class="{ 'is-light': isLight(option.hex) }" :style="{ backgroundColor: option.hex || '#e5e7eb' }"></span>
                  </button>
                </template>
                <template v-else>
                  <button
                    v-for="option in group.options"
                    :key="option.id"
                    type="button"
                    role="radio"
                    class="option-picker-btn"
                    :class="{ active: isChosen(group, option) }"
                    :aria-checked="isChosen(group, option)"
                    @click="chooseOption(group.key, option.id)"
                  >{{ optionLabel(option) }}</button>
                </template>
              </div>
            </div>
          </div>

          <div class="option-picker-actions">
            <button ref="confirmBtn" type="button" class="option-picker-action primary" data-testid="option-picker-confirm" @click="confirmOptions">
              {{ isAr ? 'إضافة إلى السلة' : 'Add to cart' }}
            </button>
            <button type="button" class="option-picker-action secondary" @click="closeOptionPicker">
              {{ isAr ? 'إلغاء' : 'Cancel' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalized } from '../composables/useLocalized';
import { optionPicker, choosableGroups, chooseOption, confirmOptions, closeOptionPicker } from '../store/optionPicker';

const { locale } = useI18n();
const { localized } = useLocalized();
const panel = ref(null);
const confirmBtn = ref(null);

const isAr = computed(() => locale.value !== 'en');
const groups = computed(() => choosableGroups(optionPicker.groups));
const productName = computed(() => {
  const product = optionPicker.product;
  return product ? (localized(product, 'name') || product.name_ar || product.name || '') : '';
});

const inLang = (labels, fallback) => labels?.[locale.value] || fallback;
const groupLabel = (group) => inLang(group.name_i18n, group.name);
const optionLabel = (option) => inLang(option.name_i18n, option.name);
const isChosen = (group, option) => Number(optionPicker.selection[group.key]) === option.id;
const chosenLabel = (group) => optionLabel(group.options.find((option) => isChosen(group, option)) || group.options[0]);

const FALLBACK_IMAGE = '/brand/mastergas-icon.png';
const productImage = computed(() => {
  const product = optionPicker.product;
  const image = product?.image || product?.images?.[0];
  const path = image && typeof image === 'object' ? (image.image_url || image.url || image.image || image.path) : image;
  if (!path) return FALLBACK_IMAGE;
  if (String(path).startsWith('/') || String(path).startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://backend-jabal.be-kite.com/api';
  return `${baseUrl.replace('/api', '')}/storage/${path}`;
});
const onImageError = (event) => {
  if (!String(event.target.src).endsWith(FALLBACK_IMAGE)) event.target.src = FALLBACK_IMAGE;
};

const isLight = (hex) => {
  const value = String(hex || '').replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.75;
};

watch(() => optionPicker.open, async (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  if (!open) return;
  await nextTick();
  confirmBtn.value?.focus();
});
</script>

<style scoped>
.option-picker-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.option-picker {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 28px 24px 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  text-align: start;
}

.option-picker-close {
  position: absolute;
  top: 12px;
  inset-inline-end: 12px;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.option-picker-close:hover { background: #f1f5f9; }

.option-picker-product {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-inline-end: 28px;
}
.option-picker-thumb {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  object-fit: contain;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}
.option-picker-heading { min-width: 0; }
.option-picker-title {
  margin: 0;
  font-size: 18px;
  line-height: 27px;
  font-weight: 700;
  color: #000000;
}
.option-picker-name {
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 21px;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-picker-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.option-picker-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.option-picker-group-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  color: #000000;
}
.option-picker-chosen { font-weight: 500; color: #475569; }

.option-picker-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.option-picker-options.colors { gap: 6px; }

.option-picker-swatch {
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.option-picker-swatch:hover { transform: scale(1.08); }
.option-picker-swatch.active { border-color: #000000; }
.option-picker-swatch-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.option-picker-swatch-fill.is-light { box-shadow: inset 0 0 0 1px #cbd5e1; }

.option-picker-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #000000;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.option-picker-btn:hover { border-color: #000000; }
.option-picker-btn.active {
  border-color: #000000;
  background: var(--color-brand-primary, #000000);
  color: #ffffff;
  font-weight: 700;
}

.option-picker-actions {
  display: flex;
  gap: 12px;
}
.option-picker-action {
  flex: 1 1 0;
  min-width: 0;
  height: 48px;
  padding: 12px 20px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}
.option-picker-action:focus-visible,
.option-picker-btn:focus-visible,
.option-picker-swatch:focus-visible { outline: 2px solid #000000; outline-offset: 2px; }
.option-picker-action.primary { background: var(--color-brand-primary, #000000); color: #ffffff; border: none; }
.option-picker-action.primary:hover { background: var(--color-button-hover); }
.option-picker-action.secondary { background: #ffffff; color: #000000; border: 1.5px solid #000000; }
.option-picker-action.secondary:hover { background: #f8fafc; }

.option-picker-enter-active, .option-picker-leave-active { transition: opacity 0.18s ease; }
.option-picker-enter-active .option-picker, .option-picker-leave-active .option-picker { transition: transform 0.18s ease; }
.option-picker-enter-from, .option-picker-leave-to { opacity: 0; }
.option-picker-enter-from .option-picker, .option-picker-leave-to .option-picker { transform: translateY(8px) scale(0.98); }

@media (max-width: 480px) {
  .option-picker-overlay { padding: 16px; }
  .option-picker { padding: 24px 16px 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .option-picker-enter-active, .option-picker-leave-active,
  .option-picker-enter-active .option-picker, .option-picker-leave-active .option-picker { transition: none; }
}
</style>
