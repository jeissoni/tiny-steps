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
    if (reveals.length === 0) return;
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

  var homeReviewsAutoplay = null;
  var homeReviewsResizeHandler = null;

  function destroyHomeReviewsCarousel() {
    if (homeReviewsAutoplay) {
      clearInterval(homeReviewsAutoplay);
      homeReviewsAutoplay = null;
    }
    if (homeReviewsResizeHandler) {
      window.removeEventListener('resize', homeReviewsResizeHandler);
      homeReviewsResizeHandler = null;
    }
  }

  function initHomeReviewsCarousel() {
    destroyHomeReviewsCarousel();

    var root = document.querySelector('[data-reviews-carousel]');
    if (!root) return;

    var viewport = root.querySelector('.reviews-carousel__viewport');
    var track = root.querySelector('.reviews-carousel__track');
    var slides = root.querySelectorAll('.reviews-carousel__slide');
    var prevBtn = root.querySelector('.reviews-carousel__btn--prev');
    var nextBtn = root.querySelector('.reviews-carousel__btn--next');
    var dots = root.querySelectorAll('.reviews-carousel__dot');
    if (!viewport || !track || slides.length === 0) return;

    var total = slides.length;
    var current = 0;
    var AUTO_MS = 7000;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function layout() {
      var w = viewport.getBoundingClientRect().width;
      if (w <= 0) return;
      slides.forEach(function (s) {
        s.style.flexBasis = w + 'px';
        s.style.width = w + 'px';
        s.style.minWidth = w + 'px';
      });
      track.style.width = w * total + 'px';
      track.style.transform = 'translateX(' + -current * w + 'px)';
    }

    function goTo(index) {
      current = (index % total + total) % total;
      var w = viewport.getBoundingClientRect().width;
      if (w <= 0) return;
      track.style.transform = 'translateX(' + -current * w + 'px)';
      dots.forEach(function (d, i) {
        var on = i === current;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }

    function next() {
      goTo(current + 1);
    }
    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      if (reduceMotion) return;
      if (homeReviewsAutoplay) clearInterval(homeReviewsAutoplay);
      homeReviewsAutoplay = setInterval(next, AUTO_MS);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev();
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next();
        startAutoplay();
      });
    }

    root.tabIndex = 0;
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        startAutoplay();
      }
    });
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var idx = parseInt(d.getAttribute('data-slide'), 10);
        if (!isNaN(idx)) goTo(idx);
        startAutoplay();
      });
    });

    root.addEventListener('mouseenter', function () {
      if (homeReviewsAutoplay) clearInterval(homeReviewsAutoplay);
    });
    root.addEventListener('mouseleave', startAutoplay);

    homeReviewsResizeHandler = function () {
      layout();
    };
    window.addEventListener('resize', homeReviewsResizeHandler);

    layout();
    goTo(0);
    requestAnimationFrame(function () {
      layout();
    });

    startAutoplay();
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
      }
      setTimeout(function () {
        var contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    };
  }

  function setNavActive(route) {
    var parse = window.TinyStepsRouter && window.TinyStepsRouter.parseHrefToRoute;
    if (!parse) return;
    document.querySelectorAll('.nav-links > li > a:not(.nav-cta)').forEach(function (a) {
      var key = parse(a.getAttribute('href') || '');
      if (key === null) return;
      a.classList.toggle('active', key === route);
    });
  }

  function initView(detail) {
    var route = (detail && detail.route) || (window.TinyStepsRouter && window.TinyStepsRouter.getRoute()) || 'home';
    setNavActive(route);
    if (heroBgInterval) { clearInterval(heroBgInterval); heroBgInterval = null; }
    if (route !== 'home') {
      destroyHomeReviewsCarousel();
    }
    if (route === 'programs' && window.TinyStepsPrograms) window.TinyStepsPrograms.init();
    initReveal();
    if (route === 'home') {
      initHeroBgSlider();
      initHomeReviewsCarousel();
    }
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
