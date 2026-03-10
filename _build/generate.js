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
