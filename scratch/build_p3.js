const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\LENOVO\\Documents\\GitHub\\DoAnhNghia_BAPortfolio\\project3-office-order';

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OrderFlow | Group Order App</title>
  <meta name="description" content="Office Group Order Optimization – Wallet-style Fintech Dashboard.">
  <link rel="icon" type="image/png" href="../logo.png?v=3">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="../ux-showcase.css">
</head>
<body>
<!-- Portfolio Demo Bar -->
<div class="portfolio-demo-bar">
  <div class="demo-info">
    <span class="live-dot"></span>
    <span class="demo-text">Interactive Prototype</span>
  </div>
  <a href="../index.html#project-03" class="back-portfolio-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    Back to Portfolio
  </a>
</div>

  <header class="topbar">
    <div class="topbar-brand">
      <div class="topbar-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 8L12 13L3 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 16V8L12 3L3 8V16L12 21L21 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 21V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="topbar-title">Order<span style="color: var(--teal);">Flow</span></div>
    </div>
    <div class="topbar-right">
      <div class="topbar-avatar">DN</div>
    </div>
  </header>

  <main class="main-content">
    
    <!-- VIEW: HOME (List of Orders) -->
    <div id="view-home" class="view-section active fade-in">
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <h1 class="page-title">My Orders</h1>
          <div class="page-subtitle">Manage your group food orders efficiently.</div>
        </div>
        <button class="btn-primary" onclick="switchView('view-create')">
          <i class="ph ph-plus"></i> Create Group Order
        </button>
      </div>

      <div class="section-title">Active Sessions</div>
      <div class="empty-state">
        <div class="empty-icon"><i class="ph ph-coffee"></i></div>
        <h3>No active orders</h3>
        <p>You haven't started any group orders yet. Start one to invite your colleagues!</p>
        <button class="btn-primary mt-3" onclick="switchView('view-create')">Create Order</button>
      </div>

      <div class="section-title mt-5">Recent Orders</div>
      <div class="card-list">
        <div class="history-card" onclick="switchView('view-analytics')">
          <div class="history-card-header">
            <div class="history-shop">KFC Lunch</div>
            <div class="history-status success">Completed</div>
          </div>
          <div class="history-card-body">
            <div class="history-detail"><i class="ph ph-calendar"></i> July 20, 2026</div>
            <div class="history-detail"><i class="ph ph-users"></i> 8 Participants</div>
            <div class="history-total">520.000đ</div>
          </div>
          <div style="font-size: 12px; color: var(--teal); margin-top: 10px; text-align: right;">View Analytics &rarr;</div>
        </div>
      </div>
    </div>

    <!-- VIEW: CREATE ORDER -->
    <div id="view-create" class="view-section fade-in">
      <button class="back-link" onclick="switchView('view-home')"><i class="ph ph-arrow-left"></i> Back</button>
      <div class="page-header">
        <h1 class="page-title">Create New Order</h1>
        <div class="page-subtitle">Set up a session and share the link.</div>
      </div>
      
      <div class="form-card">
        <div class="form-group">
          <label>Shop / Restaurant Name</label>
          <input type="text" class="form-input" id="shopName" placeholder="e.g. Highlands Coffee, Phuc Long...">
        </div>
        <div class="form-group">
          <label>Menu Link (Optional)</label>
          <input type="text" class="form-input" placeholder="Paste ShopeeFood / GrabFood link">
        </div>
        <div class="form-row">
          <div class="form-group" style="flex: 1;">
            <label>Cut-off Time</label>
            <input type="time" class="form-input" value="11:30">
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Shipping Fee Split Method</label>
            <select class="form-input">
              <option>Equal split among all members</option>
              <option>Proportional to order amount</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-primary w-100" onclick="switchView('view-host-dashboard')">Create & Generate Invite Link</button>
        </div>
      </div>
    </div>

    <!-- VIEW: HOST DASHBOARD -->
    <div id="view-host-dashboard" class="view-section fade-in">
      <button class="back-link" onclick="switchView('view-home')"><i class="ph ph-arrow-left"></i> Home</button>
      <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <h1 class="page-title">Highlands Coffee</h1>
          <div class="page-subtitle">Order Session • Closes at 11:30 AM</div>
        </div>
        <div class="share-box">
          <input type="text" value="https://orderflow.app/join/HC-8273" readonly class="share-input">
          <button class="btn-secondary" onclick="showToast('Invite link copied!', '<i class=\\'ph ph-copy\\'></i>')">Copy Link</button>
        </div>
      </div>

      <!-- Stepper -->
      <div class="stepper-section">
        <div class="stepper" id="stepper">
          <div class="stepper-line"></div>
          <div class="stepper-progress" style="width: 33%;"></div>
          
          <div class="step completed">
            <div class="step-circle"><i class="ph ph-check"></i></div>
            <div class="step-label">Created</div>
          </div>
          <div class="step active">
            <div class="step-circle"><i class="ph ph-users"></i></div>
            <div class="step-label">Collecting Orders</div>
          </div>
          <div class="step">
            <div class="step-circle"><i class="ph ph-money"></i></div>
            <div class="step-label">Awaiting Payment</div>
          </div>
          <div class="step">
            <div class="step-circle"><i class="ph ph-shopping-bag"></i></div>
            <div class="step-label">Placed to Vendor</div>
          </div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="dashboard-grid">
        <!-- Participant List -->
        <div class="dashboard-main">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Participant List</h3>
              <span class="badge warning">2 of 5 Paid</span>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="participantTableBody">
                <!-- Injected via JS -->
              </tbody>
            </table>
            <!-- Empty state hidden initially -->
            <div class="empty-state" id="participantEmpty" style="display: none; padding: 30px;">
              <div class="empty-icon"><i class="ph ph-users"></i></div>
              <h3>No participants yet</h3>
              <p>Share the link above to invite colleagues.</p>
              <button class="btn-secondary mt-3" onclick="switchView('view-participant')">Simulate Participant Joining</button>
            </div>
          </div>
        </div>
        
        <!-- Summary Panel -->
        <div class="dashboard-side">
          <div class="card">
            <h3 class="card-title mb-3">Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>240.000đ</span>
            </div>
            <div class="summary-row">
              <span>Shipping Fee</span>
              <span>15.000đ</span>
            </div>
            <div class="summary-row">
              <span>Discount</span>
              <span style="color: var(--green);">-20.000đ</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-total">
              <span>Grand Total</span>
              <span class="total-amount">235.000đ</span>
            </div>

            <div class="mt-4">
              <button class="btn-primary w-100 mb-2" id="placeOrderBtn">Close Order & Send to Vendor</button>
              <button class="btn-secondary w-100" onclick="switchView('view-participant')">Switch to Participant View</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: PARTICIPANT (Menu/Cart) -->
    <div id="view-participant" class="view-section fade-in">
      <div class="page-header centered">
        <div class="host-avatar">AN</div>
        <h1 class="page-title">Anh Nghĩa invited you to order from Highlands Coffee</h1>
        <div class="page-subtitle">Closing in 14:59 mins</div>
      </div>

      <div class="menu-grid">
        <div class="menu-items">
          <h3 class="section-title">Menu Highlights</h3>
          <div class="menu-item-card">
            <div class="menu-item-info">
              <h4>Trà Sữa Trân Châu</h4>
              <p>Best seller, 50% sugar recommended.</p>
              <span class="price">35.000đ</span>
            </div>
            <button class="btn-add" onclick="showToast('Added to cart')">+</button>
          </div>
          <div class="menu-item-card">
            <div class="menu-item-info">
              <h4>Cà Phê Sữa Đá</h4>
              <p>Strong Vietnamese coffee.</p>
              <span class="price">29.000đ</span>
            </div>
            <button class="btn-add" onclick="showToast('Added to cart')">+</button>
          </div>
          <div class="menu-item-card">
            <div class="menu-item-info">
              <h4>Matcha Latte</h4>
              <p>Premium Japanese matcha.</p>
              <span class="price">45.000đ</span>
            </div>
            <button class="btn-add" onclick="showToast('Added to cart')">+</button>
          </div>
        </div>

        <div class="cart-panel">
          <div class="card">
            <h3 class="card-title mb-3">Your Cart</h3>
            <!-- Cart Empty State -->
            <div class="empty-state" id="cartEmpty" style="padding: 20px 0; display: none;">
              <p style="font-size: 13px; color: var(--text-muted);">Your cart is empty. Select items from the menu.</p>
            </div>
            <!-- Cart Filled State -->
            <div id="cartFilled">
              <div class="cart-item">
                <div class="cart-item-name">Trà Sữa Trân Châu (x1)</div>
                <div class="cart-item-price">35.000đ</div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row" style="font-size: 13px;">
                <span>Item Subtotal</span>
                <span>35.000đ</span>
              </div>
              <div class="summary-row" style="font-size: 13px;">
                <span>Shared Shipping/Discount</span>
                <span>+ 5.000đ</span>
              </div>
              <div class="summary-total mt-2" style="font-size: 1.1rem;">
                <span>Your Total</span>
                <span>40.000đ</span>
              </div>
              <button class="btn-primary w-100 mt-3" onclick="switchView('view-payment')">Confirm & Pay 40.000đ</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: PAYMENT -->
    <div id="view-payment" class="view-section fade-in">
      <div class="payment-container">
        <h2 class="text-center mb-1">Pay Your Split</h2>
        <p class="text-center text-muted mb-4">Scan this QR code to complete your order.</p>
        
        <div class="qr-card">
          <div class="qr-mockup" id="qrMockup">
            <div class="qr-grid" id="qrGrid"></div>
            <div class="qr-scan-line"></div>
          </div>
          <div class="qr-amount-display">40.000đ</div>
          <div class="qr-instruction">Transfer syntax: <strong>TTrang Pay Highlands</strong></div>
        </div>

        <button class="btn-primary w-100 mt-4" onclick="handlePaymentComplete()">I have transferred</button>
        <button class="btn-text w-100 mt-2" onclick="switchView('view-participant')">Back to Menu</button>
      </div>
    </div>

    <!-- VIEW: ANALYTICS (Moved from home) -->
    <div id="view-analytics" class="view-section fade-in">
      <button class="back-link" onclick="switchView('view-home')"><i class="ph ph-arrow-left"></i> Home</button>
      <div class="page-header">
        <h1 class="page-title">Process Analytics</h1>
        <div class="page-subtitle">Impact data recorded after 5 trial sessions. Only visible to Admin/Host.</div>
      </div>

      <div class="kpi-row">
        <!-- Card 1 -->
        <div class="kpi-card">
          <div class="kpi-card-label">Coordination Time</div>
          <div class="kpi-card-rate">was <strong>50 mins</strong></div>
          <svg class="kpi-sparkline-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline points="0,40 20,35 40,45 60,10 80,25 100,5"></polyline>
            <circle class="spark-dot" cx="100" cy="5" r="3"></circle>
          </svg>
          <div class="kpi-spark-label">-90%</div>
          <div class="kpi-card-section-label">Current Time</div>
          <div class="kpi-card-value-box">
            <div class="val" style="color: #00d4aa;">5 mins</div>
            <div class="kpi-card-coin-icon" style="background: rgba(0, 212, 170, 0.15); color: #00d4aa;"><i class="ph ph-timer"></i></div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="kpi-card">
          <div class="kpi-card-label">Payment Deficit</div>
          <div class="kpi-card-rate">was <strong>12% Loss</strong></div>
          <svg class="kpi-sparkline-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline points="0,10 20,20 40,5 60,30 80,15 100,45"></polyline>
            <circle class="spark-dot" cx="100" cy="45" r="3"></circle>
          </svg>
          <div class="kpi-spark-label">0% Risk</div>
          <div class="kpi-card-section-label">Current Deficit</div>
          <div class="kpi-card-value-box">
            <div class="val" style="color: #00d4aa;">0.00%</div>
            <div class="kpi-card-coin-icon" style="background: rgba(0, 212, 170, 0.15); color: #00d4aa;"><i class="ph ph-shield-check"></i></div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="kpi-card">
          <div class="kpi-card-label">Process Efficiency</div>
          <div class="kpi-card-rate">vs <strong>Manual Flow</strong></div>
          <svg class="kpi-sparkline-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
            <polyline points="0,45 20,35 40,40 60,15 80,20 100,5"></polyline>
            <circle class="spark-dot" cx="100" cy="5" r="3"></circle>
          </svg>
          <div class="kpi-spark-label">Max</div>
          <div class="kpi-card-section-label">Efficiency Gain</div>
          <div class="kpi-card-value-box">
            <div class="val" style="color: #00d4aa;">+80%</div>
            <div class="kpi-card-coin-icon" style="background: rgba(0, 212, 170, 0.15); color: #00d4aa;"><i class="ph ph-rocket-launch"></i></div>
          </div>
        </div>
      </div>
    </div>

  </main>

  <div class="toast-container" id="toastContainer"></div>

  <script src="data.js"></script>
  <script src="app.js"></script>
  <script src="../ux-showcase.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      initUXShowcase({
        projectId: 'p3_orderflow',
        role: 'App Flow Demo',
        title: 'OrderFlow Architecture Update',
        desc: 'Redesigned according to proper Information Architecture: separating Host & Participant flows, handling empty states, and moving analytical artifacts out of the core app.',
        tasks: [
          'Click "+ Create Group Order" to start the Host flow.',
          'In Host Dashboard, click "Simulate Participant Joining" to experience the Member flow.',
          'Go back to Home and click "Recent Orders" to view the Analytics.'
        ]
      });
    });
  </script>
