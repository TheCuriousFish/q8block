// ===========================
// Navigation and Mobile Menu
// ===========================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Continuous Auto-Scrolling Testimonials
// ===========================
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    const slides = Array.from(track.children);
    
    // Duplicate all slides to create seamless infinite loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
    
    // CSS animation handles the scrolling automatically
    // No additional JavaScript needed for the scroll effect
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialCarousel();
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section, .problem-card, .solution-item, .summary-card').forEach(element => {
    observer.observe(element);
});

// ===========================
// Counter Animation for Stats
// ===========================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number-inline, .stat-value');
            if (statNumber) {
                const targetText = statNumber.textContent;
                let suffix = '';
                let targetNumber = 0;

                // Extract number and suffix
                if (targetText.includes('+')) {
                    suffix = '+';
                    targetNumber = parseInt(targetText.replace(/\D/g, ''));
                } else if (targetText.includes('x')) {
                    suffix = 'x';
                    targetNumber = parseInt(targetText.replace(/\D/g, ''));
                } else if (targetText.includes('%')) {
                    suffix = '%';
                    targetNumber = parseInt(targetText.replace(/\D/g, ''));
                } else if (targetText.includes('s')) {
                    suffix = 's';
                    targetNumber = parseFloat(targetText.replace(/[^0-9.]/g, ''));
                } else {
                    targetNumber = parseInt(targetText.replace(/\D/g, ''));
                }

                if (!isNaN(targetNumber)) {
                    animateCounter(statNumber, targetNumber, suffix);
                    entry.target.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-inline, .stat-card').forEach(stat => {
    statsObserver.observe(stat);
});

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
// Active Nav Link Based on Scroll
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
// Console Message
// ===========================
console.log('%cQ8Block', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cWebsite built with ❤️ by Q8Block', 'font-size: 12px; color: #666;');
console.log('%cSearch Marketing Experts in Kuwait', 'font-size: 14px; font-weight: bold; color: #001f3f;');

