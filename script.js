(function () {
  'use strict';

  const brandAssets = {
    header: '/assets/five-falcons-header.png',
    emblem: '/assets/five-falcons-emblem.png',
    full: '/assets/five-falcons-full.png'
  };

  const isHomepage = document.body && document.body.classList.contains('home');

  function ensureStylesheet(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }

  if (!isHomepage) ensureStylesheet('/logo-integration.css');

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

  document.querySelectorAll('body:not(.home) a.brand').forEach(function (brand) {
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

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
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