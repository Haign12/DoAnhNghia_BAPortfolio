# KẾ HOẠCH HÀNH ĐỘNG: NÂNG CẤP PORTFOLIO LÊN CHUẨN ENTERPRISE

Tài liệu này tổng hợp toàn bộ feedback chuyên sâu từ góc nhìn Senior Reviewer và chuyển thành các hạng mục hành động (Action Items) cụ thể, có thể thực thi được ngay. Mỗi mục đều ghi rõ **vấn đề gốc → cách sửa → file cần động → mức ưu tiên**.

---

## I. BA VẤN ĐỀ CHÍ MẠNG (Critical — Sửa trước khi nộp bất kỳ hồ sơ nào)

### 1. Số liệu "Impact" không đáng tin (Credibility Crisis)

**Vấn đề:** Các con số hiện tại ("giảm 80%", "100% dispute eliminated", "tiết kiệm 5%") được viết theo phong cách KPI doanh nghiệp nhưng đến từ dự án cá nhân (n=3, n=5), không có baseline đo lường bằng công cụ. Khi phỏng vấn, câu hỏi đầu tiên sẽ là "n bằng bao nhiêu? Đo bằng gì?". Nếu trả lời "tự cảm nhận" → mất uy tín toàn bộ case study.

**Cách sửa (cho từng dự án):**

| Dự án | Số liệu hiện tại | Sửa thành |
|---|---|---|
| **FinTrack** | "Giảm thời gian review từ 2h xuống 15 phút", "Tiết kiệm 5% chi phí cố định" | "Ước lượng dựa trên use case cá nhân (8 subscription, theo dõi 3 tháng): thời gian review giảm đáng kể nhờ dashboard tự động so với kiểm tra thủ công trên Excel. Thuật toán Ghost Detection phát hiện 2/8 dịch vụ không sử dụng." |
| **CoSpace** | "0 disputes, 100% eliminated" | "Thử nghiệm nội bộ trong 3 tuần với 2 bạn cùng phòng: ledger minh bạch giúp không phát sinh hiểu lầm nào trong giai đoạn pilot — so với phản hồi chủ quan là 2-3 lần tranh cãi/tháng trước đó. Mẫu quá nhỏ để đưa ra kết luận thống kê." |
| **OrderFlow** | "Giảm từ 45 phút xuống 5 phút (80%)" | "Áp dụng thử quy trình To-Be trong 5 lần đặt đồ ăn nhóm thực tế (bấm giờ thủ công bằng đồng hồ điện thoại). Thời gian Admin điều phối trung bình giảm từ ~45 phút xuống ~5 phút. Lưu ý: mẫu n=5, chưa đủ để kết luận thống kê nhưng cho thấy xu hướng cải thiện rõ rệt." |

**File cần sửa:**
- `case-study-p1.html` — Phần Impact/Result section
- `case-study-p2.html` — Phần Impact/Result section (dòng ~370)
- `case-study-p3.html` — Phần Impact/Result section (dòng ~330)
- `FinTrack_BA_Artifacts.md` — Bảng Success Metrics
- `CoSpace_BA_Artifacts.md` — Phần "Cách trình bày impact trung thực"
- `OrderFlow_BA_Artifacts.md` — Phần "Cách trình bày impact trung thực"
- `index.html` — Nếu trang chủ có hiển thị số liệu tổng hợp

**Mức ưu tiên:** 🔴 P0 — Sửa NGAY

---

### 2. Thiếu nhất quán giữa các nguồn (Inconsistency = Red Flag cho BA)

**Vấn đề:** Trang chủ (`index.html`) ghi kỹ năng FinTrack là "SQL Server, Power BI, Figma" nhưng case study (`case-study-p1.html`) lại nói "Excel, Power Query" là công cụ chính. Role đổi qua lại giữa "Business Analyst" và "Data Analyst / BA". Với nghề BA — nghề sống bằng độ chính xác tài liệu — đây là lỗi tối kỵ.

