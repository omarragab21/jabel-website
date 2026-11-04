import { defineStore } from 'pinia';
import { profileService } from '../services/profileService';
import { authState } from '../../../store/auth';
import { currentLang, pickText } from '../../../utils/localeText.js';
import { customerNotifications, markRead } from '../../../domain/notifications/customerNotifications.js';

const normalizeNotification = (notification, { localized, formatDate }) => ({
  id: notification.id,
  title: notification.title || notification.message || localized(notification, 'title'),
  link: notification.link || '',
  time: notification.time || (notification.created_at ? formatDate(notification.created_at) : pickText('اليوم', 'Today')),
  is_read: !!notification.is_read,
});

export const useProfileStore = defineStore('profileFeature', {
  state: () => ({
    user: null,
    loadingData: false,
    addressesList: [],
    ordersList: [],
    notificationsList: [],
    returnsList: [],
    countries: [],
    cities: [],
  }),

  getters: {
    notificationCount: (state) => state.notificationsList.filter((notification) => !notification.is_read).length,
  },

  actions: {
    async load({ localized, formatDate }) {
      this.loadingData = true;
      // Resolve the profile first so order/return ownership checks have the
      // current customer id before their requests are normalized in parallel.
      const userResult = await Promise.allSettled([profileService.getUser()]).then(([result]) => result);
      if (userResult.status === 'fulfilled') {
        this.user = userResult.value;
        authState.user = userResult.value;
        try {
          localStorage.setItem('c_user', JSON.stringify(userResult.value || {}));
        } catch {
          // Storage can be unavailable in private/embedded browser contexts.
        }
      }

      const [addressesResult, ordersResult, feedResult, returnsResult] = await Promise.allSettled([
        profileService.getAddresses(),
        profileService.getOrders(),
        profileService.getPublicFeed(),
        profileService.getReturns(),
      ]);

      this.addressesList = addressesResult.status === 'fulfilled' ? addressesResult.value : [];
      this.ordersList = ordersResult.status === 'fulfilled' ? ordersResult.value : [];
      this.notificationsList = customerNotifications(
        this.ordersList,
        feedResult.status === 'fulfilled' ? feedResult.value : [],
        currentLang(),
      ).map((notification) => normalizeNotification(notification, { localized, formatDate }));
      this.returnsList = returnsResult.status === 'fulfilled' ? returnsResult.value : [];
      this.loadingData = false;
      return this.user;
    },

    getCountries() {
      return profileService.getCountries();
    },

    getCities(params) {
      return profileService.getCities(params);
    },

    getSettings() {
      return profileService.getSettings();
    },

    async fetchNotifications({ localized, formatDate }) {
      const [ordersResult, feedResult] = await Promise.allSettled([profileService.getOrders(), profileService.getPublicFeed()]);
      if (ordersResult.status === 'fulfilled') this.ordersList = ordersResult.value;
      this.notificationsList = customerNotifications(this.ordersList, feedResult.status === 'fulfilled' ? feedResult.value : [], currentLang())
        .map((notification) => normalizeNotification(notification, { localized, formatDate }));
    },

    // Read state is kept in this browser (the API has no notifications endpoint).
    markAllNotificationsRead() {
      this.notificationsList.forEach((notification) => { notification.is_read = true; });
      markRead(this.notificationsList.map((notification) => notification.id));
    },

    markNotificationRead(notification) {
      if (!notification || notification.is_read) return;
      notification.is_read = true;
      markRead([notification.id]);
    },

    updateProfile(payload) {
      return profileService.updateProfile(payload).then((user) => {
        this.user = user;
        return user;
      });
    },

    changePassword(payload) {
      return profileService.changePassword(payload);
    },

    submitReview(payload) {
      return profileService.submitReview(payload);
    },

    createAddress(payload) {
      return profileService.createAddress(payload);
    },

    updateAddress(id, payload) {
      return profileService.updateAddress(id, payload);
    },

    setDefaultAddress(id) {
      return profileService.setDefaultAddress(id);
    },

    deleteAddress(id) {
      return profileService.deleteAddress(id);
    },

    createReturn(payload) {
      return profileService.createReturn(payload);
    },
  },
});
