<template>
  <div v-if="currentStep < 5" class="checkout-progress-wrapper">
    <div class="checkout-progress">
      <div
        v-for="step in steps"
        :key="step.id"
        class="step-item"
        :class="{ active: currentStep === step.id, completed: currentStep > step.id }"
      >
        <div class="step-circle">
          <i v-if="currentStep > step.id" class="fas fa-check"></i>
          <span v-else>{{ step.id }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
      <div class="progress-line"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: { type: Number, required: true },
  steps: { type: Array, required: true },
});
</script>

<style scoped>
/* A white band across the page with a hairline underneath; the steps follow the page direction. */
.checkout-progress-wrapper { position: relative; margin-bottom: 40px; padding: 24px 0; background: #fff; box-shadow: 0 0 0 100vmax #fff; clip-path: inset(0 -100vmax); }
.checkout-progress-wrapper::after { content: ''; position: absolute; inset-inline: -100vmax; bottom: 0; height: 1px; background: #e2e8f0; }
.checkout-progress { display: flex; justify-content: space-between; position: relative; max-width: 576px; margin: 0 auto; }
.progress-line { position: absolute; top: 16px; inset-inline: 40px; height: 2px; background: #e2e8f0; z-index: 1; }
.step-item { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px; width: 80px; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; background: #fff; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #94a3b8; transition: all 0.3s; }
.step-label { font-size: 14px; font-weight: 400; color: #94a3b8; }
.step-item.active .step-circle { background: var(--color-brand-primary, #000); border-color: #000; color: #fff; }
.step-item.active .step-label { color: #000; font-weight: 500; }
.step-item.completed .step-circle { background: var(--color-brand-primary, #000); border-color: #000; color: #fff; }
.step-item.completed .step-label { color: #000; }
@media (max-width: 768px) { .checkout-progress-wrapper { margin-bottom: 24px; } }
</style>
