# UX/UI Improvements Documentation

## 📦 New Components Added

### 1. **Loading Skeleton**
Giảm perceived loading time bằng skeleton screens.

**CSS Classes:**
- `.skeleton` - Base skeleton class
- `.skeleton-text` - Text placeholder
- `.skeleton-title` - Title placeholder
- `.skeleton-avatar` - Avatar placeholder (320x320, circular)
- `.skeleton-card` - Card placeholder
- `.skeleton-line` - Single line placeholder

**Usage Example:**
```html
<div class="skeleton skeleton-avatar"></div>
<div class="skeleton skeleton-title"></div>
<div class="skeleton skeleton-line"></div>
```

**Features:**
- Smooth shimmer animation
- Dark mode support
- Responsive sizing

---

### 2. **Modal System**
Universal modal component cho CV preview, project details, certificates.

**CSS Classes:**
- `.modal-overlay` - Modal backdrop
- `.modal` - Modal container
- `.modal-header` - Modal header
- `.modal-title` - Modal title
- `.modal-close` - Close button
- `.modal-body` - Scrollable content area
- `.modal-footer` - Action buttons area

**Usage Example:**
```html
<div class="modal-overlay" id="cvModal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Xem CV</h3>
      <button class="modal-close" aria-label="Đóng">×</button>
    </div>
    <div class="modal-body">
      <iframe src="assets/cv.pdf" class="cv-preview"></iframe>
    </div>
    <div class="modal-footer">
      <a href="assets/cv.pdf" download class="btn primary-btn">Tải xuống</a>
      <button class="btn secondary-btn">Đóng</button>
    </div>
  </div>
</div>
```

**Features:**
- Backdrop blur effect
- Smooth scale animation
- Click outside to close
- ESC key support
- Scroll lock when open
- Responsive (90vw, 90vh max)

**JavaScript Control:**
```javascript
// Open modal
document.querySelector('.modal-overlay').classList.add('is-active');
document.body.style.overflow = 'hidden';

// Close modal
document.querySelector('.modal-overlay').classList.remove('is-active');
document.body.style.overflow = '';
```

---

### 3. **Tooltip Component**
Hiển thị thông tin bổ sung khi hover.

**CSS Classes:**
- `.tooltip` - Wrapper
- `.tooltip-text` - Tooltip content

**Usage Example:**
```html
<div class="tooltip skill-item">
  <span>JavaScript</span>
  <span class="tooltip-text">Intermediate - 2+ years experience</span>
</div>
```

**Features:**
- Smooth fade-in animation
- Auto-positioned (above element)
- Arrow indicator
- Non-intrusive (pointer-events: none)

**Recommended Use Cases:**
- Skill level details
- Icon explanations
- Truncated text expansion
- Quick previews

---

### 4. **Toast Notifications**
Feedback system cho user actions.

**CSS Classes:**
- `.toast` - Base toast
- `.toast.success` - Success state (green)
- `.toast.error` - Error state (red)
- `.toast.info` - Info state (blue)
- `.toast.warning` - Warning state (orange)
- `.toast-icon` - Icon area
- `.toast-content` - Message area
- `.toast-title` - Toast title
- `.toast-message` - Toast message
- `.toast-close` - Close button

**Usage Example:**
```html
<div class="toast success is-visible">
  <span class="toast-icon">✓</span>
  <div class="toast-content">
    <div class="toast-title">Thành công!</div>
    <div class="toast-message">Tin nhắn đã được gửi.</div>
  </div>
  <button class="toast-close">×</button>
</div>
```

**JavaScript Helper:**
```javascript
function showToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${getIcon(type)}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">×</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('is-visible'), 100);
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
```

---

### 5. **Ripple Effect**
Material Design ripple cho buttons.

**CSS:** Auto-applied to `.btn`

**Features:**
- Triggered on click
- Smooth expanding circle
- White semi-transparent overlay
- 600ms duration

**Note:** No additional HTML needed - pure CSS effect!

---

### 6. **Floating Action Button (FAB)**
Quick access contact button.

**CSS Class:** `.fab`

**Usage Example:**
```html
<button class="fab is-visible" aria-label="Liên hệ nhanh">
  <svg><!-- Mail icon --></svg>
</button>
```

**Features:**
- Fixed bottom-right position
- Gradient background
- Smooth scale animation
- Auto-hide when not needed
- Responsive positioning

**JavaScript Control:**
```javascript
// Show FAB when scrolled past hero
window.addEventListener('scroll', () => {
  const fab = document.querySelector('.fab');
  if (window.scrollY > window.innerHeight) {
    fab.classList.add('is-visible');
  } else {
    fab.classList.remove('is-visible');
  }
});
```

---

### 7. **Scroll Progress Bar**
Visual feedback for page scroll progress.

**CSS Class:** `.scroll-progress`

**Usage Example:**
```html
<div class="scroll-progress"></div>
```

**JavaScript:**
```javascript
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});
```

**Features:**
- 3px height
- Gradient color (primary → purple)
- Fixed to top
- Smooth width transition

---

### 8. **Carousel Controls**
Manual control cho image carousel.

**CSS Classes:**
- `.carousel-controls` - Dots container
- `.carousel-dot` - Individual dot
- `.carousel-arrow` - Arrow button
- `.carousel-arrow.prev` - Previous button
- `.carousel-arrow.next` - Next button

