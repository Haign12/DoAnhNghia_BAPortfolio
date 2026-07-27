# CoSpace — Bộ Tài Liệu BA Hoàn Chỉnh
### Co-living Task & Split Bill Manager

---

## 1. Elicitation Artifact — Self-Interview Log

> Vì đây là dự án tự thực hiện, hãy trình bày minh bạch quá trình elicitation thay vì kể chuyện suông.

| Câu hỏi | Người trả lời | Insight thu được |
|---|---|---|
| "Hiện tại bạn theo dõi công nợ tiền nhà/tiền chợ bằng cách nào?" | Roommate A | Dùng Zalo note, hay quên, không có lịch sử |
| "Bạn có thấy bất công trong việc phân chia việc nhà không?" | Roommate B | Có — người dọn nhiều hơn cảm thấy không công bằng |
| "Bạn muốn nhận thông báo nhắc nhở qua kênh nào?" | Cả 2 | Zalo (không muốn cài app mới) |
| "Điều gì khiến bạn KHÔNG muốn dùng 1 app quản lý chung?" | Roommate A | Sợ phức tạp, phải học lại thao tác |

**Kết luận elicitation:** Giải pháp phải tận dụng thói quen có sẵn (Zalo), tối giản thao tác, và có tính minh bạch để giảm tranh cãi — đây là nền tảng cho toàn bộ thiết kế sau này.

---

## 2. Business Requirement Document (BRD)

**Vấn đề kinh doanh:** Thiếu minh bạch trong phân chia việc nhà và chi phí sinh hoạt chung dẫn đến mâu thuẫn giữa các thành viên.

**Phạm vi:**
- Trong phạm vi: Quản lý chore theo Kanban, ghi nhận & chia đều chi phí, tính công nợ.
- Ngoài phạm vi: Thanh toán tự động qua ngân hàng, push notification real-time (dùng Zalo webhook thay thế).

**Success Metrics:**
| Metric | Baseline | Target |
|---|---|---|
| Tranh chấp về công nợ / tháng | Không rõ (ước tính 2-3 lần) | 0 |
| Thời gian tính chia tiền | ~10 phút/lần thủ công | Tức thời (tự động) |

---

## 3. User Story Map

### Epic 1 — Chore Management
- US-101: Là roommate, tôi muốn xem danh sách việc nhà theo trạng thái (To Do/In Progress/Done) để biết ai đang làm gì.
- US-102: Là roommate, tôi muốn hệ thống tự động gán việc nhà công bằng dựa trên lịch sử hoàn thành.
- US-103: Là roommate, tôi muốn đánh dấu hoàn thành 1 việc nhà để cập nhật Kanban board.
- US-104: Là roommate, tôi muốn xem lịch sử ai đã làm việc gì trong 4 tuần gần nhất để minh bạch.

### Epic 2 — Split Bill Ledger
- US-105: Là roommate, tôi muốn thêm 1 khoản chi tiêu chung để hệ thống tự chia đều.
- US-106: Là payer, tôi muốn hệ thống tự làm tròn số dư lẻ về đúng người trả trước.
- US-107: Là roommate, tôi muốn xem ai đang nợ ai bao nhiêu tại bất kỳ thời điểm nào.
- US-108: Là roommate, tôi muốn đánh dấu "đã thanh toán" để cập nhật trạng thái công nợ.
- US-109: Là roommate, tôi muốn hệ thống chặn tôi rời nhóm nếu còn nợ chưa thanh toán.

---

## 4. Acceptance Criteria (BDD) — chi tiết cho các story chính

**US-102 — Auto-Assign:**
- Given chore "Clean Bathroom" chưa được gán tuần này
- When user nhấn "Auto-Assign"
- Then hệ thống gán cho người có số lần hoàn thành thấp nhất trong 4 tuần gần nhất
- And cập nhật Kanban board ngay lập tức

**US-106 — Rounding Logic:**
- Given khoản chi $10.00 chia cho 3 người
- When hệ thống tính chia tiền
- Then mỗi người ban đầu = $3.33, và người trả trước (payer) được cộng thêm $0.01 dư ra
- And tổng 3 phần luôn bằng chính xác $10.00

**US-109 — Leave While in Debt:**
- Given user còn nợ $15.00 trong ledger
- When user nhấn "Leave Group"
- Then hệ thống chặn hành động và hiển thị "Vui lòng thanh toán nợ trước khi rời nhóm"

---

## 5. Requirements Traceability Matrix (RTM) — đầy đủ

