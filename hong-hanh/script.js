// ===== Portfolio JavaScript - Professional UX/UI Enhancements =====

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all features
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initStickyNav();
    initScrollToTop();
    initActiveNav();
    initCounterAnimation();
    initCursorFollower();
    initSmoothScroll();
    initLazyLoading();
    initSkillBars(); // Add skill bar animation on scroll
});

// ===== Theme Toggle (Dark Mode) =====
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add animation effect
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuToggle || !navLinks) return;

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinksArray = navLinks.querySelectorAll('.nav-link');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===== Scroll Reveal Animations =====
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-section');
    if (!revealElements.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        revealElements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => observer.observe(element));
}

// ===== Sticky Navigation with Scroll Effect =====
function initStickyNav() {
    const mainNav = document.getElementById('mainNav');
    if (!mainNav) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > scrollThreshold) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }

        // Optional: Hide nav on scroll down, show on scroll up
        // Uncomment below to enable
        /*
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            mainNav.style.transform = 'translateY(0)';
        }
        */

        lastScroll = currentScroll;
    }, { passive: true });
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Active Navigation Link =====
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -66%'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ===== Counter Animation for Stats with Shuffle Effect =====
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const shuffleDuration = 1500; // Shuffle effect duration
        const finalDuration = 500; // Time to settle on final number
        let startTime = null;

        // Shuffle effect: show random numbers
        const shuffleUpdate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / shuffleDuration, 1);

            if (progress < 1) {
                // Show random numbers with decreasing frequency
                const maxRandom = Math.max(target * 3, 20); // At least 20 for visual effect
                const randomNum = Math.floor(Math.random() * maxRandom);
                element.textContent = randomNum;

                // Slow down the shuffle as we approach the end
                const delay = progress * 100; // Increase delay over time
                setTimeout(() => {
                    requestAnimationFrame(shuffleUpdate);
                }, delay);
            } else {
                // Start final count-up animation
                startTime = null;
                requestAnimationFrame(finalCount);
            }
        };

        // Final count: smooth count to target
        const finalCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / finalDuration, 1);

            // Ease out effect
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(finalCount);
            } else {
                element.textContent = target;
                // Add a subtle pop effect
                element.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };

        // Add smooth transition for scale effect
        element.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';

        // Start shuffle animation
        requestAnimationFrame(shuffleUpdate);
    };

    // Observe when stats come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

// ===== Custom Cursor Follower =====
function initCursorFollower() {
    // Only on desktop devices
    if (window.innerWidth < 768) return;
    if ('ontouchstart' in window) return;

    const cursorFollower = document.getElementById('cursorFollower');
    if (!cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isHovering = false;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow animation
    function animate() {
        // Smooth lerp effect
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;

        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Show cursor follower on mouse move
    document.addEventListener('mousemove', () => {
        cursorFollower.style.opacity = '0.6';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });

        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('mainNav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length) return;

    // Check if browser supports lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }

    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== Parallax Effect for Hero Section =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Only on desktop
    if (window.innerWidth < 768) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, { passive: true });
}

// ===== Skill Bar Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    if (!skillBars.length) return;

    // Set initial width to 0%
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');

                // Animate to target width with delay for better UX
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                }, 200);

                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Form Validation (if you add a contact form later) =====
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Add your form validation logic here
        console.log('Form submitted:', data);

        // Show success message
        showNotification('Message sent successfully!', 'success');
        form.reset();
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Performance Optimization: Debounce Function =====
function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== Performance Optimization: Throttle Function =====
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Easter Egg: Konami Code =====
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Add fun confetti effect or special message
    showNotification('🎉 Bạn đã tìm thấy Easter Egg! Chúc mừng!', 'success');

    // Add rainbow effect to brand name
    const brand = document.querySelector('.brand-text');
    if (brand) {
        brand.style.background = 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
        brand.style.webkitBackgroundClip = 'text';
        brand.style.webkitTextFillColor = 'transparent';
        brand.style.animation = 'rainbow 3s linear infinite';
    }
}

// ===== Analytics (Optional) =====
function trackEvent(category, action, label) {
    // Integrate with Google Analytics or other tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log('Track:', category, action, label);
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', button.textContent.trim());
    });
});

// ===== Page Visibility API for Performance =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        console.log('Page hidden - pausing animations');
    } else {
        // Page is visible, resume animations
        console.log('Page visible - resuming animations');
    }
});

// ===== Print Optimization =====
window.addEventListener('beforeprint', () => {
    console.log('Preparing page for print...');
    // Add any print-specific adjustments
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
});

// ===== Accessibility: Skip to Main Content =====
function initSkipToContent() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';

    Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '0',
        background: '#000',
        color: '#fff',
        padding: '8px',
        textDecoration: 'none',
        zIndex: '10000'
    });

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== Initialize Additional Features =====
// Uncomment to enable additional features
// initParallax();
// initSkillBars();
// initFormValidation();
// initKonamiCode();
// initSkipToContent();

// ===== Console Message =====
console.log('%c👋 Xin chào! Portfolio được thiết kế bởi Hồng Hạnh',
    'font-size: 16px; color: #d59bdc; font-weight: bold;');
console.log('%c🎨 Nếu bạn quan tâm đến công việc thiết kế, hãy liên hệ nhé!',
    'font-size: 12px; color: #9256a6;');

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
    */
}

// ===== Export functions for testing (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        showNotification,
        trackEvent
    };
}
