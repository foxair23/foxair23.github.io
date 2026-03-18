// Location / Service Area pages
const T = require('./templates');

const nearbyMap = {
  'San Diego': [{city:'Escondido',file:'escondido.html'},{city:'Carlsbad',file:'carlsbad.html'},{city:'Encinitas',file:'encinitas.html'},{city:'North County SD',file:'north-county.html'}],
  'Escondido': [{city:'San Diego',file:'san-diego.html'},{city:'North County SD',file:'north-county.html'},{city:'Fallbrook',file:'fallbrook.html'},{city:'Bonsall',file:'bonsall.html'}],
  'Oceanside': [{city:'Carlsbad',file:'carlsbad.html'},{city:'Encinitas',file:'encinitas.html'},{city:'North County SD',file:'north-county.html'},{city:'Fallbrook',file:'fallbrook.html'}],
  'Carlsbad': [{city:'Oceanside',file:'oceanside.html'},{city:'Encinitas',file:'encinitas.html'},{city:'San Diego',file:'san-diego.html'},{city:'North County SD',file:'north-county.html'}],
  'Encinitas': [{city:'Carlsbad',file:'carlsbad.html'},{city:'San Diego',file:'san-diego.html'},{city:'Oceanside',file:'oceanside.html'},{city:'North County SD',file:'north-county.html'}],
  'North County San Diego': [{city:'Escondido',file:'escondido.html'},{city:'Oceanside',file:'oceanside.html'},{city:'Carlsbad',file:'carlsbad.html'},{city:'Encinitas',file:'encinitas.html'}],
  'Temecula': [{city:'Murrieta',file:'murrieta.html'},{city:'Fallbrook',file:'fallbrook.html'},{city:'Riverside County',file:'riverside-county.html'},{city:'Corona',file:'corona.html'}],
  'Murrieta': [{city:'Temecula',file:'temecula.html'},{city:'Fallbrook',file:'fallbrook.html'},{city:'Riverside County',file:'riverside-county.html'},{city:'Corona',file:'corona.html'}],
  'Fallbrook': [{city:'Bonsall',file:'bonsall.html'},{city:'Temecula',file:'temecula.html'},{city:'Escondido',file:'escondido.html'},{city:'Oceanside',file:'oceanside.html'}],
  'Bonsall': [{city:'Fallbrook',file:'fallbrook.html'},{city:'Escondido',file:'escondido.html'},{city:'North County SD',file:'north-county.html'},{city:'San Diego',file:'san-diego.html'}],
  'Riverside County': [{city:'Corona',file:'corona.html'},{city:'Temecula',file:'temecula.html'},{city:'Murrieta',file:'murrieta.html'},{city:'Escondido',file:'escondido.html'}],
  'Corona': [{city:'Riverside County',file:'riverside-county.html'},{city:'Temecula',file:'temecula.html'},{city:'Murrieta',file:'murrieta.html'},{city:'San Diego',file:'san-diego.html'}]
};

