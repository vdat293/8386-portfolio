import {
  TYPING_CONFIG,
  HERO_FLIP_CONFIG,
  PERSONA_CONFIG,
  SKILLS_MODE,
  CAROUSEL_CONFIG,
  OBSERVER_CONFIG,
  BREAKPOINTS,
  SOCIAL_CARDS,
  CONTACT_LINKS
} from "./constants.js";

const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const state = {
  personaKey: "dat",
  hasUnlockedPersonaSelect: false,
  promptHasFired: false,
  heroFlip: {
    hasPlayed: false,
    resetTimeoutId: null,
    initialTimeoutId: null
  },
  promptObserver: null,
  promptScrollFallback: null,
  updateTypeTexts: null,
  setActiveProfile: null
};

document.addEventListener("DOMContentLoaded", () => {
  const elements = cacheDomElements();

  initTypingEffect(elements);
  initNavigation(elements);
  initScrollAnimations(elements);
  initSectionHighlighting(elements);
  initBackToTop(elements);
  initProfileSwitcher(elements);
  initHobbyCarousel();
  initPersonaSystem(elements);
  renderSocialSections();

  applyPersona(state.personaKey, { force: true, scrollToTop: false, elements });
});

function cacheDomElements() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const personaToggle = document.querySelector(".persona-toggle");
  const personaToggleLabel = personaToggle?.querySelector(".persona-toggle-label") || null;
  const heroAvatar = document.querySelector("[data-hero-avatar]");
  const heroFrontFace = heroAvatar?.querySelector('[data-hero-face="front"]') || null;
  const heroBackFace = heroAvatar?.querySelector('[data-hero-face="back"]') || null;

  return {
    nameSpan: document.getElementById("typed-name"),
    navToggle,
    siteNav,
    navLinks,
    personaToggle,
    personaToggleLabel,
    heroAvatar,
    heroFrontFace,
    heroBackFace,
    skillsNavLink: document.querySelector('.nav-link[href="#skills"]'),
    skillsHeading: document.querySelector(".skills-heading"),
    achievementsHeading: document.querySelector(".achievements-heading"),
    skillsProgressList: document.querySelector(".skills-section .skills-list"),
    achievementGrid: document.querySelector(".skills-section .achievement-grid"),
    backToTopButton: document.querySelector(".back-to-top"),
    heroSection: document.getElementById("home"),
    promptElement: document.getElementById("persona-prompt"),
    sentinel: document.getElementById("mode-sentinel"),
    profilePhoto: document.getElementById("profile-photo"),
    dobElement: document.getElementById("dob"),
    hometownElement: document.getElementById("hometown"),
    bioElement: document.getElementById("bio"),
    aboutDetails: document.getElementById("about-details"),
    profileLinks: Array.from(document.querySelectorAll(".name-link"))
  };
}

function initTypingEffect({ nameSpan }) {
  if (!nameSpan) return;

  const { TYPE_SPEED, ERASE_SPEED, HOLD_TIME } = TYPING_CONFIG;
  let texts = PERSONA_CONFIG[state.personaKey].typedTexts.slice();
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentText = texts[textIndex] || "";
    nameSpan.textContent = currentText.substring(0, charIndex);

    let delay = isDeleting ? ERASE_SPEED : TYPE_SPEED;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        charIndex++;
      } else {
        isDeleting = true;
        delay = HOLD_TIME;
      }
    } else if (charIndex > 0) {
      charIndex--;
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    window.setTimeout(typeEffect, delay);
  };

  state.updateTypeTexts = (nextTexts = []) => {
    if (!Array.isArray(nextTexts) || nextTexts.length === 0) return;
    texts = nextTexts.slice();
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    nameSpan.textContent = "";
  };

  typeEffect();
}

