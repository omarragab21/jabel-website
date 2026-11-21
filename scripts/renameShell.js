// Vercel serves a static dist/index.html for "/" before it looks at the rewrites, so the home page would never reach
// api/seo-index.js (the function that writes the dashboard's SEO text into <head>). After the build, on Vercel only,
// the page shell is renamed to app-shell.html: "/" and every other page then go through the function, which reads
// the shell from there. Local builds keep index.html so `npm run preview` still works.
import fs from 'node:fs';
import path from 'node:path';

if (!process.env.VERCEL) {
  console.log('renameShell: not on Vercel, index.html kept');
} else {
  const dist = path.resolve(process.cwd(), 'dist');
  fs.renameSync(path.join(dist, 'index.html'), path.join(dist, 'app-shell.html'));
  console.log('renameShell: dist/index.html -> dist/app-shell.html');
}
