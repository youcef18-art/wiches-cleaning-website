/* ===== MOBILE NAVIGATION ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ===== HEADER SHADOW ON SCROLL ===== */
function scrollHeader() {
    const header = document.querySelector('.header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', scrollHeader);

/* ===== FAQ ACCORDION ===== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

/* ===== CONTACT FORM HANDLING ===== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formMessage = document.getElementById('formMessage');
        
        // Simulate form submission (in production, this would send to a server)
        // Send form data to n8n webhook
            const data = Object.fromEntries(formData);
            fetch('https://spectranexsussystems.app.n8n.cloud/webhook/wiches-cleaning-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => {
                formMessage.textContent = 'Thank you! We will get back to you within 24 hours.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                this.reset();
            }).catch(error => {
                formMessage.textContent = 'Thank you for your message! We will contact you soon.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                this.reset();
            });
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success');
        }, 5000);
    });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for hash links, not empty hrefs
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ===== ANIMATION ON SCROLL ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .feature-card, .value-card, .stat-card');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

/* ===== SET MINIMUM DATE FOR CONTACT FORM ===== */
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

/* ===== ACTIVE NAVIGATION HIGHLIGHT ===== */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

highlightActiveNav();