**Cách sửa:**
1. Tạo 1 file Google Sheet / Notion làm **Single Source of Truth (SSOT)** với các cột:
   - Dự án | Role chính thức | Tools sử dụng | Impact (đã chuẩn hóa) | Methodology
2. Đối chiếu và đồng bộ dữ liệu từ SSOT ra 3 nơi: `index.html`, `case-study-pX.html`, và CV PDF.
3. Thống nhất Role: Chọn **1 chức danh duy nhất** cho mỗi dự án và giữ nguyên ở mọi nơi.

| Dự án | Role thống nhất đề xuất | Tools thống nhất |
|---|---|---|
| FinTrack | Business Analyst | SQL Server, Power Query, Figma, Draw.io |
| CoSpace | Business Analyst | Figma, Draw.io, html2canvas, Zalo API |
| OrderFlow | Business Analyst | Camunda, Visual Paradigm, PlantUML, Figma |

**File cần sửa:**
- `index.html` — Skills badges + Project cards
- `case-study-p1.html`, `case-study-p2.html`, `case-study-p3.html` — Header/tools section
- CV PDF — Phải export lại

**Mức ưu tiên:** 🔴 P0

---

### 3. Ba dự án đều quy mô cá nhân/hộ gia đình (Scale Gap)

**Vấn đề:** Apple/Samsung cần BA xử lý stakeholder đa quốc gia, compliance, chuỗi cung ứng, hàng triệu user. Portfolio chưa có case nào chứng minh năng lực xử lý **độ phức tạp tổ chức** (nhiều phòng ban mâu thuẫn lợi ích, ràng buộc pháp lý, tích hợp hệ thống legacy, trade-off ngân sách thực).

**Cách sửa:**
1. **Gắn nhãn rõ ràng** trên mỗi case study: `📌 Personal / Simulated Project` — tách biệt rõ với Professional Experience (TIKERA, Trésor Solution).
2. **Thêm phần "Enterprise Scale Considerations"** vào cuối mỗi case study (đặc biệt OrderFlow — case mạnh nhất):
   - *"Nếu scale từ 1 văn phòng → toàn công ty đa chi nhánh thì kiến trúc thay đổi ra sao?"*
   - Multi-tenant architecture, role-based access, audit trail, data residency
3. **Nâng OrderFlow thành Flagship Project** — Bổ sung phân tích:
   - Stakeholder map (Admin, Staff, Finance, Vendor) với conflicting interests
   - Compliance considerations (Internal Wallet → ai chịu trách nhiệm số dư nếu công ty giải thể?)
   - Integration considerations (legacy HR system, ERP)

**File cần sửa:**
- `case-study-p1.html`, `case-study-p2.html`, `case-study-p3.html` — Thêm section mới
- `OrderFlow_BA_Artifacts.md` — Bổ sung phần Enterprise Scale

**Mức ưu tiên:** 🟡 P1

---

## II. VẤN ĐỀ CV (PDF) — CÓ THỂ BỊ ATS LOẠI TỰ ĐỘNG

### 4. Lỗi Kerning/Spacing khi Extract Text

**Vấn đề:** Text trong file `Do_Anh_Nghia_CV.pdf` bị vỡ chữ khi copy-paste ("G athered", "R esearched", "re quirements"). Hệ thống ATS (Applicant Tracking System) của các công ty lớn sẽ parse file này và đọc ra text lỗi → không match được keyword → **bị loại tự động** trước khi đến tay recruiter.

**Cách sửa:**
1. **Test ngay:** Mở file PDF → Ctrl+A → Ctrl+C → Paste vào Notepad. Nếu text bị vỡ → phải sửa.
2. **Export lại PDF** từ nguồn khác:
   - Dùng Google Docs hoặc MS Word (không dùng font/kerning custom quá phức tạp).
   - Dùng font phổ biến: Calibri, Arial, Roboto — không dùng font design-heavy.
   - Test lại bằng cách paste text ra Notepad sau khi export.
