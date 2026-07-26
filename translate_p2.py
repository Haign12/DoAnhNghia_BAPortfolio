import re
import json

file = "case-study-p2.html"

translations = {
    'Living with roommates often leads to friction over two common enterprise-scale issues: resource allocation (chores) and financial reconciliation (split bills). Typically, a whiteboard or a messy Zalo group chat is used, which lacks accountability and traceability.': 'Sống chung với bạn cùng phòng thường dẫn đến ma sát về hai vấn đề phổ biến mang quy mô doanh nghiệp: phân bổ nguồn lực (việc nhà) và đối soát tài chính (chia hóa đơn). Thông thường, người ta sử dụng bảng trắng hoặc nhóm chat Zalo lộn xộn, thiếu tính minh bạch và không thể truy xuất nguồn gốc.',
    'Without a transparent system, roommates end up arguing over "Who cleaned last?" and "Who paid for the shared groceries?"': 'Nếu không có một hệ thống minh bạch, những người bạn cùng phòng cuối cùng sẽ tranh cãi về việc "Ai đã dọn dẹp lần trước?" và "Ai đã trả tiền cho số đồ tạp hóa dùng chung?"',
    'The Constraint:': 'Ràng buộc:',
    'Developing a full-stack mobile application with real-time push notifications required significant backend infrastructure (Firebase/AWS) which was overkill for a 3-person apartment.': 'Việc phát triển một ứng dụng di động full-stack với thông báo đẩy theo thời gian thực đòi hỏi cơ sở hạ tầng backend đáng kể (Firebase/AWS), điều này là quá mức cần thiết cho một căn hộ 3 người.',
    'The Trade-off:': 'Đánh đổi:',
    'Instead of building a complex notification engine, I designed a frontend-only MVP where any user can trigger a "Generate Weekly Summary" button, which captures the DOM as an image and posts it to our Zalo group chat via Webhook.': 'Thay vì xây dựng một công cụ thông báo phức tạp, tôi đã thiết kế một MVP chỉ có frontend, nơi bất kỳ người dùng nào cũng có thể nhấn nút "Tạo Tóm tắt Hàng tuần", nút này sẽ chụp lại DOM dưới dạng hình ảnh và đăng lên nhóm Zalo của chúng tôi thông qua Webhook.',
    'Why it works:': 'Tại sao nó hiệu quả:',
    'It leverages the existing habit of checking Zalo, rather than forcing users to download and check a new app daily.': 'Nó tận dụng thói quen kiểm tra Zalo hiện có, thay vì buộc người dùng tải xuống và kiểm tra một ứng dụng mới hàng ngày.',
    'A. Requirements Elicitation': 'A. Khơi gợi yêu cầu (Requirements Elicitation)',
    'I interviewed my roommates to gather requirements, identifying two distinct personas: The "Clean Freak" (wants strict schedules) and the "Forgetful Payer" (needs auto-calculated debts).': 'Tôi đã phỏng vấn những người bạn cùng phòng để thu thập yêu cầu, xác định hai chân dung (personas) riêng biệt: "Kẻ cuồng sạch sẽ" (muốn lịch trình nghiêm ngặt) và "Người thanh toán hay quên" (cần tính toán nợ tự động).',
    'B. User Stories': 'B. User Stories (Câu chuyện người dùng)',
    'I mapped out Epics and User Stories. Example: "As a user, I want to add a shared grocery receipt so that the cost is automatically split 3-ways and added to the monthly ledger."': 'Tôi đã vạch ra các Epic và User Story. Ví dụ: "Là một người dùng, tôi muốn thêm một biên lai tạp hóa dùng chung để chi phí tự động được chia 3 và được thêm vào sổ cái hàng tháng."',
    'C. UI/UX Prototyping': 'C. Tạo nguyên mẫu UI/UX (Prototyping)',
    'I designed wireframes in Figma focusing on a dual-panel layout: a Kanban board for chores, and a Ledger table for transparent bill tracking.': 'Tôi đã thiết kế các wireframe trong Figma tập trung vào bố cục bảng điều khiển kép: bảng Kanban cho việc nhà và bảng Sổ cái để theo dõi hóa đơn minh bạch.',
    'Beyond the interface, I defined strict functional requirements for the MVP:': 'Ngoài giao diện, tôi đã xác định các yêu cầu chức năng nghiêm ngặt cho MVP:',
    'Chore Kanban Board:': 'Bảng Kanban Việc nhà:',
    ' Visual task management with To Do, In Progress, and Done states.': ' Quản lý công việc trực quan với các trạng thái Cần làm (To Do), Đang làm (In Progress) và Hoàn thành (Done).',
    '"Auto-Assign" Algorithm:': 'Thuật toán "Tự động phân công":',
    ' Fairly distributes tasks based on historical completion and availability constraints.': ' Phân phối nhiệm vụ một cách công bằng dựa trên lịch sử hoàn thành và các ràng buộc về thời gian rảnh.',
    'Split Bill Ledger:': 'Sổ cái Chia hóa đơn:',
    ' Centralized expense input and auto-calculated inter-personal debts.': ' Đầu vào chi phí tập trung và tính toán tự động các khoản nợ giữa các cá nhân.',
    'Decimal & State Handling:': 'Xử lý thập phân & Trạng thái:',
    ' System automatically rounds infinite decimals (e.g., $10/3 = $3.33 + $0.01 to payer) and securely tracks "Paid/Unpaid" statuses.': ' Hệ thống tự động làm tròn các số thập phân vô hạn (ví dụ: $10/3 = $3.33 + $0.01 cho người thanh toán) và theo dõi trạng thái "Đã thanh toán/Chưa thanh toán" một cách an toàn.',
    'The solution is a clean, single-page web app tailored for mobile views but scalable to desktop, utilizing ': 'Giải pháp này là một ứng dụng web một trang gọn gàng, được điều chỉnh cho chế độ xem trên thiết bị di động nhưng có khả năng mở rộng sang máy tính để bàn, sử dụng các nguyên tắc bố cục ',
    ' layout principles.': '.',
    'Bento Grid 2.0': 'Bento Grid 2.0',
    'A co-living app must manage complex, disparate data streams (chores, ledgers, schedules). To maximize scanability, I adopted the ': 'Một ứng dụng sống chung (co-living) phải quản lý các luồng dữ liệu phức tạp, khác biệt (việc nhà, sổ cái, lịch trình). Để tối đa hóa khả năng quét nhanh bằng mắt, tôi đã áp dụng bố cục ',
    ' layout, inspired by top-tier tech companies:': ', lấy cảm hứng từ các công ty công nghệ hàng đầu:',
    'Ramp & Apple (iOS 17):': 'Ramp & Apple (iOS 17):',
    ' Influenced the clear modular grid and bento block layout, making data easy to scan.': ' Ảnh hưởng đến lưới mô-đun rõ ràng và bố cục khối bento, giúp dữ liệu dễ dàng được quét (scan) qua.',
    'WhatsApp (by Koto Studio):': 'WhatsApp (bởi Koto Studio):',
    ' Inspired the compartmentalization of features into distinct, flexible modules, making dense roommate data visually harmonious.': ' Truyền cảm hứng cho việc phân chia các tính năng thành các mô-đun riêng biệt, linh hoạt, làm cho dữ liệu dày đặc của những người bạn cùng phòng trở nên hài hòa về mặt trực quan.',
    'A. User Stories & Acceptance Criteria': 'A. Câu chuyện Người dùng & Tiêu chí Chấp nhận (Acceptance Criteria)',
    'I utilized standard Agile documentation formats to ensure development alignment for the "Auto-Assign" feature.': 'Tôi đã sử dụng các định dạng tài liệu Agile tiêu chuẩn để đảm bảo sự thống nhất trong quá trình phát triển cho tính năng "Tự động phân công".',
    'User Story:': 'Câu chuyện người dùng:',
    '"As a Roommate, I want the system to auto-assign weekly chores so that responsibilities are shared fairly without manual arguments."': '"Là một Người bạn cùng phòng, tôi muốn hệ thống tự động phân công việc nhà hàng tuần để trách nhiệm được chia sẻ công bằng mà không cần phải tranh cãi."',
    'Acceptance Criteria (BDD Format):': 'Tiêu chí Chấp nhận (Định dạng BDD):',
    'Given': 'Given (Cho trước)',
    ' the chore "Clean Bathroom" has not been assigned this week,': ' công việc "Dọn phòng tắm" chưa được giao trong tuần này,',
    'When': 'When (Khi)',
    ' the user clicks the "Auto-Assign" button,': ' người dùng nhấp vào nút "Tự động phân công",',
    'Then': 'Then (Thì)',
    ' the system assigns the chore to the roommate with the lowest historical completion count,': ' hệ thống sẽ giao công việc cho người có số lần hoàn thành thấp nhất trong lịch sử,',
    'And': 'And (Và)',
    ' updates the Kanban board to reflect the new assignee immediately.': ' cập nhật ngay lập tức bảng Kanban để hiển thị người được phân công mới.',
    'B. Requirements Traceability Matrix (RTM)': 'B. Ma trận Truy xuất Yêu cầu (RTM)',
    'To ensure no requirement was missed during development and testing, I mapped the business needs directly to test scenarios.': 'Để đảm bảo không có yêu cầu nào bị bỏ sót trong quá trình phát triển và kiểm thử, tôi đã lập bản đồ nhu cầu nghiệp vụ trực tiếp với các kịch bản kiểm thử (test scenarios).',
    'C. Test Case Design (Split Bill Ledger)': 'C. Thiết kế Kịch bản kiểm thử (Test Case)',
    'To demonstrate Requirement-Based Testing, I designed edge-case scenarios for the bill splitting algorithm to prevent logic failures.': 'Để chứng minh phương pháp Kiểm thử dựa trên Yêu cầu, tôi đã thiết kế các kịch bản ngoại lệ (edge-case) cho thuật toán chia hóa đơn để ngăn chặn các lỗi logic.',
    'Req ID': 'Mã Yêu cầu',
    'Business Requirement': 'Yêu cầu Nghiệp vụ',
    'Test Case ID': 'Mã Test Case',
    'System must split bills equally': 'Hệ thống phải chia hóa đơn đều',
    'US-101: As a Roommate, I want to split a bill...': 'US-101: Là người dùng, tôi muốn chia hóa đơn...',
    'System must handle fractional cents': 'Hệ thống phải xử lý xu lẻ',
    'US-102: As a Payer, I want exact rounding...': 'US-102: Là người thanh toán, tôi muốn làm tròn chính xác...',
    'Scenario': 'Kịch bản (Scenario)',
    'Test Steps': 'Các bước Kiểm thử',
    'Expected Result': 'Kết quả Mong đợi',
    'Infinite Decimal Split': 'Chia số thập phân vô hạn',
    'Input $10.00 split among 3 people.': 'Nhập 10,00 đô la chia cho 3 người.',
    'System rounds to 2 decimals ($3.33) and assigns the remaining $0.01 to the payer.': 'Hệ thống làm tròn thành 2 chữ số thập phân ($3,33) và gán $0,01 còn lại cho người thanh toán.',
    'Negative Value (Exception)': 'Giá trị âm (Ngoại lệ)',
    'User inputs "-50" as an expense amount.': 'Người dùng nhập "-50" làm số tiền chi phí.',
    'The Problem': 'Vấn đề',
    'Constraints & Trade-offs': 'Ràng buộc & Đánh đổi',
    'Approach & BA Artifacts': 'Phương pháp & Tài liệu BA',
    'Core System Functions & UI Design': 'Chức năng cốt lõi & Thiết kế UI',
    'BA Deliverables Deep Dive': 'Đi sâu vào Tài liệu bàn giao của BA',
    'Real-world UI/UX Benchmark': 'Đánh giá UI/UX từ thực tế (Benchmark)',
    'Coliving Manager Mockup': 'Bản Mockup Quản lý Coliving'
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
    print("Injected p2 translations successfully!")
else:
    print("Could not find caseDict.")
