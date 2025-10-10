// ===========================
// Navigation and Mobile Menu
// ===========================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
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
// Testimonial Slideshow
// ===========================
class TestimonialSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('indicators');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Create indicators
        this.createIndicators();
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const slideshow = document.querySelector('.testimonial-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => this.stopAutoPlay());
            slideshow.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = document.querySelectorAll('.indicator');
    }

    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        this.currentSlide = index;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 6000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlideshow();
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
            const statNumber = entry.target.querySelector('.stat-number-inline');
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

document.querySelectorAll('.stat-inline').forEach(stat => {
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

// ===========================
// Console Message
// ===========================
console.log('%cQ8Block', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cWebsite built with ❤️ by Q8Block', 'font-size: 12px; color: #666;');
console.log('%cSearch Marketing Experts in Kuwait', 'font-size: 14px; font-weight: bold; color: #001f3f;');

