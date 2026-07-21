(function () {
  'use strict';

  const isHomepage = document.body && document.querySelector('.hero-grid-overlay');
  if (isHomepage && !document.querySelector('link[href="visual-upgrade.css"]')) {
    const visualStyles = document.createElement('link');
    visualStyles.rel = 'stylesheet';
    visualStyles.href = 'visual-upgrade.css';
    document.head.appendChild(visualStyles);
  }

  if (isHomepage && !document.querySelector('link[href="realistic-upgrade.css"]')) {
    const realisticStyles = document.createElement('link');
    realisticStyles.rel = 'stylesheet';
    realisticStyles.href = 'realistic-upgrade.css';
    document.head.appendChild(realisticStyles);
  }

  if (isHomepage && !document.querySelector('link[href="trust-strip-fix.css"]')) {
    const trustStripStyles = document.createElement('link');
    trustStripStyles.rel = 'stylesheet';
    trustStripStyles.href = 'trust-strip-fix.css';
    document.head.appendChild(trustStripStyles);
  }

  if (!document.querySelector('link[href="logo-integration.css"]')) {
    const logoStyles = document.createElement('link');
    logoStyles.rel = 'stylesheet';
    logoStyles.href = 'logo-integration.css';
    document.head.appendChild(logoStyles);
  }

  document.querySelectorAll('.brand-mark').forEach(function (mark) {
    const logo = document.createElement('img');
    logo.className = 'brand-logo-image';
    logo.src = 'assets/five-falcons-logo-mark.svg';
    logo.alt = '';
    logo.decoding = 'async';
    mark.replaceWith(logo);
  });

  document.querySelectorAll('.hero-brand-panel, .logo-watermark').forEach(function (element) {
    element.remove();
  });

  if (isHomepage) {
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