function locationPage(opts) {
  const prefix = T.getPrefix(opts.file);
  const crumbs = [{label:'Home',href:'index.html'},{label:'Service Areas',href:'service-areas/index.html'},{label:opts.city}];
  const nearby = nearbyMap[opts.city] || [];
  const nearbySection = nearby.length ? `
    <div style="margin-top:var(--space-12);">
      <h2>Nearby Areas We Serve</h2>
      <div class="areas-list" style="margin-top:var(--space-4);">
        ${nearby.map(n => `<a href="${prefix}service-areas/${n.file}">${n.city}</a>`).join('\n        ')}
      </div>
    </div>` : '';
  const body = `
  ${T.heroInterior(`Garage Door &amp; Gate Services in ${opts.city}, CA`, opts.subtitle, crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">
      ${opts.content}
      <h2>Services Available in ${opts.city}</h2>
      <ul>
        <li><a href="${prefix}services/garage-door-repair/index.html">Garage Door Repair</a> &mdash; springs, cables, rollers, panels, tracks, sensors, emergency</li>
        <li><a href="${prefix}services/garage-door-installation/index.html">New Garage Door Installation</a> &mdash; residential, commercial, custom, Clopay dealer</li>
        <li><a href="${prefix}services/garage-door-openers/index.html">Garage Door Openers</a> &mdash; LiftMaster, Marantec, Genie, smart/WiFi</li>
        <li><a href="${prefix}services/gate-services/index.html">Gate Services</a> &mdash; installation, repair, automatic, driveway, security gates</li>
      </ul>
      <h2>Why ${opts.city} Homeowners Choose Castle</h2>
      <ul>
        <li>40+ years of experience serving the area since 1981</li>
        <li>Veteran-owned and family-operated</li>
        <li>Authorized Home Depot Service Provider</li>
        <li>Clopay Authorized Dealer</li>
        <li>Same-day and 24/7 emergency service</li>
        <li>Free estimates with transparent, upfront pricing</li>
        <li>Licensed, bonded, and insured</li>
      </ul>
    </div>
    ${opts.testimonial ? `<div class="testimonials-grid" style="margin-top:var(--space-12);"><div class="testimonial-card"><div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>&ldquo;${opts.testimonial.quote}&rdquo;</blockquote><div class="testimonial-author">${opts.testimonial.author}</div><div class="testimonial-source">${opts.city}, CA</div></div></div>` : ''}
    ${nearbySection}
    <div class="areas-map" style="margin-top:var(--space-8);">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${opts.lng}!3d${opts.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus" allowfullscreen="" loading="lazy" title="Castle Garage Doors service area - ${opts.city}" style="width:100%;height:350px;border:0;border-radius:var(--radius-lg);"></iframe>
    </div>
  </div></div>`;
  return {
    file: opts.file, title: `Garage Door Repair ${opts.city}, CA | Castle Garage Doors & Gates`,
    description: `Garage door and gate services in ${opts.city}, CA. Repair, installation, openers, and gates. Veteran-owned, 40+ years experience. Call (858) 578-1990.`,
    activePage: 'areas', body, schema: T.breadcrumbSchema(crumbs)
  };
}

// Service Areas Hub
function areasHub() {
  const prefix = T.getPrefix('service-areas/index.html');
  const crumbs = [{label:'Home',href:'index.html'},{label:'Service Areas'}];
  const body = `
  ${T.heroInterior('Our Service Areas', 'Serving homeowners and businesses from San Diego to Riverside County.', crumbs, prefix)}
  <div class="section"><div class="container">
    <div class="content-section">
      <p>Castle Garage Doors &amp; Gates provides garage door and gate services across a wide swath of Southern California. From the coastal communities of San Diego County through the inland valleys of North County and up into Riverside County, our team travels to you with fully-stocked trucks ready for same-day service.</p>
      <p>As an Authorized Home Depot Service Provider covering 28 stores from San Diego to Corona, we have the infrastructure and team to serve this entire corridor efficiently.</p>
    </div>
    <div class="areas-list" style="margin-top:var(--space-8);">
      <a href="san-diego.html">San Diego</a>
      <a href="escondido.html">Escondido</a>
      <a href="oceanside.html">Oceanside</a>
      <a href="carlsbad.html">Carlsbad</a>
      <a href="encinitas.html">Encinitas</a>
      <a href="north-county.html">North County San Diego</a>
      <a href="temecula.html">Temecula</a>
      <a href="murrieta.html">Murrieta</a>
      <a href="fallbrook.html">Fallbrook</a>
      <a href="bonsall.html">Bonsall</a>
      <a href="riverside-county.html">Riverside County</a>
      <a href="corona.html">Corona</a>
    </div>
    <div class="areas-map" style="margin-top:var(--space-8);">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d425200.0!2d-117.1!3d33.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus" allowfullscreen="" loading="lazy" title="Castle Garage Doors full service area" style="width:100%;height:400px;border:0;border-radius:var(--radius-lg);"></iframe>
    </div>
  </div></div>`;
  return { file:'service-areas/index.html', title:'Service Areas | Castle Garage Doors & Gates', description:'Castle Garage Doors & Gates serves San Diego to Riverside County. Find garage door and gate services in your city.', activePage:'areas', body, schema:T.breadcrumbSchema(crumbs) };
}

