/**
 * Router SPA — Hash-based routing, carga vistas en #app
 */
(function (global) {
  'use strict';

  var VIEWS_BASE = 'views/';
  var TITLES = {
    home: 'Home | Tiny Steps Learning Center',
    aboutus: 'About Us | Tiny Steps Learning Center',
    programs: 'Programs | Tiny Steps Learning Center',
    activities: 'Activities | Tiny Steps Learning Center',
    team: 'Our Team | Tiny Steps Learning Center',
    testimonials: 'Testimonials | Tiny Steps Learning Center',
    locations: 'Locations | Tiny Steps Learning Center',
    blog: 'Blog | Tiny Steps Learning Center',
    contact: 'Contact | Tiny Steps Learning Center'
  };

  function getRoute() {
    var hash = (global.location.hash || '#/').slice(1).replace(/^\//, '');
    return hash || 'home';
  }

  function getViewPath(route) {
    var allowed = ['home', 'aboutus', 'programs', 'activities', 'team', 'testimonials', 'locations', 'blog', 'contact'];
    var name = allowed.indexOf(route) !== -1 ? route : 'home';
    return VIEWS_BASE + name + '.html';
  }

  function loadView(path) {
    // Evita respuestas cacheadas (Live Server a veces sirve versiones antiguas)
    return fetch(path, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('View not found: ' + path);
      return res.text();
    });
  }

  function render(html) {
    var app = document.getElementById('app');
    if (app) app.innerHTML = html;
  }

  function setTitle(route) {
    var title = TITLES[route] || TITLES.home;
    document.title = title;
  }

  /**
   * Navega a una ruta: carga la vista y la pinta en #app.
   */
  function navigate(route) {
    route = route || getRoute();
    setTitle(route);
    var path = getViewPath(route);
    return loadView(path)
      .then(function (html) {
        render(html);
        // En SPA, aseguramos que cada ruta inicie arriba.
        global.scrollTo(0, 0);
        var event = new CustomEvent('viewLoaded', { detail: { route: route } });
        global.dispatchEvent(event);
      })
      .catch(function (err) {
        console.error(err);
        if (route !== 'home') navigate('home');
      });
  }

  function init() {
    // Siempre que cargue la página, navegamos a la ruta
    // actual (derivada del hash). Si no hay hash, getRoute()
    // devuelve 'home', así que se carga la vista home.
    navigate(getRoute());

    global.addEventListener('hashchange', function () {
      navigate(getRoute());
    });
  }

  global.TinyStepsRouter = {
    navigate: navigate,
    getRoute: getRoute,
    init: init
  };
})(typeof window !== 'undefined' ? window : this);
