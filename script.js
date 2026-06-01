/* ===================================================================
   Castle Garage Doors & Gates — Shared JavaScript
   =================================================================== */

(function() {
  'use strict';

  // ===== FLOATING CTA (fades in after scroll) =====
  var floatingCta = document.getElementById('floatingCta');
  if (floatingCta) {
    window.addEventListener('scroll', function() {
      floatingCta.style.opacity = window.scrollY > 80 ? '1' : '0';
    }, { passive: true });
  }

  // ===== MOBILE MENU =====
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  // Close mobile menu on link click
  window.closeMobileMenu = function() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.mobile-menu a').forEach(function(a) {
    a.addEventListener('click', window.closeMobileMenu);
  });

  // ===== SCROLL REVEAL =====
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });
  }

  // ===== FORM HANDLING =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: Replace with ServiceTitan booking widget integration
      alert('Thank you! We received your request and will contact you shortly.\nFor immediate assistance, call (800) 576-1397.');
      form.reset();
    });
  }

  // ===== GALLERY FILTERS + LOAD MORE + LIGHTBOX =====
  var PAGE = 12;

  function initGallery() {
    var grid = document.getElementById('gallery-grid');
    var moreEl = document.getElementById('gallery-more');
    if (!grid) return;

    var allItems = Array.from(grid.querySelectorAll('.gallery-item'));
    var currentFilter = 'all';
    var shown = 0;

    function getFiltered() {
      if (currentFilter === 'all') return allItems;
      return allItems.filter(function(item) {
        return item.getAttribute('data-cat') === currentFilter;
      });
    }

    function applyFilter() {
      allItems.forEach(function(item) { item.classList.add('hidden'); });
      shown = 0;
      showNext();
    }

    function showNext() {
      var filtered = getFiltered();
      var end = Math.min(shown + PAGE, filtered.length);
      for (var i = shown; i < end; i++) filtered[i].classList.remove('hidden');
      shown = end;
      if (moreEl) {
        if (shown >= filtered.length) moreEl.classList.add('hidden');
        else moreEl.classList.remove('hidden');
      }
    }

    applyFilter();

    var tabs = document.querySelectorAll('.gallery-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter');
        applyFilter();
      });
    });

    if (moreEl) {
      var btn = moreEl.querySelector('button');
      if (btn) btn.addEventListener('click', showNext);
    }

    // --- Lightbox ---
    var lightbox = document.getElementById('galleryLightbox');
    var lbImg = document.getElementById('lightboxImg');
    var lbCounter = document.getElementById('lightboxCounter');
    if (!lightbox) return;
    var activeItems = [], activeIndex = 0;

    function openLightbox(items, index) {
      activeItems = items; activeIndex = index;
      lbImg.src = activeItems[activeIndex].querySelector('img').src;
      lbImg.alt = activeItems[activeIndex].querySelector('img').alt;
      lbCounter.textContent = (activeIndex + 1) + ' / ' + activeItems.length;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      lbImg.src = '';
    }
    function navigate(dir) {
      activeIndex = (activeIndex + dir + activeItems.length) % activeItems.length;
      lbImg.src = activeItems[activeIndex].querySelector('img').src;
      lbCounter.textContent = (activeIndex + 1) + ' / ' + activeItems.length;
    }

    grid.addEventListener('click', function(e) {
      var item = e.target.closest('.gallery-item');
      if (!item || item.classList.contains('hidden')) return;
      var visibleItems = getFiltered().filter(function(it) { return !it.classList.contains('hidden'); });
      openLightbox(visibleItems, visibleItems.indexOf(item));
    });

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', function() { navigate(-1); });
    document.getElementById('lightboxNext').addEventListener('click', function() { navigate(1); });
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function(e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  if (document.getElementById('gallery-grid')) initGallery();

  // ===== GA4 EVENT TRACKING =====
  function trackEvent(name, params) {
    if (typeof gtag === 'function') { gtag('event', name, params); }
  }
  // Phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() { trackEvent('phone_click', { event_label: 'phone_call' }); });
  });
  // CTA button clicks
  document.querySelectorAll('.btn-primary').forEach(function(btn) {
    btn.addEventListener('click', function() {
      trackEvent('cta_click', { event_label: this.textContent.trim() });
    });
  });
  // Schedule clicks
  document.querySelectorAll('[data-track="schedule"]').forEach(function(btn) {
    btn.addEventListener('click', function() { trackEvent('schedule_click', {}); });
  });

})();
