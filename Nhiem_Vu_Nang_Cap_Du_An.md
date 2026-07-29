# TÀI LIỆU GIAO VIỆC (TASK BRIEF) - NÂNG CẤP DỰ ÁN LÊN CHUẨN THƯƠNG MẠI
**Trạng thái:** Sẵn sàng thực thi (Ready for Execution)
**Nhóm phụ trách:** Đội ngũ phát triển Sản phẩm (Product Manager, UI/UX Designer, Engineering Team).
**Mục tiêu chung:** Nâng cấp 3 mô hình dự án (FinTrack, CoSpace, OrderFlow) từ giai đoạn MVP (Minimum Viable Product) thành các sản phẩm SaaS thương mại hoàn chỉnh, có khả năng mở rộng (scalable), bảo mật cao, và mang lại trải nghiệm xuất sắc (Premium UX) cho người dùng cuối.

---

## 1. DỰ ÁN 1: FINTRACK (SaaS Theo dõi Dòng tiền & Subscription)
**Định hướng:** Chuyển đổi từ ứng dụng nhập liệu thủ công sang hệ thống theo dõi tự động, thông minh bằng AI.

### 🎯 Nhiệm vụ cho Product Manager (PM)
- **Tích hợp Data Provider:** Lên kế hoạch hợp tác/tích hợp API Open Banking (như Plaid, Salt Edge, hay các cổng API ngân hàng nội địa) để đồng bộ dữ liệu giao dịch tự động thay vì user nhập tay.
- **Chiến lược Monetization:** Đóng gói sản phẩm thành mô hình Freemium (Miễn phí cơ bản, thu phí với các báo cáo tài chính phân tích sâu bằng AI).
- **Requirement:** Viết spec cho tính năng "Smart Budgeting" - tự động gợi ý ngân sách dựa trên lịch sử chi tiêu bằng Machine Learning.

### 🎨 Nhiệm vụ cho UI/UX Designer
- **Nâng cấp Visual Design:** Chuyển đổi giao diện sang phong cách hiện đại (Glassmorphism, Dark mode chuẩn) để mang lại cảm giác bảo mật và chuyên nghiệp như các ứng dụng Fintech quốc tế.
- **Data Visualization (Trực quan hóa Dữ liệu):** Thiết kế lại hệ thống biểu đồ (Charts) cho Dashboard KPI. Yêu cầu có hiệu ứng tương tác (interactive tooltip), drill-down khi click vào từng danh mục.
- **Onboarding Flow:** Thiết kế luồng kết nối thẻ ngân hàng cực kỳ mượt mà, tạo cảm giác an toàn và tin tưởng (trust indicator).

### 💻 Nhiệm vụ cho Engineering Team (Dev)
- **Kiến trúc Backend:** Đập bỏ Cronjob tuần tự, chuyển thuật toán "Ghost Detection" sang kiến trúc Event-Driven (dùng Kafka hoặc RabbitMQ) để quét dữ liệu bất đồng bộ với khối lượng lớn.
- **Frontend Performance:** Ứng dụng Next.js hoặc React để tối ưu hóa render biểu đồ (Canvas/WebGL). Build thành Progressive Web App (PWA) để dùng như app native trên mobile.
- **Security:** Đạt chuẩn PCI-DSS cơ bản cho việc lưu trữ token ngân hàng (không lưu thông tin thẻ thô).

---

## 2. DỰ ÁN 2: COSPACE (Co-living Task & Split Bill Manager)
**Định hướng:** Biến CoSpace thành siêu ứng dụng nhỏ (Super-mini App) quản lý nhà trọ/căn hộ dịch vụ thông minh.

### 🎯 Nhiệm vụ cho Product Manager (PM)
- **Mở rộng Target Audience (Tệp khách hàng):** Phát triển thêm role "Landlord" (Chủ nhà) bên cạnh role "Roommate", bổ sung tính năng thu tiền điện/nước hàng tháng.
- **Engagement:** Lên spec cho hệ thống "Gamification" (Tích điểm khi dọn nhà, ai lười sẽ bị phạt tiền vào quỹ chung).

