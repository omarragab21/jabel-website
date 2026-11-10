<template>
  <div ref="rootEl" class="delivery-dropdown" :class="{ 'is-open': open }">
    <button
      type="button"
      class="delivery-selector"
      :aria-expanded="open"
      aria-haspopup="listbox"
      data-testid="delivery-selector"
      @click="toggle"
    >
      <img :src="locationIcon" alt="" class="delivery-icon delivery-icon-pin" />
      <span class="delivery-label">{{ selectedLabel || t('checkout.deliver_to') }}</span>
      <img :src="arrowDownIcon" alt="" class="delivery-icon delivery-icon-arrow" :class="{ 'is-flipped': open }" />
    </button>

    <transition name="delivery-pop">
      <div v-if="open" class="delivery-panel" role="listbox" :aria-label="t('checkout.deliver_to')" data-testid="delivery-panel" :dir="isAr ? 'rtl' : 'ltr'">
        <!-- Shimmer while the addresses are fetched -->
        <div v-if="loading" class="delivery-skeleton" role="status" aria-busy="true" data-testid="delivery-skeleton">
          <div v-for="n in 3" :key="n" class="delivery-skeleton-row">
            <span class="sk-shimmer sk-circle" style="width: 18px; height: 18px"></span>
            <div class="delivery-skeleton-lines">
              <span class="sk-shimmer sk-line" style="width: 55%"></span>
              <span class="sk-shimmer sk-line" style="width: 80%; height: 12px"></span>
            </div>
          </div>
        </div>

        <!-- No addresses yet -->
        <div v-else-if="!addresses.length" class="delivery-empty" data-testid="delivery-empty">
          <p class="delivery-empty-text">{{ isAr ? 'لا يوجد عناوين' : 'No addresses yet' }}</p>
          <button type="button" class="delivery-add-btn" data-testid="delivery-add" @click="openAdd">
            + {{ isAr ? 'إضافة عنوان' : 'Add an address' }}
          </button>
        </div>

        <!-- The saved addresses -->
        <template v-else>
          <ul class="delivery-list">
            <li v-for="address in addresses" :key="address.id">
              <button
                type="button"
                class="delivery-item"
                :class="{ 'is-selected': String(address.id) === String(selectedId) }"
                role="option"
                :aria-selected="String(address.id) === String(selectedId)"
                data-testid="delivery-item"
                @click="choose(address)"
              >
                <span class="delivery-item-body">
                  <span class="delivery-item-name">{{ addressTitle(address) }}</span>
                  <span class="delivery-item-line">{{ addressLine(address) }}</span>
                </span>
                <span v-if="address.is_default" class="delivery-item-badge">{{ isAr ? 'الافتراضي' : 'Default' }}</span>
              </button>
            </li>
          </ul>
          <button type="button" class="delivery-add-btn delivery-add-btn--footer" data-testid="delivery-add" @click="openAdd">
            + {{ isAr ? 'إضافة عنوان' : 'Add an address' }}
          </button>
        </template>
      </div>
    </transition>

    <AddressModal
      v-if="showModal"
      :existing-addresses="addresses"
      :saving="saving"
      :make-default="!addresses.length"
      @close="showModal = false"
      @save="saveAddress"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AddressModal from './AddressModal.vue';
import { authState } from '../store/auth';
import { profileService } from '../modules/profile/services/profileService';
import locationIcon from '../assets/icons/header/location.svg';
import arrowDownIcon from '../assets/icons/header/arrow-down.svg';

const { t, locale } = useI18n();
const isAr = computed(() => locale.value === 'ar');

const SELECTED_KEY = 'delivery_address_id';
const rootEl = ref(null);
const open = ref(false);
const loading = ref(false);
const saving = ref(false);
const showModal = ref(false);
const addresses = ref([]);
const selectedId = ref((() => { try { return localStorage.getItem(SELECTED_KEY) || ''; } catch { return ''; } })());

const addressTitle = (address) => String(address.name || address.full_name || address.address || '').trim();
const addressLine = (address) => [address.city, address.address].filter(Boolean).join(' - ');

const selectedAddress = computed(() => addresses.value.find((a) => String(a.id) === String(selectedId.value)) || null);
// The button reads «التوصيل إلى» until an address is chosen, then shows where the order goes.
const selectedLabel = computed(() => (selectedAddress.value ? `${t('checkout.deliver_to')}: ${String(selectedAddress.value.city || '').split('،')[0].trim() || addressTitle(selectedAddress.value)}` : ''));

