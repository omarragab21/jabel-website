<template>
  <div
    class="product-card"
    :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
    role="link"
    tabindex="0"
    :aria-label="productName"
    @click="$emit('click', product)"
    @mouseenter="secondaryVisible = true"
    @focusin="secondaryVisible = true"
    @keydown.enter.prevent="$emit('click', product)"
    @keydown.space.prevent="$emit('click', product)"
  >
    <!-- 1. Top Image with rounded corners & internal card padding -->
    <div class="product-image-wrapper" :class="{ 'img-loading': !imageSettled }">
      <img 
        :src="getImageUrl(product.image, product.id)" 
        :alt="productName" 
        ref="primaryImg"
        class="product-image primary-img" 
        loading="lazy" 
        decoding="async"
        width="480"
        height="480"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
        @load="handleImageLoad"
        @error="handleImageSettledError($event, product)" 
      />
      <img 
        v-if="secondaryImageUrl && secondaryVisible"
        :src="secondaryImageUrl" 
        :alt="productName" 
        class="product-image secondary-img" 
        loading="lazy" 
        decoding="async"
        width="480"
        height="480"
        sizes="(max-width: 1024px) 45vw, 280px"
        @error="handleSecondaryImageError"
      />
      
      <!-- Badges -->
      <div class="product-badges">
        <span class="badge-new" v-if="isNewProduct">{{ currentLang === 'ar' ? 'جديد' : 'NEW' }}</span>
        <span class="badge-sale" dir="ltr" v-if="discountPercentage > 0" data-testid="discount-badge">
          <template v-if="fixedAmount">-<img :src="priceRiyalIcon" alt="SAR" class="badge-riyal" data-testid="discount-riyal" />{{ fixedAmount }}</template>
          <template v-else>{{ discountLabel }}</template>
        </span>
      </div>

      <!-- "Only N left" low-stock overlay hidden by request:
      <div class="product-overlay" v-if="product.stock > 0 && product.stock <= 5">
        <span class="stock-warning">{{ t('product.only_left', { count: product.stock }) }}</span>
      </div>
      -->
      <!-- Out of stock (Figma "oos-overlay"): the photo is covered by a 60% white veil -->
      <div class="oos-overlay" v-if="isOutOfStock" data-testid="oos-overlay"></div>
    </div>
    
    <!-- 2. Product Information -->
    <div class="product-info">
      <span class="origin-tag">{{ displayCategory }}</span>
      
      <h3 class="product-name" dir="auto" :title="productName">{{ productName }}</h3>
      
      <div class="product-divider"></div>

      <!-- Discount area keeps its height even when there is no discount -->
      <div class="discount-area">
        <div class="old-price" v-if="discountPercentage > 0" dir="ltr">
          <img :src="oldRiyalIcon" alt="" class="old-price-riyal" aria-hidden="true" />
          <span class="old-price-val">{{ formatPrice(product.price) }}</span>
        </div>
      </div>

      <!-- Price and Add to Cart -->
      <div class="product-bottom-row">
        <div class="current-price-row" dir="ltr">
          <img :src="priceRiyalIcon" alt="" class="currency-symbol-svg" aria-hidden="true" />
          <span class="price-val">{{ formatPrice(currentPrice) }}</span>
        </div>

        <!-- Out of stock: the cart button becomes a grey «غير متوفر» pill (not clickable) -->
        <span class="oos-pill" v-if="isOutOfStock" data-testid="oos-pill">{{ t('product.out_of_stock') }}</span>
        <button v-else class="add-to-cart-btn" @click.stop="$emit('add-to-cart', product)" :aria-label="currentLang === 'ar' ? 'إضافة المنتج إلى السلة' : 'Add product to cart'">
          <span class="cart-icon-box"><span class="cart-icon-inset"><img :src="bagIcon" alt="" class="cart-icon" /></span></span>
          <span class="btn-text">{{ currentLang === 'ar' ? 'أضف للسلة' : 'Add to Cart' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOffers } from '../composables/useOffers';
import { discountBadgeText, fixedDiscountAmount } from '../../../domain/product/productDiscount';
import { useLocalized } from '../../../composables/useLocalized';
import priceRiyalIcon from '../../../assets/card-riyal.svg';
import { formatPrice } from '../../../utils/price';
import oldRiyalIcon from '../../../assets/card-riyal-old.svg';
import bagIcon from '../../../assets/card-bag.svg';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  offer: {
    type: Object,
    required: false
  },
  // Show the price the server already worked out (offers page), ignoring bundle pricing.
  serverPrice: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click', 'add-to-cart']);

const { t } = useI18n();
const { currentLang, localized } = useLocalized();
const { getActiveOfferForProduct, calculateDiscountFromOffer, calculatePriceWithOffer, ensureOffers, getBundleDeal } = useOffers();
ensureOffers();
const isOutOfStock = computed(() => Number(props.product?.stock) <= 0);
const secondaryVisible = ref(false);
const imageSettled = ref(false);
const primaryImg = ref(null);
onMounted(() => {
  // A cached image can finish before Vue attaches @load.
  if (primaryImg.value?.complete && primaryImg.value.naturalWidth > 0) imageSettled.value = true;
});
const productName = computed(() => {
  if (!props.product) return '';
  if (currentLang.value === 'ar') {
    return props.product.name_ar || localized(props.product, 'name') || props.product.name || '';
  }
  return props.product.name_en || localized(props.product, 'name') || props.product.name || '';
});

// Category the product belongs to; a sub category follows it after a dash ("Category - Sub category").
const displayCategory = computed(() => {
  const category = props.product?.category;
  const sub = props.product?.sub_category || props.product?.subCategory;
  const parent = category?.parent || category?.parent_category;
  const names = [];
  const push = (item) => {
    const name = item && typeof item === 'object' ? String(localized(item, 'name') || item.name || '').trim() : '';
    if (name && !names.includes(name)) names.push(name);
  };
  if (sub) {
    push(category);
    push(sub);
  } else if (parent) {
    push(parent);
    push(category);
  } else {
    push(category);
  }
  return names.join(' - ');
});

onMounted(() => {
  if (typeof performance !== 'undefined' && typeof performance.mark === 'function' && !globalThis.__mastergasFirstCardRendered) {
    globalThis.__mastergasFirstCardRendered = true;
    performance.mark('mastergas:first-product-card-rendered');
  }
});

const isNewProduct = computed(() => {
  const value = props.product?.is_new ?? props.product?.new_arrival ?? props.product?.is_new_arrival;
  return value === true || value === 1 || value === '1' || value === 'true';
});

const activeOffer = computed(() => {
  if (!props.product || props.serverPrice) return null;
  if (props.offer) return props.offer;
  return getActiveOfferForProduct(props.product);
});

// A product inside a running bundle shows that bundle's discount (old price, price in the bundle).
const bundleDeal = computed(() => (props.product && !props.serverPrice ? getBundleDeal(props.product) : null));

const discountPercentage = computed(() => {
  if (!props.product) return 0;
  if (bundleDeal.value) return bundleDeal.value.percent;
  const offer = activeOffer.value;
  if (offer) {
    return calculateDiscountFromOffer(props.product, offer);
  }
  const price = Number(props.product.price) || 0;
  const salePrice = Number(props.product.sale_price) || 0;
  if (price > 0 && salePrice > 0 && salePrice < price) return ((price - salePrice) / price) * 100;
  return Number(props.product.discount) || 0;
});

// "-20%", or the amount ("-100 SAR") when the offer is a fixed discount.
// A fixed-amount offer shows the amount with the riyal sign (the same icon as the price), not a percentage.
const fixedAmount = computed(() => (bundleDeal.value || !props.product ? '' : fixedDiscountAmount(props.product)));
const discountLabel = computed(() => (bundleDeal.value || !props.product
  ? `-${Math.round(discountPercentage.value)}%`
  : (discountBadgeText(props.product, currentLang.value) || `-${Math.round(discountPercentage.value)}%`)));

const currentPrice = computed(() => {
  if (!props.product) return 0;
  if (bundleDeal.value) return bundleDeal.value.price;
  const offer = activeOffer.value;
  if (offer) {
    return calculatePriceWithOffer(props.product, offer);
  }
  const salePrice = Number(props.product.sale_price) || 0;
  const price = Number(props.product.price) || 0;
  if (salePrice > 0 && salePrice < price) return salePrice;
  const discount = discountPercentage.value;
  return price * (1 - (discount / 100));
});

const handleImageError = (event) => {
  event.target.src = '/brand/mastergas-icon.png';
};

// Keep the shimmer until the image (or its broken-image placeholder) has settled.
const handleImageSettledError = (event, productRef) => {
  if (String(event.target.src).endsWith('/brand/mastergas-icon.png')) {
    imageSettled.value = true;
    return;
  }
  handleImageError(event, productRef);
};

const handleSecondaryImageError = (event) => {
  event.target.remove();
};

const handleImageLoad = () => {
  imageSettled.value = true;
  if (typeof performance !== 'undefined' && typeof performance.mark === 'function' && !globalThis.__mastergasImagesLoaded) {
    globalThis.__mastergasImagesLoaded = true;
    performance.mark('mastergas:images-loaded');
  }
};

const getImageUrl = (path, id) => {
  const rawPath = typeof path === 'object' && path !== null
    ? (path.image_url || path.url || path.image || path.path || '')
    : path;
  if (rawPath && (String(rawPath).startsWith('/') || String(rawPath).startsWith('http'))) {
    return rawPath;
  }
  if (!rawPath) return '/brand/mastergas-icon.png';
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://backend-jabal.be-kite.com/api';
  return `${baseUrl.replace('/api', '')}/storage/${rawPath}`;
};

const secondaryImageUrl = computed(() => {
  if (Array.isArray(props.product?.images) && props.product.images.length > 1) {
    return getImageUrl(props.product.images[1], null);
  }
  return null;
});

</script>

<style src="../styles/product-card.css" scoped></style>
