const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\LENOVO\\Documents\\GitHub\\DoAnhNghia_BAPortfolio\\project1-expense-tracker';

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FinTrack | Personal Finance App</title>
  <meta name="description" content="Personal Subscription & Expense Analytics Dashboard.">
  <link rel="icon" type="image/png" href="../logo.png?v=3">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="stylesheet" href="styles.css?v=4">
  <link rel="stylesheet" href="../ux-showcase.css">
  <style>
    .view-section { display: none; animation: fadeIn 0.3s ease; }
    .view-section.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    /* Modal styles */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: none; align-items: center; justify-content: center; z-index: 1000; }
    .modal-overlay.active { display: flex; animation: fadeIn 0.2s ease; }
    .modal-card { background: var(--bg-card); width: 90%; max-width: 500px; border-radius: 16px; padding: 24px; position: relative; border: 1px solid var(--border-light); }
    .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 20px; }
    .tooltip { position: relative; display: inline-block; border-bottom: 1px dotted var(--text-secondary); cursor: help; }
    .tooltip .tooltiptext { visibility: hidden; width: 220px; background-color: var(--bg-dark); color: #fff; text-align: center; border-radius: 6px; padding: 8px; position: absolute; z-index: 1; bottom: 125%; left: 50%; margin-left: -110px; opacity: 0; transition: opacity 0.3s; font-size: 12px; font-weight: normal; font-family: Inter, sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid var(--border-medium); }
    .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
  </style>
</head>
<body>
<!-- Portfolio Demo Bar -->
<div class="portfolio-demo-bar">
  <div class="demo-info">
    <span class="live-dot"></span>
    <span class="demo-text">Interactive Prototype</span>
  </div>
  <a href="../index.html#project-01" class="back-portfolio-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    Back to Portfolio
  </a>
</div>

<div class="app-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-icon"><i class="ph ph-wallet"></i></div>
      <div class="logo-text">Fin<span class="text-gradient">Track</span></div>
    </div>
    
    <nav class="sidebar-nav">
      <a href="#" class="nav-item active" onclick="switchView('view-overview', this)"><i class="ph ph-squares-four"></i> Overview</a>
      <a href="#" class="nav-item" onclick="switchView('view-transactions', this)"><i class="ph ph-list-dashes"></i> Transactions</a>
      <a href="#" class="nav-item" onclick="switchView('view-subscriptions', this)">
        <i class="ph ph-repeat"></i> Subscriptions
        <span class="nav-badge" id="navGhostBadge" style="display: none;"></span>
      </a>
      <a href="#" class="nav-item" onclick="switchView('view-analytics', this)"><i class="ph ph-chart-pie-slice"></i> Analytics</a>
      <a href="#" class="nav-item" onclick="switchView('view-budget', this)"><i class="ph ph-target"></i> Budget Planner</a>
    </nav>
    
    <div class="sidebar-bottom">
      <a href="#" class="nav-item" onclick="toggleEmptyState()"><i class="ph ph-flask"></i> Toggle Empty State</a>
      <a href="#" class="nav-item"><i class="ph ph-gear"></i> Settings</a>
      <div class="user-profile">
        <div class="user-avatar">DN</div>
        <div class="user-info">
          <div class="user-name">Đỗ Anh Nghĩa</div>
          <div class="user-email">Free Plan</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    
    <!-- VIEW: OVERVIEW -->
    <div id="view-overview" class="view-section active">
      <header class="topbar">
        <div class="search-box">
          <i class="ph ph-magnifying-glass"></i>
          <input type="text" placeholder="Search transactions, subs...">
        </div>
        <div class="topbar-actions">
          <button class="btn-icon"><i class="ph ph-bell"></i></button>
          <button class="btn-primary" onclick="openAddTransactionModal()"><i class="ph ph-plus"></i> Add Transaction</button>
        </div>
      </header>

      <div class="page-content">
        <div class="section-title">Financial Overview</div>
        
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title">Total Fixed Cost</div>
              <div class="kpi-card-icon"><i class="ph ph-currency-dollar"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiTotalCost">$0.00</div>
            <div class="kpi-card-trend trend-down"><i class="ph ph-trend-down"></i> -2.4% vs last month</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title tooltip">Utilization Rate<span class="tooltiptext">Active Subs / Total Subs (Excluding Ghosts)</span></div>
              <div class="kpi-card-icon" style="background: rgba(0, 212, 170, 0.1); color: var(--teal);"><i class="ph ph-lightning"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiUtilization" style="color: var(--teal);">0%</div>
            <div class="kpi-card-trend trend-up" style="color: var(--text-secondary);"><i class="ph ph-info"></i> Based on 30-day activity</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title">Active Subscriptions</div>
              <div class="kpi-card-icon" style="background: rgba(245, 166, 35, 0.1); color: var(--orange);"><i class="ph ph-repeat"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiActiveCount">0</div>
            <div class="kpi-card-trend trend-up"><i class="ph ph-trend-up"></i> +1 this month</div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Main Chart -->
          <div class="card" style="grid-column: span 8;">
            <div class="card-header">
              <h3 class="card-title">Burn Rate (6 Months)</h3>
              <select class="form-select" style="width: auto; padding: 4px 8px;"><option>2026</option></select>
            </div>
            <div class="chart-container" style="height: 250px;">
              <canvas id="expenseChart"></canvas>
            </div>
          </div>
          
          <!-- Category Chart -->
          <div class="card" style="grid-column: span 4;">
            <div class="card-header">
              <h3 class="card-title">Spending by Category</h3>
            </div>
            <div class="chart-container" style="height: 250px;">
              <canvas id="categoryBarChart"></canvas>
            </div>
          </div>
        </div>

        <div class="dashboard-grid mt-4">
          <!-- Ghost Subs -->
          <div class="card ghost-alert-card" style="grid-column: span 6;">
            <div class="card-header">
              <h3 class="card-title" style="color: #ff6b6b;"><i class="ph ph-ghost"></i> Ghost Subscriptions Detected</h3>
              <a href="#" onclick="switchView('view-subscriptions', document.querySelectorAll('.nav-item')[2])" style="font-size: 13px; color: var(--text-secondary);">View All</a>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">These services haven't been used in over 30 days. Cancel them to save money.</p>
            <div class="sub-list" id="overviewGhostList" style="display: flex; flex-direction: column; gap: 12px;"></div>
          </div>

          <!-- Recent Transactions -->
          <div class="card" style="grid-column: span 6;">
            <div class="card-header">
              <h3 class="card-title">Recent Transactions</h3>
              <a href="#" onclick="switchView('view-transactions', document.querySelectorAll('.nav-item')[1])" style="font-size: 13px; color: var(--text-secondary);">View All</a>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <tbody id="overviewTxList"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: TRANSACTIONS -->
    <div id="view-transactions" class="view-section">
      <header class="topbar">
        <h1 class="page-title">Transactions</h1>
        <button class="btn-primary" onclick="openAddTransactionModal()"><i class="ph ph-plus"></i> Add Transaction</button>
      </header>
      <div class="page-content">
        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="fullTxList"></tbody>
            </table>
          </div>
          <div id="emptyTxState" style="display:none; text-align:center; padding: 60px 20px;">
            <i class="ph ph-receipt" style="font-size: 48px; color: var(--border-medium); margin-bottom: 16px;"></i>
            <h3>No Transactions Yet</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Start by adding your first transaction or importing a CSV file.</p>
            <button class="btn-primary" onclick="openAddTransactionModal()">Add Transaction</button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: SUBSCRIPTIONS -->
    <div id="view-subscriptions" class="view-section">
      <header class="topbar">
        <h1 class="page-title">Subscriptions</h1>
        <button class="btn-primary"><i class="ph ph-plus"></i> Add Subscription</button>
      </header>
      <div class="page-content">
        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Billing Cycle</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="fullSubList"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: ANALYTICS -->
    <div id="view-analytics" class="view-section">
      <header class="topbar"><h1 class="page-title">Analytics</h1></header>
      <div class="page-content">
        <div class="card">
          <h3 class="card-title mb-3">Cashflow Forecast <span class="badge" style="background: var(--orange); color: white; margin-left: 8px;">BETA</span></h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Forecast based on 3-month moving average of fixed costs vs expected income.</p>
          <div class="chart-container" style="height: 300px;"><canvas id="cashflowChart"></canvas></div>
        </div>
      </div>
    </div>

    <!-- VIEW: BUDGET PLANNER -->
    <div id="view-budget" class="view-section">
      <header class="topbar"><h1 class="page-title">Budget Planner</h1></header>
      <div class="page-content">
        <div class="card">
          <h3 class="card-title mb-4">Monthly Budget Limits</h3>
          <div id="budgetList"></div>
        </div>
      </div>
    </div>

  </main>
</div>

<!-- MODAL: ADD TRANSACTION -->
<div class="modal-overlay" id="modal-add-transaction">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal('modal-add-transaction')"><i class="ph ph-x"></i></button>
    <h2 style="margin-bottom: 20px;">Add Transaction</h2>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">Description</label>
      <input type="text" id="addTxDesc" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;" placeholder="e.g. Netflix Monthly">
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">Amount (USD)</label>
      <input type="number" id="addTxAmount" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;" placeholder="15.99">
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">Category</label>
      <select id="addTxCat" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
        <option>Entertainment</option>
        <option>Health</option>
        <option>Education</option>
        <option>Productivity</option>
      </select>
    </div>
    <button class="btn-primary w-100" style="width:100%; margin-top:10px;" onclick="submitTransaction()">Save Transaction</button>
  </div>
</div>

<!-- MODAL: GHOST DRILL-DOWN -->
<div class="modal-overlay" id="modal-ghost-drilldown">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal('modal-ghost-drilldown')"><i class="ph ph-x"></i></button>
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
      <div class="sub-icon" id="ghostModalIcon" style="font-size: 32px; background: rgba(255,107,107,0.1); border-radius: 12px; padding: 16px;"></div>
      <div>
        <h2 id="ghostModalTitle" style="margin-bottom: 4px;">Service Name</h2>
        <div class="badge badge-ghost">Ghost Detected</div>
      </div>
    </div>
    
    <div style="background: var(--bg-main); padding: 16px; border-radius: 12px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
        <span style="color: var(--text-secondary);">Days without usage:</span>
        <strong id="ghostModalDays" style="color: #ff6b6b;">0 days</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
        <span style="color: var(--text-secondary);">Last recorded transaction:</span>
        <strong id="ghostModalLastTx">--</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px;">
        <span style="color: var(--text-secondary);">Monthly bleed rate:</span>
        <strong id="ghostModalBleed">--</strong>
      </div>
    </div>
    
    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">This subscription has been flagged by the algorithm because no matching transactions were found in the connected bank feed recently.</p>
    
    <div style="display: flex; gap: 12px;">
      <button class="btn-primary" style="flex: 1; background: #ff6b6b;" onclick="confirmCancelGhost()">Cancel Subscription</button>
      <button class="btn-secondary" style="flex: 1;" onclick="snoozeGhost()">Snooze 7 Days</button>
    </div>
  </div>
</div>

<div class="toast-container" id="toastContainer"></div>
<script src="app.js"></script>
</body>
</html>`;

const appJs = `/* ============================================================
   PROJECT 1 – SINGLE SOURCE OF TRUTH (SPA Architecture)
   ============================================================ */

// --- 1. GLOBAL STATE (Single Source of Truth) ---
let state = {
  isEmpty: false, // Toggleable empty state
  currency: 'USD',
  subscriptions: [
    { id: 's1', name: 'Netflix', category: 'Entertainment', cost: 15.99, cycle: 'Monthly', status: 'Active', daysUnused: 5, icon: '🍿' },
    { id: 's2', name: 'Spotify', category: 'Entertainment', cost: 9.99, cycle: 'Monthly', status: 'Active', daysUnused: 2, icon: '🎧' },
    { id: 's3', name: 'Gym Membership', category: 'Health', cost: 30.00, cycle: 'Monthly', status: 'Ghost', daysUnused: 45, icon: '🏋️' },
    { id: 's4', name: 'Coursera Plus', category: 'Education', cost: 49.00, cycle: 'Monthly', status: 'Ghost', daysUnused: 60, icon: '📚' },
    { id: 's5', name: 'Audible', category: 'Education', cost: 14.95, cycle: 'Monthly', status: 'Ghost', daysUnused: 90, icon: '🎙️' }
  ],
  transactions: [
    { id: 't1', date: '2026-07-28', desc: 'Netflix Monthly', category: 'Entertainment', amount: 15.99 },
    { id: 't2', date: '2026-07-25', desc: 'Spotify Premium', category: 'Entertainment', amount: 9.99 },
    { id: 't3', date: '2026-06-12', desc: 'Gym Membership', category: 'Health', amount: 30.00 }, // 45 days ago
    { id: 't4', date: '2026-05-28', desc: 'Coursera Plus', category: 'Education', amount: 49.00 }, // 60 days ago
    { id: 't5', date: '2026-04-28', desc: 'Audible', category: 'Education', amount: 14.95 } // 90 days ago
  ],
  budgets: [
    { category: 'Entertainment', limit: 50, spent: 25.98 },
    { category: 'Health', limit: 25, spent: 30.00, alert: true, relatedSub: 's3' },
    { category: 'Education', limit: 100, spent: 63.95 }
  ]
};

let currentGhostDrilldown = null;

// --- 2. VIEW ROUTING ---
function switchView(viewId, navEl) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  
  if (navEl) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    navEl.classList.add('active');
  }
  
  window.scrollTo(0, 0);
  renderAll(); // Re-render data on view switch just in case
}

