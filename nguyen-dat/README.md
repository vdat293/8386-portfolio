# Portfolio - Nguyễn Vũ Đạt

Portfolio cá nhân của Nguyễn Vũ Đạt - Sinh viên Công nghệ Thông tin K27 Đại học Bình Dương.

## Tính năng chính

- ✨ Giao diện hiện đại, responsive trên mọi thiết bị
- 🌓 Dark mode (persona switching)
- 🎨 Animations và transitions mượt mà
- ♿ Accessibility-friendly (WCAG 2.1 compliant)
- 🚀 Performance optimized
- 📱 PWA-ready
- 🔍 SEO optimized

## Công nghệ sử dụng

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Anton, Poppins, Sacramento)

## Cấu trúc thư mục

```
nguyen-dat/
├── index.html          # Trang chính
├── style.css           # Stylesheet chính
├── script.js           # JavaScript logic
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots file
├── sitemap.xml         # Sitemap cho search engines
├── .htaccess           # Apache configuration
├── imgs/               # Thư mục hình ảnh
│   ├── avatar.png
│   ├── img_about.png
│   └── ...
└── assets/
    └── cv.pdf          # File CV
```

## Các tối ưu đã thực hiện

### 1. Performance (Hiệu năng)
- ✅ Lazy loading cho hình ảnh
- ✅ Font-display: swap cho Google Fonts
- ✅ Preconnect cho external resources
- ✅ GZIP compression (.htaccess)
- ✅ Browser caching
- ✅ Optimized CSS animations
- ✅ Reduced motion support

### 2. SEO (Tối ưu công cụ tìm kiếm)
- ✅ Meta tags (description, keywords, author)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Structured Data (JSON-LD Schema.org)
- ✅ Canonical URL
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML

### 3. Accessibility (Khả năng tiếp cận)
- ✅ Skip to main content link
- ✅ Proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Alt text cho tất cả hình ảnh
- ✅ Proper heading hierarchy
- ✅ Color contrast compliance
- ✅ Screen reader friendly

### 4. Security (Bảo mật)
- ✅ Content Security Policy headers
- ✅ X-Frame-Options (clickjacking protection)
- ✅ X-XSS-Protection
- ✅ X-Content-Type-Options
- ✅ rel="noopener noreferrer" cho external links
- ✅ Protected sensitive files

### 5. PWA Features
- ✅ Web App Manifest
- ✅ Theme color
- ✅ Apple touch icon
- ✅ Standalone display mode

## Hướng dẫn cài đặt

1. Clone hoặc download repository
2. Cập nhật URL trong các file sau:
   - `index.html`: Thay "https://yourwebsite.com/" bằng URL thực tế
   - `sitemap.xml`: Cập nhật URLs
   - `manifest.json`: Kiểm tra start_url
3. Đảm bảo có file CV tại `assets/cv.pdf`
4. Upload lên web server hỗ trợ .htaccess (Apache)

## Tối ưu hình ảnh

Để tối ưu hơn nữa, nên:
1. Chuyển đổi hình ảnh sang định dạng WebP
2. Tạo nhiều kích thước khác nhau (responsive images)
3. Sử dụng `<picture>` element với srcset

## Checklist triển khai

- [ ] Cập nhật tất cả URLs từ "yourwebsite.com" sang domain thực
- [ ] Thêm file CV vào thư mục assets/
- [ ] Tối ưu kích thước hình ảnh
- [ ] Chuyển hình ảnh sang WebP (nếu có thể)
- [ ] Tạo favicon đa kích thước
- [ ] Test trên nhiều trình duyệt
- [ ] Test responsive trên nhiều thiết bị
- [ ] Test accessibility với screen reader
- [ ] Test performance với Lighthouse
- [ ] Bật HTTPS trên server
- [ ] Uncomment HTTPS redirect trong .htaccess

## Testing

### Performance Test
Sử dụng [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) hoặc [PageSpeed Insights](https://pagespeed.web.dev/)

### Accessibility Test
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### SEO Test
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2025 Nguyễn Vũ Đạt. All rights reserved.

## Contact

- Email: ng.vdat293@gmail.com
- GitHub: [@vdat293](https://github.com/vdat293)
- Facebook: [Nguyễn Đạt](https://www.facebook.com/ng.vdat293)
- Instagram: [@ng.vdat293](https://www.instagram.com/ng.vdat293)

---

**Note**: Đây là portfolio cá nhân được tối ưu cho hiệu năng, SEO và accessibility. Mọi góp ý xin liên hệ qua email.
