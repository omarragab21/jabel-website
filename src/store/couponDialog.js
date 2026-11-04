import { reactive } from 'vue';
import { parseCouponLink } from '../domain/notifications/couponLink.js';

export const couponDialog = reactive({ coupon: null });

/** Opens the copy-code dialog when the link is a discount-code notification. Returns whether it did. */
export const openCouponFromLink = (link) => {
  const coupon = parseCouponLink(link);
  if (!coupon) return false;
  couponDialog.coupon = coupon;
  return true;
};

export const closeCouponDialog = () => { couponDialog.coupon = null; };
