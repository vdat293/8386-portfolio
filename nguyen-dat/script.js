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
});
