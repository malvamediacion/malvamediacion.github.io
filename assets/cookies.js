(function () {
  'use strict';
  var COOKIE_KEY = 'malva_cookies_accepted';
  var banner = document.getElementById('cookieBanner');
  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');

  if (!banner || !acceptBtn || !rejectBtn) { return; }

  function hideBanner() { banner.hidden = true; }
  function showBanner() { banner.hidden = false; }

  function setCookieConsent(accepted) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = COOKIE_KEY + '=' + (accepted ? 'true' : 'false') +
      ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
    hideBanner();
  }

  function checkCookieConsent() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].trim().split('=');
      if (parts[0] === COOKIE_KEY) { return parts[1] === 'true'; }
    }
    return null;
  }

  acceptBtn.addEventListener('click', function () { setCookieConsent(true); });
  rejectBtn.addEventListener('click', function () { setCookieConsent(false); });

  if (checkCookieConsent() === null) { showBanner(); }
})();
