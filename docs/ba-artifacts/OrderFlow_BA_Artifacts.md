# OrderFlow — Bộ Tài Liệu BA Hoàn Chỉnh
### Office Group Ordering & Split Payment

---

## 1. Business Requirement Document (BRD)

**Vấn đề kinh doanh:** Quy trình đặt đồ ăn/thức uống nhóm tại văn phòng qua group chat gây thất thoát chi phí cho Admin (ứng tiền trước, khó thu hồi) và lãng phí thời gian tổng hợp đơn.

**Phạm vi:**
- Trong phạm vi: Tạo session order, tự động chia tiền + phí ship, xác minh thanh toán qua QR trước khi đặt hàng với vendor.
- Ngoài phạm vi: Tích hợp trực tiếp API đặt hàng của ShopeeFood/GrabFood (chỉ crawl thông tin menu).

**Success Metrics (Ước lượng — đo từ 5 lần đặt hàng thực tế, bấm giờ thủ công):**
| Metric | Baseline | Observed Result |
|---|---|---|
| Thời gian Admin xử lý 1 đơn | ~45 phút (bấm giờ) | ~5 phút (giảm ~80%) |
| Thất thoát do chưa thu đủ tiền | Thường xuyên (không đo chính xác) | 0% (5/5 lần) |

> **⚠️ Lưu ý minh bạch:** n=5 lần đặt hàng, 1 văn phòng. Thời gian đo bằng đồng hồ điện thoại. Mẫu nhỏ, chưa đủ để kết luận thống kê nhưng cho thấy xu hướng cải thiện rõ rệt.

---

## 2. BPMN 2.0 — As-Is Process (mô tả chi tiết để vẽ trong Draw.io)

**Swimlane: Admin | Staff | Vendor**

```
[Start] → Staff: Nhắn order trong group chat
        → Admin: Đợi hết giờ, tổng hợp thủ công từ tin nhắn (Gateway: đủ order chưa?)
             → Nếu chưa đủ → quay lại chờ
             → Nếu đủ → Admin: Tính tổng tiền + chia phí ship
        → Admin: Ứng tiền, đặt hàng với Vendor
        → Vendor: Giao hàng
        → Admin: Thu tiền từng người (có thể kéo dài nhiều ngày)
        → [End]
```
**Điểm nghẽn cần highlight bằng màu đỏ trong diagram:** Node "Admin: Thu tiền từng người" — đây là nơi phát sinh rủi ro thất thoát và tốn thời gian nhất.

## 2b. BPMN 2.0 — To-Be Process

**Swimlane: Staff | System | Admin | Vendor**

```
[Start] → Admin: Tạo Session (nhập cutoff time, link menu)
        → Staff: Chọn món qua link session
        → System: Gateway - Đã đến cutoff time?
             → Chưa → tiếp tục nhận order
             → Rồi → System: Khoá session, tính tổng + chia phí ship
        → Staff: Thanh toán qua QR
        → System: Gateway - Đã đủ 100% tiền?
             → Chưa đủ → Gửi nhắc nhở, Auto-cancel item của người chưa trả sau X phút
             → Đủ 100% → System: Cho phép Admin bấm "Đặt hàng"
        → Admin: Gửi đơn cho Vendor
        → Vendor: Giao hàng
        → [End]
```

---

## 3. Sequence Diagram (UML) — mô tả để vẽ bằng PlantUML

```
actor Staff
participant "Frontend (UI)" as UI
participant "Backend API" as BE
participant "Bank/E-Wallet API" as Bank
database "Database" as DB

Staff -> UI: Click "Confirm & Pay"
UI -> BE: POST /orders/{id}/confirm
BE -> BE: Validate split amount
BE -> Bank: POST /v1/payment/qr {amount, orderId}
Bank --> BE: Return QR code data + transactionId
BE -> DB: Save transaction (status=pending)
BE --> UI: Return QR code
UI --> Staff: Hiển thị QR để quét
Bank -> BE: Webhook callback khi thanh toán thành công
BE -> DB: Update transaction status = paid
BE -> UI: Push update trạng thái participant
```
**Code PlantUML trên có thể dán trực tiếp vào https://plantuml.com/ hoặc extension PlantUML trong VSCode để xuất ảnh thật.**

---

## 4. Software Requirements Specification (SRS) — đầy đủ hơn

### 4.1 Business Rules
- **BR-01 (Order Cutoff):** Hệ thống khoá session tại thời điểm cutoff do Host định nghĩa; đơn nhập sau đó bị từ chối.
- **BR-02 (Fee Distribution):** Phí ship và giảm giá được chia đều cho tất cả participant, không phụ thuộc số lượng món của từng người.
- **BR-03 (Payment Verification):** Admin không được phép bấm "Đặt hàng" cho đến khi hệ thống ghi nhận đủ 100% tiền qua QR.
- **BR-04 (Auto-cancellation):** Nếu quá cutoff mà 1 participant chưa thanh toán, hệ thống tự huỷ món của người đó và tính lại phí ship cho người còn lại.

