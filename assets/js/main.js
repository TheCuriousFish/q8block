/**
 * Q8Block - Main JavaScript
 * Handles form submissions, mobile menu, and smooth scrolling
 */

(function() {
    'use strict';

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLinks) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            }
            
            if (navCta) {
                navCta.style.display = navCta.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just "#"
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 992) {
                    if (navLinks) navLinks.style.display = 'none';
                    if (navCta) navCta.style.display = 'none';
                    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Consultation Form Handling
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                business: document.getElementById('business').value,
                message: document.getElementById('message').value,
                type: 'consultation',
                timestamp: new Date().toISOString()
            };
            
            // Log form data (in production, this would send to backend)
            console.log('Consultation Form Submitted:', formData);
            
            // Show success message
            showSuccessMessage(consultationForm, 'شكراً لك! سنتواصل معك قريباً.');
            
            // Reset form
            consultationForm.reset();
        });
    }

    // Audit Form Handling
    const auditForm = document.getElementById('auditForm');
    
    if (auditForm) {
        auditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                business: document.getElementById('audit-business').value,
                email: document.getElementById('audit-email').value,
                phone: document.getElementById('audit-phone').value,
                type: 'audit',
                timestamp: new Date().toISOString()
            };
            
            // Log form data (in production, this would send to backend)
            console.log('Audit Form Submitted:', formData);
            
            // Show success message
            showSuccessMessage(auditForm, 'شكراً لك! سنرسل التدقيق المجاني إلى بريدك الإلكتروني قريباً.');
            
            // Reset form
            auditForm.reset();
        });
    }

    // Success Message Function
    function showSuccessMessage(form, message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            padding: 1.25rem;
            background-color: #28A745;
            color: white;
            border-radius: 8px;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        successDiv.textContent = message;
        
        // Add animation keyframes if not already added
        if (!document.getElementById('success-animation-style')) {
            const style = document.createElement('style');
            style.id = 'success-animation-style';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Insert after form
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);
    }

    // Form Validation Enhancement
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('error');
            }
        });
    });

    // Add error styling
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .error {
            border-color: #DC3545 !important;
            animation: shake 0.3s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(errorStyle);

    // Scroll-triggered Fade-in Animation for Value Points
    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(element => {
            fadeInObserver.observe(element);
        });

        // Also observe service detail cards
        document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 12px rgba(14, 32, 64, 0.12)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(14, 32, 64, 0.08)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Phone Number Click Tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.getAttribute('href'));
            // In production, this would send analytics event
        });
    });

    // Viewport Height Fix for Mobile
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Portfolio Carousel with Infinite Loop
    const portfolioCarousel = document.querySelector('.portfolio-carousel');
    if (portfolioCarousel) {
        const track = portfolioCarousel.querySelector('.portfolio-track');
        const originalSlides = Array.from(track.querySelectorAll('.portfolio-slide'));
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        let currentIndex = 0;
        let slidesToShow = getSlidesToShow();
        let autoplayInterval;
        let isTransitioning = false;
        
        // Clone slides for infinite loop (clone 2 sets for smooth infinite scrolling)
        const clonedSlidesStart = originalSlides.map(slide => slide.cloneNode(true));
        const clonedSlidesEnd = originalSlides.map(slide => slide.cloneNode(true));
        
        // Add clones to track
        clonedSlidesEnd.forEach(clone => track.appendChild(clone));
        clonedSlidesStart.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));
        
        // Get all slides including clones
        const allSlides = Array.from(track.querySelectorAll('.portfolio-slide'));
        const originalLength = originalSlides.length;
        
        // Start at the first original slide (after prepended clones)
        currentIndex = originalLength;
        
        function getSlidesToShow() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }
        
        function getSlideWidth() {
            return allSlides[0].offsetWidth;
        }
        
        function getGap() {
            return 32; // 2rem gap
        }
        
        function updateCarousel(transition = true) {
            const slideWidth = getSlideWidth();
            const gap = getGap();
            const offset = currentIndex * (slideWidth + gap);
            
            if (transition) {
                track.style.transition = 'transform 0.5s ease';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(-${offset}px)`;
        }
        

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex++;
            updateCarousel();
            
            // Check if we need to loop
            setTimeout(() => {
                if (currentIndex >= originalLength * 2) {
                    // Jump back to first set of original slides
                    currentIndex = originalLength;
                    updateCarousel(false);
                }
                isTransitioning = false;
            }, 500);
        }
        
        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            currentIndex--;
            updateCarousel();
            
            // Check if we need to loop
            setTimeout(() => {
                if (currentIndex < originalLength) {
                    // Jump to last set of original slides
                    currentIndex = originalLength * 2 - 1;
                    updateCarousel(false);
                }
                isTransitioning = false;
            }, 500);
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
        
        // Pause autoplay on hover
        portfolioCarousel.addEventListener('mouseenter', stopAutoplay);
        portfolioCarousel.addEventListener('mouseleave', startAutoplay);
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newSlidesToShow = getSlidesToShow();
                if (newSlidesToShow !== slidesToShow) {
                    slidesToShow = newSlidesToShow;
                    updateCarousel(false);
                }
            }, 250);
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
            }
        }
        
        // Initialize
        updateCarousel(false);
        startAutoplay();
    }

    // Console Welcome Message
    console.log('%cQ8Block Digital Solutions', 'color: #0E2040; font-size: 24px; font-weight: bold;');
    console.log('%cWe help local businesses get found and grow!', 'color: #ABD9E7; font-size: 14px;');
    console.log('%cPhone: +965 9413 9666', 'color: #6C757D; font-size: 12px;');
})();