</body>
</html>`;

const stylesCss = `/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | MULTI-VIEW REWRITE
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-main: #f8f9fd;
  --bg-card: #ffffff;
  --bg-dark: #1a2332;
  --bg-dark-2: #1e3a5f;
  --bg-dark-3: #0d2137;
  --border-light: rgba(0, 0, 0, 0.06);
  --border-medium: rgba(0, 0, 0, 0.1);
  --text-primary: #1a2332;
  --text-secondary: #5a6578;
  --text-muted: #9aa5b4;
  --teal: #00d4aa;
  --green: #27ae60;
  --orange: #f5a623;
  --blue: #4a90d9;
}

html { font-size: 14px; }
body { font-family: 'Inter', sans-serif; background: var(--bg-main); color: var(--text-primary); line-height: 1.5; }

.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 40px; background: var(--bg-card); border-bottom: 1px solid var(--border-light);
  position: sticky; top: 48px; z-index: 100;
}
.topbar-brand { display: flex; align-items: center; gap: 12px; }
.topbar-logo { width: 36px; height: 36px; background: var(--bg-dark); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.topbar-title { font-size: 1.3rem; font-weight: 800; }
.topbar-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--bg-dark), var(--bg-dark-2)); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }

.main-content { max-width: 1200px; margin: 0 auto; padding: 30px 20px; }

