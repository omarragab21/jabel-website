import dashboardIcon from '../../../assets/profile/menu-dashboard.svg'
import ordersIcon from '../../../assets/profile/menu-orders.svg'
import addressesIcon from '../../../assets/profile/menu-addresses.svg'
import notificationsIcon from '../../../assets/profile/menu-notifications.svg'
import profileIcon from '../../../assets/profile/menu-profile.svg'
import returnsIcon from '../../../assets/return-request.svg'
import logoutIcon from '../../../assets/profile/menu-logout.svg'

// `inset` is the icon's offset inside the 16px icon box, copied from the Figma node.
export const PROFILE_SIDEBAR_ITEMS = [
  { tab: 'overview', to: '/profile', labelKey: 'profile.overview', fallback: 'نظرة عامة', icon: dashboardIcon, inset: '7.29%' },
  { tab: 'orders', to: '/profile?tab=orders', labelKey: 'profile.orders', fallback: 'طلباتي', icon: ordersIcon, inset: '3.13% 5.68% 3.59% 7.21%' },
  { tab: 'addresses', to: '/profile?tab=addresses', labelKey: 'profile.addresses', fallback: 'العناوين', icon: addressesIcon, inset: '5.21% 17.7%' },
  { tab: 'notifications', to: '/profile?tab=notifications', labelKey: 'profile.notifications', fallback: 'الإشعارات', icon: notificationsIcon, inset: '5.21% 7.28% 5.21% 7.29%', badge: true },
  { tab: 'info', to: '/profile?tab=info', labelKey: 'profile.personal_info', fallback: 'الملف الشخصي', icon: profileIcon, inset: '5.21%' },
  { tab: 'returns', to: '/profile?tab=returns', labelKey: 'profile.returns', fallback: 'المرتجعات', icon: returnsIcon, inset: '0' },
]

export const PROFILE_LOGOUT_ITEM = { labelKey: 'profile.logout', fallback: 'تسجيل الخروج', icon: logoutIcon, inset: '9.37%' }
