/* ============================================================
   The Class Project · js/script.js · 2026
   Universidad Diego Portales — Escuela de Sociología
   FONDECYT de Iniciación N° 11240249, ANID 2024–2027

   Módulos:
   1. Año dinámico en el footer
   2. Nav mobile (hamburger toggle + cierre)
   3. Nav sombra al hacer scroll (.is-scrolled)
   4. Enlace activo por página
   5. IntersectionObserver — fade-in de logos y cards
   ============================================================ */

'use strict';

/* ─── 1. AÑO DINÁMICO EN EL FOOTER ─────────────────────────────
   Actualiza el span#footer-year con el año actual.
   Así nunca queda desactualizado sin tocar el HTML.
   ─────────────────────────────────────────────────────────────── */
(function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* ─── 2. NAV MOBILE — HAMBURGER TOGGLE ──────────────────────────
   El botón #nav-toggle muestra/oculta #nav-mobile añadiendo
   la clase .is-open. También actualiza aria-expanded para
   accesibilidad.

   Cierra el menú:
   - Al hacer clic en cualquier link del menú mobile
   - Al presionar la tecla Escape
   - Al hacer clic fuera del menú (en el body)
   ─────────────────────────────────────────────────────────────── */
(function initNavMobile() {
  const toggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');

  if (!toggle || !mobileMenu) return;

  /* Abre o cierra el menú según su estado actual */
  function toggleMenu(open) {
    const isOpen = (open !== undefined) ? open : mobileMenu.classList.contains('is-open');

    if (isOpen) {
      /* CERRAR */
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    } else {
      /* ABRIR */
      mobileMenu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    }
  }

  /* Clic en el botón hamburger */
  toggle.addEventListener('click', function () {
    toggleMenu();
  });

  /* Clic en cualquier link del menú mobile → cerrar */
  mobileMenu.querySelectorAll('.nav__mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true); /* forzar cierre */
    });
  });

  /* Tecla Escape → cerrar */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      toggleMenu(true);
      toggle.focus(); /* devolver foco al botón */
    }
  });

  /* Clic fuera del menú → cerrar */
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });
})();


/* ─── 3. NAV SOMBRA AL SCROLL (.is-scrolled) ────────────────────
   Cuando el usuario baja más de 10px, añade .is-scrolled al <nav>.
   El CSS usa esa clase para mostrar una sombra sutil, diferenciando
   la barra de navegación del contenido que queda debajo.
   ─────────────────────────────────────────────────────────────── */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  /* Verificar al cargar (por si la página abre en mitad del scroll) */
  onScroll();

  /* Escuchar el evento scroll con passive: true para mejor rendimiento */
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─── 4. ENLACE ACTIVO POR PÁGINA ───────────────────────────────
   Compara la ruta actual (pathname) con el href de cada link
   del nav y asigna aria-current="page" + clase .nav__link--active
   al que corresponde.

   Funciona tanto en la nav principal como en la mobile.
   Nota: el HTML ya trae estos atributos en /index.html,
   este módulo los actualiza dinámicamente en todas las páginas.
   ─────────────────────────────────────────────────────────────── */
(function setActiveLinks() {
  /* Ruta actual, normalizada (sin trailing slash excepto para home) */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  /* Links del nav principal */
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';

    if (linkPath === currentPath) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('nav__link--active');
      link.removeAttribute('aria-current');
    }
  });

  /* Links del menú mobile */
  document.querySelectorAll('.nav__mobile-link').forEach(function (link) {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
})();


/* ─── 6. MODALES DE PERFIL ───────────────────────────────────────
   Cada botón .profile-card__btn tiene data-modal="<id-del-modal>".
   Al hacer clic, se elimina el atributo [hidden] del modal objetivo.
   El modal se cierra con:
     - El botón .profile-modal__close
     - Clic en el backdrop .profile-modal__backdrop
     - Tecla Escape
   ─────────────────────────────────────────────────────────────── */
(function initProfileModals() {
  var lastFocused = null;

  /* Abrir modal */
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;

    lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; /* evitar scroll del fondo */

    /* Mover foco al botón de cierre para accesibilidad */
    var closeBtn = modal.querySelector('.profile-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  /* Cerrar modal */
  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  /* Clic en botones "Ver perfil" */
  document.querySelectorAll('.profile-card__btn[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-modal'));
    });
  });

  /* Clic en el botón X o en el backdrop → cerrar */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.profile-modal__close')) {
      closeModal(e.target.closest('.profile-modal'));
    }
    if (e.target.classList.contains('profile-modal__backdrop')) {
      closeModal(e.target.closest('.profile-modal'));
    }
  });

  /* Tecla Escape → cerrar el modal abierto */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openModals = document.querySelectorAll('.profile-modal:not([hidden])');
      openModals.forEach(function (modal) { closeModal(modal); });
    }
  });
})();


/* ─── 5. INTERSECTIONOBSERVER — FADE-IN ─────────────────────────
   Anima la entrada de .logo-item y .fade-in al viewport.
   Las .card NO se ocultan: son contenido visible siempre.

   Cómo usar en HTML: agrega class="fade-in" a cualquier elemento.
   ─────────────────────────────────────────────────────────────── */
(function initFadeIn() {
  var targets = document.querySelectorAll('.logo-item, .fade-in');

  if (!targets.length) return;

  /* Sin soporte de IntersectionObserver: mostrar todo de inmediato */
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); /* animar solo una vez */
      }
    });
  }, {
    threshold: 0,              /* dispara al primer pixel visible */
    rootMargin: '0px 0px -20px 0px'
  });

  targets.forEach(function (el) { observer.observe(el); });
})();
