/* ============================================================
   PROJECT 1 – FINTRACK | Mock Data & LocalStorage
   ============================================================ */

const DEFAULT_SUBSCRIPTIONS = [
  { id: 's1', name: 'Netflix Premium', cost: 260000, cycle: 'Monthly', status: 'active', lastTransactionDate: '2026-07-01' },
  { id: 's2', name: 'Spotify Duo', cost: 89000, cycle: 'Monthly', status: 'active', lastTransactionDate: '2026-07-15' },
  { id: 's3', name: 'California Fitness', cost: 850000, cycle: 'Monthly', status: 'active', lastTransactionDate: '2026-05-20' }, // Ghost (> 30 days)
  { id: 's4', name: 'Adobe Creative Cloud', cost: 1350000, cycle: 'Annual', status: 'active', lastTransactionDate: '2026-06-25' },
  { id: 's5', name: 'ChatGPT Plus', cost: 490000, cycle: 'Monthly', status: 'active', lastTransactionDate: '2026-04-10' } // Ghost (> 30 days)
];

const DEFAULT_GHOSTS = [];
const DEFAULT_SNOOZED = {}; // { subId: snoozeUntilTimestamp }

// ── Storage ──
function loadData(key, defaultVal) {
  try {
    const d = localStorage.getItem('fintrack_' + key);
    return d ? JSON.parse(d) : defaultVal;
  } catch { return defaultVal; }
}
function saveData(key, val) {
  localStorage.setItem('fintrack_' + key, JSON.stringify(val));
}

let subscriptions = loadData('subscriptions', DEFAULT_SUBSCRIPTIONS);
let snoozed = loadData('snoozed', DEFAULT_SNOOZED);

function persist() {
  saveData('subscriptions', subscriptions);
  saveData('snoozed', snoozed);
}

// ── Helpers ──
function formatVND(amt) { return new Intl.NumberFormat('vi-VN').format(amt) + 'đ'; }
function uid() { return Date.now().toString(36); }

// Simulate today as '2026-07-27'
const TODAY = new Date('2026-07-27T00:00:00');

// ── Ghost Detection Engine (FR-03) ──
function detectGhosts() {
  const ghosts = [];
  const now = Date.now();
  
  subscriptions.forEach(sub => {
    if (sub.status !== 'active') return;
    
    // Check snooze
    if (snoozed[sub.id] && snoozed[sub.id] > now) return;

    // Calculate days since last transaction
    const lastDate = new Date(sub.lastTransactionDate);
    const diffTime = Math.abs(TODAY - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays >= 30 && sub.cycle === 'Monthly') {
      ghosts.push({ ...sub, unusedDays: diffDays, savingsPerYear: sub.cost * 12 });
    }
  });
  return ghosts;
}

// Action: Snooze
function snoozeGhost(subId, days) {
  const snoozeUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
  snoozed[subId] = snoozeUntil;
  persist();
}

// Action: Cancel
function cancelSubscription(subId) {
  const sub = subscriptions.find(s => s.id === subId);
  if (sub) {
    sub.status = 'cancelled';
    persist();
  }
}

// Calculate KPIs (FR-07)
function getKPIs() {
  let totalCost = 0;
  let activeCount = 0;
  subscriptions.forEach(s => {
    if (s.status === 'active') {
      let monthly = s.cycle === 'Annual' ? Math.round(s.cost / 12) : s.cost;
      totalCost += monthly;
      activeCount++;
    }
  });

  const ghosts = detectGhosts();
  const ghostCost = ghosts.reduce((sum, g) => sum + g.cost, 0);

  return {
    monthlyFixedCost: totalCost,
    activeSubs: activeCount,
    ghostCost: ghostCost,
    utilizationRate: totalCost > 0 ? Math.round(((totalCost - ghostCost) / totalCost) * 100) : 0
  };
}