**Usage Example:**
```html
<div class="hobby-image" data-carousel>
  <img class="hobby-carousel-image is-active" src="image1.jpg">
  <img class="hobby-carousel-image" src="image2.jpg">

  <button class="carousel-arrow prev" aria-label="Previous">‹</button>
  <button class="carousel-arrow next" aria-label="Next">›</button>

  <div class="carousel-controls">
    <button class="carousel-dot is-active" data-index="0"></button>
    <button class="carousel-dot" data-index="1"></button>
  </div>
</div>
```

**Features:**
- Dots indicator at bottom
- Arrow buttons on sides
- Auto-hide arrows (show on hover)
- Active state styling
- Touch/swipe ready

---

### 9. **Contact Form**
Functional contact form với validation.

**CSS Classes:**
- `.contact-form` - Form wrapper
- `.form-group` - Input group
- `.form-label` - Label
- `.form-input` - Text input
- `.form-textarea` - Textarea
- `.form-error` - Error message
- `.form-submit` - Submit button
- `.has-error` - Error state modifier

**Usage Example:**
```html
<form class="contact-form" id="contactForm">
  <div class="form-group">
    <label class="form-label" for="name">Tên của bạn</label>
    <input type="text" id="name" class="form-input" required>
    <span class="form-error">Vui lòng nhập tên</span>
  </div>

  <div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input type="email" id="email" class="form-input" required>
    <span class="form-error">Email không hợp lệ</span>
  </div>

  <div class="form-group">
    <label class="form-label" for="message">Tin nhắn</label>
    <textarea id="message" class="form-textarea" required></textarea>
    <span class="form-error">Vui lòng nhập tin nhắn</span>
  </div>

  <button type="submit" class="form-submit">Gửi tin nhắn</button>
</form>
```

**Validation JavaScript:**
```javascript
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('has-error');
  });

  // Validate
  let isValid = true;
  const name = document.getElementById('name');
  if (!name.value.trim()) {
    name.closest('.form-group').classList.add('has-error');
    isValid = false;
  }

  // ... more validation

  if (isValid) {
    // Submit form
    showToast('Thành công', 'Tin nhắn đã được gửi!', 'success');
  }
});
```

---

## 🎨 Design Tokens

### Spacing
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

### Border Radius
```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 999px;    /* Pill shape */
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.2);
```

---

## 📱 Mobile Optimizations

### Touch Targets
All interactive elements now meet **minimum 44x44px** size:
- Buttons: 48px height
- Nav links: 48px padding
- FAB: 56px diameter
- Carousel controls: 40px diameter

### Gestures
- Swipe support for carousel (coming soon)
- Pull-to-refresh hint (coming soon)
- Touch ripple feedback on all buttons

---

## ♿ Accessibility Improvements

### ARIA Labels
All components include proper ARIA labels:
```html
<button aria-label="Đóng modal">×</button>
<div role="dialog" aria-modal="true">
<button aria-expanded="false" aria-controls="menu">
```

### Keyboard Navigation
- ESC closes modals
- Tab navigation works correctly
- Focus visible on all elements
- Skip links for screen readers

### Screen Reader Support
- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- aria-live for dynamic content

---

## 🚀 Performance Considerations

### CSS Optimization
- Hardware acceleration for animations
- Will-change hints
- Contain property for layout
- Reduced motion support

### Best Practices
- Load critical CSS inline
- Lazy load non-critical animations
- Debounce scroll events
- Use IntersectionObserver

---

## 📚 Usage Guidelines

### When to Use Each Component

**Skeleton Loader:**
- Initial page load
- Image loading
- Dynamic content fetching

**Modal:**
- CV preview before download
- Project detail views
- Certificate enlargement
- Confirmations

**Tooltip:**
- Additional info on hover
- Skill level details
- Icon explanations

**Toast:**
- Form submission feedback
- Copy to clipboard success
- Download started
- Error messages

**FAB:**
- Quick contact access
- Primary action shortcut
- Chat widget trigger

**Carousel Controls:**
- Manual image navigation
- Pause auto-play
- Jump to specific image

---

## 🎯 Implementation Checklist

### High Priority
- [x] Loading skeletons
- [x] Modal system
- [x] Toast notifications
- [x] Form validation
- [x] Carousel controls
- [ ] Update HTML with new components
- [ ] Add JavaScript functionality
- [ ] Test on mobile devices

### Medium Priority
- [ ] Animated statistics/counters
- [ ] Better visual hierarchy
- [ ] Glassmorphism effects
- [ ] Dark mode toggle button
- [ ] Professional copywriting

### Low Priority
- [ ] Easter eggs
- [ ] Interactive timeline
- [ ] Testimonials section
- [ ] Blog integration
- [ ] Multi-language support

---

## 🐛 Known Issues & Limitations

1. **Modal:** Needs JavaScript for full functionality
2. **Carousel:** Swipe gestures not yet implemented
3. **Form:** Backend integration required
4. **Toast:** Auto-dismiss timing hardcoded
5. **FAB:** Position may conflict with back-to-top

---

## 📖 References

- [Material Design - Components](https://material.io/components)
- [Nielsen Norman Group - UX Guidelines](https://www.nngroup.com/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Implementation in Progress
