// ============================================================
// Business Process Analyzer — Process Data
// Dữ liệu mô phỏng quy trình kiểm tra chất lượng linh kiện phanh ô tô
// ============================================================

const PROCESSES = {
  'quality-inspection': {
    name: 'Quality Inspection — Brake Components',
    description: 'Quy trình kiểm tra chất lượng linh kiện phanh ô tô từ khi sản phẩm rời dây chuyền đến khi đóng gói xuất xưởng.',
    asIs: {
      steps: [
        { id: 'A1', name: 'Sản phẩm rời dây chuyền', type: 'start', time: 0, cost: 0, role: 'Máy', errorRate: 0, description: 'Linh kiện phanh hoàn thiện được đưa ra khỏi dây chuyền sản xuất' },
        { id: 'A2', name: 'Vận chuyển đến khu kiểm tra', type: 'task', time: 15, cost: 5, role: 'Công nhân', errorRate: 0, description: 'Công nhân vận chuyển thủ công từng lô sản phẩm đến khu vực QC' },
        { id: 'A3', name: 'Chờ đợi trong hàng chờ', type: 'wait', time: 45, cost: 0, role: 'N/A', errorRate: 0, description: 'Sản phẩm xếp hàng chờ kiểm tra viên rảnh (bottleneck)' },
        { id: 'A4', name: 'Kiểm tra ngoại quan bằng mắt', type: 'task', time: 30, cost: 25, role: 'QC Inspector', errorRate: 5.2, description: 'Kiểm tra viên kiểm tra bằng mắt thường: vết nứt, trầy xước, biến dạng bề mặt' },
        { id: 'A5', name: 'Đo kích thước thủ công', type: 'task', time: 20, cost: 15, role: 'QC Inspector', errorRate: 3.1, description: 'Sử dụng thước cặp và dưỡng đo để kiểm tra kích thước theo bản vẽ kỹ thuật' },
        { id: 'A6', name: 'Ghi kết quả vào sổ giấy', type: 'task', time: 10, cost: 8, role: 'QC Inspector', errorRate: 7.5, description: 'Ghi chép kết quả kiểm tra vào sổ tay giấy (dễ sai sót, khó truy xuất)' },
        { id: 'A7', name: 'Quyết định Pass/Fail?', type: 'decision', time: 5, cost: 5, role: 'QC Inspector', errorRate: 2.0, description: 'Kiểm tra viên quyết định sản phẩm đạt hay không đạt' },
        { id: 'A8', name: 'Sản phẩm lỗi → Khu vực phế phẩm', type: 'task', time: 10, cost: 3, role: 'Công nhân', errorRate: 0, description: 'Sản phẩm không đạt được chuyển sang khu phế phẩm để xử lý' },
        { id: 'A9', name: 'Nhập liệu vào Excel báo cáo', type: 'task', time: 15, cost: 12, role: 'QC Lead', errorRate: 4.0, description: 'Trưởng QC cuối ca nhập lại dữ liệu từ sổ giấy vào file Excel' },
        { id: 'A10', name: 'Đóng gói & xuất kho', type: 'end', time: 10, cost: 5, role: 'Công nhân', errorRate: 0, description: 'Sản phẩm đạt được đóng gói và chuyển sang kho xuất' },
      ],
    },
    toBe: {
      steps: [
        { id: 'B1', name: 'Sản phẩm rời dây chuyền', type: 'start', time: 0, cost: 0, role: 'Máy', errorRate: 0, description: 'Linh kiện phanh hoàn thiện được đưa ra khỏi dây chuyền' },
        { id: 'B2', name: 'Băng chuyền tự động → Trạm QC', type: 'task', time: 3, cost: 2, role: 'Hệ thống', errorRate: 0, description: 'Hệ thống băng chuyền tự động vận chuyển sản phẩm đến trạm kiểm tra', improvement: 'Giảm 80% thời gian vận chuyển nhờ tự động hóa' },
        { id: 'B3', name: 'AI Visual Inspection', type: 'task', time: 2, cost: 3, role: 'AI System', errorRate: 0.5, description: 'Camera AI kiểm tra ngoại quan tự động: phát hiện vết nứt, trầy xước với độ chính xác 99.5%', improvement: 'Thay thế kiểm tra bằng mắt, giảm 93% thời gian, giảm 90% sai sót' },
        { id: 'B4', name: 'Đo lường tự động (CMM)', type: 'task', time: 5, cost: 4, role: 'CMM Machine', errorRate: 0.1, description: 'Máy đo tọa độ 3D (CMM) tự động đo kích thước và so sánh với CAD model', improvement: 'Giảm 75% thời gian đo, độ chính xác tăng lên ±0.001mm' },
        { id: 'B5', name: 'Kết quả ghi tự động vào MES', type: 'task', time: 1, cost: 1, role: 'Hệ thống', errorRate: 0, description: 'Dữ liệu kiểm tra được lưu trực tiếp vào hệ thống MES (Manufacturing Execution System)', improvement: 'Loại bỏ hoàn toàn việc ghi chép thủ công, zero data entry error' },
        { id: 'B6', name: 'AI quyết định Pass/Fail', type: 'decision', time: 1, cost: 1, role: 'AI System', errorRate: 0.3, description: 'Hệ thống AI tự động phân loại dựa trên ngưỡng chất lượng đã cấu hình', improvement: 'Quyết định nhất quán 100%, không phụ thuộc cảm nhận cá nhân' },
        { id: 'B7', name: 'Robot phân loại sản phẩm lỗi', type: 'task', time: 2, cost: 1, role: 'Robot', errorRate: 0, description: 'Robot arm tự động phân loại và chuyển sản phẩm lỗi sang khu xử lý' },
        { id: 'B8', name: 'Dashboard real-time cập nhật', type: 'task', time: 0, cost: 2, role: 'Hệ thống', errorRate: 0, description: 'Dashboard giám sát OEE và Quality metrics cập nhật theo thời gian thực', improvement: 'Quản lý nắm tình hình ngay lập tức, không cần chờ báo cáo cuối ca' },
        { id: 'B9', name: 'Đóng gói & xuất kho', type: 'end', time: 8, cost: 4, role: 'Công nhân', errorRate: 0, description: 'Sản phẩm đạt được đóng gói và chuyển sang kho xuất' },
      ],
    },
    recommendations: [
      {
        title: 'Triển khai hệ thống AI Visual Inspection',
        priority: 'Critical',
        impact: 'High',
        effort: 'High',
        description: 'Lắp đặt camera công nghiệp và triển khai model Computer Vision để thay thế kiểm tra ngoại quan bằng mắt. Giảm sai sót từ 5.2% xuống 0.5%, tăng tốc 15 lần.',
        roi: 'ROI ước tính: 280% trong 18 tháng. Tiết kiệm ~$120,000/năm chi phí nhân sự QC.',
        category: 'Automation'
      },
      {
        title: 'Tích hợp máy đo CMM tự động',
        priority: 'High',
        impact: 'High',
        effort: 'Medium',
        description: 'Thay thế đo lường thủ công bằng máy CMM (Coordinate Measuring Machine) kết nối trực tiếp với CAD. Giảm 75% thời gian, tăng độ chính xác.',
        roi: 'ROI ước tính: 200% trong 12 tháng.',
        category: 'Quality'
      },
      {
        title: 'Số hóa ghi chép → MES System',
        priority: 'High',
        impact: 'Medium',
        effort: 'Low',
        description: 'Loại bỏ sổ ghi chép giấy và file Excel. Tất cả dữ liệu QC được ghi tự động vào hệ thống MES, cho phép truy xuất real-time.',
        roi: 'Giảm 100% lỗi nhập liệu. Tiết kiệm 2 giờ/ngày cho QC Lead.',
        category: 'Digitalization'
      },
      {
        title: 'Lắp đặt băng chuyền tự động',
        priority: 'Medium',
        impact: 'Medium',
        effort: 'Medium',
        description: 'Thay thế vận chuyển thủ công bằng hệ thống băng chuyền. Giảm thời gian di chuyển 80%, giảm rủi ro làm hư sản phẩm khi vận chuyển.',
        roi: 'ROI ước tính: 150% trong 24 tháng.',
        category: 'Logistics'
      },
      {
        title: 'Triển khai Dashboard thời gian thực',
        priority: 'Medium',
        impact: 'High',
        effort: 'Low',
        description: 'Xây dựng dashboard giám sát KPI chất lượng (OEE, Defect Rate, Yield) cập nhật real-time thay vì báo cáo cuối ca bằng Excel.',
        roi: 'Giảm 50% thời gian phát hiện sự cố chất lượng. Hỗ trợ ra quyết định nhanh hơn.',
        category: 'Analytics'
      },
    ],
  },
  'maintenance-request': {
    name: 'Maintenance Request — Equipment Repair',
    description: 'Quy trình yêu cầu sửa chữa thiết bị khi phát hiện hỏng hóc trên dây chuyền sản xuất.',
    asIs: {
      steps: [
        { id: 'M1', name: 'Phát hiện sự cố máy', type: 'start', time: 0, cost: 0, role: 'Operator', errorRate: 0, description: 'Công nhân vận hành phát hiện máy hoạt động bất thường' },
        { id: 'M2', name: 'Viết phiếu yêu cầu sửa chữa', type: 'task', time: 15, cost: 5, role: 'Operator', errorRate: 10, description: 'Điền phiếu giấy mô tả sự cố, thường thiếu thông tin chi tiết' },
        { id: 'M3', name: 'Chuyển phiếu cho quản lý phê duyệt', type: 'task', time: 30, cost: 10, role: 'Operator', errorRate: 5, description: 'Đi bộ tìm quản lý để ký phê duyệt phiếu' },
        { id: 'M4', name: 'Chờ quản lý phê duyệt', type: 'wait', time: 120, cost: 0, role: 'N/A', errorRate: 0, description: 'Chờ quản lý rảnh để xem xét và phê duyệt yêu cầu (bottleneck chính)' },
        { id: 'M5', name: 'Gọi điện/email cho bộ phận bảo trì', type: 'task', time: 10, cost: 5, role: 'Quản lý', errorRate: 3, description: 'Quản lý liên hệ trưởng bộ phận bảo trì' },
        { id: 'M6', name: 'Chờ kỹ thuật viên', type: 'wait', time: 60, cost: 0, role: 'N/A', errorRate: 0, description: 'Chờ kỹ thuật viên hoàn thành công việc hiện tại' },
        { id: 'M7', name: 'Kiểm tra & sửa chữa', type: 'task', time: 90, cost: 80, role: 'Technician', errorRate: 5, description: 'Kỹ thuật viên kiểm tra, chẩn đoán và sửa chữa thiết bị' },
        { id: 'M8', name: 'Ghi biên bản sửa chữa', type: 'task', time: 15, cost: 8, role: 'Technician', errorRate: 8, description: 'Ghi chép kết quả sửa chữa vào sổ giấy' },
        { id: 'M9', name: 'Máy hoạt động trở lại', type: 'end', time: 0, cost: 0, role: 'Máy', errorRate: 0, description: 'Thiết bị được đưa vào sản xuất trở lại' },
      ],
    },
    toBe: {
      steps: [
        { id: 'N1', name: 'Cảm biến phát hiện bất thường', type: 'start', time: 0, cost: 0, role: 'IoT Sensor', errorRate: 0, description: 'Cảm biến IoT liên tục giám sát và phát hiện bất thường trước khi máy hỏng', improvement: 'Phát hiện sớm 24-48h nhờ Predictive Maintenance' },
        { id: 'N2', name: 'Hệ thống tự tạo Work Order', type: 'task', time: 1, cost: 1, role: 'CMMS', errorRate: 0, description: 'Hệ thống CMMS tự động tạo lệnh sửa chữa với đầy đủ thông tin máy, lịch sử, linh kiện cần thiết', improvement: 'Loại bỏ phiếu giấy, đầy đủ thông tin 100%' },
        { id: 'N3', name: 'Auto-assign kỹ thuật viên', type: 'task', time: 1, cost: 1, role: 'CMMS', errorRate: 0, description: 'Hệ thống tự phân công kỹ thuật viên phù hợp dựa trên kỹ năng và lịch trình', improvement: 'Bỏ qua bước phê duyệt và liên hệ thủ công' },
        { id: 'N4', name: 'Kỹ thuật viên nhận thông báo', type: 'task', time: 2, cost: 0, role: 'Technician', errorRate: 0, description: 'Push notification gửi đến tablet/smartphone của kỹ thuật viên' },
        { id: 'N5', name: 'Kiểm tra & sửa chữa (có hướng dẫn AR)', type: 'task', time: 60, cost: 60, role: 'Technician', errorRate: 2, description: 'Sửa chữa với hỗ trợ AR overlay hiển thị bản vẽ kỹ thuật và hướng dẫn step-by-step', improvement: 'Giảm 33% thời gian sửa chữa nhờ AR guidance' },
        { id: 'N6', name: 'Kết quả ghi tự động vào CMMS', type: 'task', time: 1, cost: 1, role: 'CMMS', errorRate: 0, description: 'Mọi thao tác và kết quả được ghi log tự động', improvement: 'Zero manual logging' },
        { id: 'N7', name: 'Máy hoạt động trở lại', type: 'end', time: 0, cost: 0, role: 'Máy', errorRate: 0, description: 'Thiết bị được đưa vào sản xuất trở lại' },
      ],
    },
    recommendations: [
      {
        title: 'Triển khai Predictive Maintenance với IoT Sensors',
        priority: 'Critical', impact: 'High', effort: 'High',
        description: 'Gắn cảm biến rung động, nhiệt độ lên các thiết bị trọng yếu. Áp dụng ML để dự đoán hỏng hóc trước 24-48h.',
        roi: 'Giảm 70% unplanned downtime. ROI ước tính 300% trong 24 tháng.',
        category: 'IoT'
      },
      {
        title: 'Triển khai hệ thống CMMS',
        priority: 'High', impact: 'High', effort: 'Medium',
        description: 'Số hóa toàn bộ quy trình bảo trì: tạo Work Order tự động, quản lý linh kiện thay thế, lịch sử sửa chữa.',
        roi: 'Giảm 90% thời gian hành chính. Tăng khả năng truy xuất dữ liệu.',
        category: 'Digitalization'
      },
      {
        title: 'Hỗ trợ sửa chữa bằng AR (Augmented Reality)',
        priority: 'Medium', impact: 'Medium', effort: 'High',
        description: 'Cung cấp kính AR hoặc tablet với overlay hướng dẫn sửa chữa, giúp kỹ thuật viên thao tác nhanh và chính xác hơn.',
        roi: 'Giảm 33% thời gian sửa chữa. Đặc biệt hiệu quả cho kỹ thuật viên mới.',
        category: 'Innovation'
      },
    ],
  },
};