const locations = [
  locationPage({ file:'service-areas/san-diego.html', city:'San Diego', lat:32.7157, lng:-117.1611, subtitle:'Comprehensive garage door and gate services across the San Diego metro area.',
    content:`<p>As San Diego&rsquo;s hometown garage door company since 1981, Castle has deep roots in America&rsquo;s Finest City. From the historic neighborhoods of North Park and Hillcrest to the suburban communities of Scripps Ranch and Rancho Bernardo, we know San Diego homes inside and out.</p>
    <p>San Diego&rsquo;s diverse architecture &mdash; from Craftsman bungalows to Spanish Colonial revivals to modern coastal designs &mdash; means garage door needs vary widely. Our experience across the full spectrum of home styles ensures we can recommend and install the perfect door for your property.</p>
    <h3>Neighborhoods We Serve in San Diego</h3>
    <p>La Jolla, Pacific Beach, Mission Beach, Point Loma, Ocean Beach, Hillcrest, North Park, Normal Heights, Kensington, University Heights, Clairemont, Kearny Mesa, Mira Mesa, Scripps Ranch, Rancho Bernardo, Poway, Sabre Springs, Tierrasanta, San Carlos, Del Cerro, and all surrounding neighborhoods.</p>
    <h3>San Diego Climate Considerations</h3>
    <p>Coastal moisture and salt air can accelerate wear on metal springs, cables, and tracks. Homes within a few miles of the coast benefit from rust-resistant hardware and more frequent maintenance. We recommend annual inspections for coastal properties.</p>`,
    testimonial:{quote:'Castle replaced both springs and rollers on our garage door in Scripps Ranch. The technician was on time, professional, and explained everything. Fair pricing and excellent work.',author:'Jennifer M.'}
  }),
  locationPage({ file:'service-areas/escondido.html', city:'Escondido', lat:33.1192, lng:-117.0864, subtitle:'Your neighbor in Escondido — our headquarters is right here.',
    content:`<p>Castle Garage Doors &amp; Gates is headquartered in Escondido at 1291 Simpson Way Suite D, making us your true local garage door company. We&rsquo;re not a franchise dispatching technicians from across the county &mdash; we&rsquo;re right here in your community, and have been since 1981.</p>
    <p>Escondido&rsquo;s mix of established neighborhoods like Felicita and Westside, the growing developments in East Escondido, and the larger estate properties in the surrounding hills means we see every type of garage door challenge. From aging single-car doors in 1960s tract homes to custom double doors on hillside estates, we handle it all.</p>
    <h3>Escondido Neighborhoods</h3>
    <p>Downtown Escondido, Westside, Felicita, East Valley, Hidden Meadows, Rincon del Diablo, San Pasqual Valley, Daley Ranch area, and all Escondido zip codes (92025, 92026, 92027, 92029).</p>`,
    testimonial:{quote:'As a fellow Escondido local, I love supporting hometown businesses. Castle has serviced our doors twice now and they are always fair, fast, and professional.',author:'Carlos R.'}
  }),
  locationPage({ file:'service-areas/oceanside.html', city:'Oceanside', lat:33.1959, lng:-117.3795, subtitle:'Serving Oceanside\'s coastal and inland communities.',
    content:`<p>Oceanside&rsquo;s position along the coast means homes here face unique challenges from salt air and coastal moisture. Garage door springs, cables, and metal hardware corrode faster in marine environments, making regular maintenance especially important for Oceanside homeowners.</p>
    <p>From the beachside bungalows near the pier to the newer developments in Mission Hills and Rancho Del Oro to the established communities of South Oceanside, we provide tailored service that accounts for your home&rsquo;s specific exposure and needs.</p>
    <h3>Oceanside Areas We Serve</h3>
    <p>Downtown Oceanside, South Oceanside, Fire Mountain, Rancho Del Oro, Mission Hills, Morro Hills, San Luis Rey, Oceanside Harbor area, and Camp Pendleton housing (zip codes 92054, 92056, 92057, 92058).</p>
    <h3>Military Community</h3>
    <p>With Camp Pendleton next door, Oceanside has a large military community. As a veteran-owned business, we&rsquo;re proud to serve fellow military families and offer military courtesy.</p>`,
    testimonial:{quote:'The salt air had done a number on our garage springs. Castle came out, replaced everything, and recommended rust-resistant hardware. Great advice and great service.',author:'Staff Sgt. Mike D.'}
  }),
  locationPage({ file:'service-areas/carlsbad.html', city:'Carlsbad', lat:33.1581, lng:-117.3506, subtitle:'Premium garage door services for Carlsbad homes.',
    content:`<p>Carlsbad&rsquo;s beautiful neighborhoods &mdash; from the coastal Village area to the planned communities of Aviara and La Costa &mdash; feature some of the finest homes in North County San Diego. These homes deserve garage doors that match their quality, and our selection from Clopay&rsquo;s premium lines does exactly that.</p>
    <p>The Carlsbad AVANTE aluminum and glass garage door has become increasingly popular in the city&rsquo;s newer contemporary homes. These striking doors flood garages with natural light and create a dramatic modern statement.</p>
    <h3>Carlsbad Communities</h3>
    <p>Carlsbad Village, Barrio, Olde Carlsbad, Aviara, La Costa, Bressi Ranch, Calavera Hills, Rancho Carlsbad, Terramar, and all Carlsbad zip codes (92008, 92009, 92010, 92011).</p>`,
    testimonial:{quote:'We had a custom Clopay AVANTE door installed by Castle at our La Costa home. Absolutely gorgeous and the installation was flawless. Highly recommend for the Carlsbad area.',author:'Sarah K.'}
  }),
  locationPage({ file:'service-areas/encinitas.html', city:'Encinitas', lat:33.0370, lng:-117.2920, subtitle:'Serving Encinitas from Leucadia to Olivenhain.',
    content:`<p>Encinitas offers a unique blend of coastal beach culture and inland hillside living. From the surf shacks of Leucadia to the horse properties of Olivenhain to the family neighborhoods of New Encinitas, garage door needs here range from basic repairs to high-end custom installations.</p>
    <p>The eclectic architectural mix in Encinitas &mdash; mid-century, Spanish, contemporary, and rustic &mdash; makes it one of our more interesting service areas for door selection. We enjoy helping Encinitas homeowners find doors that complement their home&rsquo;s unique character.</p>
    <h3>Encinitas Communities</h3>
    <p>Old Encinitas, New Encinitas, Leucadia, Cardiff-by-the-Sea, Olivenhain, Rancho Santa Fe (nearby), and all Encinitas zip codes (92023, 92024).</p>`,
    testimonial:{quote:'Our 1960s ranch in Leucadia needed a new garage door that matched the vintage character. Castle helped us choose a beautiful carriage-style door that looks like it was always there.',author:'Tom & Linda B.'}
  }),
  locationPage({ file:'service-areas/north-county.html', city:'North County San Diego', lat:33.13, lng:-117.16, subtitle:'Comprehensive coverage across all of North County.',
    content:`<p>North County San Diego is our home turf. With our headquarters in Escondido and service routes running daily through every North County community, we provide the fastest response times and deepest local knowledge in the region.</p>
    <p>North County&rsquo;s diverse geography &mdash; from coastal Carlsbad and Oceanside through the suburban heart of San Marcos, Vista, and Escondido, to the rural landscapes of Valley Center and Ramona &mdash; means we encounter every type of garage door situation.</p>
    <h3>North County Communities</h3>
    <p>Escondido, San Marcos, Vista, Oceanside, Carlsbad, Encinitas, Solana Beach, Del Mar, Rancho Santa Fe, Poway, Valley Center, Ramona, and surrounding areas.</p>`,
    testimonial:{quote:'I\'ve used Castle for three different properties across North County over the years. Consistently excellent work at fair prices. They\'re the only company I call.',author:'Property Manager Dave W.'}
  }),
  locationPage({ file:'service-areas/temecula.html', city:'Temecula', lat:33.4936, lng:-117.1484, subtitle:'Trusted garage door service in Temecula\'s wine country.',
    content:`<p>Temecula&rsquo;s rapid growth over the past two decades has created a city of beautiful master-planned communities, each with its own architectural character. Many Temecula homes feature Spanish and Mediterranean-style architecture with carriage house garage doors that complement the region&rsquo;s wine country aesthetic.</p>
    <p>The inland valley climate brings hotter summers than coastal San Diego, which can stress garage door springs and openers differently. We adjust our recommendations for Temecula&rsquo;s climate, including heat-resistant lubricants and openers with thermal protection.</p>
    <h3>Temecula Communities</h3>
    <p>Redhawk, Wolf Creek, Harveston, Roripaugh Ranch, Crowne Hill, Temeku Hills, Vail Ranch, Temecula Wine Country, and Old Town Temecula. Zip codes: 92589, 92590, 92591, 92592.</p>`,
    testimonial:{quote:'Our Redhawk home needed both spring replacement and a new opener. Castle gave us a fair bundled price and the tech was incredibly knowledgeable. Done in under 3 hours.',author:'Mike & Angela S.'}
  }),
  locationPage({ file:'service-areas/murrieta.html', city:'Murrieta', lat:33.5539, lng:-117.2139, subtitle:'Fast, reliable service for Murrieta homeowners.',
    content:`<p>Murrieta has transformed from a quiet town into one of Riverside County&rsquo;s most sought-after family communities. The city&rsquo;s newer construction means many homes have modern garage door systems, but even recent installations need maintenance and occasional repair after years of daily use.</p>
    <p>We serve Murrieta homeowners regularly along our Temecula-Murrieta route, providing efficient same-day service for the entire corridor.</p>
    <h3>Murrieta Neighborhoods</h3>
    <p>Murrieta Hot Springs, Greer Ranch, Copper Canyon, Bear Creek, Alta Murrieta, The Oaks, Los Alamos Hills, and all Murrieta zip codes (92562, 92563).</p>`,
    testimonial:{quote:'Quick response, professional service, fair pricing. Castle fixed our broken spring in Murrieta Hot Springs the same day we called. No complaints whatsoever.',author:'Patricia N.'}
  }),
  locationPage({ file:'service-areas/fallbrook.html', city:'Fallbrook', lat:33.3764, lng:-117.2511, subtitle:'Serving Fallbrook\'s rural and semi-rural properties.',
    content:`<p>Known as the &ldquo;Friendly Village,&rdquo; Fallbrook&rsquo;s rural character and larger properties present unique garage door and gate challenges. Many Fallbrook homes sit on acreage with long driveways, making gate installation a particularly popular service here.</p>
    <p>Fallbrook&rsquo;s older avocado ranch homes often have original garage doors from the 1970s and 1980s that are due for replacement. We help these homeowners upgrade to modern, insulated doors that improve curb appeal and energy efficiency.</p>
    <h3>Fallbrook &amp; Surrounding Areas</h3>
    <p>Fallbrook Village, De Luz, Live Oak Park, Monserate, Rainbow (nearby), and Pala (nearby). Zip code: 92028.</p>
    <h3>Gate Services in Fallbrook</h3>
    <p>With many properties on larger lots, Fallbrook has strong demand for driveway gates. We install and repair sliding gates, swing gates, and automatic gate systems suited to rural and semi-rural properties.</p>`,
    testimonial:{quote:'Castle installed a beautiful wrought iron driveway gate on our Fallbrook property. The crew was respectful of our landscaping and the gate works perfectly.',author:'Richard & Joan H.'}
  }),
  locationPage({ file:'service-areas/bonsall.html', city:'Bonsall', lat:33.2886, lng:-117.2250, subtitle:'Garage door and gate experts for Bonsall\'s estate properties.',
    content:`<p>Bonsall is one of San Diego County&rsquo;s most scenic communities, with rolling hills, horse properties, and estate-sized lots. Many Bonsall homes feature multi-car garages and long gated driveways that require specialized service.</p>
    <p>Our proximity in Escondido means Bonsall homeowners get fast response times and personal attention. We understand the unique needs of rural properties, from oversized garage doors for RV bays to heavy-duty gate systems for long driveways.</p>
    <h3>Bonsall Service Notes</h3>
    <p>We serve all of Bonsall including properties along Lilac Road, West Lilac, East Vista, and the neighborhoods near Bonsall Community Park. Zip code: 92003.</p>`,
    testimonial:{quote:'Our property in Bonsall has a three-car garage plus an RV bay. Castle serviced all four doors and replaced the RV bay opener. Excellent work on a big job.',author:'James T.'}
  }),
  locationPage({ file:'service-areas/riverside-county.html', city:'Riverside County', lat:33.75, lng:-117.35, subtitle:'Serving the western corridor of Riverside County.',
    content:`<p>Castle&rsquo;s service area extends well into Riverside County, covering the communities along the I-15 and I-215 corridors. From Temecula and Murrieta in the south through Lake Elsinore, Menifee, and up to Corona, we provide the same quality service Riverside County residents deserve.</p>
    <p>As an Authorized Home Depot Service Provider, we cover Home Depot stores throughout this corridor, further establishing our presence in the region.</p>
    <h3>Riverside County Cities We Serve</h3>
    <p>Temecula, Murrieta, Wildomar, Lake Elsinore, Menifee, Canyon Lake, Perris, Hemet, Sun City, Corona, Norco, Eastvale, and Jurupa Valley.</p>
    <h3>Growth Area</h3>
    <p>Riverside County continues to grow rapidly, with new housing developments expanding the need for quality garage door installation and service. We&rsquo;re growing alongside the community.</p>`,
    testimonial:{quote:'Hard to find a quality garage door company out here in Riverside County that isn\'t a fly-by-night operation. Castle is the real deal — experienced, honest, and professional.',author:'George M.'}
  }),
  locationPage({ file:'service-areas/corona.html', city:'Corona', lat:33.8753, lng:-117.5664, subtitle:'Expert garage door service at the northern edge of our territory.',
    content:`<p>Corona sits at the northern boundary of our service area, and we serve it proudly. Known as the &ldquo;Circle City&rdquo; for its distinctive Grand Boulevard, Corona offers a mix of historic homes, established suburbs, and newer master-planned communities, each with different garage door needs.</p>
    <p>Corona&rsquo;s inland climate means hotter summers and cooler winters than coastal San Diego. We account for these temperature swings when recommending springs, lubricants, and openers for Corona homes.</p>
    <h3>Corona Neighborhoods</h3>
    <p>Downtown Corona, North Corona, South Corona, Eagle Glen, Sierra Del Oro, Dos Lagos, Sycamore Creek, Coronita, and all Corona zip codes (92877, 92878, 92879, 92880, 92881, 92882, 92883).</p>`,
    testimonial:{quote:'Called Castle from Corona not expecting them to come this far. They did, same day, and the price was better than the local guys quoted. Very impressed.',author:'Steve & Karen L.'}
  })
];

module.exports = [areasHub(), ...locations];