function initNavigation({ navToggle, siteNav, navLinks }) {
  if (!navToggle || !siteNav) return;

  const closeNav = () => {
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };

  navToggle.addEventListener("click", () => {
    const willOpen = !siteNav.classList.contains("is-open");
    siteNav.classList.toggle("is-open", willOpen);
    navToggle.classList.toggle("is-active", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    document.body.classList.toggle("no-scroll", willOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (siteNav.classList.contains("is-open")) {
        closeNav();
      }
    });
  });

  const desktopQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.DESKTOP}px)`);
  const handleDesktopChange = event => {
    if (event.matches) {
      closeNav();
    }
  };

  addMediaQueryListener(desktopQuery, handleDesktopChange);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });
}

function initScrollAnimations() {
  const scrollElements = document.querySelectorAll(".scroll-animate");
  if (!scrollElements.length || typeof IntersectionObserver === "undefined") return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: OBSERVER_CONFIG.SCROLL_THRESHOLD });

  scrollElements.forEach(el => observer.observe(el));
}

function initSectionHighlighting({ navLinks }) {
  if (!navLinks.length || typeof IntersectionObserver === "undefined") return;

  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("nav-active", isActive);
        });
      }
    });
  }, { threshold: OBSERVER_CONFIG.NAV_THRESHOLD });

  sections.forEach(section => observer.observe(section));
}

function initBackToTop({ backToTopButton, heroSection }) {
  if (!backToTopButton) return;

  const setVisibility = show => {
    backToTopButton.classList.toggle("is-visible", show);
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (typeof IntersectionObserver !== "undefined" && heroSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setVisibility(!entry.isIntersecting);
      });
    }, { threshold: OBSERVER_CONFIG.HERO_THRESHOLD });
    observer.observe(heroSection);
  } else {
    const handleScroll = () => {
      setVisibility(window.scrollY > window.innerHeight * OBSERVER_CONFIG.HERO_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

function initProfileSwitcher(elements) {
  const {
    profilePhoto,
    dobElement,
    hometownElement,
    bioElement,
    aboutDetails,
    profileLinks
  } = elements;

  if (!profilePhoto || !dobElement || !hometownElement || !bioElement || !aboutDetails || !profileLinks.length) {
    return;
  }

  const profiles = {
    dat: PERSONA_CONFIG.dat.profile,
    nor: PERSONA_CONFIG.nor.profile
  };

  state.setActiveProfile = (key, { immediate = false } = {}) => {
    const profile = profiles[key];
    if (!profile) return;

    profileLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.profile === key);
    });

    const applyTextContent = () => {
      dobElement.textContent = profile.dob;
      hometownElement.textContent = profile.hometown;
      bioElement.innerHTML = profile.bio.trim();
    };

    if (immediate) {
      profilePhoto.src = profile.photo;
      profilePhoto.alt = profile.alt;
      applyTextContent();
      aboutDetails.classList.remove("hide");
      profilePhoto.style.opacity = 1;
      return;
    }

    aboutDetails.classList.add("hide");
    profilePhoto.style.opacity = 0;

    window.setTimeout(() => {
      const handleImageLoad = () => {
        profilePhoto.onload = null;
        requestAnimationFrame(() => {
          profilePhoto.style.opacity = 1;
        });
      };

      profilePhoto.onload = handleImageLoad;
      profilePhoto.src = profile.photo;
      profilePhoto.alt = profile.alt;
      if (profilePhoto.complete) {
        handleImageLoad();
      }

      applyTextContent();
      aboutDetails.classList.remove("hide");
    }, 200);
  };

  profileLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const profileKey = link.dataset.profile;
      if (profileKey) {
        state.setActiveProfile(profileKey);
      }
    });
  });
}

function initHobbyCarousel() {
  const images = Array.from(document.querySelectorAll(".hobby-carousel-image"));
  if (images.length <= 1) return;

  let activeIndex = 0;
  let timerId = null;
  const { DELAY, FADE_DURATION } = CAROUSEL_CONFIG;

  const applyActiveState = () => {
    images.forEach((img, index) => {
      img.classList.toggle("is-active", index === activeIndex);
      img.style.setProperty("--hobby-fade-duration", `${FADE_DURATION}ms`);
    });
  };

  const showNextImage = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    const currentImage = images[activeIndex];
    const nextImage = images[nextIndex];

    const revealNext = () => {
      requestAnimationFrame(() => {
        nextImage.classList.add("is-active");
        currentImage.classList.remove("is-active");
        activeIndex = nextIndex;
      });
    };

    if (nextImage.complete && nextImage.naturalWidth !== 0) {
      revealNext();
    } else {
      nextImage.addEventListener("load", function handleLoad() {
        nextImage.removeEventListener("load", handleLoad);
        revealNext();
      });
    }
  };

  const start = () => {
    stop();
    timerId = window.setInterval(showNextImage, DELAY);
  };

  const stop = () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  applyActiveState();

  if (!prefersReducedMotionQuery.matches) {
    start();
  }

  const handleMotionChange = event => {
    if (event.matches) {
      stop();
    } else {
      start();
    }
  };

  addMediaQueryListener(prefersReducedMotionQuery, handleMotionChange);
}

function initPersonaSystem(elements) {
  syncPersonaToggle(elements);
  setupPersonaToggle(elements);
  setupPersonaPrompt(elements);
  setupHeroFlipMotionListener(elements);
}

function setupPersonaToggle({ personaToggle }) {
  if (!personaToggle) return;

  personaToggle.addEventListener("click", () => {
    if (!state.hasUnlockedPersonaSelect) {
      syncPersonaToggle({ personaToggle, personaToggleLabel: personaToggle.querySelector(".persona-toggle-label") });
      return;
    }
    const nextPersona = state.personaKey === "dat" ? "nor" : "dat";
    closeNavMenu();
    setPromptVisibility(false);
    applyPersona(nextPersona, { scrollToTop: false });
  });
}

function setupPersonaPrompt({ promptElement, sentinel }) {
  if (!promptElement || !sentinel) return;

  setPromptVisibility(false);

  const disablePrompt = () => {
    setPromptVisibility(false);
    if (state.promptObserver) {
      state.promptObserver.disconnect();
      state.promptObserver = null;
    }
    if (state.promptScrollFallback) {
      window.removeEventListener("scroll", state.promptScrollFallback);
      state.promptScrollFallback = null;
    }
    promptElement.classList.remove("show");
    promptElement.hidden = true;
    promptElement.setAttribute("aria-hidden", "true");
    promptElement.setAttribute("tabindex", "-1");
  };

  if (typeof IntersectionObserver !== "undefined") {
    state.promptObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!state.promptHasFired) {
          setPromptVisibility(entry.isIntersecting);
        }
      });
    }, { threshold: OBSERVER_CONFIG.PROMPT_THRESHOLD });
    state.promptObserver.observe(sentinel);
  } else {
    state.promptScrollFallback = () => {
      if (state.promptHasFired) {
        window.removeEventListener("scroll", state.promptScrollFallback);
        state.promptScrollFallback = null;
        return;
      }
      const rect = sentinel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom >= 0;
      setPromptVisibility(inView);
    };
    window.addEventListener("scroll", state.promptScrollFallback, { passive: true });
    state.promptScrollFallback();
  }

  const activatePrompt = event => {
    if (state.promptHasFired) return;
    if (event) {
      event.preventDefault();
    }
    state.promptHasFired = true;
    disablePrompt();
    unlockPersonaToggle();
    applyPersona("nor", { scrollToTop: true });
    promptElement.removeEventListener("click", activatePrompt);
    promptElement.removeEventListener("keydown", handlePromptKeydown);
  };

  const handlePromptKeydown = event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activatePrompt(event);
    }
  };

  promptElement.addEventListener("click", activatePrompt);
  promptElement.addEventListener("keydown", handlePromptKeydown);
}

function setupHeroFlipMotionListener(elements) {
  const handler = event => {
    if (event.matches) {
      clearHeroFlipTimers(elements);
    } else if (elements.heroAvatar?.dataset.hasBack === "true" && !state.heroFlip.hasPlayed) {
      scheduleHeroFlip(elements);
    }
  };

  addMediaQueryListener(prefersReducedMotionQuery, handler);
}

function applyPersona(nextPersona, { scrollToTop = true, force = false, elements = cacheDomElements() } = {}) {
  const persona = PERSONA_CONFIG[nextPersona];
  if (!persona) return;
  if (!force && state.personaKey === persona.key) {
    syncPersonaToggle(elements);
    return;
  }

  state.personaKey = persona.key;

  document.body.classList.toggle("dark", persona.theme === "dark");

  if (state.updateTypeTexts) {
    state.updateTypeTexts(persona.typedTexts);
  }

  if (state.setActiveProfile) {
    state.setActiveProfile(persona.key, { immediate: true });
  }

  setHeroImage(persona.hero, elements);
  updatePromptCopy(persona);
  syncPersonaToggle(elements);
  setSkillsMode(persona.key === "nor" ? SKILLS_MODE.ACHIEVEMENTS : SKILLS_MODE.SKILLS, elements);

  if (scrollToTop) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function setHeroImage(heroConfig, { heroAvatar, heroFrontFace, heroBackFace }) {
  if (!heroAvatar || !heroFrontFace) return;

  if (heroFrontFace.getAttribute("src") !== heroConfig.frontSrc) {
    heroFrontFace.src = heroConfig.frontSrc;
  }
  heroFrontFace.alt = heroConfig.frontAlt || "";

  const hasBack = Boolean(heroBackFace && heroConfig.backSrc);
  heroAvatar.dataset.hasBack = hasBack ? "true" : "false";

  if (heroBackFace) {
    if (hasBack) {
      heroBackFace.dataset.gifSrc = heroConfig.backSrc;
      heroBackFace.alt = heroConfig.backAlt || "";
      heroBackFace.dataset.gifPlaying = "false";
      if (!heroBackFace.src) {
        heroBackFace.src = heroConfig.backSrc;
      }
    } else {
      heroBackFace.removeAttribute("src");
      delete heroBackFace.dataset.gifSrc;
      heroBackFace.dataset.gifPlaying = "false";
    }
    heroBackFace.setAttribute("aria-hidden", "true");
    heroBackFace.classList.toggle("is-disabled", !hasBack);
  }

  if (hasBack && !prefersReducedMotionQuery.matches) {
    scheduleHeroFlip({ heroAvatar, heroBackFace });
  } else {
    clearHeroFlipTimers({ heroAvatar, heroBackFace });
  }
}

function scheduleHeroFlip({ heroAvatar, heroBackFace }) {
  clearHeroFlipTimers({ heroAvatar, heroBackFace });

  if (!heroAvatar || heroAvatar.dataset.hasBack !== "true" || state.heroFlip.hasPlayed) {
    return;
  }

  state.heroFlip.initialTimeoutId = window.setTimeout(() => {
    performHeroFlip({ heroAvatar, heroBackFace });
  }, HERO_FLIP_CONFIG.INITIAL_DELAY);
}

function performHeroFlip({ heroAvatar, heroBackFace }) {
  if (!heroAvatar || heroAvatar.dataset.hasBack !== "true") return;

  if (heroBackFace && heroBackFace.dataset.gifSrc) {
    const gifSrc = heroBackFace.dataset.gifSrc;
    const separator = gifSrc.includes("?") ? "&" : "?";
    heroBackFace.src = `${gifSrc}${separator}cb=${Date.now()}`;
    heroBackFace.dataset.gifPlaying = "true";
  }

  heroAvatar.classList.add("is-flipped");
  state.heroFlip.hasPlayed = true;

  state.heroFlip.resetTimeoutId = window.setTimeout(() => {
    heroAvatar.classList.remove("is-flipped");
    state.heroFlip.resetTimeoutId = null;
    state.heroFlip.hasPlayed = false;
  }, HERO_FLIP_CONFIG.ACTIVE_DURATION);
}

function clearHeroFlipTimers({ heroAvatar, heroBackFace }) {
  if (state.heroFlip.initialTimeoutId) {
    window.clearTimeout(state.heroFlip.initialTimeoutId);
    state.heroFlip.initialTimeoutId = null;
  }
  if (state.heroFlip.resetTimeoutId) {
    window.clearTimeout(state.heroFlip.resetTimeoutId);
    state.heroFlip.resetTimeoutId = null;
  }
  if (heroAvatar) {
    heroAvatar.classList.remove("is-flipped");
  }
  state.heroFlip.hasPlayed = false;
}

function setSkillsMode(mode, { skillsNavLink, skillsHeading, achievementsHeading, skillsProgressList, achievementGrid }) {
  if (skillsNavLink) {
    skillsNavLink.textContent = mode === SKILLS_MODE.ACHIEVEMENTS ? "Thành tựu" : "Kỹ năng";
  }
  if (skillsHeading) {
    skillsHeading.setAttribute("aria-hidden", String(mode === SKILLS_MODE.ACHIEVEMENTS));
  }
  if (achievementsHeading) {
    achievementsHeading.setAttribute("aria-hidden", String(mode !== SKILLS_MODE.ACHIEVEMENTS));
  }
  if (skillsProgressList) {
    skillsProgressList.setAttribute("aria-hidden", String(mode === SKILLS_MODE.ACHIEVEMENTS));
  }
  if (achievementGrid) {
    achievementGrid.setAttribute("aria-hidden", String(mode !== SKILLS_MODE.ACHIEVEMENTS));
  }
}

function updatePromptCopy(persona) {
  const promptEl = document.getElementById("persona-prompt");
  if (!promptEl) return;
  promptEl.textContent = persona.prompt;
  promptEl.setAttribute("aria-label", persona.prompt);
}

function syncPersonaToggle({ personaToggle, personaToggleLabel } = cacheDomElements()) {
  if (!personaToggle || !personaToggleLabel) return;
  personaToggle.dataset.persona = state.personaKey;
  personaToggleLabel.textContent = PERSONA_CONFIG[state.personaKey].label;
  personaToggle.setAttribute("aria-label", `Đang xem: ${PERSONA_CONFIG[state.personaKey].label}. Nhấn để chuyển`);
}

function unlockPersonaToggle() {
  const { personaToggle, personaToggleLabel } = cacheDomElements();
  if (!personaToggle || state.hasUnlockedPersonaSelect) return;
  state.hasUnlockedPersonaSelect = true;
  personaToggle.hidden = false;
  personaToggle.removeAttribute("hidden");
  personaToggle.disabled = false;
  personaToggle.removeAttribute("disabled");
  personaToggle.classList.add("is-visible");
  syncPersonaToggle({ personaToggle, personaToggleLabel });
}

function setPromptVisibility(visible) {
  const promptEl = document.getElementById("persona-prompt");
  if (!promptEl || (state.promptHasFired && visible)) return;
  promptEl.classList.toggle("show", visible);
  promptEl.setAttribute("aria-hidden", String(!visible));
}

function closeNavMenu() {
  const { siteNav, navToggle } = cacheDomElements();
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

function renderSocialSections() {
  const cardHost = document.querySelector('[data-social="cards"]');
  if (cardHost) {
    cardHost.innerHTML = SOCIAL_CARDS.map(createSocialCardMarkup).join("");
  }

  const iconHost = document.querySelector('[data-social="icons"]');
  if (iconHost) {
    iconHost.innerHTML = CONTACT_LINKS.map(createContactIconMarkup).join("");
  }
}

function createSocialCardMarkup(link) {
  return `
    <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="social-card ${link.id}" aria-label="Xem ${link.name} của tôi">
      <div class="icon" aria-hidden="true">
        ${link.icon}
      </div>
      <h3>${link.name}</h3>
      <p>${link.handle}</p>
    </a>
  `.trim();
}

function createContactIconMarkup(link) {
  return `
    <a href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ qua ${link.name}">
      <span class="contact-icon" aria-hidden="true">
        ${link.icon}
      </span>
    </a>
  `.trim();
}

function addMediaQueryListener(mediaQuery, handler) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handler);
  }
}
