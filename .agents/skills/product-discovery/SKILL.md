---
name: product-discovery
description: |
  Hướng dẫn AI agent thực hiện product discovery: xác định vấn đề, đối tượng, 
  jobs-to-be-done, constraints, assumptions, success metrics và output product brief 
  trước khi bắt đầu thiết kế hoặc code.
globs:
  - "docs/product-brief.md"
  - "docs/assumption-log.md"
  - "docs/decision-log.md"
---

# Product Discovery

## Mục đích

Đây là bước đầu tiên và quan trọng nhất. KHÔNG được bắt đầu thiết kế hay code nếu chưa hoàn tất product discovery. Mọi quyết định về UI, UX, stack, feature đều phải bắt nguồn từ understanding về người dùng và bài toán kinh doanh.

## Quy trình bắt buộc

### 1. Problem Framing

Trả lời rõ ràng các câu hỏi sau trước khi làm bất cứ điều gì:

```markdown
## Problem Statement
- Vấn đề cốt lõi mà website/sản phẩm giải quyết là gì?
- Ai đang gặp vấn đề này? (Cụ thể, không phải "mọi người")
- Hậu quả nếu vấn đề không được giải quyết?
- Giải pháp hiện tại người dùng đang dùng là gì? Tại sao chưa đủ?
```

### 2. Audience Definition

Xác định audience không phải bằng demographics chung chung. Cần:

- **Primary audience**: Người dùng chính, mô tả bằng behavior và context
- **Secondary audience**: Người dùng phụ hoặc stakeholder
- **Anti-audience**: Ai KHÔNG phải đối tượng (giúp tập trung)

Template cho mỗi audience segment:

```markdown
### [Tên segment]
- **Behavior**: Họ thường làm gì khi gặp vấn đề này?
- **Context**: Họ sử dụng trong bối cảnh nào? (thiết bị, thời gian, tâm trạng)
- **Motivation**: Điều gì thúc đẩy họ tìm giải pháp?
- **Barrier**: Điều gì cản trở họ hành động?
- **Current solution**: Họ đang dùng gì để giải quyết vấn đề?
```

### 3. Jobs-to-be-Done (JTBD)

Liệt kê các job theo format:

```
Khi [tình huống/context], tôi muốn [hành động/mong muốn], để [kết quả mong đợi].
```

Phân loại thành:
- **Functional jobs**: Nhiệm vụ thực tế cần hoàn thành
- **Emotional jobs**: Cảm xúc muốn đạt được hoặc tránh
- **Social jobs**: Hình ảnh muốn thể hiện với người khác

### 4. Constraints & Assumptions

#### Constraints (Ràng buộc cứng)

| Loại | Mô tả | Ảnh hưởng |
|------|--------|-----------|
| Timeline | Deadline, milestones | Scope, quality trade-off |
| Budget | Ngân sách, resources | Stack, hosting, third-party |
| Technical | Browser support, performance, hosting | Architecture, dependencies |
| Legal | GDPR, accessibility, industry regulations | Data handling, compliance |
| Brand | Brand guidelines có sẵn, tone, visual identity | Design direction |
| Content | Nội dung có sẵn hay cần tạo mới | Timeline, scope |

#### Assumptions (Giả định cần kiểm chứng)

```markdown
| # | Assumption | Evidence | Risk nếu sai | Cách kiểm chứng |
|---|-----------|----------|--------------|-----------------|
| 1 | [Giả định] | [Có/Không/Yếu] | [Cao/TB/Thấp] | [Phương pháp] |
```

### 5. Success Metrics

Định nghĩa thành công TRƯỚC KHI build, không phải sau:

```markdown
## Primary KPIs
| Metric | Baseline | Target | Measurement method |
|--------|----------|--------|--------------------|
| [Metric name] | [Current/N/A] | [Goal] | [Tool/method] |

## Secondary KPIs
| Metric | Target | Why it matters |
|--------|--------|---------------|
| [Metric name] | [Goal] | [Rationale] |

## Guardrail Metrics (không được giảm)
| Metric | Minimum acceptable | Current |
|--------|--------------------|---------|
| [Metric name] | [Threshold] | [Current] |
```

### 6. Competitive & Reference Analysis

```markdown
## Competitive Landscape
| Competitor/Reference | Strengths | Weaknesses | What to learn |
|---------------------|-----------|------------|---------------|
| [Name + URL] | [Points] | [Points] | [Insights] |

## Differentiation
- Điều gì làm sản phẩm này KHÁC BIỆT so với alternatives?
- Unique value proposition (1 câu):
```

### 7. Scope Definition

```markdown
## MVP Scope (Must have)
- [ ] Feature/page 1
- [ ] Feature/page 2

## V1.1 Scope (Should have)  
- [ ] Feature/page 3

## Future (Nice to have)
- [ ] Feature/page 4

## Explicitly Out of Scope
- Feature X — Lý do:
- Feature Y — Lý do:
```

## Output bắt buộc

Sau khi hoàn tất discovery, tạo 2 file:

### `docs/product-brief.md`
Tổng hợp tất cả findings ở trên thành 1 document có cấu trúc, dùng làm single source of truth cho toàn bộ dự án.

### `docs/assumption-log.md`  
Tracking assumptions, evidence và status (validated/invalidated/pending).

## Acceptance Criteria

- [ ] Problem statement rõ ràng, cụ thể
- [ ] Ít nhất 1 primary audience segment được mô tả chi tiết
- [ ] Ít nhất 3 JTBD được xác định
- [ ] Constraints được liệt kê đầy đủ
- [ ] Assumptions có risk level và cách kiểm chứng
- [ ] KPIs có baseline (hoặc ghi rõ N/A) và target
- [ ] MVP scope được define rõ ràng
- [ ] Decision log bắt đầu được khởi tạo

## Anti-patterns cần tránh

❌ Bỏ qua discovery vì "đã biết rõ yêu cầu"
❌ Viết product brief bằng cách copy/paste requirements mà không phân tích
❌ Định nghĩa audience bằng demographics thay vì behavior
❌ Không có success metrics hoặc chỉ có metrics mơ hồ ("tăng traffic")
❌ Scope creep — thêm feature không có trong brief mà không cập nhật document
❌ Nhảy thẳng vào wireframe/code khi chưa có JTBD và constraints
