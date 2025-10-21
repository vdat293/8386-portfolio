document.addEventListener("DOMContentLoaded", function () {
  const nameSpan = document.getElementById("typed-name");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const personaSelect = document.querySelector(".persona-select");
  const heroAvatarEl = document.querySelector("[data-hero-avatar]");
  const heroFrontFace = heroAvatarEl?.querySelector('[data-hero-face="front"]');
  const heroBackFace = heroAvatarEl?.querySelector('[data-hero-face="back"]');
  const prefersReducedMotionQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };
  const HERO_FLIP_ACTIVE_DURATION = 4321;
  const HERO_FLIP_INITIAL_DELAY = 1400;
  let heroFlipResetTimeoutId = null;
  let heroFlipInitialTimeoutId = null;
  let heroFlipHasPlayed = false;
  const skillsNavLink = document.querySelector('.nav-link[href="#skills"]');
  const skillsHeading = document.querySelector(".skills-heading");
  const achievementsHeading = document.querySelector(".achievements-heading");
  const skillsProgressList = document.querySelector(".skills-section .skills-list");
  const achievementGrid = document.querySelector(".skills-section .achievement-grid");

  const PERSONA_TEXTS = {
    dat: ["Nguyễn Vũ Đạt", "Sinh viên CNTT"],
    nor: ["Nor", "Cậu bé mộng mơ"]
  };
  const PERSONA_IMAGES = {
    dat: {
      frontSrc: "imgs/avatar.png",
      frontAlt: "Ảnh đại diện — Nguyễn Vũ Đạt",
      backSrc: "imgs/hello.gif",
      backAlt: ""
    },
    nor: {
      frontSrc: "imgs/nor.jpg",
      frontAlt: "Ảnh đại diện — Nor",
      backSrc: null,
      backAlt: ""
    }
  };

  let updateTypeTexts = null;

  if (nameSpan) {
    const TYPE_SPEED = 100;
    const ERASE_SPEED = 60;
    const HOLD_TIME = 1000;

    let texts = PERSONA_TEXTS.dat.slice();
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

      setTimeout(typeEffect, delay);
    };

    updateTypeTexts = (nextTexts = []) => {
      if (!Array.isArray(nextTexts) || nextTexts.length === 0) {
        return;
      }
      texts = nextTexts.slice();
      textIndex = 0;
      charIndex = 0;
      isDeleting = false;
      nameSpan.textContent = "";
    };

    typeEffect();
  }

  const closeNav = () => {
    if (siteNav) {
      siteNav.classList.remove("is-open");
    }
    if (navToggle) {
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("no-scroll");
  };

  const clearHeroFlipTimers = () => {
    if (heroFlipInitialTimeoutId) {
      clearTimeout(heroFlipInitialTimeoutId);
      heroFlipInitialTimeoutId = null;
    }
    if (heroFlipResetTimeoutId) {
      clearTimeout(heroFlipResetTimeoutId);
      heroFlipResetTimeoutId = null;
    }
    if (heroAvatarEl) {
      heroAvatarEl.classList.remove("is-flipped");
    }
    if (heroBackFace && heroBackFace.dataset.gifPlaying === "true") {
      heroBackFace.removeAttribute("src");
      heroBackFace.dataset.gifPlaying = "false";
    }
  };

  const performHeroFlip = () => {
    if (!heroAvatarEl || heroAvatarEl.dataset.hasBack !== "true") return;
    if (prefersReducedMotionQuery.matches) return;
    if (heroFlipResetTimeoutId || heroFlipHasPlayed) return;

    if (heroBackFace && heroBackFace.dataset.gifSrc) {
      const gifSrc = heroBackFace.dataset.gifSrc;
      if (gifSrc) {
        const separator = gifSrc.includes("?") ? "&" : "?";
        heroBackFace.src = `${gifSrc}${separator}cb=${Date.now()}`;
        heroBackFace.dataset.gifPlaying = "true";
      }
    }

    heroAvatarEl.classList.add("is-flipped");
    heroFlipHasPlayed = true;

    heroFlipResetTimeoutId = window.setTimeout(() => {
      heroAvatarEl.classList.remove("is-flipped");
      heroFlipResetTimeoutId = null;
      if (heroBackFace && heroBackFace.dataset.gifPlaying === "true") {
        heroBackFace.removeAttribute("src");
        heroBackFace.dataset.gifPlaying = "false";
      }
    }, HERO_FLIP_ACTIVE_DURATION);
  };

  const startHeroFlipCycle = () => {
    if (heroFlipHasPlayed) {
      clearHeroFlipTimers();
      return;
    }
    clearHeroFlipTimers();
    if (!heroAvatarEl || heroAvatarEl.dataset.hasBack !== "true") return;
    if (prefersReducedMotionQuery.matches) return;

    heroFlipInitialTimeoutId = window.setTimeout(() => {
      performHeroFlip();
    }, HERO_FLIP_INITIAL_DELAY);
  };

  const handleMotionPreferenceChange = (event) => {
    if (event.matches) {
      clearHeroFlipTimers();
    } else if (heroAvatarEl && heroAvatarEl.dataset.hasBack === "true" && !heroFlipHasPlayed) {
      startHeroFlipCycle();
    }
  };

  if (typeof prefersReducedMotionQuery.addEventListener === "function") {
    prefersReducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);
  } else if (typeof prefersReducedMotionQuery.addListener === "function") {
    prefersReducedMotionQuery.addListener(handleMotionPreferenceChange);
  }

  const setHeroImage = (personaKey) => {
    const config = PERSONA_IMAGES[personaKey];
    if (!config || !heroFrontFace) return;

    if (heroFrontFace.getAttribute("src") !== config.frontSrc) {
      heroFrontFace.src = config.frontSrc;
    }
    heroFrontFace.alt = config.frontAlt || "";

    const hasBack = Boolean(heroBackFace && config.backSrc);

    if (heroBackFace) {
      if (hasBack) {
        heroBackFace.dataset.gifSrc = config.backSrc || "";
        heroBackFace.dataset.gifPlaying = "false";
        if (!heroFlipHasPlayed) {
          heroBackFace.removeAttribute("src");
        }
      } else {
        heroBackFace.removeAttribute("src");
        delete heroBackFace.dataset.gifSrc;
        heroBackFace.dataset.gifPlaying = "false";
      }
      heroBackFace.alt = config.backAlt || "";
      heroBackFace.setAttribute("aria-hidden", "true");
      heroBackFace.classList.toggle("is-disabled", !hasBack);
    }

    if (heroAvatarEl) {
      heroAvatarEl.dataset.hasBack = hasBack ? "true" : "false";
    }

    if (hasBack && !heroFlipHasPlayed) {
      startHeroFlipCycle();
    } else {
      clearHeroFlipTimers();
    }
  };

  if (navToggle && siteNav) {
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

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const handleDesktopChange = (event) => {
      if (event.matches) {
        closeNav();
      }
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleDesktopChange);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // IntersectionObserver for scroll animations
  const scrollElements = document.querySelectorAll(".scroll-animate");
  const observerOptions = {
    threshold: 0.1
  };
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);
  scrollElements.forEach(el => scrollObserver.observe(el));

  // Navigation highlighting based on section in viewport
  const sections = document.querySelectorAll("section");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("nav-active"));
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("nav-active");
        }
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(sec => navObserver.observe(sec));

  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const heroSection = document.getElementById("home");
    const setVisibility = (show) => {
      backToTopButton.classList.toggle("is-visible", show);
    };

    if ("IntersectionObserver" in window && heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          setVisibility(!entry.isIntersecting);
        });
      }, { threshold: 0.6 });
      heroObserver.observe(heroSection);
    } else {
      const handleScroll = () => {
        setVisibility(window.scrollY > window.innerHeight * 0.6);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
    }
  }

  // About section profile switching
  let setActiveProfile = null;

  const photoEl = document.getElementById("profile-photo");
  const dobEl = document.getElementById("dob");
  const hometownEl = document.getElementById("hometown");
  const bioEl = document.getElementById("bio");
  const aboutDetails = document.getElementById("about-details");
  const profileLinks = document.querySelectorAll(".name-link");

  if (photoEl && dobEl && hometownEl && bioEl && aboutDetails && profileLinks.length) {
    const profiles = {
      dat: {
        photo: "imgs/img_about.png",
        alt: "Ảnh chân dung — Nguyễn Vũ Đạt",
        dob: "02/09/2003",
        hometown: "Thái Bình",
        bio: `
          <p>Là sinh viên K27 ngành Công nghệ Thông tin tại Đại học Bình Dương, tôi dành nhiều thời gian đào sâu vào front-end và cách con người tương tác với sản phẩm số. Tôi thường tự đặt câu hỏi “người dùng thật sự cần gì” trước khi bắt tay vào viết từng dòng code.</p>
          <p>Trong các dự án gần đây, tôi chịu trách nhiệm khảo sát nhu cầu, phác thảo wireframe, xây dựng UI component và đảm bảo trang web chạy mượt trên nhiều thiết bị. Mỗi lần hoàn thành một bản build ổn định, tôi đều ghi chép lại bài học để chia sẻ cùng bạn bè trong lớp.</p>
          <p>Ngoài việc học, tôi thích đọc sách về thiết kế, tham gia workshop công nghệ và luyện tập e-Sport để cân bằng. Tôi luôn tin sự kiên trì và tinh thần khám phá là chìa khóa giúp mình tiến bộ từng ngày.</p>
        `
      },
      nor: {
        photo: "imgs/maika.jpg",
        alt: "Ảnh chân dung — Nor",
        dob: "—",
        hometown: "Sống tại Bình Dương",
        bio: `
          <p>Nor là phiên bản giàu cảm hứng hơn của tôi: thích trải nghiệm mới, mê những chuyển động nhỏ và thường xuyên thử nghiệm hàng loạt prototype trước khi chọn hướng đi cuối cùng. Nor xem mỗi dự án cá nhân như một sân chơi để kiểm tra ý tưởng lạ.</p>
          <p>Gần đây, Nor tập trung nghiên cứu animation với GSAP, tối ưu hiệu năng bằng Vite và viết lại design system nhỏ để các phần tử trên trang chuyển trạng thái mượt mà. Nếu ban ngày là thời gian cho các môn học trên lớp, thì buổi tối chính là lúc Nor cắm trại cùng Figma, VS Code và playlist Lo-fi.</p>
          <p>Khi cảm thấy bí ý tưởng, Nor sẽ rủ bạn bè cùng bàn về chuyện nghề, đi cà phê hoặc chơi game vài ván để nạp lại năng lượng. Nhờ vậy, mỗi phiên bản của Nor đều khác biệt và không ngừng phát triển.</p>
        `
      }
    };

    setActiveProfile = (key, { immediate = false } = {}) => {
      const profile = profiles[key];
      if (!profile) return;

      profileLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.profile === key);
      });

      const applyTextContent = () => {
        dobEl.textContent = profile.dob;
        hometownEl.textContent = profile.hometown;
        bioEl.innerHTML = profile.bio.trim();
      };

      if (immediate) {
        photoEl.src = profile.photo;
        photoEl.alt = profile.alt;
        applyTextContent();
        aboutDetails.classList.remove("hide");
        photoEl.style.opacity = 1;
        return;
      }

      aboutDetails.classList.add("hide");
      photoEl.style.opacity = 0;

      setTimeout(() => {
        const handleImageLoad = () => {
          photoEl.onload = null;
          requestAnimationFrame(() => {
            photoEl.style.opacity = 1;
          });
        };

        photoEl.onload = handleImageLoad;
        photoEl.src = profile.photo;
        photoEl.alt = profile.alt;
        if (photoEl.complete) {
          handleImageLoad();
        }

        applyTextContent();
        aboutDetails.classList.remove("hide");
      }, 200);
    };

    profileLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const profileKey = link.dataset.profile;
        if (profileKey) {
          setActiveProfile(profileKey);
        }
      });
    });

    setActiveProfile("dat", { immediate: true });
  }

  const hobbyCarouselImages = document.querySelectorAll(".hobby-carousel-image");

  if (hobbyCarouselImages.length) {
    const images = Array.from(hobbyCarouselImages);
    let activeIndex = 0;
    const CAROUSEL_DELAY = 5000;
    const FADE_DURATION_MS = 2000;

    images.forEach((img, index) => {
      img.classList.toggle("is-active", index === activeIndex);
      img.style.zIndex = index === activeIndex ? 2 : 1;
      img.style.setProperty("--hobby-fade-duration", `${FADE_DURATION_MS}ms`);
    });

    if (images.length > 1) {
      let timerId = null;

      const showNextImage = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        const currentImage = images[activeIndex];
        const nextImage = images[nextIndex];

        const revealNext = () => {
          requestAnimationFrame(() => {
            // Set z-index so next image appears on top
            nextImage.style.zIndex = 2;
            currentImage.style.zIndex = 1;

            // Add is-active to next image first (crossfade effect)
            let fallbackTimeoutId = null;

            const cleanup = () => {
              nextImage.removeEventListener("transitionend", handleTransitionEnd);
              nextImage.removeEventListener("transitioncancel", handleTransitionEnd);
              if (fallbackTimeoutId !== null) {
                window.clearTimeout(fallbackTimeoutId);
              }
              currentImage.classList.remove("is-active");
            };

            const handleTransitionEnd = (event) => {
              if (event.propertyName !== "opacity") return;
              cleanup();
            };

            fallbackTimeoutId = window.setTimeout(cleanup, FADE_DURATION_MS + 120);

            nextImage.addEventListener("transitionend", handleTransitionEnd);
            nextImage.addEventListener("transitioncancel", handleTransitionEnd);
            nextImage.classList.add("is-active");
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

        activeIndex = nextIndex;
      };

      const stopCarousel = () => {
        if (timerId !== null) {
          clearInterval(timerId);
          timerId = null;
        }
      };

      const startCarousel = () => {
        stopCarousel();
        timerId = setInterval(showNextImage, CAROUSEL_DELAY);
      };

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (!motionQuery.matches) {
        startCarousel();
      }

      const handleMotionChange = (event) => {
        if (event.matches) {
          stopCarousel();
        } else {
          startCarousel();
        }
      };

      if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", handleMotionChange);
      } else if (typeof motionQuery.addListener === "function") {
        motionQuery.addListener(handleMotionChange);
      }
    }
  }

  const promptEl = document.getElementById("persona-prompt");
  const sentinel = document.getElementById("mode-sentinel");
  const PROMPT_MESSAGE = {
    dat: "Bạn có muốn xem một cá tính khác chứ ?",
    nor: "Bạn muốn về lại nhân cách cũ chứ ?"
  };

  const setSkillsMode = (mode = "skills") => {
    const showingAchievements = mode === "achievements";
    if (skillsNavLink) {
      skillsNavLink.textContent = showingAchievements ? "Thành tựu" : "Kỹ năng";
    }
    if (skillsHeading) {
      skillsHeading.setAttribute("aria-hidden", String(showingAchievements));
    }
    if (achievementsHeading) {
      achievementsHeading.setAttribute("aria-hidden", String(!showingAchievements));
    }
    if (skillsProgressList) {
      skillsProgressList.setAttribute("aria-hidden", String(showingAchievements));
    }
    if (achievementGrid) {
      achievementGrid.setAttribute("aria-hidden", String(!showingAchievements));
    }
  };

  let persona = "dat";
  let hasUnlockedPersonaSelect = false;
  let promptHasFired = false;
  let promptObserver = null;
  let fallbackScrollHandler = null;

  const setPromptVisibility = (visible) => {
    if (!promptEl) return;
    if (promptHasFired && visible) return;
    promptEl.classList.toggle("show", visible);
    promptEl.setAttribute("aria-hidden", String(!visible));
  };

  const updatePromptCopy = () => {
    if (!promptEl) return;
    const message = PROMPT_MESSAGE[persona] || PROMPT_MESSAGE.dat;
    promptEl.textContent = message;
    promptEl.setAttribute("aria-label", message);
  };

  const syncPersonaSelect = () => {
    if (!personaSelect) return;
    personaSelect.value = persona;
  };

  const unlockPersonaSelect = () => {
    if (!personaSelect || hasUnlockedPersonaSelect) return;
    hasUnlockedPersonaSelect = true;
    personaSelect.hidden = false;
    personaSelect.removeAttribute("hidden");
    personaSelect.disabled = false;
    personaSelect.removeAttribute("disabled");
    personaSelect.classList.add("is-visible");
    syncPersonaSelect();
  };

  const applyPersona = (nextPersona, { scrollToTop = true, force = false } = {}) => {
    if (!PERSONA_TEXTS[nextPersona]) return;
    if (!force && persona === nextPersona) {
      syncPersonaSelect();
      return;
    }

    persona = nextPersona;
    document.body.classList.toggle("dark", persona === "nor");
    if (updateTypeTexts) updateTypeTexts(PERSONA_TEXTS[persona]);
    if (setActiveProfile) setActiveProfile(persona, { immediate: true });
    setHeroImage(persona);
    updatePromptCopy();
    syncPersonaSelect();
    setSkillsMode(persona === "nor" ? "achievements" : "skills");

    if (scrollToTop) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  applyPersona("dat", { scrollToTop: false, force: true });

  if (personaSelect) {
    personaSelect.addEventListener("change", () => {
      const selectedPersona = personaSelect.value === "nor" ? "nor" : "dat";
      if (!hasUnlockedPersonaSelect) {
        syncPersonaSelect();
        return;
      }
      closeNav();
      setPromptVisibility(false);
      applyPersona(selectedPersona, { scrollToTop: false });
    });
  }

  if (promptEl && sentinel) {
    setPromptVisibility(false);

    const observerOptions = { threshold: 0.75 };

    const disablePrompt = () => {
      setPromptVisibility(false);
      if (promptObserver) {
        promptObserver.disconnect();
        promptObserver = null;
      }
      if (fallbackScrollHandler) {
        window.removeEventListener("scroll", fallbackScrollHandler);
        fallbackScrollHandler = null;
      }
      promptEl.classList.remove("show");
      promptEl.hidden = true;
      promptEl.setAttribute("aria-hidden", "true");
      promptEl.setAttribute("tabindex", "-1");
    };

    if ("IntersectionObserver" in window) {
      promptObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!promptHasFired) {
            setPromptVisibility(entry.isIntersecting);
          }
        });
      }, observerOptions);
      promptObserver.observe(sentinel);
    } else {
      fallbackScrollHandler = () => {
        if (promptHasFired) {
          window.removeEventListener("scroll", fallbackScrollHandler);
          fallbackScrollHandler = null;
          return;
        }
        const rect = sentinel.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;
        setPromptVisibility(inView);
      };
      window.addEventListener("scroll", fallbackScrollHandler, { passive: true });
      fallbackScrollHandler();
    }

    const handlePromptActivation = (event) => {
      if (promptHasFired) return;
      if (event) {
        event.preventDefault();
      }
      promptHasFired = true;
      disablePrompt();
      unlockPersonaSelect();
      applyPersona("nor", { scrollToTop: true });
      promptEl.removeEventListener("click", handlePromptActivation);
      promptEl.removeEventListener("keydown", handlePromptKeydown);
    };

    const handlePromptKeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handlePromptActivation(event);
      }
    };

    promptEl.addEventListener("click", handlePromptActivation);
    promptEl.addEventListener("keydown", handlePromptKeydown);
  }
});