### 4.2 Non-Functional Requirements (NFR) — phần đang thiếu, bổ sung để thể hiện hiểu SRS toàn diện
| NFR ID | Loại | Mô tả |
|---|---|---|
| NFR-01 | Performance | QR code phải được sinh ra trong ≤ 3 giây sau khi request |
| NFR-02 | Scalability | Hệ thống hỗ trợ tối thiểu 50 participant/session đồng thời |
| NFR-03 | Reliability | Nếu Bank API timeout, hệ thống retry tối đa 3 lần trước khi báo lỗi cho user |
| NFR-04 | Usability | Toàn bộ luồng từ tạo session đến thanh toán không quá 4 bước thao tác |
| NFR-05 | Security | Thông tin giao dịch (transactionId, amount) phải được mã hoá khi lưu trữ |

---

## 5. Decision Table — Edge Cases (chuẩn hoá từ văn xuôi)

| Condition | Deadline đã qua? | Đã thanh toán? | Hành động hệ thống |
|---|---|---|---|
| Case 1 | Chưa | - | Tiếp tục nhận order/thanh toán bình thường |
| Case 2 | Rồi | Đã thanh toán 100% | Cho phép Admin đặt hàng với Vendor |
| Case 3 | Rồi | Chưa đủ 100% | Auto-cancel item của người chưa trả, tính lại phí ship, gửi thông báo |
| Case 4 | - | Vendor báo hết món sau khi đã thu tiền | Hoàn tiền vào Internal Wallet, tự động trừ ở lần order kế tiếp |
| Case 5 | - | User nhập số tiền âm | Chặn input, hiển thị lỗi validation |

---

## 6. User Story Map

### Epic 1 — Session Management
- US-201: Là Host, tôi muốn tạo session với cutoff time và link menu để bắt đầu 1 đợt order.
- US-202: Là Host, tôi muốn hệ thống tự động crawl menu từ link ShopeeFood/GrabFood để không phải nhập tay.
- US-203: Là Staff, tôi muốn tham gia session qua link chia sẻ và chọn món kèm ghi chú.

### Epic 2 — Payment & Verification
- US-204: Là Staff, tôi muốn thanh toán phần của mình qua QR động để không cần chuyển khoản thủ công.
- US-205: Là Host, tôi muốn hệ thống chặn tôi đặt hàng cho đến khi thu đủ 100% tiền.
- US-206: Là Staff, tôi muốn được nhắc nhở nếu tôi quên thanh toán trước cutoff.

### Epic 3 — Exception Handling
- US-207: Là hệ thống, tôi cần tự động huỷ món và tính lại phí ship nếu 1 người không thanh toán đúng hạn.
- US-208: Là Staff, tôi muốn được hoàn tiền vào ví nội bộ nếu món tôi đặt hết hàng.

---

## 7. Requirements Traceability Matrix (RTM)

| Req ID | Business Requirement | User Story | Test Case ID |
|---|---|---|---|
| REQ-01 | Khoá session đúng giờ cutoff | US-201 | TC-01 |
| REQ-02 | Crawl menu tự động | US-202 | TC-02 |
| REQ-03 | Sinh QR thanh toán động | US-204 | TC-03 |
| REQ-04 | Chặn đặt hàng khi chưa đủ tiền | US-205 | TC-04 |
| REQ-05 | Auto-cancel người chưa trả | US-207 | TC-05 |
| REQ-06 | Hoàn tiền ví nội bộ | US-208 | TC-06 |

---

## 8. Test Cases

| TC ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Khoá session đúng giờ | Cutoff = 14:30, thử thêm order lúc 14:31 | Bị từ chối, báo "Session đã đóng" |
| TC-02 | Crawl menu | Paste link ShopeeFood hợp lệ | Menu + giá hiển thị đúng trong 5s |
| TC-03 | Sinh QR đúng số tiền | Order $12.50 | QR chứa đúng số tiền $12.50 |
| TC-04 | Chặn đặt hàng thiếu tiền | Mới thu 80% tổng tiền | Nút "Đặt hàng" bị disable |
| TC-05 | Auto-cancel đúng người | Qua cutoff, 1 người chưa trả | Món người đó bị huỷ, ship phí tính lại cho người còn lại |
| TC-06 | Hoàn ví nội bộ | Vendor báo hết món đã thanh toán | Số tiền cộng vào Wallet, hiển thị trong lịch sử |

---

## 9. Wireframe Flow (mô tả để dựng trong Figma — Neo-Brutalism style)

**Màn hình 1 — Create Session:**
- Input: Paste link menu (ShopeeFood/Grab), Cutoff time picker
- Nút lớn "Tạo Session" viền đen 2px, shadow lệch kiểu Neo-Brutalism

**Màn hình 2 — Join Session (Staff view):**
- Danh sách món đã crawl, checkbox chọn món, ô ghi chú ("Less ice")
- Tổng tiền cá nhân hiển thị real-time ở footer sticky