3. **Test qua ATS simulator:** Dùng các tool miễn phí như Jobscan hoặc ResumeWorded để check ATS compatibility.

**File cần sửa:** `Do_Anh_Nghia_CV.pdf` — Phải tạo lại từ nguồn

**Mức ưu tiên:** 🔴 P0 — Nộp lỗi này = bị loại tự động

---

### 5. Kinh nghiệm ngắn hạn không được giải thích

**Vấn đề:** TIKERA chỉ 3 tháng (02/2026–05/2026), Trésor Solution 6 tháng. CV không giải thích lý do rời đi. Recruiter **chắc chắn** sẽ hỏi.

**Cách sửa:**
- **Không cần ghi lý do trên CV**, nhưng phải chuẩn bị câu trả lời cực kỳ chắc chắn cho phỏng vấn.
- Gợi ý framework STAR cho câu trả lời:
  - TIKERA: "Đây là hợp đồng ngắn hạn / thực tập, em đã hoàn thành đúng scope được giao là [X]. Kinh nghiệm chính em thu được là [Y]."
  - Trésor: Tương tự, nhấn mạnh vào output và skill gained, không để recruiter nghĩ rằng bạn bị sa thải hoặc không gắn bó.

**Mức ưu tiên:** 🟡 P1 — Chuẩn bị trước phỏng vấn

---

### 6. CV viết như web, không theo chuẩn Resume

**Vấn đề:** Bullet points quá dài, thiếu số liệu định lượng ở đầu câu. Chuẩn resume quốc tế yêu cầu format **"Action Verb + What + Quantified Impact"**.

**Cách sửa — Ví dụ chuyển đổi:**

| Hiện tại (quá dài) | Sửa thành (chuẩn resume) |
|---|---|
| "Gathered and documented business requirements from stakeholders through interviews, workshops, and observation sessions" | "Elicited requirements from 3+ stakeholder groups via structured interviews and observation, producing 15+ user stories with BDD acceptance criteria" |
| "Researched and analyzed existing business processes" | "Mapped As-Is/To-Be BPMN workflows for 2 core processes, identifying 3 bottleneck steps and reducing estimated coordination time by ~80% (n=5 trials)" |

**File cần sửa:** CV PDF — Toàn bộ phần Experience bullets

**Mức ưu tiên:** 🟡 P1

---

## III. SỬA CHI TIẾT THEO TỪNG DỰ ÁN

### 7. FinTrack — Bổ sung chiều sâu Enterprise

| # | Hạng mục cần bổ sung | Chi tiết | Ưu tiên |
|---|---|---|---|
| 7a | **Business Case / ROI** | Tại sao 1 công ty B2C nên đầu tư build Ghost Detection? Bao gồm: Chi phí phát triển ước tính vs. giá trị giữ chân user (retention rate). | 🟡 P1 |
| 7b | **Non-Functional Requirements (NFR)** | Bảo mật dữ liệu tài chính (GDPR/PDPA khi lưu giao dịch), Performance (thời gian load dashboard), Reliability (uptime 99.9%). | 🔴 P0 |
| 7c | **Requirements Prioritization** | Thêm bảng MoSCoW hoặc RICE cho danh sách tính năng (CRUD, Ghost Detection, Savings Calculator...) — hiện tại không thấy bạn từng phải đánh đổi/trade-off điều gì. | 🟡 P1 |
| 7d | **Prototype hoạt động** | Link "View App" phải là Figma interactive prototype hoặc web app chạy thật (hiện có project1-expense-tracker/index.html — kiểm tra xem có hoạt động chưa). | 🟡 P1 |

**File cần sửa:** `case-study-p1.html`, `FinTrack_BA_Artifacts.md`

---

### 8. CoSpace — Bổ sung Artifact & Edge Cases

