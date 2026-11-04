import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalized } from '../../../composables/useLocalized';
import { productService } from '../../product/services/productService';
import { matchesExtraFilters } from '../../../domain/product/productFilters';

// The offers page: the dashboard's discounts that are running, each with the products it applies to.
export function useOffersCatalog() {
  const router = useRouter();
  const route = useRoute();
  const { currentLang, localized } = useLocalized();

  const offers = ref([]);
  const loading = ref(true);
  const selectedOfferId = ref(null);
  const currentPage = ref(1);
  const perPage = ref(9);
  const sortBy = ref('relevant');

  // Filters
  const inStockOnly = ref(false);

  const currentOffer = computed(() => {
    if (!selectedOfferId.value) return null;
    return offers.value.find((offer) => String(offer.id) === String(selectedOfferId.value)) || null;
  });

  const offerProducts = (offer) => (offer?.products || []).filter((product) => product.is_active !== false);

  // "All offers" = every product that is in at least one offer, each counted once.
  const offeredProducts = computed(() => {
    const seen = new Map();
    offers.value.forEach((offer) => offerProducts(offer).forEach((product) => {
      if (!seen.has(String(product.id))) seen.set(String(product.id), product);
    }));
    return [...seen.values()];
  });

  const allProducts = offeredProducts;

  const getOfferCount = (offer) => offerProducts(offer).length;

  const priceOf = (product) => Number(product.sale_price) || Number(product.price) || 0;

  const filteredProducts = computed(() => {
    let list = currentOffer.value ? [...offerProducts(currentOffer.value)] : [...offeredProducts.value];
    list = list.filter((product) => matchesExtraFilters(product, { inStock: inStockOnly.value }));

    if (sortBy.value === 'price_asc') list.sort((a, b) => priceOf(a) - priceOf(b));
    else if (sortBy.value === 'price_desc') list.sort((a, b) => priceOf(b) - priceOf(a));
    else if (sortBy.value === 'newest') list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    return list;
  });

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredProducts.value.slice(start, start + perPage.value);
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage.value) || 1);

  const selectOffer = (id) => {
    selectedOfferId.value = id;
    currentPage.value = 1;
    if (id) {
      router.replace({ query: { ...route.query, offer: id } });
    } else {
      const query = { ...route.query };
      delete query.offer;
      delete query.id;
      router.replace({ query });
    }
  };

  const goToProduct = (product) => {
    router.push(`/product/${product.id}`);
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resolveOfferFromQuery = () => {
    const queryOffer = route.query.offer || route.query.id;
    if (!queryOffer) return;
    const found = offers.value.find((offer) => String(offer.id) === String(queryOffer));
    if (found) selectedOfferId.value = found.id;
  };

  const fetchOffers = async () => {
    loading.value = true;
    try {
      const list = await productService.getDiscounts();
      // Each offer with all of its products; one that cannot be read is left out rather than shown empty.
      const detailed = await Promise.allSettled(list.map((offer) => productService.getDiscount(offer.id)));
      offers.value = detailed.map((result, index) => (result.status === 'fulfilled' ? { ...list[index], ...result.value } : null))
        .filter((offer) => offer && offer.products.length > 0);
    } catch (err) {
      console.error('Failed to fetch offers from API:', err);
      offers.value = [];
    } finally {
      loading.value = false;
    }
  };

  watch(() => route.query.offer, () => {
    resolveOfferFromQuery();
  });

  return {
    currentLang,
    localized,
    offers,
    allProducts,
    loading,
    selectedOfferId,
    currentPage,
    perPage,
    sortBy,
    inStockOnly,
    currentOffer,
    getOfferCount,
    offeredProducts,
    filteredProducts,
    paginatedProducts,
    totalPages,
    selectOffer,
    goToProduct,
    changePage,
    resolveOfferFromQuery,
    fetchOffers,
  };
}
