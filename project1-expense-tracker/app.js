/* ============================================================
   PROJECT 1 — Gated Flow & State Management
   ============================================================ */

// --- 1. GLOBAL STATE (Single Source of Truth) ---
let state = {
  settings: {
    setupCompleted: false,
    currency: 'USD',
    ghostThreshold: 30
  },
  subscriptions: [],
  purchases: [],
  budgets: [
    { category: 'Entertainment', limit: 50, spent: 0 },
    { category: 'Health', limit: 25, spent: 0 },
    { category: 'Education', limit: 100, spent: 0 }
  ]
};

let currentGhostDrilldown = null;
let chartInstance1 = null;
let chartInstance2 = null;
let chartInstance3 = null;
let chartInstance4 = null;
let chartInstance5 = null;
let chartInstance6 = null;
let chartInstance7 = null;
let chartInstance8 = null;
let chartInstance9 = null;
let chartInstance10 = null;
let chartInstance11 = null;
let chartInstance12 = null;
let chartInstanceCashflow = null;
let chartInstanceSavings = null;
let currentSubFilter = 'All';
let currentAnalyticsRange = 6;

function formatMoney(amount) {
  const v = Number(amount) || 0;
  if (state.settings.currency === 'USD') return `$${v.toFixed(2)}`;
  return `${(v * 25000).toLocaleString('vi-VN')}đ`;
}

// --- 2. VIEW ROUTING & ONBOARDING ---
function switchView(viewId, navEl) {
  if (!state.settings.setupCompleted && viewId !== 'view-onboarding') {
    showToast('Please complete setup first.', '<i class="ph ph-warning-circle" style="color:#F97316;"></i>');
    return;
  }

  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  const rightRail = document.getElementById('rightRail');
  if (rightRail) {
    rightRail.style.setProperty('display', 'flex', 'important');
    renderRightRail(viewId);
  }

  if (navEl) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    navEl.classList.add('active');
  }

  window.scrollTo(0, 0);
  runGhostDetection();
  renderAll(viewId);
}

// --- 2a. ONBOARDING WIZARD (3 steps) ---
let onboardDataSource = 'mock';
let onboardSubs = []; // {id, name, cost, cycle, category}

function goToOnboardStep(step) {
  // Hide all steps
  document.querySelectorAll('.onboard-step').forEach(el => el.classList.remove('active'));

  // Update progress dots
  document.querySelectorAll('.onboard-step-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i < step);
    dot.classList.toggle('completed', i + 1 < step);
  });
  document.querySelectorAll('.onboard-step-line').forEach((line, i) => {
    line.classList.toggle('active', i + 1 < step);
  });

  // Show target step
  const target = document.getElementById('onboardStep' + step);
  if (target) target.classList.add('active');

  // Auto-skip step 2 if user picked "blank" data source and already has subs
  if (step === 2) {
    const picked = document.querySelector('input[name="onboardDataSource"]:checked');
    if (picked && picked.value === 'mock') {
      // Pre-fill mock subs for review
      onboardSubs = [
        { name: 'Netflix', cost: 15.99, cycle: 'Monthly', category: 'Entertainment' },
        { name: 'Spotify', cost: 9.99, cycle: 'Monthly', category: 'Entertainment' },
        { name: 'Gym Membership', cost: 30.00, cycle: 'Monthly', category: 'Health' },
        { name: 'Coursera Plus', cost: 49.00, cycle: 'Monthly', category: 'Education' }
      ];
      renderOnboardSubList();
    } else if (onboardSubs.length === 0) {
      renderOnboardSubList();
    }
  }
}

function renderOnboardSubList() {
  const host = document.getElementById('onboardSubList');
  if (!host) return;
  if (onboardSubs.length === 0) {
    host.innerHTML = '<div style="text-align:center; padding: 30px 20px; color: var(--text-secondary); font-size: 13px; border: 1.5px dashed var(--border-medium); border-radius: 10px;"><i class="ph ph-plus-circle" style="font-size: 28px; display:block; margin-bottom: 8px; color: var(--text-muted);"></i>Click "Add another" below to add your first subscription</div>';
    return;
  }
  host.innerHTML = onboardSubs.map((s, i) => `
    <div style="display: flex; gap: 8px; align-items: center; padding: 8px; background: var(--bg-main); border-radius: 10px;">
      <input type="text" placeholder="Name (e.g. Netflix)" value="${s.name}" onchange="updateOnboardSub(${i}, 'name', this.value)" style="flex: 2; padding: 8px 10px; border: 1px solid var(--border-medium); border-radius: 6px; font-size: 13px; background: var(--bg-card); color: var(--text-primary); font-family: inherit;">
      <input type="number" placeholder="Cost" value="${s.cost}" step="0.01" min="0" onchange="updateOnboardSub(${i}, 'cost', this.value)" style="flex: 1; padding: 8px 10px; border: 1px solid var(--border-medium); border-radius: 6px; font-size: 13px; background: var(--bg-card); color: var(--text-primary); font-family: inherit; min-width: 0;">
      <select onchange="updateOnboardSub(${i}, 'cycle', this.value)" style="padding: 8px 6px; border: 1px solid var(--border-medium); border-radius: 6px; font-size: 13px; background: var(--bg-card); color: var(--text-primary); font-family: inherit;">
        <option ${s.cycle === 'Monthly' ? 'selected' : ''}>Monthly</option>
        <option ${s.cycle === 'Yearly' ? 'selected' : ''}>Yearly</option>
        <option ${s.cycle === 'Weekly' ? 'selected' : ''}>Weekly</option>
      </select>
      <button onclick="removeOnboardSub(${i})" style="background: none; border: none; color: var(--red); cursor: pointer; padding: 6px; font-size: 18px; line-height: 1;" title="Remove"><i class="ph ph-trash"></i></button>
    </div>
  `).join('');
}

function addOnboardSubRow() {
  onboardSubs.push({ name: '', cost: '', cycle: 'Monthly', category: 'Entertainment' });
  renderOnboardSubList();
}

function updateOnboardSub(idx, field, val) {
  if (!onboardSubs[idx]) return;
  if (field === 'cost') val = parseFloat(val) || 0;
  onboardSubs[idx][field] = val;
}

