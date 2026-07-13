// ============================================================
// Requirements Management Tool — Sample Data
// Dữ liệu mô phỏng cho dự án Smart Factory IoT Platform
// ============================================================

const EPICS = [
  { id: 'EP-01', name: 'Sensor Data Ingestion', color: '#60a5fa', description: 'Thu thập và xử lý dữ liệu từ cảm biến IoT trên dây chuyền sản xuất' },
  { id: 'EP-02', name: 'Real-time Monitoring', color: '#34d399', description: 'Dashboard giám sát thời gian thực các chỉ số sản xuất' },
  { id: 'EP-03', name: 'Predictive Maintenance', color: '#fbbf24', description: 'Dự đoán hỏng hóc máy móc dựa trên phân tích dữ liệu cảm biến' },
  { id: 'EP-04', name: 'Quality Control', color: '#a78bfa', description: 'Kiểm soát chất lượng tự động bằng AI visual inspection' },
];

const BUSINESS_REQUIREMENTS = [
  { id: 'BR-01', text: 'Hệ thống phải thu thập dữ liệu cảm biến từ tối thiểu 200 thiết bị IoT đồng thời', epicId: 'EP-01' },
  { id: 'BR-02', text: 'Dashboard phải hiển thị dữ liệu với độ trễ không quá 5 giây', epicId: 'EP-02' },
  { id: 'BR-03', text: 'Hệ thống phải cảnh báo sớm ít nhất 24h trước khi thiết bị gặp sự cố', epicId: 'EP-03' },
  { id: 'BR-04', text: 'Tỉ lệ phát hiện lỗi sản phẩm phải đạt ≥ 99.5% với tỉ lệ dương tính giả < 1%', epicId: 'EP-04' },
  { id: 'BR-05', text: 'Hệ thống phải tuân thủ tiêu chuẩn bảo mật IEC 62443 cho môi trường công nghiệp', epicId: 'EP-01' },
  { id: 'BR-06', text: 'Người dùng phải có khả năng tuỳ chỉnh ngưỡng cảnh báo cho từng loại cảm biến', epicId: 'EP-02' },
];

