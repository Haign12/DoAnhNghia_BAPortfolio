# FinTrack — Bộ Tài Liệu BA Hoàn Chỉnh
### Personal Subscription & Expense Tracker

> Tài liệu này được viết theo chuẩn để bạn có thể thao tác/dựng lại y như một dự án phần mềm thật. Copy từng phần vào case study, vẽ lại các diagram bằng Draw.io/Figma theo đúng mô tả bên dưới.

---

## 1. Business Requirement Document (BRD) — rút gọn

**Mục tiêu kinh doanh:** Giảm chi phí cố định hàng tháng bị lãng phí do các subscription không còn sử dụng ("ghost subscription"), thông qua việc trực quan hoá dòng tiền và tự động phát hiện dịch vụ không hoạt động.

**Phạm vi (Scope):**
- Trong phạm vi: Theo dõi subscription định kỳ, phát hiện ghost subscription, dashboard trực quan hoá chi tiêu.
- Ngoài phạm vi: Đồng bộ real-time qua Open Banking API, thanh toán tự động hủy subscription.

**Đối tượng sử dụng:** Cá nhân/hộ gia đình tự quản lý tài chính, quy mô 10–50 giao dịch định kỳ/tháng.

**Success Metrics (Estimated — based on personal use case, 8 subscriptions tracked over 3 months):**
| Metric | Baseline | Observed Result |
|---|---|---|
| Thời gian review tài chính/tháng | ~2 giờ (thủ công trên Excel) | ~15 phút/tuần (nhờ dashboard tự động) |
| Số ghost subscription phát hiện | Không rõ (thủ công) | 2/8 dịch vụ bị flag Ghost trong 3 tháng |
| Chi phí cố định lãng phí | Không đo được | ~$20/tháng (2 ghost subscriptions) |

> **⚠️ Lưu ý minh bạch:** Đây là kết quả từ use case cá nhân (n=1 user, 8 subscriptions, 3 tháng). Không đủ để kết luận thống kê nhưng cho thấy giá trị thực tế của thuật toán Ghost Detection.

---

## 2. Functional Requirements (FRD)

| FR ID | Mô tả | Độ ưu tiên |
|---|---|---|
| FR-01 | Hệ thống cho phép người dùng thêm/sửa/xoá một subscription (tên dịch vụ, chi phí, chu kỳ thanh toán, ngày bắt đầu) | Must |
| FR-02 | Hệ thống tự động phân loại giao dịch theo từ khoá mô tả (VD: "NETFLIX" → Entertainment) | Must |
| FR-03 | Hệ thống chạy thuật toán Ghost Detection hàng tuần, quét các subscription không có transaction trong ≥30 ngày | Must |
| FR-04 | Hệ thống hiển thị modal cảnh báo Ghost kèm CTA "Huỷ ngay" hoặc "Snooze 7 ngày" | Must |
| FR-05 | Hệ thống tính toán số tiền tiết kiệm được (tháng/năm) nếu huỷ subscription | Should |
| FR-06 | Hệ thống xử lý ngoại lệ: thẻ hết hạn, giao dịch định kỳ thất bại | Should |
| FR-07 | Dashboard hiển thị KPI: Subscription Utilization Rate, True Fixed Cost, Variance to Budget | Must |
| FR-08 | Người dùng có thể export báo cáo tháng dạng PDF/CSV | Could |

### Requirements Prioritization (MoSCoW)
| Priority | Features | Rationale |
|---|---|---|
| **Must Have** | CRUD Subscription, Ghost Detection, Dashboard KPIs, Alert Modal | Core value proposition — không có thì sản phẩm không khác gì spreadsheet |
| **Should Have** | Savings Calculator, Exception Handling (thẻ hết hạn) | Nâng cao chất lượng quyết định nhưng MVP vẫn chạy được |
| **Could Have** | PDF/CSV Export, Budget Alerts | Nice-to-have cho power users |
| **Won't Have (v1)** | Open Banking API sync, AI budget suggestions | Yêu cầu partnership và ML infrastructure — defer sang v2 |

### Non-Functional Requirements (NFR)
| NFR ID | Loại | Mô tả |
|---|---|---|
| NFR-01 | Security / Compliance | Dữ liệu tài chính phải mã hóa at rest (AES-256). Tuân thủ PDPA (Việt Nam) và nguyên tắc GDPR khi lưu dữ liệu liên kết ngân hàng. Chỉ lưu token — không lưu số thẻ thô. |
| NFR-02 | Performance | Dashboard phải load trong ≤2 giây cho dataset tới 500 giao dịch |
| NFR-03 | Reliability | Ghost Detection job phải hoàn thành không timeout cho tới 100 subscription active |
| NFR-04 | Usability | User mới phải có thể thêm subscription đầu tiên trong 60 giây không cần hướng dẫn |
| NFR-05 | Data Retention | Lịch sử giao dịch lưu tối thiểu 24 tháng. User có quyền yêu cầu xóa dữ liệu theo GDPR Article 17 |

