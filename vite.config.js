import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Dev server only: writes the dashboard's SEO text into index.html, like api/seo-index.js does on Vercel, so the
// head can be checked locally (curl http://localhost:5173/). Never breaks the page: no answer means the plain file.
const seoHeadFromSettings = () => ({
  name: 'jabel-seo-head',
  apply: 'serve',
  async transformIndexHtml(html, ctx) {
    try {
      const { renderSeoHtml } = await import('./src/domain/site/seoHtml.js');
      const response = await fetch('https://backend-jabal.be-kite.com/api/v1/site/settings', {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(2500),
      });
      if (!response.ok) return html;
      const port = ctx.server?.config.server.port ?? 5173;
      const pathname = new URL(ctx.originalUrl || '/', 'http://localhost').pathname;
      return renderSeoHtml(html, await response.json(), { origin: `http://localhost:${port}`, pathname });
    } catch {
      return html;
    }
  },
});

export default defineConfig({
  plugins: [vue(), seoHeadFromSettings()],
  server: {
    port: 5173,
    cors: true,
    fs: { allow: [projectRoot, path.resolve(projectRoot, '..')] },
    proxy: {
      '/api': { target: 'https://backend-jabal.be-kite.com', changeOrigin: true, secure: false },
      '/storage': { target: 'https://backend-jabal.be-kite.com', changeOrigin: true, secure: false },
    },
  },
});
