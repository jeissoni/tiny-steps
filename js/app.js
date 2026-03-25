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
    var submitBtn = form.querySelector('.contact-form-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        var r = document.createElement('span');
        r.className = 'contact-form-ripple';
        r.setAttribute('aria-hidden', 'true');
        var rect = submitBtn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 2;
        r.style.cssText =
          'width:' +
          size +
          'px;height:' +
          size +
          'px;left:' +
          (e.clientX - rect.left - size / 2) +
          'px;top:' +
          (e.clientY - rect.top - size / 2) +
          'px';
        submitBtn.appendChild(r);
        setTimeout(function () {
          if (r.parentNode) r.parentNode.removeChild(r);
        }, 700);
      });
    }
  }

  var staggerObserver = null;

  function initContactStagger() {
    var app = document.getElementById('app');
    if (!app) return;
    var staggerEls = app.querySelectorAll('.stagger-children');
    if (staggerEls.length === 0) return;
    if (staggerObserver) {
      staggerObserver.disconnect();
    }
    staggerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            staggerObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    staggerEls.forEach(function (el) {
      el.classList.remove('visible');
      staggerObserver.observe(el);
      setTimeout(function () {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
          staggerObserver.unobserve(el);
        }
      }, 50);
    });
  }

  function initContactQuickCardSpotlight() {
    var app = document.getElementById('app');
    if (!app) return;
    app.querySelectorAll('.contact-quick-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', e.clientX - r.left + 'px');
        card.style.setProperty('--my', e.clientY - r.top + 'px');
      });
    });
  }

  function initParentsReviewsCarousel() {
    var root = document.querySelector('.section-parents-reviews');
    if (!root) return;

    var cardsWrap = root.querySelector('.parents-reviews__cards[data-carousel="parents-reviews"]');
    var dots = Array.prototype.slice.call(root.querySelectorAll('.parents-reviews__dot[data-index]'));
    var img = root.querySelector('.parents-reviews__image');
    if (!cardsWrap || dots.length === 0 || !img) return;

    // 4 slides (una por bolita). Puedes cambiar textos/imagenes aquí cuando quieras.
    var SLIDES = [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'Luise Henrik',
        role: 'Kid Parent',
        image: 'images/test-281x300.webp'
      },
      {
        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: 'Luise Henrikes',
        role: 'Kid Parent',
        image: 'images/test-281x300.webp'
      },
      {
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        author: 'Luise Henrikes2',
        role: 'Kid Parent',
        image: 'images/test-281x300.webp'
      },
      {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'New Parent',
        role: 'Kid Parent',
        image: 'images/test-281x300.webp'
      }
    ];

    var slots = {
      top: cardsWrap.querySelector('[data-slot="top"]'),
      mid: cardsWrap.querySelector('[data-slot="mid"]'),
      bottom: cardsWrap.querySelector('[data-slot="bottom"]')
    };
    if (!slots.top || !slots.mid || !slots.bottom) return;

    var current = 0;
    var isAnimating = false;
    var ANIM_MS = 280;

    function setCardContent(card, slide) {
      var p = card.querySelector('.review-card__text');
      var a = card.querySelector('.review-card__author');
      var r = card.querySelector('.review-card__role');
      if (p) p.textContent = slide.text;
      if (a) a.textContent = slide.author;
      if (r) r.textContent = slide.role;
    }

    function setVariant(card, variant) {
      card.classList.remove('review-card--purple', 'review-card--orange');
      card.classList.add(variant === 'orange' ? 'review-card--orange' : 'review-card--purple');
    }

    function render(index) {
      var total = SLIDES.length;
      var topIdx = (index - 1 + total) % total;
      var midIdx = index % total;
      var bottomIdx = (index + 1) % total;

      setVariant(slots.top, 'purple');
      setVariant(slots.mid, 'orange');
      setVariant(slots.bottom, 'purple');

      setCardContent(slots.top, SLIDES[topIdx]);
      setCardContent(slots.mid, SLIDES[midIdx]);
      setCardContent(slots.bottom, SLIDES[bottomIdx]);

      img.src = SLIDES[midIdx].image;
    }

    function setActiveDot(index) {
      dots.forEach(function (d) {
        var isActive = String(index) === d.getAttribute('data-index');
        d.classList.toggle('parents-reviews__dot--active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function slideTo(nextIndex) {
      if (isAnimating) return;
      if (nextIndex === current) return;

      var dir = nextIndex > current ? 'up' : 'down';
      isAnimating = true;
      cardsWrap.classList.add('is-animating');
      cardsWrap.classList.remove('slide-up', 'slide-down');
      cardsWrap.classList.add(dir === 'up' ? 'slide-up' : 'slide-down');

      setTimeout(function () {
        current = nextIndex;
        render(current);
        setActiveDot(current);
        cardsWrap.classList.remove('slide-up', 'slide-down');
        // Small reflow-safe delay to avoid flicker on some browsers
        setTimeout(function () {
          cardsWrap.classList.remove('is-animating');
          isAnimating = false;
        }, 20);
      }, ANIM_MS);
    }

    // Initial paint based on active dot (fallback to 0)
    var initialDot = root.querySelector('.parents-reviews__dot--active[data-index]');
    current = initialDot ? parseInt(initialDot.getAttribute('data-index'), 10) || 0 : 0;
    render(current);
    setActiveDot(current);

    // Delegated click
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.parents-reviews__dot[data-index]');
      if (!btn) return;
      e.preventDefault();
      var idx = parseInt(btn.getAttribute('data-index'), 10);
      if (isNaN(idx)) return;
      slideTo(idx);
    });
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

  function setNavActive(route) {
    var links = document.querySelectorAll('.nav-links a[href^="#/"]:not(.nav-cta)');
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace('#/', '');
      a.classList.toggle('active', href === route || (href === 'home' && !route));
    });
  }

  function initView(detail) {
    var route = (detail && detail.route) || (window.TinyStepsRouter && window.TinyStepsRouter.getRoute()) || 'home';
    setNavActive(route);
    if (heroBgInterval) { clearInterval(heroBgInterval); heroBgInterval = null; }
    initReveal();
    if (route === 'home') {
      initHeroBgSlider();
      initParentsReviewsCarousel();
    }
    if (route === 'programs' && window.TinyStepsPrograms) window.TinyStepsPrograms.init();
    if (route === 'testimonials') initTestimonialsSlider();
    if (route === 'contact') {
      initContactForm();
      initContactStagger();
      initContactQuickCardSpotlight();
    }
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
