<script setup>
// Filters on a phone: the sidebar becomes a bottom sheet opened by a "Filters" button.
// On a desktop screen (wider than 1024px) this wrapper is invisible and the sidebar stays in the page as before.
import { onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  applyLabel: { type: String, default: '' },
  clearLabel: { type: String, default: '' },
  closeLabel: { type: String, default: '' },
  activeCount: { type: Number, default: 0 },
});
const emit = defineEmits(['close', 'clear']);

const lock = (on) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('mf-scroll-lock', on);
};
const onKey = (event) => { if (event.key === 'Escape') emit('close'); };
const onResize = () => { if (window.innerWidth > 1024) emit('close'); };

watch(() => props.open, (open) => {
  lock(open);
  if (open) {
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
  } else {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
  }
});
onBeforeUnmount(() => {
  lock(false);
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <div class="fs-root" :class="{ open }">
    <div class="fs-backdrop" @click="emit('close')"></div>
    <section class="fs-sheet" role="dialog" aria-modal="true" :aria-label="title" :aria-hidden="!open">
      <div class="fs-grab" aria-hidden="true"></div>
      <header class="fs-head">
        <h2 class="fs-title">{{ title }}</h2>
        <button type="button" class="fs-close" :aria-label="closeLabel" @click="emit('close')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </header>
      <div class="fs-body"><slot /></div>
      <footer class="fs-foot">
        <button type="button" class="fs-clear" :disabled="!activeCount" @click="emit('clear')">{{ clearLabel }}</button>
        <button type="button" class="fs-apply" @click="emit('close')">{{ applyLabel }}</button>
      </footer>
    </section>
  </div>
</template>

<style>
/* ---- desktop: the wrapper disappears ---- */
.fs-root, .fs-sheet, .fs-body { display: contents; }
.fs-backdrop, .fs-grab, .fs-head, .fs-foot { display: none; }
.mf-only { display: none !important; }

/* ---- phone & tablet: bottom sheet ---- */
@media (max-width: 1024px) {
  html.mf-scroll-lock { overflow: hidden; }
  .mf-only { display: inline-flex !important; }

  .fs-root { display: block; position: fixed; inset: 0; z-index: 1200000; visibility: hidden; pointer-events: none; transition: visibility 0s linear 0.28s; }
  .fs-root.open { visibility: visible; pointer-events: auto; transition-delay: 0s; }
  .fs-backdrop { display: block; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.5); opacity: 0; transition: opacity 0.25s ease; }
  .fs-root.open .fs-backdrop { opacity: 1; }

  .fs-sheet {
    display: flex; flex-direction: column; position: absolute; left: 0; right: 0; bottom: 0; max-height: 88vh; max-height: 88dvh;
    background: #fff; border-radius: 22px 22px 0 0; box-shadow: 0 -12px 40px rgba(15, 23, 42, 0.28);
    transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.22, 0.8, 0.3, 1);
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }
  .fs-root.open .fs-sheet { transform: translateY(0); }
  .fs-grab { display: block; width: 44px; height: 5px; border-radius: 999px; background: #cbd5e1; margin: 10px auto 2px; flex: none; }
  .fs-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 20px 14px; border-bottom: 1px solid #eef2f7; flex: none; }
  .fs-title { margin: 0; font-size: 18px; font-weight: 800; color: #0f172a; }
  .fs-close { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid #e2e8f0; background: #fff; color: #334155; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .fs-body { display: block; flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; padding: 6px 20px 16px; }
  .fs-foot { display: flex; gap: 10px; padding: 12px 20px calc(14px + env(safe-area-inset-bottom)); border-top: 1px solid #eef2f7; background: #fff; flex: none; }
  .fs-clear, .fs-apply { height: 50px; border-radius: 14px; font: inherit; font-size: 15px; font-weight: 800; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .fs-clear { flex: 0 0 34%; background: #fff; color: #0f172a; border: 1.5px solid #cbd5e1; }
  .fs-clear:disabled { color: #94a3b8; border-color: #e2e8f0; cursor: not-allowed; }
  .fs-apply { flex: 1; background: var(--color-brand-primary, #000); color: var(--color-brand-contrast, #fff); border: none; }

  /* the sidebar content inside the sheet: flat, roomy and easy to tap */
  .fs-sheet .mockup-sidebar { position: static; width: auto; max-width: none; padding: 0; margin: 0; }
  .fs-sheet .sidebar-card { border: none; box-shadow: none; padding: 0; background: transparent; border-radius: 0; }
  .fs-sheet .sidebar-header, .fs-sheet .sidebar-header + .sidebar-divider { display: none; }
  .fs-sheet .sidebar-divider { margin: 14px 0; }
  .fs-sheet .sidebar-section-heading { font-size: 15px; margin: 4px 0 8px; }
  .fs-sheet .sidebar-radio-list, .fs-sheet .sidebar-checkbox-list { gap: 0; }
  .fs-sheet .sidebar-radio-item, .fs-sheet .sidebar-checkbox-item { min-height: 50px; padding-top: 4px; padding-bottom: 4px; border-bottom: 1px solid #f1f5f9; -webkit-tap-highlight-color: transparent; }
  .fs-sheet .sidebar-checkbox-item { gap: 12px; }
  .fs-sheet .radio-title, .fs-sheet .checkbox-text { font-size: 15px; }
  .fs-sheet .custom-radio { width: 22px; height: 22px; }
  .fs-sheet .custom-checkbox { width: 24px; height: 24px; border-radius: 7px; }
  .fs-sheet .radio-counter { font-size: 13px; }
}

/* ---- the "Filters" button and the active-filter chips (phone & tablet only) ---- */
.mf-bar { display: flex; align-items: center; gap: 10px; }
.mf-open-btn {
  align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 16px; border-radius: 12px; cursor: pointer; white-space: nowrap;
  font: inherit; font-size: 14px; font-weight: 800; color: #0f172a; background: #fff; border: 1.5px solid #0f172a; -webkit-tap-highlight-color: transparent;
}
.mf-open-btn.has-active { background: var(--color-brand-primary, #000); border-color: var(--color-brand-primary, #000); color: var(--color-brand-contrast, #fff); }
.mf-badge { min-width: 22px; height: 22px; padding: 0 6px; border-radius: 999px; background: #fff; color: #0f172a; font-size: 12px; line-height: 22px; text-align: center; }
.mf-chips { display: none; }

@media (max-width: 1024px) {
  .mockup-results-bar-fullwidth { margin-bottom: 14px !important; }
  .mockup-results-bar-fullwidth .bar-inner-content { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; padding-top: 12px !important; padding-bottom: 12px !important; }
  .mockup-results-count { font-size: 12.5px; text-align: start; }
  .mf-bar { width: 100%; }
  .mf-bar .mockup-sort-group { flex: 1; min-width: 0; }
  .mf-bar .mockup-sort-label { display: none; }
  .mf-bar .mockup-sort-box { width: 100%; height: 44px; border-radius: 12px; }
  .mf-bar .mockup-sort-select { width: 100%; height: 100%; font-size: 14px; }

  .mf-chips { display: flex; gap: 8px; overflow-x: auto; padding: 2px 0 14px; margin: 0 -2px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .mf-chips::-webkit-scrollbar { display: none; }
  .mf-chips:empty { display: none; }
  .mf-chip { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 8px 0 14px; padding-inline: 14px 8px; border-radius: 999px; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
    background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; -webkit-tap-highlight-color: transparent; }
  .mf-chip i { width: 20px; height: 20px; border-radius: 50%; background: #cbd5e1; color: #0f172a; display: inline-flex; align-items: center; justify-content: center; font-style: normal; font-size: 13px; line-height: 1; }
  .mf-chip.clear { background: transparent; border-color: transparent; color: #64748b; text-decoration: underline; padding-inline: 8px; }
}
</style>