### Business Case / ROI Analysis
**Tại sao đầu tư build Ghost Detection? (Góc nhìn B2C SaaS)**
- **Problem:** Trung bình mỗi người có 12 subscription active nhưng chỉ sử dụng 8 — tỷ lệ lãng phí 33%
- **Value to User:** Nếu trung bình mỗi ghost subscription tốn $10/tháng, phát hiện 2-3 ghost tiết kiệm $240–$360/năm per user
- **Value to Product:** User tiết kiệm được tiền qua app có retention cao hơn 2.5x (ref: Trim/Truebill). Ghost Detection là tính năng giữ chân, không chỉ là tiện ích
- **Dev Cost:** ~40 giờ engineering cho detection algorithm + alert UI. ROI dương với 1,000 users nếu conversion rate ≥5%

---

## 3. Data Dictionary (Star Schema)

### Fact_Transactions
| Field | Type | Mô tả | Ví dụ |
|---|---|---|---|
| transaction_id | INT (PK) | Định danh giao dịch | 10234 |
| sub_id | INT (FK) | Liên kết Dim_Subscription | 12 |
| transaction_date | DATE | Ngày phát sinh giao dịch | 2026-07-01 |
| amount | DECIMAL(10,2) | Số tiền giao dịch | 15.99 |
| date_key | INT (FK) | Liên kết Dim_Date | 20260701 |

### Dim_Subscription
| Field | Type | Mô tả | Ví dụ |
|---|---|---|---|
| sub_id | INT (PK) | Định danh subscription | 12 |
| service_name | VARCHAR(100) | Tên dịch vụ | Netflix |
| category_id | INT (FK) | Liên kết Dim_Category | 3 |
| monthly_cost | DECIMAL(10,2) | Chi phí mỗi kỳ | 15.99 |
| billing_cycle | ENUM('monthly','yearly') | Chu kỳ thanh toán | monthly |
| status | ENUM('active','cancelled','snoozed') | Trạng thái | active |

### Dim_Category
| Field | Type | Mô tả | Ví dụ |
|---|---|---|---|
| category_id | INT (PK) | Định danh loại | 3 |
| category_name | VARCHAR(50) | Tên loại | Entertainment |
| need_or_want | ENUM('need','want') | Phân loại thiết yếu | want |

### Dim_Date
| Field | Type | Mô tả | Ví dụ |
|---|---|---|---|
| date_key | INT (PK) | Định danh ngày (YYYYMMDD) | 20260701 |
| month | TINYINT | Tháng | 7 |
| quarter | TINYINT | Quý | 3 |
| year | SMALLINT | Năm | 2026 |

---

## 4. ERD — mô tả để vẽ trong Draw.io/dbdiagram.io

```
USERS (1) ---- (N) SUBSCRIPTIONS (1) ---- (N) TRANSACTIONS
SUBSCRIPTIONS (N) ---- (1) DIM_CATEGORY
TRANSACTIONS (N) ---- (1) DIM_DATE
```
**Hướng dẫn vẽ:** Dùng dbdiagram.io, paste đoạn DBML sau, export ảnh PNG:
```
Table users {
  user_id int [pk]
  email varchar
  status varchar
}
Table subscriptions {
  sub_id int [pk]
  user_id int [ref: > users.user_id]
  category_id int [ref: > dim_category.category_id]
  service_name varchar
  monthly_cost decimal
  billing_cycle varchar
  status varchar
}
Table transactions {
  transaction_id int [pk]
  sub_id int [ref: > subscriptions.sub_id]
  date_key int [ref: > dim_date.date_key]
  transaction_date date
  amount decimal
}
Table dim_category {
  category_id int [pk]
  category_name varchar
  need_or_want varchar
}
Table dim_date {
  date_key int [pk]
  month int
  quarter int
  year int
}
```

---

## 5. User Stories & Acceptance Criteria (BDD)

**US-01:** Là người dùng, tôi muốn thêm một subscription mới để hệ thống theo dõi chi phí định kỳ của tôi.
- Given tôi ở màn hình "Add Subscription"
- When tôi nhập tên dịch vụ, chi phí, chu kỳ và nhấn Save
- Then hệ thống lưu subscription với status = "active" và hiển thị trong danh sách

**US-02:** Là người dùng, tôi muốn được cảnh báo khi một subscription không được sử dụng để tôi có thể huỷ kịp thời.
- Given một subscription active không có transaction nào trong 30 ngày
- When hệ thống chạy Ghost Detection job hàng tuần
- Then subscription được gắn nhãn "Ghost" và hiển thị alert modal với số tiền tiết kiệm ước tính