function removeOnboardSub(idx) {
  onboardSubs.splice(idx, 1);
  renderOnboardSubList();
}

function finishOnboardingStep2() {
  // Filter out empty rows
  const valid = onboardSubs.filter(s => s.name && s.name.trim() && s.cost > 0);
  if (valid.length === 0) {
    const hint = document.getElementById('onboardStep2Hint');
    if (hint) hint.style.display = 'block';
    return;
  }
  onboardSubs = valid;
  goToOnboardStep(3);
}

function completeOnboarding() {
  const curr = document.getElementById('onboardCurrency').value;
  const thres = parseInt(document.getElementById('onboardThreshold').value);
  const picked = document.querySelector('input[name="onboardDataSource"]:checked');
  const dataSource = picked ? picked.value : 'mock';

  if (isNaN(thres) || thres < 1) {
    showToast('Invalid threshold', '<i class="ph ph-warning-circle" style="color:#EF4444;"></i>');
    goToOnboardStep(1);
    return;
  }

  state.settings.currency = curr;
  state.settings.ghostThreshold = thres;
  state.settings.setupCompleted = true;

  if (dataSource === 'mock') {
    loadMockData();
  } else {
    // Save user's manually-entered subs
    onboardSubs.forEach(s => {
      state.subscriptions.push({
        id: 's' + Date.now() + Math.random().toString(36).slice(2, 6),
        name: s.name.trim(),
        category: s.category || 'Entertainment',
        cost: s.cost,
        cycle: s.cycle || 'Monthly',
        status: 'Active',
        icon: '<div style="background:var(--primary);color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-sparkle"></i></div>',
        added: new Date().toISOString().split('T')[0],
        snoozeUntil: null,
        ignoreGhost: false
      });
    });
  }

  // Hide onboarding, show overview
  const onboarding = document.getElementById('view-onboarding');
  if (onboarding) onboarding.classList.remove('active');

  const sidebarNav = document.getElementById('sidebarNav');
  if (sidebarNav) {
    sidebarNav.style.pointerEvents = 'auto';
    sidebarNav.style.opacity = '1';
  }

  // Activate the first nav item (Overview)
  const firstNav = document.querySelectorAll('.nav-item')[0];
  switchView('view-overview', firstNav);
  showToast('Setup complete! Welcome to FinTrack.', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
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

  state.purchases = [
    { id: 't1', subId: 's1', date: daysAgo(5),  category: 'Entertainment', amount: 15.99 },
    { id: 't2', subId: 's2', date: daysAgo(2),  category: 'Entertainment', amount: 9.99 },
    { id: 't3', subId: 's3', date: daysAgo(45), category: 'Health',        amount: 30.00 },
    { id: 't4', subId: 's4', date: daysAgo(60), category: 'Education',     amount: 49.00 },
    { id: 't5', subId: 's5', date: daysAgo(3),  category: 'Education',     amount: 52.99 },
    { id: 't6', subId: 's6', date: daysAgo(10), category: 'Entertainment', amount: 14.99 },
    { id: 't7', subId: 's7', date: daysAgo(12), category: 'Education',     amount: 8.00 },
    { id: 't8', subId: 's8', date: daysAgo(35), category: 'Health',        amount: 12.00 },
    { id: 't9',  subId: 's1', date: daysAgo(35), category: 'Entertainment', amount: 15.99 },
    { id: 't10', subId: 's2', date: daysAgo(32), category: 'Entertainment', amount: 9.99 },
    { id: 't11', subId: 's5', date: daysAgo(33), category: 'Education',     amount: 52.99 },
    { id: 't12', subId: 's6', date: daysAgo(40), category: 'Entertainment', amount: 14.99 },
    { id: 't13', subId: 's7', date: daysAgo(42), category: 'Education',     amount: 8.00 }
  ];
}

// --- 3. CORE LOGIC: GHOST DETECTION ---
function runGhostDetection() {
  const today = new Date();
  state.subscriptions.forEach(sub => {
    if (sub.status === 'Cancelled' || sub.ignoreGhost) return;

    const txs = state.purchases.filter(t => t.subId === sub.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    let lastActiveDate = new Date(sub.added);
    if (txs.length > 0) lastActiveDate = new Date(txs[0].date);

    const diffTime = Math.abs(today - lastActiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    sub.daysUnused = diffDays;
    sub.lastTxDate = lastActiveDate.toISOString().split('T')[0];

    if (sub.snoozeUntil && new Date(sub.snoozeUntil) > today) {
      sub.status = 'Active';
      return;
    }

    sub.status = diffDays >= state.settings.ghostThreshold ? 'Ghost' : 'Active';
  });
}

// --- 4. RENDER ROUTER ---
function renderAll(viewId) {
  try {
    renderOverview();
    renderRecurring Bills();
    renderBudget();
    renderAnalytics(viewId);
    renderCashflow();
    renderUpcomingRenewals();
    renderGhostBanner(viewId);
  } catch (err) {
    document.body.innerHTML += `<div style="position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;width:100%;"><b>JS ERROR in renderAll:</b> ${err.message}<br><pre>${err.stack}</pre></div>`;
    console.error(err);
  }
}

// --- 4a.5 GHOST HERO BANNER (Phase 2: value moment) ---
function getGhostList() {
  return state.subscriptions.filter(s => s.status === 'Ghost');
}

function renderGhostBanner(viewId) {
  const banner = document.getElementById('ghostHeroBanner');
  if (!banner) return;

  // Only show on Overview
  if (viewId && viewId !== 'view-overview') {
    banner.style.display = 'none';
    return;
  }

  const ghosts = getGhostList();
  const dismissed = sessionStorage.getItem('fintrack_ghostBannerDismissed') === '1';

  if (ghosts.length === 0) {
    banner.style.display = 'none';
    // Reset dismiss state if ghosts all resolved
    if (dismissed) sessionStorage.removeItem('fintrack_ghostBannerDismissed');
    return;
  }

  // If ghost count changed (e.g. user added new), reset dismiss
  const lastSeenCount = parseInt(sessionStorage.getItem('fintrack_ghostBannerLastSeen') || '0');
  if (lastSeenCount !== ghosts.length) {
    sessionStorage.setItem('fintrack_ghostBannerLastSeen', String(ghosts.length));
    if (dismissed) {
      sessionStorage.removeItem('fintrack_ghostBannerDismissed');
    }
  }

  if (sessionStorage.getItem('fintrack_ghostBannerDismissed') === '1') {
    banner.style.display = 'none';
    return;
  }

  const totalSavings = ghosts.reduce((sum, g) => sum + g.cost * 12, 0);
  const countEl = document.getElementById('ghostHeroCount');
  const countS = document.getElementById('ghostHeroCountS');
  const saveEl = document.getElementById('ghostHeroSavings');
  if (countEl) countEl.textContent = ghosts.length;
  if (countS) countS.textContent = ghosts.length === 1 ? '' : 's';
  if (saveEl) saveEl.textContent = formatMoney(totalSavings) + ' / year';

  banner.style.display = 'block';
}

function dismissGhostBanner() {
  sessionStorage.setItem('fintrack_ghostBannerDismissed', '1');
  const banner = document.getElementById('ghostHeroBanner');
  if (banner) banner.style.display = 'none';
}

function openGhostDetailDrawer() {
  const ghosts = getGhostList().sort((a, b) => (b.cost * 12) - (a.cost * 12));
  if (ghosts.length === 0) {
    showToast('No ghost subscriptions found 🎉', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
    return;
  }

  const totalSavings = ghosts.reduce((sum, g) => sum + g.cost * 12, 0);
  const totalEl = document.getElementById('ghostDrawerTotalSavings');
  const countEl = document.getElementById('ghostDrawerCount');
  if (totalEl) totalEl.textContent = formatMoney(totalSavings);
  if (countEl) countEl.textContent = ghosts.length + ' ghost' + (ghosts.length === 1 ? '' : 's');

  const listEl = document.getElementById('ghostDrawerList');
  if (listEl) {
    listEl.innerHTML = ghosts.map(g => {
      const sub = state.subscriptions.find(s => s.id === g.id);
      return `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">${sub ? sub.icon : '📦'}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${sub ? sub.name : 'Unknown'}</div>
            <div style="font-size: 12px; color: var(--red); font-weight: 500;">Unused ${g.daysUnused || 0} days · ${formatMoney(g.cost)}/mo</div>
          </div>
          <div style="text-align: right; flex-shrink: 0;">
            <div style="font-size: 11px; color: var(--text-secondary);">Save</div>
            <div style="font-weight: 700; font-size: 14px; color: var(--teal);">${formatMoney(g.cost * 12)}/yr</div>
          </div>
          <button class="btn-primary" style="padding: 8px 14px; font-size: 12px; background: var(--red) !important;" onclick="openGhostDrilldown('${g.id}'); closeModal('modal-ghost-detail-drawer');">Act</button>
        </div>
      `;
    }).join('');
  }

  document.getElementById('modal-ghost-detail-drawer').classList.add('active');
}

function kpiCard(label, value, sub, badge) {
  return `
    <div style="padding: 20px 24px; border-right: 1px solid var(--border-light);">
      <div style="font-size: 13px; color: var(--text-secondary); font-weight: 500; margin-bottom: 8px;">${label}</div>
      <div style="font-size: 1.875rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; line-height: 1.1;">${value}</div>
      ${sub ? `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">${sub}</div>` : ''}
      ${badge ? `<div style="margin-top: 8px;"><span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; background: var(--primary-light); color: var(--primary); border-radius: 50px; font-size: 11px; font-weight: 600;">${badge}</span></div>` : ''}
    </div>
  `;
}

function kpiGrid(kpis) {
  return kpis.map((k, i) => `
    <div style="padding: 0;${i < kpis.length - 1 ? ' border-right: 1px solid var(--border-light);' : ''}">
      ${kpiCard(k.label, k.value, k.sub, k.badge)}
    </div>
  `).join('');
}

// --- 4a. RIGHT RAIL ---
function renderRightRail(viewId) {
  const rightRail = document.getElementById('rightRail');
  if (!rightRail) return;

  if (viewId === 'view-overview') {
    rightRail.innerHTML = `
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-calendar-blank"></i> Upcoming Renewals
        </h3>
        <div id="upcomingRenewalsList" style="display: flex; flex-direction: column; gap: 16px;"></div>
        <button class="btn-secondary" style="width: 100%; margin-top: 20px;" onclick="switchView('view-cashflow', document.querySelectorAll('.nav-item')[3])">View All</button>
      </div>
    `;
    renderUpcomingRenewals();
  } else if (viewId === 'view-subscriptions') {
    rightRail.innerHTML = `
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-heartbeat"></i> Subscription Health
        </h3>
        <canvas id="rrHealthChart" width="200" height="200"></canvas>
      </div>
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-calendar-blank"></i> Renewal Calendar (Next 7D)
        </h3>
        <div id="subRenewalCalendar" style="display: flex; flex-direction: column; gap: 16px;"></div>
      </div>
    `;
    setTimeout(() => {
      const active = state.subscriptions.filter(s => s.status === 'Active').length;
      const ghost = state.subscriptions.filter(s => s.status === 'Ghost').length;
      const ctx = document.getElementById('rrHealthChart');
      if (ctx) {
        if (chartInstance3) chartInstance3.destroy();
        chartInstance3 = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Active', 'Ghost'],
            datasets: [{ data: [active, ghost], backgroundColor: ['#10B981', '#EF4444'], borderWidth: 0 }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#1C2434' } } } }
        });
      }
    }, 0);
  } else if (viewId === 'view-analytics') {
    rightRail.innerHTML = `
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-fire"></i> Peak Spending Day
        </h3>
        <div style="font-size: 24px; font-weight: 700;">Saturday</div>
      </div>
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-shield-check"></i> Best Streak
        </h3>
        <div style="font-size: 24px; font-weight: 700; color: var(--teal);">14 Days</div>
        <div style="font-size: 12px; color: var(--text-secondary);">Without ghost trigger</div>
      </div>
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-chart-line-up"></i> Annual Forecast
        </h3>
        <div style="font-size: 24px; font-weight: 700;">${formatMoney(state.subscriptions.filter(s => s.status !== 'Cancelled').reduce((sum, s) => sum + s.cost, 0) * 12)}</div>
      </div>
    `;
  } else if (viewId === 'view-cashflow') {
    rightRail.innerHTML = `
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-money"></i> Recent Income
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-light); padding-bottom:8px;">
             <span>Salary (Stripe)</span><span style="font-weight:600; color:var(--teal);">+$3,200.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--border-light); padding-bottom:8px;">
             <span>Freelance Upwork</span><span style="font-weight:600; color:var(--teal);">+$450.00</span>
          </div>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-target"></i> Savings Goal
        </h3>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; font-weight: 600;">Buy a Laptop</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">60%</div>
        <div style="width: 100%; height: 8px; background: var(--bg-main); border-radius: 4px; overflow: hidden;">
          <div style="width: 60%; height: 100%; background: var(--teal); border-radius: 4px;"></div>
        </div>
      </div>
    `;
  } else if (viewId === 'view-budget') {
    rightRail.innerHTML = `
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-clock-counter-clockwise"></i> Budget History (3M)
        </h3>
        <div style="display:flex; align-items:flex-end; gap:8px; height:60px; margin-top:16px;">
          <div style="flex:1; background:var(--blue); height:40%; border-radius:4px 4px 0 0;" title="3 Months Ago"></div>
          <div style="flex:1; background:var(--blue); height:70%; border-radius:4px 4px 0 0;" title="2 Months Ago"></div>
          <div style="flex:1; background:var(--teal); height:55%; border-radius:4px 4px 0 0;" title="Last Month"></div>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i class="ph ph-warning"></i> Categories Over Budget
        </h3>
        <div id="rrOverBudgetList" style="display: flex; flex-direction: column; gap: 12px;"></div>
      </div>
    `;
    setTimeout(() => {
      const over = state.budgets.filter(b => {
        const spent = state.purchases.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0);
        return spent > b.limit;
      });
      const el = document.getElementById('rrOverBudgetList');
      if (el) {
        if (over.length === 0) el.innerHTML = '<div style="font-size:13px; color:var(--text-secondary);">All good — no overruns.</div>';
        else el.innerHTML = over.map(b => `<div style="display:flex; justify-content:space-between; font-size:13px;"><span>${b.category}</span><span style="color:var(--red); font-weight:600;">Exceeded</span></div>`).join('');
      }
    }, 0);
  } else {
    rightRail.innerHTML = '';
  }
}

function renderUpcomingRenewals() {
  const renewalsEl = document.getElementById('upcomingRenewalsList');
  if (!renewalsEl) return;
  const active = state.subscriptions.filter(s => s.status === 'Active');
  if (active.length === 0) {
    renewalsEl.innerHTML = '<div style="color:var(--text-secondary); font-size:13px;">No upcoming renewals.</div>';
    return;
  }
  renewalsEl.innerHTML = active.slice(0, 4).map((s, i) => {
    const days = (i + 1) * 3 + (i % 2);
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

// --- 4b. OVERVIEW ---
function renderOverview() {
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');
  const totalCost = activeSubs.reduce((sum, s) => sum + s.cost, 0);
  const activeCount = activeSubs.filter(s => s.status === 'Active').length;
  const ghostCount = state.subscriptions.filter(s => s.status === 'Ghost').length;
  const ghostCost = state.subscriptions.filter(s => s.status === 'Ghost').reduce((sum, g) => sum + g.cost, 0);
  const potentialSavings = ghostCost * 12;

  // KPI grid
  const gridEl = document.getElementById('overviewKPIsGrid');
  if (gridEl) {
    gridEl.innerHTML = `
      <div style="padding: 24px; border-right: 1px solid var(--border-light);">
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">Total Monthly Cost</div>
        <div style="display: flex; align-items: flex-end; gap: 12px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">${formatMoney(totalCost)}</div>
        </div>
      </div>
      <div style="padding: 24px; border-right: 1px solid var(--border-light);">
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">Potential Yearly Savings</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">${formatMoney(potentialSavings)}</div>
          <div style="background: var(--primary-light); color: var(--primary); padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">Ghost Subs</div>
        </div>
      </div>
      <div style="padding: 24px; border-right: 1px solid var(--border-light);">
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">Active Recurring Bills</div>
        <div style="display: flex; align-items: flex-end; gap: 12px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">${activeCount}</div>
        </div>
      </div>
      <div style="padding: 24px;">
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">Ghost Alerts</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">${ghostCount}</div>
          ${ghostCount > 0 ? '<div style="background: var(--red-light); color: var(--red); padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">Action Required</div>' : ''}
        </div>
      </div>
    `;
  }

  // Charts - reset canvas
  const donutHost = document.getElementById('overviewSpendingByCategory');
  const barHost = document.getElementById('overviewSubscriptionHealth');
  if (donutHost) donutHost.innerHTML = '<canvas id="ovDonutChart"></canvas>';
  if (barHost) barHost.innerHTML = '<canvas id="ovBarChart"></canvas>';

  bindOverviewCharts();

  // Recent purchases list
  const txListEl = document.getElementById('overviewTxList');
  if (txListEl) {
    if (state.purchases.length === 0) {
      txListEl.innerHTML = '<div style="color:var(--text-secondary); font-size:13px; padding:12px 0;">No recent purchases</div>';
    } else {
      const sortedTx = [...state.purchases].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      txListEl.innerHTML = sortedTx.map(t => {
        const sub = state.subscriptions.find(s => s.id === t.subId);
        return `
          <div style="display:flex; align-items:center; justify-content:space-between; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
            <div style="display:flex; align-items:center; gap: 12px; min-width: 0;">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--bg-main); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">${sub ? sub.icon : '📦'}</div>
              <div style="min-width: 0;">
                <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">${sub ? sub.name : 'Unknown'}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${t.category} • ${t.date}</div>
              </div>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: var(--text-primary); flex-shrink: 0;">${formatMoney(t.amount)}</div>
          </div>
        `;
      }).join('');
    }
  }
}

function bindOverviewCharts() {
  setTimeout(() => {
    const dCtx = document.getElementById('ovDonutChart');
    if (dCtx) {
      if (chartInstance4) chartInstance4.destroy();
      chartInstance4 = new Chart(dCtx, {
        type: 'doughnut',
        data: {
          labels: ['Entertainment', 'Health', 'Education'],
          datasets: [{ data: [45, 25, 30], backgroundColor: ['#3C50E0', '#80CAEE', '#E2E8F0'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }

    const bCtx = document.getElementById('ovBarChart');
    if (bCtx) {
      if (chartInstance5) chartInstance5.destroy();
      chartInstance5 = new Chart(bCtx, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{ data: [30, 45, 60, 20], backgroundColor: ['#E2E8F0', '#80CAEE', '#3C50E0', '#E2E8F0'], borderRadius: 4 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, border: { display: false } }, y: { display: false } }
        }
      });
    }
  }, 0);
}

// --- 4c. SUBSCRIPTIONS ---
function setSubFilter(status) {
  currentSubFilter = status;
  ['subFilterAll', 'subFilterActive', 'subFilterGhost'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const idMap = { 'All': 'subFilterAll', 'Active': 'subFilterActive', 'Ghost': 'subFilterGhost' };
  const activeEl = document.getElementById(idMap[status]);
  if (activeEl) activeEl.classList.add('active');
  renderRecurring Bills();
}

function renderRecurring Bills() {
  const tbody = document.getElementById('fullSubList');
  if (!tbody) return;

  const activeCount = state.subscriptions.filter(s => s.status === 'Active').length;
  const ghostCount = state.subscriptions.filter(s => s.status === 'Ghost').length;
  const cancelledCount = state.subscriptions.filter(s => s.status === 'Cancelled').length;
  const monthlyCost = state.subscriptions.filter(s => s.status !== 'Cancelled').reduce((s, x) => s + x.cost, 0);
  const ghostCost = state.subscriptions.filter(s => s.status === 'Ghost').reduce((s, x) => s + x.cost, 0);

  // KPIs
  const kpiEl = document.getElementById('subscriptionsKPIsGrid');
  if (kpiEl) {
    kpiEl.innerHTML = kpiGrid([
      { label: 'Total Recurring Bills', value: state.subscriptions.length, sub: `${cancelledCount} cancelled` },
      { label: 'Active', value: activeCount, badge: 'Healthy' },
      { label: 'Ghost Alerts', value: ghostCount, sub: ghostCount > 0 ? `Bleeding ${formatMoney(ghostCost)}/mo` : 'No leaks', badge: ghostCount > 0 ? 'Action Required' : 'All Clear' },
      { label: 'Monthly Cost', value: formatMoney(monthlyCost), sub: `Yearly: ${formatMoney(monthlyCost * 12)}` }
    ]);
  }

  // Charts
  setTimeout(() => {
    const statusCtx = document.getElementById('subStatusChart');
    if (statusCtx) {
      if (chartInstance9) chartInstance9.destroy();
      chartInstance9 = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'Ghost', 'Cancelled'],
          datasets: [{
            data: [activeCount, ghostCount, cancelledCount],
            backgroundColor: ['#10B981', '#EF4444', '#94A3B8'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#1C2434', padding: 12, font: { size: 12 } } } }
        }
      });
    }

    const catCtx = document.getElementById('subCategoryChart');
    if (catCtx) {
      if (chartInstance10) chartInstance10.destroy();
      const catMap = {};
      state.subscriptions.filter(s => s.status !== 'Cancelled').forEach(s => {
        catMap[s.category] = (catMap[s.category] || 0) + s.cost;
      });
      chartInstance10 = new Chart(catCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(catMap),
          datasets: [{
            label: 'Cost',
            data: Object.values(catMap),
            backgroundColor: ['#3C50E0', '#10B981', '#F59E0B', '#EF4444', '#7C3AED'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
        }
      });
    }
  }, 0);

  let filteredSubs = state.subscriptions;
  if (currentSubFilter !== 'All') filteredSubs = filteredSubs.filter(s => s.status === currentSubFilter);

  if (filteredSubs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--text-secondary);">No subscriptions found.</td></tr>';
    return;
  }

  tbody.innerHTML = filteredSubs.map(s => {
    let badge = '<span class="badge success">ACTIVE</span>';
    if (s.status === 'Ghost') badge = '<span class="badge-ghost">GHOST</span>';
    if (s.status === 'Cancelled') badge = '<span class="badge-neutral">CANCELLED</span>';

    let actionBtn = s.status === 'Cancelled' ? '<span style="color:var(--text-muted);">-</span>' : `<button class="btn-secondary" style="padding: 6px 16px; font-size: 12px;" onclick="openGhostDrilldown('${s.id}')">Manage</button>`;
    if (s.status === 'Ghost') {
      actionBtn = `<button class="btn-primary" style="padding: 6px 16px; font-size: 12px; background: var(--red) !important;" onclick="openGhostDrilldown('${s.id}')">Manage Ghost</button>`;
    }

    let nextBillingStr = '-';
    if (s.status !== 'Cancelled') {
      if (s.status === 'Ghost') {
        nextBillingStr = '<span style="color: var(--red); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"><i class="ph ph-warning-circle"></i> Action Required</span>';
      } else {
        let baseDate = new Date(s.lastTxDate || s.added);
        if (s.cycle === 'Monthly') baseDate.setMonth(baseDate.getMonth() + 1);
        if (s.cycle === 'Yearly') baseDate.setFullYear(baseDate.getFullYear() + 1);
        if (s.cycle === 'Weekly') baseDate.setDate(baseDate.getDate() + 7);

        const diffDays = Math.ceil((baseDate - new Date()) / (1000 * 60 * 60 * 24));
        nextBillingStr = diffDays > 0 ? `In ${diffDays} days` : 'Overdue / Pending';
      }
    }

    return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 ${s.status === 'Cancelled' ? 'opacity-50' : ''}">
        <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="width:36px; height:36px; border-radius:8px; background:#F1F5F9; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${s.icon}</span>
            <span>${s.name}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${nextBillingStr}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${s.cycle}</td>
        <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900 dark:text-white">${formatMoney(s.cost)}</td>
        <td class="px-6 py-4 whitespace-nowrap">${badge}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">${actionBtn}</td>
      </tr>
    `;
  }).join('');
}

