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
  
  const rightRail = document.getElementById('rightRail');
  if(rightRail) {
    rightRail.style.setProperty('display', 'flex', 'important');
    renderRightRail(viewId);
  }
  
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
    { id: 's1', name: 'Netflix', category: 'Entertainment', cost: 15.99, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#E50914;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-monitor-play"></i></div>', added: daysAgo(100), snoozeUntil: null, ignoreGhost: false },
    { id: 's2', name: 'Spotify', category: 'Entertainment', cost: 9.99, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#1DB954;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-headphones"></i></div>', added: daysAgo(60), snoozeUntil: null, ignoreGhost: false },
    { id: 's3', name: 'Gym Membership', category: 'Health', cost: 30.00, cycle: 'Monthly', status: 'Active', icon: '<div style="background:var(--primary);color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-barbell"></i></div>', added: daysAgo(120), snoozeUntil: null, ignoreGhost: false },
    { id: 's4', name: 'Coursera Plus', category: 'Education', cost: 49.00, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#0056D2;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-student"></i></div>', added: daysAgo(90), snoozeUntil: null, ignoreGhost: false },
    { id: 's5', name: 'Adobe CC', category: 'Education', cost: 52.99, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#FF0000;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-pen-nib"></i></div>', added: daysAgo(200), snoozeUntil: null, ignoreGhost: false },
    { id: 's6', name: 'Amazon Prime', category: 'Entertainment', cost: 14.99, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#00A8E1;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-package"></i></div>', added: daysAgo(150), snoozeUntil: null, ignoreGhost: false },
    { id: 's7', name: 'Notion', category: 'Education', cost: 8.00, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#000000;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-notebook"></i></div>', added: daysAgo(180), snoozeUntil: null, ignoreGhost: false },
    { id: 's8', name: 'Yoga App', category: 'Health', cost: 12.00, cycle: 'Monthly', status: 'Active', icon: '<div style="background:#059669;color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-person-simple-walk"></i></div>', added: daysAgo(210), snoozeUntil: null, ignoreGhost: false }
  ];
  
  state.transactions = [
    { id: 't1', subId: 's1', date: daysAgo(5), category: 'Entertainment', amount: 15.99 },
    { id: 't2', subId: 's2', date: daysAgo(2), category: 'Entertainment', amount: 9.99 },
    { id: 't3', subId: 's3', date: daysAgo(45), category: 'Health', amount: 30.00 },
    { id: 't4', subId: 's4', date: daysAgo(60), category: 'Education', amount: 49.00 },
    { id: 't5', subId: 's5', date: daysAgo(3), category: 'Education', amount: 52.99 },
    { id: 't6', subId: 's6', date: daysAgo(10), category: 'Entertainment', amount: 14.99 },
    { id: 't7', subId: 's7', date: daysAgo(12), category: 'Education', amount: 8.00 },
    { id: 't8', subId: 's8', date: daysAgo(35), category: 'Health', amount: 12.00 },
    { id: 't9', subId: 's1', date: daysAgo(35), category: 'Entertainment', amount: 15.99 },
    { id: 't10', subId: 's2', date: daysAgo(32), category: 'Entertainment', amount: 9.99 },
    { id: 't11', subId: 's5', date: daysAgo(33), category: 'Education', amount: 52.99 },
    { id: 't12', subId: 's6', date: daysAgo(40), category: 'Entertainment', amount: 14.99 },
    { id: 't13', subId: 's7', date: daysAgo(42), category: 'Education', amount: 8.00 }
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
function renderRightRail(viewId) {
  const rightRail = document.getElementById('rightRail');
  if (!rightRail) return;
  
  if (viewId === 'view-overview') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-calendar-blank"></i> Upcoming Renewals</h3>
        <div id="upcomingRenewalsList" style="display: flex; flex-direction: column; gap: 16px;"></div>
        <button class="btn-secondary" style="width: 100%; margin-top: 20px;" onclick="switchView('view-cashflow', document.querySelectorAll('.nav-item')[4])">View All</button>
      </div>
    `;
    // We populate this inside renderOverview
  } else if (viewId === 'view-transactions') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-trend-up"></i> Month vs Last Month</h3>
        <div style="font-size: 24px; font-weight: 700;">$142.00 <span style="font-size:14px; color:var(--red);">+12%</span></div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-chart-donut"></i> By Category</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display:flex; justify-content:space-between; font-size:13px;"><span>Entertainment</span><span style="font-weight:600;">45%</span></div>
          <div style="width:100%; height:6px; background:var(--bg-main); border-radius:3px;"><div style="width:45%; height:100%; background:var(--blue); border-radius:3px;"></div></div>
          <div style="display:flex; justify-content:space-between; font-size:13px; margin-top:8px;"><span>Health</span><span style="font-weight:600;">30%</span></div>
          <div style="width:100%; height:6px; background:var(--bg-main); border-radius:3px;"><div style="width:30%; height:100%; background:var(--teal); border-radius:3px;"></div></div>
        </div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-star"></i> Top 3 Largest</h3>
        <div id="rrTopTxList" style="display: flex; flex-direction: column; gap: 12px;"></div>
      </div>
    `;
    setTimeout(() => {
       const sorted = [...state.transactions].sort((a,b)=>b.amount-a.amount).slice(0,3);
       const el = document.getElementById('rrTopTxList');
       if(el) {
          el.innerHTML = sorted.map(t => {
             const sub = state.subscriptions.find(s => s.id === t.subId);
             return `<div style="display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-light); padding-bottom:8px;">
               <span>${sub ? sub.name : 'Unknown'}</span><span style="font-weight:600;">${formatMoney(t.amount)}</span>
             </div>`;
          }).join('');
       }
    }, 0);
  } else if (viewId === 'view-subscriptions') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-heartbeat"></i> Subscription Health</h3>
        <canvas id="rrHealthChart" width="200" height="200"></canvas>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-calendar-blank"></i> Renewal Calendar (Next 7D)</h3>
        <div id="subRenewalCalendar" style="display: flex; flex-direction: column; gap: 16px;"></div>
      </div>
    `;
    setTimeout(() => {
       const active = state.subscriptions.filter(s=>s.status==='Active').length;
       const ghost = state.subscriptions.filter(s=>s.status==='Ghost').length;
       const ctx = document.getElementById('rrHealthChart');
       if(ctx) {
           new Chart(ctx, {
             type: 'doughnut',
             data: {
               labels: ['Active', 'Ghost'],
               datasets: [{
                 data: [active, ghost],
                 backgroundColor: ['#00d4aa', '#EF4444'],
                 borderWidth: 0
               }]
             },
             options: { responsive: true, plugins: { legend: { position: 'bottom', labels: {color: 'var(--text-primary)'} } } }
           });
       }
    }, 0);
  } else if (viewId === 'view-analytics') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-fire"></i> Peak Spending Day</h3>
        <div style="font-size: 24px; font-weight: 700;">Saturday</div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-shield-check"></i> Best Streak</h3>
        <div style="font-size: 24px; font-weight: 700; color: var(--teal);">14 Days</div>
        <div style="font-size: 12px; color: var(--text-secondary);">Without ghost trigger</div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-chart-line-up"></i> Annual Forecast</h3>
        <div style="font-size: 24px; font-weight: 700;">$1,420.00</div>
      </div>
    `;
  } else if (viewId === 'view-cashflow') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-money"></i> Recent Income</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-light); padding-bottom:8px;">
             <span>Salary (Stripe)</span><span style="font-weight:600; color:var(--teal);">+$3,200.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-light); padding-bottom:8px;">
             <span>Freelance Upwork</span><span style="font-weight:600; color:var(--teal);">+$450.00</span>
          </div>
        </div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-target"></i> Savings Goal</h3>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; font-weight: 600;">Buy a Laptop</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">60%</div>
        <div style="width: 100%; height: 8px; background: var(--bg-main); border-radius: 4px; overflow: hidden;">
          <div style="width: 60%; height: 100%; background: var(--teal); border-radius: 4px;"></div>
        </div>
      </div>
    `;
  } else if (viewId === 'view-budget') {
    rightRail.innerHTML = `
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-clock-counter-clockwise"></i> Budget History (3M)</h3>
        <div style="display:flex; align-items:flex-end; gap:8px; height:60px; margin-top:16px;">
          <div style="flex:1; background:var(--blue); height:40%; border-radius:4px 4px 0 0;" title="3 Months Ago"></div>
          <div style="flex:1; background:var(--blue); height:70%; border-radius:4px 4px 0 0;" title="2 Months Ago"></div>
          <div style="flex:1; background:var(--teal); height:55%; border-radius:4px 4px 0 0;" title="Last Month"></div>
        </div>
      </div>
      <div class="card" style="padding: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary);"><i class="ph ph-warning"></i> Categories Over Budget</h3>
        <div id="rrOverBudgetList" style="display: flex; flex-direction: column; gap: 12px;"></div>
      </div>
    `;
    setTimeout(() => {
       const over = state.budgets.filter(b => {
          const spent = state.transactions.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0);
          return spent > b.limit;
       });
       const el = document.getElementById('rrOverBudgetList');
       if(el) {
          if(over.length===0) el.innerHTML = '<div style="font-size:13px; color:var(--text-secondary);">All good!</div>';
          else el.innerHTML = over.map(b => `<div style="display:flex; justify-content:space-between; font-size:13px;"><span>${b.category}</span><span style="color:var(--red); font-weight:600;">Exceeded</span></div>`).join('');
       }
    }, 0);
  } else {
    rightRail.innerHTML = '';
  }
}

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
  renderAnalytics();
  renderCashflow();
}

function renderOverview() {
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');
  const totalCost = activeSubs.reduce((sum, s) => sum + s.cost, 0);
  const activeCount = activeSubs.filter(s => s.status === 'Active').length;
  const utilization = activeSubs.length === 0 ? 100 : Math.round((activeCount / activeSubs.length) * 100);
  
  const ghostCost = state.subscriptions.filter(s => s.status === 'Ghost').reduce((sum, g) => sum + g.cost, 0);
  const potentialSavings = ghostCost * 12; // yearly savings
  const totalSub = state.subscriptions.length;
  
  document.getElementById('kpiTotalCostContainer').innerHTML = `
    <div>
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; opacity: 0.5; margin-bottom: 4px;"><i class="ph-fill ph-wallet"></i> FIXED COST</div>
      <div style="font-size: 40px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 12px; margin-top: -8px;">
        <span style="font-size: 24px; width: 32px; height: 32px; border-radius: 50%; background: #111827; color: white; display: inline-flex; justify-content: center; align-items: center;"><i class="ph ph-currency-dollar"></i></span>
        ${formatMoney(totalCost).replace('$', '')}
        <span style="font-size: 11px; font-weight: 700; color: #10B981; display: inline-flex; align-items: center; margin-left: 8px;"><i class="ph-bold ph-arrow-up-right"></i>3%</span>
      </div>
    </div>
    <div style="width: 140px; height: 60px;">
      <canvas id="kpiSparklineCost"></canvas>
    </div>
  `;

  const kpiSavings = document.getElementById('kpiSavingsContainer');
  if(kpiSavings) {
    kpiSavings.innerHTML = `
      <div>
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; opacity: 0.5; margin-bottom: 4px;"><i class="ph-fill ph-piggy-bank"></i> SAVINGS</div>
        <div style="font-size: 40px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 12px; margin-top: -8px;">
          <span style="font-size: 24px; width: 32px; height: 32px; border-radius: 50%; background: #111827; color: white; display: inline-flex; justify-content: center; align-items: center;"><i class="ph ph-piggy-bank"></i></span>
          ${formatMoney(potentialSavings).replace('$', '')}
          <span style="font-size: 11px; font-weight: 700; color: var(--primary); display: inline-flex; align-items: center; margin-left: 8px;"><i class="ph-bold ph-arrow-up-right"></i>12%</span>
        </div>
      </div>
      <div style="width: 140px; height: 60px;">
        <canvas id="kpiSparklineSavings"></canvas>
      </div>
    `;
  }

  // Row 3 Charts Setup
  document.getElementById('overviewSpendingByCategory').innerHTML = `
    <div style="position: relative; height: 100px; display: flex; justify-content: center;">
       <canvas id="ovDonutChart"></canvas>
       <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
          <div style="font-size: 16px; font-weight: 800;">7K</div>
          <div style="font-size: 8px; color: var(--text-secondary);">Female</div>
       </div>
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 12px;">
       <div style="background: var(--bg-main); padding: 8px 12px; border-radius: 8px; text-align: center; flex: 1; margin: 0 4px;">
           <div style="font-size: 14px; font-weight: 700;">3686</div>
           <div style="font-size: 9px; color: var(--text-secondary);">Young Adult</div>
       </div>
       <div style="background: var(--bg-main); padding: 8px 12px; border-radius: 8px; text-align: center; flex: 1; margin: 0 4px;">
           <div style="font-size: 14px; font-weight: 700;">5221</div>
           <div style="font-size: 9px; color: var(--text-secondary);">Adult</div>
       </div>
       <div style="background: var(--bg-main); padding: 8px 12px; border-radius: 8px; text-align: center; flex: 1; margin: 0 4px;">
           <div style="font-size: 14px; font-weight: 700;">1287</div>
           <div style="font-size: 9px; color: var(--text-secondary);">Elder</div>
       </div>
    </div>
  `;
  document.getElementById('overviewSpendingByCategory').style.height = 'auto'; // allow expansion
  document.getElementById('overviewSubscriptionHealth').innerHTML = '<canvas id="ovBarChart"></canvas>';
  document.getElementById('overviewSubscriptionHealth').style.height = '140px';
  
  // Top Line Progress Bars (Active vs Ghost by Category)
  const categories = [...new Set(state.subscriptions.map(s => s.category))];
  document.getElementById('overviewTopLine').innerHTML = categories.slice(0,3).map(cat => {
     const subsInCat = state.subscriptions.filter(s => s.category === cat);
     const active = subsInCat.filter(s => s.status === 'Active').length;
     const ghost = subsInCat.filter(s => s.status === 'Ghost').length;
     const tot = subsInCat.length;
     const pActive = Math.round((active/tot)*100) || 0;
     const pGhost = Math.round((ghost/tot)*100) || 0;
     return `
       <div style="margin-bottom: 12px;">
         <div style="display:flex; justify-content:space-between; font-size:10px; margin-bottom:6px; font-weight: 500; color: var(--text-primary);">
           <span>Has our product helped you in ${cat}?</span>
         </div>
         <div style="width:100%; height:6px; background:var(--bg-main); border-radius:4px; display:flex; overflow:hidden;">
           <div style="width:${pActive}%; height:100%; background:var(--primary);"></div>
           <div style="width:${pGhost}%; height:100%; background:rgba(124, 58, 237, 0.2);"></div>
         </div>
       </div>
     `;
  }).join('') + `<div style="display:flex; justify-content: flex-end; align-items:center; gap:12px; font-size:10px; margin-top:-140px; margin-bottom: 120px;"><div style="display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; border-radius:50%; background:var(--primary);"></span>Yes</div><div style="display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; border-radius:50%; background:rgba(124, 58, 237, 0.2);"></span>No</div></div>`;
  document.getElementById('overviewTopLine').style.height = '140px';
  document.getElementById('overviewTopLine').style.justifyContent = 'flex-end';

  setTimeout(() => {
    // Sparklines
    const costCtx = document.getElementById('kpiSparklineCost');
    if(costCtx) new Chart(costCtx, { type: 'line', data: { labels: ['1','2','3','4','5','6','7'], datasets: [{ data: [55,59,40,41,56,40,65], borderColor: 'rgba(124, 58, 237, 0.2)', borderWidth: 2, tension: 0.4, fill: true, backgroundColor: 'rgba(124, 58, 237, 0.05)', pointRadius: 0 }] }, options: { plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false, min: 0 } }, layout: { padding: 0 } } });

    const savCtx = document.getElementById('kpiSparklineSavings');
    if(savCtx) new Chart(savCtx, { type: 'bar', data: { labels: ['1','2','3','4','5','6','7','8','9','10'], datasets: [{ data: [20,48,30,19,66,35,45,70,55,90], backgroundColor: '#D8B4FE', borderRadius: 2, barPercentage: 0.3 }] }, options: { plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false, min: 0 } }, layout: { padding: 0 } } });
    
    // Donut Chart
    const dCtx = document.getElementById('ovDonutChart');
    if(dCtx) new Chart(dCtx, { type: 'doughnut', data: { labels: ['A', 'B'], datasets: [{ data: [75, 25], backgroundColor: ['#7C3AED', '#EDE9FE'], borderWidth: 0, borderDash: [2, 2] }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } } });

    // Bar Chart
    const bCtx = document.getElementById('ovBarChart');
    if(bCtx) new Chart(bCtx, { type: 'bar', data: { labels: ['Online', 'In-Person', 'Mobile', 'Telephonic'], datasets: [{ data: [4800, 1500, 1800, 1800], backgroundColor: '#A78BFA', borderRadius: 2, barPercentage: 0.1 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 9 }, color: 'rgba(0,0,0,0.4)' } }, y: { display: false } } } });
  }, 0);

  // Satisfaction Level Details (Mock for Survey Results UI)
  const txListEl = document.getElementById('overviewTxList');
  const questions = [
    "How satisfied are you with our speed of resolution?",
    "Easy to find what you were looking for?",
    "How was your product delivery experience?",
    "How would you rate the professionalism of our support team?",
    "How would you rate your return/exchange experience on your app?"
  ];
  const levels = ["Very Dissatisfied", "Somewhat Dissatisfied", "Neither Satisfied nor Dissatisfied", "Somewhat Satisfied", "Very Satisfied"];
  
  let html = '<div style="display: flex; gap: 24px; padding-top: 12px;">';
  
  // Leftmost column for labels
  html += '<div style="flex: 0 0 140px; display: flex; flex-direction: column; justify-content: flex-end; gap: 12px; padding-bottom: 2px;">';
  levels.forEach(l => {
     html += `<div style="font-size: 8px; color: var(--text-secondary); text-align: right; height: 16px; line-height: 16px;">${l}</div>`;
  });
  html += '</div>';

  // 5 Columns of bars
  questions.forEach((q, idx) => {
    html += '<div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">';
    html += `<div style="font-size: 9px; font-weight: 600; margin-bottom: 12px; height: 32px; color: var(--text-primary); opacity: 0.8; line-height: 1.4;">${q}</div>`;
    
    // Generate 5 bars with different widths and color intensities
    const values = [
       [14.3, 14.9, 30.5, 57.2, 11.5],
       [23.2, 19.4, 20.1, 58.4, 20.6],
       [28.4, 17.5, 23.6, 19.5, 29.2],
       [20.3, 17.5, 21.6, 30.9, 28.0],
       [19.1, 19.0, 19.1, 18.8, 24.1]
    ][idx];
    
    const opacities = [0.2, 0.4, 0.6, 0.8, 1.0];
    
    values.forEach((v, i) => {
       html += `
         <div style="display: flex; align-items: center; gap: 8px; height: 16px;">
           <div style="flex: 1; height: 4px; background: rgba(124,58,237,0.05); border-radius: 2px; overflow: hidden; display: flex;">
             <div style="width: ${v}%; height: 100%; background: var(--primary); opacity: ${opacities[i]}; border-radius: 2px;"></div>
           </div>
           <div style="font-size: 8px; color: var(--text-secondary); width: 24px; font-weight: 500;">${v}%</div>
         </div>
       `;
    });
    html += '</div>';
  });
  html += '</div>';
  
  if(txListEl) {
     txListEl.innerHTML = html;
  }

  // Upcoming Renewals for Right Rail
  const renewalsEl = document.getElementById('upcomingRenewalsList');
  if (renewalsEl) {
    const active = state.subscriptions.filter(s => s.status === 'Active');
    if(active.length === 0) {
      renewalsEl.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;">No upcoming renewals.</div>';
    } else {
      renewalsEl.innerHTML = active.slice(0, 4).map((s, i) => {
        let days = (i+1)*3 + (i%2); 
        return `
        <div style="display:flex; align-items:center; justify-content:space-between; padding: 12px; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <div style="display:flex; align-items:center; gap: 12px; min-width: 0;">
            <div style="font-size: 18px; color: var(--text-secondary); width: 36px; height: 36px; background: var(--bg-main); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${s.icon}</div>
            <div style="min-width: 0;">
              <div style="font-weight: 600; font-size: 13px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.name}</div>
              <div style="font-size: 11px; color: var(--text-secondary); font-weight: 500;">In ${days} days</div>
            </div>
          </div>
          <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); flex-shrink: 0;">${formatMoney(s.cost)}</div>
        </div>
        `;
      }).join('');
    }
  }
}

function renderTransactions() {
  const tbody = document.getElementById('fullTxList');
  if(!tbody) return;
  const searchEl = document.getElementById('txSearchFilter');
  const catEl = document.getElementById('txCatFilter');
  const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
  const filterCat = catEl ? catEl.value : 'All';
  
  let filteredTx = state.transactions;
  if(filterCat !== 'All') {
    filteredTx = filteredTx.filter(t => t.category === filterCat);
  }
  if(searchTerm) {
    filteredTx = filteredTx.filter(t => {
      const sub = state.subscriptions.find(s => s.id === t.subId);
      const name = sub ? sub.name.toLowerCase() : 'unknown';
      return name.includes(searchTerm);
    });
  }
  
  if(filteredTx.length === 0) {
    document.getElementById('emptyTxState').style.display = 'block';
    tbody.parentElement.style.display = 'none';
  } else {
    document.getElementById('emptyTxState').style.display = 'none';
    tbody.parentElement.style.display = 'table';
    
    const sortedTx = [...filteredTx].sort((a,b) => new Date(b.date) - new Date(a.date));
    tbody.innerHTML = sortedTx.map(t => {
      const sub = state.subscriptions.find(s => s.id === t.subId);
      return `
      <tr>
        <td style="color:var(--text-secondary);">${t.date}</td>
        <td style="font-weight:600;">${sub ? sub.name : 'Unknown'}</td>
        <td><span class="badge" style="background:var(--bg-main);">${t.category}</span></td>
        <td style="font-weight:700;">${formatMoney(t.amount)}</td>
        <td style="text-align: right;">
          <button class="btn-text" style="color: var(--text-secondary); margin-right: 8px;" onclick="editTx('${t.id}')"><i class="ph ph-pencil-simple"></i></button>
          <button class="btn-text" style="color: var(--red);" onclick="deleteTx('${t.id}')"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
      `;
    }).join('');
  }
}

let currentSubFilter = 'All';

function setSubFilter(status) {
  currentSubFilter = status;
  document.getElementById('subFilterAll').classList.remove('active');
  document.getElementById('subFilterActive').classList.remove('active');
  document.getElementById('subFilterGhost').classList.remove('active');
  
  if(status === 'All') document.getElementById('subFilterAll').classList.add('active');
  if(status === 'Active') document.getElementById('subFilterActive').classList.add('active');
  if(status === 'Ghost') document.getElementById('subFilterGhost').classList.add('active');
  
  renderSubscriptions();
}

function renderSubscriptions() {
  const tbody = document.getElementById('fullSubList');
  if(!tbody) return;
  
  let filteredSubs = state.subscriptions;
  if (currentSubFilter !== 'All') {
    filteredSubs = filteredSubs.filter(s => s.status === currentSubFilter);
  }
  
  if(filteredSubs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--text-secondary);">No subscriptions found.</td></tr>';
  } else {
    tbody.innerHTML = filteredSubs.map(s => {
      let badge = '<span class="badge success">ACTIVE</span>';
      if(s.status === 'Ghost') badge = '<span class="badge badge-ghost">GHOST</span>';
      if(s.status === 'Cancelled') badge = '<span class="badge" style="background:var(--border-medium); color:white;">CANCELLED</span>';
      
      let actionBtn = s.status === 'Cancelled' ? '-' : `<button class="btn-secondary" style="padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('${s.id}')">Manage</button>`;
      if (s.status === 'Ghost') {
        actionBtn = `<button class="btn-primary" style="background:var(--red) !important; color:white !important; border:none; padding: 4px 12px; font-size:12px;" onclick="openGhostDrilldown('${s.id}')">Manage Ghost</button>`;
      }
      
      // Calculate next billing date mock based on cycle
      let nextBillingStr = s.lastTxDate; // Default fallback
      if (s.status !== 'Cancelled') {
         if (s.status === 'Ghost') {
            nextBillingStr = '<span style="color:var(--red); font-weight:600;"><i class="ph ph-warning-circle"></i> Action Required</span>';
         } else {
            let baseDate = new Date(s.lastTxDate || s.added);
            if (s.cycle === 'Monthly') baseDate.setMonth(baseDate.getMonth() + 1);
            if (s.cycle === 'Yearly') baseDate.setFullYear(baseDate.getFullYear() + 1);
            if (s.cycle === 'Weekly') baseDate.setDate(baseDate.getDate() + 7);
            
            const diffDays = Math.ceil((baseDate - new Date()) / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
               nextBillingStr = `In ${diffDays} days`;
            } else {
               nextBillingStr = 'Overdue / Pending';
            }
         }
      } else {
         nextBillingStr = '-';
      }
      
      return `
      <tr style="${s.status === 'Cancelled' ? 'opacity: 0.5;' : ''}">
        <td style="font-weight:600;"><span style="margin-right:8px; display:inline-block; width:24px; text-align:center; background:var(--bg-main); border-radius:4px; padding:4px;">${s.icon}</span> ${s.name}</td>
        <td><span style="color:var(--text-secondary); font-size:13px; font-weight: 500;">${nextBillingStr}</span></td>
        <td style="color:var(--text-secondary);">${s.cycle}</td>
        <td style="font-weight:700;">${formatMoney(s.cost)}</td>
        <td>${badge}</td>
        <td style="text-align: right;">${actionBtn}</td>
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
    const color = isExceeded ? 'var(--red)' : 'var(--blue)';
    
    return `
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="display:flex; align-items:center; gap:8px; color: var(--text-primary);">
            ${b.category} ${isExceeded ? '<i class="ph ph-warning-circle" style="color:var(--red);"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);">${formatMoney(spent)} / ${formatMoney(b.limit)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--border-medium); border-radius:4px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${color}; border-radius:4px;"></div>
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
  const cycle = document.getElementById('addSubCycle').value;
  
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
  
  // Set default amount on change
  select.onchange = (e) => {
    const s = state.subscriptions.find(x => x.id === e.target.value);
    if(s) document.getElementById('addTxAmount').value = s.cost;
  };
  if(activeSubs.length > 0) document.getElementById('addTxAmount').value = activeSubs[0].cost;
  document.getElementById('addTxDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('modal-add-transaction').classList.add('active');
}

function submitTransaction() {
  const subId = document.getElementById('addTxSubId').value;
  const date = document.getElementById('addTxDate').value;
  let overrideAmt = document.getElementById('addTxAmount').value;
  
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
    amount: overrideAmt ? parseFloat(overrideAmt) : sub.cost
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
  
  document.getElementById('ghostModalIcon').innerHTML = sub.icon;
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
        backgroundColor: ['#4a90d9', '#00d4aa', '#ff6b6b', '#f59e0b', '#8E75C8'],
        borderWidth: 0
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
        backgroundColor: '#4a90d9',
        borderRadius: 4
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, grid: { color: '#E5E7EB' }, ticks: {color: 'var(--text-secondary)'} }, x: { grid: { display: false }, ticks: {color: 'var(--text-secondary)'} } }, plugins: { legend: {display:false} } }
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
    return `<tr>
      <td style="color:var(--text-secondary)">${nextDate.toISOString().split('T')[0]}</td>
      <td><strong>${s.name}</strong></td>
      <td style="font-weight:700;">${formatMoney(s.cost)}</td>
    </tr>`;
  }).join('');
}
