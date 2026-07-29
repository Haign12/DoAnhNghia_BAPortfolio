const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\LENOVO\\Documents\\GitHub\\DoAnhNghia_BAPortfolio\\project1-expense-tracker';

const appJs = `/* ============================================================
   PROJECT 1 – Gated Flow & State Management
   ============================================================ */

// --- 1. GLOBAL STATE (Single Source of Truth) ---
let state = {
  settings: {
    setupCompleted: false,
    currency: 'USD', // USD or VND
    ghostThreshold: 30
  },
  subscriptions: [],
  transactions: [],
  budgets: [
    { category: 'Entertainment', limit: 50, spent: 0 },
    { category: 'Health', limit: 25, spent: 0 },
    { category: 'Education', limit: 100, spent: 0 }
  ]
};

let currentGhostDrilldown = null;

function formatMoney(amount) {
  if (state.settings.currency === 'USD') return \`$\${amount.toFixed(2)}\`;
  return \`\${(amount * 25000).toLocaleString('vi-VN')}đ\`;
}

// --- 2. VIEW ROUTING & ONBOARDING ---
function switchView(viewId, navEl) {
  if (!state.settings.setupCompleted && viewId !== 'view-onboarding') {
    showToast('Please complete setup first.', '<i class="ph ph-warning-circle" style="color:red;"></i>');
    return;
  }
  
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  
  if (navEl) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    navEl.classList.add('active');
  }
  
  window.scrollTo(0, 0);
  runGhostDetection();
  renderAll();
}

function completeOnboarding() {
  const curr = document.getElementById('onboardCurrency').value;
  const thres = parseInt(document.getElementById('onboardThreshold').value);
  const loadMock = document.getElementById('onboardMock').checked;
  
  if (isNaN(thres) || thres < 1) {
    showToast('Invalid threshold'); return;
  }
  
  state.settings.currency = curr;
  state.settings.ghostThreshold = thres;
  state.settings.setupCompleted = true;
  
  if (loadMock) {
    loadMockData();
  }
  
  document.getElementById('sidebarNav').style.pointerEvents = 'auto';
  document.getElementById('sidebarNav').style.opacity = '1';
  
  switchView('view-overview', document.querySelectorAll('.nav-item')[0]);
  showToast('Setup complete! Welcome to FinTrack.');
}

function loadMockData() {
  const today = new Date();
  const daysAgo = (d) => new Date(today.getTime() - d * 86400000).toISOString().split('T')[0];
  
  state.subscriptions = [
    { id: 's1', name: 'Netflix', category: 'Entertainment', cost: 15.99, cycle: 'Monthly', status: 'Active', icon: '🍿', added: daysAgo(100), snoozeUntil: null, ignoreGhost: false },
    { id: 's2', name: 'Spotify', category: 'Entertainment', cost: 9.99, cycle: 'Monthly', status: 'Active', icon: '🎧', added: daysAgo(60), snoozeUntil: null, ignoreGhost: false },
    { id: 's3', name: 'Gym Membership', category: 'Health', cost: 30.00, cycle: 'Monthly', status: 'Active', icon: '🏋️', added: daysAgo(120), snoozeUntil: null, ignoreGhost: false },
    { id: 's4', name: 'Coursera Plus', category: 'Education', cost: 49.00, cycle: 'Monthly', status: 'Active', icon: '📚', added: daysAgo(90), snoozeUntil: null, ignoreGhost: false }
  ];
  
  state.transactions = [
    { id: 't1', subId: 's1', date: daysAgo(5), category: 'Entertainment', amount: 15.99 },
    { id: 't2', subId: 's2', date: daysAgo(2), category: 'Entertainment', amount: 9.99 },
    { id: 't3', subId: 's3', date: daysAgo(45), category: 'Health', amount: 30.00 },
    { id: 't4', subId: 's4', date: daysAgo(60), category: 'Education', amount: 49.00 }
  ];
}

// --- 3. CORE LOGIC: GHOST DETECTION ---
function runGhostDetection() {
  const today = new Date();
  state.subscriptions.forEach(sub => {
    if (sub.status === 'Cancelled' || sub.ignoreGhost) return;
    
    // Find latest transaction
    const txs = state.transactions.filter(t => t.subId === sub.id).sort((a,b) => new Date(b.date) - new Date(a.date));
    let lastActiveDate = new Date(sub.added);
    if (txs.length > 0) {
      lastActiveDate = new Date(txs[0].date);
    }
    
    const diffTime = Math.abs(today - lastActiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    sub.daysUnused = diffDays;
    sub.lastTxDate = lastActiveDate.toISOString().split('T')[0];
    
    // Check snoozed
    if (sub.snoozeUntil && new Date(sub.snoozeUntil) > today) {
      sub.status = 'Active';
      return;
    }
    
    if (diffDays >= state.settings.ghostThreshold) {
      sub.status = 'Ghost';
    } else {
      sub.status = 'Active';
    }
  });
}

// --- 4. RENDER LOGIC ---
function renderAll() {
  if (state.subscriptions.length === 0 && state.transactions.length === 0) {
    document.getElementById('overviewContent').style.display = 'none';
    document.getElementById('overviewEmpty').style.display = 'block';
  } else {
    document.getElementById('overviewContent').style.display = 'block';
    document.getElementById('overviewEmpty').style.display = 'none';
    renderOverview();
  }
  renderTransactions();
  renderSubscriptions();
  renderBudget();
}

function renderOverview() {
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');
  const totalCost = activeSubs.reduce((sum, s) => sum + s.cost, 0);
  const activeCount = activeSubs.filter(s => s.status === 'Active').length;
  const utilization = activeSubs.length === 0 ? 100 : Math.round((activeCount / activeSubs.length) * 100);
  
  document.getElementById('kpiTotalCost').innerText = formatMoney(totalCost);
  document.getElementById('kpiActiveCount').innerText = activeCount;
  document.getElementById('kpiUtilization').innerText = \`\${utilization}%\`;

  // Ghosts from single truth
  const ghosts = state.subscriptions.filter(s => s.status === 'Ghost');
  const ghostBadge = document.getElementById('navGhostBadge');
  if (ghosts.length > 0) {
    ghostBadge.style.display = 'inline-flex';
    ghostBadge.innerText = ghosts.length;
  } else {
    ghostBadge.style.display = 'none';
  }

  const ghostListEl = document.getElementById('overviewGhostList');
  if(ghosts.length === 0) {
    ghostListEl.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;">No ghosts found. Great job!</div>';
  } else {
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
          <div style="font-weight: 700; text-align:right;">\${formatMoney(g.cost)}</div>
          <button class="btn-text" style="color: #ff6b6b; padding: 0; font-size: 12px;" onclick="openGhostDrilldown('\${g.id}')">Review</button>
        </div>
      </div>
    \`).join('');

    if (ghosts.length > 3) {
      ghostListEl.innerHTML += \`<div style="text-align:center; font-size:12px; margin-top:8px;"><a href="#" onclick="switchView('view-subscriptions', document.querySelectorAll('.nav-item')[2])">+ \${ghosts.length - 3} more ghosts</a></div>\`;
    }
  }

  // Recent Tx
  const txListEl = document.getElementById('overviewTxList');
  if(state.transactions.length === 0) {
    txListEl.innerHTML = '<tr><td colspan="4" style="text-align:center;">No recent transactions</td></tr>';
  } else {
    const sortedTx = [...state.transactions].sort((a,b) => new Date(b.date) - new Date(a.date));
    txListEl.innerHTML = sortedTx.slice(0, 4).map(t => {
      const sub = state.subscriptions.find(s => s.id === t.subId);
      return \`
      <tr>
        <td style="color:var(--text-secondary);">\${t.date}</td>
        <td style="font-weight:600;">\${sub ? sub.name : 'Unknown'}</td>
        <td style="font-weight:700;">\${formatMoney(t.amount)}</td>
      </tr>
      \`;
    }).join('');
  }
}

function renderTransactions() {
  const tbody = document.getElementById('fullTxList');
  if(state.transactions.length === 0) {
    document.getElementById('emptyTxState').style.display = 'block';
    tbody.parentElement.style.display = 'none';
  } else {
    document.getElementById('emptyTxState').style.display = 'none';
    tbody.parentElement.style.display = 'table';
    
    const sortedTx = [...state.transactions].sort((a,b) => new Date(b.date) - new Date(a.date));
    tbody.innerHTML = sortedTx.map(t => {
      const sub = state.subscriptions.find(s => s.id === t.subId);
      return \`
      <tr>
        <td style="color:var(--text-secondary);">\${t.date}</td>
        <td style="font-weight:600;">\${sub ? sub.name : 'Unknown'}</td>
        <td><span class="badge" style="background:var(--bg-main);">\${t.category}</span></td>
        <td style="font-weight:700;">\${formatMoney(t.amount)}</td>
        <td>
          <button class="btn-icon"><i class="ph ph-pencil-simple"></i></button>
          <button class="btn-icon" onclick="deleteTx('\${t.id}')"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
      \`;
    }).join('');
  }
}

function renderSubscriptions() {
  const tbody = document.getElementById('fullSubList');
  if(state.subscriptions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No subscriptions found.</td></tr>';
  } else {
    tbody.innerHTML = state.subscriptions.map(s => {
      let badge = '<span class="badge success">ACTIVE</span>';
      if(s.status === 'Ghost') badge = '<span class="badge badge-ghost">GHOST</span>';
      if(s.status === 'Cancelled') badge = '<span class="badge" style="background:var(--border-medium); color:white;">CANCELLED</span>';
      
      let actionBtn = s.status === 'Cancelled' ? '-' : \`<button class="btn-secondary" style="padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('\${s.id}')">Manage</button>\`;
      if (s.status === 'Ghost') {
        actionBtn = \`<button class="btn-primary" style="background:#ff6b6b; padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('\${s.id}')">Review</button>\`;
      }
      
      return \`
      <tr style="\${s.status === 'Cancelled' ? 'opacity: 0.5;' : ''}">
        <td style="font-weight:600;"><span style="margin-right:8px;">\${s.icon}</span> \${s.name}</td>
        <td><span style="color:var(--text-secondary); font-size:12px;">Last Tx: \${s.lastTxDate}</span></td>
        <td style="color:var(--text-secondary);">\${s.cycle}</td>
        <td style="font-weight:700;">\${formatMoney(s.cost)}</td>
        <td>\${badge}</td>
        <td>\${actionBtn}</td>
      </tr>
      \`;
    }).join('');
  }
}

function renderBudget() {
  const container = document.getElementById('budgetList');
  container.innerHTML = state.budgets.map(b => {
    // calculate spent dynamically from txs this month
    const spent = state.transactions.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0);
    const pct = Math.min(100, Math.round((spent / b.limit) * 100));
    const isExceeded = spent > b.limit;
    const color = isExceeded ? '#ff6b6b' : 'var(--teal)';
    
    return \`
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="display:flex; align-items:center; gap:8px;">
            \${b.category} \${isExceeded ? '<i class="ph ph-warning-circle" style="color:#ff6b6b;"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);">\${formatMoney(spent)} / \${formatMoney(b.limit)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--bg-main); border-radius:4px; margin-bottom:8px; overflow:hidden;">
          <div style="height:100%; width:\${pct}%; background:\${color};"></div>
        </div>
      </div>
    \`;
  }).join('');
}

// --- 5. MODALS & FORMS ---

function openAddSubModal() {
  document.getElementById('modal-add-sub').classList.add('active');
}

function submitSubscription() {
  const name = document.getElementById('addSubName').value.trim();
  const cost = parseFloat(document.getElementById('addSubCost').value);
  const cat = document.getElementById('addSubCat').value;
  
  if (!name || isNaN(cost) || cost <= 0) {
    showToast('Cost must be > 0 and name cannot be empty'); return;
  }
  if (state.subscriptions.some(s => s.name.toLowerCase() === name.toLowerCase() && s.status !== 'Cancelled')) {
    showToast('Active subscription with this name already exists!'); return;
  }
  
  state.subscriptions.push({
    id: 's' + Date.now(),
    name, category: cat, cost, cycle: 'Monthly', status: 'Active', 
    icon: '✨', added: new Date().toISOString().split('T')[0], snoozeUntil: null, ignoreGhost: false
  });
  
  closeModal('modal-add-sub');
  showToast('Subscription added');
  runGhostDetection();
  renderAll();
}

function openAddTransactionModal() {
  const select = document.getElementById('addTxSubId');
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');
  
  if (activeSubs.length === 0) {
    showToast('Please add a subscription first.'); return;
  }
  
  select.innerHTML = activeSubs.map(s => \`<option value="\${s.id}">\${s.name} (\${formatMoney(s.cost)})\</option>\`).join('');
  document.getElementById('addTxDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('modal-add-transaction').classList.add('active');
}

function submitTransaction() {
  const subId = document.getElementById('addTxSubId').value;
  const date = document.getElementById('addTxDate').value;
  
  const today = new Date().toISOString().split('T')[0];
  if (date > today) {
    showToast('Transaction date cannot be in the future!'); return;
  }
  
  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;
  
  state.transactions.unshift({
    id: 't' + Date.now(),
    subId: sub.id,
    date: date,
    category: sub.category,
    amount: sub.cost
  });
  
  closeModal('modal-add-transaction');
  showToast('Transaction recorded!');
  runGhostDetection();
  renderAll();
}

function deleteTx(id) {
  state.transactions = state.transactions.filter(t => t.id !== id);
  runGhostDetection();
  renderAll();
  showToast('Transaction deleted');
}

function openGhostDrilldown(subId) {
  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;
  currentGhostDrilldown = subId;
  
  const txs = state.transactions.filter(t => t.subId === sub.id).sort((a,b) => new Date(b.date) - new Date(a.date));
  const timelineEl = document.getElementById('ghostModalTimeline');
  
  if (txs.length === 0) {
    timelineEl.innerHTML = '<div style="font-size:12px; color:var(--text-secondary);">No transactions found.</div>';
  } else {
    timelineEl.innerHTML = txs.slice(0, 3).map(t => \`
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; padding:4px; background:rgba(0,0,0,0.1); border-radius:4px;">
        <span style="color:var(--text-secondary);">\${t.date}</span>
        <strong>\${formatMoney(t.amount)}</strong>
      </div>
    \`).join('');
  }
  
  document.getElementById('ghostModalIcon').innerText = sub.icon;
  document.getElementById('ghostModalTitle').innerText = sub.name;
  document.getElementById('ghostModalDays').innerText = sub.daysUnused + ' days';
  document.getElementById('ghostModalBleed').innerText = \`\${formatMoney(sub.cost)}/mo\`;
  document.getElementById('ghostModalSave').innerText = formatMoney(sub.cost * 12) + ' / year';
  
  document.getElementById('modal-ghost-drilldown').classList.add('active');
}

function confirmCancelGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if(sub) sub.status = 'Cancelled';
  closeModal('modal-ghost-drilldown');
  showToast('Subscription Cancelled. Added to Savings!', '<i class="ph ph-check-circle" style="color:var(--teal);"></i>');
  runGhostDetection();
  renderAll();
}

function snoozeGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if (sub) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    sub.snoozeUntil = d.toISOString().split('T')[0];
  }
  closeModal('modal-ghost-drilldown');
  showToast('Ghost alert snoozed for 7 days', '<i class="ph ph-clock" style="color:var(--blue);"></i>');
  runGhostDetection();
  renderAll();
}

function keepGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if (sub) {
    sub.ignoreGhost = true;
    sub.status = 'Active';
  }
  closeModal('modal-ghost-drilldown');
  showToast('Algorithm updated. Will ignore this sub.', '<i class="ph ph-brain" style="color:var(--teal);"></i>');
  runGhostDetection();
  renderAll();
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
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

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sidebarNav').style.pointerEvents = 'none';
  document.getElementById('sidebarNav').style.opacity = '0.5';
});
`;