**US-03:** Là người dùng, tôi muốn "Snooze" một cảnh báo Ghost nếu tôi biết mình vẫn cần dịch vụ đó.
- Given một subscription bị flag "Ghost"
- When tôi nhấn "Snooze 7 ngày"
- Then hệ thống ẩn cảnh báo này trong 7 ngày và không tính vào Ghost list cho đến khi hết hạn snooze

**US-04:** Là người dùng, tôi muốn xem KPI tổng quan để đánh giá sức khoẻ tài chính hàng tháng.
- Given tôi mở Dashboard
- When trang được load
- Then hệ thống hiển thị 3 KPI: Subscription Utilization Rate, True Fixed Cost, Variance to Budget, cập nhật theo dữ liệu tháng hiện tại

---

## 6. Requirements Traceability Matrix (RTM)

| Req ID | Business Requirement | User Story | Test Case ID |
|---|---|---|---|
| REQ-01 | Phát hiện ghost subscription | US-02 | TC-01, TC-02 |
| REQ-02 | Cho phép snooze cảnh báo sai | US-03 | TC-03 |
| REQ-03 | CRUD subscription | US-01 | TC-04, TC-05 |
| REQ-04 | Hiển thị KPI dashboard | US-04 | TC-06 |

---

## 7. Test Cases

| TC ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Ghost detection đúng hạn | Subscription "Gym" active, không có transaction 31 ngày | Hệ thống flag "Ghost", hiển thị alert |
| TC-02 | Chưa đủ điều kiện Ghost | Subscription có transaction cách đây 20 ngày | Không bị flag |
| TC-03 | Snooze hoạt động đúng | Nhấn Snooze trên 1 alert | Alert biến mất, không xuất hiện lại trong 7 ngày |
| TC-04 | Thêm subscription hợp lệ | Nhập đầy đủ field, Save | Subscription mới xuất hiện với status active |
| TC-05 | Thêm subscription thiếu field | Bỏ trống "cost", Save | Hệ thống báo lỗi validation, không lưu |
| TC-06 | KPI tính đúng | Có 5 subscription, 1 ghost | Utilization Rate = 4/5 = 80% |

---

## 8. Wireframe Flow (mô tả để dựng trong Figma)

**Màn hình 1 — Dashboard:**
- Header: 3 KPI card (Utilization Rate, Fixed Cost, Variance to Budget)
- Body: Bảng danh sách subscription (Service | Cost | Cycle | Status)
- Ghost subscription hiển thị badge đỏ "Ghost 👻" cạnh tên dịch vụ

**Màn hình 2 — Ghost Alert Modal (trigger khi phát hiện ghost):**
- Tiêu đề: "[Service Name] chưa được dùng trong 30+ ngày"
- Nội dung: Số tiền tiết kiệm được nếu huỷ (tháng/năm)
- 2 nút CTA: "Huỷ ngay" (primary, đỏ) / "Snooze 7 ngày" (secondary)

**Màn hình 3 — Add/Edit Subscription:**
- Form: Service name, Cost, Billing cycle (dropdown), Category (auto-suggest theo keyword), Start date
- Validation: Cost phải > 0, Service name không được trống

---

## 9. 3-Tier Architecture (mô tả để vẽ)

```
[Presentation Tier]
  Neumorphic Dashboard UI (Figma/HTML-CSS)
        |
[Business Logic Tier]
  - Subscription Manager API (CRUD)
  - Ghost Detection Job (scheduled, chạy mỗi tuần)
  - KPI Calculation Service
        |
[Data Access Tier]
  Relational DB (SQLite cho demo / MySQL cho production)
```

---

## 10. Cách trình bày "impact" trung thực

Thay vì viết chung chung, dùng khung này:
> "Áp dụng thử nghiệm trên dữ liệu chi tiêu cá nhân trong 2 tháng (tháng 5–6/2026), tool phát hiện 4 subscription không sử dụng (Gym, 1 dịch vụ streaming trùng lặp, 2 app dùng thử quên huỷ), tương đương ước tính tiết kiệm 5% chi phí cố định hàng tháng. Đây là kết quả từ dữ liệu cá nhân, chưa được kiểm chứng ở quy mô nhiều người dùng."

---

## Checklist hoàn thiện
- [ ] Vẽ ERD bằng dbdiagram.io, export PNG
- [ ] Vẽ 3-tier architecture bằng Draw.io
- [ ] Dựng 3 màn hình wireframe trong Figma, export ảnh
- [ ] Viết lại SQL/Power Query nhất quán với 1 kiến trúc duy nhất
- [ ] Thêm Data Dictionary vào case study
- [ ] Sửa lại phần Impact theo khung trung thực ở mục 10
