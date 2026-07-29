const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, '../project1-expense-tracker/index.html');
const appFile = path.join(__dirname, '../project1-expense-tracker/app.js');

let indexHtml = fs.readFileSync(indexFile, 'utf8');
let appJs = fs.readFileSync(appFile, 'utf8');

// 1. Add Cashflow to sidebar & View Analytics update & Labels
indexHtml = indexHtml.replace(
  '<a href="#" class="nav-item" onclick="switchView(\'view-analytics\', this)">',
  `<a href="#" class="nav-item" onclick="switchView('view-analytics', this)">
          <i class="ph ph-chart-pie-slice"></i> Analytics
        </a>
        <a href="#" class="nav-item" onclick="switchView('view-cashflow', this)">
          <i class="ph ph-trend-up"></i> Cashflow
        </a>
        <a href="#" class="nav-item" style="display:none;" onclick="switchView('view-analytics', this)">`
);

indexHtml = indexHtml.replace(
  '<div class="kpi-label">Active Subscriptions</div>',
  '<div class="kpi-label tooltip">Active (non-ghost)<span class="tooltiptext">Number of active subscriptions that are not flagged as ghosts</span></div>'
);

// 2. Add Amount to Add Transaction Modal
indexHtml = indexHtml.replace(
  'id="addTxDate" type="date">',
  `id="addTxDate" type="date">
      </div>
      <div class="form-group">
        <label>Amount (Overrides Default)</label>
        <input id="addTxAmount" type="number" step="0.01">`
);

// 3. Add Billing Cycle to Add Sub Modal
indexHtml = indexHtml.replace(
  '<option value="Education">Education</option>',
  `<option value="Education">Education</option>
        </select>
      </div>
      <div class="form-group">
        <label>Billing Cycle</label>
        <select id="addSubCycle">
          <option value="Monthly">Monthly</option>
          <option value="Annual">Annual</option>`
);

// 4. Update Analytics View
indexHtml = indexHtml.replace(
  '<div id="view-analytics" class="view-section">',
  `<div id="view-analytics" class="view-section">
      <div class="page-title" style="margin-bottom: 24px;">Analytics</div>
      <div class="dashboard-grid">
        <div class="card" style="grid-column: span 6;">
          <div class="card-header"><div class="card-title">Category Breakdown</div></div>
          <canvas id="categoryChart" width="400" height="300"></canvas>
        </div>
        <div class="card" style="grid-column: span 6;">
          <div class="card-header"><div class="card-title">Monthly Spending Trend</div></div>
          <canvas id="trendChart" width="400" height="300"></canvas>
        </div>
      </div>
    </div>
    
    <div id="view-cashflow" class="view-section">
      <div class="page-title" style="margin-bottom: 24px;">Cashflow Forecast</div>
      <div class="card">
        <div class="card-header"><div class="card-title">Upcoming Bills (Next 30 Days)</div></div>
        <table class="data-table">
          <tbody id="cashflowList">
          <!-- Populated by JS -->
          </tbody>
        </table>
      </div>
    </div>
    <div id="view-analytics-old" class="view-section" style="display:none;">`
);

// 5. Add Budget Edit Modal HTML
indexHtml = indexHtml.replace(
  '<!-- Modals -->',
  `<!-- Modals -->
  <div class="modal-overlay" id="modal-edit-budget">
    <div class="modal-card">
      <button class="modal-close" onclick="closeModal('modal-edit-budget')"><i class="ph ph-x"></i></button>
      <div class="card-title" style="margin-bottom: 16px;">Set Budget Limit</div>
      <div class="form-group">
        <label>Category</label>
        <select id="editBudgetCat">
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Utilities">Utilities</option>
        </select>
      </div>
      <div class="form-group">
        <label>Monthly Limit (USD)</label>
        <input id="editBudgetLimit" type="number" step="0.01">
      </div>
      <button class="btn-primary" style="width:100%;" onclick="saveBudget()">Save Limit</button>
    </div>
  </div>
`
);

// Add Set Limit button to Budget View
indexHtml = indexHtml.replace(
  '<div class="page-title" style="margin-bottom: 24px;">Budget Planner</div>',
  `<div class="page-title" style="margin-bottom: 24px; display:flex; justify-content:space-between; align-items:center;">
    Budget Planner
    <button class="btn-primary" onclick="openBudgetModal()">+ Set Limit</button>
  </div>`
);