### 🎨 Nhiệm vụ cho UI/UX Designer
- **Mobile-First Design:** Tối ưu hóa 100% trải nghiệm cho màn hình dọc (Mobile). Bảng Kanban phải được thiết kế dạng Swipe/Tinder-style hoặc kéo thả (Drag & Drop) siêu mượt bằng ngón tay cái.
- **Micro-interactions:** Thêm hiệu ứng hoạt ảnh (Animation) khi hoàn thành việc nhà (VD: tiếng ting, hiệu ứng hoa giấy rơi) nhằm tạo cảm giác thỏa mãn cho người dùng.
- **Zalo Mini App UI:** Căn chỉnh UI Components chuẩn theo thư viện Zalo Design System (ZDS).

### 💻 Nhiệm vụ cho Engineering Team (Dev)
- **Zalo Integration:** Tích hợp thành một Zalo Mini App chính thức thay vì dùng Webhook ngoài, tận dụng Zalo ZNS (Zalo Notification Service) để gửi thông báo chia tiền cực chuẩn.
- **Real-time Sync:** Chuyển đổi bảng Kanban việc nhà sang giao thức WebSockets. Khi 1 người kéo thả thẻ "Done", máy của người khác cũng nhảy theo ngay lập tức mà không cần load lại trang.
- **Thuật toán Rounding:** Nâng cấp thuật toán chia tiền (Split Bill) để hỗ trợ chia theo tỷ lệ phần trăm (VD: 60/40), chia theo item (tương tự Splitwise).

---

## 3. DỰ ÁN 3: ORDERFLOW (Office Ordering Automation & Split Payment)
**Định hướng:** Chuyển đổi thành giải pháp B2B (Doanh nghiệp) tích hợp cổng thanh toán thực tế, xử lý hàng ngàn order giờ cao điểm.

### 🎯 Nhiệm vụ cho Product Manager (PM)
- **Tính năng Corporate Wallet:** Cho phép Công ty nạp sẵn quỹ ăn trưa, trừ trực tiếp vào ví công ty thay vì bắt nhân viên tự trả.
- **Merchant API Integration:** Liên kết API trực tiếp với GrabFood/ShopeeFood B2B (nếu có) để bắn thẳng đơn hàng sang hệ thống nhà hàng, loại bỏ bước Admin phải "đặt hộ" bằng tay.

### 🎨 Nhiệm vụ cho UI/UX Designer
- **1-Click Payment UX:** Thiết kế luồng thanh toán liền mạch, giảm số bước quét QR xuống tối đa. 
- **Urgency Indicator:** UI thông báo giờ "Cutoff" (Chốt đơn) cần dùng màu sắc cảnh báo rực rỡ, kết hợp đồng hồ đếm ngược có hiệu ứng nhịp tim đập để thúc giục nhân viên.
- **Admin Dashboard:** Cung cấp bảng điều khiển "Control Room" cho Admin theo dõi trạng thái thanh toán trực tiếp, dạng Grid View dễ nhìn.

### 💻 Nhiệm vụ cho Engineering Team (Dev)
- **High Concurrency (Chịu tải cao):** Sử dụng Redis Cache để xử lý khoá khóa (Lock) Session chính xác từng mili-giây tại thời điểm Cutoff, ngăn chặn tình trạng Race-Condition khi có hàng trăm nhân viên ấn "Thêm món" cùng lúc.
- **Cổng thanh toán thực:** Tích hợp VietQR, Momo, VNPay API. Cấu hình Webhook Callback để hệ thống cập nhật trạng thái "Đã thanh toán" siêu tốc (dưới 1s).
- **Auto-Refund Engine:** Xây dựng module tự động hoàn tiền trực tiếp về tài khoản ngân hàng của nhân viên nếu nhà hàng báo hết món (loại bỏ Internal Wallet hiện tại).
