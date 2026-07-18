/* ============================================================
   PROJECT 1 – EXPENSE TRACKER | Mock Data
   ============================================================ */

const subscriptions = [
  { service: 'Netflix', icon: '🎬', category: 'Entertainment', cost: 15.99, lastUsed: '2 days ago', status: 'Active', cycle: 'Monthly' },
  { service: 'Spotify', icon: '🎵', category: 'Music', cost: 9.99, lastUsed: 'Today', status: 'Active', cycle: 'Monthly' },
  { service: 'ChatGPT Plus', icon: '🤖', category: 'Productivity', cost: 20.00, lastUsed: 'Today', status: 'Active', cycle: 'Monthly' },
  { service: 'Gym Membership', icon: '🏋️', category: 'Health', cost: 30.00, lastUsed: '45 days ago', status: 'Ghost', cycle: 'Monthly' },
  { service: 'iCloud+', icon: '☁️', category: 'Storage', cost: 2.99, lastUsed: 'Background', status: 'Active', cycle: 'Monthly' },
  { service: 'Adobe CC', icon: '🎨', category: 'Productivity', cost: 52.99, lastUsed: '5 days ago', status: 'Active', cycle: 'Monthly' },
  { service: 'Audible', icon: '📚', category: 'Entertainment', cost: 14.95, lastUsed: '60 days ago', status: 'Ghost', cycle: 'Monthly' },
  { service: 'Coursera Plus', icon: '🎓', category: 'Education', cost: 49.00, lastUsed: '35 days ago', status: 'Ghost', cycle: 'Monthly' }
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

const utilData = {
  labels: ['High Usage', 'Moderate', 'Ghost (Unused)'],
  datasets: [{
    data: [60, 25, 15],
    backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
    borderWidth: 0,
    hoverOffset: 6
  }]
};
