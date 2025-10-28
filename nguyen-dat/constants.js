/**
 * Centralised configuration for the portfolio website.
 * Keep all static data and numbers here so behaviour in other modules stays lean.
 */

export const TYPING_CONFIG = {
  TYPE_SPEED: 100,
  ERASE_SPEED: 60,
  HOLD_TIME: 1000
};

export const HERO_FLIP_CONFIG = {
  ACTIVE_DURATION: 4555,
  INITIAL_DELAY: 1400
};

export const PERSONA_TRANSITION_CONFIG = {
  DURATION: 600
};

export const PERSONA_CONFIG = {
  dat: {
    key: "dat",
    label: "Đạt",
    typedTexts: ["Nguyễn Vũ Đạt", "Sinh viên CNTT"],
    theme: "light",
    prompt: "Bạn có muốn xem một cá tính khác chứ ?",
    hero: {
      frontSrc: "imgs/avatar.png",
      frontAlt: "Ảnh đại diện — Nguyễn Vũ Đạt",
      backSrc: "imgs/hello.gif",
      backAlt: ""
    },
    profile: {
      photo: "imgs/img_about.png",
      alt: "Ảnh chân dung — Nguyễn Vũ Đạt",
      dob: "02/09/2003",
      hometown: "Thái Bình cũ (bây giờ là Hưng Yên)",
      bio: `
        <p>Là sinh viên K27 ngành Công nghệ Thông tin tại Đại học Bình Dương, tôi dành nhiều thời gian đào sâu vào front-end và cách con người tương tác với sản phẩm số. Tôi thường tự đặt câu hỏi “người dùng thật sự cần gì” trước khi bắt tay vào viết từng dòng code.</p>
        <p>Ngoài giờ học, tôi dành thời gian tham gia các câu lạc bộ công nghệ, tự học thêm về
                                thiết kế và viết blog chia sẻ kinh nghiệm cho bạn bè. Tôi tin rằng sự tò mò và tính kỷ
                                luật là chìa khóa giúp mình tiến bộ mỗi ngày.</p>
        <p>Tôi còn thích đọc sách về thiết kế, tham gia workshop công nghệ và luyện tập e-Sport để cân bằng. Tôi luôn tin sự kiên trì và tinh thần khám phá là chìa khóa giúp mình tiến bộ từng ngày.</p>
      `
    }
  },
  nor: {
    key: "nor",
    label: "Nor",
    typedTexts: ["Nor", "Cậu bé mộng mơ"],
    theme: "dark",
    prompt: "Bạn muốn về lại nhân cách cũ chứ ?",
    hero: {
      frontSrc: "imgs/maika.jpg",
      frontAlt: "Ảnh đại diện — Nor",
      backSrc: null,
      backAlt: ""
    },
    profile: {
      photo: "imgs/mika2.png",
      alt: "Ảnh chân dung — Nor",
      dob: "02/09/2003",
      hometown: "Thái Bình cũ (bây giờ là Hưng Yên)",
      bio: `
        <p>Nor một cá tính đầy sự mông mơ với cái tôi và ước vọng lớn, một cá tính với sự chỉnh chu và chủ nghĩa hoàn hảo. Đây là mặt khác trên không gian mạng nơi mà tôi có thể thể hiện cái tôi một cách phóng túng nhất</p>
        <p>Khả năng học hỏi siêu phàm khiến với chủ nghĩa hoàn hảo khiến cho tôi chinh phục được tất cả mục tiêu đề ra. Các ví dụ điển hình: có video trên tiktok hơn 1 triệu view, phá đảo tất cả các tựa game mình chơi, từng có thứ hạng cao trong thi đấu quốc nội game fps (top 5 đội tuyển mạnh nhất tựa game Rules of Survival)</p>
        <p><strong>"Không ngừng phát triển, không gì là không thể chinh phục"</strong> - đây là châm ngôn của tôi</p>
      `
    }
  }
};

export const SKILLS_MODE = {
  SKILLS: "skills",
  ACHIEVEMENTS: "achievements"
};

export const CAROUSEL_CONFIG = {
  DELAY: 5000,
  FADE_DURATION: 2000
};

export const OBSERVER_CONFIG = {
  SCROLL_THRESHOLD: 0.1,
  NAV_THRESHOLD: 0.5,
  HERO_THRESHOLD: 0.6,
  PROMPT_THRESHOLD: 0.75
};

export const BREAKPOINTS = {
  DESKTOP: 901,
  TABLET: 768,
  MOBILE: 600
};

export const SOCIAL_CARDS = [
  {
    id: "github",
    name: "GitHub",
    handle: "@vdat293",
    href: "https://github.com/vdat293",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.55v-1.93c-3.2.7-3.88-1.39-3.88-1.39-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.3 1.19-3.12-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18.92-.26 1.91-.4 2.89-.4.98 0 1.97.14 2.89.4 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.74.11 3.03.74.82 1.19 1.86 1.19 3.12 0 4.42-2.69 5.39-5.26 5.68.42.37.78 1.09.78 2.2v3.26c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    `
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@ng.vdat293",
    href: "https://www.tiktok.com/@ng.vdat293",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    `
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Nguyễn Đạt",
    href: "https://www.facebook.com/ng.vdat293",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82V14.706H9.692v-3.6h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.324 0 2.464.099 2.795.143v3.24l-1.92.001c-1.506 0-1.798.716-1.798 1.765v2.315h3.594l-.468 3.6h-3.126V24h6.127C23.407 24 24 23.406 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
      </svg>
    `
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@ng.vdat293",
    href: "https://www.instagram.com/ng.vdat293",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2A3 3 0 1 0 12 15a3 3 0 0 0 0-5.5Zm5.75-2.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    `
  }
];

export const CONTACT_LINKS = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/ng.vdat293",
    icon: `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <title>Facebook</title>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    `
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/ng.vdat293",
    icon: `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <title>Instagram</title>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    `
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/@ng.vdat293",
    icon: `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <title>TikTok</title>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    `
  }
];
