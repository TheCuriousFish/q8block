// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .feature-box, .stat-item');
animateElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// ===========================
// Service Cards Hover Effect
// ===========================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Testimonial Cards Stagger Animation
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===========================
// Counter Animation for Stats
// ===========================
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            // Handle different formats
            if (target.toString().includes('x')) {
                element.textContent = Math.floor(current) + 'x';
            } else if (target.toString().includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (target.toString().includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (text.includes('x')) {
                animateCounter(entry.target, number, 1500);
                setTimeout(() => {
                    entry.target.textContent = number + 'x';
                }, 1500);
            } else if (text.includes('+')) {
                animateCounter(entry.target, number, 2000);
                setTimeout(() => {
                    entry.target.textContent = number + '+';
                }, 2000);
            } else if (text.includes('%')) {
                animateCounter(entry.target, number, 1500);
                setTimeout(() => {
                    entry.target.textContent = number + '%';
                }, 1500);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===========================
// Parallax Effect for Hero Background
// ===========================
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Add Hover Effect to Buttons
// ===========================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// Feature Box Stagger Animation
// ===========================
const featureBoxes = document.querySelectorAll('.feature-box');

featureBoxes.forEach((box, index) => {
    box.style.transitionDelay = `${index * 0.1}s`;
});

// ===========================
// Lazy Loading for Images (if any added later)
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Add Active State to Current Nav Link
// ===========================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Performance: Debounce Scroll Events
// ===========================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
});

window.addEventListener('scroll', debouncedScroll);

// ===========================
// Console Message
// ===========================
console.log('%cQ8Block', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cWebsite built with ❤️ by Q8Block', 'font-size: 12px; color: #666;');
console.log('%cWe optimize for AI Search!', 'font-size: 14px; font-weight: bold; color: #001f3f;');

