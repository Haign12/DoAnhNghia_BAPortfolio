/* ============================================================
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
  
  document.getElementById('kpiTotalCost').innerText = `$${totalCost.toFixed(2)}`;
  document.getElementById('kpiActiveCount').innerText = activeCount;
  document.getElementById('kpiUtilization').innerText = `${utilization}%`;

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
        <div style="font-weight: 700; text-align:right;">$${g.cost.toFixed(2)}</div>
        <button class="btn-text" style="color: #ff6b6b; padding: 0; font-size: 12px;" onclick="openGhostDrilldown('${g.id}')">Review</button>
      </div>
    </div>
  `).join('');

  if (ghosts.length > 3) {
    ghostListEl.innerHTML += `<div style="text-align:center; font-size:12px; margin-top:8px;"><a href="#" onclick="switchView('view-subscriptions', document.querySelectorAll('.nav-item')[2])">+ ${ghosts.length - 3} more ghosts</a></div>`;
  }

  // Recent Tx
  const txListEl = document.getElementById('overviewTxList');
  txListEl.innerHTML = state.transactions.slice(0, 4).map(t => `
    <tr>
      <td style="color:var(--text-secondary);">${t.date}</td>
      <td style="font-weight:600;">${t.desc}</td>
      <td style="font-weight:700;">$${t.amount.toFixed(2)}</td>
    </tr>
  `).join('');
}

function renderTransactions() {
  const tbody = document.getElementById('fullTxList');
  tbody.innerHTML = state.transactions.map(t => `
    <tr>
      <td style="color:var(--text-secondary);">${t.date}</td>
      <td style="font-weight:600;">${t.desc}</td>
      <td><span class="badge" style="background:var(--bg-main);">${t.category}</span></td>
      <td style="font-weight:700;">$${t.amount.toFixed(2)}</td>
      <td><button class="btn-icon" onclick="deleteTx('${t.id}')"><i class="ph ph-trash"></i></button></td>
    </tr>
  `).join('');
}

function renderSubscriptions() {
  const tbody = document.getElementById('fullSubList');
  tbody.innerHTML = state.subscriptions.map(s => `
    <tr>
      <td style="font-weight:600;"><span style="margin-right:8px;">${s.icon}</span> ${s.name}</td>
      <td><span class="badge" style="background:var(--bg-main);">${s.category}</span></td>
      <td style="color:var(--text-secondary);">${s.cycle}</td>
      <td style="font-weight:700;">$${s.cost.toFixed(2)}</td>
      <td>${s.status === 'Ghost' ? '<span class="badge badge-ghost">GHOST</span>' : '<span class="badge success">ACTIVE</span>'}</td>
      <td>
        ${s.status === 'Ghost' ? `<button class="btn-primary" style="background:#ff6b6b; padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('${s.id}')">Review</button>` : '<button class="btn-secondary" style="padding: 4px 12px; font-size:12px;">Edit</button>'}
      </td>
    </tr>
  `).join('');
}

function renderBudget() {
  const container = document.getElementById('budgetList');
  container.innerHTML = state.budgets.map(b => {
    const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
    const isExceeded = b.spent > b.limit;
    const color = isExceeded ? '#ff6b6b' : 'var(--teal)';
    
    let actionBtn = '';
    if (isExceeded && b.relatedSub) {
      actionBtn = `<button class="btn-text" style="color:#ff6b6b; padding:0; font-size:13px;" onclick="openGhostDrilldown('${b.relatedSub}')"><i class="ph ph-warning-circle"></i> View related Ghost</button>`;
    }

    return `
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="display:flex; align-items:center; gap:8px;">
            ${b.category} ${isExceeded ? '<i class="ph ph-warning-circle" style="color:#ff6b6b;"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);">$${b.spent.toFixed(2)} / $${b.limit.toFixed(2)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--bg-main); border-radius:4px; margin-bottom:8px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${color};"></div>
        </div>
        ${actionBtn}
      </div>
    `;
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
  document.getElementById('ghostModalBleed').innerText = `$${sub.cost.toFixed(2)}/mo`;
  
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
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
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
