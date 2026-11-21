<template>
  <!-- Desktop: a plain sidebar card. Mobile / tablet (<= 1024px): a bottom sheet opened from the toolbar. -->
  <aside class="mockup-sidebar filter-sheet" :class="{ 'is-open': open }">
    <div class="filter-sheet-backdrop" aria-hidden="true" @click="emit('close')"></div>

    <div
      ref="panelRef"
      class="filter-sheet-panel"
      :class="{ 'is-dragging': dragging }"
      :style="dragY > 0 ? { transform: `translateY(${dragY}px)` } : null"
      :role="isMobile ? 'dialog' : null"
      :aria-modal="isMobile ? 'true' : null"
      :aria-label="title"
      :aria-hidden="isMobile && !open ? 'true' : null"
      :inert="isMobile && !open ? true : null"
    >
      <div
        class="filter-sheet-top"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <span class="filter-sheet-grabber" aria-hidden="true"></span>
        <div class="filter-sheet-head">
          <h2 class="filter-sheet-title">
            {{ title }}
            <span v-if="activeCount" class="filter-sheet-count">{{ activeCount }}</span>
          </h2>
          <button
            ref="closeRef"
            type="button"
            class="filter-sheet-close"
            :aria-label="lang === 'ar' ? 'إغلاق' : 'Close'"
            @click="emit('close')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="filter-sheet-body">
        <slot />
      </div>

      <div class="filter-sheet-foot">
        <button type="button" class="filter-sheet-reset" :disabled="!activeCount" @click="emit('reset')">
          {{ lang === 'ar' ? 'مسح الكل' : 'Clear all' }}
        </button>
        <button type="button" class="filter-sheet-apply" @click="emit('close')">
          {{ applyLabel }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  lang: { type: String, default: 'ar' },
  activeCount: { type: Number, default: 0 },
  resultsCount: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(['close', 'reset']);

const MOBILE_QUERY = '(max-width: 1024px)';
const isMobile = ref(false);
const panelRef = ref(null);
const closeRef = ref(null);

const applyLabel = computed(() => {
  if (props.loading) return props.lang === 'ar' ? 'عرض النتائج' : 'Show results';
  if (props.lang === 'ar') return `عرض ${props.resultsCount} منتج`;
  return `Show ${props.resultsCount} ${props.resultsCount === 1 ? 'product' : 'products'}`;
});

/* ---- viewport + scroll lock + Esc ---- */
let mql = null;
const onMqlChange = (e) => {
  isMobile.value = e.matches;
  if (!e.matches && props.open) emit('close');
};

let previousOverflow = '';
let previousFocus = null;
const lockScroll = () => {
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
};
const unlockScroll = () => {
  document.body.style.overflow = previousOverflow;
};
const onKeydown = (e) => {
  if (e.key === 'Escape') emit('close');
};

watch(
  () => props.open && isMobile.value,
  async (active) => {
    if (active) {
      previousFocus = document.activeElement;
      lockScroll();
      window.addEventListener('keydown', onKeydown);
      await nextTick();
      closeRef.value?.focus({ preventScroll: true });
    } else {
      unlockScroll();
      window.removeEventListener('keydown', onKeydown);
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
      previousFocus = null;
    }
  },
);

onMounted(() => {
  mql = window.matchMedia(MOBILE_QUERY);
  isMobile.value = mql.matches;
  mql.addEventListener('change', onMqlChange);
});

onBeforeUnmount(() => {
  mql?.removeEventListener('change', onMqlChange);
  window.removeEventListener('keydown', onKeydown);
  if (props.open && isMobile.value) unlockScroll();
});

/* ---- swipe down on the handle / title to dismiss ---- */
const dragY = ref(0);
const dragging = ref(false);
let startY = 0;
const onTouchStart = (e) => {
  if (!isMobile.value) return;
  startY = e.touches[0].clientY;
  dragging.value = true;
};
const onTouchMove = (e) => {
  if (!dragging.value) return;
  dragY.value = Math.max(0, e.touches[0].clientY - startY);
};
const onTouchEnd = () => {
  if (!dragging.value) return;
  dragging.value = false;
  const shouldClose = dragY.value > 90;
  dragY.value = 0;
  if (shouldClose) emit('close');
};
</script>
