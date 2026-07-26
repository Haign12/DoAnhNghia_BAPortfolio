import re
import json

file = "case-study-p1.html"

translations = {
    'Managing personal finances today resembles managing a poorly optimized enterprise. Money flows out through multiple channels: credit cards, e-wallets, and bank transfers. The biggest silent drain is auto-renewing subscriptions (software, streaming, gym memberships) that are rarely used but forgotten.': 'Quản lý tài chính cá nhân ngày nay giống như việc quản lý một doanh nghiệp thiếu tối ưu. Tiền chảy ra qua nhiều kênh: thẻ tín dụng, ví điện tử và chuyển khoản ngân hàng. Sự rò rỉ âm thầm lớn nhất là các gói đăng ký tự động gia hạn (phần mềm, phát trực tuyến, thẻ tập gym) hiếm khi được sử dụng nhưng lại bị lãng quên.',
    'Without a centralized view, tracking the actual "Monthly Burn Rate" relies on memory rather than data, leading to budget overruns.': 'Nếu không có một cái nhìn tập trung, việc theo dõi "Tốc độ đốt tiền hàng tháng" thực tế sẽ phải dựa vào trí nhớ thay vì dữ liệu, dẫn đến vượt quá ngân sách.',
    'I initially wanted to build a system that auto-syncs transactions in real-time via Bank APIs. However, open banking APIs for personal use in Vietnam are highly restricted and costly.': 'Ban đầu, tôi muốn xây dựng một hệ thống tự động đồng bộ hóa các giao dịch theo thời gian thực thông qua API Ngân hàng. Tuy nhiên, các API ngân hàng mở dành cho cá nhân ở Việt Nam bị hạn chế rất nhiều và có chi phí cao.',
    'Instead of over-engineering, I opted for a Manual CSV Export MVP. I export bank statements weekly, run them through a standardized Power Query script to clean the data, and feed it into the dashboard.': 'Thay vì làm phức tạp hóa vấn đề (over-engineering), tôi đã chọn MVP là Xuất file CSV Thủ công. Tôi xuất sao kê ngân hàng hàng tuần, chạy chúng qua kịch bản Power Query chuẩn hóa để làm sạch dữ liệu và đưa vào dashboard.',
    'Personal finance requires behavioral reflection. A weekly manual update forces me to actually look at the numbers, satisfying the business goal better than a fully automated background process.': 'Tài chính cá nhân đòi hỏi sự phản ánh hành vi. Việc cập nhật thủ công hàng tuần buộc tôi phải thực sự nhìn vào các con số, đáp ứng mục tiêu nghiệp vụ tốt hơn là một quy trình ngầm tự động hoàn toàn.',
    'A. Data Cleaning & Standardization': 'A. Làm sạch & Chuẩn hóa dữ liệu',
    'Raw bank statements are messy. I built a mapping logic in Excel to categorize transactions. For example, any description containing "NETFLIX" or "SPOTIFY" is automatically tagged as Category: Entertainment and Type: Fixed Recurring.': 'Sao kê ngân hàng thô rất lộn xộn. Tôi đã xây dựng một logic ánh xạ trong Excel để phân loại các giao dịch. Ví dụ: bất kỳ mô tả nào chứa "NETFLIX" hoặc "SPOTIFY" sẽ tự động được gắn thẻ là Danh mục: Giải trí và Loại: Cố định định kỳ.',
    'B. Data Modeling (Star Schema)': 'B. Mô hình hóa dữ liệu (Star Schema)',
    'To ensure the dashboard loads quickly and can scale if I add years of data, I structured the dataset using a Star Schema:': 'Để đảm bảo dashboard tải nhanh và có thể mở rộng nếu tôi thêm dữ liệu của nhiều năm, tôi đã cấu trúc tập dữ liệu bằng Mô hình Star Schema:',
    'Transaction records (Amount, Date, ID).': 'Bản ghi giao dịch (Số tiền, Ngày, ID).',
    'Dim_Category (Needs vs. Wants), Dim_Date (Month, Year, Quarter).': 'Dim_Category (Cần thiết vs. Mong muốn), Dim_Date (Tháng, Năm, Quý).',
    'C. Defining KPIs': 'C. Xác định KPIs',
    'Before opening the visualization tool, I defined what metrics actually drive decisions: Subscription Utilization Rate, True Fixed Costs, and Variance to Budget.': 'Trước khi mở công cụ trực quan hóa, tôi đã xác định những số liệu nào thực sự thúc đẩy quyết định: Tỷ lệ sử dụng gói đăng ký, Chi phí cố định thực tế và Mức chênh lệch so với Ngân sách.',
    'Beyond the interface, I defined strict functional requirements for the MVP:': 'Ngoài giao diện, tôi đã xác định các yêu cầu chức năng nghiêm ngặt cho MVP:',
    'Full capabilities to Create, Read, Update, and Delete subscription records, tracking billing cycles natively.': 'Đầy đủ các khả năng Tạo, Đọc, Cập nhật và Xóa (CRUD) các bản ghi gói đăng ký, theo dõi chu kỳ thanh toán một cách nguyên bản.',
    'Automatically scans for services with zero transactions over 30+ days.': 'Tự động quét các dịch vụ không có giao dịch nào trong hơn 30 ngày.',
    'Calculates precise annual/monthly savings upon potential cancellation.': 'Tính toán chính xác số tiền tiết kiệm hàng năm/hàng tháng khi có khả năng hủy bỏ dịch vụ.',
    'Explicit flows for expired linked cards, failed recurring transactions, and a "Snooze" action for false positive ghost alerts.': 'Các luồng xử lý rõ ràng cho thẻ liên kết hết hạn, giao dịch định kỳ không thành công và hành động "Bỏ qua tạm thời" đối với các cảnh báo bóng ma sai.',
    'The final product is a single-page interactive dashboard. As a UI/UX designer, I applied visual hierarchy principles and ': 'Sản phẩm cuối cùng là một bảng điều khiển (dashboard) tương tác trên một trang duy nhất. Với vai trò là một nhà thiết kế UI/UX, tôi đã áp dụng các nguyên tắc phân cấp thị giác và ',
    ' to the data.': ' cho dữ liệu.',
    'Real-world UI/UX Benchmark': 'Đánh giá UI/UX từ thực tế (Benchmark)',
    'Fintech interfaces often cause anxiety due to financial deficits. To counteract this, I benchmarked industry leaders in ': 'Giao diện Fintech thường gây lo lắng do thâm hụt tài chính. Để khắc phục điều này, tôi đã tham khảo các sản phẩm hàng đầu trong ngành về ',
    ' and ': ' và ',
    ':': ':',
    ' Inspired the tactile, 3D soft-shadow buttons that feel like popping bubble wrap, using light/shadow to guide the user naturally without overwhelming colors.': ' Truyền cảm hứng cho các nút bấm xúc giác, đổ bóng mềm 3D mang lại cảm giác như đang bóp xốp bong bóng, sử dụng ánh sáng/bóng tối để hướng dẫn người dùng một cách tự nhiên mà không lạm dụng màu sắc.',
    ' Influenced the dual-layer box-shadow techniques to ensure the Neumorphic UI remains accessible and distinct across both light and dark themes.': ' Ảnh hưởng đến kỹ thuật đổ bóng hộp hai lớp để đảm bảo giao diện Neumorphic vẫn dễ tiếp cận và khác biệt rõ ràng trên cả hai nền sáng và tối.',
    ' Heavily influenced the minimalist approach, utilizing generous whitespace and neutral tones to reduce cognitive load to the absolute minimum.': ' Ảnh hưởng sâu sắc đến cách tiếp cận tối giản, sử dụng nhiều khoảng trắng và tông màu trung tính để giảm thiểu tối đa gánh nặng nhận thức cho người dùng.',
    'To ensure technical feasibility, I prepared the following artifacts for the engineering team:': 'Để đảm bảo tính khả thi về mặt kỹ thuật, tôi đã chuẩn bị các tài liệu (artifacts) sau cho đội ngũ kỹ sư:',
    'A. Database Schema & SQL Query (Ghost Detection)': 'A. Lược đồ Cơ sở dữ liệu & Truy vấn SQL (Phát hiện Bóng ma)',
    'This query drives the core logic, identifying subscriptions with no transactions in the past 30 days. It demonstrates an understanding of relational databases and handling edge cases with ': 'Truy vấn này thúc đẩy logic cốt lõi, xác định các gói đăng ký không có giao dịch trong 30 ngày qua. Nó thể hiện sự am hiểu về cơ sở dữ liệu quan hệ và xử lý các trường hợp ngoại lệ với ',
    '.': '.',
    'B. UI Wireframe Flow': 'B. Luồng Giao diện (UI Wireframe Flow)',
    'I mapped out the user experience flow using Figma. When the backend flags a "Ghost", the UI triggers a non-intrusive alert modal containing:': 'Tôi đã lập bản đồ luồng trải nghiệm người dùng bằng Figma. Khi backend gắn cờ "Bóng ma", UI sẽ kích hoạt một hộp thoại cảnh báo (modal) không gây khó chịu chứa:',
    '• The specific service name and potential monthly savings.': '• Tên dịch vụ cụ thể và khoản tiết kiệm hàng tháng tiềm năng.',
    '• A clear CTA (Call to Action) guiding the user to the cancellation page.': '• Lời kêu gọi hành động (CTA) rõ ràng hướng dẫn người dùng đến trang hủy dịch vụ.',
    '• A "Snooze" or "Keep" option to train the algorithm on false positives.': '• Tùy chọn "Bỏ qua tạm thời" hoặc "Giữ lại" để huấn luyện thuật toán trên các trường hợp cảnh báo sai.',
    'C. 3-Tier Architecture Diagram': 'C. Sơ đồ Kiến trúc 3 Lớp (3-Tier Architecture)',
    'To communicate effectively with developers, I modeled the data flow using a standard 3-tier architecture, showing how the UI interacts with the Ghost Detection logic and the Database.': 'Để giao tiếp hiệu quả với các lập trình viên, tôi đã mô hình hóa luồng dữ liệu bằng kiến trúc 3 lớp tiêu chuẩn, cho thấy cách giao diện người dùng tương tác với logic Phát hiện Bóng ma và Cơ sở dữ liệu.',
    'Presentation Tier': 'Lớp Giao diện (Presentation Tier)',
    'Application Tier': 'Lớp Ứng dụng (Application Tier)',
    'Data Tier': 'Lớp Dữ liệu (Data Tier)',
    'Data Source': 'Nguồn Dữ liệu (Data Source)',
    'The Constraint:': 'Ràng buộc:',
    'The Trade-off:': 'Đánh đổi:',
    'Why it works:': 'Tại sao nó hiệu quả:',
    'Subscription CRUD:': 'CRUD Gói đăng ký:',
    '"Ghost Detection" Algorithm:': 'Thuật toán "Phát hiện bóng ma":',
    'Savings Calculator:': 'Công cụ tính toán tiết kiệm:',
    'Exception Handling:': 'Xử lý ngoại lệ:',
    'Fact Table:': 'Bảng Fact:',
    'Dimension Tables:': 'Bảng Dimension:',
    'Cred App:': 'Ứng dụng Cred:',
    'Neumorphism Day and Night:': 'Neumorphism Ngày và Đêm:',
    'Medium:': 'Medium:',
    'The Problem': 'Vấn đề',
    'Constraints & Trade-offs': 'Ràng buộc & Đánh đổi',
    'Approach & BA Artifacts': 'Phương pháp & Tài liệu BA',
    'Core System Functions & UI Design': 'Chức năng cốt lõi & Thiết kế UI',
    'BA Deliverables Deep Dive': 'Đi sâu vào Tài liệu bàn giao của BA'
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
    print("Injected p1 translations successfully!")
else:
    print("Could not find caseDict.")
