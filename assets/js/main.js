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
