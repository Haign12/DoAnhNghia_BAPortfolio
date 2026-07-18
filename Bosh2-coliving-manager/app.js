/* ============================================================
   PROJECT 2 – CO-LIVING MANAGER | Warm Lifestyle App Logic
   ============================================================ */

// --- Mobile Sidebar Toggle ----------------------------------
const sidebar = document.getElementById('sidebar');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileNavToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
});

// --- Toast (Warm styled) ------------------------------------
const toastContainer = document.getElementById('toastContainer');

function showToast(message, icon = '🌸') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Render Chores (Kanban) ---------------------------------
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');
const todoCount = document.getElementById('todoCount');
const doneCount = document.getElementById('doneCount');

function renderChores() {
  todoList.innerHTML = '';
  doneList.innerHTML = '';
  let tCount = 0, dCount = 0;

  chores.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card' + (task.status === 'done' ? ' done-card' : '');

    const rm = roommates[task.assigneeIdx] || roommates[0];
    const priorityClass = `priority-${task.priority}`;

    card.innerHTML = `
      <div class="task-card-header">
        <div class="task-title">${task.title}</div>
        <div class="priority-dot ${priorityClass}" title="${task.priority} priority"></div>
      </div>
      <div class="task-card-footer">
        <div class="assignee-chip">
          <div class="avatar ${rm.avatarClass}">${rm.initials}</div>
          <span class="assignee-name">${task.assignee}</span>
        </div>
        <span class="due-date">📅 ${task.dueDate}</span>
      </div>
      ${task.status === 'todo' ? '<button class="mark-done-btn" data-index="' + index + '">✓ Done</button>' : ''}
    `;

    if (task.status === 'todo') { todoList.appendChild(card); tCount++; }
    else { doneList.appendChild(card); dCount++; }
  });

  todoCount.textContent = tCount;
  doneCount.textContent = dCount;

  document.querySelectorAll('.mark-done-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      chores[idx].status = 'done';
      showToast(`"${chores[idx].title}" done! Great job! 🎉`, '✅');
      renderChores();
    });
  });
}

renderChores();

// --- Auto-Assign Button -------------------------------------
document.getElementById('autoAssignBtn').addEventListener('click', () => {
  const todoChores = chores.filter(c => c.status === 'todo');
  todoChores.forEach((task, i) => {
    const newIdx = i % roommates.length;
    task.assigneeIdx = newIdx;
    task.assignee = roommates[newIdx].name;
  });
  renderChores();
  showToast('Chores shuffled fairly! Everyone\'s got their share ☀️', '⚡');
});

// --- Render Balance Cards -----------------------------------
const balanceCards = document.getElementById('balanceCards');
const maxBalance = Math.max(...roommates.map(r => Math.abs(r.balance)));

roommates.forEach(person => {
  const div = document.createElement('div');
  div.className = 'b-card';

  const amtClass = person.balance > 0 ? 'positive' : (person.balance < 0 ? 'negative' : 'neutral');
  const prefix = person.balance > 0 ? '+' : '';
  const statusText = person.balance > 0 ? 'Gets back' : (person.balance < 0 ? 'Owes' : 'Settled');
  const barClass = person.balance >= 0 ? 'positive' : 'negative';

  div.innerHTML = `
    <div class="avatar-lg ${person.avatarClass}">${person.initials}</div>
    <div class="name">${person.name}</div>
    <div class="amt ${amtClass}">${prefix}$${Math.abs(person.balance).toFixed(2)}</div>
    <div class="status-label">${statusText}</div>
    <div class="balance-bar-container">
      <div class="balance-bar ${barClass}" style="width: 0%;"></div>
    </div>
  `;
  balanceCards.appendChild(div);
});

setTimeout(() => {
  document.querySelectorAll('.balance-bar').forEach((bar, i) => {
    const person = roommates[i];
    const width = maxBalance > 0 ? (Math.abs(person.balance) / maxBalance * 100) : 0;
    bar.style.width = width + '%';
  });
}, 300);

// --- Render Expense Table -----------------------------------
const expenseTable = document.getElementById('expenseTable');

expenses.forEach(exp => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="expense-date">${exp.date}</td>
    <td class="expense-item-name">${exp.item}</td>
    <td>${exp.paidBy}</td>
    <td class="expense-amount">$${exp.amount.toFixed(2)}</td>
    <td><span class="split-badge">${exp.split}</span></td>
  `;
  expenseTable.appendChild(tr);
});

// --- Add Expense Button -------------------------------------
document.getElementById('addExpenseBtn').addEventListener('click', () => {
  showToast('Add Expense modal would open here 💳', '📝');
});
