/**
 * Tiny Steps SPA — Inicialización, reveal on scroll, slider y formulario por vista
 */
(function () {
  'use strict';

  var revealObserver = null;

  function initReveal() {
    var app = document.getElementById('app');
    if (!app) return;
    var reveals = app.querySelectorAll('.reveal');
    if (reveals.length === 0) {
      console.warn('No .reveal elements found');
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
    }
    reveals.forEach(function (r) {
      r.classList.remove('visible');
      revealObserver.observe(r);
      // Trigger immediately if already in viewport on initial load
      setTimeout(function() {
        var rect = r.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          r.classList.add('visible');
          revealObserver.unobserve(r);
        }
      }, 50);
    });
  }

  function initTestimonialsSlider() {
    var track = document.getElementById('testimonialsTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (!track || !prevBtn || !nextBtn) return;
    var cards = track.querySelectorAll('.testimonial-card');
    var current = 0;
    var cardWidth = 340 + 24;

    function slide(dir) {
      var max = cards.length - 1;
      current = Math.max(0, Math.min(max, current + dir));
      track.style.transform = 'translateX(-' + current * cardWidth + 'px)';
    }
    prevBtn.onclick = function () { slide(-1); };
    nextBtn.onclick = function () { slide(1); };
    track.style.transform = 'translateX(0)';
    current = 0;
    if (window._testimonialsInterval) clearInterval(window._testimonialsInterval);
    window._testimonialsInterval = setInterval(function () {
      current = (current + 1) % cards.length;
      track.style.transform = 'translateX(-' + current * cardWidth + 'px)';
    }, 4000);
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.onsubmit = function (e) {
      e.preventDefault();
      alert('¡Gracias! We will contact you soon to confirm your tour. 🌱');
      form.reset();
    };
  }

  var heroBgInterval = null;
  var HERO_IMAGES = ['./images/home2.webp', './images/home1.webp'];
  var HERO_BG_INTERVAL_MS = 10000;

  function initHeroBgSlider() {
    if (heroBgInterval) clearInterval(heroBgInterval);
    var layer1 = document.getElementById('hero-bg-1');
    var layer2 = document.getElementById('hero-bg-2');
    if (!layer1 || !layer2) return;
    var visibleLayer = 1;
    var nextImageIndex = 1;
    heroBgInterval = setInterval(function () {
      var hideEl = visibleLayer === 1 ? layer1 : layer2;
      var showEl = visibleLayer === 1 ? layer2 : layer1;
      showEl.style.backgroundImage = 'url("' + HERO_IMAGES[nextImageIndex] + '")';
      hideEl.style.opacity = '0';
      showEl.style.opacity = '1';
      nextImageIndex = 1 - nextImageIndex;
      visibleLayer = visibleLayer === 1 ? 2 : 1;
    }, HERO_BG_INTERVAL_MS);
  }

  function initFloatBtn() {
    var floatBtn = document.getElementById('float-tour-btn');
    if (!floatBtn) return;
    floatBtn.onclick = function () {
      if (window.TinyStepsRouter) {
        window.TinyStepsRouter.navigate('contact');
        window.location.hash = '#/contact';
      }
      setTimeout(function () {
        var contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    };
  }

  function initView(detail) {
    var route = (detail && detail.route) || (window.TinyStepsRouter && window.TinyStepsRouter.getRoute()) || 'home';
    if (heroBgInterval) { clearInterval(heroBgInterval); heroBgInterval = null; }
    initReveal();
    if (route === 'home') initHeroBgSlider();
    if (route === 'testimonials') initTestimonialsSlider();
    if (route === 'contact') initContactForm();
    initFloatBtn();
  }

  window.addEventListener('viewLoaded', function (e) {
    initView(e.detail);
  });

  window.addEventListener('DOMContentLoaded', function () {
    if (window.TinyStepsRouter) window.TinyStepsRouter.init();
    initFloatBtn();
  });
})();