| # | Hạng mục cần bổ sung | Chi tiết | Ưu tiên |
|---|---|---|---|
| 8a | **Stakeholder Analysis / Persona Card** | Có phỏng vấn roommate (Self-Interview Log tốt) nhưng chưa show Persona Canvas hoặc Pain Point Mapping artifact. Thêm 1 Persona Card ngắn gọn. | 🟡 P1 |
| 8b | **Risk Register** | VD: Nếu 1 người rời nhóm giữa chu kỳ nợ? Nếu chỉ 1/3 người dùng app? (Adoption Risk). Hiện có RTM tốt nhưng thiếu Risk Assessment ở tầng vận hành. | 🟡 P1 |
| 8c | **Auto-Assign Tie-Breaking Rule** | "Gán cho người có completion count thấp nhất" — nhưng nếu 2 người bằng điểm? Cần thêm business rule xử lý hòa. Đây là edge case mà BA giỏi phải lường trước. | 🔴 P0 |
| 8d | **Sửa số liệu impact** | "Eliminated 100% of disputes" → Không ai tin. Sửa thành mô tả định tính hoặc con số khiêm tốn kèm điều kiện (xem mục I.1). | 🔴 P0 |

**File cần sửa:** `case-study-p2.html`, `CoSpace_BA_Artifacts.md`

---

### 9. OrderFlow — Nâng thành Flagship, Bổ sung Enterprise Thinking

| # | Hạng mục cần bổ sung | Chi tiết | Ưu tiên |
|---|---|---|---|
| 9a | **Impact minh bạch** | "45 phút → 5 phút" cần nêu rõ: đo bằng cách nào (bấm giờ điện thoại), mẫu bao nhiêu (n=5 lần đặt hàng). | 🔴 P0 |
| 9b | **Internal Wallet — Phân tích rủi ro tài chính/kế toán** | Ai chịu trách nhiệm số dư ví nội bộ nếu công ty ngừng hoạt động? Đây là câu hỏi compliance thật mà BA cấp enterprise sẽ bị hỏi. | 🟡 P1 |
| 9c | **URL Scraper — Rủi ro pháp lý** | Scraping ShopeeFood/GrabFood vi phạm ToS. BA giỏi phải note rủi ro này trong phần "Constraints / Assumptions". Hiện bạn bỏ qua hoàn toàn. | 🔴 P0 |
| 9d | **Enterprise Scale Section** | Thêm 1 section: "Nếu scale từ 1 văn phòng lên 50 chi nhánh toàn quốc thì kiến trúc/quy trình thay đổi ra sao?" — Multi-tenant, role-based access, audit trail, vendor SLA. | 🟡 P1 |
| 9e | **Stakeholder Conflict Map** | Vẽ bản đồ stakeholder: Admin (muốn nhanh), Staff (muốn tiện), Finance (muốn kiểm soát ngân sách), Vendor (muốn đơn hàng chính xác) — cho thấy khả năng xử lý conflicting interests. | 🟡 P1 |

**File cần sửa:** `case-study-p3.html`, `OrderFlow_BA_Artifacts.md`

---

## IV. NÂNG CẤP TỔNG THỂ (Cross-cutting Improvements)

### 10. Gắn nhãn "Personal / Simulated Project" vs "Professional Experience"

**Vấn đề:** Ranh giới giữa impact thật và impact mô phỏng đang bị nhòe → dễ bị đánh giá là phóng đại.

**Cách sửa:** Thêm badge/label rõ ràng trên mỗi case study:
- `📌 Personal Project — Simulated Use Case`
- `📌 Professional Experience — TIKERA / Trésor Solution`

**File:** Tất cả case study HTML + `index.html`

---

### 11. Thêm minh chứng process (Proof of Work)

**Vấn đề:** Toàn bộ artifact hiện tại là ảnh/markdown tĩnh. Không ai kiểm chứng được bạn tự làm hay dựng lại sau khi có kết quả.

