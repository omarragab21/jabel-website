<template>
  <div class="website-layout" :class="currentLang === 'ar' ? 'lang-ar' : 'lang-en'" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
    <header class="fixed-header">
      <!-- Free-shipping announcement: only while the store has a free-shipping amount above zero -->
      <div v-if="showTopBar" class="top-bar" data-testid="top-bar">
        <div class="top-bar-container">
          <span class="announcement-text">{{ freeShippingAnnouncement }}</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="nav-container">
          <div class="header-main-row">
            <!-- Logo -->
            <router-link to="/" class="logo" :aria-label="$t('common.home_aria')">
              <div class="logo-icon">
                <img v-if="settingsReady" :src="siteLogo || '/brand/jabel-logo.png'" :alt="siteName || 'Jabel'" class="site-logo-img">
                <span v-else class="sk-shimmer logo-skeleton" aria-hidden="true"></span>
              </div>
            </router-link>

            <!-- Delivery method selector (desktop) -->
            <DeliveryAddressDropdown class="desktop-only" />

            <!-- Search field (desktop) -->
            <HeaderSearch class="desktop-only" />

            <!-- Icons & language (desktop) -->
            <div class="header-left desktop-only">
              <button class="lang-toggle-btn" @click="toggleLanguage" :title="currentLang === 'ar' ? 'English' : 'العربية'">
                <span>{{ currentLang === 'ar' ? 'English' : 'العربية' }}</span>
              </button>
              <div class="header-nav-icons">
                <router-link to="/wishlist" class="header-icon-link wishlist-link" :title="currentLang === 'ar' ? 'المفضلة' : 'Wishlist'">
                  <img :src="heartAddIcon" alt="" class="nav-heart-icon" />
                  <span v-if="wishlistCount > 0" class="wishlist-count-badge" data-testid="wishlist-count">{{ wishlistCount }}</span>
                </router-link>

                <div class="user-dropdown-container" @mouseenter="isLoggedIn && (showUserDropdown = true)" @mouseleave="showUserDropdown = false">
                  <button class="header-icon-btn user-btn" :title="isLoggedIn ? $t('profile.title') : $t('nav.login')" @click="handleUserClick">
                    <span class="nav-user-icon" aria-hidden="true"><img :src="userIcon" alt="" /></span>
                  </button>
                  <transition name="fade">
                    <div v-if="isLoggedIn && showUserDropdown" class="user-dropdown-menu" @click.stop>
                      <div class="user-dropdown-header">
                        <p class="user-name">{{ authState.user?.name || authState.user?.full_name || $t('auth.customer') }}</p>
                        <p class="user-phone" dir="ltr" v-if="authState.user?.email || authState.user?.phone || currentUser?.phone">
                          {{ authState.user?.email || authState.user?.phone || currentUser?.phone || '' }}
                        </p>
                      </div>
                      <div class="user-dropdown-body">
                        <router-link to="/profile" class="user-dropdown-item" @click="showUserDropdown = false">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {{ $t('profile.title') }}
                        </router-link>
                        <button class="user-dropdown-item logout" @click="handleLogout(); showUserDropdown = false">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                          {{ $t('profile.logout') }}
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <a href="/cart" class="header-icon-link cart-link" :title="$t('cart.title') || 'سلة المشتريات'" @click.prevent="handleCartClick">
                  <div class="cart-wrapper">
                    <img :src="cartIcon" alt="" class="nav-cart-icon" />
                    <span class="cart-badge-black" v-if="cartCount > 0">{{ cartCount }}</span>
                  </div>
                </a>
              </div>

            </div>

        <!-- Mobile Side Actions (Left in RTL Mobile) -->
        <div class="nav-actions-left mobile-only">
          <!-- Cart, Search & Profile Icons -->
          <div class="nav-icons mobile-icons">
            <button class="icon-btn search-btn" @click="showSearchModal = true; isMobileMenuOpen = false">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <a href="/cart" class="icon-btn cart-btn" :title="$t('cart.title') || 'سلة المشتريات'" @click.prevent="handleCartClick">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-6 h-6"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
              <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
            </a>
            <div class="user-dropdown-container">
              <button class="icon-btn user-btn" :title="isLoggedIn ? $t('profile.title') : $t('nav.login')" @click="handleUserClick">
                <span class="nav-user-icon" aria-hidden="true"><img :src="userIcon" alt="" /></span>
              </button>
              <transition name="fade">
                <div v-if="isLoggedIn && showUserDropdown" class="user-dropdown-menu mobile-user-dropdown" @click.stop>
                  <div class="user-dropdown-header">
                    <p class="user-name">{{ authState.user?.name || authState.user?.full_name || $t('auth.customer') }}</p>
                    <p class="user-phone" dir="ltr" v-if="authState.user?.email || authState.user?.phone || currentUser?.phone">
                        {{ authState.user?.email || authState.user?.phone || currentUser?.phone || '' }}
                    </p>
                  </div>
                  <div class="user-dropdown-body">
                    <router-link to="/profile" class="user-dropdown-item" @click="showUserDropdown = false">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {{ $t('profile.title') }}
                    </router-link>
                    <button class="user-dropdown-item logout" @click="handleLogout(); showUserDropdown = false">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      {{ $t('profile.logout') }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Burger/Close Menu -->
          <button class="icon-btn menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <svg v-if="!isMobileMenuOpen" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
          </div>

          <!-- Navigation row (desktop) -->
          <div class="header-navigation-row desktop-only">
            <div class="nav-links">
              <router-link to="/" active-class="active" exact-active-class="active">
                <span>{{ $t('nav.home') }}</span>
                <span class="active-underline"></span>
              </router-link>
              <router-link to="/products" active-class="active" exact-active-class="active">
                <span>{{ $t('nav.products') }}</span>
                <span class="active-underline"></span>
              </router-link>
              <router-link to="/offers" active-class="active" exact-active-class="active">
                <span>{{ $t('nav.offers') }}</span>
                <span class="active-underline"></span>
              </router-link>
              <router-link to="/about" active-class="active" exact-active-class="active">
                <span>{{ $t('nav.about') }}</span>
                <span class="active-underline"></span>
              </router-link>
              <router-link to="/contact" active-class="active" exact-active-class="active">
                <span>{{ $t('nav.contact') }}</span>
                <span class="active-underline"></span>
              </router-link>
            </div>
          </div>

        <!-- Mobile Menu Overlay -->
        <transition name="slide-down">
          <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
            <div class="mobile-menu-inner">
              <div class="mobile-menu-links">
                <router-link to="/" class="mobile-link" :class="{ 'active': $route.path === '/' }" @click="isMobileMenuOpen = false">{{ $t('nav.home') }}</router-link>
                <router-link to="/products" class="mobile-link" :class="{ 'active': $route.path === '/products' }" @click="isMobileMenuOpen = false">{{ $t('nav.products') }}</router-link>
                <router-link to="/offers" class="mobile-link" :class="{ 'active': $route.path === '/offers' }" @click="isMobileMenuOpen = false">{{ $t('nav.offers') }}</router-link>
                <router-link to="/about" class="mobile-link" :class="{ 'active': $route.path === '/about' }" @click="isMobileMenuOpen = false">{{ $t('nav.about') }}</router-link>
                <router-link to="/contact" class="mobile-link" :class="{ 'active': $route.path === '/contact' }" @click="isMobileMenuOpen = false">{{ $t('nav.contact') }}</router-link>
              </div>
              
              <div class="mobile-menu-separator"></div>

              <div class="mobile-menu-footer">
                <div class="footer-item" @click="toggleLanguage">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                  <span>{{ currentLang === 'ar' ? 'English' : 'العربية' }}</span>
                </div>
                <button class="footer-item" @click="handleUserClick(); isMobileMenuOpen = false">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{{ isLoggedIn ? $t('profile.title') : $t('nav.login') }}</span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>

      <!-- News bar -->
      <div v-if="newsItems.length" ref="newsBarEl" class="news-bar" :class="{ 'news-bar-hidden': isScrolled, 'news-bar-marquee': newsMarquee }" :style="{ '--news-duration': `${newsDuration}s` }" data-testid="news-bar">
        <div class="news-bar-track">
          <ul v-for="n in 2" :key="n" class="news-bar-list" :aria-hidden="n === 2 ? 'true' : null">
            <li v-for="(item, i) in newsItems" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <!-- Global Components -->
    <add-to-cart-modal />
    <auth-modal
      ref="authModal"
      :logo="siteLogo"
      :site-name="siteName"
      @close="handleAuthModalClose"
    />

    <WebsiteSearchModal v-model="showSearchModal" />

    <!-- Floating Action Buttons -->
    <a v-if="formatSocialUrl(socials.whatsapp, 'whatsapp')" :href="formatSocialUrl(socials.whatsapp, 'whatsapp')" target="_blank" rel="noopener noreferrer" class="whatsapp-float">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Store (Right in RTL) -->
          <div class="footer-col footer-col-store">
            <h4 class="footer-title">{{ currentLang === 'ar' ? 'المتجر' : 'Store' }}</h4>
            <ul class="footer-links">
              <li><router-link to="/products">{{ currentLang === 'ar' ? 'جميع الأجهزة' : 'All Appliances' }}</router-link></li>
              <li v-for="category in footerCategories" :key="category.id" data-testid="footer-category">
                <router-link :to="`/products?category_id=${category.id}`">{{ category.label }}</router-link>
              </li>
              <li><router-link to="/offers">{{ currentLang === 'ar' ? 'العروض' : 'Offers' }}</router-link></li>
            </ul>
          </div>

          <!-- Col 2: Account (Middle Right in RTL) -->
          <div class="footer-col footer-col-account">
            <h4 class="footer-title">{{ currentLang === 'ar' ? 'حسابي' : 'My Account' }}</h4>
            <ul class="footer-links">
              <li>
                <router-link v-if="isLoggedIn" to="/profile" data-testid="footer-profile-link">
                  {{ currentLang === 'ar' ? 'صفحتي الشخصية' : 'My Profile' }}
                </router-link>
                <a v-else href="#" data-testid="footer-login-link" @click.prevent="openAuthModal()">
                  {{ currentLang === 'ar' ? 'تسجيل الدخول' : 'Sign In' }}
                </a>
              </li>
              <li><router-link to="/profile?tab=orders">{{ currentLang === 'ar' ? 'طلباتي' : 'My Orders' }}</router-link></li>
              <li><router-link to="/profile?tab=addresses">{{ currentLang === 'ar' ? 'عناوين التوصيل' : 'Delivery Addresses' }}</router-link></li>
            </ul>
          </div>

          <!-- Col 3: Support (Middle Left in RTL) -->
          <div class="footer-col footer-col-support">
            <h4 class="footer-title">{{ currentLang === 'ar' ? 'الدعم' : 'Support' }}</h4>
            <ul class="footer-links">
              <li><router-link to="/contact">{{ currentLang === 'ar' ? 'الدعم الفني' : 'Technical Support' }}</router-link></li>
              <li><router-link to="/page/privacy">{{ currentLang === 'ar' ? 'سياسة الخصوصية والاستخدام' : 'Privacy & Terms' }}</router-link></li>
              <li><router-link to="/page/terms">{{ currentLang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions' }}</router-link></li>
              <li><router-link to="/returns-policy">{{ currentLang === 'ar' ? 'سياسة الإرجاع والاستبدال' : 'Returns & Exchange Policy' }}</router-link></li>
              <li><router-link to="/faq">{{ currentLang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' }}</router-link></li>
            </ul>
          </div>

          <!-- Col 4: Brand Info & Payment (Far Left in RTL) -->
          <div class="footer-col brand-info footer-col-brand">
            <router-link to="/" class="footer-logo">
              <img v-if="settingsReady" :src="footerLogo" :alt="siteName || 'Jabel'" class="footer-brand-logo-img" />
              <span v-else class="sk-shimmer footer-logo-skeleton" aria-hidden="true"></span>
            </router-link>
            <!-- Shimmer until the settings are known: no made-up description or contact details -->
            <div v-if="!settingsReady" class="footer-info-skeleton" role="status" aria-busy="true" data-testid="footer-skeleton">
              <span class="sk-shimmer footer-line-skeleton" style="width: 92%"></span>
              <span class="sk-shimmer footer-line-skeleton" style="width: 70%"></span>
              <span class="sk-shimmer footer-line-skeleton" style="width: 48%; margin-top: 14px"></span>
              <span class="sk-shimmer footer-line-skeleton" style="width: 62%"></span>
              <span class="sk-shimmer footer-line-skeleton" style="width: 80%"></span>
            </div>
            <p v-if="settingsReady && localizedSiteDescription" class="footer-desc">{{ localizedSiteDescription }}</p>

            <div v-if="settingsReady && (sitePhone || siteEmail || localizedSiteAddress || siteHours.length)" class="footer-contact-info">
              <a v-if="sitePhone" :href="`tel:${sitePhone}`" class="footer-contact-link footer-phone-link" dir="ltr">{{ sitePhone }}</a>
              <a v-if="siteEmail" :href="`mailto:${siteEmail}`" class="footer-contact-link">{{ siteEmail }}</a>
              <span v-if="localizedSiteAddress" class="footer-contact-link">{{ localizedSiteAddress }}</span>
              <div v-if="siteHours.length" class="footer-hours" data-testid="footer-hours">
                <span class="footer-hours-title">{{ currentLang === 'ar' ? 'ساعات العمل' : 'Working hours' }}</span>
                <span v-for="line in siteHours" :key="line" class="footer-contact-link">{{ line }}</span>
              </div>
            </div>
            
            <div v-if="settingsReady && visibleSocials.length" class="footer-social-wrap">
              <a v-for="social in visibleSocials" :key="social.key" :href="social.url" target="_blank" rel="noopener noreferrer" class="social-circle-btn" :aria-label="social.label">
                <img v-if="footerSocialIcons[social.key]" :src="footerSocialIcons[social.key]" alt="" class="social-circle-img" />
                <i v-else :class="['fab', social.icon]" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-divider"></div>

        <!-- Bottom Bar: Copyright on Right, Developer Tag on Left -->
        <div class="footer-bottom">
          <p class="copyright" dir="auto">
            {{ currentLang === 'ar' ? '© 2026 Jabel. جميع الحقوق محفوظة' : '© 2026 Jabel. All rights reserved' }}
          </p>
          <p class="developer-tag" dir="auto">
            {{ currentLang === 'ar' ? 'تم التصميم والتطوير بواسطة' : 'Designed & Developed by' }}
            <a href="https://be-kite.com/" target="_blank" rel="noopener noreferrer" class="bekite-link">bekite</a>
          </p>
        </div>
      </div>
    </footer>

    <!-- Add To Cart Toast Notification -->
    <AddToCartModal />
    <OptionPickerModal />

    <!-- Cookie Consent Banner & Modal -->
    <CookieConsent ref="cookieConsent" />
    <PushPrompt />
    <CouponDialog />
    <AppDialog />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { applyBrandColors } from '../utils/brandColors';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import api from '../config/axios';
import { cartState } from '../store/cart';
import { authState, authActions } from '../store/auth';
import AddToCartModal from './AddToCartModal.vue';
import DeliveryAddressDropdown from './DeliveryAddressDropdown.vue';
import OptionPickerModal from './OptionPickerModal.vue';
import AuthModal from './AuthModal.vue';
import CookieConsent from './CookieConsent.vue';
import PushPrompt from './PushPrompt.vue';
import CouponDialog from './CouponDialog.vue';
import AppDialog from './AppDialog.vue';
import WebsiteSearchModal from './WebsiteSearchModal.vue';
import HeaderSearch from './HeaderSearch.vue';
import { isOfferActive } from '../modules/product/composables/useOffers';
import footerFacebookIcon from '../assets/footer-facebook.svg';
import footerYoutubeIcon from '../assets/footer-youtube.svg';
import { settingsService } from '../services/settingsService';
import { productService } from '../modules/product/services/productService';
import { firstSetting, settingsToObject } from '../utils/siteSettings';
import userIcon from '../assets/icons/user.svg';
import heartAddIcon from '../assets/icons/header/heart-add.svg';
import cartIcon from '../assets/icons/header/shopping-cart.svg';
import { NEWS_BAR_KEY, newsBarTexts } from '../domain/site/newsBar.js';
import { currencyLabel } from '../utils/currency';
import { freeShippingThreshold, showFreeShippingBanner } from '../domain/cart/summaryRows.js';
import { setSiteLang, setSiteSettings, siteDescriptionText, siteHoursLines, siteNameText } from '../store/siteIdentity.js';

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const isScrolled = ref(false);
const wishlistCount = computed(() => cartState.wishlist.length);
const categories = ref([]);
// Every category of the store, in the visitor's language, for the footer's Store column.
const footerCategories = computed(() => categories.value
  .map((category) => ({
    id: category.id,
    label: (currentLang.value === 'ar' ? category.name_ar : category.name_en) || category.name_ar || category.name_en || category.name || '',
  }))
  .filter((category) => category.id !== undefined && category.id !== '' && category.label));
const latestCoupon = ref(null);
const THRESHOLD_KEY = 'free_delivery_threshold_seen';
const rememberedThreshold = () => {
  try { return localStorage.getItem(THRESHOLD_KEY); } catch { return null; }
};
// Remembered from the last visit so the bar does not jump in (or out) when the settings arrive.
const freeDeliveryThreshold = ref(rememberedThreshold());
// The announcement bar is the free-shipping offer: with no amount (0 or missing) there is nothing to announce.
const showTopBar = computed(() => showFreeShippingBanner(freeDeliveryThreshold.value));
const freeShippingAnnouncement = computed(() => {
  const threshold = freeShippingThreshold(freeDeliveryThreshold.value);
  return currentLang.value === 'ar'
    ? `شحن مجاني للطلبات فوق ${threshold} ${currencyLabel('ar')} | ضمان شامل على جميع المنتجات`
    : `Free shipping on orders over ${threshold} ${currencyLabel('en')} | Comprehensive warranty on all products`;
});
// The name, description and opening hours come from the dashboard, in the language being shown.
const siteName = siteNameText;
const siteHours = siteHoursLines;
const siteLogo = ref('/brand/jabel-logo.png');
const footerLogo = ref('/brand/jabel-logo-white.png');
const footerSocialIcons = { facebook: footerFacebookIcon, youtube: footerYoutubeIcon };
const sitePhone = ref('');
const siteEmail = ref('');
const siteAddress = ref('');
const socials = reactive({
  facebook: '',
  instagram: '',
  twitter: '',
  x: '',
  x_twitter: '',
  linkedin: '',
  youtube: '',
  snapchat: '',
  tiktok: '',
  whatsapp: ''
});

const formatSocialUrl = (url, platform) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = [...url].filter((char) => {
    const code = char.charCodeAt(0);
    return code > 31 && code !== 127;
  }).join('').trim();
  const schemeProbe = trimmed.replace(/\s+/g, '');
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined' || trimmed === '#' || /^(javascript|data|vbscript|file|blob):/i.test(schemeProbe)) return '';
  
  if (platform === 'whatsapp') {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const cleanPhone = trimmed.replace(/[^0-9]/g, '');
    return cleanPhone ? `https://wa.me/${cleanPhone}` : '';
  }

  const absolute = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed.replace(/^[\\/]+/, '')}`;
  return isPlaceholderSocialUrl(absolute) ? '' : absolute;
};

// Admin placeholders such as "https://x.com/..." or a bare domain are not company accounts.
const isPlaceholderSocialUrl = (url) => {
  try {
    const { pathname } = new URL(url);
    const path = pathname.replace(/\/+$/, '');
    const segments = path.split('/').filter(Boolean).map((segment) => segment.toLowerCase());
    return !path
      || /^\/?[.\u2026]+$/.test(path)
      || /[.\u2026]{3}$/.test(path)
      || segments.some((segment) => ['test', 'example', 'your-handle', 'yourusername'].includes(segment));
  } catch {
    return true;
  }
};

const socialDefinitions = [
  { key: 'facebook', label: 'Facebook', icon: 'fa-facebook-f' },
  { key: 'instagram', label: 'Instagram', icon: 'fa-instagram' },
  { key: 'youtube', label: 'YouTube', icon: 'fa-youtube' },
  { key: 'whatsapp', label: 'WhatsApp', icon: 'fa-whatsapp' },
  { key: 'x_twitter', label: 'X', icon: 'fa-x-twitter' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'fa-linkedin-in' },
  { key: 'snapchat', label: 'Snapchat', icon: 'fa-snapchat-ghost' },
  { key: 'tiktok', label: 'TikTok', icon: 'fa-tiktok' },
];

const visibleSocials = computed(() => socialDefinitions
  .map((social) => ({
    ...social,
    url: formatSocialUrl(socials[social.key], social.key === 'whatsapp' ? 'whatsapp' : social.key),
  }))
  .filter((social) => social.url));

const isMobileMenuOpen = ref(false);
const authModal = ref(null);
const showUserDropdown = ref(false);
const showSearchModal = ref(false);

const isLoggedIn = computed(() => !!authState.token);
const currentUser = computed(() => authState.user);

const cartCount = computed(() => cartState.count);
const currentLang = computed(() => locale.value);

const localizedSiteDescription = siteDescriptionText;

watch(currentLang, setSiteLang, { immediate: true });
// Pages without their own SEO tags still get the site name in the tab, in the visitor's language.
watch(siteNameText, (name) => { document.title = name; }, { immediate: true });

const localizedSiteAddress = computed(() => {
  if (!siteAddress.value) return '';
  if (typeof siteAddress.value === 'object') {
    return siteAddress.value[currentLang.value] || siteAddress.value.ar || siteAddress.value.en || '';
  }
  return siteAddress.value;
});

const isIrisAsset = (value) => {
  if (!value) return false;
  const text = String(value).toLowerCase();
  return ['iris', 't3jcwn2n2rvkxvcva', 'dobvpg934hatbpm5', 'yugdc4mk4vmsf6el'].some((token) => text.includes(token));
};

const resolveAssetUrl = (value, fallback) => {
  const cleaned = [...String(value ?? '')].filter((char) => {
    const code = char.charCodeAt(0);
    return code > 31 && code !== 127;
  }).join('').trim();
  if (!cleaned || /^(javascript|data|vbscript|file|blob):/i.test(cleaned.replace(/\s+/g, ''))) return fallback;
  if (/^\/(?![/\\])/.test(cleaned) || /^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith('//') || cleaned.startsWith('/\\')) return fallback;
  return `${api.defaults.baseURL.replace('/api', '')}/storage/${cleaned.replace(/^[\\/]+/, '')}`;
};

const applySiteSettings = (rawSettings) => {
  const normalized = settingsToObject(rawSettings);
  if (!Object.keys(normalized).length) return;
  applyBrandColors(normalized.primary_color, normalized.secondary_color);

  const socialSetting = normalized.social_links;
  const socialLinks = typeof socialSetting === 'string'
    ? (() => { try { return JSON.parse(socialSetting); } catch { return {}; } })()
    : (socialSetting && typeof socialSetting === 'object' ? socialSetting : {});
  const getVal = (key) => normalized[key];
  const getSocialVal = (key) => getVal(key) || socialLinks[key] || '';

  setSiteSettings(normalized);
  sitePhone.value = getVal('support_phone') || getVal('phone_number') || getVal('site_contact_phone') || '';
  siteEmail.value = getVal('support_email') || getVal('email') || '';
  siteAddress.value = {
    ar: getVal('address_ar') || getVal('address'),
    en: getVal('address_en') || getVal('address'),
  };
  freeDeliveryThreshold.value = getVal('free_delivery_threshold') ?? 0;
  newsBarSetting.value = getVal(NEWS_BAR_KEY) ?? null;

  socials.facebook = getSocialVal('facebook');
  socials.instagram = getSocialVal('instagram');
  socials.twitter = getSocialVal('twitter') || getSocialVal('x_twitter') || getSocialVal('x_link');
  socials.x = getSocialVal('x_twitter') || getSocialVal('twitter') || getSocialVal('x_link');
  socials.x_twitter = getSocialVal('x_twitter') || getSocialVal('twitter') || getSocialVal('x_link');
  socials.linkedin = getSocialVal('linkedin');
  socials.youtube = getSocialVal('youtube');
  socials.snapchat = getSocialVal('snapchat');
  socials.tiktok = getSocialVal('tiktok');
  socials.whatsapp = getSocialVal('whatsapp');

  const logo = getVal('logo');
  const footerLogoSetting = getVal('footer_logo');
  siteLogo.value = logo && !isIrisAsset(logo) ? resolveAssetUrl(logo, '/brand/jabel-logo.png') : siteLogo.value;
  footerLogo.value = footerLogoSetting && !isIrisAsset(footerLogoSetting)
    ? resolveAssetUrl(footerLogoSetting, '/brand/jabel-logo-white.png')
    : footerLogo.value;

  const favicon = getVal('favicon');
  const faviconLink = document.querySelector("link[rel~='icon']");
  if (faviconLink && favicon && !isIrisAsset(favicon)) {
    faviconLink.href = resolveAssetUrl(favicon, '/brand/jabel-icon.png');
  }

};

// News bar under the navbar: the items saved in Settings > News bar, in the language being shown.
const newsBarSetting = ref(null);
// The news bar is shown on the home page only.
const newsItems = computed(() => (route.path === '/' ? newsBarTexts(newsBarSetting.value, currentLang.value) : []));

// The bar stands still while every item fits; as soon as they do not (many or long items, a narrow screen)
// it scrolls without a break, at the same speed whatever the length.
const NEWS_SPEED_PX_PER_SEC = 60;
const newsBarEl = ref(null);
const newsMarquee = ref(false);
const newsDuration = ref(30);
let newsResizeObserver = null;
const measureNewsBar = () => {
  const bar = newsBarEl.value;
  const list = bar?.querySelector('.news-bar-list');
  if (!bar || !list) { newsMarquee.value = false; return; }
  const gutter = window.innerWidth <= 768 ? 0 : 128; // the bar's side padding when it stands still
  const listWidth = list.scrollWidth;
  newsMarquee.value = listWidth > bar.clientWidth - gutter;
  newsDuration.value = Math.max(15, Math.round(listWidth / NEWS_SPEED_PX_PER_SEC));
};
watch([newsItems, currentLang], () => nextTick(measureNewsBar), { flush: 'post' });
watch(newsBarEl, (el) => {
  newsResizeObserver?.disconnect();
  if (el && typeof ResizeObserver !== 'undefined') {
    newsResizeObserver = new ResizeObserver(measureNewsBar);
    newsResizeObserver.observe(el);
  }
  nextTick(measureNewsBar);
}, { flush: 'post' });

// Pages are laid out for a 120px header. The desktop header is taller (navbar + nav row + news bar),
// so --top-bar-h carries the extra height that pages and floating panels must clear.
const desktopHeaderMq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(min-width: 769px)') : null;
const syncHeaderOffset = () => {
  const hasNews = newsItems.value.length > 0;
  const desktop = desktopHeaderMq && desktopHeaderMq.matches;
  // Pages are laid out for a 120px header (40px free-shipping bar + 80px navbar). The bars above and below the
  // navbar are 40px each when shown, and the desktop navbar is 57px taller than the old one.
  const height = (showTopBar.value ? 40 : 0) + (hasNews ? 40 : 0) + (desktop ? 57 : 0);
  document.documentElement.style.setProperty('--top-bar-h', `${height}px`);
};
syncHeaderOffset();
watch([() => newsItems.value.length, showTopBar], syncHeaderOffset);
if (desktopHeaderMq) desktopHeaderMq.addEventListener('change', syncHeaderOffset);
watch(freeDeliveryThreshold, (value) => {
  try { localStorage.setItem(THRESHOLD_KEY, String(freeShippingThreshold(value))); } catch { /* storage unavailable */ }
});

const openAuthModal = () => {
  if (authModal.value && typeof authModal.value.openModal === 'function') {
    authModal.value.openModal();
  }
};

const openAuthModalFromQuery = () => {
  if (route.query.openAuth === 'true' && !isLoggedIn.value) {
    nextTick(openAuthModal);
  }
};

// The router intentionally sends unauthenticated customers to the storefront
// with this query flag. Open the modal here so the redirect never looks like a
// silent or broken navigation.
watch(() => route.query.openAuth, openAuthModalFromQuery, { immediate: true });

const handleAuthModalClose = () => {
  if (route.query.openAuth !== 'true') return;

  const query = { ...route.query };
  delete query.openAuth;
  delete query.redirect;
  router.replace({ path: route.path, query });
};

// Make openAuthModal globally accessible for cart operations
window.openAuthModal = openAuthModal;

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false;
  showUserDropdown.value = false;
});

const closeDropdownOnOutsideClick = (e) => {
  const container = document.querySelector('.user-dropdown-container');
  if (container && !container.contains(e.target)) {
    showUserDropdown.value = false;
  }
};

const handleUserClick = (e) => {
  if (e) e.stopPropagation();
  isMobileMenuOpen.value = false;
  if (isLoggedIn.value) {
    showUserDropdown.value = !showUserDropdown.value;
  } else {
    showUserDropdown.value = false;
    openAuthModal();
  }
};

const handleCartClick = () => {
  isMobileMenuOpen.value = false;
  router.push('/cart');
};

const handleLogout = async () => {
  await authActions.logout();
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Until the real settings are known the logos show a skeleton, never the built-in
// defaults. Fresh cached settings (under a minute old) are applied before the
// first paint, so a reload shows the right logo and colours straight away.
const settingsReady = ref(false);
const cachedLayoutSettings = settingsService.peekSettings();
if (cachedLayoutSettings) {
  applySiteSettings(cachedLayoutSettings);
  settingsReady.value = true;
}

const fetchData = async () => {
  const [settingsResult, offersResult] = await Promise.allSettled([
    settingsService.getSettings(),
    productService.getOffers({ is_active: 1 }),
  ]);

  try {
    const settingsRes = settingsResult.status === 'fulfilled' ? settingsResult.value : null;
    const offers = offersResult.status === 'fulfilled' ? offersResult.value : [];
    
    // Get settings
    const settings = settingsRes;
    applySiteSettings(settings);
    settingsReady.value = true;
    if (Array.isArray(settings)) {
      const getVal = (key) => settings.find(s => s.key === key)?.value;
      const socialSetting = getVal('social_links');
      const socialLinks = typeof socialSetting === 'string'
        ? (() => { try { return JSON.parse(socialSetting); } catch { return {}; } })()
        : (socialSetting && typeof socialSetting === 'object' ? socialSetting : {});
      const getSocialVal = (key) => getVal(key) || socialLinks[key] || '';
      
      const isIrisAsset = (val) => {
        if (!val) return false;
        const str = String(val).toLowerCase();
        return (
          str.includes('iris') ||
          str.includes('t3jcwn2n2rvkxvcva') ||
          str.includes('dobvpg934hatbpm5') ||
          str.includes('yugdc4mk4vmsf6el')
        );
      };

      freeDeliveryThreshold.value = getVal('free_delivery_threshold') ?? 0;
      
      sitePhone.value = getVal('support_phone') || getVal('phone_number') || getVal('site_contact_phone') || '';
      siteEmail.value = getVal('support_email') || getVal('email') || '';
      siteAddress.value = {
        ar: getVal('address_ar') || getVal('address'),
        en: getVal('address_en') || getVal('address')
      };

      socials.facebook = getSocialVal('facebook');
      socials.instagram = getSocialVal('instagram');
      socials.twitter = getSocialVal('twitter') || getSocialVal('x_twitter') || getSocialVal('x_link');
      socials.x = getSocialVal('x_twitter') || getSocialVal('twitter') || getSocialVal('x_link');
      socials.x_twitter = getSocialVal('x_twitter') || getSocialVal('twitter') || getSocialVal('x_link');
      socials.linkedin = getSocialVal('linkedin');
      socials.youtube = getSocialVal('youtube');
      socials.snapchat = getSocialVal('snapchat');
      socials.tiktok = getSocialVal('tiktok');
      socials.whatsapp = getSocialVal('whatsapp');

      const faviconVal = getVal('favicon');
      const logoVal = getVal('logo');
      const footerLogoVal = getVal('footer_logo');
      const resolveAssetUrl = (value, fallback) => {
        const cleaned = [...String(value ?? '')].filter((char) => {
          const code = char.charCodeAt(0);
          return code > 31 && code !== 127;
        }).join('').trim();
        if (!cleaned || /^(javascript|data|vbscript|file|blob):/i.test(cleaned.replace(/\s+/g, ''))) return fallback;
        if (/^\/(?![/\\])/.test(cleaned) || /^https?:\/\//i.test(cleaned)) return cleaned;
        if (cleaned.startsWith('//') || cleaned.startsWith('/\\')) return fallback;
        return `${api.defaults.baseURL.replace('/api', '')}/storage/${cleaned.replace(/^[\\/]+/, '')}`;
      };
      
      if (logoVal && !isIrisAsset(logoVal)) {
        siteLogo.value = resolveAssetUrl(logoVal, '/brand/jabel-logo.png');
      } else {
        siteLogo.value = '/brand/jabel-logo.png';
      }

      if (footerLogoVal && !isIrisAsset(footerLogoVal)) {
        footerLogo.value = resolveAssetUrl(footerLogoVal, '/brand/jabel-logo-white.png');
      } else {
        footerLogo.value = '/brand/jabel-logo-white.png';
      }

      // Update Favicon (Jabel favicon, ignore legacy Iris)
      const finalFavicon = (faviconVal && !isIrisAsset(faviconVal))
        ? resolveAssetUrl(faviconVal, '/brand/jabel-icon.png')
        : '/brand/jabel-icon.png';

      const faviconLink = document.querySelector("link[rel~='icon']");
      if (faviconLink) {
        faviconLink.href = finalFavicon;
      }
    } else if (settings && typeof settings === 'object') {
      // The Site API returns settings as a flat object with a nested social_links map.
      const normalizedSettings = settingsToObject(settings);
      const pick = (...keys) => firstSetting(normalizedSettings, ...keys) || '';
      freeDeliveryThreshold.value = pick('free_delivery_threshold') ?? 0;
      sitePhone.value = pick('support_phone', 'phone_number', 'site_contact_phone');
      siteEmail.value = pick('support_email', 'email');
      siteAddress.value = {
        ar: pick('address_ar', 'address'),
        en: pick('address_en', 'address'),
      };
      socials.facebook = pick('facebook');
      socials.instagram = pick('instagram');
      socials.twitter = pick('twitter', 'x_twitter', 'x_link');
      socials.x = pick('x_twitter', 'twitter', 'x_link');
      socials.x_twitter = pick('x_twitter', 'twitter', 'x_link');
      socials.linkedin = pick('linkedin');
      socials.youtube = pick('youtube');
      socials.snapchat = pick('snapchat');
      socials.tiktok = pick('tiktok');
      // Only the WhatsApp link set in the dashboard: clearing it hides the icon (no fallback to the support phone).
      socials.whatsapp = pick('whatsapp');
    }

    // Get the latest active offer from the supported Site API.
    const validOffers = (Array.isArray(offers) ? offers : []).filter(isOfferActive);

    latestCoupon.value = validOffers.length > 0 ? validOffers[0] : null;
  } catch (error) {
    console.warn('Top bar promo data unavailable from API, using clean default state:', error?.message);
  } finally {
    // Even when the API is down the header must not stay a skeleton: fall back to the built-in logo.
    settingsReady.value = true;
  }
};

const fetchCategories = async () => {
  try {
    const list = await productService.getCategories({ is_active: 1 });
    categories.value = Array.isArray(list) ? list : [];
  } catch (err) {
    console.error('Failed to fetch categories from API:', err);
    categories.value = [];
  }
};

const toggleLanguage = () => {
  const newLang = locale.value === 'ar' ? 'en' : 'ar';
  locale.value = newLang;
  localStorage.setItem('lang', newLang);
  document.documentElement.lang = newLang;
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  location.reload();
};

onMounted(() => {
  fetchData();
  fetchCategories();
  cartState.syncWithToken();
  authActions.init();
  openAuthModalFromQuery();
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  newsResizeObserver?.disconnect();
  if (desktopHeaderMq) desktopHeaderMq.removeEventListener('change', syncHeaderOffset);
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeDropdownOnOutsideClick);
});
</script>

<style scoped>
.website-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  overflow-x: hidden;
}

.jabel-text-logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.jabel-text-logo .brand-name {
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #000000;
}

.jabel-text-logo .brand-sub {
  font-size: 0.58rem;
  letter-spacing: 2px;
  color: #6b7280;
  font-weight: 700;
  margin-top: 3px;
}

.footer-text-logo .brand-name {
  color: #ffffff !important;
}

.footer-text-logo .brand-sub {
  color: #9ca3af !important;
}

.lang-pill-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #111827;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.lang-pill-btn:hover {
  border-color: #111827;
  background: #f9fafb;
}

.nav-v-divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 0.35rem;
}

.cart-badge-black {
  background: var(--color-brand-primary, #000000) !important;
  color: #ffffff !important;
}

.footer-payment-badges {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pay-tag {
  background: #1f2937;
  color: #f3f4f6;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.website-layout.lang-en {
  direction: ltr;
  text-align: left;
}

.website-layout.lang-ar {
  direction: rtl;
  text-align: right;
}

.website-layout.lang-en .main-content {
  direction: ltr;
  text-align: left;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Pages leave room for the 40px announcement bar; when it is hidden they move up by that much. */
  margin-top: calc(var(--top-bar-h, 40px) - 40px);
}

@media (max-width: 1024px) {
  .main-content {
    padding-top: 120px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 100px;
  }
}

.delivery-promo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.icon-3d {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  color: #fbbf24; /* Golden yellow */
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Top Bar */
/* announcement-bar */
.top-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 64px;
  width: 100%;
  height: 40px;
  background: var(--color-brand-primary, #000000);
  border-radius: 0px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.top-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1440px;
}

.announcement-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #FFFFFF;
  text-align: center;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .top-bar {
    padding: 0px 16px;
    height: 40px;
  }
  .announcement-text {
    font-size: 11px;
    white-space: normal;
  }
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 64px !important;
  padding-right: 64px !important;
  box-sizing: border-box;
}

/* Fixed Header */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}



/* Navbar */
.navbar {
  box-sizing: border-box;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px 64px !important;
}

.header-main-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  height: 80px;
}

.header-navigation-row {
  display: flex;
  align-items: center;
  height: 40px;
}


/* Search field */
.search-field {
  box-sizing: border-box;
  flex: 1 0 0;
  min-width: 0;
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: text;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
.search-field-placeholder {
  font-size: 14px;
  color: #94A3B8;
}

/* News bar */
.news-bar {
  box-sizing: border-box;
  background: #0086B3;
  color: #FFFFFF;
  height: 40px;
  padding: 0 64px;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 14px;
  white-space: nowrap;
  transition: height 0.3s ease, opacity 0.2s ease;
}
/* Hidden once the page is scrolled; it comes back at the top (banner). */
.news-bar.news-bar-hidden {
  height: 0;
  opacity: 0;
  pointer-events: none;
}
.news-bar-track {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100%;
}
.news-bar-list {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-shrink: 0;
}
.news-bar-list:nth-child(2) { display: none; }
.news-bar-list li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.news-bar-list li::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  margin-inline: 8px 0;
}
/* Too many items to fit: two copies side by side, shifted by exactly one copy, so the loop has no jump. */
.news-bar-marquee { padding: 0; }
.news-bar-marquee .news-bar-track {
  width: max-content;
  min-width: 0;
  flex-shrink: 0;
  gap: 0;
  will-change: transform;
  animation: news-scroll var(--news-duration, 30s) linear infinite;
}
.news-bar-marquee .news-bar-list:nth-child(2) { display: flex; }
.news-bar-marquee .news-bar-list { padding-inline-end: 24px; }
.news-bar-marquee:hover .news-bar-track { animation-play-state: paused; }
@keyframes news-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(50%); }
}
.lang-en .news-bar-marquee .news-bar-track { animation-name: news-scroll-ltr; }
@keyframes news-scroll-ltr {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .news-bar-track { animation: none !important; }
  .news-bar-marquee { overflow-x: auto; scrollbar-width: none; }
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 160px;
  height: 80px;
  flex-shrink: 0;
}

.logo-icon {
  height: 80px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.lang-en .logo-icon {
  justify-content: flex-start;
}

.site-logo-img {
  height: 80px;
  width: 160px;
  object-fit: contain;
}

/* Logo placeholders while the site settings load (same box as the logos). */
.logo-skeleton {
  width: 160px;
  height: 80px;
  border-radius: 6px;
}

.footer-info-skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  max-width: 320px;
}
.footer-line-skeleton,
.footer-logo-skeleton {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.08) 75%);
  background-size: 200% 100%;
}
.footer-line-skeleton {
  height: 14px;
  border-radius: 6px;
}
.footer-logo-skeleton {
  width: 160px;
  height: 80px;
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.08) 75%);
  background-size: 200% 100%;
}

/* Center Navigation Links */
.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 32px;
  height: 32px;
  margin-inline-end: auto;
}

.nav-links a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  gap: 6px;
  height: 32px;
  text-decoration: none;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  transition: color 0.2s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.active {
  color: #000000;
  font-weight: 600;
}

.nav-links a .active-underline {
  width: 100%;
  height: 2px;
  background: transparent;
  border-radius: 0px;
  transition: background-color 0.2s ease;
}

.nav-links a.active .active-underline,
.nav-links a:hover .active-underline {
  background: var(--color-brand-primary, #000000);
}

/* Left Header Cluster */
.header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  height: 26px;
  direction: ltr; /* Keeps [Wishlist] [User] [Cart] [English] */
  flex-shrink: 0;
}

.nav-heart-icon, .nav-cart-icon {
  position: absolute;
  display: block;
  max-width: none;
}
.nav-heart-icon { inset: 9.38% 5.21% 9.37% 5.21%; width: 89.58%; height: 81.25%; }
.nav-cart-icon { inset: 3.13% 5.68% 3.59% 7.21%; width: 87.11%; height: 93.28%; }
.wishlist-link { position: relative; }
.wishlist-count-badge {
  position: absolute;
  top: -8px;
  left: 11px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  box-sizing: border-box;
  border-radius: 9999px;
  background: var(--color-brand-primary, #000000);
  color: #FFFFFF;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  pointer-events: none;
}

/* Language Toggle Button */
.lang-toggle-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  width: 64px;
  height: 26px;
  background: transparent;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.lang-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Line Divider */
.nav-divider-line {
  box-sizing: border-box;
  width: 1px;
  height: 20px;
  background: var(--color-brand-primary, #000000);
  display: inline-block;
  flex-shrink: 0;
}

/* Nav Icons Group */
.header-nav-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  height: 22px;
}

/* English only: the language button goes to the far right, after the icons: [Wishlist] [Profile] [Cart] [العربية]. */
html:not([dir="rtl"]) .header-left .header-nav-icons { order: 1; }
html:not([dir="rtl"]) .header-left .lang-toggle-btn { order: 2; }

/* Arabic only: [English] [Cart] [Profile] [Wishlist] (English keeps [Language] [Wishlist] [Profile] [Cart]). */
html[dir="rtl"] .header-nav-icons .cart-link { order: 1; }
html[dir="rtl"] .header-nav-icons .user-dropdown-container { order: 2; }
html[dir="rtl"] .header-nav-icons .wishlist-link { order: 3; }

.header-icon-link,
/* Profile icon from Figma: the 24px "user" icon's drawing, inset the same way inside a 22px box. */
.nav-user-icon {
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.nav-user-icon img {
  position: absolute;
  display: block;
  max-width: none;
  inset: 5.21% 9.37%;
  width: 81.26%;
  height: 89.58%;
}

.header-icon-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: #000000;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.header-icon-link:hover,
.header-icon-btn:hover {
  opacity: 0.7;
}

/* Cart Wrapper & Badge */
.cart-wrapper {
  position: relative;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
}

.cart-badge-black {
  position: absolute;
  top: -8px;
  left: 11px;
  width: 16px;
  height: 16px;
  background: var(--color-brand-primary, #000000);
  border-radius: 9999px;
  color: #FFFFFF;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .container,
  .main-footer .container {
    padding-left: 32px !important;
    padding-right: 32px !important;
  }
  .nav-container {
    padding: 8px 32px !important;
  }
  .nav-links {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .container,
  .main-footer .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .navbar {
    height: 60px;
  }
  .nav-container {
    height: 60px;
    padding: 0 16px !important;
    justify-content: center;
  }
  .header-main-row {
    height: 60px;
    justify-content: space-between;
    gap: 8px;
  }
  .logo {
    width: auto;
    height: 28px;
  }
  .news-bar { height: 40px; }
  .news-bar.news-bar-hidden { height: 0; }
  .logo-icon {
    height: 28px;
    width: auto;
  }
  .site-logo-img {
    height: 24px;
    width: auto;
    max-width: 120px;
  }
  .logo-skeleton {
    width: 90px;
    height: 24px;
  }
}

/* Icons */
.nav-icons {
  display: flex;
  gap: 5px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
}

.cart-btn .badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #fff;
}

.icon-btn:hover {
  background: #f9fafb;
  color: #000000;
}

/* User Dropdown */
.user-dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.12);
  margin-top: 10px;
  z-index: 1010;
  padding: 10px;
  border: 1px solid #f3f4f6;
}

@media (max-width: 768px) {
  .mobile-user-dropdown {
    position: fixed;
    top: 70px;
    left: 15px;
    right: 15px;
    width: calc(100vw - 30px);
    max-width: 320px;
    transform: none !important;
    z-index: 999999 !important;
  }
}

.lang-ar .user-dropdown-menu {
  direction: rtl;
}

.lang-en .user-dropdown-menu {
  direction: ltr;
}

.user-dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 1px solid #f3f4f6;
  border-top: 1px solid #f3f4f6;
}

.user-dropdown-header {
  padding: 10px;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 5px;
}

.lang-ar .user-dropdown-header {
  text-align: right;
}

.lang-en .user-dropdown-header {
  text-align: left;
}

.user-name {
  font-weight: 800;
  font-size: 16px;
  color: #111827;
  margin: 0 0 5px;
}

.user-phone {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}

.user-dropdown-body {
  display: flex;
  flex-direction: column;
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  color: #374151;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  transition: background 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}

.lang-ar .user-dropdown-item {
  text-align: right;
}

.lang-en .user-dropdown-item {
  text-align: left;
}

.user-dropdown-item:hover {
  background: #f9fafb;
}

.user-dropdown-item svg {
  color: #6b7280;
}

.user-dropdown-item.logout {
  color: #dc2626;
  margin-top: 5px;
}

.user-dropdown-item.logout:hover {
  background: #fef2f2;
}

.user-dropdown-item.logout svg {
  color: #dc2626;
}

.icon-btn .badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  z-index: 2;
}

/* Search Modal */
.search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.search-modal-content {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.search-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.search-close-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #f3f4f6;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.search-close-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.search-input-wrapper {
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.search-input-wrapper input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: 0.2s;
}

.search-input-wrapper input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(135, 50, 96, 0.1);
}

.search-submit-btn {
  width: 48px;
  border: none;
  border-radius: 10px;
  background: var(--color-brand-primary, #000000);
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-submit-btn:hover {
  background: var(--color-button-hover);
}

.search-results {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid transparent;
}

.search-result-item:hover {
  background: #f9fafb;
  border-color: #f3f4f6;
}

.search-result-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
}

.search-result-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-result-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.search-result-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: #000000;
  margin: 0;
}

.search-no-results {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.search-loading {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top-color: #000000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.mobile-menu-separator{
  padding-top: 10px;
}
/* WhatsApp */
.whatsapp-float {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #25d366;
  color: #fff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
  z-index: 2000;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (max-width: 768px) {
  .whatsapp-float {
    width: 48px;
    height: 48px;
    bottom: 20px;
    right: 15px;
  }
  .whatsapp-float svg {
    width: 20px;
    height: 20px;
  }
}

html[dir="rtl"] .whatsapp-float {
  right: auto;
  left: 25px;
}

@media (max-width: 768px) {
  html[dir="rtl"] .whatsapp-float {
    right: auto;
    left: 15px;
  }
}

.whatsapp-float:hover {
  transform: scale(1.1) rotate(5deg);
}

.content {
  flex: 1;
}

/* Main Footer Styles - Figma footer (node 2:473) */
.main-footer {
  background: var(--color-brand-primary, #000000);
  color: #ffffff;
  padding: 40px 0;
  margin-top: auto;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}

.main-footer .container {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 64px !important;
  padding-right: 64px !important;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 32px;
}

.footer-col {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.lang-ar .footer-grid,
[dir="rtl"] .footer-grid {
  direction: rtl;
  text-align: right;
}

.lang-en .footer-grid,
[dir="ltr"] .footer-grid {
  direction: ltr;
  text-align: left;
}

/* Col 1, 2, 3: Store, Account, Support */
.footer-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: normal;
  white-space: nowrap;
}

.footer-title::after {
  display: none !important;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.footer-links li {
  margin: 0;
  padding: 0;
}

.footer-links a {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  color: #ffffff;
  opacity: 0.7;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  display: block;
  line-height: normal;
  white-space: nowrap;
  /* Hover turns the word bold without changing its width (so nothing around it jumps):
     a stroke in the text colour thickens the letters, animated together with the colour and a small nudge. */
  -webkit-text-stroke: 0.9px transparent;
  transition: opacity 0.25s ease, color 0.25s ease, -webkit-text-stroke-color 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.footer-links a:hover,
.footer-links a:focus-visible {
  color: #ffffff;
  opacity: 1;
  -webkit-text-stroke-color: #ffffff;
  transform: translateX(4px);
}
.footer-links a:dir(rtl):hover { transform: translateX(-4px); }

/* Col 4: Brand Column */
.footer-col-brand {
  width: 320px;
  max-width: 100%;
  align-items: flex-start;
  text-align: start;
}

.footer-logo {
  display: block;
  width: 160px;
  height: 80px;
  text-decoration: none;
}

.footer-brand-logo-img {
  width: 160px;
  height: 80px;
  transform: rotate(0deg);
  opacity: 1;
  object-fit: contain;
  object-position: center;
  display: block;
}

.footer-desc {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  color: #ffffff;
  opacity: 0.7;
  line-height: normal;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  width: 100%;
  text-align: start;
}

.footer-contact-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.footer-contact-link {
  color: #ffffff;
  opacity: 0.7;
  font-size: 14px;
  line-height: normal;
  text-decoration: none;
}

/* Phone keeps its "+" in front of the digits and sits on the start side (right in Arabic) */
.footer-phone-link {
  direction: ltr;
  unicode-bidi: isolate;
  text-align: start;
}

a.footer-contact-link {
  -webkit-text-stroke: 0.9px transparent;
  transition: opacity 0.25s ease, -webkit-text-stroke-color 0.25s ease;
}
a.footer-contact-link:hover {
  opacity: 1;
  -webkit-text-stroke-color: #ffffff;
}
@media (prefers-reduced-motion: reduce) {
  .footer-links a, a.footer-contact-link { transition: none; }
  .footer-links a:hover { transform: none !important; }
}

/* Opening hours: a small heading, then one line per schedule */
.footer-hours {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.footer-hours-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

/* Social icons: 40px glass circles */
.footer-social-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}

.social-circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-circle-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.social-circle-img {
  display: block;
  width: 20px;
  height: 16px;
}

/* Divider Line */
.footer-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.0784314);
  margin: 0;
  flex-shrink: 0;
}

/* Bottom Bar */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  color: #ffffff;
  padding: 0;
  border-top: none;
  line-height: normal;
  white-space: nowrap;
}

.copyright {
  margin: 0;
  color: #ffffff;
  opacity: 0.5;
  font-size: 14px;
  font-weight: 400;
}

.developer-tag {
  margin: 0;
  color: #ffffff;
  opacity: 0.5;
  font-size: 14px;
  font-weight: 400;
}

.bekite-link {
  color: inherit;
  text-decoration: none;
}

.bekite-link:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  .footer-col {
    flex: 1 1 auto;
  }
  .footer-col-brand {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
/* Responsive Adjustments */
.mobile-only {
  display: none !important;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: flex !important;
  }

  .nav-container {
    justify-content: space-between !important;
    padding: 0 15px !important;
  }

  .logo {
    order: 0;
    gap: 8px;
  }

  .logo-text {
    font-size: 18px !important;
  }

  .logo-icon {
    width: auto;
    height: 40px;
  }

  .mobile-order-2 {
    order: 2 !important;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .nav-icons {
    gap: 5px;
  }

  /* Mobile Top Bar */
  .top-bar-content {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 0 !important;
    width: 100% !important;
    padding: 0 8px !important;
  }
  .top-bar-content::-webkit-scrollbar { display: none; }

  .top-bar-item {
    font-size: 0.68rem !important;
    white-space: nowrap;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px !important;
  }

  .top-bar-item svg {
    width: 12px !important;
    height: 12px !important;
  }

  .sparkle {
    font-size: 0.75rem !important;
  }

  .top-bar-divider {
    display: block !important;
    height: 10px !important;
    width: 1px !important;
    background: rgba(255,255,255,0.2) !important;
    margin: 0 10px !important;
  }

  @media (max-width: 360px) {
    .top-bar-item {
      font-size: 0.62rem !important;
    }
    .top-bar-item svg {
      width: 11px !important;
      height: 11px !important;
    }
    .top-bar-divider {
      margin: 0 6px !important;
    }
  }

  .coupon-info {
    display: flex; 
  }
  
  .logo-text {
    font-size: 16px !important;
  }


  /* Mobile Menu Styles */
  .mobile-menu-overlay {
    position: fixed;
    top: 100px; /* Adjusted to be right below the navbar */
    left: 0;
    width: 100%;
    height: calc(100vh - 100px);
    background: #fff;
    z-index: 9999999;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .mobile-menu-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .mobile-menu-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 20px;
  }

  .mobile-link {
    text-decoration: none;
    color: #111827;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 15px 20px;
    border-radius: 12px;
    transition: all 0.2s;
    border-bottom: 1px solid #f9fafb;
  }

  .mobile-link.active {
    background: var(--color-brand-primary, #000000);
    color: #fff;
  }

  .mobile-menu-footer {
    margin-top: 30px;
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #f3f4f6;
  }

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #111827;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    background: none;
    border: none;
  }

  .footer-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 32px;
  }

  .footer-col.brand-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-title::after {
    right: 0;
    transform: none;
  }

  .social-links {
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
  }

  .lang-en .social-links {
    justify-content: flex-start;
  }

  .social-links a {
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
  }

  .contact-list li {
    justify-content: flex-start;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  /* Transitions */
  .slide-down-enter-active, .slide-down-leave-active {
    transition: all 0.3s ease-out;
  }
  .slide-down-enter-from, .slide-down-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
}

.social-section {
  margin-top: 10px;
}

.social-title {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 15px;
  font-weight: 600;
}

.contact-icon-wrapper {
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon-wrapper i {
  margin-top: 0 !important;
  font-size: 14px !important;
}

.contact-list a {
  color: inherit;
  text-decoration: none;
}

</style>
