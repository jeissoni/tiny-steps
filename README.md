# Tiny Steps — sitio estático (SPA por hash)

Referencias de producto y contenido:

- `TS web content.md` — copy y jerarquía de contenido público
- `TS web developer 1.md` — estructura, comportamiento, CTAs y notas técnicas

---

## Paleta de colores

| Token | Valor |
|-------|--------|
| `--pink` | `#ED336B` |
| `--blue` | `#0581D6` |
| `--purple` | `#6246CC` |
| `--magenta` | `#CB2E90` |
| `--red` | `#EF4036` |
| `--orange` | `#F67F26` |
| `--yellow` | `#FFB317` |
| `--green` | `#8DC53D` |
| `--teal` | `#03B0AF` |
| `--dark-blue` | `#21187C` |
| `--gray` | `#9B9A9A` |

*(Los valores pueden variar ligeramente según `css/base.css` / temas por página.)*

---

## Qué hay implementado (resumen)

- Rutas SPA en `js/router.js`: `home`, `aboutus`, `programs`, `activities`, `team`, `testimonials`, `contact` (la ruta `#/blog` redirige a home; no hay vista de blog).
- Cabecera actual (`index.html`): Home, About, Programs, Contact (+ CTA Enroll). **No** aparecen en el menú superior: Locations, Careers (aunque algunas rutas existen).
- `#/locations` se redirige a la vista **contact** (no hay página “Locations” dedicada).
- **Contact**: acciones rápidas, centros, mapa, formulario, redes (alineado en gran parte con TS).

---

## Secciones / ítems que aún no están (o incompletos) según los TS

Comparado con `TS web content.md` y `TS web developer 1.md`, esto es lo que falta o no coincide aún.

### Navegación y rutas

| Especificación TS | Estado actual |
|-------------------|----------------|
| Orden nav: Home → About → Programs → **Locations** → **Careers** → Contact | Falta **Locations** y **Careers** como ítems del menú principal. Blog no está en el sitio (evitar thin content hasta tener artículos). |
| Dropdowns con subenlaces (desktop) y comportamiento móvil descrito en TS dev | Sin mega-menús / dropdowns según spec. |
| Evitar redirects innecesarios (nota TS dev §16) | Hash `#/locations` → `contact` es un redirect intencional. |

### About (`TS web content.md` — dropdown About Us)

| Subsección / bloque | Estado |
|---------------------|--------|
| About, Mission, Vision, History, Philosophy, Core Values, Quick Stats | Cubierto en `views/aboutus.html` (no siempre como anclas `#` con scroll suave como pide TS dev). |
| **Partners & Associations** | No hay bloque dedicado con la lista (Grow NJ Kids, Brightwheel, CACFP, 4CS, etc.). |
| **Why Tiny Steps** (8 puntos) en About | El contenido está en **Home** (“What Makes Us Different”); en About no hay sección equivalente ni ancla `#why-tiny-steps`. |
| **Our Commitment** (largo: seguridad, salud, aprendizaje, familias, calidad) | No implementado como sección. |
| **Careers – Join Our Team** (dentro del árbol About en content) | No hay sección About dedicada; Careers solo enlazado desde Contact/mailto según diseño actual. |
| **Upcoming Events** | No hay calendario / sección de eventos. |
| **Refer a Friend / Referral Program** | No hay página ni bloque con formulario CTA “Refer Now”. |
| **FAQs & Policies** (acordeón + políticas + WhatsApp) | No hay página ni sección. |
| **Resources for Families** (enlaces y bloques del MD) | No hay página ni sección. |
| **Our Store** (coming soon) | No hay vista ni entrada en nav. |

### Programs

| Especificación | Estado |
|----------------|--------|
| Una página con secciones + scroll suave desde dropdown | Revisar si todos los programas del MD tienen anclas y CTA “Enroll” hacia formulario futuro (p. ej. Paperform). |

### Locations (página propia)

| Especificación TS dev | Estado |
|------------------------|--------|
| Página Locations con orden fijo de 3 centros, fotos, texto, **un mapa con 3 pins**, “What All Our Locations Offer”, CTA | No hay vista `locations.html`; contenido parcialmente en **Contact**. |
| No redirigir solo a Google Maps; contenido completo en sitio | A validar frente al embed actual. |

### Careers (página)

| Especificación | Estado |
|----------------|--------|
| Página o sección con “Apply Here”, mensaje *Application Portal Coming Soon*, `hiring@tinysteps.io` | No hay ruta `#/careers`; solo enlaces externos / Contact. |

### Contact

| Especificación | Estado |
|----------------|--------|
| Intro, Quick Actions 2×2, ubicaciones, mapa, redes, CTA final | Revisar si falta algún CTA final según última versión del MD (p. ej. bloque “Not sure where to start?”). |

### Otros (TS web developer 1.md)

| Ítem | Estado |
|------|--------|
| **Store** — nav, cart, “Coming Soon” | Pendiente. |
| **Referral** — Paperform / embed | Pendiente. |
| **FAQs** — acordeón; pregunta 7 con detalle 4CS | Pendiente. |
| **Resources** — bloques y enlaces externos en nueva pestaña | Pendiente. |
| CTAs globales: Schedule a Tour, Enroll, Chat (WhatsApp `wa.me`) | Repartidos en sitio; unificar según checklist TS. |
| Smooth scroll en About/Programs | Parcial o pendiente según anclas reales en HTML. |

---

## Próximos pasos sugeridos (prioridad)

1. Añadir **Partners** + **Our Commitment** + **FAQs** + **Resources** (aunque sea una página cada una o anclas en About).  
2. Decidir: **página Locations** dedicada vs. solo Contact (y alinear con TS dev).  
3. **Careers** (`#/careers`) con copy del MD.  
4. **Store** y **Referral** como páginas “Coming Soon” + CTA.  
5. (Cuando haya contenido real) **Blog** como sección nueva + `views/blog.html` y enlaces en footer.

---

*Última revisión de esta lista frente a los archivos TS en el repo; actualizar al implementar nuevas vistas.*
