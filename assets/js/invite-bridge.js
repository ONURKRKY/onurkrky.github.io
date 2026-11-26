(function() {
  try {
    var GAMES = {
      tavla: {
        scheme: 'tavla',
        pkg: 'com.darkrock.tavla',
        basePath: '/tavla/',
        bg: '#241409',
        btnColor: '#160B04',
        labels: {
          tr: '🎲 Tavla Uygulamasında Aç',
          en: '🎲 Open in Tavla App',
          ar: '🎲 فتح في تطبيق الطاولة',
          ru: '🎲 Открыть в приложении Нарды',
          de: '🎲 In der Tavla-App öffnen'
        }
      },
      pisti: {
        scheme: 'pisti',
        pkg: 'com.darkrock.pisti',
        basePath: '/pisti/',
        bg: '#0f2b1d',
        btnColor: '#0A1912',
        labels: {
          tr: '🃏 Pişti Uygulamasında Aç',
          en: '🃏 Open in Pishti App',
          es: '🃏 Abrir en la app Pishti',
          zh: '🃏 在皮什蒂应用中打开',
          ar: '🃏 فتح في تطبيق البصرة',
          ru: '🃏 Открыть в приложении Пишти',
          de: '🃏 In der Pishti-App öffnen'
        }
      },
      konken: {
        scheme: 'konken',
        pkg: 'com.darkrock.konken',
        basePath: '/konken/',
        bg: '#0f2b1d',
        btnColor: '#0A1912',
        labels: {
          tr: '🃏 Konken Uygulamasında Aç',
          en: '🃏 Open in Konken App',
          es: '🃏 Abrir en la app Konken',
          zh: '🃏 在 Konken 应用中打开',
          ar: '🃏 فتح في تطبيق كونكن',
          ru: '🃏 Открыть в приложении Конкен',
          de: '🃏 In der Konken-App öffnen'
        }
      }
    };

    var scriptEl = document.currentScript || document.querySelector('script[data-game]');
    var gameKey = scriptEl ? scriptEl.getAttribute('data-game') : '';
    var cfg = GAMES[gameKey];
    if (!cfg) return;

    var search = window.location.search;
    var hash = window.location.hash;
    var rawQuery = search || hash || '';
    var cleanParams = rawQuery.replace(/^#?\/?\??/, '');
    if (!cleanParams || (cleanParams.indexOf('mac=') === -1 && cleanParams.indexOf('match=') === -1)) {
      return;
    }

    var isAndroid = /Android/i.test(navigator.userAgent);
    var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!isAndroid && !isIOS) return;

    var langMatch = cleanParams.match(/(?:^|&)lang=([a-z]{2})/i);
    var lang = langMatch ? langMatch[1].toLowerCase() : 'tr';
    var btnLabel = cfg.labels[lang] || cfg.labels.tr;

    var basePath = window.location.pathname || cfg.basePath;
    var webParams = cleanParams + (cleanParams.indexOf('web=1') === -1 ? '&web=1' : '');
    var fallbackUrl = window.location.origin + basePath + '?' + webParams;

    var autoIntentUrl = 'intent://join?' + cleanParams +
      '#Intent;scheme=' + cfg.scheme + ';package=' + cfg.pkg +
      ';S.browser_fallback_url=' + encodeURIComponent(fallbackUrl) + ';end';
    var buttonIntentUrl = 'intent://join?' + cleanParams +
      '#Intent;scheme=' + cfg.scheme + ';package=' + cfg.pkg + ';end';
    var openUrl = isAndroid ? buttonIntentUrl : (cfg.scheme + '://join?' + cleanParams);

    function showOpenAppBanner() {
      if (!document.body || document.getElementById('dr-open-app-banner')) return;
      var banner = document.createElement('div');
      banner.id = 'dr-open-app-banner';
      banner.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;display:flex;align-items:center;gap:8px;background:' + cfg.bg + ';border:1.5px solid #D4AF37;border-radius:14px;padding:8px 12px;box-shadow:0 8px 24px rgba(0,0,0,0.65);max-width:92vw;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;';

      var openLink = document.createElement('a');
      openLink.href = openUrl;
      openLink.textContent = btnLabel;
      openLink.style.cssText = 'background:#EAB308;color:' + cfg.btnColor + ';font-weight:700;font-size:13px;padding:7px 12px;border-radius:10px;text-decoration:none;white-space:nowrap;';

      var closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.textContent = '✕';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.style.cssText = 'background:transparent;border:none;color:#FFE082;font-size:16px;font-weight:700;cursor:pointer;padding:4px 6px;line-height:1;';
      closeBtn.onclick = function() {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      };

      banner.appendChild(openLink);
      banner.appendChild(closeBtn);
      document.body.appendChild(banner);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showOpenAppBanner);
    } else {
      showOpenAppBanner();
    }

    if (isAndroid && cleanParams.indexOf('web=1') === -1) {
      setTimeout(function() {
        window.location.href = autoIntentUrl;
      }, 120);
    }
  } catch (e) {}
})();