// --- 4d. BUDGET ---
function renderBudget() {
  const container = document.getElementById('budgetList');
  if (!container) return;

  const totalLimit = state.budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = state.budgets.reduce((s, b) => {
    return s + state.purchases.filter(t => t.category === b.category).reduce((ss, t) => ss + t.amount, 0);
  }, 0);
  const overCount = state.budgets.filter(b => {
    const spent = state.purchases.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0);
    return spent > b.limit;
  }).length;
  const remaining = totalLimit - totalSpent;

  // KPIs
  const kpiEl = document.getElementById('budgetKPIsGrid');
  if (kpiEl) {
    kpiEl.innerHTML = kpiGrid([
      { label: 'Total Budget', value: formatMoney(totalLimit), sub: `${state.budgets.length} categories` },
      { label: 'Total Spent', value: formatMoney(totalSpent), sub: `${totalLimit ? Math.round((totalSpent/totalLimit)*100) : 0}% of budget` },
      { label: 'Over Budget', value: overCount, sub: overCount > 0 ? 'Action needed' : 'On track', badge: overCount > 0 ? 'Review' : 'OK' },
      { label: 'Remaining', value: formatMoney(remaining), sub: remaining >= 0 ? 'Under budget' : 'Over budget' }
    ]);
  }

  // Charts
  setTimeout(() => {
    const utilCtx = document.getElementById('budgetUtilChart');
    if (utilCtx) {
      if (chartInstance11) chartInstance11.destroy();
      const pct = totalLimit ? Math.round((totalSpent / totalLimit) * 100) : 0;
      chartInstance11 = new Chart(utilCtx, {
        type: 'doughnut',
        data: {
          labels: ['Spent', 'Remaining'],
          datasets: [{
            data: [totalSpent, Math.max(0, remaining)],
            backgroundColor: [totalSpent > totalLimit ? '#EF4444' : '#3C50E0', '#E2E8F0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#1C2434', padding: 12 } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${formatMoney(ctx.parsed)}`
              }
            }
          }
        }
      });
    }

    const catCtx = document.getElementById('budgetCatChart');
    if (catCtx) {
      if (chartInstance12) chartInstance12.destroy();
      const labels = state.budgets.map(b => b.category);
      const data = state.budgets.map(b => state.purchases.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0));
      chartInstance12 = new Chart(catCtx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: 'Spent', data, backgroundColor: '#3C50E0', borderRadius: 6 },
            { label: 'Limit', data: state.budgets.map(b => b.limit), backgroundColor: '#E2E8F0', borderRadius: 6 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#1C2434', padding: 12 } } },
          scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
        }
      });
    }
  }, 0);

  // List
  container.innerHTML = state.budgets.map(b => {
    const spent = state.purchases.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0);
    const pct = Math.min(100, Math.round((spent / b.limit) * 100));
    const isExceeded = spent > b.limit;
    const color = isExceeded ? 'var(--red)' : (pct > 80 ? 'var(--orange)' : 'var(--blue)');

    return `
      <div style="margin-bottom: 24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; align-items: center;">
          <strong style="display:flex; align-items:center; gap:8px; color: var(--text-primary); font-size: 14px;">
            ${b.category} ${isExceeded ? '<i class="ph ph-warning-circle" style="color:var(--red);"></i>' : ''}
          </strong>
          <span style="font-size:13px; color:var(--text-secondary);"><strong style="color:var(--text-primary);">${formatMoney(spent)}</strong> / ${formatMoney(b.limit)}</span>
        </div>
        <div style="width:100%; height:8px; background:var(--border-medium); border-radius:4px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${color}; border-radius:4px; transition: width 0.6s ease;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// --- 4e. ANALYTICS ---
function renderAnalytics(viewId) {
  if (!document.getElementById('categoryChart')) return;
  if (viewId && viewId !== 'view-analytics') return;

  const ctx1 = document.getElementById('categoryChart').getContext('2d');
  const ctx2 = document.getElementById('trendChart').getContext('2d');
  const ctx3 = document.getElementById('ghostSavingsChart').getContext('2d');

  const catTotals = {};
  state.purchases.forEach(t => {
    catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
  });

  // KPIs
  const totalSpent = state.purchases.reduce((s, t) => s + t.amount, 0);
  const months = Object.keys(catTotals).length || 1;
  const avgMonthly = totalSpent / months;
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
  const avgPerDay = state.purchases.length ? totalSpent / state.purchases.length : 0;

  const kpiEl = document.getElementById('analyticsKPIsGrid');
  if (kpiEl) {
    kpiEl.innerHTML = kpiGrid([
      { label: 'Total Spend', value: formatMoney(totalSpent), sub: `${state.purchases.length} purchases` },
      { label: 'Avg Monthly', value: formatMoney(avgMonthly), sub: `${months} categories` },
      { label: 'Top Category', value: topCat ? topCat[0] : '—', sub: topCat ? formatMoney(topCat[1]) : '' },
      { label: 'Avg per Transaction', value: formatMoney(avgPerDay) }
    ]);
  }

  if (chartInstance1) chartInstance1.destroy();
  chartInstance1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: Object.keys(catTotals),
      datasets: [{
        data: Object.values(catTotals),
        backgroundColor: ['#3C50E0', '#10B981', '#EF4444', '#F59E0B', '#7C3AED'],
        borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#1C2434' } } } }
  });

  renderAnalyticsTrend(currentAnalyticsRange);

  if (chartInstance6) chartInstance6.destroy();
  chartInstance6 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
      datasets: [{
        label: 'Ghost Savings',
        data: [12, 18, 25, 30, 28, 35, 42, 50, 48, 55, 62, 70],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#10B981'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
    }
  });

  renderAnalyticsHeatmap();
}

function setTrendRange(months) {
  currentAnalyticsRange = months;
  ['trendBtn6', 'trendBtn12', 'trendBtnAll'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const idMap = { 6: 'trendBtn6', 12: 'trendBtn12', 0: 'trendBtnAll' };
  const activeEl = document.getElementById(idMap[months]);
  if (activeEl) activeEl.classList.add('active');
  renderAnalyticsTrend(months);
}

function renderAnalyticsTrend(months) {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let labels, data;
  if (months === 6) {
    labels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    data = [110, 130, 125, 145, 160, 150];
  } else if (months === 12) {
    labels = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    data = [95, 105, 110, 120, 135, 115, 110, 130, 125, 145, 160, 150];
  } else {
    labels = ['2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3'];
    data = [310, 340, 360, 380, 410, 425, 440, 460, 480];
  }

  if (chartInstance2) chartInstance2.destroy();
  chartInstance2 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Spending',
        data,
        backgroundColor: '#3C50E0',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
    }
  });
}

function renderAnalyticsHeatmap() {
  const host = document.getElementById('analyticsHeatmap');
  if (!host) return;
  const weeks = 12;
  const days = 7;
  let html = '';
  for (let w = 0; w < weeks; w++) {
    html += '<div style="display:flex; flex-direction:column; gap:4px;">';
    for (let d = 0; d < days; d++) {
      const intensity = Math.random();
      const alpha = 0.05 + intensity * 0.7;
      html += `<div style="width:14px; height:14px; border-radius:3px; background: rgba(60, 80, 224, ${alpha});"></div>`;
    }
    html += '</div>';
  }
  html += '<div style="display:flex; flex-direction:column; gap:4px; margin-left:8px; justify-content: flex-end; font-size:11px; color: var(--text-muted); align-self: center;">Less <div style="display:flex; gap:4px;">';
  for (let i = 0; i < 5; i++) {
    html += `<div style="width:14px; height:14px; border-radius:3px; background: rgba(60, 80, 224, ${0.1 + i * 0.2});"></div>`;
  }
  html += '</div> More</div>';
  host.innerHTML = html;
}

// --- 4f. CASHFLOW ---
function renderCashflow() {
  const tbody = document.getElementById('cashflowForecastList');

  const monthly = state.subscriptions.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.cost, 0);
  const monthlyIncome = 3200 + (Math.random() * 500);
  const netSavings = monthlyIncome - monthly;
  const savingsRate = monthlyIncome ? Math.round((netSavings / monthlyIncome) * 100) : 0;
  const annualSavings = netSavings * 12;

  // KPIs
  const kpiEl = document.getElementById('cashflowKPIsGrid');
  if (kpiEl) {
    kpiEl.innerHTML = kpiGrid([
      { label: 'Monthly Income', value: formatMoney(monthlyIncome), sub: 'Avg last 3 months' },
      { label: 'Monthly Expenses', value: formatMoney(monthly), sub: `${state.subscriptions.filter(s => s.status === 'Active').length} active subs` },
      { label: 'Net Savings', value: formatMoney(netSavings), sub: `${savingsRate}% savings rate`, badge: savingsRate >= 50 ? 'Healthy' : 'Warning' },
      { label: 'Annual Forecast', value: formatMoney(annualSavings), sub: 'Projected yearly' }
    ]);
  }

  if (tbody) {
    const months = ['Next Month', 'Month +2', 'Month +3'];
    tbody.innerHTML = months.map((m, i) => {
      const projectedIncome = monthlyIncome + (i * 50);
      const projectedExpense = monthly + (i * 10);
      const projectedNet = projectedIncome - projectedExpense;
      return `<tr>
        <td style="padding: 12px 16px; color: var(--text-primary); font-weight: 500;">${m}</td>
        <td style="padding: 12px 16px; color: var(--teal); font-weight: 600;">${formatMoney(projectedIncome)}</td>
        <td style="padding: 12px 16px; color: var(--red); font-weight: 600;">${formatMoney(projectedExpense)}</td>
        <td style="padding: 12px 16px; font-weight: 700; color: ${projectedNet >= 0 ? 'var(--primary)' : 'var(--red)'};">${formatMoney(projectedNet)}</td>
      </tr>`;
    }).join('');
  }

  const ctx = document.getElementById('cashflowChart');
  if (ctx) {
    if (chartInstanceCashflow) chartInstanceCashflow.destroy();
    chartInstanceCashflow = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          { label: 'Income', data: [3200, 3200, 3650, 3200, 3650, 3200, 3650], backgroundColor: '#10B981', borderRadius: 4 },
          { label: 'Expense', data: [180, 220, 195, 240, 210, 230, 200], backgroundColor: '#EF4444', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#1C2434' } } },
        scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
      }
    });
  }

  const srCtx = document.getElementById('savingsRateChart');
  if (srCtx) {
    if (chartInstanceSavings) chartInstanceSavings.destroy();
    chartInstanceSavings = new Chart(srCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Savings Rate',
          data: [82, 75, 80, 72, 78, 74, 79],
          borderColor: '#3C50E0',
          backgroundColor: 'rgba(60, 80, 224, 0.15)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#3C50E0'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100, grid: { color: '#E2E8F0' }, ticks: { color: '#64748B', callback: (v) => v + '%' } }, x: { grid: { display: false }, ticks: { color: '#64748B' } } }
      }
    });
  }
}

