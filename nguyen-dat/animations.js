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

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = (Math.random() * 5 + 2).toFixed(2);
      particle.style.setProperty('--particle-left', `${Math.random() * 100}%`);
      particle.style.setProperty('--particle-top', `${Math.random() * 100}%`);
      particle.style.setProperty('--particle-size', `${size}px`);
      particle.style.setProperty('--particle-opacity', (Math.random() * 0.3).toFixed(2));
      particle.style.setProperty('--particle-duration', `${(Math.random() * 10 + 5).toFixed(2)}s`);
      particle.style.setProperty('--particle-delay', `${(Math.random() * 5).toFixed(2)}s`);
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
    img.classList.add('lazy-blur');
    img.addEventListener('load', () => {
      img.classList.remove('lazy-blur');
    }, { once: true });
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

    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  const clickableElements = document.querySelectorAll('.btn, .social-card, .nav-link');
  clickableElements.forEach(el => {
    el.classList.add('has-ripple');
    el.addEventListener('click', createRipple);
  });

  // ============================================
  // 8. Typing Effect Enhancement
  // ============================================
  // Clean up animations on page unload
  window.addEventListener('beforeunload', () => {
    document.querySelectorAll('.particle, .cursor-follower').forEach(el => el.remove());
  });

});
