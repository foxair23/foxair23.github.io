// Service pages content
const T = require('./templates');

function servicePage(opts) {
  const prefix = T.getPrefix(opts.file);
  const body = `
  ${T.heroInterior(opts.h1, opts.subtitle, opts.crumbs, prefix)}
  <div class="section">
    <div class="container">
      <div class="content-section">
        ${opts.content}
      </div>
      ${opts.process ? `<h2 style="margin-top:var(--space-12);margin-bottom:var(--space-6);">Our Process</h2>${T.processSteps(opts.process)}` : ''}
      <div style="margin-top:var(--space-12);padding:var(--space-8);background:var(--color-bg-white);border-radius:var(--radius-lg);border:1px solid var(--color-border-light);">
        <h3>Transparent Pricing</h3>
        <p>We provide upfront pricing before any work begins. No surprises, no hidden fees. Every job includes a detailed written estimate so you know exactly what you&rsquo;re paying for.</p>
      </div>
      ${T.relatedServices(opts.related, prefix)}
    </div>
  </div>
  ${T.faqSection(opts.faqs)}`;

  return {
    file: opts.file,
    title: opts.title,
    description: opts.description,
    activePage: 'services',
    body,
    schema: (opts.faqs ? T.faqSchema(opts.faqs) : '') + T.breadcrumbSchema(opts.crumbs)
  };
}

// --- SERVICES HUB ---
function servicesHub() {
  const ico = T.svgIcons();
  const prefix = T.getPrefix('services/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Services'}];
  const body = `
  ${T.heroInterior('Our Services', 'Complete garage door and gate solutions for residential and commercial properties across San Diego and Riverside County.', crumbs, prefix)}
  <div class="section">
    <div class="container">
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">${ico.wrench}</div>
          <h3>Garage Door Repair</h3>
          <p>Springs, cables, rollers, panels, tracks, drums, sensors. Same-day and 24/7 emergency service.</p>
          <a href="garage-door-repair/index.html" class="link">View Repair Services &rarr;</a>
        </div>
        <div class="service-card">
          <div class="service-icon">${ico.door}</div>
          <h3>Garage Door Installation</h3>
          <p>New residential and commercial doors. Steel, wood, aluminum, composite, custom, and Clopay premium lines.</p>
          <a href="garage-door-installation/index.html" class="link">View Installation Options &rarr;</a>
        </div>
        <div class="service-card">
          <div class="service-icon">${ico.wifi}</div>
          <h3>Garage Door Openers</h3>
          <p>LiftMaster, Marantec, Genie. Smart/WiFi-enabled, belt drive, chain drive, wall-mount. Install and repair.</p>
          <a href="garage-door-openers/index.html" class="link">View Opener Services &rarr;</a>
        </div>
        <div class="service-card">
          <div class="service-icon">${ico.gate}</div>
          <h3>Gate Services</h3>
          <p>Automatic gates, driveway gates, security gates, wrought iron, sliding, swing. Installation, repair, openers.</p>
          <a href="gate-services/index.html" class="link">View Gate Services &rarr;</a>
        </div>
      </div>
    </div>
  </div>`;
  return {
    file: 'services/index.html',
    title: 'Garage Door & Gate Services | Castle Garage Doors & Gates',
    description: 'Full-service garage door and gate company. Repair, installation, openers, and gates. Serving San Diego to Riverside County. Free estimates.',
    activePage: 'services',
    body,
    schema: T.breadcrumbSchema(crumbs)
  };
}