// --- 5. MODALS & FORMS ---
function openAddSubModal() {
  document.getElementById('modal-add-sub').classList.add('active');
}

function submitSubscription() {
  const name = document.getElementById('addSubName').value.trim();
  const cost = parseFloat(document.getElementById('addSubCost').value);
  const cat = document.getElementById('addSubCat').value;
  const cycleEl = document.getElementById('addSubCycle');
  const cycle = cycleEl ? cycleEl.value : 'Monthly';

  if (!name || isNaN(cost) || cost <= 0) {
    showToast('Name and cost > 0 are required', '<i class="ph ph-warning-circle" style="color:#EF4444;"></i>');
    return;
  }
  if (state.subscriptions.some(s => s.name.toLowerCase() === name.toLowerCase() && s.status !== 'Cancelled')) {
    showToast('Active subscription with this name already exists!', '<i class="ph ph-warning-circle" style="color:#F59E0B;"></i>');
    return;
  }

  state.subscriptions.push({
    id: 's' + Date.now(),
    name, category: cat, cost, cycle, status: 'Active',
    icon: '<div style="background:var(--primary);color:white;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="ph-fill ph-sparkle"></i></div>',
    added: new Date().toISOString().split('T')[0],
    snoozeUntil: null,
    ignoreGhost: false
  });

  closeModal('modal-add-sub');
  document.getElementById('addSubName').value = '';
  document.getElementById('addSubCost').value = '';
  showToast('Subscription added', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
}

function openAddTransactionModal() {
  const select = document.getElementById('addTxSubId');
  const activeSubs = state.subscriptions.filter(s => s.status !== 'Cancelled');

  if (activeSubs.length === 0) {
    showToast('Please add a subscription first.', '<i class="ph ph-warning-circle" style="color:#F59E0B;"></i>');
    return;
  }

  select.innerHTML = activeSubs.map(s => `<option value="${s.id}">${s.name} (${formatMoney(s.cost)})</option>`).join('');
  const amountInput = document.getElementById('addTxAmount');
  if (amountInput) amountInput.value = activeSubs[0].cost;
  select.onchange = (e) => {
    const s = state.subscriptions.find(x => x.id === e.target.value);
    if (s && amountInput) amountInput.value = s.cost;
  };
  document.getElementById('addTxDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('modal-add-transaction').classList.add('active');
}

function submitTransaction() {
  const subId = document.getElementById('addTxSubId').value;
  const date = document.getElementById('addTxDate').value;
  const amountInput = document.getElementById('addTxAmount');
  const overrideAmt = amountInput ? parseFloat(amountInput.value) : null;

  if (!subId) {
    showToast('Please select a subscription', '<i class="ph ph-warning-circle" style="color:#EF4444;"></i>');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  if (date > today) {
    showToast('Transaction date cannot be in the future!', '<i class="ph ph-warning-circle" style="color:#EF4444;"></i>');
    return;
  }

  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;

  const amount = overrideAmt && !isNaN(overrideAmt) ? overrideAmt : sub.cost;

  state.purchases.unshift({
    id: 't' + Date.now(),
    subId: sub.id,
    date: date,
    category: sub.category,
    amount: amount
  });

  closeModal('modal-add-transaction');
  showToast('Transaction recorded!', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
}

function deleteTx(id) {
  state.purchases = state.purchases.filter(t => t.id !== id);
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
  showToast('Transaction deleted', '<i class="ph ph-trash" style="color:#EF4444;"></i>');
}

function editTx(id) {
  showToast('Edit functionality coming soon', '<i class="ph ph-info" style="color:#3C50E0;"></i>');
}

function openGhostDrilldown(subId) {
  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;
  currentGhostDrilldown = subId;

  const txs = state.purchases.filter(t => t.subId === sub.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const timelineEl = document.getElementById('ghostModalTimeline');

  if (txs.length === 0) {
    timelineEl.innerHTML = '<div style="font-size:12px; color:var(--text-secondary);">No purchases found.</div>';
  } else {
    timelineEl.innerHTML = txs.slice(0, 3).map(t => `
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; padding:8px 12px; background: var(--bg-main); border-radius:6px;">
        <span style="color:var(--text-secondary);">${t.date}</span>
        <strong>${formatMoney(t.amount)}</strong>
      </div>
    `).join('');
  }

  document.getElementById('ghostModalIcon').innerHTML = sub.icon;
  document.getElementById('ghostModalTitle').innerText = sub.name;
  document.getElementById('ghostModalDays').innerText = (sub.daysUnused || 0) + ' days';
  document.getElementById('ghostModalBleed').innerText = `${formatMoney(sub.cost)}/mo`;
  document.getElementById('ghostModalSave').innerText = formatMoney(sub.cost * 12) + ' / year';

  document.getElementById('modal-ghost-drilldown').classList.add('active');
}

function confirmCancelGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if (sub) sub.status = 'Cancelled';
  closeModal('modal-ghost-drilldown');
  showToast('Subscription Cancelled. Added to Savings!', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
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
  showToast('Ghost alert snoozed for 7 days', '<i class="ph ph-clock" style="color:#3C50E0;"></i>');
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
}

function keepGhost() {
  if (!currentGhostDrilldown) return;
  const sub = state.subscriptions.find(s => s.id === currentGhostDrilldown);
  if (sub) {
    sub.ignoreGhost = true;
    sub.status = 'Active';
  }
  closeModal('modal-ghost-drilldown');
  showToast('Algorithm updated. Will ignore this sub.', '<i class="ph ph-brain" style="color:#10B981;"></i>');
  runGhostDetection();
  renderAll(document.querySelector('.view-section.active')?.id);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function showToast(message, icon = '<i class="ph ph-info" style="color:#10B981;"></i>') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(120%)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

function openBudgetModal() {
  document.getElementById('modal-edit-budget').classList.add('active');
}

function saveBudget() {
  const cat = document.getElementById('editBudgetCat').value;
  const limit = parseFloat(document.getElementById('editBudgetLimit').value);
  if (isNaN(limit) || limit <= 0) {
    showToast('Invalid limit', '<i class="ph ph-warning-circle" style="color:#EF4444;"></i>');
    return;
  }

  let b = state.budgets.find(x => x.category === cat);
  if (b) b.limit = limit;
  else state.budgets.push({ category: cat, limit, spent: 0 });

  closeModal('modal-edit-budget');
  renderBudget();
  showToast('Budget updated', '<i class="ph ph-check-circle" style="color:#10B981;"></i>');
}

function openAddIncomeModal() {
  showToast('Income tracking coming soon', '<i class="ph ph-info" style="color:#3C50E0;"></i>');
}

// --- 6. BOOT ---
document.addEventListener('DOMContentLoaded', () => {
  const sidebarNav = document.getElementById('sidebarNav');
  if (sidebarNav) {
    sidebarNav.style.pointerEvents = 'none';
    sidebarNav.style.opacity = '0.5';
  }
  // Show onboarding by default
  const onboarding = document.getElementById('view-onboarding');
  if (onboarding) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    onboarding.classList.add('active');
  }

  // Wire threshold chips
  document.querySelectorAll('.onboard-threshold-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.onboard-threshold-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const hidden = document.getElementById('onboardThreshold');
      if (hidden) hidden.value = chip.getAttribute('data-threshold');
    });
  });

  // Wire radio cards (visual feedback)
  document.querySelectorAll('.onboard-radio-card').forEach(card => {
    card.addEventListener('click', () => {
      const value = card.getAttribute('data-source');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      document.querySelectorAll('.onboard-radio-card').forEach(c => {
        c.style.borderColor = 'var(--border-medium)';
        c.style.background = 'var(--bg-card)';
      });
      card.style.borderColor = 'var(--primary)';
      card.style.background = 'var(--primary-light)';
      onboardDataSource = value;
    });
  });
});
