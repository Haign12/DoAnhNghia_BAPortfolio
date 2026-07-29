# BÁO CÁO TỔNG QUAN CHI TIẾT 3 DỰ ÁN BUSINESS ANALYSIS

Báo cáo này mô tả chi tiết thông tin, mục đích kinh doanh, và tính năng cốt lõi của 3 hệ thống (FinTrack, CoSpace, OrderFlow) nằm trong Portfolio của Đỗ Anh Nghĩa. Các dự án đều được phân tích theo chuẩn quy trình phát triển phần mềm (SDLC), từ Elicitation, phân tích luồng BPMN, Sequence Diagram, State Machine, đến SRS và cấu trúc DB.

---

## 1. DỰ ÁN 1: FINTRACK (Personal Subscription & Expense Tracker)
**Thể loại:** SaaS (Quản lý Tài chính / Dòng tiền cá nhân)

### Mục đích & Vấn đề kinh doanh (BRD)
- **Vấn đề:** Người dùng thường lãng phí tiền bạc vào các dịch vụ đăng ký (subscription) định kỳ mà không còn sử dụng ("ghost subscription"). 
- **Mục tiêu:** Giảm thiểu chi phí cố định bị lãng phí thông qua trực quan hoá dòng tiền và có thuật toán tự động phát hiện, cảnh báo các dịch vụ không hoạt động.
- **Success Metrics:** Giảm thời gian review tài chính xuống dưới 15 phút/tuần và tự động gắn cờ (flag) 100% các ghost subscription.

### Các Chức năng & Logic Hệ thống (FRD & BDD)
1. **Quản lý Subscription (CRUD):** 
   - Thêm/Sửa/Xóa các dịch vụ định kỳ (Netflix, Gym, Spotify, v.v.).
   - Tự động phân loại giao dịch (Categorization) dựa vào từ khóa (VD: "Netflix" -> Entertainment).
2. **Thuật toán "Ghost Detection":**
   - Chạy ngầm (Cron job) hàng tuần để quét cơ sở dữ liệu.
   - Bất kỳ dịch vụ nào ở trạng thái "Active" nhưng không có giao dịch sử dụng (transaction) trong $\ge$ 30 ngày sẽ bị gắn nhãn "Ghost".
3. **Quản lý Cảnh báo (Alert/Snooze Logic):**
   - Khi phát hiện Ghost, hệ thống pop-up hiển thị số tiền tiết kiệm được nếu hủy.
   - Người dùng có 2 lựa chọn: CTA "Hủy ngay" hoặc "Snooze 7 ngày" (Tạm ẩn cảnh báo và chưa tính vào Ghost List).
4. **Dashboard & KPIs:**
   - Cung cấp màn hình Dashboard hiển thị KPI thời gian thực: *Subscription Utilization Rate* (Tỷ lệ sử dụng hiệu quả), *True Fixed Cost*, và *Variance to Budget*.

### Nền tảng Kỹ thuật thiết kế
- **Database:** Xây dựng theo Data Warehouse Star Schema (Gồm Fact_Transactions kết nối với Dim_Subscription, Dim_Category, Dim_Date).
- **Kiến trúc:** 3-Tier Architecture (Presentation Layer với UI Neo-Brutalism/Neumorphic, Business Logic cho Subscription/Ghost, và Data Layer).

---

## 2. DỰ ÁN 2: COSPACE (Co-living Task & Split Bill Manager)
**Thể loại:** Quản trị nội bộ, Quản lý tác vụ & Dòng tiền (Task & Split Ledger)

### Mục đích & Vấn đề kinh doanh (BRD)
- **Vấn đề:** Sự thiếu minh bạch trong phân chia việc nhà và chi phí sinh hoạt chung, dẫn đến mâu thuẫn giữa các thành viên cùng phòng (roommates).
- **Mục tiêu:** Tạo ra một nền tảng theo dõi công nợ (Ledger) minh bạch và bảng Kanban phân việc nhà công bằng, tự động hóa toàn bộ.
- **Success Metrics:** Đưa tỷ lệ tranh chấp, mâu thuẫn về công nợ xuống mức 0. Rút ngắn thời gian tính toán chia tiền từ 10 phút xuống tức thời.