/* Views */
.view-section { display: none; }
.view-section.active { display: block; }
.fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Typography */
.page-header { margin-bottom: 30px; }
.page-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 6px; }
.page-subtitle { color: var(--text-secondary); font-size: 1rem; font-weight: 500; }
.section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 16px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
.text-center { text-align: center; }
.text-muted { color: var(--text-muted); }
.mt-2 { margin-top: 8px; } .mt-3 { margin-top: 16px; } .mt-4 { margin-top: 24px; } .mt-5 { margin-top: 40px; }
.mb-1 { margin-bottom: 4px; } .mb-2 { margin-bottom: 8px; } .mb-3 { margin-bottom: 16px; } .mb-4 { margin-bottom: 24px; }
.w-100 { width: 100%; }

/* Buttons */
button { font-family: inherit; cursor: pointer; transition: all 0.2s; border-radius: 8px; border: none; font-weight: 600; padding: 12px 24px; font-size: 0.95rem; }
.btn-primary { background: var(--bg-dark); color: #fff; }
.btn-primary:hover { background: #000; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.btn-secondary { background: #fff; border: 1px solid var(--border-medium); color: var(--text-primary); }
.btn-secondary:hover { border-color: var(--text-primary); }
.btn-text { background: transparent; color: var(--text-secondary); }
.btn-text:hover { color: var(--text-primary); background: rgba(0,0,0,0.04); }
.back-link { background: transparent; padding: 6px 12px; margin-bottom: 20px; display: inline-flex; align-items: center; gap: 6px; color: var(--text-secondary); font-weight: 600; border-radius: 6px; }
.back-link:hover { background: rgba(0,0,0,0.05); color: var(--text-primary); }

/* Empty States */
.empty-state { background: var(--bg-card); border: 2px dashed var(--border-medium); border-radius: 16px; padding: 60px 20px; text-align: center; }
.empty-icon { font-size: 3rem; color: var(--border-medium); margin-bottom: 16px; }
.empty-state h3 { font-size: 1.2rem; margin-bottom: 8px; }
.empty-state p { color: var(--text-secondary); max-width: 400px; margin: 0 auto; }

/* Cards & Layouts */
.card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.card-title { font-size: 1.1rem; font-weight: 700; }
.dashboard-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
@media(max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr; } }

/* Forms */
.form-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 32px; max-width: 600px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary); }
.form-input { width: 100%; padding: 12px 16px; border: 1px solid var(--border-medium); border-radius: 8px; font-family: inherit; font-size: 1rem; outline: none; transition: all 0.2s; }
.form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0,212,170,0.1); }
.form-row { display: flex; gap: 16px; }

