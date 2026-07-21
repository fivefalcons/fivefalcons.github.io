(function () {
  'use strict';

  const brandAssets = {
    header: '/assets/five-falcons-header.png',
    emblem: '/assets/five-falcons-emblem.png',
    full: '/assets/five-falcons-full.png'
  };

  const isHomepage = document.body && document.querySelector('.hero-grid-overlay');

  function ensureStylesheet(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }

  if (isHomepage) {
    ensureStylesheet('visual-upgrade.css');
    ensureStylesheet('realistic-upgrade.css');
    ensureStylesheet('trust-strip-fix.css');
  }
  ensureStylesheet('/logo-integration.css');

  function ensureHeadLink(rel, href, type) {
    let link = document.querySelector('link[rel="' + rel + '"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
    if (type) link.type = type;
    return link;
  }

  ensureHeadLink('icon', brandAssets.emblem, 'image/png');
  ensureHeadLink('apple-touch-icon', brandAssets.emblem, 'image/png');
  ensureHeadLink('manifest', '/site.webmanifest', 'application/manifest+json');

  document.querySelectorAll('a.brand').forEach(function (brand) {
    const logo = document.createElement('img');
    logo.className = 'brand-logo-wide';
    logo.src = brandAssets.header;
    logo.alt = 'Five Falcons Express Inc';
    logo.decoding = 'async';

    if (brand.classList.contains('footer-brand')) {
      logo.classList.add('brand-logo-footer');
    }
    if (brand.classList.contains('centered-brand')) {
      logo.classList.add('brand-logo-centered');
    }

    logo.addEventListener('error', function () {
      brand.textContent = 'Five Falcons Express Inc';
      brand.classList.add('brand-text-fallback');
    }, { once: true });

    brand.replaceChildren(logo);
  });

  document.querySelectorAll('.hero-brand-panel, .logo-watermark').forEach(function (element) {
    element.remove();
  });

  if (isHomepage) {
    const visualBrandArea = document.querySelector('.visual-topbar > div:first-child');
    if (visualBrandArea) {
      const fullLogo = document.createElement('img');
      fullLogo.className = 'hero-full-logo';
      fullLogo.src = brandAssets.full;
      fullLogo.alt = 'Five Falcons Express Inc logo';
      fullLogo.decoding = 'async';
      fullLogo.addEventListener('error', function () {
        visualBrandArea.innerHTML = '<span class="visual-kicker">Five Falcons network</span><strong>Hook → Move → Drop</strong>';
      }, { once: true });
      visualBrandArea.replaceChildren(fullLogo);
    }

    const routeStage = document.querySelector('.route-stage');
    if (routeStage) {
      const oldRouteMap = routeStage.querySelector('.route-map');
      if (oldRouteMap) {
        const accurateMap = document.createElement('img');
        accurateMap.className = 'real-route-map';
        accurateMap.src = 'assets/animated-lower48-network.svg';
        accurateMap.alt = 'Accurate lower 48 United States map with animated representative freight routes and semi trucks';
        accurateMap.decoding = 'async';
        oldRouteMap.replaceWith(accurateMap);
      }
    }

    const networkWrap = document.querySelector('.network-map-wrap');
    if (networkWrap) {
      const oldNetworkMap = networkWrap.querySelector('.network-map');
      if (oldNetworkMap) {
        const networkMap = document.createElement('img');
        networkMap.className = 'real-network-map';
        networkMap.src = 'assets/animated-lower48-network.svg';
        networkMap.alt = 'Accurate contiguous United States service-area map with representative animated freight routes';
        networkMap.loading = 'lazy';
        networkMap.decoding = 'async';
        oldNetworkMap.replaceWith(networkMap);
      }
    }

    const powerVisual = document.querySelector('.power-visual');
    if (powerVisual) {
      powerVisual.classList.add('realistic-truck-visual');
      powerVisual.innerHTML = '<img src="assets/realistic-power-only-tractor.svg" alt="" loading="lazy" decoding="async">';
    }

    const hookVisual = document.querySelector('.hook-visual');
    if (hookVisual) {
      hookVisual.classList.add('realistic-truck-visual');
      hookVisual.innerHTML = '<img src="assets/realistic-hookdrop-semi.svg" alt="" loading="lazy" decoding="async">';
    }

    const smsConsentText = document.querySelector('.sms-consent .checkbox-label span');
    if (smsConsentText) {
      smsConsentText.textContent = 'I consent to receive informational and conversational SMS messages from Five Falcons Express Inc at the phone number provided, including load updates, pickup and delivery status, appointment information, document requests, and account support. Messaging frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for assistance. Consent is not a condition of purchasing goods or services.';
    }

    const smsDisclosure = document.querySelector('.sms-consent > p:not(.form-error)');
    if (smsDisclosure) {
      smsDisclosure.innerHTML = 'SMS consent is optional and unchecked by default. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.';
    }

    document.querySelectorAll('a[href="privacy-policy.html"]').forEach(function (link) {
      link.href = '/privacy-policy/';
    });
    document.querySelectorAll('a[href="sms-terms.html"]').forEach(function (link) {
      link.href = '/terms-and-conditions/';
    });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('#current-year').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, activeObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = String(Math.min(index % 4, 3) * 80) + 'ms';
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  const form = document.querySelector('#contact-form');
  const phoneInput = document.querySelector('#phone');
  const smsCheckbox = document.querySelector('#sms-consent');
  const smsError = document.querySelector('#sms-error');
  const submittedAt = document.querySelector('#submitted-at');

  if (form && phoneInput && smsCheckbox && smsError && submittedAt) {
    form.addEventListener('submit', function (event) {
      submittedAt.value = new Date().toISOString();

      if (smsCheckbox.checked && phoneInput.value.trim() === '') {
        event.preventDefault();
        smsError.hidden = false;
        phoneInput.focus();
        phoneInput.setAttribute('aria-invalid', 'true');
        return;
      }

      smsError.hidden = true;
      phoneInput.removeAttribute('aria-invalid');
    });

    phoneInput.addEventListener('input', function () {
      if (phoneInput.value.trim() !== '') {
        smsError.hidden = true;
        phoneInput.removeAttribute('aria-invalid');
      }
    });
  }
}());