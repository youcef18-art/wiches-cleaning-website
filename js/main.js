/* ===== WITCHES' CLEANING - MAIN JS ===== */
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('uil-bars');
            icon.classList.toggle('uil-times');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 10, 26, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(124, 58, 237, 0.1)';
        } else {
            header.style.background = 'rgba(15, 10, 26, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll reveal animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Language banner dismiss
    const langBanner = document.getElementById('langBanner');
    if (langBanner) {
        setTimeout(() => {
            langBanner.style.transition = 'transform 0.3s ease';
        }, 100);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat__number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text);
                    animateCounter(target, 0, num, 2000, '+');
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, start, end, duration, suffix) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                el.textContent = end + (suffix || '');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + (suffix || '');
            }
        }, 16);
    }

    // Form submission with n8n webhook
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch('https://n8n.spectra-nexus.com/webhook/witches-cleaning-contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    alert('Thank you! Your message has been sent. We will get back to you shortly.');
                    contactForm.reset();
                }
            } catch (error) {
                alert('Something went wrong. Please try again or call us directly.');
            }
        });
    }
});