| Req ID | Business Requirement | User Story | Test Case ID |
|---|---|---|---|
| REQ-01 | Chia đều chi phí tự động | US-105 | TC-01 |
| REQ-02 | Xử lý số thập phân lẻ | US-106 | TC-02, TC-03 |
| REQ-03 | Auto-assign việc nhà công bằng | US-102 | TC-04 |
| REQ-04 | Chặn rời nhóm khi còn nợ | US-109 | TC-05 |
| REQ-05 | Theo dõi trạng thái Paid/Unpaid | US-108 | TC-06 |
| REQ-06 | Lịch sử hoàn thành việc nhà 4 tuần | US-104 | TC-07 |

---

## 6. Test Cases

| TC ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Chia đều chi phí | Nhập $30 chia 3 người | Mỗi người $10.00 |
| TC-02 | Số lẻ không chia hết | Nhập $10 chia 3 người | 2 người $3.33, 1 người (payer) $3.34 |
| TC-03 | Giá trị âm | Nhập "-50" | Hệ thống từ chối, báo lỗi validation |
| TC-04 | Auto-assign công bằng | 2 người có lịch sử 3 và 5 lần hoàn thành | Gán cho người có 3 lần (thấp hơn) |
| TC-05 | Rời nhóm khi còn nợ | User còn nợ $15, nhấn Leave | Bị chặn, hiển thị thông báo |
| TC-06 | Đánh dấu đã trả | User nhấn "Mark as Paid" | Trạng thái ledger cập nhật, số nợ = 0 |
| TC-07 | Xem lịch sử chore | Mở tab History | Hiển thị đúng 4 tuần gần nhất, sắp xếp theo ngày |

---

## 7. State Machine Diagram — Chore Status (mô tả để vẽ trong Draw.io)

```
[Not Assigned] --(Auto-Assign)--> [To Do]
[To Do] --(User starts)--> [In Progress]
[In Progress] --(User completes)--> [Done]
[To Do / In Progress] --(Deadline passed)--> [Overdue] --(Auto re-assign)--> [To Do]
```
**Hướng dẫn vẽ:** Dùng hình chữ nhật bo góc cho mỗi state, mũi tên có nhãn là trigger event, thêm 1 nhánh rẽ (diamond) tại "Deadline passed" để thể hiện logic overdue.

## 7b. State Machine — Debt/Payment Status

```
[Pending] --(User pays)--> [Paid]
[Pending] --(7 days no payment)--> [Overdue] --(Reminder sent)--> [Pending]
```

---

## 8. Wireframe Flow (mô tả để dựng trong Figma)

**Màn hình 1 — Kanban Board:**
- 3 cột: To Do / In Progress / Done
- Mỗi card: Tên việc, avatar người được gán, badge "Overdue" nếu quá hạn
- Nút nổi "Auto-Assign" ở góc trên phải

**Màn hình 2 — Split Ledger:**
- Bảng: Người | Đã chi | Nợ/Được nhận | Trạng thái (Paid/Unpaid)
- Nút "Add Expense" mở form: Số tiền, Mô tả, Chia cho (chọn thành viên)
- Nút "Generate Weekly Summary" → xuất ảnh, gửi Zalo webhook

**Màn hình 3 — Leave Group Confirmation:**
- Nếu còn nợ: Modal chặn với nội dung số nợ cụ thể + nút "Thanh toán ngay"
- Nếu không nợ: Modal xác nhận rời nhóm bình thường

---

## 9. Zalo Webhook Integration Spec (điểm sáng tạo — cần minh chứng kỹ thuật)

**Trigger:** User nhấn "Generate Weekly Summary"

**Flow:**
1. Frontend capture DOM của Ledger table thành ảnh (dùng thư viện `html2canvas`)
2. Ảnh được upload tạm lên server, nhận về 1 URL
3. Gọi Zalo Webhook API với payload:
```json
{
  "recipient": "group_id_xxxx",
  "message": {
    "text": "📊 Tổng kết tuần: Chi tiêu chung $85.00. John owes Nghia $15.00",
    "attachment": {
      "type": "image",
      "url": "https://cospace-app.com/temp/summary_week30.png"
    }
  }
}
```
4. Zalo OA (Official Account) API trả về status gửi thành công/thất bại

---

## 10. Cách trình bày "impact" trung thực

> "Áp dụng thử nội bộ trong 3 tuần với 2 bạn cùng phòng, hệ thống ghi nhận 0 tranh chấp về công nợ nhờ ledger minh bạch — so với trung bình 2-3 lần hiểu nhầm/tháng trước đó theo phản hồi của các thành viên."

---

## Checklist hoàn thiện
- [ ] Bổ sung bảng Self-Interview Log vào case study
- [ ] Viết đầy đủ 9 user story theo 2 Epic
- [ ] Vẽ 2 State Machine Diagram (Chore + Debt status)
- [ ] Dựng 3 màn hình wireframe trong Figma
- [ ] Bổ sung RTM đầy đủ 6 dòng
- [ ] Thêm Zalo Webhook payload mẫu
- [ ] Sửa phần Impact theo khung trung thực
