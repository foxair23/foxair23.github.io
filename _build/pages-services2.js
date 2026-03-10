// Installation, Openers, and Gate service pages
const T = require('./templates');

function servicePage(opts) {
  const prefix = T.getPrefix(opts.file);
  const body = `
  ${T.heroInterior(opts.h1, opts.subtitle, opts.crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">${opts.content}</div>
    ${opts.process ? `<h2 style="margin-top:var(--space-12);margin-bottom:var(--space-6);">Our Process</h2>${T.processSteps(opts.process)}` : ''}
    <div style="margin-top:var(--space-12);padding:var(--space-8);background:var(--color-bg-white);border-radius:var(--radius-lg);border:1px solid var(--color-border-light);">
      <h3>Transparent Pricing</h3><p>We provide upfront pricing before any work begins. No surprises, no hidden fees.</p>
    </div>
    ${T.relatedServices(opts.related, prefix)}
  </div></div>
  ${T.faqSection(opts.faqs)}`;
  return { file:opts.file, title:opts.title, description:opts.description, activePage:'services', body, schema:(opts.faqs?T.faqSchema(opts.faqs):'')+T.breadcrumbSchema(opts.crumbs) };
}

// ========== INSTALLATION ==========
const instCrumbs = (l) => [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Installation',href:'services/garage-door-installation/index.html'},{label:l}];

function installHub() {
  const prefix = T.getPrefix('services/garage-door-installation/index.html');
  const ico = T.svgIcons();
  const crumbs = [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Garage Door Installation'}];
  const body = `
  ${T.heroInterior('Garage Door Installation', 'New garage doors transform your home\'s curb appeal, improve energy efficiency, and increase property value.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">
      <p>Whether you&rsquo;re replacing an aging door, upgrading after storm damage, or building new construction, Castle Garage Doors &amp; Gates offers a complete selection of residential and commercial garage doors. As a Clopay Authorized Dealer, we provide access to one of the most respected garage door manufacturers in the industry.</p>
      <p>A new garage door is one of the highest-ROI home improvements you can make. According to Remodeling Magazine&rsquo;s annual Cost vs. Value report, garage door replacement consistently ranks among the top projects for return on investment &mdash; often recovering 90%+ of the cost at resale.</p>
    </div>
    <div class="service-list" style="margin-top:var(--space-8);">
      <a href="residential.html" class="service-list-item"><div class="num">1</div><div><h4>Residential Garage Doors</h4><p>Single and double doors for homes of every style</p></div></a>
      <a href="commercial.html" class="service-list-item"><div class="num">2</div><div><h4>Commercial Garage Doors</h4><p>Sectional, rolling, and high-performance doors for business</p></div></a>
      <a href="custom.html" class="service-list-item"><div class="num">3</div><div><h4>Custom Garage Doors</h4><p>Unique designs tailored to your vision</p></div></a>
      <a href="styles-materials.html" class="service-list-item"><div class="num">4</div><div><h4>Styles &amp; Materials Guide</h4><p>Steel, wood, aluminum, composite, and more</p></div></a>
    </div>
  </div></div>`;
  return { file:'services/garage-door-installation/index.html', title:'New Garage Door Installation San Diego | Castle', description:'New garage door installation in San Diego. Clopay Authorized Dealer. Residential & commercial. Steel, wood, aluminum, custom. Free estimates. Call (858) 578-1990.', activePage:'services', body, schema:T.breadcrumbSchema(crumbs) };
}

const installPages = [
  servicePage({ file:'services/garage-door-installation/residential.html', title:'Residential Garage Doors San Diego | Castle', description:'Residential garage door installation in San Diego. Single, double, insulated, and designer doors. Clopay dealer. Call (858) 578-1990.', h1:'Residential Garage Doors', subtitle:'The perfect door for your home, professionally installed.', crumbs:instCrumbs('Residential'),
    content:`<p>Your garage door makes up roughly 30% of your home&rsquo;s front facade. Choosing the right door dramatically impacts your curb appeal, energy efficiency, and daily convenience. We help you navigate the options and install the perfect door for your home and budget.</p>
    <h2>Residential Door Options</h2>
    <ul><li><strong>Traditional raised panel</strong> &mdash; the most popular style, available in steel, wood, and composite</li>
    <li><strong>Carriage house</strong> &mdash; the charm of old-world swing-out doors with modern overhead convenience, popular in Temecula and North County</li>
    <li><strong>Contemporary/modern</strong> &mdash; clean lines, flush panels, aluminum and glass (Clopay AVANTE series)</li>
    <li><strong>Insulated doors</strong> &mdash; 2-inch or 3-inch polyurethane insulation for energy efficiency and quieter operation</li></ul>
    <h2>Why Clopay?</h2>
    <p>As a Clopay Authorized Dealer, we offer America&rsquo;s most trusted garage door brand. Clopay doors are manufactured in the USA and backed by comprehensive warranties. Their Imagine System lets you visualize different door styles on a photo of your actual home before you commit.</p>`,
    faqs:[{q:'How much does a new residential garage door cost?',a:'Residential garage doors range from $800 to $4,000+ installed, depending on size, material, insulation, and design. A standard 16x7 steel insulated door with installation typically runs $1,200-$2,200. We provide free in-home estimates.'},{q:'How long does installation take?',a:'A standard residential garage door installation takes 4-6 hours. Custom doors or installations requiring structural work may take longer.'},{q:'Will a new door improve my home\'s value?',a:'Yes. Garage door replacement consistently ranks as one of the highest-ROI home improvements, often recovering 90%+ of cost at resale.'}],
    related:[{title:'Custom Garage Doors',desc:'Unique designs for your home',href:'services/garage-door-installation/custom.html'},{title:'Styles & Materials',desc:'Compare options',href:'services/garage-door-installation/styles-materials.html'},{title:'Garage Door Openers',desc:'Pair with a new opener',href:'services/garage-door-openers/index.html'}]
  }),
  servicePage({ file:'services/garage-door-installation/commercial.html', title:'Commercial Garage Doors San Diego | Castle', description:'Commercial garage door installation & repair in San Diego. Sectional, rolling, high-speed doors. Call (858) 578-1990.', h1:'Commercial Garage Doors', subtitle:'Durable, secure, and efficient doors for your business.', crumbs:instCrumbs('Commercial'),
    content:`<p>Commercial garage doors face demands that residential doors never encounter: heavy daily use, extreme weather exposure, security requirements, and the need for minimal downtime. Castle serves warehouses, auto shops, fire stations, loading docks, retail storefronts, and more across San Diego and Riverside County.</p>
    <h2>Commercial Door Types</h2>
    <ul><li><strong>Sectional overhead doors</strong> &mdash; the most common commercial type, available in insulated and non-insulated versions</li>
    <li><strong>Rolling steel doors</strong> &mdash; coil up above the opening, ideal for limited headroom</li>
    <li><strong>Fire-rated doors</strong> &mdash; meet fire code requirements for compartmentalization</li>
    <li><strong>High-speed doors</strong> &mdash; rapid open/close for high-traffic areas, reducing energy loss</li>
    <li><strong>Security grilles</strong> &mdash; ventilated security for retail and storefronts</li></ul>`,
    faqs:[{q:'Do you service commercial doors or just residential?',a:'We handle both. About 20% of our work is commercial. We service warehouses, auto shops, retail, and more.'},{q:'Can you install doors with loading dock requirements?',a:'Yes. We install sectional doors, rolling steel doors, and dock equipment for commercial and industrial facilities.'}],
    related:[{title:'Residential Doors',desc:'Doors for your home',href:'services/garage-door-installation/residential.html'},{title:'Gate Services',desc:'Commercial gates too',href:'services/gate-services/index.html'},{title:'Emergency Repair',desc:'Minimize business downtime',href:'services/garage-door-repair/emergency-repair.html'}]
  }),
  servicePage({ file:'services/garage-door-installation/custom.html', title:'Custom Garage Doors San Diego | Castle', description:'Custom garage door design and installation in San Diego. Unique doors built to your specifications. Call (858) 578-1990.', h1:'Custom Garage Doors', subtitle:'When your vision requires something beyond the catalog.', crumbs:instCrumbs('Custom'),
    content:`<p>Sometimes the standard options don&rsquo;t fit &mdash; literally or aesthetically. Whether you have a non-standard opening, a specific architectural style to match, or a unique design vision, we work with specialty manufacturers to create garage doors built exactly to your specifications.</p>
    <h2>Custom Door Possibilities</h2>
    <ul><li>Non-standard sizes and configurations</li><li>Specific wood species (cedar, mahogany, alder) with custom stains</li><li>Glass and aluminum designs (Clopay AVANTE series with endless configuration options)</li><li>Matching historical or architectural styles</li><li>Integrated windows, hardware, and decorative elements</li><li>Bi-fold, tilt-up, or specialty operating mechanisms</li></ul>`,
    faqs:[{q:'How long does a custom garage door order take?',a:'Custom doors typically take 4-8 weeks from order to installation, depending on complexity and manufacturer lead times.'},{q:'Are custom doors significantly more expensive?',a:'Custom doors start around $3,000 and can go well above $10,000 for premium materials and complex designs. We provide detailed quotes after an in-home consultation.'}],
    related:[{title:'Residential Doors',desc:'Standard options',href:'services/garage-door-installation/residential.html'},{title:'Styles & Materials',desc:'Material comparison',href:'services/garage-door-installation/styles-materials.html'},{title:'Garage Door Repair',desc:'Maintain your investment',href:'services/garage-door-repair/index.html'}]
  }),
  servicePage({ file:'services/garage-door-installation/styles-materials.html', title:'Garage Door Styles & Materials Guide | Castle', description:'Compare garage door styles and materials: steel, wood, aluminum, composite. Pros, cons, and costs. San Diego garage door experts.', h1:'Garage Door Styles &amp; Materials', subtitle:'A guide to choosing the right door for your home and climate.', crumbs:instCrumbs('Styles & Materials'),
    content:`<p>Choosing a garage door material is about balancing aesthetics, durability, insulation, maintenance, and budget. Here&rsquo;s what you need to know about each option, with special consideration for San Diego&rsquo;s coastal and inland climate.</p>
    <h2>Steel Garage Doors</h2><p>The most popular choice for good reason. Modern steel doors come in hundreds of designs, offer excellent insulation (when layered), resist denting, and require minimal maintenance. Available in smooth, woodgrain, and textured finishes. Best for: most homeowners seeking durability and value.</p>
    <h2>Wood Garage Doors</h2><p>Nothing matches the warmth and character of real wood. Available in cedar, redwood, mahogany, and more. Requires periodic staining or painting to maintain. Higher maintenance but stunning curb appeal. Best for: custom homes, historical districts, and homeowners who value natural materials.</p>
    <h2>Aluminum &amp; Glass Doors</h2><p>The modern, contemporary choice. Clopay&rsquo;s AVANTE series features anodized aluminum frames with various glass options (frosted, tinted, clear, mirrored). Lightweight, rust-resistant, and architecturally striking. Best for: modern and mid-century homes.</p>
    <h2>Composite / Faux Wood</h2><p>The look of wood without the maintenance. Composite doors resist moisture, won&rsquo;t warp or rot, and hold paint or stain well. An increasingly popular middle ground. Best for: coastal San Diego homes where real wood may deteriorate faster.</p>`,
    faqs:[{q:'What is the best garage door material for coastal San Diego?',a:'Steel or composite are the best choices for coastal areas. Salt air accelerates corrosion on bare metal and rot on untreated wood. Modern steel doors have protective coatings, and composite resists moisture naturally. Aluminum is also excellent for coastal use.'},{q:'What R-value should my garage door have?',a:'For San Diego\'s climate, an R-value of 8-12 is sufficient for most homes. If your garage is attached and you use it as a workshop or living space, consider R-16 or higher.'}],
    related:[{title:'Residential Doors',desc:'Ready to choose? Start here',href:'services/garage-door-installation/residential.html'},{title:'Custom Doors',desc:'Beyond standard options',href:'services/garage-door-installation/custom.html'},{title:'Garage Door Repair',desc:'Existing door needs work?',href:'services/garage-door-repair/index.html'}]
  })
];

// ========== OPENERS ==========
const opCrumbs = (l) => [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Openers',href:'services/garage-door-openers/index.html'},{label:l}];

function openersHub() {
  const prefix = T.getPrefix('services/garage-door-openers/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Garage Door Openers'}];
  const body = `
  ${T.heroInterior('Garage Door Openers', 'Installation, repair, and replacement of all major opener brands.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">
      <p>Your garage door opener is the motor that makes daily life convenient &mdash; a button press from your car, your phone, or your wall panel. When it fails, you&rsquo;re either locked out or stuck manually lifting a heavy door. Castle installs and repairs all major brands, with special expertise in LiftMaster, Marantec, and Genie.</p>
    </div>
    <div class="service-list" style="margin-top:var(--space-8);">
      <a href="installation.html" class="service-list-item"><div class="num">1</div><div><h4>Opener Installation</h4><p>New opener installation for any garage door</p></div></a>
      <a href="repair.html" class="service-list-item"><div class="num">2</div><div><h4>Opener Repair</h4><p>Fix your existing opener: motor, gear, circuit board</p></div></a>
      <a href="liftmaster.html" class="service-list-item"><div class="num">3</div><div><h4>LiftMaster Openers</h4><p>The industry-leading brand, professionally installed</p></div></a>
      <a href="smart-wifi.html" class="service-list-item"><div class="num">4</div><div><h4>Smart / WiFi-Enabled</h4><p>Control your garage from anywhere via smartphone</p></div></a>
      <a href="opener-types.html" class="service-list-item"><div class="num">5</div><div><h4>Opener Types Guide</h4><p>Belt, chain, screw, wall-mount &mdash; which is right?</p></div></a>
    </div>
  </div></div>`;
  return { file:'services/garage-door-openers/index.html', title:'Garage Door Openers San Diego | Castle', description:'Garage door opener installation and repair in San Diego. LiftMaster, Genie, Marantec. Smart/WiFi openers. Call (858) 578-1990.', activePage:'services', body, schema:T.breadcrumbSchema(crumbs) };
}

const openerPages = [
  servicePage({ file:'services/garage-door-openers/installation.html', title:'Garage Door Opener Installation San Diego | Castle', description:'Professional garage door opener installation in San Diego. All brands. Belt, chain, wall-mount. Call (858) 578-1990.', h1:'Garage Door Opener Installation', subtitle:'The right opener for your door, professionally installed and programmed.', crumbs:opCrumbs('Installation'),
    content:`<p>A properly matched and installed opener makes your garage door quiet, reliable, and secure. We help you choose the right type and horsepower for your door&rsquo;s size and weight, then install it to manufacturer specifications with full programming of remotes, keypads, and smartphone apps.</p>
    <h2>What&rsquo;s Included in Our Installation</h2>
    <ul><li>Opener unit mounted and wired</li><li>Safety sensors installed and aligned</li><li>Wall control panel mounted</li><li>Up to two remotes programmed</li><li>Keypad programmed (if included)</li><li>WiFi/smartphone app setup (for smart openers)</li><li>Force and travel limits set and tested</li><li>Full safety reversal testing</li><li>Removal and disposal of old opener (if applicable)</li></ul>`,
    faqs:[{q:'How long does opener installation take?',a:'A typical opener installation takes 2-3 hours including setup, programming, and testing.'},{q:'Do I need a specific horsepower?',a:'Standard single-car doors: 1/2 HP. Double-car doors: 3/4 HP. Heavy or oversized doors: 1 HP or higher. We\'ll recommend the right power for your door.'}],
    related:[{title:'LiftMaster Openers',desc:'Our recommended brand',href:'services/garage-door-openers/liftmaster.html'},{title:'Smart/WiFi Openers',desc:'Control from your phone',href:'services/garage-door-openers/smart-wifi.html'},{title:'Opener Types',desc:'Belt vs chain vs screw',href:'services/garage-door-openers/opener-types.html'}]
  }),
  servicePage({ file:'services/garage-door-openers/repair.html', title:'Garage Door Opener Repair San Diego | Castle', description:'Garage door opener repair in San Diego. Motor, gear, remote, circuit board repair. All brands. Call (858) 578-1990.', h1:'Garage Door Opener Repair', subtitle:'Before you replace your opener, let us see if a repair can save you money.', crumbs:opCrumbs('Repair'),
    content:`<p>Not every opener problem requires a new unit. Many issues &mdash; stripped gears, failed capacitors, logic board glitches, remote programming problems &mdash; can be repaired at a fraction of replacement cost. Our technicians diagnose the issue on-site and give you an honest recommendation.</p>
    <h2>Common Opener Problems We Fix</h2>
    <ul><li>Opener runs but door doesn&rsquo;t move (stripped gear)</li><li>Opener hums but won&rsquo;t engage (capacitor or motor issue)</li><li>Remote won&rsquo;t work (reprogramming or receiver replacement)</li><li>Door reverses immediately (force or limit adjustment, sensor issue)</li><li>Opener is excessively noisy (worn gear, chain tension, vibration)</li><li>Intermittent operation (logic board, wiring, or power issue)</li></ul>`,
    faqs:[{q:'Is it worth repairing or should I replace?',a:'As a rule of thumb: if the opener is under 10 years old and the repair is under half the cost of replacement, repair makes sense. If it\'s 15+ years old or needs major motor work, replacement is usually smarter.'},{q:'Can you repair any brand of opener?',a:'Yes. We service LiftMaster, Chamberlain, Genie, Marantec, Craftsman, Linear, and all other major brands.'}],
    related:[{title:'Opener Installation',desc:'When replacement is best',href:'services/garage-door-openers/installation.html'},{title:'Sensor Repair',desc:'Sensor issues mimic opener problems',href:'services/garage-door-repair/sensor-repair.html'},{title:'Emergency Repair',desc:'Opener failed? We\'re 24/7',href:'services/garage-door-repair/emergency-repair.html'}]
  }),
  servicePage({ file:'services/garage-door-openers/liftmaster.html', title:'LiftMaster Garage Door Openers San Diego | Castle', description:'Authorized LiftMaster garage door opener installation in San Diego. Smart openers, battery backup, quiet operation. Call (858) 578-1990.', h1:'LiftMaster Garage Door Openers', subtitle:'The industry\'s most trusted opener brand, professionally installed.', crumbs:opCrumbs('LiftMaster'),
    content:`<p>LiftMaster is the #1 professionally installed garage door opener brand in North America. Manufactured by The Chamberlain Group, LiftMaster openers are engineered for reliability, security, and smart home integration. Castle is proud to install and service the full LiftMaster lineup.</p>
    <h2>Why We Recommend LiftMaster</h2>
    <ul><li><strong>myQ smart technology</strong> &mdash; monitor and control your garage door from anywhere via smartphone</li><li><strong>Battery backup</strong> &mdash; operates during power outages (critical during San Diego heat events)</li><li><strong>Security+ 2.0</strong> &mdash; rolling code technology that changes the access code with every use</li><li><strong>Belt drive options</strong> &mdash; ultra-quiet operation for attached garages</li><li><strong>Proven reliability</strong> &mdash; backed by strong manufacturer warranties</li></ul>`,
    faqs:[{q:'Is LiftMaster better than Genie or Chamberlain?',a:'LiftMaster and Chamberlain are made by the same manufacturer (Chamberlain Group). LiftMaster is the professional line with enhanced features. Both are excellent. Genie is also reliable. We recommend LiftMaster for its smart features and professional support.'},{q:'Can LiftMaster work with my smart home?',a:'Yes. LiftMaster\'s myQ platform integrates with Apple HomeKit, Google Assistant, Amazon Key, and IFTTT. You can also integrate with home security systems.'}],
    related:[{title:'Smart/WiFi Openers',desc:'Smart home integration',href:'services/garage-door-openers/smart-wifi.html'},{title:'Opener Installation',desc:'Professional installation',href:'services/garage-door-openers/installation.html'},{title:'Opener Types Guide',desc:'Compare drive types',href:'services/garage-door-openers/opener-types.html'}]
  }),
  servicePage({ file:'services/garage-door-openers/smart-wifi.html', title:'Smart WiFi Garage Door Openers San Diego | Castle', description:'Smart WiFi garage door openers in San Diego. Control from your phone. LiftMaster myQ. Professional installation. Call (858) 578-1990.', h1:'Smart / WiFi-Enabled Garage Door Openers', subtitle:'Open, close, and monitor your garage door from anywhere.', crumbs:opCrumbs('Smart / WiFi'),
    content:`<p>Forgot to close the garage? With a smart opener, you can check and close it from your phone, whether you&rsquo;re at work, on vacation, or just in bed. Smart openers add convenience, security, and peace of mind to your daily routine.</p>
    <h2>Smart Opener Features</h2>
    <ul><li><strong>Smartphone control</strong> &mdash; open and close from anywhere via app</li><li><strong>Real-time alerts</strong> &mdash; get notified when your door opens or closes</li><li><strong>Scheduled closing</strong> &mdash; set the door to automatically close at a specific time</li><li><strong>Guest access</strong> &mdash; grant temporary access to family, dog walkers, or delivery drivers</li><li><strong>Activity log</strong> &mdash; see a history of when the door was opened and closed</li><li><strong>Voice control</strong> &mdash; works with Alexa, Google Assistant, Apple HomeKit</li></ul>
    <h2>Already Have an Opener?</h2>
    <p>If your current opener is in good condition but isn&rsquo;t smart, we can often add WiFi capability with a retrofit kit like the LiftMaster myQ Smart Garage Hub &mdash; no need to replace the entire opener.</p>`,
    faqs:[{q:'Can I add WiFi to my existing garage door opener?',a:'In many cases, yes. The LiftMaster myQ Smart Garage Hub works with most openers manufactured after 1993. We can assess compatibility and install the hub for you.'},{q:'Is a smart garage door opener secure?',a:'Yes. LiftMaster\'s Security+ 2.0 uses rolling code encryption that changes with every use. The myQ app uses bank-level encryption. Smart openers are actually more secure than older fixed-code remotes.'}],
    related:[{title:'LiftMaster Openers',desc:'Our recommended smart brand',href:'services/garage-door-openers/liftmaster.html'},{title:'Opener Installation',desc:'Full opener replacement',href:'services/garage-door-openers/installation.html'},{title:'Opener Repair',desc:'Fix your existing opener',href:'services/garage-door-openers/repair.html'}]
  }),
  servicePage({ file:'services/garage-door-openers/opener-types.html', title:'Garage Door Opener Types: Belt vs Chain vs Screw | Castle', description:'Compare garage door opener types: belt drive, chain drive, screw drive, wall-mount. Pros and cons for San Diego homes.', h1:'Garage Door Opener Types', subtitle:'Belt, chain, screw, or wall-mount? Here\'s how to choose.', crumbs:opCrumbs('Opener Types'),
    content:`<p>The drive type determines how your opener converts motor power into door movement. Each has advantages and trade-offs. Here&rsquo;s what San Diego homeowners need to know.</p>
    <h2>Belt Drive</h2><p>Uses a reinforced rubber belt. <strong>Quietest option</strong> &mdash; ideal for attached garages where bedrooms are above or adjacent. Slightly higher cost but significantly less noise and vibration. Our most-recommended type for residential use.</p>
    <h2>Chain Drive</h2><p>Uses a metal chain (like a bicycle chain). <strong>Most affordable and durable.</strong> Noisier than belt drive, making it better suited for detached garages. Time-tested reliability.</p>
    <h2>Screw Drive</h2><p>Uses a threaded steel rod. <strong>Fewer moving parts</strong> means less maintenance. Moderate noise level. Performs well in San Diego&rsquo;s climate since it&rsquo;s less affected by temperature extremes than in cold climates. Good middle ground.</p>
    <h2>Wall-Mount (Jackshaft)</h2><p>Mounts on the wall beside the door instead of overhead. <strong>Frees up ceiling space</strong> for storage, tall vehicles, or ceiling-mounted lifts. Quiet and powerful. The premium option, ideal for garages with limited headroom or high ceilings.</p>`,
    faqs:[{q:'Which opener type is quietest?',a:'Belt drive openers are the quietest, followed by wall-mount/jackshaft, screw drive, and chain drive. If your garage is attached to your home, we strongly recommend belt drive or wall-mount.'},{q:'Which opener type lasts longest?',a:'All modern openers last 10-15+ years with proper maintenance. Chain drives have a slight edge in raw durability, but belt drives have fewer moving parts to wear out. The motor itself is usually what determines lifespan.'}],
    related:[{title:'Opener Installation',desc:'Ready to install?',href:'services/garage-door-openers/installation.html'},{title:'LiftMaster Openers',desc:'Available in all drive types',href:'services/garage-door-openers/liftmaster.html'},{title:'Smart/WiFi Openers',desc:'Add smart features',href:'services/garage-door-openers/smart-wifi.html'}]
  })
];

// ========== GATES ==========
const gateCrumbs = (l) => [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Gate Services',href:'services/gate-services/index.html'},{label:l}];

function gateHub() {
  const prefix = T.getPrefix('services/gate-services/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Services',href:'services/index.html'},{label:'Gate Services'}];
  const body = `
  ${T.heroInterior('Gate Services', 'Installation, repair, and automation for residential and commercial gates.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">
      <p>Most garage door companies don&rsquo;t touch gates. Castle does. Gate installation and repair has been part of our service offering for decades, and it&rsquo;s one of the key things that sets us apart. Whether you need a new driveway gate, a security gate for your business, or repair on an existing automatic gate system, our team has the expertise.</p>
    </div>
    <div class="service-list" style="margin-top:var(--space-8);">
      <a href="installation.html" class="service-list-item"><div class="num">1</div><div><h4>Gate Installation</h4><p>New gate design, fabrication, and installation</p></div></a>
      <a href="repair.html" class="service-list-item"><div class="num">2</div><div><h4>Gate Repair</h4><p>Fix mechanical, electrical, and structural gate issues</p></div></a>
      <a href="automatic-electric.html" class="service-list-item"><div class="num">3</div><div><h4>Automatic / Electric Gates</h4><p>Gate automation and electric operator systems</p></div></a>
      <a href="driveway.html" class="service-list-item"><div class="num">4</div><div><h4>Driveway Gates</h4><p>Enhance security and curb appeal at your entrance</p></div></a>
      <a href="security.html" class="service-list-item"><div class="num">5</div><div><h4>Security Gates</h4><p>Controlled-access gates for properties and businesses</p></div></a>
      <a href="openers.html" class="service-list-item"><div class="num">6</div><div><h4>Gate Openers</h4><p>Installation and repair of gate operator systems</p></div></a>
    </div>
  </div></div>`;
  return { file:'services/gate-services/index.html', title:'Gate Installation & Repair San Diego | Castle', description:'Gate installation and repair in San Diego. Automatic, driveway, security gates. A specialty most competitors don\'t offer. Call (858) 578-1990.', activePage:'services', body, schema:T.breadcrumbSchema(crumbs) };
}

const gatePages = [
  servicePage({ file:'services/gate-services/installation.html', title:'Gate Installation San Diego | Castle', description:'Professional gate installation in San Diego. Driveway, security, automatic gates. Wrought iron, aluminum, wood. Call (858) 578-1990.', h1:'Gate Installation', subtitle:'Custom gate design and professional installation for homes and businesses.', crumbs:gateCrumbs('Installation'),
    content:`<p>A well-designed gate enhances your property&rsquo;s security, privacy, and curb appeal. We work with you from initial design through installation, ensuring your gate complements your property&rsquo;s architecture and meets your functional needs.</p>
    <h2>Gate Styles We Install</h2>
    <ul><li><strong>Sliding gates</strong> &mdash; ideal for sloped driveways or limited space</li><li><strong>Swing gates</strong> &mdash; classic look, single or double leaf</li><li><strong>Cantilever gates</strong> &mdash; no ground track required, smooth operation</li><li><strong>Barrier arm gates</strong> &mdash; for parking lots and commercial access control</li></ul>
    <h2>Materials</h2>
    <ul><li><strong>Wrought iron</strong> &mdash; classic elegance, extremely durable</li><li><strong>Aluminum</strong> &mdash; lightweight, rust-resistant, great for coastal areas</li><li><strong>Steel</strong> &mdash; maximum security and durability</li><li><strong>Wood</strong> &mdash; privacy and warmth, often combined with metal frames</li></ul>`,
    faqs:[{q:'How much does gate installation cost?',a:'Gate costs vary widely based on size, material, and automation. A basic manual driveway gate starts around $2,000 installed. Automated gates with operators range from $4,000 to $12,000+. We provide free on-site estimates.'},{q:'Do I need a permit for a driveway gate?',a:'In most San Diego and Riverside County jurisdictions, yes. Gates over a certain height or automated gates typically require a building permit. We handle the permitting process as part of our installation service.'}],
    related:[{title:'Automatic Gates',desc:'Add automation',href:'services/gate-services/automatic-electric.html'},{title:'Driveway Gates',desc:'Entrance gates',href:'services/gate-services/driveway.html'},{title:'Gate Openers',desc:'Operator systems',href:'services/gate-services/openers.html'}]
  }),
  servicePage({ file:'services/gate-services/repair.html', title:'Gate Repair San Diego | Castle', description:'Gate repair in San Diego. Electric gate, sliding gate, swing gate repair. Motor, hinge, track issues. Call (858) 578-1990.', h1:'Gate Repair', subtitle:'Expert repair for all types of residential and commercial gates.', crumbs:gateCrumbs('Repair'),
    content:`<p>Gates endure constant exposure to weather, daily mechanical stress, and the occasional vehicle bump. When your gate stops working, sticks, makes strange noises, or won&rsquo;t respond to remotes, Castle&rsquo;s experienced technicians can diagnose and fix the problem.</p>
    <h2>Common Gate Repairs</h2>
    <ul><li>Gate opener/motor replacement or repair</li><li>Hinge repair and realignment</li><li>Track and roller replacement for sliding gates</li><li>Chain or belt drive repair</li><li>Remote and keypad reprogramming</li><li>Safety sensor adjustment and replacement</li><li>Structural repair (welding, straightening)</li><li>Rust treatment and repainting</li><li>Intercom and access control system repair</li></ul>`,
    faqs:[{q:'Can you repair any brand of gate opener?',a:'Yes. We service all major gate operator brands including LiftMaster, DoorKing, FAAC, Viking, Ramset, and Linear.'},{q:'My gate opens but won\'t close. What\'s wrong?',a:'The most common causes are a safety sensor obstruction or misalignment, a limit switch issue, or a control board problem. We can diagnose the issue on-site.'}],
    related:[{title:'Gate Openers',desc:'Opener-specific repair',href:'services/gate-services/openers.html'},{title:'Gate Installation',desc:'When replacement is better',href:'services/gate-services/installation.html'},{title:'Security Gates',desc:'Security gate service',href:'services/gate-services/security.html'}]
  }),
  servicePage({ file:'services/gate-services/automatic-electric.html', title:'Automatic Electric Gates San Diego | Castle', description:'Automatic and electric gate installation in San Diego. Sliding, swing, barrier gates. Smart access control. Call (858) 578-1990.', h1:'Automatic / Electric Gates', subtitle:'Convenience, security, and curb appeal — all at the push of a button.', crumbs:gateCrumbs('Automatic Gates'),
    content:`<p>An automatic gate eliminates the need to get out of your car in the rain, manually open a heavy gate, or worry about whether you remembered to close it. Modern electric gate systems offer remote control, smartphone integration, intercom access, and integration with home security systems.</p>
    <h2>Automation Options</h2>
    <ul><li><strong>Swing gate operators</strong> &mdash; hydraulic or electromechanical arms for hinged gates</li><li><strong>Slide gate operators</strong> &mdash; chain or direct-drive motors for sliding gates</li><li><strong>Solar-powered systems</strong> &mdash; ideal for remote locations without electrical access</li></ul>
    <h2>Access Control Options</h2>
    <ul><li>Remote controls and keypads</li><li>Smartphone app control (myQ and others)</li><li>Video intercoms with remote unlock</li><li>Keycard and proximity readers</li><li>Vehicle detection loops</li><li>Telephone entry systems for multi-tenant properties</li></ul>`,
    faqs:[{q:'Can I add automation to my existing manual gate?',a:'In most cases, yes. We can retrofit an electric operator to your existing gate, provided the gate is structurally sound and properly balanced.'},{q:'What happens during a power outage?',a:'All automatic gates include a manual release mechanism so you can open the gate by hand during outages. Battery backup systems are also available.'}],
    related:[{title:'Gate Installation',desc:'New automated gates',href:'services/gate-services/installation.html'},{title:'Gate Openers',desc:'Operator systems',href:'services/gate-services/openers.html'},{title:'Driveway Gates',desc:'Entrance automation',href:'services/gate-services/driveway.html'}]
  }),
  servicePage({ file:'services/gate-services/driveway.html', title:'Driveway Gates San Diego | Castle', description:'Driveway gate installation in San Diego. Sliding, swing, wrought iron, wood. Enhance security & curb appeal. Call (858) 578-1990.', h1:'Driveway Gates', subtitle:'The first impression your property makes — make it count.', crumbs:gateCrumbs('Driveway Gates'),
    content:`<p>A driveway gate is both a functional security feature and a statement about your property. In San Diego&rsquo;s neighborhoods from La Jolla to Temecula, well-designed driveway gates add significant value, privacy, and character to residential properties.</p>
    <h2>Choosing the Right Driveway Gate</h2>
    <p>Consider your driveway layout (slope, width, clearance), desired level of privacy, architectural style, and whether you want manual or automatic operation. We provide free on-site consultations to help you navigate these decisions.</p>
    <h2>Popular Styles in San Diego</h2>
    <ul><li><strong>Spanish/Mediterranean iron gates</strong> &mdash; ornamental wrought iron with scrollwork, popular in Escondido and Temecula</li><li><strong>Modern horizontal slat gates</strong> &mdash; clean lines in aluminum or steel, popular in coastal communities</li><li><strong>Ranch-style wood gates</strong> &mdash; rustic charm for Fallbrook, Bonsall, and rural properties</li><li><strong>Privacy gates</strong> &mdash; solid panels or closely-spaced slats for maximum seclusion</li></ul>`,
    faqs:[{q:'How wide should a driveway gate be?',a:'A single driveway gate is typically 10-12 feet wide. Double gates (two leaves) typically span 12-18 feet. We measure your driveway and recommend the optimal width for your vehicles and usage.'},{q:'Do driveway gates increase home value?',a:'Yes. A quality driveway gate, especially an automated one, is a desirable feature that can increase property value and attract buyers who prioritize security and privacy.'}],
    related:[{title:'Automatic Gates',desc:'Add automation',href:'services/gate-services/automatic-electric.html'},{title:'Security Gates',desc:'Enhanced security',href:'services/gate-services/security.html'},{title:'Gate Installation',desc:'Full installation service',href:'services/gate-services/installation.html'}]
  }),
  servicePage({ file:'services/gate-services/security.html', title:'Security Gates San Diego | Castle', description:'Security gate installation in San Diego. Access control, commercial gates, perimeter security. Call (858) 578-1990.', h1:'Security Gates', subtitle:'Controlled access for residential communities, businesses, and high-value properties.', crumbs:gateCrumbs('Security Gates'),
    content:`<p>Security gates provide controlled access to your property, preventing unauthorized entry while allowing convenient access for residents, employees, and approved visitors. From single-family homes to gated communities to commercial facilities, we design and install security gate systems tailored to your specific requirements.</p>
    <h2>Security Gate Applications</h2>
    <ul><li>Residential driveway security with intercoms</li><li>Gated community entrance systems</li><li>Commercial property perimeter gates</li><li>Parking lot access control</li><li>Industrial facility security gates</li><li>Construction site temporary gates</li></ul>
    <h2>Integrated Security Features</h2>
    <ul><li>Video surveillance integration with gate system</li><li>Telephone entry systems for visitor management</li><li>License plate recognition (commercial)</li><li>Emergency vehicle access override (Knox box compatible)</li><li>Crash-rated barriers for high-security applications</li></ul>`,
    faqs:[{q:'Can a security gate integrate with my existing alarm system?',a:'Yes, most modern gate operators can integrate with home and commercial security systems. We work with your security provider to ensure seamless integration.'},{q:'What about emergency vehicle access?',a:'Security gates can be equipped with Knox box key switches or Opticom sensors that allow fire departments and emergency services to open the gate when needed.'}],
    related:[{title:'Automatic Gates',desc:'Automation technology',href:'services/gate-services/automatic-electric.html'},{title:'Gate Openers',desc:'Access systems',href:'services/gate-services/openers.html'},{title:'Commercial Doors',desc:'Complete commercial solutions',href:'services/garage-door-installation/commercial.html'}]
  }),
  servicePage({ file:'services/gate-services/openers.html', title:'Gate Openers San Diego | Castle', description:'Gate opener installation and repair in San Diego. Swing, slide, and barrier operators. All brands. Call (858) 578-1990.', h1:'Gate Openers', subtitle:'Reliable gate operator systems installed and serviced by experts.', crumbs:gateCrumbs('Gate Openers'),
    content:`<p>The gate opener (operator) is the motorized system that automates your gate. Choosing the right operator depends on your gate type, size, weight, and how frequently it&rsquo;s used. We install and service all major gate operator brands.</p>
    <h2>Gate Operator Types</h2>
    <ul><li><strong>Swing gate operators</strong> &mdash; articulated arm, linear arm, or underground hydraulic. For hinged/swing gates.</li><li><strong>Slide gate operators</strong> &mdash; chain-driven or direct-drive. For sliding and cantilever gates.</li><li><strong>Barrier arm operators</strong> &mdash; for parking lots and commercial access points.</li><li><strong>Overhead gate operators</strong> &mdash; for overhead security gates and grilles.</li></ul>
    <h2>Brands We Service</h2>
    <p>LiftMaster, DoorKing (DKS), FAAC, Viking, Ramset, Linear, US Automatic, Apollo, Mighty Mule, and more.</p>`,
    faqs:[{q:'How long do gate openers last?',a:'Quality gate operators typically last 10-20 years with regular maintenance. Commercial units see shorter lifespans due to higher usage cycles. Annual maintenance significantly extends lifespan.'},{q:'What maintenance does a gate opener need?',a:'Annual professional maintenance should include: lubrication of moving parts, chain/belt tension check, safety sensor testing, battery backup test, electrical connection inspection, and limit adjustment verification.'}],
    related:[{title:'Gate Repair',desc:'Fix existing openers',href:'services/gate-services/repair.html'},{title:'Automatic Gates',desc:'Full automation solutions',href:'services/gate-services/automatic-electric.html'},{title:'Gate Installation',desc:'New gate + opener',href:'services/gate-services/installation.html'}]
  })
];

module.exports = [installHub(), ...installPages, openersHub(), ...openerPages, gateHub(), ...gatePages];
