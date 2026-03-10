// Standalone pages: About, Reviews, Gallery, Blog, Contact, Specials, Privacy, Terms, 404
const T = require('./templates');

function aboutPage() {
  const prefix = T.getPrefix('about/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'About Us'}];
  const ico = T.svgIcons();
  const body = `
  ${T.heroInterior('About Castle Garage Doors <span style="color:var(--color-red)">&amp;</span> Gates', 'Veteran-owned. Family-operated. Serving Southern California since 1981.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="about-grid">
      <div class="content-section">
        <span class="section-label">Our Story</span>
        <h2>Over 40 Years of Trusted Service</h2>
        <p>Castle Garage Doors &amp; Gates was founded in 1981 with a straightforward mission: provide honest, reliable garage door service to San Diego homeowners. More than four decades later, that mission hasn&rsquo;t changed &mdash; we&rsquo;ve just gotten better at it.</p>
        <p>As a veteran-owned business, military values run deep in our culture: discipline in our work, integrity in our pricing, and respect for every customer we serve. As a family-run company, we treat your home the way we&rsquo;d want our own home treated.</p>
        <p>From our headquarters in Escondido, we&rsquo;ve grown to serve the entire San Diego to Riverside County corridor, becoming an Authorized Home Depot Service Provider covering 28 stores and a Clopay Authorized Dealer. Despite this growth, we remain a local company with local values.</p>
        <h3>Our Values</h3>
        <ul>
          <li><strong>Honesty</strong> &mdash; transparent pricing, no upselling, no scare tactics</li>
          <li><strong>Quality</strong> &mdash; we use premium parts and stand behind our work</li>
          <li><strong>Reliability</strong> &mdash; we show up when we say we will, every time</li>
          <li><strong>Safety</strong> &mdash; weekly OSHA safety training for all technicians</li>
          <li><strong>Community</strong> &mdash; we live where we work and care about our neighbors</li>
        </ul>
      </div>
      <div class="about-image">
        <!-- REPLACE WITH REAL PHOTO: Team photo or truck fleet photo -->
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" alt="Castle Garage Doors and Gates service team" data-replace-note="Professional photo: team in front of service trucks">
      </div>
    </div>
    <div style="margin-top:var(--space-16);">
      <div class="section-header"><span class="section-label">Credentials</span><h2>Certifications &amp; Partnerships</h2></div>
      <div class="certifications">
        <div class="cert-card">${ico.home}<h4>Authorized Home Depot Provider</h4><p>Covering 28 stores</p></div>
        <div class="cert-card">${ico.shield}<h4>Clopay Authorized Dealer</h4><p>Premium garage doors</p></div>
        <div class="cert-card">${ico.check}<h4>BBB A+ Rating</h4><p>Accredited business</p></div>
        <div class="cert-card">${ico.star}<h4>Top-Rated on Yelp</h4><p>164 reviews, 5 stars</p></div>
      </div>
    </div>
    <div style="margin-top:var(--space-16);">
      <div class="section-header"><span class="section-label">Our Team</span><h2>The People Behind Castle</h2><p>Our technicians are the heart of our company. Each team member undergoes extensive training and weekly safety meetings.</p></div>
      <div class="services-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr));">
        <!-- REPLACE: Add real team member photos and bios -->
        <div class="service-card" style="text-align:center;">
          <div style="width:100px;height:100px;border-radius:50%;background:var(--color-border);margin:0 auto var(--space-4);"></div>
          <h4>Team Member</h4><p style="font-size:var(--text-small);color:var(--color-text-muted);">Position title placeholder</p>
        </div>
        <div class="service-card" style="text-align:center;">
          <div style="width:100px;height:100px;border-radius:50%;background:var(--color-border);margin:0 auto var(--space-4);"></div>
          <h4>Team Member</h4><p style="font-size:var(--text-small);color:var(--color-text-muted);">Position title placeholder</p>
        </div>
        <div class="service-card" style="text-align:center;">
          <div style="width:100px;height:100px;border-radius:50%;background:var(--color-border);margin:0 auto var(--space-4);"></div>
          <h4>Team Member</h4><p style="font-size:var(--text-small);color:var(--color-text-muted);">Position title placeholder</p>
        </div>
      </div>
    </div>
  </div></div>`;
  return { file:'about/index.html', title:'About Us | Castle Garage Doors & Gates', description:'Castle Garage Doors & Gates: veteran-owned, family-operated since 1981. Learn about our story, values, and team. Serving San Diego to Riverside County.', activePage:'about', body, schema:T.breadcrumbSchema(crumbs) };
}

function reviewsPage() {
  const prefix = T.getPrefix('reviews.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Reviews'}];
  const reviews = [
    {stars:5, quote:'Castle replaced both springs and rollers on our garage door. The technician was on time, professional, and explained everything before starting. Fair pricing and excellent work.', author:'Jennifer M.', location:'Escondido, CA', source:'Yelp'},
    {stars:5, quote:'We had an emergency on a Saturday morning — our garage door cable snapped. Castle came out within two hours and had everything fixed. Lifesavers!', author:'Robert & Maria T.', location:'Temecula, CA', source:'Google'},
    {stars:5, quote:'Had a new automatic gate installed. The crew was fantastic — clean, courteous, and the gate looks beautiful. They programmed our remotes and walked us through the system.', author:'David L.', location:'Carlsbad, CA', source:'Yelp'},
    {stars:5, quote:'I have used Castle for my garage door needs for over 15 years. They have always been honest, reliable, and fairly priced. I recommend them to everyone.', author:'Susan G.', location:'San Diego, CA', source:'Google'},
    {stars:5, quote:'Called for a broken spring at 7am, they were at my house by 9am. New springs installed, door balanced, everything tested. Under $300. Can\'t beat that.', author:'Mark P.', location:'Oceanside, CA', source:'Yelp'},
    {stars:5, quote:'Castle installed a new Clopay insulated door on our home. The difference in noise and temperature is incredible. Should have done this years ago.', author:'Amy & James W.', location:'Murrieta, CA', source:'Google'},
    {stars:5, quote:'Veteran-owned and it shows in their work ethic. On time, professional, no BS. They diagnosed the problem quickly and fixed it at a fair price.', author:'Lt. Col. Dan R. (Ret.)', location:'Fallbrook, CA', source:'Yelp'},
    {stars:5, quote:'Our HOA uses Castle for the community gate system. They respond quickly to repair calls and maintain the system proactively. Very reliable partner.', author:'HOA Board - Ridgeview', location:'Escondido, CA', source:'Google'}
  ];
  const body = `
  ${T.heroInterior('Customer Reviews', 'See what our customers say about Castle Garage Doors &amp; Gates.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="reviews-summary">
      <div class="big-rating">4.8</div>
      <div class="stars-big">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="margin:var(--space-2) auto;color:var(--color-text-secondary);">Based on 200+ reviews across Google and Yelp</p>
      <div style="margin-top:var(--space-4);display:flex;justify-content:center;gap:var(--space-4);flex-wrap:wrap;">
        <a href="#" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">See Google Reviews</a>
        <a href="#" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">See Yelp Reviews</a>
      </div>
    </div>
    <div class="reviews-grid">
      ${reviews.map(r => `<div class="testimonial-card">
        <div class="testimonial-stars">${'&#9733;'.repeat(r.stars)}</div>
        <blockquote>&ldquo;${r.quote}&rdquo;</blockquote>
        <div class="testimonial-author">${r.author}</div>
        <div class="testimonial-source">${r.location} &mdash; via ${r.source}</div>
      </div>`).join('\n      ')}
    </div>
    <div style="text-align:center;margin-top:var(--space-10);">
      <h3>Had a Great Experience?</h3>
      <p style="margin:var(--space-2) auto var(--space-6);color:var(--color-text-secondary);">We&rsquo;d love to hear about it. Leave us a review on Google or Yelp.</p>
      <div style="display:flex;justify-content:center;gap:var(--space-4);flex-wrap:wrap;">
        <a href="#" class="btn btn-primary btn-sm">Review on Google</a>
        <a href="#" class="btn btn-secondary btn-sm">Review on Yelp</a>
      </div>
    </div>
  </div></div>`;
  return { file:'reviews.html', title:'Customer Reviews | Castle Garage Doors & Gates', description:'Read reviews from Castle Garage Doors & Gates customers. Rated 4.8 stars from 200+ reviews. San Diego to Riverside County.', activePage:'reviews', body, schema:T.breadcrumbSchema(crumbs) };
}