// --- GARAGE DOOR REPAIR ---
const repairCrumbs = [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Garage Door Repair'}];

function repairHub() {
  const prefix = T.getPrefix('services/garage-door-repair/index.html');
  const ico = T.svgIcons();
  const crumbs = repairCrumbs;
  const body = `
  ${T.heroInterior('Garage Door Repair', 'Fast, reliable garage door repair from a team with 40+ years of hands-on experience. Same-day service available.', crumbs, prefix)}
  <div class="section">
    <div class="container">
      <div class="content-section">
        <p>A malfunctioning garage door is more than an inconvenience &mdash; it&rsquo;s a security risk and a daily disruption. Whether your door is stuck, making strange noises, or completely off its tracks, Castle Garage Doors &amp; Gates has been solving these problems for San Diego and Riverside County homeowners since 1981.</p>
        <p>Our technicians arrive equipped to handle any repair on the spot. We stock common parts on our trucks so most repairs are completed in a single visit, getting you back to your routine as quickly as possible.</p>
        <h2>Repair Services We Offer</h2>
      </div>
      <div class="service-list" style="margin-top:var(--space-6);">
        <a href="spring-replacement.html" class="service-list-item"><div class="num">1</div><div><h4>Spring Replacement</h4><p>Torsion and extension spring repair and replacement</p></div></a>
        <a href="cable-replacement.html" class="service-list-item"><div class="num">2</div><div><h4>Cable Replacement</h4><p>Frayed, broken, or loose cable repair</p></div></a>
        <a href="roller-replacement.html" class="service-list-item"><div class="num">3</div><div><h4>Roller Replacement</h4><p>Worn, noisy, or broken roller replacement</p></div></a>
        <a href="panel-replacement.html" class="service-list-item"><div class="num">4</div><div><h4>Panel Replacement</h4><p>Dented, cracked, or damaged panel repair</p></div></a>
        <a href="track-repair.html" class="service-list-item"><div class="num">5</div><div><h4>Track Repair</h4><p>Bent, misaligned, or damaged track repair</p></div></a>
        <a href="drum-replacement.html" class="service-list-item"><div class="num">6</div><div><h4>Drum Replacement</h4><p>Cable drum repair and replacement</p></div></a>
        <a href="sensor-repair.html" class="service-list-item"><div class="num">7</div><div><h4>Sensor Repair</h4><p>Safety sensor alignment, repair, and replacement</p></div></a>
        <a href="emergency-repair.html" class="service-list-item" style="border-color:var(--color-red);"><div class="num" style="background:var(--color-red);">!</div><div><h4>Emergency Repair (24/7)</h4><p>Round-the-clock emergency garage door service</p></div></a>
      </div>
    </div>
  </div>`;
  return {
    file: 'services/garage-door-repair/index.html',
    title: 'Garage Door Repair San Diego | Castle Garage Doors & Gates',
    description: 'Expert garage door repair in San Diego & Riverside County. Springs, cables, rollers, panels, tracks. Same-day & 24/7 emergency service. Call (858) 578-1990.',
    activePage: 'services',
    body,
    schema: T.breadcrumbSchema(crumbs)
  };
}

const repairSubCrumbs = (label) => [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Garage Door Repair',href:'services/garage-door-repair/index.html'},{label}];

const repairPages = [
  servicePage({
    file: 'services/garage-door-repair/spring-replacement.html',
    title: 'Garage Door Spring Replacement San Diego | Castle',
    description: 'Expert garage door spring replacement in San Diego. Torsion & extension springs. Same-day service. Upfront pricing. Call (858) 578-1990 for a free estimate.',
    h1: 'Garage Door Spring Replacement',
    subtitle: 'The most common garage door repair — and one you should never attempt yourself.',
    crumbs: repairSubCrumbs('Spring Replacement'),
    content: `<p>A broken garage door spring is the single most common reason homeowners call for garage door repair. You might hear a loud bang from the garage, or simply find that your door won&rsquo;t open one morning. Springs bear the full weight of your garage door &mdash; typically 150 to 250 pounds &mdash; and when they fail, the door becomes inoperable.</p>
      <h2>Types of Garage Door Springs</h2>
      <p><strong>Torsion springs</strong> are mounted on a metal shaft above the door opening. They use torque to lift the door and are the most common type in modern installations. Most residential doors use one or two torsion springs.</p>
      <p><strong>Extension springs</strong> run along the horizontal tracks on both sides of the door. They stretch and contract to provide lifting force. These are more common in older homes and lighter doors.</p>
      <h2>Warning Signs Your Spring Is Failing</h2>
      <ul>
        <li>The door feels unusually heavy when lifting manually</li>
        <li>You heard a loud bang from the garage (a spring breaking)</li>
        <li>The door opens only 6 inches then stops</li>
        <li>Visible gap in the torsion spring coils</li>
        <li>The door is crooked or uneven when opening</li>
        <li>The opener strains or struggles to lift the door</li>
      </ul>
      <h2>Why You Should Never DIY Spring Replacement</h2>
      <p>Garage door springs are under extreme tension. A torsion spring stores enough energy to cause serious injury or death if handled improperly. This is genuinely one of the most dangerous home repairs you can attempt. Our technicians are trained and equipped with the proper tools to handle spring replacement safely.</p>`,
    process: [
      {title:'Call or Schedule Online', desc:'Describe the issue. We\'ll give you a same-day or next-day appointment.'},
      {title:'On-Site Inspection', desc:'Our technician inspects the spring system, door weight, and overall condition.'},
      {title:'Upfront Quote', desc:'You receive a written estimate before we begin. No surprises.'},
      {title:'Professional Replacement', desc:'We replace the spring(s), balance the door, and test the full system.'},
      {title:'Cleanup & Warranty', desc:'We clean up, review the work with you, and provide warranty documentation.'}
    ],
    faqs: [
      {q:'How much does garage door spring replacement cost?', a:'Spring replacement typically ranges from $150 to $350 depending on spring type (torsion vs. extension), door size, and whether one or both springs need replacing. We provide an exact quote before starting.'},
      {q:'How long does spring replacement take?', a:'Most spring replacements are completed in 45 minutes to 1.5 hours. Our trucks carry common spring sizes so we can usually complete the repair in a single visit.'},
      {q:'Should I replace both springs at the same time?', a:'Yes, we strongly recommend it. Springs have similar lifespans, so if one breaks, the other is likely near the end of its life. Replacing both prevents a second service call and saves on labor.'},
      {q:'How long do garage door springs last?', a:'Standard torsion springs last approximately 10,000 cycles (one cycle = one open + close). For most households, that\'s 7 to 12 years. High-cycle springs rated for 25,000+ cycles are available.'}
    ],
    related: [
      {title:'Cable Replacement', desc:'Often needed alongside spring repair', href:'services/garage-door-repair/cable-replacement.html'},
      {title:'Drum Replacement', desc:'Cable drums work with your springs', href:'services/garage-door-repair/drum-replacement.html'},
      {title:'Emergency Repair', desc:'24/7 service when you can\'t wait', href:'services/garage-door-repair/emergency-repair.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/cable-replacement.html',
    title: 'Garage Door Cable Replacement San Diego | Castle',
    description: 'Garage door cable replacement in San Diego. Frayed, broken, or off-drum cables repaired same-day. Licensed & insured. Call (858) 578-1990.',
    h1: 'Garage Door Cable Replacement',
    subtitle: 'When cables fray or snap, your door becomes unsafe and inoperable.',
    crumbs: repairSubCrumbs('Cable Replacement'),
    content: `<p>Garage door cables work in tandem with the springs to safely raise and lower your door. They&rsquo;re wound around drums at the top of the door and bear the full weight of the door during operation. When a cable breaks or comes off the drum, the door can drop suddenly, hang at an angle, or become completely stuck.</p>
      <h2>Common Cable Problems</h2>
      <ul>
        <li><strong>Frayed cables</strong> &mdash; wear over time causes individual wire strands to separate, weakening the cable until it snaps</li>
        <li><strong>Cables off the drum</strong> &mdash; often caused by a broken spring, the cable loses tension and unwinds from the drum</li>
        <li><strong>Snapped cables</strong> &mdash; the door may hang at an angle or drop suddenly</li>
        <li><strong>Rust and corrosion</strong> &mdash; especially common in coastal San Diego areas where salt air accelerates deterioration</li>
      </ul>
      <h2>Why Prompt Cable Repair Matters</h2>
      <p>A door operating on a damaged cable is a safety hazard. If the remaining cable fails, the full weight of the door (150-250+ pounds) can drop without warning. Additionally, running the door on one cable puts uneven stress on the entire system, potentially damaging tracks, rollers, and the opener.</p>`,
    process: [
      {title:'Contact Us', desc:'Call or book online. Describe the cable issue and we\'ll schedule promptly.'},
      {title:'Inspection', desc:'We assess cable condition, drums, springs, and the overall door system.'},
      {title:'Transparent Quote', desc:'Written estimate provided before any work begins.'},
      {title:'Cable Replacement', desc:'We replace the cable(s), inspect drums, rebalance, and test the door.'},
      {title:'Safety Check', desc:'Full system test including safety reversal mechanisms.'}
    ],
    faqs: [
      {q:'What causes garage door cables to break?', a:'The most common cause is a broken spring. When a spring breaks, it releases tension suddenly, which can cause the cable to come off the drum or fray. Normal wear over 8-12 years, rust, and misalignment also contribute.'},
      {q:'Can I open my garage door with a broken cable?', a:'We strongly advise against it. Operating the door with a broken cable can cause the door to fall, damage the tracks, or injure someone. Call us for same-day repair.'},
      {q:'How much does cable replacement cost?', a:'Cable replacement typically costs $120 to $250 depending on whether one or both cables need replacing and whether additional repairs (drums, springs) are needed.'}
    ],
    related: [
      {title:'Spring Replacement', desc:'Cables and springs work together', href:'services/garage-door-repair/spring-replacement.html'},
      {title:'Drum Replacement', desc:'Drums hold the cables in place', href:'services/garage-door-repair/drum-replacement.html'},
      {title:'Track Repair', desc:'Cable issues can affect tracks', href:'services/garage-door-repair/track-repair.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/roller-replacement.html',
    title: 'Garage Door Roller Replacement San Diego | Castle',
    description: 'Noisy or stuck garage door? Roller replacement in San Diego. Nylon & steel rollers. Same-day service. Call (858) 578-1990.',
    h1: 'Garage Door Roller Replacement',
    subtitle: 'Worn rollers are the #1 cause of noisy, jerky garage doors.',
    crumbs: repairSubCrumbs('Roller Replacement'),
    content: `<p>Garage door rollers guide your door along the tracks every time it opens and closes. Over thousands of cycles, rollers wear down, crack, or seize up &mdash; causing that grinding, squealing, or rumbling noise that echoes through your house. Worn rollers also put extra strain on your opener, tracks, and hinges.</p>
      <h2>Types of Rollers</h2>
      <p><strong>Steel rollers</strong> are the basic standard. They&rsquo;re durable but noisy and require regular lubrication. Common in older installations and builder-grade doors.</p>
      <p><strong>Nylon rollers</strong> are quieter, smoother, and don&rsquo;t require lubrication. They cost slightly more but provide a noticeably better experience, especially for attached garages where noise travels into living spaces.</p>
      <h2>Signs You Need New Rollers</h2>
      <ul>
        <li>Grinding, squeaking, or rumbling noises during operation</li>
        <li>The door shakes or vibrates when moving</li>
        <li>Visible cracks, chips, or flat spots on the rollers</li>
        <li>The door hesitates or sticks at certain points</li>
        <li>Rollers no longer spin freely by hand</li>
      </ul>`,
    process: [
      {title:'Schedule', desc:'Book online or call. Roller replacement is typically same-day.'},
      {title:'Assessment', desc:'We inspect all rollers, tracks, and hinges to determine replacement needs.'},
      {title:'Quote', desc:'Upfront pricing. We recommend nylon upgrades where beneficial.'},
      {title:'Replacement', desc:'We replace worn rollers, lubricate hinges, and align tracks.'},
      {title:'Test', desc:'Multiple open-close cycles to confirm smooth, quiet operation.'}
    ],
    faqs: [
      {q:'How often should garage door rollers be replaced?', a:'Most rollers last 10,000-15,000 cycles, roughly 7-12 years of typical use. Nylon rollers generally last longer than steel. If your door is noisy or rough, it\'s time for an inspection.'},
      {q:'Are nylon rollers worth the upgrade?', a:'Absolutely, especially if your garage is attached to your home. Nylon rollers are significantly quieter and smoother. The cost difference is modest compared to the improvement in daily comfort.'},
      {q:'How many rollers does a garage door have?', a:'A standard two-car garage door has 10-12 rollers. A single-car door typically has 8-10. We replace all worn rollers at once for consistent performance.'}
    ],
    related: [
      {title:'Track Repair', desc:'Tracks and rollers work together', href:'services/garage-door-repair/track-repair.html'},
      {title:'Garage Door Openers', desc:'Worn rollers strain your opener', href:'services/garage-door-openers/index.html'},
      {title:'Spring Replacement', desc:'Full system maintenance', href:'services/garage-door-repair/spring-replacement.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/panel-replacement.html',
    title: 'Garage Door Panel Replacement San Diego | Castle',
    description: 'Damaged garage door panels replaced in San Diego. Match existing doors. All materials. Call (858) 578-1990 for free estimate.',
    h1: 'Garage Door Panel Replacement',
    subtitle: 'Restore your door\'s appearance and function without a full replacement.',
    crumbs: repairSubCrumbs('Panel Replacement'),
    content: `<p>A dented, cracked, or damaged garage door panel is both an eyesore and a functional problem. Damaged panels can compromise insulation, allow pests and weather inside, and prevent your door from operating smoothly. The good news: in many cases, individual panels can be replaced without replacing the entire door.</p>
      <h2>When Panel Replacement Makes Sense</h2>
      <ul>
        <li>Vehicle impact damage to one or two bottom panels</li>
        <li>Weather damage (wind, hail) to specific sections</li>
        <li>Rot in wooden door panels</li>
        <li>Cracked or faded panels that affect curb appeal</li>
        <li>Bent panels causing the door to stick or bind</li>
      </ul>
      <h2>When Full Replacement Is Better</h2>
      <p>If more than two panels are damaged, if the door is very old and replacement panels are unavailable, or if the damage has affected the structural integrity of the door frame, a full door replacement may be more cost-effective. We&rsquo;ll give you an honest recommendation.</p>
      <h2>Matching Your Existing Door</h2>
      <p>As a Clopay Authorized Dealer, we have access to a wide range of panel styles and colors. For common door models, we can often source exact-match panels. For older or discontinued models, we&rsquo;ll find the closest match or discuss replacement options.</p>`,
    faqs: [
      {q:'Can you match my existing garage door panels?', a:'In most cases, yes. As a Clopay dealer, we have access to a wide range of panels. For common models, exact matches are usually available. For discontinued styles, we\'ll find the closest option.'},
      {q:'How much does panel replacement cost?', a:'Individual panel replacement typically ranges from $200 to $600 per panel depending on the door model, material, and whether it\'s insulated. Much less than a full door replacement.'},
      {q:'How long does panel replacement take?', a:'Most single-panel replacements take 1-2 hours. Multiple panels may take half a day. We\'ll give you a time estimate at booking.'}
    ],
    related: [
      {title:'New Garage Doors', desc:'When replacement makes more sense', href:'services/garage-door-installation/index.html'},
      {title:'Track Repair', desc:'Damaged panels can bend tracks', href:'services/garage-door-repair/track-repair.html'},
      {title:'Roller Replacement', desc:'Complete door tune-up', href:'services/garage-door-repair/roller-replacement.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/track-repair.html',
    title: 'Garage Door Track Repair San Diego | Castle',
    description: 'Bent or misaligned garage door tracks repaired in San Diego. Door off track? Call (858) 578-1990 for same-day service.',
    h1: 'Garage Door Track Repair',
    subtitle: 'Bent, misaligned, or damaged tracks make your door unsafe and unreliable.',
    crumbs: repairSubCrumbs('Track Repair'),
    content: `<p>Garage door tracks are the metal rails that guide your door as it opens and closes. When tracks become bent, misaligned, or corroded, the door can jam, go off-track, or operate unevenly. A door that&rsquo;s come off its tracks is one of the most dangerous garage door situations &mdash; the heavy door can shift or fall without warning.</p>
      <h2>Common Track Problems</h2>
      <ul>
        <li><strong>Bent tracks</strong> &mdash; usually from vehicle impact or accumulated stress from a misaligned door</li>
        <li><strong>Misaligned tracks</strong> &mdash; the vertical and horizontal sections no longer line up properly, causing the door to stick or bind</li>
        <li><strong>Door off track</strong> &mdash; rollers have come out of the track, and the door is hanging at an angle or stuck</li>
        <li><strong>Loose brackets</strong> &mdash; the mounting hardware has loosened, allowing the track to shift</li>
        <li><strong>Rust and corrosion</strong> &mdash; particularly in San Diego&rsquo;s coastal areas</li>
      </ul>
      <h2>Do Not Operate a Door That&rsquo;s Off Track</h2>
      <p>If your door is visibly off its tracks or hanging unevenly, stop using it immediately and call us. Attempting to force the door open or closed can cause the door to fall, potentially causing serious injury or property damage.</p>`,
    faqs: [
      {q:'Can bent garage door tracks be repaired or do they need replacement?', a:'Minor bends can often be straightened in place. Severe bends, cracks, or rust typically require track replacement. We\'ll assess and recommend the most cost-effective solution.'},
      {q:'My garage door came off the tracks. What should I do?', a:'Don\'t try to force it back on. Keep people and vehicles away from the door and call us immediately. We offer same-day emergency service for off-track doors.'},
      {q:'What causes garage door tracks to bend?', a:'The most common cause is a vehicle backing into the door or track. Accumulated stress from misaligned rollers, worn springs, or poor installation can also cause gradual bending.'}
    ],
    related: [
      {title:'Roller Replacement', desc:'Rollers ride in the tracks', href:'services/garage-door-repair/roller-replacement.html'},
      {title:'Cable Replacement', desc:'Cable issues affect tracking', href:'services/garage-door-repair/cable-replacement.html'},
      {title:'Emergency Repair', desc:'Off-track doors need urgent help', href:'services/garage-door-repair/emergency-repair.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/drum-replacement.html',
    title: 'Garage Door Drum Replacement San Diego | Castle',
    description: 'Garage door cable drum repair & replacement in San Diego. Cables slipping? Call (858) 578-1990 for expert service.',
    h1: 'Garage Door Drum Replacement',
    subtitle: 'Cable drums are critical for safe, balanced door operation.',
    crumbs: repairSubCrumbs('Drum Replacement'),
    content: `<p>Cable drums are cylindrical components mounted at each end of the torsion shaft above your garage door. They&rsquo;re grooved to hold the lifting cables in precise alignment. As the springs turn the shaft, the drums wind and unwind the cables, raising and lowering your door smoothly and evenly.</p>
      <h2>Signs of Drum Problems</h2>
      <ul>
        <li>Cables keep slipping off or becoming loose</li>
        <li>The door rises unevenly (one side higher than the other)</li>
        <li>Visible wear, cracks, or grooves on the drum surface</li>
        <li>Grinding or clicking noises from the top of the door</li>
        <li>The cable bunches up instead of winding neatly</li>
      </ul>
      <h2>Why Drum Quality Matters</h2>
      <p>Low-quality or worn drums allow cables to slip, fray, or wind unevenly. This puts uneven stress on your door, springs, and tracks. We use high-quality replacement drums matched to your door&rsquo;s weight and cable diameter for reliable, long-lasting performance.</p>`,
    faqs: [
      {q:'What causes cable drums to fail?', a:'Normal wear over years of use, corrosion, and poor-quality original parts are the most common causes. A broken spring can also damage drums if the cable releases suddenly.'},
      {q:'Should drums be replaced when replacing springs?', a:'We inspect drums during every spring replacement. If they show wear, grooves, or cracks, we recommend replacing them at the same time to avoid a return visit.'}
    ],
    related: [
      {title:'Spring Replacement', desc:'Drums and springs work together', href:'services/garage-door-repair/spring-replacement.html'},
      {title:'Cable Replacement', desc:'Cables wind around the drums', href:'services/garage-door-repair/cable-replacement.html'},
      {title:'Garage Door Repair', desc:'Full repair services', href:'services/garage-door-repair/index.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/sensor-repair.html',
    title: 'Garage Door Sensor Repair San Diego | Castle',
    description: 'Garage door sensor repair and alignment in San Diego. Door won\'t close? Call (858) 578-1990. Same-day service available.',
    h1: 'Garage Door Sensor Repair',
    subtitle: 'When safety sensors malfunction, your door may refuse to close.',
    crumbs: repairSubCrumbs('Sensor Repair'),
    content: `<p>Since 1993, federal law has required all garage doors to have safety reversing sensors &mdash; the small photo-eye sensors mounted near the floor on each side of the door opening. These sensors detect objects in the door&rsquo;s path and prevent it from closing, protecting children, pets, and property.</p>
      <p>When these sensors malfunction, the most common symptom is a door that starts to close, reverses back up, and flashes the opener light. It&rsquo;s one of the most frequent calls we receive, and it&rsquo;s usually a straightforward fix.</p>
      <h2>Common Sensor Issues</h2>
      <ul>
        <li><strong>Misalignment</strong> &mdash; the sensors are knocked out of alignment, breaking the infrared beam</li>
        <li><strong>Dirty lenses</strong> &mdash; dust, cobwebs, or grime blocking the sensor eye</li>
        <li><strong>Sun interference</strong> &mdash; direct sunlight can overwhelm the sensor, common in west-facing garages in San Diego</li>
        <li><strong>Wiring damage</strong> &mdash; rodents, lawn equipment, or foot traffic can damage sensor wires</li>
        <li><strong>Failed sensor</strong> &mdash; the sensor unit itself has worn out and needs replacement</li>
      </ul>
      <h2>Before You Call: Quick Checks</h2>
      <p>You can try these steps yourself before calling a technician: Clean the sensor lenses with a soft cloth. Check that the small LED lights on each sensor are lit (green for the sending eye, amber for the receiving eye on most models). Make sure nothing is blocking the path between the sensors. If these steps don&rsquo;t resolve the issue, give us a call.</p>`,
    faqs: [
      {q:'Why does my garage door reverse when closing?', a:'The most likely cause is a safety sensor issue. The sensors may be misaligned, dirty, or malfunctioning. Other possibilities include a limit switch adjustment or an obstruction in the door\'s path.'},
      {q:'Can I bypass the safety sensors?', a:'While it\'s technically possible, we strongly advise against it. Safety sensors are required by federal law and protect against serious injury. Let us fix the underlying issue instead.'},
      {q:'How much does sensor repair or replacement cost?', a:'Sensor realignment or cleaning is typically $75-$120. Full sensor replacement runs $100-$200 including parts and labor.'}
    ],
    related: [
      {title:'Garage Door Openers', desc:'Sensors connect to your opener', href:'services/garage-door-openers/index.html'},
      {title:'Emergency Repair', desc:'Urgent sensor issues', href:'services/garage-door-repair/emergency-repair.html'},
      {title:'Garage Door Repair', desc:'Full repair services', href:'services/garage-door-repair/index.html'}
    ]
  }),

  servicePage({
    file: 'services/garage-door-repair/emergency-repair.html',
    title: '24/7 Emergency Garage Door Repair San Diego | Castle',
    description: 'Emergency garage door repair available 24/7 in San Diego & Riverside County. Stuck door? Call (858) 578-1990 now.',
    h1: '24/7 Emergency Garage Door Repair',
    subtitle: 'Your garage door emergency can\'t wait until morning. Neither can we.',
    crumbs: repairSubCrumbs('Emergency Repair'),
    content: `<p>A garage door that won&rsquo;t open traps your car inside. A door that won&rsquo;t close leaves your home exposed. When these emergencies happen at night, on weekends, or during holidays, Castle Garage Doors &amp; Gates is here. Our 24/7 emergency repair service means a skilled technician is on call whenever you need one.</p>
      <h2>Emergency Situations We Handle</h2>
      <ul>
        <li>Door stuck open &mdash; your home is unsecured</li>
        <li>Door stuck closed &mdash; your vehicle is trapped</li>
        <li>Broken spring during off-hours</li>
        <li>Door off its tracks</li>
        <li>Storm or accident damage</li>
        <li>Break-in damage requiring immediate repair</li>
        <li>Commercial door failures affecting business operations</li>
      </ul>
      <h2>What to Expect</h2>
      <p>When you call our emergency line, you&rsquo;ll speak to a real person &mdash; not a voicemail. We&rsquo;ll dispatch a technician to your location as quickly as possible, typically within 60 to 90 minutes. Our trucks carry common parts, so most emergency repairs are completed on the spot.</p>
      <p>Emergency service is available throughout our entire service area, from San Diego through Riverside County, including Escondido, Oceanside, Carlsbad, Temecula, Murrieta, and Corona.</p>`,
    faqs: [
      {q:'How quickly can you respond to an emergency?', a:'We typically arrive within 60-90 minutes of your call, depending on your location and current demand. Our dispatchers will give you an estimated arrival time.'},
      {q:'Is emergency repair more expensive?', a:'Emergency calls outside normal business hours may include a service call fee. However, our repair rates remain competitive and you\'ll receive an upfront quote before we begin any work.'},
      {q:'What areas do you cover for emergency service?', a:'We provide 24/7 emergency service throughout San Diego County and Riverside County, including all cities in our service area: San Diego, Escondido, Oceanside, Carlsbad, Temecula, Murrieta, Corona, and more.'}
    ],
    related: [
      {title:'Spring Replacement', desc:'The most common emergency', href:'services/garage-door-repair/spring-replacement.html'},
      {title:'Cable Replacement', desc:'Snapped cables need fast repair', href:'services/garage-door-repair/cable-replacement.html'},
      {title:'Track Repair', desc:'Off-track doors are urgent', href:'services/garage-door-repair/track-repair.html'}
    ]
  })
];

module.exports = [servicesHub(), repairHub(), ...repairPages];