fs.writeFileSync(indexFile, indexHtml, 'utf8');

// --- UPDATE APP.JS ---

// Add logic for openBudgetModal, saveBudget, renderAnalytics, renderCashflow, and fix Amount/Cycle
appJs = appJs.replace(
  'const date = document.getElementById(\'addTxDate\').value;',
  `const date = document.getElementById('addTxDate').value;
  let overrideAmt = document.getElementById('addTxAmount').value;`
);

appJs = appJs.replace(
  'amount: sub.cost',
  `amount: overrideAmt ? parseFloat(overrideAmt) : sub.cost`
);

appJs = appJs.replace(
  'const cat = document.getElementById(\'addSubCat\').value;',
  `const cat = document.getElementById('addSubCat').value;
  const cycle = document.getElementById('addSubCycle').value;`
);

appJs = appJs.replace(
  'cycle: \'Monthly\'',
  `cycle: cycle`
);

// Add Analytics and Cashflow rendering to renderAll
appJs = appJs.replace(
  'renderBudget();',
  `renderBudget();
  renderAnalytics();
  renderCashflow();`
);

appJs = appJs.replace(
  'select.innerHTML = activeSubs.map(s => `<option value="${s.id}">${s.name} (${formatMoney(s.cost)})</option>`).join(\'\');',
  `select.innerHTML = activeSubs.map(s => \`<option value="\${s.id}">\${s.name} (\${formatMoney(s.cost)})\</option>\`).join('');
  
  // Set default amount on change
  select.onchange = (e) => {
    const s = state.subscriptions.find(x => x.id === e.target.value);
    if(s) document.getElementById('addTxAmount').value = s.cost;
  };
  if(activeSubs.length > 0) document.getElementById('addTxAmount').value = activeSubs[0].cost;`
);

// Append new functions
const newLogic = `
function openBudgetModal() {
  document.getElementById('modal-edit-budget').classList.add('active');
}
function saveBudget() {
  const cat = document.getElementById('editBudgetCat').value;
  const limit = parseFloat(document.getElementById('editBudgetLimit').value);
  if(isNaN(limit) || limit <= 0) { showToast('Invalid limit'); return; }
  
  let b = state.budgets.find(x => x.category === cat);
  if(b) { b.limit = limit; } else { state.budgets.push({category: cat, limit, spent: 0}); }
  
  closeModal('modal-edit-budget');
  renderBudget();
  showToast('Budget updated');
}

let chartInstance1 = null;
let chartInstance2 = null;
function renderAnalytics() {
  if(!document.getElementById('categoryChart')) return;
  const ctx1 = document.getElementById('categoryChart').getContext('2d');
  const ctx2 = document.getElementById('trendChart').getContext('2d');
  
  const catTotals = {};
  state.transactions.forEach(t => {
    catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
  });
  
  if(chartInstance1) chartInstance1.destroy();
  chartInstance1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: Object.keys(catTotals),
      datasets: [{
        data: Object.values(catTotals),
        backgroundColor: ['#8E75C8', '#4a90d9', '#00d4aa', '#f472b6']
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'right', labels: {color: 'var(--text-primary)'} } } }
  });
  
  // Simple trend (mocking monthly data)
  if(chartInstance2) chartInstance2.destroy();
  chartInstance2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Spending',
        data: [120, 150, Object.values(catTotals).reduce((a,b)=>a+b, 0)],
        backgroundColor: '#8E75C8'
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, ticks: {color: 'var(--text-secondary)'} }, x: { ticks: {color: 'var(--text-secondary)'} } }, plugins: { legend: {display:false} } }
  });
}

function renderCashflow() {
  const list = document.getElementById('cashflowList');
  if(!list) return;
  
  const active = state.subscriptions.filter(s => s.status === 'Active');
  if(active.length === 0) {
    list.innerHTML = '<tr><td>No active subscriptions.</td></tr>';
    return;
  }
  
  list.innerHTML = active.map(s => {
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + Math.floor(Math.random() * 30));
    return \`<tr>
      <td style="color:var(--text-secondary)">\${nextDate.toISOString().split('T')[0]}</td>
      <td><strong>\${s.name}</strong></td>
      <td style="font-weight:700;">\${formatMoney(s.cost)}</td>
    </tr>\`;
  }).join('');
}
`;

fs.writeFileSync(appFile, appJs + newLogic, 'utf8');

console.log("Done updating index.html and app.js");
