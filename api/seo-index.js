// Serves the site's index.html with the SEO text from the dashboard (Settings > SEO & link preview) written into
// <head>, so Google and link previews (Telegram, WhatsApp, Facebook) see it without running JavaScript.
// vercel.json sends every page request here; static files (assets, images, sitemap...) never reach it.
// If anything goes wrong the unchanged index.html is served, so the site never depends on this function.
import { renderSeoHtml } from '../src/domain/site/seoHtml.js';

export const config = { runtime: 'edge' };

const BACKEND = 'https://backend-jabal.be-kite.com';
const SHELL_HEADER = 'x-seo-shell';

const fetchSettings = async () => {
  try {
    const response = await fetch(`${BACKEND}/api/v1/site/settings`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(2500),
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
};

export default async function handler(request) {
  // The function fetches index.html from its own origin; this header stops it from ever answering itself.
  if (request.headers.get(SHELL_HEADER)) return new Response('', { status: 404 });

  const url = new URL(request.url);
  const shellResponse = await fetch(new URL('/index.html', url.origin), { headers: { [SHELL_HEADER]: '1' } });
  if (!shellResponse.ok) return new Response('Site is temporarily unavailable', { status: 502 });
  const shell = await shellResponse.text();

  let html = shell;
  try {
    const settings = await fetchSettings();
    if (settings) html = renderSeoHtml(shell, settings, { origin: url.origin, pathname: url.pathname });
  } catch {
    html = shell;
  }

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // A change saved in the dashboard reaches the link previews within a minute.
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
