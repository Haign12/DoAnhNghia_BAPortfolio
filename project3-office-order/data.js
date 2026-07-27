/* ============================================================
   PROJECT 3 – ORDERFLOW | Mock Data & LocalStorage
   ============================================================ */

const DEFAULT_USERS = [
  { id: 'u1', name: 'Admin (Host)', role: 'admin', walletBalance: 45000 },
  { id: 'u2', name: 'Minh Tuấn', role: 'staff', walletBalance: 0 },
  { id: 'u3', name: 'Hương Giang', role: 'staff', walletBalance: 0 },
  { id: 'u4', name: 'Hoàng Nam', role: 'staff', walletBalance: 15000 }
];

const MOCK_MENU = [
  { id: 'm1', name: 'Trà Sữa Trân Châu', price: 35000, category: 'Milk Tea' },
  { id: 'm2', name: 'Cà Phê Sữa Đá', price: 29000, category: 'Coffee' },
  { id: 'm3', name: 'Matcha Latte', price: 45000, category: 'Tea' },
  { id: 'm4', name: 'Bạc Xỉu', price: 32000, category: 'Coffee' },
  { id: 'm5', name: 'Bánh Mì Chả', price: 20000, category: 'Food' }
];

const DEFAULT_SESSION = {
  id: 'session_1',
  status: 'open', // open, locked, ordered, completed
  cutoffTime: '14:30',
  link: 'https://shopeefood.vn/hcm/the-coffee-house',
  shippingFee: 30000,
  discount: 10000,
  orders: [
    { id: 'o1', userId: 'u1', itemId: 'm1', qty: 1, note: 'Ít đá', status: 'paid' },
    { id: 'o2', userId: 'u2', itemId: 'm2', qty: 1, note: '', status: 'unpaid' },
    { id: 'o3', userId: 'u3', itemId: 'm3', qty: 1, note: 'Nhiều đá', status: 'paid' }
  ]
};

// ── Storage ──
function loadData(key, defaultVal) {
  try {
    const d = localStorage.getItem('orderflow_' + key);
    return d ? JSON.parse(d) : defaultVal;
  } catch { return defaultVal; }
}
function saveData(key, val) {
  localStorage.setItem('orderflow_' + key, JSON.stringify(val));
}

let users = loadData('users', DEFAULT_USERS);
let session = loadData('session', DEFAULT_SESSION);
let currentUser = users[0]; // default to Admin

function persist() {
  saveData('users', users);
  saveData('session', session);
}

// ── Helpers ──
function uid() { return Date.now().toString(36); }
function formatVND(amt) { return new Intl.NumberFormat('vi-VN').format(amt) + 'đ'; }
function getUser(id) { return users.find(u => u.id === id); }

// ── Core Logic ──
// BR-02: Fee Distribution
function calculateSplit() {
  if (!session) return { userSplits: {}, totalOrder: 0, finalTotal: 0 };
  
  // Unique users who ordered
  const userIds = [...new Set(session.orders.filter(o => o.status !== 'cancelled').map(o => o.userId))];
  const userSplits = {};
  userIds.forEach(id => userSplits[id] = { itemTotal: 0, sharedFee: 0, total: 0, status: 'unpaid', walletDeducted: 0 });

  let totalItemCost = 0;
  session.orders.filter(o => o.status !== 'cancelled').forEach(o => {
    const menu = MOCK_MENU.find(m => m.id === o.itemId);
    if (menu) {
      const cost = menu.price * o.qty;
      userSplits[o.userId].itemTotal += cost;
      totalItemCost += cost;
      // if any order of user is paid, mark user as paid
      if (o.status === 'paid') userSplits[o.userId].status = 'paid';
    }
  });

  const netFee = (session.shippingFee - session.discount) || 0;
  const numUsers = userIds.length;
  
  if (numUsers > 0) {
    const feePerPerson = Math.max(0, Math.floor(netFee / numUsers));
    const remainder = netFee - (feePerPerson * numUsers);
    
    userIds.forEach((id, idx) => {
      userSplits[id].sharedFee = feePerPerson + (idx === 0 ? Math.max(0, remainder) : 0);
      userSplits[id].total = userSplits[id].itemTotal + userSplits[id].sharedFee;
      
      // Auto-deduct wallet if paid
      if (userSplits[id].status === 'unpaid') {
         const u = getUser(id);
         if (u.walletBalance > 0) {
            const deduct = Math.min(u.walletBalance, userSplits[id].total);
            userSplits[id].walletDeducted = deduct;
         }
      }
    });
  }

  return { 
    userSplits, 
    totalOrder: totalItemCost, 
    finalTotal: totalItemCost + Math.max(0, netFee),
    is100PercentPaid: userIds.every(id => userSplits[id].status === 'paid') || userIds.length === 0
  };
}

// BR-01: Order Cutoff & BR-04: Auto-cancellation
function triggerCutoff() {
  session.status = 'locked';
  
  // Auto-cancel unpaid
  let changed = false;
  session.orders.forEach(o => {
    if (o.status === 'unpaid') {
      o.status = 'cancelled';
      changed = true;
    }
  });
  persist();
  return changed;
}

// Case 4: Vendor Out of Stock -> Internal Wallet Refund
function refundToWallet(orderId) {
  const o = session.orders.find(x => x.id === orderId);
  if (o && o.status === 'paid') {
    const menu = MOCK_MENU.find(m => m.id === o.itemId);
    if (menu) {
      const u = getUser(o.userId);
      u.walletBalance += (menu.price * o.qty);
      o.status = 'cancelled';
      persist();
      return true;
    }
  }
  return false;
}
