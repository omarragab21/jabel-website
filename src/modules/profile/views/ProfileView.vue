<template>
  <div class="profile-page" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container main-container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumb-flow" :aria-label="$t('common.breadcrumb')">
        <router-link to="/" class="crumb-link">{{ locale === 'ar' ? 'الرئيسية' : 'Home' }}</router-link>
        <span class="crumb-separator" aria-hidden="true">
          <svg class="crumb-arrow-svg" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.59736 0.676858C3.51667 0.737802 3.2758 0.919755 3.13694 1.02812C2.85884 1.24516 2.48929 1.54171 2.12085 1.86161C1.75054 2.18313 1.38989 2.52089 1.12477 2.82095C0.991829 2.9714 0.890812 3.10357 0.825063 3.21264C0.763226 3.31521 0.750367 3.3758 0.750367 3.3758C0.750367 3.3758 0.763227 3.43462 0.825061 3.53719C0.890809 3.64625 0.991825 3.77842 1.12477 3.92888C1.38989 4.22893 1.75054 4.56669 2.12085 4.88821C2.4893 5.20811 2.85885 5.50467 3.13696 5.7217C3.27582 5.83007 3.51635 6.01177 3.59704 6.07271C3.7638 6.19553 3.79977 6.43053 3.67695 6.59729C3.55413 6.76405 3.31938 6.79968 3.15262 6.67686L3.15135 6.6759C3.06672 6.61198 2.81722 6.42353 2.67554 6.31296C2.39115 6.09103 2.0107 5.78581 1.62914 5.45453C1.24946 5.12487 0.860106 4.76204 0.562729 4.42548C0.41442 4.25763 0.281061 4.08748 0.182748 3.9244C0.0906402 3.77161 0 3.57816 0 3.37491C0 3.17165 0.0906433 2.97821 0.182751 2.82542C0.281064 2.66234 0.414422 2.49219 0.56273 2.32434C0.860105 1.98779 1.24945 1.62495 1.62914 1.29529C2.01068 0.964013 2.39113 0.658798 2.67552 0.436859C2.8173 0.326216 3.06681 0.137753 3.15127 0.0739647L3.15236 0.0731398C3.31912 -0.0496775 3.55411 -0.0142297 3.67692 0.152531C3.79974 0.319286 3.7641 0.554038 3.59736 0.676858Z" fill="#000000"/>
          </svg>
        </span>
        <router-link v-if="currentTab !== 'overview'" to="/profile" class="crumb-link">{{ locale === 'ar' ? 'الملف الشخصي' : 'Profile' }}</router-link>
        <span v-else class="crumb-current">{{ locale === 'ar' ? 'الملف الشخصي' : 'Profile' }}</span>
        <template v-if="currentTab !== 'overview'">
          <span class="crumb-separator" aria-hidden="true">
            <svg class="crumb-arrow-svg" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.59736 0.676858C3.51667 0.737802 3.2758 0.919755 3.13694 1.02812C2.85884 1.24516 2.48929 1.54171 2.12085 1.86161C1.75054 2.18313 1.38989 2.52089 1.12477 2.82095C0.991829 2.9714 0.890812 3.10357 0.825063 3.21264C0.763226 3.31521 0.750367 3.3758 0.750367 3.3758C0.750367 3.3758 0.763227 3.43462 0.825061 3.53719C0.890809 3.64625 0.991825 3.77842 1.12477 3.92888C1.38989 4.22893 1.75054 4.56669 2.12085 4.88821C2.4893 5.20811 2.85885 5.50467 3.13696 5.7217C3.27582 5.83007 3.51635 6.01177 3.59704 6.07271C3.7638 6.19553 3.79977 6.43053 3.67695 6.59729C3.55413 6.76405 3.31938 6.79968 3.15262 6.67686L3.15135 6.6759C3.06672 6.61198 2.81722 6.42353 2.67554 6.31296C2.39115 6.09103 2.0107 5.78581 1.62914 5.45453C1.24946 5.12487 0.860106 4.76204 0.562729 4.42548C0.41442 4.25763 0.281061 4.08748 0.182748 3.9244C0.0906402 3.77161 0 3.57816 0 3.37491C0 3.17165 0.0906433 2.97821 0.182751 2.82542C0.281064 2.66234 0.414422 2.49219 0.56273 2.32434C0.860105 1.98779 1.24945 1.62495 1.62914 1.29529C2.01068 0.964013 2.39113 0.658798 2.67552 0.436859C2.8173 0.326216 3.06681 0.137753 3.15127 0.0739647L3.15236 0.0731398C3.31912 -0.0496775 3.55411 -0.0142297 3.67692 0.152531C3.79974 0.319286 3.7641 0.554038 3.59736 0.676858Z" fill="#000000"/>
            </svg>
          </span>
          <span class="crumb-current">{{ currentTabBreadcrumbTitle }}</span>
        </template>
      </nav>

      <!-- Mobile Horizontal Scroll Navigation Tabs -->
      <div class="profile-mobile-tabs-container">
        <div class="profile-mobile-tabs">
          <router-link to="/profile" class="mobile-tab-btn" :class="{ active: currentTab === 'overview' }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 14l3.5-3.5"/>
              <path d="M20.3 18c.4-1.2.7-2.6.7-4a9 9 0 0 0-18 0c0 1.4.3 2.8.7 4"/>
            </svg>
            <span>{{ t('profile.overview') || 'نظرة عامة' }}</span>
          </router-link>
          <router-link to="/profile?tab=orders" class="mobile-tab-btn" :class="{ active: currentTab === 'orders' }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>{{ t('profile.orders') || 'طلباتي' }}</span>
          </router-link>
          <router-link to="/profile?tab=addresses" class="mobile-tab-btn" :class="{ active: currentTab === 'addresses' }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{{ t('profile.addresses') || 'العناوين' }}</span>
          </router-link>
          <router-link to="/profile?tab=notifications" class="mobile-tab-btn" :class="{ active: currentTab === 'notifications' }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span>{{ t('profile.notifications') || 'الإشعارات' }}</span>
            <span class="mobile-tab-badge danger" v-if="notifCount > 0">{{ notifCount }}</span>
          </router-link>
          <router-link to="/profile?tab=returns" class="mobile-tab-btn" :class="{ active: currentTab === 'returns' }">
            <i class="fas fa-rotate-left" aria-hidden="true"></i>
            <span>{{ t('profile.returns') || 'المرتجعات' }}</span>
          </router-link>
          <router-link to="/profile?tab=info" class="mobile-tab-btn" :class="{ active: currentTab === 'info' }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{{ t('profile.personal_info') || 'الملف الشخصي' }}</span>
          </router-link>
        </div>
      </div>

      <div class="main-content-layout">
        <!-- Sidebar Filter Panel (on the right in RTL) -->
        <aside class="sidebar-filter-panel">
          <nav class="sidebar-menu">
            <router-link
              v-for="item in PROFILE_SIDEBAR_ITEMS"
              :key="item.tab"
              :to="item.to"
              class="menu-item"
              :class="[`menu-item-${item.tab}`, { active: currentTab === item.tab }]"
            >
              <span class="menu-icon-frame">
                <span class="menu-icon" :style="{ '--icon-url': `url(${JSON.stringify(item.icon)})`, '--icon-inset': item.inset }" aria-hidden="true"></span>
              </span>
              <span class="menu-text">
                {{ t(item.labelKey) || item.fallback }}
                <span class="sidebar-badge" v-if="item.badge && notifCount > 0">{{ notifCount }}</span>
              </span>
            </router-link>

            <div class="sidebar-divider"></div>

            <button type="button" class="menu-item menu-item-logout" @click="handleLogout">
              <span class="menu-icon-frame">
                <span class="menu-icon" :style="{ '--icon-url': `url(${JSON.stringify(PROFILE_LOGOUT_ITEM.icon)})`, '--icon-inset': PROFILE_LOGOUT_ITEM.inset }" aria-hidden="true"></span>
              </span>
              <span class="menu-text">{{ t(PROFILE_LOGOUT_ITEM.labelKey) || PROFILE_LOGOUT_ITEM.fallback }}</span>
            </button>
          </nav>
        </aside>

        <!-- Main Left Content Area -->
        <main class="left-content-area">
          <!-- Overview Tab -->
          <div v-if="currentTab === 'overview'" class="overview-content">
            <!-- stats-row -->
            <div class="stats-row">
              <!-- stat-card 1: الطلبات النشطة (on right in RTL) -->
              <div class="stat-card" @click="router.push('/profile?tab=orders')" style="cursor: pointer;">
                <div class="stat-txt">
                  <span class="stat-label">{{ t('profile.total_orders') || 'إجمالي الطلبات' }}</span>
                  <span class="stat-val">{{ totalOrdersCountText }}</span>
                </div>
                <div class="icon-container">
                  <svg width="28" height="28" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9998 13.4999C11.5027 13.4999 11.0998 13.9029 11.0998 14.3999C11.0998 14.897 11.5027 15.2999 11.9998 15.2999L16.7998 15.2999C17.2968 15.2999 17.6998 14.897 17.6998 14.3999C17.6998 13.9029 17.2968 13.4999 16.7998 13.4999L11.9998 13.4999Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.65 1.49994L10.1501 1.49994C9.02919 1.49992 8.1157 1.49991 7.37187 1.58079C6.59514 1.66525 5.92063 1.84454 5.30387 2.25571C4.68712 2.66688 4.26219 3.22055 3.88548 3.90505C3.52473 4.56056 3.1734 5.40377 2.7423 6.43846L1.58001 9.22797C1.5321 9.33338 1.50393 9.44966 1.50021 9.57209C1.49993 9.58121 1.49979 9.59031 1.49979 9.59941L1.49979 16.1845C1.49977 18.5492 1.49975 20.419 1.70367 21.8816C1.9137 23.388 2.35533 24.5947 3.33716 25.5415C4.31441 26.4838 5.55231 26.9037 7.09862 27.1042C8.6088 27.3 10.5422 27.3 13.0004 27.2999L15.7992 27.2999C18.2573 27.3 20.1908 27.3 21.7009 27.1042C23.2473 26.9037 24.4852 26.4838 25.4624 25.5415C26.4442 24.5947 26.8859 23.388 27.0959 21.8816C27.2998 20.419 27.2998 18.5493 27.2998 16.1845L27.2998 9.62858C27.3033 9.51915 27.2869 9.40752 27.2482 9.29892C27.2422 9.28204 27.2357 9.26539 27.2288 9.249L26.0577 6.43838C25.6266 5.40378 25.2753 4.56051 24.9146 3.90505C24.5379 3.22055 24.1129 2.66688 23.4962 2.25571C22.8794 1.84454 22.2049 1.66525 21.4282 1.58079C20.6843 1.49991 19.7709 1.49992 18.65 1.49994ZM10.2 3.29994L13.4998 3.29994L13.4998 8.69994L3.75002 8.69994L4.38464 7.17686C4.8396 6.08495 5.15437 5.3327 5.46244 4.77291C5.7599 4.23241 6.01216 3.94685 6.30233 3.7534C6.59251 3.55995 6.95312 3.43694 7.56645 3.37024C8.20167 3.30117 9.01711 3.29994 10.2 3.29994ZM15.2998 3.29994L15.2998 8.69994L25.05 8.69994L24.4154 7.17686C23.9604 6.08495 23.6457 5.3327 23.3376 4.77292C23.0401 4.23241 22.7879 3.94685 22.4977 3.7534C22.2075 3.55995 21.8469 3.43694 21.2336 3.37024C20.5984 3.30117 19.7829 3.29994 18.6 3.29994L15.2998 3.29994ZM3.29979 10.4999L25.4998 10.4999L25.4998 16.1142C25.4998 18.5649 25.4977 20.3091 25.3131 21.6331C25.1327 22.9276 24.7932 23.6862 24.213 24.2458C23.6281 24.8097 22.8279 25.143 21.4695 25.3191C20.0885 25.4982 18.2718 25.4999 15.7331 25.4999L13.0665 25.4999C10.5277 25.4999 8.71105 25.4982 7.33005 25.3191C5.97168 25.143 5.17146 24.8097 4.58661 24.2458C4.00634 23.6862 3.66692 22.9276 3.48643 21.6331C3.30184 20.3091 3.29979 18.5649 3.29979 16.1142L3.29979 10.4999Z" fill="black"/>
                  </svg>
                </div>
              </div>

              <!-- stat-card 2: العناوين (on left in RTL) -->
              <div class="stat-card" @click="router.push('/profile?tab=addresses')" style="cursor: pointer;">
                <div class="stat-txt">
                  <span class="stat-label">{{ t('profile.addresses') }}</span>
                  <span class="stat-val">{{ addressesCountText }}</span>
                </div>
                <div class="icon-container">
                  <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30234 13.2C7.15194 13.2 5.40234 11.4504 5.40234 9.3C5.40234 7.1496 7.15194 5.4 9.30234 5.4C11.4527 5.4 13.2023 7.1496 13.2023 9.3C13.2023 11.4504 11.4527 13.2 9.30234 13.2ZM9.30234 7.2C8.14434 7.2 7.20234 8.142 7.20234 9.3C7.20234 10.458 8.14434 11.4 9.30234 11.4C10.4603 11.4 11.4023 10.458 11.4023 9.3C11.4023 8.142 10.4603 7.2 9.30234 7.2Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30229 21C8.50309 21 7.74589 20.6952 7.16989 20.142C6.87812 19.8595 6.58183 19.577 6.28214 19.2913L6.25307 19.2636C2.68668 15.8688 -1.7521 11.6436 0.712678 5.71922C2.13468 2.29802 5.58709 0 9.30229 0C13.0175 0 16.4711 2.29802 17.8931 5.71922C20.3662 11.665 15.8907 15.9104 12.2956 19.3207C12.004 19.5967 11.7155 19.8708 11.4347 20.1408C10.8587 20.6952 10.1015 21 9.30229 21ZM9.30229 1.8C6.30469 1.8 3.52069 3.65279 2.37469 6.41039C0.385156 11.1922 3.99927 14.6326 7.49356 17.9589C7.80796 18.2577 8.11788 18.5532 8.42028 18.846C8.65668 19.0728 8.97109 19.2 9.30229 19.2C9.63349 19.2 9.9479 19.074 10.1867 18.8448C10.4064 18.6335 10.6304 18.4207 10.8565 18.2059L11.0567 18.0156C14.5835 14.6712 18.2291 11.2128 16.2323 6.41039C15.0851 3.65279 12.2999 1.8 9.30229 1.8Z" fill="black"/>
                    <path d="M1.20234 22.5C1.20234 24.7668 5.40114 25.8 9.30234 25.8C13.2035 25.8 17.4023 24.7668 17.4023 22.5C17.4023 22.0032 16.9955 21.6 16.5023 21.6C16.0091 21.6 15.6083 21.9972 15.6023 22.4892C15.4607 22.9104 13.3343 24 9.30234 24C5.27034 24 3.14394 22.9116 3.00234 22.4892C2.99634 21.9972 2.59914 21.6 2.10234 21.6C1.60554 21.6 1.20234 22.0032 1.20234 22.5Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- recent-orders-block -->
            <div class="recent-orders-block">
              <div class="recent-orders-header">
                <h3 class="recent-orders-title">{{ t('profile.recent_orders') }}</h3>
                <router-link to="/profile?tab=orders" class="view-all-link">
                  <span>{{ t('profile.view_all_orders') }}</span>
                  <svg class="chevron-left" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </router-link>
              </div>

              <div class="orders-list-compact">
                <div v-for="order in recentOrders" :key="order.id" class="order-row">
                  <!-- info on the right -->
                  <div class="order-info">
                    <span class="order-num" dir="ltr">{{ order.orderNumber }}</span>
                    <span class="order-date">{{ order.date }}</span>
                    <div class="price-unit">
                      <span class="price-val price-num">{{ order.total }}</span>
                      <span class="riyal-icon currency-text" aria-hidden="true" style="font-size: 13px">د.أ</span>
                    </div>
                    <span class="status-badge" :class="order.statusType">
                      {{ order.statusLabel }}
                    </span>
                  </div>

                  <!-- actions: عرض التفاصيل button on the left -->
                  <div class="order-actions">
                    <button type="button" class="order-btn" @click="viewOrderDetails(order)">
                      {{ t('profile.view_details') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Information Tab (Figma section-personal-info exact pixel-perfect) -->
          <div v-else-if="currentTab === 'info'" class="personal-info-tab-wrapper">
            <!-- View Mode (Exact Figma Mockup) -->
            <div v-if="!isEditingProfile && !showPasswordForm" class="section-personal-info">
              <!-- معلوماتك الشخصية -->
              <h2 class="personal-info-title">{{ t('profile.personal_info_title') }}</h2>

              <!-- info-rows -->
              <div class="info-rows">
                <!-- row-full-name -->
                <div class="info-row">
                  <span class="info-label">{{ t('profile.full_name') }}</span>
                  <span class="info-value">{{ displayUserName }}</span>
                </div>

                <!-- Line -->
                <div class="info-divider"></div>

                <!-- row-email -->
                <div class="info-row">
                  <span class="info-label">{{ t('profile.email') }}</span>
                  <span class="info-value">{{ displayUserEmail }}</span>
                </div>

                <!-- Line -->
                <div class="info-divider"></div>

                <!-- row-phone -->
                <div class="info-row">
                  <span class="info-label">{{ t('profile.mobile') }}</span>
                  <span class="info-value phone-ltr" dir="ltr">{{ displayUserPhone }}</span>
                </div>
              </div>

              <!-- edit-actions (Aligned to Right in RTL) -->
              <div class="edit-actions">
                <button type="button" class="btn-save" @click="startEditingProfile">
                  {{ t('profile.edit_profile') }}
                </button>
                <button type="button" class="btn-cancel" @click="openChangePasswordModal">
                  {{ t('profile.change_password') }}
                </button>
              </div>
            </div>

            <!-- Edit Profile Mode -->
            <div v-else-if="isEditingProfile" class="section-personal-info edit-mode">
              <h2 class="personal-info-title">{{ t('profile.edit_personal_info') }}</h2>

              <form @submit.prevent="handleUpdateProfile" class="personal-info-edit-form">
                <div class="info-rows">
                  <div class="info-row-edit">
                    <label class="info-label">{{ t('profile.full_name') }}</label>
                    <input type="text" v-model="form.name" class="personal-info-input" required />
                  </div>

                  <div class="info-divider"></div>

                  <div class="info-row-edit">
                    <label class="info-label">{{ t('profile.email') }}</label>
                    <input type="email" v-model="form.email" class="personal-info-input" dir="ltr" required />
                  </div>

                  <div class="info-divider"></div>

                  <div class="info-row-edit">
                    <label class="info-label">{{ t('profile.mobile') }}</label>
                    <PhoneCountryInput
                      v-model="phoneLocal"
                      v-model:country="phoneCountry"
                      :error="Boolean(phoneError)"
                      dir="rtl"
                      :country-label="t('profile.country')"
                      class="profile-phone-input"
                    />
                    <span v-if="phoneError" class="personal-info-error">{{ phoneError }}</span>
                  </div>
                </div>

                <div class="edit-actions">
                  <button type="submit" class="btn-save" :disabled="loadingData">
                    {{ loadingData ? t('profile.saving') : t('profile.save_changes') }}
                  </button>
                  <button type="button" class="btn-cancel" @click="cancelEditingProfile">
                    {{ t('common.cancel') }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Addresses Tab -->
          <div v-else-if="currentTab === 'addresses'" class="content-view addresses-view-area">
            <!-- Add address row -->
            <div class="add-address-row">
              <button class="primary-add-button" @click="openAddAddress">
                <span>{{ t('profile.add_new_address') }}</span>
              </button>
              <h2 class="addresses-main-title">{{ t('profile.saved_addresses') }}</h2>
            </div>

            <!-- Addresses Grid -->
            <div class="addresses-grid-v2">
              <div 
                v-for="addr in addressesList" 
                :key="addr.id" 
                class="address-card-v2"
                :class="{ 'is-selected': addr.is_default }"
                @click="selectDefaultAddress(addr)"
              >
                <!-- Card Header -->
                <div class="card-header-v2" :class="{ 'has-default': addr.is_default }">
                  <span v-if="addr.is_default" class="default-address-tag">{{ t('profile.default_address') }}</span>
                  <div class="card-user-info-v2">
                    <span class="user-display-name">{{ addr.name || addr.full_name }}</span>
                    <div class="selection-indicator-v2" :class="{ selected: addr.is_default }">
                      <div v-if="addr.is_default" class="selection-inner-dot"></div>
                    </div>
                  </div>
                </div>

                <!-- Address Details -->
                <div class="address-details-v2">
                  <div class="detail-line-item" v-if="addr.phone">
                    <span>{{ t('profile.phone_number') }}: <span class="phone-ltr" dir="ltr">{{ addr.phone }}</span></span>
                  </div>
                  <div class="detail-line-item" v-if="addr.city">
                    <span>{{ addr.city }}</span>
                  </div>
                  <div class="detail-line-item" v-if="addr.address">
                    <span>{{ addr.address }}</span>
                  </div>
                </div>

                <!-- Card Actions -->
                <div class="card-actions-v2" @click.stop>
                  <button type="button" class="card-action-btn delete-action-btn" @click="deleteAddress(addr.id)">
                    <span class="action-btn-text">{{ t('common.delete') }}</span>
                    <span class="action-icon-wrap delete-icon-wrap">
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.54414 3.83385e-07H6.50145C6.1646 -8.90362e-06 5.87885 -1.67812e-05 5.64172 0.0215703C5.39009 0.0444782 5.1557 0.0940931 4.92905 0.214611C4.83959 0.262175 4.75424 0.317072 4.67386 0.378739C4.47018 0.534988 4.32782 0.727689 4.20261 0.947154C4.08461 1.15397 3.9661 1.41397 3.82639 1.72049L3.54704 2.33333H0.5C0.223858 2.33333 0 2.55719 0 2.83333C0 3.10948 0.223858 3.33333 0.5 3.33333H1.02925L1.40553 9.57241C1.45583 10.4064 1.49573 11.068 1.57875 11.5966C1.66387 12.1386 1.80074 12.5899 2.07526 12.9848C2.32643 13.346 2.65004 13.651 3.0255 13.8802C3.59536 14.2281 4.26856 14.3084 5.15267 14.3331C5.42871 14.3409 5.65874 14.1234 5.66647 13.8473C5.6742 13.5713 5.4567 13.3413 5.18066 13.3335C4.30621 13.309 3.87176 13.2253 3.54657 13.0267C3.2897 12.8699 3.06824 12.6612 2.89632 12.4139C2.74297 12.1934 2.64009 11.9091 2.56663 11.4414C2.49192 10.9658 2.45437 10.3519 2.40217 9.48641L2.03106 3.33333H10.9682L10.7331 7.14001C10.7161 7.41563 10.9257 7.65286 11.2013 7.66988C11.4769 7.6869 11.7142 7.47727 11.7312 7.20165L11.9701 3.33333H12.5C12.7761 3.33333 13 3.10948 13 2.83333C13 2.55719 12.7761 2.33333 12.5 2.33333H9.51709L9.18942 1.65739C9.04612 1.36176 8.92446 1.11077 8.8047 0.911255C8.67757 0.699449 8.53464 0.51383 8.33341 0.363739C8.25388 0.304427 8.16967 0.251666 8.08161 0.205977C7.85877 0.0903652 7.62939 0.042721 7.38335 0.0207142C7.15157 -1.62721e-05 6.87267 -8.62543e-06 6.54414 3.83385e-07ZM8.40579 2.33333H4.64603L4.72737 2.15489C4.87843 1.82349 4.9784 1.60532 5.07118 1.44271C5.15925 1.28835 5.22244 1.21826 5.28254 1.17215C5.31907 1.14413 5.35787 1.11917 5.39853 1.09755C5.46541 1.06199 5.5554 1.03356 5.73239 1.01745C5.91883 1.00048 6.1588 1 6.52302 1C6.87835 1 7.11228 1.00046 7.29426 1.01674C7.46693 1.03218 7.55519 1.05944 7.62109 1.09363C7.66112 1.11439 7.69939 1.13838 7.73555 1.16534C7.79505 1.20972 7.85808 1.27726 7.9473 1.42589C8.04132 1.58255 8.14378 1.79284 8.29878 2.11259L8.40579 2.33333Z" fill="#E53333"/>
                        <path d="M12.1869 9.52023C12.3821 9.32498 12.3822 9.00839 12.1869 8.81313C11.9916 8.61786 11.6751 8.61785 11.4798 8.8131L9.49985 10.7929L7.52021 8.81341C7.32494 8.61815 7.00836 8.61816 6.8131 8.81343C6.61785 9.0087 6.61786 9.32528 6.81313 9.52054L8.79272 11.5L6.81313 13.4795C6.61786 13.6747 6.61785 13.9913 6.8131 14.1866C7.00836 14.3818 7.32494 14.3818 7.52021 14.1866L9.49985 12.2071L11.4798 14.1869C11.6751 14.3822 11.9916 14.3821 12.1869 14.1869C12.3822 13.9916 12.3821 13.675 12.1869 13.4798L10.207 11.5L12.1869 9.52023Z" fill="#E53333"/>
                      </svg>
                    </span>
                  </button>
                  <button type="button" class="card-action-btn edit-action-btn" @click="editAddress(addr)">
                    <span class="action-btn-text">{{ t('common.edit') }}</span>
                    <span class="action-icon-wrap edit-icon-wrap">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 1.69008e-07H6.46204C5.08001 -9.19404e-06 3.99179 -1.66694e-05 3.14156 0.114294C2.26918 0.231583 1.57285 0.477402 1.02513 1.02513C0.477402 1.57285 0.231583 2.26918 0.114294 3.14156C-1.66694e-05 3.99179 -9.19404e-06 5.08001 1.6901e-07 6.46204V6.53797C-9.19404e-06 7.91999 -1.66694e-05 9.00821 0.114294 9.85844C0.231583 10.7308 0.477402 11.4271 1.02513 11.9749C1.57285 12.5226 2.26918 12.7684 3.14156 12.8857C3.99179 13 5.08001 13 6.46204 13H6.53796C7.91999 13 9.00821 13 9.85844 12.8857C10.7308 12.7684 11.4271 12.5226 11.9749 11.9749C12.5226 11.4271 12.7684 10.7308 12.8857 9.85844C13 9.00821 13 7.91999 13 6.53796V6.5C13 6.22386 12.7761 6 12.5 6C12.2239 6 12 6.22386 12 6.5C12 7.92835 11.9989 8.94931 11.8946 9.72519C11.7922 10.4867 11.5987 10.9368 11.2678 11.2678C10.9368 11.5987 10.4867 11.7922 9.72519 11.8946C8.94931 11.9989 7.92835 12 6.5 12C5.07165 12 4.05069 11.9989 3.27481 11.8946C2.51331 11.7922 2.06319 11.5987 1.73223 11.2678C1.40128 10.9368 1.20776 10.4867 1.10538 9.72519C1.00106 8.94931 1 7.92835 1 6.5C1 5.07165 1.00106 4.05069 1.10538 3.27481C1.20776 2.51331 1.40128 2.06319 1.73223 1.73223C2.06319 1.40128 2.51331 1.20776 3.27481 1.10538C4.05069 1.00106 5.07165 1 6.5 1C6.77614 1 7 0.776143 7 0.5C7 0.223858 6.77614 1.69008e-07 6.5 1.69008e-07Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4665 0.533532C11.7551 -0.177844 10.6017 -0.177844 9.89036 0.533533L5.41297 5.01091C4.76723 5.65649 4.37256 6.05107 4.10111 6.53684C3.9497 6.8078 3.81743 7.21879 3.7004 7.63936C3.58 8.07201 3.46147 8.56982 3.34833 9.04503L3.34694 9.05086C3.30672 9.21977 3.35702 9.39745 3.47979 9.52022C3.60257 9.643 3.78025 9.69329 3.94915 9.65307L3.95495 9.65169C4.43016 9.53854 4.92799 9.42001 5.36065 9.29961C5.78122 9.18258 6.19221 9.05031 6.46317 8.8989C6.94895 8.62745 7.34351 8.23279 7.9891 7.58704L12.4665 3.10965C13.1779 2.39828 13.1779 1.24491 12.4665 0.533532ZM10.5975 1.24064C10.9183 0.919787 11.4385 0.919787 11.7594 1.24064C12.0802 1.56149 12.0802 2.0817 11.7594 2.40255L11.1784 2.9835L10.0165 1.82159L10.5975 1.24064ZM9.3094 2.5287L10.4713 3.69061L7.33562 6.8263C6.61955 7.54237 6.32548 7.8303 5.97537 8.02594C5.82173 8.1118 5.51912 8.21752 5.09256 8.33622C4.91029 8.38694 4.71478 8.43759 4.51178 8.48823C4.56242 8.28523 4.61307 8.08973 4.66379 7.90745C4.78249 7.48089 4.88821 7.17828 4.97407 7.02464C5.16971 6.67453 5.45765 6.38046 6.17371 5.66439L9.3094 2.5287Z" fill="black"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div v-if="addressesList.length === 0" class="empty-state">{{ t('profile.no_addresses') }}</div>
            </div>
          </div>

          <!-- Orders Tab (Figma left-content-area) -->
          <div v-else-if="currentTab === 'orders'" class="orders-tab-wrapper">
            <!-- 1. Orders List View (Shown when no order is selected) -->
            <div v-if="!selectedOrderDetails" class="orders-tab-view">
              <!-- filter-sort-bar -->
              <div class="filter-sort-bar">
                <!-- filter-tabs (Right in RTL) -->
                <div class="filter-tabs">
                  <button
                    type="button"
                    class="tab-btn"
                    :class="{ active: orderStatusFilter === 'all' }"
                    @click="orderStatusFilter = 'all'; orderCurrentPage = 1"
                  >
                    {{ t('profile.all') }}
                  </button>
                  <button
                    type="button"
                    class="tab-btn"
                    :class="{ active: orderStatusFilter === 'processing' }"
                    @click="orderStatusFilter = 'processing'; orderCurrentPage = 1"
                  >
                    {{ t('profile.in_progress') }}
                  </button>
                  <button
                    type="button"
                    class="tab-btn"
                    :class="{ active: orderStatusFilter === 'completed' }"
                    @click="orderStatusFilter = 'completed'; orderCurrentPage = 1"
                  >
                    {{ t('profile.completed') }}
                  </button>
                  <button
                    type="button"
                    class="tab-btn"
                    :class="{ active: orderStatusFilter === 'cancelled' }"
                    @click="orderStatusFilter = 'cancelled'; orderCurrentPage = 1"
                  >
                    {{ t('profile.cancelled') }}
                  </button>
                </div>

                <!-- search-box (Left in RTL) -->
                <div class="search-box">
                  <div class="search-icon-wrap">
                    <svg class="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.5 9.5L12.5 12.5M5.83333 10.6667C3.16396 10.6667 1 8.50271 1 5.83333C1 3.16396 3.16396 1 5.83333 1C8.50271 1 10.6667 3.16396 10.6667 5.83333C10.6667 8.50271 8.50271 10.6667 5.83333 10.6667Z" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    v-model="orderSearchQuery"
                    class="search-input"
                    :placeholder="t('profile.search_order_placeholder')"
                  />
                </div>
              </div>

              <!-- orders-detailed-list -->
              <div class="orders-detailed-list">
                <div
                  v-for="order in paginatedOrders"
                  :key="order.id"
                  class="order-detailed-card clickable-order"
                  @click="openOrderDetails(order)"
                >
                  <!-- card-top-info -->
                  <div class="card-top-info">
                    <!-- main-meta (Right in RTL) -->
                    <div class="main-meta">
                      <div class="meta-col">
                        <span class="meta-label">{{ t('profile.order_number') }}</span>
                        <span class="meta-val"><bdi dir="ltr">{{ order.orderNumber }}</bdi></span>
                      </div>

                      <div class="meta-divider"></div>

                      <div class="meta-col">
                        <span class="meta-label">{{ t('profile.order_date') }}</span>
                        <span class="meta-val">{{ order.date }}</span>
                      </div>
                    </div>

                    <!-- status-area (Left in RTL) -->
                    <div class="status-area">
                      <div
                        class="status-badge"
                        :style="{ background: order.statusColor }"
                      >
                        {{ order.statusLabel }}
                      </div>
                    </div>
                  </div>

                  <!-- horizontal line -->
                  <div class="card-line"></div>

                  <!-- card-middle-content -->
                  <div class="card-middle-content">
                    <!-- products-description (Right in RTL) -->
                    <div class="products-description">
                      <div class="prod-icon-frame">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 8.5C4 7.67157 4.67157 7 5.5 7H18.5C19.3284 7 20 7.67157 20 8.5V17.5C20 19.433 18.433 21 16.5 21H7.5C5.567 21 4 19.433 4 17.5V8.5Z" stroke="#000000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4 11.5H20" stroke="#000000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 7V11.5" stroke="#000000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10 14.5H14" stroke="#000000" stroke-width="1.6" stroke-linecap="round"/>
                        </svg>
                      </div>

                      <div class="prod-text-frame">
                        <span class="prod-count">{{ order.productsCountText }}</span>
                        <span class="prod-subtitle">{{ order.subtitle || t('profile.shipping_warranty_included') }}</span>
                      </div>
                    </div>

                    <!-- price-actions (Left in RTL) -->
                    <div class="price-actions">
                      <span class="price-label">{{ t('profile.total_amount') }}</span>
                      <div class="price-unit">
                        <span class="price-amount price-num">{{ order.total }}</span>
                        <span class="riyal-symbol currency-text" aria-hidden="true" style="font-size: 15px">د.أ</span>
                      </div>
                    </div>
                  </div>

                  <!-- horizontal line -->
                  <div class="card-line"></div>

                  <!-- card-bottom-actions -->
                  <div class="card-bottom-actions">
                    <!-- help-prompt (Right in RTL) -->
                    <div class="help-prompt">
                      <span class="help-question">{{ t('profile.order_problem') }}</span>
                      <router-link to="/contact" class="help-link">{{ t('profile.support_warranty') }}</router-link>
                    </div>

                    <!-- actions-left (Left in RTL) -->
                    <div class="actions-left">
                      <button
                        type="button"
                        class="order-action-link details-link"
                        @click.stop="openOrderDetails(order)"
                      >
                        <svg class="action-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>{{ t('profile.view_details_invoice') }}</span>
                      </button>

                      <button
                        type="button"
                        v-if="order.canTrack"
                        class="order-action-link track-link"
                        @click.stop="openOrderDetails(order)"
                      >
                        <svg class="action-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>{{ t('profile.order_tracking') }}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Empty state -->
                <div v-if="filteredOrders.length === 0" class="empty-orders-card">
                  <i class="fas fa-box-open empty-icon"></i>
                  <p>{{ t('profile.no_matching_orders') }}</p>
                </div>
              </div>

              <!-- pagination -->
              <div class="orders-pagination" v-if="filteredOrders.length > 0">
                <button
                  type="button"
                  class="page-nav-btn"
                  :disabled="orderCurrentPage <= 1"
                  @click="orderCurrentPage > 1 && orderCurrentPage--"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>

                <button
                  type="button"
                  class="page-num-btn"
                  :class="{ active: orderCurrentPage === 1 }"
                  @click="orderCurrentPage = 1"
                >
                  1
                </button>

                <button
                  type="button"
                  v-if="totalOrderPages >= 2"
                  class="page-num-btn"
                  :class="{ active: orderCurrentPage === 2 }"
                  @click="orderCurrentPage = 2"
                >
                  2
                </button>

                <button
                  type="button"
                  class="page-nav-btn"
                  :disabled="orderCurrentPage >= totalOrderPages"
                  @click="orderCurrentPage < totalOrderPages && orderCurrentPage++"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 2. Order Details View (Figma left-content-area: exact pixel-perfect design) -->
            <div v-else-if="!isViewingInvoiceDetails" class="order-details-view">
              <!-- 1) order-info-card -->
              <div class="order-info-card">
                <div class="order-info-frame">
                  <!-- Meta on Right in RTL -->
                  <div class="order-info-meta">
                    <div class="info-meta-col">
                      <span class="info-meta-label">{{ t('profile.order_number') }}</span>
                      <span class="info-meta-val"><bdi dir="ltr">{{ selectedOrderDetails.orderNumber || '—' }}</bdi></span>
                    </div>

                    <div class="info-meta-divider"></div>

                    <div class="info-meta-col">
                      <span class="info-meta-label">{{ t('profile.order_date') }}</span>
                      <span class="info-meta-val">{{ selectedOrderDetails.date || '—' }}</span>
                    </div>
                  </div>

                  <!-- Status Badge on Left in RTL -->
                  <div class="order-status-badge" :style="{ background: selectedOrderDetails.statusColor || '#F59E1F' }">
                    {{ selectedOrderDetails.statusLabel || '—' }}
                  </div>
                </div>
              </div>

              <!-- 2) order-tracking-card -->
              <div class="order-tracking-card">
                <h3 class="tracking-title">{{ t('profile.order_tracking') }}</h3>
                <div class="card-divider-line"></div>

                <!-- Timeline Stepper -->
                <div class="timeline-row">
                  <template v-for="(step, index) in trackingSteps" :key="step.key">
                    <div class="timeline-step" :class="getTrackingStepState(selectedOrderDetails, step.rank)">
                      <div class="step-indicator-wrapper">
                        <div class="step-indicator-circle" :class="getTrackingStepState(selectedOrderDetails, step.rank)">
                          <i :class="getTrackingStepIcon(step, getTrackingStepState(selectedOrderDetails, step.rank))" :aria-label="step.label"></i>
                        </div>
                      </div>
                      <span class="step-title" :class="{ 'pending-text': getTrackingStepState(selectedOrderDetails, step.rank) === 'pending' }">
                        {{ step.label }}
                      </span>
                      <span class="step-time">{{ getTrackingStepTime(selectedOrderDetails, step.rank) }}</span>
                      <span v-if="step.note && getTrackingStepState(selectedOrderDetails, step.rank) === 'active'" class="step-note">{{ step.note }}</span>
                    </div>

                    <div v-if="index < trackingSteps.length - 1" class="timeline-connector">
                      <div class="connector-bar" :class="{ dashed: getTrackingStepState(selectedOrderDetails, step.rank + 1) === 'pending' }"></div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Why the order was cancelled -->
              <div v-if="selectedOrderDetails.status === 'cancelled'" class="cancel-reason-card" data-testid="order-cancel-reason">
                <h3 class="cancel-reason-title">{{ t('profile.cancellation_reason') }}</h3>
                <p class="cancel-reason-body" :class="{ 'is-empty': !selectedOrderDetails.cancellationReason }">
                  {{ selectedOrderDetails.cancellationReason || t('profile.cancellation_reason_empty') }}
                </p>
              </div>

              <!-- 3) products-card -->
              <div class="products-card">
                <h3 class="products-card-title">{{ t('profile.ordered_products') }}</h3>

                <!-- Table Header (RTL: Product, Price, Qty, Total) -->
                <div class="products-table-header">
                  <div class="th-product">{{ t('profile.product') }}</div>
                  <div class="th-unit-price">{{ t('profile.price') }}</div>
                  <div class="th-qty">{{ t('profile.quantity') }}</div>
                  <div class="th-total">{{ t('profile.total') }}</div>
                </div>

                <!-- Product Rows -->
                <div
                  v-for="item in (selectedOrderDetails.items || [])"
                  :key="item.id"
                  class="product-row-item"
                >
                  <!-- Product Details (Right in RTL) -->
                  <div class="col-prod-details">
                    <img
                      :src="item.image || '/brand/jabel-icon.png'"
                      :alt="item.name"
                      class="prod-thumb-img"
                    />
                    <div class="prod-titles-col">
                      <span class="prod-main-name">{{ item.name }}</span>
                      <span class="prod-model-num">{{ item.model || item.product_id || '—' }}</span>
                      <div v-for="(choice, choiceIndex) in (item.choices || [])" :key="choiceIndex" class="prod-choice">
                        <span v-if="item.choices.length > 1" class="prod-choice-qty" dir="ltr">×{{ choice.quantity }}</span>
                        <SelectedOptionsChips :options="choice.options" compact />
                      </div>
                    </div>
                  </div>

                  <!-- Unit Price (Second column) -->
                  <div class="col-unit-price-cell">
                    <span class="price-num">{{ item.unitPrice || item.price }}</span>
                    <span class="riyal-icon-muted currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                  </div>

                  <!-- Quantity (Third column) -->
                  <div class="col-qty-cell">
                    {{ item.quantity }}
                  </div>

                  <!-- Total (Fourth column) -->
                  <div class="col-total-cell">
                    <span class="price-num">{{ item.totalPrice || item.price }}</span>
                    <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                  </div>
                </div>
              </div>

              <!-- 4) summary-card -->
              <div class="summary-card">
                <h3 class="summary-card-title">{{ t('profile.order_summary') }}</h3>
                <div class="card-divider-line"></div>

                <div class="summary-rows-wrap">
                  <!-- Row 1: Subtotal -->
                  <div class="summary-item-row">
                    <span class="summary-item-label">{{ t('profile.products_total') }}</span>
                    <div class="summary-item-val">
                      <span class="price-num">{{ selectedOrderDetails.subtotal || '0.00' }}</span>
                      <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                    </div>
                  </div>

                  <!-- Row 2: Shipping (only when there was a fee) -->
                  <div v-if="orderSummaryRows.shipping" class="summary-item-row">
                    <span class="summary-item-label">{{ t('profile.shipping_fees') }}</span>
                  <span class="summary-item-val free"><bdi class="price-num" dir="ltr">{{ selectedOrderDetails.shipping || '0.00' }}</bdi></span>
                  </div>

                  <!-- Row 3: Discount (only when there was one) -->
                  <div v-if="orderSummaryRows.discount" class="summary-item-row">
                    <span class="summary-item-label">{{ t('profile.discount') }}</span>
                    <div class="summary-item-val discount">
                      <span class="price-num">{{ selectedOrderDetails.discount || '0.00' }}</span>
                      <span class="riyal-icon-red currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                    </div>
                  </div>
                </div>

                <div class="card-divider-line"></div>

                <!-- Row 4: Grand Total -->
                <div class="summary-total-row">
                  <span class="summary-total-label">{{ t('profile.final_total') }}</span>
                  <div class="summary-total-val">
                    <span class="price-num">{{ selectedOrderDetails.total || '0.00' }}</span>
                    <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 16px">د.أ</span>
                  </div>
                </div>
              </div>

              <!-- 5) address-payment-split -->
              <div class="address-payment-split">
                <!-- Delivery Address (Right in RTL) -->
                <div class="delivery-card">
                  <h4 class="card-heading-md">{{ t('profile.delivery_address') }}</h4>
                  <div class="card-divider-line"></div>
                  <div class="delivery-info-list">
                    <span class="delivery-name">{{ selectedOrderDetails.recipientName || '—' }}</span>
                    <span class="delivery-detail">{{ t('profile.phone_short') }}: <span class="phone-ltr" dir="ltr">{{ selectedOrderDetails.phone || '—' }}</span></span>
                    <span class="delivery-detail">{{ selectedOrderDetails.address || '—' }}</span>
                    <span class="delivery-detail">{{ t('profile.postal_code') }}: {{ selectedOrderDetails.postalCode || '—' }}</span>
                  </div>
                </div>

                <!-- Payment Method (Left in RTL) -->
                <div class="payment-card">
                  <h4 class="card-heading-md">{{ t('profile.payment_method') }}</h4>
                  <div class="card-divider-line"></div>
                  <div class="payment-method-row">
                    <span class="mada-badge">{{ (selectedOrderDetails.raw?.payment_method === 'cash_on_delivery' || selectedOrderDetails.paymentMethod === t('invoice.payment_cod')) ? 'COD' : 'MADA' }}</span>
                    <span class="payment-method-text">{{ selectedOrderDetails.paymentMethod || t('profile.default_payment_display') }}</span>
                  </div>
                </div>
              </div>

              <!-- 6) bottom-action-buttons -->
              <div class="bottom-action-buttons">
                <!-- Help Prompt (Right in RTL) -->
                <div class="help-prompt-col">
                  <span class="help-q-text">{{ t('profile.order_problem') }}</span>
                  <router-link to="/contact" class="help-link-bold">{{ t('profile.support_warranty') }}</router-link>
                </div>

                <!-- Action Buttons (Left in RTL) -->
                <div class="action-buttons-wrap">
                  <button
                    type="button"
                    class="btn-primary-invoice"
                    @click="openInvoiceFromDetails"
                  >
                    {{ t('profile.view_invoice') }}
                  </button>
                  <button
                    type="button"
                    class="btn-secondary-back"
                    @click="returnToOrdersList"
                  >
                    {{ t('profile.back_to_orders') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 3. In-Page Invoice View (Replaces Order Details View on the SAME page) -->
            <div v-else class="inpage-invoice-view">
              <!-- Top Back Nav Bar -->
              <div class="inpage-invoice-top-bar">
                <button
                  type="button"
                  class="btn-back-to-order-details"
                  @click="closeInvoiceDetails"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 15L12 10L7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ t('profile.back_to_order_details') }}</span>
                </button>

                <button
                  type="button"
                  class="btn-back-to-orders-list"
                  @click="returnToOrdersList"
                >
                  <span>{{ t('profile.orders_list') }}</span>
                </button>
              </div>

              <!-- printable-invoice-card -->
              <div class="printable-invoice-card" id="printable-invoice-card" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
                <!-- 1. Header Frame -->
                <div class="invoice-header-frame">
                  <!-- Right in RTL: Tax Invoice Meta -->
                  <div class="invoice-meta-block">
                    <h2 class="invoice-type-title">{{ t('profile.tax_invoice') }}</h2>
                    <span class="invoice-meta-row">{{ t('profile.invoice_number') }}: {{ getInvoiceNumber(activeModalOrder || selectedOrderDetails) || '—' }}</span>
                    <span class="invoice-meta-row">{{ t('profile.order_number') }}: {{ (activeModalOrder || selectedOrderDetails)?.orderNumber || '—' }}</span>
                    <span class="invoice-meta-row">{{ t('profile.date') }}: {{ (activeModalOrder || selectedOrderDetails)?.date || '—' }}</span>
                    <span class="invoice-meta-row">{{ t('profile.order_status') }}: {{ (activeModalOrder || selectedOrderDetails)?.statusLabel || '—' }}</span>
                  </div>

                  <!-- Left in RTL: Logo & Legal info -->
                  <div class="invoice-company-block">
                    <div class="invoice-logo-wrapper">
                      <img src="/brand/jabel-logo.png" alt="Jabel" class="invoice-logo-img" />
                    </div>
                    <span class="invoice-company-name">{{ t('profile.company_name') }}</span>
                    <span class="invoice-vat-number">{{ t('profile.tax_number') }}: 301204567800003</span>
                  </div>
                </div>

                <!-- 2. Divider Line -->
                <div class="invoice-divider-line"></div>

                <!-- 3. Customer & Delivery Frame -->
                <div class="invoice-parties-frame">
                  <!-- Right in RTL: Customer Info -->
                  <div class="invoice-party-col">
                    <h3 class="invoice-party-title">{{ t('profile.customer_info') }}</h3>
                    <div class="invoice-party-item">{{ t('profile.name') }}: {{ getCustomerName(activeModalOrder || selectedOrderDetails) }}</div>
                    <div class="invoice-party-item">{{ t('profile.phone') }}: {{ getCustomerPhone(activeModalOrder || selectedOrderDetails) }}</div>
                    <div class="invoice-party-item">{{ t('profile.email') }}: {{ getCustomerEmail(activeModalOrder || selectedOrderDetails) }}</div>
                  </div>

                  <!-- Left in RTL: Delivery Address -->
                  <div class="invoice-party-col">
                    <h3 class="invoice-party-title">{{ t('profile.delivery_address') }}</h3>
                    <div class="invoice-party-item">{{ getCustomerName(activeModalOrder || selectedOrderDetails) }}</div>
                    <div class="invoice-party-item">{{ getDeliveryStreet(activeModalOrder || selectedOrderDetails) }}</div>
                    <div class="invoice-party-item">{{ getDeliveryCountry(activeModalOrder || selectedOrderDetails) }}</div>
                  </div>
                </div>

                <!-- 4. Products Table Frame -->
                <div class="invoice-table-frame">
                  <!-- invoice-table-header -->
                  <div class="invoice-table-header">
                    <div class="col-product">{{ t('profile.product') }}</div>
                    <div class="col-price">{{ t('profile.unit_price') }}</div>
                    <div class="col-qty">{{ t('profile.quantity') }}</div>
                    <div class="col-total">{{ t('profile.total') }}</div>
                  </div>

                  <!-- invoice-product-row -->
                  <div
                    v-for="(item, index) in getInvoiceProducts(activeModalOrder || selectedOrderDetails)"
                    :key="index"
                    class="invoice-product-row"
                  >
                    <div class="col-product font-medium">
                      <span class="invoice-product-name">{{ item.name }}</span>
                      <span v-for="(line, lineIndex) in item.choiceLines" :key="lineIndex" class="invoice-product-options">{{ line }}</span>
                    </div>
                    <div class="col-price col-price-val">
                      <span class="price-num">{{ item.unitPrice }}</span>
                      <span class="riyal-icon-muted currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                    </div>
                    <div class="col-qty col-qty-val">
                      {{ item.quantity }}
                    </div>
                    <div class="col-total col-total-val">
                      <span class="price-num">{{ item.totalPrice }}</span>
                      <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                    </div>
                  </div>
                </div>

                <!-- 5. Totals Breakdown Frame -->
                <div class="invoice-summary-frame">
                  <div class="invoice-summary-card">
                    <div class="summary-breakdown-row">
                      <span class="breakdown-label">{{ t('profile.subtotal') }}</span>
                      <div class="breakdown-val">
                        <span class="price-num">{{ (activeModalOrder || selectedOrderDetails)?.subtotal || '0.00' }}</span>
                        <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                      </div>
                    </div>

                    <div class="summary-breakdown-row">
                      <span class="breakdown-label">{{ t('profile.vat_15') }}</span>
                      <div class="breakdown-val">
                        <span>{{ (activeModalOrder || selectedOrderDetails)?.tax || '0.00' }}</span>
                        <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                      </div>
                    </div>

                    <div class="summary-breakdown-row">
                      <span class="breakdown-label">{{ t('profile.discount') }}</span>
                      <div class="breakdown-val discount-val">
                        <span class="price-num">{{ (activeModalOrder || selectedOrderDetails)?.discount || '0.00' }}</span>
                        <span class="riyal-icon-red currency-text" aria-hidden="true" style="font-size: 12px">د.أ</span>
                      </div>
                    </div>

                    <div class="summary-breakdown-row">
                      <span class="breakdown-label">{{ t('profile.shipping_delivery') }}</span>
                      <span class="breakdown-val free-val"><bdi class="price-num" dir="ltr">{{ (activeModalOrder || selectedOrderDetails)?.shipping || '0.00' }}</bdi></span>
                    </div>

                    <div class="summary-box-line"></div>

                    <div class="summary-final-row">
                      <span class="final-total-label">{{ t('profile.net_total') }}</span>
                      <div class="final-total-val">
                        <span class="price-num">{{ (activeModalOrder || selectedOrderDetails)?.total || '0.00' }}</span>
                        <span class="riyal-icon-dark currency-text" aria-hidden="true" style="font-size: 16px">د.أ</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 6. Bottom Divider -->
                <div class="invoice-divider-line"></div>

                <!-- 7. Bottom Footer Bar -->
                <div class="invoice-footer-frame">
                  <span class="invoice-thanks-note">{{ t('profile.invoice_thanks') }}</span>
                  <span class="invoice-payment-method">{{ t('profile.payment_method') }}: {{ ((activeModalOrder || selectedOrderDetails)?.paymentMethod || t('invoice.not_specified')).replace('مدى (mada)', t('profile.credit_card')) }}</span>
                </div>
              </div>

              <!-- invoice-action-controls -->
              <div class="invoice-action-controls">
                <!-- Help Prompt (Right in RTL) -->
                <div class="help-prompt-col">
                  <span class="help-q-text">{{ t('profile.order_problem') }}</span>
                  <router-link to="/contact" class="help-link-bold">{{ t('profile.support_warranty') }}</router-link>
                </div>

                <!-- Action Buttons (Left in RTL) -->
                <div class="invoice-buttons-wrap">
                  <button type="button" class="primary-download-button" :disabled="downloadingInvoice" @click="downloadInvoicePdf">
                    <span>{{ downloadingInvoice ? t('profile.invoice_pdf_preparing') : t('profile.download_invoice') }}</span>
                    <svg class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5M3 13.5H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>

                  <button type="button" class="secondary-print-button" @click="printInvoiceCard">
                    <span>{{ t('profile.print_invoice') }}</span>
                    <svg class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6V2.5H12V6M4 12H3C2.44772 12 2 11.5523 2 11V7.5C2 6.94772 2.44772 6.5 3 6.5H13C13.5523 6.5 14 6.94772 14 7.5V11C14 11.5523 13.5523 12 13 12H12M4 9.5H12V13.5H4V9.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Returns Tab -->
          <div v-else-if="currentTab === 'returns'" class="content-view">
             <header class="view-header flex-header">
               <h2 class="view-title">{{ t('profile.returns') }}</h2>
               <button class="add-btn" v-if="!showReturnForm" @click="openReturnForm">
                  <i class="fas fa-plus"></i> {{ t('profile.return_request') }}
               </button>
             </header>

             <!-- New Return Request Form -->
             <div class="return-form-box" v-if="showReturnForm">
                <h3 class="inner-subtitle">{{ t('profile.submit_return_request') }}</h3>
                
                <div class="return-steps">
                  <!-- Step 1: Select Order -->
                  <div class="form-group" v-if="returnStep === 1">
                    <label>{{ t('profile.choose_order') }}</label>
                    <select v-model="selectedOrderForReturn" class="custom-select-v2" @change="resetReturnItemSelection">
                      <option :value="null">--- {{ t('profile.choose_delivered_order') }} ---</option>
                      <option v-for="o in ordersList.filter(o => ['delivered', 'completed'].includes(o.status))" :key="o.id" :value="o">
                        {{ o.orderNumber || o.order_number }} - {{ o.date || formatDate(o.created_at) }}
                      </option>
                    </select>
                    <div class="form-actions mt-4">
                      <button class="save-btn" :disabled="!selectedOrderForReturn" @click="returnStep = 2">{{ t('common.next') }}</button>
                      <button class="cancel-btn" @click="showReturnForm = false">{{ t('common.cancel') }}</button>
                    </div>
                  </div>

                  <!-- Step 2: Select Product -->
                  <div class="form-group" v-if="returnStep === 2">
                    <label>{{ t('profile.choose_product_to_return') }}</label>
                    <p class="return-help-text">{{ t('profile.return_select_hint') }}</p>
                    <div class="return-selection-summary" v-if="selectedReturnItems.length">
                      {{ t('profile.return_selected_summary', { products: selectedReturnItems.length, quantity: selectedReturnTotalQuantity }) }}
                    </div>
                    <div class="product-selection-list">
                      <div v-for="item in (selectedOrderForReturn.items || selectedOrderForReturn.products || [])"
                           :key="getReturnItemKey(item)"
                           class="product-select-item"
                           :class="{ selected: isReturnItemSelected(item), disabled: getReturnMaxQuantity(item) < 1 }"
                           :data-return-item-key="getReturnItemKey(item)"
                           @click="toggleReturnItem(item)">
                        <div class="return-item-main">
                          <input
                            type="checkbox"
                            class="return-item-checkbox"
                            :checked="isReturnItemSelected(item)"
                            :disabled="getReturnMaxQuantity(item) < 1"
                            :aria-label="t('profile.return_select_item', { name: item.name || '' })"
                            @click.stop
                            @change="toggleReturnItem(item)"
                          />
                          <img :src="getImageUrl(item.image)" class="p-mini-img" alt="" @error="$event.target.src = '/brand/jabel-icon.png'" />
                          <div class="p-mini-info">
                            <span class="p-mini-name">{{ item.name || '—' }}</span>
                            <span class="p-mini-price"><PriceText :value="item.unit_price || item.price || 0" :currency="currency" /></span>
                            <span v-if="getReturnMaxQuantity(item) < 1" class="p-mini-max is-empty">{{ t('profile.return_fully_requested') }}</span>
                            <span v-else class="p-mini-max">{{ t('profile.return_max_quantity', { max: getReturnMaxQuantity(item) }) }}</span>
                          </div>
                        </div>
                        <div v-if="getSelectedReturnLine(item)" class="return-item-controls" @click.stop>
                          <div class="return-control-field">
                            <label :for="`return-qty-${getReturnItemKey(item)}`">{{ t('profile.return_quantity') }}</label>
                            <input
                              :id="`return-qty-${getReturnItemKey(item)}`"
                              class="return-quantity-input"
                              type="number"
                              min="1"
                              :max="getReturnMaxQuantity(item)"
                              :value="getSelectedReturnLine(item).quantity"
                              @input="updateReturnQuantity(item, $event)"
                            />
                            <small>{{ t('profile.return_qty_range', { max: getReturnMaxQuantity(item) }) }}</small>
                          </div>
                          <div class="return-control-field">
                            <label :for="`return-cond-${getReturnItemKey(item)}`">{{ t('profile.return_condition') }}</label>
                            <select
                              :id="`return-cond-${getReturnItemKey(item)}`"
                              class="return-condition-select"
                              :value="getSelectedReturnLine(item).condition"
                              @change="updateReturnCondition(item, $event.target.value)"
                            >
                              <option value="unopened">{{ t('profile.condition_unopened') }}</option>
                              <option value="opened">{{ t('profile.condition_opened') }}</option>
                              <option value="damaged">{{ t('profile.condition_damaged') }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-actions mt-4">
                      <button class="save-btn" :disabled="!selectedReturnItems.length" @click="returnStep = 3">{{ t('common.next') }}</button>
                      <button class="cancel-btn" @click="returnStep = 1">{{ t('common.back') }}</button>
                    </div>
                  </div>

                  <!-- Step 3: Reason -->
                  <div class="form-group" v-if="returnStep === 3">
                    <label>{{ t('profile.return_reason') }}</label>
                    <textarea v-model="returnReason" rows="4" :placeholder="t('profile.return_reason_placeholder')" class="custom-textarea"></textarea>
                    <div class="char-count" :class="{ valid: returnReason.trim().length >= 10, invalid: returnReason && returnReason.trim().length < 10 }" v-if="returnReason">
                      {{ returnReason.trim().length }}/10 {{ t('profile.characters') }}
                    </div>
                    <div class="form-actions mt-4">
                      <button class="save-btn" :disabled="!returnReason || returnReason.trim().length < 10" @click="submitReturnRequest">{{ t('profile.send_request') }}</button>
                      <button class="cancel-btn" @click="returnStep = 2">{{ t('common.back') }}</button>
                    </div>
                  </div>
                </div>
             </div>

             <!-- Returns List -->
             <div class="returns-list" v-if="!showReturnForm">
                <div v-for="ret in returnsList" :key="ret.id" class="return-card">
                  <div class="ret-header">
                    <span class="ret-id">{{ t('profile.request') }} #{{ ret.returnNumber }}</span>
                    <span class="status-badge-v2" :class="ret.status">{{ formatReturnStatus(ret.status) }}</span>
                  </div>
                  <div class="ret-body">
                    <img :src="ret.productImage" class="ret-img" v-if="ret.productImage" />
                    <div class="ret-info">
                      <div class="ret-pname">{{ ret.productName }}</div>
                      <div class="ret-order">{{ t('profile.original_order') }}: {{ ret.orderNumber || ret.orderId || '—' }}</div>
                      <div v-if="ret.items?.length" class="ret-items-summary">
                        <span v-for="item in ret.items" :key="`${ret.id}-${item.orderItemId || item.id}`">
                          {{ item.productName }} × {{ item.quantity }} · {{ formatReturnCondition(item.condition) }}
                        </span>
                      </div>
                      <div class="ret-reason"><strong>{{ t('profile.reason') }}:</strong> {{ ret.reason }}</div>
                      <div class="ret-notes" v-if="ret.adminNotes"><strong>{{ t('profile.admin_note') }}:</strong> {{ ret.adminNotes }}</div>
                    </div>
                    <div class="ret-refund">
                      <span class="refund-label">{{ t('profile.amount') }}:</span>
                      <span class="refund-val"><PriceText :value="ret.refundAmount" :currency="currency" /></span>
                    </div>
                  </div>
                  <div class="ret-footer">
                    <span class="ret-date">{{ ret.date ? formatDate(ret.date) : '—' }}</span>
                  </div>
                </div>
                <div v-if="returnsList.length === 0" class="empty-state">{{ t('profile.no_previous_returns') }}</div>
             </div>
          </div>

          <!-- Notifications Tab (Figma left-content-area: exact pixel-perfect design) -->
          <div v-else-if="currentTab === 'notifications'" class="notifications-view-container">
            <div class="notifications-card">
              <!-- header -->
              <div class="notifications-header">
                <!-- الإشعارات on Right in RTL -->
                <h2 class="notifications-title">{{ t('profile.notifications') }}</h2>

                <!-- تحديد الكل كمقروء on Left in RTL -->
                <button
                  type="button"
                  class="btn-mark-all-read"
                  @click="markAllAsRead"
                >
                  {{ t('profile.mark_all_read') }}
                </button>
              </div>

              <!-- notifications-list -->
              <div class="notifications-list" v-if="notificationsList.length > 0">
                <div
                  v-for="notif in notificationsList"
                  :key="notif.id"
                  class="notification-item"
                  :class="{ unread: !notif.is_read }"
                  @click="markNotificationAsRead(notif)"
                >
                  <!-- Right in RTL: Dot + Message -->
                  <div class="notification-main-content">
                    <img v-if="!notif.is_read" :src="notificationDotIcon" class="notification-dot" alt="" aria-hidden="true" />
                    <span class="notification-title-text" :class="{ 'is-unread': !notif.is_read }">
                      {{ notif.title || notif.message }}
                    </span>
                  </div>

                  <!-- Left in RTL: Time -->
                  <span class="notification-time">
                    {{ notif.time || notif.date || (notif.created_at ? formatDate(notif.created_at) : '') }}
                  </span>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="notifications-empty">
                <i class="fas fa-bell-slash empty-icon"></i>
                <p>{{ t('profile.no_notifications') }}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>



    <!-- Change Password Modal (Figma modal-security exact pixel-perfect) -->
    <div v-if="showChangePasswordModal" class="modal-overlay change-password-modal-overlay" @click.self="closeChangePasswordModal">
      <div class="modal-security" role="dialog" aria-modal="true">
        <!-- modal-header -->
        <div class="modal-security-header">
          <!-- تغيير كلمة المرور on Right in RTL -->
          <h3 class="modal-security-title">{{ t('profile.change_password') }}</h3>

          <!-- close-btn on Left in RTL -->
          <button type="button" class="modal-security-close-btn" @click="closeChangePasswordModal" :aria-label="t('common.close')">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#161616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="2" y1="2" x2="12" y2="12"></line>
              <line x1="12" y1="2" x2="2" y2="12"></line>
            </svg>
          </button>
        </div>

        <!-- form-fields -->
        <form @submit.prevent="handleSavePassword" class="modal-security-form">
          <!-- field-كلمة المرور الحالية -->
          <div class="modal-field">
            <label class="modal-field-label" :class="{ 'has-error': passErrors.current }">{{ t('profile.current_password') }}</label>
            <div class="modal-input-wrapper" :class="{ 'has-error': passErrors.current }">
              <input
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="passForm.current_password"
                placeholder="••••••••"
                class="modal-input"
                required
              />
              <button type="button" class="modal-eye-btn" @click="showCurrentPassword = !showCurrentPassword" :aria-label="t('profile.toggle_password')">
                <PasswordEyeIcon v-if="showCurrentPassword" />
                <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.57943 11.571C5.44335 11.0866 4.45814 10.4145 3.65023 9.73485L2.10996 11.2751C1.9883 11.3968 1.82831 11.4585 1.66831 11.4585H1.66742C1.50742 11.4585 1.34743 11.3976 1.22577 11.2751C0.981602 11.031 0.981602 10.6352 1.22577 10.391L2.7285 8.88828C1.75823 7.91822 1.20211 7.09769 1.14624 7.01356C0.954573 6.72606 1.032 6.33853 1.3195 6.14686C1.607 5.9552 1.99453 6.0327 2.1862 6.3202C2.21786 6.36687 5.40118 11.0419 9.99951 11.0419C14.5978 11.0419 17.7812 6.36689 17.8129 6.31939C18.0046 6.03272 18.3929 5.9552 18.6795 6.14686C18.9662 6.33853 19.0437 6.72608 18.8529 7.01275C18.797 7.09684 18.2413 7.9167 17.2718 8.88622L18.7766 10.391C19.0208 10.6352 19.0208 11.031 18.7766 11.2751C18.655 11.3968 18.495 11.4585 18.335 11.4585H18.3341C18.1741 11.4585 18.0141 11.3976 17.8924 11.2751L16.3502 9.73289C15.5425 10.4125 14.5574 11.0847 13.4215 11.5694L14.2868 13.0116C14.4643 13.3074 14.3684 13.6916 14.0726 13.8691C13.9718 13.9291 13.861 13.9583 13.7518 13.9583C13.5393 13.9583 13.3326 13.85 13.2151 13.655L12.2164 11.9904C11.5208 12.1801 10.7803 12.2911 9.99951 12.2911C9.21947 12.2911 8.47965 12.1811 7.78474 11.9917L6.78681 13.655C6.66931 13.85 6.4626 13.9583 6.2501 13.9583C6.14094 13.9583 6.03014 13.9299 5.9293 13.8691C5.63347 13.6916 5.53761 13.3074 5.71511 13.0116L6.57943 11.571Z" />
                </svg>
              </button>
            </div>
            <span v-if="passErrors.current" class="modal-field-error">{{ passErrors.current }}</span>
          </div>

          <!-- field-كلمة المرور الجديدة -->
          <div class="modal-field">
            <label class="modal-field-label" :class="{ 'has-error': passErrors.new || (passForm.password && passForm.password.length < 8) }">{{ t('profile.new_password') }}</label>
            <div class="modal-input-wrapper" :class="{ 'has-error': passErrors.new || (passForm.password && passForm.password.length < 8) }">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="passForm.password"
                placeholder="••••••••"
                class="modal-input"
                required
              />
              <button type="button" class="modal-eye-btn" @click="showNewPassword = !showNewPassword" :aria-label="t('profile.toggle_password')">
                <PasswordEyeIcon v-if="showNewPassword" />
                <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.57943 11.571C5.44335 11.0866 4.45814 10.4145 3.65023 9.73485L2.10996 11.2751C1.9883 11.3968 1.82831 11.4585 1.66831 11.4585H1.66742C1.50742 11.4585 1.34743 11.3976 1.22577 11.2751C0.981602 11.031 0.981602 10.6352 1.22577 10.391L2.7285 8.88828C1.75823 7.91822 1.20211 7.09769 1.14624 7.01356C0.954573 6.72606 1.032 6.33853 1.3195 6.14686C1.607 5.9552 1.99453 6.0327 2.1862 6.3202C2.21786 6.36687 5.40118 11.0419 9.99951 11.0419C14.5978 11.0419 17.7812 6.36689 17.8129 6.31939C18.0046 6.03272 18.3929 5.9552 18.6795 6.14686C18.9662 6.33853 19.0437 6.72608 18.8529 7.01275C18.797 7.09684 18.2413 7.9167 17.2718 8.88622L18.7766 10.391C19.0208 10.6352 19.0208 11.031 18.7766 11.2751C18.655 11.3968 18.495 11.4585 18.335 11.4585H18.3341C18.1741 11.4585 18.0141 11.3976 17.8924 11.2751L16.3502 9.73289C15.5425 10.4125 14.5574 11.0847 13.4215 11.5694L14.2868 13.0116C14.4643 13.3074 14.3684 13.6916 14.0726 13.8691C13.9718 13.9291 13.861 13.9583 13.7518 13.9583C13.5393 13.9583 13.3326 13.85 13.2151 13.655L12.2164 11.9904C11.5208 12.1801 10.7803 12.2911 9.99951 12.2911C9.21947 12.2911 8.47965 12.1811 7.78474 11.9917L6.78681 13.655C6.66931 13.85 6.4626 13.9583 6.2501 13.9583C6.14094 13.9583 6.03014 13.9299 5.9293 13.8691C5.63347 13.6916 5.53761 13.3074 5.71511 13.0116L6.57943 11.571Z" />
                </svg>
              </button>
            </div>
            <span v-if="passErrors.new || (passForm.password && passForm.password.length < 8)" class="modal-field-error">
              {{ passErrors.new }}
            </span>
          </div>

          <!-- field-تأكيد كلمة المرور -->
          <div class="modal-field">
            <label class="modal-field-label" :class="{ 'has-error': passErrors.confirm || (passForm.password_confirmation && passForm.password_confirmation !== passForm.password) }">{{ t('profile.confirm_password') }}</label>
            <div class="modal-input-wrapper" :class="{ 'has-error': passErrors.confirm || (passForm.password_confirmation && passForm.password_confirmation !== passForm.password) }">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="passForm.password_confirmation"
                placeholder="••••••••"
                class="modal-input"
                required
              />
              <button type="button" class="modal-eye-btn" @click="showConfirmPassword = !showConfirmPassword" :aria-label="t('profile.toggle_password')">
                <PasswordEyeIcon v-if="showConfirmPassword" />
                <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.57943 11.571C5.44335 11.0866 4.45814 10.4145 3.65023 9.73485L2.10996 11.2751C1.9883 11.3968 1.82831 11.4585 1.66831 11.4585H1.66742C1.50742 11.4585 1.34743 11.3976 1.22577 11.2751C0.981602 11.031 0.981602 10.6352 1.22577 10.391L2.7285 8.88828C1.75823 7.91822 1.20211 7.09769 1.14624 7.01356C0.954573 6.72606 1.032 6.33853 1.3195 6.14686C1.607 5.9552 1.99453 6.0327 2.1862 6.3202C2.21786 6.36687 5.40118 11.0419 9.99951 11.0419C14.5978 11.0419 17.7812 6.36689 17.8129 6.31939C18.0046 6.03272 18.3929 5.9552 18.6795 6.14686C18.9662 6.33853 19.0437 6.72608 18.8529 7.01275C18.797 7.09684 18.2413 7.9167 17.2718 8.88622L18.7766 10.391C19.0208 10.6352 19.0208 11.031 18.7766 11.2751C18.655 11.3968 18.495 11.4585 18.335 11.4585H18.3341C18.1741 11.4585 18.0141 11.3976 17.8924 11.2751L16.3502 9.73289C15.5425 10.4125 14.5574 11.0847 13.4215 11.5694L14.2868 13.0116C14.4643 13.3074 14.3684 13.6916 14.0726 13.8691C13.9718 13.9291 13.861 13.9583 13.7518 13.9583C13.5393 13.9583 13.3326 13.85 13.2151 13.655L12.2164 11.9904C11.5208 12.1801 10.7803 12.2911 9.99951 12.2911C9.21947 12.2911 8.47965 12.1811 7.78474 11.9917L6.78681 13.655C6.66931 13.85 6.4626 13.9583 6.2501 13.9583C6.14094 13.9583 6.03014 13.9299 5.9293 13.8691C5.63347 13.6916 5.53761 13.3074 5.71511 13.0116L6.57943 11.571Z" />
                </svg>
              </button>
            </div>
            <span v-if="passErrors.confirm || (passForm.password_confirmation && passForm.password_confirmation !== passForm.password)" class="modal-field-error">
              {{ passErrors.confirm }}
            </span>
          </div>

          <!-- btn-save-password -->
          <button type="submit" class="btn-save-password" :disabled="loadingData">
            {{ loadingData ? t('profile.saving') : t('profile.save_password') }}
          </button>
        </form>
      </div>
    </div>

    <!-- Add / Edit Address Modal (shared with the checkout "add new address" tab) -->
    <AddressModal
      v-if="showAddressModal"
      :address="isEditAddress ? editingAddress : null"
      :existing-addresses="addressesList"
      :saving="loadingData"
      @close="closeAddressModal"
      @save="saveAddress"
    />

    <!-- Order Tracking Modal -->
    <div v-if="showOrderTrackingModal && activeModalOrder" class="modal-overlay" @click.self="showOrderTrackingModal = false">
      <div class="order-details-modal">
        <div class="modal-header-row">
          <div class="modal-order-title">
            <h3>{{ t('profile.track_order_path') }}</h3>
            <span class="modal-order-num">{{ activeModalOrder.orderNumber }}</span>
          </div>
          <button class="close-modal" @click="showOrderTrackingModal = false">&times;</button>
        </div>

        <div class="modal-body-content">
          <div class="tracking-timeline-v3">
            <div class="track-step" :class="{ active: isTrackingStepActive(activeModalOrder, 2) }">
              <div class="step-dot"><i class="fas fa-check"></i></div>
              <div class="step-details">
                <span class="step-title">{{ t('profile.order_confirmed_step') }}</span>
                <span class="step-time">{{ activeModalOrder.date || '—' }}</span>
              </div>
            </div>
            <div class="track-step" :class="{ active: isTrackingStepActive(activeModalOrder, 3) }">
              <div class="step-dot"><i class="fas fa-check"></i></div>
              <div class="step-details">
                <span class="step-title">{{ t('profile.preparing_packing') }}</span>
                <span class="step-time">{{ activeModalOrder.date || '—' }}</span>
              </div>
            </div>
            <div class="track-step" :class="{ active: isTrackingStepActive(activeModalOrder, 5) }">
              <div class="step-dot"><i class="fas fa-truck"></i></div>
              <div class="step-details">
                <span class="step-title">{{ t('profile.out_with_courier') }}</span>
                <span class="step-time">{{ t('profile.on_the_way_to_you') }}</span>
              </div>
            </div>
            <div class="track-step" :class="{ active: isTrackingStepActive(activeModalOrder, 6) }">
              <div class="step-dot"><i class="fas fa-home"></i></div>
              <div class="step-details">
                <span class="step-title">{{ t('profile.delivered_successfully') }}</span>
                <span class="step-time">{{ t('profile.selected_location') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-row">
          <button class="close-btn-secondary" @click="showOrderTrackingModal = false">{{ t('common.close') }}</button>
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="modal-overlay" @click.self="showRatingModal = false">
      <div class="rating-modal">
        <button class="close-modal" @click="showRatingModal = false">&times;</button>
        <h3 class="modal-title">{{ t('profile.rate_products') }}</h3>
        <p class="modal-desc">{{ t('profile.rating_desc') }}</p>

        <div class="rating-item-select" v-if="ratingOrder">
           <label>{{ t('profile.choose_product_to_rate') }}:</label>
           <div class="rating-prods-scroll">
              <div v-for="item in (ratingOrder.items || ratingOrder.products)" 
                   :key="item.id" 
                   class="r-item-card"
                   :class="{ active: ratingItem?.id === item.id }"
                   @click="ratingItem = item">
                <img :src="getImageUrl(item.image)" alt="">
                <span>{{ item.name }}</span>
              </div>
           </div>
        </div>

        <div class="stars-input">
          <i v-for="star in 5" :key="star" 
             class="fa-star" 
             :class="star <= ratingValue ? 'fas active' : 'far'"
             @click="ratingValue = star"></i>
        </div>

        <textarea v-model="ratingComment" :placeholder="t('profile.rating_placeholder')" rows="4"></textarea>

        <button class="submit-rating-btn" @click="submitRating" :disabled="loadingData">
          {{ loadingData ? t('profile.sending') : t('profile.submit_rating') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { openCouponFromLink } from '../../../store/couponDialog'
import notificationDotIcon from '../../../assets/profile/notification-dot.svg'
import { PROFILE_SIDEBAR_ITEMS, PROFILE_LOGOUT_ITEM } from '../constants/sidebarMenu'
import { formatPrice as formatPriceBase, formatPriceHtml } from '../../../utils/price'
import PriceText from '../../../components/PriceText.vue'
import PasswordEyeIcon from '../../../components/PasswordEyeIcon.vue'
import AddressModal from '../../../components/AddressModal.vue'
import PhoneCountryInput from '../../../components/PhoneCountryInput.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { authState, authActions } from '../../../store/auth'
import { useOffers } from '../../product/composables/useOffers'
import { useLocalized } from '../../../composables/useLocalized'
import { useSettings } from '../../../composables/useSettings'
import { useDialog } from '../../../composables/useDialog'
import { countries as phoneCountries, findCountryByCode, validatePhoneByCountry } from '../../../data/countries'
import { escapeHtml, sanitizeUrl } from '../../../utils/sanitize'
import { downloadElementAsPdf, invoiceFileName } from '../../../utils/invoicePdf'
import { getCustomerToken } from '../../../utils/customerSession'
import { useProfileStore } from '../store/profileStore'
import SelectedOptionsChips from '../../../components/SelectedOptionsChips.vue'
import { orderItemChoices, parseCancelReason, parseOrderOptions } from '../../../domain/order/orderOptions'
import { summaryRows } from '../../../domain/cart/summaryRows.js'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const { localized } = useLocalized()
const profileStore = useProfileStore()
const {
  loadingData,
  addressesList,
  ordersList,
  notificationsList,
  returnsList,
  countries,
  cities,
} = storeToRefs(profileStore)
const { getActiveOfferForProduct, calculateDiscountFromOffer, calculatePriceWithOffer, fetchOffers } = useOffers()
const { currency, fetchSettings } = useSettings()
const dialog = useDialog()

// Tabs Handling
const PROFILE_TABS = ['overview', 'orders', 'addresses', 'notifications', 'info', 'returns']
const currentTab = computed(() => (PROFILE_TABS.includes(route.query.tab) ? route.query.tab : 'overview'))
const currentTabBreadcrumbTitle = computed(() => {
  const isAr = locale.value === 'ar'
  switch (currentTab.value) {
    case 'orders':
      return isAr ? 'طلباتي' : 'My Orders'
    case 'addresses':
      return isAr ? 'العناوين' : 'Addresses'
    case 'notifications':
      return isAr ? 'الإشعارات' : 'Notifications'
    case 'info':
      return isAr ? 'معلوماتك الشخصية' : 'Personal Info'
    case 'returns':
      return isAr ? 'المرتجعات' : 'Returns'
    default:
      return ''
  }
})
const ordersTotalCount = computed(() => ordersList.value.length)
const notifCount = ref(0) // Default to 0, no longer hardcoded

const ORDER_STATUS_META = {
  pending: { get label() { return t('profile.os_pending') }, color: '#64748B', canTrack: true, rank: 1 },
  confirmed: { get label() { return t('profile.os_confirmed') }, color: '#2563EB', canTrack: true, rank: 2 },
  paid_confirmed: { get label() { return t('profile.os_paid_confirmed') }, color: '#2563EB', canTrack: true, rank: 2 },
  processing: { get label() { return t('profile.os_processing') }, color: '#F59E0B', canTrack: true, rank: 3 },
  shipped: { get label() { return t('profile.os_shipped') }, color: '#F59E0B', canTrack: true, rank: 4 },
  in_transit: { get label() { return t('profile.os_in_transit') }, color: '#F59E0B', canTrack: true, rank: 5 },
  shipping: { get label() { return t('profile.os_shipping') }, color: '#F59E0B', canTrack: true, rank: 5 },
  delivering: { get label() { return t('profile.os_shipping') }, color: '#F59E0B', canTrack: true, rank: 5 },
  in_delivery: { get label() { return t('profile.os_shipping') }, color: '#F59E0B', canTrack: true, rank: 5 },
  delivered: { get label() { return t('profile.os_completed') }, color: '#10B981', canTrack: false, rank: 6 },
  completed: { get label() { return t('profile.os_completed') }, color: '#10B981', canTrack: false, rank: 6 },
  cancelled: { get label() { return t('profile.os_cancelled') }, color: '#EF4444', canTrack: false, rank: 0 },
  failed: { get label() { return t('profile.os_failed') }, color: '#EF4444', canTrack: false, rank: 0 },
  returned: { get label() { return t('profile.os_returned') }, color: '#8B5CF6', canTrack: false, rank: 0 },
  refunded: { get label() { return t('profile.os_refunded') }, color: '#8B5CF6', canTrack: false, rank: 0 },
}

const DEFAULT_ORDER_STATUS = ORDER_STATUS_META.pending

const totalOrdersCountText = computed(() => {
  const count = ordersTotalCount.value
  return `${count} ${count === 1 ? t('profile.orders_count_one') : t('profile.orders_count_many')}`
})

const addressesCountText = computed(() => {
  if (addressesList.value.length > 0) {
    return addressesList.value.length === 1 ? t('profile.addresses_count_one') : t('profile.addresses_count_many', { n: addressesList.value.length })
  }
  return t('profile.addresses_count_none')
})

const formatDateArabic = (date) => {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString(locale.value === 'ar' ? 'ar-SA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatStatusLabel = (s) => {
  const status = String(s || 'pending').toLowerCase()
  return ORDER_STATUS_META[status]?.label || status
}

const recentOrders = computed(() => {
  if (ordersList.value && ordersList.value.length > 0) {
    return ordersList.value.slice(0, 5).map(o => {
      const st = o.status || 'processing'
      const isComplete = ['delivered', 'completed'].includes(st)
      const isCancel = ['cancelled'].includes(st)
      return {
        id: o.id,
        orderNumber: o.orderNumber || o.order_number || ('#MG-' + o.id),
        date: o.date || formatDateArabic(o.created_at),
        total: formatPrice(o.total_amount || o.total || 0),
        statusLabel: formatStatusLabel(st),
        statusType: isComplete ? 'status-completed' : (isCancel ? 'status-cancelled' : 'status-delivering'),
        raw: o
      }
    })
  }
  return []
})

const viewOrderDetails = (order) => {
  if (order && order.id && !expandedOrders.value.includes(order.id)) {
    expandedOrders.value.push(order.id)
  }
  router.push({ path: '/profile', query: { tab: 'orders' } })
}

// Form State
const form = reactive({ name: '', email: '', phone: '', country: 'SA', rawCountryCode: 'SA' })
const showPasswordForm = ref(false)
const showChangePasswordModal = ref(false)
const isEditingProfile = ref(false)
const passForm = reactive({ current_password: '', password: '', password_confirmation: '' })
const passErrors = reactive({ current: '', new: '', confirm: '' })
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const displayUserName = computed(() => form.name || authState.user?.name || authState.user?.full_name || '')
const displayUserEmail = computed(() => form.email || authState.user?.email || '')
const displayUserPhone = computed(() => form.phone || authState.user?.phone || authState.user?.phone_number || '')

// Phone edit state: country selector (flag + dial code) and the national number
const phoneCountry = ref('SA')
const phoneLocal = ref('')
const phoneError = ref('')

// Split a stored phone ("+9665…", "009665…", "05…") into a country code and the national number
const splitPhone = (phone, fallbackCountry) => {
  const fallback = findCountryByCode(fallbackCountry)
  const raw = String(phone || '').trim()
  let digits = raw.replace(/\D/g, '')
  if (!digits) return { country: fallback.code, national: '' }

  const isInternational = raw.startsWith('+') || digits.startsWith('00')
  if (digits.startsWith('00')) digits = digits.slice(2)

  const dialDigits = (c) => c.dialCode.replace('+', '')
  const matches = (c) => digits.startsWith(dialDigits(c)) && digits.length > dialDigits(c).length
  // Without a leading "+" / "00" only trust a dial-code prefix when the number is clearly too long to be local
  const looksInternational = isInternational || (matches(fallback) && digits.length >= dialDigits(fallback).length + 7)
  if (!looksInternational) return { country: fallback.code, national: digits }

  // Prefer the user's own country (+1 is shared by several), then the longest matching dial code
  const candidates = phoneCountries.filter(matches).sort((a, b) => dialDigits(b).length - dialDigits(a).length)
  const match = (matches(fallback) ? fallback : candidates[0]) || fallback
  return { country: match.code, national: digits.slice(dialDigits(match).length) }
}

// "+<dial code><national number>" with any leading trunk zero removed
const joinPhone = (countryCode, national) => {
  const country = findCountryByCode(countryCode)
  const dial = country.dialCode.replace('+', '')
  let digits = String(national || '').replace(/\D/g, '')
  if (digits.startsWith('00' + dial)) digits = digits.slice(2 + dial.length)
  else if (digits.startsWith(dial) && digits.length > dial.length + 6) digits = digits.slice(dial.length)
  return country.dialCode + digits.replace(/^0+/, '')
}

const startEditingProfile = () => {
  if (!form.name) form.name = displayUserName.value
  if (!form.email) form.email = displayUserEmail.value
  if (!form.phone) form.phone = displayUserPhone.value
  const parts = splitPhone(form.phone, form.rawCountryCode)
  phoneCountry.value = parts.country
  phoneLocal.value = parts.national
  phoneError.value = ''
  showPasswordForm.value = false
  isEditingProfile.value = true
}

const cancelEditingProfile = () => {
  isEditingProfile.value = false
}

const openChangePasswordModal = () => {
  Object.assign(passForm, { current_password: '', password: '', password_confirmation: '' })
  Object.assign(passErrors, { current: '', new: '', confirm: '' })
  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
  showChangePasswordModal.value = true
}

const closeChangePasswordModal = () => {
  showChangePasswordModal.value = false
  Object.assign(passForm, { current_password: '', password: '', password_confirmation: '' })
  Object.assign(passErrors, { current: '', new: '', confirm: '' })
}

const handleSavePassword = async () => {
  passErrors.current = ''
  passErrors.new = ''
  passErrors.confirm = ''

  if (!passForm.current_password) {
    passErrors.current = t('profile.pw_current_required')
  }
  if (!passForm.password || passForm.password.length < 8) {
    passErrors.new = t('profile.pw_min_length')
  }
  if (!passForm.password_confirmation || passForm.password_confirmation !== passForm.password) {
    passErrors.confirm = t('profile.pw_mismatch')
  }

  if (passErrors.current || passErrors.new || passErrors.confirm) {
    return
  }

  loadingData.value = true
  try {
    await profileStore.changePassword({
      current_password: passForm.current_password,
      password: passForm.password,
      password_confirmation: passForm.password_confirmation
    })
    dialog.alert(t('profile.pw_saved'), { type: 'success', title: t('profile.change_password') })
    closeChangePasswordModal()
  } catch (err) {
    const msg = err.response?.data?.message || err.message || t('profile.pw_save_failed')
    if (msg.toLowerCase().includes('current') || msg.includes('حالية')) {
      passErrors.current = msg
    } else {
      passErrors.new = msg
    }
  } finally {
    loadingData.value = false
  }
}

const handleUpdateProfile = async () => {
  phoneError.value = validatePhoneByCountry(phoneLocal.value, phoneCountry.value, 'ar') || ''
  if (phoneError.value) return
  form.phone = joinPhone(phoneCountry.value, phoneLocal.value)
  await updateProfile()
  isEditingProfile.value = false
}

// Country Localization
const userCountryObj = computed(() => {
  const code = form.rawCountryCode || authState.user?.country || 'SA';
  return findCountryByCode(code);
});

const localizedCountryName = computed(() => {
  if (userCountryObj.value) {
    return locale.value === 'ar' ? userCountryObj.value.nameAr : userCountryObj.value.nameEn;
  }
  return form.country || (locale.value === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia');
});

const selectDefaultAddress = async (addr) => {
  addressesList.value.forEach(a => {
    a.is_default = (a.id === addr.id)
  })
  try {
    if (authState.token) {
      await profileStore.setDefaultAddress(addr.id)
    }
  } catch (e) {
    console.error('Failed to update default address:', e)
  }
}
const orderTab = ref('current')
const expandedOrders = ref([])

const markAllAsRead = async () => {
  await profileStore.markAllNotificationsRead()
  notifCount.value = profileStore.notificationCount
}

const markNotificationAsRead = async (notif) => {
  await profileStore.markNotificationRead(notif)
  notifCount.value = profileStore.notificationCount
  // An order notification opens the orders list, a product / offer one opens that page.
  if (notif?.link && openCouponFromLink(notif.link)) return
  if (notif?.link && notif.link !== route.fullPath) router.push(notif.link).catch(() => {})
}

const showReturnForm = ref(false)
const returnStep = ref(1)
const selectedOrderForReturn = ref(null)
const selectedReturnItems = ref([])
const returnReason = ref('')

const getReturnItemKey = (item) => String(item?.order_item_id || item?.orderItemId || item?.id || '')

// Quantity of this order line already covered by a pending/approved/refunded return,
// read from the customer's returns so the same units cannot be returned twice.
const getReturnedQuantity = (item) => {
  const key = getReturnItemKey(item)
  const orderId = String(selectedOrderForReturn.value?.id ?? '')
  if (!key || !orderId) return 0
  return (returnsList.value || [])
    .filter((ret) => String(ret.orderId ?? '') === orderId && ret.status !== 'rejected')
    .flatMap((ret) => ret.items || [])
    .filter((line) => String(line.orderItemId ?? line.id ?? '') === key)
    .reduce((total, line) => total + (Number(line.quantity) || 0), 0)
}

const getReturnMaxQuantity = (item) => {
  const explicit = Number(item?.returnable_quantity ?? item?.available_quantity)
  if (Number.isFinite(explicit)) return Math.max(0, explicit)
  return Math.max(0, (Number(item?.quantity) || 0) - getReturnedQuantity(item))
}

const getSelectedReturnLine = (item) => selectedReturnItems.value.find(
  (line) => line.key === getReturnItemKey(item),
)

const isReturnItemSelected = (item) => Boolean(getSelectedReturnLine(item))

const selectedReturnTotalQuantity = computed(() => selectedReturnItems.value.reduce(
  (total, line) => total + Number(line.quantity || 0),
  0,
))

const toggleReturnItem = (item) => {
  const key = getReturnItemKey(item)
  if (!key || getReturnMaxQuantity(item) < 1) return
  const existingIndex = selectedReturnItems.value.findIndex((line) => line.key === key)
  if (existingIndex >= 0) {
    selectedReturnItems.value.splice(existingIndex, 1)
    return
  }
  selectedReturnItems.value.push({
    key,
    item,
    quantity: 1,
    condition: 'opened',
  })
}

const updateReturnQuantity = (item, eventOrValue) => {
  const line = getSelectedReturnLine(item)
  if (!line) return
  const max = Math.max(1, getReturnMaxQuantity(item))
  const value = eventOrValue?.target ? eventOrValue.target.value : eventOrValue
  const next = Math.floor(Number(value) || 1)
  line.quantity = Math.min(max, Math.max(1, next))
  if (eventOrValue?.target) eventOrValue.target.value = String(line.quantity)
}

const updateReturnCondition = (item, value) => {
  const line = getSelectedReturnLine(item)
  if (line) line.condition = value || 'opened'
}

const resetReturnItemSelection = () => {
  selectedReturnItems.value = []
}

// Addresses Logic
const showAddAddress = ref(false)
const showAddressModal = ref(false)
const isEditAddress = ref(false)
const editingAddressId = ref(null)
const editingAddress = computed(() => addressesList.value.find((a) => a.id === editingAddressId.value) || null)

// Orders Tab State & Logic (matching Figma left-content-area)
const orderStatusFilter = ref('all') // 'all', 'processing', 'completed', 'cancelled'
const orderSearchQuery = ref('')
const orderCurrentPage = ref(1)
const orderPerPage = 3
const showOrderDetailsModal = ref(false)
const showOrderTrackingModal = ref(false)
const activeModalOrder = ref(null)
const selectedOrderDetails = ref(null)
// An order's shipping and discount lines are shown only when they cost something.
const orderSummaryRows = computed(() => summaryRows({
  discount: selectedOrderDetails.value?.discount,
  shipping: selectedOrderDetails.value?.shipping,
}))
const isViewingInvoiceDetails = ref(false)

const getOrderStatusMeta = (status) => {
  const normalized = String(status || 'pending').toLowerCase()
  return ORDER_STATUS_META[normalized] || DEFAULT_ORDER_STATUS
}

const isTrackingStepActive = (order, step) => {
  return getTrackingRank(order) >= step
}

const trackingSteps = [
  { key: 'received', rank: 1, get label() { return t('profile.ts_received') }, icon: 'fas fa-inbox', dateField: 'created_at' },
  { key: 'confirmed', rank: 2, get label() { return t('profile.os_confirmed') }, icon: 'fas fa-clipboard-check', dateField: 'paymentTime' },
  { key: 'processing', rank: 3, get label() { return t('profile.ts_processing') }, icon: 'fas fa-box-open', dateField: 'updatedAt' },
  { key: 'shipped', rank: 4, get label() { return t('profile.ts_shipped') }, icon: 'fas fa-box', dateField: 'shippedAt' },
  { key: 'transit', rank: 5, get label() { return t('profile.os_in_transit') }, icon: 'fas fa-truck', dateField: 'shippedAt', get note() { return t('profile.ts_transit_note') } },
  { key: 'delivered', rank: 6, get label() { return t('profile.ts_delivered') }, icon: 'fas fa-house', dateField: 'deliveredAt' },
]

const getTrackingStepState = (order, step) => {
  const rank = getTrackingRank(order)
  if (rank >= step) return rank === step ? 'active' : 'completed'
  return 'pending'
}

const getTrackingStepIcon = (step, state) => state === 'pending' ? step.icon : 'fas fa-check'

const getTrackingRank = (order) => {
  const status = String(order?.status || 'pending').toLowerCase()
  const statusRank = ORDER_STATUS_META[status]?.rank || 0
  if (statusRank > 0) return statusRank
  if (order?.deliveredAt) return 6
  if (order?.shippedAt) return 4
  return order?.created_at || order?.date ? 1 : 0
}

const getTrackingStepTime = (order, step) => {
  const definition = trackingSteps.find((item) => item.rank === step)
  if (!definition || getTrackingStepState(order, step) === 'pending') return t('profile.ts_not_started')

  const rank = getTrackingRank(order)
  const rawDate = order?.[definition.dateField]
    || (step === 1 ? order?.date : null)
    || (rank >= step ? order?.updatedAt : null)
  return formatDateArabic(rawDate) || order?.date || '—'
}

const formatProductsCount = (count) => {
  if (count === 1) return t('profile.items_count_one')
  if (count === 2) return t('profile.items_count_two')
  if (count >= 3 && count <= 10) return t('profile.items_count_few', { n: count })
  return t('profile.items_count_many', { n: count })
}

const allOrdersMapped = computed(() => {
  if (ordersList.value && ordersList.value.length > 0) {
    return ordersList.value.map(o => {
      const meta = getOrderStatusMeta(o.status)
      const items = o.items || o.products || []
      const count = items.length || 1
      const optionEntries = parseOrderOptions(o.notes)
      const mappedItems = items.map(item => ({
        ...item,
        choices: orderItemChoices(item, optionEntries, locale.value),
        name: item.name || item.product?.name || t('profile.product_fallback'),
        unitPrice: formatPrice(item.price || item.unit_price || 0),
        totalPrice: formatPrice(item.total || item.total_price || (Number(item.price || item.unit_price || 0) * (item.quantity || 1))),
      }))
      return {
        id: o.id,
        orderNumber: o.orderNumber || o.order_number || ('#MG-' + o.id),
        date: o.date || formatDateArabic(o.created_at) || '—',
        status: o.status,
        statusLabel: meta.label,
        statusColor: meta.color,
        productsCount: count,
        productsCountText: formatProductsCount(count),
        subtitle: t('profile.shipping_warranty_included'),
        total: formatPrice(o.total_amount || o.total || 0),
        canTrack: meta.canTrack,
        items: mappedItems,
        recipientName: authState.user?.name || '',
        phone: authState.user?.phone_number || authState.user?.phone || '',
        address: o.shipping_address || '',
        paymentMethod: o.payment_method === 'cash_on_delivery'
          ? t('invoice.payment_cod')
          : (o.payment_method || ''),
        paymentTime: o.payment_time,
        shippedAt: o.shipped_at,
        deliveredAt: o.delivered_at,
        estimatedDelivery: o.estimated_delivery,
        updatedAt: o.updated_at,
        created_at: o.created_at,
        subtotal: formatPrice(o.subtotal || 0),
        tax: formatPrice(o.tax || 0),
        shipping: formatPrice(o.shipping || 0),
        discount: formatPrice(o.discount || 0),
        // The API keeps no cancellation field, so the dashboard also writes the reason into the notes.
        cancellationReason: String(o.cancellation_reason || o.cancel_reason || parseCancelReason(o.notes) || '').trim(),
        raw: o
      }
    })
  }
  return []
})

const filteredOrders = computed(() => {
  return allOrdersMapped.value.filter(order => {
    // Filter by status tab
    const s = (order.status || '').toLowerCase()
    if (orderStatusFilter.value === 'processing') {
      if (['completed', 'delivered', 'cancelled'].includes(s)) return false
    } else if (orderStatusFilter.value === 'completed') {
      if (!['completed', 'delivered'].includes(s)) return false
    } else if (orderStatusFilter.value === 'cancelled') {
      if (s !== 'cancelled') return false
    }

    // Filter by search query
    if (orderSearchQuery.value && orderSearchQuery.value.trim()) {
      const q = orderSearchQuery.value.trim().toLowerCase()
      if (!String(order.orderNumber || '').toLowerCase().includes(q)) return false
    }

    return true
  })
})

const totalOrderPages = computed(() => Math.ceil(filteredOrders.value.length / orderPerPage) || 1)

const paginatedOrders = computed(() => {
  const start = (orderCurrentPage.value - 1) * orderPerPage
  return filteredOrders.value.slice(start, start + orderPerPage)
})

const openOrderInvoiceModal = (order) => {
  openOrderDetails(order)
  activeModalOrder.value = selectedOrderDetails.value || order
  isViewingInvoiceDetails.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openTrackingModal = (order) => {
  activeModalOrder.value = order
  showOrderTrackingModal.value = true
}

const openOrderDetails = (order) => {
  if (!order) return
  selectedOrderDetails.value = order
  isViewingInvoiceDetails.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const returnToOrdersList = () => {
  selectedOrderDetails.value = null
  isViewingInvoiceDetails.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openInvoiceFromDetails = () => {
  if (selectedOrderDetails.value) {
    activeModalOrder.value = selectedOrderDetails.value
    isViewingInvoiceDetails.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const closeInvoiceDetails = () => {
  isViewingInvoiceDetails.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getInvoiceNumber = (order) => {
  if (!order) return ''
  if (order.invoiceNumber) return order.invoiceNumber
  if (order.orderNumber) {
    return order.orderNumber.replace('#MS-', 'INV-').replace('#MG-', 'INV-')
  }
  return ''
}

const getCustomerName = (order) => {
  if (!order) return authState.user?.name || ''
  return order.recipientName || order.customerName || (order.shippingAddress && order.shippingAddress.fullName) || authState.user?.name || ''
}

const getCustomerPhone = (order) => {
  if (!order) return authState.user?.phone_number || authState.user?.phone || ''
  return order.phone || order.customerPhone || (order.shippingAddress && order.shippingAddress.phone) || authState.user?.phone_number || authState.user?.phone || ''
}

const getCustomerEmail = (order) => {
  if (!order) return authState.user?.email || ''
  return order.email || order.customerEmail || authState.user?.email || ''
}

const getDeliveryStreet = (order) => {
  if (!order) return ''
  if (order.address) {
    if (!order.address.includes('12345') && order.postalCode) {
      return `${order.address} ${order.postalCode}`
    }
    return order.address
  }
  if (order.shippingAddress) {
    const parts = [
      order.shippingAddress.street,
      order.shippingAddress.district,
      order.shippingAddress.city,
      order.shippingAddress.postalCode
    ].filter(Boolean)
    if (parts.length > 0) return parts.join('، ')
  }
  return ''
}

const getDeliveryCountry = (order) => {
  if (!order) return ''
  if (order.shippingAddress && order.shippingAddress.country) {
    const c = order.shippingAddress.country
    return (c === 'SA' || c === 'SAUDI ARABIA') ? t('profile.country_saudi') : c
  }
  return ''
}

// "اللون: ستانلس، الحجم: 90 سم" for each chosen combination (×quantity when there are several), as plain text so it prints.
const invoiceChoiceLines = (item) => {
  const choices = Array.isArray(item.choices) ? item.choices : []
  const separator = locale.value === 'ar' ? '، ' : ', '
  return choices.map((choice) => {
    const text = (choice.options || []).map((option) => `${option.group}: ${option.name}`).join(separator)
    return choices.length > 1 ? `${text} (×${choice.quantity})` : text
  }).filter(Boolean)
}

// The product name in the invoice language (the order's own item name can be a snapshot in another language).
const invoiceProductName = (item) => item.product?.translations?.[locale.value]?.name
  || localized(item.product, 'name')
  || item.name
  || ''

const getInvoiceProducts = (order) => {
  if (!order) return []
  const items = order.items || (order.raw && (order.raw.items || order.raw.products)) || []
  if (items.length > 0) {
    return items.map(item => ({
      name: invoiceProductName(item) || t('profile.product_fallback_brand'),
      choiceLines: invoiceChoiceLines(item),
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || (Number(item.price || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalPrice: item.totalPrice || ((Number(item.price || 0) * (item.quantity || 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }))
  }
  return []
}

// Printing and the PDF both use the invoice card only (#printable-invoice-card), never the whole page.
const printInvoiceCard = () => {
  window.print()
}

const downloadingInvoice = ref(false)
const downloadInvoicePdf = async () => {
  if (downloadingInvoice.value) return
  downloadingInvoice.value = true
  try {
    const order = activeModalOrder.value || selectedOrderDetails.value
    await downloadElementAsPdf(document.getElementById('printable-invoice-card'), invoiceFileName(getInvoiceNumber(order) || order?.orderNumber))
  } catch (err) {
    dialog.alert(t('profile.invoice_pdf_failed'), { type: 'error', title: t('profile.download_invoice') })
  } finally {
    downloadingInvoice.value = false
  }
}

// Backward compatibility for existing references
const displayedOrders = computed(() => paginatedOrders.value)

const formatPhoneWithCountryCode = (phone, country) => {
  if (!phone) return '';
  const cleaned = phone.replace(/[-\s+()]/g, '');
  
  const c = (country || '').toUpperCase();
  
  if (c === 'JO' || c === 'JORDAN') {
    if (cleaned.startsWith('00962')) {
      return '+' + cleaned.substring(2);
    }
    if (cleaned.startsWith('962')) {
      return '+' + cleaned;
    }
    if (cleaned.startsWith('07') && cleaned.length === 10) {
      return '+962' + cleaned.substring(1);
    }
    if (cleaned.startsWith('7') && cleaned.length === 9) {
      return '+962' + cleaned;
    }
  }
  
  if (c === 'SA' || c === 'SAUDI ARABIA') {
    if (cleaned.startsWith('00966')) {
      return '+' + cleaned.substring(2);
    }
    if (cleaned.startsWith('966')) {
      return '+' + cleaned;
    }
    if (cleaned.startsWith('05') && cleaned.length === 10) {
      return '+966' + cleaned.substring(1);
    }
    if (cleaned.startsWith('5') && cleaned.length === 9) {
      return '+966' + cleaned;
    }
  }
  
  if (c === 'KW' || c === 'KUWAIT') {
    if (cleaned.startsWith('00965')) {
      return '+' + cleaned.substring(2);
    }
    if (cleaned.startsWith('965')) {
      return '+' + cleaned;
    }
    if (cleaned.length === 8) {
      return '+965' + cleaned;
    }
  }
  
  return phone;
};

// SYNC FORM WITH STORE
watch(() => authState.user, (u) => {
  if (u) {
    form.name = u.name || u.full_name || ''
    form.email = u.email || ''
    
    // Map country code to uppercase capital country name
    const countryMap = {
      'JO': 'JORDAN',
      'SA': 'SAUDI ARABIA',
      'KW': 'KUWAIT',
      'AE': 'UAE',
      'QA': 'QATAR',
      'BH': 'BAHRAIN',
      'OM': 'OMAN',
      'EG': 'EGYPT'
    }
    const rawCountry = u.country || 'SA'
    form.rawCountryCode = rawCountry
    form.country = (countryMap[rawCountry.toUpperCase()] || rawCountry).toUpperCase()
    
    // Format phone with country code prefix
    form.phone = formatPhoneWithCountryCode(u.phone || u.phone_number || '', rawCountry)
  }
}, { immediate: true })

const fetchData = async () => {
  if (!authState.token && !getCustomerToken()) return router.push('/')
  const user = await profileStore.load({
    localized,
    formatDate,
  })
  if (user) authState.user = user
  notifCount.value = profileStore.notificationCount
}

onMounted(async () => {
  if (!authState.token && !getCustomerToken()) {
    router.replace({ path: '/', query: { openAuth: 'true' } })
    return
  }
  fetchSettings()
  await fetchData()
  fetchOffers()
  if (currentTab.value === 'orders' && (route.query.details === 'true' || route.query.orderId)) {
    const match = allOrdersMapped.value.find(o => o.id == route.query.orderId || o.orderNumber == route.query.orderId)
    if (match) openOrderDetails(match)
    if (route.query.invoice === 'true' || route.query.invoice === '1') {
      if (match) openInvoiceFromDetails()
    }
  } else if (route.query.invoice === 'true' || route.query.invoice === '1') {
    const firstOrder = allOrdersMapped.value[0]
    if (firstOrder) {
      openOrderDetails(firstOrder)
      openInvoiceFromDetails()
    }
  }
  if (route.query.changePassword === 'true' || route.query.changePassword === '1') {
    openChangePasswordModal()
  }
  if (route.query.addAddress === 'true' || route.query.addAddress === '1') {
    openAddAddress()
  } else if (route.query.editAddress === 'true' || route.query.editAddress === '1') {
    editAddress(addressesList.value[0])
  }
})

// RE-FETCH ON TAB CHANGE OR URL CHANGE
watch(() => route.query.tab, (newTab) => {
  if (!authState.token && !getCustomerToken()) {
    router.replace({ path: '/', query: { openAuth: 'true' } })
    return
  }
  if (newTab !== 'orders') {
    selectedOrderDetails.value = null
    isViewingInvoiceDetails.value = false
  } else if (route.query.details === 'true') {
    const firstOrder = allOrdersMapped.value[0]
    if (firstOrder) openOrderDetails(firstOrder)
  }
  fetchData()
})

// Actions
const updateProfile = async () => {
  loadingData.value = true
  try {
    const payload = { ...form }
    
    // Map capitalized country name back to code if necessary
    const countryReverseMap = {
      'jordan': 'JO',
      'saudi arabia': 'SA',
      'kuwait': 'KW'
    }
    const countryLower = (payload.country || '').trim().toLowerCase()
    payload.country = countryReverseMap[countryLower] || payload.country
    
    const updatedUser = await profileStore.updateProfile(payload)
    authState.user = updatedUser
    dialog.alert(t('profile.update_success'), { type: 'success', title: t('profile.personal_info') })
  } catch (err) {
    dialog.alert(err.response?.data?.message || t('profile.update_failed'), { type: 'error', title: t('profile.personal_info') })
  } finally {
    loadingData.value = false
  }
}

const changePassword = async () => {
  loadingData.value = true
  try {
    await profileStore.changePassword(passForm)
    dialog.alert(t('profile.password_changed'), { type: 'success', title: t('profile.change_password') })
    showPasswordForm.value = false
    Object.assign(passForm, { password: '', password_confirmation: '' })
  } catch (err) {
    dialog.alert(err.response?.data?.message || t('profile.password_change_failed'), { type: 'error', title: t('profile.change_password') })
  } finally {
    loadingData.value = false
  }
}

const openAddAddress = () => {
  isEditAddress.value = false
  editingAddressId.value = null
  showAddressModal.value = true
}

const editAddress = (addr) => {
  isEditAddress.value = true
  editingAddressId.value = addr.id
  showAddressModal.value = true
}

const closeAddressModal = () => {
  showAddressModal.value = false
}

// The dialog collects the address; saving it (locally and on the API) happens here.
const saveAddress = async (payload) => {
  loadingData.value = true
  try {
    if (payload.is_default) {
      addressesList.value.forEach(a => a.is_default = false)
    }

    if (isEditAddress.value && editingAddressId.value) {
      const idx = addressesList.value.findIndex(a => a.id === editingAddressId.value)
      if (idx !== -1) {
        addressesList.value[idx] = {
          ...addressesList.value[idx],
          ...payload
        }
      }
      if (authState.token) {
        try {
          await profileStore.updateAddress(editingAddressId.value, payload)
        } catch (e) {
          console.warn('API update address error:', e)
        }
      }
    } else {
      const newId = Date.now()
      const newAddr = {
        id: newId,
        ...payload
      }
      if (payload.is_default) {
        addressesList.value.unshift(newAddr)
      } else {
        addressesList.value.push(newAddr)
      }
      if (authState.token) {
        try {
          await profileStore.createAddress(payload)
        } catch (e) {
          console.warn('API create address error:', e)
        }
      }
    }

    showAddressModal.value = false
  } catch (err) {
    dialog.alert(err.response?.data?.message || t('profile.address_save_failed'), { type: 'error', title: t('profile.addresses') })
  } finally {
    loadingData.value = false
  }
}

const deleteAddress = async (id) => {
  if (!confirm(t('profile.delete_address_confirm'))) return
  try {
    if (authState.token) await profileStore.deleteAddress(id)
  } catch (err) {
    console.warn('API delete address error:', err)
  }
  addressesList.value = addressesList.value.filter(a => a.id !== id)
}

const toggleOrder = (id) => {
  const i = expandedOrders.value.indexOf(id)
  if (i > -1) expandedOrders.value.splice(i, 1)
  else expandedOrders.value.push(id)
}

const handleLogout = () => authActions.logout()
const formatDate = (date) => new Date(date).toLocaleDateString(locale.value === 'ar' ? 'ar-JO' : 'en-US')
const formatPrice = (price) => formatPriceBase(price, { fraction: 'fixed' })
const formatStatus = (s) => ({
  pending: t('profile.status_pending'),
  processing: t('profile.status_processing'),
  shipped: t('profile.status_shipped'),
  delivered: t('profile.status_delivered'),
  cancelled: t('profile.status_cancelled'),
  completed: t('profile.status_delivered')
}[s] || s)

const getPaymentLabel = (method) => {
  if (!method) return t('checkout.payment_methods.cash_on_delivery');
  const m = method.toString().toLowerCase().trim();
  if (m === 'card' || m === 'paytabs' || m === 'credit_card') return t('checkout.card');
  if (m === 'wallet') return t('checkout.payment_methods.wallet');
  if (m === 'cod' || m === 'cash') return t('checkout.payment_methods.cash_on_delivery');
  return method;
};

const formatReturnStatus = (s) => ({
  pending: t('profile.return_status_pending'),
  processing: t('profile.return_status_processing'),
  approved: t('profile.return_status_approved'),
  rejected: t('profile.return_status_rejected'),
  refunded: t('profile.return_status_refunded')
}[s] || s)

const formatReturnCondition = (condition) => ({
  unopened: t('profile.condition_unopened'),
  opened: t('profile.condition_opened'),
  damaged: t('profile.condition_damaged'),
}[String(condition || '').toLowerCase()] || condition || '—')

const openReturnForm = () => {
  showReturnForm.value = true
  returnStep.value = 1
  selectedOrderForReturn.value = null
  resetReturnItemSelection()
  returnReason.value = ''
}

const submitReturnRequest = async () => {
  if (!selectedOrderForReturn.value || !selectedReturnItems.value.length) return
  loadingData.value = true
  try {
    const res = await profileStore.createReturn({
      order_id: selectedOrderForReturn.value.id,
      reason: returnReason.value.trim(),
      items: selectedReturnItems.value.map(({ item, quantity, condition }) => ({
        order_item_id: item.order_item_id || item.orderItemId || item.id,
        quantity: Math.min(Math.max(1, getReturnMaxQuantity(item)), Math.max(1, Math.floor(Number(quantity) || 1))),
        condition: condition || 'opened',
        reason: returnReason.value.trim(),
      })),
    })
    showReturnForm.value = false
    resetReturnItemSelection()
    fetchData()
    dialog.alert(res?.data?.message || res?.message || t('profile.return_request_submitted'), {
      type: 'success',
      title: t('profile.return_request'),
    })
  } catch (err) {
    console.error('Return request error:', err)
    console.error('Error response:', err.response?.data)
    dialog.alert(err.response?.data?.message || err.message || t('profile.send_request_failed'), {
      type: 'error',
      title: t('profile.return_request'),
    })
  } finally {
    loadingData.value = false
  }
}

const getStatusIcon = (s) => {
  return {
    pending: 'far fa-clock',
    processing: 'fas fa-cog',
    shipped: 'fas fa-truck',
    delivered: 'fas fa-check-circle',
    cancelled: 'fas fa-times-circle'
  }[s] || 'fas fa-shopping-bag'
}

const isStepDone = (step, currentStatus) => {
  const steps = ['pending', 'processing', 'shipped', 'delivered']
  const currentIndex = steps.indexOf(currentStatus)
  const stepIndex = steps.indexOf(step)
  return stepIndex <= currentIndex
}

const getStepTime = (order, step) => {
  // If activity log exists, find the date for that step
  if (order.activityLog && Array.isArray(order.activityLog)) {
    const entry = order.activityLog.find(l => l.status === step)
    if (entry) return entry.timestamp
  }
  
  // Fallback to order date if it's the pending step
  if (step === 'pending' && order.date) return order.date
  return ''
}

const printInvoice = async (order) => {
  try {
    // Fetch settings
    const settings = await profileStore.getSettings()
    
    const isIrisAsset = (val) => {
      if (!val) return false;
      const str = String(val).toLowerCase();
      return str.includes('iris') || str.includes('t3jcwn2n2rvkxvcva') || str.includes('dobvpg934hatbpm5') || str.includes('yugdc4mk4vmsf6el');
    };

    const logoVal = settings.find(s => s.key === 'logo')
    const siteLogo = (logoVal && logoVal.value && !isIrisAsset(logoVal.value))
      ? (logoVal.value.startsWith('http') 
        ? logoVal.value 
        : `/storage/${logoVal.value}`)
      : '/brand/jabel-logo.png'

    const nameVal = settings.find(s => s.key === 'site_name')
    const siteName = (nameVal && nameVal.value && !isIrisAsset(nameVal.value)) 
      ? nameVal.value 
      : 'جبل | Jabel'
    const isRtl = locale.value === 'ar'
    const dir = isRtl ? 'rtl' : 'ltr'
    const textAlign = isRtl ? 'right' : 'left'
    const totalsMargin = isRtl ? 'margin-right: auto;' : 'margin-left: auto;'
    const safeOrderNumber = escapeHtml(order.orderNumber || order.order_number || order.id)
    const safeInvoiceTitle = escapeHtml(t('invoice.title'))
    const safeOrderNumberLabel = escapeHtml(t('checkout.order_number'))
    const safeInvoiceDateLabel = escapeHtml(t('invoice.date'))
    const safeCustomerInfoLabel = escapeHtml(t('invoice.customer_info'))
    const safeNameLabel = escapeHtml(t('auth.name'))
    const safePhoneLabel = escapeHtml(t('auth.phone'))
    const safeEmailLabel = escapeHtml(t('auth.email'))
    const safeShippingAddressLabel = escapeHtml(t('checkout.shipping_address'))
    const safeProductLabel = escapeHtml(t('product.title'))
    const safeQuantityLabel = escapeHtml(t('cart.quantity'))
    const safePriceLabel = escapeHtml(t('products.price'))
    const safeTotalLabel = escapeHtml(t('cart.total'))
    const safeSubtotalLabel = escapeHtml(t('checkout.subtotal'))
    const safeShippingLabel = escapeHtml(t('checkout.shipping'))
    const safeDiscountLabel = escapeHtml(t('offers.discount'))
    const safeCheckoutTotalLabel = escapeHtml(t('checkout.total'))
    const safeThankYou = escapeHtml(t('invoice.thank_you'))
    const safeCurrency = escapeHtml(t('currency'))
    const safeDate = escapeHtml(order.date || '')
    const safeSiteName = escapeHtml(siteName)
    const safeSiteLogo = sanitizeUrl(siteLogo, '/brand/jabel-logo.png')
    const safeCustomerName = escapeHtml(order.customerName || order.customer?.name || '')
    const safeCustomerPhone = escapeHtml(order.customerPhone || order.customer?.phone || '')
    const safeCustomerEmail = escapeHtml(order.customerEmail || order.customer?.email || '')
    const safeCustomerAddress = escapeHtml(order.customerAddress || order.shipping_address || '')

    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.opener = null
    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="${dir}">
      <head>
        <title>${safeInvoiceTitle} - ${safeOrderNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; direction: ${dir}; text-align: ${textAlign}; padding: 30px; }
          .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #000000; padding-bottom: 20px; }
          .invoice-title { font-size: 32px; color: #000000; margin: 0; }
          .invoice-detail { color: #64748b; margin: 5px 0; }
          .logo { text-align: ${isRtl ? 'left' : 'right'}; }
          .logo-img { height: 60px; }
          .logo-text { font-size: 24px; color: #000000; font-weight: bold; margin: 0; }
          .invoice-customer { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
          .section-title { font-size: 16px; color: #000000; font-weight: bold; margin: 0 0 15px 0; grid-column: span 2; }
          .customer-info { color: #1e293b; margin: 5px 0; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .invoice-table thead { background: var(--color-brand-primary, #000000); }
          .invoice-table th { color: white; padding: 12px 15px; text-align: ${textAlign}; font-weight: bold; }
          .invoice-table td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; }
          .invoice-totals { width: 300px; ${totalsMargin} display: flex; flex-direction: column; gap: 10px; }
          .total-row { display: flex; justify-content: space-between; padding: 10px 15px; background: #f8fafc; border-radius: 6px; }
          .total-row.grand-total { background: var(--color-brand-primary, #000000); color: white; }
          .invoice-footer { text-align: center; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #000000; font-weight: bold; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div>
            <h2 class="invoice-title">${safeInvoiceTitle}</h2>
            <p class="invoice-detail">${safeOrderNumberLabel}: ${safeOrderNumber}</p>
            <p class="invoice-detail">${safeInvoiceDateLabel}: ${safeDate}</p>
          </div>
          <div class="logo">
            ${safeSiteLogo ? `<img src="${safeSiteLogo}" alt="${safeSiteName}" class="logo-img" />` : ''}
            <h3 class="logo-text">${safeSiteName}</h3>
          </div>
        </div>
        <div class="invoice-customer">
          <h4 class="section-title">${safeCustomerInfoLabel}</h4>
          <p class="customer-info"><strong>${safeNameLabel}:</strong> ${safeCustomerName}</p>
          <p class="customer-info"><strong>${safePhoneLabel}:</strong> <span class="phone-ltr" dir="ltr">${safeCustomerPhone}</span></p>
          <p class="customer-info"><strong>${safeEmailLabel}:</strong> ${safeCustomerEmail}</p>
          <p class="customer-info"><strong>${safeShippingAddressLabel}:</strong> ${safeCustomerAddress}</p>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>${safeProductLabel}</th>
              <th>${safeQuantityLabel}</th>
              <th>${safePriceLabel}</th>
              <th>${safeTotalLabel}</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || order.products || []).map(item => `
              <tr>
                <td>${escapeHtml(localized(item.product || item, 'name'))}</td>
                <td>${escapeHtml(item.quantity)}</td>
                <td>${formatPriceHtml(item.price || item.unit_price, safeCurrency)}</td>
                <td>${formatPriceHtml((item.price || item.unit_price) * item.quantity, safeCurrency)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="invoice-totals">
          <div class="total-row">
            <span>${safeSubtotalLabel}:</span>
            <strong>${formatPriceHtml(order.subtotal || 0, safeCurrency)}</strong>
          </div>
          <div class="total-row">
            <span>${safeShippingLabel}:</span>
            <strong>${formatPriceHtml(order.shipping || 0, safeCurrency)}</strong>
          </div>
          ${(order.discount > 0 ? `
          <div class="total-row">
            <span>${safeDiscountLabel}:</span>
            <strong>${formatPriceHtml(order.discount || 0, safeCurrency, { fraction: 'fixed', negative: true })}</strong>
          </div>
          ` : '')}
          <div class="total-row grand-total">
            <span>${safeCheckoutTotalLabel}:</span>
            <strong>${formatPriceHtml(order.total || order.total_amount, safeCurrency)}</strong>
          </div>
        </div>
        <div class="invoice-footer">
          <p>${safeThankYou}</p>
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  } catch (err) {
    console.error('Failed to print invoice', err)
  }
}

const copyOrderID = (order) => {
  const id = order.orderNumber || order.order_number || order.id
  navigator.clipboard.writeText(id)
  dialog.alert(`${t('profile.order_number_copied')}: ${id}`, { type: 'success' })
}

const initiateReturn = (order) => {
  router.push('/profile?tab=returns')
  showReturnForm.value = true
  returnStep.value = 2 // Skip step 1 (order selection)
  selectedOrderForReturn.value = order
  resetReturnItemSelection()
  returnReason.value = ''
}

// Rating Logic
const showRatingModal = ref(false)
const ratingOrder = ref(null)
const ratingItem = ref(null)
const ratingValue = ref(5)
const ratingComment = ref('')

const initiateRating = (order) => {
  ratingOrder.value = order
  showRatingModal.value = true
  ratingItem.value = order.items?.[0] || order.products?.[0]
  ratingValue.value = 5
  ratingComment.value = ''
}

const submitRating = async () => {
  if (!ratingItem.value) return
  loadingData.value = true
  try {
    const resolvedProductId = Number(
      ratingItem.value.product?.id ?? ratingItem.value.product_id ?? ratingItem.value.id
    )

    await profileStore.submitReview({
      product_id: resolvedProductId,
      rating: ratingValue.value,
      comment: ratingComment.value,
      order_id: ratingOrder.value.id
    })
    dialog.alert(t('profile.thanks_for_rating'), { type: 'success', title: t('profile.your_rating') })
    showRatingModal.value = false
  } catch (err) {
    dialog.alert(err.response?.data?.message || t('profile.rating_failed'), { type: 'error', title: t('profile.your_rating') })
  } finally {
    loadingData.value = false
  }
}

const getImageUrl = (i) => {
  if (!i) return '/brand/jabel-icon.png';
  const p = typeof i === 'object' ? (i.image_path || i.image || i.url || '') : i;
  if (!p) return '/brand/jabel-icon.png';
  if (typeof p === 'string' && (p.startsWith('http') || p.startsWith('/'))) return p;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://backend-jabal.be-kite.com/api';
  return `${baseUrl.replace('/api', '')}/storage/${p}`;
};
</script>

<style scoped>
.profile-page {
  padding: 140px 0 100px;
  background: #F8FAFC;
  min-height: 100vh;
}
.uppercase-input {
  text-transform: uppercase;
}
.main-container { max-width: 1440px; margin: 0 auto; padding: 0 20px; box-sizing: border-box; }

/* Breadcrumbs Flow */
.breadcrumb-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  min-height: 21px;
  margin-bottom: 0px;
}

.crumb-link {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
  text-decoration: none;
  transition: color 0.2s ease;
}

.crumb-link:hover {
  color: #000000;
}

.crumb-separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.crumb-arrow-svg {
  width: 4px;
  height: 7px;
  display: block;
}

.profile-page[dir="ltr"] .crumb-arrow-svg {
  transform: rotate(180deg);
}

.crumb-current {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.main-content-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px 0 40px;
  gap: 32px;
  width: 100%;
  box-sizing: border-box;
}

/* Sidebar Filter Panel (on the right in RTL) */
.sidebar-filter-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 8px;
  width: 280px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  flex-shrink: 0;
  position: sticky;
  top: calc(80px + var(--top-bar-h, 40px));
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
}

.menu-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  width: 100%;
  height: 48px;
  border-radius: 10px;
  border: none;
  border-right: 3px solid transparent;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #F8FAFC;
}

.menu-item.active {
  background: #F1F5F9;
  border-right: 3px solid #000000;
  border-radius: 10px;
}

.menu-item .menu-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #666666;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-item.active .menu-text {
  font-weight: 700;
  color: #000000;
}

.menu-item .menu-icon-frame {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 26px;
  height: 26px;
  color: #666666;
  flex-shrink: 0;
}

.menu-item .menu-icon {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
}

/* Icon files come straight from Figma; the mask lets currentColor drive their colour. */
.menu-item .menu-icon::before {
  content: '';
  position: absolute;
  inset: var(--icon-inset, 0);
  background: currentColor;
  -webkit-mask: var(--icon-url) center / 100% 100% no-repeat;
  mask: var(--icon-url) center / 100% 100% no-repeat;
}

.menu-item-logout .menu-icon-frame {
  color: #E53333;
}

.profile-menu-asset-icon {
  width: 20px;
  height: 20px;
  display: block;
  object-fit: contain;
  opacity: 0.72;
}

.profile-menu-fa-icon {
  font-size: 19px;
  line-height: 1;
  color: currentColor;
}

.menu-item.active .menu-icon-frame {
  color: #000000;
}

.menu-item.active .profile-menu-asset-icon {
  opacity: 1;
}

.sidebar-badge {
  background: #EF4444;
  color: #FFFFFF;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 600;
}

.sidebar-divider {
  width: 100%;
  height: 1px;
  background: #E2E8F0;
  margin: 4px 0;
}

.menu-item-logout {
  width: 100%;
}

.menu-item-logout .menu-text {
  color: #E53333 !important;
  font-weight: 500;
}

.menu-item-logout:hover {
  background: #FEF2F2;
}

/* Left Content Area (Main Area) */
.left-content-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  flex: 1;
  min-width: 0;
  width: 100%;
}

/* Overview Content */
.overview-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
}

/* Stats Row */
.stats-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

.stat-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 101px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  flex: 1;
  min-width: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.stat-txt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
}

.stat-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
  text-align: right;
}

.stat-val {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
  text-align: right;
}

.icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 48px;
  height: 48px;
  background: #F1F5F9;
  border-radius: 24px;
  flex-shrink: 0;
}

/* Recent Orders Block */
.recent-orders-block {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 20px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.recent-orders-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 27px;
}

.recent-orders-title {
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
}

.view-all-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.view-all-link:hover {
  text-decoration: underline;
}

.view-all-link .chevron-left {
  width: 14px;
  height: 14px;
  color: #000000;
}

.orders-list-compact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
}

.order-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  min-height: 69px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
}

.order-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 32px;
}

.order-num {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  direction: ltr;
  display: inline-block;
}

.order-date {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.price-unit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
}

.riyal-icon {
  width: 11.41px;
  height: 12.75px;
  color: #000000;
}

.price-val {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.status-badge {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #FFFFFF;
}

.status-badge.status-delivering,
.status-badge.warning {
  background: #F59E1F;
}

.status-badge.status-completed,
.status-badge.success {
  background: #10B981;
}

.status-badge.status-cancelled,
.status-badge.danger {
  background: #EF4444;
}

.order-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.order-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 37px;
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.order-btn:hover {
  background: var(--color-button-hover);
  color: #FFFFFF;
}

/* Other Views Inside Left Content Area */
.content-view {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
}

.account-main { background: transparent; width: 100%; }
.view-header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; }
.flex-header { display: flex; justify-content: space-between; align-items: center; }
.view-title { font-size: 24px; font-weight: 800; color: #111827; }
.view-title .count { color: #9ca3af; font-size: 18px; font-weight: 400; }

/* Form Elements */
.profile-form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-weight: 700; font-size: 14px; color: #374151; }
.form-group input, .form-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 15px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-family: inherit;
  transition: 0.2s;
  background: #fff;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.form-group input:focus, .form-group select:focus {
  border-color: #000000;
  outline: none;
  box-shadow: 0 0 0 3px rgba(135, 50, 96, 0.05);
}

.input-relative {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.input-relative input,
.input-relative select {
  width: 100%;
  box-sizing: border-box;
}

.input-relative .input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 16px;
  pointer-events: none;
}

[dir="rtl"] .input-relative .input-icon,
html[dir="rtl"] .input-relative .input-icon {
  left: 14px;
  right: auto;
}

[dir="rtl"] .input-relative input,
[dir="rtl"] .input-relative select,
html[dir="rtl"] .input-relative input,
html[dir="rtl"] .input-relative select {
  padding-left: 42px !important;
  padding-right: 15px !important;
}

[dir="ltr"] .input-relative .input-icon,
html[dir="ltr"] .input-relative .input-icon {
  right: 14px;
  left: auto;
}

[dir="ltr"] .input-relative input,
[dir="ltr"] .input-relative select,
html[dir="ltr"] .input-relative input,
html[dir="ltr"] .input-relative select {
  padding-right: 42px !important;
  padding-left: 15px !important;
}

.input-relative select ~ .fa-chevron-down {
  color: #000000 !important;
  font-weight: 900 !important;
}
.form-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.save-btn { background: var(--color-brand-primary, #000000); color: #fff; border: none; padding: 12px 35px; border-radius: 10px; font-weight: 800; cursor: pointer; transition: 0.3s; }
.save-btn:hover {
  background: var(--color-button-hover);
}
.change-pw-btn { background: none; border: none; color: #000000; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.cancel-btn { background: #f3f4f6; border: none; padding: 12px 25px; border-radius: 10px; color: #4b5563; font-weight: 700; cursor: pointer; transition: 0.3s; }
.cancel-btn:hover { background: #e5e7eb; }

.add-btn {
  background: var(--color-brand-primary, #000000);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(135, 50, 96, 0.15);
}
.add-btn:hover {
  background: var(--color-button-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(100, 116, 139, 0.2);
}

.inner-subtitle {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 20px;
}

.address-form-box {
  background: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 0px;
  border: 1px solid #f1f5f9;
  width: 100%;
  box-sizing: border-box;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  font-weight: 700;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
}
.checkbox-group input {
  width: 18px;
  height: 18px;
  accent-color: #000000;
  cursor: pointer;
}

/* Addresses Redesign V2 (Figma Specs) */
.addresses-view-area {
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.add-address-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  direction: ltr;
}

.primary-add-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 8px;
  width: 167px;
  height: 48px;
  background: var(--color-brand-primary, #000000);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.primary-add-button:hover {
  background: var(--color-button-hover);
}

.primary-add-button:active {
  transform: scale(0.98);
}

.addresses-main-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  margin: 0;
}

.addresses-grid-v2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  direction: rtl;
  box-sizing: border-box;
}

.address-card-v2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  gap: 12px;
  width: 100%;
  min-height: 184px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  direction: ltr;
}

.address-card-v2:hover {
  border-color: #CBD5E1;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
}

.address-card-v2.is-selected {
  border-color: #E2E8F0;
}

.card-header-v2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 24px;
  box-sizing: border-box;
}

.card-header-v2.has-default {
  justify-content: space-between;
}

.default-address-tag {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #64748B;
}

.card-user-info-v2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
}

.user-display-name {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  white-space: nowrap;
}

.selection-indicator-v2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border: 2px solid #E2E8F0;
  border-radius: 9999px;
  flex-shrink: 0;
  transition: border-color 0.2s ease;
}

.selection-indicator-v2.selected {
  border-color: #000000;
}

.selection-inner-dot {
  width: 10px;
  height: 10px;
  background: var(--color-brand-primary, #000000);
  border-radius: 50%;
}

.address-details-v2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  gap: 6px;
  width: 100%;
  min-height: 75px;
  box-sizing: border-box;
}

.detail-line-item {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #64748B;
  width: 100%;
  direction: rtl;
}

.card-actions-v2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 21px;
  margin-top: auto;
  box-sizing: border-box;
}

.card-action-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  transition: opacity 0.2s ease;
}

.card-action-btn:hover {
  opacity: 0.8;
}

.delete-action-btn {
  color: #E53333;
}

.edit-action-btn {
  color: #000000;
}

.action-btn-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 14px;
  line-height: 21px;
}

.action-icon-wrap {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 992px) {
  .addresses-grid-v2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .addresses-grid-v2 {
    grid-template-columns: 1fr;
  }
  .add-address-row {
    height: auto;
    gap: 16px;
  }
}

/* Redesigned Orders V2 */
/* ==========================================================================
   Figma Orders Tab Design (left-content-area, filter-sort-bar, detailed-cards)
   ========================================================================== */
.orders-tab-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1000px;
  max-width: 100%;
}

/* filter-sort-bar */
.filter-sort-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 1000px;
  max-width: 100%;
  height: 64px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  align-self: stretch;
}

/* search-box (left in RTL) */
.search-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px 0px 16px;
  gap: 8px;
  width: 240px;
  height: 40px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
}

.search-box .search-input {
  width: 190px;
  height: 21px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #000000;
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
}

.search-box .search-input::placeholder {
  color: #64748B;
}

.search-box .search-icon {
  width: 14px;
  height: 14px;
  color: #000000;
  flex-shrink: 0;
}

/* filter-tabs (right in RTL) */
.filter-tabs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  height: 37px;
}

.filter-tabs .tab-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 37px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #FFFFFF;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tabs .tab-btn:hover {
  background: #F8FAFC;
}

.filter-tabs .tab-btn.active {
  background: var(--color-brand-primary, #000000);
  border-color: #000000;
  color: #FFFFFF;
}

/* orders-detailed-list */
.orders-detailed-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 1000px;
  max-width: 100%;
  align-self: stretch;
}

/* order-detailed-card */
.order-detailed-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  width: 1000px;
  max-width: 100%;
  min-height: 232px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  align-self: stretch;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.order-detailed-card:hover {
  border-color: #CBD5E1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

/* card-top-info */
.card-top-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 43px;
  align-self: stretch;
}

/* status-area (left in RTL) */
.status-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  height: 37px;
}

.status-badge {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 37px;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
}

/* main-meta (right in RTL) */
.main-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  height: 43px;
}

.meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  height: 43px;
  text-align: right;
}

.meta-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #64748B;
}

.meta-val {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.meta-divider {
  box-sizing: border-box;
  width: 1px;
  height: 32px;
  background: var(--color-brand-primary, #000000);
  opacity: 0.15;
}

/* card divider line */
.card-line {
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  background: #E2E8F0;
  align-self: stretch;
  margin: 0;
}

/* card-middle-content */
.card-middle-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 56px;
  align-self: stretch;
}

/* price-actions (left in RTL) */
.price-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  height: 47px;
  direction: ltr;
  text-align: left;
}

.price-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #64748B;
}

.price-unit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 27px;
}

.price-amount {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
}

.price-unit .riyal-symbol {
  width: 13.69px;
  height: 15.3px;
  color: #000000;
}

/* products-description (right in RTL) */
.products-description {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  height: 56px;
}

.prod-text-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  height: 49px;
  text-align: right;
}

.prod-count {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.prod-subtitle {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #64748B;
}

.prod-icon-frame {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 56px;
  height: 56px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  flex-shrink: 0;
}

.prod-icon-frame svg {
  width: 24px;
  height: 24px;
}

/* card-bottom-actions */
.card-bottom-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 21px;
  align-self: stretch;
}

/* help-prompt (right in RTL) */
.help-prompt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  height: 21px;
}

.help-question {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.help-link {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.help-link:hover {
  opacity: 0.7;
}

/* actions-left (left in RTL) */
.actions-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  height: 21px;
}

.order-action-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 21px;
  direction: ltr;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  transition: opacity 0.2s ease;
}

.order-action-link:hover {
  opacity: 0.8;
}

.order-action-link.track-link {
  color: #000000;
}

.order-action-link.details-link {
  color: #64748B;
}

.action-chevron {
  width: 14px;
  height: 14px;
}

/* pagination */
.orders-pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0px 0px;
  gap: 8px;
  width: 1000px;
  max-width: 100%;
  height: 52px;
  align-self: stretch;
}

.page-nav-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  color: #000000;
  transition: all 0.2s ease;
}

.page-nav-btn:hover:not(:disabled) {
  background: #F8FAFC;
  border-color: #CBD5E1;
}

.page-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-num-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-num-btn:hover:not(.active) {
  background: #F8FAFC;
  border-color: #CBD5E1;
}

.page-num-btn.active {
  background: var(--color-brand-primary, #000000);
  color: #FFFFFF;
  border-color: #000000;
}

.empty-orders-card {
  width: 100%;
  padding: 60px 20px;
  text-align: center;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  color: #94A3B8;
  font-size: 15px;
  font-weight: 600;
}

.empty-orders-card .empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.3;
}

/* ==========================================================================
   Order Details View (Figma left-content-area 1000px)
   ========================================================================== */
.orders-tab-wrapper {
  width: 1000px;
  max-width: 100%;
}

.clickable-order {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clickable-order:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.order-details-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px;
  gap: 24px;
  width: 1000px;
  max-width: 100%;
}

/* 1. order-info-card */
.order-info-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 24px;
  gap: 16px;
  width: 100%;
  min-height: 91px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.order-info-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.order-info-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.info-meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.info-meta-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #64748B;
}

.info-meta-val {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.info-meta-divider {
  box-sizing: border-box;
  width: 1px;
  height: 32px;
  background: #E2E8F0;
}

.order-status-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  min-width: 102px;
  height: 37px;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
}

/* cancellation reason */
.cancel-reason-card {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 24px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 12px;
}
.cancel-reason-title { margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #B91C1C; }
.cancel-reason-body { margin: 0; font-size: 14px; line-height: 1.7; color: #7F1D1D; white-space: pre-wrap; overflow-wrap: anywhere; }
.cancel-reason-body.is-empty { color: #9CA3AF; }

/* 2. order-tracking-card */
.order-tracking-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 24px;
  gap: 16px;
  width: 100%;
  min-height: 255px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.tracking-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-align: right;
  color: #000000;
  margin: 0;
}

.card-divider-line {
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  background: #E2E8F0;
  border: none;
}

.timeline-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  min-height: 139px;
}

.timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;
  flex: 1;
  min-width: 0;
  text-align: center;
}

.step-indicator-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-indicator-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: var(--color-brand-primary, #000000);
  border-radius: 16px;
  color: #FFFFFF;
}

.step-indicator-circle.active {
  width: 40px;
  height: 40px;
  background: #F59E1F;
  box-shadow: 0px 0px 8px rgba(255, 150, 79, 0.25);
  border-radius: 20px;
}

.step-indicator-circle.completed {
  background: #10B981;
}

.step-indicator-circle i {
  font-size: 14px;
  line-height: 1;
}

.step-indicator-circle.active i {
  font-size: 16px;
}

.step-indicator-circle.pending {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 2px solid #E2E8F0;
  border-radius: 16px;
  color: #CBD5E1;
}

.step-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #000000;
}

.step-title.pending-text {
  color: #64748B;
}

.step-time {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #64748B;
}

.step-note {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #64748B;
}

.timeline-connector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 32px;
  flex-shrink: 0;
  margin-top: 50px;
}

.connector-bar {
  width: 0px;
  height: 32px;
  border-right: 2px solid #000000;
}

.connector-bar.dashed {
  border-right: 2px dashed #CBD5E1;
}

/* 3. products-card */
.products-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 24px;
  gap: 16px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.products-card-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-align: right;
  color: #000000;
  margin: 0;
}

.products-table-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  gap: 24px;
  width: 100%;
  height: 41px;
  border-bottom: 2px solid #E2E8F0;
}

.th-product {
  flex: 1;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #64748B;
}

.th-unit-price {
  width: 150px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #64748B;
}

.th-qty {
  width: 80px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #64748B;
}

.th-total {
  width: 150px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  color: #64748B;
}

.product-row-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0px;
  gap: 24px;
  width: 100%;
  border-bottom: 1px solid #E2E8F0;
}

.col-prod-details {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.prod-thumb-img {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  object-fit: cover;
  flex-shrink: 0;
  background: #F8FAFC;
}

.prod-titles-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.prod-main-name {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  text-align: right;
}

.prod-model-num {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #64748B;
}

.col-unit-price-cell {
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.col-qty-cell {
  width: 80px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.col-total-cell {
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #000000;
}

/* 4. summary-card */
.summary-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 24px;
  gap: 20px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.summary-card-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  margin: 0;
}

.summary-rows-wrap {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
}

.summary-item-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24px;
}

.summary-item-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #64748B;
}

.summary-item-val {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.summary-item-val.free {
  color: #10B981;
}

.summary-item-val.discount {
  color: #E53333;
}

.summary-total-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 36px;
}

.summary-total-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
}

.summary-total-val {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
}

/* 5. address-payment-split */
.address-payment-split {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 24px;
  width: 100%;
}

.delivery-card,
.payment-card {
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 24px;
  gap: 12px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
}

.card-heading-md {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #000000;
  margin: 0;
}

.delivery-info-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.delivery-name {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.delivery-detail {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
  text-align: right;
}

.payment-method-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  height: 24px;
}

.payment-method-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.mada-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: #F8FAFC;
  border-radius: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 15px;
  color: #000000;
}

/* 6. bottom-action-buttons */
.bottom-action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 56px;
}

.help-prompt-col {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.help-q-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.help-link-bold {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.help-link-bold:hover {
  opacity: 0.7;
}

.action-buttons-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.btn-primary-invoice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  height: 56px;
  background: var(--color-brand-primary, #000000);
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.btn-primary-invoice:hover {
  background: var(--color-button-hover);
  transform: translateY(-1px);
}

.btn-secondary-back {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  height: 56px;
  background: #FFFFFF;
  border: 1.5px solid #000000;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-secondary-back:hover {
  background: #F8FAFC;
  transform: translateY(-1px);
}

/* Riyal SVG Icon utilities */
.riyal-icon-dark {
  width: 12px;
  height: 12px;
  color: #000000;
  flex-shrink: 0;
}

.riyal-icon-muted {
  width: 12px;
  height: 12px;
  color: #64748B;
  flex-shrink: 0;
}

.riyal-icon-red {
  width: 12px;
  height: 12px;
  color: #E53333;
  flex-shrink: 0;
}

/* Responsive adjustments for Order Details */
@media (max-width: 992px) {
  .order-details-view {
    width: 100%;
  }

  .timeline-row {
    overflow-x: auto;
    padding-bottom: 12px;
  }

  .timeline-step {
    min-width: 110px;
  }

  .products-table-header,
  .product-row-item {
    gap: 12px;
  }

  .th-unit-price,
  .col-unit-price-cell {
    width: 110px;
  }

  .th-total,
  .col-total-cell {
    width: 110px;
  }

  .address-payment-split {
    flex-direction: column;
  }

  .bottom-action-buttons {
    flex-direction: column-reverse;
    height: auto;
    gap: 16px;
  }

  .action-buttons-wrap {
    width: 100%;
    justify-content: stretch;
  }

  .btn-primary-invoice,
  .btn-secondary-back {
    flex: 1;
  }
}

/* Order Details / Tracking Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.order-details-modal {
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.modal-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E2E8F0;
}

.modal-order-title h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #000000;
}

.modal-order-num {
  font-size: 13px;
  color: #64748B;
  font-weight: 600;
}

.close-modal {
  background: transparent;
  border: none;
  font-size: 24px;
  line-height: 1;
  color: #94A3B8;
  cursor: pointer;
  padding: 4px;
}

.close-modal:hover {
  color: #000000;
}

.modal-body-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: #F8FAFC;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
}

.modal-info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-k {
  font-size: 11px;
  color: #64748B;
}

.info-v {
  font-size: 13px;
  font-weight: 700;
  color: #000000;
}

.info-v-price {
  font-size: 14px;
  font-weight: 700;
  color: #000000;
}

.status-badge-sm {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  width: fit-content;
}

.modal-products-list h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #000000;
}

.modal-prod-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F1F5F9;
  font-size: 13px;
}

.modal-prod-name {
  font-weight: 600;
  color: #000000;
}

.modal-prod-qty {
  color: #64748B;
}

.modal-prod-price {
  font-weight: 700;
  color: #000000;
}

.modal-footer-row {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E2E8F0;
  background: #FAFBFD;
  border-radius: 0 0 16px 16px;
}

.print-inv-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-brand-primary, #000000);
  color: #FFFFFF;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.print-inv-btn:hover {
  background: var(--color-button-hover);
}

.close-btn-secondary {
  background: #FFFFFF;
  color: #64748B;
  border: 1px solid #E2E8F0;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.close-btn-secondary:hover {
  background: #F8FAFC;
  color: #000000;
}

/* Tracking Timeline V3 */
.tracking-timeline-v3 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-right: 20px;
}

.tracking-timeline-v3::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  right: 6px;
  width: 2px;
  background: #E2E8F0;
}

.track-step-v3 {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
}

.track-step-v3 .step-dot-v3 {
  position: absolute;
  right: -20px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #E2E8F0;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 0 1px #CBD5E1;
}

.track-step-v3.completed .step-dot-v3 {
  background: #10B981;
  box-shadow: 0 0 0 1px #10B981;
}

.track-step-v3.active .step-dot-v3 {
  background: #F59E1F;
  box-shadow: 0 0 0 1px #F59E1F;
}

.track-step-v3 .step-info-v3 {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.track-step-v3 .step-title-v3 {
  font-size: 14px;
  font-weight: 700;
  color: #000000;
}

.track-step-v3 .step-desc-v3 {
  font-size: 12px;
  color: #64748B;
}

/* Empty States */
.empty-state, .placeholder-msg, .empty-view { text-align: center; color: #9ca3af; padding: 40px 0; }
.empty-icon { font-size: 50px; margin-bottom: 15px; }
.go-shop-btn { display: inline-block; background: var(--color-brand-primary, #000000); color: #fff; padding: 10px 25px; border-radius: 10px; text-decoration: none; font-weight: 800; margin-top: 15px; }

.go-shop-btn:hover:not(:disabled) {
  background: var(--color-button-hover);
}

/* Country Readonly Input */
.country-readonly-input {
  background-color: #f8fafc !important;
  color: #1f2937 !important;
  font-weight: 700 !important;
  border: 1px solid #e5e7eb !important;
  text-align: left !important;
  cursor: not-allowed;
}

[dir="ltr"] .country-readonly-input,
html[dir="ltr"] .country-readonly-input {
  text-align: left !important;
}

/* Mobile Profile Scroll Tabs */
.profile-mobile-tabs-container {
  display: none;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
}

.profile-mobile-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 8px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.profile-mobile-tabs::-webkit-scrollbar {
  display: none;
}

.mobile-tab-btn {
  flex: 0 0 auto;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  color: #4b5563;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.mobile-tab-btn i {
  font-size: 13px;
  color: #6b7280;
  flex-shrink: 0;
}

.mobile-tab-btn span {
  font-size: 12px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-tab-btn.active {
  background: var(--color-brand-primary, #000000);
  border-color: #000000;
  color: #ffffff;
  box-shadow: 0 3px 10px rgba(135, 50, 96, 0.2);
}

.mobile-tab-btn.active i {
  color: #ffffff;
}

.mobile-tab-badge {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 10px;
  font-weight: 800;
  background: #f1f5f9;
  color: #64748b;
  margin-left: 2px;
}

.mobile-tab-btn.active .mobile-tab-badge {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.mobile-tab-badge.danger {
  background: #ef4444;
  color: #ffffff;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .profile-page { padding: 25px 0 25px !important; }
  .main-content-layout { flex-direction: column !important; gap: 20px !important; padding: 0 !important; }
  .account-layout { grid-template-columns: 1fr; gap: 0; }
  .account-sidebar, .sidebar-filter-panel { display: none !important; }
  .profile-mobile-tabs-container { display: block !important; }
  .account-main, .left-content-area { width: 100% !important; }
  .form-row { grid-template-columns: 1fr; }
}

/* Returns Styles */
.return-form-box {
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.return-form-box .custom-select-v2,
.return-form-box textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  transition: 0.2s;
  outline: none;
  background: #fff;
}

.return-form-box .custom-select-v2:focus,
.return-form-box textarea:focus {
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(135, 50, 96, 0.05);
}

.return-form-box .custom-select-v2 {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 12px center;
  padding-left: 35px;
}

.return-form-box textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

.return-form-box .char-count {
  font-size: 12px;
  color: #6b7280;
  text-align: left;
  margin-top: 5px;
}

.return-form-box .char-count.valid {
  color: #10b981;
}

.return-form-box .char-count.invalid {
  color: #ef4444;
}

.return-options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 640px) {
  .return-options-grid {
    grid-template-columns: 1fr;
  }
}

/* Notifications Styles (Figma pixel-perfect) */
.notifications-view-container {
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
}

.notifications-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  width: 100%;
  max-width: 1000px;
  min-height: 403px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  direction: rtl;
}

/* header */
.notifications-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 27px;
}

/* الإشعارات */
.notifications-title {
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
}

/* تحديد الكل كمقروء */
.btn-mark-all-read {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  background: transparent;
  border: none;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-mark-all-read:hover {
  opacity: 0.7;
}

/* notifications-list */
.notifications-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
}

/* notification-item */
.notification-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  width: 100%;
  min-height: 56px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.notification-item.unread {
  background: #F1F5F9;
}

.notification-item:hover {
  border-color: #CBD5E1;
}

/* notification-main-content (right side in RTL: dot + text) */
.notification-main-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

/* Ellipse (unread dot) */
.notification-dot {
  width: 6px;
  height: 6px;
  display: block;
  flex-shrink: 0;
}

/* notification title text */
.notification-title-text {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification-title-text.is-unread {
  font-weight: 700;
}

/* notification-time (left side in RTL) */
.notification-time {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
  text-align: left;
  white-space: nowrap;
  flex-shrink: 0;
}

/* empty state */
.notifications-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 12px;
  width: 100%;
  color: #94A3B8;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}

.notifications-empty .empty-icon {
  font-size: 32px;
}

@media (max-width: 768px) {
  .notifications-card {
    padding: 16px;
  }
  .notification-item {
    padding: 14px 16px;
    gap: 12px;
  }
  .notification-title-text {
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
  }
  .notification-time {
    font-size: 12px;
  }
}

/* ==========================================================================
   Personal Information Tab (Figma section-personal-info pixel-perfect)
   ========================================================================== */
.personal-info-tab-wrapper {
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
}

.section-personal-info {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 20px;
  width: 1000px;
  max-width: 100%;
  min-height: 379px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  direction: rtl;
}

.personal-info-title {
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  width: 100%;
}

.info-rows {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
}

.info-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0px;
  gap: 4px;
  width: 100%;
}

.info-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #64748B;
  display: block;
}

.info-value {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #000000;
  display: block;
}

.info-divider {
  box-sizing: border-box;
  width: 100%;
  height: 0px;
  border-top: 1px solid #E2E8F0;
}

/* edit-actions */
.edit-actions {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* In RTL flex-start is on the RIGHT */
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 100%;
  height: 45px;
  margin-top: auto;
}

.btn-save {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  min-width: 127px;
  height: 45px;
  background: var(--color-brand-primary, #000000);
  border: 1px solid #000000;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: var(--color-button-hover);
}

.btn-cancel {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  min-width: 138px;
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #F8FAFC;
}

/* Edit Mode Form Inputs */
.personal-info-edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.info-row-edit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;
  gap: 6px;
  width: 100%;
}

.personal-info-input {
  width: 100%;
  max-width: 480px;
  height: 42px;
  padding: 8px 14px;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 15px;
  color: #000000;
  background: #FFFFFF;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.personal-info-input:focus {
  border-color: #000000;
}

/* Phone row: same country selector as registration, sized like the other inputs */
.profile-phone-input {
  --phone-height: 42px;
  --phone-radius: 6px;
  --phone-border: #CBD5E1;
  /* same type as the name and email inputs above it */
  --phone-font-size: 15px;
  --phone-font-weight: 400;
  --phone-dial-size: 15px;
  --phone-dial-weight: 400;
  --phone-color: #000000;
  max-width: 480px;
}

.personal-info-error {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #E53333;
}

@media (max-width: 768px) {
  .section-personal-info {
    padding: 16px;
    height: auto;
    min-height: auto;
  }
  .edit-actions {
    flex-direction: column-reverse;
    align-items: stretch;
    height: auto;
  }
  .btn-save, .btn-cancel {
    width: 100%;
  }
  .personal-info-input {
    max-width: 100%;
  }
}

/* ==========================================================================
   Change Password Modal (Figma modal-security exact pixel-perfect)
   ========================================================================== */
.change-password-modal-overlay {
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

.modal-security {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 24px;
  width: 480px;
  max-width: 100%;
  height: auto;
  min-height: auto;
  background: #FFFFFF;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.101961);
  border-radius: 8px;
  direction: rtl;
  position: relative;
  animation: modalSecurityPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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

.modal-security-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 36px;
}

.modal-security-title {
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  text-align: right;
  color: #000000;
}

.modal-security-close-btn {
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

.modal-security-close-btn:hover {
  background: #E2E8F0;
}

.modal-security-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 100%;
}

.modal-field {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
}

.modal-field-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  text-align: right;
  transition: color 0.2s ease;
}

.modal-field-label.has-error {
  color: #E53333;
}

.modal-input-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  transition: border-color 0.2s ease;
}

.modal-input-wrapper.has-error {
  border-color: #E53333;
}

.modal-input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  color: #000000;
}

.modal-input::placeholder {
  color: #64748B;
  letter-spacing: 2px;
}

.modal-eye-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #161616;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.modal-eye-btn:hover {
  opacity: 0.7;
}

.modal-field-error {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #E53333;
  text-align: right;
}

.btn-save-password {
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
  margin-top: 4px;
}

.btn-save-password:hover {
  background: var(--color-button-hover);
}

.btn-save-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .modal-security {
    padding: 24px 16px;
    min-height: auto;
  }
}

.stat-card {
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
}

@media (max-width: 768px) {
  .order-row {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 14px !important;
    padding: 14px !important;
    height: auto !important;
  }
  .order-info {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 10px !important;
    width: 100% !important;
  }
  .order-actions {
    width: 100% !important;
  }
  .order-btn {
    width: 100% !important;
  }
  .recent-orders-block {
    padding: 16px !important;
  }
  .stats-row {
    gap: 12px !important;
  }
  .stat-card {
    padding: 14px !important;
  }
  .stat-val {
    font-size: 20px !important;
  }
}

.product-selection-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 15px 0;
  padding: 5px;
}

.return-help-text {
  margin: 8px 0 12px;
  color: #64748b;
  font-size: 13px;
}

.return-selection-summary {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #ecfdf5;
  color: #047857;
  font-size: 13px;
  font-weight: 700;
}

.product-select-item {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}

.product-select-item:hover {
  background: #fcfbff;
  border-color: rgba(0,0,0,0.25);
}

.product-select-item.selected {
  border-color: #000000;
  background: #f8fafc;
}

.product-select-item.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.return-item-main {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

/* The generic ".form-group input" rule (full width, no native look) must not hit these controls. */
.form-group .product-select-item .return-item-checkbox {
  flex: 0 0 auto;
  width: 20px !important;
  height: 20px;
  min-width: 20px;
  max-width: 20px !important;
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;
  accent-color: #000000;
  cursor: pointer;
}

.p-mini-img {
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  background: #f1f5f9;
}

.p-mini-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 2px;
}

.p-mini-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 14px;
  line-height: 21px;
  overflow-wrap: anywhere;
}

.p-mini-price {
  font-size: 13px;
  color: #000000;
  font-weight: 600;
}

.p-mini-max {
  color: #64748b;
  font-size: 12px;
}

.p-mini-max.is-empty {
  color: #b45309;
  font-weight: 600;
}

.return-item-controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding-top: 12px;
  border-top: 1px dashed #cbd5e1;
  cursor: default;
}

.return-control-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.return-control-field label {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}

.form-group .return-item-controls .return-quantity-input,
.form-group .return-item-controls .return-condition-select {
  width: 100% !important;
  max-width: 100% !important;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
  color: #0f172a;
  font: inherit;
  font-size: 14px;
  cursor: text;
}

.form-group .return-item-controls .return-condition-select {
  cursor: pointer;
  padding-inline-end: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%23000' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 12px center;
}

[dir="ltr"] .form-group .return-item-controls .return-condition-select {
  background-position: right 12px center;
}

.form-group .return-item-controls .return-quantity-input:focus,
.form-group .return-item-controls .return-condition-select:focus {
  border-color: #000000;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.return-item-controls small {
  color: #64748b;
  font-size: 11px;
}

@media (max-width: 480px) {
  .return-item-controls { grid-template-columns: 1fr; }
}

.return-card {
  background: #fff;
  border: 1.5px solid #f1f5f9;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 15px;
}

.ret-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #f1f5f9;
}

.ret-id {
  font-weight: 800;
  color: #1e293b;
}

.ret-body {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.ret-img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
}

.ret-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ret-pname {
  font-weight: 800;
  color: #1e293b;
  font-size: 16px;
}

.ret-order {
  font-size: 13px;
  color: #64748b;
}

.ret-items-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: #475569;
}

.ret-items-summary span {
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 8px;
}

.prod-choice { display: flex; align-items: flex-start; gap: 6px; }
.prod-choice > ul { flex: 1; min-width: 0; }
.prod-choice-qty { margin-top: 7px; font-size: 11px; font-weight: 700; color: #6b7280; }
.invoice-product-name, .invoice-product-options { display: block; }
.invoice-product-name { font-weight: 700; color: #111827; }
.invoice-product-options { margin-top: 2px; font-size: 12px; font-weight: 400; color: #4b5563; line-height: 1.5; }
.ret-reason, .ret-notes {
  font-size: 14px;
  color: #4b5563;
  background: #f8fafc;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
}

.ret-refund {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.refund-label {
  font-size: 12px;
  color: #94a3b8;
}

.refund-val {
  font-weight: 800;
  color: #000000;
  font-size: 18px;
}

.ret-footer {
  margin-top: 15px;
  text-align: left;
  font-size: 12px;
  color: #94a3b8;
}

.btn-rate-v2, .btn-return-v2 {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
}

.btn-rate-v2 {
  background: #f3f4f6;
  color: #000000;
  border: 1px solid rgba(0,0,0,0.15);
}
.btn-rate-v2:hover {
  background: var(--color-button-hover);
  color: #fff;
}

.btn-return-v2 {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}
.btn-return-v2:hover {
  background: #f1f5f9;
  color: #1e293b;
}

/* Rating Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.rating-modal {
  background: #fff;
  width: 90%;
  max-width: 450px;
  padding: 40px;
  border-radius: 25px;
  position: relative;
  text-align: center;
}

.close-modal {
  position: absolute;
  top: 20px; right: 20px;
  background: none; border: none;
  font-size: 24px; color: #94a3b8;
  cursor: pointer;
}

.modal-title { font-size: 22px; font-weight: 800; margin-bottom: 10px; color: #1e293b; }
.modal-desc { color: #64748b; font-size: 14px; margin-bottom: 25px; }

.rating-item-select { margin-bottom: 20px; }
.rating-item-select label { font-weight: 700; font-size: 14px; color: #1e293b; margin-bottom: 10px; display: block; }
.rating-prods-scroll { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; }
.r-item-card { 
  flex: 0 0 100px; padding: 10px; border: 1.5px solid #f1f5f9; border-radius: 12px; cursor: pointer; transition: 0.2s;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.r-item-card img { width: 50px; height: 50px; border-radius: 8px; object-fit: cover; }
.r-item-card span { font-size: 11px; font-weight: 700; color: #64748b; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
.r-item-card.active { border-color: #000000; background: #f3f4f6; }
.r-item-card.active span { color: #000000; }

.stars-input { display: flex; justify-content: center; gap: 12px; margin-bottom: 25px; }
.stars-input i { font-size: 32px; color: #e2e8f0; cursor: pointer; transition: 0.2s; }
.stars-input i.active { color: #ffb800; transform: scale(1.1); }

.rating-modal textarea {
  width: 100%; border: 1.5px solid #f1f5f9; border-radius: 15px; padding: 15px; font-family: inherit; margin-bottom: 25px; outline: none;
}
.rating-modal textarea:focus { border-color: #000000; }

.submit-rating-btn {
  width: 100%; background: var(--color-brand-primary, #000000); color: #fff; border: none; padding: 15px; border-radius: 15px; font-weight: 800; cursor: pointer; transition: 0.3s;
}
.submit-rating-btn:hover {
  background: var(--color-button-hover);
 transform: translateY(-2px); box-shadow: 0 10px 20px rgba(100, 116, 139, 0.2);
}

.fixed-country-input {
  background-color: #ffffff !important;
  color: #111827 !important;
  font-weight: 700 !important;
  border: 1px solid #e5e7eb !important;
}

.input-relative select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  padding-right: 45px !important;
  padding-left: 15px !important;
}

.input-relative select ~ .fa-chevron-down {
  left: auto !important;
  right: 18px !important;
  color: #000000 !important;
  font-weight: 900 !important;
}

[dir="rtl"] .input-relative select,
html[dir="rtl"] .input-relative select {
  padding-left: 45px !important;
  padding-right: 15px !important;
}

[dir="rtl"] .input-relative select ~ .fa-chevron-down,
html[dir="rtl"] .input-relative select ~ .fa-chevron-down {
  right: auto !important;
  left: 18px !important;
  color: #000000 !important;
  font-weight: 900 !important;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .profile-page { 
    padding: 25px 0 30px !important; 
    overflow-x: hidden; 
    width: 100%; 
  }
  .main-container { 
    padding: 0 16px !important; 
    width: 100% !important; 
    box-sizing: border-box !important; 
  }
  .main-content-layout,
  .account-layout { 
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important; 
    width: 100% !important; 
    box-sizing: border-box !important; 
    padding: 0 !important;
  }
  .account-sidebar, .sidebar-filter-panel { display: none !important; }
  .profile-mobile-tabs-container { 
    display: block !important; 
    width: 100% !important; 
    box-sizing: border-box !important; 
    padding: 0 !important; 
  }
  .left-content-area,
  .account-main { 
    width: 100% !important; 
    box-sizing: border-box !important; 
  }
  
  .form-container,
  .profile-form {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .form-row {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }

  .form-group {
    width: 100% !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    min-width: 0 !important;
  }

  .form-group input,
  .form-group select {
    width: 100% !important;
    box-sizing: border-box !important;
    max-width: 100% !important;
  }
  
  /* Symmetrical Inner Cards Padding */
  .notif-card,
  .address-card,
  .wish-card,
  .return-card,
  .order-card-v2,
  .stat-card,
  .return-form-box {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 14px 14px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .order-summary-v2 {
    padding: 14px 12px !important;
    grid-template-columns: 24px 1fr auto !important;
    gap: 8px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .order-footer-actions-v2 { flex-direction: column !important; width: 100% !important; }
  .order-footer-actions-v2 button { width: 100% !important; }
}

/* ==========================================================================
   PRINTABLE INVOICE CARD & ACTION CONTROLS (FIGMA PIXEL-PERFECT SPEC)
   ========================================================================== */

/* In-Page Invoice View */
.inpage-invoice-view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1000px;
  max-width: 100%;
  direction: rtl;
  animation: fadeIn 0.25s ease-out;
}

.inpage-invoice-top-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 960px;
  max-width: 100%;
  padding: 0px;
}

.btn-back-to-order-details {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #0F172A;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back-to-order-details:hover {
  background: #E2E8F0;
  border-color: #CBD5E1;
  color: #000000;
  transform: translateX(2px);
}

.btn-back-to-orders-list {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back-to-orders-list:hover {
  background: #F8FAFC;
  color: #0F172A;
  border-color: #CBD5E1;
}

/* printable-invoice-card */
.printable-invoice-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 48px;
  gap: 32px;
  width: 960px;
  max-width: 100%;
  min-height: 906px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.0509804);
  border-radius: 16px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  direction: rtl;
}

.printable-invoice-card[dir="ltr"] {
  direction: ltr;
}

/* 1. Header Frame (width: 864px, height: 108px) */
.invoice-header-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 108px;
}

/* Right in RTL: Logo & Company info */
.invoice-company-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  min-width: 141px;
  width: auto;
  height: 87px;
}

.invoice-logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  width: 140px;
  height: 35px;
}

.invoice-logo-img {
  width: 140px;
  height: 35px;
  object-fit: contain;
  object-position: right center;
}

.invoice-company-name {
  width: 140px;
  height: 18px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: start;
  color: #000000;
  white-space: nowrap;
}

.invoice-vat-number {
  width: auto;
  height: 18px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: start;
  color: #64748B;
  white-space: nowrap;
}

/* Left in RTL: Tax Invoice Meta */
.invoice-meta-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;
  min-width: 155px;
  height: 108px;
}

.invoice-type-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
  margin: 0;
  text-align: start;
}

.invoice-meta-row {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #64748B;
  text-align: start;
  white-space: nowrap;
}

/* 2. Divider Line */
.invoice-divider-line {
  box-sizing: border-box;
  width: 100%;
  height: 0px;
  border: none;
  border-top: 1px solid #E2E8F0;
}

/* 3. Customer & Delivery Frame (height: 111px, gap: 40px) */
.invoice-parties-frame {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 40px;
  width: 100%;
  min-height: 111px;
}

.invoice-party-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  flex: 1;
}

.invoice-party-title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  margin: 0;
}

.invoice-party-item {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: start;
  color: #64748B;
}

/* 4. Products Table Frame */
.invoice-table-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 0;
  width: 100%;
}

.invoice-table-header {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  gap: 20px;
  width: 100%;
  height: 41px;
  border-bottom: 2px solid #E2E8F0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.invoice-table-header .col-product {
  flex: 1;
  text-align: start;
}

.invoice-table-header .col-price {
  width: 150px;
  text-align: center;
}

.invoice-table-header .col-qty {
  width: 80px;
  text-align: center;
}

.invoice-table-header .col-total {
  width: 150px;
  text-align: end;
}

.invoice-product-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0px;
  gap: 20px;
  width: 100%;
  min-height: 48px;
  border-bottom: 1px solid #E2E8F0;
}

.invoice-product-row:nth-of-type(odd) {
  background: #f9fafb;
}

.invoice-product-row .col-product {
  flex: 1;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: start;
  color: #000000;
}

.invoice-product-row .col-price {
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.invoice-product-row .col-qty {
  width: 80px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #000000;
}

.invoice-product-row .col-total {
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

/* 5. Totals Breakdown Frame (width: 360px on the left) */
.invoice-summary-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
}

.invoice-summary-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 360px;
  align-self: flex-end;
  margin-inline-start: auto;
  margin-inline-end: 0;
}

.summary-breakdown-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 360px;
  height: 21px;
}

.breakdown-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748B;
}

.breakdown-val {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}

.breakdown-val.discount-val {
  color: #E53333;
}

.breakdown-val.free-val {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #10B981;
}

.summary-box-line {
  box-sizing: border-box;
  width: 360px;
  height: 0px;
  border: none;
  border-top: 1px solid #E2E8F0;
}

.summary-final-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 360px;
  height: 36px;
}

.final-total-label {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.final-total-val {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
}

/* 7. Bottom Footer Bar */
.invoice-footer-frame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 18px;
}

.invoice-thanks-note {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #94A3B8;
}

.invoice-payment-method {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
}

/* ==========================================================================
   INVOICE ACTION CONTROLS (FIGMA PIXEL-PERFECT SPEC)
   ========================================================================== */
.invoice-action-controls {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 960px;
  max-width: 100%;
  min-height: 48px;
  direction: rtl;
}

.invoice-buttons-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.primary-download-button {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  gap: 8px;
  min-width: 164px;
  height: 48px;
  background: var(--color-brand-primary, #000000);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: #FFFFFF;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  box-sizing: border-box;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.primary-download-button:hover {
  background: var(--color-button-hover);
  transform: translateY(-1px);
}

.primary-download-button:active {
  transform: translateY(0);
}

.secondary-print-button {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  gap: 8px;
  min-width: 160px;
  height: 48px;
  background: #FFFFFF;
  border: 1.5px solid #000000;
  border-radius: 6px;
  cursor: pointer;
  color: #000000;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.1s ease;
}

.secondary-print-button:hover {
  background: #F8FAFC;
  transform: translateY(-1px);
}

.secondary-print-button:active {
  transform: translateY(0);
}

.btn-icon-svg {
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .printable-invoice-card {
    padding: 24px;
    gap: 24px;
    min-height: auto;
  }
  .invoice-header-frame {
    height: auto;
    flex-wrap: wrap;
    gap: 16px;
  }
  .invoice-parties-frame {
    flex-direction: column;
    gap: 20px;
    min-height: auto;
  }
  .invoice-table-header,
  .invoice-product-row {
    gap: 12px;
  }
  .invoice-table-frame {
    overflow-x: auto;
  }
  .invoice-summary-card {
    width: 100%;
  }
  .summary-breakdown-row,
  .summary-final-row,
  .summary-box-line {
    width: 100%;
  }
  .invoice-footer-frame {
    height: auto;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  .invoice-action-controls {
    flex-direction: column-reverse;
    align-items: stretch;
    height: auto;
    gap: 16px;
  }
  .invoice-buttons-wrap {
    flex-wrap: wrap;
    width: 100%;
  }
}

/* Print CSS: the invoice card alone, on A4 (page rules live in the unscoped <style> at the end of the file) */
@media print {
  .invoice-modal-overlay {
    background: transparent !important;
    position: static !important;
    padding: 0 !important;
  }
  .invoice-modal-close-btn,
  .invoice-action-controls {
    display: none !important;
  }
}

/* ==========================================================================
   Orders tab on phones: the Figma frames use fixed heights/widths, so rows
   overlapped when text wrapped. Let every block size to its content and stack.
   ========================================================================== */
@media (max-width: 640px) {
  .orders-tab-view,
  .orders-detailed-list { gap: 12px; }

  /* filter bar: tabs on top (2x2), search below, full width */
  .filter-sort-bar {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 12px;
    gap: 12px;
  }
  .filter-tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: auto;
    gap: 8px;
  }
  .filter-tabs .tab-btn {
    height: 38px;
    padding: 6px 8px;
    font-size: 13px;
    white-space: nowrap;
  }
  .search-box { width: 100%; box-sizing: border-box; }
  .search-box .search-input { width: auto; min-width: 0; font-size: 13px; }

  /* card */
  .order-detailed-card {
    padding: 16px;
    gap: 12px;
    min-height: 0;
  }

  /* top: status badge, then order number + date */
  .card-top-info {
    flex-direction: column-reverse;
    align-items: stretch;
    height: auto;
    gap: 12px;
  }
  .status-area { height: auto; justify-content: flex-start; }
  .status-badge {
    height: 30px;
    padding: 4px 14px;
    font-size: 12px;
    line-height: 18px;
  }
  .main-meta {
    height: auto;
    gap: 12px;
    justify-content: space-between;
  }
  .meta-col { height: auto; flex: 1 1 0; min-width: 0; gap: 2px; }
  .meta-label { font-size: 11px; line-height: 16px; }
  .meta-val { font-size: 13px; line-height: 20px; overflow-wrap: anywhere; }
  .meta-divider { height: 28px; flex: none; }

  /* middle: products on the first row, total on its own row */
  .card-middle-content {
    flex-wrap: wrap;
    height: auto;
    gap: 12px;
  }
  .products-description {
    flex: 1 1 100%;
    height: auto;
    gap: 12px;
    min-width: 0;
  }
  .prod-icon-frame { width: 44px; height: 44px; }
  .prod-icon-frame svg { width: 20px; height: 20px; }
  .prod-text-frame { height: auto; gap: 2px; min-width: 0; }
  .prod-count { font-size: 14px; line-height: 21px; }
  .prod-subtitle { font-size: 12px; line-height: 18px; }
  .price-actions {
    flex: 1 1 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: auto;
    direction: rtl;
    text-align: right;
    padding: 10px 12px;
    background: #F8FAFC;
    border-radius: 8px;
  }
  .price-label { font-size: 12px; }
  .price-unit { height: auto; direction: ltr; }
  .price-amount { font-size: 16px; line-height: 24px; font-weight: 700; }

  /* bottom: help text, then the details link */
  .card-bottom-actions {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    gap: 8px;
  }
  .help-prompt { height: auto; flex-wrap: wrap; gap: 4px 8px; }
  .help-question,
  .help-link,
  .order-action-link { font-size: 13px; line-height: 20px; }
  .actions-left { height: auto; justify-content: flex-start; }
  .order-action-link { height: auto; }
}

/* Order details on phones: stack the header, turn the stepper vertical, full-width buttons */
@media (max-width: 640px) {
  .order-details-view { gap: 12px; }

  .order-info-card,
  .order-tracking-card,
  .products-card,
  .summary-card { padding: 16px; gap: 12px; min-height: 0; }

  .tracking-title,
  .products-card-title,
  .summary-card-title { font-size: 18px; line-height: 26px; }

  /* order number + date, then the status badge */
  .order-info-frame { flex-direction: column-reverse; align-items: stretch; gap: 12px; }
  .order-info-meta { gap: 12px; justify-content: space-between; }
  .info-meta-col { flex: 1 1 0; min-width: 0; gap: 2px; }
  .info-meta-label { font-size: 11px; line-height: 16px; }
  .info-meta-val { font-size: 13px; line-height: 20px; overflow-wrap: anywhere; }
  .info-meta-divider { height: 28px; flex: none; }
  .order-status-badge { align-self: flex-start; min-width: 0; height: 30px; padding: 4px 14px; font-size: 12px; line-height: 18px; }

  /* vertical tracking: circle on the start side, text beside it */
  .timeline-row {
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
    padding-bottom: 0;
    overflow: visible;
  }
  .timeline-step {
    display: grid;
    grid-template-columns: 40px 1fr;
    column-gap: 12px;
    row-gap: 0;
    align-items: center;
    flex: none;
    min-width: 0;
    text-align: right;
  }
  .step-indicator-wrapper { grid-row: 1 / span 3; grid-column: 1; }
  .step-title,
  .step-time,
  .step-note { grid-column: 2; text-align: right; }
  .step-title { font-size: 14px; line-height: 21px; }
  .step-time,
  .step-note { font-size: 12px; line-height: 18px; }
  .timeline-connector {
    width: 40px;
    height: 20px;
    margin: 2px 0;
    align-self: flex-start;
  }
  .connector-bar { height: 20px; }

  /* buttons */
  .bottom-action-buttons {
    flex-direction: column-reverse;
    align-items: stretch;
    height: auto;
    gap: 12px;
  }
  .help-prompt-col { flex-wrap: wrap; justify-content: center; gap: 4px 8px; }
  .help-q-text,
  .help-link-bold { font-size: 13px; line-height: 20px; }
  .action-buttons-wrap { flex-direction: column-reverse; align-items: stretch; width: 100%; gap: 10px; }
  .btn-primary-invoice,
  .btn-secondary-back {
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    font-size: 15px;
    white-space: nowrap;
  }
}

/* Order details on phones, part 2: products as stacked rows, compact summary / address / payment */
@media (max-width: 640px) {
  .address-payment-split { gap: 12px; }
  .delivery-card,
  .payment-card { padding: 16px; gap: 10px; }
  .card-heading-md { font-size: 15px; line-height: 22px; }
  .delivery-name { font-size: 14px; line-height: 21px; }
  .delivery-detail { font-size: 13px; line-height: 20px; overflow-wrap: anywhere; }
  .payment-method-row { height: auto; gap: 8px; }
  .payment-method-text { font-size: 14px; line-height: 21px; }

  .summary-rows-wrap { gap: 10px; }
  .summary-item-row { height: auto; min-height: 24px; }
  .summary-item-label { font-size: 14px; line-height: 21px; }
  .summary-item-val { font-size: 13px; line-height: 20px; }
  .summary-total-row { height: auto; }
  .summary-total-label { font-size: 16px; line-height: 24px; }
  .summary-total-val { font-size: 20px; line-height: 30px; }

  /* products: header row is replaced by per-cell labels */
  .products-table-header { display: none; }
  .product-row-item {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 8px;
    row-gap: 12px;
    padding: 12px 0;
  }
  .col-prod-details { grid-column: 1 / -1; gap: 12px; min-width: 0; }
  .prod-thumb-img { width: 56px; height: 56px; }
  .prod-main-name { font-size: 14px; line-height: 21px; }
  .prod-model-num { font-size: 11px; line-height: 16px; }
  .col-unit-price-cell,
  .col-qty-cell,
  .col-total-cell {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 2px 4px;
    padding: 8px 10px;
    background: #F8FAFC;
    border-radius: 8px;
    text-align: right;
    font-size: 13px;
    line-height: 20px;
    font-weight: 700;
  }
  .col-unit-price-cell::before,
  .col-qty-cell::before,
  .col-total-cell::before {
    flex: 1 0 100%;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;
    color: #64748B;
  }
  .col-unit-price-cell::before { content: 'السعر'; }
  .col-qty-cell::before { content: 'الكمية'; }
  .col-total-cell::before { content: 'الإجمالي'; }
}
/* Breadcrumb -> tabs -> content: equal breathing room above and below the tabs row on phones */
@media (max-width: 900px) {
  .breadcrumb-flow { margin-bottom: 12px; }
  .profile-mobile-tabs-container { margin-bottom: 12px !important; }
  .profile-mobile-tabs { padding: 4px 0 !important; }
  .main-content-layout { padding-top: 0 !important; }
}

/* In-page invoice on phones: single column, symmetric padding, products as stacked cells */
@media (max-width: 640px) {
  .inpage-invoice-view { width: 100%; gap: 12px; align-items: stretch; }
  .inpage-invoice-top-bar { width: 100%; gap: 8px; }
  .btn-back-to-order-details,
  .btn-back-to-orders-list { padding: 10px 14px; font-size: 13px; line-height: 20px; white-space: nowrap; }
  .btn-back-to-order-details { flex: 1 1 auto; justify-content: center; }
  .btn-back-to-orders-list { flex: 0 0 auto; }

  .printable-invoice-card {
    width: 100%;
    padding: 20px 16px;
    gap: 20px;
    min-height: 0;
    align-items: stretch;
    border-radius: 14px;
  }

  .invoice-header-frame {
    flex-direction: column-reverse;
    align-items: stretch;
    flex-wrap: nowrap;
    height: auto;
    gap: 16px;
  }
  .invoice-meta-block { min-width: 0; height: auto; gap: 4px; }
  .invoice-type-title { font-size: 22px; line-height: 32px; }
  .invoice-meta-row { white-space: normal; overflow-wrap: anywhere; }
  .invoice-company-block { width: auto; height: auto; gap: 6px; }
  .invoice-logo-wrapper { width: auto; height: auto; }
  .invoice-company-name,
  .invoice-vat-number { width: auto; height: auto; }

  .invoice-parties-frame { gap: 16px; }
  .invoice-party-col { gap: 6px; width: 100%; }
  .invoice-party-item { overflow-wrap: anywhere; text-align: start; }

  .invoice-table-frame { overflow: visible; }
  .invoice-table-header { display: none; }
  .invoice-product-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 8px;
    row-gap: 10px;
    height: auto;
    padding: 12px 0;
    align-items: stretch;
  }
  .invoice-product-row .col-product {
    grid-column: 1 / -1;
    font-size: 15px;
    line-height: 22px;
    overflow-wrap: anywhere;
  }
  .invoice-product-row .col-price,
  .invoice-product-row .col-qty,
  .invoice-product-row .col-total {
    width: auto;
    min-width: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2px 4px;
    padding: 8px 10px;
    background: #F8FAFC;
    border-radius: 8px;
    text-align: right;
    font-size: 13px;
    line-height: 20px;
    font-weight: 700;
    color: #000000;
  }
  .invoice-product-row .col-price { color: #64748B; }
  .invoice-product-row .col-price::before,
  .invoice-product-row .col-qty::before,
  .invoice-product-row .col-total::before {
    flex: 1 0 100%;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;
    color: #64748B;
  }
  .invoice-product-row .col-price::before { content: 'سعر الوحدة'; }
  .invoice-product-row .col-qty::before { content: 'الكمية'; }
  .invoice-product-row .col-total::before { content: 'الإجمالي'; }

  .invoice-summary-card { width: 100%; align-self: stretch; margin: 0; }
  .summary-breakdown-row,
  .summary-final-row,
  .summary-box-line { width: 100%; }
  .summary-breakdown-row { height: auto; min-height: 21px; }
  .summary-final-row { height: auto; }
  .final-total-val { font-size: 20px; line-height: 30px; }

  .invoice-footer-frame { height: auto; flex-direction: column; align-items: flex-start; gap: 6px; }

  .invoice-action-controls { width: 100%; gap: 12px; }
  .invoice-buttons-wrap { flex-direction: column-reverse; align-items: stretch; width: 100%; gap: 10px; }
  .primary-download-button,
  .secondary-print-button { width: 100%; min-width: 0; height: 48px; padding: 12px 16px; font-size: 15px; }
}
</style>

<style>
/* Print the invoice card alone, on one A4 page. Unscoped on purpose: it has to hide the rest of the app
   (header, footer, other tabs) that belongs to other components. */
@page {
  size: A4 portrait;
  margin: 10mm;
}
@media print {
  html, body {
    height: 277mm !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    overflow: hidden !important;
  }
  body * {
    visibility: hidden;
  }
  #printable-invoice-card,
  #printable-invoice-card * {
    visibility: visible;
  }
  #printable-invoice-card {
    position: fixed !important;
    inset: 0 auto auto 0 !important;
    /* keep the 960px design width and scale it to the 190mm printable width (718px) of A4 */
    width: 960px !important;
    max-width: none !important;
    transform: scale(0.74) !important;
    transform-origin: top left !important;
    min-height: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    gap: 24px !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
