/**
 * Tiny Steps SPA — Menú móvil (hamburger) y dropdowns por clic
 */
(function () {
  'use strict';

  function toggleMenu() {
    document.body.classList.toggle('nav-open');
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    document.querySelectorAll('.nav-links > li.has-open').forEach(function (li) {
      li.classList.remove('has-open');
    });
  }

  // Hamburger: abrir/cerrar menú
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#hamburger');
    if (btn) {
      e.preventDefault();
      toggleMenu();
      return;
    }
    // Cerrar menú al hacer clic en un enlace del nav (navegar)
    if (document.body.classList.contains('nav-open')) {
      var link = e.target.closest('.nav-links a[href^="#/"]');
      if (link) {
        closeMenu();
      }
    }
  });

  // En móvil, "About ▾" / "Programs ▾" / "Locations ▾" abren el dropdown por clic
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.nav-links > li > a[href^="#/"]');
    if (!a) return;
    var li = a.closest('li');
    if (!li || !li.querySelector('.dropdown')) return;
    // Solo en menú móvil abierto: toggle dropdown en vez de navegar
    if (document.body.classList.contains('nav-open')) {
      e.preventDefault();
      var wasOpen = li.classList.contains('has-open');
      document.querySelectorAll('.nav-links > li.has-open').forEach(function (el) {
        el.classList.remove('has-open');
      });
      if (!wasOpen) li.classList.add('has-open');
    }
  });
})();
