/**
 * VELOCE LUXE // Premium Vehicle Storage & Automated Parking Facility
 * Global Application Logic: Theme Engine, RTL Switcher, Toast Notification, & UI Components
 */

(function () {
  'use strict';

  // ===================================================================
  // 1. Toast Notification System
  // ===================================================================
  function createToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (title, message, type = 'success', duration = 4000) {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap">${iconSvg}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close Toast">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    container.appendChild(toast);

    // Trigger animation in next frame
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 400);
    };

    closeBtn.addEventListener('click', removeToast);
    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  };

  // ===================================================================
  // 2. Theme Engine (Light / Dark Neumorphic Toggle)
  // ===================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('veloce_theme') || 'dark'; // Defaulting to midnight luxury
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('veloce_theme', newTheme);
        updateThemeIcons(newTheme);

        showToast(
          'Theme Switched',
          `Appearance switched to ${newTheme === 'dark' ? 'Midnight Luxury' : 'Platinum Soft UI'} mode.`,
          'info',
          2500
        );
      });
    });
  }

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-icon-sun').forEach((icon) => {
      icon.style.display = theme === 'dark' ? 'inline-block' : 'none';
    });
    document.querySelectorAll('.theme-icon-moon').forEach((icon) => {
      icon.style.display = theme === 'dark' ? 'none' : 'inline-block';
    });
  }

  // ===================================================================
  // 3. RTL / LTR Direction Engine
  // ===================================================================
  function initRTL() {
    const savedDir = localStorage.getItem('veloce_dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRTLButtons(savedDir);

    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('veloce_dir', newDir);
        updateRTLButtons(newDir);

        showToast(
          'Direction Switched',
          `Layout flipped to ${newDir.toUpperCase()} alignment.`,
          'info',
          2500
        );
      });
    });
  }

  function updateRTLButtons(dir) {
    document.querySelectorAll('.rtl-toggle-btn span.badge-dir').forEach((el) => {
      el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  // ===================================================================
  // 4. Header Scroll Effect & Mobile Nav Drawer
  // ===================================================================
  function initNavigation() {
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    const mobileMenuOpenBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuCloseBtn = document.querySelector('.mobile-nav-close');

    if (mobileMenuOpenBtn && mobileNav) {
      mobileMenuOpenBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (mobileMenuCloseBtn && mobileNav) {
      mobileMenuCloseBtn.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    if (mobileNav) {
      mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) {
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // ===================================================================
  // 5. Accordion System
  // ===================================================================
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach((header) => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Optional: close other accordions in same group
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach((sibling) => {
            if (sibling !== item) {
              sibling.classList.remove('active');
              const siblingContent = sibling.querySelector('.accordion-content');
              if (siblingContent) siblingContent.style.maxHeight = null;
            }
          });
        }

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // ===================================================================
  // 6. Global Form Submissions (Newsletter, Contact, Fast Booking)
  // ===================================================================
  function initForms() {
    // Newsletter Forms
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          showToast(
            'VIP Subscription Confirmed',
            `Thank you! Updates and priority reservation codes sent to ${input.value}.`,
            'success'
          );
          input.value = '';
        }
      });
    });

    // General Message / Booking Forms
    document.querySelectorAll('.ajax-toast-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successMsg = form.getAttribute('data-success-msg') || 'Your request has been securely received by our concierge.';
        const successTitle = form.getAttribute('data-success-title') || 'Reservation Confirmed';
        showToast(successTitle, successMsg, 'success', 5000);
        form.reset();
      });
    });
  }

  // ===================================================================
  // DOM Ready
  // ===================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavigation();
    initAccordions();
    initForms();
  });
})();
