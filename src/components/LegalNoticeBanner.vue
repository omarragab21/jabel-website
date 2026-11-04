<template>
  <aside class="legal-notice" :class="[`is-${variant}`, { 'is-en': !isRtl }]" :dir="isRtl ? 'rtl' : 'ltr'" :data-testid="`legal-banner-${variant}`">
    <!-- icon-wrapper -->
    <div class="notice-icon-wrapper" aria-hidden="true">
      <div class="notice-icon" :class="`icon-${variant}`">
        <img :src="icon" alt="" />
      </div>
    </div>

    <!-- text-stack -->
    <div class="notice-text-stack">
      <p v-if="title" class="notice-title">{{ title }}</p>
      <p v-if="text" class="notice-text">{{ text }}</p>
    </div>

    <!-- toggle-controls (privacy page: allow or stop sending usage data) -->
    <div v-if="toggleable" class="notice-toggle-controls">
      <button
        type="button"
        class="notice-toggle"
        :class="{ 'is-on': modelValue }"
        role="switch"
        :aria-checked="modelValue"
        :aria-label="statusLabel"
        data-testid="legal-banner-toggle"
        @click="emit('update:modelValue', !modelValue)"
      >
        <span class="switch-knob"></span>
      </button>
      <span class="notice-toggle-label">{{ statusLabel }}</span>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'info' }, // 'info' (blue) | 'alert' (red)
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  icon: { type: String, required: true },
  toggleable: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
  isRtl: { type: Boolean, default: true },
});
const emit = defineEmits(['update:modelValue']);

const statusLabel = computed(() => (props.modelValue
  ? (props.isRtl ? 'مُفعّل' : 'Enabled')
  : (props.isRtl ? 'غير مُفعّل' : 'Disabled')));
</script>

<style scoped>
.legal-notice {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
.legal-notice.is-info { background: #F0F9FF; border-color: #F0F9FF; color: #0284C7; }
.legal-notice.is-alert { background: #FFF2F2; border-color: #FEE2E2; color: #E53333; }

.notice-icon-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 9999px;
  flex-shrink: 0;
}
.is-info .notice-icon-wrapper { background: #F0F9FF; }
.is-alert .notice-icon-wrapper { background: #FEE2E2; }

/* The icons are the "elements" layer of 24px Figma icons, so they sit inside a 24px box with the same insets. */
.notice-icon { position: relative; width: 24px; height: 24px; }
.notice-icon img { position: absolute; display: block; max-width: none; width: 100%; height: 100%; }
.notice-icon.icon-info img { inset: 5.21%; width: 89.58%; height: 89.58%; }
.notice-icon.icon-alert img { inset: 5.21% 9.38%; width: 81.24%; height: 89.58%; }

.notice-text-stack {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
  font-size: 14px;
  line-height: normal;
  text-align: start;
  word-break: break-word;
}
.notice-title { margin: 0; width: 100%; font-weight: 700; }
.notice-text { margin: 0; width: 100%; font-weight: 400; }

.notice-toggle-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.notice-toggle-label {
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
}

.notice-toggle-label { transition: opacity 0.25s; }

/* A real switch: the knob slides to the right when on and back to the left when off. */
.notice-toggle {
  position: relative;
  direction: ltr;
  width: 44px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: #CBD5E1;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.25s ease;
}
.notice-toggle.is-on { background: #0284C7; }
.notice-toggle:focus-visible { outline: 2px solid #0284C7; outline-offset: 2px; }
.switch-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.notice-toggle.is-on .switch-knob { transform: translateX(20px); }
.notice-toggle-controls:has(.notice-toggle:not(.is-on)) .notice-toggle-label { opacity: 0.75; }

@media (max-width: 640px) {
  .legal-notice { flex-wrap: wrap; padding: 16px; gap: 12px; }
  .notice-text-stack { flex-basis: calc(100% - 64px); }
  .notice-toggle-controls { width: 100%; }
}
</style>
