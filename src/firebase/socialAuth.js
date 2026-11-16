// Google and Apple sign-in through Firebase Authentication (project jabal-3e49e).
// Firebase talks to Google/Apple and hands back a Firebase ID token; the site then swaps it for its own session
// (POST /v1/auth/firebase), so the rest of the app (cart, orders, profile) is unchanged.
import { getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, OAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const config = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const isSocialAuthConfigured = () => {
  const c = config();
  return Boolean(c.apiKey && c.authDomain && c.projectId && c.appId);
};

const firebaseAuth = () => getAuth(getApps()[0] || initializeApp(config()));

/** Firebase errors that only mean "the visitor closed or cancelled the window": nothing to show. */
export const isSocialAuthCancelled = (error) =>
  ['auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/user-cancelled'].includes(error?.code);

/** Opens the Google or Apple window and resolves { idToken, name, email } of the signed-in Firebase user. */
export async function signInWithProvider(name) {
  const provider = name === 'apple' ? new OAuthProvider('apple.com') : new GoogleAuthProvider();
  if (name === 'apple') {
    provider.addScope('email');
    provider.addScope('name');
  }
  const { user } = await signInWithPopup(firebaseAuth(), provider);
  return { idToken: await user.getIdToken(), name: user.displayName || '', email: user.email || '' };
}
