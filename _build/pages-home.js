// Homepage content
const T = require('./templates');

function homepage() {
  const ico = T.svgIcons();
  const body = `
  <section class="hero page-top">
    <!-- REPLACE WITH REAL PHOTO: Beautiful garage door on a San Diego-style home -->
    <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <div class="hero-badge">${ico.star} VETERAN-OWNED &amp; FAMILY-OPERATED SINCE 1981</div>
      <h1>San Diego&rsquo;s Most Trusted Garage Door <span style="color:var(--color-red)">&amp;</span> Gate Experts</h1>
      <p>Family-owned and veteran-operated for over 40 years. Expert repair, installation, and maintenance from San Diego to Riverside County.</p>
      <div class="hero-buttons">
        <a href="contact.html" class="btn btn-primary" data-track="schedule">Schedule Service</a>
        <a href="${T.PHONE_LINK}" class="btn btn-outline-white">Call ${T.PHONE}</a>
      </div>
      <div class="hero-trust">
        <div class="hero-trust-item">${ico.shield} 40+ Years Experience</div>
        <div class="hero-trust-item">${ico.star} 4.8&#9733; from 200+ Reviews</div>
        <div class="hero-trust-item">${ico.clock} 24/7 Emergency Service</div>
        <div class="hero-trust-item">${ico.check} Free Estimates</div>
      </div>
    </div>
  </section>

  ${T.trustBar()}

  <section class="section" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Our Services</span>
        <h2>Expert Garage Door <span style="color:var(--color-red)">&amp;</span> Gate Solutions</h2>
        <p>From emergency repairs to brand-new installations, we handle it all with the care and expertise that comes from over four decades of experience.</p>
      </div>
      <div class="services-grid">
        <div class="service-card fade-up">
          <div class="service-icon">${ico.wrench}</div>
          <h3>Garage Door Repair</h3>
          <p>Broken springs, cables, rollers, panels, tracks, and sensors. Same-day and 24/7 emergency service available.</p>
          <a href="services/garage-door-repair/index.html" class="link">Schedule Repair &rarr;</a>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">${ico.door}</div>
          <h3>New Garage Doors</h3>
          <p>Residential and commercial installations. Steel, wood, aluminum, composite, and custom doors including Clopay&rsquo;s premium lines.</p>
          <a href="services/garage-door-installation/index.html" class="link">Get Free Estimate &rarr;</a>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">${ico.wifi}</div>
          <h3>Garage Door Openers</h3>
          <p>Installation and repair of LiftMaster, Marantec, and Genie openers. Smart/WiFi-enabled, belt drive, chain drive, and wall-mount options.</p>
          <a href="services/garage-door-openers/index.html" class="link">Explore Options &rarr;</a>
        </div>
        <div class="service-card fade-up">
          <div class="service-icon">${ico.gate}</div>
          <h3>Gates <span style="color:var(--color-red)">&amp;</span> Gate Repair</h3>
          <p>Automatic, driveway, security, and wrought iron gates. Installation, repair, and opener service. A specialty most competitors don&rsquo;t offer.</p>
          <a href="services/gate-services/index.html" class="link">Learn More &rarr;</a>
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
        <div class="why-item fade-up"><div class="why-icon">${ico.shield}</div><div><h3>40+ Years of Experience</h3><p>Serving the San Diego and Riverside County communities since 1981 with consistent, dependable work.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.star}</div><div><h3>Veteran-Owned <span style="color:var(--color-red)">&amp;</span> Operated</h3><p>Military values of discipline, integrity, and service excellence are at the core of everything we do.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.home}</div><div><h3>Authorized Home Depot Provider</h3><p>Trusted to serve 28 Home Depot stores from San Diego to Corona as an authorized service provider.</p></div></div>
        <div class="why-item fade-up"><div class="why-icon">${ico.clock}</div><div><h3>24/7 Emergency Service</h3><p>A broken garage door can&rsquo;t wait. We offer round-the-clock emergency repair so you&rsquo;re never stranded.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section" id="reviews">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Customer Reviews</span>
        <h2>What Our Customers Say</h2>
        <p>Rated 4.8 stars from over 200 reviews across Google and Yelp.</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Castle replaced both springs and rollers on our garage door. The technician was on time, professional, and explained everything before starting. Fair pricing and excellent work. Highly recommend!&rdquo;</blockquote>
          <div class="testimonial-author">Jennifer M.</div>
          <div class="testimonial-source">Escondido, CA &mdash; via Yelp</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;We had an emergency on a Saturday morning &mdash; our garage door cable snapped and the door was stuck. Castle came out within two hours and had everything fixed. Lifesavers!&rdquo;</blockquote>
          <div class="testimonial-author">Robert <span style="color:var(--color-red)">&amp;</span> Maria T.</div>
          <div class="testimonial-source">Temecula, CA &mdash; via Google</div>
        </div>
        <div class="testimonial-card fade-up">
          <div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>&ldquo;Had a new automatic gate installed by Castle. The crew was fantastic &mdash; clean, courteous, and the gate looks beautiful. They even programmed our remotes and walked us through the system.&rdquo;</blockquote>
          <div class="testimonial-author">David L.</div>
          <div class="testimonial-source">Carlsbad, CA &mdash; via Yelp</div>
        </div>
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
      <div class="areas-content">
        <div>
          <div class="areas-list">
            <a href="service-areas/san-diego.html">San Diego</a>
            <a href="service-areas/escondido.html">Escondido</a>
            <a href="service-areas/oceanside.html">Oceanside</a>
            <a href="service-areas/carlsbad.html">Carlsbad</a>
            <a href="service-areas/encinitas.html">Encinitas</a>
            <a href="service-areas/north-county.html">North County SD</a>
            <a href="service-areas/temecula.html">Temecula</a>
            <a href="service-areas/murrieta.html">Murrieta</a>
            <a href="service-areas/fallbrook.html">Fallbrook</a>
            <a href="service-areas/bonsall.html">Bonsall</a>
            <a href="service-areas/riverside-county.html">Riverside County</a>
            <a href="service-areas/corona.html">Corona</a>
          </div>
        </div>
        <div class="areas-map">
          <!-- REPLACE: Google Maps embed showing San Diego to Riverside County service area -->
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d425200.0!2d-117.1!3d33.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Castle Garage Doors service area map"></iframe>
        </div>
      </div>
    </div>
  </section>`;

  return {
    file: 'index.html',
    title: 'Castle Garage Doors & Gates | San Diego\'s Trusted Experts Since 1981',
    description: 'Veteran-owned garage door and gate services in San Diego to Riverside County. 40+ years experience. Repair, installation, openers, and gates. Free estimates. Call (858) 578-1990.',
    activePage: 'home',
    body
  };
}

module.exports = [homepage()];
