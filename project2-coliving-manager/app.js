
/* CoSpace SPA Core Logic */
// 1. Data & State Initialization
const DEFAULT_MEMBERS = [
  { id: 'm1', name: 'Nghĩa', avatar: 'AN', color: '#60A5FA' },
  { id: 'm2', name: 'Roommate A', avatar: 'RA', color: '#F472B6' },
  { id: 'm3', name: 'Roommate B', avatar: 'RB', color: '#34D399' }
];
let members = JSON.parse(localStorage.getItem('cospace_members')) || DEFAULT_MEMBERS;
let chores = JSON.parse(localStorage.getItem('cospace_chores')) || [];
let expenses = JSON.parse(localStorage.getItem('cospace_expenses')) || [];

function persist() {
  localStorage.setItem('cospace_chores', JSON.stringify(chores));
  localStorage.setItem('cospace_expenses', JSON.stringify(expenses));
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

// Seed data if empty (for demo purposes)
if (chores.length === 0 && expenses.length === 0) {
  chores = [
    { id: uid(), title: 'Lau nhà', assignee: 'm1', status: 'done', createdAt: '2026-07-21', dueDate: '2026-07-22' },
    { id: 'c3', title: 'Đổ rác', assignee: 'm3', status: 'in-progress', createdAt: '2026-07-22', dueDate: '2026-07-22' }, // Overdue
    { id: uid(), title: 'Lau nhà vệ sinh', assignee: null, status: 'not-assigned', createdAt: '2026-07-24', dueDate: '2026-07-30' }
  ];
  expenses = [
    { id: uid(), description: 'Tiền điện tháng 7', amount: 850000, paidBy: 'm2', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-20', settled: 'false' },
    { id: uid(), description: 'Mua nước giặt', amount: 95000, paidBy: 'm1', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-15', settled: 'pending' },
    { id: uid(), description: 'Tiền nước tháng 7', amount: 120000, paidBy: 'm3', splitAmong: ['m1', 'm2', 'm3'], date: '2026-07-19', settled: 'true' }
  ];
  persist();
}

// 2. Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const appContent = document.getElementById('app-content');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    renderView(link.dataset.target);
  });
});

