// ===== Language Detection & Redirect (root page only) =====
(function () {
    var supportedLangs = ['en', 'tr', 'es', 'pt', 'fr', 'de', 'ar', 'hi', 'ko', 'ja', 'ru', 'id'];
    var path = window.location.pathname;

    // Only redirect on root page
    if (path !== '/' && path !== '/index.html') return;

    // Skip bots
    var ua = navigator.userAgent || '';
    if (/Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Discordbot/i.test(ua)) return;

    // Check localStorage preference first
    var savedLang = localStorage.getItem('celebcam-lang');
    if (savedLang && supportedLangs.indexOf(savedLang) !== -1 && savedLang !== 'en') {
        window.location.replace('/' + savedLang + '/');
        return;
    }
    if (savedLang === 'en') return;

    // Detect browser language
    var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    var langCode = browserLang.split('-')[0];

    if (supportedLangs.indexOf(langCode) !== -1 && langCode !== 'en') {
        localStorage.setItem('celebcam-lang', langCode);
        window.location.replace('/' + langCode + '/');
    }
})();

// ===== Navbar scroll behavior =====
(function () {
    var navbar = document.querySelector('.navbar');
    var scrollThreshold = 50;

    function onScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== Scroll fade-in animations =====
(function () {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        targets.forEach(function (el) {
            el.classList.add('visible');
        });
    }
})();

// ===== Smooth scroll for anchor links =====
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ===== Language Switcher =====
(function () {
    var toggle = document.querySelector('.lang-switcher-toggle');
    var dropdown = document.querySelector('.lang-dropdown');
    if (!toggle || !dropdown) return;

    // Toggle dropdown
    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function () {
        dropdown.classList.remove('open');
    });

    // Prevent dropdown clicks from closing
    dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Handle language selection
    dropdown.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            var lang = this.getAttribute('data-lang');
            if (lang) {
                localStorage.setItem('celebcam-lang', lang);
            }
        });
    });
})();
