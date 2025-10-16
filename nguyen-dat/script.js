document.addEventListener("DOMContentLoaded", function () {
  const nameSpan = document.getElementById("typed-name");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navList = document.getElementById("primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  if (nameSpan) {
    const texts = ["Nguyễn Vũ Đạt", "Sinh viên CNTT"];
    const TYPE_SPEED = 100;
    const ERASE_SPEED = 60;
    const HOLD_TIME = 1000;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentText = texts[textIndex];
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

  if (navToggle && siteNav && navList) {
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

    const desktopQuery = window.matchMedia("(min-width: 769px)");
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
  const photoEl = document.getElementById("profile-photo");
  const dobEl = document.getElementById("dob");
  const hometownEl = document.getElementById("hometown");
  const bioEl = document.getElementById("bio");
  const skillsEl = document.getElementById("skills");
  const aboutDetails = document.getElementById("about-details");
  const profileLinks = document.querySelectorAll(".name-link");

  if (photoEl && dobEl && hometownEl && bioEl && skillsEl && aboutDetails && profileLinks.length) {
    const profiles = {
      dat: {
        photo: "imgs/img_about.png",
        alt: "Ảnh chân dung — Nguyễn Vũ Đạt",
        dob: "02/09/2003",
        hometown: "Thái Bình",
        bio: "Sinh viên K27 ngành Công nghệ Thông tin tại Trường Đại học Bình Dương. Ít nói, hiếu học, đôi khi hơi lười ˙𐃷˙. Thích e-Sport và tập trung xây dựng trải nghiệm web đẹp mắt.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS", "Figma"]
      },
      nor: {
        photo: "imgs/nor.jpg",
        alt: "Ảnh chân dung — Nor",
        dob: "—",
        hometown: "Sống tại Bình Dương",
        bio: "Nor là phiên bản thích thử nghiệm UI/UX, chuyển động mượt và micro-interaction. Đang học thêm Vue, GSAP và tối ưu hiệu năng cho các dự án cá nhân.",
        skills: ["HTML", "CSS", "JavaScript", "Vue", "GSAP", "Vite", "Figma"]
      }
    };

    const renderProfile = (key, { immediate = false } = {}) => {
      const profile = profiles[key];
      if (!profile) return;

      profileLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.profile === key);
      });

      const applyTextContent = () => {
        dobEl.textContent = profile.dob;
        hometownEl.textContent = profile.hometown;
        bioEl.textContent = profile.bio;
        skillsEl.innerHTML = profile.skills.map(skill => `<li>${skill}</li>`).join("");
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
          renderProfile(profileKey);
        }
      });
    });

    renderProfile("dat", { immediate: true });
  }

  const hobbyCarouselImages = document.querySelectorAll(".hobby-carousel-image");

  if (hobbyCarouselImages.length) {
    const images = Array.from(hobbyCarouselImages);
    let activeIndex = 0;
    const CAROUSEL_DELAY = 4500;

    images.forEach((img, index) => {
      img.classList.toggle("is-active", index === activeIndex);
    });

    if (images.length > 1) {
      let timerId = null;

      const showNextImage = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        const currentImage = images[activeIndex];
        const nextImage = images[nextIndex];

        currentImage.classList.remove("is-active");

        const revealNext = () => {
          requestAnimationFrame(() => {
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
});
