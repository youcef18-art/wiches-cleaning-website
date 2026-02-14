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
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    });

    // Header scroll effect (light theme)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
        } else {
            header.style.background = 'rgba(255,255,255,0.92)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

    // ===== INSTANT QUOTE CALCULATOR =====
    const sqftSlider = document.getElementById('sqftSlider');
    const bedroomSlider = document.getElementById('bedroomSlider');
    const bathroomSlider = document.getElementById('bathroomSlider');
    const sqftValue = document.getElementById('sqftValue');
    const bedroomValue = document.getElementById('bedroomValue');
    const bathroomValue = document.getElementById('bathroomValue');
    const calcPrice = document.getElementById('calcPrice');

    function calculatePrice() {
        if (!sqftSlider) return;
        const sqft = parseInt(sqftSlider.value);
        const bedrooms = parseInt(bedroomSlider.value);
        const bathrooms = parseInt(bathroomSlider.value);

        // Base price: $0.06/sqft + $15/bedroom + $20/bathroom + $50 base
        let price = 50 + (sqft * 0.06) + (bedrooms * 15) + (bathrooms * 20);

        // Frequency discount
        const activeFreq = document.querySelector('.freq-option.active');
        const discount = activeFreq ? parseInt(activeFreq.dataset.discount) || 0 : 0;
        price = price * (1 - discount / 100);

        // Add-ons
        document.querySelectorAll('.addon-item input[type="checkbox"]:checked').forEach(cb => {
            price += parseInt(cb.dataset.price) || 0;
        });

        // Update displays
        if (sqftValue) sqftValue.textContent = sqft.toLocaleString() + ' sq ft';
        if (bedroomValue) bedroomValue.textContent = bedrooms;
        if (bathroomValue) bathroomValue.textContent = bathrooms;
        if (calcPrice) calcPrice.textContent = Math.round(price);
    }

    // Slider events
    if (sqftSlider) {
        sqftSlider.addEventListener('input', calculatePrice);
        bedroomSlider.addEventListener('input', calculatePrice);
        bathroomSlider.addEventListener('input', calculatePrice);
    }

    // Frequency toggle
    document.querySelectorAll('.freq-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.freq-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            calculatePrice();
        });
    });

    // Add-on toggle
    document.querySelectorAll('.addon-item input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            cb.closest('.addon-item').classList.toggle('active', cb.checked);
            calculatePrice();
        });
    });

    // Initial calc
    calculatePrice();

    // Quote form submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch('https://n8n.spectra-nexus.com/webhook/witches-cleaning-contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    alert('Thank you! We will get back to you within an hour.');
                    quoteForm.reset();
                }
            } catch (error) {
                alert('Something went wrong. Please try again or call us directly.');
            }
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.stat__number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text);
                    let current = 0;
                    const increment = num / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) { target.textContent = num + '+'; clearInterval(timer); }
                        else { target.textContent = Math.floor(current) + '+'; }
                    }, 30);
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

});
