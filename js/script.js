/**
 * Tiny Steps SPA — Menú móvil (hamburger)
 */
(function () {
  'use strict';

  function toggleMenu() {
    document.body.classList.toggle('nav-open');
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#hamburger');
    if (btn) {
      e.preventDefault();
      toggleMenu();
      return;
    }
    if (document.body.classList.contains('nav-open')) {
      var link = e.target.closest('.nav-links a');
      if (link) closeMenu();
    }
  });
})();
