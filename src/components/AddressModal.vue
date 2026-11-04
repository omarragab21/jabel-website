<template>
<div class="modal-overlay add-address-modal-overlay" @click.self="close">
  <div class="add-address-modal" role="dialog" aria-modal="true">
    <!-- modal-header -->
    <div class="add-address-modal-header">
      <!-- Title on Right in RTL -->
      <h3 class="add-address-modal-title">{{ isEdit ? t('profile.edit_address') : t('profile.add_new_address') }}</h3>

      <!-- close-btn on Left in RTL -->
      <button type="button" class="add-address-close-btn" @click="close" :aria-label="t('common.close')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="2" y1="2" x2="12" y2="12"></line>
          <line x1="12" y1="2" x2="2" y2="12"></line>
        </svg>
      </button>
    </div>

    <!-- form-fields -->
    <form @submit.prevent="submit" class="add-address-form">
      <!-- field-name: اسم المستلم -->
      <div class="add-address-field">
        <label class="add-address-label">{{ t('checkout.recipient_name') }}</label>
        <input 
          type="text" 
          v-model="addressForm.full_name" 
          class="add-address-input" 
          :placeholder="t('checkout.recipient_name_enter')" 
          required 
        />
      </div>

      <!-- field-phone: رقم الجوال -->
      <div class="add-address-field">
        <label class="add-address-label">{{ t('profile.mobile') }}</label>
        <div class="phone-input-container">
          <div class="phone-country-code">
            <span class="phone-prefix" dir="ltr">&lrm;+966</span>
            <span class="phone-divider"></span>
          </div>
          <input 
            type="tel" 
            v-model="addressForm.phone" 
            class="phone-number-input" 
            placeholder="5XXXXXXXX" 
            dir="ltr"
            required 
          />
        </div>
      </div>

      <!-- Frame 12: المدينة والمنطقة -->
      <div class="address-two-cols-row">
        <!-- field-type: المدينة -->
        <div class="add-address-field half-field">
          <label class="add-address-label">{{ t('checkout.city') }}</label>
          <div class="select-wrapper">
            <select v-model="addressForm.city" class="add-address-select city-select" required @change="onCityChange">
              <option value="" disabled selected>{{ t('checkout.choose_city') }}</option>
              <option v-for="c in cityOptions" :key="c" :value="c">{{ placeLabel(c) }}</option>
            </select>
            <div class="select-arrow">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- field-type: المنطقة -->
        <div class="add-address-field half-field">
          <label class="add-address-label">{{ t('checkout.region') }}</label>
          <div class="select-wrapper">
            <select v-model="addressForm.region" class="add-address-select region-select">
              <option value="" disabled selected>{{ t('checkout.choose_region') }}</option>
              <option v-for="r in regionOptions" :key="r" :value="r">{{ placeLabel(r) }}</option>
            </select>
            <div class="select-arrow">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- field-message: العنوان بالتفصيل (الشارع، رقم المبنى، الشقة) -->
      <div class="add-address-field">
        <label class="add-address-label">{{ t('checkout.address_details_label') }}</label>
        <textarea 
          v-model="addressForm.address" 
          class="add-address-textarea" 
          :placeholder="t('checkout.address_details_placeholder')"
          rows="3"
          required
        ></textarea>
      </div>

      <!-- field-message: ملاحظات التوصيل (اختياري) -->
      <div class="add-address-field">
        <label class="add-address-label">{{ t('checkout.delivery_notes_optional') }}</label>
        <textarea 
          v-model="addressForm.notes" 
          class="add-address-textarea" 
          :placeholder="t('checkout.delivery_notes_placeholder')"
          rows="3"
        ></textarea>
      </div>

      <!-- default-address-row: اجعل هذا العنوان افتراضيًا -->
      <div class="default-address-checkbox-row" @click="addressForm.is_default = !addressForm.is_default">
        <div class="custom-checkbox" :class="{ checked: addressForm.is_default }">
          <svg v-if="addressForm.is_default" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="default-checkbox-text">{{ t('profile.make_default_address') }}</span>
      </div>

      <!-- btn-save-address: حفظ العنوان -->
      <button type="submit" class="btn-save-address" :disabled="saving">
        {{ saving ? t('profile.saving') : t('checkout.save_address') }}
      </button>
    </form>
  </div>
</div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { defaultCityOptions, defaultRegionOptions, regionForCity, joinCityRegion, regionFromCityPart } from '../data/saPlaces'
import { placeLabel as placeLabelFor } from '../utils/placeLabels'

// The add / edit address dialog (Figma add-address-modal). Shared by the profile page and the checkout
// "add new address" tab so both collect and format an address the same way. It only collects the data:
// the page that opens it decides how to save it.
const props = defineProps({
  address: { type: Object, default: null },
  existingAddresses: { type: Array, default: () => [] },
  saving: { type: Boolean, default: false },
  makeDefault: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'save'])

const { t, locale } = useI18n()
const placeLabel = (name) => placeLabelFor(name, locale.value)
const isEdit = computed(() => Boolean(props.address?.id))

const addressForm = reactive({ name: '', full_name: '', phone: '', city: '', region: '', address: '', notes: '', is_default: false })

