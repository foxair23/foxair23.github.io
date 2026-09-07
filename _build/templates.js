// HTML template functions for Castle Garage Doors & Gates
// Used by generate.js to build all pages

const PHONE = '(800) 576-1397';
const PHONE_LINK = 'tel:8005761397';
const SITE_URL = 'https://www.castlegarage.com';
const LOGO_PATH = 'logo.png';

function getDepth(filePath) {
  // Count directory depth from root to determine relative path prefix
  const parts = filePath.split('/').filter(Boolean);
  return parts.length - 1; // subtract the filename
}

function getPrefix(filePath) {
  const depth = getDepth(filePath);
  if (depth === 0) return './';
  return '../'.repeat(depth);
}

function phoneIcon() {
  return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>';
}

function svgIcons() {
  return {
    wrench: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
    door: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-6 0H7V5h6v14zm2-8h2v2h-2v-2z"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm0-8h-2V6h2v2z"/></svg>',
    gate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 11V3H7v4H3v14h8v-4h2v4h8V7h-4v4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="white" stroke-width="2"/></svg>',
    yelp_icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    google: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.35 11.1h-9.18v2.73h5.51c-.24 1.27-.98 2.34-2.09 3.06v2.54h3.39c1.98-1.82 3.12-4.51 3.12-7.58 0-.52-.05-1.02-.13-1.5z" fill="#4285F4"/><path d="M12.17 22c2.84 0 5.22-.94 6.96-2.57l-3.39-2.54c-.94.63-2.15 1-3.57 1-2.74 0-5.06-1.85-5.89-4.34H2.76v2.62A10.5 10.5 0 0012.17 22z" fill="#34A853"/><path d="M6.28 13.55a6.3 6.3 0 010-4.1V6.83H2.76a10.5 10.5 0 000 9.34l3.52-2.62z" fill="#FBBC05"/><path d="M12.17 5.11c1.55 0 2.94.53 4.03 1.58l3.02-3.02C17.38 1.89 14.99.89 12.17.89A10.5 10.5 0 002.76 6.83l3.52 2.62c.83-2.49 3.15-4.34 5.89-4.34z" fill="#EA4335"/></svg>',
    nextdoor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5h-2v-4c0-1.38-1.12-2.5-2.5-2.5S9.5 11.12 9.5 12.5v4h-2v-4c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5v4z" fill="white"/></svg>',
  };
}

function header(prefix, activePage) {
  const ico = svgIcons();
  return `<header class="header" id="header" role="banner">
    <div class="header-inner">
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <a href="${prefix}index.html" class="logo" aria-label="Castle Garage Doors &amp; Gates - Home">
        <!-- Logo: Place Castle_Garage_Doors_Gates_Logo-scaled.png at images/logo.png -->
        <img src="${prefix}${LOGO_PATH}" alt="Castle Garage Doors And Gates" width="240" height="48">
      </a>
      <nav class="nav-desktop" aria-label="Main navigation">
        <div class="nav-dropdown">
          <a href="${prefix}services/index.html"${activePage==='services'?' class="active"':''}>Services <span class="nav-arrow">&#9662;</span></a>
          <div class="mega-menu mega-menu-services">
            <a href="${prefix}services/garage-door-repair/index.html">Garage Door Repair</a>
            <a href="${prefix}services/garage-door-installation/index.html">New Garage Doors</a>
            <a href="${prefix}services/garage-door-openers/index.html">Garage Door Openers</a>
            <a href="${prefix}services/gate-services/index.html">Gate Installation &amp; Repair</a>
            <a href="${prefix}services/garage-door-repair/emergency-repair.html">Emergency Repair</a>
            <a href="${prefix}services/index.html" class="mega-menu-viewall">View All Services &rarr;</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="${prefix}service-areas/index.html"${activePage==='areas'?' class="active"':''}>Service Areas <span class="nav-arrow">&#9662;</span></a>
          <div class="mega-menu mega-menu-areas">
            <a href="${prefix}service-areas/san-diego.html">San Diego</a>
            <a href="${prefix}service-areas/escondido.html">Escondido</a>
            <a href="${prefix}service-areas/oceanside.html">Oceanside</a>
            <a href="${prefix}service-areas/carlsbad.html">Carlsbad</a>
            <a href="${prefix}service-areas/encinitas.html">Encinitas</a>
            <a href="${prefix}service-areas/north-county.html">North County</a>
            <a href="${prefix}service-areas/temecula.html">Temecula</a>
            <a href="${prefix}service-areas/murrieta.html">Murrieta</a>
            <a href="${prefix}service-areas/fallbrook.html">Fallbrook</a>
            <a href="${prefix}service-areas/bonsall.html">Bonsall</a>
            <a href="${prefix}service-areas/riverside-county.html">Riverside County</a>
            <a href="${prefix}service-areas/corona.html">Corona</a>
            <a href="${prefix}service-areas/index.html" class="mega-menu-viewall">View All Service Areas &rarr;</a>
          </div>
        </div>
        <a href="${prefix}about/index.html"${activePage==='about'?' class="active"':''}>About</a>
        <a href="${prefix}reviews.html"${activePage==='reviews'?' class="active"':''}>Reviews</a>
        <a href="${prefix}gallery.html"${activePage==='gallery'?' class="active"':''}>Gallery</a>
        <a href="${prefix}blog/index.html"${activePage==='blog'?' class="active"':''}>Blog</a>
        <a href="${prefix}contact.html"${activePage==='contact'?' class="active"':''}>Contact</a>
      </nav>
      <div class="header-right">
        <div class="header-phone">
          <a href="${PHONE_LINK}" aria-label="Call us at ${PHONE}">
            ${phoneIcon()}
            <span class="phone-text">${PHONE}</span>
          </a>
        </div>
        <a href="${prefix}contact.html" class="btn btn-primary btn-sm header-schedule" data-track="schedule">Schedule Service</a>
      </div>
    </div>
  </header>
  <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
    <a href="${prefix}services/index.html">Services</a>
    <a href="${prefix}service-areas/index.html">Service Areas</a>
    <a href="${prefix}about/index.html">About Us</a>
    <a href="${prefix}reviews.html">Reviews</a>
    <a href="${prefix}gallery.html">Gallery</a>
    <a href="${prefix}blog/index.html">Blog</a>
    <a href="${prefix}contact.html">Contact</a>
    <a href="${PHONE_LINK}" class="btn btn-secondary" style="margin-top:16px;">Call ${PHONE}</a>
    <a href="${prefix}contact.html" class="btn btn-primary">Schedule Service</a>
  </nav>`;
}

