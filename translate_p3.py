import re
import json

file = "case-study-p3.html"

translations = {
    'At the office, the daily process of ordering group lunches or milk tea is a logistical nightmare. The process flows through a group chat where people constantly change their minds, forget to pay, and force the Admin to manually reconcile orders and shipping fees.': 'Tại văn phòng, quy trình đặt bữa trưa hoặc trà sữa nhóm hàng ngày là một cơn ác mộng về hậu cần. Quá trình này diễn ra qua một nhóm chat, nơi mọi người liên tục thay đổi ý định, quên thanh toán và buộc Admin (người quản lý) phải đối chiếu đơn hàng và phí vận chuyển một cách thủ công.',
    'This manual coordination results in a high "Payment Deficit" (Admin losing money) and a severe waste of productive work hours.': 'Sự phối hợp thủ công này dẫn đến "Thâm hụt thanh toán" (Admin mất tiền) ở mức cao và lãng phí nghiêm trọng số giờ làm việc hiệu quả.',
    'The Constraint:': 'Ràng buộc:',
    'Third-party food delivery apps (like ShopeeFood or Grab) have group order features, but they often lack flexible payment splitting and don\'t allow the Admin to collect funds before placing the order.': 'Các ứng dụng giao đồ ăn của bên thứ ba (như ShopeeFood hoặc Grab) có tính năng đặt hàng nhóm, nhưng chúng thường thiếu tính năng chia nhỏ khoản thanh toán linh hoạt và không cho phép Admin thu tiền trước khi đặt hàng.',
    'The Trade-off:': 'Đánh đổi:',
    'Instead of relying on rigid third-party apps, I modeled a custom To-Be process using a simple internal form linked to a QR payment gateway. The trade-off was a slight learning curve for staff, but absolute financial security for the Admin.': 'Thay vì phụ thuộc vào các ứng dụng cứng nhắc của bên thứ ba, tôi đã lập mô hình quy trình tương lai (To-Be) tùy chỉnh bằng cách sử dụng một biểu mẫu nội bộ đơn giản được liên kết với cổng thanh toán QR. Sự đánh đổi là nhân viên sẽ mất một chút thời gian làm quen, nhưng đổi lại là sự an toàn tuyệt đối về tài chính cho Admin.',
    'A. Process Modeling (As-Is)': 'A. Mô hình hóa quy trình (As-Is)',
    'I mapped the current state using BPMN 2.0. The diagram clearly highlighted the "Payment Collection" node as the critical bottleneck. Admin was advancing cash and acting as a debt collector post-delivery.': 'Tôi đã lập bản đồ trạng thái hiện tại bằng BPMN 2.0. Biểu đồ đã làm nổi bật rõ ràng nút "Thu tiền thanh toán" là nút thắt cổ chai (bottleneck) nghiêm trọng nhất. Admin đã phải ứng trước tiền mặt và đóng vai trò như một người đòi nợ sau khi giao hàng.',
    'B. Bottleneck Detection': 'B. Phát hiện nút thắt (Bottleneck)',
    'By timing the process, I found the Admin spent an average of 45 minutes per order just tracing chat messages to match drinks with faces, and calculating the divided shipping fee.': 'Bằng cách tính thời gian của quy trình, tôi thấy Admin đã dành trung bình 45 phút cho mỗi đơn hàng chỉ để theo dõi các tin nhắn chat để khớp đồ uống với từng người và tính toán phí vận chuyển chia đều.',
    'C. Process Optimization (To-Be)': 'C. Tối ưu hóa quy trình (To-Be)',
    'I engineered a new flow: System calculates exact split -> Staff pays via QR -> System verifies 100% funds -> Order placed. No cash advanced, zero risk.': 'Tôi đã thiết kế một luồng mới: Hệ thống tính toán chính xác số tiền cần chia -> Nhân viên thanh toán qua mã QR -> Hệ thống xác minh 100% số tiền -> Đặt hàng. Không cần ứng tiền mặt, không có rủi ro.',
    'Beyond the interface, I defined strict functional requirements for the MVP:': 'Ngoài giao diện, tôi đã xác định các yêu cầu chức năng nghiêm ngặt cho MVP:',
    'Group Ordering Host:': 'Người chủ trì (Host) Đặt hàng Nhóm:',
    ' An initiator creates a session, and the system generates a sharable joining link for team members.': ' Người khởi tạo tạo một phiên đặt hàng và hệ thống sẽ tạo một liên kết tham gia có thể chia sẻ cho các thành viên trong nhóm.',
    'Auto-Consolidation & Split:': 'Tự động Gộp & Chia tiền:',
    ' The system aggregates item choices, calculates subtotal, applies discounts, and fairly divides the shipping fee.': ' Hệ thống tổng hợp các lựa chọn mặt hàng, tính tổng phụ, áp dụng chiết khấu và chia đều phí vận chuyển một cách công bằng.',
    'Dynamic QR Payment:': 'Thanh toán mã QR Động:',
    ' Automatically generates a bank QR code embedding the exact split amount and a predefined transfer syntax (e.g., ': ' Tự động tạo mã QR ngân hàng nhúng số tiền cần chia chính xác và cú pháp chuyển khoản được xác định trước (ví dụ: ',
    ').': ').',
    'I utilized process visualization to pitch the new workflow to the team, demonstrating the exact elimination of the bottleneck via a ': 'Tôi đã sử dụng hình ảnh hóa quy trình để thuyết trình luồng công việc mới cho nhóm, chứng minh sự loại bỏ chính xác nút thắt thông qua thiết kế giao diện ',
    ' interface design.': '.',
    'Neo-Brutalism': 'Neo-Brutalism (Tân thô mộc)',
    'An internal office tool demands raw efficiency over form. I chose ': 'Một công cụ văn phòng nội bộ đòi hỏi tính hiệu quả thô sơ hơn là hình thức. Tôi đã chọn tính thẩm mỹ của ',
    ' and Retro aesthetics to emphasize stark functionality and hyper-contrast:': ' và Retro để nhấn mạnh chức năng rõ ràng và độ tương phản cao (hyper-contrast):',
    'Gumroad:': 'Gumroad:',
    ' The "textbook" for Neo-Brutalism. Inspired the aggressive 2px solid black borders, hard offset shadows, and high-contrast color palette (like Lavender Rose) to make actions unmistakable.': ' Cuốn "sách giáo khoa" cho Neo-Brutalism. Đã truyền cảm hứng cho các viền đen dày 2px mạnh mẽ, bóng đổ offset cứng cáp và bảng màu có độ tương phản cao (như Lavender Rose) để làm cho các hành động không thể bị nhầm lẫn.',
    'PostHog:': 'PostHog:',
    ' Inspired the retro, highly functional aesthetic that makes technical/administrative tasks feel less dry and more engaging.': ' Truyền cảm hứng cho tính thẩm mỹ retro, mang tính chức năng cao, giúp các tác vụ kỹ thuật/hành chính bớt khô khan và hấp dẫn hơn.',
    'Yale School of Art:': 'Yale School of Art:',
    ' Inspired the raw, asymmetrical layouts and straightforward typography that prioritize truth and utility.': ' Truyền cảm hứng cho các bố cục thô sơ, bất đối xứng và nghệ thuật chữ (typography) thẳng thắn, ưu tiên sự thật và tiện ích.',
    'BPMN Process Flow Comparison': 'So sánh luồng quy trình BPMN',
    'As-Is Flow (Manual)': 'Luồng hiện tại (Thủ công)',
    'Chat Order': 'Order qua Chat',
    'Admin Pays Upfront': 'Admin ứng tiền trước',
    'Calculate Split': 'Tính toán chia tiền',
    'Collect Cash': 'Thu tiền mặt',
    'To-Be Flow (Automated)': 'Luồng tương lai (Tự động hóa)',
    'App Order': 'Order qua App',
    'Auto Split Fee': 'Tự động chia tiền',
    'QR Payment Upfront': 'Thanh toán QR trước',
    'Vendor Receives Order': 'Cửa hàng nhận Order',
    'A. BPMN 2.0 Process Modeling': 'A. Mô hình hóa quy trình BPMN 2.0',
    'Using professional tools like Camunda / Visual Paradigm, I rigorously mapped the "As-Is" and "To-Be" states. The analysis revealed that the manual process contained 3 unnecessary intermediate steps (Tracing chat &rarr; Calculating fee &rarr; Debt collection). The "To-Be" automated process cut these out, directly reducing the coordination time from 45 minutes to just 5 minutes.': 'Sử dụng các công cụ chuyên nghiệp như Camunda / Visual Paradigm, tôi đã lập bản đồ trạng thái "As-Is" và "To-Be" một cách chặt chẽ. Phân tích cho thấy quy trình thủ công chứa 3 bước trung gian không cần thiết (Theo dõi tin nhắn -> Tính phí -> Đòi nợ). Quy trình tự động hóa "To-Be" đã cắt bỏ những bước này, trực tiếp giảm thời gian điều phối từ 45 phút xuống chỉ còn 5 phút.',
    'B. Sequence Diagram (UML) - Payment Integration': 'B. Biểu đồ Tuần tự (UML Sequence) - Tích hợp Thanh toán',
    'To demonstrate a deep understanding of 3-tier architecture and system integration, I modeled the payment flow logic:': 'Để thể hiện sự am hiểu sâu sắc về kiến trúc 3 lớp và tích hợp hệ thống, tôi đã mô hình hóa logic luồng thanh toán:',
    'C. Software Requirements Specification (SRS) Excerpt': 'C. Trích đoạn Tài liệu Đặc tả Yêu cầu Phần mềm (SRS)',
    'Following IEEE 830 / ISO 29148 standards, I drafted a structured SRS highlighting strict Business Rules for financial accuracy.': 'Tuân theo các tiêu chuẩn IEEE 830 / ISO 29148, tôi đã phác thảo một tài liệu SRS có cấu trúc, nêu bật các Quy tắc Nghiệp vụ (Business Rules) nghiêm ngặt để đảm bảo độ chính xác về tài chính.',
    '3.1.2 Business Rules (BR)': '3.1.2 Quy tắc Nghiệp vụ (Business Rules - BR)',
    'BR-01 (Order Cutoff):': 'BR-01 (Cắt đơn hàng):',
    ' The system SHALL automatically lock the ordering session at the Host-defined cutoff time. Late entries SHALL be rejected to prevent shipping fee recalculation.': ' Hệ thống PHẢI tự động khóa phiên đặt hàng vào thời điểm cắt đơn (cutoff time) do Host chỉ định. Các đơn vào muộn PHẢI bị từ chối để tránh phải tính toán lại phí vận chuyển.',
    'BR-02 (Fee Distribution):': 'BR-02 (Phân bổ Phí):',
    ' The total shipping fee and external discounts SHALL be divided equally among all unique participating users, regardless of individual order volume.': ' Tổng phí vận chuyển và chiết khấu bên ngoài PHẢI được chia đều cho tất cả những người dùng tham gia duy nhất, bất kể khối lượng đơn hàng của từng cá nhân.',
    'BR-03 (Payment Verification):': 'BR-03 (Xác minh Thanh toán):',
    ' The Host SHALL NOT be allowed to trigger the "Place Order to Vendor" action until the system registers 100% of required funds transferred via the Dynamic QR gateway.': ' Host SẼ KHÔNG được phép kích hoạt hành động "Đặt hàng với Cửa hàng" cho đến khi hệ thống ghi nhận 100% số tiền yêu cầu đã được chuyển qua cổng QR Động.',
    'Handling Edge Cases & Exception Flows': 'Xử lý các Trường hợp Ngoại lệ (Edge Cases)',
    'A "Happy Path" is never enough for a robust enterprise tool. To ensure the system handles real-world friction, I designed logic for the following edge cases:': 'Một "Đường dẫn Hạnh phúc" (Happy Path) không bao giờ là đủ đối với một công cụ doanh nghiệp mạnh mẽ. Để đảm bảo hệ thống có thể xử lý các ma sát trong thế giới thực, tôi đã thiết kế logic cho các trường hợp ngoại lệ sau:',
    'A. The "Unpaid Participant" Scenario (Countdown Timer)': 'A. Kịch bản "Người tham gia chưa thanh toán" (Đồng hồ đếm ngược)',
    'The Problem:': 'Vấn đề:',
    ' What happens if the group orders, but 1 person forgets to pay via QR before the 2:30 PM deadline?': ' Điều gì sẽ xảy ra nếu nhóm đặt hàng, nhưng 1 người quên thanh toán qua mã QR trước thời hạn 2:30 chiều?',
    'The Solution (Business Rule):': 'Giải pháp (Quy tắc Nghiệp vụ):',
    ' I introduced a ': ' Tôi đã giới thiệu một ',
    'Countdown Timer': 'Đồng hồ Đếm ngược',
    '. If the deadline expires and a participant is marked ': '. Nếu hết hạn và một người tham gia được đánh dấu là ',
    'Unpaid': 'Chưa thanh toán',
    ', the system triggers an auto-cancellation of their specific items. It then instantly recalculates the shipping split for the remaining ': ', hệ thống sẽ kích hoạt tự động hủy bỏ các mặt hàng cụ thể của họ. Sau đó, nó ngay lập tức tính toán lại phần chia phí vận chuyển cho các thành viên ',
    'Paid': 'Đã thanh toán',
    ' members. A Push Notification / Slack ping is automatically sent via the ': ' còn lại. Một thông báo Push Notification / Slack sẽ tự động được gửi qua tính năng nhắc nhở của ',
    'Participant List': 'Danh sách Người tham gia',
    ' reminder feature.': '.',
    'B. The "Out of Stock" Scenario (Internal Wallet Refund)': 'B. Kịch bản "Hết hàng" (Hoàn tiền vào Ví nội bộ)',
    ' The system collected 100% of the funds and placed the order. 5 minutes later, the vendor calls to cancel one item (e.g., "Out of Matcha"). Processing a direct bank refund via VNPay/Momo for 45,000đ is technically complex and incurs transaction fees.': ' Hệ thống đã thu 100% số tiền và đặt hàng. 5 phút sau, cửa hàng gọi để hủy một mặt hàng (ví dụ: "Hết Matcha"). Việc xử lý hoàn tiền trực tiếp qua ngân hàng thông qua VNPay/Momo cho 45.000đ về mặt kỹ thuật rất phức tạp và phải chịu phí giao dịch.',
    'The Solution (System Design):': 'Giải pháp (Thiết kế Hệ thống):',
    ' I proposed an ': ' Tôi đề xuất một hệ thống ',
    'Internal Wallet': 'Ví nội bộ',
    ' system. Instead of refunding to the bank, the 45,000đ is credited to the user\'s OrderFlow Wallet balance. The next time they join a group order, this balance is automatically deducted. This guarantees a seamless UX and eliminates banking transaction overhead.': '. Thay vì hoàn tiền vào ngân hàng, 45.000đ sẽ được cộng vào số dư Ví OrderFlow của người dùng. Lần tới khi họ tham gia một nhóm đặt hàng, số dư này sẽ tự động bị trừ đi. Điều này đảm bảo trải nghiệm người dùng (UX) liền mạch và loại bỏ các chi phí giao dịch ngân hàng.',
    'C. Session Creation (Data Sourcing)': 'C. Tạo Phiên đặt hàng (Tìm nguồn Dữ liệu)',
    ' Manually typing out menu items is tedious for the Admin.': ' Việc gõ thủ công các mặt hàng trên menu là một công việc tẻ nhạt đối với Admin.',
    'The Solution (UX Flow):': 'Giải pháp (Luồng UX):',
    ' The ': ' Màn hình ',
    'Create Session': 'Tạo Phiên',
    ' screen features a URL scraper. The Admin simply pastes a ShopeeFood or GrabFood link, and the system automatically crawls the menu, prices, and options. Staff members receive a clean interface to "Add to Cart" with specific notes (e.g., "Less ice").': ' có tính năng thu thập URL (URL scraper). Admin chỉ cần dán một liên kết ShopeeFood hoặc GrabFood, hệ thống sẽ tự động thu thập (crawl) menu, giá cả và các tùy chọn. Các nhân viên sẽ nhận được một giao diện gọn gàng để "Thêm vào Giỏ hàng" với các ghi chú cụ thể (ví dụ: "Ít đá").',
    'The Problem': 'Vấn đề',
    'Constraints & Trade-offs': 'Ràng buộc & Đánh đổi',
    'Approach & BA Artifacts': 'Phương pháp & Tài liệu BA',
    'Core System Functions & UI Design': 'Chức năng cốt lõi & Thiết kế UI',
    'BA Deliverables Deep Dive': 'Đi sâu vào Tài liệu bàn giao của BA',
    'Real-world UI/UX Benchmark': 'Đánh giá UI/UX từ thực tế (Benchmark)'
}

with open(file, "r", encoding="utf-8") as f:
    content = f.read()

start_idx = content.find('const caseDict = {')
end_idx = content.find('    const langViBtn = document.getElementById(\'lang-vi\');')

if start_idx != -1 and end_idx != -1:
    dict_content = content[start_idx:end_idx]
    
    extra_vi = []
    for k, v in translations.items():
        safe_k = k.replace("'", "\\'")
        safe_v = v.replace("'", "\\'")
        extra_vi.append(f"        '{safe_k}': '{safe_v}',")
    
    injection = "\\n".join(extra_vi)
    
    new_dict_content = dict_content.replace('      }', injection + '\\n      }', 1)
    
    content = content[:start_idx] + new_dict_content + content[end_idx:]
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected p3 translations successfully!")
else:
    print("Could not find caseDict.")
