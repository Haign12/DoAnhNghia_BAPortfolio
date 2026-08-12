(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const progressBar = document.getElementById('progressBar');
  const year = document.getElementById('year');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const translations = {
    vi: {
      'nav.about': 'Giới thiệu', 'nav.work': 'Dự án', 'nav.experience': 'Kinh nghiệm', 'nav.contact': 'Liên hệ', 'nav.resume': 'Xem CV ↗',
      'hero.eyebrow': 'IT BUSINESS ANALYST × UI/UX DESIGNER', 'hero.titleA': 'Tư duy hệ thống.', 'hero.titleB': 'Trải nghiệm trực quan.',
      'hero.lead': 'Mình biến những yêu cầu doanh nghiệp phức tạp thành logic rõ ràng, quy trình có thể triển khai và giao diện người dùng dễ hiểu.',
      'hero.primary': 'Xem các dự án', 'hero.secondary': 'Bắt đầu một cuộc trò chuyện', 'hero.meta1': 'BA case studies', 'hero.meta2': 'UI/UX systems', 'hero.meta3': 'Song ngữ', 'hero.available': 'Sẵn sàng cho cơ hội mới',
      'about.kicker': '01 / GIỚI THIỆU', 'about.title': 'Mình thích làm rõ những điều phức tạp.',
      'about.lead': 'Một hệ thống tốt không chỉ hoạt động đúng. Nó phải giúp con người hiểu mình đang làm gì, vì sao họ làm điều đó và bước tiếp theo là gì.',
      'about.body': 'Với nền tảng Business Analysis và UI/UX, mình kết nối nhu cầu của stakeholder, logic của sản phẩm và trải nghiệm của người dùng trong cùng một quy trình. Mình quan tâm đến những câu hỏi phía sau giao diện: dữ liệu đi đâu, quyết định được đưa ra như thế nào và làm sao để sản phẩm tạo ra giá trị thật.', 'about.focusLabel': 'Mình tập trung vào',
      'work.kicker': '02 / DỰ ÁN TIÊU BIỂU', 'work.title': 'Bằng chứng, không phải trang trí.', 'work.lead': 'Mỗi dự án bắt đầu từ một vấn đề cụ thể và kết thúc bằng một kết quả có thể giải thích.', 'work.baKicker': 'BA / 03 DỰ ÁN', 'work.baTitle': 'Business Analysis', 'work.baLead': 'Ba case study về dữ liệu, quy trình và quyết định vận hành.', 'work.uxKicker': 'UI/UX / 03 DỰ ÁN', 'work.uxTitle': 'UI/UX Design', 'work.uxLead': 'Ba hệ thống UI/UX tập trung vào hierarchy, trải nghiệm và tính ứng dụng.',
      'project.case': 'Đọc case study', 'project.demo': 'Xem dự án', 'project.source': 'Source code GitHub', 'project.figma': 'Figma',
      'project.fintrack.desc': 'Theo dõi chi tiêu và gói đăng ký — biến dữ liệu cá nhân thành một hệ thống giúp nhìn thấy những khoản chi đang bị bỏ quên.', 'project.fintrack.result': 'chi phí cố định được tối ưu trong pilot 3 tháng',
      'project.cospace.desc': 'Mô hình hóa trạng thái đặt phòng và thiết kế dashboard để thay thế dữ liệu phân tán bằng một luồng vận hành thống nhất.', 'project.cospace.result': 'tranh chấp thanh toán được loại bỏ trong pilot 3 người',
      'project.orderflow.desc': 'Mô hình hóa quy trình đặt đồ ăn nhóm từ As-is đến To-be, rồi chuyển hóa nó thành một trải nghiệm theo dõi đơn hàng đơn giản.', 'project.orderflow.result': 'thời gian xử lý của admin được rút ngắn',
      'project.flowcrm.desc': 'Dashboard B2B tập trung vào báo cáo tự động, quản lý người dùng và hierarchy thông tin.', 'project.atelier.desc': 'Ứng dụng thời trang ưu tiên visual elegance và một hành trình mua sắm liền mạch.', 'project.luxroom.desc': 'Ứng dụng nội thất cao cấp với tone màu đất hiện đại và hierarchy giàu tính biên tập.',
      'experience.kicker': '03 / KINH NGHIỆM', 'experience.title': 'Logic được xây dựng từ thực hành.', 'experience.lead': 'Kinh nghiệm của mình nằm ở điểm giao giữa yêu cầu kinh doanh, dữ liệu và giao diện.', 'experience.workLabel': 'Kinh nghiệm', 'experience.educationLabel': 'Học vấn & công cụ',
      'experience.bullet1': 'Thu thập yêu cầu để xác định logic, API và phạm vi tính năng.', 'experience.bullet2': 'Viết User Stories, Acceptance Criteria và đặc tả chức năng.', 'experience.bullet3': 'Kết nối tài liệu BA với luồng màn hình và logic UX.', 'experience.bullet4': 'Đồng bộ tài liệu BA với thiết kế UI/UX.', 'experience.bullet5': 'Làm rõ edge cases và hành vi màn hình với developer.',
      'contact.kicker': '04 / LIÊN HỆ', 'contact.title': 'Cùng xây dựng những giải pháp logic.', 'contact.lead': 'Bạn đang tìm một Business Analyst có tư duy hệ thống và hiểu sâu trải nghiệm người dùng? Mình rất vui được nghe về bài toán của bạn.', 'contact.cta': 'Gửi email cho mình', 'footer.note': 'Thiết kế, phân tích và code từ đầu.'
    },
    en: {
      'nav.about': 'About', 'nav.work': 'Work', 'nav.experience': 'Experience', 'nav.contact': 'Contact', 'nav.resume': 'View resume ↗',
      'hero.eyebrow': 'IT BUSINESS ANALYST × UI/UX DESIGNER', 'hero.titleA': 'Systems thinking.', 'hero.titleB': 'Human experience.',
      'hero.lead': 'I turn complex business requirements into clear logic, buildable workflows and intuitive user experiences.',
      'hero.primary': 'Explore the work', 'hero.secondary': 'Start a conversation', 'hero.meta1': 'BA case studies', 'hero.meta2': 'UI/UX systems', 'hero.meta3': 'Bilingual', 'hero.available': 'Open to new opportunities',
      'about.kicker': '01 / ABOUT', 'about.title': 'I like making complex things clear.',
      'about.lead': 'A good system does more than work. It helps people understand what they are doing, why they are doing it and what comes next.',
      'about.body': 'With a foundation in Business Analysis and UI/UX, I connect stakeholder needs, product logic and user experience in one process. I care about the questions behind the interface: where data goes, how decisions are made and how a product creates real value.', 'about.focusLabel': 'I focus on',
      'work.kicker': '02 / SELECTED WORK', 'work.title': 'Evidence, not decoration.', 'work.lead': 'Every project starts with a concrete problem and ends with an outcome that can be explained.', 'work.baKicker': 'BA / 03 PROJECTS', 'work.baTitle': 'Business Analysis', 'work.baLead': 'Three case studies across data, process and operational decisions.', 'work.uxKicker': 'UI/UX / 03 PROJECTS', 'work.uxTitle': 'UI/UX Design', 'work.uxLead': 'Three UI/UX systems focused on hierarchy, experience and usefulness.',
      'project.case': 'Read case study', 'project.demo': 'View project', 'project.source': 'GitHub source', 'project.figma': 'Figma',
      'project.fintrack.desc': 'A subscription and expense tracker that turns personal data into a system for making forgotten costs visible.', 'project.fintrack.result': 'fixed costs optimized in a 3-month pilot',
      'project.cospace.desc': 'A reservation state model and dashboard replacing scattered tenant data with one operational flow.', 'project.cospace.result': 'payment disputes eliminated in a 3-person pilot',
      'project.orderflow.desc': 'An As-is to To-be process model for group food ordering, translated into a simple order-tracking experience.', 'project.orderflow.result': 'reduction in admin processing time',
      'project.flowcrm.desc': 'A B2B dashboard focused on automated reporting, user management and information hierarchy.', 'project.atelier.desc': 'A fashion app prioritizing visual elegance and a seamless shopping journey.', 'project.luxroom.desc': 'A premium furniture app with modern earthy tones and editorial visual hierarchy.',
      'experience.kicker': '03 / BACKGROUND', 'experience.title': 'Logic built through practice.', 'experience.lead': 'My experience sits at the intersection of business requirements, data and interface.', 'experience.workLabel': 'Experience', 'experience.educationLabel': 'Education & tools',
      'experience.bullet1': 'Gathered requirements to define logic, APIs and feature scope.', 'experience.bullet2': 'Wrote User Stories, Acceptance Criteria and functional specifications.', 'experience.bullet3': 'Connected BA documentation with screen flows and UX logic.', 'experience.bullet4': 'Aligned BA documentation with UI/UX design.', 'experience.bullet5': 'Clarified edge cases and screen behaviors with developers.',
      'contact.kicker': '04 / CONTACT', 'contact.title': 'Let’s build logical solutions.', 'contact.lead': 'Looking for a Business Analyst with systems thinking and a deep understanding of user experience? I would love to hear about your problem.', 'contact.cta': 'Email me', 'footer.note': 'Designed, analyzed and coded from scratch.'
    }
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    themeToggle?.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☼' : '◐';
  };
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => { navMenu?.classList.remove('is-open'); menuToggle?.classList.remove('is-open'); menuToggle?.setAttribute('aria-expanded', 'false'); };
  menuToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); if (event.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); });

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-i18n]').forEach((node) => { const value = translations[lang]?.[node.dataset.i18n]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-lang]').forEach((button) => button.classList.toggle('is-active', button.dataset.lang === lang));
  };
  document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  setLanguage(localStorage.getItem('language') || 'vi');

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    header?.classList.toggle('is-scrolled', scrollTop > 20);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } }); }, { threshold: .12 });
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('active'));

  const navSections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-menu [data-nav]')];
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === entry.target.id)); }), { rootMargin: '-35% 0px -55% 0px' });
    navSections.forEach((section) => spy.observe(section));
  }

  if (year) year.textContent = new Date().getFullYear();
})();