function mobileNav(prefix) {
  const ico = svgIcons();
  return `<nav class="mobile-sticky-nav" aria-label="Mobile quick actions">
    <a href="${prefix}index.html" aria-label="Home">${ico.home} Home</a>
    <a href="${prefix}services/index.html" aria-label="Services">${ico.wrench} Services</a>
    <a href="${PHONE_LINK}" aria-label="Call (800) 576-1397" class="mobile-nav-call">${phoneIcon()} Call</a>
    <a href="${prefix}contact.html" aria-label="Schedule service" style="color:var(--color-red);">${ico.calendar} Schedule</a>
  </nav>`;
}

function floatingCta(prefix) {
  return `<div class="floating-cta" id="floatingCta">
    <a href="${prefix}contact.html" class="btn btn-primary" data-track="schedule">${svgIcons().calendar} Schedule Service</a>
  </div>`;
}

function footer(prefix) {
  const ico = svgIcons();
  return `<section class="cta-banner">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p>Get your free estimate today. No hidden fees, no pressure &mdash; just honest, expert service.</p>
      <div class="btn-group">
        <a href="${prefix}contact.html" class="btn btn-white" data-track="schedule">Get Your Free Estimate</a>
        <a href="${PHONE_LINK}" class="btn btn-outline-white">Call ${PHONE}</a>
      </div>
    </div>
  </section>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="logo"><img src="${prefix}${LOGO_PATH}" alt="Castle Garage Doors And Gates" width="200" height="40"></div>
          <p>Veteran-owned, family-run garage door and gate service company. Proudly serving San Diego to Riverside County since 1981.</p>
          <div class="footer-social">
            <a href="https://www.facebook.com/castlegaragedoorscorp" target="_blank" rel="noopener" aria-label="Castle Garage Doors on Facebook">${ico.facebook}</a>
            <a href="https://www.yelp.com/biz/castle-garage-doors-escondido" target="_blank" rel="noopener" aria-label="Castle Garage Doors on Yelp">${ico.yelp_icon}</a>
            <a href="https://maps.app.goo.gl/T9DtTWjanN9Zgyte9" target="_blank" rel="noopener" aria-label="Castle Garage Doors on Google">${ico.google}</a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <div class="footer-links">
            <a href="${prefix}services/garage-door-repair/index.html">Garage Door Repair</a>
            <a href="${prefix}services/garage-door-installation/index.html">New Garage Doors</a>
            <a href="${prefix}services/garage-door-openers/index.html">Garage Door Openers</a>
            <a href="${prefix}services/gate-services/index.html">Gate Services</a>
            <a href="${prefix}services/garage-door-repair/emergency-repair.html">Emergency Repair</a>
          </div>
        </div>
        <div>
          <h4>Service Areas</h4>
          <div class="footer-links">
            <a href="${prefix}service-areas/san-diego.html">San Diego</a>
            <a href="${prefix}service-areas/escondido.html">Escondido</a>
            <a href="${prefix}service-areas/oceanside.html">Oceanside</a>
            <a href="${prefix}service-areas/carlsbad.html">Carlsbad</a>
            <a href="${prefix}service-areas/temecula.html">Temecula</a>
            <a href="${prefix}service-areas/corona.html">Corona</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div class="footer-links">
            <a href="${PHONE_LINK}">${PHONE}</a>
            <a href="mailto:info@castlegarage.com">info@castlegarage.com</a>
            <span style="font-size:var(--text-small);line-height:1.4;">1291 Simpson Way Suite D<br>Escondido, CA 92029</span>
            <a href="${prefix}contact.html">Schedule Service</a>
            <a href="${prefix}specials.html">Specials &amp; Coupons</a>
          </div>
          <a href="${prefix}contact.html" class="btn btn-primary btn-sm" style="margin-top:16px;width:100%;text-align:center;" data-track="schedule">Schedule Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Castle Garage Doors &amp; Gates. All rights reserved. | <a href="${prefix}privacy.html">Privacy Policy</a> | <a href="${prefix}terms.html">Terms of Service</a></p>
        <div class="footer-badges">
          <span class="footer-badge">Home Depot Authorized</span>
          <span class="footer-badge">Clopay Dealer</span>
          <span class="footer-badge">BBB A+</span>
          <span class="footer-badge">Veteran-Owned</span>
          <span class="footer-badge">Licensed &amp; Insured</span>
          <span class="footer-badge">CSLB #1154002 (C-61/D-28)</span>
        </div>
      </div>
    </div>
  </footer>`;
}

