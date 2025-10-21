/**
 * Constants and Configuration
 * Centralized configuration for the portfolio website
 */

// Typing effect configuration
export const TYPING_CONFIG = {
  TYPE_SPEED: 100,
  ERASE_SPEED: 60,
  HOLD_TIME: 1000
};

// Persona data configuration
export const PERSONA_TEXTS = {
  dat: ["Nguyễn Vũ Đạt", "Sinh viên CNTT"],
  nor: ["Nor", "Cậu bé mộng mơ"]
};

export const PERSONA_IMAGES = {
  dat: {
    src: "imgs/avatar.png",
    alt: "Ảnh đại diện — Nguyễn Vũ Đạt"
  },
  nor: {
    src: "imgs/nor.jpg",
    alt: "Ảnh đại diện — Nor"
  }
};

// Profile data configuration
export const PROFILES = {
  dat: {
    photo: "imgs/img_about.png",
    alt: "Ảnh chân dung — Nguyễn Vũ Đạt",
    dob: "02/09/2003",
    hometown: "Thái Bình",
    bio: "Sinh viên K27 ngành Công nghệ Thông tin tại Trường Đại học Bình Dương. Ít nói, hiếu học, đôi khi hơi lười ˙𐃷˙. Thích e-Sport và tập trung xây dựng trải nghiệm web đẹp mắt.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS", "Figma"]
  },
  nor: {
    photo: "imgs/maika.jpg",
    alt: "Ảnh chân dung — Nor",
    dob: "—",
    hometown: "Sống tại Bình Dương",
    bio: "Nor là phiên bản thích thử nghiệm UI/UX, chuyển động mượt và micro-interaction. Đang học thêm Vue, GSAP và tối ưu hiệu năng cho các dự án cá nhân.",
    skills: ["HTML", "CSS", "JavaScript", "Vue", "GSAP", "Vite", "Figma"]
  }
};

// Prompt messages
export const PROMPT_MESSAGE = {
  dat: "Bạn có muốn xem một cá tính khác chứ ?",
  nor: "Bạn muốn về lại nhân cách cũ chứ ?"
};

// Skills mode configuration
export const SKILLS_MODE = {
  SKILLS: "skills",
  ACHIEVEMENTS: "achievements"
};

// Carousel configuration
export const CAROUSEL_CONFIG = {
  DELAY: 3000
};

// Observer configuration
export const OBSERVER_CONFIG = {
  SCROLL_THRESHOLD: 0.1,
  NAV_THRESHOLD: 0.5,
  HERO_THRESHOLD: 0.6,
  PROMPT_THRESHOLD: 0.75
};

// Responsive breakpoints
export const BREAKPOINTS = {
  DESKTOP: 901,
  TABLET: 768,
  MOBILE: 600
};

// Animation durations (ms)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 400,
  SLOW: 600
};