### Các Chức năng & Logic Hệ thống
1. **Chore Management & Auto-Assign (Phân việc tự động):**
   - Bảng Kanban theo dõi việc nhà (To Do -> In Progress -> Done -> Overdue).
   - Nút "Auto-Assign": Thuật toán tự động check lịch sử 4 tuần và gán việc nhà cho người có số lần dọn dẹp ít nhất để đảm bảo công bằng tuyệt đối.
2. **Split Bill Ledger (Chia tiền tự động & Làm tròn số lẻ):**
   - Người dùng nhập khoản chi chung. Hệ thống tự động chia đều (Split amount).
   - Xử lý số lẻ (Rounding Logic): Nếu $10 chia 3, 2 người nhận $3.33, người trả trước (payer) sẽ chịu $3.34 để cân bằng chính xác.
3. **Debt State Machine (Quản lý Công nợ):**
   - Theo dõi trạng thái nợ (Pending, Paid, Overdue).
   - Cảnh báo: Chặn người dùng (Block Action) thao tác rời nhóm (Leave Group) nếu hệ thống phát hiện vẫn còn nợ chưa thanh toán.
4. **Zalo Webhook Integration:**
   - Hệ thống tự động snapshot bảng tổng kết tuần (bằng html2canvas) và gọi API Zalo Webhook gửi hình ảnh, thông báo thẳng vào nhóm Zalo để nhắc nợ tự động (giúp user không cần tải thêm app).

---

## 3. DỰ ÁN 3: ORDERFLOW (Office Group Ordering & Split Payment)
**Thể loại:** SaaS, POS, Order Automation & Split Payment

### Mục đích & Vấn đề kinh doanh (BRD)
- **Vấn đề:** Dân văn phòng thường đặt đồ ăn nhóm qua group chat. Người admin thường phải ứng tiền trước (dẫn đến rủi ro thất thoát/khó đòi nợ) và mất cực kì nhiều thời gian tổng hợp tin nhắn lẻ tẻ.
- **Mục tiêu:** Hệ thống hóa luồng đặt hàng, chuyển rủi ro tài chính từ Admin sang từng cá nhân thông qua việc bắt buộc thanh toán QR trước khi chốt đơn.
- **Success Metrics:** Giảm thời gian xử lý của Admin từ 45 phút xuống $\le$ 5 phút/đơn. Thất thoát tiền bạc đạt 0%.

### Các Chức năng & Logic Hệ thống
1. **Session Management (Quản lý Phiên đặt hàng):**
   - Admin tạo một "Session" có cài đặt *Cutoff time* (Giờ chốt đơn).
   - Hệ thống tự động Crawl Menu từ link (ShopeeFood/GrabFood) để Staff vào chọn món.
   - Tự động khoá session đúng giờ Cutoff; mọi thao tác chọn thêm đều bị từ chối.
2. **Verification & Split Payment (Xác thực và chia tiền):**
   - Hệ thống chia đều phí ship/discount cho tất cả người tham gia.
   - Sinh QR Code thanh toán động có sẵn số tiền cho từng Staff.
   - Gateway chặn Admin: Nút "Đặt hàng với Vendor" của Admin bị disable hoàn toàn cho đến khi hệ thống bắt được callback Webhook (từ Bank/Ví điện tử) xác nhận đã thu đủ 100% tiền từ Staff.
3. **Exception Handling & Edge Cases (Xử lý Ngoại lệ):**
   - **Auto-cancel:** Nếu qua giờ Cutoff mà có Staff chưa quét mã trả tiền -> tự động huỷ món người đó và chia lại phí ship cho những người còn lại.
   - **Internal Wallet (Hoàn tiền):** Nếu thanh toán xong nhưng Vendor hết món -> hoàn số tiền đó vào ví nội bộ để cấn trừ tự động vào lần đặt sau.

### Nền tảng Kỹ thuật thiết kế
- **BPMN 2.0:** Xây dựng mô hình luồng As-Is (thủ công) và To-Be (Tự động hóa qua Gateway hệ thống).
- **UML Sequence Diagram:** Biểu diễn tương tác hệ thống phức tạp giữa Frontend, Backend API, và Bank API Webhook.
- **Decision Table:** Xử lý triệt để mọi Edge Cases phức tạp về giờ, trạng thái thanh toán và số lượng hàng.