const fillFrom = (addr) => {
  if (!addr) {
    Object.assign(addressForm, { name: '', full_name: '', phone: '', city: '', region: '', address: '', notes: '', is_default: props.makeDefault })
    return
  }
  let phoneVal = addr.phone || ''
  phoneVal = phoneVal.replace(/^\+966/, '').replace(/^966/, '')
  if (phoneVal.startsWith('05')) phoneVal = phoneVal.substring(1)

  const parts = (addr.city || '').split('،').map((p) => p.trim())
  const cityVal = parts[0] || addr.city || ''
  const regionVal = parts[1] ? regionFromCityPart(parts[1]) : (addr.region || '')

  Object.assign(addressForm, {
    name: addr.name || addr.full_name || '',
    full_name: addr.full_name || addr.name || '',
    phone: phoneVal,
    city: cityVal,
    region: regionVal,
    address: addr.address || '',
    notes: addr.notes || '',
    is_default: !!addr.is_default,
  })
}
watch(() => props.address, fillFrom, { immediate: true })

// Keep existing customer data editable even when it comes from a different city/region catalog than the
// storefront defaults: a native required select rejects a value that has no matching option.
const cityOptions = computed(() => {
  const persistedCities = props.existingAddresses
    .map((address) => String(address?.city || '').split('،')[0].trim())
    .filter(Boolean)
  const currentCity = String(addressForm.city || '').trim()
  return [...new Set([...defaultCityOptions, ...persistedCities, currentCity].filter(Boolean))]
})

const regionOptions = computed(() => {
  const persistedRegions = props.existingAddresses
    .flatMap((address) => {
      const parts = String(address?.city || '').split('،').map((part) => part.trim()).filter(Boolean)
      return [address?.region, address?.area, parts[1]]
    })
    .map((region) => String(region || '').trim())
    .filter(Boolean)
  const currentRegion = String(addressForm.region || '').trim()
  return [...new Set([...defaultRegionOptions, ...persistedRegions, currentRegion].filter(Boolean))]
})

// Choosing a city brings the region it belongs to (still editable afterwards).
const onCityChange = () => {
  const region = regionForCity(addressForm.city)
  if (region) addressForm.region = region
}

const close = () => emit('close')

const submit = () => {
  let formattedPhone = (addressForm.phone || '').trim()
  if (formattedPhone.startsWith('0')) formattedPhone = formattedPhone.substring(1)
  if (!formattedPhone.startsWith('05') && formattedPhone.startsWith('5')) {
    formattedPhone = '0' + formattedPhone
  }
  emit('save', {
    name: addressForm.full_name,
    full_name: addressForm.full_name,
    address: addressForm.address,
    city: joinCityRegion(addressForm.city || 'الرياض', addressForm.region),
    region: addressForm.region,
    notes: addressForm.notes,
    phone: formattedPhone,
    is_default: addressForm.is_default,
  })
}
</script>

<style scoped>
/* ==========================================================================
   Add / Edit Address Modal (Figma add-address-modal exact pixel-perfect)
   ========================================================================== */
.add-address-modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.add-address-modal {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 24px;
  width: 480px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #FFFFFF;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.101961);
  border-radius: 8px;
  direction: rtl;
  position: relative;
  animation: modalSecurityPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.add-address-modal-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 36px;
}

.add-address-modal-title {
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-align: right;
  color: #000000;
}

.add-address-close-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 32px;
  height: 32px;
  background: #F1F5F9;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-address-close-btn:hover {
  background: #E2E8F0;
}

.add-address-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;
}

.add-address-field {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
}

.add-address-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #000000;
  width: 100%;
}

.add-address-input {
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0px 16px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-align: right;
  transition: border-color 0.2s ease;
  outline: none;
}

.add-address-input:focus {
  border-color: #000000;
}

.add-address-input::placeholder {
  color: #64748B;
}

.phone-input-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 16px;
  width: 100%;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  direction: ltr;
  transition: border-color 0.2s ease;
  direction: rtl;
}

.phone-ltr {
  direction: ltr;
  unicode-bidi: isolate;
  display: inline-block;
  text-align: left;
}

.phone-input-container:focus-within {
  border-color: #000000;
}

.phone-country-code {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.phone-prefix {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  direction: ltr !important;
  display: inline-block;
  unicode-bidi: isolate;
}

.phone-divider {
  width: 1px;
  height: 16px;
  background: #E2E8F0;
}

.phone-number-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding-left: 8px;
  padding-right: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  direction: ltr;
  text-align: left;
}

.phone-number-input::placeholder {
  color: #64748B;
}

.address-two-cols-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
}

.half-field {
  flex: 1;
  width: 50%;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.add-address-select {
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0px 16px 0px 36px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-align: right;
  cursor: pointer;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.2s ease;
}

.city-select {
  background: #FFFFFF;
}

.region-select {
  background: #F1F5F9;
}

.add-address-select:focus {
  border-color: #000000;
}

.select-arrow {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-address-textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 12px 16px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-align: right;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
}

.add-address-textarea:focus {
  border-color: #000000;
}

.add-address-textarea::placeholder {
  color: #64748B;
}

.default-address-checkbox-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;
  user-select: none;
}

.default-checkbox-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #000000;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 1.5px solid #CBD5E1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.custom-checkbox.checked {
  background: var(--color-brand-primary, #000000);
  border-color: #000000;
}

.btn-save-address {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  width: 100%;
  height: 48px;
  background: var(--color-brand-primary, #000000);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  transition: background-color 0.2s ease;
  margin-top: 8px;
}

.btn-save-address:hover {
  background: var(--color-button-hover);
}

.btn-save-address:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .add-address-modal {
    padding: 24px 16px;
  }
  .address-two-cols-row {
    flex-direction: column;
    gap: 16px;
  }
  .half-field {
    width: 100%;
  }
}


@keyframes modalSecurityPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