**Cách sửa (chọn ít nhất 2):**
- [ ] Quay video Loom 2-3 phút giải thích tư duy phân tích cho 1 case study
- [ ] Link Figma file thật (không chỉ ảnh export)
- [ ] Link GitHub repo (đã có — highlight rõ hơn trên site)
- [ ] Screenshot quá trình làm việc thật (Git commit history, Jira board, etc.)

**File:** Thêm section "Evidence & Artifacts" vào mỗi case study

---

### 12. Thêm phần "AI trong quy trình BA"

**Vấn đề:** Năm 2026, một BA hiện đại dùng AI để viết user story, phân tích data, tạo test case. Đây là điểm cộng lớn cho vị trí ở big tech.

**Cách sửa:** Thêm 1 section nhỏ trên trang chủ hoặc mỗi case study:
- "Tôi đã sử dụng AI (ChatGPT/Gemini) để [accelerate user story drafting / generate test case templates / analyze data patterns] — sau đó review và tinh chỉnh thủ công để đảm bảo business context."
- Quan trọng: Phải show rằng AI là **công cụ hỗ trợ**, không phải thay thế tư duy.

**File:** `index.html` (section About/Skills), các case study HTML

---

## V. THỨ TỰ THỰC HIỆN (Execution Roadmap)

### Sprint 1 (Làm ngay — trước khi nộp hồ sơ tiếp theo)
| # | Action Item | Ưu tiên |
|---|---|---|
| 1 | Sửa lỗi PDF kerning → Export lại CV | 🔴 P0 |
| 2 | Sửa số liệu impact cả 3 case study → minh bạch quy mô | 🔴 P0 |
| 3 | Đồng bộ tools/role giữa index.html, case study, CV | 🔴 P0 |
| 4 | Thêm NFR cho FinTrack (GDPR/bảo mật) | 🔴 P0 |
| 5 | Thêm tie-breaking rule cho CoSpace Auto-Assign | 🔴 P0 |
| 6 | Thêm Constraints (scraper ToS risk) cho OrderFlow | 🔴 P0 |

### Sprint 2 (Trong 1 tuần)
| # | Action Item | Ưu tiên |
|---|---|---|
| 7 | Gắn nhãn "Personal/Simulated Project" trên mỗi case | 🟡 P1 |
| 8 | Thêm Enterprise Scale section cho OrderFlow | 🟡 P1 |
| 9 | Thêm Business Case/ROI cho FinTrack | 🟡 P1 |
| 10 | Thêm Persona Card + Risk Register cho CoSpace | 🟡 P1 |
| 11 | Thêm Internal Wallet compliance analysis cho OrderFlow | 🟡 P1 |
| 12 | Chuẩn bị câu trả lời phỏng vấn cho kinh nghiệm ngắn hạn | 🟡 P1 |
| 13 | Sửa CV bullets theo format "Verb + What + Impact" | 🟡 P1 |

### Sprint 3 (Trong 2 tuần)
| # | Action Item | Ưu tiên |
|---|---|---|
| 14 | Thêm MoSCoW/RICE prioritization cho FinTrack | 🟢 P2 |
| 15 | Quay Loom video giải thích tư duy cho OrderFlow | 🟢 P2 |
| 16 | Thêm section "AI trong quy trình BA" | 🟢 P2 |
| 17 | Thêm Stakeholder Conflict Map cho OrderFlow | 🟢 P2 |
| 18 | Nâng cấp prototype FinTrack thành interactive | 🟢 P2 |

---

> **Ghi chú cuối:** Bản đánh giá trên rất khắt khe nhưng hoàn toàn đúng. Portfolio hiện tại đã **trên trung bình so với fresher** và thể hiện nền tảng kỹ thuật BA tốt (Star Schema, BPMN, RTM, BDD, Decision Table). Vấn đề không phải bạn thiếu kỹ năng — mà là cách **trình bày và bảo vệ** các artifact chưa đạt chuẩn enterprise. Sửa xong Sprint 1, portfolio sẽ chuyển từ "đẹp nhưng không chắc chắn" sang "minh bạch và đáng tin cậy".
