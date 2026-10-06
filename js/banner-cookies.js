/*
 * Banner de cookies con Consent Mode v2 básico. Autocontenido: un script, sin dependencias.
 *
 *   <script src="/banner-cookies.js" data-ga4-id="" defer></script>
 *   <a href="#" data-abrir-cookies>Cookies</a>
 *
 * data-ga4-id vacío o ausente = analítica apagada: el banner funciona pero nunca se pide nada a Google.
 * Con un ID (G-XXXXXXXXXX), gtag.js se pide solo después de Aceptar.
 * Marca de la página: [data-cta="principal"|"final"] y el evento 'formulario-enviado' (ver references/contracts.md).
 */
(function () {
  'use strict';

  var CLAVE = 'consentimiento-cookies';
  var AVISO = '/aviso-de-privacidad';
  var etiqueta = document.currentScript;
  var id = ((etiqueta && etiqueta.getAttribute('data-ga4-id')) || '').trim();
  var idValido = /^G-[A-Z0-9]{6,12}$/.test(id);
  var gtagCargado = false;
  var eventosActivos = false;
  var eventosRegistrados = false;
  var pantalla = null;
  var reabierto = false;
  var origen = null;
  var previo = null;

  // ---------- Consent Mode: todo denegado hasta que el visitante acepte ----------

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  function activarAnalitica() {
    if (!idValido) return;
    gtag('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    if (!gtagCargado) {
      gtagCargado = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', id);
    }
    eventosActivos = true;
    registrarEventos();
  }

  function desactivarAnalitica() {
    eventosActivos = false;
    if (gtagCargado) gtag('consent', 'update', { analytics_storage: 'denied' });
    borrarCookiesGA();
  }

  // Quita _ga y _ga_* del host actual y de sus dominios padre (gtag las escribe en el dominio raíz).
  function borrarCookiesGA() {
    var host = (window.location && window.location.hostname) || '';
    var dominios = [null];
    var partes = host.split('.');
    for (var i = 0; i < partes.length - 1; i++) dominios.push(partes.slice(i).join('.'));
    var nombres = String(document.cookie || '').split(';').map(function (c) { return c.split('=')[0].trim(); });
    nombres.forEach(function (n) {
      if (n !== '_ga' && n.indexOf('_ga_') !== 0) return;
      dominios.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax' + (d ? '; domain=' + d : '');
      });
    });
  }

  // ---------- Eventos clave: solo después de aceptar ----------

  function registrarEventos() {
    if (eventosRegistrados) return;
    eventosRegistrados = true;
    document.addEventListener('click', function (e) {
      if (!eventosActivos || !e.target || !e.target.closest) return;
      var cta = e.target.closest('[data-cta]');
      var posicion = cta && cta.getAttribute('data-cta');
      if (posicion === 'principal' || posicion === 'final') gtag('event', 'clic_cta', { posicion: posicion });
    });
    document.addEventListener('formulario-enviado', function () {
      if (eventosActivos) gtag('event', 'generate_lead');
    });
  }

  // ---------- Elección guardada ----------

  function guardada() { try { return window.localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { window.localStorage.setItem(CLAVE, v); } catch (e) { /* sin almacenamiento: se pregunta en cada visita */ } }

  // ---------- Estilos: variables CSS para adoptar la marca ----------

  var CSS = [
    ':where(:root){--cookies-fondo:#ffffff;--cookies-texto:#1b1b1b;--cookies-acento:#1b1b1b;--cookies-sobre-acento:#ffffff;',
    '--cookies-borde:#1b1b1b;--cookies-foco:#0b5fff;--cookies-radio:.5rem;--cookies-fuente:inherit}',
    '[data-banner-cookies]{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:2147483000;max-width:36rem;margin:0 auto;',
    'padding:1rem 1.25rem;background:var(--cookies-fondo);color:var(--cookies-texto);font-size:1rem;line-height:1.5;font-family:var(--cookies-fuente,inherit);',
    'border:2px solid var(--cookies-borde);border-radius:calc(var(--cookies-radio) + 1rem);box-shadow:0 .5rem 2rem rgba(0,0,0,.2)}',
    '[data-banner-cookies] p{margin:0 0 .75rem}',
    '[data-banner-cookies] .cookies-eleccion{font-weight:700}',
    '[data-banner-cookies] a{color:var(--cookies-texto);text-decoration:underline}',
    '[data-banner-cookies] .cookies-acciones{display:flex;gap:.75rem;flex-wrap:wrap}',
    '[data-banner-cookies] .cookies-boton{flex:1 1 8rem;min-height:44px;padding:.6rem 1.2rem;font:inherit;font-weight:700;',
    'cursor:pointer;background:var(--cookies-acento);color:var(--cookies-sobre-acento);border:2px solid var(--cookies-acento);',
    'border-radius:var(--cookies-radio)}',
    '@media (hover:hover){[data-banner-cookies] .cookies-boton:hover{box-shadow:inset 0 0 0 999px rgba(255,255,255,.18);text-decoration:underline}}',
    '[data-banner-cookies] a:focus-visible,[data-banner-cookies] .cookies-boton:focus-visible,[data-banner-cookies]:focus-visible',
    '{outline:3px solid var(--cookies-foco);outline-offset:2px}',
    '@media (prefers-reduced-motion:no-preference){[data-banner-cookies]{animation:cookies-entrada .25s ease-out}',
    '@keyframes cookies-entrada{from{opacity:0;transform:translateY(1rem)}to{opacity:1;transform:none}}}'
  ].join('');

  function inyectarEstilos() {
    var st = document.createElement('style');
    st.setAttribute('data-estilos-cookies', '');
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // ---------- Banner ----------

  function boton(accion, texto) {
    var b = document.createElement('button');
    b.setAttribute('type', 'button');
    b.setAttribute('data-accion', accion);
    b.className = 'cookies-boton';
    b.textContent = texto;
    return b;
  }

  // El banner es fijo: sin esto tapa el final de la página (pie, enlaces, botones).
  function reservarEspacio() {
    if (!pantalla) return;
    var alto = pantalla.offsetHeight || (pantalla.getBoundingClientRect && pantalla.getBoundingClientRect().height) || 0;
    var valor = 'calc(' + Math.ceil(alto) + 'px + 2rem)';
    document.body.style.paddingBottom = valor;
    document.documentElement.style.scrollPaddingBottom = valor;
  }

  function cerrar() {
    if (!pantalla) return;
    pantalla.remove();
    pantalla = null;
    reabierto = false;
    if (previo) {
      document.body.style.paddingBottom = previo.cuerpo;
      document.documentElement.style.scrollPaddingBottom = previo.html;
      previo = null;
    }
  }

  function elegir(valor, devolverFoco) {
    guardar(valor);
    cerrar();
    if (valor === 'aceptado') activarAnalitica(); else desactivarAnalitica();
    if (devolverFoco && devolverFoco.focus) devolverFoco.focus();
  }

  function mostrar(desde) {
    if (pantalla) { pantalla.focus(); return; }
    var b = document.createElement('div');
    b.setAttribute('data-banner-cookies', '');
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-modal', 'false');
    b.setAttribute('aria-labelledby', 'cookies-titulo');
    b.setAttribute('tabindex', '-1');

    var p = document.createElement('p');
    p.setAttribute('id', 'cookies-titulo');
    p.textContent = 'Usamos cookies para medir cuántas personas visitan el sitio. Tú decides si las aceptas. Más detalles en el ';
    var a = document.createElement('a');
    a.setAttribute('href', AVISO);
    a.textContent = 'aviso de privacidad';
    p.appendChild(a);
    p.appendChild(document.createTextNode('.'));

    var acciones = document.createElement('div');
    acciones.className = 'cookies-acciones';
    var si = boton('aceptar', 'Aceptar');
    var no = boton('rechazar', 'Rechazar');
    si.addEventListener('click', function () { elegir('aceptado', desde); });
    no.addEventListener('click', function () { elegir('rechazado', desde); });
    acciones.appendChild(si);
    acciones.appendChild(no);

    b.appendChild(p);
    var actual = guardada();
    if (desde && (actual === 'aceptado' || actual === 'rechazado')) {
      var e = document.createElement('p');
      e.className = 'cookies-eleccion';
      e.textContent = 'Elección actual: cookies ' + (actual === 'aceptado' ? 'aceptadas' : 'rechazadas') + '.';
      b.appendChild(e);
    }
    b.appendChild(acciones);
    // Primero en el documento: el teclado lo alcanza sin recorrer toda la página.
    document.body.insertBefore(b, document.body.firstChild);
    pantalla = b;
    reabierto = !!desde;
    origen = desde || null;
    previo = { cuerpo: document.body.style.paddingBottom || '', html: document.documentElement.style.scrollPaddingBottom || '' };
    reservarEspacio();
    if (desde) b.focus();
  }

  function iniciar() {
    inyectarEstilos();
    document.addEventListener('click', function (e) {
      var enlace = e.target && e.target.closest && e.target.closest('[data-abrir-cookies]');
      if (enlace) {
        e.preventDefault();
        mostrar(enlace);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !pantalla || !reabierto) return;
      var vuelta = origen;
      cerrar();
      if (vuelta && vuelta.focus) vuelta.focus();
    });
    if (window.addEventListener) window.addEventListener('resize', reservarEspacio);
    var v = guardada();
    if (v === 'aceptado') activarAnalitica();
    else if (v !== 'rechazado') mostrar(null);
  }

  if (document.body) iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