**Màn hình 3 — Payment QR:**
- QR code lớn ở giữa màn hình
- Đồng hồ đếm ngược đến cutoff
- Trạng thái participant list: ai đã trả (✅ xanh) / chưa trả (⏳ vàng)

**Màn hình 4 — Admin Confirm Order:**
- Nút "Đặt hàng với Vendor" chỉ active khi 100% đã thanh toán (disable + tooltip giải thích nếu chưa đủ)

---

## 10. Cách trình bày "impact" trung thực

> "Áp dụng thử quy trình To-Be trong 5 lần đặt đồ ăn nhóm thực tế tại văn phòng (bấm giờ bằng đồng hồ điện thoại), thời gian xử lý của Admin giảm từ trung bình ~45 phút xuống còn ~5 phút. Tình trạng admin bị thiếu tiền không còn xảy ra trong 5 lần thử nghiệm. Lưu ý: n=5, chưa đủ để kết luận thống kê nhưng cho thấy xu hướng cải thiện rõ rệt."

---

## 10b. Constraints & Assumptions Log

### C-01: URL Scraper — Rủi ro vi phạm Terms of Service
- **Vấn đề:** Tính năng "Paste link ShopeeFood/GrabFood" sử dụng web scraping để lấy dữ liệu menu. Điều này có thể vi phạm ToS của các nền tảng này (cấm thu thập dữ liệu tự động).
- **Giảm thiểu:** Cho deployment production, thay bằng Merchant API chính thức (GrabFood for Business API) hoặc upload menu thủ công. Scraper chỉ chấp nhận cho prototype/pilot nội bộ.

### C-02: Internal Wallet — Rủi ro Compliance Tài chính
- **Vấn đề:** Internal Wallet giữ tiền user dưới dạng credit thay vì hoàn về tài khoản ngân hàng. Câu hỏi compliance:
  - Ai chịu trách nhiệm số dư ví nếu công ty ngừng hoạt động?
  - Ví có được coi là công cụ tiền điện tử cần giấy phép theo luật Việt Nam (Nghị định 101/2012)?
  - Yêu cầu audit trail: mọi giao dịch ví phải truy vết được và có thể xuất báo cáo.
- **Giảm thiểu:** Tư vấn pháp lý. Bắt buộc có tùy chọn rút tiền về ngân hàng. Đặt chính sách hết hạn cho credit không sử dụng (≥12 tháng).

---

## 10c. Enterprise Scale Considerations

**Câu hỏi:** Nếu hệ thống scale từ 1 văn phòng (10 người) lên doanh nghiệp 50 chi nhánh, 5,000 nhân viên — kiến trúc thay đổi ra sao?

### Stakeholder Conflict Map
| Stakeholder | Mục tiêu chính | Xung đột tiềm ẩn |
|---|---|---|
| Admin (Order Coordinator) | Tốc độ — muốn chốt đơn nhanh | Phản đối các cổng xác minh thanh toán làm chậm quy trình |
| Staff (End User) | Tiện lợi — muốn ít bước nhất | Phản đối bắt buộc trả trước; thích "trả sau" linh hoạt hơn |
| Finance Department | Kiểm soát — muốn audit trail đầy đủ | Yêu cầu ví doanh nghiệp, giới hạn chi tiêu/nhân viên, báo cáo hàng tháng |
| Vendor (Nhà hàng) | Chính xác — muốn đơn hàng chính xác | Yêu cầu tích hợp API; từ chối đơn qua điện thoại/chat ở quy mô lớn |
| IT/Security | Compliance — bảo mật dữ liệu, thanh toán | Chặn mọi tính năng scraping; yêu cầu PCI-DSS cho xử lý thanh toán |

### Kiến trúc thay đổi khi Scale
- **Multi-tenant Architecture:** Mỗi chi nhánh là tenant riêng với dữ liệu cô lập. Finance có dashboard cross-tenant để xem tổng hợp.
- **RBAC:** Branch Admin chỉ quản lý session của mình. Regional Manager xem aggregate. Finance có quyền read-only audit.
- **Vendor API:** Thay thế URL scraper bằng GrabFood for Business / ShopeeFood Merchant API chính thức.
- **Concurrency Handling:** Redis-based session locking để chống race-condition khi 50+ người submit đồng thời.
- **Audit Trail & Compliance:** Mọi giao dịch (order, payment, refund) được log với audit trail không thể chỉnh sửa. Xuất hàng tháng sang hệ thống ERP (SAP/Oracle).

---

## Checklist hoàn thiện
- [ ] Vẽ BPMN As-Is bằng Draw.io, highlight bottleneck node
- [ ] Vẽ BPMN To-Be bằng Draw.io, đủ swimlane + gateway
- [ ] Vẽ Sequence Diagram bằng PlantUML, export ảnh
- [ ] Bổ sung NFR vào SRS
- [ ] Convert edge case sang Decision Table
- [ ] Viết đủ 8 user story theo 3 Epic
- [ ] Dựng 4 màn hình wireframe Figma
- [ ] Sửa phần Impact theo khung trung thực
