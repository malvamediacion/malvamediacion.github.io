(function() {
  const COOKIE_KEY = 'malva_cookies_accepted';
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');

  function hideBanner() {
    banner.style.display = 'none';
  }

  function showBanner() {
    banner.style.display = 'block';
  }

  function setCookieConsent(accepted) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
    const cookieValue = accepted ? 'true' : 'false';
    document.cookie = `${COOKIE_KEY}=${cookieValue};expires=${expires.toUTCString()};path=/`;
    hideBanner();
  }

  function checkCookieConsent() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === COOKIE_KEY) {
        return value === 'true';
      }
    }
    return null;
  }

  acceptBtn.addEventListener('click', () => setCookieConsent(true));
  rejectBtn.addEventListener('click', () => setCookieConsent(false));

  if (checkCookieConsent() === null) {
    showBanner();
  }
})();
