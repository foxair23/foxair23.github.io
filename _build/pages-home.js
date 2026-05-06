// Homepage content
const T = require('./templates');

function homepage() {
  const ico = T.svgIcons();
  const body = `
  <section class="hero page-top">
    <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <div class="hero-heritage">VETERAN-OWNED &amp; FAMILY-OPERATED &middot; SINCE 1981</div>
      <h1>Garage Door <span style="color:var(--color-red)">&amp;</span> Gate Repair in San Diego County</h1>
      <p class="hero-subtitle" style="font-size:1.25rem;font-style:italic;opacity:0.9;margin-bottom:var(--space-2);">San Diego&rsquo;s Knight at the Gate</p>
      <p>Expert repair, installation, and maintenance from San Diego to Riverside County. Licensed, bonded, and insured — CSLB #1154002.</p>
      <div class="hero-buttons">
        <a href="contact.html" class="btn btn-primary" data-track="schedule">Schedule Service</a>
        <a href="${T.PHONE_LINK}" class="btn btn-outline-white">Call ${T.PHONE}</a>
      </div>
      <div class="hero-trust">
        <div class="hero-trust-item">${ico.shield} 40+ Years Experience</div>
        <div class="hero-trust-item">${ico.star} 4.4&#9733; from 210+ Reviews</div>
        <div class="hero-trust-item">${ico.clock} 24/7 Emergency Service</div>
        <div class="hero-trust-item">${ico.check} Free Estimates</div>
      </div>
    </div>
  </section>

  <div class="trust-strip">
    <div class="container">
      <div class="trust-strip-inner">
        <div class="trust-strip-item" title="In business since 1981 — over 40 years of trusted service">${ico.shield} Since 1981</div>
        <div class="trust-strip-item" title="Veteran-owned, family-operated business">${ico.star} Veteran-Owned</div>
        <div class="trust-strip-item" title="Authorized Home Depot Service Provider covering 28 stores">${ico.home} Home Depot Authorized</div>
        <div class="trust-strip-item" title="Clopay Authorized Dealer — premium garage doors">${ico.door} Clopay Authorized Dealer</div>
        <div class="trust-strip-item" title="California State License Board License #1154002">${ico.check} CSLB #1154002</div>
      </div>
    </div>
  </div>

  <section class="section" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Our Services</span>
        <h2>Expert Garage Door <span style="color:var(--color-red)">&amp;</span> Gate Solutions</h2>
        <p>From emergency repairs to brand-new installations, we handle it all with over four decades of experience.</p>
      </div>
      <div class="services-pillars">
        <div class="service-pillar fade-up">
          <div class="pillar-img"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=70" alt="Residential garage door installation by Castle Garage Doors in San Diego" loading="lazy"></div>
          <h3>Garage Doors</h3>
          <p>Repair, installation, and opener service for residential and commercial garage doors. Clopay Authorized Dealer with LiftMaster openers.</p>
          <a href="services/index.html" class="btn btn-primary btn-sm">Explore Garage Door Services &rarr;</a>
        </div>
        <div class="service-pillar fade-up">
          <div class="pillar-img"><img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=70" alt="Automatic driveway gate installed by Castle Garage Doors in San Diego" loading="lazy"></div>
          <h3>Gates</h3>
          <p>Automatic, driveway, security, and wrought iron gates. Installation, repair, and opener service &mdash; a specialty most competitors don&rsquo;t offer.</p>
          <a href="services/gate-services/index.html" class="btn btn-primary btn-sm">Explore Gate Services &rarr;</a>
        </div>
      </div>
      <div class="services-grid" style="margin-top:var(--space-8);">
        <div class="service-card fade-up">
          <div class="service-icon">${ico.wrench}</div>
          <h3>Garage Door Repair</h3>
          <p>Springs, cables, rollers, panels, tracks, sensors. Same-day and 24/7 emergency service.</p>
          <a href="services/garage-door-repair/index.html" class="link">Schedule Repair &rarr;</a>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">${ico.wifi}</div>
          <h3>Openers</h3>
          <p>LiftMaster, Marantec, Genie. Smart/WiFi, belt drive, chain drive, wall-mount.</p>
          <a href="services/garage-door-openers/index.html" class="link">Explore Options &rarr;</a>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">${ico.clock}</div>
          <h3>Emergency Repair</h3>
          <p>24/7 emergency service. Stuck door? Broken spring? Call any time.</p>
          <a href="services/garage-door-repair/emergency-repair.html" class="link">Get Help Now &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Why Castle</span>
        <h2>Why Homeowners Trust Castle</h2>
        <p>We&rsquo;ve built our reputation one garage door at a time over more than four decades.</p>
      </div>
      <div class="why-grid">
        <div class="why-item fade-up"><div class="why-icon">${ico.shield}</div><div><h3>40+ Years of Experience</h3><p>Serving San Diego and Riverside County since 1981. Castle technicians average 15+ years of garage door experience.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.star}</div><div><h3>Veteran-Owned <span style="color:var(--color-red)">&amp;</span> Operated</h3><p>Military values of discipline, integrity, and service excellence at the core of everything we do.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.home}</div><div><h3>Authorized Home Depot Provider</h3><p>Trusted to serve 28 Home Depot stores as an authorized service provider — San Diego to Corona.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.check}</div><div><h3>Licensed, Bonded &amp; Insured</h3><p>CSLB License #1154002, C-61/D-28. Full liability coverage. Weekly OSHA safety training.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section" id="reviews">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Customer Reviews</span>
        <h2>What Our Customers Say</h2>
        <p>Rated 4.4 stars across 210+ reviews on Google and Yelp.</p>
      </div>
      <div class="testimonials-grid testimonials-expanded">
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Castle replaced both springs and rollers on our garage door. The technician was on time, professional, and explained everything before starting. Fair pricing and excellent work. Highly recommend!&rdquo;</blockquote>
          <div class="testimonial-author">Jennifer M.</div>
          <div class="testimonial-source">Escondido, CA &middot; Spring &amp; Roller Replacement &middot; via Yelp</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;We had an emergency on a Saturday morning &mdash; our garage door cable snapped and the door was stuck. Castle came out within two hours and had everything fixed. Lifesavers!&rdquo;</blockquote>
          <div class="testimonial-author">Robert &amp; Maria T.</div>
          <div class="testimonial-source">Temecula, CA &middot; Emergency Cable Repair &middot; via Google</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Had a new automatic gate installed by Castle. The crew was fantastic &mdash; clean, courteous, and the gate looks beautiful. They programmed our remotes and walked us through the entire system.&rdquo;</blockquote>
          <div class="testimonial-author">David L.</div>
          <div class="testimonial-source">Carlsbad, CA &middot; Gate Installation &middot; via Yelp</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;I have used Castle for my garage door needs for over 15 years. They have always been honest, reliable, and fairly priced. I recommend them to everyone in the neighborhood.&rdquo;</blockquote>
          <div class="testimonial-author">Susan G.</div>
          <div class="testimonial-source">San Diego, CA &middot; Ongoing Maintenance &middot; via Google</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Veteran-owned and it shows in their work ethic. On time, professional, no BS. They diagnosed the problem quickly and fixed it at a fair price. Exactly what you want in a service company.&rdquo;</blockquote>
          <div class="testimonial-author">Lt. Col. Dan R. (Ret.)</div>
          <div class="testimonial-source">Fallbrook, CA &middot; Opener Repair &middot; via Yelp</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Castle installed a new Clopay insulated door on our home. The difference in noise and temperature is incredible. Should have done this years ago. Professional crew, beautiful result.&rdquo;</blockquote>
          <div class="testimonial-author">Amy &amp; James W.</div>
          <div class="testimonial-source">Murrieta, CA &middot; New Door Installation &middot; via Google</div>
        </div>
      </div>
      <div style="text-align:center;margin-top:var(--space-8);">
        <a href="reviews.html" class="btn btn-secondary btn-sm">See All Reviews &rarr;</a>
      </div>
    </div>
  </section>

  <section class="section section-white" id="gallery-teaser">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Our Work</span>
        <h2>Project Gallery</h2>
        <p>Recent garage door and gate installations across San Diego and Riverside County.</p>
      </div>
      <div class="gallery-teaser-grid">
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=70" alt="New steel insulated garage door installation in Escondido, CA" loading="lazy"></div>
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?w=400&q=70" alt="Carriage house style garage door installed in Temecula, CA" loading="lazy"></div>
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&q=70" alt="Wrought iron driveway gate installation in Fallbrook, CA" loading="lazy"></div>
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=70" alt="Contemporary aluminum and glass AVANTE garage door in Carlsbad, CA" loading="lazy"></div>
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=70" alt="Automatic sliding gate with access control in San Diego, CA" loading="lazy"></div>
        <div class="gallery-teaser-item"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=70" alt="Before and after garage door panel replacement in Oceanside, CA" loading="lazy"></div>
      </div>
      <div style="text-align:center;margin-top:var(--space-8);">
        <a href="gallery.html" class="btn btn-secondary btn-sm">View Full Gallery &rarr;</a>
      </div>
    </div>
  </section>

  <section class="section" id="knowledge-hub">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Knowledge Hub</span>
        <h2>Field Guides from Our Technicians</h2>
        <p>Expert advice to keep your garage door safe, quiet, and reliable.</p>
      </div>
      <div class="blog-teaser-grid">
        <article class="blog-teaser-card fade-up">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=70" alt="Garage door hardware close-up" loading="lazy">
          <div class="blog-teaser-body">
            <span class="blog-card-tag">Troubleshooting</span>
            <h3><a href="blog/loud-garage-door-noises.html">Why Is My Garage Door So Loud?</a></h3>
            <p>Grinding, squeaking, rattling, or banging &mdash; identify the noise and fix the problem.</p>
          </div>
        </article>
        <article class="blog-teaser-card fade-up">
          <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=70" alt="Torsion spring on garage door" loading="lazy">
          <div class="blog-teaser-body">
            <span class="blog-card-tag">Safety</span>
            <h3><a href="blog/springs-most-dangerous-part.html">Springs: The Most Dangerous Part</a></h3>
            <p>Why garage door springs demand professional handling &mdash; not a DIY project.</p>
          </div>
        </article>
        <article class="blog-teaser-card fade-up">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70" alt="Garage door on residential home" loading="lazy">
          <div class="blog-teaser-body">
            <span class="blog-card-tag">Troubleshooting</span>
            <h3><a href="blog/garage-door-wont-open.html">Garage Door Won&rsquo;t Open?</a></h3>
            <p>Systematic troubleshooting when your garage door refuses to open.</p>
          </div>
        </article>
      </div>
      <div style="text-align:center;margin-top:var(--space-8);">
        <a href="blog/index.html" class="btn btn-secondary btn-sm">View All Articles &rarr;</a>
      </div>
    </div>
  </section>

  <section class="section section-white" id="areas">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Service Areas</span>
        <h2>Serving San Diego to Riverside County</h2>
        <p>From the coast to the inland valleys, we&rsquo;re your local garage door and gate specialists.</p>
      </div>
      <div class="areas-grid-home">
        <a href="service-areas/san-diego.html" class="area-link">San Diego</a>
        <a href="service-areas/escondido.html" class="area-link">Escondido</a>
        <a href="service-areas/oceanside.html" class="area-link">Oceanside</a>
        <a href="service-areas/carlsbad.html" class="area-link">Carlsbad</a>
        <a href="service-areas/encinitas.html" class="area-link">Encinitas</a>
        <a href="service-areas/north-county.html" class="area-link">North County SD</a>
        <a href="service-areas/temecula.html" class="area-link">Temecula</a>
        <a href="service-areas/murrieta.html" class="area-link">Murrieta</a>
        <a href="service-areas/fallbrook.html" class="area-link">Fallbrook</a>
        <a href="service-areas/bonsall.html" class="area-link">Bonsall</a>
        <a href="service-areas/riverside-county.html" class="area-link">Riverside County</a>
        <a href="service-areas/corona.html" class="area-link">Corona</a>
      </div>
      <div style="margin-top:var(--space-8);">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d425200.0!2d-117.1!3d33.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus" style="width:100%;height:300px;border:0;border-radius:var(--radius);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Castle Garage Doors service area covering San Diego to Riverside County"></iframe>
      </div>
    </div>
  </section>`;

  return {
    file: 'index.html',
    title: 'Garage Door Repair & Installation San Diego | Castle Garage Doors & Gates',
    description: 'Veteran-owned garage door & gate experts serving San Diego to Riverside County since 1981. 24/7 emergency repair, free estimates. Call (800) 576-1397.',
    activePage: 'home',
    body
  };
}

module.exports = [homepage()];