function trustBar() {
  return `<div class="trust-bar">
    <div class="container">
      <div class="trust-bar-inner">
        <div class="trust-badge">${svgIcons().home} Authorized Home Depot Provider</div>
        <div class="trust-badge">${svgIcons().shield} Clopay Authorized Dealer</div>
        <div class="trust-badge">${svgIcons().check} BBB A+ Rating</div>
        <div class="trust-badge">${svgIcons().star} <span>Google <span class="stars">&#9733;&#9733;&#9733;&#9733;</span> 4.4 (49 Reviews)</span></div>
        <div class="trust-badge">${svgIcons().star} <span>Yelp <span class="stars">&#9733;&#9733;&#9733;&#9733;</span> 4.4 (161 Reviews)</span></div>
        <div class="trust-badge">${svgIcons().shield} CSLB #1154002</div>
      </div>
    </div>
  </div>`;
}

function breadcrumb(items, prefix) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
    ${items.map((item, i) => {
      if (i === items.length - 1) return `<span>${item.label}</span>`;
      return `<a href="${prefix}${item.href}">${item.label}</a><span class="sep">/</span>`;
    }).join(' ')}
  </nav>`;
}

function heroInterior(title, subtitle, crumbs, prefix) {
  return `<section class="hero-interior page-top">
    <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=60')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      ${breadcrumb(crumbs, prefix)}
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
      <div style="margin-top:var(--space-6);display:flex;flex-wrap:wrap;gap:12px;">
        <a href="${prefix}contact.html" class="btn btn-primary" data-track="schedule">Schedule Service</a>
        <a href="${PHONE_LINK}" class="btn btn-outline-white">Call ${PHONE}</a>
      </div>
    </div>
  </section>`;
}

function faqSection(faqs) {
  if (!faqs || !faqs.length) return '';
  return `<div class="section">
    <div class="container">
      <div class="section-header"><span class="section-label">FAQ</span><h2>Frequently Asked Questions</h2></div>
      <div class="faq-list">
        ${faqs.map(f => `<details class="faq-item"><summary>${f.q}</summary><div class="faq-answer">${f.a}</div></details>`).join('\n        ')}
      </div>
    </div>
  </div>`;
}

function faqSchema(faqs) {
  if (!faqs || !faqs.length) return '';
  return `<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,'\\"').replace(/<[^>]*>/g,'').replace(/\n/g,' ')}"}}`).join(',')}]}
  </script>`;
}

function relatedServices(items, prefix) {
  if (!items || !items.length) return '';
  return `<div class="related-services">
    <h3>Related Services</h3>
    <div class="related-grid">
      ${items.map(s => `<a href="${prefix}${s.href}" class="related-card">
        <div><h4>${s.title}</h4><p>${s.desc}</p></div>
      </a>`).join('\n      ')}
    </div>
  </div>`;
}

function processSteps(steps) {
  return `<div class="process-steps">
    ${steps.map((s, i) => `<div class="process-step"><div class="step-num">${i+1}</div><div><h4>${s.title}</h4><p>${s.desc}</p></div></div>`).join('\n    ')}
  </div>`;
}

function localBusinessSchema() {
  return `<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"HomeAndConstructionBusiness","@id":"${SITE_URL}/#business","name":"Castle Garage Doors & Gates","image":"${SITE_URL}/${LOGO_PATH}","description":"Veteran-owned, family-operated garage door and gate service company serving San Diego to Riverside County since 1981. Authorized Home Depot Service Provider and Clopay Authorized Dealer.","url":"${SITE_URL}","telephone":"${PHONE}","email":"info@castlegarage.com","address":{"@type":"PostalAddress","streetAddress":"1291 Simpson Way Suite D","addressLocality":"Escondido","addressRegion":"CA","postalCode":"92029","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":33.1192,"longitude":-117.0864},"areaServed":["San Diego, CA","Escondido, CA","Oceanside, CA","Carlsbad, CA","Encinitas, CA","Temecula, CA","Murrieta, CA","Fallbrook, CA","Corona, CA"],"foundingDate":"1981","priceRange":"$$","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.4","reviewCount":"210","bestRating":"5"},"hasCredential":{"@type":"EducationalOccupationalCredential","credentialCategory":"license","name":"CSLB Contractor License","recognizedBy":{"@type":"GovernmentOrganization","name":"California Contractors State License Board"},"identifier":"1154002","description":"C-61/D-28 — Door Systems"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"06:30","closes":"16:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"07:00","closes":"16:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:00","closes":"12:00"}],"hasOfferCatalog":{"@type":"OfferCatalog","name":"Garage Door & Gate Services","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Garage Door Repair"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Garage Door Installation"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Garage Door Opener Installation & Repair"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Gate Installation & Repair"}}]},"sameAs":["https://www.facebook.com/castlegaragedoorscorp/","https://www.yelp.com/biz/castle-garage-doors-escondido","https://maps.app.goo.gl/T9DtTWjanN9Zgyte9"]}
  </script>`;
}

function breadcrumbSchema(items) {
  return `<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${items.map((item, i) => `{"@type":"ListItem","position":${i+1},"name":"${item.label}","item":"${SITE_URL}/${item.href || ''}"}`).join(',')}]}
  </script>`;
}

function serviceSchema(name, description) {
  return `<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","name":"${name}","description":"${description.replace(/"/g,'\\"')}","provider":{"@id":"${SITE_URL}/#business"},"areaServed":"San Diego to Riverside County, CA","serviceType":"${name}"}
  </script>`;
}

function articleSchema(headline, date, description) {
  return `<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article","headline":"${headline.replace(/"/g,'\\"').replace(/&rsquo;/g,"'")}","datePublished":"${date}","dateModified":"${date}","author":{"@id":"${SITE_URL}/#business"},"publisher":{"@id":"${SITE_URL}/#business"},"description":"${description.replace(/"/g,'\\"')}"}
  </script>`;
}

function pageHTML(opts) {
  const prefix = getPrefix(opts.file);
  const activePage = opts.activePage || '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.title}</title>
  <meta name="description" content="${opts.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${SITE_URL}/${opts.file.replace('index.html','')}">
  <meta property="og:title" content="${opts.title}">
  <meta property="og:description" content="${opts.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/${opts.file.replace('index.html','')}">
  <meta property="og:site_name" content="Castle Garage Doors & Gates">
  <meta property="og:image" content="${SITE_URL}/${LOGO_PATH}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="${prefix}styles.css">
  ${localBusinessSchema()}
  ${opts.schema || ''}
  <!-- Google Analytics 4 placeholder: Replace GA_MEASUREMENT_ID -->
  <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> -->
</head>
<body>
  ${header(prefix, activePage)}
  ${opts.body}
  ${footer(prefix)}
  ${mobileNav(prefix)}
  ${floatingCta(prefix)}
  <script src="${prefix}script.js"></script>
</body>
</html>`;
}

module.exports = {
  PHONE, PHONE_LINK, SITE_URL, LOGO_PATH,
  svgIcons, header, footer, mobileNav, floatingCta, trustBar,
  breadcrumb, heroInterior, faqSection, faqSchema, relatedServices,
  processSteps, localBusinessSchema, breadcrumbSchema, serviceSchema,
  articleSchema, pageHTML, getPrefix, phoneIcon
};
