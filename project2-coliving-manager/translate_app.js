const fs = require('fs');
let code = fs.readFileSync('app_v5.js', 'utf8');

const translations = {
  "Chi tiêu chung": "Shared Expenses",
  "Tất cả": "All",
  "Chưa trả": "Unpaid",
  "Chờ duyệt": "Pending",
  "Đã xong": "Settled",
  "Thêm khoản chi": "Add Expense",
  "Xem công nợ": "View Balances",
  "Còn nợ": "Owes",
  "Tổng chi chung": "Total Shared Expenses",
  "Click Thêm khoản chi to create one": "Click Add Expense to create one",
  "CHƯA TRẢ": "UNPAID",
  "Xác nhận đã thanh toán": "Mark as Paid",
  "CHỜ DUYỆT": "PENDING",
  "Xác nhận đã nhận": "Confirm Received",
  "ĐÃ XONG": "SETTLED",
  " đã trả ": " paid ",
  "Chờ thanh toán": "Pending Payment",
  "chờ xác nhận": "pending confirmation",
  "Đã hoàn thành": "Done",
  "Hôm qua": "Yesterday",
  "Thứ Sáu": "Friday",
  "người": "people",
  "Tuỳ chọn": "Options",
  "Chia tiền hoạt động thế nào": "How does splitting work?",
  "Chia đều": "Split Equally",
  "Mặc định chia đều cho các thành viên": "Defaults to splitting equally among members",
  "Tính năng chia theo tỷ lệ tùy chỉnh sẽ sớm ra mắt": "Custom split ratios coming soon",
  "Xác nhận 2 chiều": "2-Way Confirmation",
  "Để tránh nhầm lẫn": "To prevent mistakes",
  "cả hai bên cần xác nhận": "both parties must confirm",
  "Người trả đánh dấu": "Payer marks",
  "và người nhận ấn": "and receiver clicks",
  "Nhắc nhở tự động": "Auto-Reminders",
  "Nếu khoản chi chưa được xác nhận quá 3 ngày": "If an expense remains unconfirmed for 3 days",
  "hệ thống sẽ tự động nhắc nhở thay bạn": "the system will automatically remind them for you",
  "Trả ngay": "Pay Now",
  "Nhắc thanh toán": "Remind",
  "Chỉ payee": "Only the payee",
  "người trả tiền ban đầu": "the original payer",
  "mới có quyền xác nhận": "can confirm receipt",
  "Nghĩa": "Nghia",
  "AN chờ xác nhận": "pending confirmation"
};

for (const [vi, en] of Object.entries(translations)) {
  code = code.split(vi).join(en);
}

fs.writeFileSync('app_v5.js', code);
console.log('Translated app_v5.js');