// --- 3. RENDER LOGIC ---
function renderAll() {
  if (state.isEmpty) {
    renderEmptyState();
    return;
  }
  
  document.getElementById('emptyTxState').style.display = 'none';
  document.getElementById('fullTxList').parentElement.style.display = 'table';
  
  renderOverview();
  renderTransactions();
  renderSubscriptions();
  renderBudget();
}

function toggleEmptyState() {
  state.isEmpty = !state.isEmpty;
  renderAll();
  showToast(state.isEmpty ? 'Empty State Activated' : 'Mock Data Restored');
}

function renderEmptyState() {
  // Clear lists
  document.getElementById('overviewGhostList').innerHTML = '<div style="color:var(--text-secondary);font-size:13px;">No ghosts found. Great job!</div>';
  document.getElementById('overviewTxList').innerHTML = '<tr><td colspan="4" style="text-align:center;">No recent transactions</td></tr>';
  document.getElementById('fullSubList').innerHTML = '<tr><td colspan="6" style="text-align:center;">No subscriptions found.</td></tr>';
  
  // Show Empty State in Transactions
  document.getElementById('fullTxList').parentElement.style.display = 'none';
  document.getElementById('emptyTxState').style.display = 'block';
  
  // Reset KPIs
  document.getElementById('kpiTotalCost').innerText = '$0.00';
  document.getElementById('kpiActiveCount').innerText = '0';
  document.getElementById('kpiUtilization').innerText = '100%';
  document.getElementById('navGhostBadge').style.display = 'none';
}

