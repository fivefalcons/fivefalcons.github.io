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
    ensureStylesheet('driver-careers.css');
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

    const navigation = document.querySelector('.primary-nav');
    if (navigation && !navigation.querySelector('a[href="#drivers"]')) {
      const careersLink = document.createElement('a');
      careersLink.href = '#drivers';
      careersLink.className = 'careers-nav-link';
      careersLink.textContent = 'Careers';
      const contactLink = navigation.querySelector('a[href="#contact"]');
      navigation.insertBefore(careersLink, contactLink || navigation.lastElementChild);
    }

    const heroCredentials = document.querySelector('.hero-credentials');
    if (heroCredentials && !document.querySelector('.driver-hero-link')) {
      const driverHeroLink = document.createElement('a');
      driverHeroLink.className = 'driver-hero-link';
      driverHeroLink.href = '#drivers';
      driverHeroLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path></svg>Professional driver? <span>Explore opportunities →</span>';
      heroCredentials.insertAdjacentElement('afterend', driverHeroLink);
    }

    if (!document.querySelector('#drivers')) {
      const careersSection = document.createElement('section');
      careersSection.id = 'drivers';
      careersSection.className = 'driver-careers-section';
      careersSection.setAttribute('aria-labelledby', 'driver-careers-title');
      careersSection.innerHTML = '<div class="container driver-careers-inner">' +
        '<div class="driver-careers-heading reveal">' +
          '<div><p class="eyebrow">Professional driver opportunities</p><h2 id="driver-careers-title">Build the next chapter <em>with Five Falcons.</em></h2></div>' +
          '<p>Five Falcons is building a focused power-only operation from Illinois. We welcome conversations with qualified CDL drivers who value clear communication, professional standards, and the opportunity to grow with a new carrier.</p>' +
        '</div>' +
        '<div class="driver-benefit-grid">' +
          '<article class="driver-benefit-card reveal"><span class="driver-benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path><path d="M8 9h8M8 13h5"></path></svg></span><h3>Direct communication</h3><p>Work with a team that values straightforward load information, timely answers, and practical coordination.</p></article>' +
          '<article class="driver-benefit-card reveal"><span class="driver-benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17h4V5H2v12h3"></path><path d="M14 9h4l4 4v4h-2"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg></span><h3>Power-only focus</h3><p>A clear operating model centered on tractor-and-driver capacity for partner-provided trailers.</p></article>' +
          '<article class="driver-benefit-card reveal"><span class="driver-benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18"></path><circle cx="12" cy="12" r="9"></circle></svg></span><h3>Room to grow</h3><p>Join the conversation early as Five Falcons develops its driver program, freight relationships, and operating team.</p></article>' +
        '</div>' +
        '<div class="driver-application-panel reveal">' +
          '<ol class="driver-steps" aria-label="Driver inquiry process">' +
            '<li><span class="driver-step-number">1</span><strong>Send your interest</strong><span>Tell us about your CDL experience, location, and availability.</span></li>' +
            '<li><span class="driver-step-number">2</span><strong>Talk with our team</strong><span>We review current needs and discuss the operating opportunity directly.</span></li>' +
            '<li><span class="driver-step-number">3</span><strong>Confirm the fit</strong><span>Qualifications, expectations, and next steps are reviewed before any commitment.</span></li>' +
          '</ol>' +
          '<div class="driver-apply-box"><p>Interested in driving with Five Falcons? Use our existing business form to begin a driver inquiry.</p><button class="button button-primary" type="button" data-driver-apply>Start driver inquiry <span aria-hidden="true">→</span></button></div>' +
        '</div>' +
        '<p class="driver-disclaimer">Driver opportunities, qualifications, compensation, equipment, lanes, schedules, and availability depend on current company needs and will be discussed directly. Submitting an inquiry is not an offer of employment.</p>' +
      '</div>';

      const ctaBand = document.querySelector('.cta-band');
      const contactSection = document.querySelector('#contact');
      const insertionPoint = ctaBand || contactSection;
      if (insertionPoint && insertionPoint.parentNode) {
        insertionPoint.parentNode.insertBefore(careersSection, insertionPoint);
      }
    }

    document.querySelectorAll('.footer-grid > div').forEach(function (column) {
      const heading = column.querySelector('h2');
      if (heading && heading.textContent.trim() === 'Company' && !column.querySelector('a[href="#drivers"]')) {
        const careersFooterLink = document.createElement('a');
        careersFooterLink.href = '#drivers';
        careersFooterLink.textContent = 'Driver careers';
        column.appendChild(careersFooterLink);
      }
    });

    const inquirySelect = document.querySelector('#inquiry-type');
    if (inquirySelect && !inquirySelect.querySelector('option[value="Driver opportunity"]')) {
      const option = document.createElement('option');
      option.value = 'Driver opportunity';
      option.textContent = 'Driver opportunity';
      inquirySelect.appendChild(option);
    }

    document.querySelectorAll('[data-driver-apply]').forEach(function (button) {
      button.addEventListener('click', function () {
        const select = document.querySelector('#inquiry-type');
        const contact = document.querySelector('#contact');
        if (select) select.value = 'Driver opportunity';
        if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(function () {
          const nameInput = document.querySelector('#name');
          if (nameInput) nameInput.focus({ preventScroll: true });
        }, 650);
      });
    });

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