let userStories = [
  // EP-01: Sensor Data Ingestion
  {
    id: 'US-001', type: 'Story', epicId: 'EP-01',
    title: 'As a production engineer, I want to connect temperature sensors via MQTT protocol so that sensor data is automatically streamed to the platform',
    acceptanceCriteria: 'Given a configured MQTT broker, When a sensor publishes data, Then the platform receives and stores it within 2 seconds',
    priority: 'High', storyPoints: 8, sprint: 'Sprint 1', status: 'Done',
    brIds: ['BR-01'], testCases: ['TC-001', 'TC-002', 'TC-003']
  },
  {
    id: 'US-002', type: 'Story', epicId: 'EP-01',
    title: 'As a system admin, I want to register and manage IoT devices in a central registry so that all connected sensors are tracked',
    acceptanceCriteria: 'Given the device management page, When I add a new device, Then it appears in the registry with status "Active"',
    priority: 'High', storyPoints: 5, sprint: 'Sprint 1', status: 'Done',
    brIds: ['BR-01', 'BR-05'], testCases: ['TC-004', 'TC-005']
  },
  {
    id: 'US-003', type: 'Story', epicId: 'EP-01',
    title: 'As a data engineer, I want to validate incoming sensor data against predefined schemas so that corrupted data is filtered out',
    acceptanceCriteria: 'Given incoming sensor data, When data format is invalid, Then the system logs it as rejected and sends an alert',
    priority: 'Medium', storyPoints: 5, sprint: 'Sprint 2', status: 'Done',
    brIds: ['BR-01'], testCases: ['TC-006', 'TC-007']
  },
  {
    id: 'US-004', type: 'Bug', epicId: 'EP-01',
    title: 'Fix: MQTT connection drops after 1000+ concurrent sensor streams causing data loss',
    acceptanceCriteria: 'Given 1500 concurrent connections, When load test runs for 24h, Then zero connection drops occur',
    priority: 'Critical', storyPoints: 8, sprint: 'Sprint 3', status: 'Done',
    brIds: ['BR-01'], testCases: ['TC-008']
  },

  // EP-02: Real-time Monitoring
  {
    id: 'US-005', type: 'Story', epicId: 'EP-02',
    title: 'As a factory manager, I want to view real-time OEE metrics on a dashboard so that I can monitor production efficiency at a glance',
    acceptanceCriteria: 'Given the monitoring dashboard, When data refreshes, Then OEE, Availability, Performance, and Quality are updated within 5s',
    priority: 'High', storyPoints: 13, sprint: 'Sprint 2', status: 'Done',
    brIds: ['BR-02'], testCases: ['TC-009', 'TC-010', 'TC-011']
  },
  {
    id: 'US-006', type: 'Story', epicId: 'EP-02',
    title: 'As a production supervisor, I want to set custom alert thresholds for each sensor type so that I receive notifications when values exceed limits',
    acceptanceCriteria: 'Given the alert configuration page, When I set temperature threshold to 80°C, Then I receive a notification when any sensor exceeds 80°C',
    priority: 'Medium', storyPoints: 5, sprint: 'Sprint 3', status: 'Done',
    brIds: ['BR-02', 'BR-06'], testCases: ['TC-012', 'TC-013']
  },
  {
    id: 'US-007', type: 'Story', epicId: 'EP-02',
    title: 'As a manager, I want to export dashboard reports as PDF so that I can share weekly performance summaries with stakeholders',
    acceptanceCriteria: 'Given the dashboard view, When I click Export PDF, Then a formatted PDF with all visible charts is downloaded',
    priority: 'Low', storyPoints: 3, sprint: 'Sprint 4', status: 'In Review',
    brIds: ['BR-02'], testCases: ['TC-014']
  },

  // EP-03: Predictive Maintenance
  {
    id: 'US-008', type: 'Story', epicId: 'EP-03',
    title: 'As a maintenance engineer, I want the system to predict machine failures 24-48h in advance so that I can schedule preventive maintenance',
    acceptanceCriteria: 'Given historical sensor data, When the ML model detects anomaly patterns, Then a maintenance alert is generated with confidence score ≥ 85%',
    priority: 'Critical', storyPoints: 13, sprint: 'Sprint 4', status: 'In Progress',
    brIds: ['BR-03'], testCases: ['TC-015', 'TC-016', 'TC-017']
  },
  {
    id: 'US-009', type: 'Story', epicId: 'EP-03',
    title: 'As a data scientist, I want to visualize vibration and temperature trends over time so that I can identify degradation patterns in rotating equipment',
    acceptanceCriteria: 'Given a selected machine, When I view the trend chart, Then I see overlaid vibration + temperature data for the last 30 days with anomaly highlights',
    priority: 'High', storyPoints: 8, sprint: 'Sprint 4', status: 'In Progress',
    brIds: ['BR-03'], testCases: ['TC-018', 'TC-019']
  },
  {
    id: 'US-010', type: 'Task', epicId: 'EP-03',
    title: 'Integrate TensorFlow Lite model for on-edge vibration anomaly detection',
    acceptanceCriteria: 'Given the edge gateway device, When sensor data is processed, Then anomaly inference runs locally with latency < 100ms',
    priority: 'Medium', storyPoints: 8, sprint: 'Sprint 5', status: 'To Do',
    brIds: ['BR-03'], testCases: ['TC-020']
  },

  // EP-04: Quality Control
  {
    id: 'US-011', type: 'Story', epicId: 'EP-04',
    title: 'As a quality inspector, I want an AI-powered visual inspection system to automatically detect surface defects on brake components so that manual inspection workload is reduced by 80%',
    acceptanceCriteria: 'Given a camera feed from the production line, When a component passes inspection point, Then the system classifies it as Pass/Fail within 500ms with ≥99.5% accuracy',
    priority: 'Critical', storyPoints: 13, sprint: 'Sprint 5', status: 'To Do',
    brIds: ['BR-04'], testCases: ['TC-021', 'TC-022', 'TC-023', 'TC-024']
  },
  {
    id: 'US-012', type: 'Story', epicId: 'EP-04',
    title: 'As a quality manager, I want to view defect statistics aggregated by production line and shift so that I can identify quality trends',
    acceptanceCriteria: 'Given the quality dashboard, When I select a date range and production line, Then defect count, type distribution, and trend charts are displayed',
    priority: 'High', storyPoints: 5, sprint: 'Sprint 5', status: 'To Do',
    brIds: ['BR-04'], testCases: ['TC-025', 'TC-026']
  },
  {
    id: 'US-013', type: 'Bug', epicId: 'EP-04',
    title: 'Fix: False positive rate of visual inspection exceeds 2% for dark-colored components',
    acceptanceCriteria: 'Given dark-colored brake components, When inspected by the AI system, Then false positive rate is < 1%',
    priority: 'High', storyPoints: 5, sprint: 'Sprint 5', status: 'In Progress',
    brIds: ['BR-04'], testCases: ['TC-027', 'TC-028']
  },
];

// Velocity data (story points completed per sprint)
const VELOCITY_DATA = [
  { sprint: 'Sprint 1', planned: 18, completed: 13 },
  { sprint: 'Sprint 2', planned: 23, completed: 23 },
  { sprint: 'Sprint 3', planned: 21, completed: 21 },
  { sprint: 'Sprint 4', planned: 37, completed: 24 },
  { sprint: 'Sprint 5', planned: 36, completed: 0 },
];

let nextStoryId = 14;
