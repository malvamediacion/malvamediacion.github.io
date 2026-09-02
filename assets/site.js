/* ==========================================================================
   MALVA MEDIACIÓN · Comportamiento compartido
   - Menú móvil accesible
   - Widget de chat de WhatsApp (con gestión de foco y tecla Escape)
   ========================================================================== */
(function () {
  'use strict';

  /* ── Menú de navegación móvil ── */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Cerrar el menú al pulsar un enlace (navegación en la misma pestaña)
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Widget de chat ── */
  var chatToggle = document.getElementById('chatToggle');
  var chatWidget = document.getElementById('chatWidget');
  var chatClose = document.getElementById('chatClose');

  if (chatToggle && chatWidget) {
    var openChat = function () {
      chatWidget.hidden = false;
      chatToggle.setAttribute('aria-expanded', 'true');
      if (chatClose) { chatClose.focus(); }
    };
    var closeChat = function () {
      chatWidget.hidden = true;
      chatToggle.setAttribute('aria-expanded', 'false');
      chatToggle.focus();
    };

    chatToggle.addEventListener('click', function () {
      if (chatWidget.hidden) { openChat(); } else { closeChat(); }
    });
    if (chatClose) { chatClose.addEventListener('click', closeChat); }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !chatWidget.hidden) { closeChat(); }
    });
  }
})();
