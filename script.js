(function () {
  'use strict';

  const isHomepage = document.body && document.querySelector('.hero-grid-overlay');
  if (isHomepage && !document.querySelector('link[href="visual-upgrade.css"]')) {
    const visualStyles = document.createElement('link');
    visualStyles.rel = 'stylesheet';
    visualStyles.href = 'visual-upgrade.css';
    document.head.appendChild(visualStyles);
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