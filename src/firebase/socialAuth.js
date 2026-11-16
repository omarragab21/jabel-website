// Google and Apple sign-in through Firebase Authentication (project jabal-3e49e).
// Firebase talks to Google/Apple and hands back a Firebase ID token; the site then swaps it for its own session
// (POST /v1/auth/firebase), so the rest of the app (cart, orders, profile) is unchanged.
import { getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, OAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

// TEMPORARY: while true, Google/Apple sign-in does NOT call the site's server. After the Firebase window it only shows a
// dialog with the data that came back (name, email, photo, token claims) so the server route can be built against it.
// To remove: set this to false and delete components/SocialLoginPreview.vue and its use in AuthModal.vue.
export const SOCIAL_LOGIN_PREVIEW = true;

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

/** The readable part of a JWT (claims), or null when it is not one. */
export const decodeJwtPayload = (token) => {
  try {
    const part = String(token).split('.')[1];
    const json = decodeURIComponent(atob(part.replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

/** Opens the Google or Apple window and resolves everything Firebase knows about the signed-in user. */
export async function signInWithProvider(name) {
  const provider = name === 'apple' ? new OAuthProvider('apple.com') : new GoogleAuthProvider();
  if (name === 'apple') {
    provider.addScope('email');
    provider.addScope('name');
  }
  const { user, providerId } = await signInWithPopup(firebaseAuth(), provider);
  const idToken = await user.getIdToken();
  return {
    idToken,
    provider: providerId || (name === 'apple' ? 'apple.com' : 'google.com'),
    uid: user.uid,
    name: user.displayName || '',
    email: user.email || '',
    emailVerified: Boolean(user.emailVerified),
    photo: user.photoURL || '',
    phone: user.phoneNumber || '',
    providerData: (user.providerData || []).map(({ providerId: id, uid, displayName, email, photoURL }) => ({ providerId: id, uid, displayName, email, photoURL })),
    claims: decodeJwtPayload(idToken),
  };
}
