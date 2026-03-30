/**
 * Programs page — scroll progress, reveal, quick-nav, 3D tilt, ripple, particles, etc.
 */
(function () {
  'use strict';

  function initProgramsPage() {
    var app = document.getElementById('app');
    if (!app) return;

    var progressBar = document.getElementById('scrollProgress');
    var particleCanvas = document.getElementById('particle-canvas');

    /* ── 1. SCROLL PROGRESS BAR ── */
    if (progressBar) {
      function updateProgress() {
        var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        progressBar.style.width = pct + '%';
      }
      window.addEventListener('scroll', updateProgress);
      updateProgress();
    }

    /* ── 2. Clases reveal en bloques sin .reveal en HTML (initReveal en app.js corre después) ── */
    app.querySelectorAll('.intro-strip, .transport-note, .programs-cta').forEach(function (el) {
      el.classList.add('reveal', 'scale-in');
    });

    /* ── 3. QUICK-NAV CLICK → SCROLL TO SECTION ── */
    var progNav = app.querySelector('.prog-nav');
    if (progNav) {
      progNav.addEventListener('click', function (e) {
        var a = e.target.closest('a.prog-nav-btn');
        if (!a || !a.hash) return;
        var id = a.hash.slice(1);
        var el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    /* ── 4. QUICK-NAV ACTIVE ON SCROLL ── */
    var progSections = app.querySelectorAll('#infants, #toddlers, #preschool, #afterschool, #dropin, #summercamp');
    var navBtns = app.querySelectorAll('.prog-nav-btn');
    if (progSections.length && navBtns.length) {
      var navObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            navBtns.forEach(function (b) { b.classList.remove('active'); });
            var active = app.querySelector('.prog-nav-btn[href="#' + e.target.id + '"]');
            if (active) active.classList.add('active');
          }
        });
      }, { threshold: 0.4 });
      progSections.forEach(function (s) { navObs.observe(s); });
    }

    /* ── 5. 3D TILT ON PROGRAM VISUALS ── */
    app.querySelectorAll('.prog-visual').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(600px) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 10) + 'deg) scale(1.03)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
      });
    });

    /* ── 6. RIPPLE ON BUTTONS ── */
    app.querySelectorAll('.prog-btn').forEach(function (btn) {
      btn.classList.add('ripple-btn');
      btn.addEventListener('click', function (e) {
        var ripple = document.createElement('span');
        ripple.classList.add('ripple');
        var r = btn.getBoundingClientRect();
        var size = Math.max(r.width, r.height) * 2;
        ripple.style.cssText =
          'width:' + size + 'px; height:' + size + 'px;' +
          'left:' + (e.clientX - r.left - size / 2) + 'px;' +
          'top:' + (e.clientY - r.top - size / 2) + 'px;';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
      });
    });

    /* ── 7. FLOATING EMOJI CONFETTI ── */
    var emojis = ['⭐', '🌟', '💛', '🎨', '📚', '🏃', '🎵', '🧩', '🌈', '👶', '🎒', '🌱'];
    for (var i = 0; i < 14; i++) {
      var el = document.createElement('div');
      el.classList.add('confetti-piece');
      el.textContent = emojis[i % emojis.length];
      el.style.cssText =
        'left: ' + (Math.random() * 100) + 'vw;' +
        'animation-duration: ' + (8 + Math.random() * 14) + 's;' +
        'animation-delay: ' + (Math.random() * 12) + 's;' +
        'font-size: ' + (0.9 + Math.random() * 1.2) + 'rem;' +
        'opacity: 0;';
      app.appendChild(el);
    }

    /* ── 8. PARTICLE CANVAS ── */
    if (particleCanvas) {
      var ctx = particleCanvas.getContext('2d');
      var colors = ['#ec316c', '#0083da', '#6853bc', '#04b3ac', '#8bc53d', '#ffad1c', '#f2812a'];

      function resize() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      var particles = Array.from({ length: 28 }, function () {
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 2 + Math.random() * 4,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.1 + Math.random() * 0.2
        };
      });

      function drawParticles() {
        if (!particleCanvas.parentNode) return;
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(function (p) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < -10) p.x = particleCanvas.width + 10;
          if (p.x > particleCanvas.width + 10) p.x = -10;
          if (p.y < -10) p.y = particleCanvas.height + 10;
          if (p.y > particleCanvas.height + 10) p.y = -10;
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    /* ── 9. HERO PILLS STAGGER ── */
    app.querySelectorAll('.hero-pill').forEach(function (pill, i) {
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(20px)';
      setTimeout(function () {
        pill.style.transition = 'opacity .5s, transform .5s';
        pill.style.opacity = '1';
        pill.style.transform = 'translateY(0)';
      }, 400 + i * 100);
    });

  }

  window.TinyStepsPrograms = { init: initProgramsPage };
})();
