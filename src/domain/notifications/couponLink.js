// A discount-code notification links to "/?coupon=CODE&from=..&to=..&type=..&value=..".
// Opening it shows the code with a copy button instead of navigating (see components/CouponDialog.vue).
// Written by admin/src/domain/notifications/couponNotice.js.

/** The code details in a notification link, or null when the link is not a discount-code one. */
export const parseCouponLink = (link) => {
  try {
    const url = new URL(String(link || ''), 'https://site.local');
    const code = (url.searchParams.get('coupon') || '').trim();
    if (!code) return null;
    const value = Number(url.searchParams.get('value'));
    const type = url.searchParams.get('type') === 'fixed' ? 'fixed' : 'percentage';
    return {
      code,
      from: url.searchParams.get('from') || '',
      to: url.searchParams.get('to') || '',
      type,
      value: Number.isFinite(value) && value > 0 ? value : 0,
    };
  } catch {
    return null;
  }
};

/** What the dialog says, in 'ar' or 'en'. */
export const couponDialogText = (coupon, lang = 'ar') => {
  const ar = lang !== 'en';
  const amount = coupon.value
    ? `${coupon.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}${coupon.type === 'fixed' ? (ar ? ' ر.س' : ' SAR') : '%'}`
    : '';
  // Dates are isolated so Arabic text does not reorder their digits.
  const iso = (value) => (ar ? `\u2066${value}\u2069` : value);
  let period;
  if (coupon.from && coupon.to) period = ar ? `من ${iso(coupon.from)} إلى ${iso(coupon.to)}` : `From ${coupon.from} to ${coupon.to}`;
  else if (coupon.from) period = ar ? `ابتداءً من ${iso(coupon.from)}` : `Starting ${coupon.from}`;
  else if (coupon.to) period = ar ? `حتى ${iso(coupon.to)}` : `Until ${coupon.to}`;
  else period = '';
  return {
    title: ar ? 'كود خصم جديد' : 'New discount code',
    intro: ar ? `استخدم كود الخصم \u2066${coupon.code}\u2069${amount ? ` واحصل على خصم ${amount}` : ''}` : `Use the discount code ${coupon.code}${amount ? ` to get ${amount} off` : ''}`,
    period,
    copy: ar ? 'نسخ الكود' : 'Copy code',
    copied: ar ? 'تم النسخ' : 'Copied',
    close: ar ? 'إغلاق' : 'Close',
    hint: ar ? 'الصق الكود في خانة كود الخصم عند إتمام الطلب.' : 'Paste the code in the discount code box at checkout.',
  };
};
