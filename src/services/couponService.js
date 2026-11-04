import api from '../config/axios';

const asNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const getLocale = () => {
  try {
    return globalThis.localStorage?.getItem('lang') === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
};

const couponMessage = (key, value) => {
  const messages = {
    ar: {
      applied: 'تم تطبيق الكوبون بنجاح',
      invalid: 'رمز الكوبون غير صالح',
      expired: 'الكوبون لم يعد صالحاً',
      used: 'لقد استخدمت هذا الكوبون من قبل',
      minimum: `الحد الأدنى للطلب هو ${value}`,
      noDiscount: 'الكوبون لا يخصم أي قيمة من هذا الطلب',
    },
    en: {
      applied: 'Coupon applied successfully',
      invalid: 'Invalid coupon code',
      expired: 'This coupon is no longer valid',
      used: 'You have already used this coupon',
      minimum: `Minimum order amount is ${value}`,
      noDiscount: 'This coupon does not apply a discount to this order',
    },
  };
  return messages[getLocale()][key];
};

const failure = (message, data) => ({ success: false, valid: false, ...(data ? { data } : {}), message });

// A rejected code answers 422 { message, errors: { code | subtotal: [...] } }; turn it into the
// customer-facing message of the selected language. Anything else (401, 5xx, no network) is rethrown.
const rejection = (error) => {
  const status = error?.response?.status;
  if (status !== 422) throw error;
  const errors = error.response?.data?.errors || {};
  const serverText = String(errors.code?.[0] || errors.subtotal?.[0] || error.response?.data?.message || '');
  if (errors.subtotal) {
    // The amount can carry thousands separators ("5,000.00").
    const minimum = serverText.match(/minimum[^0-9]*([0-9][0-9,]*(?:\.[0-9]+)?)/i);
    if (minimum) return failure(couponMessage('minimum', asNumber(minimum[1].replace(/,/g, ''))));
    return failure(couponMessage('invalid'));
  }
  // "You have already ..." is about this customer; every other limit/date message is about the code itself.
  if (/you have already/i.test(serverText)) return failure(couponMessage('used'));
  if (/expired|no longer|not started|inactive|usage limit|reached/i.test(serverText)) return failure(couponMessage('expired'));
  return failure(couponMessage('invalid'));
};

export const couponService = {
  /**
   * Preview a discount code for the current cart. The server checks the code, its dates, usage
   * limits, the customer's earlier use and the minimum order, and returns the amount to deduct.
   * It does not consume a use: the code is redeemed when the order is placed with `coupon_code`.
   */
  async validate(code, amount) {
    const normalizedCode = String(code ?? '').trim();
    const orderAmount = Math.max(0, asNumber(amount));
    if (!normalizedCode) return failure(couponMessage('invalid'));

    let applied;
    try {
      applied = (await api.post('/v1/site/discounts/apply', { code: normalizedCode, subtotal: orderAmount })).data?.data;
    } catch (error) {
      return rejection(error);
    }

    const discount = Math.min(orderAmount, Math.max(0, asNumber(applied?.discount_amount)));
    if (discount <= 0) return failure(couponMessage('noDiscount'), applied);

    const coupon = { ...applied, code: applied.code || normalizedCode };
    return {
      success: true,
      valid: true,
      status: 'success',
      data: coupon,
      coupon,
      discount,
      total_after_discount: asNumber(applied.total_after_discount, orderAmount - discount),
      message: couponMessage('applied'),
    };
  },
};
