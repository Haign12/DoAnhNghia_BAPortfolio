import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Recent Orders Header
html = html.replace(
    '<div class="section-title mt-5">Recent Orders</div>',
    """<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; margin-bottom: 16px;">
        <div class="section-title" style="margin: 0;">Recent Orders</div>
        <div class="task-group-pills" style="margin: 0; padding: 4px;">
          <div class="task-group-pill active" style="font-size: 12px; padding: 4px 12px; cursor: pointer;">All</div>
          <div class="task-group-pill" style="font-size: 12px; padding: 4px 12px; cursor: pointer;">Completed</div>
          <div class="task-group-pill" style="font-size: 12px; padding: 4px 12px; cursor: pointer;">Cancelled</div>
        </div>
      </div>"""
)

# 2. Repeat Order Button on KFC
html = html.replace(
    '<div class="history-total">520.000đ</div>',
    '<div class="history-total">520.000đ</div>\n            <button class="btn-secondary" style="position: absolute; right: 0; bottom: 0; padding: 4px 12px; font-size: 12px;" onclick="switchView(\'view-create\')">Repeat Order</button>'
).replace(
    '<div class="history-card-body">',
    '<div class="history-card-body" style="position: relative;">',
    1 # Only the first one (KFC)
)

# 3. Cancelled state for Pizza 4P's
html = re.sub(
    r'<div class="history-shop">Pizza 4P\'s</div>\s*<div class="history-status success">Completed</div>',
    '<div class="history-shop">Pizza 4P\'s</div>\n            <div class="history-status" style="background: var(--bg-light); color: var(--text-secondary);">Cancelled</div>',
    html
)

# 4. Wrap Create Form in Dashboard Grid
form_card_match = re.search(r'<div class="form-card">.*?</div>\s*</div>\s*<!-- VIEW: HOST DASHBOARD', html, re.DOTALL)
if form_card_match:
    form_card_str = form_card_match.group(0).replace('<!-- VIEW: HOST DASHBOARD', '')
    new_layout = f"""
      <div class="dashboard-grid">
        <div class="dashboard-main">
          {form_card_str.strip()}
        </div>
        <div class="dashboard-side">
          <div class="card" style="position: sticky; top: 20px;">
            <h3 class="card-title mb-3" style="font-size: 14px;">Invite Link Preview</h3>
            <div style="border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <div style="background: var(--bg-light); padding: 12px; border-bottom: 1px solid var(--border-light);">
                <div style="font-weight: 600; font-size: 14px;" id="previewTitle">Join order from ...</div>
                <div style="font-size: 12px; color: var(--text-secondary);">orderflow.app/join/HC...</div>
              </div>
              <div style="padding: 16px; background: white;">
                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <div style="width: 48px; height: 48px; background: var(--bg-dark); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">DN</div>
                  <div>
                    <div style="font-size: 13px; color: var(--text-secondary);">Hosted by DN</div>
                    <div style="font-size: 13px; font-weight: 600; color: var(--orange);" id="previewCutoff">Closes at --:--</div>
                  </div>
                </div>
                <button class="btn-primary w-100" style="padding: 8px; pointer-events: none; opacity: 0.7;">Join Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- VIEW: HOST DASHBOARD"""
    html = html.replace(form_card_match.group(0), new_layout)

# 5. Host Dashboard modifications
html = html.replace(
    'Closes at <span id="hostDashCutoff">11:30 AM</span>',
    'Closes at <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--orange); color: white; padding: 2px 10px; border-radius: 99px; font-weight: 600; font-size: 12px; margin-left: 6px;"><i class="ph ph-clock"></i> <span id="hostDashCutoff">11:30 AM</span></div>'
)
html = html.replace(
    '<!-- Funding Progress Bar -->',
    """<!-- Vendor Info -->
      <div class="card mb-4" style="display: flex; gap: 16px; align-items: center;">
        <div style="width: 60px; height: 60px; background: var(--bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center;"><i class="ph ph-storefront" style="font-size: 24px; color: var(--teal);"></i></div>
        <div>
          <h3 id="vendorNameTop" style="margin-bottom: 4px;">Highlands Coffee</h3>
          <div style="font-size: 13px; color: var(--text-secondary)"><i class="ph ph-link"></i> shopeefood.vn/highlands &bull; <i class="ph ph-moped"></i> Est. 20-30 mins</div>
        </div>
      </div>
      <!-- Funding Progress Bar -->"""
)

# Add Payment Method Breakdown in Order Summary
html = html.replace(
    '<div class="summary-divider"></div>',
    '<div class="summary-divider"></div>\n            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px; text-align: right;" id="paymentMethodBreakdown">3 paid via Momo, 1 via Cash</div>'
)

# 6. View Participant modifications
# Add category tabs
html = html.replace(
    '<h3 class="section-title">Menu Highlights</h3>',
    """<div style="display: flex; gap: 8px; overflow-x: auto; margin-bottom: 16px; padding-bottom: 4px;">
            <span class="badge" style="background: var(--teal); color: white; padding: 6px 16px; cursor:pointer;">All</span>
            <span class="badge" style="background: var(--bg-light); color: var(--text-secondary); padding: 6px 16px; cursor:pointer;">Signature</span>
            <span class="badge" style="background: var(--bg-light); color: var(--text-secondary); padding: 6px 16px; cursor:pointer;">Coffee</span>
            <span class="badge" style="background: var(--bg-light); color: var(--text-secondary); padding: 6px 16px; cursor:pointer;">Tea</span>
          </div>
          <h3 class="section-title">Menu Highlights</h3>"""
)

