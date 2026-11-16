<template>
  <!-- TEMPORARY: shows what Google/Apple sent back, until the server route exists (see SOCIAL_LOGIN_PREVIEW). -->
  <div class="slp-overlay" role="dialog" aria-modal="true" data-testid="social-preview" @click.self="$emit('close')">
    <div class="slp-box" dir="rtl">
      <button type="button" class="slp-close" aria-label="إغلاق" @click="$emit('close')">×</button>
      <div class="slp-tag">مؤقت — للتجربة فقط</div>
      <div class="slp-user">
        <img v-if="data.photo" :src="data.photo" alt="" class="slp-photo" referrerpolicy="no-referrer" />
        <div v-else class="slp-photo slp-photo-empty" aria-hidden="true">{{ (data.name || data.email || '?').slice(0, 1).toUpperCase() }}</div>
        <div class="slp-info">
          <strong data-testid="social-preview-name">{{ data.name || 'بدون اسم (أبل يرسل الاسم مرة واحدة فقط)' }}</strong>
          <span data-testid="social-preview-email" dir="ltr">{{ data.email || 'بدون إيميل' }}</span>
          <span class="slp-provider">{{ data.provider === 'apple.com' ? 'Apple' : 'Google' }}</span>
        </div>
      </div>
      <p class="slp-hint">دي البيانات اللي رجعت بعد الدخول. الموقع حالياً مابيبعتهاش للسيرفر، والـ JSON تحت هو اللي هيتبعت ومعاه محتوى التوكن.</p>
      <pre class="slp-json" dir="ltr" data-testid="social-preview-json">{{ json }}</pre>
      <div class="slp-actions">
        <button type="button" class="slp-btn slp-btn-main" @click="copy">{{ copied ? 'تم النسخ ✓' : 'نسخ JSON' }}</button>
        <button type="button" class="slp-btn" @click="$emit('close')">إغلاق</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({ data: { type: Object, required: true } });
defineEmits(['close']);

// What this sign-in gives the server: the request body, and (for reading only) the token's content.
const json = computed(() => JSON.stringify({
  provider: props.data.provider,
  user: {
    uid: props.data.uid,
    name: props.data.name,
    email: props.data.email,
    email_verified: props.data.emailVerified,
    photo: props.data.photo,
    phone: props.data.phone,
  },
  provider_data: props.data.providerData,
  request_to_server: { method: 'POST', path: '/v1/auth/firebase', body: { id_token: props.data.idToken } },
  id_token_claims: props.data.claims,
}, null, 2));

const copied = ref(false);
const copy = async () => {
  try {
    await navigator.clipboard.writeText(json.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1800);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('[data-testid="social-preview-json"]'));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
};
</script>

<style scoped>
.slp-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); z-index: 1000000; display: flex; align-items: center; justify-content: center; padding: 16px; font-family: 'IBM Plex Sans Arabic', sans-serif; }
.slp-box { position: relative; background: #fff; width: 100%; max-width: 640px; max-height: calc(100vh - 32px); overflow: auto; border-radius: 12px; padding: 22px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3); }
.slp-close { position: absolute; top: 10px; left: 14px; border: 0; background: none; font-size: 26px; line-height: 1; cursor: pointer; color: #6b7280; }
.slp-tag { display: inline-block; background: #fef3c7; color: #92400e; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 999px; margin-bottom: 12px; }
.slp-user { display: flex; align-items: center; gap: 14px; }
.slp-photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; background: #e5e7eb; flex-shrink: 0; }
.slp-photo-empty { display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 700; color: #374151; }
.slp-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.slp-info strong { font-size: 18px; color: #111827; }
.slp-info span { font-size: 14px; color: #4b5563; word-break: break-all; }
.slp-provider { font-weight: 700; color: #166534 !important; }
.slp-hint { font-size: 13px; color: #6b7280; margin: 14px 0 8px; line-height: 1.7; }
.slp-json { text-align: left; background: #0f172a; color: #e5e7eb; border-radius: 8px; padding: 12px; font-size: 12px; line-height: 1.55; max-height: 300px; overflow: auto; white-space: pre-wrap; word-break: break-all; user-select: all; margin: 0; }
.slp-actions { display: flex; gap: 10px; margin-top: 14px; }
.slp-btn { flex: 1; padding: 11px; border-radius: 8px; border: 1px solid #d1d5db; background: #fff; font: inherit; font-weight: 600; cursor: pointer; }
.slp-btn-main { background: #166534; border-color: #166534; color: #fff; }
</style>
