/**
 * Utility Functions
 * Reusable helper functions for the portfolio
 */

/**
 * Add or remove event listener with fallback for older browsers
 * @param {Object} mediaQuery - The media query object
 * @param {Function} handler - The event handler function
 */
export function addMediaQueryListener(mediaQuery, handler) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handler);
  }
}

/**
 * Remove event listener with fallback for older browsers
 * @param {Object} mediaQuery - The media query object
 * @param {Function} handler - The event handler function
 */
export function removeMediaQueryListener(mediaQuery, handler) {
  if (typeof mediaQuery.removeEventListener === "function") {
    mediaQuery.removeEventListener("change", handler);
  } else if (typeof mediaQuery.removeListener === "function") {
    mediaQuery.removeListener(handler);
  }
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean}
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution rate
 * @param {Function} func - The function to throttle
 * @param {number} limit - The minimum time between executions
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Request animation frame with fallback
 * @param {Function} callback - The callback function
 */
export function requestAnimFrame(callback) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16);
}

/**
 * Set multiple attributes on an element
 * @param {HTMLElement} element - The target element
 * @param {Object} attributes - Key-value pairs of attributes
 */
export function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
}

/**
 * Toggle class with optional force parameter
 * @param {HTMLElement} element - The target element
 * @param {string} className - The class name to toggle
 * @param {boolean} force - Optional force add/remove
 */
export function toggleClass(element, className, force) {
  if (force !== undefined) {
    element.classList.toggle(className, force);
  } else {
    element.classList.toggle(className);
  }
}

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target - The target element or selector
 * @param {number} offset - Optional offset from top
 */
export function smoothScrollTo(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Preload image
 * @param {string} src - Image source URL
 * @returns {Promise}
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Get computed style value
 * @param {HTMLElement} element - The target element
 * @param {string} property - The CSS property name
 * @returns {string}
 */
export function getStyle(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Check if reduced motion is preferred
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