// Now replace the app.js
fs.writeFileSync(path.join(targetDir, 'app.js'), appJs);

// Also need to inject the HTML structure into index.html
let html = fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8');

// We will replace the entire <body> content
const bodyStart = html.indexOf('<body>');
const bodyEnd = html.lastIndexOf('</body>');

const newBody = `<body>
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
    
    <nav class="sidebar-nav" id="sidebarNav">
      <a href="#" class="nav-item" onclick="switchView('view-overview', this)"><i class="ph ph-squares-four"></i> Overview</a>
      <a href="#" class="nav-item" onclick="switchView('view-transactions', this)"><i class="ph ph-list-dashes"></i> Transactions</a>
      <a href="#" class="nav-item" onclick="switchView('view-subscriptions', this)">
        <i class="ph ph-repeat"></i> Subscriptions
        <span class="nav-badge" id="navGhostBadge" style="display: none;"></span>
      </a>
      <a href="#" class="nav-item" onclick="switchView('view-analytics', this)"><i class="ph ph-chart-pie-slice"></i> Analytics</a>
      <a href="#" class="nav-item" onclick="switchView('view-budget', this)"><i class="ph ph-target"></i> Budget Planner</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="main-content">

    <!-- VIEW: ONBOARDING -->
    <div id="view-onboarding" class="view-section active">
      <div style="max-width: 500px; margin: 100px auto; background: var(--bg-card); padding: 40px; border-radius: 16px; border: 1px solid var(--border-light); text-align: center;">
        <i class="ph ph-rocket-launch" style="font-size: 48px; color: var(--teal); margin-bottom: 20px;"></i>
        <h2>Welcome to FinTrack</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 14px;">Set up your financial rules before we begin tracking ghosts.</p>
        
        <div style="text-align: left; margin-bottom: 20px;">
          <label style="display:block; margin-bottom: 8px; font-size: 13px;">Primary Currency</label>
          <select id="onboardCurrency" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
            <option value="USD">USD ($)</option>
            <option value="VND">VND (đ)</option>
          </select>
        </div>
        
        <div style="text-align: left; margin-bottom: 20px;">
          <label style="display:block; margin-bottom: 8px; font-size: 13px;">Ghost Threshold (Days without transaction)</label>
          <input type="number" id="onboardThreshold" value="30" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
        </div>

        <div style="text-align: left; margin-bottom: 30px; display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="onboardMock" checked>
          <label for="onboardMock" style="font-size: 13px;">Import sample demo data</label>
        </div>

        <button class="btn-primary w-100" style="width:100%" onclick="completeOnboarding()">Complete Setup</button>
      </div>
    </div>
    
    <!-- VIEW: OVERVIEW -->
    <div id="view-overview" class="view-section">
      <header class="topbar">
        <h1 class="page-title">Overview</h1>
        <div class="topbar-actions">
          <button class="btn-secondary" onclick="openAddSubModal()"><i class="ph ph-plus"></i> Add Sub</button>
          <button class="btn-primary" onclick="openAddTransactionModal()"><i class="ph ph-plus"></i> Add Tx</button>
        </div>
      </header>

      <div class="page-content" id="overviewContent">
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title">Total Fixed Cost</div>
              <div class="kpi-card-icon"><i class="ph ph-currency-dollar"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiTotalCost">$0.00</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title tooltip">Utilization Rate<span class="tooltiptext">Active Subs / Total Subs</span></div>
              <div class="kpi-card-icon" style="background: rgba(0, 212, 170, 0.1); color: var(--teal);"><i class="ph ph-lightning"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiUtilization" style="color: var(--teal);">0%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-card-header">
              <div class="kpi-card-title">Active Subscriptions</div>
              <div class="kpi-card-icon" style="background: rgba(245, 166, 35, 0.1); color: var(--orange);"><i class="ph ph-repeat"></i></div>
            </div>
            <div class="kpi-card-value" id="kpiActiveCount">0</div>
          </div>
        </div>

        <div class="dashboard-grid mt-4">
          <div class="card ghost-alert-card" style="grid-column: span 6;">
            <div class="card-header">
              <h3 class="card-title" style="color: #ff6b6b;"><i class="ph ph-ghost"></i> Ghost Alerts</h3>
            </div>
            <div class="sub-list" id="overviewGhostList" style="display: flex; flex-direction: column; gap: 12px;"></div>
          </div>
          <div class="card" style="grid-column: span 6;">
            <div class="card-header">
              <h3 class="card-title">Recent Transactions</h3>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <tbody id="overviewTxList"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="page-content" id="overviewEmpty" style="display:none; text-align:center; padding: 60px;">
        <i class="ph ph-ghost" style="font-size: 64px; color: var(--border-medium); margin-bottom: 20px;"></i>
        <h2>No Financial Data</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">Your ledger is empty. Add a subscription and transactions to let the Ghost Detection algorithm work.</p>
        <button class="btn-primary" onclick="openAddSubModal()"><i class="ph ph-plus"></i> Add First Subscription</button>
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
                  <th>Subscription</th>
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
            <h3>No Transactions</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW: SUBSCRIPTIONS -->
    <div id="view-subscriptions" class="view-section">
      <header class="topbar">
        <h1 class="page-title">Subscriptions</h1>
        <button class="btn-primary" onclick="openAddSubModal()"><i class="ph ph-plus"></i> Add Subscription</button>
      </header>
      <div class="page-content">
        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Last Transaction</th>
                  <th>Cycle</th>
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
        <div class="card" style="text-align:center; padding:40px;">
          <h3 style="color:var(--text-secondary);">Analytics charts will populate here</h3>
        </div>
      </div>
    </div>

    <!-- VIEW: BUDGET PLANNER -->
    <div id="view-budget" class="view-section">
      <header class="topbar"><h1 class="page-title">Budget Planner</h1></header>
      <div class="page-content">
        <div class="card">
          <h3 class="card-title mb-4">Monthly Limits</h3>
          <div id="budgetList"></div>
        </div>
      </div>
    </div>

  </main>
</div>

<!-- MODAL: ADD SUBSCRIPTION -->
<div class="modal-overlay" id="modal-add-sub">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal('modal-add-sub')"><i class="ph ph-x"></i></button>
    <h2 style="margin-bottom: 20px;">Add Subscription</h2>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px;">Service Name</label>
      <input type="text" id="addSubName" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px;">Cost per cycle</label>
      <input type="number" id="addSubCost" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px;">Category</label>
      <select id="addSubCat" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
        <option>Entertainment</option>
        <option>Health</option>
        <option>Education</option>
      </select>
    </div>
    <button class="btn-primary" style="width:100%; margin-top:10px;" onclick="submitSubscription()">Save Subscription</button>
  </div>
</div>

<!-- MODAL: ADD TRANSACTION -->
<div class="modal-overlay" id="modal-add-transaction">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal('modal-add-transaction')"><i class="ph ph-x"></i></button>
    <h2 style="margin-bottom: 20px;">Add Transaction</h2>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px;">Link to Subscription</label>
      <select id="addTxSubId" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
      </select>
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label style="display:block; margin-bottom: 8px; font-size: 13px;">Date</label>
      <input type="date" id="addTxDate" style="width: 100%; padding: 10px; background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 8px; color: white;">
    </div>
    <button class="btn-primary" style="width:100%; margin-top:10px;" onclick="submitTransaction()">Record Transaction</button>
  </div>
</div>

<!-- MODAL: GHOST DRILL-DOWN -->
<div class="modal-overlay" id="modal-ghost-drilldown">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal('modal-ghost-drilldown')"><i class="ph ph-x"></i></button>
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
      <div class="sub-icon" id="ghostModalIcon" style="font-size: 32px; background: rgba(255,107,107,0.1); border-radius: 12px; padding: 16px;"></div>
      <div>
        <h2 id="ghostModalTitle" style="margin-bottom: 4px;">Service</h2>
        <div class="badge badge-ghost">Ghost Detected</div>
      </div>
    </div>
    
    <div style="background: var(--bg-main); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
        <span style="color: var(--text-secondary);">Days without usage:</span>
        <strong id="ghostModalDays" style="color: #ff6b6b;">0 days</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
        <span style="color: var(--text-secondary);">Monthly bleed rate:</span>
        <strong id="ghostModalBleed">--</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px;">
        <span style="color: var(--text-secondary);">Potential Yearly Save:</span>
        <strong id="ghostModalSave" style="color: var(--teal);">--</strong>
      </div>
    </div>
    
    <div style="margin-bottom: 24px;">
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; font-weight: bold;">Transaction Timeline</div>
      <div id="ghostModalTimeline"></div>
    </div>
    
    <div style="display: flex; gap: 8px;">
      <button class="btn-primary" style="flex: 1; background: #ff6b6b;" onclick="confirmCancelGhost()">Cancel Sub</button>
      <button class="btn-secondary" style="flex: 1;" onclick="snoozeGhost()">Snooze 7D</button>
      <button class="btn-secondary" style="flex: 1;" onclick="keepGhost()">Keep</button>
    </div>
  </div>
</div>

<div class="toast-container" id="toastContainer"></div>
<script src="app.js"></script>
</body>`;

html = html.substring(0, bodyStart) + newBody + html.substring(bodyEnd + 7);
fs.writeFileSync(path.join(targetDir, 'index.html'), html);

console.log('Project 1 Gated Flow rewritten!');
