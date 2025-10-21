// Advanced Interactive Animations for Portfolio
// Author: Nguyễn Vũ Đạt

document.addEventListener("DOMContentLoaded", function () {

  // ============================================
  // 1. Scroll Progress Indicator
  // ============================================
  function createScrollProgress() {
    let progressBar = document.querySelector('.scroll-progress');

    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }

    function updateScrollProgress() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  createScrollProgress();

  // ============================================
  // 2. Magnetic Button Effect (exclude floating prompt)
  // ============================================
  const magneticButtons = document.querySelectorAll('.contact-section .btn');

  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      // Skip if it's a floating prompt
      if (this.classList.contains('floating-prompt')) return;

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', function() {
      if (!this.classList.contains('floating-prompt')) {
        this.style.transform = 'translate(0, 0)';
      }
    });
  });

  // ============================================
  // 3. Cursor Follower Effect
  // ============================================
  function createCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      requestAnimationFrame(animate);
    }

    animate();

    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-card, .achievement-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(2)`;
        cursor.style.borderColor = 'var(--primary-color)';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
      });
    });
  }

  // Only create cursor follower on desktop
  if (window.innerWidth > 768) {
    createCursorFollower();
  }

  // ============================================
  // 4. Particle Background for Sections
  // ============================================
  function createParticles(section) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    `;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: ${Math.random() * 0.3};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }

    section.style.position = 'relative';
    section.insertBefore(particlesContainer, section.firstChild);
  }

  // Add particles to hero and contact sections
  const heroSection = document.querySelector('.hero-section');
  const contactSection = document.querySelector('.contact-section');

  if (heroSection) createParticles(heroSection);
  if (contactSection) createParticles(contactSection);

  // ============================================
  // 5. Smooth Reveal for Skill Bars
  // ============================================
  // Note: Skill bar animations are now handled by CSS in style.css
  // using the .skills-section.scroll-animate.is-visible .skill-fill animation
  // This avoids conflicts and provides better performance

  // ============================================
  // 6. Image Lazy Load with Blur Effect
  // ============================================
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach(img => {
    img.style.filter = 'blur(10px)';
    img.style.transition = 'filter 0.5s ease';

    img.addEventListener('load', function() {
      this.style.filter = 'blur(0)';
    });
  });

  // ============================================
  // 7. Ripple Effect on Click
  // ============================================
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out;
    `;

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes rippleEffect {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  const clickableElements = document.querySelectorAll('.btn, .social-card, .nav-link');
  clickableElements.forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', createRipple);
  });

  // ============================================
  // 8. Typing Effect Enhancement
  // ============================================
  const highlightElement = document.querySelector('.highlight');
  if (highlightElement) {
    setInterval(() => {
      highlightElement.style.backgroundPosition = highlightElement.style.backgroundPosition === '200% center'
        ? '0% center'
        : '200% center';
    }, 3000);
  }

  // Clean up animations on page unload
  window.addEventListener('beforeunload', () => {
    document.querySelectorAll('.particle, .cursor-follower').forEach(el => el.remove());
  });

});