function galleryPage() {
  const prefix = T.getPrefix('gallery.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Gallery'}];
  const items = [
    {cat:'doors', caption:'New Clopay steel insulated door — Escondido, CA', img:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=70'},
    {cat:'doors', caption:'Carriage house style door — Temecula, CA', img:'https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?w=400&q=70'},
    {cat:'gates', caption:'Wrought iron driveway gate — Fallbrook, CA', img:'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&q=70'},
    {cat:'doors', caption:'Contemporary aluminum & glass AVANTE door — Carlsbad, CA', img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=70'},
    {cat:'openers', caption:'LiftMaster belt drive opener installation — San Diego, CA', img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=70'},
    {cat:'gates', caption:'Automatic sliding gate — Bonsall, CA', img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=70'},
    {cat:'before-after', caption:'Before & after: panel replacement — Oceanside, CA', img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=70'},
    {cat:'doors', caption:'Double wooden garage doors — Rancho Santa Fe, CA', img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70'}
  ];
  const body = `
  ${T.heroInterior('Project Gallery', 'Browse our recent garage door and gate installations across San Diego and Riverside County.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="gallery-filters">
      <button class="active" data-filter="all">All</button>
      <button data-filter="doors">Garage Doors</button>
      <button data-filter="gates">Gates</button>
      <button data-filter="openers">Openers</button>
      <button data-filter="before-after">Before &amp; After</button>
    </div>
    <div class="gallery-grid">
      ${items.map(item => `<!-- REPLACE WITH REAL PHOTO: ${item.caption} -->
      <div class="gallery-item" data-category="${item.cat}">
        <img src="${item.img}" alt="${item.caption}" loading="lazy" data-replace-note="Professional photo: ${item.caption}">
        <div class="gallery-caption">${item.caption}</div>
      </div>`).join('\n      ')}
    </div>
  </div></div>`;
  return { file:'gallery.html', title:'Project Gallery | Castle Garage Doors & Gates', description:'Browse garage door and gate installations by Castle Garage Doors & Gates. Residential and commercial projects in San Diego and Riverside County.', activePage:'gallery', body, schema:T.breadcrumbSchema(crumbs) };
}

function blogIndex() {
  const prefix = T.getPrefix('blog/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Blog'}];
  const posts = [
    {slug:'signs-garage-door-spring-broken', title:'How to Know If Your Garage Door Spring Is Broken', excerpt:'Learn the telltale signs of a broken or failing garage door spring, and what to do next.', tag:'Repair', date:'March 2026'},
    {slug:'new-garage-door-cost-san-diego', title:'How Much Does a New Garage Door Cost in San Diego?', excerpt:'A realistic breakdown of garage door costs for San Diego homeowners in 2026.', tag:'Installation', date:'March 2026'},
    {slug:'garage-door-maintenance-schedule', title:'How Often Should You Service Your Garage Door?', excerpt:'A simple maintenance schedule to keep your garage door running safely for years.', tag:'Maintenance', date:'February 2026'},
    {slug:'garage-door-wont-close', title:'Garage Door Won\'t Close? Here\'s What to Check', excerpt:'Troubleshooting steps when your garage door refuses to close all the way.', tag:'Troubleshooting', date:'February 2026'},
    {slug:'garage-door-materials-comparison', title:'Choosing the Right Garage Door Material', excerpt:'Steel vs. wood vs. aluminum vs. composite: pros, cons, and best uses.', tag:'Installation', date:'January 2026'},
    {slug:'electric-gate-pros-cons', title:'Electric Gate vs Manual Gate: Pros and Cons', excerpt:'Deciding between a manual and automatic gate? Here\'s what to consider.', tag:'Gates', date:'January 2026'},
  ];
  const body = `
  ${T.heroInterior('Blog &amp; Resources', 'Expert advice, tips, and guides for garage door and gate owners.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="blog-grid">
      ${posts.map(p => `<article class="blog-card">
        <div class="blog-card-img">
          <!-- REPLACE: Blog featured image for "${p.title}" -->
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=60" alt="${p.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <div class="blog-card-tag">${p.tag}</div>
          <h3><a href="${p.slug}.html">${p.title}</a></h3>
          <p>${p.excerpt}</p>
          <div class="blog-card-meta">${p.date} &bull; Castle Garage Doors &amp; Gates</div>
        </div>
      </article>`).join('\n      ')}
    </div>
  </div></div>`;
  return { file:'blog/index.html', title:'Blog & Resources | Castle Garage Doors & Gates', description:'Expert garage door and gate advice, tips, and guides from Castle Garage Doors & Gates. San Diego\'s trusted experts since 1981.', activePage:'blog', body, schema:T.breadcrumbSchema(crumbs) };
}

function contactPage() {
  const prefix = T.getPrefix('contact.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Contact'}];
  const body = `
  ${T.heroInterior('Contact Us', 'Schedule your service or get a free estimate.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="contact-grid">
      <!-- TODO: Replace with ServiceTitan booking widget integration when available -->
      <form action="#" method="POST" id="contactForm" aria-label="Service request form">
        <div class="form-row">
          <div class="form-group"><label for="name">Full Name *</label><input type="text" id="name" name="name" required placeholder="Your name" autocomplete="name"></div>
          <div class="form-group"><label for="phone">Phone Number *</label><input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567" autocomplete="tel"></div>
        </div>
        <div class="form-group"><label for="email">Email Address</label><input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email"></div>
        <div class="form-group"><label for="service">Service Needed *</label>
          <select id="service" name="service" required>
            <option value="">Select a service...</option>
            <option value="repair">Garage Door Repair</option>
            <option value="installation">New Garage Door Installation</option>
            <option value="opener">Garage Door Opener</option>
            <option value="gate">Gate Installation or Repair</option>
            <option value="maintenance">Maintenance / Tune-Up</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group"><label for="date">Preferred Date</label><input type="date" id="date" name="date"></div>
        <div class="form-group"><label for="message">Brief Description</label><textarea id="message" name="message" placeholder="Tell us about your garage door or gate issue..."></textarea></div>
        <div class="form-group"><label for="referral">How Did You Hear About Us?</label>
          <select id="referral" name="referral">
            <option value="">Select...</option>
            <option value="google">Google Search</option>
            <option value="yelp">Yelp</option>
            <option value="homedepot">Home Depot</option>
            <option value="referral">Friend / Family Referral</option>
            <option value="repeat">Returning Customer</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary btn-full" style="margin-top:var(--space-2);">Request Free Estimate</button>
        <p style="font-size:var(--text-small);color:var(--color-text-muted);margin-top:var(--space-2);text-align:center;">We respond within 1 business hour during operating hours.</p>
      </form>
      <div class="contact-info-card">
        <h3>Get In Touch</h3>
        <div class="contact-info-item">${T.svgIcons().clock}<p><strong>Call Us</strong><a href="${T.PHONE_LINK}">${T.PHONE}</a></p></div>
        <div class="contact-info-item">${T.svgIcons().mail}<p><strong>Email</strong><a href="mailto:info@castlegaragedoors.com">info@castlegaragedoors.com</a></p></div>
        <div class="contact-info-item">${T.svgIcons().map}<p><strong>Address</strong>1281 Simpson Way<br>Escondido, CA 92029</p></div>
        <div class="contact-info-item">${T.svgIcons().clock}<p><strong>Hours</strong>Mon&ndash;Fri: 7:00 AM &ndash; 6:00 PM<br>Saturday: 8:00 AM &ndash; 2:00 PM<br>Sunday: Closed<br><em style="color:var(--color-red-light);">24/7 Emergency Service Available</em></p></div>
        <div style="margin-top:auto;padding-top:var(--space-4);border-top:1px solid rgba(255,255,255,0.1);">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-117.0864!3d33.0992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDA1JzU3LjEiTiAxMTfCsDA1JzExLjAiVw!5e0!3m2!1sen!2sus" style="width:100%;height:200px;border:0;border-radius:var(--radius);" allowfullscreen="" loading="lazy" title="Castle Garage Doors location"></iframe>
        </div>
      </div>
    </div>
  </div></div>`;
  return { file:'contact.html', title:'Contact Us | Castle Garage Doors & Gates', description:'Contact Castle Garage Doors & Gates. Schedule service, get a free estimate, or call (858) 578-1990. Escondido, CA.', activePage:'contact', body, schema:T.breadcrumbSchema(crumbs) };
}

function specialsPage() {
  const prefix = T.getPrefix('specials.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Specials'}];
  const body = `
  ${T.heroInterior('Specials &amp; Coupons', 'Take advantage of our current offers.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="specials-grid">
      <div class="special-card">
        <h3>$25 Off Any Repair</h3>
        <p>Save $25 on any garage door or gate repair service. New customers welcome.</p>
        <a href="${prefix}contact.html" class="btn btn-primary">Schedule &amp; Save</a>
        <p class="fine-print">Mention this offer when you call. Cannot be combined with other offers. Expires 12/31/2026.</p>
      </div>
      <div class="special-card">
        <h3>Free Estimate on New Doors</h3>
        <p>Considering a new garage door? Get a free in-home estimate with no obligation.</p>
        <a href="${prefix}contact.html" class="btn btn-primary">Get Free Estimate</a>
        <p class="fine-print">Includes measurement, style consultation, and written quote. No pressure, no obligation.</p>
      </div>
      <div class="special-card">
        <h3>$50 Off Opener Installation</h3>
        <p>Save $50 when you purchase and install a new LiftMaster garage door opener.</p>
        <a href="${prefix}contact.html" class="btn btn-primary">Claim Offer</a>
        <p class="fine-print">Valid on LiftMaster openers only. Cannot be combined with other offers. Expires 12/31/2026.</p>
      </div>
      <div class="special-card">
        <h3>10% Senior &amp; Military Discount</h3>
        <p>We proudly offer 10% off all services for seniors (65+) and active/retired military.</p>
        <a href="${T.PHONE_LINK}" class="btn btn-primary">Call to Redeem</a>
        <p class="fine-print">Valid ID required. Cannot be combined with other offers. Up to $100 maximum discount.</p>
      </div>
    </div>
  </div></div>`;
  return { file:'specials.html', title:'Specials & Coupons | Castle Garage Doors & Gates', description:'Current specials and coupons from Castle Garage Doors & Gates. Save on repairs, installations, and openers. San Diego & Riverside County.', activePage:'', body, schema:T.breadcrumbSchema(crumbs) };
}

function privacyPage() {
  const prefix = T.getPrefix('privacy.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Privacy Policy'}];
  const body = `
  ${T.heroInterior('Privacy Policy', '', crumbs, prefix)}
  <div class="section"><div class="container"><div class="content-section">
    <p><strong>Last updated:</strong> March 2026</p>
    <h2>Information We Collect</h2>
    <p>When you use our website, schedule service, or contact us, we may collect: your name, phone number, email address, physical address, and information about your service needs. This information is used solely to provide the services you request and to communicate with you about your service.</p>
    <h2>How We Use Your Information</h2>
    <ul><li>To respond to service requests and inquiries</li><li>To schedule and provide garage door and gate services</li><li>To send service reminders and follow-up communications</li><li>To improve our website and services</li></ul>
    <h2>Information Sharing</h2>
    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, provided those parties agree to keep this information confidential.</p>
    <h2>Cookies</h2>
    <p>Our website may use cookies to enhance your browsing experience and to collect aggregate analytics data. You can choose to disable cookies through your browser settings.</p>
    <h2>Contact</h2>
    <p>If you have questions about this privacy policy, contact us at <a href="mailto:info@castlegaragedoors.com">info@castlegaragedoors.com</a> or call <a href="${T.PHONE_LINK}">${T.PHONE}</a>.</p>
  </div></div></div>`;
  return { file:'privacy.html', title:'Privacy Policy | Castle Garage Doors & Gates', description:'Privacy policy for Castle Garage Doors & Gates website.', activePage:'', body, schema:T.breadcrumbSchema(crumbs) };
}

function termsPage() {
  const prefix = T.getPrefix('terms.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Terms of Service'}];
  const body = `
  ${T.heroInterior('Terms of Service', '', crumbs, prefix)}
  <div class="section"><div class="container"><div class="content-section">
    <p><strong>Last updated:</strong> March 2026</p>
    <h2>Agreement to Terms</h2>
    <p>By accessing and using the Castle Garage Doors &amp; Gates website, you agree to these Terms of Service. If you do not agree, please do not use the website.</p>
    <h2>Services</h2>
    <p>Castle Garage Doors &amp; Gates provides garage door and gate repair, installation, and maintenance services. All services are subject to availability in your area. Pricing is provided via individual estimates and may vary based on the scope of work.</p>
    <h2>Website Use</h2>
    <p>The content on this website is for general informational purposes only. While we strive to keep information current and accurate, we make no warranties about the completeness or accuracy of website content.</p>
    <h2>Limitation of Liability</h2>
    <p>Castle Garage Doors &amp; Gates shall not be liable for any indirect, incidental, or consequential damages arising from use of this website. Our liability is limited to the amount paid for services rendered.</p>
    <h2>Contact</h2>
    <p>Questions about these terms? Contact us at <a href="mailto:info@castlegaragedoors.com">info@castlegaragedoors.com</a> or call <a href="${T.PHONE_LINK}">${T.PHONE}</a>.</p>
  </div></div></div>`;
  return { file:'terms.html', title:'Terms of Service | Castle Garage Doors & Gates', description:'Terms of service for Castle Garage Doors & Gates website.', activePage:'', body, schema:T.breadcrumbSchema(crumbs) };
}

function notFoundPage() {
  const prefix = T.getPrefix('404.html');
  const body = `
  <div class="page-top"></div>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:var(--space-6);">
      <a href="${prefix}index.html" class="btn btn-primary">Go to Homepage</a>
      <a href="${prefix}contact.html" class="btn btn-secondary">Contact Us</a>
      <a href="${T.PHONE_LINK}" class="btn btn-secondary">Call ${T.PHONE}</a>
    </div>
    <div style="margin-top:var(--space-12);text-align:left;max-width:400px;margin-left:auto;margin-right:auto;">
      <h3 style="margin-bottom:var(--space-4);">Popular Pages</h3>
      <ul style="list-style:none;">
        <li style="margin-bottom:var(--space-2);"><a href="${prefix}services/garage-door-repair/index.html" style="color:var(--color-red);">Garage Door Repair</a></li>
        <li style="margin-bottom:var(--space-2);"><a href="${prefix}services/garage-door-installation/index.html" style="color:var(--color-red);">New Garage Doors</a></li>
        <li style="margin-bottom:var(--space-2);"><a href="${prefix}services/gate-services/index.html" style="color:var(--color-red);">Gate Services</a></li>
        <li style="margin-bottom:var(--space-2);"><a href="${prefix}service-areas/index.html" style="color:var(--color-red);">Service Areas</a></li>
        <li style="margin-bottom:var(--space-2);"><a href="${prefix}reviews.html" style="color:var(--color-red);">Reviews</a></li>
      </ul>
    </div>
  </div>`;
  return { file:'404.html', title:'Page Not Found | Castle Garage Doors & Gates', description:'The page you\'re looking for doesn\'t exist. Contact Castle Garage Doors & Gates at (858) 578-1990.', activePage:'', body };
}

module.exports = [aboutPage(), reviewsPage(), galleryPage(), blogIndex(), contactPage(), specialsPage(), privacyPage(), termsPage(), notFoundPage()];