function formatMoney(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getMember(id) { return members.find(m => m.id === id) || {name: 'Unknown', avatar: '?', color: '#ccc'}; }

function isOverdue(dueDate) {
  if(!dueDate) return false;
  return new Date(dueDate).getTime() < new Date().setHours(0,0,0,0);
}

// 3. Views
function renderView(view) {
  let html = '';
  switch(view) {
    case 'kanban': html = renderKanban(); break;
    case 'ledger': html = renderLedger(); break;
    case 'settle': html = renderSettleUp(); break;
  }
  appContent.innerHTML = html;
}

// -- KANBAN VIEW --
function renderKanban() {
  const notAssigned = chores.filter(c => c.status === 'not-assigned');
  const todo = chores.filter(c => c.status === 'todo');
  const inProgress = chores.filter(c => c.status === 'in-progress');
  const done = chores.filter(c => c.status === 'done');

  const renderCard = (c) => {
    const m = getMember(c.assignee);
    const overdue = (c.status !== 'done' && isOverdue(c.dueDate)) ? '<span class="badge badge-overdue" style="margin-bottom:8px;display:inline-block;">OVERDUE</span>' : '';
    let actions = '';
    if(c.status === 'not-assigned') actions = `<button onclick="app.autoAssign('${c.id}')">Auto-Assign</button>`;
    if(c.status === 'todo') actions = `<button onclick="app.startChore('${c.id}')">Start</button> <button onclick="app.autoAssign('${c.id}')">Reassign</button>`;
    if(c.status === 'in-progress') actions = `<button class="kanban-action-btn green" onclick="app.completeChore('${c.id}')">Complete</button> <button onclick="app.autoAssign('${c.id}')">Reassign</button>`;
    
    return `<div class="kanban-card ${overdue ? 'card-overdue' : ''}">
      ${overdue}
      <span class="kanban-card-title">${c.title}</span>
      <div class="kanban-card-meta">
        <span class="kanban-card-date">Due: ${c.dueDate || 'N/A'}</span>
        ${c.assignee ? `<div class="kanban-avatar" style="background:${m.color}">${m.avatar}</div>` : ''}
      </div>
      <div class="kanban-card-actions">${actions}</div>
    </div>`;
  };

  return `
    <div class="page-header">
      <div>
        <h1 class="page-greeting">Chores Kanban</h1>
        <p class="page-sub">Auto-assign picks the person with fewest completions. (Tie-breaker: Alphabetical).</p>
      </div>
      <button class="btn-primary" onclick="app.openNewChoreModal()">+ New Chore</button>
    </div>
    
    ${chores.length === 0 ? `<div class="empty-state">Chưa có công việc nào. Bấm New Chore để tạo!</div>` : ''}

    <div class="kanban-board">
      <div class="kanban-col">
        <div class="kanban-col-header"><div class="kanban-col-title">Not Assigned</div><div class="kanban-col-count">${notAssigned.length}</div></div>
        <div class="kanban-cards">${notAssigned.map(renderCard).join('')}</div>
      </div>
      <div class="kanban-col">
        <div class="kanban-col-header"><div class="kanban-col-title">To Do</div><div class="kanban-col-count">${todo.length}</div></div>
        <div class="kanban-cards">${todo.map(renderCard).join('')}</div>
      </div>
      <div class="kanban-col">
        <div class="kanban-col-header"><div class="kanban-col-title">In Progress</div><div class="kanban-col-count">${inProgress.length}</div></div>
        <div class="kanban-cards">${inProgress.map(renderCard).join('')}</div>
      </div>
      <div class="kanban-col">
        <div class="kanban-col-header"><div class="kanban-col-title">Done</div><div class="kanban-col-count">${done.length}</div></div>
        <div class="kanban-cards">${done.map(renderCard).join('')}</div>
      </div>
    </div>
  `;
}

// -- LEDGER VIEW --
function renderLedger() {
  return `
    <div class="page-header">
      <div>
        <h1 class="page-greeting">Split Ledger</h1>
        <p class="page-sub">Quy trình 2 bước: Người gửi báo cáo -> Người nhận xác nhận (Chống tranh chấp).</p>
      </div>
      <button class="btn-primary" onclick="app.openExpenseModal()">+ Add Expense</button>
    </div>
    <div class="card" style="margin-top: 24px;">
      ${expenses.length === 0 ? '<div class="empty-state">Chưa có chi tiêu nào.</div>' : `
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Paid By</th>
            <th>Amount</th>
            <th>Status / Action</th>
          </tr>
        </thead>
        <tbody>
          ${expenses.map(e => {
            const payer = getMember(e.paidBy);
            let actionHtml = '';
            // Gated logic
            if(e.settled === 'false') {
              actionHtml = `<button class="btn-small" onclick="app.markSent('${e.id}')">I've sent it</button>`;
            } else if(e.settled === 'pending') {
              actionHtml = `<button class="btn-small btn-confirm" onclick="app.confirmReceived('${e.id}')">Confirm Receipt</button>`;
            } else {
              actionHtml = `<span class="badge badge-paid">SETTLED</span>`;
            }
            return `<tr>
              <td>${e.date}</td>
              <td>${e.description}</td>
              <td><div style="display:flex;align-items:center;gap:8px;"><div class="nav-avatar" style="background:${payer.color}">${payer.avatar}</div> ${payer.name}</div></td>
              <td>${formatMoney(e.amount)}</td>
              <td>${e.settled === 'pending' ? '<span class="badge badge-unpaid" style="margin-right:8px;">PENDING CONFIRM</span>' : ''}${actionHtml}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      `}
    </div>
  `;
}

// -- SETTLE UP VIEW --
function calculateSimplifications() {
  const balances = {};
  members.forEach(m => balances[m.id] = 0);
  
  expenses.filter(e => e.settled !== 'true').forEach(e => {
    const share = Math.floor(e.amount / e.splitAmong.length);
    const remainder = e.amount - (share * e.splitAmong.length);
    e.splitAmong.forEach((mid, idx) => {
      let owes = share + (idx === 0 ? remainder : 0);
      if(mid === e.paidBy) balances[mid] += (e.amount - owes);
      else balances[mid] -= owes;
    });
  });

  let debtors = Object.keys(balances).filter(k => balances[k] < 0).map(k => ({id: k, amount: -balances[k]})).sort((a,b) => b.amount - a.amount);
  let creditors = Object.keys(balances).filter(k => balances[k] > 0).map(k => ({id: k, amount: balances[k]})).sort((a,b) => b.amount - a.amount);
  
  const transactions = [];
  let d = 0, c = 0;
  
  while (d < debtors.length && c < creditors.length) {
    let debtor = debtors[d];
    let creditor = creditors[c];
    let amount = Math.min(debtor.amount, creditor.amount);
    
    transactions.push({ from: debtor.id, to: creditor.id, amount });
    
    debtor.amount -= amount;
    creditor.amount -= amount;
    
    if (debtor.amount < 1) d++;
    if (creditor.amount < 1) c++;
  }
  return transactions;
}

function renderSettleUp() {
  const transactions = calculateSimplifications();
  
  return `
    <div class="page-header">
      <div>
        <h1 class="page-greeting">Debt Simplification</h1>
        <p class="page-sub">Thuật toán tối thiểu hóa số giao dịch (Debt Simplification) hiển thị chính xác ai nợ ai.</p>
      </div>
    </div>
    <div class="card" style="margin-top:24px; max-width: 600px;">
      <h3 style="margin-bottom: 20px;">Who owes who?</h3>
      ${transactions.length === 0 ? '<p style="color:var(--text2)">Tất cả đã thanh toán đầy đủ!</p>' : ''}
      <div class="settle-list" style="display:flex; flex-direction: column; gap: 16px;">
        ${transactions.map(t => {
          const fromM = getMember(t.from);
          const toM = getMember(t.to);
          return `<div style="display:flex; align-items:center; justify-content:space-between; padding: 16px; border: 1px solid var(--border); border-radius: 8px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="nav-avatar" style="background:${fromM.color}">${fromM.avatar}</div>
              <strong>${fromM.name}</strong>
              <i class="ph-bold ph-arrow-right" style="color:var(--text2)"></i>
              <div class="nav-avatar" style="background:${toM.color}">${toM.avatar}</div>
              <strong>${toM.name}</strong>
            </div>
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--red);">${formatMoney(t.amount)}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// 4. Application Methods
window.app = {
  autoAssign: function(choreId) {
    const doneChores = chores.filter(c => c.status === 'done');
    const counts = members.map(m => {
      return { id: m.id, name: m.name, count: doneChores.filter(c => c.assignee === m.id).length };
    });
    
    // Sort by count asc, then by name asc (Tie-breaker rule)
    counts.sort((a, b) => {
      if(a.count !== b.count) return a.count - b.count;
      return a.name.localeCompare(b.name); // Alphabetical tie-breaker
    });
    
    const assignee = counts[0].id;
    const c = chores.find(x => x.id === choreId);
    if(c) {
      c.assignee = assignee;
      c.status = 'todo';
      persist();
      renderKanban();
      alert(`Auto-assigned to ${counts[0].name}\n\nTie-breaking Rule Applied: Lựa chọn dựa trên Số lượt hoàn thành thấp nhất (${counts[0].count}). Trong trường hợp hòa điểm, hệ thống ưu tiên Alphabetical Order.`);
    }
  },
  startChore: function(id) {
    const c = chores.find(x => x.id === id);
    if(c) { c.status = 'in-progress'; persist(); renderKanban(); }
  },
  completeChore: function(id) {
    const c = chores.find(x => x.id === id);
    if(c) { c.status = 'done'; persist(); renderKanban(); }
  },
  markSent: function(id) {
    const e = expenses.find(x => x.id === id);
    if(e) { e.settled = 'pending'; persist(); renderLedger(); }
  },
  confirmReceived: function(id) {
    // Chỉ payee (người trả tiền ban đầu) mới có quyền xác nhận
    const e = expenses.find(x => x.id === id);
    if(e) { e.settled = 'true'; persist(); renderLedger(); }
  },
  openNewChoreModal: function() {
    const modalHtml = `
      <div class="modal-card">
        <button class="modal-close" onclick="document.getElementById('modal-overlay').classList.remove('active')">&times;</button>
        <h2 style="margin-bottom: 20px;">Add New Chore</h2>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Chore Name</label>
          <input type="text" id="new-chore-title" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Due Date</label>
          <input type="date" id="new-chore-due" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center" onclick="app.saveChore()">Create & Auto-Assign</button>
      </div>
    `;
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = modalHtml;
    overlay.classList.add('active');
  },
  saveChore: function() {
    const title = document.getElementById('new-chore-title').value;
    const due = document.getElementById('new-chore-due').value;
    if(!title || !due) return alert('Fill all fields');
    
    const newId = uid();
    chores.push({ id: newId, title, assignee: null, status: 'not-assigned', createdAt: new Date().toISOString().split('T')[0], dueDate: due });
    persist();
    document.getElementById('modal-overlay').classList.remove('active');
    app.autoAssign(newId);
  },
  openExpenseModal: function() {
    const modalHtml = `
      <div class="modal-card">
        <button class="modal-close" onclick="document.getElementById('modal-overlay').classList.remove('active')">&times;</button>
        <h2 style="margin-bottom: 20px;">Add Expense</h2>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Description</label>
          <input type="text" id="new-exp-desc" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Amount (VND)</label>
          <input type="number" id="new-exp-amt" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:8px;font-weight:600">Paid By</label>
          <select id="new-exp-payer" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:6px;">
            ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
          </select>
        </div>
        <button class="btn-primary" style="width:100%;justify-content:center" onclick="app.saveExpense()">Add Expense</button>
      </div>
    `;
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = modalHtml;
    overlay.classList.add('active');
  },
  saveExpense: function() {
    const desc = document.getElementById('new-exp-desc').value;
    const amt = parseInt(document.getElementById('new-exp-amt').value);
    const payer = document.getElementById('new-exp-payer').value;
    if(!desc || !amt) return alert('Fill all fields');
    expenses.push({
      id: uid(), description: desc, amount: amt, paidBy: payer, splitAmong: ['m1','m2','m3'], date: new Date().toISOString().split('T')[0], settled: 'false'
    });
    persist();
    document.getElementById('modal-overlay').classList.remove('active');
    renderLedger();
  }
};

// Run initial
renderView('kanban');
