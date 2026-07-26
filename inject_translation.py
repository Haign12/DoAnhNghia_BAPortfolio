import os
import re

files = ["case-study-p1.html", "case-study-p2.html", "case-study-p3.html"]

script_content = """
  <script>
    const caseDict = {
      "en": {},
      "vi": {
        "Portfolio": "Trang chủ",
        "Contents": "Nội dung",
        "Role": "Vai trò",
        "Timeline": "Thời gian",
        "Tools": "Công cụ",
        "Project 01": "Dự án 01",
        "Project 02": "Dự án 02",
        "Project 03": "Dự án 03",
        "Personal Subscription & Expense Analytics": "Phân tích & Theo dõi Chi tiêu",
        "Centralizing fragmented financial data to identify \\"ghost subscriptions\\" and optimize monthly burn rate.": "Tập trung dữ liệu tài chính phân mảnh để phát hiện các gói đăng ký vô ích và tối ưu chi tiêu hàng tháng.",
        "Co-living Task & Split Bill Manager": "Quản lý Co-living & Chia sẻ Hóa đơn",
        "Designing a co-living management app to resolve roommate conflicts through automated chore scheduling and transparent bill splitting.": "Thiết kế ứng dụng quản lý co-living nhằm giải quyết xung đột qua tự động hóa việc nhà và chia sẻ hóa đơn.",
        "Office Group Ordering & Split Payment": "Đặt Đồ Ăn Nhóm & Chia Tiền Tự Động",
        "Mapping the 'As-Is' and 'To-Be' processes for group food ordering to eliminate manual cost calculations and payment friction.": "Mô hình hóa quy trình 'As-Is' và 'To-Be' cho đặt đồ ăn nhóm nhằm loại bỏ tính toán chi phí thủ công.",
        "1. The Problem": "1. Vấn đề",
        "2. Constraints & Trade-offs": "2. Ràng buộc & Đánh đổi",
        "2. Constraints": "2. Ràng buộc",
        "3. Approach & BA Artifacts": "3. Phương pháp & Tài liệu BA",
        "4. Core System Functions & UI Design": "4. Chức năng cốt lõi & Thiết kế UI",
        "4. Core Functions & UI": "4. Chức năng cốt lõi & UI",
        "5. Deep Dive": "5. Đi sâu vào chi tiết",
        "Data Analyst / BA": "Phân tích dữ liệu / BA",
        "2 Weeks": "2 Tuần",
        "3 Weeks": "3 Tuần",
        "Business Analyst": "Phân tích nghiệp vụ",
        "Dashboard Mockup": "Giao diện Dashboard"
      }
    };

    const langViBtn = document.getElementById('lang-vi');
    const langEnBtn = document.getElementById('lang-en');

    // Simple text-node translation walker
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      // skip scripts and styles
      if (node.parentElement && (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE')) continue;
      
      const trimmed = node.nodeValue.trim();
      if (trimmed !== '') {
        textNodes.push({
          node: node,
          original: trimmed,
          fullText: node.nodeValue
        });
      }
    }

    function setLanguage(lang) {
      localStorage.setItem('lang', lang);
      
      textNodes.forEach(item => {
        let dict = caseDict[lang];
        if (lang === 'vi' && dict[item.original]) {
          item.node.nodeValue = item.fullText.replace(item.original, dict[item.original]);
        } else if (lang === 'en') {
          item.node.nodeValue = item.fullText;
        }
      });
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key === 'nav.back') {
          el.innerText = lang === 'vi' ? 'Trang chủ' : 'Portfolio';
        }
      });

      if (lang === 'vi') {
        if(langViBtn) { langViBtn.style.opacity = '1'; langViBtn.style.fontWeight = 'bold'; }
        if(langEnBtn) { langEnBtn.style.opacity = '0.5'; langEnBtn.style.fontWeight = 'normal'; }
      } else {
        if(langEnBtn) { langEnBtn.style.opacity = '1'; langEnBtn.style.fontWeight = 'bold'; }
        if(langViBtn) { langViBtn.style.opacity = '0.5'; langViBtn.style.fontWeight = 'normal'; }
      }
    }

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    if (langViBtn) langViBtn.addEventListener('click', () => setLanguage('vi'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en'));
  </script>
</body>
"""

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "const caseDict =" not in content:
        content = content.replace("</body>", script_content)
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
print("Injected translation scripts.")
