/**
 * Tiny Steps SPA — History API (URLs limpias /programs, /contact — sin #/)
 * SEO: título, meta description, canonical y Open Graph por ruta.
 */
(function (global) {
  'use strict';

  /** Absoluto desde la raíz del sitio (válido con cualquier pathname, p. ej. /programs). */
  var VIEWS_BASE = '/views/';
  var ALLOWED_ROUTES = [
    'home',
    'aboutus',
    'programs',
    'activities',
    'team',
    'testimonials',
    'contact'
  ];

  var TITLES = {
    home: 'Home | Tiny Steps Learning Center',
    aboutus: 'About Us | Tiny Steps Learning Center',
    programs: 'Programs | Tiny Steps Learning Center',
    activities: 'Activities | Tiny Steps Learning Center',
    team: 'Our Team | Tiny Steps Learning Center',
    testimonials: 'Testimonials | Tiny Steps Learning Center',
    contact: 'Contact | Tiny Steps Learning Center'
  };

  var DESCRIPTIONS = {
    home:
      'Tiny Steps Learning Center in Paterson, NJ — early childhood education for ages 6 weeks to 5 years. Safe, nurturing care. Schedule a tour today.',
    aboutus:
      'Discover Tiny Steps Learning Center in Paterson, NJ: mission, vision, our story, and what makes our early learning community special.',
    programs:
      'Programs for infants, toddlers, preschool, after school, drop-in care, and summer camp at Tiny Steps Learning Center in Paterson, NJ.',
    activities:
      'Activities and enrichment at Tiny Steps Learning Center — Paterson, NJ early childhood programs.',
    team:
      'Meet the team at Tiny Steps Learning Center — dedicated educators in Paterson, NJ.',
    testimonials:
      'What families say about Tiny Steps Learning Center in Paterson, NJ — reviews and experiences.',
    contact:
      'Contact Tiny Steps Learning Center in Paterson, NJ: three locations, phone (973) 523-5883, tours, and enrollment information.'
  };

  function normalizeRoute(route) {
    if (!route) return 'home';
    if (route === 'locations') return 'contact';
    if (route === 'blog') return 'home';
    return ALLOWED_ROUTES.indexOf(route) !== -1 ? route : 'home';
  }

  /** Ruta lógica → path en el navegador (siempre desde la raíz del sitio). */
  function routeToPath(route) {
    route = normalizeRoute(route);
    return route === 'home' ? '/' : '/' + route;
  }

  /** Pathname → ruta lógica. Rutas desconocidas → home. */
  function pathToRoute(pathname) {
    var p = (pathname || '').replace(/\/+$/, '') || '/';
    if (p === '/' || p === '' || /\/index\.html$/i.test(p)) return 'home';
    var seg = p.replace(/^\/+/, '').split('/')[0].toLowerCase();
    if (seg === 'home') return 'home';
    if (seg === 'locations') return 'contact';
    if (seg === 'blog') return 'home';
    return ALLOWED_ROUTES.indexOf(seg) !== -1 ? seg : 'home';
  }

  function isSpaPath(pathname) {
    var p = (pathname || '').replace(/\/+$/, '') || '/';
    if (p === '/' || p === '/home' || /\/index\.html$/i.test(p)) return true;
    var seg = p.replace(/^\/+/, '').split('/')[0].toLowerCase();
    return ALLOWED_ROUTES.indexOf(seg) !== -1;
  }

  function getSiteOrigin() {
    var meta = document.querySelector('meta[name="site-origin"]');
    var raw = meta && meta.getAttribute('content');
    if (raw) return raw.replace(/\/$/, '');
    return global.location.origin || '';
  }

  function setSeoForRoute(route) {
    route = normalizeRoute(route);
    var title = TITLES[route] || TITLES.home;
    var desc = DESCRIPTIONS[route] || DESCRIPTIONS.home;
    var origin = getSiteOrigin();
    var path = routeToPath(route);
    var pageUrl = origin ? origin + (path === '/' ? '/' : path) : '';
    var imageUrl = origin ? origin + '/images/cropped-logo-head.png' : '';

    var setContent = function (sel, value) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute('content', value);
    };
    var setHref = function (sel, value) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute('href', value);
    };

    setContent('#meta-description', desc);
    setContent('#meta-og-title', title);
    setContent('#meta-og-description', desc);
    setContent('#meta-tw-title', title);
    setContent('#meta-tw-description', desc);

    if (pageUrl) {
      setContent('#meta-og-url', pageUrl);
      setHref('#link-canonical', pageUrl);
    }
    if (imageUrl) {
      setContent('#meta-og-image', imageUrl);
      setContent('#meta-tw-image', imageUrl);
    }
  }

  function getRoute() {
    return pathToRoute(global.location.pathname);
  }

  function getViewPath(route) {
    var name = normalizeRoute(route);
    return VIEWS_BASE + name + '.html';
  }

  function loadView(path) {
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
    route = normalizeRoute(route);
    document.title = TITLES[route] || TITLES.home;
  }

  /**
   * @param {string} route
   * @param {{ skipPush?: boolean }} opts — skipPush: carga inicial, popstate o migración hash (no añade entrada al historial).
   */
  function navigate(route, opts) {
    opts = opts || {};
    route = normalizeRoute(route);

    if (!opts.skipPush) {
      var targetPath = routeToPath(route);
      var current =
        global.location.pathname.replace(/\/$/, '') || '/';
      var normalizedTarget = targetPath.replace(/\/$/, '') || '/';
      if (current !== normalizedTarget) {
        global.history.pushState({ tsRoute: route }, '', targetPath);
      }
    }

    setTitle(route);
    setSeoForRoute(route);
    var viewPath = getViewPath(route);
    return loadView(viewPath)
      .then(function (html) {
        render(html);
        global.scrollTo(0, 0);
        var event = new CustomEvent('viewLoaded', { detail: { route: route } });
        global.dispatchEvent(event);
      })
      .catch(function (err) {
        console.error(err);
        if (route !== 'home') {
          global.history.replaceState({ tsRoute: 'home' }, '', routeToPath('home'));
          navigate('home', { skipPush: true });
        }
      });
  }

  function migrateHashToPath() {
    var h = global.location.hash || '';
    if (!/^#\/[^/]/.test(h) && h !== '#/') return;
    var hr = h.slice(2).split('/')[0];
    if (hr === 'locations') hr = 'contact';
    if (hr === 'blog') hr = 'home';
    var route = normalizeRoute(hr || 'home');
    global.history.replaceState({ tsRoute: route }, '', routeToPath(route));
  }

  /**
   * Convierte href de un enlace interno (/programs, #/programs) en nombre de ruta; null si no es SPA.
   */
  function parseHrefToRoute(href) {
    if (!href || href === '#') return null;
    if (/^(mailto|tel|javascript):/i.test(href)) return null;
    if (href.charAt(0) === '#' && href.indexOf('#/') !== 0) return null;
    if (href.indexOf('#/') === 0) {
      var legacy = href.slice(2).split('/')[0];
      if (legacy === 'locations') legacy = 'contact';
      if (legacy === 'blog') legacy = 'home';
      return normalizeRoute(legacy || 'home');
    }
    try {
      var url = new URL(href, global.location.href);
      if (url.origin !== global.location.origin) return null;
      if (!isSpaPath(url.pathname)) return null;
      return pathToRoute(url.pathname);
    } catch (err) {
      return null;
    }
  }

  function onDocumentClick(e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var route = parseHrefToRoute(a.getAttribute('href') || '');
    if (route === null) return;
    e.preventDefault();
    navigate(route, { skipPush: false });
  }

  function init() {
    migrateHashToPath();
    navigate(getRoute(), { skipPush: true });

    global.addEventListener('popstate', function () {
      navigate(getRoute(), { skipPush: true });
    });

    global.document.addEventListener('click', onDocumentClick, false);
  }

  global.TinyStepsRouter = {
    navigate: navigate,
    getRoute: getRoute,
    init: init,
    routeToPath: routeToPath,
    pathToRoute: pathToRoute,
    parseHrefToRoute: parseHrefToRoute
  };
})(typeof window !== 'undefined' ? window : this);