const loadAddresses = async () => {
  if (!authState.token) { addresses.value = []; return; }
  loading.value = true;
  try {
    addresses.value = await profileService.getAddresses();
    // A remembered choice that no longer exists is dropped; with none chosen the default (or first) is used.
    if (!selectedAddress.value) {
      const fallback = addresses.value.find((a) => a.is_default) || addresses.value[0];
      selectedId.value = fallback ? String(fallback.id) : '';
    }
  } catch {
    addresses.value = [];
  } finally {
    loading.value = false;
  }
};

const toggle = async () => {
  if (!authState.token) {
    // Addresses belong to an account: ask the visitor to sign in first.
    if (typeof window !== 'undefined' && typeof window.openAuthModal === 'function') window.openAuthModal();
    return;
  }
  open.value = !open.value;
  if (open.value) await loadAddresses();
};

const choose = (address) => {
  selectedId.value = String(address.id);
  try { localStorage.setItem(SELECTED_KEY, selectedId.value); } catch { /* storage unavailable */ }
  open.value = false;
};

// «إضافة عنوان»: the list closes and the add-address dialog opens.
const openAdd = () => {
  open.value = false;
  showModal.value = true;
};

const saveAddress = async (payload) => {
  saving.value = true;
  try {
    const created = await profileService.createAddress(payload);
    await loadAddresses();
    if (created?.id !== undefined) {
      selectedId.value = String(created.id);
      try { localStorage.setItem(SELECTED_KEY, selectedId.value); } catch { /* storage unavailable */ }
    }
    showModal.value = false;
  } catch (error) {
    // The dialog stays open so nothing typed is lost.
    console.error('Saving the address failed', error);
  } finally {
    saving.value = false;
  }
};

const onOutside = (event) => { if (open.value && rootEl.value && !rootEl.value.contains(event.target)) open.value = false; };
const onKey = (event) => { if (event.key === 'Escape') open.value = false; };
onMounted(() => {
  document.addEventListener('mousedown', onOutside);
  document.addEventListener('keydown', onKey);
  if (authState.token) void loadAddresses();
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onOutside);
  document.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.delivery-dropdown { position: relative; flex-shrink: 0; }
.delivery-selector {
  display: flex;
  align-items: center;
  gap: 6px;
  width: auto;
  max-width: 260px;
  height: 44px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #000000;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-align: start;
}
.delivery-label { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.delivery-icon-pin { width: 14.2127px; height: 19.7084px; margin: 0 3.9px; flex-shrink: 0; }
.delivery-icon-arrow { width: 12.3749px; height: 6.875px; margin: 0 2px; flex-shrink: 0; transition: transform 0.2s ease; }
.delivery-icon-arrow.is-flipped { transform: rotate(180deg); }

.delivery-panel {
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-start: 0;
  width: 320px;
  max-height: 380px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);
  z-index: 1200;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
.delivery-pop-enter-active, .delivery-pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.delivery-pop-enter-from, .delivery-pop-leave-to { opacity: 0; transform: translateY(-6px); }

.delivery-list { list-style: none; margin: 0; padding: 6px; }
.delivery-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: start;
  font-family: inherit;
}
.delivery-item:hover { background: #f8fafc; }
.delivery-item.is-selected { background: #f0f7ec; box-shadow: inset 3px 0 0 var(--color-brand-primary, #267b00); }
.delivery-item-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.delivery-item-name { font-size: 14px; font-weight: 700; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.delivery-item-line { font-size: 12px; font-weight: 400; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.delivery-item-badge { flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: #e8f3e2; color: var(--color-brand-primary, #267b00); }

.delivery-empty { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 22px 16px; }
.delivery-empty-text { margin: 0; font-size: 14px; color: #6b7280; }
.delivery-add-btn {
  padding: 9px 18px;
  border: 1px solid var(--color-brand-primary, #267b00);
  border-radius: 8px;
  background: #ffffff;
  color: var(--color-brand-primary, #267b00);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.delivery-add-btn:hover { background: var(--color-brand-primary, #267b00); color: #ffffff; }
.delivery-add-btn--footer { display: block; width: calc(100% - 12px); margin: 0 6px 8px; }

.delivery-skeleton { display: flex; flex-direction: column; gap: 14px; padding: 16px; }
.delivery-skeleton-row { display: flex; align-items: center; gap: 12px; }
.delivery-skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
</style>