function renderOverview() {
  // Compute KPIs
  const totalCost = state.subscriptions.reduce((sum, s) => sum + s.cost, 0);
  const activeCount = state.subscriptions.filter(s => s.status === 'Active').length;
  const totalCount = state.subscriptions.length;
  const utilization = totalCount === 0 ? 100 : Math.round((activeCount / totalCount) * 100);
  
  document.getElementById('kpiTotalCost').innerText = \`$\${totalCost.toFixed(2)}\`;
  document.getElementById('kpiActiveCount').innerText = activeCount;
  document.getElementById('kpiUtilization').innerText = \`\${utilization}%\`;

  // Ghosts
  const ghosts = state.subscriptions.filter(s => s.status === 'Ghost');
  const ghostBadge = document.getElementById('navGhostBadge');
  if (ghosts.length > 0) {
    ghostBadge.style.display = 'inline-flex';
    ghostBadge.innerText = ghosts.length;
  } else {
    ghostBadge.style.display = 'none';
  }

  const ghostListEl = document.getElementById('overviewGhostList');
  ghostListEl.innerHTML = ghosts.slice(0, 3).map(g => \`
    <div class="sub-item" style="display:flex; align-items:center; justify-content:space-between; padding: 12px; background: var(--bg-main); border-radius: 12px; border-left: 4px solid #ff6b6b;">
      <div style="display:flex; align-items:center; gap: 12px;">
        <div style="font-size: 24px;">\${g.icon}</div>
        <div>
          <div style="font-weight: 600;">\${g.name}</div>
          <div style="font-size: 12px; color: #ff6b6b;">\${g.daysUnused} days unused</div>
        </div>
      </div>
      <div>
        <div style="font-weight: 700; text-align:right;">$\${g.cost.toFixed(2)}</div>
        <button class="btn-text" style="color: #ff6b6b; padding: 0; font-size: 12px;" onclick="openGhostDrilldown('\${g.id}')">Review</button>
      </div>
    </div>
  \`).join('');

  if (ghosts.length > 3) {
    ghostListEl.innerHTML += \`<div style="text-align:center; font-size:12px; margin-top:8px;"><a href="#" onclick="switchView('view-subscriptions', document.querySelectorAll('.nav-item')[2])">+ \${ghosts.length - 3} more ghosts</a></div>\`;
  }

  // Recent Tx
  const txListEl = document.getElementById('overviewTxList');
  txListEl.innerHTML = state.transactions.slice(0, 4).map(t => \`
    <tr>
      <td style="color:var(--text-secondary);">\${t.date}</td>
      <td style="font-weight:600;">\${t.desc}</td>
      <td style="font-weight:700;">$\${t.amount.toFixed(2)}</td>
    </tr>
  \`).join('');
}

function renderTransactions() {
  const tbody = document.getElementById('fullTxList');
  tbody.innerHTML = state.transactions.map(t => \`
    <tr>
      <td style="color:var(--text-secondary);">\${t.date}</td>
      <td style="font-weight:600;">\${t.desc}</td>
      <td><span class="badge" style="background:var(--bg-main);">\${t.category}</span></td>
      <td style="font-weight:700;">$\${t.amount.toFixed(2)}</td>
      <td><button class="btn-icon" onclick="deleteTx('\${t.id}')"><i class="ph ph-trash"></i></button></td>
    </tr>
  \`).join('');
}

function renderSubscriptions() {
  const tbody = document.getElementById('fullSubList');
  tbody.innerHTML = state.subscriptions.map(s => \`
    <tr>
      <td style="font-weight:600;"><span style="margin-right:8px;">\${s.icon}</span> \${s.name}</td>
      <td><span class="badge" style="background:var(--bg-main);">\${s.category}</span></td>
      <td style="color:var(--text-secondary);">\${s.cycle}</td>
      <td style="font-weight:700;">$\${s.cost.toFixed(2)}</td>
      <td>\${s.status === 'Ghost' ? '<span class="badge badge-ghost">GHOST</span>' : '<span class="badge success">ACTIVE</span>'}</td>
      <td>
        \${s.status === 'Ghost' ? \`<button class="btn-primary" style="background:#ff6b6b; padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('\${s.id}')">Review</button>\` : '<button class="btn-secondary" style="padding: 4px 12px; font-size:12px;">Edit</button>'}
      </td>
    </tr>
  \`).join('');
}

function renderBudget() {
  const container = document.getElementById('budgetList');
  container.innerHTML = state.budgets.map(b => {
    const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
    const isExceeded = b.spent > b.limit;
    const color = isExceeded ? '#ff6b6b' : 'var(--teal)';
    
    let actionBtn = '';
    if (isExceeded && b.relatedSub) {
      actionBtn = \`<button class="btn-text" style="color:#ff6b6b; padding:0; font-size:13px;" onclick="openGhostDrilldown('\${b.relatedSub}')"><i class="ph ph-warning-circle"></i> View related Ghost</button>\`;
    }

    return \`
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="display:flex; align-items:center; gap:8px;">
            \${b.category} \${isExceeded ? '<i class="ph ph-warning-circle" style="color:#ff6b6b;"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);">$\${b.spent.toFixed(2)} / $\${b.limit.toFixed(2)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--bg-main); border-radius:4px; margin-bottom:8px; overflow:hidden;">
          <div style="height:100%; width:\${pct}%; background:\${color};"></div>
        </div>
        \${actionBtn}
      </div>
    \`;
  }).join('');
}

// --- 4. MODALS & INTERACTIONS ---
function openAddTransactionModal() {
  document.getElementById('modal-add-transaction').classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function submitTransaction() {
  const desc = document.getElementById('addTxDesc').value;
  const amt = parseFloat(document.getElementById('addTxAmount').value);
  const cat = document.getElementById('addTxCat').value;
  
  if (!desc || isNaN(amt)) {
    showToast('Please enter valid details'); return;
  }
  
  state.transactions.unshift({
    id: 't' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    desc, category: cat, amount: amt
  });
  
  closeModal('modal-add-transaction');
  showToast('Transaction added successfully!');
  renderAll();
  
  document.getElementById('addTxDesc').value = '';
  document.getElementById('addTxAmount').value = '';
}

function deleteTx(id) {
  state.transactions = state.transactions.filter(t => t.id !== id);
  renderAll();
  showToast('Transaction deleted');
}

function openGhostDrilldown(subId) {
  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;
  currentGhostDrilldown = subId;
  
  const lastTx = state.transactions.find(t => t.desc.includes(sub.name)) || { date: 'Unknown' };
  
  document.getElementById('ghostModalIcon').innerText = sub.icon;
  document.getElementById('ghostModalTitle').innerText = sub.name;
  document.getElementById('ghostModalDays').innerText = sub.daysUnused + ' days';
  document.getElementById('ghostModalLastTx').innerText = lastTx.date;
  document.getElementById('ghostModalBleed').innerText = \`$\${sub.cost.toFixed(2)}/mo\`;
  
  document.getElementById('modal-ghost-drilldown').classList.add('active');
}

function confirmCancelGhost() {
  if (!currentGhostDrilldown) return;
  state.subscriptions = state.subscriptions.filter(s => s.id !== currentGhostDrilldown);
  closeModal('modal-ghost-drilldown');
  showToast('Subscription cancelled successfully!', '<i class="ph ph-check-circle" style="color:var(--teal);"></i>');
  renderAll();
}

function snoozeGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if (sub) {
    sub.status = 'Active'; // Snooze makes it active temporarily
    sub.daysUnused = 0;
  }
  closeModal('modal-ghost-drilldown');
  showToast('Ghost alert snoozed for 7 days', '<i class="ph ph-clock" style="color:var(--blue);"></i>');
  renderAll();
}

function showToast(message, icon = '<i class="ph ph-info" style="color: var(--teal);"></i>') {
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = \`<span>\${icon}</span><span>\${message}</span>\`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// --- 5. INITIALIZE CHARTS ---
document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  // Burn Rate Line Chart
  const expenseCtx = document.getElementById('expenseChart');
  if (expenseCtx) {
    new Chart(expenseCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Expenses ($)',
          data: [1200, 1150, 1080, 1120, 980, 1050],
          borderColor: '#00d4aa', backgroundColor: 'rgba(0,212,170,0.1)', fill: true, tension: 0.4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  // categoryBarChart - CHANGED FROM RADAR TO HORIZONTAL BAR
  const catCtx = document.getElementById('categoryBarChart');
  if (catCtx) {
    new Chart(catCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Ent.', 'Education', 'Storage', 'Health', 'Productivity'],
        datasets: [{
          label: 'Spending ($)',
          data: [120, 150, 20, 45, 80],
          backgroundColor: '#f5a623',
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y', // This makes it a horizontal bar chart!
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
  
  // Cashflow Forecast
  const cfCtx = document.getElementById('cashflowChart');
  if (cfCtx) {
    new Chart(cfCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Forecast ($)',
          data: [1890, 1940, 2010],
          backgroundColor: '#4a90d9',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
});
`;

fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(targetDir, 'app.js'), appJs);

// Delete old files to clean up architecture
const oldFiles = ['analytics.html', 'budget.html', 'cashflow.html', 'settings.html', 'subscriptions.html', 'transactions.html', 'add-subscription.html', 'add-transaction.html'];
oldFiles.forEach(f => {
  const p = path.join(targetDir, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
});

console.log('Project 1 rewritten as SPA with single JSON source of truth!');
