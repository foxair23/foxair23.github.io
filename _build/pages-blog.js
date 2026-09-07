// Blog / Knowledge Hub article pages
const T = require('./templates');

function authorBlock() {
  return `<div class="author-block" style="margin-top:var(--space-10);padding:var(--space-6);background:var(--color-surface);border-radius:var(--radius);display:flex;gap:var(--space-4);align-items:center;">
    <div class="author-avatar" style="width:64px;height:64px;border-radius:50%;background:var(--color-red);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.5rem;flex-shrink:0;">CT</div>
    <div>
      <strong>Castle Technical Team</strong>
      <p style="margin:var(--space-1) 0 0;font-size:var(--text-small);color:var(--color-text-secondary);">CSLB Licensed (#1154002, C-61/D-28) &bull; 40+ years combined experience &bull; Weekly OSHA safety training &bull; Clopay &amp; LiftMaster certified technicians</p>
    </div>
  </div>`;
}

function faqBlock(faqs) {
  return `<div class="article-faqs" style="margin-top:var(--space-12);">
    <h2>Common Questions</h2>
    ${faqs.map(f => `<h3>${f.q}</h3>\n    <p>${f.a}</p>`).join('\n    ')}
  </div>`;
}

function blogPost(opts) {
  const prefix = T.getPrefix(opts.file);
  const crumbs = [{label:'Home',href:'index.html'},{label:'Blog',href:'blog/index.html'},{label:opts.shortTitle || opts.h1}];
  const faqHTML = opts.faqs ? faqBlock(opts.faqs) : '';
  const faqSchema = opts.faqs ? T.faqSchema(opts.faqs.map(f => ({q:f.q, a:f.a}))) : '';
  const body = `
  ${T.heroInterior(opts.h1, '', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="blog-article">
      <div class="blog-meta">${opts.date} &bull; Castle Garage Doors &amp; Gates &bull; <span class="blog-card-tag">${opts.tag}</span></div>
      <p style="font-size:var(--text-small);color:var(--color-text-muted);margin-bottom:var(--space-6);">Last reviewed: ${opts.date}</p>
      <div class="content-section">${opts.content}</div>
      ${faqHTML}
      ${authorBlock()}
      <div style="margin-top:var(--space-12);padding:var(--space-8);background:var(--color-bg-white);border-radius:var(--radius-lg);border:2px solid var(--color-red);">
        <h3>Need Help With Your Garage Door?</h3>
        <p>Castle Garage Doors &amp; Gates has been serving San Diego to Riverside County since 1981. Call us at <a href="${T.PHONE_LINK}">${T.PHONE}</a> or <a href="${prefix}contact.html">schedule service online</a>.</p>
      </div>
    </div>
  </div></div>`;
  return { file:opts.file, title:`${opts.h1} | Castle Garage Doors & Gates`, description:opts.description, activePage:'blog', body, schema:T.articleSchema(opts.h1, opts.isoDate || '2026-03-01', opts.description)+faqSchema+T.breadcrumbSchema(crumbs) };
}

