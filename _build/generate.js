#!/usr/bin/env node
// Castle Garage Doors & Gates — Static Site Generator
// Generates all HTML pages from page data modules
// Usage: node _build/generate.js

const fs = require('fs');
const path = require('path');
const { pageHTML } = require('./templates');

// Import all page data
const homePages = require('./pages-home');
const servicePages = require('./pages-services');
const servicePages2 = require('./pages-services2');
const locationPages = require('./pages-locations');
const standalonePages = require('./pages-standalone');
const blogPages = require('./pages-blog');

const allPages = [
  ...homePages,
  ...servicePages,
  ...servicePages2,
  ...locationPages,
  ...standalonePages,
  ...blogPages
];

const ROOT = path.join(__dirname, '..');

let generated = 0;

allPages.forEach(page => {
  const filePath = path.join(ROOT, page.file);
  const dir = path.dirname(filePath);

  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Generate HTML
  const html = pageHTML(page);

  // Write file
  fs.writeFileSync(filePath, html, 'utf-8');
  generated++;
  console.log(`  ✓ ${page.file}`);
});

console.log(`\n  Generated ${generated} pages.`);

// --- Generate sitemap.xml ---
const { SITE_URL } = require('./templates');
function sitemapPriority(file) {
  if (file === 'index.html') return '1.0';
  if (file.startsWith('services/') && file.endsWith('index.html')) return '0.9';
  if (file.startsWith('services/')) return '0.8';
  if (file.startsWith('service-areas/')) return '0.8';
  if (file.startsWith('blog/') && file !== 'blog/index.html') return '0.7';
  if (file === 'blog/index.html') return '0.6';
  if (['privacy.html','terms.html','404.html'].includes(file)) return '0.3';
  return '0.5';
}
const today = new Date().toISOString().split('T')[0];
const sitemapEntries = allPages
  .filter(p => p.file !== '404.html')
  .map(p => {
    const loc = `${SITE_URL}/${p.file.replace('index.html', '')}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${sitemapPriority(p.file)}</priority>\n  </url>`;
  }).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf-8');
console.log('  ✓ sitemap.xml');

// --- Generate robots.txt ---
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots, 'utf-8');
console.log('  ✓ robots.txt');
