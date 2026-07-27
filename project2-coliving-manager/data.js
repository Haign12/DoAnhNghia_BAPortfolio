/* ============================================================
   PROJECT 2 – COSPACE | Co-living Task & Split Bill Manager
   Fully Interactive Data Layer with LocalStorage
   ============================================================ */

// ── Default Data ──
const DEFAULT_MEMBERS = [
  { id: 'm1', name: 'Nghĩa', avatar: 'AN', color: '#60A5FA' },
  { id: 'm2', name: 'Roommate A', avatar: 'RA', color: '#F472B6' },
  { id: 'm3', name: 'Roommate B', avatar: 'RB', color: '#34D399' }
];

const DEFAULT_CHORES = [
  { id: 'c1', title: 'Lau nhà', assignee: 'm1', status: 'done', createdAt: '2026-07-21', completedAt: '2026-07-21', week: 30 },
  { id: 'c2', title: 'Rửa chén', assignee: 'm2', status: 'done', createdAt: '2026-07-21', completedAt: '2026-07-22', week: 30 },
  { id: 'c3', title: 'Đổ rác', assignee: 'm3', status: 'in-progress', createdAt: '2026-07-22', completedAt: null, week: 30 },
  { id: 'c4', title: 'Dọn bếp', assignee: 'm1', status: 'todo', createdAt: '2026-07-23', completedAt: null, week: 30 },
  { id: 'c5', title: 'Lau nhà vệ sinh', assignee: null, status: 'not-assigned', createdAt: '2026-07-24', completedAt: null, week: 31 },
  { id: 'c6', title: 'Giặt đồ chung', assignee: 'm2', status: 'done', createdAt: '2026-07-14', completedAt: '2026-07-14', week: 29 },
  { id: 'c7', title: 'Quét sân', assignee: 'm3', status: 'done', createdAt: '2026-07-14', completedAt: '2026-07-15', week: 29 },
  { id: 'c8', title: 'Lau nhà', assignee: 'm2', status: 'done', createdAt: '2026-07-07', completedAt: '2026-07-07', week: 28 },
  { id: 'c9', title: 'Rửa chén', assignee: 'm1', status: 'done', createdAt: '2026-07-07', completedAt: '2026-07-08', week: 28 },
  { id: 'c10', title: 'Đổ rác', assignee: 'm3', status: 'done', createdAt: '2026-07-01', completedAt: '2026-07-01', week: 27 }
];

