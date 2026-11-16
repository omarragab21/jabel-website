<template>
  <div class="social-login" :dir="dir">
    <div class="social-divider"><span>{{ t('auth.or') }}</span></div>
    <button type="button" class="social-btn" data-testid="social-google" :disabled="disabled" @click="$emit('select', 'google')">
      <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      <span>{{ t('auth.continue_google') }}</span>
    </button>
    <button type="button" class="social-btn social-btn-apple" data-testid="social-apple" :disabled="disabled" @click="$emit('select', 'apple')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.37 1.43c0 1.14-.42 2.2-1.25 3.04-.9.9-1.98 1.42-3.15 1.33-.03-1.1.44-2.2 1.25-3.04.9-.93 2.07-1.45 3.15-1.33zM20.5 17.1c-.55 1.27-.81 1.84-1.52 2.96-.99 1.57-2.38 3.52-4.1 3.54-1.53.02-1.93-1-4.01-.99-2.08.01-2.52 1.01-4.05.99-1.72-.02-3.04-1.78-4.03-3.35C-.04 15.9-.33 11.1 1.37 8.5c1.2-1.84 3.1-2.92 4.88-2.92 1.81 0 2.95 1 4.45 1 1.45 0 2.34-1 4.44-1 1.58 0 3.26.86 4.46 2.35-3.92 2.15-3.28 7.75.9 9.17z"/>
      </svg>
      <span>{{ t('auth.continue_apple') }}</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  disabled: { type: Boolean, default: false },
  dir: { type: String, default: 'rtl' },
});
defineEmits(['select']);
const { t } = useI18n();
</script>

<style scoped>
.social-login { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; font-family: 'IBM Plex Sans Arabic', sans-serif; }
.social-divider { display: flex; align-items: center; gap: 12px; color: #6b7280; font-size: 13px; }
.social-divider::before, .social-divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.social-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 11px 16px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; color: #111827; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.social-btn:hover:not(:disabled) { background: #f9fafb; border-color: #9ca3af; }
.social-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.social-btn-apple { background: #000; border-color: #000; color: #fff; }
.social-btn-apple:hover:not(:disabled) { background: #1f1f1f; border-color: #1f1f1f; }
</style>
