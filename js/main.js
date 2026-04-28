(function () {
    'use strict';

    // ============================================
    // Footer year
    // ============================================
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================
    // Header scroll effect
    // ============================================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }, { passive: true });

    // ============================================
    // Mobile hamburger menu
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-overlay');

    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        hamburger.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
    }

    if (hamburger && navLinks && overlay) {
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });
    }

    // ============================================
    // Smooth scroll with header offset
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = link.getAttribute('href');
            if (targetId.length <= 1) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // ============================================
    // Tabs (Servicios)
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const tab = btn.dataset.tab;

            tabBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            tabContents.forEach(function (content) {
                content.classList.remove('active');
                if (content.dataset.tabContent === tab) {
                    content.classList.add('active');
                    content.querySelectorAll('.reveal').forEach(function (el) {
                        el.classList.remove('is-visible');
                        setTimeout(function () { observer.observe(el); }, 50);
                    });
                }
            });
        });
    });

    // ============================================
    // Scroll reveal
    // ============================================
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();