/* History List */
.history-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; max-width: 400px;}
.history-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: var(--teal); }
.history-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.history-shop { font-weight: 700; font-size: 1.1rem; }
.history-status.success { font-size: 0.7rem; font-weight: 700; background: rgba(39, 174, 96, 0.1); color: #27ae60; padding: 4px 8px; border-radius: 12px; text-transform: uppercase; }
.history-card-body { display: flex; justify-content: space-between; align-items: flex-end; }
.history-detail { font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.history-total { font-weight: 800; font-size: 1.2rem; color: var(--teal); }

/* Data Tables */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 12px; font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid var(--border-light); }
.data-table td { padding: 16px 12px; border-bottom: 1px solid var(--border-light); font-size: 0.95rem; }
.badge { padding: 4px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.badge.warning { background: rgba(245, 166, 35, 0.1); color: #f5a623; }
.badge.success { background: rgba(39, 174, 96, 0.1); color: #27ae60; }
.action-link { color: var(--blue); font-size: 0.85rem; font-weight: 600; cursor: pointer; }

/* Share Box */
.share-box { display: flex; gap: 8px; }
.share-input { padding: 10px 16px; border: 1px solid var(--border-medium); border-radius: 8px; background: var(--bg-main); color: var(--text-secondary); width: 260px; font-family: monospace; }

/* Summary Row */
.summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: 500; }
.summary-divider { height: 1px; background: var(--border-light); margin: 16px 0; }
.summary-total { display: flex; justify-content: space-between; font-weight: 800; font-size: 1.2rem; }

/* Menu Grid */
.menu-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
.menu-item-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px; padding: 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.menu-item-info h4 { font-size: 1.05rem; margin-bottom: 4px; }
.menu-item-info p { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px; }
.price { font-weight: 700; color: var(--teal); }
.btn-add { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-main); border: 1px solid var(--border-medium); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; }
.btn-add:hover { background: var(--teal); color: #fff; border-color: var(--teal); }

.cart-item { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 12px; font-size: 0.95rem; }

/* Payment View */
.payment-container { max-width: 400px; margin: 40px auto; background: var(--bg-card); padding: 40px; border-radius: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid var(--border-light); }
.qr-card { background: var(--bg-main); padding: 30px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; }
.qr-mockup { width: 180px; height: 180px; background: #fff; border: 1px solid var(--border-medium); border-radius: 12px; padding: 10px; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center;}
.qr-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; width: 140px; height: 140px; }
.qr-cell { background: #eee; border-radius: 2px; }
.qr-cell.filled { background: #000; }
.qr-scan-line { position: absolute; width: 100%; height: 4px; background: var(--teal); box-shadow: 0 0 10px var(--teal); animation: scan 2s infinite linear; }
@keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
.qr-amount-display { font-size: 1.8rem; font-weight: 800; color: var(--teal); margin: 20px 0 10px; }
.qr-instruction { font-size: 0.85rem; color: var(--text-secondary); text-align: center; }

/* Toast */
.toast-container { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; gap: 12px; }
.toast { background: var(--bg-dark); color: #fff; padding: 14px 20px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); animation: toastIn 0.3s forwards; }
@keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

/* Stepper */
.stepper-section { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
.stepper { display: flex; justify-content: space-between; position: relative; padding: 0 20px; }
.stepper-line { position: absolute; top: 20px; left: 40px; right: 40px; height: 2px; background: var(--border-light); z-index: 1; }
.stepper-progress { position: absolute; top: 20px; left: 40px; height: 2px; background: var(--teal); z-index: 2; transition: width 0.3s; }
.step { display: flex; flex-direction: column; align-items: center; z-index: 3; gap: 8px; }
.step-circle { width: 40px; height: 40px; background: var(--bg-card); border: 2px solid var(--border-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--text-muted); }
.step.active .step-circle { border-color: var(--teal); color: var(--teal); background: rgba(0,212,170,0.1); }
.step.completed .step-circle { background: var(--teal); border-color: var(--teal); color: #fff; }
.step-label { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }

/* Analytics KPI */
.kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.kpi-card { background: var(--bg-dark); border-radius: 16px; padding: 24px; color: #fff; position: relative; overflow: hidden; }
.kpi-card:nth-child(2) { background: var(--bg-dark-2); }
.kpi-card:nth-child(3) { background: var(--bg-dark-3); }
.kpi-card-label { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 4px; font-weight: 600; }
.kpi-card-rate { font-size: 0.9rem; margin-bottom: 20px; }
.kpi-sparkline-svg { width: 100%; height: 50px; margin-bottom: 20px; }
.kpi-sparkline-svg polyline { fill: none; stroke: var(--teal); stroke-width: 2; }
.kpi-sparkline-svg .spark-dot { fill: var(--teal); }
.kpi-spark-label { position: absolute; top: 24px; right: 24px; background: rgba(0,212,170,0.2); color: var(--teal); padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; }
.kpi-card-section-label { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
.kpi-card-value-box { background: rgba(255,255,255,0.08); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
.kpi-card-coin-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
`;

const appJs = `/* ============================================================
   PROJECT 3 – OFFICE GROUP ORDER | MULTI-VIEW LOGIC
   ============================================================ */

const participants = [
  { name: 'Anh Nghĩa', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Paid', method: 'Momo' },
  { name: 'Minh Tuấn', item: 'Cà Phê Sữa x1', amount: '34.000đ', status: 'Unpaid', method: 'Pending' },
  { name: 'Hương Giang', item: 'Matcha Latte x1', amount: '50.000đ', status: 'Paid', method: 'VNPay' },
  { name: 'Thu Trang', item: '-', amount: '-', status: 'Pending', method: '-' }
];

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message, icon = '<i class="ph ph-info" style="color: var(--teal);"></i>') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = \`<span>\${icon}</span><span>\${message}</span>\`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderParticipants() {
  const tbody = document.getElementById('participantTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  participants.forEach((p, index) => {
    const tr = document.createElement('tr');
    
    const statusHtml = p.status === 'Paid' 
      ? \`<span class="badge success">Paid (\${p.method})</span>\`
      : p.status === 'Unpaid' 
        ? \`<span class="badge warning">Unpaid</span>\` 
        : \`<span class="badge" style="background: var(--border-light); color: var(--text-secondary);">Waiting</span>\`;

    const actionHtml = p.status === 'Unpaid'
      ? \`<span class="action-link" onclick="remindUser('\${p.name}')">Remind</span>\`
      : \`<span style="color: var(--text-muted); font-size: 0.8rem;">-</span>\`;

    tr.innerHTML = \`
      <td style="font-weight: 600;">\${p.name}</td>
      <td style="color: var(--text-secondary);">\${p.item}</td>
      <td style="font-weight: 700;">\${p.amount}</td>
      <td>\${statusHtml}</td>
      <td>\${actionHtml}</td>
    \`;
    tbody.appendChild(tr);
  });
}

function remindUser(name) {
  showToast(\`Slack reminder sent to \${name}\`, '<i class="ph ph-bell-ringing" style="color: var(--blue);"></i>');
}

function handlePaymentComplete() {
  showToast('Payment detected! Updating status...', '<i class="ph ph-spinner"></i>');
  setTimeout(() => {
    // Mock updating Thu Trang
    participants[3] = { name: 'Thu Trang', item: 'Trà Sữa x1', amount: '40.000đ', status: 'Paid', method: 'Momo' };
    renderParticipants();
    switchView('view-host-dashboard');
    showToast('Payment successful!', '<i class="ph ph-check-circle" style="color: var(--teal);"></i>');
  }, 1500);
}

// Init QR Mockup
const qrGrid = document.getElementById('qrGrid');
if (qrGrid) {
  for(let i=0; i<49; i++) {
    const cell = document.createElement('div');
    cell.className = 'qr-cell ' + (Math.random() > 0.4 ? 'filled' : '');
    qrGrid.appendChild(cell);
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderParticipants();
  
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if(placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      this.innerHTML = '<i class="ph ph-check"></i> Sent to Vendor';
      this.style.background = 'var(--green)';
      this.style.color = '#fff';
      showToast('Order successfully sent to Highlands Coffee!', '<i class="ph ph-check-circle" style="color: var(--green);"></i>');
    });
  }
});
`;

fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(targetDir, 'styles.css'), stylesCss);
fs.writeFileSync(path.join(targetDir, 'app.js'), appJs);
console.log('Project 3 successfully rewritten!');
