<template>
  <button
    type="button"
    class="wishlist-heart"
    :class="[`wishlist-heart--${variant}`, { 'is-active': active, 'is-busy': busy }]"
    :aria-pressed="active"
    :aria-label="label"
    :title="label"
    data-testid="wishlist-heart"
    @click.stop.prevent="toggle"
    @keydown.enter.stop
    @keydown.space.stop
  >
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 2.6 4.8 6.2 4.5c2-.2 3.8.8 4.8 2.4l1 1.5 1-1.5c1-1.6 2.8-2.6 4.8-2.4 3.6.3 5.3 4 3.8 7.3C19.5 16.4 12 21 12 21z"
        :fill="active ? 'currentColor' : 'none'"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    </svg>
    <span v-if="showText" class="wishlist-heart-text">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { cartState } from '../store/cart';

const props = defineProps({
  product: { type: Object, required: true },
  // 'card' = round button over a product photo; 'inline' = icon with text next to the share button
  variant: { type: String, default: 'card', validator: (v) => ['card', 'inline'].includes(v) },
  showText: { type: Boolean, default: false },
});

const { locale } = useI18n();
const busy = ref(false);
const active = computed(() => cartState.isInWishlist(props.product?.id));
const label = computed(() => {
  if (locale.value === 'ar') return active.value ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
  return active.value ? 'Remove from wishlist' : 'Add to wishlist';
});

const toggle = async () => {
  if (busy.value || props.product?.id === undefined || props.product?.id === null) return;
  busy.value = true;
  try {
    await cartState.toggleWishlist(props.product);
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.wishlist-heart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  color: #1f2937;
  font-family: inherit;
  transition: color 0.2s ease, transform 0.15s ease, background-color 0.2s ease;
}
.wishlist-heart:hover { color: #dc2626; }
.wishlist-heart:active { transform: scale(0.92); }
.wishlist-heart.is-active { color: #dc2626; }
.wishlist-heart.is-busy { opacity: 0.6; pointer-events: none; }
.wishlist-heart:focus-visible { outline: 2px solid #dc2626; outline-offset: 2px; }

.wishlist-heart--card {
  position: absolute;
  top: 12px;
  inset-inline-end: 12px;
  z-index: 3;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.18);
}

.wishlist-heart--inline {
  background: none;
  padding: 0;
  font-size: 14px;
  font-weight: 400;
}
</style>