module.exports = [
  blogPost({
    file:'blog/signs-garage-door-spring-broken.html',
    h1:'How to Know If Your Garage Door Spring Is Broken',
    shortTitle:'Broken Spring Signs',
    tag:'Repair', date:'March 2026', isoDate:'2026-03-01',
    description:'Learn the signs of a broken garage door spring: loud bang, heavy door, visible gap, crooked opening. What to do next and when to call a pro.',
    content:`<p>A broken garage door spring is the most common garage door failure, and it usually happens without warning. One moment your door works fine; the next morning it won&rsquo;t budge. Here&rsquo;s how to tell if a broken spring is the culprit, and what to do about it.</p>

    <h2>The Telltale Signs</h2>

    <h3>1. You Heard a Loud Bang</h3>
    <p>The most dramatic sign is a loud bang from the garage &mdash; often described as sounding like a gunshot or a car backfiring. This is the sound of a torsion spring breaking under tension. Many homeowners hear this at night when temperature changes cause the final failure. If you heard this sound and your door stopped working, a broken spring is almost certainly the cause.</p>

    <h3>2. The Door Is Extremely Heavy</h3>
    <p>Try lifting the door manually using the emergency release cord (the red handle hanging from the opener track). If the door feels extremely heavy &mdash; like you can barely lift it &mdash; the springs have failed. A properly balanced door with working springs should feel light enough to lift with one hand. Without springs, you&rsquo;re lifting the full 150-250 pound weight of the door.</p>

    <h3>3. Visible Gap in the Spring</h3>
    <p>Look at the torsion spring mounted on the metal shaft above the door opening. A broken spring will have a visible gap &mdash; usually 2-4 inches &mdash; where the coils have separated. This is the most definitive visual confirmation.</p>

    <h3>4. The Door Opens Only Partway</h3>
    <p>If your opener lifts the door about 6 inches and then stops or reverses, the opener&rsquo;s safety system is detecting that the door is too heavy. This is often caused by a broken spring putting the full door weight on the opener motor, which triggers the force limit.</p>

    <h3>5. The Door Is Crooked</h3>
    <p>If the door rises unevenly &mdash; one side higher than the other &mdash; one of two springs may have broken while the other still works. This puts dangerous uneven stress on the door and should be addressed immediately.</p>

    <h3>6. Cables Are Loose or Dangling</h3>
    <p>When a torsion spring breaks, it can cause the lifting cables to lose tension and come off the drums. If you see loose or dangling cables, a spring failure is likely the root cause.</p>

    <h2>What to Do If Your Spring Is Broken</h2>

    <h3>Do NOT try to fix it yourself</h3>
    <p>This bears repeating: garage door spring replacement is genuinely dangerous. Torsion springs are under extreme tension &mdash; enough to cause serious injury or death. This is not a DIY project for any skill level. Every year, people are seriously hurt attempting this repair.</p>

    <h3>Do NOT use the opener</h3>
    <p>Running your opener with a broken spring forces the motor to lift the full weight of the door, which can burn out the motor or strip the gears. It can also cause the door to come off its tracks.</p>

    <h3>Do secure the door</h3>
    <p>If the door is closed, it&rsquo;s secure. If it&rsquo;s stuck open, use C-clamps or locking pliers on the track just above one of the rollers to prevent the door from falling.</p>

    <h3>Call a professional</h3>
    <p>A qualified technician can replace your spring safely, typically in under 90 minutes. <a href="../services/garage-door-repair/spring-replacement.html">Castle offers same-day spring replacement</a> with upfront pricing &mdash; no surprises.</p>

    <h2>How to Prevent Spring Breakage</h2>
    <ul>
      <li><strong>Annual maintenance</strong> &mdash; a professional tune-up catches wear before failure</li>
      <li><strong>Lubrication</strong> &mdash; spray springs with silicone-based lubricant 2-3 times per year</li>
      <li><strong>High-cycle springs</strong> &mdash; when replacing, consider upgrading to 25,000+ cycle springs for longer life</li>
      <li><strong>Balance checks</strong> &mdash; disconnect the opener and test the door balance annually; a balanced door extends spring life</li>
    </ul>`,
    faqs: [
      {q:'How much does it cost to replace a garage door spring?', a:'Spring replacement typically costs $200–$350 for a single spring or $300–$500 for a pair in the San Diego area. This includes professional installation. We recommend replacing both springs at the same time even if only one has broken, as the second is likely near end of life.'},
      {q:'Can I open my garage door with a broken spring?', a:'You should not use the automatic opener with a broken spring — it forces the motor to lift the full 150–250 lb door weight, which can burn out the motor. You can manually lift the door, but it will be extremely heavy and potentially dangerous. Call a professional for same-day repair.'},
      {q:'How long do garage door springs last?', a:'Standard torsion springs last approximately 10,000 cycles (roughly 7–10 years of typical residential use). High-cycle springs rated at 25,000+ cycles can last 15–20 years. Climate, maintenance, and door weight all affect lifespan.'}
    ]
  }),

  blogPost({
    file:'blog/new-garage-door-cost-san-diego.html',
    h1:'How Much Does a New Garage Door Cost in San Diego?',
    shortTitle:'Garage Door Costs',
    tag:'Installation', date:'March 2026', isoDate:'2026-03-01',
    description:'Realistic garage door costs for San Diego in 2026. Single door, double door, insulated, custom. What affects the price and how to budget.',
    content:`<p>If you&rsquo;re shopping for a new garage door in San Diego, you&rsquo;ll quickly discover that pricing varies enormously &mdash; from under $1,000 to well over $10,000. Here&rsquo;s a realistic breakdown to help you budget, based on what we see every day serving the San Diego and Riverside County markets.</p>

    <h2>Quick Cost Ranges (Installed)</h2>
    <table style="width:100%;border-collapse:collapse;margin:var(--space-4) 0;">
      <tr style="border-bottom:2px solid var(--color-border);"><th style="text-align:left;padding:12px 8px;">Door Type</th><th style="text-align:left;padding:12px 8px;">Single (8-9 ft)</th><th style="text-align:left;padding:12px 8px;">Double (16 ft)</th></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">Basic steel (non-insulated)</td><td style="padding:12px 8px;">$700 &ndash; $1,000</td><td style="padding:12px 8px;">$900 &ndash; $1,400</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">Steel insulated (R-12 to R-16)</td><td style="padding:12px 8px;">$1,000 &ndash; $1,800</td><td style="padding:12px 8px;">$1,400 &ndash; $2,500</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">Carriage house style</td><td style="padding:12px 8px;">$1,200 &ndash; $2,500</td><td style="padding:12px 8px;">$1,800 &ndash; $3,500</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">Wood (cedar, mahogany)</td><td style="padding:12px 8px;">$2,000 &ndash; $4,000</td><td style="padding:12px 8px;">$3,000 &ndash; $6,000+</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">Aluminum &amp; glass (modern)</td><td style="padding:12px 8px;">$2,500 &ndash; $5,000</td><td style="padding:12px 8px;">$3,500 &ndash; $7,000+</td></tr>
      <tr><td style="padding:12px 8px;">Custom / specialty</td><td style="padding:12px 8px;">$3,000+</td><td style="padding:12px 8px;">$5,000 &ndash; $12,000+</td></tr>
    </table>
    <p><em>These ranges include professional installation. Prices reflect San Diego market conditions as of early 2026.</em></p>

    <h2>What Affects the Price?</h2>

    <h3>Material</h3>
    <p>Steel is the most affordable and popular. Wood and aluminum/glass are premium options. Composite (faux wood) falls in the middle, offering the look of wood without the maintenance &mdash; particularly smart for coastal San Diego homes where real wood deteriorates faster.</p>

    <h3>Insulation</h3>
    <p>Non-insulated doors are the cheapest but offer no thermal or noise benefit. For San Diego&rsquo;s climate, an R-value of 8-12 is a good balance of cost and performance. If your garage is attached to your home (most are), insulation makes a noticeable difference in comfort and energy bills.</p>

    <h3>Size</h3>
    <p>Standard sizes (8x7, 9x7, 16x7) are the most affordable. Non-standard heights, extra-wide openings, or RV-height doors cost more because they require custom ordering.</p>

    <h3>Design and Windows</h3>
    <p>Basic raised-panel doors are the most affordable. Adding windows, decorative hardware, woodgrain finishes, or specialty panel designs increases the cost. That said, these upgrades often have the biggest impact on curb appeal.</p>

    <h3>Installation Complexity</h3>
    <p>A straightforward replacement (new door on existing tracks with existing opener) is the most affordable installation. If tracks need replacing, the opening needs modification, structural reinforcement is needed, or the opener should be upgraded simultaneously, costs increase accordingly.</p>

    <h2>The ROI Argument</h2>
    <p>A new garage door consistently ranks as one of the highest-ROI home improvements. The latest Remodeling Magazine Cost vs. Value report shows garage door replacement recovering approximately 90-100% of its cost at resale. In San Diego&rsquo;s competitive housing market, strong curb appeal directly impacts how quickly a home sells and at what price.</p>

    <h2>How to Get an Accurate Quote</h2>
    <p>Online estimates can only get you so far. For an accurate price, we recommend an in-home measurement and consultation. We&rsquo;ll assess your opening, discuss your style preferences and budget, and provide a written quote with no obligation. <a href="../contact.html">Schedule your free estimate</a> or call <a href="${T.PHONE_LINK}">${T.PHONE}</a>.</p>`,
    faqs: [
      {q:'What is the most popular garage door style in San Diego?', a:'Steel insulated doors in the carriage house style are the most popular choice in the San Diego market. They offer a classic look, excellent thermal performance, and low maintenance — typically in the $1,400–$2,500 range for a double-wide door, installed.'},
      {q:'Does a new garage door increase home value?', a:'Yes. Garage door replacement consistently ranks as one of the highest-ROI home improvements, recovering approximately 90–100% of cost at resale according to the Remodeling Magazine Cost vs. Value Report. In San Diego\'s competitive housing market, curb appeal directly impacts sale price.'},
      {q:'How long does garage door installation take?', a:'A straightforward replacement (new door on existing tracks) typically takes 3–5 hours. If tracks, springs, or the opener also need replacing, or if the opening requires modification, allow a full day.'}
    ]
  }),

  blogPost({
    file:'blog/garage-door-maintenance-schedule.html',
    h1:'How Often Should You Service Your Garage Door?',
    shortTitle:'Maintenance Schedule',
    tag:'Maintenance', date:'February 2026', isoDate:'2026-02-01',
    description:'A simple garage door maintenance schedule. What to do monthly, quarterly, and annually to keep your door safe and reliable for years.',
    content:`<p>Your garage door is the largest moving part of your home, and it goes through roughly 1,500 cycles per year. Like any mechanical system, regular maintenance keeps it running safely, quietly, and extends the life of every component. Here&rsquo;s a straightforward schedule.</p>

    <h2>Monthly (2 Minutes)</h2>
    <ul>
      <li><strong>Visual inspection</strong> &mdash; look at springs, cables, rollers, and tracks for obvious wear, rust, or damage</li>
      <li><strong>Listen</strong> &mdash; pay attention to any new sounds (grinding, squeaking, scraping) during operation</li>
      <li><strong>Test the safety reversal</strong> &mdash; place a 2x4 flat on the ground in the door&rsquo;s path; the door should reverse when it contacts the board</li>
    </ul>

    <h2>Every 3-4 Months (15 Minutes)</h2>
    <ul>
      <li><strong>Lubricate moving parts</strong> &mdash; use a silicone-based spray (not WD-40, which is a solvent, not a lubricant) on springs, hinges, rollers, and the lock mechanism</li>
      <li><strong>Clean the tracks</strong> &mdash; wipe the inside of the tracks with a damp cloth to remove dirt and debris. Do <em>not</em> lubricate the tracks (a common mistake &mdash; the rollers should roll, not slide)</li>
      <li><strong>Check weatherstripping</strong> &mdash; inspect the rubber seal at the bottom of the door and along the sides. Replace if cracked, brittle, or missing sections</li>
    </ul>

    <h2>Annually (Professional Service Recommended)</h2>
    <ul>
      <li><strong>Spring inspection</strong> &mdash; a professional checks spring tension, wear patterns, and remaining life</li>
      <li><strong>Balance test</strong> &mdash; disconnect the opener and manually lift the door halfway. It should stay in place. If it falls or rises, the springs need adjustment</li>
      <li><strong>Hardware tightening</strong> &mdash; vibration loosens bolts and brackets over time. A tech tightens all mounting hardware</li>
      <li><strong>Roller inspection</strong> &mdash; checking for wear, cracks, and smooth rotation</li>
      <li><strong>Cable inspection</strong> &mdash; checking for fraying, rust, and proper winding on drums</li>
      <li><strong>Opener adjustment</strong> &mdash; force limits, travel limits, and safety sensor alignment</li>
      <li><strong>Complete lubrication</strong> &mdash; professional-grade lubricant on all moving parts</li>
    </ul>

    <h2>For Coastal San Diego Homes</h2>
    <p>If you live within a few miles of the coast (La Jolla, Pacific Beach, Oceanside, Carlsbad, Encinitas), salt air accelerates corrosion. We recommend professional service every 6 months rather than annually, and using rust-resistant hardware upgrades when components need replacing.</p>

    <h2>What Does Professional Maintenance Cost?</h2>
    <p>A professional garage door tune-up typically runs $80-$150 and takes about 45 minutes. This is one of the best investments you can make in preventing costly emergency repairs. Most spring failures, cable breaks, and opener burnouts are preventable with regular maintenance.</p>`,
    faqs: [
      {q:'How often should a garage door be serviced?', a:'We recommend professional service annually for most homes, and every 6 months for coastal San Diego properties where salt air accelerates corrosion. In between, homeowners should do monthly visual checks and quarterly lubrication.'},
      {q:'Can I lubricate my garage door myself?', a:'Yes. Use a silicone-based spray (not WD-40) on springs, hinges, rollers, and the lock mechanism every 3–4 months. Do NOT lubricate the tracks — rollers should roll, not slide. Wipe tracks clean with a damp cloth instead.'},
      {q:'What is included in a garage door tune-up?', a:'A professional tune-up includes spring tension check, balance test, hardware tightening, roller inspection, cable inspection, opener force/travel adjustment, sensor alignment, and complete lubrication of all moving parts. Typically takes 45 minutes and costs $80–$150.'}
    ]
  }),

  blogPost({
    file:'blog/garage-door-wont-close.html',
    h1:'Garage Door Won&rsquo;t Close? Here&rsquo;s What to Check',
    shortTitle:'Door Won\'t Close',
    tag:'Troubleshooting', date:'February 2026', isoDate:'2026-02-01',
    description:'Garage door won\'t close? Step-by-step troubleshooting: safety sensors, limit settings, track obstructions, and when to call a pro.',
    content:`<p>You press the button, the door starts to close, then reverses right back up. Or maybe it won&rsquo;t move at all. A garage door that refuses to close is one of the most frustrating &mdash; and most common &mdash; issues homeowners face. The good news: many causes are simple to identify, and some you can fix yourself.</p>

    <h2>Step 1: Check the Safety Sensors</h2>
    <p>This is the cause about 70% of the time. The photo-eye sensors near the floor on each side of the door opening must have a clear line of sight to each other. Check for:</p>
    <ul>
      <li><strong>Obstructions</strong> &mdash; a broom, trash can, shoe, or anything blocking the sensor beam</li>
      <li><strong>Dirty lenses</strong> &mdash; wipe both sensor lenses with a soft, dry cloth</li>
      <li><strong>Misalignment</strong> &mdash; the sensors have small LED indicator lights. On most models, the sending eye shows green and the receiving eye shows amber. If the amber light is flickering or off, the sensors are misaligned. Gently adjust until both lights are steady</li>
      <li><strong>Sun interference</strong> &mdash; direct afternoon sun can overwhelm the sensor. This is common in west-facing San Diego garages. A simple shade or cardboard tube over the sensor can solve it</li>
      <li><strong>Damaged wires</strong> &mdash; check for pinched, cut, or rodent-chewed wires running from the sensors to the opener</li>
    </ul>

    <h2>Step 2: Look at the Opener Lights</h2>
    <p>Most openers flash their lights a specific number of times to indicate the problem:</p>
    <ul>
      <li><strong>1 flash</strong> &mdash; sensor wire disconnected or shorted</li>
      <li><strong>2 flashes</strong> &mdash; sensor wire short (reversed)</li>
      <li><strong>4 flashes</strong> &mdash; sensor slightly misaligned</li>
      <li><strong>6 flashes</strong> &mdash; sensor not connected</li>
      <li><strong>10 flashes</strong> &mdash; sensor wiring issue</li>
    </ul>
    <p>Check your opener&rsquo;s manual for the specific flash code chart for your model.</p>

    <h2>Step 3: Check the Track and Rollers</h2>
    <p>Look along both tracks for:</p>
    <ul>
      <li>Debris or objects in the track path</li>
      <li>A bent section of track where a roller could jam</li>
      <li>A roller that&rsquo;s come out of the track</li>
    </ul>

    <h2>Step 4: Check the Limit Settings</h2>
    <p>Your opener has &ldquo;close limit&rdquo; and &ldquo;force limit&rdquo; settings that control how far the door travels and how much resistance triggers a reversal. If these are set incorrectly, the door may reverse before reaching the floor, thinking it has hit an obstruction. Adjusting these requires knowing your specific opener model &mdash; check the manual or call a technician.</p>

    <h2>Step 5: Try the Wall Button</h2>
    <p>If the remote won&rsquo;t close the door but the wall button does, the issue is with the remote or its signal, not the door itself. Try replacing the remote battery. If that doesn&rsquo;t help, the remote may need reprogramming.</p>

    <h2>Step 6: Use the Lock-Out Override</h2>
    <p>On most openers, holding the wall button continuously will close the door while bypassing the safety sensors (the opener beeps and the lights flash). This is a temporary workaround to get the door closed, not a permanent solution. If you need to use this, the sensors need attention.</p>

    <h2>When to Call a Professional</h2>
    <p>If the steps above don&rsquo;t resolve the issue, or if you notice any of these conditions, it&rsquo;s time to call a tech:</p>
    <ul>
      <li>The door is making grinding, scraping, or popping noises</li>
      <li>The door is visibly off-track or crooked</li>
      <li>Cables are loose or dangling</li>
      <li>The opener motor runs but the door doesn&rsquo;t move</li>
      <li>You smell burning from the opener</li>
    </ul>
    <p><a href="../services/garage-door-repair/sensor-repair.html">Learn more about our sensor repair service</a> or <a href="../contact.html">schedule a service call</a>.</p>`,
    faqs: [
      {q:'Why does my garage door close partway then reverse?', a:'This is almost always a safety sensor issue. The photo-eye sensors near the floor are either misaligned, dirty, obstructed, or have damaged wiring. Check for obstructions first, clean both lenses, then check that both LED indicator lights are steady (not flickering).'},
      {q:'Can I bypass the safety sensors to close the door?', a:'You can temporarily close the door by holding the wall button continuously — the door will close while bypassing the sensors (with beeping and flashing lights). However, this is only a workaround, not a solution. Federal law (UL 325) requires working safety sensors on all residential garage door openers. Get the sensors fixed promptly.'},
      {q:'Why won\'t my garage door close in the afternoon?', a:'Direct afternoon sun can overwhelm the photo-eye sensor, especially on west-facing San Diego garages. A simple fix is to place a small shade or cardboard tube over the receiving sensor to block direct sunlight while still allowing the infrared beam to reach it.'}
    ]
  }),

  blogPost({
    file:'blog/garage-door-materials-comparison.html',
    h1:'Choosing the Right Garage Door Material',
    shortTitle:'Materials Comparison',
    tag:'Installation', date:'January 2026', isoDate:'2026-01-15',
    description:'Steel vs wood vs aluminum vs composite garage doors. Pros, cons, costs, and which is best for San Diego\'s climate.',
    content:`<p>The material you choose for your garage door affects its appearance, durability, maintenance needs, insulation value, and cost. Here&rsquo;s an honest comparison of the four main options, with specific notes for San Diego and Riverside County homeowners.</p>

    <h2>Steel</h2>
    <p><strong>Best for:</strong> Most homeowners seeking durability and value</p>
    <p>Steel is the most popular garage door material in America, and for good reason. Modern steel doors come in hundreds of styles and colors, including convincing woodgrain finishes. Available in single-layer (non-insulated), double-layer (with polystyrene insulation), and triple-layer (with polyurethane insulation) construction.</p>
    <h3>Pros</h3>
    <ul><li>Widest selection of styles and colors</li><li>Excellent durability and dent resistance (especially 2-inch thick models)</li><li>Low maintenance &mdash; occasional washing is all that&rsquo;s needed</li><li>Best insulation options (up to R-18+)</li><li>Most affordable option for quality doors</li></ul>
    <h3>Cons</h3>
    <ul><li>Can rust if the finish is damaged, especially in coastal areas</li><li>Dents from impact (though premium-gauge steel is highly resistant)</li><li>Doesn&rsquo;t have the authentic look/feel of real wood</li></ul>
    <p><strong>San Diego note:</strong> Steel performs well throughout the region. For homes within 2-3 miles of the coast, choose a door with a baked-on polyester finish and inspect the finish annually for chips or scratches that could allow rust.</p>

    <h2>Wood</h2>
    <p><strong>Best for:</strong> Custom homes, historical properties, and homeowners who value natural beauty</p>
    <p>Nothing matches the warmth and character of a real wood garage door. Cedar, redwood, and mahogany are the most popular species. Wood doors can be stained to show natural grain or painted to match any color scheme.</p>
    <h3>Pros</h3>
    <ul><li>Unmatched natural beauty and warmth</li><li>Can be customized to any design</li><li>Natural insulation properties</li><li>Can be refinished to look new</li></ul>
    <h3>Cons</h3>
    <ul><li>Highest maintenance &mdash; needs staining or painting every 2-3 years</li><li>Susceptible to moisture, warping, and rot</li><li>Heavier than other materials (may need stronger springs and opener)</li><li>Most expensive standard material</li></ul>
    <p><strong>San Diego note:</strong> Wood performs best in dry inland areas (Escondido, Temecula, Corona). Coastal exposure significantly shortens lifespan unless meticulously maintained. Consider composite as an alternative for coastal homes.</p>

    <h2>Aluminum &amp; Glass</h2>
    <p><strong>Best for:</strong> Modern and contemporary homes</p>
    <p>Aluminum-framed doors with glass panels create a dramatic, architecturally striking look. The Clopay AVANTE series is the market leader, offering anodized aluminum frames in multiple colors with frosted, tinted, clear, or mirrored glass options.</p>
    <h3>Pros</h3>
    <ul><li>Stunning modern aesthetic</li><li>Lightweight &mdash; easy on springs and openers</li><li>Rust-proof &mdash; ideal for coastal environments</li><li>Floods the garage with natural light</li><li>Enormous customization options</li></ul>
    <h3>Cons</h3>
    <ul><li>Limited insulation value (though insulated glass options help)</li><li>Glass panels can break from impact</li><li>Higher cost than steel</li><li>Not suited to traditional architectural styles</li></ul>
    <p><strong>San Diego note:</strong> Excellent for coastal homes thanks to corrosion resistance. Very popular in La Jolla, Carlsbad, and Encinitas contemporary homes. Consider frosted or tinted glass for west-facing garages to manage afternoon sun and heat.</p>

    <h2>Composite (Faux Wood)</h2>
    <p><strong>Best for:</strong> Homeowners who want the wood look without the maintenance</p>
    <p>Composite doors use wood-composite materials over a steel frame to achieve a realistic wood appearance. They resist moisture, won&rsquo;t warp, crack, or rot, and hold paint or stain far better than natural wood.</p>
    <h3>Pros</h3>
    <ul><li>Realistic wood appearance without the maintenance</li><li>Moisture resistant &mdash; won&rsquo;t warp or rot</li><li>Better insulation than wood</li><li>Lighter than solid wood</li></ul>
    <h3>Cons</h3>
    <ul><li>More expensive than steel</li><li>Not as authentic-looking as real wood up close</li><li>Limited compared to the customization possible with real wood</li></ul>
    <p><strong>San Diego note:</strong> The sweet spot for coastal homes that want a traditional look. Resists the moisture and salt air that challenge real wood, without the corrosion risk of steel. Increasingly popular throughout North County.</p>

    <h2>Making Your Decision</h2>
    <p>The right material depends on your home&rsquo;s style, your proximity to the coast, your maintenance tolerance, and your budget. We&rsquo;re happy to bring material samples to your home so you can see and feel the options in person. <a href="../contact.html">Schedule a free consultation</a>.</p>`,
    faqs: [
      {q:'What is the best garage door material for San Diego?', a:'For most San Diego homes, steel insulated doors offer the best balance of durability, style options, insulation, and value. For coastal homes within 2–3 miles of the ocean, aluminum/glass or composite (faux wood) doors are excellent choices because they resist salt air corrosion.'},
      {q:'Are insulated garage doors worth it in San Diego?', a:'Yes, especially if your garage is attached to your home (most are). An insulated door (R-12 or higher) reduces heat transfer, dampens street noise, and makes the garage more comfortable year-round. The cost difference over a non-insulated door is typically $200–$400 — a worthwhile investment.'},
      {q:'How long does a garage door last?', a:'A quality steel garage door lasts 20–30 years with minimal maintenance. Wood doors last 15–20 years with regular refinishing. Aluminum and composite doors last 20–25+ years. Spring life (7–15 years) and opener life (10–15 years) are typically shorter than the door itself.'}
    ]
  }),

  blogPost({
    file:'blog/electric-gate-pros-cons.html',
    h1:'Electric Gate vs Manual Gate: Pros and Cons',
    shortTitle:'Electric vs Manual Gate',
    tag:'Gates', date:'January 2026', isoDate:'2026-01-10',
    description:'Comparing electric and manual gates: convenience, cost, security, and maintenance. Which is right for your San Diego property?',
    content:`<p>Adding a gate to your property is a significant investment in security, privacy, and curb appeal. One of the first decisions you&rsquo;ll face is whether to go with a manual gate or invest in an electric (automatic) system. Here&rsquo;s an honest comparison to help you decide.</p>

    <h2>Manual Gates</h2>
    <p>A manual gate is a traditional gate that you physically open and close by hand. It&rsquo;s the simpler, more affordable option &mdash; but it comes with daily inconvenience.</p>
    <h3>Pros</h3>
    <ul>
      <li><strong>Lower initial cost</strong> &mdash; no motor, sensors, or electrical work needed. Typically $1,500-$4,000 less than an equivalent automatic setup</li>
      <li><strong>Simpler maintenance</strong> &mdash; fewer mechanical and electrical components to maintain</li>
      <li><strong>No power dependency</strong> &mdash; works regardless of power outages</li>
      <li><strong>Lower repair costs</strong> &mdash; when something goes wrong, it&rsquo;s usually a hinge, latch, or structural issue that&rsquo;s straightforward to fix</li>
    </ul>
    <h3>Cons</h3>
    <ul>
      <li><strong>Daily inconvenience</strong> &mdash; you (or a passenger) must get out of the car every time you enter or leave. In San Diego&rsquo;s rainy winter weeks, this gets old fast</li>
      <li><strong>Less security</strong> &mdash; no access control, anyone can open it. You&rsquo;re relying on a lock that can be picked or bolt-cut</li>
      <li><strong>No monitoring</strong> &mdash; no way to know when the gate was opened or by whom</li>
      <li><strong>Physical effort</strong> &mdash; large or heavy gates can be difficult to swing open, especially for elderly residents or those with mobility issues</li>
      <li><strong>Lower property value impact</strong> &mdash; adds less perceived value than an automated system</li>
    </ul>

    <h2>Electric (Automatic) Gates</h2>
    <p>An electric gate uses a motor (operator) to open and close the gate, controlled by remotes, keypads, smartphones, or intercoms.</p>
    <h3>Pros</h3>
    <ul>
      <li><strong>Convenience</strong> &mdash; open from your car, your phone, or remotely for visitors. You never leave your vehicle</li>
      <li><strong>Enhanced security</strong> &mdash; controlled access with keypads, intercoms, or video systems. Know who enters and when</li>
      <li><strong>Property value</strong> &mdash; an automated gate is a premium feature that increases perceived and actual home value</li>
      <li><strong>Smart home integration</strong> &mdash; modern systems connect to your phone, security cameras, and home automation</li>
      <li><strong>Deterrence</strong> &mdash; an automated gate signals a secured property, deterring opportunistic trespassers</li>
      <li><strong>Guest management</strong> &mdash; grant temporary access to visitors, delivery drivers, or service people from anywhere</li>
    </ul>
    <h3>Cons</h3>
    <ul>
      <li><strong>Higher initial cost</strong> &mdash; the gate operator, sensors, access control, and electrical work add $1,500-$5,000+ to the project</li>
      <li><strong>Maintenance requirements</strong> &mdash; motors, circuit boards, sensors, and batteries need periodic service</li>
      <li><strong>Power dependency</strong> &mdash; requires electrical power (though battery backup and solar options are available)</li>
      <li><strong>More complex repairs</strong> &mdash; electrical and mechanical issues require professional diagnosis</li>
    </ul>

    <h2>The Middle Ground: Add Automation Later</h2>
    <p>If budget is tight now, here&rsquo;s a smart approach: install a quality manual gate now, and have it built with automation in mind. This means proper post sizing, correct clearances, and a conduit run for future wiring. When you&rsquo;re ready, we can add an operator without replacing the gate.</p>

    <h2>Our Recommendation</h2>
    <p>For most homeowners, the convenience and security benefits of an electric gate justify the additional cost. You&rsquo;ll use your gate multiple times daily for years &mdash; the daily convenience adds up significantly. That said, a quality manual gate is still a valuable addition if budget is the primary concern.</p>
    <p><a href="../services/gate-services/index.html">Explore our full range of gate services</a> or <a href="../contact.html">get a free estimate</a> for your property.</p>`,
    faqs: [
      {q:'How much does an electric gate cost in San Diego?', a:'An electric driveway gate typically costs $3,000–$8,000 installed in the San Diego area, depending on material (wrought iron, aluminum, wood), size, and access control features. The gate operator (motor) alone adds $1,500–$3,000 to the cost of a manual gate installation.'},
      {q:'Do electric gates work during power outages?', a:'Most modern gate operators include battery backup that provides 20–50 cycles during an outage. Additionally, all electric gates have a manual release mechanism that allows you to open the gate by hand. Solar-powered backup is also available for extended outage protection.'},
      {q:'What maintenance does an electric gate need?', a:'Electric gates need professional service annually: lubrication of hinges and rollers, motor inspection, sensor alignment check, battery test, and safety reversal testing. Between services, keep the track clear of debris and listen for unusual sounds during operation.'}
    ]
  }),

  // === KNOWLEDGE HUB ARTICLES (ported from live site per PRD §4.1) ===

  blogPost({
    file:'blog/loud-garage-door-noises.html',
    h1:'Why Is My Garage Door So Loud? Troubleshooting Noisy Doors',
    shortTitle:'Loud Door Noises',
    tag:'Troubleshooting', date:'April 2026', isoDate:'2026-04-01',
    description:'Grinding, squeaking, rattling, or banging garage door? Identify the cause of loud garage door noises and learn when to DIY vs. call a professional.',
    content:`<p>A loud garage door is more than an annoyance — it&rsquo;s often a warning sign that something needs attention. Different sounds point to different problems. Here&rsquo;s how to identify what your door is telling you and what to do about it.</p>

    <h2>Grinding or Scraping</h2>
    <p>A grinding sound usually means metal-on-metal contact where there shouldn&rsquo;t be any. The most common causes:</p>
    <ul>
      <li><strong>Worn rollers</strong> — metal rollers with worn bearings grind against the track. Nylon rollers are quieter and last longer than metal.</li>
      <li><strong>Dry track or hardware</strong> — lack of lubrication causes friction. Silicone spray on hinges and rollers often solves this immediately.</li>
      <li><strong>Bent track</strong> — if the track is bent or misaligned, rollers scrape against the track wall. This needs professional repair.</li>
    </ul>

    <h2>Squeaking or Squealing</h2>
    <p>High-pitched squeaking is almost always a lubrication issue. The hinges, rollers, or springs are dry. Apply a silicone-based spray lubricant (not WD-40) to all pivot points, roller shafts, and spring coils. If squeaking persists after lubrication, a component may be wearing out.</p>

    <h2>Rattling or Vibrating</h2>
    <p>Rattling usually means loose hardware. Over time, the vibration of daily operation loosens nuts, bolts, and brackets throughout the system. Tighten:</p>
    <ul>
      <li>Track mounting brackets</li>
      <li>Hinge bolts</li>
      <li>Opener mounting hardware</li>
      <li>Chain or belt tension (if chain drive opener — a loose chain slaps and rattles)</li>
    </ul>

    <h2>Banging or Popping</h2>
    <p>A sudden loud bang (like a gunshot) is almost certainly a <a href="signs-garage-door-spring-broken.html">broken torsion spring</a>. Do not attempt to operate the door — call a professional immediately.</p>
    <p>Repeated popping or snapping during operation may indicate a spring that&rsquo;s under incorrect tension or a cable that&rsquo;s not seated properly on its drum.</p>

    <h2>Rumbling from the Opener</h2>
    <p>If the noise comes from the opener unit itself:</p>
    <ul>
      <li><strong>Chain drive openers</strong> are inherently louder than belt drive models. If noise is the issue, upgrading to a belt drive (like the LiftMaster 8550) dramatically reduces sound.</li>
      <li><strong>Worn gears</strong> inside the opener create a grinding or straining sound. This is a repair, not a maintenance item.</li>
      <li><strong>Vibration transfer</strong> — if the opener is hard-mounted to the ceiling, vibration travels through the structure. Vibration isolation pads or a rubber mounting kit can help.</li>
    </ul>

    <h2>When to Call a Professional</h2>
    <p>DIY fixes (lubrication, tightening hardware) handle about 40% of noise issues. Call a technician if:</p>
    <ul>
      <li>The noise doesn&rsquo;t improve after lubrication</li>
      <li>You notice a sudden change in sound (indicating a new problem)</li>
      <li>The door operates unevenly, jerks, or hesitates</li>
      <li>You suspect the issue is with springs, cables, or the opener motor</li>
    </ul>
    <p>Castle technicians average 15+ years of experience diagnosing garage door issues. A noise diagnosis and tune-up typically takes under an hour. <a href="../contact.html">Schedule service</a> or call <a href="${T.PHONE_LINK}">${T.PHONE}</a>.</p>`,
    faqs: [
      {q:'Why is my garage door making a grinding noise?', a:'Grinding usually means worn rollers or a dry track. Metal rollers with deteriorated bearings grind against the track surface. The fix is either lubrication (if the rollers are still serviceable) or roller replacement with quieter nylon rollers. If the track itself is bent, professional repair or replacement is needed.'},
      {q:'How do I make my garage door quieter?', a:'The three most effective steps: (1) Replace metal rollers with nylon rollers ($100–$200 for a full set, installed). (2) Lubricate all moving parts with silicone spray every 3–4 months. (3) If you have a chain drive opener, upgrade to a belt drive like the LiftMaster 8550 for near-silent operation.'},
      {q:'Is a loud garage door dangerous?', a:'Not always, but sudden changes in sound are a warning sign. A new grinding noise may indicate a failing roller that could eventually come off the track. A loud bang is almost certainly a broken spring. Any sudden change warrants inspection before it becomes a safety issue or more expensive repair.'}
    ]
  }),

  blogPost({
    file:'blog/garage-door-wont-open.html',
    h1:'Garage Door Won&rsquo;t Open? Step-by-Step Troubleshooting',
    shortTitle:'Door Won\'t Open',
    tag:'Troubleshooting', date:'April 2026', isoDate:'2026-04-01',
    description:'Garage door won\'t open? Common causes and fixes: broken spring, dead opener, power outage, locked door, track obstruction. When to DIY vs. call a pro.',
    content:`<p>You press the button and nothing happens — or the opener runs but the door doesn&rsquo;t move. A garage door that won&rsquo;t open can strand your car and disrupt your entire morning. Here&rsquo;s a systematic approach to finding the cause.</p>

    <h2>Step 1: Check the Obvious</h2>
    <ul>
      <li><strong>Power</strong> — is the opener plugged in? Check for a tripped breaker or GFCI outlet. Some openers have a small LED that indicates power.</li>
      <li><strong>Lock mode</strong> — many openers have a lock button on the wall control. When activated, the remote won&rsquo;t work but the wall button will. Look for a lit lock indicator.</li>
      <li><strong>Remote battery</strong> — if the wall button works but the remote doesn&rsquo;t, replace the remote battery first.</li>
      <li><strong>Manual lock</strong> — older doors have a manual lock handle on the inside. Check that it&rsquo;s not engaged.</li>
    </ul>

    <h2>Step 2: Listen to the Opener</h2>
    <p>Press the button and listen carefully:</p>
    <ul>
      <li><strong>Nothing at all</strong> — power issue, dead motor, or disconnected wall button wiring</li>
      <li><strong>Clicks but no motor</strong> — the logic board sends the signal but the motor won&rsquo;t start. Could be a capacitor or motor failure.</li>
      <li><strong>Motor runs but door doesn&rsquo;t move</strong> — the drive gear inside the opener has likely stripped. The motor spins but nothing transfers to the chain/belt. This is a common repair on aging openers.</li>
      <li><strong>Motor runs, door starts then stops</strong> — the force limit is being triggered. The door is either too heavy (broken spring) or there&rsquo;s an obstruction.</li>
    </ul>

    <h2>Step 3: Try the Emergency Release</h2>
    <p>Pull the red emergency release cord hanging from the opener rail. This disconnects the door from the opener, allowing manual operation. Try lifting the door by hand:</p>
    <ul>
      <li><strong>Door lifts easily</strong> — the problem is the opener, not the door. Springs are fine.</li>
      <li><strong>Door is extremely heavy</strong> — you likely have a <a href="signs-garage-door-spring-broken.html">broken spring</a>. The opener cannot lift the full weight of the door alone. Do NOT force it. Call a professional.</li>
      <li><strong>Door won&rsquo;t budge</strong> — something is physically preventing movement. Check for a locked manual lock, debris in the track, or a roller that&rsquo;s come off the track.</li>
    </ul>

    <h2>Step 4: Check the Springs</h2>
    <p>Look at the torsion spring(s) on the metal bar above the door opening. A broken spring will have a visible gap of 2–4 inches where the coils separated. If a spring is broken:</p>
    <ul>
      <li>Do NOT use the opener</li>
      <li>Do NOT attempt to repair it yourself</li>
      <li>The door is safe in the closed position — leave it there</li>
      <li>Call for professional spring replacement (typically same-day service)</li>
    </ul>

    <h2>Step 5: Inspect the Track</h2>
    <p>Look along both vertical tracks and the curved sections for:</p>
    <ul>
      <li>A roller that&rsquo;s popped out of the track</li>
      <li>A bent or dented section of track</li>
      <li>Ice buildup at the bottom (rare in San Diego but possible in winter mornings in Temecula/Corona)</li>
      <li>Debris or an object wedged in the track</li>
    </ul>

    <h2>When to Call a Professional</h2>
    <p>Call for service if:</p>
    <ul>
      <li>A spring is visibly broken</li>
      <li>The opener motor runs but the door doesn&rsquo;t move (stripped gear)</li>
      <li>The door is off its tracks</li>
      <li>You cannot identify the cause after these steps</li>
      <li>Any cable is loose, frayed, or dangling</li>
    </ul>
    <p>Castle offers <a href="../services/garage-door-repair/emergency-repair.html">same-day and emergency repair service</a> throughout San Diego and Riverside County.</p>`,
    faqs: [
      {q:'Why does my garage door opener click but not open?', a:'A clicking sound without motor activation usually indicates a failed start capacitor or motor issue. On some models, it can also mean the logic board is sending the signal but the motor has reached end of life. This repair typically costs $150–$300 depending on the part needed.'},
      {q:'What do I do if my garage door is stuck closed?', a:'First, pull the emergency release cord (red handle) to disconnect from the opener. Try lifting manually. If the door is too heavy to lift by hand, a spring has likely broken — do not force it. Leave the door closed (it\'s secure) and call for professional repair. If it lifts easily, the problem is the opener.'},
      {q:'Can a power outage lock my garage door shut?', a:'No. During a power outage, pull the emergency release cord to disconnect the door from the opener. You can then lift the door manually. All residential garage doors are required to have this manual override. Some newer openers also have battery backup that provides 20–50 cycles during outages.'}
    ]
  }),

  blogPost({
    file:'blog/springs-most-dangerous-part.html',
    h1:'Garage Door Springs: The Most Dangerous Part of the Industry',
    shortTitle:'Spring Safety',
    tag:'Safety', date:'March 2026', isoDate:'2026-03-15',
    description:'Why garage door springs are the most dangerous component to work with. How torsion springs store energy, injury risks, and why DIY replacement is never recommended.',
    content:`<p>Every year, thousands of people are injured — and some killed — attempting to repair or replace garage door springs themselves. Springs are under extreme tension, storing enough energy to cause catastrophic injury in a fraction of a second. This article explains why springs are genuinely dangerous and why professional replacement is the only safe option.</p>

    <h2>How Torsion Springs Store Energy</h2>
    <p>A standard residential torsion spring is wound with approximately 30–40 turns of tension. This stored energy is what counterbalances the 150–300 pounds of your garage door, making it feel light when you lift it. When that energy is released uncontrolled — through a break, a slipped winding bar, or an incorrect repair attempt — it releases all at once.</p>
    <p>To put this in perspective: a torsion spring on a standard two-car garage door stores roughly the same energy as being hit by a car at 15 mph. Concentrated on a small area (a winding bar, a cone, a cable), the force is devastating.</p>

    <h2>Common Injury Scenarios</h2>
    <ul>
      <li><strong>Winding bar slips</strong> — the most common serious injury. The winding bar (a steel rod inserted into the spring cone) slips out under tension, and the cone spins violently. Broken hands, facial injuries, and eye injuries are typical.</li>
      <li><strong>Wrong tools</strong> — using a screwdriver, socket extension, or other improvised tool instead of proper winding bars. These are not designed to handle the torque and slip easily.</li>
      <li><strong>Spring breaks during adjustment</strong> — an old or fatigued spring can break while being wound, sending metal fragments at high velocity.</li>
      <li><strong>Cable under tension snaps</strong> — lift cables are part of the spring system. A cable under tension that snaps can cause severe lacerations.</li>
      <li><strong>Door falls</strong> — if the spring system is improperly reassembled, the door can crash down without warning. A 16-foot steel door weighs 200+ pounds.</li>
    </ul>

    <h2>Why YouTube Videos Are Dangerous</h2>
    <p>The internet is full of &ldquo;how to replace your garage door spring&rdquo; tutorials. These videos create a false sense of confidence by showing the process in controlled conditions with proper tools and experience. What they don&rsquo;t convey:</p>
    <ul>
      <li>The physical force required to control winding bars under full tension</li>
      <li>The precision needed to count turns correctly (too many = door flies up; too few = door drops)</li>
      <li>The feel of a spring that&rsquo;s nearing failure during winding</li>
      <li>What to do when something goes wrong mid-repair</li>
    </ul>
    <p>Professional technicians undergo hundreds of hours of training and handle springs daily. They develop an instinctive understanding of tension, wear patterns, and warning signs that cannot be learned from a video.</p>

    <h2>What Professional Service Includes</h2>
    <p>When Castle replaces your springs, you&rsquo;re paying for:</p>
    <ul>
      <li>Correct spring sizing (calculated by door weight, height, and track radius)</li>
      <li>Proper winding (precise turn count for correct balance)</li>
      <li>Safety inspection of cables, drums, and hardware</li>
      <li>Balance testing after installation</li>
      <li>Disposal of the old springs</li>
      <li>Warranty on parts and labor</li>
    </ul>
    <p>The total cost ($200–$500 depending on the spring type) is a fraction of what an emergency room visit costs — and incomparably less than the permanent injuries that spring accidents cause.</p>

    <h2>Our Safety Protocol</h2>
    <p>Castle technicians follow a strict spring-handling protocol: proper PPE (safety glasses, gloves), calibrated winding bars, calculated turn counts, and a two-check system where balance is verified before the door is cleared for use. We conduct weekly OSHA safety meetings, and spring safety is reviewed every month.</p>`,
    faqs: [
      {q:'Can I replace a garage door spring myself?', a:'We strongly advise against it. Torsion springs store enough energy to cause severe injury or death if mishandled. Professional replacement typically costs $200–$500 — far less than the risk of serious injury. Every year, DIY spring repairs result in thousands of emergency room visits nationally.'},
      {q:'How do I know if my garage door springs are wearing out?', a:'Warning signs include: the door feels heavier than usual, the door doesn\'t stay in place when opened halfway (it drifts up or down), you notice the door opening unevenly, or you see visible rust, stretch marks, or gaps developing in the spring coils. Schedule a professional inspection if you notice any of these.'},
      {q:'Are extension springs safer than torsion springs?', a:'Neither is inherently safer when under tension. Extension springs (mounted along the horizontal tracks) do have a higher failure risk because they stretch rather than wind — when they break, pieces can fly. Safety cables threaded through extension springs contain this risk. Most modern installations use torsion springs with safety containment.'}
    ]
  }),

  blogPost({
    file:'blog/when-garage-door-unsafe-to-repair.html',
    h1:'When a Garage Door Becomes Unsafe to Repair: Replacement Thresholds',
    shortTitle:'Replacement Thresholds',
    tag:'Safety', date:'March 2026', isoDate:'2026-03-10',
    description:'When to replace a garage door vs. repair it. Safety thresholds, structural failure signs, age limits, and the repair-vs-replace decision framework.',
    content:`<p>Not every garage door can — or should — be repaired. At some point, continued repair becomes more expensive than replacement, or worse, the door becomes a genuine safety hazard. Here&rsquo;s how to know when that threshold has been crossed.</p>

    <h2>Safety Thresholds (Replace Immediately)</h2>
    <p>These conditions mean the door is unsafe to operate, regardless of repair cost:</p>
    <ul>
      <li><strong>Structural panel failure</strong> — a panel that&rsquo;s cracked through (not just dented) can separate from the door under tension. A panel flying off a moving door is a serious impact hazard.</li>
      <li><strong>Severe rust-through</strong> — surface rust is cosmetic, but rust that has eaten through the steel compromises the panel&rsquo;s structural integrity. The panel can fold or tear under spring tension.</li>
      <li><strong>Repeated cable drum failure</strong> — if drums repeatedly fail or strip, the spring system may be imposing loads the door hardware wasn&rsquo;t designed for. This suggests a fundamental mismatch that repair won&rsquo;t solve.</li>
      <li><strong>Track failure</strong> — tracks that are bent, twisted, or pulling away from the wall brackets create a derailment risk. A door that comes off its tracks while moving is uncontrolled and extremely dangerous.</li>
      <li><strong>Non-standard modification</strong> — doors that have been previously &ldquo;repaired&rdquo; with incorrect parts, welded hinges, shimmed tracks, or incompatible springs. These Franken-doors are ticking time bombs.</li>
    </ul>

    <h2>Economic Thresholds (Repair vs. Replace Calculation)</h2>
    <p>Beyond safety, there&rsquo;s a financial inflection point:</p>
    <ul>
      <li><strong>50% rule</strong> — if the repair cost exceeds 50% of a new door, replacement usually makes more economic sense. A new door comes with full warranties, modern safety features, and better insulation.</li>
      <li><strong>Recurring repair</strong> — if you&rsquo;ve made 3+ service calls in 12 months, the door is telling you it&rsquo;s approaching end of life. Each individual repair may be affordable, but the total exceeds replacement cost.</li>
      <li><strong>Parts unavailability</strong> — older doors (20+ years) often have discontinued panels, springs, or hardware. Fabricating or adapting parts is expensive and compromises reliability.</li>
    </ul>

    <h2>Age-Based Guidelines</h2>
    <table style="width:100%;border-collapse:collapse;margin:var(--space-4) 0;">
      <tr style="border-bottom:2px solid var(--color-border);"><th style="text-align:left;padding:12px 8px;">Door Age</th><th style="text-align:left;padding:12px 8px;">Typical Condition</th><th style="text-align:left;padding:12px 8px;">Recommendation</th></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">0–10 years</td><td style="padding:12px 8px;">Good; normal wear</td><td style="padding:12px 8px;">Repair makes sense</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">10–20 years</td><td style="padding:12px 8px;">Moderate wear; springs near EOL</td><td style="padding:12px 8px;">Repair if door is sound; consider replacement if multiple issues</td></tr>
      <tr style="border-bottom:1px solid var(--color-border-light);"><td style="padding:12px 8px;">20–30 years</td><td style="padding:12px 8px;">Significant wear; outdated safety features</td><td style="padding:12px 8px;">Lean toward replacement</td></tr>
      <tr><td style="padding:12px 8px;">30+ years</td><td style="padding:12px 8px;">End of design life</td><td style="padding:12px 8px;">Replace — modern doors are safer, quieter, and better insulated</td></tr>
    </table>

    <h2>Safety Feature Gaps</h2>
    <p>Doors manufactured before 1993 may lack federally-mandated safety features:</p>
    <ul>
      <li><strong>Photo-eye sensors</strong> (required since 1993) — prevent the door from closing on people, pets, or objects</li>
      <li><strong>Auto-reverse mechanism</strong> — reverses the door if it contacts an obstruction</li>
      <li><strong>Tamper-resistant brackets</strong> (required since 1993) — prevent bottom brackets from being loosened, which releases cable tension</li>
    </ul>
    <p>If your door predates these requirements, replacement brings it up to current safety standards.</p>

    <h2>Our Honest Assessment</h2>
    <p>Castle technicians are trained to give you an honest recommendation. We don&rsquo;t push replacements when a repair will serve you well, and we won&rsquo;t band-aid a door that&rsquo;s genuinely unsafe. If a technician recommends replacement, they&rsquo;ll explain exactly why and show you the condition that warrants it.</p>
    <p><a href="../services/garage-door-installation/index.html">Explore replacement options</a> or <a href="../contact.html">schedule an inspection</a> if you&rsquo;re unsure about your door&rsquo;s condition.</p>`,
    faqs: [
      {q:'How do I know if my garage door needs to be replaced?', a:'Key indicators: the door is 20+ years old with multiple recurring issues, repair costs exceed 50% of a new door, panels are cracked through (not just dented), severe rust has eaten through the steel, or the door lacks modern safety features (photo-eye sensors, auto-reverse). A professional inspection can give you a definitive answer.'},
      {q:'How long should a garage door last?', a:'A quality steel garage door typically lasts 20–30 years. Wood doors last 15–20 years with regular maintenance. Springs last 7–15 years, and openers last 10–15 years. If your door is approaching 25+ years, proactive replacement avoids emergency failures and gives you modern safety features.'},
      {q:'Is it worth repairing a 25-year-old garage door?', a:'Usually not, unless it\'s a minor issue (lubrication, sensor adjustment). At 25 years, the door likely lacks modern safety features, has worn-out insulation, and is approaching the point where multiple components will fail in sequence. A new door offers better insulation, quieter operation, improved safety, and increases home value.'}
    ]
  }),

  blogPost({
    file:'blog/warranty-compliance-policy.html',
    h1:'Warranty &amp; Compliance: What Castle Covers and Why It Matters',
    shortTitle:'Warranty & Compliance',
    tag:'Policy', date:'February 2026', isoDate:'2026-02-15',
    description:'Castle Garage Doors warranty coverage, CSLB compliance, safety standards, and what\'s included with every service. Understand your protection.',
    content:`<p>When you hire a garage door company, you&rsquo;re trusting them with one of the heaviest, highest-tension mechanical systems in your home. Warranty and compliance aren&rsquo;t just paperwork — they&rsquo;re your assurance that the work is done right, done safely, and backed by accountability.</p>

    <h2>Castle&rsquo;s Warranty Coverage</h2>
    <h3>Parts Warranty</h3>
    <p>All parts installed by Castle carry the manufacturer&rsquo;s full warranty, passed through to you:</p>
    <ul>
      <li><strong>Clopay garage doors</strong> — lifetime limited warranty on sections; 3-year finish warranty; additional coverage varies by model line</li>
      <li><strong>LiftMaster openers</strong> — lifetime motor and belt warranty on select models; varies by series</li>
      <li><strong>Springs</strong> — warranty period varies by cycle rating (standard 10,000-cycle: 1 year; high-cycle 25,000+: up to 3 years)</li>
      <li><strong>Gate operators</strong> — 2–5 year warranty depending on brand and model</li>
    </ul>

    <h3>Labor Warranty</h3>
    <p>Castle provides a labor warranty on all installation and repair work. If the same issue recurs within the warranty period due to workmanship, we return and correct it at no charge. Specific terms are documented on your service invoice.</p>

    <h2>CSLB Compliance</h2>
    <p>Castle Garage Doors &amp; Gates holds California State License Board (CSLB) License <strong>#1154002</strong>, classification <strong>C-61/D-28</strong> (Door Systems). This means:</p>
    <ul>
      <li>The company has passed state examination requirements for garage door and gate work</li>
      <li>A surety bond is on file with the state, protecting consumers against defective work</li>
      <li>Workers&rsquo; compensation insurance is current and verified by the CSLB</li>
      <li>The license is subject to ongoing state oversight and complaint investigation</li>
    </ul>
    <p>You can verify our license status anytime at <a href="https://www.cslb.ca.gov" target="_blank" rel="noopener">cslb.ca.gov</a>.</p>

    <h2>Why This Matters to You</h2>
    <p>Unlicensed garage door work in California is a misdemeanor, but more importantly, it exposes you to:</p>
    <ul>
      <li><strong>No recourse</strong> — if something goes wrong, you have no license bond to claim against</li>
      <li><strong>Insurance voids</strong> — work performed by unlicensed contractors may not be covered by your homeowner&rsquo;s insurance</li>
      <li><strong>Safety risk</strong> — unlicensed operators haven&rsquo;t demonstrated competency to the state</li>
      <li><strong>Permit issues</strong> — if you sell your home, unpermitted/unlicensed work creates disclosure complications</li>
    </ul>

    <h2>Safety Standards We Follow</h2>
    <ul>
      <li><strong>UL 325</strong> — the federal standard for garage door opener safety (entrapment protection, auto-reverse, etc.)</li>
      <li><strong>ASTM F2200</strong> — safety standard for automated vehicular gates</li>
      <li><strong>OSHA</strong> — weekly safety meetings for all technicians; proper PPE, ladder safety, and spring-handling protocols</li>
      <li><strong>California Building Code</strong> — all installations meet or exceed current code requirements</li>
    </ul>

    <h2>What&rsquo;s Included With Every Service Call</h2>
    <p>Regardless of the specific repair, every Castle service call includes:</p>
    <ul>
      <li>Licensed, background-checked, insured technician</li>
      <li>Written estimate before work begins (no surprise charges)</li>
      <li>Parts and labor warranty documented on your invoice</li>
      <li>Safety check of the complete door system</li>
      <li>Clean jobsite — we leave your garage cleaner than we found it</li>
    </ul>
    <p>Questions about our warranties or compliance? Call <a href="${T.PHONE_LINK}">${T.PHONE}</a> or <a href="mailto:info@castlegarage.com">email us</a>.</p>`,
    faqs: [
      {q:'Does Castle Garage Doors have a valid contractor license?', a:'Yes. Castle holds CSLB License #1154002, classification C-61/D-28 (Door Systems). This license is active, bonded, and insured. You can verify it at cslb.ca.gov. We\'ve maintained continuous licensure for our entire history of operation.'},
      {q:'What warranty comes with garage door spring replacement?', a:'Springs carry a manufacturer warranty that varies by cycle rating: standard 10,000-cycle springs are warrantied for 1 year; high-cycle 25,000+ springs carry up to a 3-year warranty. Castle also provides a labor warranty — if the same issue recurs due to workmanship within the warranty period, we fix it free.'},
      {q:'Should I hire a licensed contractor for garage door work?', a:'Absolutely. In California, garage door installation and repair requires a C-61/D-28 license. Hiring unlicensed operators exposes you to: no surety bond protection, potential homeowner\'s insurance voids, safety risk from untrained workers, and disclosure complications if you sell your home. Always verify the license at cslb.ca.gov.'}
    ]
  })
];