const DEFAULT_EXPENSES = [
  { id: 'e1', description: 'Tiền chợ tuần 30', amount: 450000, paidBy: 'm1', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-21', settled: false },
  { id: 'e2', description: 'Tiền điện tháng 7', amount: 850000, paidBy: 'm2', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-20', settled: false },
  { id: 'e3', description: 'Tiền nước tháng 7', amount: 120000, paidBy: 'm3', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-19', settled: true },
  { id: 'e4', description: 'Mua nước giặt', amount: 95000, paidBy: 'm1', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-15', settled: false },
  { id: 'e5', description: 'Tiền wifi tháng 7', amount: 200000, paidBy: 'm3', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-10', settled: true }
];

// ── Storage Helper ──
function loadData(key, defaultVal) {
  try {
    const d = localStorage.getItem('cospace_' + key);
    return d ? JSON.parse(d) : defaultVal;
  } catch { return defaultVal; }
}
function saveData(key, val) {
  localStorage.setItem('cospace_' + key, JSON.stringify(val));
}

// ── State ──
let members = loadData('members', DEFAULT_MEMBERS);
let chores = loadData('chores', DEFAULT_CHORES);
let expenses = loadData('expenses', DEFAULT_EXPENSES);

function persist() {
  saveData('members', members);
  saveData('chores', chores);
  saveData('expenses', expenses);
}

// ── ID generator ──
function uid() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

// ── Member helpers ──
function getMember(id) { return members.find(m => m.id === id); }
function getMemberName(id) { const m = getMember(id); return m ? m.name : 'Unassigned'; }
function getMemberAvatar(id) { const m = getMember(id); return m ? m.avatar : '??'; }
function getMemberColor(id) { const m = getMember(id); return m ? m.color : '#888'; }

// ── Chore helpers ──
function addChore(title) {
  chores.push({ id: uid(), title, assignee: null, status: 'not-assigned', createdAt: new Date().toISOString().split('T')[0], completedAt: null, week: getWeekNumber(new Date()) });
  persist();
}
function updateChoreStatus(id, newStatus) {
  const c = chores.find(x => x.id === id);
  if (!c) return;
  c.status = newStatus;
  if (newStatus === 'done') c.completedAt = new Date().toISOString().split('T')[0];
  if (newStatus === 'todo' && !c.assignee) c.status = 'not-assigned';
  persist();
}
function autoAssignChore(choreId) {
  const fourWeeksAgo = getWeekNumber(new Date()) - 4;
  const recentDone = chores.filter(c => c.status === 'done' && c.week >= fourWeeksAgo);
  const counts = {};
  members.forEach(m => counts[m.id] = 0);
  recentDone.forEach(c => { if (counts[c.assignee] !== undefined) counts[c.assignee]++; });
  const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
  const assignTo = sorted[0][0];
  const c = chores.find(x => x.id === choreId);
  if (c) { c.assignee = assignTo; c.status = 'todo'; persist(); }
  return assignTo;
}
function getWeekNumber(d) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
}
function getChoreHistory(weeks = 4) {
  const currentWeek = getWeekNumber(new Date());
  return chores.filter(c => c.status === 'done' && c.week >= currentWeek - weeks);
}
function getChoreCompletionCount(memberId, weeks = 4) {
  return getChoreHistory(weeks).filter(c => c.assignee === memberId).length;
}

// ── Expense / Ledger helpers ──
function addExpense(desc, amount, paidBy, splitAmong) {
  if (amount <= 0) throw new Error('Số tiền phải > 0');
  expenses.push({ id: uid(), description: desc, amount, paidBy, splitAmong: [...splitAmong], date: new Date().toISOString().split('T')[0], settled: false });
  persist();
}
function markExpensePaid(expenseId) {
  const e = expenses.find(x => x.id === expenseId);
  if (e) { e.settled = true; persist(); }
}
function calculateDebts() {
  const balances = {};
  members.forEach(m => balances[m.id] = 0);
  expenses.filter(e => !e.settled).forEach(e => {
    const share = e.amount / e.splitAmong.length;
    const remainder = e.amount - (Math.floor(share) * e.splitAmong.length);
    e.splitAmong.forEach((mid, i) => {
      let owes = Math.floor(share);
      if (i === 0 && mid === e.paidBy) owes += remainder; // payer gets remainder
      else if (i === 0) owes += remainder;
      if (mid === e.paidBy) {
        balances[mid] += (e.amount - owes); // payer is owed by others
      } else {
        balances[mid] -= owes;
      }
    });
  });
  // Simplify: recalculate net
  const net = {};
  members.forEach(m => net[m.id] = 0);
  expenses.filter(e => !e.settled).forEach(e => {
    const perPerson = Math.floor(e.amount / e.splitAmong.length);
    const leftover = e.amount - (perPerson * e.splitAmong.length);
    e.splitAmong.forEach((mid, idx) => {
      const share = perPerson + (idx === 0 ? leftover : 0); // first person in list gets leftover (rounding to payer)
      if (mid === e.paidBy) {
        net[mid] += (e.amount - share);
      } else {
        net[mid] -= share;
      }
    });
  });
  return net;
}
function canLeaveGroup(memberId) {
  const debts = calculateDebts();
  return debts[memberId] >= 0; // if they owe money (negative balance), they can't leave
}
function getExpenseTotal() {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}
function getUnsettledCount() {
  return expenses.filter(e => !e.settled).length;
}
