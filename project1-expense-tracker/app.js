/* ============================================================
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
  if (state.settings.currency === 'USD') return `$${amount.toFixed(2)}`;
  return `${(amount * 25000).toLocaleString('vi-VN')}đ`;
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
  document.getElementById('kpiUtilization').innerText = `${utilization}%`;

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
    ghostListEl.innerHTML = ghosts.slice(0, 3).map(g => `
      <div class="sub-item" style="display:flex; align-items:center; justify-content:space-between; padding: 12px; background: var(--bg-main); border-radius: 12px; border-left: 4px solid #ff6b6b;">
        <div style="display:flex; align-items:center; gap: 12px;">
          <div style="font-size: 24px;">${g.icon}</div>
          <div>
            <div style="font-weight: 600;">${g.name}</div>
            <div style="font-size: 12px; color: #ff6b6b;">${g.daysUnused} days unused</div>
          </div>
        </div>
        <div>
          <div style="font-weight: 700; text-align:right;">${formatMoney(g.cost)}</div>
          <button class="btn-text" style="color: #ff6b6b; padding: 0; font-size: 12px;" onclick="openGhostDrilldown('${g.id}')">Review</button>
        </div>
      </div>
    `).join('');

    if (ghosts.length > 3) {
      ghostListEl.innerHTML += `<div style="text-align:center; font-size:12px; margin-top:8px;"><a href="#" onclick="switchView('view-subscriptions', document.querySelectorAll('.nav-item')[2])">+ ${ghosts.length - 3} more ghosts</a></div>`;
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
      return `
      <tr>
        <td style="color:var(--text-secondary);">${t.date}</td>
        <td style="font-weight:600;">${sub ? sub.name : 'Unknown'}</td>
        <td style="font-weight:700;">${formatMoney(t.amount)}</td>
      </tr>
      `;
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
      return `
      <tr>
        <td style="color:var(--text-secondary);">${t.date}</td>
        <td style="font-weight:600;">${sub ? sub.name : 'Unknown'}</td>
        <td><span class="badge" style="background:var(--bg-main);">${t.category}</span></td>
        <td style="font-weight:700;">${formatMoney(t.amount)}</td>
        <td>
          <button class="btn-icon"><i class="ph ph-pencil-simple"></i></button>
          <button class="btn-icon" onclick="deleteTx('${t.id}')"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
      `;
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
      
      let actionBtn = s.status === 'Cancelled' ? '-' : `<button class="btn-secondary" style="padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('${s.id}')">Manage</button>`;
      if (s.status === 'Ghost') {
        actionBtn = `<button class="btn-primary" style="background:#ff6b6b; padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('${s.id}')">Review</button>`;
      }
      
      return `
      <tr style="${s.status === 'Cancelled' ? 'opacity: 0.5;' : ''}">
        <td style="font-weight:600;"><span style="margin-right:8px;">${s.icon}</span> ${s.name}</td>
        <td><span style="color:var(--text-secondary); font-size:12px;">Last Tx: ${s.lastTxDate}</span></td>
        <td style="color:var(--text-secondary);">${s.cycle}</td>
        <td style="font-weight:700;">${formatMoney(s.cost)}</td>
        <td>${badge}</td>
        <td>${actionBtn}</td>
      </tr>
      `;
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
    
    return `
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="display:flex; align-items:center; gap:8px;">
            ${b.category} ${isExceeded ? '<i class="ph ph-warning-circle" style="color:#ff6b6b;"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);">${formatMoney(spent)} / ${formatMoney(b.limit)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--bg-main); border-radius:4px; margin-bottom:8px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${color};"></div>
        </div>
      </div>
    `;
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
  
  select.innerHTML = activeSubs.map(s => `<option value="${s.id}">${s.name} (${formatMoney(s.cost)})</option>`).join('');
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
    timelineEl.innerHTML = txs.slice(0, 3).map(t => `
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; padding:4px; background:rgba(0,0,0,0.1); border-radius:4px;">
        <span style="color:var(--text-secondary);">${t.date}</span>
        <strong>${formatMoney(t.amount)}</strong>
      </div>
    `).join('');
  }
  
  document.getElementById('ghostModalIcon').innerText = sub.icon;
  document.getElementById('ghostModalTitle').innerText = sub.name;
  document.getElementById('ghostModalDays').innerText = sub.daysUnused + ' days';
  document.getElementById('ghostModalBleed').innerText = `${formatMoney(sub.cost)}/mo`;
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
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sidebarNav').style.pointerEvents = 'none';
  document.getElementById('sidebarNav').style.opacity = '0.5';
});
