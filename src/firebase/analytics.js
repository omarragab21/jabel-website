import { getAnalytics, isSupported, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { firebaseApp, firebaseConfig } from './webPush.js';

let analytics = null;

/** Starts Google Analytics (or switches it back on after it was switched off). */
export const startAnalytics = async () => {
  if (!firebaseConfig.measurementId || !(await isSupported())) return null;
  const app = firebaseApp();
  if (!app) return null;
  analytics = analytics || getAnalytics(app);
  setAnalyticsCollectionEnabled(analytics, true);
  return analytics;
};

/** Stops sending usage data until the visitor allows it again. */
export const stopAnalytics = async () => {
  if (!analytics) return;
  setAnalyticsCollectionEnabled(analytics, false);
};
