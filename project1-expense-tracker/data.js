/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | Mock Data
   ============================================================ */

const subscriptions = [
  { service: 'Netflix', icon: '<i class="ph ph-film-slate"></i>', category: 'Entertainment', cost: 15.99, lastUsed: '2 days ago', status: 'Active', cycle: 'Monthly' },
  { service: 'Spotify', icon: '<i class="ph ph-music-notes"></i>', category: 'Music', cost: 9.99, lastUsed: 'Today', status: 'Active', cycle: 'Monthly' },
  { service: 'ChatGPT Plus', icon: '<i class="ph ph-robot"></i>', category: 'Productivity', cost: 20.00, lastUsed: 'Today', status: 'Active', cycle: 'Monthly' },
  { service: 'Gym Membership', icon: '<i class="ph ph-barbell"></i>', category: 'Health', cost: 30.00, lastUsed: '45 days ago', status: 'Ghost', cycle: 'Monthly' },
  { service: 'iCloud+', icon: '<i class="ph ph-cloud"></i>', category: 'Storage', cost: 2.99, lastUsed: 'Background', status: 'Active', cycle: 'Monthly' },
  { service: 'Adobe CC', icon: '<i class="ph ph-palette"></i>', category: 'Productivity', cost: 52.99, lastUsed: '5 days ago', status: 'Active', cycle: 'Monthly' },
  { service: 'Audible', icon: '<i class="ph ph-books"></i>', category: 'Entertainment', cost: 14.95, lastUsed: '60 days ago', status: 'Ghost', cycle: 'Monthly' },
  { service: 'Coursera Plus', icon: '<i class="ph ph-graduation-cap"></i>', category: 'Education', cost: 49.00, lastUsed: '35 days ago', status: 'Ghost', cycle: 'Monthly' }
];

const burnRateData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Spend ($)',
    data: [1100, 1150, 1300, 1250, 1280, 1240],
    borderRadius: 6,
    borderSkipped: false
  }]
};

/* ── Radar Chart Data (Spending by Category) ── */
const categoryData = {
  labels: ['Entertainment', 'Productivity', 'Health', 'Storage', 'Education'],
  datasets: [{
    label: 'Monthly Spend',
    data: [30.94, 72.99, 30.00, 2.99, 49.00],
    backgroundColor: 'rgba(142, 117, 200, 0.15)',
    borderColor: 'rgba(142, 117, 200, 0.6)',
    borderWidth: 2,
    pointBackgroundColor: '#8E75C8',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#8E75C8',
    pointHoverRadius: 7
  }]
};

/* ── Sparkline data for featured KPI ── */
const sparklineData = [65, 45, 75, 55, 85, 60, 90, 50, 70, 80];