# Replace menu item cards to include image and options
html = html.replace(
    '<div class="menu-item-card">\n            <div class="menu-item-info">\n              <h4>Trà Sữa Trân Châu</h4>\n              <p>Best seller, 50% sugar recommended.</p>\n              <span class="price">35.000đ</span>\n            </div>\n            <button class="btn-add" onclick="addToCart(\'Trà Sữa Trân Châu\', 35000)">+</button>\n          </div>',
    """<div class="menu-item-card" style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 72px; height: 72px; background: #f0f0f0; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
              <img src="https://images.unsplash.com/photo-1558857563-b37102e95e2a?auto=format&fit=crop&w=150&q=80" style="width:100%; height:100%; object-fit: cover;">
            </div>
            <div class="menu-item-info" style="flex: 1;">
              <h4 style="margin-bottom: 4px;">Trà Sữa Trân Châu</h4>
              <p>Best seller</p>
              <div style="display: flex; gap: 8px; margin-top: 4px; margin-bottom: 8px;">
                <select style="font-size: 11px; padding: 2px; border: 1px solid var(--border-light); border-radius: 4px;"><option>Normal Ice</option><option>Less Ice</option></select>
                <select style="font-size: 11px; padding: 2px; border: 1px solid var(--border-light); border-radius: 4px;"><option>50% Sugar (Rec)</option><option>100% Sugar</option></select>
              </div>
              <span class="price">35.000đ</span>
            </div>
            <button class="btn-add" onclick="addToCart('Trà Sữa Trân Châu', 35000)">+</button>
          </div>"""
)
html = html.replace(
    '<div class="menu-item-card">\n            <div class="menu-item-info">\n              <h4>Cà Phê Sữa Đá</h4>\n              <p>Strong Vietnamese coffee.</p>\n              <span class="price">29.000đ</span>\n            </div>\n            <button class="btn-add" onclick="addToCart(\'Cà Phê Sữa Đá\', 29000)">+</button>\n          </div>',
    """<div class="menu-item-card" style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 72px; height: 72px; background: #f0f0f0; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
              <img src="https://images.unsplash.com/photo-1629853927649-e2aebbf5f432?auto=format&fit=crop&w=150&q=80" style="width:100%; height:100%; object-fit: cover;">
            </div>
            <div class="menu-item-info" style="flex: 1;">
              <h4 style="margin-bottom: 4px;">Cà Phê Sữa Đá</h4>
              <p>Strong Vietnamese coffee.</p>
              <span class="price" style="display:block; margin-top:8px;">29.000đ</span>
            </div>
            <button class="btn-add" onclick="addToCart('Cà Phê Sữa Đá', 29000)">+</button>
          </div>"""
)
html = html.replace(
    '<div class="menu-item-card">\n            <div class="menu-item-info">\n              <h4>Matcha Latte</h4>\n              <p>Premium Japanese matcha.</p>\n              <span class="price">45.000đ</span>\n            </div>\n            <button class="btn-add" onclick="addToCart(\'Matcha Latte\', 45000)">+</button>\n          </div>',
    """<div class="menu-item-card" style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 72px; height: 72px; background: #f0f0f0; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
              <img src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=150&q=80" style="width:100%; height:100%; object-fit: cover;">
            </div>
            <div class="menu-item-info" style="flex: 1;">
              <h4 style="margin-bottom: 4px;">Matcha Latte</h4>
              <p>Premium Japanese matcha.</p>
              <div style="display: flex; gap: 8px; margin-top: 4px; margin-bottom: 8px;">
                <select style="font-size: 11px; padding: 2px; border: 1px solid var(--border-light); border-radius: 4px;"><option>Hot</option><option>Iced</option></select>
                <select style="font-size: 11px; padding: 2px; border: 1px solid var(--border-light); border-radius: 4px;"><option>Oat Milk (+10k)</option><option>Normal Milk</option></select>
              </div>
              <span class="price">45.000đ</span>
            </div>
            <button class="btn-add" onclick="addToCart('Matcha Latte', 45000)">+</button>
          </div>"""
)

# Add Avatars at the top of Participant Join Page
html = html.replace(
    '<div class="page-subtitle" style="color: var(--orange); font-weight: 600;">Closes at <span id="participantCutoff"></span></div>',
    """<div class="page-subtitle" style="color: var(--orange); font-weight: 600; margin-bottom: 12px;">Closes at <span id="participantCutoff"></span></div>
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
          <div class="nav-avatar" style="width: 28px; height: 28px; font-size: 11px; border: 2px solid white; z-index: 3;">AN</div>
          <div class="nav-avatar" style="width: 28px; height: 28px; font-size: 11px; border: 2px solid white; margin-left: -10px; background: var(--orange); z-index: 2;">MT</div>
          <div class="nav-avatar" style="width: 28px; height: 28px; font-size: 11px; border: 2px solid white; margin-left: -10px; background: var(--blue); z-index: 1;">HG</div>
          <span style="font-size: 12px; color: var(--text-secondary); margin-left: 8px;">3 people joined</span>
        </div>"""
)

# Cart sticky footer
html = html.replace(
    '<div class="card mt-4" id="cartContainer">',
    '<div class="card mt-4" id="cartContainer" style="position: sticky; bottom: 20px; box-shadow: 0 -4px 16px rgba(0,0,0,0.1); border: 2px solid var(--teal); background: white;">'
)

# Helper text for Menu Link
html = html.replace(
    '<label>Menu Link (Optional)</label>',
    '<label>Menu Link (Optional)</label>\n          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">Members can browse items directly without leaving the app.</div>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
